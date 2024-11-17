<?php
$conn = new mysqli("localhost", "root", "", "Cakes");

if ($conn->connect_error) {
   die("Connection failed: {$conn->connect_error}" );
}
