var fpl=document.getElementById('fpl');
var fplPathCoordinates=[];
var fplRouteCoordinates=[];
var fplDepartureAerodromeCoordinates=[];
var fplDestinationAerodromeCoordinates=[];
var routeArray=[];



var fplSource= new ol.source.Vector({});

var fplLayer=new ol.layer.Vector({
  title: 'FPL Route Layer',
  source: fplSource,
  style : new ol.style.Style({
           stroke : new ol.style.Stroke({
             width: 5,
             color : [255,132,0,1]})}),
             fill : new ol.style.Fill({        
             color : [255,132,0,1]  
             }),
  zindex:1
      });
var fplFeature;
fplFeature = new ol.Feature({
  geometry : new ol.geom.LineString(fplPathCoordinates)
});

fplSource.addFeature(fplFeature);
map.addLayer(fplLayer);



$(function() {
  $('.fpl-form :nth-child(n)').keyup(function() {    //convert all input elements to uppercase, no need to press caps lock
    if (this.value!=undefined){                     //because some input texts might be empty we read only those which are not empty
      this.value = this.value.toUpperCase();
    }
  });
});















// $('.fpl-form').change(function(){
// if (fpl.aircraftID.value=='SXAJT')
// {
    
//     fetch('http://localhost:3000/coordinates?q='+fpl.departureAerodrome.value).then((response)=>{
//       response.json().then((data) => {
//         console.log(data.results) 
//       })
//     });     
    
//     fetch('http://localhost:3000/coordinates?q='+fpl.destinationAerodrome.value).then((response)=>{
//       response.json().then((data) => {
//         console.log(data.results) 
//       })
//     }); 


    
//     console.log('MATCHED!');
// }
// });


$('#submitFPL').click(function(){
 formSubmit();
});

$('#departureAerodrome').change(function(){
  
  if (fpl.departureAerodrome.value.length>0 && fpl.departureAerodrome.value.length<4){
    $('#departureAerodrome').css('background-color','red');
  }
  else
  {
    fetch('http://localhost:3000/aerodrome?q='+fpl.departureAerodrome.value).then((response)=>{
      response.json().then((data) => {
        // console.log(data.results) 
     
      if (data.status=='notfound') {
        $('#departureAerodrome').css('background-color','red');
        fplDepartureAerodromeCoordinates=[];
        updatePath(); 
      }
      else
      {
        $('#departureAerodrome').css('background-color','rgba(0,0,0,0.1)');
        let pointCoordinates=new ol.proj.fromLonLat([data.results.long,data.results.lat]);
        fplDepartureAerodromeCoordinates=pointCoordinates;
        // fplPathCoordinates.push(pointCoordinates);
        updatePath(); 
      }
    })
    }); 
  }
  // console.log('test dep'+fplPathCoordinates);
  
})


$('#destinationAerodrome').change(function(){

  if (fpl.destinationAerodrome.value.length>0 && fpl.destinationAerodrome.value.length<4){
    $('#destinationAerodrome').css('background-color','red');
  }
  else
  {
    fetch('http://localhost:3000/aerodrome?q='+fpl.destinationAerodrome.value).then((response)=>{
      response.json().then((data) => {
        // console.log(data.results) 
     
            if (data.status=='notfound') {
              $('#destinationAerodrome').css('background-color','red');
              fplDestinationAerodromeCoordinates=[];
              updatePath(); 
            }
            else
            {
              $('#destinationAerodrome').css('background-color','rgba(0,0,0,0.1)');
              let pointCoordinates=new ol.proj.fromLonLat([data.results.long,data.results.lat]);
              fplDestinationAerodromeCoordinates=pointCoordinates;
              // fplPathCoordinates.push(pointCoordinates);
              updatePath();   
            }
      })
    }); 
  }
  // console.log('test dest'+fplPathCoordinates);
  
})


$('#alternateAerodrome').change(function(){
  
  if (fpl.alternateAerodrome.value.length>0 && fpl.alternateAerodrome.value.length<4){
    $('#alternateAerodrome').css('background-color','red');
  }
  else
  {
    $('#alternateAerodrome').css('background-color','rgba(0,0,0,0.1)');
  }
})




