var poiDetails={};


var lat;
var lon;
function PoiCreate(){
     
  map.on('dblclick', function(evt){

    if(poiFlag==1){

        console.info(evt.pixel);
        console.info(map.getPixelFromCoordinate(evt.coordinate));
        console.info(ol.proj.toLonLat(evt.coordinate));
        var coords = ol.proj.toLonLat(evt.coordinate);
         lat = coords[1];
         lon = coords[0];
        var locTxt = "Latitude: " + lat + " Longitude: " + lon;
        // coords is a div in HTML below the map to display
        console.log("seprate Lat longs are   "+locTxt);
        var latlon=ol.proj.fromLonLat(coords)
        console.log("here open layer   "+latlon)
    
        var detailsForDisplay="<div class='popupMainDiv'>"+
              "<table class='popCustomTable'>"
              +"<tr class='tableheader'><td colspan='2' style='text-align:center;'>Create POI</td></tr>"
              +"<tr><td class='leftTd'>Name</td><td class='rightTd'><input type='text' class='form-control ' placeholder='Enter Name' id='newpoiName' style=' background-color: white !important;  border: 1px solid blue !important; height: 25px !important; font-size: 11px; width: 165px !important; color:black;'></td></tr>"
              +"<tr><td class='leftTd'>Type</td><td class='rightTd'><input type='text' class='form-control '  placeholder='Enter Type' id='newpoiType'  style=' background-color: white !important;  border: 1px solid blue !important;  height: 25px !important; font-size: 11px; width: 165px !important; color:black;'></td></tr>"
              +"<tr><td class='leftTd'>Range</td><td class='rightTd'><input type='text' class='form-control '  placeholder='Enter Range' id='newpoiRange'  style=' background-color: white !important;  border: 1px solid blue !important; height: 25px !important; font-size: 11px; width: 165px !important; color:black;'></td></tr>"
              +"<tr><td colspan='2' >Latitude &nbsp; &nbsp;"+lat.toFixed(4)+"&nbsp; &nbsp; Longitude &nbsp; &nbsp;"+lon.toFixed(4)+"</td></tr>"
           
              +"<tr><td colspan='2'><button class='btn btn-primary' style='height:24px;float: right; margin-right: 41px;' onclick='SavePoi()'><h6 style='  font-size:12px;  margin-top: -3px;'>Save</h6></button></tr>"
        content.innerHTML =detailsForDisplay;
           popup.setPosition(latlon);
    }
});
    
}


function PoiData(data){
    for(var i=0;i<data.length;i++){
        var latlong=[];
        latlong.push(Number(data[i].param7));
        latlong.push(Number(data[i].param6));
        var details={
          data:{
           "type":"poi",
           "title":"POI Details",
           "Name":data[i].param2,
           "Range":data[i].param8,
           "Type":data[i].param3,
           "Location":data[i].param5
          }
      }
        var icon="assets/mapimages/markers/poinewmarker.png";
        try{
         PoiplotFunction(latlong,details,icon)
        }catch(e){}
      }

}


function GetPoiDetails(){
 
    var apidata={
        "pageNo":"",
        "itemsPerPage":"",
        "searchBy":"",
        "searchType":"",
        "totalRecords":"NA",
        "pageID":pageId,
        "pageName":pagename,
        "pageURL":pageurl
    }
    $.ajax({
        url: apiurl+'poidetails',
        type: 'post',
        data:JSON.stringify(apidata),
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
            var poiData=data.entity.list;
            try{ClearPoi();}catch(e){}
            try{PoiData(poiData)}catch(e){}

        }
    });

}



function SavePoi(){
   var location=""
    $.ajax({
        url: 'https://nominatim.openstreetmap.org/reverse?format=json&lon='+lon+'&lat='+lat,
        type: 'get',
        dataType: 'json',
        success: function (data) {
            location=data.display_name;

            
                var apidata={
                    "param1":"",
                    "param2":$("#newpoiName").val(),
                    "param3":$("#newpoiType").val(),
                    "param4":"",
                    "param5":location,
                    "param6":$("#newpoiRange").val(),
                    "param7":lat,
                    "param8":lon,
                    "pageID":pageId,
                    "pageName":pagename,
                    "pageURL":pageurl
                }
                $.ajax({
                    url:  apiurl+'insertpoi',
                    type: 'post',
                    data:JSON.stringify(apidata),
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
                            GetPoiDetails();
                          }else{
                            alert(data.entity);
                          }
                    }
                });
        }
});



}

