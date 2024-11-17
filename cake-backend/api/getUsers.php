<?php
// Allow CORS for your frontend
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept');
header('Content-Type: application/json');

// Include database connection
include 'db.php';

// Initialize an empty response array
$response = ['status' => 'success', 'data' => []];

// SQL query to select all records
$sql = "SELECT * FROM Login"; // Make sure 'Login' is your actual table name
$result = $conn->query($sql);

// Check if there are results and output data in JSON format
if ($result && $result->num_rows > 0) {
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row; // Add each row to the data array
    }
    $response['data'] = $data; // Update response with fetched data
}

// Encode response as JSON and send it
echo json_encode($response);

// Close connection
$conn->close();
exit;
