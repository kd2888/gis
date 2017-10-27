<?php

$items = file_get_contents('php://input');
$items=urldecode($items);
parse_str($items, $ar);
$item =$ar["items"];
//print_r($item) ;
$servername = "118.89.113.149";
$username = "root";
$password = "123456";
$dbname = "mysql";

$id="'".$item['itemId']."'";
$sqlInsert="delete from workview  where itemId=".$id;
//echo $sqlInsert.'<br>';


try {
    $pdo = new PDO("mysql:host=".$servername.";dbname=mysql","root","123456");


    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->beginTransaction();
    $str=$pdo->query($sqlInsert);
    echo "1";
    inHistory($id,$pdo);
    $pdo->commit();
    $pdo=null;
} catch (PDOException $e) {
    echo "0";
    die ("Error!: " . $e->getMessage() . "<br/>");
}
function inHistory($a,$p){
    $historySelect="delete from workviewhistory  where itemId=".$a;
  $p->query($historySelect);
}

?>