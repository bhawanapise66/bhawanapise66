
var view;
var map;
var livetrailLine = [];
var livetrailicon = '';
var routeArray = [];
var alertsArray = [];
var multiMarkers = [];
var singleMarker = [];
var poiMarkers = [];
var directionMarkers = [];
var alertsMarker = [];
var popup;
var container;
var content;
var closer;

var layers = [];
var poiFlag = 0;
var routeFlag = 0;
var polygonFlag = 0;

var apiurl = "";
var pageurl = "";
var pageId = "";
var headerkey = "";
var pagename = "";


var vectorSourceLine;
var vectorLayerLine;


var vectorSourceHistory;

var vectorLayerHistory;





function mapBuild(target, longlat) {

  try{vectorSourceHistory.clear();
    vectorSourceLine.clear();}catch(e){}
  
 vectorSourceLine = new ol.source.Vector({
  //features: iconFeaturesAll
});

 vectorLayerLine = new ol.layer.Vector({
source: vectorSourceLine
});


 vectorSourceHistory = new ol.source.Vector({
  //features: iconFeaturesAll
});

 vectorLayerHistory = new ol.layer.Vector({
source: vectorSourceHistory
});
  try {
    view = new ol.View({
      center: ol.proj.fromLonLat(longlat),
      maxZoom: 19,
      minZoom: 5,
      zoom: 7
    })


    //  var extent=[148.77638,-34.491728,148.77896,-34.492302];

    // map.getView().fit(extent,map.getSize());


    //=========== map Styles
    //layers === 0  ===== Bing Map
    layers.push(new ol.layer.Tile({
      visible: false,
        preload: Infinity,
       source : new ol.source.BingMaps({
         key: 'AqEn-Zmv686dbUmTZMsPBTMSVHaVudrwdc-_nUhYi6yTKwOI97eGxCqsRCxC6N0N',
            imagerySet: 'Road'
       })
     }));




    // layers === 1   ===== Bing Map Hybrid Layer


    layers.push(new ol.layer.Tile({
      visible: false,
      preload: Infinity,
      source: new ol.source.BingMaps({
        key: 'AqEn-Zmv686dbUmTZMsPBTMSVHaVudrwdc-_nUhYi6yTKwOI97eGxCqsRCxC6N0N',
        imagerySet: 'AerialWithLabels'
      })
    }));


    //  layers 2 ============ TOM TOm Layer

    layers.push(new ol.layer.Tile({
      visible: false,
      preload: Infinity,
      source: new ol.source.TileWMS({
        url: 'https://api.tomtom.com/map/1/wms/?request=GetMap&srs=EPSG%3A3857&bbox=-0.489%2C51.28%2C0.236%2C51.686&width=512&height=512&format=image%2Fpng&layers=basic&version=1.1.1&key=EMAgQMM0q70KKQlY19lCG95Hz2DZKNOY',
        //   format: 'image/jpeg'},
        //serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0
      })
    }));
    //  layers 3 ============ OSM Layer
    layers.push(
      new ol.layer.Tile({
        visible: false,
        preload: Infinity,
        source: new ol.source.OSM()
      }));


    //  layers 4 ============ India Layer
    layers.push(new ol.layer.Tile({
      visible: false,
      preload: Infinity,

      //http://164.52.201.137:2847/geoserver/generalLayers/wms?service=WMS&version=1.1.0&request=GetMap&layers=generalLayers%3AIndia_State_region&bbox=68.170825%2C6.755597%2C97.404631%2C37.085228&width=740&height=768&srs=EPSG%3A4326&styles=&format=application/openlayers
      extent: [-20037508, -20037508, 20037508, 20037508],
      source: new ol.source.TileWMS({
        url: 'http://164.52.201.137:2847/geoserver/generalLayers/wms',//'http://209.51.202.250:8082/geoserver/wms',
        type: 'base',
        params: {
          'LAYERS': 'generalLayers:India_State_region',//'IndiaLayer',
          'TILED': true,
          'CRS': 'EPSG:4326'
        },
        serverType: 'geoserver'
        //				 tileGrid: tileGrid
      })
    }));


    AddIndialayers()


    // ============================= tracking layerss

    
    layers.push(vectorLayerLine);
    layers.push(vectorLayerHistory);

    


    //======================================     

    map = new ol.Map({
      target: target,
      loadTilesWhileAnimating: true,
      layers: layers,
      view: view
    });

    try {
      var zoomslider = new ol.control.ZoomSlider();
      map.addControl(zoomslider);
    } catch (e) { }

  } catch (e) { }


  // map.n("pointermove", function (evt) {
  //   var hit = this.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
  //       return true;
  //   }); 
  //   if (hit) {
  //       this.getTargetElement().style.cursor = 'pointer';
  //   } else {
  //       this.getTargetElement().style.cursor = '';
  //   }
  // });


  function stringDivider(str, width, spaceReplacer) {
    if (str.length > width) {
      var p = width;
      while (p > 0 && str[p] != ' ' && str[p] != '-') {
        p--;
      }
      if (p > 0) {
        var left;
        if (str.substring(p, p + 1) == '-') {
          left = str.substring(0, p + 1);
        } else {
          left = str.substring(0, p);
        }
        var right = str.substring(p + 1);
        return left + spaceReplacer + stringDivider(right, width, spaceReplacer);
      }
    }
    return str;
  }
}


