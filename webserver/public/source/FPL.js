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
var fplToBeSaved;
var numberOfSavedFPLs=0;
var fplSource= new ol.source.Vector({});
var fplLayer=new ol.layer.Vector({
                                  title: 'FPL Route Layer',
                                  source: fplSource,
                                  style : new ol.style.Style({}),           
                                  zindex:1
                                });
var fplFeature;
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
  
  
    
              });
});

$('#submitFPL').click(function(){
                                  formSubmit();
});

$('#departureAerodrome').change(function(){ 
                                            updateFields();
});

function updateDepartureAerodromeField(){
                                          if (fpl.departureAerodrome.value.length>0 && fpl.departureAerodrome.value.length<4){
                                                                                                                              $('#departureAerodrome').css('background-color','red');
                                                                                                                              fplDepartureAerodromeCoordinates=[];
                                                                                                                              fplDepartureAerodromeValidName='';
                                                                                                                              updatePath(); 
                                          }
                                          else {
                                                fetch('http://localhost:3000/aerodrome?q='+fpl.departureAerodrome.value).then((response)=>{
                                                                                                                                            response.json().then((data) => {
                                                                                                                                                                              if (data.status=='notfound') {
                                                                                                                                                                                                              $('#departureAerodrome').css('background-color','red');
                                                                                                                                                                                                              fplDepartureAerodromeCoordinates=[];
                                                                                                                                                                                                              fplDepartureAerodromeValidName='';
                                                                                                                                                                                                              updatePath(); 
                                                                                                                                                                              }
                                                                                                                                                                              else {
                                                                                                                                                                                    $('#departureAerodrome').css('background-color','rgba(0,0,0,0.1)');
                                                                                                                                                                                    let parseCoords=JSON.parse(data.results).coordinates
                                                                                                                                                                                    let pointCoordinates=new ol.proj.fromLonLat([parseCoords[0],parseCoords[1]]);
                                                                                                                                                                                    fplDepartureAerodromeCoordinates=pointCoordinates;
                                                                                                                                                                                    fplDepartureAerodromeValidName=fpl.departureAerodrome.value;                                                                                                                                                                                    
                                                                                                                                                                                    updatePath(); 
                                                                                                                                                                              }
                                                                                                                                            })
                                                }); 
                                          }
}
$('#time').change(function(){
                              if (fpl.time.value.length>0 && fpl.time.value.length<4){
                                                                                        $('#time').css('background-color','red');
                              }
                              else {      
                                    if (parseInt(this.value.slice(2,4))>59){
                                                                            this.value='';
                                                                            $('#time').css('background-color','red');
                                    }
                                    else {      
                                          if (parseInt(this.value.slice(0,2))>23){ 
                                                                                  this.value='';
                                                                                  $('#time').css('background-color','red');
                                          }
                                          else {
                                                $('#time').css('background-color','rgba(0,0,0,0.1)');
                                          }

                                    } 
                                }
  
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
                                      if ($('#'+e.target.id).css('color')=='rgb(255, 0, 0)' && supplementaryObject[e.target.id]==false) {
                                                                                                                                          $('#'+e.target.id).css('color','yellow');    
                                                                                                                                          supplementaryObject[e.target.id]=true;
                                      }
                                      else if ($('#'+e.target.id).css('color')=='rgb(255, 255, 0)' && supplementaryObject[e.target.id]==true) {
                                                                                                                                                $('#'+e.target.id).css('color','red');
                                                                                                                                                supplementaryObject[e.target.id]=false;
                                      }  
})

$('#destinationAerodrome').change(function(){  
                                              updateFields();
})

