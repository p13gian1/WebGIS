//
adjc = "********";

const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const fs = require("fs");
app.use(express.static(publicDirectoryPath));
app.use(bodyParser.json({ type: "application/json" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

var cors = require("cors"); // added to avoid cross origin check below!
app.use(cors()); // https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe

const airportDiscovery = require("@airport-discovery/metars-tafs");
const notams = require("@airport-discovery/notams");
const imageToBase64 = require("image-to-base64");
const Pool = require("pg").Pool;
const config = {
  host: "localhost",
  user: "postgres",
  database: "airGISdb",
  port: 5432,
};

config.password = adjc;
const pool = new Pool(config);

app.get("/coordsToAerodrome", async (req, res) => {
  try {
    const template =
      "SELECT * FROM AERODROMES_LAYER WHERE ST_DWithin(COORDINATES, ST_MakePoint($1,$2)::geography, 3000)";
    const response = await pool.query(template, [
      req.query.long,
      req.query.lat,
    ]);
    if (response.rowCount == 0) {
      res.json({
        status: "notfound",
        searchTerm: req.query.long,
      });
    } else {
      res.json({
        status: "ok",
        results: response.rows[0],
      });
    }
    console.log(response);
  } catch (err) {
    console.error("Error running query" + err);
  }
});

app.get("/coordinates", async (req, res) => {
  try {
    const template =
      "SELECT ST_AsGeoJSON(COORDINATES) FROM (SELECT * FROM AERODROMES_LAYER UNION SELECT * FROM WAYPOINTS_VFR_LAYER UNION SELECT * FROM WAYPOINTS_LAYER UNION SELECT * FROM NAVAIDS_LAYER) AS A WHERE LABEL=$1";
    const response = await pool.query(template, [req.query.q]);
    if (response.rowCount == 0) {
      res.json({
        status: "notfound",
        searchTerm: req.query.q,
      });
    } else {
      res.json({
        status: "ok",
        results: response.rows[0].st_asgeojson,
      });
    }
    console.log(response);
  } catch (err) {
    console.error("Error running query" + err);
  }
});

app.get("/info", async (req, res) => {
  try {
    const template = "SELECT * FROM AIP WHERE NAME = $1";
    const response = await pool.query(template, [req.query.q]);
    if (response.rowCount == 0) {
      res.json({
        status: "notfound",
        searchTerm: req.query.q,
      });
    } else {
      res.json({
        status: "ok",
        results: response.rows[0],
      });
    }
    console.log(response);
  } catch (err) {
    console.error("Error running query" + err);
  }
});

app.get("/aerodrome", async (req, res) => {
  try {
    const template =
      "SELECT ST_AsGeoJSON(COORDINATES) FROM AERODROMES_LAYER WHERE LABEL=$1";
    const response = await pool.query(template, [req.query.q]);
    if (response.rowCount == 0) {
      res.json({
        status: "notfound",
        searchTerm: req.query.q,
      });
    } else {
      res.json({
        status: "ok",
        results: response.rows[0].st_asgeojson,
      });
    }
    console.log(response);
  } catch (err) {
    console.error("Error running query" + err);
  }
});

app.get("/airway", async (req, res) => {
  try {
    const template =
      " SELECT A.NAME FROM AIRWAYS AS A, AIRWAYS AS B WHERE A.WAYPOINT=$1 AND B.WAYPOINT=$2 AND A.NAME=B.NAME";
    const response = await pool.query(template, [req.query.q1, req.query.q2]);
    if (response.rowCount == 0) {
      res.json({
        status: "notfound",
        searchTerm: req.query.q,
      });
    } else {
      res.json({
        status: "ok",
        results: response.rows[0],
      });
    }
    console.log(response);
  } catch (err) {
    console.error("Error running query" + err);
  }
});

app.get("/FPL", async (req, res) => {
  try {
    const template =
      "INSERT INTO FPL (AIRCRAFTID,FLIGHTRULES,TYPEOFFLIGHT,NUMBER,TYPEOFAIRCRAFT,WAKETURBULENCECAT,EQUIPMENT,DEPARTUREAERODROME," +
      "TIME,CRUISINGSPEED,LEVEL,ROUTE,DESTINATIONAERODROME,TOTALEET,ALTERNATEAERODROME,SECONDALTERNATEAERODROME,OTHERINFORMATION,ENDURANCE," +
      "PERSONSONBOARD,EMERGENCYRADIOUHF,EMERGENCYRADIOVHF,EMERGENCYRADIOELBA,DINGHIES,POLAR,DESERT,MARITIME,JUNGLE,JACKETS,LIGHT,FLOURES," +
      "UHF,VHF,DINGHIESSECOND,NUMBEROFDINGHIES,CAPACITY,COVER,COLOR,AIRCRAFTCOLORANDMARKINGS,REMARKS,PILOTINCOMMAND)" +
      "VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35," +
      "$36,$37,$38,$39,$40)";
    const queryArray = req.query.q.split(",");
    const query = {
      text: template,
      values: queryArray,
    };
    const response = await pool.query(query);
    res.json({
      status: "ok",
      results: "ok",
    });
  } catch (err) {
    console.error("Error running query" + err);
  }
});

app.get("/Flights", async (req, res) => {
  try {
    const template =
      "INSERT INTO FLIGHTS (AIRCRAFTID,FLIGHTRULES,TYPEOFFLIGHT,TYPEOFAIRCRAFT,WAKETURBULENCECAT,DEPARTUREAERODROME," +
      "TIME,CRUISINGSPEED,LEVEL,ROUTE,DESTINATIONAERODROME,DEPORARR,ACTIVE)" +
      "VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)";
    console.log("req.query.q: " + req.query.q);
    const queryArray = req.query.q.split(",");
    const query = {
      text: template,
      values: queryArray,
    };
    const response = await pool.query(query);
    res.json({
      status: "ok",
      results: "ok",
    });
  } catch (err) {
    console.error("Error running query" + err);
  }
});

app.get("/getRoute", async (req, res) => {
  try {
    const template =
      "SELECT A.ROUTE FROM FLIGHTS AS A WHERE A.AIRCRAFTID=$1 AND A.DEPARTUREAERODROME=$2 AND A.TIME=$3 AND A.DESTINATIONAERODROME=$4";
    const queryArray = req.query.q.split(",");
    const query = {
      text: template,
      values: queryArray,
    };
    const response = await pool.query(query);
    res.json({
      status: "ok",
      results: response.rows[0],
    });
  } catch (err) {
    console.error("Error running query" + err);
  }
});

app.get("/Reset", async (req, res) => {
  try {
    const template = " DELETE FROM FLIGHTS";
    const response = await pool.query(template, req.query.q);
    res.json({
      status: "ok",
      results: "ok",
    });
  } catch (err) {
    console.error("Error running query" + err);
  }
});

app.get("/EndOfFlight", async (req, res) => {
  try {
    const template =
      "DELETE FROM FLIGHTS AS A WHERE A.AIRCRAFTID=$1 AND A.DEPARTUREAERODROME=$2 AND A.TIME=$3 AND A.DESTINATIONAERODROME=$4";
    const queryArray = req.query.q.split(",");
    const query = {
      text: template,
      values: queryArray,
    };
    const response = await pool.query(query);
    res.json({
      status: "ok",
      results: "ok",
    });
  } catch (err) {
    console.error("Error running query" + err);
  }
});

app.get("/DeleteGPXFile", (req, res) => {
  try {
    fs.unlinkSync(req.query.q);
  } catch (err) {
    console.error(err);
  }
});

app.get("/GetMyFlightPlansContent", (req, res) => {
  //joining path of directory
  const directoryPath = "/MyFlightPlans/";
  //passsing directoryPath and callback function
  const response = fs.readdir(directoryPath, function (err, files) {
    res.json({
      status: "ok",
      results: files,
    });
  });
});

app.get("/ReadFPL", (req, res) => {
  console.log(req.query.q);
  try {
    const data = fs.readFileSync("/MyFlightPlans/" + req.query.q, "utf8");
    res.json({
      status: "ok",
      results: data,
    });
  } catch (err) {
    console.error(err);
  }
});

app.get("/WriteFPL", (req, res) => {
  try {
    fs.writeFileSync("/MyFlightPlans/" + req.query.q1, req.query.q2);
    res.json({
      status: "ok",
      data: "ok",
    });
  } catch (err) {
    console.error(err);
  }
});

app.get("/WriteGPXFile", (req, res) => {
  try {
    fs.writeFileSync("./data/GPXFiles/" + req.query.q1, req.query.q2);
    res.json({
      status: "ok",
      data: "ok",
    });
  } catch (err) {
    console.error(err);
  }
});

app.get("/metar", async (req, res) => {
  try {
    const metars = await airportDiscovery.metars(req.query.q);
    res.json({
      status: "ok",
      results: metars,
    });
  } catch (err) {
    console.error("Error running query" + err);
  }
});

app.get("/notam", async (req, res) => {
  try {
    const notamsResponse = await notams(req.query.q);
    res.json({
      status: "ok",
      results: notamsResponse,
    });
  } catch (err) {
    console.error("Error running query" + err);
  }
});

app.get("/STAR", (req, res) => {
  imageToBase64(
    "/wamp64/www/WebGIS/webserver/src/images/" +
      req.query.q1 +
      "/STAR/" +
      req.query.q2 +
      ".png"
  ) // Path to the image
    .then((response) => {
      res.json({ status: "ok", results: response });
    })
    .catch((error) => {
      console.log(error); // Logs an error if there was one
    });
});

app.get("/SID", (req, res) => {
  imageToBase64(
    "/wamp64/www/WebGIS/webserver/src/images/" +
      req.query.q1 +
      "/SID/" +
      req.query.q2 +
      ".png"
  ) // Path to the image
    .then((response) => {
      res.json({
        status: "ok",
        results: response,
      });
    })
    .catch((error) => {
      console.log(error); // Logs an error if there was one
    });
});

app.get("/GetSIDSTARContent", (req, res) => {
  //joining path of directory
  const directoryPath1 =
    "/wamp64/www/WebGIS/webserver/src/images/" + req.query.q + "/SID/";
  var SID;
  var STAR;
  //passsing directoryPath and callback function
  const response1 = fs.readdir(directoryPath1, function (err, SID) {
    const directoryPath2 =
      "/wamp64/www/WebGIS/webserver/src/images/" + req.query.q + "/STAR/";
    const response2 = fs.readdir(directoryPath2, function (err, STAR) {
      res.json({
        status: "ok",
        sid: SID.length,
        star: STAR.length,
      });
    });
  });
});

app.listen(3000, () => {
  console.log("Web Gis application starting...");
  console.log("Nodejs server is up on port 3000.");
});

app.listen(app.get("port"), () => {
  console.log("Connection established in port" + app.get("port"));
});