function Livetrail(latlong, details, icon, type) {

  if (type == 0) {
    routeArray = [];
    var myCoord = ol.proj.fromLonLat(latlong)
    try { FlyTo(myCoord, function () { }) } catch (e) { }
  }


  var liveFeature = new ol.Feature({

    geometry: new ol.geom.Point(ol.proj.transform(
      latlong, 'EPSG:4326', 'EPSG:3857')),

  });

  var liveStyle = new ol.style.Style(
    {
      image: new ol.style.Icon(
        ({
          anchor: [0.5, 20],
          scale: 0.8,
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: icon

        }))
    });


  liveFeature.setStyle(liveStyle);
  liveFeature.setProperties(details)

  var liveSource = new ol.source.Vector({
    features: [liveFeature]

  });

  var liveLayer = new ol.layer.Vector({
    source: liveSource
  });
  try { map.removeLayer(livetrailicon) } catch (e) { }
  map.addLayer(liveLayer);

  livetrailicon = liveLayer



  var tempArray = ol.proj.fromLonLat(latlong);
  routeArray.push(tempArray);
  if (routeArray.length == 2) {
    try { Drawroute(routeArray) } catch (e) { }
    routeArray = [];
    routeArray.push(tempArray);
  }




}


function Drawroute(routeArray) {


  var styles = {

    'LineString': new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'black',
        width: 3,
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
          'coordinates': routeArray,
        },
      },

    ]
  }


  var SourceLiveTrack = new ol.source.Vector({
    features: new ol.format.GeoJSON().readFeatures(geojsonObject),
  });

  var LayerLiveTrack = new ol.layer.Vector({
    source: SourceLiveTrack,
    style: styleLiveTrack,
  });

  map.addLayer(LayerLiveTrack);
  livetrailLine.push(LayerLiveTrack)



}






function PlotAlerts(alertDetails, coord, icon) {
  var alertFeatures = new ol.Feature({

    geometry: new ol.geom.Point(ol.proj.transform(
      coord, 'EPSG:4326', 'EPSG:3857')),
  });

  var alertStyle = new ol.style.Style(
    {
      image: new ol.style.Icon(
        ({
          anchor: [0.5, 8],
          scale: 0.8,
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: icon

        }))
    });


  alertFeatures.setStyle(alertStyle);
  alertFeatures.setProperties(alertDetails)

  var alertSource = new ol.source.Vector({
    features: [alertFeatures]

  });

  var alertLayer = new ol.layer.Vector({
    source: alertSource
  });

  map.addLayer(alertLayer)
  alertsArray.push(alertLayer)


}