function updateDestinationAerodromeField() {
                                            if (fpl.destinationAerodrome.value.length>0 && fpl.destinationAerodrome.value.length<4){
                                                                                                                                    $('#destinationAerodrome').css('background-color','red');
                                                                                                                                    fplDestinationAerodromeCoordinates=[];
                                                                                                                                    fplDestinationAerodromeValidName='';
                                                                                                                                    updatePath(); 
                                            }
                                            else {
                                                  fetch('http://localhost:3000/aerodrome?q='+fpl.destinationAerodrome.value).then((response)=>{
                                                                                                                                                response.json().then((data) => {     
                                                                                                                                                                                if (data.status=='notfound') {
                                                                                                                                                                                                              $('#destinationAerodrome').css('background-color','red');
                                                                                                                                                                                                              fplDestinationAerodromeCoordinates=[];
                                                                                                                                                                                                              fplDestinationAerodromeValidName='';
                                                                                                                                                                                                              updatePath(); 
                                                                                                                                                                                }
                                                                                                                                                                                else {
                                                                                                                                                                                      $('#destinationAerodrome').css('background-color','rgba(0,0,0,0.1)');
                                                                                                                                                                                      let parseCoords=JSON.parse(data.results).coordinates;
                                                                                                                                                                                      let pointCoordinates=new ol.proj.fromLonLat([parseCoords[0],parseCoords[1]]);            
                                                                                                                                                                                      fplDestinationAerodromeCoordinates=pointCoordinates;
                                                                                                                                                                                      fplDestinationAerodromeValidName=fpl.destinationAerodrome.value;
                                                                                                                                                                                      updatePath();   
                                                                                                                                                                                }
                                                                                                                                                })
                                                  }); 
                                              }
  
}


$('#alternateAerodrome').change(function(){
                                            if (fpl.alternateAerodrome.value.length>0 && fpl.alternateAerodrome.value.length<4){
                                                                                                                                  $('#alternateAerodrome').css('background-color','red');
                                            }
                                            else { 
                                                  fetch('http://localhost:3000/aerodrome?q='+fpl.alternateAerodrome.value).then((response)=>{
                                                                                                                                              response.json().then((data) => {
                                                                                                                                                                              if (data.status=='notfound' && fpl.alternateAerodrome.value!='') {
                                                                                                                                                                                                                                                  $('#alternateAerodrome').css('background-color','red');
                                                                                                                                                                              }
                                                                                                                                                                              else {
                                                                                                                                                                                    $('#alternateAerodrome').css('background-color','rgba(0,0,0,0.1)');   
                                                                                                                                                                              }
                                                                                                                                              })
                                                  }); 
                                            }
})

$('#secondAlternateAerodrome').change(function(){  
                                                  if (fpl.secondAlternateAerodrome.value.length>0 && fpl.secondAlternateAerodrome.value.length<4){
                                                                                                                                                    $('#secondAlternateAerodrome').css('background-color','red');
                                                  }
                                                  else {
                                                          fetch('http://localhost:3000/aerodrome?q='+fpl.secondAlternateAerodrome.value).then((response)=>{
                                                                                                                                                            response.json().then((data) => {
                                                                                                                                                                                            if (data.status=='notfound' && fpl.secondAlternateAerodrome.value!='' ) {
                                                                                                                                                                                                                                                                      $('#secondAlternateAerodrome').css('background-color','red');
                                                        
                                                                                                                                                                                            }
                                                                                                                                                                                            else {
                                                                                                                                                                                                  $('#secondAlternateAerodrome').css('background-color','rgba(0,0,0,0.1)');
                                                                                                                                                                                            }
                                                                                                                                                            })
                                                          }); 
                                                  }
})

$('#route').change(function(){
                              updateFields();
})

function updateRouteField(){   
                              routeArray=[];
                              var routeSegments=[];
                              var tempSegment=[];                              
                              routeSegments=fpl.route.value.split('\n');
                              for (var t=0; t<routeSegments.length; t++) {
                                                                          if (routeSegments[t]!=undefined){
                                                                                                            tempSegment=routeSegments[t].split(' ');
                                                                                                            for (var i=0; i<tempSegment.length; i++){
                                                                                                                                                      if (tempSegment[i]!=''){
                                                                                                                                                                              routeArray.push(tempSegment[i]);
                                                                                                                                                      }
                                                                                                            }
                                                                          }
                              }

                              fplRouteCoordinates=[];
                              var i=0;
                              do {
                                    getRouteSegment(routeArray[i],i,increaseI)                
                              } while (i<routeArray.length);
                              
                              function getRouteSegment(param,i,callback){
                                                                          fetch('http://localhost:3000/coordinates?q='+routeArray[i]).then((response)=>{
                                                                                                                                                        response.json().then((data) => {   
                                                                                                                                                                                        if (data.status=='notfound') {                          
                                                                                                                                                                                                                      if (param!=undefined){
                                                                                                                                                                                                                                            param='⏵'+param+'⏴';
                                                                                                                                                                                                                                            routeArray[i]=param;
                                                                                                                                                                                                                      }
                                                                                                                                                                                                                      fplRouteCoordinates[i]='';                                                                                                                                                                                      
                                                                                                                                                                                        }
                                                                                                                                                                                        else {
                                                                                                                                                                                              let parseCoords=JSON.parse(data.results).coordinates
                                                                                                                                                                                              fplRouteCoordinates[i]=new ol.proj.fromLonLat([parseCoords[0],parseCoords[1]]);                                                                                                                                                                                                                                                                                                
                                                                                                                                                                                        }
                                                                                                                                                        })
                                                                          }); 

                                                                          callback();
                              }

                              function increaseI(){
                                                    i++;  
                              }

                              setTimeout(function (){
                                                      var s='';
                                                      for  (var i=0;i<routeArray.length-1;i++){
                                                                                                s+=routeArray[i]+' ';
                                                      }
                                                      s+=routeArray[routeArray.length-1];
                                                      fpl.route.value=s;  
                                                      updatePath();
                              },1000)


}





