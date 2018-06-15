/**
 * Created by Administrator on 2018/6/7.
 */
function newColorDisc( inradius, containerId, colorationId) {
    window.devicePixelRatio = 1
    var c = document.getElementById(containerId);
    c.width = document.documentElement.clientWidth *0.7;
    c.height = document.documentElement.clientWidth*0.7;
     var ctx = c.getContext("2d");
     var colorDiv = document.getElementById(colorationId);
    //十字光标颜色
    var crossCursorColor = "black";
    //十字光标线宽
    var crossCursorLineWidth = 2;
    //十字光标某一边线段长
    var crossCursorHalfLineLen = 5;
    //十字光标中间断裂处长度
    var crossCursorHalfBreakLineLen = 2;

    //画布中心点X坐标
    var centerX = c.width / 2;
    //画布中心点Y坐标
    var centerY = c.height / 2;
    //缩放绘制比例
    var scaleRate = 10;
    //画布的内切圆半径(之所以减去一个数是为了可以显示完整的十字光标)
    var innerRadius = Math.min(centerX, centerY) - crossCursorHalfLineLen - crossCursorHalfBreakLineLen;
    //内切圆半径的平方
    var pow2InnerRadius = Math.pow(innerRadius, 2);
    //缩放绘制时的绘制半径，即画布的外径除以缩放比例
    var scaledRadius = Math.sqrt(Math.pow(c.width / 2, 2) + Math.pow(c.height / 2, 2)) / scaleRate;
    //由于该圆是由绕圆心的多条线段组成，该值表示将圆分割的份数
    var count = 360;
    //一整个圆的弧度值
    var doublePI = Math.PI * 2;
    //由于圆心处是多条线段的交汇点，Composite是source-over模式，所以后绘制的线段会覆盖前一个线段。另外由于采用线段模拟圆，英雌
    var deprecatedRadius = inradius;
    //废弃圆半径的平方
    var pow2DeprecatedRadius = Math.pow(deprecatedRadius, 2);

    //色相(0-360)
    var hue;
    //饱和度(0%-100%)
    var saturation;
    //亮度luminance或明度lightness(0%-100%)
    var luminance;

    //当前色相位置X坐标
    var currentHuePosX = centerX + innerRadius - 1;
    //当前色相位置Y坐标
    var currentHuePosY = centerY;

    //填充圆
    function fillCircle(cx, cy, r, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, doublePI);
        ctx.fill();
    }

    //绘制线条
    function strokeLine(x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    //将整数转为16进制，至少保留2位
    function toHexString(intValue) {
        var str = intValue.toString(16);
        if (str.length == 1) {
            str = "0" + str;
        }
        return str;
    }

    //判断坐标(x,y)是否在合法的区域内
    function isInValidRange(x, y) {
        var pow2Distance = Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2);
        return pow2Distance >= pow2DeprecatedRadius && pow2Distance <= pow2InnerRadius;
    }

    //绘制十字光标
    function strokeCrossCursor(x, y) {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeColor = crossCursorColor;
        ctx.lineWidth = crossCursorLineWidth;
        strokeLine(x, y - crossCursorHalfBreakLineLen, x, y - crossCursorHalfBreakLineLen - crossCursorHalfLineLen);
        strokeLine(x, y + crossCursorHalfBreakLineLen, x, y + crossCursorHalfBreakLineLen + crossCursorHalfLineLen);
        strokeLine(x - crossCursorHalfBreakLineLen, y, x - crossCursorHalfBreakLineLen - crossCursorHalfLineLen, y);
        strokeLine(x + crossCursorHalfBreakLineLen, y, x + crossCursorHalfBreakLineLen + crossCursorHalfLineLen, y);
    }

    //将对象中的hsl分量组成一个hsl颜色(h在0到360之间，s与l均在0到1之间)
    function formHslColor(obj) {
        return "hsl(" + obj.h + "," + Math.round(obj.s * 1000) / 10 + "%," + Math.round(obj.l * 1000) / 10 + "%)";
    }

    //将对象中的rgb分量组成一个rgb颜色(r,g,b在0到255之间)
    function formRgbColor(obj) {
        return "rgb(" + [obj.r, obj.g, obj.b].join(",") + ")";
    }

    //从画布的某点获取存储RGB的对象
    function getRgbObj(x, y) {
        var w = 1;
        var h = 1;
        var imgData = ctx.getImageData(x, y, w, h);
        var obj = {
            r: imgData.data[0],
            g: imgData.data[1],
            b: imgData.data[2],
            a: imgData.data[3]
        }
        return obj;
    }

    //将rgb转换为hsl对象()
    function rgbToHslObj(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var diff = max - min;
        var twoValue = max + min;
        var obj = {h: 0, s: 0, l: 0};
        if (max == min) {
            obj.h = 0;
        } else if (max == r && g >= b) {
            obj.h = 60 * (g - b) / diff;
        } else if (max == r && g < b) {
            obj.h = 60 * (g - b) / diff + 360;
        } else if (max == g) {
            obj.h = 60 * (b - r) / diff + 120;
        } else if (max == b) {
            obj.h = 60 * (r - g) / diff + 240;
        }
        obj.l = twoValue / 2;
        if (obj.l == 0 || max == min) {
            obj.s = 0;
        } else if (0 < obj.l && obj.l <= 0.5) {
            obj.s = diff / twoValue;
            //obj.s = diff / (2 * obj.l);
        } else {
            obj.s = diff / (2 - twoValue);
            //obj.s = diff / (2 - 2 * obj.l);
        }
        obj.h = Math.round(obj.h);
        return obj;
    }

    //创建Hue颜色圆环
    function createHueRing() {
        ctx.globalCompositeOperation = "source-over";
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.save();
        //将绘制原点移动到画布中心
        ctx.translate(centerX, centerY);
        //将画布放大相应比例，restore后，绘制内容会缩小
        ctx.scale(scaleRate, scaleRate);
        for (var i = 0; i < count; i++) {
            var degree = i / count * 360;
            var radian = Math.PI * degree / 180;
            var x = scaledRadius * Math.cos(radian);
            var y = scaledRadius * Math.sin(radian);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "hsl(" + degree + "," + saturation + "," + luminance + ")";
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(0, 0);
            ctx.stroke();
        }
        ctx.restore();
        ctx.globalCompositeOperation = "destination-out";
        fillCircle(centerX, centerY, deprecatedRadius, "black");

        ctx.globalCompositeOperation = "destination-in";
        fillCircle(centerX, centerY, innerRadius, "black");
    }

    //点击canvas中的Hue拾色圈
    function onCanvasClick() {
        var x = event.offsetX;
        var y = event.offsetY;
        var _seft = this
        if (!isInValidRange(x, y)) {
            return;
        }
        currentHuePosX = x;
        currentHuePosY = y;
        //创建hue背景圆环
        createHueRing();
        setColorValue(x, y , _seft);
        strokeCrossCursor(x, y);
    }

    //点击时获取点击处的颜色值
    function setColorValue(x, y, _seft){
        //获取包含rgb的颜色对象
        var rgbObj = getRgbObj(x, y);
        //rgb颜色值
        if(_seft != undefined){
            if(_seft.id == "canvas") {
                rgb =formRgbColor(rgbObj);
            }
            if(_seft.id == "canvas2") {
                rgb2 =formRgbColor(rgbObj);
            }
        }
        //设置右上角小圆圈的背景颜色
          colorDiv.style.backgroundColor = formRgbColor(rgbObj);

        //十六进制颜色值
        var hex = "#" + toHexString(rgbObj.r) + toHexString(rgbObj.g) + toHexString(rgbObj.b);

       //HSL颜色值
        var hslObj = rgbToHslObj(rgbObj.r, rgbObj.g, rgbObj.b);
    }

    function onHSLRangeChange() {
        //event.target.value;
        saturation = 100 + "%";
        luminance = 50 + "%";
        createHueRing();
        setColorValue(currentHuePosX, currentHuePosY)
        strokeCrossCursor(currentHuePosX, currentHuePosY);
    }
    function init(){
        c.addEventListener("click", onCanvasClick);
        onHSLRangeChange();
    }
    init();
}
