var i = 0;
var historyinterval;
var historypointmarkers = [];

var historyanimationline = [];

var historydata;
var totaldistancehistory = 0;
var animationspeed = 1100;





function AnimationLine(data, trackspeed) {

  vectorSourceHistory.clear();
  vectorSourceLine.clear();
  totaldistancehistory = 0;
  animationspeed = 1100 - trackspeed * 100;
  historydata = data;
  try { clearInterval(historyinterval); } catch (e) { }

  historyinterval = setInterval(function () {
    var latlon = [];
    if (i < data.length) {


      if (i >= 1) {
        var templatlon = [];
        templatlon.push(Number(data[i - 1].param4))
        templatlon.push(Number(data[i - 1].param3))
        latlon.push(templatlon);
        templatlon = [];
        templatlon.push(Number(data[i].param4))
        templatlon.push(Number(data[i].param3))
        latlon.push(templatlon);
        var color = "blue";
        if (Number(data[i].param5) > 5) {
          color = "red";
        } else {
          color = "blue";
        }
        Drawline(latlon, data[i - 1], color)
      }

      if (i == data.length) {
        ClearHistoryInterval();
      }
      i++;
    }
  }, animationspeed);

  lineString

}
function Drawline(coord, details, color) {


  var distance = GetDistance(coord[0][1], coord[0][0], coord[1][1], coord[1][0], "K");
  totaldistancehistory = totaldistancehistory + distance;


  var lineString = new ol.geom.LineString(coord);
  lineString.transform('EPSG:4326', 'EPSG:3857');


  var historylinecoords = lineString.getCoordinates();

  var styles = {

    'LineString': new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: color,
        width: 3,
      }),
    }),
  }


  var lineStyle = new ol.style.Style({
    fill: new ol.style.Fill({
      color: '#00FF00',
      weight: 4
    }),
    stroke: new ol.style.Stroke({
      color: color,
      width: 3
    })
  });
  //					     
  var feature = new ol.Feature({
    geometry: lineString
  });
  //					     
  feature.setStyle(lineStyle);

  // var SourceLiveTrack = new  ol.source.Vector({
  //       features: new ol.format.GeoJSON().readFeatures(geojsonObject),
  //     });


  vectorSourceLine.addFeature(feature);

  // var  historyLayer = new ol.layer.Vector({
  //   source: SourceLiveTrack,
  //   style: styleLiveTrack,
  // });

  // map.addLayer(historyLayer);
  //   historyanimationline.push(historyLayer)


  var details = {
    data: {
      "type": "live",             //type
      "title": details.param19,  //vehicle No
      // "Customer":details.param17,
      "Date/ Time": details.param2,
      // "Ignition":details.param14,
      //  "GPS Status":details.param15,
      //  "Vehicle Type":details.param23,
      "Speed": details.param5,
      //   "Direction Name ":details.param20,
      "direction": details.param7,
      "Distance": totaldistancehistory.toFixed(2) + " km"

    }
  }

  var icon = GetDirectionIcon(details.data);
  HistoryPoint(historylinecoords[0], details, icon)

}

