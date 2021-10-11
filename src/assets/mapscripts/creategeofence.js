var plogonArray=[];

var pointsArray=[];
var drawInteraction, tracingFeature, startPoint, endPoint,  snapInteraction;
var drawing = false;
var previewVector;
var baseVector;
  var drawVector;
function CreateGeofence(type){
  plogonArray=[];
  pointsArray=[];
   previewVector;
 baseVector;
   drawVector;

   
// var source = new ol.source.Vector();

// var vector = new ol.layer.Vector({
//   source: source,
//   style: new ol.style.Style({
//     fill: new ol.style.Fill({
//       color: 'rgba(255, 255, 255, 0.2)',
//     }),
//     stroke: new ol.style.Stroke({
//       color: '#ffcc33',
//       width: 2,
//     }),
//     image: new ol.style.Circle({
//       radius: 7,
//       fill: new ol.style.Fill({
//         color: '#ffcc33',
//       }),
//     }),
//   }),
// });
// map.addLayer(vector)

// /**
//  * Currently drawn feature.
//  * @type {import("../src/ol/Feature.js").default}
//  */
// var sketch;

// /**
//  * The help tooltip element.
//  * @type {HTMLElement}
//  */
// var helpTooltipElement;

// /**
//  * Overlay to show the help messages.
//  * @type {Overlay}
//  */
// var helpTooltip;

// /**
//  * The measure tooltip element.
//  * @type {HTMLElement}
//  */
// var measureTooltipElement;

// /**
//  * Overlay to show the measurement.
//  * @type {Overlay}
//  */
// var measureTooltip;

// /**
//  * Message to show when the user is drawing a polygon.
//  * @type {string}
//  */
// var continuePolygonMsg = 'Click to continue drawing the polygon';

// /**
//  * Message to show when the user is drawing a line.
//  * @type {string}
//  */
// var continueLineMsg = 'Click to continue drawing the line';

// /**
//  * Handle pointer move.
//  * @param {import("../src/ol/MapBrowserEvent").default} evt The event.
//  */
// var pointerMoveHandler = function (evt) {
//   try{

//     if (evt.dragging) {
//       return;
//     }
//     /** @type {string} */
//     var helpMsg = 'Click to start drawing';
  
//     if (sketch) {
//       var geom = sketch.getGeometry();
//       if (geom instanceof Polygon) {
//         helpMsg = continuePolygonMsg;
//       } else if (geom instanceof LineString) {
//         helpMsg = continueLineMsg;
//       }
//     }
  
//     helpTooltipElement.innerHTML = helpMsg;
//     helpTooltip.setPosition(evt.coordinate);
  
//     helpTooltipElement.classList.remove('hidden');
//   }catch(e){alert("Exception IN handler"+e)}
// };

// map.on('pointermove', pointerMoveHandler);

// map.getViewport().addEventListener('mouseout', function () {
//   helpTooltipElement.classList.add('hidden');
// });


// var draw; // global so we can remove it later

// /**
//  * Format length output.
//  * @param {LineString} line The line.
//  * @return {string} The formatted length.
//  */
// var formatLength = function (line) {
//   var length = getLength(line);
//   var output;
//   if (length > 100) {
//     output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
//   } else {
//     output = Math.round(length * 100) / 100 + ' ' + 'm';
//   }
//   return output;
// };

// /**
//  * Format area output.
//  * @param {Polygon} polygon The polygon.
//  * @return {string} Formatted area.
//  */
// var formatArea = function (polygon) {
//   var area = getArea(polygon);
//   var output;
//   if (area > 10000) {
//     output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
//   } else {
//     output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
//   }
//   return output;
// };

// function addInteraction() {
//   var type = type
//   draw = new ol.interaction.Draw({
//     source: source,
//     type: type,
//     style: new ol.style.Style({
//       fill: new ol.style.Fill({
//         color: 'rgba(255, 255, 255, 0.2)',
//       }),
//       stroke: new ol.style.Stroke({
//         color: 'rgba(0, 0, 0, 0.5)',
//         lineDash: [10, 10],
//         width: 2,
//       }),
//       image: new ol.style.Circle({
//         radius: 5,
//         stroke: new ol.style.Stroke({
//           color: 'rgba(0, 0, 0, 0.7)',
//         }),
//         fill: new ol.style.Fill({
//           color: 'rgba(255, 255, 255, 0.2)',
//         }),
//       }),
//     }),
//   });
//   map.addInteraction(draw);

//   createMeasureTooltip();
//   createHelpTooltip();

//   var listener;
//   draw.on('drawstart', function (evt) {
//     // set sketch
//     sketch = evt.feature;

//     /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
//     var tooltipCoord = evt.coordinate;

//     listener = sketch.getGeometry().on('change', function (evt) {
//       var geom = evt.target;
//       var output;
//       if (geom instanceof Polygon) {
//         output = formatArea(geom);
//         tooltipCoord = geom.getInteriorPoint().getCoordinates();
//       } else if (geom instanceof LineString) {
//         output = formatLength(geom);
//         tooltipCoord = geom.getLastCoordinate();
//       }
//       measureTooltipElement.innerHTML = output;
//       measureTooltip.setPosition(tooltipCoord);
//     });
//   });

//   draw.on('drawend', function () {
//     measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
//     measureTooltip.setOffset([0, -7]);
//     // unset sketch
//     sketch = null;
//     // unset tooltip so that a new one can be created
//     measureTooltipElement = null;
//     createMeasureTooltip();
//     unByKey(listener);
//   });
// }

// /**
//  * Creates a new help tooltip
//  */
// function createHelpTooltip() {
//   if (helpTooltipElement) {
//     helpTooltipElement.parentNode.removeChild(helpTooltipElement);
//   }
//   helpTooltipElement = document.createElement('div');
//   helpTooltipElement.className = 'ol-tooltip hidden';
//   helpTooltip = new ol.Overlay({
//     element: helpTooltipElement,
//     offset: [15, 0],
//     positioning: 'center-left',
//   });
//   map.addOverlay(helpTooltip);
// }

// /**
//  * Creates a new measure tooltip
//  */
// function createMeasureTooltip() {
//   if (measureTooltipElement) {
//     measureTooltipElement.parentNode.removeChild(measureTooltipElement);
//   }
//   measureTooltipElement = document.createElement('div');
//   measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
//   measureTooltip = new ol.Overlay({
//     element: measureTooltipElement,
//     offset: [0, -15],
//     positioning: 'bottom-center',
//   });
//   map.addOverlay(measureTooltip);
// }

// /**
//  * Let user change the geometry type.
//  */

// addInteraction();



//======================   old code==========


//coordinates; will return the length of the [a, b] segment
function length(a, b) {
    return Math.sqrt(
      (b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1])
    );
  }
  
  // coordinates; will return true if c is on the [a, b] segment
  function isOnSegment(c, a, b) {
    var lengthAc = length(a, c);
    var lengthAb = length(a, b);
    var dot =
      ((c[0] - a[0]) * (b[0] - a[0]) + (c[1] - a[1]) * (b[1] - a[1])) / lengthAb;
    return Math.abs(lengthAc - dot) < 1e-6 && lengthAc < lengthAb;
  }
  
  // modulo for negative values, eg: mod(-1, 4) returns 3
  function mod(a, b) {
    return ((a % b) + b) % b;
  }
  
  // returns a coordinates array which contains the segments of the feature's
  // outer ring between the start and end points
  // Note: this assumes the base feature is a single polygon
  function getPartialRingCoords(feature, startPoint, endPoint) {
    var polygon = feature.getGeometry();
    console.log("polygon function    "+feature.getGeometry())
    if (polygon.getType() === 'MultiPolygon') {
      polygon = polygon.getPolygon(0);
    }
    var ringCoords = polygon.getLinearRing().getCoordinates();
  
    var i,
      pointA,
      pointB,
      startSegmentIndex = -1;
    for (i = 0; i < ringCoords.length; i++) {
      pointA = ringCoords[i];
      pointB = ringCoords[mod(i + 1, ringCoords.length)];
  
      // check if this is the start segment dot product
      if (isOnSegment(startPoint, pointA, pointB)) {
        startSegmentIndex = i;
        break;
      }
    }
  
    var cwCoordinates = [];
    var cwLength = 0;
    var ccwCoordinates = [];
    var ccwLength = 0;
  
    // build clockwise coordinates
    for (i = 0; i < ringCoords.length; i++) {
      pointA =
        i === 0
          ? startPoint
          : ringCoords[mod(i + startSegmentIndex, ringCoords.length)];
      pointB = ringCoords[mod(i + startSegmentIndex + 1, ringCoords.length)];
      cwCoordinates.push(pointA);
  
      if (isOnSegment(endPoint, pointA, pointB)) {
        cwCoordinates.push(endPoint);
        cwLength += length(pointA, endPoint);
        break;
      } else {
        cwLength += length(pointA, pointB);
      }
    }
  
    // build counter-clockwise coordinates
    for (i = 0; i < ringCoords.length; i++) {
      pointA = ringCoords[mod(startSegmentIndex - i, ringCoords.length)];
      pointB =
        i === 0
          ? startPoint
          : ringCoords[mod(startSegmentIndex - i + 1, ringCoords.length)];
      ccwCoordinates.push(pointB);
  
      if (isOnSegment(endPoint, pointA, pointB)) {
        ccwCoordinates.push(endPoint);
        ccwLength += length(endPoint, pointB);
        break;
      } else {
        ccwLength += length(pointA, pointB);
      }
    }
  
    // keep the shortest path
    return ccwLength < cwLength ? ccwCoordinates : cwCoordinates;
  }
  
  // layers definition

  
  // features in this layer will be snapped to
   baseVector = new ol.layer.Vector({
    source: new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url:
        "https://ahocevar.com/geoserver/wfs?service=wfs&request=getfeature&typename=topp:states&cql_filter=STATE_NAME='Idaho'&outputformat=application/json",
    }),
  });
  
  // this is were the drawn features go
   drawVector = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: 'rgba(100, 255, 0, 1)',
        lineDash: [10, 10],
        width: 2,
      }),
      fill: new ol.style.Fill({
        color: 'rgba(100, 255, 0, 0.3)',
      }),
    }),
  });
  
  // this line only appears when we're tracing a feature outer ring
  var previewLine = new ol.Feature({
    geometry: new ol.geom.LineString([]),
  });
   previewVector = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [previewLine],
    }),
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        lineDash: [10, 10],
        color: 'rgba(255, 0, 0, 1)',
        width: 9,
      }),
    }),
  });
  

   drawInteraction, tracingFeature, startPoint, endPoint;
   drawing = false;
  
  var getFeatureOptions = {
    hitTolerance: 10,
    layerFilter: function (layer) {
      return layer === baseVector;
    },
  
  };

  map.addLayer( baseVector);
  map.addLayer(drawVector);
  map.addLayer(previewVector);
 
  var polygonCoordinates=[];
  var coord;
  // the click event is used to start/end tracing around a feature
  map.on('click', function (event) {
    if (!drawing) {
      return;
    }
    else if(polygonFlag==1){
      var hit = false;
      map.forEachFeatureAtPixel(
        event.pixel,
        function (feature) {
  
          if (tracingFeature && feature !== tracingFeature) {
           
            return;
          }
    
          hit = true;
           coord = map.getCoordinateFromPixel(event.pixel);
          // second click on the tracing feature: append the ring coordinates
          if (feature === tracingFeature) {
            endPoint = tracingFeature.getGeometry().getClosestPoint(coord);
            var appendCoords = getPartialRingCoords(
              tracingFeature,
              startPoint,
              endPoint
            );
            drawInteraction.removeLastPoint();
            drawInteraction.appendCoordinates(appendCoords);
            tracingFeature = null;
          }
    
          // start tracing on the feature ring
          tracingFeature = feature;
          startPoint = tracingFeature.getGeometry().getClosestPoint(coord);
  
    // polygonCoordinates.push(coord)
  
        },
        getFeatureOptions
       
      );
    
      if (!hit) {
        // clear current tracing feature & preview
        previewLine.getGeometry().setCoordinates([]);
        tracingFeature = null;
     
      }else{
        map.removeInteraction(drawInteraction);
        map.removeInteraction(snapInteraction);
      }
    
    }
  
  
  });
  var previewCoords = [];

  // the pointermove event is used to show a preview of the result of the tracing
  map.on('pointermove', function (event) {
    if (tracingFeature && drawing) {
      var coord = null;
      map.forEachFeatureAtPixel(
        event.pixel,
        function (feature) {
          if (tracingFeature === feature) {
            coord = map.getCoordinateFromPixel(event.pixel);
          }
        },
        getFeatureOptions
      );
  
      if (coord) {
        endPoint = tracingFeature.getGeometry().getClosestPoint(coord);
        previewCoords = getPartialRingCoords(
          tracingFeature,
          startPoint,
          endPoint
        );
      }
      previewLine.getGeometry().setCoordinates(previewCoords);
    }
  });
  
   snapInteraction = new ol.interaction.Snap({
    source: baseVector.getSource(),
  });
  
  
  function addInteraction() {
    var value =type;
    if (value !== 'None') {
      drawInteraction = new ol.interaction.Draw({
        source: drawVector.getSource(),
        type: type,
      });
      map.addInteraction(drawInteraction);
      map.addInteraction(snapInteraction);
      drawInteraction.on('drawstart', function () {
        drawing = true;
        
      });
      drawInteraction.on('drawend', function (evt) {
        drawing = false;

        var mypolygonCoord = evt.feature.values_.geometry.flatCoordinates;

        for (var i = 0; i < mypolygonCoord.length; i++) {
          var lonlat = "";
          if (i < 1) {
            var next = i + 1;
            var mylatlon = [];
            mylatlon.push(mypolygonCoord[i]);
            mylatlon.push(mypolygonCoord[next]);
            lonlat=mylatlon;
            var pointlonlat = new ol.proj.transform(lonlat, "EPSG:3857", "EPSG:4326");
           pointsArray.push(pointlonlat)
            console.log("after conversion   " + JSON.stringify(pointsArray));
          } else {
            var index = i * 2;
            var next = index + 1;
  
            if (index < mypolygonCoord.length) {
              var mylatlon = [];
  
              mylatlon.push(mypolygonCoord[index]);
              mylatlon.push(mypolygonCoord[next]);
              lonlat=mylatlon;
              var pointlonlat = new ol.proj.transform(lonlat, "EPSG:3857", "EPSG:4326");
           pointsArray.push(pointlonlat)
            }
          }
          if(lonlat!=""){
            plogonArray.push(lonlat);


            var detailsForDisplay="<div class='popupMainDiv' style='    max-height: 300px; overflow: auto;'>"+
            "<table class='popCustomTable'>"
            +"<tr></tr>"
            +"<tr class='tableheader'><td colspan='2' style='text-align:center'>Create Polygon</td></tr>"
            +"<tr><td class='leftTd'>Name</td><td class='rightTd'><input type='text' class='form-control ' placeholder='Enter Name' id='polygonName' style=' background-color: white !important;  border: 1px solid blue !important; height: 25px !important; font-size: 11px; width: 165px !important; color:black;'></td></tr>"
          +"<tr><td class='leftTd'>Points</td><td class='rightTd'>"
            for(var i=0;i<pointsArray.length;i++){
              detailsForDisplay=detailsForDisplay+"<span>"+pointsArray[i][1].toFixed(4)+" , "+pointsArray[i][0].toFixed(4)+"</span><br>";
            }
            detailsForDisplay=detailsForDisplay+'</td></tr>';
            detailsForDisplay=detailsForDisplay+"<tr><td colspan='2'><button class='btn btn-primary' style='height:24px;float: right; margin-right: 41px;' onclick='InsertPolygon()'><h6 style='  font-size:12px;  margin-top: -3px;'>Save</h6></button></tr>"

            detailsForDisplay=detailsForDisplay+"</table></div>";
           
           
          content.innerHTML =detailsForDisplay;
           popup.setPosition(plogonArray[0]);
           map.removeLayer( baseVector);
           polygonFlag=0;
          // map.removeLayer(drawVector);

            // map.getView().fitExtent(plogonArray.getExtent, map.getSize());
            // var CenterOfGeom = map.getView().getCenter()
            // alert(JSON.stringify(CenterOfGeom))
            
          }
         
        }
        previewLine.getGeometry().setCoordinates([]);
        tracingFeature = null;

        map.removeInteraction(drawInteraction);
        map.removeInteraction(snapInteraction);

      });
     
  
     
    }
  }
  

  addInteraction();
  

}

