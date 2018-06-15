function newRange(inputId,color) {
    $('#'+inputId+'').on('touchend',function (e) {
        var percentage =(e.originalEvent.changedTouches[0].clientX-$('#'+inputId+'')[0].offsetLeft-10)/(this.offsetWidth-20)*100
        if((percentage-parseInt(percentage))<0.5){
            var num = parseInt(percentage);
        }else{
            var num = Math.ceil(percentage);
        }
        if(this.offsetWidth - (e.originalEvent.changedTouches[0].clientX-$('#'+inputId+'')[0].offsetLeft)<10){
            return;
        }
        if(e.originalEvent.changedTouches[0].clientX-$('#'+ inputId +'')[0].offsetLeft<10){
            return;
        }
        if(this.id == 'trackId'){
            data = num;
        }
        if(this.id == 'trackId2'){
            data2 = num;
        }
        $('#'+ inputId +' div span').css('left',''+(e.originalEvent.changedTouches[0].clientX-$('#'+inputId+'')[0].offsetLeft-10)+'px')
        $('#'+ inputId +' div').css('background', 'linear-gradient(to right, ' + color + ', #ebeff4 ' + num + '%, #ebeff4)');
    })

    $('#'+ inputId +'').on('touchmove',function (e){
        if(this.offsetWidth - (e.touches[0].clientX-$('#'+inputId+'')[0].offsetLeft)<10){
            return;
        }
        if(e.touches[0].clientX-$('#' + inputId +'')[0].offsetLeft<10){
            return;
        }
        var percentage = (e.touches[0].clientX-$('#'+ inputId +'')[0].offsetLeft-10)/(this.offsetWidth-20)*100;
        if((percentage-parseInt(percentage))<0.5){
            var num = parseInt(percentage);
        }else{
            var num = Math.ceil(percentage);
        }
        if(this.id == 'trackId'){
            data = num;
        }
        if(this.id == 'trackId2'){
            data2 = num;
        }
        $('#'+ inputId +' div span').css('left',''+(e.touches[0].clientX-$('#'+ inputId + '')[0].offsetLeft-10)+'px')
        $('#'+ inputId +' div').css('background', 'linear-gradient(to right, '+ color + ', #ebeff4 ' + num + '%, #ebeff4)');
    })
}