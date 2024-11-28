<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: http://localhost:5173'); 
header('Access-Control-Allow-Methods: PUT, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);  // No Content for OPTIONS requests
    exit;
}
require_once 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve and decode input
    $input = json_decode(file_get_contents("php://input"), true);
    $email = trim($input['email']);

    if (empty($email)) {
        http_response_code(422);
        echo json_encode(["success" => false, "message" => "Email address is required."]);
        exit;
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(422);
        echo json_encode(["success" => false, "message" => "Invalid email address."]);
        exit;
    }

    try {
        // Check if user exists by email
        $stmt = $conn->prepare("SELECT LoginID, Username FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
            http_response_code(404);
            echo json_encode(["success" => false, "message" => "User not found."]);
            exit;
        }

        // Fetch user data
        $user = $result->fetch_assoc();

        // Generate reset token and expiration time
        $resetToken = bin2hex(random_bytes(32));
        $expiresAt = date("Y-m-d H:i:s", strtotime("+20 minutes"));


        // Insert or update reset token in the database
        $stmt = $conn->prepare("
            INSERT INTO password_resets (user_id, token, expires_at) 
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE token = ?, expires_at = ?
        ");
        $stmt->bind_param("issss", $user['LoginID'], $resetToken, $expiresAt, $resetToken, $expiresAt);
        $stmt->execute();

        // Send reset email
        $resetLink = "http://localhost/client/reset-password?token=$resetToken";
        $subject = "Password Reset Request";
        $message = "Hello " . $user['Username'] . ",\n\n";
        $message .= "We received a request to reset your password. Click the link below to reset it:\n\n";
        $message .= "$resetLink\n\n";
        $message .= "If you did not request a password reset, you can ignore this email.\n\n";
        $message .= "This link will expire in 1 hour.\n\n";
        $headers = "From: no-reply@cakeshop.com";

        if (mail($email, $subject, $message, $headers)) {
            echo json_encode(["success" => true, "message" => "Password reset email sent successfully."]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Failed to send email. Please try again later."]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "An error occurred. Please try again later."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
