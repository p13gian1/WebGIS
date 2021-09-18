
var styleJson1 = 'https://api.maptiler.com/maps/e31d675e-d790-422f-9bdb-8e53ed2c77a3/style.json?key=uvpLhVXDl2QlWUYsQzXs';
var styleJson2 = 'https://api.maptiler.com/maps/52cf67a2-9470-46ef-98b0-215feb1fe7be/style.json?key=uvpLhVXDl2QlWUYsQzXs';

const map = new ol.Map({
                        controls: ol.control.defaults().extend([
        
                        ]),
                        view: new ol.View({
                                            center: ol.proj.fromLonLat([
                                                                        19.9122,39.6019 // LGKR
                                            ]),
                                            constrainResolution: true,                      
                                            zoom: 11
                        }),     
                        target: 'js-map'
})

styleJson=styleJson1;
olms(map, styleJson);
var aerodromesLayer=new ol.layer.Image({
                                        title: 'Aerodromes',
                                        source: new ol.source.ImageWMS({
                                                                        url:'http://localhost:8080/geoserver/airGIS/wms',
                                                                        params:{'LAYERS':'airGIS:aerodromes_layer'},
                                                                        serverType:'geoserver'
                                        })
});

map.addLayer(aerodromesLayer);

var airwaysLayer=new ol.layer.Image({
                                      title: 'Airways',
                                      source: new ol.source.ImageWMS({
                                                                      url:'http://localhost:8080/geoserver/airGIS/wms',
                                                                      params:{'LAYERS':'airGIS:airways_layer'
                                                                      },
                                                                      serverType:'geoserver'
                                      })
});
  
map.addLayer(airwaysLayer);
airwaysLayer.setOpacity(0.4);

var navaidsLayer=new ol.layer.Image({
                                      title: 'Navaids',
                                      source: new ol.source.ImageWMS({
                                                                      url:'http://localhost:8080/geoserver/airGIS/wms',
                                                                      params:{ 
                                                                              'LAYERS':'airGIS:navaids_layer'
                                                                      },
                                                                      serverType:'geoserver'
                                      })
});

map.addLayer(navaidsLayer);


var waypointsLayer=new ol.layer.Image({
  title: 'Waypoints',
  source: new ol.source.ImageWMS({
    url:'http://localhost:8080/geoserver/airGIS/wms',
    params:{'LAYERS':'airGIS:waypoints_layer'},
    serverType:'geoserver'
    })
});
map.addLayer(waypointsLayer);



var waypointsVFRLayer=new ol.layer.Image({
  title: 'Waypoints_VFR',
  source: new ol.source.ImageWMS({
    url:'http://localhost:8080/geoserver/airGIS/wms',
    params:{'LAYERS':'airGIS:waypoints_vfr_layer'},
    serverType:'geoserver'
    }),
    visible:false
});
map.addLayer(waypointsVFRLayer);

aerodromesLayer.setZIndex(9);
airwaysLayer.setZIndex(7);
navaidsLayer.setZIndex(8);
waypointsLayer.setZIndex(5);
waypointsVFRLayer.setZIndex(5);

var VFRLayer=new ol.layer.Image({
                                  title: 'VFRLayer',
                                  class: 'VFRLayer',
                                  source: new ol.source.ImageWMS({
                                                                  url:'http://localhost:8080/geoserver/airGIS/wms',
                                                                  params:{
                                                                          'LAYERS':'airGIS:vfr_layer'
                                                                  },
                                                                  serverType:'geoserver'
                                  }),
                                  visible:false,
                                  ZIndex:2,
});

map.addLayer(VFRLayer);
VFRLayer.setZIndex(2);

var MTMALayer=new ol.layer.Image({
                                  title: 'MTMA_Layer',
                                  class: 'MTMA_Layer',
                                  source: new ol.source.ImageWMS({
                                                                    url:'http://localhost:8080/geoserver/airGIS/wms',
                                                                    params:{
                                                                            'LAYERS':'airGIS:mtma_layer'
                                                                    },
                                                                    serverType:'geoserver'
                                  }),
                                  visible:false,
                                  ZIndex:3,
});

map.addLayer(MTMALayer);
MTMALayer.setZIndex(3);

var CTRLayer=new ol.layer.Image({
                                  title: 'CTR_Layer',
                                  class: 'CTR_Layer',
                                  source: new ol.source.ImageWMS({
                                                                    url:'http://localhost:8080/geoserver/airGIS/wms',
                                                                    params:{
                                                                            'LAYERS':'airGIS:ctr_layer'
                                                                    },
                                                                    serverType:'geoserver'
                                  }),
                                  visible:false,
                                  ZIndex:3,
});

map.addLayer(CTRLayer);
CTRLayer.setZIndex(3);

