
var animationPoints=[];
var historycoords=[];
var historydetails='';
var path;
var route;
var geoMarker;
var animating;
var vectorLayer;
var startMarker;
var endMarker;

function AddHistoryPoints(data,latlon){

	var singleFeature = new ol.Feature({
		
	    geometry : new ol.geom.Point(ol.proj.transform(
			latlon, 'EPSG:4326', 'EPSG:3857')),

	  });

	  var singleStyle = new ol.style.Style(
	      {
	          image : new ol.style.Icon(
	  	            ({
	  	              scale:0.2,
	  	            anchor: [0.8, 1],
	  	              anchorXUnits : 'fraction',
	  	              anchorYUnits : 'pixels',
	  	              src : 'assets/mapimages/markers/bluedot.png'
	  	                
	  	            }))
	        	/*new ol.style.Icon(
	            ({
	              scale:0.8,
	              anchorXUnits : 'fraction',
	              anchorYUnits : 'pixels',
	              src : icon
	                
	            }))*/
	      });
	  

	      singleFeature.setStyle(singleStyle);
	      singleFeature.setProperties(data)

	  var singleSource = new ol.source.Vector({
	    features : [ singleFeature ]

	  });

	  var singleLayer = new ol.layer.Vector({
	    source : singleSource
	  });
	  map.addLayer(singleLayer);
	  animationPoints.push(singleLayer)

}

var speedInput;
var startButton;

function InitiateSlider(){
	speedInput = document.getElementById('speed');
	sliderspeed=Number(speedInput.value)/10;
	startButton = document.getElementById('start-animation');
	startButton.addEventListener('click', startAnimation, false);

}

function AnimationHistory(coords,details){
	try{
		for(var i=0;i<historyAnimationLayer.length;i++){
			map.removeLayer(historyAnimationLayer[i]);
		}historyAnimationLayer=[]

	}catch(e){}
	 historycoords=coords
	 historydetails=details
	var routeArray=[];
	var tempArray=[72.8777,19.0760]
	routeArray.push(tempArray)
	
	

	tempArray=[82.9739,25.3176]
	routeArray.push(tempArray);

	    var lineString = new ol.geom.LineString(coords);
						     lineString.transform('EPSG:4326', 'EPSG:3857');
					

		 route = lineString
		var routeCoords = route.getCoordinates();
	 	 var routeLength = routeCoords.length;

	 routeFeature = new ol.Feature({
	    type: 'route',
	    geometry: route
	  });
	   geoMarker = new ol.Feature({
	    type: 'geoMarker',
	    geometry: new ol.geom.Point(routeCoords[0])
	  });
	   startMarker = new ol.Feature({
	    geometry: new ol.geom.Point(routeCoords[0])
	  });
	   endMarker = new ol.Feature({
	    geometry: new ol.geom.Point(routeCoords[routeLength - 1])
	  });

	  var styles = {
	    'route': new ol.style.Style({
	      stroke: new ol.style.Stroke({
	        width: 3,
	        color: [204,199,68,0]
	      }),
	      
	    }),
	    'icon': new ol.style.Style({
	      image: new ol.style.Icon({
	        anchor: [0.5, 1],
	        src: 'assets/mapimages/mapstyleicon/directionarrow1.png'
	      })
	    }),
		
		
	   
	  };

	
		var starticon=function pointStyleFunction(feature, resolution) {
			return new ol.style.Style({
			image:  new ol.style.Icon({
			  anchor: [0.5, 30],  //0.8727382060717654
			   scale:1/Math.pow(resolution, 1/3)<0.8727382060717654?0.5167961026557844:0.8727382060717654,
			   anchorXUnits : 'fraction',
			   anchorYUnits : 'pixels',
			   src: 'assets/mapimages/markers/startpoint2.png'
			}),
			});
			}
	
	startMarker.setStyle(starticon);
	startMarker.setProperties(details);
	
	
		var endicon=new ol.style.Style({
	      image: new ol.style.Icon({
	        anchor: [0.5, 1],
	        src: 'assets/mapimages/mapstyleicon/directionarrow1.png'
	      })
	    })
	endMarker.setStyle(endicon);
	
	  geoMarker= new ol.style.Style({
	      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */
					({
					    anchor: [0.5, 0.5],
						anchorXUnits : 'fraction',
						anchorYUnits : 'pixels',
						opacity : 2,
						src: "assets/mapimages/mapstyleicon/directionarrow1.png"
					}))
	    })
	   animating = false;
	  var speed, now;
	
	var source=new ol.source.Vector({ // VectorSource({
	      features: [ routeFeature,startMarker,endMarker]
	    })
	   vectorLayer = new ol.layer.Vector({ // VectorLayer({
	    source: source,
	    style: function(feature) {
	      return styles[feature.get('type')];
	    }
	  });

		map.addLayer(vectorLayer)
		historyAnimationLayer.push(vectorLayer);


		path = source.getFeatures()[0];
		source.once('change',function(e){
		
		  if (source.getState() === 'ready') {
			path = source.getFeatures()[0];
		  }
		});
}

//================= hISTORY ANIMATION 	


	
	// Animation

	  // Animation
	  
	  var f, anim;
	  function startAnimation(){
	
		try{AnimationHistory(historycoords,historydetails);}catch(e){}

	    if (path) {
		  f = new ol.Feature(new ol.geom.Point([0,0]));
			
	      f.setStyle(geoMarker);
		 // f.setProperties("chech");
		 // console.log("print f prop"+JSON.stringify(f.getProperties()))
	    //  f.setStyle(style);
	      anim = new ol.featureAnimation.Path({
	        path: route,
			 rotate: true,
	              easing: ol.easing.linear,
				  

	     //   easing: ol.easing[$("#easing").val()],
	        speed:sliderspeed,
	        revers: false
	      });
	      
	      anim.on('animating', (e) => {
			  console.log("eeee "+JSON.stringify(e.geom.values_));
				  map.getView().setCenter(e.geom.getCoordinates())

	  	        map.getView().setRotation(0)
	  	      })
	  
		  animating = vectorLayer.animateFeature(f, anim);
		  }
	  }
	
	


//===============

function PlotCoditionline(coord,color){
	
	var finalRoutearray=[];
  for(var i=0;i<coord.length;i++){
    var coords=ol.proj.fromLonLat(coord[i]);
    finalRoutearray.push(coords);
  }
  var styles = {
            
	'LineString' : new ol.style.Style({
		stroke : new ol.style.Stroke({
			color :color,
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
	
	
	var sourcehistory = new  ol.source.Vector({
		  features: new ol.format.GeoJSON().readFeatures(geojsonObject),
		});

		var historyline = new ol.layer.Vector({
		  source: sourcehistory,
		  style: styleLiveTrack,
		});
		
		map.addLayer(historyline);
		historylayercontional.push(historyline);

}



function ClearHistoryAnimation(){
	historycoords=[];
	 historydetails='';
	for(var i=0;i<historyAnimationLayer.length;i++){
			map.removeLayer(historyAnimationLayer[i])
		}historyAnimationLayer=[];

		
	}
