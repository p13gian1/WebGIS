reLoad=()=> {
    //location.reload();
   
    //$('#head').hide();
    $('#main-page').show();
    // $('#id-speed').hide();
    $('#js-map').hide();
    $('#flight-plan').hide();
  
    
  }

menuClickFPL=()=>{
    document.getElementById("flight-plan").style.display = "block";
    $('#main-page').hide();
    $('#js-map').hide();
   }  

menuClickAFISAerodrome=(a,b,c,mapFlag)=>{
  document.getElementById("js-map").style.display="block";
  $('#flight-plan').hide();
  //$('#js-map').css('display','block');
  $('#head').show();
  $('#main-page').hide();
   document.getElementById("place-label").innerHTML = c;
   // document.getElementById("gapSpace").style.display="none";
   


    //console.log(a,b,c);

    // document.getElementById("id-speed").style.display="block";

    
   
    
    init(a,b,mapFlag);
}

function doSearch() {
    
        console.log('test');
    

        $()

    console.log(map1);
          
    
  return false;  
  }

