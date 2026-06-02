<?php
session_start();

// If user not logged in → redirect to login page
if (!isset($_SESSION['auth']) || $_SESSION['auth'] !== true) {
    header("Location: login.html");
    exit();
}
?>
