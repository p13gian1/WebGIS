  var aircraftLayer=[];
  var aircraftRouteSource=[];
  var routeVisibility=false;
  var aircraftFont='maki2-airport';
  var aircrafts=[];
  var routes=[];
  // var aircraftFont='fa-plane';  //font-awesome rotation needs to be fixed!  rotation:  

//test arrays aircrafts, routes  
  // var aircrafts=['SXBIM','SXAJT','DEGHJ','OAL054','AEE604','OAL055','SEH081','SEH082'];
  // var routes=['./data/GPXFiles/IMEJO-LGKR0700-LGKR.gpx','./data/LGKR-LGAV.gpx','./data/LGTS-LGAV.gpx','./data/LGKC-LGKR.gpx','./data/route4.gpx','./data/route5.gpx','./data/route6.gpx','./data/route7.gpx']

  var style = [
      new ol.style.Style({
      image: new ol.style.Shadow({
        radius: 15,
      }),
      stroke: new ol.style.Stroke({
        color: [255,0,0,0],       //route color
        width: 3
      }),
      fill: new ol.style.Fill({
        color: [255,0,0,0]        //route color
      }),
       zIndex: -1,
      }),

      new ol.style.Style({
      image: new ol.style.FontSymbol({
        glyph: aircraftFont,
        fontSize: 1,     
        radius: 15, 
         offsetX: -5,    //offsets!!
         offsetY: -5,


       // rotation: Math.PI/4,
       //rotateWithView: true,
       // color: 'navy',
        fill: new ol.style.Fill({
        color: 'navy'
        }),
        stroke: new ol.style.Stroke({
        width: 2,
        color: '#f80'
        }),
      })    
      }),
      new ol.style.Style({
      image: new ol.style.RegularShape({
        radius: 0,
        points: 1,
        fill: new ol.style.Fill({
        color: [0,255,0,1]
      }),
        stroke: new ol.style.Stroke({
        width: 10,
        color: [0,255,0,1]
     }),
    })
    })
  ];
 
 var callSignLabel = new ol.style.RegularShape({
  radius: 0,
  points: 0
});

  var callSignLabelStyle;
  var altitudeLabel = new ol.style.RegularShape({
    radius: 0,
    points: 0
   });
   
  var altitudeLabelStyle = 
    new ol.style.Style({
      image: altitudeLabel,
      text: new ol.style.Text({
        offsetY: -40,
        rotation: 0,
        text: '380',       //altitude
        overflow: true,
        font: 15 + 'px Calibri,sans-serif',
        fill: new ol.style.Fill({
          color: 'navy'
          }),
          stroke: new ol.style.Stroke({
          width: 2,
          color: '#f80'
          }),
      })    
    });

    var velocityLabel = new ol.style.RegularShape({
      radius: 0,
      points: 0
    });
    
    var velocityLabelStyle;
    velocityLabelStyle = new ol.style.Style({
        image: velocityLabel,
          text: new ol.style.Text({
          offsetY: -25,
          rotation: 0,
          text: '',       //velocity
          overflow: true,
          font: 15 + 'px Calibri,sans-serif',
          fill: new ol.style.Fill({
            color: 'navy'
            }),
          stroke: new ol.style.Stroke({
          width: 2,
          color: '#f80'
          }),
        })  
    });
  // Offset image
 // style[1].getImage().getAnchor()[1] += 0
 var speedValueSlider=0.04;
 $("#speed").click(function() {
  speedValueSlider=Number($("#speed").val());
                             }) ;
  // Animation
  var shadowFeature,aircraftFeature,callSignLabelFeature,altitudeLabelFeature,velocityLabelFeature;
  var shadowAnimationFeature,aircraftAnimationFeature,callSignLabelAnimationFeature, altitudeLabelAnimationFeature, velocityLabelAnimationFeature;
  var path;
  var source;
 //----------------------------------------
  var routeLayer=[];
  var routeFeature;
  var routeVector = [];
  

  

