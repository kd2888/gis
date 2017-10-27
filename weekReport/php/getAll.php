<?php

$servername = "118.89.113.149";
$username = "root";
$password = "123456";
$dbname = "mysql";
$sqlSelect="select *  from  workview  order by workId,contentId ";

try {
    $pdo = new PDO("mysql:host=".$servername.";dbname=mysql","root","123456");


    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->beginTransaction();
    $str=$pdo->query($sqlSelect);
    $returstr="";
    while($row=$str->fetch()){
        $row=json_encode($row);
        print_r($row);
        echo "&";
    }

} catch (PDOException $e) {
    echo "0";
    die ("Error!: " . $e->getMessage() . "<br/>");
}


?>