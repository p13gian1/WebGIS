function getUTCtime(){
var s;
var t = new Date();
  var h = callibrateZero(t.getUTCHours());
  var m = callibrateZero(t.getUTCMinutes());
  // console.log(h);
  // console.log(m);
  s = h.toString()  + m.toString();
  return s;
}

function callibrateZero(t){
  
  if (t < 10) {
    t = "0" + t;
  }
  return t;
}



function getUTCdateICAO(){
  var s;
  var t = new Date();
    var d = callibrateZero(t.getUTCDate());
    var m = callibrateZero(t.getUTCMonth()+1); //months are zero indexed!!  so I added 1  to months
    var y = t.getUTCFullYear();
    
    y=y.toString().substring(2,4);  // truncate years to get last two digits for ICAO format
    console.log( t.getUTCFullYear().toString().substring(2,4));
    
    // console.log(e.getMonth());
    // console.log(m);
    
    s = y.toString()  + (m).toString() + d.toString() ;   //months are zero indexed!!  so I added 1  to months
    return s; 


}