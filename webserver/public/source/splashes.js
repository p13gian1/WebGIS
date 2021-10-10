var aerodromeInfoMetarNotam;
var SIDImages;
var STARImages;
var activeImage = 1;
var imageWidth = 248;
var imageHeight = 175;

$("#js-map").on("click", function () {
  if ($(".selection-form").css("display") == "block") {
    $(".selection-form").css("display", "none");
    $(".selection-form-margin").css("display", "none");
  }
});

$("#js-map").contextmenu(function (e) {
  e.preventDefault();
  let coord = document.getElementById("mouse-position").textContent;
  coord = coord.replace(",", "");
  var coordArray = coord.split(" ");
  mouseLongitude = parseFloat(coordArray[0]);
  mouseLatitude = parseFloat(coordArray[1]);
  fetch(
    "http://localhost:3000/coordsToAerodrome?long=" +
      mouseLongitude +
      "&lat=" +
      mouseLatitude
  ).then((response) => {
    response.json().then((data) => {
      if (data.status != "notfound") {
        aerodromeInfoMetarNotam = data.results.label;
        $(".metar-form").css("display", "none");
        $(".metar-form-margin").css("display", "none");
        $(".aip-info").css("display", "none");
        $(".aip-info-margin").css("display", "none");
        $(".notam-form").css("display", "none");
        $(".notam-form-margin").css("display", "none");
        $(".image-form").css("display", "none");
        $(".image-form-margin").css("display", "none");
        $(".selection-form").css("display", "block");
        $(".selection-form-margin").css("display", "block");
      }
    });
  });
});

$("#aip-info-button").on("click", function () {
  $(".selection-form").css("display", "none");
  $(".selection-form-margin").css("display", "none");
  $(".aip-info").css("display", "block");
  $(".aip-info-margin").css("display", "block");
  showQuery();
});

$("#metar-button").on("click", function () {
  $(".selection-form").css("display", "none");
  $(".selection-form-margin").css("display", "none");
  $(".metar-form").css("display", "block");
  $(".metar-form-margin").css("display", "block");
  $(".metar-form-text").html("");
  showMetar();
});

$("#notam-button").on("click", function () {
  $(".selection-form").css("display", "none");
  $(".selection-form-margin").css("display", "none");
  $(".notam-form").css("display", "block");
  $(".notam-form-margin").css("display", "block");
  $(".notam-form-text").html("");
  showNotam();
});

$("#sid-button").on("click", function () {
  $(".selection-form").css("display", "none");
  $(".selection-form-margin").css("display", "none");
  activeImage = 1;
  showSID();
});

$("#star-button").on("click", function () {
  $(".selection-form").css("display", "none");
  $(".selection-form-margin").css("display", "none");
  activeImage = 1;
  showSTAR();
});

$("#image-zoom").click(function () {
  imageWidth = 248 * Number($("#image-zoom").val());
  imageHeight = 175 * Number($("#image-zoom").val());
  $("#image").css("width", imageWidth + "px");
  $("#image").css("height", imageHeight + "px");
});

$("#left-button").click(function () {
  if (activeImage > 1) {
    activeImage--;
  }
  showImage(activeImage);
});

$("#right-button").click(function () {
  if (activeImage < SIDImages && SIDImages != undefined) {
    activeImage++;
    showImage(activeImage);
  } else if (activeImage < STARImages) {
    activeImage++;
    showImage(activeImage);
  }
});

function showImage(number) {
  let stringQeury;
  if (STARImages == undefined) {
    stringQuery = "SID";
  } else {
    stringQuery = "STAR";
  }
  fetch(
    "http://localhost:3000/" +
      stringQuery +
      "?q1=" +
      aerodromeInfoMetarNotam +
      "&q2=" +
      number
  ).then((response) => {
    response.json().then((data) => {
      $("#image").attr("src", "data:image/png;base64," + data.results);
      $("#image-label").empty();
      $("#image-label").text(
        aerodromeInfoMetarNotam + " " + stringQuery + " " + number
      );
    });
  });
}

function showSID() {
  fetch(
    "http://localhost:3000/GetSIDSTARContent?q=" + aerodromeInfoMetarNotam
  ).then((response) => {
    response.json().then((data) => {
      SIDImages = data.sid;
      STARImages = undefined;
      $(".image-form").css("display", "block");
      $(".image-form-margin").css("display", "block");
      imageWidth = 248 * Number($("#image-zoom").val());
      imageHeight = 175 * Number($("#image-zoom").val());
      $("#image").css("width", imageWidth + "px");
      $("#image").css("height", imageHeight + "px");
      $("#image").attr("src", "");
      showImage(activeImage);
    });
  });
}

function showSTAR() {
  fetch(
    "http://localhost:3000/GetSIDSTARContent?q=" + aerodromeInfoMetarNotam
  ).then((response) => {
    response.json().then((data) => {
      STARImages = data.star;
      SIDImages = undefined;
      $(".image-form").css("display", "block");
      $(".image-form-margin").css("display", "block");
      imageWidth = 248 * Number($("#image-zoom").val());
      imageHeight = 175 * Number($("#image-zoom").val());
      $("#image").css("width", imageWidth + "px");
      $("#image").css("height", imageHeight + "px");
      $("#image").attr("src", "");
      showImage(activeImage);
    });
  });
}

