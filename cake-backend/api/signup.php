<?php


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle CORS preflight request
    header('Access-Control-Allow-Origin: http://localhost:5173'); 
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');
    http_response_code(204);
    exit;
}

// Set CORS headers for other requests
header('Access-Control-Allow-Origin: http://localhost:5173'); 
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// Include required files
require 'db.php';
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Read JSON data from frontend
$data = json_decode(file_get_contents("php://input"), true);

// Check if required fields are provided
if (empty($data['username']) || empty($data['email']) || empty($data['password']) || empty($data['Role'])) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

$username = $data['username'];
$email = $data['email'];
$password = $data['password'];
$role = $data['Role'];

// Database check for existing email
$stmt = $conn->prepare("SELECT * FROM Login WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Email already exists']);
    exit;
}

// Hash the password
$hashedPassword = hash('sha256', $password);

// Generate a unique token
$token = bin2hex(random_bytes(16));

// Insert into pending_users table
$stmt = $conn->prepare("INSERT INTO pending_users (username, email, password, role, token) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $username, $email, $hashedPassword, $role, $token);

if ($stmt->execute()) {
    // Send confirmation email
    if (sendConfirmationEmail($email, $username, $token)) {
        echo json_encode(['success' => true, 'message' => 'Registration successful. Please check your email.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to send email']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to register user']);
}

$stmt->close();
$conn->close();

// Function to send a confirmation email// Function to send a confirmation email using PHPMailer
function sendConfirmationEmail($email, $username, $token) {
    $mail = new PHPMailer(true);

    try {
        // SMTP server configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.example.com'; // Update with your SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'your-email@example.com'; // Update with your SMTP username
        $mail->Password = 'your-email-password';   // Update with your SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Sender and recipient settings
        $mail->setFrom('no-reply@example.com', 'CakeShop'); // Replace with your sender email and name
        $mail->addAddress($email); // Recipient's email

        // Email subject
        $mail->Subject = 'Verify Your Email Address - CakeShop';

        // Verification link
        $verificationLink = "http://localhost/cake-backend/api/verify.php?token=$token";

        // HTML email body
        $mail->isHTML(true);
        $mail->Body = "
        <html>
        <head>
            <style>
                .email-container {
                    font-family: Arial, sans-serif;
                    background-color: #f9f9f9;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    max-width: 600px;
                    margin: 0 auto;
                    color: #333;
                }
                .button {
                    background-color: #4CAF50;
                    color: white;
                    padding: 12px 20px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    border-radius: 5px;
                    margin: 20px 0;
                }
                .button:hover {
                    background-color: #45a049;
                }
                .footer {
                    margin-top: 30px;
                    font-size: 12px;
                    color: #888;
                }
            </style>
        </head>
        <body>
            <div class='email-container'>
                <h2>Welcome to CakeShop, $username!</h2>
                <p>Thank you for signing up. To complete your registration, please verify your email address by clicking the button below:</p>
                <a href='$verificationLink' class='button'>Verify Email</a>
                <p>If the button above doesn't work, copy and paste the following link into your web browser:</p>
                <p><a href='$verificationLink'>$verificationLink</a></p>
                <hr>
                <div class='footer'>
                    <p>If you did not sign up for this account, please ignore this email.</p>
                    <p>&copy; " . date('Y') . " CakeShop. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        ";

        // Send the email
        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log("Mailer Error: {$mail->ErrorInfo}");
        return false;
    }
}
