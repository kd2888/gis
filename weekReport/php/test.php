<!DOCTYPE html>
<html>
<body>

<h1>My first PHP page</h1>

<?php
//date_default_timezone_set('PRC');
$date= time();
echo $date;
//phpinfo();
?>
<div id="time"></div>
</body>
<script>
    function getNowFormatDate() {
        var date = Date.parse(new Date());

        return date;
    }
    var time=document.getElementById("time");
    time.innerHTML=getNowFormatDate();
</script>
</html>