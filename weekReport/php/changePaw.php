<?php

$items = file_get_contents('php://input');
$items = urldecode($items);
parse_str($items, $ar);
$item = $ar["items"];

$servername = "118.89.113.149";
$username = "root";
$password = "123456";
$dbname = "mysql";

// 创建连接


$name = $item["name"];
$oriPassword= $item["oriPassword"];
$newPassword = $item["newPassword"];
$sqlSelect = "select *  from  workuse where name=" . "'".$name."'";
$sqlInsert = "update workuse   set password=".$newPassword."  where name='".$name."'";


try {
    $pdo = new PDO("mysql:host=" . $servername . ";dbname=mysql", "root", "123456");
    // echo "连接成功<br/>";

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->beginTransaction();
    $result = $pdo->query($sqlSelect);
    if (($result->rowCount()) > 0) {
        // 输出数据
        while ($row = $result->fetch()) {
            if($row["password"]==$oriPassword){
                $pdo->query($sqlInsert);
                echo "1";
            }else{
                echo "原始密码不正确";
            }
        }
    } else {
        echo "用户信息出错";
    }

    $pdo->commit();
    $pdo = null;
} catch (PDOException $e) {
    echo "0";
    die ("Error!: " . $e->getMessage() . "<br/>");
}
function inHistory($p,$item){
    date_default_timezone_set('PRC');
    $date=time();
    $showtime="'".date("Y-m-d H:i:s")."'";
    $name="'".$item['name']."'";

    $insertMsgName="name,date,datestr";$insertMsgValue=$name.",".$date.",".$showtime;
    $sqlInsert="insert into usehistory (".$insertMsgName.") values (".$insertMsgValue.")";
    $p->query($sqlInsert);
}
?>