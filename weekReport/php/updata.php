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
$itemType=["itemId","itemName","contentId","contentName","workId","workName","leaderId","leader","participant","taskName","progress","state","lastWeekWork","thisWeekWork","remark","resulrt","isImportant"];
//$itemType=["itemId","itemName","contentId","contentName","workId","workName"];
// 创建连接

$updateMsg="";
$arrlength=count($item);
//print_r($arrlength);
$num=0;
foreach($item as $x=>$x_value)
{
     $val="'".$x_value."'";
    $num=$num+1;
    if($num!=$arrlength){
        $updateMsg.=$x."=".$val.",";
    }else{
        $updateMsg.=$x."=".$val;
    }
}
$id="'".$item['itemId']."'";
$sqlInsert="update workview   set  ".$updateMsg." where itemId=".$id;
//echo $sqlInsert.'<br>';


try {
    $pdo = new PDO("mysql:host=".$servername.";dbname=mysql","root","123456");


    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->beginTransaction();
    $str=$pdo->query($sqlInsert);
    echo "1";
    inHistory($id,$pdo,$itemType);
    $pdo->commit();
    $pdo=null;
} catch (PDOException $e) {
    echo "0";
    die ("Error!: " . $e->getMessage() . "<br/>");
}
function inHistory($a,$p,$itemType){
    $date=time();
    $historySelect="select * from workview    where itemId=".$a;
    $strH=$p->query($historySelect);
    $insertMsgName="";$insertMsgValue="";
    while($row=$strH->fetch()){
        foreach($itemType as $x)
        {
                 $val="'".$row[$x]."'";
                $insertMsgName.=$x.",";
                $insertMsgValue.=$val.",";

        }
        $insertMsgName.="date";
        $insertMsgValue.=$date;
    }
    $sqlInsert="insert into workviewhistory (".$insertMsgName.") values (".$insertMsgValue.")";
    $p->query($sqlInsert);
}


?>