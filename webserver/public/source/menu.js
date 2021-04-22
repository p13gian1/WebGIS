reLoad=()=> {
    //location.reload();
    //$('#head').hide();
    $('#main-page').show();
    // $('#id-speed').hide();
    $('#js-map').hide();
    $('#aftn-terminal').hide();
   }

menuClickAFTN=()=>{
    document.getElementById("aftn-terminal").style.display = "block";
    $('#main-page').hide();
    $('#js-map').hide();
    logMessage();
   }  

menuClickAFISAerodrome=(a,b,c,mapFlag)=>{
  document.getElementById("js-map").style.display="block";
  $('#aftn-terminal').hide();
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
        console.log(map1);
        return false;  
  }

