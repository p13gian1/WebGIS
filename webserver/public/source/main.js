var tongleContext=false;



init=(a,b,mapFlag)=>{


  map.updateSize(); 

 

  
  


  $(function()
  {
      $('LGKC').click(function(event) {  
      
  
        alert('working!');
   
      })
  });



if (mapFlag==1){ 


flyTo(ol.proj.fromLonLat([a,b]), function () {});
  /*
 map.getView().animate({
  center: ol.proj.fromLonLat([a,b]),
  zoom: 11
  //,
  //duration: 3000
  \
})
*/

}

}


flyTo=(location, done)=> {
 
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
      duration: duration / 2 ,
    },
    callback
  );
}











