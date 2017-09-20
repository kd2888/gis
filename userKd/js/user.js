//添加点
function addMarker(point,type,map){
    if(type=="car"){
        var myIcon = icons.car
    }else if(type=="wc"){
        var myIcon = icons.wc
    }else if(type=="people"){
        var myIcon = icons.people
    }

    var marker = new BMap.Marker(point,{icon:myIcon});
    map.addOverlay(marker);
}
// 编写自定义函数,创建标注
function ComplexCustomOverlay(point, text, mouseoverText){
    this._point = point;
    this._text = text;
    this._overText = mouseoverText;
}
ComplexCustomOverlay.prototype = new BMap.Overlay();
ComplexCustomOverlay.prototype.initialize = function(map){
    this._map = map;
    var div = this._div = document.createElement("div");
    div.style.position = "absolute";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.style.backgroundColor = "rgba(0,0,0,0.6)";
    div.style.border = "1px solid #000";
    div.style.color = "white";
    div.style.height = "24px";
    div.style.padding = "0 2px";
    div.style.lineHeight = "24px";
    div.style.whiteSpace = "nowrap";
    div.style.MozUserSelect = "none";
    div.style.fontSize = "12px"
    var span = this._span = document.createElement("span");
    div.appendChild(span);
    span.appendChild(document.createTextNode(this._text));
    var that = this;

    var arrow = this._arrow = document.createElement("div");
    arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
    arrow.style.position = "absolute";
    arrow.style.width = "11px";
    arrow.style.height = "10px";
    arrow.style.top = "22px";
    arrow.style.left = "10px";
    arrow.style.overflow = "hidden";
    // div.appendChild(arrow);

//            div.onmouseover = function(){
//                this.style.backgroundColor = "#6BADCA";
//                this.style.borderColor = "#0000ff";
//                this.getElementsByTagName("span")[0].innerHTML = that._overText;
//                arrow.style.backgroundPosition = "0px -20px";
//            }
//
//            div.onmouseout = function(){
//                this.style.backgroundColor = "#EE5D5B";
//                this.style.borderColor = "#BC3B3A";
//                this.getElementsByTagName("span")[0].innerHTML = that._text;
//                arrow.style.backgroundPosition = "0px 0px";
//            }
    div.onclick=function () {
        map.openInfoWindow(infoWindow,that._point); //开启信息窗口
        //图片加载完毕重绘infowindow
//                document.getElementById('imgDemo').onload = function (){
//                    infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
//                }
    }
    map.getPanes().labelPane.appendChild(div);

    return div;
}
ComplexCustomOverlay.prototype.draw = function(){
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
    this._div.style.top  = pixel.y - 30 + "px";
}