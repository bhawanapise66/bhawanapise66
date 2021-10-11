
var predata="";
var coords=[];
var livetrailline1=[]

var livePremarkers=[];
var historyAnimationLayer=[];
var historylayercontional=[];

 var animationLayer=[];
 var prevehicle="";



 

function LiveAnimation(data,latlon){
	var tempArray=[];
	if(prevehicle!=data.data.title){
		coords=[];
		predata="";

	}
	prevehicle=data.data.title;
	if(predata==""){

			var poplatlon= ol.proj.fromLonLat(latlon)
			console.log("coord"+latlon)
			coords.push(latlon);
			//try{ FlyTo(poplatlon, function() {})}catch(e){}      
		
		
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
			src : 'assets/mapimages/personicons/personicongreen.png'
			}),
			text: createTextStyle(feature, resolution),
			});
}

		
		  singleFeature.setStyle(singleStyle);
		 singleFeature.setProperties(data);
		      
		   
				  

		  var singleSource = new ol.source.Vector({
		    features : [ singleFeature ]

		  });

		  var singleLayer = new ol.layer.Vector({
		    source : singleSource
		  });
		try{  map.addLayer(singleLayer);}catch(e){}

		  singleMarker.push(singleLayer)
		  
		//   	var details="<div class='popupMainDiv'>"+
	    //       "<table class='popCustomTable'>"
	    //       +"<tr></tr>"
	    //       +"<tr class='tableheader'><td colspan='2' style='text-align:center'>"+data.vehical_no+"</td></tr>"
	    //       +"<tr><td class='leftTd'>Time</td><td class='rightTd'><span>"+data.datereceived+"</span></td></tr>"
	    //       +"<tr><td class='leftTd'>Speed</td><td class='rightTd'><span>"+data.speed+"</span></td></tr>"
	    //       +"<tr><td class='leftTd'>Direction</td><td class='rightTd'><span>"+data.headings+"</span></td></tr>"
	    //       +"<tr><td class='leftTd'>GPS Status</td><td class='rightTd'><span>"+data.gpsstatus+"</span></td></tr>"
	    //       +"<tr><td class='leftTd'>Ignition</td><td class='rightTd'><span>"+data.ignnumber+"</span></td></tr>"
	    //       +"<tr><td class='leftTd'>Battery Status</td><td class='rightTd'><span>"+data.details+"</span></td></tr>"
	    //       +"<tr><td class='leftTd'>Location</td><td class='rightTd'><span>"+data.location+"</span></td></tr>"
	    //       +"</table></div>"
		
		  
		//   var coordinates = poplatlon;
        // 	content.innerHTML = details;
        // 	popup.setPosition(coordinates);
		
		  
		
	}else{
		for(var i=0;i<singleMarker.length;i++){
			map.removeLayer(singleMarker[i])
			
		}singleMarker=[];
		var poplatlon= ol.proj.fromLonLat(latlon)
		coords.push(latlon);
		console.log("coord"+latlon)
		if(coords.length==2){
			var color='';
			if(Number(data.data.Speed)<=5){
				color='blue'
			}else{
				color='red'
			}
			try{AnimationRoute(coords,color)}catch(e){}
			try{AnimationForLive(data,coords)}catch(e){}
			coords=[]
			coords.push(latlon);
			
		}
		
		
		//var poplatlon= ol.proj.fromLonLat(tempArray)
		
		try{
			PrePoint(predata,latlon);
		}catch(e){}
		
		
		
		
		
		
	}
	
	
	predata=data;
	
}



function AnimationForLive(pointdetails,coords){
	
	for(var i=0;i<animationLayer.length;i++){
		map.removeLayer(animationLayer[i])
	}animationLayer=[];
		
	var lineString = new ol.geom.LineString(coords);
		 lineString.transform('EPSG:4326', 'EPSG:3857');
					
	 var route = lineString;

	  var routeCoords = route.getCoordinates();
	  var routeLength = routeCoords.length;
	

	 var routeFeature = new ol.Feature({
	    type: 'route',
	    geometry: route
	  });
	  var geoMarker = new ol.Feature({
	    type: 'geoMarker',
	    geometry: new ol.geom.Point(routeCoords[0])
	  });
	  var startMarker = new ol.Feature({
	    geometry: new ol.geom.Point(routeCoords[0])
	  });
	  var endMarker = new ol.Feature({
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
	        src: 'assets/mapimages/personicons/personicongreen.png'
	      })
	    }),
		
		
	   
	  };

	
	  var endicon=function pointStyleFunction(feature, resolution) {
		
		return new ol.style.Style({
		image:  new ol.style.Icon({
			anchor: [0.5, 1],
		   src: 'assets/mapimages/personicons/personicongreen.png'
		}),
		//text: createTextStyle(feature, resolution),

		});
		}

  endMarker.setStyle(endicon);
  endMarker.setProperties(pointdetails);
  
   var geoMarker= new ol.style.Style({
		image: new ol.style.Icon(/** @type {olx.style.IconOptions} */
				  ({
					  anchor: [0.5, 0.5],
					  anchorXUnits : 'fraction',
					  anchorYUnits : 'pixels',
					  opacity : 2,
					  src: "assets/mapimages/personicons/personicongreen.png"
				  }))
	  })



