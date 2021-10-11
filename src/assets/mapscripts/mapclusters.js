var vector = null;

var sectionClusters;

var northClusters=[];
var southClusters=[];
var westClusters=[];
var eastClusters=[];
var centralClusters=[];
var subdivisionClusterLayer='';




function MakeClusters(data){

  try{
    var latlon=[];
    latlon.push(Number(data[0].param36))
    latlon.push(Number(data[0].param35))
 //   try{ FlyToCluster(latlon, function() {})}catch(e){}
  }catch(e){}

    var earthquakeFill = new ol.style.Fill({
        color: 'red',
      });
      var earthquakeStroke = new ol.style.Stroke({
        color: '#0000',
        width: 1,
      });
      var textFill = new ol.style.Fill({
        color: '#00000',
        
      });
      var textStroke = new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 0.6)',
        width: 3,
      });
      var invisibleFill = new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.01)',
      });
      
      function createEarthquakeStyle(feature) {
        // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
        // standards-violating <magnitude> tag in each Placemark.  We extract it
        // from the Placemark's name instead.
        var name = feature.get('name');
        var magnitude=5
        //var magnitude = parseFloat(name.substr(2));
        var radius = 7 + 20 * (magnitude - 7);
      
        // new ol.style.Style(
        //     {
        //       image : new ol.style.Icon(
        //           ({
        //             scale:0.8,
        //             anchorXUnits : 'fraction',
        //             anchorYUnits : 'pixels',
        //             src : 'assets/mapimages/mapicons/canter/canter-0.png'
                      
        //           }))
        //     });

     
        var icon=GetIcon(feature.getProperties().data);
        return new ol.style.Style({
          geometry: feature.getGeometry(),
          image: new ol.style.Icon(
            ({
              anchor: [0.5, 20],
              scale:0.8,
              anchorXUnits : 'fraction',
              anchorYUnits : 'pixels',
              src : icon //'assets/mapimages/mapicons/canter/canter-0.png'
                
            })),
        });
      }
      
      var maxFeatureCount;
      
      var calculateClusterInfo = function (resolution) {
        maxFeatureCount = 0;
        var features = vector.getSource().getFeatures();
        var feature, radius;
        for (var i = features.length - 1; i >= 0; --i) {
          feature = features[i];
          var originalFeatures = feature.get('features');
          var extent = ol.extent.createEmpty();
          var j = (void 0), jj = (void 0);
          for (j = 0, jj = originalFeatures.length; j < jj; ++j) {
             ol.extent.extend(extent, originalFeatures[j].getGeometry().getExtent());
          }
          maxFeatureCount = Math.max(maxFeatureCount, jj);
          radius = (0.20 * (ol.extent.getWidth(extent) + ol.extent.getHeight(extent))) / resolution;
          feature.set('radius', radius);
        }
      };
      
      var currentResolution;   function styleFunction(feature, resolution) {
        if (resolution != currentResolution) {
          calculateClusterInfo(resolution);
          currentResolution = resolution;
        }
        var style;
        var size = feature.get('features').length;
        if (size > 1) {
            var color='';
    //        color=[237, 240, 139] //yellow
            if(size>200){
               color=[134, 232, 255]  //light blue
            }else if(size>120){
                color=[164, 255, 255] // sky blue
            }else if(size>50){
                color=[237, 240, 139] //yellow
            }else{
              color=[180, 242, 133]   // light green
            }
          style = new ol.style.Style({
            image: new ol.style.Circle({
              radius: feature.get('radius'),
              
              fill: new ol.style.Fill({
                color: color,
              }),
            }),
            text: new ol.style.Text({
              text: size.toString(),
              font:"bold 14px serif",
              fill: textFill,
              
            }),
          });
        } else {
          var originalFeature = feature.get('features')[0];
          style = createEarthquakeStyle(originalFeature,resolution);
        }
        return style;
      }
      
      function selectStyleFunction(feature) {
        var styles = [
          new Style({
            image: new ol.style.Circle({
              radius: feature.get('radius'),
              fill: invisibleFill,
            }),
          }) ];
      
      
      
        var originalFeatures = feature.get('features');
        var originalFeature;
        for (var i = originalFeatures.length - 1; i >= 0; --i) {
          originalFeature = originalFeatures[i];
          styles.push(createEarthquakeStyle(originalFeature));
        }
        return styles;
      }
      
      var features = new Array(data.length);
      for (var i = 0; i < data.length;i++) {
        
            try{
              var details={
                data:{
            
             
                "type":"cluster",
                "title":data[i].param12,
               "Updated At":data[i].param32,
               "VehicleStatus":data[i].param47,
               "Speed":data[i].param37+" km/hr",
               "Ignition":data[i].param42,
               "GPS Status":data[i].param39,
             "Direction":data[i].param46,
             "direction":data[i].param40,
             "Vehicle Type":data[i].param29,
      
             "maptrack":data[i].param11
               
               
            }
          }
             }catch(e){}
            
              var tempData=[];
              tempData.push(Number(data[i].param36))
              tempData.push(Number(data[i].param35))
              var latlong= ol.proj.fromLonLat(tempData);
           //  var coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
              features[i] = new ol.Feature(new ol.geom.Point(latlong));
      
              features[i].setProperties(details)
           
          
        
      }
      
      var source = new ol.source.Vector({
        features: features,
      });
      vector = new ol.layer.Vector({
        source: new ol.source.Cluster({
          distance: 40,
          source: source,
        }),
        style: styleFunction,
      
    });


    map.addLayer(vector)


}




