logArray=[];

log=(msg)=>{

logArray.push(msg);
document.getElementById('aftn-terminal').innerHTML=(logArray.join('\r<br>'));
}
   
logMessage=()=>{    
}

