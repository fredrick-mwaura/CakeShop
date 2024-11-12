<?php
// Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Handle preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Include your database connection file
include 'db.php';

// Get the raw POST data and decode it as an associative array
$raw_data = file_get_contents("php://input");
error_log("Received data: {$raw_data}"); // Log raw input for debugging

$data = json_decode($raw_data, true);

// Log the decoded data
error_log("Decoded data: " . print_r($data, true));

$response = array();

if (!$data) {
    http_response_code(400); // Bad Request
    $response['success'] = false;
    $response['message'] = "Invalid JSON input";
    echo json_encode($response);
    exit;
}

// Validate the input data
if (isset($data['Username']) && isset($data['password'])) {
    $Username = trim($data['Username']);
    $password = trim($data['password']);

    // Prepare a statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM Login WHERE Username = ?");
    
    if ($stmt) {
        $stmt->bind_param("s", $Username);
        $stmt->execute();
        $result = $stmt->get_result();

        // Check if user exists
        if ($result && $result->num_rows > 0) {
            $user = $result->fetch_assoc();

            // Debug: log fetched password hash (remove in production)
            error_log("Fetched password hash: " . bin2hex($user['PasswordHash']));

            // Verify the password
            if (password_verify($password, bin2hex($user['PasswordHash']))) {
                $response['success'] = true;
                $response['message'] = "Login successful";
            } else {
                http_response_code(401); // Unauthorized
                $response['success'] = false;
                $response['message'] = "Incorrect password";
            }
        } else {
            http_response_code(404); // Not Found
            $response['success'] = false;
            $response['message'] = "User not found";
        }

        // Close the prepared statement
        $stmt->close();
    } else {
        http_response_code(500); // Internal Server Error
        $response['success'] = false;
        $response['message'] = "Database query failed";
    }
} else {
    http_response_code(400); // Bad Request
    $response['success'] = false;
    $response['message'] = "Username or password is missing";
}

// Output the response as JSON
echo json_encode($response);

// Close the database connection
$conn->close();

