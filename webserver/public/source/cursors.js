// $(".aip-info").css("left","800px");
var x1,y1,x2,y2,x3,y3,x4,y4,elemWidthAIP,elemWidthFLP,elemWidthStripBase,elemWidthLoadFPL;
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
    x2 =parseInt($(".aip-info").css("left")); 
    elemWidthAIP=$(".aip-info").css("width");          
        // console.log('test');
     $(this).css("left",(x1-parseFloat(elemWidthAIP)/2)+"px");
     $(this).css("top",(y1-25)+"px");

     $(".aip-info-margin").css("left",(x1-10-parseFloat(elemWidthAIP)/2)+"px");
     $(".aip-info-margin").css("top",(y1-35)+"px");

    }   
    })




   var flpHeaderIsPressed=false;
   var stripBaseHeaderIsPressed=false;
   var loadFPLHeaderIsPressed=true;

   $(".move").mouseover(function(e){

   $(this).css("cursor","move");
   })

    $(".move").mousedown(function(e){
       
       
        flpHeaderIsPressed=true;
        stripBaseHeaderIsPressed=true;
        loadFPLHeaderIsPressed=true;
    })

    $(".move").mouseup(function(e){
        // console.log(2);
        
        flpHeaderIsPressed=false;
        stripBaseHeaderIsPressed=false;
        loadFPLHeaderIsPressed=false;
    })




     
    $(".fpl-form").mousemove(function(e){
        if (mouseIsPressed && flpHeaderIsPressed==true){
        // $(this).css("cursor","move");
        x2 = e.clientX; 
        y2 = e.clientY;
        // x2 =parseInt($(".fpl-form").css("left"));
        elemWidthFLP=$(".fpl-form").css("width");          
            
         $(this).css("left",(x2-parseFloat(elemWidthFLP)/2)+"px");
         $(this).css("top",(y2-20)+"px");
           
         $(".fpl-form-margin").css("left",(x2-parseFloat(elemWidthFLP)/2)-5+"px");
         $(".fpl-form-margin").css("top",(y2-25)+"px");
        
        }     
        })

 
    $(".strip-base-form").mousemove(function(e){
            if (mouseIsPressed && stripBaseHeaderIsPressed==true){
            // $(this).css("cursor","move");
            x3 = e.clientX; 
            y3 = e.clientY;
            // x2 =parseInt($(".fpl-form").css("left"));
            elemWidthStripBase=$(".strip-base-form").css("width");          
                
             $(this).css("left",(x3-parseFloat(elemWidthStripBase)/2)+"px");
             $(this).css("top",(y3-20)+"px");
               
             $(".strip-base-form-margin").css("left",(x3-parseFloat(elemWidthStripBase)/2)-5+"px");
             $(".strip-base-form-margin").css("top",(y3-25)+"px");
            
            }     
            })
    
    $(".load-fpl-form").mousemove(function(e){
                if (mouseIsPressed && loadFPLHeaderIsPressed==true){
                // $(this).css("cursor","move");
                x4 = e.clientX; 
                y4 = e.clientY;
                // x2 =parseInt($(".fpl-form").css("left"));
                elemWidthLoadFPL=$(".load-fpl-form").css("width");          
                    
                 $(this).css("left",(x4-parseFloat(elemWidthLoadFPL)/2)+"px");
                 $(this).css("top",(y4-20)+"px");
                   
                 $(".load-fpl-form-margin").css("left",(x4-parseFloat(elemWidthLoadFPL)/2)-5+"px");
                 $(".load-fpl-form-margin").css("top",(y4-25)+"px");
                
                }     
                })
                













          
    // $(".fpl-form-margin").mousemove(function(e){
    //     if (mouseIsPressed && testBut==true){
    //     // $(this).css("cursor","move");
    //     x1 = e.clientX; 
    //     y1 = e.clientY; 
    //     elemWidth=$(".fpl-form").css("width");          
         
    //     }   
    //     })