// $(".aip-info").css("left","800px");
var x1,y1,elemWidth;

var cntrlIsPressed=false;

$(document).keydown(function(event){
    if(event.which=="17")
        cntrlIsPressed = true;
});

$(document).keyup(function(){
    cntrlIsPressed = false;
});



$(".aip-info").mouseover(function(e){
   
    if (cntrlIsPressed){
  
    $(this).css("cursor","move");
    }
    else
    {{
        $(this).css("cursor","default");   
    }}
})
    

// $("js-map").mouseover(function(e){
   

  
//     $(this).css("cursor","default");
    
// })
 




    $(".aip-info").mousemove(function(e){
   

    if (cntrlIsPressed){
    $(this).css("cursor","move");
    x1 = e.clientX; 
    y1 = e.clientY; 
    elemWidth=$(".aip-info").css("width");
    
   
        
        
     $(this).css("left",(x1-parseFloat(elemWidth)/2)+"px");
     $(this).css("top",(y1-50)+"px");
    }







     
     
    
    })
     
 