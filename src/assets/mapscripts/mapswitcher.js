var previousLayerindex="3";

function SwitchMap(layerindex){
    if(previousLayerindex!=""){
       try{ layers[previousLayerindex].setVisible(false);}catch(e){}
    }
setTimeout(function(){ layers[layerindex].setVisible(true);
    
    if(view.getZoom()>=10){
        view.animate({zoom: view.getZoom() - 1});
    }else{
        view.animate({zoom: view.getZoom() + 1});
    }

}, 2000);


   

    previousLayerindex=layerindex;

}


function PoiSwitcherrail(key){
        for(var i=0;i<poiMarkers.length;i++){
            poiMarkers[i].setVisible(key);
        }
        for(var i=0;i<railpoiLayer.length;i++){
            railpoiLayer[i].setVisible(key);
        }
   
}


function RouteSwitcherrail(key){
        for(var i=0;i<railwayRoutes.length;i++){
            railwayRoutes[i].setVisible(key);
        }
        for(var i=0;i<railwayRoutes.length;i++){
            railwayRoutes[i].setVisible(key);
        }
   
}


function PolygonSwitcher(key){
   try{
    
    for(var i=0;i<polygons.length;i++){
        
        polygons[i].setVisible(key);
    }

    for(var i=0;i<customPolygons.length;i++){
        customPolygons[i].setVisible(key);
    }
   }catch(e){}
}

function RouteSwitcher(key){
    for(var i=0;i<routes.length;i++){
        routes[i].setVisible(key);
    }
}



function SwitchGeoPoi(key){
    for(var i=0;i<pois.length;i++){
        pois[i].setVisible(key);
    }
}
