


var style = [
    new ol.style.Style({
      image: new ol.style.Shadow({
        radius: 15,
      }),
      stroke: new ol.style.Stroke({
        color: [255,0,0,0.7],       //route color
        width: 3
      }),
      fill: new ol.style.Fill({
        color: [255,0,0,0.7]        //route color
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

//var c = callSignLabel.getImage();
//var ctx = c.getContext("2d");
//var c2 = document.createElement('canvas');
// c2.width = c2.height = c.width;
// c2.getContext("2d").drawImage(c, 0,0);
// ctx.clearRect(0,0,c.width,c.height);
// ctx.drawImage(c2, 0,0, c.width, c.height, 6, 0, c.width-12, c.height);

var styleCallSignLabel = 
  new ol.style.Style({
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
      text: 'SX-BIM',       //call sign
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
    
   
    var styleVelocityLabel = 
      new ol.style.Style({
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
  style[1].getImage().getAnchor()[1] += 0
  
  


var sliderSpeedValue=0.04;

$("#speed").click(function() {
  sliderSpeedValue=Number($("#speed").val());
                             }) ;

//sliderSpeedValue=0.01;

  // Vector layer
  var source = new ol.source.Vector({
    //url: '../data/192553.gpx',
    url: './data/route.gpx',
    format: new ol.format.GPX()
  });
  var vector = new ol.layer.Vector({
    title: 'Aircrafts',
    source: source,
    style: style
  });
  vector.setZIndex(10);
  map.addLayer(vector);



  //$(window).on("load", function(){ console.log("loaded"); vector.changed(); });
  vector.changed(); // redraw vector in order to load font of aeroplane 

  // Animation
  var path;
  source.once('change',function(e){
    if (source.getState() === 'ready') {
      path = source.getFeatures()[0];
    }
  });
  // Add a feature on the map
  var featureShadow,featureAircraft,featureCallSignLabel,featureAltitudeLabel, featureVelocityLabel;
  var animationFeatureShadow,animationFeatureAircraft,animationFeatureCallSignLabel, animationFeatureAltitudeLabel, animationFeatureVelocityLabel;
 
 
 
 
 
  animateFeature=() =>{
    vector.changed();
    
   
    
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
      
      //style[1].text_.text_ ='SX';
      animationFeatureAircraft = new ol.featureAnimation.Path({
        path: path,
        rotate: true,
        easing: 'linear',
        speed: sliderSpeedValue
        
      });
    
      featureCallSignLabel = new ol.Feature(new ol.geom.Point([0,0]));
      
      featureCallSignLabel.setStyle(styleCallSignLabel);
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
      
      featureVelocityLabel.setStyle(styleVelocityLabel);
      styleVelocityLabel.text_.text_ = sliderSpeedValue; //gets the speed of the value of the slider
      
      animationFeatureVelocityLabel = new ol.featureAnimation.Path({
        path: path,
        rotate: false,
        easing: 'linear',
        speed: sliderSpeedValue
        
      });
    
    
    
    
    
    
    
    
    
    
    

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
      vector.animateFeature ( featureShadow, animationFeatureShadow );
      vector.animateFeature ( featureAircraft, animationFeatureAircraft );
      vector.animateFeature ( featureCallSignLabel, animationFeatureCallSignLabel);
      vector.animateFeature ( featureAltitudeLabel, animationFeatureAltitudeLabel);
      vector.animateFeature ( featureVelocityLabel, animationFeatureVelocityLabel);
    }
    
    }








  
  for (var i=0; i<4; i++){
    setTimeout (animateFeature, i*500);
  }

  