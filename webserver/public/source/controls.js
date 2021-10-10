// ******************************************************************************
// *                            GIANNIOS ANTONIOS                               *
// *                                 P2013153                                   *
// *                            IONION UNIVERSITY                               *
// *                                24/08/2021                                  *
// *                                  webGIS                                    *
// *                                controls.js                                 *
// *                          written in Javascript                             *
// *               it contains all the main buttons of the application          *
// *                each button calls a function when it is pressed             *
// ******************************************************************************

// declaring global variables
var spriteIsPlane = false; // it is used to represent the plane spite as a green dot when it's false, as a plane when it's true
var mapCenterIsVisible = false; // it is used to represent a cross at the center of the screen when it's true
var aerodromeCircleState = 0; // it is used as an index for the aerodrome circle tool around an aerodrome
// initial state of aerodrome circle is unvisible;  0=unvisible, 1=5 n.m space, 2=10 n.m space, 3=30 n.m space
var mainbarControls = new ol.control.Bar(); // making the first control bar
mainbarControls.setPosition("top"); // putting it at the top side of the screen
map.addControl(mainbarControls); // adding the first control bar to the map

mainbarControls.addControl(
  new ol.control.Button({
    //button 'H' which loads home page
    html: "<a>H</a>",
    title: "Home",
    handleClick: () => {
      if (fullScreen == true) {
        //if application is in fullscreen mode then exit fullscreen
        document.exitFullscreen();
        prevStateFullScreen = true; //this variable goes true in order to store that application was in fullscreen mode so when it returns to back to map it will change to fullscreen mode again
      }
      reLoad(); //calling reload function to reload application
    },
  })
);

mainbarControls.addControl(
  new ol.control.Button({
    //button 'A' which loads AFTN page
    html: "<a>A</a>",
    title: "AFTN Terminal",
    handleClick: function () {
      if (fullScreen == true) {
        //if application is in fullscreen mode then exit fullscreen
        document.exitFullscreen();
        prevStateFullScreen = true; //this variable goes true in order to store that application was in fullscreen mode so when it returns to back to map it will change to fullscreen mode again
      }
      menuClickAFTN(); //calling menuClickAFTN function to load AFTN page
    },
  })
);

mainbarControls.addControl(new ol.control.FullScreen()); //button for fullscreen mode

var mainbarFlightRules = new ol.control.Bar(); //making the second control bar
mainbarFlightRules.setPosition("top-right"); //putting it as the top right side of the screen
map.addControl(mainbarFlightRules); //adding second control bar to the map

var nestedFlightRules = new ol.control.Bar({
  toggleOne: true,
  group: true,
}); //making nested control bar which is in toggle mode
mainbarFlightRules.addControl(nestedFlightRules); //adding this nested control bar to second control bar

var vfrMapButton = new ol.control.Button({
  //button V for VFR layer
  html: "<a>V</a>",
  className: "VFR",
  title: "VFR map",
  active: true,
  handleClick: function () {
    VFRLayer.setVisible(true); //when button is clicked, make VFR layer visible
    airwaysLayer.setVisible(false); //hide airways layer
    waypointsLayer.setVisible(false); //hide waypoints layer
    waypointsVFRLayer.setVisible(true); //make waypoints VFR layer visible
  },
});
nestedFlightRules.addControl(vfrMapButton); //add this button to nested control bar

var ifrLowMapButton = new ol.control.Button({
  //IL button for IFR Low layer
  html: "<a>IL</a>",
  className: "IFR Low",
  title: "IFR Low map",
  active: true,
  handleClick: function () {
    VFRLayer.setVisible(false); //when button is clicked, hide VFR layer
    airwaysLayer.setVisible(true); //show airways layer
    waypointsLayer.setVisible(true); //show waypoints layer
    waypointsVFRLayer.setVisible(false); //hide waypoints VFR layer
  },
});
nestedFlightRules.addControl(ifrLowMapButton); //add this button to nested control bar