//------------------------------------------


 createAircraftLayer=() =>{
 console.log('loading gpx');
  source = new ol.source.Vector({
    // url: '/GPXFiles/SXBAL-LGKR1200-LGSA.gpx',
    url: routes[aircraftId],
    format: new ol.format.GPX()
  });

    // console.log('into createAircraftLayer');
    // console.log('aircraftId',aircraftId);
    aircraftLayer[aircraftId]=new ol.layer.Vector({
                                   title: 'Aircrafts',
                                   source: source,
                                   id: (100+aircraftId),
                                   style: style
                                   
    });
    aircraftLayer[aircraftId].setZIndex(900);
    map.addLayer(aircraftLayer[aircraftId]); 
   
 

//-----------------------------------------
routeVector[aircraftId]=new ol.source.Vector({});

  routeLayer[aircraftId]=new ol.layer.Vector({
    title: 'Aircraft Route',
    source: routeVector[aircraftId],
    visible: routeVisibility,
    updateWhileAnimating: true,
    style: new ol.style.Style({
       stroke: new ol.style.Stroke({ color: getRandomColor(), width: 10 }),        
       zindex:-1,
      //declutter: true 
    })
  }); 


//--------------------------------














  }
 
 animateFeature=() =>{
  //aircraftLayer[aircraftId].changed();
    
  source.once('change',function(e){
    if (source.getState() === 'ready') {
      path = source.getFeatures()[0];
      // console.log('path ready');
      // log("Plane's path ready");
    }
  
  // console.log('into animateFeature');
  // console.log('aircraftId',aircraftId);
   
  if (path) {
     shadowFeature = new ol.Feature(new ol.geom.Point([0,0]));
     
     shadowFeature.setStyle(style[0]);
     //style[1].text_.text_ ='SX';
     animationFeatureShadow = new ol.featureAnimation.Path({
       path: path,
       rotate: true,
       easing: 'linear',
       speed: speedValueSlider
      });

     aircraftFeature = new ol.Feature(new ol.geom.Point([0,0]));
     if (spriteIsPlane)
     {
       aircraftFeature.setStyle(style[1]);
     } else
     {
       aircraftFeature.setStyle(style[2]);
     }
     source.addFeature(aircraftFeature);
    // var layersLenght=map.getLayers().getArray().length;
    // for (var i=0; i<layersLenght;i++)
    // {
    //   map.getLayers().getArray()[i].changed();
    // }
     
     //style[1].text_.text_ ='SX';
     aircraftAnimationFeature = new ol.featureAnimation.Path({
       path: path,
       rotate: true,
       easing: 'linear',
       speed: speedValueSlider
      });
   
     callSignLabelFeature = new ol.Feature(new ol.geom.Point([0,0]));

     callSignLabelStyle=new ol.style.Style({
      image: callSignLabel,
      // stroke: new ol.style.Stroke({
      //   color: [255,0,0],
      //   width: 2
      // }),
      // fill: new ol.style.Fill({
      //   color: [0,0,255,0.3]
      // }),
      text: new ol.style.Text({
        offsetY: -55,
        rotation: 0,
        //placement: 'line',
        text: aircrafts[aircraftId],       //call sign
        overflow: true,
        font: 15 + 'px Calibri,sans-serif',
        fill: new ol.style.Fill({
          color: 'navy'
          }),
          stroke: new ol.style.Stroke({
          width: 2,
          color: '#f80'
          }),
          })   
    });
    
     callSignLabelFeature.setStyle(callSignLabelStyle);

    log('(DEP-'+aircrafts[aircraftId]+'-LGKR'+getUTCtime()+"-LGKC-DOF/"+getUTCdateICAO()+")");
    log('---------------------------');
     callSignLabelFeature.setId(aircraftId);
    //  featureCallSignLabel.set('myStyle', styleCallSignLabel)
    //  featureCallSignLabel.setId(aircraftId);
     aircraftLayer[aircraftId].getSource().addFeature(callSignLabelFeature);
     //style[2].text_.text_ ='SX';
     callSignLabelAnimationFeature = new ol.featureAnimation.Path({
       path: path,
       rotate: false,
       easing: 'linear',
       speed: speedValueSlider     
     });
     
     altitudeLabelFeature = new ol.Feature(new ol.geom.Point([0,0]));
     
     altitudeLabelFeature.setStyle(altitudeLabelStyle);
     //style[2].text_.text_ ='SX';
     altitudeLabelAnimationFeature = new ol.featureAnimation.Path({
       path: path,
       rotate: false,
       easing: 'linear',
       speed: speedValueSlider      
     });
   
     velocityLabelFeature = new ol.Feature(new ol.geom.Point([0,0]));

     velocityLabelStyle = new ol.style.Style({
      image: velocityLabel,
        text: new ol.style.Text({
        offsetY: -25,
        rotation: 0,
        text: speedValueSlider,       //velocity
        overflow: true,
        font: 15 + 'px Calibri,sans-serif',
        fill: new ol.style.Fill({
          color: 'navy'
          }),
        stroke: new ol.style.Stroke({
        width: 2,
        color: '#f80'
        }),
      })  
  });
     
     velocityLabelFeature.setStyle(velocityLabelStyle);
    // styleVelocityLabel.text_.text_ = sliderSpeedValue; //gets the speed of the value of the slider
  
     velocityLabelAnimationFeature = new ol.featureAnimation.Path({
       path: path,
       rotate: false,
       easing: 'linear',
       speed: speedValueSlider
       });
     aircraftLayer[aircraftId].getSource().addFeature(velocityLabelFeature);

     aircraftLayer[aircraftId].animateFeature ( shadowFeature, animationFeatureShadow );
     aircraftLayer[aircraftId].animateFeature ( aircraftFeature, aircraftAnimationFeature );
     aircraftLayer[aircraftId].animateFeature ( callSignLabelFeature, callSignLabelAnimationFeature);
     aircraftLayer[aircraftId].animateFeature ( altitudeLabelFeature, altitudeLabelAnimationFeature);
     aircraftLayer[aircraftId].animateFeature ( velocityLabelFeature, velocityLabelAnimationFeature);


     //-----------------------------------------------------------------------------
     
    
     

     pathCoor=path.getGeometry().getFlatCoordinates();

     var line=[];
     var segment=[];
     for (var i = 0; i < pathCoor.length; i=i+2) {
       segment=[pathCoor[i],pathCoor[i+1]]
       line.push(segment);
     
     }


    //  console.log(line);


    // console.log(ol.proj.fromLonLat([28+aircraftId,30-aircraftId]) , ol.proj.fromLonLat([28,35]));






     routeFeature= new ol.Feature({
                                    geometry: new ol.geom.LineString(line)
                                    });
     routeVector[aircraftId].addFeature(routeFeature);
     map.addLayer(routeLayer[aircraftId]);


    //---------------------------------------------------------------------------











     callSignLabelAnimationFeature.once('animationend', function(e)
     {	 
      if (e.feature) { 

      var id=e.feature.getId();
        var arr=e.feature.getStyle().getText().getText();
        
        log('(ARR-'+arr+'-LGKC'+"-LGKR"+getUTCtime()+"-DOF/"+getUTCdateICAO()+")");
        log('----------------');
        // aircraftLayer[id].getSource().clear();
        map.removeLayer(aircraftLayer[id]);
        map.removeLayer(routeLayer[id]);

        var tempArrayEndOfFlight=[];
        tempArrayEndOfFlight[0]=aircrafts[id];
        let tempString=routes[id].replace('../src/data/GPXFiles/'+aircrafts[id]+'-','');
        console.log( tempString);
        tempArrayEndOfFlight[1]=tempString.slice(0,4);
        console.log( tempString);
        tempArrayEndOfFlight[2]=tempString.slice(4,8);
        console.log( tempString);
        tempArrayEndOfFlight[3]=tempString.slice(9,13);
        console.log( tempString);
        console.log( tempArrayEndOfFlight);
        fetch('http://localhost:3000/EndOfFlight?q='+tempArrayEndOfFlight).then((response)=>{
         console.log('deleting the record from flights table');             
        });
         fetch('http://localhost:3000/DeleteGPXFile?q='+routes[id]).then((response)=>{
         console.log('deleting the GPX file of the flight');             
        });  



     
      // console.log('end');
      // console.log('id'+id);
      // console.log(e.feature);
     }
     });






    //  $(window).on("load", function(){  
    //   if (aircraftId>0){
    //    for (var i=0; i<10; i++){
    //    aircraftLayer[aircraftId].changed();
    //    }
    //   }
    // });




     
     }
//  map.render(); 
     });
   }
  //  for (var i=0; i<4; i++){
  //   setTimeout (animateFeature, i*500);
  // }




  function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


// function convertPathToCoordinates(pathCoor){
// var line=[];
// var segment=[];
// for (var i = 0; i < pathCoor.length; i=i+2) {
//   segment=[ol.proj.fromLonLat([pathCoor[i],pathCoor[i+1]])]
//   line.push(segment);

// }
// return line;

// }






// getting current coordinates of aircraft, but it needs to be rendered first in order to calculate its coords  
// map.getLayers().getArray()[5].getSource().getFeatures()[1].getGeometry().getFlatCoordinates()


function activateFlight(aircraftIDValue,filenameTemp){
  aircrafts.push(aircraftIDValue); //pushing name of aircraft in aircrafts array
  routes.push('../src/data/GPXFiles/'+filenameTemp);

}

