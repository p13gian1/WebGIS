var x1,y1,x2,y2,x3,y3,x4,y4,x5,y5,x6,y6,x7,y7,elemWidthAIP,elemWidthFLP,elemWidthStripBay,elemWidthLoadFPL,elemWidthSaveFPL,elemWidthNotam,elemWidthImage;
var mouseIsPressed=false;

$(document).mousedown(function(){
    mouseIsPressed = true;        
});

$(document).mouseup(function(){  
    mouseIsPressed = false; 
});

$(".aip-info").mousemove(function(e){
    if (mouseIsPressed){
        $(this).css("cursor","move");
        x1 = e.clientX; 
        y1 = e.clientY;
        x2 =parseInt($(".aip-info").css("left")); 
        elemWidthAIP=$(".aip-info").css("width");          
        $(this).css("left",(x1-parseFloat(elemWidthAIP)/2)+"px");
        $(this).css("top",(y1-25)+"px");
        $(".aip-info-margin").css("left",(x1-10-parseFloat(elemWidthAIP)/2)+"px");
        $(".aip-info-margin").css("top",(y1-35)+"px");
    }   
})

var flpHeaderIsPressed=false;
var stripBayHeaderIsPressed=false;
var loadFPLHeaderIsPressed=false;
var saveFPLHeaderIsPressed=false;
var notamHeaderIsPressed=false;
var imageHeaderIsPressed=false;

$(".move").mouseover(function(e){
    $(this).css("cursor","move");
})

$(".move").mousedown(function(e){      
        flpHeaderIsPressed=true;
        stripBayHeaderIsPressed=true;
        loadFPLHeaderIsPressed=true;
        saveFPLHeaderIsPressed=true;
        notamHeaderIsPressed=true;
        imageHeaderIsPressed=true;
})

$(".move").mouseup(function(e){  
        flpHeaderIsPressed=false;
        stripBayHeaderIsPressed=false;
        loadFPLHeaderIsPressed=false;
        saveFPLHeaderIsPressed=false;
        notamHeaderIsPressed=false;
        imageHeaderIsPressed=false;
})
     
$(".fpl-form").mousemove(function(e){
        if (mouseIsPressed && flpHeaderIsPressed==true){
            x2 = e.clientX; 
            y2 = e.clientY;
            elemWidthFLP=$(".fpl-form").css("width");          
            $(this).css("left",(x2-parseFloat(elemWidthFLP)/2)+"px");
            $(this).css("top",(y2-20)+"px");
            $(".fpl-form-margin").css("left",(x2-parseFloat(elemWidthFLP)/2)-5+"px");
            $(".fpl-form-margin").css("top",(y2-25)+"px");
        }     
})
 
$(".strip-bay-form").mousemove(function(e){
        if (mouseIsPressed && stripBayHeaderIsPressed==true){
            x3 = e.clientX; 
            y3 = e.clientY;
            elemWidthStripBay=$(".strip-bay-form").css("width");             
            $(this).css("left",(x3-parseFloat(elemWidthStripBay)/2)+"px");
            $(this).css("top",(y3-20)+"px");  
            $(".strip-bay-form-margin").css("left",(x3-parseFloat(elemWidthStripBay)/2)-5+"px");
            $(".strip-bay-form-margin").css("top",(y3-25)+"px");  
        }     
})
    
$(".load-fpl-form").mousemove(function(e){
        if (mouseIsPressed && loadFPLHeaderIsPressed==true){
            x4 = e.clientX; 
            y4 = e.clientY;
            elemWidthLoadFPL=$(".load-fpl-form").css("width");           
            $(this).css("left",(x4-parseFloat(elemWidthLoadFPL)/2)+"px");
            $(this).css("top",(y4-20)+"px");
            $(".load-fpl-form-margin").css("left",(x4-parseFloat(elemWidthLoadFPL)/2)-5+"px");
            $(".load-fpl-form-margin").css("top",(y4-25)+"px");
                
        }     
})
                
$(".save-fpl-form").mousemove(function(e){
        if (mouseIsPressed && saveFPLHeaderIsPressed==true){
                x5 = e.clientX; 
                y5 = e.clientY;
                elemWidthSaveFPL=$(".save-fpl-form").css("width");             
                $(this).css("left",(x5-parseFloat(elemWidthSaveFPL)/2)+"px");
                $(this).css("top",(y5-20)+"px");  
                $(".save-fpl-form-margin").css("left",(x5-parseFloat(elemWidthSaveFPL)/2)-5+"px");
                $(".save-fpl-form-margin").css("top",(y5-25)+"px");
        }     
})
                
$(".notam-form").mousemove(function(e){
        if (mouseIsPressed && notamHeaderIsPressed==true){
                x6 = e.clientX; 
                y6 = e.clientY;  
                elemWidthNotam=$(".notam-form").css("width");             
                $(this).css("left",(x6-parseFloat(elemWidthNotam)/2)+"px");
                $(this).css("top",(y6-20)+"px");   
                $(".notam-form-margin").css("left",(x6-parseFloat(elemWidthNotam)/2)-5+"px");
                $(".notam-form-margin").css("top",(y6-25)+"px");
        }     
})
                    
$(".image-form").mousemove(function(e){
        if (mouseIsPressed && imageHeaderIsPressed==true){
                       
                x7 = e.clientX; 
                y7 = e.clientY;
                elemWidthImage=$(".image-form").css("width");             
                $(this).css("left",(x7-parseFloat(elemWidthImage)/2)+"px");
                $(this).css("top",(y7-20)+"px");   
                $(".image-form-margin").css("left",(x7-parseFloat(elemWidthImage)/2)-5+"px");
                $(".image-form-margin").css("top",(y7-25)+"px"); 
        }     
})                        