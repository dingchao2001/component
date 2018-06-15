function newRange(inputRangeId,obj,color) {
    $('#'+ inputRangeId + '').css('background', 'linear-gradient(to right,'+ color + ', #ebeff4 ' + $('#'+ inputRangeId + '').val() + '%, #ebeff4)');
    $.fn.RangeSlider = function (cfg) {
        this.sliderCfg = {
            min: cfg && !isNaN(parseFloat(cfg.min)) ? Number(cfg.min) : null,
            max: cfg && !isNaN(parseFloat(cfg.max)) ? Number(cfg.max) : null,
            step: cfg && Number(cfg.step) ? cfg.step : 1,
            callback: cfg && cfg.callback ? cfg.callback : null
        }
        var $input = $(this);
        var min = this.sliderCfg.min;
        var max = this.sliderCfg.max;
        var step = this.sliderCfg.step;
        var callback = this.sliderCfg.callback;
        $input.attr('min', min).attr('max', max).attr('step', step);
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
    };
    $('#'+ inputRangeId + '').RangeSlider(obj);//#snrPollInterval为input的id名
}