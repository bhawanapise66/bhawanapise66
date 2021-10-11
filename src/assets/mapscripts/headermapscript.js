var headerview;
var headermap;
var headerlayers=[];

var headercontainer ;
 var headercontent ;
 var headercloser;
 var headeralert=[];


function Headermap(target,longlat){

    try{
        headerview=new ol.View({
               center: ol.proj.fromLonLat(longlat),
               maxZoom: 19,
               minZoom:5,
               zoom: 7
             })
   
          
   
        //=========== map Styles
            // layers === 0  ===== Bing Map
            headerlayers.push(new ol.layer.Tile({
               visible: false,
                 preload: Infinity,
                source : new ol.source.BingMaps({
                  key: 'AqEn-Zmv686dbUmTZMsPBTMSVHaVudrwdc-_nUhYi6yTKwOI97eGxCqsRCxC6N0N',
                     imagerySet: 'Road'
                })
              }));
              
   
   
   
              // layers === 1   ===== Bing Map Hybrid Layer
   
   
              headerlayers.push(new ol.layer.Tile({
               visible: false,
                 preload: Infinity,
                source : new ol.source.BingMaps({
                  key: 'AqEn-Zmv686dbUmTZMsPBTMSVHaVudrwdc-_nUhYi6yTKwOI97eGxCqsRCxC6N0N',
                  imagerySet: 'AerialWithLabels'
                })
              }));
              
   
           //  layers 2 ============ TOM TOm Layer
   
           headerlayers.push(  new ol.layer.Tile({
             visible: false,
               preload: Infinity,
                source: new ol.source.TileWMS({
                  url:'https://api.tomtom.com/map/1/wms/?request=GetMap&srs=EPSG%3A3857&bbox=-0.489%2C51.28%2C0.236%2C51.686&width=512&height=512&format=image%2Fpng&layers=basic&version=1.1.1&key=EMAgQMM0q70KKQlY19lCG95Hz2DZKNOY',
               //   format: 'image/jpeg'},
                  //serverType: 'geoserver',
                  // Countries have transparency, so do not fade tiles:
                 transition: 0
                })
           }));
           //  layers 3 ============ OSM Layer
           headerlayers.push(
             new ol.layer.Tile({
               visible: true,
               preload: Infinity,
               source: new ol.source.OSM()
             }));
   
   
            //  layers 4 ============ India Layer
            headerlayers.push(new ol.layer.Tile({
             visible: false,
             preload: Infinity,
   
             extent : [ -20037508, -20037508, 20037508, 20037508 ],
             source : new ol.source.TileWMS({
               url : 'http://209.51.202.250:8082/geoserver/wms',
               type : 'base',
               params : {
                 'LAYERS' : 'IndiaLayer',
                 'TILED' : true,
                 'CRS' : 'EPSG:4326'
               },
               serverType : 'geoserver'
       //				 tileGrid: tileGrid
             })
           }));
           
       //======================================     
             headermap =new ol.Map({
               target: target,
               loadTilesWhileAnimating: true,
               layers: headerlayers,
               view:headerview
             });
   
             try{var zoomslider = new ol.control.ZoomSlider();
               headermap.addControl(zoomslider);
             }catch(e){}
             
       }catch(e){}
   
}




function createheadermapopup(){
    headerpopup = new ol.Overlay({
    element: headercontainer,
    autoPan: true,
    autoPanAnimation: {
      duration: 250,
    },
  });

  headermap.addOverlay(headerpopup);

  headercloser.onclick = function () {
    headerpopup.setPosition(undefined);
    headercloser.blur();
    return false;
  };



headermap.on('click', (e) => {


  headermap.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
    var coordinates1 = feature.getGeometry().getCoordinates();
    var data=feature.getProperties()
    console.log(data)
    if ('features' in data){
      data=data.features[0].values_.data;
    }else{
       data=feature.getProperties().data
    }
    
    if(data.type=="live" || data.type=='cluster'){
      var dataArray=[];
      var speed='';
      var alertname='';
      var alerttime='';
      var alerticon='';

     

    try{var detailsForDisplay="<div class='popupMainDiv'>"+
      "<table class='table-striped popCustomTable'>"
      +"<tr></tr>"
    }catch(e){}

    for (var key in data) {
      if (data.hasOwnProperty(key)) {
            if(key=='title'){
              detailsForDisplay=detailsForDisplay+"<tr class='tableheader'><td colspan='2' style='text-align:center'>"+data[key]+"</td></tr>"
           
            }else{
             if(key!='type'){
            //  if(key=='Speed' || key=='alerticon' || key=='alerttime' || key=='alertname'){
                // if(key=='speed'){
                //   speed=data[key];
                //  }else if(key=='alertname'){
                //   alertname=data[key];
                  
                //  }else if(key=='alerticon'){
                //   alerticon=data[key];
                //  }else if(key=='alerttime'){
                //   alerttime=data[key];
                //  }
               
               
            //  }else{
              var color="";
              if(key=='GPS Status' || key=='Gps Status'){
                if(data[key]=="Valid" || data[key]=="VALID"){
                  color="green";
                }else{
                  color="red";
                }
              }else if(key=='Status'){
                if(data[key]=="Not Connected"){
                  color="yellow";
                }else if(data[key]=="Never Connected"){
                  color="red";
                }else if(data[key]=="Connected"){
                  color="green";
                }else{
                  color="red";
                }
                
                
              }else{
                color="";
              }

                detailsForDisplay=detailsForDisplay+"<tr><td class='leftTd'>"+key+"</td><td class='rightTd'><span style='color:"+color+"'>"+data[key]+"</span></td></tr>"
         
             // }
            }
           }
             
            
      }
   }


   detailsForDisplay=detailsForDisplay+"</table></div>"
   headercontainer.innerHTML =detailsForDisplay;
headerpopup.setPosition(coordinates1);
    }


});

})

}




