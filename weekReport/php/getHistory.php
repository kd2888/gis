<?php
$items = file_get_contents('php://input');
$items=urldecode($items);
parse_str($items, $ar);
$item =$ar["items"];
//print_r($item);
$date= time();
$time=$item["time"];
if($time>$date){
    $time=$date;
}
$servername = "118.89.113.149";
$username = "root";
$password = "123456";
$dbname = "mysql";

$newd="select itemId,date from workviewhistory where date <=$time";
$sqlSelect="select * from workviewhistory where itemId+date in(select itemId+max(date) from workviewhistory where date <=$time  GROUP by itemId ) order by workId,contentId ";

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