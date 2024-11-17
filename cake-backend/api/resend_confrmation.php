<?php
// Enable error reporting for debugging (disable in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');

// Database connection
include 'db.php';

// Get email from POST request
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);

if (!$email) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid email address']);
    exit;
}

// Step 3: Check if user exists in the database
$stmt = $mysqli->prepare("SELECT id, username FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    http_response_code(404);
    echo json_encode(['message' => 'User not found']);
    exit;
}

$user = $result->fetch_assoc();
$userId = $user['id'];
$username = $user['username'];

// Step 4: Generate a new confirmation token
$token = bin2hex(random_bytes(16)); // Generates a secure random token
$tokenExpiry = date('Y-m-d H:i:s', strtotime('+1 hour')); // Token valid for 1 hour

// Update the user's token in the database
$updateStmt = $mysqli->prepare("UPDATE users SET confirmation_token = ?, token_expiry = ? WHERE id = ?");
$updateStmt->bind_param("ssi", $token, $tokenExpiry, $userId);

if ($updateStmt->execute()) {
    // Step 5: Send the confirmation email
    $subject = "Confirm Your Email Address";
    $confirmationLink = "http://localhost:5173/confirm?token=$token"; // actual url
    $message = "Hi $username,\n\nPlease confirm your email by clicking the link below:\n$confirmationLink\n\nThis link will expire in 1 hour.";
    $headers = "From: no-reply@yourdomain.com";

    if (mail($email, $subject, $message, $headers)) {
        http_response_code(200);
        echo json_encode(['message' => 'Confirmation email sent successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Failed to send email']);
    }
} else {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to generate token']);
}

// Close statements and database connection
$stmt->close();
$updateStmt->close();
$mysqli->close();
