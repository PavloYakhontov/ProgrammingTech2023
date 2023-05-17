<?php

use Firebase\JWT\JWT;
require __DIR__ . '/../vendor/autoload.php';
require_once "connection.php";

$login = $_POST['login'];
$pass = $_POST['password'];

$dbUserPass = mysqli_fetch_assoc(mysqli_query($link, "SELECT `password` FROM `user` WHERE user.login = '$login';"));
//mysqli_fetch_assoc($dbUserPass)["password"];
// $res = mysqli_query($link, $query);

if(is_null($dbUserPass) || !password_verify($pass, $dbUserPass['password'])){
    echo "Wrong login or pass";
}

else{
    $userId = mysqli_fetch_assoc(mysqli_query($link, "SELECT `id` FROM `user` WHERE user.login = '$login';"));

    $payload = [
        'userId' => $userId,
        'login' => $login
    ];

    $jwt = JWT::encode($payload, '4jApN2pmYp9m8K2N6uOss9xo2wuXWMyB', 'HS256');

    echo $jwt;
}