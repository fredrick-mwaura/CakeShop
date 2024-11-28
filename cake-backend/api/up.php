<?php
header("Content-Type: application/json");
include("db.php");

session_start(); // Assuming the user's session contains their LoginID
if (!isset($_SESSION['LoginID'])) {
    echo json_encode(["error" => "User not logged in."]);
    http_response_code(401);
    exit;
}

$loginID = $_SESSION['LoginID'];
$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['Username']) || empty($data['email'])) {
    echo json_encode(["error" => "Missing required fields."]);
    http_response_code(422);
    exit;
}

$username = $data['Username'];
$email = $data['email'];

$query = "UPDATE user SET Username = ?, email = ? WHERE LoginID = ?";
$stmt = $mysqli->prepare($query);
$stmt->bind_param("ssi", $username, $email, $loginID);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Profile updated successfully."]);
} else {
    echo json_encode(["error" => "Failed to update profile."]);
    http_response_code(500);
}

$stmt->close();
$mysqli->close();
