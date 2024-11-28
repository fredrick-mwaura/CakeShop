<?php
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle CORS preflight request
    header('Access-Control-Allow-Origin: http://localhost:5173'); // Match your frontend origin
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');
    http_response_code(204); // No content for OPTIONS request
    exit;
}

// Set CORS headers for other requests
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Include database connection
require 'db.php';

// Enable error reporting for debugging (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// Sanitize the token input
$token = trim(filter_input(INPUT_GET, 'token', FILTER_DEFAULT));

if (!$token) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'message' => 'Invalid or missing token.']);
    exit;
}

try {
    // Fetch the user with the provided token from the `pending_users` table
    $stmt = $conn->prepare("SELECT * FROM pending_users WHERE token = ?");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check if the token exists
    if ($result->num_rows === 0) {
        http_response_code(404); // Not Found
        echo json_encode(['success' => false, 'message' => 'Invalid or expired token.']);
        exit;
    }

    $user = $result->fetch_assoc();

    // Insert the verified user into the main `users` table
    $insertStmt = $conn->prepare("INSERT INTO Login (Username, email, PasswordHash) VALUES (?, ?, ?, ?)");
    $insertStmt->bind_param("ssss", $user['username'], $user['email'], $user['password']);
    
    if ($insertStmt->execute()) {
        // Delete the user from `pending_users` table after successful insertion
        $deleteStmt = $conn->prepare("DELETE FROM pending_users WHERE token = ?");
        $deleteStmt->bind_param("s", $token);
        $deleteStmt->execute();

        http_response_code(200); // OK
        echo json_encode(['success' => true, 'message' => 'Email verified successfully. You can now log in.']);
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(['success' => false, 'message' => 'Failed to verify email. Please try again later.']);
    }

    // Close statements
    $stmt->close();
    $insertStmt->close();
    $deleteStmt->close();
    $conn->close();

} catch (Exception $e) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['success' => false, 'message' => 'Server error. Please try again later.']);
    error_log('Error: ' . $e->getMessage());
}