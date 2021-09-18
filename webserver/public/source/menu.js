reLoad=()=> {
               $('#main-page').show();   
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
                                          $('#head').show();
                                          $('#main-page').hide();
                                          document.getElementById("place-label").innerHTML = c;
                                          init(a,b,mapFlag);
}

function doSearch() {
                     return false;  
  }