1.先在dome中插入一个多个如下HTML结构（请保持各容器ID不同）。
<div class="range">
    <span class="title">亮度</span>
    <div class="track" id="trackId">
        <div><span></span></div>
    </div>
</div>
2.引入样式表range.css。（滑块所需颜色自行设置 （Id名 div span)；
3.本组件依赖jquery，所以在使用之前请先引入jquery。
4.在dome结构之后引入range.js。
5.定义一个或多个变量接收组件改变后的值。（如 var data，data2；)
6.定义轨道所需的颜色（如 var color = "#ffbb05"。
7.调用 newRange(inputId,color)方法。
注：inputId 的 ID；
    color 想要设置的轨道的颜色；
9.多个变量赋值请根据不同的ID 判断。
 在touchend事件和touchmove事件中添加如下判断
  if(this.id == 'trackId'){
             data = num;
         }
  if(this.id == 'trackId2'){
      data2 = num;
         }