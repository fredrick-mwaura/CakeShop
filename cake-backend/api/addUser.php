<?php
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, PUT, OPTIONS');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$email = $data['email'];
$role = $data['role'];
// $password = hash('sha256', $password);

// Check if email already exists
$checkEmail = $conn->prepare("SELECT id FROM Login WHERE email = ?");
$checkEmail->bind_param('s', $email);
$checkEmail->execute();
$checkEmail->store_result();

if ($checkEmail->num_rows > 0) {
    echo json_encode(['error' => 'Email already exists']);
    $checkEmail->close();
    $conn->close();
    exit();
}

$stmt = $conn->prepare("INSERT INTO Login (Username, email, Role) VALUES (?, ?, ?)");
$stmt->bind_param('sss', $username, $email, $role);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'User added successfully', 'id' => $stmt->insert_id]);
} else {
    echo json_encode(['error' => 'Failed to add user']);
}

$stmt->close();
$conn->close();