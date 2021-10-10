var aircraftLayer = [];
var aircraftRouteSource = [];
var routeVisibility = false;
var aircraftFont = "maki2-airport";
var aircrafts = [];
var routes = [];
var style = [
  new ol.style.Style({
    image: new ol.style.Shadow({
      radius: 15,
    }),
    stroke: new ol.style.Stroke({
      color: [255, 0, 0, 0], //route color
      width: 3,
    }),
    fill: new ol.style.Fill({
      color: [255, 0, 0, 0], //route color
    }),
    zIndex: -1,
  }),
  new ol.style.Style({
    image: new ol.style.FontSymbol({
      glyph: aircraftFont,
      fontSize: 1,
      radius: 15,
      offsetX: -5, //offsets!!
      offsetY: -5,
      fill: new ol.style.Fill({
        color: "navy",
      }),
      stroke: new ol.style.Stroke({
        width: 2,
        color: "#f80",
      }),
    }),
  }),
  new ol.style.Style({
    image: new ol.style.RegularShape({
      radius: 0,
      points: 1,
      fill: new ol.style.Fill({
        color: [0, 255, 0, 1],
      }),
      stroke: new ol.style.Stroke({
        width: 10,
        color: [0, 255, 0, 1],
      }),
    }),
  }),
];

var callSignLabel = new ol.style.RegularShape({
  radius: 0,
  points: 0,
});

var callSignLabelStyle;
var altitudeLabel = new ol.style.RegularShape({
  radius: 0,
  points: 0,
});

var altitudeLabelStyle = new ol.style.Style({
  image: altitudeLabel,
  text: new ol.style.Text({
    offsetY: -40,
    rotation: 0,
    text: "380", //altitude
    overflow: true,
    font: 15 + "px Calibri,sans-serif",
    fill: new ol.style.Fill({
      color: "navy",
    }),
    stroke: new ol.style.Stroke({
      width: 2,
      color: "#f80",
    }),
  }),
});

var velocityLabel = new ol.style.RegularShape({
  radius: 0,
  points: 0,
});

var velocityLabelStyle = new ol.style.Style({
  image: velocityLabel,
  text: new ol.style.Text({
    offsetY: -25,
    rotation: 0,
    text: "", //velocity
    overflow: true,
    font: 15 + "px Calibri,sans-serif",
    fill: new ol.style.Fill({
      color: "navy",
    }),
    stroke: new ol.style.Stroke({
      width: 2,
      color: "#f80",
    }),
  }),
});
// Offset image

var speedValueSlider = 0.04;
$("#speed").click(function () {
  speedValueSlider = Number($("#speed").val());
});
// Animation
var shadowFeature,
  aircraftFeature,
  callSignLabelFeature,
  altitudeLabelFeature,
  velocityLabelFeature;
var shadowAnimationFeature,
  aircraftAnimationFeature,
  callSignLabelAnimationFeature,
  altitudeLabelAnimationFeature,
  velocityLabelAnimationFeature;
var path;
var source;
var routeLayer = [];
var routeFeature;
var routeVector = [];

createAircraftLayer = () => {
  source = new ol.source.Vector({
    url: routes[aircraftId],
    format: new ol.format.GPX(),
  });
  aircraftLayer[aircraftId] = new ol.layer.Vector({
    title: "Aircrafts",
    source: source,
    id: 100 + aircraftId,
    style: style,
  });
  aircraftLayer[aircraftId].setZIndex(900);
  map.addLayer(aircraftLayer[aircraftId]);
  routeVector[aircraftId] = new ol.source.Vector({});
  routeLayer[aircraftId] = new ol.layer.Vector({
    title: "Aircraft Route",
    source: routeVector[aircraftId],
    visible: routeVisibility,
    updateWhileAnimating: true,
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({ color: getRandomColor(), width: 10 }),
      zindex: -1,
    }),
  });
};