function PopupInitialize() {
  // overlayLayer.setPosition(undefined);


  popup = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250,
    },
  });

  map.addOverlay(popup);


  closer.onclick = function () {
    popup.setPosition(undefined);
    closer.blur();
    return false;
  };



  ///========================== PopupFunc

  try {




    map.on("click", function (e) {//map.on('click', (e) => {
      try {


        map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
          var coordinates1 = feature.getGeometry().getCoordinates();
          var data = feature.getProperties()
          var track = "";
          if ('features' in data) {
            data = data.features[0].values_.data;
          } else {
            data = feature.getProperties().data
          }
    
          if (data.type == "live" || data.type == 'cluster') {

            try {
              var detailsForDisplay = "<div class='popupMainDiv'>" +
                "<table class='table-striped popCustomTable'>";
            } catch (e) { }

            detailsForDisplay = detailsForDisplay + "<thead class='tableheader'><th colspan='2' style='     line-height: 1;   font-weight: 500; background-color: #22246b !important ;color: white;text-align:center'>" + data.title + "</th></thead> <tbody id='detailsbody'>"

            var vehicleno = "";

            for (var key in data) {
              // console.log("key!='direction'  "+key!='direction')

              if (data.hasOwnProperty(key)) {
                if (key == 'title') {


                } else {
                  if (key != 'type') {
                    if (key == 'direction') { } else if (key == 'maptrack') { } else if (key == "VehicleStatus") { } else {
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

                    }

                    // }
                  }
                }




              }
            }


            var datevalue = "'" + this.currentDate + "'"
            var historyfunction = 'historytrack("' + data.maptrack + '")'

            detailsForDisplay = detailsForDisplay + "</tbody>"
            detailsForDisplay = detailsForDisplay
              + "<tbody id='historyinputdiv' style='display:none;'>"
              + "<tr><td colspan='3'> <i class='fa fa-arrow-circle-left' onclick='Backtodetails()' style='float: right; font-size: 17px;cursor: pointer;margin-right: 5px;'></i></td></tr>"
              + "<tr><td></td></tr>"
              + "<tr><td >From </td>"
              + "<td ><input type='date' id='fromdate' value=" + datevalue + "  max=" + datevalue + "></td>"
              + "<td ><input type='time' value='00:00' id='fromtime'></td>"
              + "</tr>"

              + "<tr><td>To </td>"
              + "<td ><input type='date' id='todate' value=" + datevalue + " max=" + datevalue + "></td>"
              + "<td ><input type='time'  value='23:59' id='totime'></td>"
              + "</tr>"

              + "<tr><td colspan='3'>"
              + "<div style='color: white; cursor: pointer;background-color: #030344;width: 81px;text-align: center;font-size: 12px;margin-left: 43px;float:right;margin-right: 7px;margin-top: 11px; margin-bottom: 9px;' onclick=" + historyfunction + ">Track</div>"
              + "</td></tr>"

              + "</tbody>"
              + "</table></div>"



            if ('maptrack' in data) {
              var livefuntion = 'livetrackfunction("' + data.maptrack + '")';
              var historyfunction = 'historytrackfunction("' + data.maptrack + '")'
              track = "<div style='    display: flex; padding-top: 9px;  padding-bottom: 8px;' id='detailstrackingdiv'>" +
                "<div class='livehistorybutton' style=' margin-left: 43px;' onclick=" + livefuntion + ">Live Track</div>" +
                "<div class='livehistorybutton' style=' margin-left: 20px;' onclick=" + historyfunction + ">History Track</div>" +

                "</div>"
            }

            detailsForDisplay = detailsForDisplay + track
            content.innerHTML = detailsForDisplay;
            this.popup.setPosition(coordinates1);
          }




        });

      } catch (e) { }
    });

  } catch (e) { }


}




//==========================  Single Marker

function SingleMarker(latlong, details, alerts, icon) {


  var singleFeature = new ol.Feature({

    geometry: new ol.geom.Point(ol.proj.transform(
      latlong, 'EPSG:4326', 'EPSG:3857')),

  });



  var singleStyle = function pointStyleFunction(feature, resolution) {
    return new ol.style.Style({
      image: new ol.style.Icon({
        anchor: [0.5, 20],
        scale: 0.8,//1/Math.pow(resolution, 1/3),
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: icon
      }),
      text: createTextStyle(feature, resolution),
    });
  }


  singleFeature.setStyle(singleStyle);
  singleFeature.setProperties(details)


  var singleSource = new ol.source.Vector({
    features: [singleFeature]
  });

  var singleLayer = new ol.layer.Vector({
    source: singleSource
  });
  try { map.addLayer(singleLayer); } catch (e) { }

  singleMarker.push(singleLayer)


  var data = singleFeature.getProperties().data

  try {
    var detailsForDisplay = "<div class='popupMainDiv'>" +
      "<table class='popCustomTable'>"
      + "<tr></tr>"
  } catch (e) { }

  var track = "";
  for (var key in data) {
    // console.log("key!='direction'  "+key!='direction')

    if (data.hasOwnProperty(key)) {
      if (key == 'title') {

        detailsForDisplay = detailsForDisplay + "<tr class='tableheader'><td colspan='2' style='text-align:center'>" + data[key] + "</td></tr>"

      } else {
        if (key != 'type') {
          if (key == 'direction') { } else if (key == 'maptrack') { } else if (key == "VehicleStatus") { } else {
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

          }

          // }
        }
      }



      if (key == "maptrack") {
        var livefuntion = 'livetrackfunction("' + data.maptrack + '")';
        var historyfunction = 'historytrackfunction("' + data.maptrack + '")'
        track = "<div style='    display: flex; padding-top: 9px;  padding-bottom: 8px;'>" +
          "<div style='color: white;cursor:pointer;background-color: #030344; width: 81px; text-align: center;font-weight: bold;font-size: 12px;  margin-left: 43px;' onclick=" + livefuntion + ">Live Track</div>" +
          "<div style='color: white;cursor:pointer;background-color: #030344; width: 90px; text-align: center;font-weight: bold;font-size: 12px;  margin-left: 20px;' onclick=" + historyfunction + ">History Track</div>" +

          "</div>"
      }
    }
  }

  detailsForDisplay = detailsForDisplay + "</table></div>" + track
  var coordinates1 = singleFeature.getGeometry().getCoordinates();


  content.innerHTML = detailsForDisplay;
  popup.setPosition(coordinates1);




}