$('#otherInformation').click(function(){
                                        if (fpl.otherInformation.value=='' && otherInformationEdit==false){
                                                                                                            fpl.otherInformation.value='DOF/'+getUTCdateICAO();  //today date for DOF for first click in current form                                                                            
                                                                                                            otherInformationEdit=true;
                                        }
})


function updatePath() {
                        //constructing arrays fplPathCoordinates and fplPathValidNames
                        fplPathCoordinates=[];
                        fplPathValidNames=[];  
                        fplPathCoordinates.push(fplDepartureAerodromeCoordinates);
                        fplPathValidNames.push(fplDepartureAerodromeValidName);
                        for (var i=0;i<fplRouteCoordinates.length;i++){    
                                                                        if (fplRouteCoordinates[i]!=''){ 
                                                                                                        fplPathCoordinates.push(fplRouteCoordinates[i]);
                                                                                                        fplPathValidNames.push(routeArray[i]);
                                                                        } 
                        }
                        fplPathCoordinates.push(fplDestinationAerodromeCoordinates);
                        fplPathValidNames.push(fplDestinationAerodromeValidName); 
                        fplAirways=[{}];
                        var i=0;
                        do {                 
                            getAirwayName(fplPathValidNames[i],i,increaseI);      
                        } while (i<fplPathValidNames.length-1);  
                        fplAirways.splice(0,1); 
                        function getAirwayName(param,i,callback){ 
                                                                  fetch('http://localhost:3000/airway?q1='+fplPathValidNames[i]+'&q2='+fplPathValidNames[i+1]).then((response)=>{
                                                                                                                                                                                  response.json().then((data) => {
                                                                                                                                                                                                                  var airwayName;
                                                                                                                                                                                                                    let airway; 
                                                                                                                                                                                                                    if (data.status=='notfound') {
                                                                                                                                                                                                                                      airwayName=fplPathValidNames[i]+'-'+fplPathValidNames[i+1];
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                    else {
                                                                                                                                                                                                                          airwayName=data.results.name;
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                    airway={name:airwayName};                          
                                                                                                                                                                                                                    fplAirways.push(airway);
                                                                                                                                                                                  })
                                                                  });  
                                                                  callback();
                          }
 
                          function increaseI() {
                                                i++;  
                          }
                          
                          //draw fpl path
                          setTimeout(function (){
                                                  fplSource.clear();
                                                  for (var i=0; i<fplAirways.length;i++){                                              
                                                                                          fplAirways[i].firstPoint=fplPathCoordinates[i];
                                                                                          fplAirways[i].secondPoint=fplPathCoordinates[i+1];
                                                                                          let rotation=0;                    
                                                                                          let rot=(fplAirways[i].secondPoint[1]-fplAirways[i].firstPoint[1])/(fplAirways[i].secondPoint[0]-fplAirways[i].firstPoint[0]);
                                                                                          rotation= -Math.atan(rot);
                                                                                          fplAirways[i].rotation=rotation;
                                                  }
                                                  for (var i=0; i<fplAirways.length;i++) {    
                                                                                          fplAirway.rotation=fplAirways[i].rotation; //same as underneath !!
                                                                                          fplAirway.name=fplAirways[i].name;// change to set layers text!!
                                                                                          fplFeature = new ol.Feature({
                                                                                                                        geometry : new ol.geom.LineString([fplAirways[i].firstPoint, fplAirways[i].secondPoint])
                                                                                          })
                                                                                          fplSource.addFeature(fplFeature);
                                                                                          fplFeature.setStyle(fplStyleFunction(fplAirway.name,fplAirway.rotation));
                                                                                          fplFeature.setId(fplAirway.name);
                                                                                          fplLayer.setZIndex(1);
                                                  }
                          },2000)
  
} 

function fplStyleFunction(name1,rotation1){
                                            return [new ol.style.Style({
                                                                        stroke : new ol.style.Stroke({
                                                                                                      width: 5,
                                                                                                      color : [255,132,0,1]
                                                                        }),
                                                                        text: new ol.style.Text({
                                                                                                  rotation: rotation1,
                                                                                                  font: 14+'px Verdana',          
                                                                                                  fill: new ol.style.Fill({ 
                                                                                                                            color: 'rgba(0,0,255,1)'
                                                                                                  }),
                                                                                                  backgroundFill: new ol.style.Fill({
                                                                                                                                     color: 'rgba(255,132,0,1)'
                                                                                                  }),
                                                                                                  backgroundStroke: new ol.style.Stroke({
                                                                                                                                          color: 'rgba(255,255,255,1)', width: 2
                                                                                                  }),
                                                                                                  padding:[3,3,3,3],
                                                                                                  textAlign: 'center',
                                                                                                  placement: 'point',
                                                                                                  visible: false,              
                                                                                                  text: map.getView().getZoom()>7?name1:'' 
                                                                        })
                                                                        
                                            })];
}

map.on('moveend', function() {
                              if (map.getView().getZoom()<9){  
                                                              fplLayer.getSource().getFeatures().forEach( function(e){                                                                
                                                                                                                      e.getStyle()[0].getText().setText('');
                                                                                                                      fplLayer.changed();
                                                              })
                              }
                              else {
                                    fplLayer.getSource().getFeatures().forEach( function(e){          
                                                                                        let tempName=e.getId();
                                                                                        e.getStyle()[0].getText().setText(tempName);
                                                                                        fplLayer.changed();
                                    })

                              }
});

function formSubmit(){
                      fplSource.clear();
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
                      var flightArray=[
                      fpl.aircraftID.value,
                      fpl.flightRules.value,
                      fpl.typeOfFlight.value,
                      fpl.typeOfAircraft.value,
                      fpl.wakeTurbulenceCat.value,
                      fpl.departureAerodrome.value,
                      fpl.time.value,
                      fpl.crusingSpeed.value,
                      fpl.level.value,
                      fpl.route.value,
                      fpl.destinationAerodrome.value,
                      'DEP',
                      false
                      ];
                      fetch('http://localhost:3000/FPL?q='+ flightPlanArray).then((response)=>{                      
                                                                                                response.json().then((data) => {                            
                                                                                                                                if (data.results=='ok'){
                                                                                                                                                        $('#submitFPL').css('color','green');
                                                                                                                                                        setTimeout(function(){$('#submitFPL').css('color','yellow'); },4000);
                                                                                                                                                        clearFPL();
                                                                                                                                                        fetch('http://localhost:3000/Flights?q='+ flightArray).then((response)=>{                              
                                                                                                                                                                                                                                  response.json().then((data) => {
                                                                                                                                                                                                                                  })
                                                                                                                                                        });                 
                                                                                                                                                        flightsCounter++;
                                                                                                                                                        addFlightToStripBay(flightArray);          
                                                                                                                                                        $(".fpl-form").css("display","none");
                                                                                                                                                        $(".fpl-form-margin").css("display","none");
                                                                                                                                                        $(".strip-bay-form").css("display","block");
                                                                                                                                                        $(".strip-bay-form-margin").css("display","block");  
                                                                                                                                }
                                                                                                                                else {
                                                                                                                                  $('#submitFPL').css('color','red');
                                                                                                                                }
         
                                                                                                })
                      });  
}

getMyFlightPlansContent=()=> {
                              var content;
                              document.getElementById("load-fpl-content").innerHTML='';
                              fetch('http://localhost:3000/GetMyFlightPlansContent').then((response)=>{ 
                                                                                                        response.json().then((data) => {  
                                                                                                                                        numberOfSavedFPLs=data.results.length;
                                                                                                                                        content='';
                                                                                                                                        for (var i=0; i<data.results.length;i++) {
                                                                                                                                                                                  document.getElementById("load-fpl-content").innerHTML +='<h6 style="margin-left:10px" id="savedFPL'+i+'">'+data.results[i]+'</h6>';
      
                                                                                                                                        }
                                                                                                                                        document.getElementById("save-fpl-content").innerHTML = document.getElementById("load-fpl-content").innerHTML;
         
                                                                                                        })
  
                              });
}

$('.load-fpl-text').click(function(e){ 
                                      if (e.target.id !='load-fpl-content'){  
                                                                              if ($('#'+e.target.id).css('color')=='rgb(255, 255, 255)') {                                                                              
                                                                                                                                          for (var i=0; i<numberOfSavedFPLs;i++) {
                                                                                                                                                                                  $('#savedFPL'+i).css('background-color','rgba(23, 6, 255, 0)');
                                                                                                                                                                                  $('#savedFPL'+i).css('color','white');
                                                                                                                                          }
                                                                                                                                          $('#'+e.target.id).css('background-color','white');
                                                                                                                                          $('#'+e.target.id).css('color','rgb(23, 6, 255)');
                                                                                                                                          let filename=$('#'+e.target.id).text();
    
                                                                                                                                          fetch('http://localhost:3000/ReadFPL?q='+filename).then((response)=>{
                                                                                                                                                                                                                response.json().then((data) => {  
                                                                                                                                                                                                                                                document.getElementById("load-fpl-preview").innerHTML=data.results;         
                                                                                                                                                                                                                })  
                                                                                                                                          });
       
                                                                              }
                                                                              else if ($('#'+e.target.id).css('color')=='rgb(23, 6, 255)'){
                                                                                                                                            $('#'+e.target.id).css('background-color','rgba(23, 6, 255, 0)');
                                                                                                                                            $('#'+e.target.id).css('color','white');
                                                                              }

                                      }
 })

function updateFields(){
                        if (fpl.departureAerodrome.value!=''){ 
                                                              setTimeout(function (){
                                                                                      updateDepartureAerodromeField();
                                                              },1000);
                        }
                        if (fpl.route.value!=''){
                                                  setTimeout(function (){
                                                                          updateRouteField();
                                                  },1000);
                        }
                        if (fpl.destinationAerodrome.value!=''){ 
                                                                setTimeout(function (){
                                                                                        updateDestinationAerodromeField();
                                                                },1000);
                        }
}

$('#loadFPL').click(function(){
                                clearFPL();
                                parseFPL();
                                updateFields();  
                                $(".load-fpl-form").css("display","none");
                                $(".load-fpl-form-margin").css("display","none");  
 });


 $('#saveFPL').click(function(){  
                                let filename=document.getElementById('filenameFPL').value;
                                fetch('http://localhost:3000/WriteFPL?q1='+filename+'&q2='+fplToBeSaved).then((response)=>{
                                                                                                                            response.json().then((results) => {  
                                                                                                                            })
                                }); 
                                clearFPL();
                                $(".save-fpl-form").css("display","none");
                                $(".save-fpl-form-margin").css("display","none");
});

$('#clearFPL').click(function(){
                                setTimeout(function (){
                                                        clearFPL();
                                                        clearPath();
                                },1200)
                                fplSource.clear();
});

clearPath=()=>{
                fplDepartureAerodromeCoordinates=[];
                fplDepartureAerodromeValidName='';
                fplDestinationAerodromeCoordinates=[];
                fplDestinationAerodromeValidName='';
                fplPathCoordinates=[];
                fplPathValidNames=[];
                fplRouteCoordinates=[];
                routeArray=[];
}

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
                                              FPL[11]=FPL[11].slice(9,fileFPLArray[6].length);
                }
                else {
                        FPL[9]=fileFPLArray[6];
                        FPL[9]=FPL[9].slice(0,5);
                        FPL[10]=fileFPLArray[6];
                        FPL[10]=FPL[10].slice(5,10);
                        FPL[11]=fileFPLArray[6];
                        FPL[11]=FPL[11].slice(11,fileFPLArray[6].length);
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
                FPL[16]=fileFPLArray[8].slice(0,fileFPLArray[8].length-2);
                if (fileFPLArray[9]!=undefined){
                                                let supplementaryTemp=fileFPLArray[9];
                                                FPL[17]=supplementaryTemp.slice(2,6);           //Endurance
                                                FPL[18]=supplementaryTemp.slice(9,12);          //Persons on Board
                                                let positionR=supplementaryTemp.search('R/');    //finding position of R/
                                                if (positionR!=-1) { 
                                                                    FPL[19]=supplementaryTemp.slice(positionR+2,positionR+5);
                                                                    let tempSearch=FPL[19].search('U');     
                                                                    if (tempSearch!=-1) {
                                                                                          supplementaryObject.emergencyRadioUHF=true;
                                                                                          $('#emergencyRadioUHF').css('color','yellow');
                                                                    }
                                                                    tempSearch=FPL[19].search('V');
                                                                    if (tempSearch!=-1) {
                                                                                          supplementaryObject.emergencyRadioVHF=true;
                                                                                          $('#emergencyRadioVHF').css('color','yellow');
                                                                    }
                                                                    tempSearch=FPL[19].search('E');
                                                                    if (tempSearch!=-1) {
                                                                                          supplementaryObject.emergencyRadioELBA=true;
                                                                                          $('#emergencyRadioELBA').css('color','yellow');
                                                                    }
                                                } 
                                                let positionS=supplementaryTemp.search('S/');    //finding position of S/
                                                if (positionS!=-1) { 
                                                                    FPL[19]=supplementaryTemp.slice(positionS,positionS+6);
                                                                    let tempSearch=FPL[19].search('S');     
                                                                    if (tempSearch!=-1) {
                                                                                          supplementaryObject.dinghies=true;
                                                                                          $('#dinghies').css('color','yellow');
                                                                    }
                                                                    tempSearch=FPL[19].search('P');
                                                                    if (tempSearch!=-1) {
                                                                                          supplementaryObject.polar=true;
                                                                                          $('#polar').css('color','yellow');
                                                                    }
                                                                    tempSearch=FPL[19].search('D');
                                                                    if (tempSearch!=-1) {
                                                                                          supplementaryObject.desert=true;
                                                                                          $('#desert').css('color','yellow');
                                                                    }
                                                                    tempSearch=FPL[19].search('M');
                                                                    if (tempSearch!=-1) {
                                                                                          supplementaryObject.maritime=true;
                                                                                          $('#maritime').css('color','yellow');
                                                                    }
                                                                    tempSearch=FPL[19].search('J');
                                                                    if ((tempSearch!=-1) && (FPL[19][tempSearch-1]!=' ')) {  //we make sure that J doesn't belong to J/ segment
                                                                                                                          
                                                                                                                            supplementaryObject.jungle=true; //so we check there is no space before J
                                                                                                                            $('#jungle').css('color','yellow');
                                                                    }
                                                } 
                                                let positionJ=supplementaryTemp.search('J/');    //finding position of J/
                                                if (positionJ!=-1) { 
                                                                    FPL[19]=supplementaryTemp.slice(positionJ,positionJ+6);
                                                                    let tempSearch=FPL[19].search('J');     
                                                                    if (tempSearch!=-1) {
                                                                                          supplementaryObject.jackets=true;
                                                                                          $('#jackets').css('color','yellow');
                                                                    }
                                                                    tempSearch=FPL[19].search('L'); 
                                                                    if (tempSearch!=-1) {
                                                                                          supplementaryObject.light=true;
                                                                                          $('#light').css('color','yellow');
                                                                    }
                                                                    tempSearch=FPL[19].search('F'); 
                                                                    if (tempSearch!=-1) {
                                                                                          supplementaryObject.floures=true;
                                                                                          $('#floures').css('color','yellow');
                                                                    }
                                                                    tempSearch=FPL[19].search('U');
                                                                    if (tempSearch!=-1) {
                                                                                          supplementaryObject.UHF=true;
                                                                                          $('#UHF').css('color','yellow');
                                                                    }
                                                                    tempSearch=FPL[19].search('V');
                                                                    if (tempSearch!=-1) {
                                                                                          supplementaryObject.VHF=true;
                                                                                          $('#VHF').css('color','yellow');
                                                                    }
                                                } 
                                                let positionD=supplementaryTemp.search('D/');    //finding position of D/
                                                if (positionD!=-1) {
                                                                    supplementaryObject.dinghiesSecond=true;
                                                                    $('#dinghiesSecond').css('color','yellow');
                                                                    FPL[19]=supplementaryTemp.slice(positionD+2,positionD+4);
                                                                    fpl.numberOfDinghies.value=FPL[19];
                                                                    FPL[19]=supplementaryTemp.slice(positionD+5,positionD+8);
                                                                    fpl.capacity.value=FPL[19];       
                                                }      
                                                let segment=supplementaryTemp.split('\n');      
                                                let positionC=segment[0].search('C ');      
                                                if (positionC!=-1) {
                                                                    supplementaryObject.cover=true;
                                                                    $('#cover').css('color','yellow');
                                                                    fpl.color.value=segment[0].slice(positionC+2,segment[0].length+1);
                                                }      
                                                let positionA=supplementaryTemp.search('A/');
                                                segment=supplementaryTemp.slice(positionA,supplementaryTemp.length+1);
                                                let positionN=segment.search('N/');
                                                positionC=segment.search('C/');
                                                if (positionN!=-1){
                                                                    fpl.remarks.value=segment.slice(positionN+2,positionC-1);
                                                } 
                                                else {
                                                      positionN=positionC;     // in case there is no N/ field then make positionN same as positionC marker
                                                }
                                                fpl.aircraftColorAndMarkings.value=segment.slice(2,positionN-1);
                                                fpl.pilotInCommand.value=segment.slice(positionC+2,segment.length-1); 
      
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
}

reverseParseFPL=()=>{
                      fplToBeSaved='(FPL-'+fpl.aircraftID.value+'-'+fpl.flightRules.value+fpl.typeOfFlight.value+'\n'+
                      '-'+fpl.number.value+fpl.typeOfAircraft.value+'/'+fpl.wakeTurbulenceCat.value+'-'+fpl.equipment.value+'\n'+
                      '-'+fpl.departureAerodrome.value+fpl.time.value+'\n'+
                      '-'+fpl.crusingSpeed.value+fpl.level.value+' '+fpl.route.value+'\n'+
                      '-'+fpl.destinationAerodrome.value+fpl.totalEET.value+' '+ fpl.alternateAerodrome.value+' '+fpl.secondAlternateAerodrome.value+'\n'+
                      '-'+fpl.otherInformation.value+')\n'+
                      '-E/'+fpl.endurance.value+' P/'+fpl.personsOnBoard.value;
                      if (supplementaryObject.emergencyRadioUHF==true || supplementaryObject.emergencyRadioVHF==true || supplementaryObject.emergencyRadioELBA==true ){
                                                                                                                                                                        fplToBeSaved+=' R/';
                      }
                      if (supplementaryObject.emergencyRadioUHF==true) {
                                                                        fplToBeSaved+='U';
                      }
                      if (supplementaryObject.emergencyRadioVHF==true) {
                                                                        fplToBeSaved+='V';
                      }
                      if (supplementaryObject.emergencyRadioELBA==true) {
                                                                          fplToBeSaved+='E';
                      }
                      if (supplementaryObject.dinghies==true) {
                                                                fplToBeSaved+=' S/';
                      }
                      if (supplementaryObject.polar==true) {
                                                              fplToBeSaved+='P';
                      }
                      if (supplementaryObject.desert==true) {
                                                              fplToBeSaved+='D';
                      }
                      if (supplementaryObject.maritime==true) {
                                                                fplToBeSaved+='M';
                      }
                      if (supplementaryObject.jungle==true) {
                                                              fplToBeSaved+='J';
                      }
                      if (supplementaryObject.jackets==true) {
                                                                fplToBeSaved+=' J/';
                      }
                      if (supplementaryObject.light==true) {
                                                              fplToBeSaved+='L';
                      }
                      if (supplementaryObject.floures==true) {
                                                                fplToBeSaved+='F';
                      }
                      if (supplementaryObject.UHF==true) {
                                                            fplToBeSaved+='U';
                      }
                      if (supplementaryObject.VHF==true) {
                                                            fplToBeSaved+='V';
                      }
                      if (supplementaryObject.VHF==true) {
                                                            fplToBeSaved+='V';
                      }
                      if (supplementaryObject.dinghiesSecond==true) {
                                                                      fplToBeSaved+='/D';
                                                                      fplToBeSaved+=fpl.numberOfDinghies.value+' '+fpl.capacity.value+' C '+fpl.color.value;
                      }
                      fplToBeSaved+='\n';
                      fplToBeSaved+='A/'+fpl.aircraftColorAndMarkings.value;
                      if (aircraftColorAndMarkings.value!='') {
                                                                fplToBeSaved+=' N/'+fpl.remarks.value;
                      }
                      fplToBeSaved+='\n';
                      fplToBeSaved+='C/'+fpl.pilotInCommand.value+')\n';  
}