var ifrHighMapButton = new ol.control.Toggle({
  html: "<a>IH</a>",
  className: "IFR High",
  title: "IFR High map",
  active: true,
  onToggle: function (active) {
    if (active) {
      spriteIsPlane = true;
    } else {
      spriteIsPlane = false;
    }
  },
});
nestedFlightRules.addControl(ifrHighMapButton);

var MTMAMapButton = new ol.control.Toggle({
  html: "<a>T</a>",
  className: "MTMAs",
  title: "MTMAs",
  active: false,
  onToggle: function (active) {
    if (active) {
      MTMALayer.setVisible(true);
    } else {
      MTMALayer.setVisible(false);
    }
  },
});
nestedFlightRules.addControl(MTMAMapButton);

var CTRMapButton = new ol.control.Toggle({
  html: "<a>C</a>",
  className: "CTRs",
  title: "CTRs",

  active: false,
  onToggle: function (active) {
    if (active) {
      CTRLayer.setVisible(true);
    } else {
      CTRLayer.setVisible(false);
    }
  },
});
nestedFlightRules.addControl(CTRMapButton);

var LGCMapButton = new ol.control.Toggle({
  html: "<a>L</a>",
  className: "LGCs",
  title: "LGCs",

  active: false,
  onToggle: function (active) {
    if (active) {
      LGCLayer.setVisible(true);
    } else {
      LGCLayer.setVisible(false);
    }
  },
});
nestedFlightRules.addControl(LGCMapButton);

var LGDMapButton = new ol.control.Toggle({
  html: "<a>D</a>",
  className: "LGDs",
  title: "LGDs",

  active: false,
  onToggle: function (active) {
    if (active) {
      LGDLayer.setVisible(true);
    } else {
      LGDLayer.setVisible(false);
    }
  },
});
nestedFlightRules.addControl(LGDMapButton);

var LGMMapButton = new ol.control.Toggle({
  html: "<a>M</a>",
  className: "LGMs",
  title: "LGMs",
  active: false,
  onToggle: function (active) {
    if (active) {
      LGMLayer.setVisible(true);
    } else {
      LGMLayer.setVisible(false);
    }
  },
});
nestedFlightRules.addControl(LGMMapButton);

var LGRMapButton = new ol.control.Toggle({
  html: "<a>R</a>",
  className: "LGRs",
  title: "LGRs",

  active: false,
  onToggle: function (active) {
    if (active) {
      LGRLayer.setVisible(true);
    } else {
      LGRLayer.setVisible(false);
    }
  },
});
nestedFlightRules.addControl(LGRMapButton);

var flightControls = new ol.control.Bar();
flightControls.setPosition("left");
map.addControl(flightControls);

flightControls.addControl(
  new ol.control.Toggle({
    html: "<a>r</a>",
    className: "route-button",
    title: "Press to view the route of a flight",
    active: false,
    onToggle: function (active) {
      if (active) {
        routeVisibility = true;
      } else {
        routeVisibility = false;
      }

      lengthOfLayers = map.getLayers().getLength();

      for (var i = 0; i < lengthOfLayers; i = i + 1) {
        if (map.getLayers().getArray()[i].get("title") == "Aircraft Route") {
          map.getLayers().getArray()[i].setVisible(routeVisibility);
        }
      }
    },
  })
);

flightControls.addControl(
  new ol.control.Toggle({
    html: "<a>+</a>",
    className: "map-center-button",
    title: "Press to view the center of the map",
    active: false,
    onToggle: function (active) {
      if (active) {
        mapCenterIsVisible = true;
      } else {
        mapCenterIsVisible = false;
      }

      map.getControls().getArray()[27].setVisible(mapCenterIsVisible);
    },
  })
);

flightControls.addControl(
  new ol.control.Button({
    html: "<a>Z</a>",
    className: "cirlce-button",
    title: "Press to view aerodrome's ATZ",
    active: false,
    handleClick: function () {
      if (aerodromeCircleState == 3) {
        aerodromeCircleState = 0;
        aerodromeCircleLayer.setVisible(false);
      } else {
        aerodromeCircleState++;
        aerodromeCircleLayer.setVisible(true);
        refreshCircleAerodrome();
      }
    },
  })
);

