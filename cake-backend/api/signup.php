<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Access-Control-Allow-Origin: http://localhost:5173'); 
header('Access-Control-Allow-Methods: PUT, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);  // No Content for OPTIONS requests
    exit;
}

// Include required files
require 'db.php';
require '../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
// use PHPMailer\PHPMailer\SMTP;

class UserRegistration {
    private $conn;
    private $stmt;
    private $username;
    private $email;
    private $password;
    private $token;

    public function __construct($conn, $data) {
        $this->conn = $conn;
        $this->username = $data['username'];
        $this->email = $data['email'];
        $this->password = $data['password'];
        $this->token = bin2hex(random_bytes(16));  // Generate a unique token
    }

    // Validate input data
    private function validateData(): bool {
        return !empty($this->username) && !empty($this->email) && !empty($this->password);
    }

    // Check if email already exists
    private function emailExists(): bool {
        $this->stmt = $this->conn->prepare("SELECT * FROM Login WHERE email = ?");
        $this->stmt->bind_param("s", $this->email);
        $this->stmt->execute();
        $result = $this->stmt->get_result();
        return $result->num_rows > 0;
    }

    // Hash the password
    private function hashPassword() {
        return hash('sha256', $this->password);
    }

    // Insert into the database
    private function insertUser() {
        $hashedPassword = $this->hashPassword();
        $this->stmt = $this->conn->prepare("INSERT INTO pending_users (username, email, password, token) VALUES (?, ?, ?, ?)");
        $this->stmt->bind_param("ssss", $this->username, $this->email, $hashedPassword, $this->token);
        return $this->stmt->execute();
    }

    // Send confirmation email
    private function sendConfirmationEmail() {
        $mail = new PHPMailer(true);

        try {
            //replace with actual data address
            $mail->isSMTP();
            $mail->Host = 'smtp.example.com'; 
            $mail->SMTPAuth = true;
            $mail->Username = 'your-email@example.com'; 
            $mail->Password = 'your-email-password';   
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port = 587;

            $mail->setFrom('no-reply@example.com', 'Pinkies'); 
            $mail->addAddress($this->email);

            $mail->Subject = 'Verify Your Email Address - Pinkies';
            $verificationLink = "http://localhost/cake-backend/api/verify.php?token={$this->token}";

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
                    <h2>Welcome to CakeShop, $this->username!</h2>
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

            $mail->send();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    // Process the user registration
    public function register() {
        if (!$this->validateData()) {
            echo json_encode(['success' => false, 'message' => 'All fields are required']);
            http_response_code(400);  // Bad Request
            $this->closeDbConnection();
            exit;
        }

        if ($this->emailExists()) {
            echo json_encode(['success' => false, 'message' => 'Email already exists']);
            http_response_code(400);  // Bad Request
            $this->closeDbConnection();
            exit;
        }

        if ($this->insertUser()) {
            if ($this->sendConfirmationEmail()) {
                echo json_encode(['success' => true, 'message' => 'Registration successful. Please check your email.']);
                http_response_code(201);  // Created
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to send email']);
                http_response_code(500);  // Internal Server Error
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to register user']);
            http_response_code(500);  // Internal Server Error
        }

        $this->closeDbConnection();
    }

    // Close the statement and connection
    private function closeDbConnection() {
        if ($this->stmt) {
            $this->stmt->close();
        }
        if ($this->conn) {
            $this->conn->close();
        }
    }
}

// Read JSON data from frontend
$data = json_decode(file_get_contents("php://input"), true);

// Initialize UserRegistration class and register the user
$userRegistration = new UserRegistration($conn, $data);
$userRegistration->register();
