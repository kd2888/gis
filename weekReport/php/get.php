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
$itemType=["itemId","itemName","contentId","contentName","workId","workName","leader","participant","taskName","progress","state","lastWeekWork","thisWeekWork","remark","resulrt","isImportant"];
$id="'".$item['itemId']."'";
$sqlSelect="select *  from  workview where itemId=".$id;

try {
    $pdo = new PDO("mysql:host=".$servername.";dbname=mysql","root","123456");


    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $pdo->beginTransaction();
    $str=$pdo->query($sqlSelect);
    $arrlength=count($itemType);
    //print_r($arrlength);
    $returstr="";
    while($row=$str->fetch()){

        $row=json_encode($row);
        print_r($row);
//        for($x=0;$x<$arrlength;$x++)
//        {
//            if($row[$itemType[$x]]&&$item[$itemType[$x]]!=""){
//                $val="'".$item[$itemType[$x]]."'";
//                if($x!=($arrlength-1)){
//                    $returstr.=$itemType[$x]."=".$row[$itemType[$x]].",";
//                }else{
//                    $returstr.=$itemType[$x]."=".$row[$itemType[$x]];
//                }
//            }
//
//        }
//        $returstr="{".$returstr."}";

    }

} catch (PDOException $e) {
    echo "0";
    die ("Error!: " . $e->getMessage() . "<br/>");
}
function decodeUnicode($str)
{
    return preg_replace_callback('/\\\\u([0-9a-f]{4})/i',
        create_function(
            '$matches',
            'return mb_convert_encoding(pack("H*", $matches[1]), "UTF-8", "UCS-2BE");'
        ),
        $str);
}

?>