var ctrl = new ol.control.LayerSwitcher({});
ctrl.setHeader("Layers Opacity");

map.addControl(ctrl);

var mousePositionControl = new ol.control.MousePosition({
  coordinateFormat: ol.coordinate.createStringXY(4),
  projection: "EPSG:4326",
  className: "custom-mouse-position",
  target: document.getElementById("mouse-position"),
  undefinedHTML: "&nbsp;",
});
map.addControl(mousePositionControl);

var nestedFlightPlan = new ol.control.Bar({ toggleOne: false, group: true });

fillFPLbutton = new ol.control.Button({
  html: "<a>F</a>",
  className: "fill-flp-button",
  title: "Fill a Flight Plan",
  handleClick: function () {
    $(".fpl-form").css("display", "block");
    $(".fpl-form-margin").css("display", "block");
  },
});

stripBaybutton = new ol.control.Button({
  html: "<a>S</a>",
  className: "strip-bay-button",
  title: "View Strip Bay",

  handleClick: function () {
    $(".strip-bay-form").css("display", "block");
    $(".strip-bay-form-margin").css("display", "block");
  },
});

nestedFlightPlan.addControl(fillFPLbutton);
nestedFlightPlan.addControl(stripBaybutton);
nestedFlightPlan.setPosition("top-left");
map.addControl(nestedFlightPlan);

var baseMapButton = new ol.control.Toggle({
  html: "<a>B</a>",
  className: "base-map-button",
  title: "Press to change base map colours",

  active: true,
  onToggle: function (active) {
    if (active) {
      styleJson = styleJson1;
      colorCircleAerodromeFill = [255, 255, 255, 0.06]; // when baselayer is green
      colorCircleAerodromeStroke = [255, 255, 255, 1];
    } else {
      styleJson = styleJson2;
      colorCircleAerodromeFill = [255, 0, 0, 0.06]; //when baselayer is white
      colorCircleAerodromeStroke = [255, 0, 0, 1];
    }

    var indexOfBaseLayer = getIndexOfBaseLayer();
    map.getLayers().getArray().splice(indexOfBaseLayer, 1);

    map.render();
    olms(map, styleJson);

    setTimeout(function () {
      indexOfBaseLayer = getIndexOfBaseLayer();
      map.getLayers().getArray()[indexOfBaseLayer].setZIndex(-1);
      if (aerodromeCircleState != 0) {
        refreshCircleAerodrome();
      }
    }, 4000);
  },
});
map.addControl(baseMapButton);

//checking if map is on fullscreen mode
map
  .getControls()
  .getArray()[3]
  .getControls()[2]
  .on("enterfullscreen", function () {
    fullScreen = true;
  });
map
  .getControls()
  .getArray()[3]
  .getControls()[2]
  .on("leavefullscreen", function () {
    fullScreen = false;
  });

var scaleLineButton = new ol.control.ScaleLine({
  units: "nautical",
});

map.addControl(scaleLineButton);

var targetControl = new ol.control.Target({
  style: [
    new ol.style.Style({
      image: new ol.style.RegularShape({
        radius: 10,
        points: 2,
        fill: new ol.style.Fill({}),
        stroke: new ol.style.Stroke({
          width: 2,
          color: [0, 0, 0, 1],
        }),
      }),
    }),
    new ol.style.Style({
      image: new ol.style.RegularShape({
        radius: 10,
        points: 2,
        rotation: Math.PI / 2,
        fill: new ol.style.Fill({}),
        stroke: new ol.style.Stroke({
          width: 2,
          color: [0, 0, 0, 1],
        }),
      }),
    }),
  ],

  visible: mapCenterIsVisible,
  composite: "",
  zIndex: 25000,
});

map.addControl(targetControl);

function getIndexOfBaseLayer() {
  for (var i = 0; i < map.getLayers().getArray().length; i++) {
    if (map.getLayers().getArray()[i].get("mapbox-layers") == "water") {
      return i;
    }
  }
}
