<?php
    
require_once "connection.php";

$login = $_POST['login'];
$pass = password_hash($_POST['password'], PASSWORD_DEFAULT);

$query = "INSERT INTO `user`(`login`, `password`) VALUES ('$login','$pass')";
$res = mysqli_query($link, $query);
    