$("#js-map" ).contextmenu(function(e) {
 e.preventDefault();
 let coord=(document.getElementById("mouse-position").textContent);
//  console.log(coord);
 coord=coord.replace(',','');
 var coordArray = coord.split(" ");
 mouseLongitude=parseFloat(coordArray[0]);
 mouseLatitude=parseFloat(coordArray[1]);
//  console.log(mouseLongitude);
//  console.log(mouseLatitude);
   
 
    $('.aip-info').css('display','block');
    $('.aip-info-margin').css('display','block');

  
  showQuery(mouseLongitude,mouseLatitude);
});

function showQuery(mouseLongitude,mouseLatitude){  
    // console.log('into showQuery');

    fetch('http://localhost:3000/aip?long='+mouseLongitude+'&lat='+mouseLatitude).then((response)=>{
      response.json().then((data) => {
        // console.log(data.results) 

        fetch('http://localhost:3000/info?q='+data.results.label).then((response)=>{
          response.json().then((data) => {
            // console.log(data.results)
            // $(".aip-info").html('test').wrap('<pre />');
                
          $(".aip-info-text").html((tooltipHtml(data)));
          // $(".aip-info").text("Select is "+(active?"activated":"deactivated"));
          })
        });
      })
    });   
  }
  
  function tooltipHtml(data){   
    return "<p></p>"+"<table>"+
      "<tr><td nowrap>Aerodrome             </td><td><h6>"+" "+data.results.name+" "+data.results.title+"</h6></td></tr>"+
      "<tr><td nowrap>Elevation             </td><td>"+data.results.elevation+"</td></tr>"+
      "<tr><td nowrap>Address               </td><td>"+data.results.address+"</td></tr>"+
      "<tr><td nowrap>Telephone             </td><td>"+data.results.telephone+"</td></tr>"+
      "<tr><td nowrap>Fax                   </td><td>"+data.results.fax+"</td></tr>"+
      "<tr><td nowrap>AFTN                  </td><td>"+data.results.aftn+"</td></tr>"+
      "<tr><td nowrap>Website               </td><td>"+data.results.website+"</td></tr>"+
      "<tr><td nowrap>E-mail                </td><td>"+data.results.email+"</td></tr>"+
      "<tr><td nowrap>Fuel                  </td><td>"+data.results.fuel+"</td></tr>"+
      "<tr><td nowrap>Fuelling Facilities   </td><td>"+data.results.fuellingfacilities+"</td></tr>"+
      "<tr><td nowrap>Fire Fighting Cat     </td><td>"+data.results.firefighting+"</td></tr>"+
      "<tr><td nowrap>Tawiway Width         </td><td>"+data.results.taxiwaywidth+"</td></tr>"+
      "<tr><td nowrap>Runway                </td><td>"+data.results.runway+"</td></tr>"+
      "</table>";
  }

  var longCenterMap=document.getElementById('long-map-center');
  var latCenterMap=document.getElementById('lat-map-center');



  map.on('moveend',function(){
 
    // console.log(map.getView().getCenter());
    let coord=map.getView().getCenter();
  
    coord=ol.proj.transform([coord[0], coord[1]], 'EPSG:3857','EPSG:4326');
    longCenterMap.innerText='Long: '+coord[0].toFixed(4);
    latCenterMap.innerText='Lat: '+coord[1].toFixed(4);
  })


  var utcTime=document.getElementById('utc-time');
  var utcDate=document.getElementById('utc-date');

$(window).on('load',function() {

  function timer(){
  // console.log('test utc');
  utcTime.innerText=('UTC: '+getUTCtime(true));

  utcDate.innerText=('Date: '+ getUTCdateICAO(true));
  }

  var timerForEver=setInterval(timer,1000);

  });


  $('.flp-close-icon').click(function() {                                           
                                      $(".fpl-form").css("display","none");
                                      $(".fpl-form-margin").css("display","none");

                                    });

  $('.aip-close-icon').click(function() {                                           
                                      $(".aip-info").css("display","none");
                                      $(".aip-info-margin").css("display","none");

                                    });

  $('.strip-close-icon').click(function() {                                           
                                      $(".strip-base-form").css("display","none");
                                      $(".strip-base-form-margin").css("display","none");

                                    });