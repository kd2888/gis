<?php
//$item = $_POST['item'];
$servername = "118.89.113.149";
//$servername ="http://localhost";
$username = "root";
$password = "";
$dbname = "mysql";
$itemType=["itemName","leader","participant","taskName","progress","state","lastWeekWork","thisWeekWork","remark","resulrt","isImportant","date"];
// 创建连接
$pdo = new PDO("mysql:host=".$servername.";dbname=mysql","root","123456");
//$conn = new PDO($servername, $username, $password, $dbname);
// Check connection
//if ($conn->connect_error) {
//    die("连接失败: " . $conn->connect_error);
//}
$arrlength=count($itemType);
$updateMsg="";
$insertMsgName="itemId,";
$insertMsgValue="1,";
for($x=0;$x<$arrlength;$x++)
{
    if($x==($arrlength-1)){
        $updateMsg.=$itemType[$x]."=".$item[$itemType[$x]].",";
        $insertMsgName.=$itemType[$x].",";
        $insertMsgValue.=$item[$itemType[$x]].",";
    }else{
         $updateMsg.=$itemType[$x]."=".$item[$itemType[$x]];
        $insertMsgName.=$itemType[$x];
        $insertMsgValue.=$item[$itemType[$x]];
}
}
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

$sqlUpdate = "update workview ".$updateMsg." where itemId=".$item["itemId"];
$sqlInsert="INSERT INTO workview (".$insertMsgName.") VALUES (".$insertMsgValue.")";
if($item["type"]=="update"){
    $pdo->exec($sqlUpdate);
}else{
    $pdo->exec($sqlInsert);
}
if ($pdo->query($sqlInsert) === TRUE) {
    echo "新记录插入成功";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
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
$pdo=null
?>