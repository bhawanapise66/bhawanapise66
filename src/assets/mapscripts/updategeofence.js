var updateroutelayer=[];
var updatepolygonlayer=[];
var updatepoilayer=[];


function PlotPoi(data){
  Clearpoi();
  var poidetails={
    "data":{
      "type":"live",
      "title":data.name,
      "Range":data.range,
      "Type":data.type,
      "Location":data.location
    }
  }

    var icon="assets/mapimages/markers/poinewmarker.png"//GetPoiIcon();
    var latlon=[];
    latlon.push(Number(data.longitude));
    latlon.push(Number(data.latitude));

    CustomFlyTo(latlon)
   
    var singleFeature = new ol.Feature({
							
        geometry : new ol.geom.Point(ol.proj.transform(
          latlon, 'EPSG:4326', 'EPSG:3857')),
    
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
      singleFeature.setProperties(poidetails)
    
    
      var singleSource = new ol.source.Vector({
        features : [ singleFeature ]
      });
    
      var singleLayer = new ol.layer.Vector({
        source : singleSource
      });
     try{ map.addLayer(singleLayer);}catch(e){}
    
     updatepoilayer.push(singleLayer)
    
      
    


}

function PlotPolygon(data){


}

function PlotRoute(data){

} 


function Clearpoi(){
  for(var i=0;i<updatepoilayer.length;i++){
    try{map.removeLayer(updatepoilayer[i])}catch(e){}
  }updatepoilayer=[];
}