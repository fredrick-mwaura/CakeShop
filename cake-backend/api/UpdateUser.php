<?php

session_start();
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
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

// Handle OPTIONS request for CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    sendResponse(null, 200);
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

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
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
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Retrieve the JSON payload from the request body
    $input = json_decode(file_get_contents("php://input"), true);
    $password = $input['password'];

    // Verify the password
    $query = "SELECT password FROM Login WHERE LoginID = ?";
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
        if (!password_verify($password, $user['password'])) {
            sendResponse(["error" => "Invalid password."], 401);
        }
    } else {
        sendResponse(["error" => "User not found."], 404);
    }

    // Proceed with the update
    if (isset($_FILES['profilePicture']) && $_FILES['profilePicture']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = __DIR__ . '/components/images/profile/';
        $fileName = basename($_FILES['profilePicture']['name']);
        $targetFilePath = $uploadDir . $fileName;

        // Ensure the directory exists
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        // Move the uploaded file to the server's directory
        if (move_uploaded_file($_FILES['profilePicture']['tmp_name'], $targetFilePath)) {
            $profilePicture = 'components/images/profile/' . $fileName;

            $name = $input['username'];
            $email = $input['email'];

            $query = "UPDATE Login SET Username = ?, email = ?, profile_picture = ? WHERE LoginID = ?";
            $stmt = $mysqli->prepare($query);

            if (!$stmt) {
                sendResponse(["error" => "Failed to prepare query."], 500);
            }

            $stmt->bind_param("ssssi", $name, $email,  $profilePiture, $loginID);

            if (!$stmt->execute()) {
                sendResponse(["error" => "Failed to execute query."], 500);
            }

            sendResponse(["success" => "Profile updated successfully."], 200);
        } else {
            sendResponse(["error" => "File upload failed."], 500);
        }
    } else {
        sendResponse(["error" => "No file uploaded."], 400);
    }
}

$mysqli->close();
