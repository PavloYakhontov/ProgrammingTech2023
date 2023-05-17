<?php

const DB_HOST = 'localhost';
const DB_USER = 'root';
const DB_PASS = '';
const DB_NAME = 'pharmacy';

header("Access-Control-Allow-Origin: *");

$link = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);