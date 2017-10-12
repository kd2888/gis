//添加点
function addMarker(point, type, map, i) {
    if (type == "car") {
        var myIcon = icons.car
        var label = new BMap.Label("粤A31002" + i, {offset: new BMap.Size(-15, -30)});
    } else if (type == "installation") {
        var myIcon = icons.wc;
        var label = new BMap.Label("厕所" + i, {offset: new BMap.Size(0, -30)});
    } else if (type == "people") {
        var myIcon = icons.people;
        var label = new BMap.Label("清洁员" + i, {offset: new BMap.Size(-15, -30)});
    } else if (type == "events") {
        var label = new BMap.Label("事件" + i, {offset: new BMap.Size(-10, -30)});
    }

    label.setStyle({                                   //给label设置样式，任意的CSS都是可以的
        maxWidth: "none",
        padding: "4px 8px",
        backgroundColor: "rgba(0,0,0,0.7)",
        color: "#fff",
        borderRadius: "3px"
    });
    var marker = new BMap.Marker(point, {icon: myIcon});
    marker.setLabel(label);
    marker.addEventListener("click", function (e) {
        attributeEvents(e, map)
    });
    map.addOverlay(marker);
}

// 编写事件点击定义,创建标注
function ComplexCustomOverlay(point, id,type) {
    this._point = point;
    this._id = id;
    this._type=type;

}

