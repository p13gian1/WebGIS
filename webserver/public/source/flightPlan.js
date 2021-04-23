var fpl=document.getElementById('fpl');

$('.fpl-form').change(function(){
if (fpl.aircraftID.value=='SXAJT')
{
    
    fetch('http://localhost:3000/coordinates?q='+fpl.departureAerodrome.value).then((response)=>{
      response.json().then((data) => {
        console.log(data.results) 
      })
    });     
    
    fetch('http://localhost:3000/coordinates?q='+fpl.destinationAerodrome.value).then((response)=>{
      response.json().then((data) => {
        console.log(data.results) 
      })
    }); 


    
    console.log('MATCHED!');
}
});





/*
fpl={    
callSign: String,
flightRules: String,
typeOfFlight: String,
formation: int,
typeOfAircraft: String,
wakeTurbulenceCat: String,
equipment: String,
derartureAerodrome: String,
timeOfDeparture: time,
cruisingSpeed: int,
level: String,
route: String,
destinationAerodrome: String,
totalEET: int,
altnAerodrome: String,
secAltnAerodrome: String,
remarks: {
    dateOfFlight: time,
    remarks: string
},
supplementary: {
endurance: int,
personsOnBoard: int,
emergencyRadio: stringArray,
dinghies: stringArray,
jackets: stringArray,
number: int,
capacity: int,
colour: string,
aircraftColorAndMarkings: string,
remark: string,
pilotInCommand: string}
}
*/