function HistoryPoint(latlong, details, icon) {
  //==========================  Single Marker

  var singleFeature = new ol.Feature({

    geometry: new ol.geom.Point(latlong),

  });



  var singleStyle = function pointStyleFunction(feature, resolution) {
    return new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 20],
        scale: 0.5,//1/Math.pow(resolution, 1/3),
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: icon
      }),
      //text: createTextStyle(feature, resolution),
    });
  }


  singleFeature.setStyle(singleStyle);
  singleFeature.setProperties(details);
  vectorSourceHistory.addFeatures([singleFeature]);



  var data = singleFeature.getProperties().data

  try {
    var detailsForDisplay = "<div class='popupMainDiv'>" +
      "<table class='popCustomTable'>"
      + "<tr></tr>"
  } catch (e) { }

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      if (key == 'title') {
        detailsForDisplay = detailsForDisplay + "<tr class='tableheader'><td colspan='2' style='text-align:center'>" + data[key] + "</td></tr>"

      } else if (key == 'direction') { } else {
        if (key != 'type') {

          var color = "";
          if (key == 'GPS Status' || key == 'Gps Status') {
            if (data[key] == "Valid" || data[key] == "VALID") {
              color = "green";
            } else {
              color = "red";
            }
          } else if (key == 'Status') {
            if (data[key] == "Not Connected") {
              color = "yellow";
            } else if (data[key] == "Never Connected") {
              color = "red";
            } else if (data[key] == "Connected") {
              color = "green";
            } else {
              color = "red";
            }


          } else {
            color = "";
          }

          detailsForDisplay = detailsForDisplay + "<tr><td class='leftTd'>" + key + "</td><td class='rightTd'><span style='color:" + color + "'>" + data[key] + "</span></td></tr>"

          // }
        }

      }


    }
  }
  detailsForDisplay = detailsForDisplay + "</table></div>"


  //popup.setPosition(undefined);
  //closer.blur();
  //return false;
  var coordinates1 = singleFeature.getGeometry().getCoordinates();


  content.innerHTML = detailsForDisplay;
  popup.setPosition(coordinates1);







}


function ClearHistoryInterval() {

  try { clearInterval(historyinterval); } catch (e) { }
}

function ResumeAnimation(trackspeed) {
  animationspeed = 1100 - trackspeed * 100;
  try { clearInterval(historyinterval); } catch (e) { }

  historyinterval = setInterval(function () {
    var latlon = [];
    if (i >= 1) {
      var templatlon = [];
      templatlon.push(Number(historydata[i - 1].param4))
      templatlon.push(Number(historydata[i - 1].param3))
      latlon.push(templatlon);
      templatlon = [];
      templatlon.push(Number(historydata[i].param4))
      templatlon.push(Number(historydata[i].param3))
      latlon.push(templatlon);

      var color = "blue";
      if (Number(historydata[i].param5) > Number(historydata[i].param25)) {
        color = "red"
      } else {
        color = "blue";
      }
      Drawline(latlon, historydata[i], color);


      var details = {
        data: {
          "type": "live",             //type
          "title": historydata[i].param19,  //vehicle No
          // "Customer":historydata[i].param17,
          "Date/ Time": historydata[i].param2,
          // "Ignition":details.param14,
          //  "GPS Status":details.param15,
          //  "Vehicle Type":details.param23,
          "Speed": historydata[i].param5,
          //   "Direction Name ":details.param20,
          "direction": historydata[i].param7,
          "Distance": totaldistancehistory.toFixed(2) + " km"

        }
      }

      var icon = GetDirectionIcon(details.data);
      try {
        HistoryPoint(historylinecoords[0], details, icon)
      } catch (e) { }

    }

    if (i == historydata.length) {
      ClearHistoryInterval();
    }
    i++;

  }, animationspeed);

}





function RestartAnimation(trackspeed) {
  totaldistancehistory = 0;
  animationspeed = 1100 - trackspeed * 100;
  try { clearInterval(historyinterval); } catch (e) { }
  i = 0;
  historyinterval = setInterval(function () {
    var latlon = [];
    if (i >= 1) {
      var templatlon = [];
      templatlon.push(Number(historydata[i - 1].param4))
      templatlon.push(Number(historydata[i - 1].param3))
      latlon.push(templatlon);
      templatlon = [];
      templatlon.push(Number(historydata[i].param4))
      templatlon.push(Number(historydata[i].param3))
      latlon.push(templatlon);
      Drawline(latlon, historydata[i])
    }

    if (i == historydata.length) {
      ClearHistoryInterval();
    }
    i++;

  }, 500);


}