ComplexCustomOverlay.prototype = new BMap.Overlay();
ComplexCustomOverlay.prototype.initialize = function (map) {
    this._map = map;
    var div = this._div = document.createElement("div");
    div.className = "test";
    // div.id="sDASDAD"
    div.style.position = "absolute";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.innerHTML = addEverntsWindow(this._id,this._type)
    div.onclick = myfn;
    map.getPanes().labelPane.appendChild(div);
    initaddEverntsWindowClick(this._id)
    return div;
}
ComplexCustomOverlay.prototype.draw = function () {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    // this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
    // this._div.style.top  = pixel.y - 30 + "px";
    this._div.style.left = pixel.x - 30 + "px";
    this._div.style.top = pixel.y - 30 + "px";
}
//market点击事件
function attributeEvents(e, map, id,type) {
    var point = e.target.getPosition()
    var myCompOverlay = new ComplexCustomOverlay(point, id,type);
    map.addOverlay(myCompOverlay);
}
//构造弹窗
function addEverntsWindow(id,type) {
    var flag=true;
    for(var i=0;i<searchRoutes.length;i++){
        if(id==searchRoutes[i].id){
            flag=false;
        }
    }
    var html = '';
    html += '<div class="modal-dialog OverlayModal  eventsOverlay" role="document" style="display: block;;width: 400px">';
    html += '    <div class="modal-content">';
    html += ' <div class="modal-header">';
    html += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    html += '<h5 class="modal-title">上报信息</h5>';
    html += '</div>';
    html += '<div class="modal-body clearfix" >';
    html += '<div class="form-group col-sm-12">';
    html += '<div class="col-sm-6">';
    html += '<span class="OverlayModal-title">编号：</span>';
    if (id) {
        html += '<span class="OverlayModal-body">' + id + '</span>';

    } else {
        html += '<span class="OverlayModal-body">3123123123</span>';
    }

    html += '</div>';
    html += '<div class="col-sm-6">';
    html += '<span class="OverlayModal-title">处理状态：</span>';
    html += '<span class="OverlayModal-body">已完成</span>';
    html += '</div>';
    html += '</div>';
    html += '<div class="form-group col-sm-12">';
    html += '<div class="col-sm-12">';
    html += '<span class="OverlayModal-title">责修单位：</span>';
    html += '<span class="OverlayModal-body">第一装修队</span>';
    html += '</div>';
    html += '</div>';
    html += '<div class="form-group col-sm-12">';
    html += '<div class="col-sm-6">';
    html += '<span class="OverlayModal-title">责任人：</span>';
    html += '<span class="OverlayModal-body">李二</span>';
    html += '</div>';
    html += '<div class="col-sm-6">';
    html += '<span class="OverlayModal-title">电话：</span>';
    html += '<span class="OverlayModal-body">13920873456</span>';
    html += '</div>';
    html += '</div>';
    html += '<div class="form-group col-sm-12">';
    html += '<div class="col-sm-12">';
    html += '广州市天河珠江新城';
    html += '</div>';
    html += '</div>';
    html += ' <div class="form-group col-sm-12" style="padding: 20px 40px">';
    html += '<div class="progressPoint">';
    html += '<div class="pointItem" style="left: -10px">';
    html += '<span class="pointItem-top">上传</span>';
    html += '<span class="pointItem-bottom">12:00</span>';
    html += ' </div>';
    html += '<div class="pointItem" style="left: 46%">';
    html += '   <span class="pointItem-top">上传</span>';
    html += '  <span class="pointItem-bottom">12:00</span>';
    html += ' </div>';
    html += ' <div class="pointItem" style="right: -10px">';
    html += '<span class="pointItem-top">上传</span>';
    html += '<span class="pointItem-bottom">12:00</span>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += ' <div class="form-group col-sm-12" >';
    html += '<table class="delTable">';
    html += '<tr>';
    html += '<td class="back-title" width="10%" >处理前</td>';
    html += '<td class="back-img" width="40%"><img src="" ></td>';
    html += '<td class="back-title" width="10%" >处理后</td>';
    html += '<td class="back-img" width="40%"><img src="" ></td>';
    html += '</tr>';
    html += '</table>';
    html += '</div>';
    if(type=="people"||type=="car"){
    html += '<div class="form-group col-sm-12">'
        if(flag){
            html += ' 轨迹：<div class="switchCheck"> <div class="switchCheck-btn showTack" data-id="' + id + '" data-type="' + type + '"></div><div class="switchCheck-shadow"></div>'
            html += '</div>'
            html += '<span class="showBack-box " style="display: none">回放：<div class="switchCheck">'
        }else{
            html += ' 轨迹：<div class="switchCheck"> <div class="switchCheck-btn showTack open" data-id="' + id + '" data-type="' + type + '" style="left: 20px"></div><div class="switchCheck-shadow" style="width: 0px"></div>'
            html += '</div>'
            html += '<span class="showBack-box ">回放：<div class="switchCheck">'
        }

    html += ' <div class="switchCheck-btn showBack" data-id="' + id + '"  data-type="' + type + '"></div>';
    html += ' <div class="switchCheck-shadow"></div>';
    html += ' </div></span>';



    html += '</div>';
    }
    html += '</div>';
    html += '</div>';
    html += '</div>';
    return html;
}
//初始化弹窗事件
function initaddEverntsWindowClick() {

    $(".OverlayModal .close").unbind("click").bind("click", function () {
        $(this).parents(".OverlayModal").parent().remove()
    })
    $(".OverlayModal .switchCheck-btn").unbind("click").bind("click", function () {
        if($(this).hasClass("open")){
            $(this).removeClass("open")
            $(this).parent().find(".switchCheck-shadow").stop().animate({"width":"40px"},200)
            $(this).stop().animate({"left":"-1px"},200)
        }else{
            $(this).addClass("open")
            $(this).parent().find(".switchCheck-shadow").stop().animate({"width":"0px"},200)
            $(this).stop().animate({"left":"20px"},200)
        }
       if($(this).hasClass("showTack")){
           var id=$(this).attr("data-id");
           var type=$(this).attr("data-type");
           if($(this).hasClass("open")){
               var star,end
               for(var i=0;i<pointFact[type].length;i++){
                   console.log(pointFact[type][i].id)
                   if(id==pointFact[type][i].id){
                       end=pointFact[type][i]
                   }
               }
               for(var i=0;i<pointStar[type].length;i++){
                   if(id==pointStar[type][i].id){
                       star=pointStar[type][i]
                   }
               }
               //$(this).parents(".OverlayModal").parent().remove()
               drawTrack(map, star, end, type)
               $(".showBack-box").show()
           }else{
               $(".showBack-box").hide()
               delRouteSolo(map,id)
           }
       }
       if($(this).hasClass("showBack")){
           if($(this).hasClass("open")){
               var id=$(this).attr("data-id");
               var type=$(this).attr("data-type");
               var backPoints,backMarket;
               for(var i=0;i<searchRoutes.length;i++){
                   if(id==searchRoutes[i].id){
                       backPoints=searchRoutes[i].pts
                   }
               }
               for(var i=0;i<marketFact[type].length;i++){
                   if(id==marketFact[type][i].id){
                       backMarket=marketFact[type][i].marker
                   }
               }
               $(this).parents(".OverlayModal").parent().remove()
               runTrack(backPoints,backMarket,5000)
           }else{

           }

       }
    })
}

