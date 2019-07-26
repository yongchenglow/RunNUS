// JavaScript Document
$(document).ready(function () {
  var cursorX;
  var cursorY;
  if (window.Event) {
    document.captureEvents(Event.MOUSEMOVE);
  }
  document.onmousemove = getCursorXY;
});
var hover = 0;
var time;
var mapThis=function(){
  var tt;
  var errorBox;
  return{
    show:function(v){
      if (tt == null) {
        var pNode = v.parentNode;
        pText = $(v).html();
        tt = document.createElement('div');
        tt.style = "height = '300px' width = '225px'";
        $(tt).html('<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.78292287669!2d103.77236222243607!3d1.3053410973603996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1af575f7ff17%3A0x1056d4b4bd4641c8!2sUniversity+Town%2C+NUS!5e0!3m2!1sen!2ssg!4v1563886816880!5m2!1sen!2ssg" width="300" height="225" frameborder="0" style="border:1"></iframe>');
        $(tt).hover(function(){
          hover = 1;
          clearTimeout(time);
          console.log("mouse enter");
        }, function(){
          hover = 0;
          $(this).hide();
          console.log("mouseout of map");
        });
        document.body.appendChild(tt);
        $("#locationText").mouseleave(function(){
          time = setTimeout(function(){
            console.log(hover);
            if(hover == 0){
              $(tt).hide();
            }
          }, 1000);
        });
      }
      fromleft = cursorX;
      fromtop = cursorY;
      fromleft = fromleft;
      fromtop = fromtop - 250;
      tt.style.cssText = "position:absolute; left:" + fromleft + "px; top:" + fromtop + "px; z-index:999; display:block;";
      tt.style.display = 'block';
    },
 };
}();

function getCursorXY(e) {
cursorX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
cursorY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
 }
