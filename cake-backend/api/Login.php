<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

$email = $data->email;
$password = $data->password;

$sql = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($sql);

$response = array();

if ($result->num_rows > 0) {
   $user = $result->fetch_assoc();
   if (password_verify($password, $user['password'])) {
      $response['success'] = true;
      $response['message'] = "Login successful";
      // Ideally, you would generate and return a token here
   } else {
      $response['success'] = false;
      $response['message'] = "Incorrect password";
   }
} else {
   $response['success'] = false;
   $response['message'] = "User not found";
}

echo json_encode($response);

$conn->close();