//阻止冒泡
function myfn(e) {
    var evt = e ? e : window.event;
    if (evt.stopPropagation) {
//W3C
        evt.stopPropagation();
    }
    else {
//IE
        evt.cancelBubble = true;
    }
}

//添加轨迹
function drawTrack(map, star, end, type) {
    if (type == "people") {
        var walking = new BMap.WalkingRoute(map, {
            renderOptions: {map: map, autoViewport: false}, onPolylinesSet: function (routes) {
                var searchRoute = routes[0].getPolyline();//导航路线
                var pts=routes[0].getPath();
                map.addOverlay(searchRoute);
                searchRoutes.push({"searchRoute": searchRoute, "id": end.id,"pts":pts})
            },
            onMarkersSet: function (routes) {
                map.removeOverlay(routes[0].marker); //删除起点
                map.removeOverlay(routes[1].marker);//删除终点
            },
        });    //步行实例
        walking.search(new BMap.Point(star.lng, star.lat), new BMap.Point(end.lng, end.lat));
    } else {
        var driving = new BMap.DrivingRoute(map, {
            renderOptions: {map: map, autoViewport: false}, onPolylinesSet: function (routes) {
                var searchRoute = routes[0].getPolyline();//导航路线
                var pts=routes[0].getPath()
                map.addOverlay(searchRoute);
                searchRoutes.push({"searchRoute": searchRoute, "id": end.id,"pts":pts})
            },
            onMarkersSet: function (routes) {
                map.removeOverlay(routes[0].marker); //删除起点
                map.removeOverlay(routes[1].marker);//删除终点
            },
        });    //步行实例
        driving.search(new BMap.Point(star.lng, star.lat), new BMap.Point(end.lng, end.lat));
    }

}
//删除所有轨迹
function delRoute(map) {
    for (var i = 0; i < searchRoutes.length; i++) {
        map.removeOverlay(searchRoutes[i].searchRoute);
    }
    searchRoutes = []
}
//删除对应的轨迹
function delRouteSolo(map,id) {
    for (var i = 0; i < searchRoutes.length; i++) {
        if(id==searchRoutes[i].id){
            map.removeOverlay(searchRoutes[i].searchRoute);
            searchRoutes.splice(i, 1);
        }

    }
}

function delOver(map, obj) {
    if (Array.isArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
            obj[i].enableMassClear();
            map.removeOverlay(obj[i]);
        }
    } else {
        map.removeOverlay(obj);
    }

    searchRoutes = []
}

//自定义标签
function lableOverlay(point, id, name) {
    this._point = point;
    this._id = id;
    this._name = name;

}

lableOverlay.prototype = new BMap.Overlay();
lableOverlay.prototype.initialize = function (map) {
    this._map = map;
    var div = this._div = document.createElement("div");
    div.className = "lableOverlay";
    // div.id="sDASDAD"
    div.style.position = "absolute";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    var html = '<span class="lableOverlay－lable">' + this._name + ' </span>';
    div.innerHTML = html
    div.onclick = myfn;
    map.getPanes().labelPane.appendChild(div);
    return div;
}
lableOverlay.prototype.draw = function () {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    // this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
    // this._div.style.top  = pixel.y - 30 + "px";
    this._div.style.left = pixel.x - 30 + "px";
    this._div.style.top = pixel.y - 30 + "px";
}
function runTrack(points,market,time) {
    var onceTime=time/(points.length);
    var i=0;
    var go=setInterval(function () {
        if(i<points.length){
            market.setPosition(points[i]);
            i++
        }else{
            clearInterval(go);
        }
    },onceTime)

}
