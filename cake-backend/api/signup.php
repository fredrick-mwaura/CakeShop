<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

$name = $data->name;
$email = $data->email;
$password = password_hash($data->password, PASSWORD_BCRYPT);

$sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";

$response = array();

if ($conn->query($sql) === TRUE) {
   $response['success'] = true;
   $response['message'] = "User registered successfully";
} else {
   $response['success'] = false;
   $response['message'] = "Error: " . $conn->error;
}

echo json_encode($response);

$conn->close();