function GetDirectionIcon(data) {
  var icon = "assets/mapimages/directionarrow/arrow-" + GetDirection(data.direction);
  // E:\Tafseer\indtrack\10062021\ANGULAR8-Starter-kit\src\assets\mapimages\directionarrow\arrow-0.png
  return icon;
}


function ClearHistoryAnimation1() {
  ClearHistoryInterval();
  totaldistancehistory = 0;
  i = 0;
  for (var i = 0; i < historypointmarkers.length; i++) {
    map.removeLayer(historypointmarkers[i]);
  } historypointmarkers = [];

  for (var i = 0; i < historyanimationline.length; i++) {
    map.removeLayer(historyanimationline[i]);
  } historyanimationline = [];


  vectorSourceHistory.clear();
  vectorSourceLine.clear();



}



function CompleteHistoryDrawline(coord, details, color) {


  var distance = GetDistance(coord[0][1], coord[0][0], coord[1][1], coord[1][0], "K");
  totaldistancehistory = totaldistancehistory + distance;


  var lineString = new ol.geom.LineString(coord);
  lineString.transform('EPSG:4326', 'EPSG:3857');


  var historylinecoords = lineString.getCoordinates();

  var styles = {

    'LineString': new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: color,
        width: 3,
      }),
    }),
  }


  var lineStyle = new ol.style.Style({
    fill: new ol.style.Fill({
      color: '#00FF00',
      weight: 4
    }),
    stroke: new ol.style.Stroke({
      color: color,
      width: 3
    })
  });


  var feature = new ol.Feature({
    geometry: lineString
  });
  feature.setStyle(lineStyle);
  vectorSourceLine.addFeature(feature);

  var details = {
    data: {
      "type": "live",             //type
      "title": details.param19,  //vehicle No
      //   "Customer":details.param17,
      "Date/ Time": details.param2,
      // "Ignition":details.param14,
      //  "GPS Status":details.param15,
      //  "Vehicle Type":details.param23,
      "Speed": details.param5,
      //   "Direction Name ":details.param20,
      "direction": details.param7,
      "Distance": totaldistancehistory.toFixed(2) + " km"

    }
  }

  var icon = GetDirectionIcon(details.data);
  try {
    CompleteHistoryPoint(historylinecoords[0], details, icon)
  } catch (e) { }

}


function PlotCompleteHistory() {

  try { clearInterval(historyinterval); } catch (e) { }
  i = 0;

  var latlon = [];
  for (var i = 0; i < historydata.length; i++) {
    if (i > 1) {
      if (latlon.length == 2) {
        latlon = [];
      }
      var templatlon = [];
      templatlon.push(Number(historydata[i - 1].param4))
      templatlon.push(Number(historydata[i - 1].param3))
      latlon.push(templatlon);
      templatlon = [];
      templatlon.push(Number(historydata[i].param4))
      templatlon.push(Number(historydata[i].param3))
      latlon.push(templatlon);
      var color = "blue";
      if (Number(historydata[i].param5) > 5) {
        color = "red"
      } else {
        color = "blue";
      }

     try{ CompleteHistoryDrawline(latlon, historydata[i], color);}catch(e){}


    }

  }



}




function CompleteHistoryPoint(latlong, details, icon) {
  //==========================  Single Marker

  var singleFeature = new ol.Feature({

    geometry: new ol.geom.Point(latlong),

  });

  
  var singleStyle=function pointStyleFunction(feature, resolution) {
    return new ol.style.Style({
    image:  new ol.style.Icon({
       anchor: [0.5, 20],
       scale:0.5,//1/Math.pow(resolution, 1/3),
       anchorXUnits : 'fraction',
       anchorYUnits : 'pixels',
       src : icon
    }),
    //text: createTextStyle(feature, resolution),
    });
    }
      
    
      singleFeature.setStyle(singleStyle);
      singleFeature.setProperties(details)
      vectorSourceHistory.addFeatures([singleFeature]);
  

}