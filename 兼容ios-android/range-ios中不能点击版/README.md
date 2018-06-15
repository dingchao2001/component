
1.先在dome中插入一个多个如下HTML结构（请保持各容器ID不同）。
<div class="range">
    <span>亮度</span><input  id="snrPollInterval" type="range" min="1" max="100" value="60">
</div>
2.引入样式表range.css。（滑块颜色请自行设置::-webkit-slider-thumb）；
3.本组件依赖jquery，所以在使用之前请先引入jquery。
4.在dome结构之后引入range.js。
5.定义一个或多个变量接收组件改变后的值。（如 var data；)
6.定义一个或多个对象设置组件中需要用到的一些属性（如 var obj = { min: 0, max: 100, step: 1, callback: ''}）。
7.定义轨道所需的颜色（如 var color = "#ffbb05"。
8.调用 newRange(inputRangeId,obj,color)方法。
注：inputRangeId为input 的 ID；
    obj为一个对象设置组件中需要的一些属性（参考 6 ）；
    color 想要设置的轨道的颜色；
9.多个变量赋值请根据不同range 的ID 判断。
   $input.bind("input", function (e) {
              $input.attr('value', this.value);
              if(this.id == "snrPollInterval"){
                  data = this.value;
              }
              if(this.id == "snrPollInterval2"){
                  data2 = this.value;
              }
              $input.css('background', 'linear-gradient(to right,'+ color +', #ebeff4 ' + this.value + '%, #ebeff4)');
              if ($.isFunction(callback)) {
                  callback(this);
              }
          });