//====================== Label ======


	  var animating = false;
	  var speed, now;
	
	var source=new ol.source.Vector({ // VectorSource({
	      features: [ routeFeature,endMarker]
	    })
	
	  var vectorLayer = new ol.layer.Vector({ // VectorLayer({
	    source: source,
	    style: function(feature) {
	      return styles[feature.get('type')];
	    }
	  });

	  

	  map.addLayer(vectorLayer)
      animationLayer.push(vectorLayer);
	
	// Animation

	  // Animation
	  var path;
	   path = source.getFeatures()[0];
	  source.once('change',function(e){
	  
	    if (source.getState() === 'ready') {
	      path = source.getFeatures()[0];
	    }
	  });
	  var f, anim;
	  function startAnimation(){

		try{
		  if (path) {
			  f = new ol.Feature(new ol.geom.Point([0,0]));
			  f.setStyle(geoMarker);
			//  f.setStyle(style);
			  anim = new ol.featureAnimation.Path({
				path: route,
				 rotate: false,
				  easing: ol.easing.linear,
				 speed: Number(0.1),
				revers: false
			  });
			  
			  anim.on('animating', (e) => {
				  map.getView().setCenter(e.geom.getCoordinates())
				  map.getView().setRotation(0)
				})
			  animating = vectorLayer.animateFeature(f, anim);
			}
  }catch(e){}
			
		  try{ startAnimation()}catch(e){}
		  startButton.addEventListener('click', startAnimation, false);

			
		
	}
	
}
	  



function AnimationRoute(routeArray,color){


	
	var lineString = new ol.geom.LineString(routeArray);
	lineString.transform('EPSG:4326', 'EPSG:3857');

	var routeCoords = lineString.getCoordinates();

    var styles = {

            
            'LineString' : new ol.style.Style({
                stroke : new ol.style.Stroke({
                    color : color,
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
                                'coordinates': routeCoords,
                              },
                        },
                      ]}
            
            
            var SourceLiveTrack = new  ol.source.Vector({
                  features: new ol.format.GeoJSON().readFeatures(geojsonObject),
                });

                var LayerLiveTrack = new ol.layer.Vector({
                  source: SourceLiveTrack,
                  style: styleLiveTrack,
                });
                
               try{ map.addLayer(LayerLiveTrack);}catch(e){}
			   livetrailline1.push(LayerLiveTrack)
    

	
	
}




function ClearAnimation(){


	try{
		for(var i=0;i<animationLayer.length;i++){
			map.removeLayer(animationLayer[i])
		}animationLayer=[]
		
		for(var i=0;i<historyAnimationLayer.length;i++){
			map.removeLayer(historyAnimationLayer[i])
		}historyAnimationLayer=[]
		
	
		
		
		for(var i=0;i<animationPoints.length;i++){
			map.removeLayer(animationPoints[i])
		}animationPoints=[];
		
		
		for(var i=0;i<livePremarkers.length;i++){
			map.removeLayer(livePremarkers[i]);
		}livePremarkers=[];


		for(var i=0;i<livetrailline.length;i++){
			try{map.removeLayer(livetrailline[i]) }catch(e){}		

		}
	
			
		
	}catch(e){}
	

	
	for(var i=0;i<historylayercontional.length;i++){
		try{map.removeLayer(historylayercontional[i])}catch(e){}
	}historylayercontional=[];
	
	
}



function PrePoint(data,latlon){
	
	

	 var singleFeature = new ol.Feature({
								
	    geometry : new ol.geom.Point(ol.proj.transform(
			latlon, 'EPSG:4326', 'EPSG:3857')),

	  });
	  
	
		 

	  var singleStyle = new ol.style.Style({
	        image : new ol.style.Icon(
	            ({
	              scale:0.2,
	              anchorXUnits : 'fraction',
	              anchorYUnits : 'pixels',
	              src : 'assets/mapimages/markers/bluedot.png'
	            }))
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

	  livePremarkers.push(singleLayer)
	  
	
	
}