animateTheFeature = () => {
  source.once("change", function (e) {
    if (source.getState() === "ready") {
      path = source.getFeatures()[0];
    }
    if (path) {
      shadowFeature = new ol.Feature(new ol.geom.Point([0, 0]));
      shadowFeature.setStyle(style[0]);
      animationFeatureShadow = new ol.featureAnimation.Path({
        path: path,
        rotate: true,
        easing: "linear",
        speed: speedValueSlider,
      });
      aircraftFeature = new ol.Feature(new ol.geom.Point([0, 0]));
      if (spriteIsPlane) {
        aircraftFeature.setStyle(style[1]);
      } else {
        aircraftFeature.setStyle(style[2]);
      }
      source.addFeature(aircraftFeature);
      aircraftAnimationFeature = new ol.featureAnimation.Path({
        path: path,
        rotate: true,
        easing: "linear",
        speed: speedValueSlider,
      });
      callSignLabelFeature = new ol.Feature(new ol.geom.Point([0, 0]));
      callSignLabelStyle = new ol.style.Style({
        image: callSignLabel,
        text: new ol.style.Text({
          offsetY: -55,
          rotation: 0,
          text: aircrafts[aircraftId], //call sign
          overflow: true,
          font: 15 + "px Calibri,sans-serif",
          fill: new ol.style.Fill({
            color: "navy",
          }),
          stroke: new ol.style.Stroke({
            width: 2,
            color: "#f80",
          }),
        }),
      });
      callSignLabelFeature.setStyle(callSignLabelStyle);
      log(
        "(DEP-" +
          aircrafts[aircraftId] +
          "-LGKR" +
          getUTCtime() +
          "-LGKC-DOF/" +
          getUTCdateICAO() +
          ")"
      );
      log("---------------------------");
      callSignLabelFeature.setId(aircraftId);
      aircraftLayer[aircraftId].getSource().addFeature(callSignLabelFeature);
      callSignLabelAnimationFeature = new ol.featureAnimation.Path({
        path: path,
        rotate: false,
        easing: "linear",
        speed: speedValueSlider,
      });
      altitudeLabelFeature = new ol.Feature(new ol.geom.Point([0, 0]));
      altitudeLabelFeature.setStyle(altitudeLabelStyle);
      altitudeLabelAnimationFeature = new ol.featureAnimation.Path({
        path: path,
        rotate: false,
        easing: "linear",
        speed: speedValueSlider,
      });
      velocityLabelFeature = new ol.Feature(new ol.geom.Point([0, 0]));
      velocityLabelStyle = new ol.style.Style({
        image: velocityLabel,
        text: new ol.style.Text({
          offsetY: -25,
          rotation: 0,
          text: speedValueSlider, //velocity
          overflow: true,
          font: 15 + "px Calibri,sans-serif",
          fill: new ol.style.Fill({
            color: "navy",
          }),
          stroke: new ol.style.Stroke({
            width: 2,
            color: "#f80",
          }),
        }),
      });
      velocityLabelFeature.setStyle(velocityLabelStyle);
      velocityLabelAnimationFeature = new ol.featureAnimation.Path({
        path: path,
        rotate: false,
        easing: "linear",
        speed: speedValueSlider,
      });
      aircraftLayer[aircraftId].getSource().addFeature(velocityLabelFeature);
      aircraftLayer[aircraftId].animateFeature(
        shadowFeature,
        animationFeatureShadow
      );
      aircraftLayer[aircraftId].animateFeature(
        aircraftFeature,
        aircraftAnimationFeature
      );
      aircraftLayer[aircraftId].animateFeature(
        callSignLabelFeature,
        callSignLabelAnimationFeature
      );
      aircraftLayer[aircraftId].animateFeature(
        altitudeLabelFeature,
        altitudeLabelAnimationFeature
      );
      aircraftLayer[aircraftId].animateFeature(
        velocityLabelFeature,
        velocityLabelAnimationFeature
      );
      pathCoor = path.getGeometry().getFlatCoordinates();
      var line = [];
      var segment = [];
      for (var i = 0; i < pathCoor.length; i = i + 2) {
        segment = [pathCoor[i], pathCoor[i + 1]];
        line.push(segment);
      }
      routeFeature = new ol.Feature({
        geometry: new ol.geom.LineString(line),
      });
      routeVector[aircraftId].addFeature(routeFeature);
      map.addLayer(routeLayer[aircraftId]);
      callSignLabelAnimationFeature.once("animationend", function (e) {
        if (e.feature) {
          var id = e.feature.getId();
          var arr = e.feature.getStyle().getText().getText();
          log(
            "(ARR-" +
              arr +
              "-LGKC" +
              "-LGKR" +
              getUTCtime() +
              "-DOF/" +
              getUTCdateICAO() +
              ")"
          );
          log("----------------");
          map.removeLayer(aircraftLayer[id]);
          map.removeLayer(routeLayer[id]);
          var tempArrayEndOfFlight = [];
          tempArrayEndOfFlight[0] = aircrafts[id];
          let tempString = routes[id].replace(
            "../src/data/GPXFiles/" + aircrafts[id] + "-",
            ""
          );
          tempArrayEndOfFlight[1] = tempString.slice(0, 4);
          tempArrayEndOfFlight[2] = tempString.slice(4, 8);
          tempArrayEndOfFlight[3] = tempString.slice(9, 13);
          fetch(
            "http://localhost:3000/EndOfFlight?q=" + tempArrayEndOfFlight
          ).then((response) => {});
          fetch("http://localhost:3000/DeleteGPXFile?q=" + routes[id]).then(
            (response) => {}
          );
        }
      });
    }
  });
};

function getRandomColor() {
  var colorIndex = "#";
  var lettersIndex = "0123456789ABCDEF";
  for (var i = 0; i < 6; i++) {
    colorIndex += lettersIndex[Math.floor(Math.random() * 16)];
  }
  return colorIndex;
}

function activateFlight(aircraftIDValue, filenameTemp) {
  aircrafts.push(aircraftIDValue); //pushing name of aircraft in aircrafts array
  routes.push("../src/data/GPXFiles/" + filenameTemp);
}
