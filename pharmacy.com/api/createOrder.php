<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
require __DIR__ . '/../vendor/autoload.php';
require_once "connection.php";

$token = $_POST['token'];
try{
    $decoded = (array)JWT::decode($token, new Key('4jApN2pmYp9m8K2N6uOss9xo2wuXWMyB', 'HS256'));
    $userId = (int)((array)($decoded['userId']))['id'];
    $medId = (int)$_POST['medId'];
    $medCount = (int)$_POST['medCount'];

    $query = "INSERT INTO `orders`(`user_id`, `med_id`, `med_count`) VALUES ('$userId','$medId','$medCount')";
    $res = mysqli_query($link, $query);
} catch(Exception $error){
    echo $error;
}