function showMetar() {
  fetch("http://localhost:3000/metar?q=" + aerodromeInfoMetarNotam).then(
    (response) => {
      response.json().then((data) => {
        $(".metar-form-text").html(data.results.rawText);
      });
    }
  );
}

function showNotam() {
  fetch("http://localhost:3000/notam?q=" + aerodromeInfoMetarNotam).then(
    (response) => {
      response.json().then((data) => {
        for (var i = 0; i < data.results.notamList.length; i++) {
          let notamSplit = data.results.notamList[i].icaoMessage.replace(
            "\n",
            "<br>"
          );
          $(".notam-form-text").html(
            $(".notam-form-text").html() + notamSplit + "<br><br>"
          );
        }
      });
    }
  );
}

function showQuery() {
  fetch("http://localhost:3000/info?q=" + aerodromeInfoMetarNotam).then(
    (response) => {
      response.json().then((data) => {
        $(".aip-info-text").html(tooltipHtml(data));
      });
    }
  );
}

function tooltipHtml(data) {
  return (
    "<p></p>" +
    "<table>" +
    "<tr><td nowrap>Aerodrome             </td><td><h6>" +
    " " +
    data.results.name +
    " " +
    data.results.title +
    "</h6></td></tr>" +
    "<tr><td nowrap>Elevation             </td><td>" +
    data.results.elevation +
    "</td></tr>" +
    "<tr><td nowrap>Address               </td><td>" +
    data.results.address +
    "</td></tr>" +
    "<tr><td nowrap>Telephone             </td><td>" +
    data.results.telephone +
    "</td></tr>" +
    "<tr><td nowrap>Fax                   </td><td>" +
    data.results.fax +
    "</td></tr>" +
    "<tr><td nowrap>AFTN                  </td><td>" +
    data.results.aftn +
    "</td></tr>" +
    "<tr><td nowrap>Website               </td><td>" +
    data.results.website +
    "</td></tr>" +
    "<tr><td nowrap>E-mail                </td><td>" +
    data.results.email +
    "</td></tr>" +
    "<tr><td nowrap>Fuel                  </td><td>" +
    data.results.fuel +
    "</td></tr>" +
    "<tr><td nowrap>Fuelling Facilities   </td><td>" +
    data.results.fuellingfacilities +
    "</td></tr>" +
    "<tr><td nowrap>Fire Fighting Cat     </td><td>" +
    data.results.firefighting +
    "</td></tr>" +
    "<tr><td nowrap>Tawiway Width         </td><td>" +
    data.results.taxiwaywidth +
    "</td></tr>" +
    "<tr><td nowrap>Runway                </td><td>" +
    data.results.runway +
    "</td></tr>" +
    "</table>"
  );
}

var longCenterMap = document.getElementById("long-map-center");
var latCenterMap = document.getElementById("lat-map-center");

map.on("moveend", function () {
  let coord = map.getView().getCenter();
  coord = ol.proj.transform([coord[0], coord[1]], "EPSG:3857", "EPSG:4326");
  longCenterMap.innerText = "Long: " + coord[0].toFixed(4);
  latCenterMap.innerText = "Lat: " + coord[1].toFixed(4);
});

var utcTime = document.getElementById("utc-time");
var utcDate = document.getElementById("utc-date");

$(window).on("load", function () {
  function timer() {
    utcTime.innerText = "UTC: " + getUTCtime(true);
    utcDate.innerText = "Date: " + getUTCdateICAO(true);
  }
  var timerForEver = setInterval(timer, 1000);
});

$(".flp-close-icon").click(function () {
  $(".fpl-form").css("display", "none");
  $(".fpl-form-margin").css("display", "none");
  clearFPL();
});

$(".aip-close-icon").click(function () {
  $(".aip-info").css("display", "none");
  $(".aip-info-margin").css("display", "none");
});

$(".strip-close-icon").click(function () {
  $(".strip-bay-form").css("display", "none");
  $(".strip-bay-form-margin").css("display", "none");
});

$(".flp-open-icon").click(function () {
  $(".load-fpl-form").css("display", "block");
  $(".load-fpl-form-margin").css("display", "block");
  $(".save-fpl-form").css("display", "none");
  $(".save-fpl-form-margin").css("display", "none");
  getMyFlightPlansContent();
});

$(".flp-save-icon").click(function () {
  $(".save-fpl-form").css("display", "block");
  $(".save-fpl-form-margin").css("display", "block");
  $(".load-fpl-form").css("display", "none");
  $(".load-fpl-form-margin").css("display", "none");
  getMyFlightPlansContent();
  reverseParseFPL();
});

$(".load-close-icon").click(function () {
  $(".load-fpl-form").css("display", "none");
  $(".load-fpl-form-margin").css("display", "none");
});

$(".save-close-icon").click(function () {
  $(".save-fpl-form").css("display", "none");
  $(".save-fpl-form-margin").css("display", "none");
});

$(".notam-close-icon").click(function () {
  $(".notam-form").css("display", "none");
  $(".notam-form-margin").css("display", "none");
});

$(".image-close-icon").click(function () {
  $(".image-form").css("display", "none");
  $(".image-form-margin").css("display", "none");
});
