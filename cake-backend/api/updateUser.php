<?php
header('Access-Control-Allow-Origin: http://localhost:5173'); 
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS'); // Allow PUT instead of UPDATE
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

include 'db.php';

// Check if the request is a PUT request
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
    // Read and decode the raw POST data
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate the input
    if (!isset($data['id']) || !isset($data['username']) || !isset($data['email'])) {
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }

    $id = $data['id'];
    $username = $data['username'];
    $email = $data['email'];
    $password = isset($data['password']) ? $data['password'] : null;

    // Prepare update query
    if ($password) {
        // If password is provided, hash it
        $password = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $conn->prepare("UPDATE Login SET Username = ?, email = ?, password = ? WHERE LoginID = ?");
        $stmt->bind_param('sssi', $username, $email, $password, $id);
    } else {
        // If no password provided, update without it
        $stmt = $conn->prepare("UPDATE Login SET Username = ?, email = ? WHERE LoginID = ?");
        $stmt->bind_param('ssi', $username, $email, $id);
    }

    // Execute the query
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'User updated successfully']);
    } else {
        echo json_encode(['error' => 'Failed to update user']);
    }

    $stmt->close();
} else {
    // Handle non-PUT requests
    echo json_encode(['error' => 'Invalid request method']);
}

// Close the database connection
$conn->close();
exit;