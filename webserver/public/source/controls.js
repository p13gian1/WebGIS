var spriteIsPlane=false;
var mapCenterIsVisible=false;
var aerodromeCircleState=0; //initial state of aerodrome circle is unvisible;  0=unvisible, 1=5 n.m space, 2=10 n.m space, 3=30 n.m space


var mainbarControls = new ol.control.Bar();
mainbarControls.setPosition('top');
map.addControl(mainbarControls);

// mainbarControls.addControl (new ol.control.ZoomToExtent({  extent: [ 265971,6243397 , 273148,6250665 ] }));
mainbarControls.addControl (new ol.control.Button ({
html: '<a>H</a>',
title: 'Home',
handleClick: ()=> { 
  // document.getElementById("js-map").requestFullscreen();
  if (fullScreen==true) {
   document.exitFullscreen();
   prevStateFullScreen=true;
}
   reLoad();
}
}));

mainbarControls.addControl (new ol.control.Button ({
html: '<a>A</a>',
title: 'AFTN Terminal',
handleClick: function() { 
  if (fullScreen==true) {
     document.exitFullscreen();
     prevStateFullScreen=true;
  }
     menuClickAFTN();
}
}));
mainbarControls.addControl (new ol.control.FullScreen());

/* mainbar FlightRules */
var mainbarFlightRules = new ol.control.Bar();
mainbarFlightRules.setPosition('top-right');
map.addControl(mainbarFlightRules);

var nestedFlightRules= new ol.control.Bar ({ toggleOne: true, group:true });
mainbarFlightRules.addControl (nestedFlightRules);

var vfrMapButton = new ol.control.Button(
  {	html: '<a>V</a>',
    className: "VFR",
    title: "VFR map",
    //interaction: new ol.interaction.Select (),
    active:true,
     handleClick: function()
     {
      italianVFRLayer.setVisible(true);
      airwaysLayer.setVisible(false);
      waypointsLayer.setVisible(true);
      

       //map.removeLayer(airwaysLayer);
      // $(".aip-info").css("left","800px");
     }
  });
  nestedFlightRules.addControl(vfrMapButton);

  var ifrLowMapButton = new ol.control.Button(
    {	html: '<a>IL</a>',
      className: "IFR Low",
      title: "IFR Low map",
      //interaction: new ol.interaction.Select (),
      active:true,
       handleClick: function()
       {
        italianVFRLayer.setVisible(false);
        airwaysLayer.setVisible(true);
        waypointsLayer.setVisible(true);
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
          if (active){
            spriteIsPlane=true;
          } else
          {
            spriteIsPlane=false;
          }
         }
      });
      nestedFlightRules.addControl(ifrHighMapButton);





var flightControls = new ol.control.Bar();
flightControls.setPosition('top-left');
map.addControl(flightControls);

// mainbarControls.addControl (new ol.control.ZoomToExtent({  extent: [ 265971,6243397 , 273148,6250665 ] }));
flightControls.addControl( new ol.control.Button (
  {	
    html: '<i class="maki2-airport"></i>',
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


    


    flightControls.addControl( new ol.control.Toggle (
      {	html: '<a>C</a>',
        className: "map-center-button",
        title: "Press to view the center of the map",
        active:false,
        onToggle: function(active)
          {	
            if (active){
              mapCenterIsVisible=true;
            } else
            {
              mapCenterIsVisible=false;
            }
            
            map.getControls().getArray()[22].setVisible(mapCenterIsVisible);
          }
        
          
          }));



          flightControls.addControl( new ol.control.Button (
            {	html: '<a>Z</a>',
              className: "cirlce-button",
              title: "Press to view aerodrome's ATZ",
              active:false,
             handleClick: function()
                {	




                  if (aerodromeCircleState==3){
                    aerodromeCircleState=0;
                    aerodromeCircleLayer.setVisible(false);
                  }
                  else{
                  aerodromeCircleState++;
                  aerodromeCircleLayer.setVisible(true);
                  refreshCircleAerodrome();
                  }


                  

                }
                
                }));
      












// var customLayerSwitcher=new ol.control.Toggle (
//   {	
//     html:'<i class="fas fa-layer-group fa-lg"></i>',
//     className: "custom-layer-switcher",
//     title: "Custom Layer Switcher",
//     active:true,
//     onToggle: function()
//       {	
        
//       }
//   });

//   map.addControl(customLayerSwitcher);














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

fillFPLbutton= new ol.control.Button(
  {	html: '<a>F</a>',
    className: "fill-flp-button",
    title: "Fill a Flight Plan",
    //interaction: new ol.interaction.Select (),
  
    handleClick: function()
     {
      // $(".map").css({"width": active?"70vw":""});

    
       //$(".fpl-form").css({"display": active?"block":"none"});
       
        $(".fpl-form").css("display","block");
        $(".fpl-form-margin").css("display","block");
        // for (var i=0;i<400;i=i+1)
        // {
        //   setTimeout(function (){
        //     $(".fpl-form").css("height",i);
        //   },700)
        // }
       

     }
  });
map.addControl(fillFPLbutton);



var baseMapButton = new ol.control.Toggle(
  {	html: '<a>B</a>',
    className: "base-map-button",
    title: "Press to change base map colours",
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
map.getLayers().getArray()[indexOfBaseLayer].setZIndex(-1);},4000          )

   }
  });
  map.addControl(baseMapButton);



  //checking if map is on fullscreen mode
  map.getControls().getArray()[3].getControls()[2].on('enterfullscreen',function(){
    fullScreen=true;
    console.log(fullScreen);
  })
  map.getControls().getArray()[3].getControls()[2].on('leavefullscreen',function(){
    fullScreen=false;
    console.log(fullScreen);
  })
  


var scaleLineButton=new ol.control.ScaleLine({                                                  units: 'nautical'
                              
  // ,bar: true
  });

  map.addControl(scaleLineButton);


var targetControl =  new ol.control.Target ({	style: [new ol.style.Style({
  image: new ol.style.RegularShape({
    radius: 10,
    points: 2,
    fill: new ol.style.Fill({
    
  }),
    stroke: new ol.style.Stroke({
    width: 2,
    color: [0,0,0,1]
 }),
})
}),
new ol.style.Style({
  image: new ol.style.RegularShape({
    radius: 10,
    points: 2,
    rotation: Math.PI/2,
    fill: new ol.style.Fill({
    
  }),
    stroke: new ol.style.Stroke({
    width: 2,
    color:  [0,0,0,1]
 }),
})
})
],
  
  visible: mapCenterIsVisible,
  composite: '',
  zIndex: 25000 });



  map.addControl(targetControl);
  












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




