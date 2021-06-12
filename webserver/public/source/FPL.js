var fpl=document.getElementById('fpl');
var fplPathCoordinates=[];
var fplPathValidNames=[];
var fplDepartureAerodromeValidName;
var fplDestinationAerodromeValidName;


var fplRouteCoordinates=[];
var fplDepartureAerodromeCoordinates=[];
var fplDestinationAerodromeCoordinates=[];
var routeArray=[];
var otherInformationEdit=false;

var fplAirway={name:'',rotation:0};
var fplAirways;
var numberOfSavedFPLs=0;




var fplSource= new ol.source.Vector({});

var fplLayer=new ol.layer.Vector({
  title: 'FPL Route Layer',
  source: fplSource,
  style : new ol.style.Style({}),
            //  fill : new ol.style.Fill({        
            //  color : [255,132,0,1]  
            //  }),
  zindex:1
      });
var fplFeature;
// fplFeature = new ol.Feature({
//   geometry : new ol.geom.LineString(fplPathCoordinates)
// });

// fplSource.addFeature(fplFeature);
map.addLayer(fplLayer);




$(function() {
  $('.fpl-form :nth-child(n)').keyup(function() {    //convert all input elements to uppercase, no need to press caps lock
    var currentCursorPosition;
    if (this.value!=undefined && this.name!='submitFPL' && this.name!='time'){  //because some input texts might be empty we read only those which are not empty and not button 'Submit FPL'
      currentCursorPosition=this.selectionStart;
      this.value = this.value.toUpperCase();
      this.selectionStart=currentCursorPosition; //moves cursor back to the previous position
      this.selectionEnd=currentCursorPosition;
    }
  
  // if (this.value!=undefined && this.name=='time'){  //prohibit non numerical characters for time field
  //   currentCursorPosition=this.selectionStart;
   

  //   this.selectionStart=currentCursorPosition; //moves cursor back to the previous position
  //   this.value=parseInt(this.value);
  //   if (isNaN(this.value)==true && this.value.slice(0,1)!='0' && this.value.slice(0,2)!='00' && this.value.slice(0,3)!='000' ){ 
  //     console.log('NAN!');
  //     this.value='';
  //   }
  //   this.selectionEnd=currentCursorPosition;
  // }
    
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
    fplDepartureAerodromeCoordinates=[];
    fplDepartureAerodromeValidName='';
    updatePath(); 
  }
  else
  {
    fetch('http://localhost:3000/aerodrome?q='+fpl.departureAerodrome.value).then((response)=>{
      response.json().then((data) => {
        console.log(data.results) 
     
      if (data.status=='notfound') {
        $('#departureAerodrome').css('background-color','red');
        fplDepartureAerodromeCoordinates=[];
        fplDepartureAerodromeValidName='';
        updatePath(); 
      }
      else
      {
        $('#departureAerodrome').css('background-color','rgba(0,0,0,0.1)');
        let parseCoords=JSON.parse(data.results).coordinates
        console.log(parseCoords);
        let pointCoordinates=new ol.proj.fromLonLat([parseCoords[0],parseCoords[1]]);
        fplDepartureAerodromeCoordinates=pointCoordinates;
        fplDepartureAerodromeValidName=fpl.departureAerodrome.value;
        // fplPathCoordinates.push(pointCoordinates);
        updatePath(); 
      }
    })
    }); 
  }
  // console.log('test dep'+fplPathCoordinates);
  
})



$('#time').change(function(){
  
  if (fpl.time.value.length>0 && fpl.time.value.length<4){
    $('#time').css('background-color','red');
    }
    else
    {
      // console.log("2 "+parseInt(this.value.slice(2,4)));
     if (parseInt(this.value.slice(2,4))>59){
       this.value='';
       $('#time').css('background-color','red');
     }

     else
      {
      //  console.log("1 "+parseInt(this.value.slice(0,2)));
       if (parseInt(this.value.slice(0,2))>23){ 
        this.value='';
        $('#time').css('background-color','red');
      }
      else
      {
        $('#time').css('background-color','rgba(0,0,0,0.1)');
      }

      }



      

      
    }
  
  // console.log('test dep'+fplPathCoordinates);
  
})

var supplementaryObject={
  emergencyRadioUHF: false,
  emergencyRadioVHF: false,
  emergencyRadioELBA: false,
  dinghies : false, 
  polar: false,
  desert:false,
  maritime: false,
  jungle: false,
  jackets: false,
  light: false,
  floures: false,
  UHF: false,
  VHF: false,
  dinghiesSecond: false,
  cover: false
};


$('.supplementary').click(function(e){
    
  if ($('#'+e.target.id).css('color')=='rgb(255, 0, 0)' && supplementaryObject[e.target.id]==false)
  {
    $('#'+e.target.id).css('color','yellow');
    console.log('yellow');
    supplementaryObject[e.target.id]=true;

    }
  else if ($('#'+e.target.id).css('color')=='rgb(255, 255, 0)' && supplementaryObject[e.target.id]==true)
  {
    $('#'+e.target.id).css('color','red');
    console.log('red');
    supplementaryObject[e.target.id]=false;  
    }


  // console.log('test dep'+fplPathCoordinates);
  
})
































$('#destinationAerodrome').change(function(){

  if (fpl.destinationAerodrome.value.length>0 && fpl.destinationAerodrome.value.length<4){
    $('#destinationAerodrome').css('background-color','red');
    fplDestinationAerodromeCoordinates=[];
    fplDestinationAerodromeValidName='';
    updatePath(); 
  }
  else
  {
    fetch('http://localhost:3000/aerodrome?q='+fpl.destinationAerodrome.value).then((response)=>{
      response.json().then((data) => {
        console.log(data.results) 
     
            if (data.status=='notfound') {
              $('#destinationAerodrome').css('background-color','red');
              fplDestinationAerodromeCoordinates=[];
              fplDestinationAerodromeValidName='';
              updatePath(); 
            }
            else
            {
              $('#destinationAerodrome').css('background-color','rgba(0,0,0,0.1)');

              let parseCoords=JSON.parse(data.results).coordinates
              // console.log('test!'+parseCoords);
              let pointCoordinates=new ol.proj.fromLonLat([parseCoords[0],parseCoords[1]]);

              
              fplDestinationAerodromeCoordinates=pointCoordinates;
              fplDestinationAerodromeValidName=fpl.destinationAerodrome.value;
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
    fetch('http://localhost:3000/aerodrome?q='+fpl.alternateAerodrome.value).then((response)=>{
    response.json().then((data) => {
      console.log(data.results) 
   
          if (data.status=='notfound' && fpl.alternateAerodrome.value!='') {
            $('#alternateAerodrome').css('background-color','red');
         
           
          }
          else
          {
            $('#alternateAerodrome').css('background-color','rgba(0,0,0,0.1)');
            
            // fplPathCoordinates.push(pointCoordinates);
            
          }
    })
  }); 
  }
})




$('#secondAlternateAerodrome').change(function(){
  
  if (fpl.secondAlternateAerodrome.value.length>0 && fpl.secondAlternateAerodrome.value.length<4){
    $('#secondAlternateAerodrome').css('background-color','red');
  }
  else
  {
    
    fetch('http://localhost:3000/aerodrome?q='+fpl.secondAlternateAerodrome.value).then((response)=>{
    response.json().then((data) => {
      console.log(data.results) 
   
          if (data.status=='notfound' && fpl.secondAlternateAerodrome.value!='' ) {
            $('#secondAlternateAerodrome').css('background-color','red');
         
           
          }
          else
          {
            $('#secondAlternateAerodrome').css('background-color','rgba(0,0,0,0.1)');
            
            // fplPathCoordinates.push(pointCoordinates);
            
          }
    })
  }); 
  }
})




$('#route').change(function(){
 
  
routeArray=[];
var routeSegments=[];
var tempSegment=[];

routeSegments=fpl.route.value.split('\n');
// console.log(routeSegments.length);
// console.log(routeSegments);

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

// console.log(routeArray);
fplRouteCoordinates=[];
// fplRouteCoordinates=tempArray;

var i=0;
 do {
                // tempArray[i]='⏵'+tempArray[i]+'⏴';
                // console.log('outside i'+i);
                getRouteSegment(routeArray[i],i,increaseI)
                
 } while (i<routeArray.length);
 

// fpl.route.value=routeArray;

// console.log('fplRouteCoordinates'+fplRouteCoordinates);

// updatePath();



function getRouteSegment(param,i,callback){

  fetch('http://localhost:3000/coordinates?q='+routeArray[i]).then((response)=>{
                    response.json().then((data) => {
                    
                    console.log('coordinates'+data) 
                      // console.log('inside i'+i);
                    
                        if (data.status=='notfound') {
                          // console.log(data.status);
                          if (param!=undefined){
                          param='⏵'+param+'⏴';
                          routeArray[i]=param;
                        }
                          fplRouteCoordinates[i]='';
                          // updatePath(); 
                        }
                        else
                        {
                          let parseCoords=JSON.parse(data.results).coordinates
                          fplRouteCoordinates[i]=new ol.proj.fromLonLat([parseCoords[0],parseCoords[1]]);
                         
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

$('#otherInformation').click(function(){
  // console.log('into otherInformation');

    if (fpl.otherInformation.value=='' && otherInformationEdit==false){
      fpl.otherInformation.value='DOF/'+getUTCdateICAO();                     //today date for DOF for first click in current form
                                                                              //otherInformationEdit has to be false again for the next fpl form  <----TO BE DONE !!
      otherInformationEdit=true;
    }
})











































// var testString='KRK IXONI PIKAD KOR';
// var splitString=testString.split(' ');
// console.log(splitString);





function updatePath() {
  // console.log('into updatePath');


  //constructing arrays fplPathCoordinates and fplPathValidNames
  fplPathCoordinates=[];
  fplPathValidNames=[];
  // console.log(fplDepartureAerodromeCoordinates);
  fplPathCoordinates.push(fplDepartureAerodromeCoordinates);
  fplPathValidNames.push(fplDepartureAerodromeValidName);
  for (var i=0;i<fplRouteCoordinates.length;i++){
    // console.log('inside loop'+i);
    if (fplRouteCoordinates[i]!=''){ 
    fplPathCoordinates.push(fplRouteCoordinates[i]);
    fplPathValidNames.push(routeArray[i]);
    } 
  }
 
  fplPathCoordinates.push(fplDestinationAerodromeCoordinates);
  fplPathValidNames.push(fplDestinationAerodromeValidName);
  // console.log('before'+fplPathCoordinates);
 

    

    

    

 


  // SELECT A.NAME
  // FROM AIRWAYS AS A, AIRWAYS AS B 
  // WHERE A.WAYPOINT='KRK' AND B.WAYPOINT='PARAX' AND A.NAME=B.NAME;


fplAirways=[{}];
  var i=0;
  do {
                //constructing object fplAirways
                
                
                 // tempArray[i]='⏵'+tempArray[i]+'⏴';
                 // console.log('outside i'+i);
                //  console.log('before function i'+i);  
                getAirwayName(fplPathValidNames[i],i,increaseI);             
                         
  } while (i<fplPathValidNames.length-1);
  
 fplAirways.splice(0,1);
 

 
 function getAirwayName(param,i,callback){
  //  console.log('inside function i'+i);
  //  console.log('param'+param);
  //  console.log('http://localhost:3000/airway?q1='+fplPathValidNames[i]+'&q2='+fplPathValidNames[i+1]);
 
   fetch('http://localhost:3000/airway?q1='+fplPathValidNames[i]+'&q2='+fplPathValidNames[i+1]).then((response)=>{
                     response.json().then((data) => {
                    //  console.log(data)
                     var airwayName;
                     let airway; 
                       // console.log('inside i'+i);
                     
                         if (data.status=='notfound') {
                           // console.log(data.status);
                          //  console.log('not found returning'+fplPathValidNames[i]+'-'+fplPathValidNames[i+1]);
                         airwayName=fplPathValidNames[i]+'-'+fplPathValidNames[i+1];

                         }
                         else
                         {
                          //  console.log('found and return '+data.results.name);
                          airwayName=data.results.name;
                          //  console.log('airwayName: '+airwayName);
                         
                          
                          
                           // fplPathCoordinates.push(pointCoordinates);
                           // updatePath();   
                         }
                         airway={name:airwayName};
                        //  console.log('airway: '+airway);
                         fplAirways.push(airway);
                        //  console.log('after function i'+i);    



                   })
                 }); 
 
   callback();
 }
 
 

 function increaseI()
 {
   i++;
   // console.log('after');
 }
 


//  function fplStyleFunction(name1,rotation1){

//   var zoom=map.getView().getZoom();
//   // console.log('zoom'+zoom);

//   if (zoom>7) { 
//   return [new ol.style.Style({
//     stroke : new ol.style.Stroke({
//     width: 5,
//     color : [255,132,0,1]}),
//     text: new ol.style.Text({
//      // offsetY: 10,
//      rotation: rotation1,
//      font: 17+'px Verdana',
//      // fill: new ol.style.Fill({ color: 'rgba(255,255,255,1)'}),
//      fill: new ol.style.Fill({ color: 'rgba(0,0,255,1)'}),
//      backgroundFill: new ol.style.Fill({ color: 'rgba(255,132,0,1)'}),
//      backgroundStroke: new ol.style.Stroke({
//        color: 'rgba(255,255,255,1)', width: 2}),
//      padding:[3,3,3,3],
//      textAlign: 'center',
//      placement: 'point',               
//      text: name1 })
     
//    })];
//   }
//   else
//   {
//     return [new ol.style.Style({
//       stroke : new ol.style.Stroke({
//       width: 5,
//       color : [255,132,0,1]})})
    
//     ];
//   }

// }




































































  //draw fpl path
  setTimeout(function (){
    // console.log('after'+fplPathCoordinates);
    



    // fplSource.clear();                                              //original
    // fplFeature = new ol.Feature({
    //   geometry : new ol.geom.LineString(fplPathCoordinates)
    // });
    
    // fplSource.addFeature(fplFeature);
    // fplLayer.setZIndex(1);

    
    fplSource.clear();

    // console.log('length '+fplAirways.length);

    for (var i=0; i<fplAirways.length;i++)
    {
     
      fplAirways[i].firstPoint=fplPathCoordinates[i];
      // console.log('i '+i+' '+fplAirways[i].firstPoint+' ='+fplPathCoordinates[i]);
      fplAirways[i].secondPoint=fplPathCoordinates[i+1];
      let rotation=0;
 

       
      let rot=(fplAirways[i].secondPoint[1]-fplAirways[i].firstPoint[1])/(fplAirways[i].secondPoint[0]-fplAirways[i].firstPoint[0]);

      rotation= -Math.atan(rot);
      fplAirways[i].rotation=rotation;
    }

    for (var i=0; i<fplAirways.length;i++)
    {
    // console.log('points '+fplAirways[i].firstPoint+' '+fplAirways[i].secondPoint)
    
    fplAirway.rotation=fplAirways[i].rotation; //same as underneath !!

    fplAirway.name=fplAirways[i].name;// change to set layers text!!

    fplFeature = new ol.Feature({
      geometry : new ol.geom.LineString([fplAirways[i].firstPoint, fplAirways[i].secondPoint])
    });
    
    fplSource.addFeature(fplFeature);
    fplFeature.setStyle(fplStyleFunction(fplAirway.name,fplAirway.rotation));
    
    
    fplLayer.setZIndex(1);

    }



  },2000)
  
}



    

function fplStyleFunction(name1,rotation1){

  
  // console.log('zoom'+zoom);

  
  return [new ol.style.Style({
    stroke : new ol.style.Stroke({
    width: 5,
    color : [255,132,0,1]}),
    text: new ol.style.Text({
     // offsetY: 10,
     rotation: rotation1,
     font: 14+'px Verdana',
     // fill: new ol.style.Fill({ color: 'rgba(255,255,255,1)'}),
     fill: new ol.style.Fill({ color: 'rgba(0,0,255,1)'}),
     backgroundFill: new ol.style.Fill({ color: 'rgba(255,132,0,1)'}),
     backgroundStroke: new ol.style.Stroke({
       color: 'rgba(255,255,255,1)', width: 2}),
     padding:[3,3,3,3],
     textAlign: 'center',
     placement: 'point',
     visible: false,              
     text: map.getView().getZoom()>7?name1:'' })
     
   })];


}


map.on('moveend', function() {

  // console.log('change');
  // console.log(map.getView().getZoom() );

  // if (map.getView().getZoom()<9){
  
  //   fplLayer.getSource().getFeatures().forEach( function(feat){
      
      
  //     console.log( feat.getStyle()[0].getText().setText(''));
      
      
  //     feat.getStyle()[0].getText().setText('')
  //     fplLayer.changed();
  //   } 
  //  )
  // }
  });

map.on('change',function(){
  
  



})





















function formSubmit(){
  console.log('FPL submitted!');
  console.log(fpl.departureAerodrome.value);

if (fpl.number.value=="") {
  fpl.number.value=1;
}

 var flightPlanArray=[   
fpl.aircraftID.value,
fpl.flightRules.value,
fpl.typeOfFlight.value,
fpl.number.value,
fpl.typeOfAircraft.value,
fpl.wakeTurbulenceCat.value,
fpl.equipment.value,
fpl.departureAerodrome.value,
fpl.time.value,
fpl.crusingSpeed.value,
fpl.level.value,
fpl.route.value,
fpl.destinationAerodrome.value,
fpl.totalEET.value,
fpl.alternateAerodrome.value,
fpl.secondAlternateAerodrome.value,
fpl.otherInformation.value,
fpl.endurance.value,
fpl.personsOnBoard.value,
supplementaryObject.emergencyRadioUHF,
supplementaryObject.emergencyRadioVHF,
supplementaryObject.emergencyRadioELBA,
supplementaryObject.dinghies,
supplementaryObject.polar,
supplementaryObject.desert,
supplementaryObject.maritime,
supplementaryObject.jungle,
supplementaryObject.jackets,
supplementaryObject.light,
supplementaryObject.floures,
supplementaryObject.UHF,
supplementaryObject.VHF,
supplementaryObject.dinghiesSecond,
fpl.numberOfDinghies.value,
fpl.capacity.value,
supplementaryObject.cover,
fpl.color.value,
fpl.aircraftColorAndMarkings.value,
fpl.remarks.value,
fpl.pilotInCommand.value
];

 console.log(flightPlanArray);



 fetch('http://localhost:3000/FPL?q='+ flightPlanArray).then((response)=>{
 // fetch('http://localhost:3000/FPL?q='+fpl.aircraftID.value).then((response)=>{
    response.json().then((data) => {
      console.log(data.results) 
   
         
    })
  });

  // return false; 
}



getMyFlightPlansContent=()=> {
  var content;
  document.getElementById("load-fpl-content").innerHTML='';
  fetch('http://localhost:3000/GetMyFlightPlansContent').then((response)=>{
 // fetch('http://localhost:3000/FPL?q='+fpl.aircraftID.value).then((response)=>{
    response.json().then((data) => {  
    numberOfSavedFPLs=data.results.length;
    content='';
      for (var i=0; i<data.results.length;i++) {

       document.getElementById("load-fpl-content").innerHTML +='<h6 style="margin-left:10px" id="savedFPL'+i+'">'+data.results[i]+'</h6>';
      //  content=content+ data.results[i]+'<br>';
       
      }
    
         
    })
  
  });
//  setTimeout(function(){ document.getElementById("load-fpl-content").innerHTML =content},500);
 
}


$('.load-fpl-text').click(function(e){ if (e.target.id !='load-fpl-content'){
    
  if ($('#'+e.target.id).css('color')=='rgb(255, 255, 255)')
  {
   
    for (var i=0; i<numberOfSavedFPLs;i++) {
      $('#savedFPL'+i).css('background-color','rgba(23, 6, 255, 0)');
      $('#savedFPL'+i).css('color','white');
    }
    $('#'+e.target.id).css('background-color','white');
    $('#'+e.target.id).css('color','rgb(23, 6, 255)');
    let filename=$('#'+e.target.id).text();
    console.log(filename);

    fetch('http://localhost:3000/ReadFPL?q='+filename).then((response)=>{
 
    response.json().then((data) => {  
      document.getElementById("load-fpl-preview").innerHTML=data.results;
         
    })
  
  });
       
    }
  else if ($('#'+e.target.id).css('color')=='rgb(23, 6, 255)')
  {
    $('#'+e.target.id).css('background-color','rgba(23, 6, 255, 0)');
    $('#'+e.target.id).css('color','white');
       }

  }
  // console.log('test dep'+fplPathCoordinates);
 
})



$('#loadFPL').click(function(){
  clearFPL();
  parseFPL();
 });

 $('#clearFPL').click(function(){
  setTimeout(function (){
    clearFPL();
  },1200)
 
  });

 
 clearFPL=()=>{
  fpl.aircraftID.value='';
  fpl.flightRules.value='';
  fpl.typeOfFlight.value='';
  fpl.number.value='';
  fpl.typeOfAircraft.value='';
  fpl.wakeTurbulenceCat.value='';
  fpl.equipment.value='';
  fpl.departureAerodrome.value='';
  fpl.time.value='';
  fpl.crusingSpeed.value='';
  fpl.level.value='';
  fpl.route.value='';
  fpl.destinationAerodrome.value='';
  fpl.totalEET.value='';
  fpl.alternateAerodrome.value='';
  fpl.secondAlternateAerodrome.value='';
  fpl.otherInformation.value='';
  fpl.endurance.value='';
  fpl.personsOnBoard.value='';
  supplementaryObject.emergencyRadioUHF=false;
  supplementaryObject.emergencyRadioVHF=false;
  supplementaryObject.emergencyRadioELBA=false;
  supplementaryObject.dinghies=false;
  supplementaryObject.polar=false;
  supplementaryObject.desert=false;
  supplementaryObject.maritime=false;
  supplementaryObject.jungle=false;
  supplementaryObject.jackets=false;
  supplementaryObject.light=false;
  supplementaryObject.floures=false;
  supplementaryObject.UHF=false;
  supplementaryObject.VHF=false;
  supplementaryObject.dinghiesSecond=false;
  fpl.numberOfDinghies.value='';
  fpl.capacity.value='';
  supplementaryObject.cover=false;
  fpl.color.value='';
  fpl.aircraftColorAndMarkings.value='';
  fpl.remarks.value='';
  fpl.pilotInCommand.value='';

  $('#emergencyRadioUHF').css('color','red');
  $('#emergencyRadioVHF').css('color','red');
  $('#emergencyRadioELBA').css('color','red');
  $('#dinghies').css('color','red');
  $('#polar').css('color','red');
  $('#desert').css('color','red');
  $('#maritime').css('color','red');
  $('#jungle').css('color','red');
  $('#jackets').css('color','red');
  $('#light').css('color','red');
  $('#floures').css('color','red');
  $('#UHF').css('color','red');
  $('#VHF').css('color','red');
  $('#dinghiesSecond').css('color','red');
  $('#cover').css('color','red');
 }









parseFPL=()=>{
  let fileFPL=document.getElementById("load-fpl-preview").innerHTML;
  let fileFPLArray=fileFPL.split('-');
  console.log(fileFPLArray);
  let FPL=[];
  FPL[0]=fileFPLArray[1];
  FPL[1]=fileFPLArray[2];
  FPL[1]=FPL[1].slice(0,1);
  FPL[2]=fileFPLArray[2];
  FPL[2]=FPL[2].slice(1,2);
  FPL[3]=fileFPLArray[3];
  FPL[3]=FPL[3].slice(0,2);
  FPL[4]=fileFPLArray[3];
  FPL[4]=FPL[4].slice(2,6);
  FPL[5]=fileFPLArray[3];
  FPL[5]=FPL[5].slice(7,8);
  FPL[6]=fileFPLArray[4].replace('\n','');    //getting rid of line carriage character
  FPL[7]=fileFPLArray[5];
  FPL[7]=FPL[7].slice(0,4);
  FPL[8]=fileFPLArray[5];
  FPL[8]=FPL[8].slice(4,8);  
  FPL[9]=fileFPLArray[6];
  if (FPL[9].slice(5,8)=='VFR'){
      FPL[9]=fileFPLArray[6];
      FPL[9]=FPL[9].slice(0,5);
      FPL[10]=fileFPLArray[6];
      FPL[10]=FPL[10].slice(5,8);

      FPL[11]=fileFPLArray[6];
      FPL[11]=FPL[11].slice(9,fileFPLArray[6].length+1);

  }
  else
  {
      FPL[9]=fileFPLArray[6];
      FPL[9]=FPL[9].slice(0,5);
      FPL[10]=fileFPLArray[6];
      FPL[10]=FPL[10].slice(5,10);
      FPL[11]=fileFPLArray[6];
      FPL[11]=FPL[11].slice(11,fileFPLArray[6].length+1);

  }
  FPL[12]=fileFPLArray[7];
  FPL[12]=FPL[12].replace('\n','')
  let tempAerodromesArray=FPL[12].split(' '); 
  FPL[12]=tempAerodromesArray[0];
  FPL[12]=FPL[12].slice(0,4);
  FPL[13]=tempAerodromesArray[0];
  FPL[13]=FPL[13].slice(4,8);
  FPL[14]=tempAerodromesArray[1];
  FPL[15]=tempAerodromesArray[2];
  FPL[16]=fileFPLArray[8];

 
  if (fileFPLArray[9]!=undefined){
      let supplementaryTemp=fileFPLArray[9];

      FPL[17]=supplementaryTemp.slice(2,6);
      FPL[18]=supplementaryTemp.slice(9,12);
      console.log(supplementaryTemp);
  }










 
  
  





fpl.aircraftID.value=FPL[0];
fpl.flightRules.value=FPL[1];
fpl.typeOfFlight.value=FPL[2];
fpl.number.value=FPL[3];
fpl.typeOfAircraft.value=FPL[4];
fpl.wakeTurbulenceCat.value=FPL[5];
fpl.equipment.value=FPL[6];
fpl.departureAerodrome.value=FPL[7];
fpl.time.value=FPL[8];
fpl.crusingSpeed.value=FPL[9];
fpl.level.value=FPL[10];
fpl.route.value=FPL[11];
fpl.destinationAerodrome.value=FPL[12];
fpl.totalEET.value=FPL[13];
if (FPL[14]!=undefined){ 
  fpl.alternateAerodrome.value=FPL[14];
}
if (FPL[15]!=undefined){ 
  fpl.secondAlternateAerodrome.value=FPL[15];
}
fpl.otherInformation.value=FPL[16];

if (fileFPLArray[9]!=undefined){ 
fpl.endurance.value=FPL[17];
fpl.personsOnBoard.value=FPL[18];

}


















  console.log(FPL);


  // var flightPlanArray=[   
  //   fpl.aircraftID.value,
  //   fpl.flightRules.value,
  //   fpl.typeOfFlight.value,
  //   fpl.number.value,
  //   fpl.typeOfAircraft.value,
  //   fpl.wakeTurbulenceCat.value,
  //   fpl.equipment.value,
  //   fpl.departureAerodrome.value,
  //   fpl.time.value,
  //   fpl.crusingSpeed.value,
  //   fpl.level.value,
  //   fpl.route.value,
  //   fpl.destinationAerodrome.value,
  //   fpl.totalEET.value,
  //   fpl.alternateAerodrome.value,
  //   fpl.secondAlternateAerodrome.value,
  //   fpl.otherInformation.value,
  //   fpl.endurance.value,
  //   fpl.personsOnBoard.value,
  //   supplementaryObject.emergencyRadioUHF,
  //   supplementaryObject.emergencyRadioVHF,
  //   supplementaryObject.emergencyRadioELBA,
  //   supplementaryObject.dinghies,
  //   supplementaryObject.polar,
  //   supplementaryObject.desert,
  //   supplementaryObject.maritime,
  //   supplementaryObject.jungle,
  //   supplementaryObject.jackets,
  //   supplementaryObject.light,
  //   supplementaryObject.floures,
  //   supplementaryObject.UHF,
  //   supplementaryObject.VHF,
  //   supplementaryObject.dinghiesSecond,
  //   fpl.numberOfDinghies.value,
  //   fpl.capacity.value,
  //   supplementaryObject.cover,
  //   fpl.color.value,
  //   fpl.aircraftColorAndMarkings.value,
  //   fpl.remarks.value,
  //   fpl.pilotInCommand.value
  //   ];


}

















//MUST FIX WAYPOINT RIMAX DOES'NT BELONG TO AIRWAY L613!!