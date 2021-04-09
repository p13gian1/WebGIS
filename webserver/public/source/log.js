logArray=[];

log=(msg)=>{

logArray.push(msg);
document.getElementById('flight-plan').innerHTML=(logArray.join('\r<br>'));
}
   
logMessage=()=>{    
}