function MakePersonClusters(data){
    // === fly to cluster function   
    try{
      var latlon=[];
      latlon.push(Number(data[0].param36))
      latlon.push(Number(data[0].param35))
      try{ FlyToCluster(latlon, function() {})}catch(e){}
    }catch(e){}


  var earthquakeFill = new ol.style.Fill({
      color: 'red',
    });
    var earthquakeStroke = new ol.style.Stroke({
      color: '#0000',
      width: 1,
    });
    var textFill = new ol.style.Fill({
      color: 'black',
      
    });
 
    var invisibleFill = new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.01)',
    });
    
    function createEarthquakeStyle(feature,resolution) {
      // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
      // standards-violating <magnitude> tag in each Placemark.  We extract it
      // from the Placemark's name instead.
      var name = feature.get('name');
      var magnitude=5
      //var magnitude = parseFloat(name.substr(2));
      var radius = 7 + 20 * (magnitude - 7);
    
      // new ol.style.Style(
      //     {
      //       image : new ol.style.Icon(
      //           ({
      //             scale:0.8,
      //             anchorXUnits : 'fraction',
      //             anchorYUnits : 'pixels',
      //             src : 'assets/mapimages/mapicons/canter/canter-0.png'
                    
      //           }))
      //     });


      var icon="";

      var status=feature.getProperties().data.Status;
      
      if(status=='Non Polling'){
        icon="assets/mapimages/personicons/personiconred.png"
      }else if(status=='Idle'){
        
        icon="assets/mapimages/personicons/personiconyellow.png"
      }else if(status=='Working'){
        
        icon="assets/mapimages/personicons/personicongreen.png"
      }else if(status=='Stop'){
        icon="assets/mapimages/personicons/personiconred.png"
      }else{
        icon="assets/mapimages/personicons/personiconblack.png"

      }
  



   var styleis=resolution
   

      return new ol.style.Style({
        geometry: feature.getGeometry(),
        image: new ol.style.Icon(
          ({
            anchor: [0.5, 20],
            scale:0.8,
            anchorXUnits : 'fraction',
            anchorYUnits : 'pixels',
            src : icon
              
          })),
          text: createTextStyle(feature, resolution),

      });
    }
    
    var maxFeatureCount;
    
    var calculateClusterInfo = function (resolution) {
      maxFeatureCount = 0;
      var features = vector.getSource().getFeatures();
      var feature, radius;
      for (var i = features.length - 1; i >= 0; --i) {
        feature = features[i];
        var originalFeatures = feature.get('features');
        var extent = ol.extent.createEmpty();
        var j = (void 0), jj = (void 0);
        for (j = 0, jj = originalFeatures.length; j < jj; ++j) {
           ol.extent.extend(extent, originalFeatures[j].getGeometry().getExtent());
        }
        maxFeatureCount = Math.max(maxFeatureCount, jj);
        radius = (0.25 * (ol.extent.getWidth(extent) + ol.extent.getHeight(extent))) / resolution;
       
       if(radius<10){
        feature.set('radius',20);


       }else{
        feature.set('radius',radius);
       }
      }
    };
    
    var currentResolution;
    function styleFunction(feature, resolution) {
      if (resolution != currentResolution) {
        calculateClusterInfo(resolution);
        currentResolution = resolution;
      }
      var style;
      var size = feature.get('features').length;
      if (size > 1) {
          var color='';
          color=[237, 240, 139] //yellow
          // if(size>200){
          //    color=[134, 232, 255]  //light blue
          // }else if(size>120){
          //     color=[164, 255, 255] // sky blue
          // }else if(size>50){
          //     color=[237, 240, 139] //yellow
          // }else{
          //   color=[180, 242, 133]   // light green
          // }
        style = new ol.style.Style({
          image: new ol.style.Circle({
            radius: feature.get('radius'),
            
            fill: new ol.style.Fill({
              color: color,
            }),
          }),
          text: new ol.style.Text({
            text: size.toString(),
            font:"bold 14px serif",
            fill: textFill,
            
          }),
        });
      } else {
        var originalFeature = feature.get('features')[0];
        style = createEarthquakeStyle(originalFeature,resolution);
      }
      return style;
    }
    
    function selectStyleFunction(feature) {
      var styles = [
        new Style({
          image: new ol.style.Circle({
            radius: feature.get('radius'),
            fill: invisibleFill,
          }),
        }) ];
    
    
    
      var originalFeatures = feature.get('features');
      var originalFeature;
      for (var i = originalFeatures.length - 1; i >= 0; --i) {
        originalFeature = originalFeatures[i];
        styles.push(createEarthquakeStyle(originalFeature,resolution));
      }
      return styles;
    }
    
    var allcoord=[];
    var features = new Array(data.length);
    for (var i = 0; i < data.length;i++) {
     try{

     
      var details={
        data:{
          "type":"cluster",
         "title":data[i].param12,
        "Updated At":data[i].param32,
        "VehicleStatus":data[i].param47,
        "Speed":data[i]+" km/hr",
        "Ignition":data[i].param42,
        "Status":data[i].param47,
        "GPS Status":data[i].param39,
      "Direction":data[i].param46,
      "Vehicle Type":data[i].param29
        
    
     // "direction":data[i].param40,
       
    }
  }
     }catch(e){}
    
      var tempData=[];
      tempData.push(Number(data[i].param36))
      tempData.push(Number(data[i].param35))
      var latlong= ol.proj.fromLonLat(tempData);
      allcoord.push(latlong);
   //  var coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
      features[i] = new ol.Feature(new ol.geom.Point(latlong));

      features[i].setProperties(details)
    }
    
    var source = new ol.source.Vector({
      features: features,
    });
    vector = new ol.layer.Vector({
      source: new ol.source.Cluster({
        distance: 40,
        source: source,
      }),
      style: styleFunction,
    
  });


  map.addLayer(vector)

  

 // map.getView().fit(allcoord);

}