function ClearPolygonDraw(){
  try{ drawing = false;
   map.removeInteraction(drawInteraction);
         map.removeInteraction(snapInteraction);
 
        try{
          map.removeLayer( baseVector);
          map.removeLayer(drawVector);
          map.removeLayer(previewVector);
        }catch(e){}
        }catch(e){}
        
 }

function InsertPolygon(){
   
console.log(JSON.stringify(plogonArray))


 var coord1=JSON.stringify(plogonArray);
 var coord2=JSON.stringify(pointsArray)


//"pageID":"2",
//	"pageName":"aufmUh9dUACTEBwCdQv5dQ==:65f11cde48cdbc3b757b8997e1b9c8ca:5SFtmcdM0IQoVbBEBCyuRA==",
//	"pageURL":"FToQPsfMnEsHvRtSbr3GCBZw==:cdb990bfc6d41c36030cc3b8ffa4d06c:dwkxpXGYePUIL6hiXglOFA=="

 var data={
  "param1":"",
  "param2":document.getElementById("polygonName").value,
  "param3":"polygon",

  "param4":coord1,
  "param5":"true",
  "param6":"2E8B57",
  "param7":coord2,
  "pageID":pageId,
  "pageName":pagename,
  "pageURL":pageurl
 }

 $.ajax({
  url:  apiurl+'insertgeofence',
  type: 'post',
  data:JSON.stringify(data),
  headers: {
      

      'Headerkey':headerkey,
      'Accept': 'application/json',
      'Content-Type': 'application/json',  
     'Access-Control-Allow-Origin': 'https://track.indtrack.com/vtsindtrackapi/',
     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
       },
       dataType: 'json',
  success: function (data) {
      if(data.entity=="Successfully saved."){
          alert(data.entity);
          try{ClearPolygonDraw()}catch(e){}
        }else{
          alert(data.entity);
        }
  }
});


}



function GetPolygonDetails(){
  var data={
    "pageNo":"1",
    "itemsPerPage":"20",
    "searchBy":"",
    "searchType":"",
    "totalRecords":"NA",
    "pageID":pageId,
    "pageName":pagename,
    "pageURL":pageurl}

 $.ajax({
  url:  apiurl+'geofencedetails',
  type: 'post',
  data:JSON.stringify(data),
  headers: {
      

      'Headerkey':headerkey,
      'Accept': 'application/json',
      'Content-Type': 'application/json',  
     'Access-Control-Allow-Origin': 'https://track.indtrack.com/vtsindtrackapi/',
     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
       },
       dataType: 'json',
  success: function (data) {
   try{
    var polygonDetails=data.entity.list;
    for(var i=0;i<polygonDetails.length;i++){
      var name=polygonDetails[i].param2
      var coord=JSON.parse(polygonDetails[i].param4)
       coord=coord.coordinates;
       var color=polygonDetails[i].param7;
    try{  PlotPolygon(coord,name,color)}catch(e){}
    }
   }catch(e){}
    
  }
});



}


