<?php
// Enable CORS 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Include your database connection file
include 'db.php';

// Get the raw POST data and decode it as an associative array
$data = json_decode(file_get_contents("php://input"), true);

// Initialize response array
$response = array();

// Validate the input data
if (isset($data['Username']) && isset($data['password'])) {
   $Username = $data['Username'];
   $password = $data['password'];

   // Prepare a statement to prevent SQL injection
   $stmt = $conn->prepare("SELECT * FROM Login WHERE Username = ?");
   $stmt->bind_param("s", $Username);
   $stmt->execute();
   $result = $stmt->get_result();

   // Check if user exists
   if ($result->num_rows > 0) {
      $user = $result->fetch_assoc();

      // Verify the password
      if (password_verify($password, $user['password'])) {
         $response['success'] = true;
         $response['message'] = "Login successful";

         // Optional: You can generate a token here for authentication
         // Example: $response['token'] = generateToken($user['id']);
      } else {
         $response['success'] = false;
         $response['message'] = "Incorrect password";
      }
   } else {
      $response['success'] = false;
      $response['message'] = "User not found";
   }

   // Close the prepared statement
   $stmt->close();
} else {
   $response['success'] = false;
   $response['message'] = "incorrect Username or password";
}

// Output the response as JSON
echo json_encode($response);

// Close the database connection
$conn->close();