var key=localStorage.getItem("key");
if(key!="1"){
    alert("请先登录")
    window.location.href="login.html";
}else{
    var localtiem=localStorage.getItem("date")
    var nowdate=Date.parse(new Date())
    if((nowdate-localtiem)>86400000){
        localStorage.removeItem("key");
        alert("登录时间过期，请重新登录")
        window.location.href="login.html";
    }
}
function newAlert(string,callback) {
    var html="";
    html+='<div class="modal  alertModal"  tabindex="-1" role="dialog" style="z-index: 1050">'
    html+=' <div class="modal-dialog" role="document">'
    html+='<div class="modal-content">'
    html+='  <div class="modal-header">'
    html+='    <button type="button" class="close closes"  aria-label="Close"><span aria-hidden="true">&times;</span></button>'
    html+='<h4 class="modal-title">提示</h4>'
    html+='</div>'
    html+='<div class="modal-body" >'
    html+='    <p>'+string+'</p>'
    html+='</div>'
    html+='<div class="modal-footer" style="border-top: 0">'
    html+='    <button type="button" class="btn btn-default closes" >取消</button>'
    html+='    <button type="button" class="btn btn-primary sure">确认</button>'
    html+='</div>'
    html+='</div><!-- /.modal-content -->'
    html+='</div><!-- /.modal-dialog -->'
    html+='</div><!-- /.modal -->'
    $("body").append(html)
    $('.alertModal').modal({backdrop: 'static'});
    $(".alertModal .sure").unbind("click");
    $(".alertModal .closes").unbind("click");


    $(".alertModal .sure").bind("click",function () {
        $(this).parents(".alertModal").modal("hide");
        $(".alertModal").remove();
        if(callback){
      callback()
        }
    })
    $(".alertModal .closes").click(function () {
        $(this).parents(".alertModal").modal("hide");
        $(".alertModal").remove();
    })

    $(".alertModal").modal("show")
}
function openLoad() {
    var html='<div class="loading" style="position: fixed; z-index: 100000;width: 100%;height: 100%;left: 0;top: 0;background: rgba(225,225,225,0.4);">'

    html+='<img src="img/loading.gif" style=" position: absolute;  display: block;  z-index: 100001;  left: 0;  top: 0;  right: 0;  bottom: 0;  margin: auto;"></div>'
    $("body").append(html)
}
function closeLoad() {
    $(".loading").remove()
}
window.onload=function () {
    $("#urerName").html("welcome&nbsp; "+localStorage.getItem("remark") )
    $("#loginOut").click(function () {
        newAlert("确认退出吗",function () {
            localStorage.removeItem("key");
            window.location.href="login.html";
        })
    })
    $("#changePaw").click(function () {
        var html=''
        html+='    <div class="changePawModal modal aria-hidden="true" " tabindex="-1" role="dialog">';
        html+='   <div class="modal-dialog" role="document">';
        html+='   <div class="modal-content" style="width: 600px">';
        html+='    <div class="modal-header">';
        html+='    <button type="button" class="close closes"  aria-label="Close"><span aria-hidden="true">&times;</span></button>';
        html+=' <h4 class="modal-title">修改密码</h4> </div>';
        html+='     <div class="modal-body clearfix"> <form class="form-horizontal"> <div class="form-group  ">';
        html+='     <label  class="col-sm-3 control-label">原始密码</label>';
        html+='     <div class="col-sm-8">';
        html+='    <input class="form-control oriPassword" name="oriPassword"  placeholder="请填写原始密码"> </div> </div>';
        html+='     <div class="form-group ">';
        html+='     <label  class="col-sm-3 control-label">新的密码</label>';
        html+='   <div class="col-sm-8">';
        html+='   <input class="form-control newPassword" name="newPassword" placeholder="请填写新的密码"> </div> </div>';
        html+='     <div class="form-group ">';
        html+='    <label  class="col-sm-3 control-label">重复密码</label>';
        html+='     <div class="col-sm-8">';
        html+='    <input class="form-control repPassword" name="repPassword"  placeholder="请填写重复密码">';
        html+='    </div> </div> </form> </div> <div class="modal-footer">';
        html+='    <button type="button" class="btn btn-default closes" >取消</button>';
        html+='    <button type="button" class="btn btn-primary changePasswordSure">确认</button> </div> </div> </div> </div>';
        $("body").append(html)
        $('.changePawModal').modal({backdrop: 'static'});
        $(".changePawModal .changePasswordSure").unbind("click");
        $(".changePawModal .closes").unbind("click");


        $(".changePawModal .changePasswordSure").bind("click",function () {

            var flag=1;
            var msg=""
            var items={}
            $(".changePawModal input").each(function () {
                items[$(this).attr("name")]=$(this).val()
                 if(($(this).val())==""&&(flag==1)){
                     flag=0;
                     msg=$(this).attr("placeholder")
                 }
            })
            if(flag==0){
                newAlert(msg)
                return
            }

            if(items.newPassword!=items.repPassword){
                newAlert("重复密码与新的密码不一致")
                return
            }
            console.log(items)
            items["name"]=localStorage.getItem("name")
            $.post("php/changePaw.php",{"items":items},function(result){
                console.log(result)
                if(result=="1"){
                    $(this).parents(".changePawModal").modal("hide");
                    $(".changePawModal").remove();
                    newAlert("修改成功")
                }else{
                    newAlert(result)
                }
            })

        })
        $(".changePawModal .closes").click(function () {
            $(this).parents(".alertModal").modal("hide");
            $(".changePawModal").remove();
        })

        $(".alertModal").modal("show")

    })
}
