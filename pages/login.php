<?php
session_start();

// Example static login (replace with DB later)
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if ($username === "admin" && $password === "1234") {
    $_SESSION['auth'] = true;

    // Redirect to dashboard
    header("Location: dashboard.php");
    exit();
} else {
    echo "Invalid Login";
}
?>