var LGCLayer=new ol.layer.Image({
                                  title: 'LGC_Layer',
                                  class: 'LGC_Layer',
                                  source: new ol.source.ImageWMS({
                                                                    url:'http://localhost:8080/geoserver/airGIS/wms',
                                                                    params:{
                                                                            'LAYERS':'airGIS:lgc_layer'
                                                                    },
                                                                    serverType:'geoserver'
                                  }),
                                  visible:false,
                                  ZIndex:3,
});

map.addLayer(LGCLayer);
LGCLayer.setZIndex(1);

var LGDLayer=new ol.layer.Image({
                                  title: 'LGD_Layer',
                                  class: 'LGD_Layer',
                                  source: new ol.source.ImageWMS({
                                                                  url:'http://localhost:8080/geoserver/airGIS/wms',
                                                                  params:{
                                                                          'LAYERS':'airGIS:lgd_layer'
                                                                  },
                                                                  serverType:'geoserver'
                                  }),
                                  visible:false,
                                  ZIndex:3,
});

map.addLayer(LGDLayer);
LGDLayer.setZIndex(1);

var LGMLayer=new ol.layer.Image({
                                  title: 'LGM_Layer',
                                  class: 'LGM_Layer',
                                  source: new ol.source.ImageWMS({
                                                                    url:'http://localhost:8080/geoserver/airGIS/wms',
                                                                    params:{
                                                                            'LAYERS':'airGIS:lgm_layer'
                                                                    },
                                                                    serverType:'geoserver'
                                  }),
                                  visible:false,
                                  ZIndex:3,
});


map.addLayer(LGMLayer);
LGMLayer.setZIndex(1);

var LGRLayer=new ol.layer.Image({
                                  title: 'LGR_Layer',
                                  class: 'LGR_Layer',
                                  source: new ol.source.ImageWMS({
                                                                  url:'http://localhost:8080/geoserver/airGIS/wms',
                                                                  params:{
                                                                          'LAYERS':'airGIS:lgr_layer'
                                                                  },
                                                                  serverType:'geoserver'
                                  }),
                                  visible:false,
                                  ZIndex:3,
});

map.addLayer(LGRLayer);
LGRLayer.setZIndex(1);

var colorCircleAerodromeFill=[255, 255, 255, 0.06];
var colorCircleAerodromeStroke=[255, 255, 255, 1]; 
                                                          
var aerodromeCircleLayer=new ol.layer.Vector({
                                              title: 'aerodromeCircleLayer',
                                              class: 'aerodromeCircleLayer',
                                              source: new ol.source.Vector({
                                              }),
                                              style: new ol.style.Style({                                                
                                                                          stroke: new ol.style.Stroke({
                                                                                                        color:colorCircleAerodromeStroke,
                                                                                                        width: 1 
                                                                          }) 
                                              }),
                                              visible:false,
                                              ZIndex:2,  
});

map.addLayer(aerodromeCircleLayer);

function refreshCircleAerodrome() {
                                    aerodromeCircleLayer.getSource().clear();
                                    aerodromeCircleLayer.setSource(new ol.source.Vector({
                                    }));
                                    aerodromeCircleLayer.setStyle(new ol.style.Style({
                                                                                      stroke: new ol.style.Stroke({ 
                                                                                                                    color: colorCircleAerodromeStroke,
                                                                                                                    width: 1
                                                                                      })
                                    }));
                                    if (aerodromeCircleLayer.getSource().getState()=='ready') {
                                                                                                aerodromeCircleFeature=[];
                                                                                                var spaceOfCircle=[0,1,2,6];
                                                                                                var numberOfCircles=(60/(5*spaceOfCircle[aerodromeCircleState]));
                                                                                                for (var i=0; i<((60/(5*spaceOfCircle[aerodromeCircleState]))+1); i++){
                                                                                                                                                                        aerodromeCircleFeature[i]=new ol.Feature({
                                                                                                                                                                                                                  geometry: new ol.geom.Circle(ol.proj.fromLonLat([onWatchAerodromeLongitude,onWatchAerodromeLatitude]), 11939*spaceOfCircle[aerodromeCircleState]*i)           //0.0834 in WS84 is equal to 5 minutes or 5NM
                                                                                                                                                                        });
                                                                                                                                                                        aerodromeCircleLayer.getSource().addFeature(aerodromeCircleFeature[i]);
                                                                                                }
                                                                                                aerodromeCircleLayer.getSource().getFeatures()[numberOfCircles].setStyle(new ol.style.Style({
                                                                                                                                                                                              fill: new ol.style.Fill({
                                                                                                                                                                                                                        color: colorCircleAerodromeFill
                                                                                                                                                                                              }),
                                                                                                                                                                                              stroke: new ol.style.Stroke({
                                                                                                                                                                                                                            color: colorCircleAerodromeStroke, width:1
                                                                                                                                                                                              })
                                                                                                }));   
                                                                                                aerodromeCircleLayer.setZIndex(2);
                                    }
  
}

//initialize visibility of maps to IFR Low
VFRLayer.setVisible(false);
airwaysLayer.setVisible(true);
waypointsLayer.setVisible(true);
waypointsVFRLayer.setVisible(false);