1.先在dome插入一个或多个如下容器，作为色盘的显示区域（需保证每个容器的ID唯一）
 <div class="colorPickDiv">
        <div class="childDiv">
            <canvas id="canvas">Your browser does not support canvas</canvas>
        </div>
        <div id="colorDiv" class="coloration"></div>
</div>
2.引入color.css，以统一样式.
3.引入color.js（注：因为本方法采用原生js的写法，无任何依赖包，所以必须在 1 后 dome结构之后引入），
4.首先定义一个或多个变量接受选择后的颜色值（如：吧、var rgb;）
5.在color.js中找到setColorValue方法，给4中定义的变量赋值
（需要rgb颜色值就替换formRgbColor(rgbObj)等号前的变量，
  需要十六进制颜色值就替换"#" + toHexString(rgbObj.r) + toHexString(rgbObj.g) + toHexString(rgbObj.b)等号前的变量等，
  其余不需要部分可以删除，赋值操作都需要放在if条件判断内，根据点击容器的ID给相应变量赋值；）

  //点击时获取点击处的颜色值
   function setColorValue(x, y, _self){//_self为当前被点击的容器
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
 6. 调用newColorDisc(inradius,containerId,colorationId)方法创建一个实例；
  注：inradius为色盘中心圆的半径，
      containerId是色盘所在的canvas容器的ID，
      colorationId是右上角显示选择颜色容器的ID。
