var italianVFRCoordinates= [  19.0000,38.8856,  //LIBB
                              19.0000,39.2933,
                              19.0000,39.8167,
                              19.0000,40.0567,
                              19.0000,40.2447,
                              19.0000,40.5983,
                              19.0000,40.7572,
                              18.9517,40.8917,
                              18.8667,41.1336,
                              18.1292,41.5028,
                              17.2483,41.9283,
                              16.0489,42.5078,
                              15.7483,42.7039,
                              15.4375,42.9075,
                              14.7978,43.3117,
                              14.5069,43.5022,
                              13.3417,43.5192,
                              13.0853,42.9183,
                              13.5956,42.3489,
                              13.7375,42.1889,
                              14.3844,41.4511,
                              14.8069,41.3067,
                              15.1275,41.2017,
                              15.1714,41.1078,
                              15.4172,40.6906,
                              15.6186,40.3444,
                              15.8075,40.0161,
                              16.0392,39.615,
                              16.2544,39.2408,
                              16.3261,39.1622,
                              16.5272,38.9844,
                              17.1725,38.8850,
                              19.0000,38.8856,
                              19.0000,38.7242,                  //LIRR
                              19.0000,37.4000,
                              19.0000,36.5036,
                              15.9269,36.5000,
                              11.5000,36.5000,
                              11.5086,37.5000,
                              11.2942,37.5928,
                               9.7872,38.2547,
                               8.0000,39.0000,
                               8.0000,41.0000,
                               8.3333,41.3333,
                               9.7500,41.3333,
                               9.7500,43.1667,
                              10.3167,43.5833,
                              11.1667,43.7167,
                              13.3417,43.5192,
                              13.0853,42.9183,
                              13.5956,42.3489,
                              13.7375,42.1889,
                              14.3844,41.4511,
                              14.8069,41.3067,
                              15.1275,41.2017,
                              15.1714,41.1078,
                              15.4172,40.6906,
                              15.6186,40.3444,
                              15.8075,40.0161,
                              16.0392,39.615,
                              16.2544,39.2408,
                              16.3261,39.1622,
                              16.5272,38.9844,
                              17.1725,38.8850,
                              19.0000,38.8856
];


var italianVFRCoordinates2=[   13.3417,43.5192,         //LIMM
                              13.3333,44.5333,
                              13.0000,45.1667];


















                    

var italianVFRCoordinates4326=[];



var styleJson1 = 'https://api.maptiler.com/maps/e31d675e-d790-422f-9bdb-8e53ed2c77a3/style.json?key=uvpLhVXDl2QlWUYsQzXs';
var styleJson2 = 'https://api.maptiler.com/maps/52cf67a2-9470-46ef-98b0-215feb1fe7be/style.json?key=uvpLhVXDl2QlWUYsQzXs';
var styleJson3 = 'https://api.maptiler.com/maps/fdeec51a-e2a4-41c7-b26d-4a5c43d2b87f/style.json?key=uvpLhVXDl2QlWUYsQzXs';
const map = new ol.Map({
  controls: ol.control.defaults().extend([
    // new ol.control.FullScreen({
    // // labelActive: '-'
    // }),
    
  ]),
  view: new ol.View({
    center: ol.proj.fromLonLat([
      // 24,38 // LGAV
      19.9122,39.6019 // LGKR
    ]),
    constrainResolution: true,                      
    zoom: 11
    }),
     /* layers: [
    new ol.layer.Tile({
      source: new ol.source.TileJSON({
        url: 
        crossOrigin: 
      }),
    }) ],
    */
  target: 'js-map'
})
styleJson=styleJson1;
olms(map, styleJson);

// log("Base Layer Loaded");

var aerodromesLayer=new ol.layer.Image({
  title: 'Aerodromes',
  source: new ol.source.ImageWMS({
    url:'http://localhost:8080/geoserver/airGIS/wms',
    params:{'LAYERS':'airGIS:aerodromes_layer'},
    serverType:'geoserver'
        })
    });
map.addLayer(aerodromesLayer);

// log("Aerodrome Layer Loaded");

  var airwaysLayer=new ol.layer.Image({
    title: 'Airways',
  source: new ol.source.ImageWMS({
    url:'http://localhost:8080/geoserver/airGIS/wms',
    params:{'LAYERS':'airGIS:airways_layer'},
    serverType:'geoserver'
    })
  });
  
map.addLayer(airwaysLayer);
airwaysLayer.setOpacity(0.4);

// log("Airways Layer Loaded");

var navaidsLayer=new ol.layer.Image({
  title: 'Navaids',
  source: new ol.source.ImageWMS({
    url:'http://localhost:8080/geoserver/airGIS/wms',
    params:{'LAYERS':'airGIS:navaids_layer'},
    serverType:'geoserver'
    })
});
map.addLayer(navaidsLayer);
// log("Navaids Layer Loaded");

