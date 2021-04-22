// $(".aip-info").css("left","800px");
var x1,y1,elemWidth;
var mouseIsPressed=false;

$(document).mousedown(function(){
        mouseIsPressed = true;
});

$(document).mouseup(function(){
    mouseIsPressed = false;
});


// $("js-map").mouseover(function(e){   
//     $(this).css("cursor","default");    
// })
    $(".aip-info").mousemove(function(e){
    if (mouseIsPressed){
    $(this).css("cursor","move");
    x1 = e.clientX; 
    y1 = e.clientY; 
    elemWidth=$(".aip-info").css("width");          
        
     $(this).css("left",(x1-parseFloat(elemWidth)/2)+"px");
     $(this).css("top",(y1-50)+"px");
    }   
    })
     
 