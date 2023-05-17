<?php

require_once "connection.php";

$query = "SELECT meds.id, meds.title, categories.name AS cat_name, img, price FROM `meds`, `categories` WHERE meds.category_id = categories.id ORDER BY `meds`.`id` ASC;";

$res = $link->query($query);

for ($data = []; $row = mysqli_fetch_assoc($res); $data[] = $row);
echo json_encode($data);