var waypointsLayer=new ol.layer.Image({
  title: 'Waypoints',
  source: new ol.source.ImageWMS({
    url:'http://localhost:8080/geoserver/airGIS/wms',
    params:{'LAYERS':'airGIS:waypoints_layer'},
    serverType:'geoserver'
    })
});
map.addLayer(waypointsLayer);
// log("Waypoints Layer Loaded");


aerodromesLayer.setZIndex(9);
airwaysLayer.setZIndex(7);
navaidsLayer.setZIndex(8);
waypointsLayer.setZIndex(5);

var italianVFRLayer=new ol.layer.Vector({
  title: 'italianVFRLayer',
  class: 'italianVFRLayer',
  source: new ol.source.Vector({}),
  style: new ol.style.Style({
      fill: new ol.style.Fill({ color: [255, 0, 255, 0.2]}),
      stroke: new ol.style.Stroke({ color: [255, 0, 255, 1], width: 2 })      
          }),
  visible:true,
  ZIndex:2,
  // declutter: true
});


for (var i=0; i<italianVFRCoordinates.length;i=i+2){

 italianVFRCoordinates4326.push(ol.proj.fromLonLat([italianVFRCoordinates[i],italianVFRCoordinates[i+1]]));
}

italianVFRFeature=new ol.Feature({
  geometry: new ol.geom.Polygon([italianVFRCoordinates4326]),
        
  stroke: new ol.style.Stroke({ color: 'rgba(255,0,255,1)', width: 2})
});
italianVFRLayer.getSource().addFeature(italianVFRFeature);
map.addLayer(italianVFRLayer);
italianVFRLayer.setZIndex(2);
























// var airwaysOpacity=Number($("#airways-opacity").val());
// $("#airways-opacity").change(function() {
//   airwaysOpacity=Number($("#airways-opacity").val());
//   airwaysLayer.setOpacity(airwaysOpacity);
// })
/*
  $('[data-toggle="tooltip"]').tooltip({
    trigger : 'hover'
  });
  $('[data-toggle="tooltip"]').tooltip('hide');
*/

var aerodromeCircleLayer=new ol.layer.Vector({
  title: 'aerodromeCircleLayer',
  class: 'aerodromeCircleLayer',
  source: new ol.source.Vector({}),
  style: new ol.style.Style({
      fill: new ol.style.Fill({ color: [255, 255, 255, 0.0]}),
      stroke: new ol.style.Stroke({ color: [255, 255, 255, 1], width: 1 }) 
      // fill: new ol.style.Fill({ color: [0, 0, 0, 0.0]}),
      // stroke: new ol.style.Stroke({ color: [0, 0, 0, 1], width: 1 })    
          }),
  visible:false,
  ZIndex:2,
  // declutter: true
});





map.addLayer(aerodromeCircleLayer);








function refreshCircleAerodrome()
{

  aerodromeCircleLayer.getSource().clear();
  aerodromeCircleLayer.setSource(new ol.source.Vector({}));




  if (aerodromeCircleLayer.getSource().getState()=='ready') {

  aerodromeCircleFeature=[];
  var spaceOfCircle=[0,1,2,6];
  var numberOfCircles=(60/(5*spaceOfCircle[aerodromeCircleState]));

  for (var i=0; i<((60/(5*spaceOfCircle[aerodromeCircleState]))+1); i++){
  // console.log('i: '+i);
  // console.log('aerodromeCircleState :'+aerodromeCircleState);
  // console.log('space: '+spaceOfCircle[aerodromeCircleState]*i);
    aerodromeCircleFeature[i]=new ol.Feature({
      geometry: new ol.geom.Circle( ol.proj.fromLonLat([onWatchAerodromeLongitude,onWatchAerodromeLatitude]),  11939*spaceOfCircle[aerodromeCircleState]*i)           //0.0834 in WS84 is equal to 5 minutes or 5NM
    });
    aerodromeCircleLayer.getSource().addFeature(aerodromeCircleFeature[i]);
    
  }
 
  aerodromeCircleLayer.getSource().getFeatures()[numberOfCircles].setStyle(new ol.style.Style({
    fill: new ol.style.Fill({ color: [255, 255, 255, 0.06]}),
    stroke: new ol.style.Stroke({ color: [255, 255, 255, 1], width: 1 })
    // fill: new ol.style.Fill({ color: [0, 0, 0, 0.06]}),
    // stroke: new ol.style.Stroke({ color: [0, 0, 0, 1], width: 1 })
    

  }));
  
  
  aerodromeCircleLayer.setZIndex(2);
}
  
}


//initialize visibility of maps to IFR Low
italianVFRLayer.setVisible(false);
airwaysLayer.setVisible(true);
waypointsLayer.setVisible(true);