function ClearCluster(){
  try{map.removeLayer(vector)}catch(e){}

}






//===f==================== Flying Function
function FlyToCluster(latlong, done) {
  var location=ol.proj.fromLonLat(latlong);
  var duration = 2000;
  var zoom = view.getZoom();
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
  view.animate({
    center : location,
    duration : duration,
  }, callback);
  view.animate({
    zoom : 8,
    duration : duration / 2,
  }, {
    zoom : 8,
    duration : duration / 2,
  }, callback);
}




function GetIcon(data){
  var icon="";
  var direction=GetDirection(Number(data.direction));
  var vehiclecolor=GetVehicleColor(data.VehicleStatus)

  for (var key in data) {

    if(key=="Vehicle Type"){
      if(data[key]=="Maxi Cab"){
        icon="assets/mapimages/vehiclesicon/taxi/icon-"+direction
      }else if(data[key]=="School Bus"){
       // icon="'assets/mapimages/mapicons/canter/canter-0.png";
        icon="assets/mapimages/vehiclesicon/bus/"+vehiclecolor+"/icon-"+direction;
      }else if(data[key]=="Tanker"){
        icon="assets/mapimages/vehiclesicon/tanker/"+vehiclecolor+"/icon-"+direction;

      }else if(data[key]=="Taxi"){
        icon="assets/mapimages/vehiclesicon/taxi/"+vehiclecolor+"/icon-"+direction;
      }else if(data[key]=="Truck"){
        icon="assets/mapimages/vehiclesicon/truck/"+vehiclecolor+"/icon-"+direction;

      }else if(data[key]=="KM" || data[key]=="PT" || data[key]=="Trailer"){
        icon="assets/mapimages/personicons/personiconblack.png";
      }else if(data[key]=="Dumper/Tipper"){
        icon="assets/mapimages/vehiclesicon/truck/"+vehiclecolor+"/icon-"+direction;
      }else if(data[key]=="Mini motaryodha"){
        icon="assets/mapimages/vehiclesicon/jeep/"+vehiclecolor+"/icon-"+direction;

      }else{
        icon="assets/mapimages/vehiclesicon/jeep/"+vehiclecolor+"/icon-"+direction;

      }
    }
  }

  return icon;

}



function GetDirectionIcon(data){
  var icon="";
  var direction=GetDirection(Number(data.direction));


  var icon="assets/mapimages/directionarrow/arrow-"+direction;

  return icon;

}



function GetDirection(dirint){
  //alert("dirint"+dirint);
     dirstring='';
    if(dirint>=345 && dirint<35){
        dirstring="0.png";
    }
    else if(dirint>=35 && dirint<75){
        dirstring="45.png";
    }
    else if(dirint>=75 && dirint<135){
        dirstring="90.png";
    }
    else if(dirint>=135 && dirint<165){
        dirstring="135.png";
    }
    else if(dirint>=165 && dirint<195){
        dirstring="180.png";
    }
    else if(dirint>=195 && dirint<255){
        dirstring="225.png";
    }
    else if(dirint>=255 && dirint<285){
        dirstring="270.png";
    }
    else if(dirint>=285 && dirint<345){
        dirstring="315.png";
    }
    else {
        dirstring="0.png";
    }
    return dirstring;
}



function GetVehicleColor(data){
  var vehiclecolor;
  if(data=="Running"){
    vehiclecolor="green";
  }else if(data=="Idle"){
    vehiclecolor="yellow";
  }else if(data="Stop"){
    vehiclecolor="red";
  }else{
    vehiclecolor="blue";
    
  }


  return vehiclecolor;
}