$('#secondAlternateAerodrome').change(function(){
  
  if (fpl.secondAlternateAerodrome.value.length>0 && fpl.secondAlternateAerodrome.value.length<4){
    $('#secondAlternateAerodrome').css('background-color','red');
  }
  else
  {
    $('#secondAlternateAerodrome').css('background-color','rgba(0,0,0,0.1)');
  }
})




$('#route').change(function(){
 






















  
routeArray=[];
var routeSegments=[];
var tempSegment=[];
routeSegments=fpl.route.value.split('\n');
console.log(routeSegments.length);
console.log(routeSegments);

for (var t=0; t<routeSegments.length; t++)
{
      if (routeSegments[t]!=undefined){


      tempSegment=routeSegments[t].split(' ')
      // console.log(tempSegment);
      // console.log(tempSegment.length);

              for (var i=0; i<tempSegment.length; i++){

                      if (tempSegment[i]!=''){
                      routeArray.push(tempSegment[i]);
                      }
              }
      }
}

console.log(routeArray);
fplRouteCoordinates=[];
// fplRouteCoordinates=tempArray;

var i=0;
 do {
                // tempArray[i]='⏵'+tempArray[i]+'⏴';
                // console.log('outside i'+i);
                getRouteSegment(routeArray[i],i,increaseI)
                
 } while (i<routeArray.length);
 

// fpl.route.value=routeArray;

console.log('fplRouteCoordinates'+fplRouteCoordinates);

// updatePath();






function getRouteSegment(param,i,callback){

  fetch('http://localhost:3000/coordinates?q='+routeArray[i]).then((response)=>{
                    response.json().then((data) => {
                    console.log(data.results) 
                      // console.log('inside i'+i);
                    
                        if (data.status=='notfound') {
                          // console.log(data.status);
                          param='⏵'+param+'⏴';
                          routeArray[i]=param;
                          fplRouteCoordinates[i]='';
                          // updatePath(); 
                        }
                        else
                        {
                          
                          fplRouteCoordinates[i]=new ol.proj.fromLonLat([data.results.long,data.results.lat]);
                         
                          // fplPathCoordinates.push(pointCoordinates);
                          // updatePath();   
                        }
                  })
                }); 

  callback();
}




function increaseI()
{
  i++;
  // console.log('after');

}










setTimeout(function (){
  var s='';
  for  (var i=0;i<routeArray.length;i++){
   s=s+' '+routeArray[i];
   fpl.route.value=s;
  
   }
  
  updatePath();
},1000)







//⏵⏴


})













// var testString='KRK IXONI PIKAD KOR';
// var splitString=testString.split(' ');
// console.log(splitString);





function updatePath() {
  console.log('into updatePath');
  fplPathCoordinates=[];
  // console.log(fplDepartureAerodromeCoordinates);
  fplPathCoordinates.push(fplDepartureAerodromeCoordinates);
  for (var i=0;i<fplRouteCoordinates.length;i++){
    console.log('inside loop'+i);
    fplPathCoordinates.push(fplRouteCoordinates[i]);

  }
 
  fplPathCoordinates.push(fplDestinationAerodromeCoordinates);
  console.log('before'+fplPathCoordinates);
 
  setTimeout(function (){
    console.log('after'+fplPathCoordinates);
    fplSource.clear();
    fplFeature = new ol.Feature({
      geometry : new ol.geom.LineString(fplPathCoordinates)
    });
    
    fplSource.addFeature(fplFeature);
    fplLayer.setZIndex(1);
  
  },1)
  

 
}




























function formSubmit(){
  console.log('FPL submitted!');
  // return false; 
}


/*
fpl={    
callSign: String,
flightRules: String,
typeOfFlight: String,
formation: int,
typeOfAircraft: String,
wakeTurbulenceCat: String,
equipment: String,
derartureAerodrome: String,
timeOfDeparture: time,
cruisingSpeed: int,
level: String,
route: String,
destinationAerodrome: String,
totalEET: int,
altnAerodrome: String,
secAltnAerodrome: String,
remarks: {
    dateOfFlight: time,
    remarks: string
},
supplementary: {
endurance: int,
personsOnBoard: int,
emergencyRadio: stringArray,
dinghies: stringArray,
jackets: stringArray,
number: int,
capacity: int,
colour: string,
aircraftColorAndMarkings: string,
remark: string,
pilotInCommand: string}
}
*/