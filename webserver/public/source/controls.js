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
         }
      });
      nestedFlightRules.addControl(ifrHighMapButton);

var animationButton = new ol.control.Button (
{	html: '<i class="maki2-airport"></i>',
  className: "animate-button",
  title: "Press to animate a flight",
  handleClick: function()
    {	
      aircraftId=aircraftId+1;
      createAircraftLayer();
      animateFeature();
    }
});
map.addControl(animationButton);

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

testAircraftbutton=new ol.control.Button ({
  html: '<h4>T</h4>',
  className: "aircraftObject-button",
  title: 'Test button aircraft object',
  handleClick: ()=> { 
      
  }
  });
map.addControl(testAircraftbutton);