//==========================  Single Marker

function headerSingleMarker(latlong,details,icon){
  var singleFeature = new ol.Feature({
							
    geometry : new ol.geom.Point(ol.proj.transform(
      latlong, 'EPSG:4326', 'EPSG:3857')),

  });



var singleStyle=function pointStyleFunction(feature, resolution) {
return new ol.style.Style({
image:  new ol.style.Icon({
   anchor: [0.5, 20],
   scale:0.8,//1/Math.pow(resolution, 1/3),
   anchorXUnits : 'fraction',
   anchorYUnits : 'pixels',
   src : icon
}),
text: createTextStyle(feature, resolution),
});
}
  singleFeature.setStyle(singleStyle);
  singleFeature.setProperties(details)


  var singleSource = new ol.source.Vector({
    features : [ singleFeature ]
  });

  var singleLayer = new ol.layer.Vector({
    source : singleSource
  });
 try{ headermap.addLayer(singleLayer);}catch(e){}

  headeralert.push(singleLayer)

try{headerCustomFlyTo(latlong)}catch(e){}
  
  

}


    
function getText(feature, resolution) {
  var type = 'shorten';
  var maxResolution = 0.7853981633974483;
  var data=feature.getProperties().data;
 var text=""
      for (var key in data) {
  
        if(key=="Updated At"){
          text =text+"\n"+data[key]
        }if(key=="title"){
          text =data[key] //feature.getProperties().data.title
            
        }
      }


  return text;
};



function createTextStyle(feature, resolution) {
  var align ='center';
  var baseline ='middle';
 //1/Math.pow(resolution, 1/3)*10+1>4?1/Math.pow(resolution, 1/3)*10+10:0;
 var size = '6px'
  if(1/Math.pow(resolution, 1/3)*10+1<4){
   var size = '0px'
  }else{
   size = '10px'

  }
  var height = 1;
  var offsetX = 50;
  var offsetY = 20;
  var weight = 'normal';
  var placement ='point';
  var maxAngle = 0.7853981633974483
  var overflow ='false';
  var rotation = 0;
  var color='black';
  var outline=0;
  var outlinecolor='black';
  var font='Arial'



  
  var font = weight + ' ' + size + '/' + height + ' ' + font;

  var fillColor = color;
  var outlineColor = outlinecolor;
  var outlineWidth =outline;

  return new ol.style.Text({
   textAlign: align == '' ? undefined : align,
   textBaseline: baseline,
   font: font,
   backgroundFill:new ol.style.Fill({color: 'white'}),

   text: getText(feature, resolution),
   fill: new ol.style.Fill({color: fillColor}),
   stroke: new ol.style.Stroke({color: outlineColor, width: outlineWidth}),
   offsetX: offsetX,
   offsetY: offsetY,
   placement: placement,
   maxAngle: maxAngle,
   overflow: overflow,
   rotation: rotation,
  });
};

//=============================== Clear Functions  


function ClearHeaderalerticon(){
  for(var i=0;i<headeralert.length;i++){
    try{headermap.removeLayer(headeralert[i]);}catch(e){}
  }headeralert=[];
}
//======================= Flying Function
function HeaderFlyTo(location, done) {
  var duration = 2000;
  var zoom = headerview.getZoom();
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
  headerview.animate(
    {
      center : location,
      zoom:20,
      duration : duration,
    },
    {
      center : location,
      zoom:20,
      duration: duration / 2,
    }, callback);
}


function headerCustomFlyTo(latlong){
  var coord=ol.proj.fromLonLat(latlong);
 try{ HeaderFlyTo(coord, function() {})}catch(e){}

}
