<?php
header('Content-Type: application/json');

include 'db.php';

$email = $_GET['email'];

$stmt = $conn->prepare("DELETE FROM users WHERE email = ?");
$stmt->bind_param('s', $email);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'User deleted successfully']);
} else {
    echo json_encode(['error' => 'Failed to delete user']);
}

$stmt->close();
$conn->close();