  var aircraftLayer=[];
  var aircraftRouteSource=[]

//test arrays aircrafts, routes  
  var aircrafts=['SX-BIM','SX-AJT','D-EGHJ','OAL054','AEE604','OAL055','SEH081','SEH082'];
  var routes=['./data/route0.gpx','./data/route0.gpx','./data/route0.gpx','./data/route3.gpx','./data/route4.gpx','./data/route5.gpx','./data/route6.gpx','./data/route7.gpx']



  var style = [
      new ol.style.Style({
      image: new ol.style.Shadow({
        radius: 15,
      }),
      stroke: new ol.style.Stroke({
        color: [255,0,0,0.0],       //route color
        width: 3
      }),
      fill: new ol.style.Fill({
        color: [255,0,0,0.0]        //route color
      }),
       zIndex: -1,
      }),

      new ol.style.Style({
      image: new ol.style.FontSymbol({
        glyph: 'maki2-airport',
        fontSize: 1,     
        radius: 15, 
        offsetX: -10,
        offsetY: -10,
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

var styleCallSignLabel;
  


  var altitudeLabel = new ol.style.RegularShape({
    radius: 0,
    points: 0
   });
   
  var styleAltitudeLabel = 
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
    
    var styleVelocityLabel;
    styleVelocityLabel = new ol.style.Style({
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
  
  


var sliderSpeedValue=0.04;

$("#speed").click(function() {
  sliderSpeedValue=Number($("#speed").val());
                             }) ;








  // Animation
  
  // Add a feature on the map
  var featureShadow,featureAircraft,featureCallSignLabel,featureAltitudeLabel, featureVelocityLabel;
  var animationFeatureShadow,animationFeatureAircraft,animationFeatureCallSignLabel, animationFeatureAltitudeLabel, animationFeatureVelocityLabel;
 /////////////////////////////////////////////////////////////////////////
 //             create aircraft object and layer
   

 

var path;



var source;

 createAircraftLayer=() =>{

  source = new ol.source.Vector({
    //url: '../data/192553.gpx',
    url: routes[aircraftId],
    format: new ol.format.GPX()
  });


  


    console.log('into createAircraftLayer');
    console.log('aircraftId',aircraftId);
    aircraftLayer[aircraftId]=new ol.layer.Vector({
                                   title: 'Aircrafts',
                                   source: source,
                                   style: style
    });
    aircraftLayer[aircraftId].setZIndex(10);
    map.addLayer(aircraftLayer[aircraftId]); 
                                 
  }


 
 animateFeature=() =>{
  //aircraftLayer[aircraftId].changed();
  
  
  source.once('change',function(e){
    if (source.getState() === 'ready') {
      path = source.getFeatures()[0];
      console.log('path ready');
    }
   


  console.log('into animateFeature');
  console.log('aircraftId',aircraftId);
  




   if (path) {
     featureShadow = new ol.Feature(new ol.geom.Point([0,0]));
     
     featureShadow.setStyle(style[0]);
     //style[1].text_.text_ ='SX';
     animationFeatureShadow = new ol.featureAnimation.Path({
       path: path,
       rotate: true,
       easing: 'linear',
       speed: sliderSpeedValue
       
     });

     featureAircraft = new ol.Feature(new ol.geom.Point([0,0]));
     if (spriteIsPlane)
     {
       featureAircraft.setStyle(style[1]);
     } else

     {
       featureAircraft.setStyle(style[2]);
     }
     source.addFeature(featureAircraft);
     
     //style[1].text_.text_ ='SX';
     animationFeatureAircraft = new ol.featureAnimation.Path({
       path: path,
       rotate: true,
       easing: 'linear',
       speed: sliderSpeedValue
       
     });
   
     featureCallSignLabel = new ol.Feature(new ol.geom.Point([0,0]));


     styleCallSignLabel=new ol.style.Style({
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






     
     featureCallSignLabel.setStyle(styleCallSignLabel);
     featureCallSignLabel.setId(aircraftId);
    //  featureCallSignLabel.set('myStyle', styleCallSignLabel)
    //  featureCallSignLabel.setId(aircraftId);
     aircraftLayer[aircraftId].getSource().addFeature(featureCallSignLabel);

     //style[2].text_.text_ ='SX';
     animationFeatureCallSignLabel = new ol.featureAnimation.Path({
       path: path,
       rotate: false,
       easing: 'linear',
       speed: sliderSpeedValue
       
     });
     
    

     featureAltitudeLabel = new ol.Feature(new ol.geom.Point([0,0]));
     
     featureAltitudeLabel.setStyle(styleAltitudeLabel);
     //style[2].text_.text_ ='SX';
     animationFeatureAltitudeLabel = new ol.featureAnimation.Path({
       path: path,
       rotate: false,
       easing: 'linear',
       speed: sliderSpeedValue
       
     });

   
     featureVelocityLabel = new ol.Feature(new ol.geom.Point([0,0]));


     styleVelocityLabel = new ol.style.Style({
      image: velocityLabel,
        text: new ol.style.Text({
        offsetY: -25,
        rotation: 0,
        text: sliderSpeedValue,       //velocity
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



     
     featureVelocityLabel.setStyle(styleVelocityLabel);
    // styleVelocityLabel.text_.text_ = sliderSpeedValue; //gets the speed of the value of the slider
  
     animationFeatureVelocityLabel = new ol.featureAnimation.Path({
       path: path,
       rotate: false,
       easing: 'linear',
       speed: sliderSpeedValue
       
     });
     aircraftLayer[aircraftId].getSource().addFeature(featureVelocityLabel);

   
   
   
   
   
   
   
   
   
   

/*
   if (path) {
     g = new ol.Feature(new ol.geom.Point([0,0]));
     
     g.setStyle(style2);
     //style[1].text_.text_ ='SX';
     anim2 = new ol.featureAnimation.Path({
       path: path,
       rotate: false,
       easing: 'linear',
       speed: Number($("#speed").val())
       
     });

   }



*/




     /** / 
     source.addFeature(f);
     anim.on('animationend', function(e)
     {	if (e.feature) source.removeFeature(e.feature);
     });
     /**/
     /** /
     anim.on('animating', (e) => {
       map.getView().setCenter(e.geom.getCoordinates())
       map.getView().setRotation(e.rotation||0)
     })
     /**/
     aircraftLayer[aircraftId].animateFeature ( featureShadow, animationFeatureShadow );
     aircraftLayer[aircraftId].animateFeature ( featureAircraft, animationFeatureAircraft );
     aircraftLayer[aircraftId].animateFeature ( featureCallSignLabel, animationFeatureCallSignLabel);
     aircraftLayer[aircraftId].animateFeature ( featureAltitudeLabel, animationFeatureAltitudeLabel);
     aircraftLayer[aircraftId].animateFeature ( featureVelocityLabel, animationFeatureVelocityLabel);

     animationFeatureCallSignLabel.once('animationend', function(e)
     {	 
       
      if (e.feature) { 
      var id=e.feature.getId();
        
        aircraftLayer[id].getSource().clear();

      
      console.log('end');
      console.log('id'+id);
      console.log(e.feature);
     }
     });



  
     if (aircraftId>0){
      for (var i=0; i<10; i++){
      aircraftLayer[aircraftId].changed();
      }
     }
   
    }
//  map.render();
   

});


   }



  //  for (var i=0; i<4; i++){
  //   setTimeout (animateFeature, i*500);
  // }
