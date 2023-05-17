<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
require __DIR__ . '/../vendor/autoload.php';
require_once "connection.php";

$token = $_POST['token'];
try{
    $decoded = (array)JWT::decode($token, new Key('4jApN2pmYp9m8K2N6uOss9xo2wuXWMyB', 'HS256'));
    $userId = (int)((array)($decoded['userId']))['id'];
    
    $query = "SELECT `orders`.`id`, `meds`.`title`, `orders`.`med_count`, `meds`.`img`, `orders`.`date` FROM `orders`, `meds` WHERE `med_id` = `meds`.`id` AND `user_id` = '$userId' ORDER BY `orders`.`date` DESC";
    
    $res = $link->query($query);
    for ($data = []; $row = mysqli_fetch_assoc($res); $data[] = $row);
    echo json_encode($data);
} catch(Exception $error){
    echo $error;
}