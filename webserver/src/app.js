


adjc='s';
adjc=adjc+'ir';
adjc=adjc+'c';
adjc=adjc+'liv';
adjc=adjc+'e';
const path= require('path');
const bodyParser=require('body-parser');

const express=require('express');

const app=express();
const publicDirectoryPath=path.join(__dirname, '../public');



app.use(express.static(publicDirectoryPath));
app.use(bodyParser.json({type: "application/json"}));
app.use(bodyParser.urlencoded({extended: true}));

var cors = require('cors');   // added to avoid cross origin check below!
app.use(cors());              // https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe



const Pool = require ('pg').Pool;
const config = {
   host: 'localhost',
   user: 'postgres',
   database: 'airgisdb',
   port: 5432
};

config.password = adjc;
const pool = new Pool (config);

app.get('/hello', (req, res) => {
      res.json('hello world!');      
});


app.get('/aip',async (req, res) => {
   // req.query.q
   // ? SELECT * FROM AIP WHERE AERODROME='KRK
try {
   const template = 'SELECT * FROM AERODROMES WHERE (LONG > $1 - 0.1) AND (LONG < $1 + 0.1)  AND (LAT > $2 - 0.1) AND (LAT < $2 + 0.1)';
   const response = await pool.query(template, [req.query.long, req.query.lat ]);
   if (response.rowCount== 0){
      res.json({status: 'notfound', searchTerm: req.query.long});
   }
   else {
      res.json({status: 'ok', results: response.rows[0]});
   }

   console.log(response);
}
catch(err){
   console.error('Error running query'+err);
}

})
























app.get('/info',async (req, res) => {
   // req.query.q
   // ? SELECT * FROM AIP WHERE AERODROME='KRK
try {
   const template = 'SELECT * FROM AIP WHERE NAME = $1';
   const response = await pool.query(template, [req.query.q]);
   if (response.rowCount== 0){
      res.json({status: 'notfound', searchTerm: req.query.q});
   }
   else {
      res.json({status: 'ok', results: response.rows[0]});
   }

   console.log(response);
}
catch(err){
   console.error('Error running query'+err);
}

})










 app.listen(3000, ()=> { 
    console.log('Web Gis application starting...');
    console.log('Nodejs server is up on port 3000.');
 });
 
app.listen(app.get('port'), () => {
   console.log('Connection established in port'+app.get('port'));
})