function getText(feature, resolution) {
  var type = 'shorten';
  var maxResolution = 0.7853981633974483;
  var data = feature.getProperties().data;
  var text = ""
  for (var key in data) {

    if (key == "Updated At") {
      text = text + "\n" + data[key]
    } if (key == "title") {
      text = data[key] //feature.getProperties().data.title

    }
  }


  return text;
};



function createTextStyle(feature, resolution) {
  var align = 'center';
  var baseline = 'middle';
  //1/Math.pow(resolution, 1/3)*10+1>4?1/Math.pow(resolution, 1/3)*10+10:0;
  var size = '6px'
  if (1 / Math.pow(resolution, 1 / 3) * 10 + 1 < 4) {
    var size = '0px'
  } else {
    size = '10px'

  }
  var height = 1;
  var offsetX = 50;
  var offsetY = 20;
  var weight = 'normal';
  var placement = 'point';
  var maxAngle = 0.7853981633974483
  var overflow = 'false';
  var rotation = 0;
  var color = 'black';
  var outline = 0;
  var outlinecolor = 'black';
  var font = 'Arial'




  var font = weight + ' ' + size + '/' + height + ' ' + font;

  var fillColor = color;
  var outlineColor = outlinecolor;
  var outlineWidth = outline;

  return new ol.style.Text({
    textAlign: align == '' ? undefined : align,
    textBaseline: baseline,
    font: font,
    backgroundFill: new ol.style.Fill({ color: 'white' }),

    text: getText(feature, resolution),
    fill: new ol.style.Fill({ color: fillColor }),
    stroke: new ol.style.Stroke({ color: outlineColor, width: outlineWidth }),
    offsetX: offsetX,
    offsetY: offsetY,
    placement: placement,
    maxAngle: maxAngle,
    overflow: overflow,
    rotation: rotation,
  });
};




function PoiplotFunction(latlong, details, icon) {


  var singleFeature = new ol.Feature({

    geometry: new ol.geom.Point(ol.proj.transform(
      latlong, 'EPSG:4326', 'EPSG:3857')),

  });

  var singleStyle = new ol.style.Style(
    {
      image: new ol.style.Icon(
        ({
          anchor: [0.5, 30],
          scale: 0.8,
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: icon
        }))
    });


  singleFeature.setStyle(singleStyle);
  singleFeature.setProperties(details)

  var singleSource = new ol.source.Vector({
    features: [singleFeature]

  });

  var singleLayer = new ol.layer.Vector({
    source: singleSource
  });
  map.addLayer(singleLayer);

  poiMarkers.push(singleLayer)

}



//=============================== Clear Functions  

function ClearPoi() {
  for (var i = 0; i < poiMarkers.length; i++) {
    try { map.removeLayer(poiMarkers[i]) } catch (e) { }
  }

}

function ClearSingleMarkers() {
  for (var i = 0; i < singleMarker.length; i++) {
    try { map.removeLayer(singleMarker[i]); } catch (e) { }
  }
}


