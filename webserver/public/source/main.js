var tongleContext = false;
var aircraftId = -1;
var fullScreen = false;
var prevStateFullScreen = false;

fetch("http://localhost:3000/Reset?q= ").then((response) => {});

init = (a, b, mapFlag) => {
  onWatchAerodromeLongitude = a;
  onWatchAerodromeLatitude = b;
  map.updateSize();
  if (prevStateFullScreen == true) {
    document.getElementById("js-map").requestFullscreen();
    prevStateFullScreen = false;
  }
  $(function () {
    $("LGKC").click(function (event) {
      alert("working!");
    });
  });
  if (mapFlag == 1) {
    flyTo(ol.proj.fromLonLat([a, b]), function () {});
    //changing coordinates of on watch aerodrome circle layer
    var indexOfCircleLayer = getIndexofCircleLayer();
    if (aerodromeCircleState != 0) {
      map.getLayers().getArray()[indexOfCircleLayer].getSource().clear();
      map
        .getLayers()
        .getArray()
        [indexOfCircleLayer].setSource(new ol.source.Vector({}));
      if (
        map.getLayers().getArray()[indexOfCircleLayer].getSource().getState() ==
        "ready"
      ) {
        refreshCircleAerodrome();
      }
    }
  }
};

flyTo = (location, done) => {
  var duration = 4000;
  var zoom = 11;
  var parts = 2;
  var called = false;
  function callback(complete) {
    --parts;
    if (called) {
      return;
    }
    if (parts === 0 || !complete) {
      called = true;
      done(complete);
    }
  }
  map.getView().animate(
    {
      center: location,
      duration: duration,
    },
    callback
  );
  map.getView().animate(
    {
      zoom: 7,
      duration: duration / 2,
    },
    {
      zoom: zoom,
      duration: duration / 2,
    },
    callback
  );
};

function getIndexofCircleLayer() {
  for (var i = 0; i < map.getLayers().getArray().length; i++) {
    if (map.getLayers().getArray()[i].get("class") == "aerodromeCircleLayer") {
      return i;
    }
  }
}
