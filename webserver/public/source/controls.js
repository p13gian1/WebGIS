var spriteIsPlane=false;

var mainbarControls = new ol.control.Bar();
mainbarControls.setPosition('top');
map.addControl(mainbarControls);

// mainbarControls.addControl (new ol.control.ZoomToExtent({  extent: [ 265971,6243397 , 273148,6250665 ] }));
mainbarControls.addControl (new ol.control.Button ({
html: '<a>H</a>',
title: 'Home',
handleClick: ()=> { 
  // document.getElementById("js-map").requestFullscreen();
  if (document.exitFullscreen) {
   document.exitFullscreen();
}
   reLoad();
}
}));

mainbarControls.addControl (new ol.control.Button ({
html: '<a>F</a>',
title: 'Fill a FPL',
handleClick: function() { 
  if (document.exitFullscreen) {
     document.exitFullscreen();
  }
     menuClickFPL();
}
}));
mainbarControls.addControl (new ol.control.FullScreen());

/* mainbar FlightRules */
var mainbarFlightRules = new ol.control.Bar();
mainbarFlightRules.setPosition('right-top');
map.addControl(mainbarFlightRules);

var nestedFlightRules= new ol.control.Bar ({ toggleOne: true, group:true });
mainbarFlightRules.addControl (nestedFlightRules);

var vfrMapButton = new ol.control.Toggle(
  {	html: '<a>V</a>',
    className: "VFR",
    title: "VFR map",
    //interaction: new ol.interaction.Select (),
    active:true,
     onToggle: function(active)
     {
     if (active){
       spriteIsPlane=true;
     } else
     {
       spriteIsPlane=false;
     }
       //map.removeLayer(airwaysLayer);
      // $(".aip-info").css("left","800px");
     }
  });
  nestedFlightRules.addControl(vfrMapButton);

  var ifrLowMapButton = new ol.control.Toggle(
    {	html: '<a>IL</a>',
      className: "IFR Low",
      title: "IFR Low map",
      //interaction: new ol.interaction.Select (),
      active:true,
       onToggle: function(active)
       {
       // map.addLayer(airwaysLayer);
        // $("#info").text("Select is "+(active?"activated":"deactivated"));
       }
    });
    nestedFlightRules.addControl(ifrLowMapButton);

    var ifrHighMapButton = new ol.control.Toggle(
      {	html: '<a>IH</a>',
        className: "IFR High",
        title: "IFR High map",
        //interaction: new ol.interaction.Select (),
        active:true,
         onToggle: function(active)
         {
        //$(".aip-info").text((active?"activated":""));
         if (active){
           styleJson=styleJson1;
         } else {
        styleJson=styleJson2;
      }
     //console.log("getBaseLayer"+getIndexOfBaseLayer());
     var indexOfBaseLayer=getIndexOfBaseLayer();
     map.getLayers().getArray().splice(indexOfBaseLayer,1);
    // map.getLayers().getArray().splice(4,1);
    map.render();
   // map.getLayers().getArray()[4].setMap(null);
   olms(map,styleJson);
   

   setTimeout(function () { indexOfBaseLayer=getIndexOfBaseLayer();
    map.getLayers().getArray()[indexOfBaseLayer].setZIndex(-1);},1000          )
    
     




         }
      });
      nestedFlightRules.addControl(ifrHighMapButton);





var flightControls = new ol.control.Bar();
flightControls.setPosition('bottom');
map.addControl(flightControls);

// mainbarControls.addControl (new ol.control.ZoomToExtent({  extent: [ 265971,6243397 , 273148,6250665 ] }));
flightControls.addControl( new ol.control.Button (
  {	html: '<i class="maki2-airport"></i>',
    className: "animate-button",
    title: "Press to animate a flight",
    handleClick: function()
      {	
        aircraftId=aircraftId+1;
        createAircraftLayer();
        animateFeature();
      }
  }) );

  flightControls.addControl( new ol.control.Toggle (
    {	html: '<a>R</a>',
      className: "route-button",
      title: "Press to view the route of a flight",
      active:false,
      onToggle: function(active)
        {	
          if (active){
            routeVisibility=true;
          } else
          {
            routeVisibility = false;
          }

          lengthOfLayers=map.getLayers().getLength();
          console.log(routeVisibility);
          for (var i=0; i<lengthOfLayers; i=i+1){
            console.log(i);

            if (map.getLayers().getArray()[i].get('title')=='Aircraft Route')
            {
              map.getLayers().getArray()[i].setVisible(routeVisibility);
            }
         
         } 
      
        }
    }) );

















var ctrl = new ol.control.LayerSwitcher(
{}
);
ctrl.setHeader('Layers Opacity');

map.addControl(ctrl);
ctrl.on('toggle', function(e) {
  //console.log('Collapse layerswitcher', e.collapsed);
});

var mousePositionControl = new ol.control.MousePosition({
  coordinateFormat: ol.coordinate.createStringXY(4),
  projection: 'EPSG:4326',
  className: 'custom-mouse-position',
  target: document.getElementById('mouse-position'),
  undefinedHTML: '&nbsp;'
});
map.addControl(mousePositionControl);

testAircraftbutton= new ol.control.Toggle(
  {	html: '<h4>T</h4>',
    className: "aircraftObject-button",
    title: "Test button aircraft object",
    //interaction: new ol.interaction.Select (),
    active:false,
     onToggle: function(active)
     {
      $(".map").css({"width": active?"70vw":""});
     // map.addLayer(airwaysLayer);
      // $("#info").text("Select is "+(active?"activated":"deactivated"));
     }
  });
map.addControl(testAircraftbutton);



function getIndexOfBaseLayer(){
  
console.log('into function');
 for (var i=0;i<map.getLayers().getArray().length;i++)
{
  console.log(i);
  if (map.getLayers().getArray()[i].get("mapbox-layers")=='water')
{
  console.log('matched!'+i);
  return i;
}

}
} 




