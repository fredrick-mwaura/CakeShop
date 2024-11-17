<?php

ob_start();
session_start();
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

include 'db.php';

if (!$conn) {
    error_log("Failed to connect to database: " . mysqli_connect_error());
    $response = array('success' => false, 'message' => 'Database connection error');
    echo json_encode($response);
    exit;
}

$raw_data = file_get_contents("php://input");
error_log("Received data: $raw_data");

$data = json_decode($raw_data, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    $response = array('success' => false, 'message' => 'Invalid JSON format: ' . json_last_error_msg());
    echo json_encode($response);
    exit;
}

if (!isset($data['Username']) || !isset($data['password'])) {
    $response = array('success' => false, 'message' => "Username or password is missing");
    echo json_encode($response);
    exit;
}

$Username = trim($data['Username']);
$password = trim($data['password']);

$stmt = $conn->prepare("SELECT Username, PasswordHash, Role FROM Login WHERE Username = ?");
if ($stmt === false) {
    error_log("Failed to prepare SQL statement: " . $conn->error);
    $response = array('success' => false, 'message' => 'Failed to prepare SQL statement');
    echo json_encode($response);
    exit;
}

$stmt->bind_param("s", $Username);
$stmt->execute();
$result = $stmt->get_result();

if ($result && $result->num_rows > 0) {
    $user = $result->fetch_assoc();
    error_log("User found: " . print_r($user, true));

    $hashedPassword = hash('sha256', $password);

    if ($hashedPassword === $user['PasswordHash']) {
        $response['success'] = true;
        $response['message'] = "Login successful";
        $response['role'] = $user['Role'];
    } else {
        http_response_code(401);
        $response['success'] = false;
        $response['message'] = "Incorrect password";
    }
} else {
    error_log("No user found with username: $Username");
    http_response_code(404);
    $response['success'] = false;
    $response['message'] = "User not found";
}

$stmt->close();

echo json_encode($response);
$conn->close();
