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

$insertMsgName="";$insertMsgValue="";
$arrlength=count($item);
//print_r($arrlength);
$num=0;
foreach($item as $x=>$x_value)
{
    $val="'".$x_value."'";
    $num=$num+1;
    if($num!=$arrlength){
        $insertMsgName.=$x.",";
        $insertMsgValue.=$val.",";
    }else{
        $insertMsgName.=$x;
        $insertMsgValue.=$val;
    }
}
$sqlInsert="insert into workview (".$insertMsgName.") values (".$insertMsgValue.")";
//echo $sqlInsert.'<br>';


try {
    $pdo = new PDO("mysql:host=".$servername.";dbname=mysql","root","123456");
    // echo "连接成功<br/>";

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->beginTransaction();
    $str=$pdo->query($sqlInsert);
    echo "1";
    inHistory($item["itemId"],$pdo,$itemType);
    $pdo->commit();
    $pdo=null;
} catch (PDOException $e) {
    echo "0";
    die ("Error!: " . $e->getMessage() . "<br/>");
}


//$result = $conn->query($sql);
//
//if ($result->num_rows > 0) {
//    // 输出数据
//    while($row = $result->fetch_assoc()) {
//        echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
//    }
//} else {
//    echo "0 结果";
//}
//$conn->close();
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