function ClearLiveTrail() {

  for (var i = 0; i < livetrailLine.length; i++) {
    try { map.removeLayer(livetrailLine[i]) } catch (e) { }
  } livetrailLine = [];

  try { map.removeLayer(livetrailicon) } catch (e) { }
  routeArray = [];

}



function DirectionIcon(latlong, details, icon) {

  var singleFeature = new ol.Feature({

    geometry: new ol.geom.Point(ol.proj.transform(
      latlong, 'EPSG:4326', 'EPSG:3857')),

  });

  var singleStyle = new ol.style.Style(
    {
      image: new ol.style.Icon(
        ({
          anchor: [0.5, 20],
          scale: 0.5,//1/Math.pow(resolution, 1/3),
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: icon
        }))
    });




  singleFeature.setStyle(singleStyle);
  singleFeature.setProperties(details)

  var singleSource = new ol.source.Vector({
    features: [singleFeature]

  });

  var singleLayer = new ol.layer.Vector({
    source: singleSource
  });
  map.addLayer(singleLayer);

  directionMarkers.push(singleLayer)

}





//============== Alerts

function AlertDetails(latlong, details, icon) {




  var singleFeature = new ol.Feature({

    geometry: new ol.geom.Point(ol.proj.transform(
      latlong, 'EPSG:4326', 'EPSG:3857')),

  });

  var singleStyle = new ol.style.Style(
    {
      image: new ol.style.Icon(
        ({
          scale: 0.8,
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: icon

        }))
    });


  singleFeature.setStyle(singleStyle);
  singleFeature.setProperties(details)

  var singleSource = new ol.source.Vector({
    features: [singleFeature]

  });

  var singleLayer = new ol.layer.Vector({
    source: singleSource
  });
  map.addLayer(singleLayer);

  alertsMarker.push(singleLayer)
}


function ClearAlert() {

  for (var i = 0; i < alertsMarker.length; i++) {
    try { map.removeLayer(alertsMarker[i]) } catch (e) { }
  }
}









//======================= Flying Function
function FlyTo(location, done) {
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
    center: location,
    duration: duration,
  }, callback);
  view.animate({
    zoom: 20,
    duration: duration / 2,
  }, callback);
}


function Getdetails(data) {


}

function ClearDirection() {

  for (var i = 0; i < directionMarkers.length; i++) {
    map.removeLayer(directionMarkers[i])
  } directionMarkers = [];

}

function ClearRoute() {


  for (var i = 0; i < railwayRoutes.length; i++) {
    map.removeLayer(railwayRoutes[i])
  } railwayRoutes = [];
}

function ClearRailPoi() {
  for (var i = 0; i < railpoiLayer.length; i++) {
    map.removeLayer(railpoiLayer[i]);
  } railpoiLayer = []
}



function openFullscreen(div) {
  if (div.requestFullscreen) {
    div.requestFullscreen();


  } else if (div.webkitRequestFullscreen) { /* Safari */
    div.webkitRequestFullscreen();
  } else if (div.msRequestFullscreen) {
    /* IE11 */
    div.msRequestFullscreen();
  }
}


function CustomFlyTo(latlong) {
  var coord = ol.proj.fromLonLat(latlong);
  try { FlyTo(coord, function () { }) } catch (e) { }

}

function CustomFlyTo2(latlong) {
  var coord = ol.proj.fromLonLat(latlong);
  try { FlyTo(coord, function () { }) } catch (e) { }

}


function Removeinsertpopup() {
  popup.setPosition(undefined);
}




function GetDistance(lat1, lon1, lat2, lon2, unit) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") { dist = dist * 1.609344 }
    if (unit == "N") { dist = dist * 0.8684 }
    return dist;
  }
}



function GetEmergencyDetails(xdata, ydata) {
  alert("xdata    " + xdata + "   ydata    " + ydata);
}


