var onWatchAerodromeLongitude=19.9122;  // coordinations of on watch aerodrome, by default is LGKR
var onWatchAerodromeLatitude=39.6019;  //
logArray=[];
log=(msg)=>{
            logArray.push(msg);
            document.getElementById('aftn-terminal').innerHTML=(logArray.join('\r<br>'));
}
   
logMessage=()=>{    
}