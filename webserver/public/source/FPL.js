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
  desert: false,
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

  console.log('change');
  console.log(map.getView().getZoom() );

  if (map.getView().getZoom()<9){
  
    fplLayer.getSource().getFeatures().forEach( function(feat){
      
      
      console.log( feat.getStyle()[0].getText().setText(''));
      
      
      feat.getStyle()[0].getText().setText('')
      fplLayer.changed();
    } 
   )
  }




  });

map.on('change',function(){
  
  



})





















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

//MUST FIX WAYPOINT RIMAX DOES'NT BELONG TO AIRWAY L613!!