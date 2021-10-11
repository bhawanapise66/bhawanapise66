

function Getlocation(divid,lat,lon){

    $.get("https://nominatim.openstreetmap.org/reverse?format=json&lon="+lon+"&lat="+lat, function(data, status){
        $("#view"+divid).css("display","none");
        $("#location"+divid).css("display","block");
        document.getElementById("location"+divid).innerHTML=data.display_name;

      });

}