function AddIndialayers(){



  
  /**
   * Base layer  layers[5]
   * 
   */


  layers.push(new ol.layer.Tile({
    visible: true,
    preload: Infinity,

    //http://164.52.201.137:2847/geoserver/generalLayers/wms?service=WMS&version=1.1.0&request=GetMap&layers=generalLayers%3AIndia_State_region&bbox=68.170825%2C6.755597%2C97.404631%2C37.085228&width=740&height=768&srs=EPSG%3A4326&styles=&format=application/openlayers
    extent: [-20037508, -20037508, 20037508, 20037508],
    source: new ol.source.TileWMS({
      url: 'http://164.52.201.137:2847/geoserver/indiamap/wms',//'http://209.51.202.250:8082/geoserver/wms',
      type: 'base',
      params: {
        'LAYERS': 'indiamap:India_State_region',//'IndiaLayer',
        'TILED': true,
        'CRS': 'EPSG:4326'
      },
      serverType: 'geoserver'
      //				 tileGrid: tileGrid
    })
  }));


  /**
   * District layer  layers[6]
   * 
   */


   

   layers.push(new ol.layer.Tile({
    visible: true,
    preload: Infinity,

    //http://164.52.201.137:2847/geoserver/generalLayers/wms?service=WMS&version=1.1.0&request=GetMap&layers=generalLayers%3AIndia_State_region&bbox=68.170825%2C6.755597%2C97.404631%2C37.085228&width=740&height=768&srs=EPSG%3A4326&styles=&format=application/openlayers
    extent: [-20037508, -20037508, 20037508, 20037508],
    source: new ol.source.TileWMS({
      url: 'http://164.52.201.137:2847/geoserver/indiamap/wms',//'http://209.51.202.250:8082/geoserver/wms',
      type: 'base',
      params: {
        'LAYERS': 'indiamap:DistrictBoundary',//'IndiaLayer',
        'TILED': true,
        'CRS': 'EPSG:4326'
      },
      serverType: 'geoserver'
      //				 tileGrid: tileGrid
    })
  }));


   /**
   *  layer  layers[7]
   * 
   */


   

    layers.push(new ol.layer.Tile({
      visible: true,
      preload: Infinity,
  
      //http://164.52.201.137:2847/geoserver/generalLayers/wms?service=WMS&version=1.1.0&request=GetMap&layers=generalLayers%3AIndia_State_region&bbox=68.170825%2C6.755597%2C97.404631%2C37.085228&width=740&height=768&srs=EPSG%3A4326&styles=&format=application/openlayers
      extent: [-20037508, -20037508, 20037508, 20037508],
      source: new ol.source.TileWMS({
        url: 'http://164.52.201.137:2847/geoserver/indiamap/wms',//'http://209.51.202.250:8082/geoserver/wms',
        type: 'base',
        params: {
          'LAYERS': 'indiamap:Tehsil202019_region',//'IndiaLayer',
          'TILED': true,
          'CRS': 'EPSG:4326'
        },
        serverType: 'geoserver'
        //				 tileGrid: tileGrid
      })
    }));

  
  /**
   * STREAT layer  layers[8]
   * 
   */
  

   layers.push(new ol.layer.Tile({
    visible: true,
    preload: Infinity,

    //http://164.52.201.137:2847/geoserver/generalLayers/wms?service=WMS&version=1.1.0&request=GetMap&layers=generalLayers%3AIndia_State_region&bbox=68.170825%2C6.755597%2C97.404631%2C37.085228&width=740&height=768&srs=EPSG%3A4326&styles=&format=application/openlayers
    extent: [-20037508, -20037508, 20037508, 20037508],
    source: new ol.source.TileWMS({
      url: 'http://164.52.201.137:2847/geoserver/indiamap/wms',//'http://209.51.202.250:8082/geoserver/wms',
      type: 'base',
      params: {
        'LAYERS': 'indiamap:INDIA_RDSTRT_polyline',//'IndiaLayer',
        'TILED': true,
        'CRS': 'EPSG:4326'
      },
      serverType: 'geoserver'
      //				 tileGrid: tileGrid
    })
  }));


  
  /**
   * MINOR layer layers[9]
   * 
   */
  

   layers.push(new ol.layer.Tile({
    visible: false,
    preload: Infinity,

    //http://164.52.201.137:2847/geoserver/generalLayers/wms?service=WMS&version=1.1.0&request=GetMap&layers=generalLayers%3AIndia_State_region&bbox=68.170825%2C6.755597%2C97.404631%2C37.085228&width=740&height=768&srs=EPSG%3A4326&styles=&format=application/openlayers
    extent: [-20037508, -20037508, 20037508, 20037508],
    source: new ol.source.TileWMS({
      url: 'http://164.52.201.137:2847/geoserver/generalLayers/wms',//'http://209.51.202.250:8082/geoserver/wms',
      type: 'base',
      params: {
        'LAYERS': 'generalLayers:INDIA_RDMNOR_polyline',//'IndiaLayer',
        'TILED': true,
        'CRS': 'EPSG:4326'
      },
      serverType: 'geoserver'
      //				 tileGrid: tileGrid
    })
  }));


  
  /**
   * MAJOR layer   layers[10]
   * 
   */
  

   layers.push(new ol.layer.Tile({
    visible: true,
    preload: Infinity,

    //http://164.52.201.137:2847/geoserver/generalLayers/wms?service=WMS&version=1.1.0&request=GetMap&layers=generalLayers%3AIndia_State_region&bbox=68.170825%2C6.755597%2C97.404631%2C37.085228&width=740&height=768&srs=EPSG%3A4326&styles=&format=application/openlayers
    extent: [-20037508, -20037508, 20037508, 20037508],
    source: new ol.source.TileWMS({
      url: 'http://164.52.201.137:2847/geoserver/indiamap/wms',//'http://209.51.202.250:8082/geoserver/wms',
      type: 'base',
      params: {
        'LAYERS': 'indiamap:INDIA_RDMJOR_polyline',//'IndiaLayer',
        'TILED': true,
        'CRS': 'EPSG:4326'
      },
      serverType: 'geoserver'
      //				 tileGrid: tileGrid
    })
  }));


   /**
   * DH layer  layers[11]
   * 
   */
  

    layers.push(new ol.layer.Tile({
      visible: true,
      preload: Infinity,
  
      //http://164.52.201.137:2847/geoserver/generalLayers/wms?service=WMS&version=1.1.0&request=GetMap&layers=generalLayers%3AIndia_State_region&bbox=68.170825%2C6.755597%2C97.404631%2C37.085228&width=740&height=768&srs=EPSG%3A4326&styles=&format=application/openlayers
      extent: [-20037508, -20037508, 20037508, 20037508],
      source: new ol.source.TileWMS({
        url: 'http://164.52.201.137:2847/geoserver/indiamap/wms',//'http://209.51.202.250:8082/geoserver/wms',
        type: 'base',
        params: {
          'LAYERS': 'indiamap:DHY_polyline',//'IndiaLayer',
          'TILED': true,
          'CRS': 'EPSG:4326'
        },
        serverType: 'geoserver'
        //				 tileGrid: tileGrid
      })
    }));
  
  /**
   * SH layer layers[12]
   * 
   */
  

   layers.push(new ol.layer.Tile({
    visible: true,
    preload: Infinity,

    //http://164.52.201.137:2847/geoserver/generalLayers/wms?service=WMS&version=1.1.0&request=GetMap&layers=generalLayers%3AIndia_State_region&bbox=68.170825%2C6.755597%2C97.404631%2C37.085228&width=740&height=768&srs=EPSG%3A4326&styles=&format=application/openlayers
    extent: [-20037508, -20037508, 20037508, 20037508],
    source: new ol.source.TileWMS({
      url: 'http://164.52.201.137:2847/geoserver/indiamap/wms',//'http://209.51.202.250:8082/geoserver/wms',
      type: 'base',
      params: {
        'LAYERS': 'indiamap:SHY_polyline',//'IndiaLayer',
        'TILED': true,
        'CRS': 'EPSG:4326'
      },
      serverType: 'geoserver'
      //				 tileGrid: tileGrid
    })
  }));


  /**
   * NH  layer layers[13]
   * 
   */
  

   layers.push(new ol.layer.Tile({
    visible: true,
    preload: Infinity,

    //http://164.52.201.137:2847/geoserver/generalLayers/wms?service=WMS&version=1.1.0&request=GetMap&layers=generalLayers%3AIndia_State_region&bbox=68.170825%2C6.755597%2C97.404631%2C37.085228&width=740&height=768&srs=EPSG%3A4326&styles=&format=application/openlayers
    extent: [-20037508, -20037508, 20037508, 20037508],
    source: new ol.source.TileWMS({
      url: 'http://164.52.201.137:2847/geoserver/indiamap/wms',//'http://209.51.202.250:8082/geoserver/wms',
      type: 'base',
      params: {
        'LAYERS': 'indiamap:NHY_polyline',//'IndiaLayer',
        'TILED': true,
        'CRS': 'EPSG:4326'
      },
      serverType: 'geoserver'
      //				 tileGrid: tileGrid
    })
  }));


}

function GeoserverFilter(key,id){
  try{layers[id].setVisible(key)}catch(e){alert(e)}
}








