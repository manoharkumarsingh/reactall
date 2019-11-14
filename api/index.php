<?php
include_once 'dbclass.php';
include_once 'Curd.php';
/**Database Connection*/
$dbclass = new DBConnection();
$connection = $dbclass->getConnection();
$curd = new Curd($connection);/**Returning CREATE, READ, DELETE, UPDATE Operation */
/**Enabling Cors */
$curd->cors();
$requestedUrl = strtok($_SERVER["REQUEST_URI"],'?');
switch($requestedUrl)
{
    case '/framework/api/v1/auth':
        include_once 'v1/auth.php';
        break;
        
    default:
        header("HTTP/1.0 405 Not Found");
        break;
}
?>