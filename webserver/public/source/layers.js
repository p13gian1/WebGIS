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
  source: new ol.source.Vector({}),
  style: new ol.style.Style({
      fill: new ol.style.Fill({ color: [255, 255, 255, 0.0]}),
      stroke: new ol.style.Stroke({ color: [255, 255, 255, 1], width: 1 })      
          }),
  ZIndex:2,
  // declutter: true
});

aerodromeCircleFeature=[];
for (var i=0; i<6; i++){
  aerodromeCircleFeature[i]=new ol.Feature({
    geometry: new ol.geom.Circle( ol.proj.fromLonLat([19.9122,39.6019]),  9284*i )           //0.0834 in WS84 equal to 5 minutes or 5NM
  });
  aerodromeCircleLayer.getSource().addFeature(aerodromeCircleFeature[i]);
  
}


aerodromeCircleLayer.getSource().getFeatures()[5].setStyle(new ol.style.Style({
  fill: new ol.style.Fill({ color: [255, 255, 255, 0.06]}),
  stroke: new ol.style.Stroke({ color: [255, 255, 255, 1], width: 1 })      
}));


aerodromeCircleLayer.setZIndex(2);

map.addLayer(aerodromeCircleLayer);