
var historyLayer;
var historyStartEndPoints=[];
function HistoryTrack(routeArray){
  var finalRoutearray=[];
  for(var i=0;i<routeArray.length;i++){
    var coords=ol.proj.fromLonLat(routeArray[i]);
    finalRoutearray.push(coords);
  }
 
  try{ FlyTo(finalRoutearray[0], function() {})}catch(e){}
    

    var styles = {
            
        'LineString' : new ol.style.Style({
            stroke : new ol.style.Stroke({
                color : 'black',
                width : 3,
            }),
        }),
    }
    
    var styleLiveTrack = function (feature) {
          return styles[feature.getGeometry().getType()];
        };
        
        var geojsonObject = {
                  'type': 'FeatureCollection',
                  'crs': {
                    'type': 'name',
                    'properties': {
                      'name': 'EPSG:3857',
                    },
                  },
                  'features': [
                      {
                          'type': 'Feature',
                          'geometry': {
                            'type': 'LineString',
                            'coordinates': finalRoutearray,
                          },
                    },
                    
                    ]}
        
        
        var SourceLiveTrack = new  ol.source.Vector({
              features: new ol.format.GeoJSON().readFeatures(geojsonObject),
            });

             historyLayer = new ol.layer.Vector({
              source: SourceLiveTrack,
              style: styleLiveTrack,
            });
            
            map.addLayer(historyLayer);


}


function StartEndPoint(details,icon,latlong){
    

   var startendpointFeature = new ol.Feature({
							
    geometry : new ol.geom.Point(ol.proj.transform(
      latlong, 'EPSG:4326', 'EPSG:3857')),

  });


  var startendStyle=function pointStyleFunction(feature, resolution) {
    return new ol.style.Style({
    image:  new ol.style.Icon({
      anchor: [0.5, 30],
       scale:1/Math.pow(resolution, 1/3),
       anchorXUnits : 'fraction',
       anchorYUnits : 'pixels',
       src : icon
    }),
    text: createTextStyle(feature, resolution),
    });
    }


      startendpointFeature.setStyle(startendStyle);
      startendpointFeature.setProperties(details)

  var startendSource = new ol.source.Vector({
    features : [ startendpointFeature ]

  });

  var startendLayer = new ol.layer.Vector({
    source : startendSource
  });

  map.addLayer(startendLayer)
  historyStartEndPoints.push(startendLayer)
  
}

function ClearHistory(){
  try{map.removeLayer(historyLayer)}catch(e){alert(e)}
  for(var i=0;i<historyStartEndPoints.length;i++){
    try{map.removeLayer(historyStartEndPoints[i])}catch(e){}
  }historyStartEndPoints=[];


  for(var i=0;i<historylayercontional.length;i++){
    try{map.removeLayer(historylayercontional[i])}catch(e){}

  }historylayercontional=[];
}




// ========================================= Geofencetracking

function PlotGeofenceHistory(data){
  var nextindex;
  for(var i=0;i<data.length;i++){
     
    if(i<data.length-1){
      nextindex=i+1;
    }

    if(data[i].param=="0" && data[nextindex].param5=="0"){
      GeofenceinLine();
    }else if(ata[i].param5=="0" && data[nextindex].param5=="1"){
      GeofenceOutLine()
    }else if(ata[i].param5=="1" && data[nextindex].param5=="1"){
      GeofenceOutLine()
    }else if(ata[i].param5=="1" && data[nextindex].param5=="0"){
      GeofenceOutLine()
    }



  }
}


function GeofenceinLine(points){



}


function GeofenceOutLine(){


}

