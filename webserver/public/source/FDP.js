var flightsCounter = 0;
var gpxFile;
function addFlightToStripBay(flightArray) {
  var lastSeg;
  let routeLastSeg = flightArray[9].split(" ");

  if (flightArray[11] == "DEP") {
    lastSeg = routeLastSeg[0] + " " + routeLastSeg[1];
  } else {
    lastSeg =
      routeLastSeg[routeLastSeg.length - 1] +
      " " +
      routeLastSeg[routeLastSeg.length];
  }

  document.getElementById("strip-bay-form-text").innerHTML +=
    '<div style="margin-left:10px" id="flight-' +
    flightArray[0] + //ID OF DIV TO MANIPULATE
    flightArray[5] +
    flightArray[6] +
    flightArray[10] +
    '">';
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<button id="button-' +
    flightArray[0] +
    flightArray[5] +
    flightArray[6] +
    flightArray[10] +
    '" class="strip-1" disabled>' +
    flightArray[11] +
    ":" +
    flightArray[5] +
    "</button>"; //TITLE DEP OR ARR
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<label class="strip-gray"><br></label>';
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<input id="input-' +
    flightArray[0] +
    flightArray[5] +
    flightArray[6] +
    flightArray[10] +
    '" type="text" class="strip-2a" maxlength="5" value="A">'; //SQUAWK
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<label class="strip-2b">' + flightArray[7] + "</label>"; //speed
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<label class="strip-3"><br></label>';
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<label class="strip-4"> <br></label>';
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<label class="strip-5"> <br></label>';
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<label class="strip-6"> <br></label>';
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<label class="strip-7"> <br></label>';
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<label class="strip-8"> <br></label>';
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<label class="strip-gray"><br></label>';
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<label class="strip-9" >' + flightArray[0] + "</label>"; // aircraftID
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<label class="strip-3" ></label>';
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<label class="strip-4"> <br></label>';
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<label class="strip-5"> <br></label>';
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<label class="strip-6"> <br></label>';
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<label class="strip-7"> <br></label>';
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<label class="strip-8"> <br></label>';
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<label class="strip-gray"><br></label>';
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<label class="strip-10a">' + flightArray[1] + flightArray[2] + "</label>"; //FlightRules ,typeofFlight
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<label class="strip-10b">' +
    flightArray[3] +
    "/" +
    flightArray[4] +
    "</label>"; //TypeOfAircraft, TurbulenceCategory
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<label class="strip-3"><br></label>';
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<label class="strip-11" >' + flightArray[5] + "</label>";
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<label class="strip-12" >' + lastSeg + "</label>";
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<label class="strip-13" >' + flightArray[10] + "</label>";
  document.getElementById("strip-bay-form-text").innerHTML +=
    '<label class="strip-8"> <br></label>' + "</div>";

  $(".strip-2a").change(function (e) {
    if (e.value != "A") {
      let buttonID = e.currentTarget.id.replace("input", "button");
      $("#" + buttonID).attr("disabled", false);
    }
  });

  var routeTemp = [];
  $(".strip-1").click(function (e) {
    let buttonID = e.currentTarget.id;
    let inputID = e.currentTarget.id.replace("button", "input");
    let flightID = e.currentTarget.id.replace("button-", "");
    let flightArrayTemp = [];
    flightArrayTemp[0] = flightID.slice(0, 5);
    flightArrayTemp[1] = flightID.slice(5, 9);
    flightArrayTemp[2] = flightID.slice(9, 13);
    flightArrayTemp[3] = flightID.slice(13, 17);

    fetch("http://localhost:3000/getRoute?q=" + flightArrayTemp).then(
      (response) => {
        routeTemp = [];
        response.json().then((data) => {
          routeTemp = data.results.route;
          createGPXFile(
            routeTemp,
            flightArrayTemp[0],
            flightArrayTemp[1],
            flightArrayTemp[2],
            flightArrayTemp[3]
          );
          setTimeout(function () {
            aircraftId = aircraftId + 1;
            createAircraftLayer();
            animateTheFeature();
          }, 2000);
        });
      }
    );
    $("#" + buttonID).css("background-color", "green");
    $("#" + buttonID).attr("disabled", true);
    $("#" + inputID).attr("disabled", true);
  });

  function createGPXFile(
    routeTemp,
    aircraftIDValue,
    depAerodrome,
    timeValue,
    destAerodrome
  ) {
    let tempR = [];
    let gpxRoute = routeTemp;
    let gpxRouteObject = [];
    gpxRoute = gpxRoute.split(" ");

    if (gpxRoute[0] != "") {
      gpxRoute.unshift(depAerodrome);
    } else {
      gpxRoute[0] = depAerodrome;
    }

    gpxRoute.push(destAerodrome);
    var i = 0;
    do {
      getRouteSegCoords(gpxRoute[i], i, increaseI);
    } while (i < gpxRoute.length);

    function getRouteSegCoords(tempPoint, i, callback) {
      fetch("http://localhost:3000/coordinates?q=" + tempPoint).then(
        (response) => {
          response.json().then((data) => {
            let parseCoords = JSON.parse(data.results).coordinates;
            let tempRouteObject = {
              name: tempPoint,
              lat: parseCoords[1],
              lon: parseCoords[0],
            };
            gpxRouteObject[i] = tempRouteObject;
          });
        }
      );
      callback();
    }

    function increaseI() {
      i++;
    }

    setTimeout(function () {
      gpxFile = '<?xml version="1.0" encoding="UTF-8"?>';
      gpxFile +=
        '<gpx xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" creator="WebGIS" version="1.1" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">';
      gpxFile += "<rte>";
      gpxFile += "<name>";
      gpxFile +=
        aircraftIDValue + "-" + depAerodrome + timeValue + "-" + destAerodrome;
      gpxFile += "</name>";
      for (i = 0; i < gpxRouteObject.length; i++) {
        gpxFile += '<rtept lat="' + gpxRouteObject[i].lat + '"';
        gpxFile += ' lon="' + gpxRouteObject[i].lon + '">';
        gpxFile += "<name>" + gpxRouteObject[i].name + "</name>";
        gpxFile += "</rtept>";
      }
      gpxFile += "</rte>";
      gpxFile += "</gpx>";
      let filenameTemp =
        aircraftIDValue +
        "-" +
        depAerodrome +
        timeValue +
        "-" +
        destAerodrome +
        ".gpx";
      fetch(
        "http://localhost:3000/WriteGPXFile?q1=" +
          filenameTemp +
          "&q2=" +
          gpxFile
      ).then((response) => {
        response.json().then((results) => {});
      });
      activateFlight(aircraftIDValue, filenameTemp);
    }, 1000);
  }
}
