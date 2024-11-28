<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: http://localhost:5173'); 
    header('Access-Control-Allow-Methods: PUT, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');
    http_response_code(204);
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle CORS preflight request
    http_response_code(204);
    exit;
}
// Include required files
require '../api/db.php';

// Include database connection
// include 'db.php';

$rawInput = file_get_contents("php://input");
file_put_contents("debug_input.log", $rawInput);


// Function to sanitize input
function sanitize_input($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

// Parse JSON input
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->name) && !empty($data->phone) && !empty($data->location)) {
    // Sanitize inputs
    $name = sanitize_input($data->name);
    $phone = sanitize_input($data->phone);
    $location = sanitize_input($data->location);
    $street = sanitize_input($data->street);
    $house = sanitize_input($data->house);
    $email = filter_var(sanitize_input($data->email), FILTER_VALIDATE_EMAIL); // Validate email
    $date = sanitize_input($data->date);
    $instructions = sanitize_input($data->instructions);
    var_dump(sanitize_input($data->instructions));

    // Check if email is valid
    if ($email === false) {
        echo json_encode(['success' => false, 'message' => 'Invalid email format']);
        exit;
    }

    // Connect to the database
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die(json_encode(['success' => false, 'message' => 'Database connection failed']));
    }

    // Prepare the SQL statement
    $stmt = $conn->prepare(
        "INSERT INTO orders (name, phone, location, street, house, email, date, instructions) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    );
    
    if ($stmt === false) {
        die(json_encode(['success' => false, 'message' => 'Failed to prepare statement']));
    }

    // Bind parameters
    $stmt->bind_param("ssssssss", $name, $phone, $location, $street, $house, $email, $date, $instructions);

    // Execute the statement
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Order placed successfully']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to place order']);
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid input data']);
}
