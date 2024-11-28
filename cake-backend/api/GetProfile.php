<?php

session_start();
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept');
header('Content-Type: application/json');
header('Access-Control-Max-Age: 86400');

require_once "db.php";

function sendResponse($data, $httpCode) {
    http_response_code($httpCode);
    echo json_encode($data);
    exit;
}

// Session Timeout Handling
if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 1800)) {
    session_unset();
    session_destroy();
    sendResponse(["error" => "Session expired. Please log in again."], 401);
}
$_SESSION['LAST_ACTIVITY'] = time(); // Update session time

if (!isset($_SESSION['LoginID'])) {
    sendResponse(["error" => "User not logged in."], 401);
}

$loginID = filter_var($_SESSION['LoginID'], FILTER_SANITIZE_NUMBER_INT);

$query = "SELECT Username, email FROM Login WHERE LoginID = ?";
$stmt = $mysqli->prepare($query);

if (!$stmt) {
    sendResponse(["error" => "Failed to prepare query."], 500);
}

$stmt->bind_param("i", $loginID);

if (!$stmt->execute()) {
    sendResponse(["error" => "Failed to execute query."], 500);
}

$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    sendResponse($user, 200);
} else {
    sendResponse(["error" => "User not found."], 404);
}

$stmt->close();
$mysqli->close();
