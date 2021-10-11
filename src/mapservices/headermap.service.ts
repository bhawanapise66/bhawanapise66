import { Injectable } from '@angular/core';

declare var headercontainer :any;
declare var headercontent :any;
declare var headercloser:any;
declare var Headermap:any;
declare var createheadermapopup:any;
declare var headerSingleMarker;
declare var ClearHeaderalerticon:any;
declare var CustomFlyTo:any;
@Injectable({
  providedIn: 'root'
})
export class HeadermapService {

  constructor() { }


  createmap(target,latlong){
    Headermap(target,latlong);
  }

  
  createpopup(popup:any,popupcontent:any,popupcloser:any){
   // headerpopup,headerpopup-content,headerpopup-closer
    headercontainer =document.getElementById(popup);
    headercontent =document.getElementById(popupcontent);
    headercloser=document.getElementById(popupcloser);
  createheadermapopup();

  }
  

  Plotdata(data){
  //  ClearHeaderalerticon();
  ClearHeaderalerticon();
alert(data.param7)
    var latlong=[];
    latlong.push(Number(data.param6));
    latlong.push(Number(data.param5))
    setTimeout(function () {
     // try{CustomFlyTo(latlong)}catch(e){alert(e)}
   }, 10000);
  //  try{CustomFlyTo(latlong)}catch(e){alert(e)}

   var details={
      "data":{

        "type":"live",
        "title":data.param8,
        "Alert Time":data.param4,
        "Alert":data.param7,
        "Speed":data.param16,
        "Bettary Status":data.param20,

      }
    }
    var icon="";
    if(data.param7=="Emergency" ||data.param7=="Emergency Wire Tampered"){
     
      icon="assets/mapimages/alertsicon/emergency.png";
    }else if(data.param7=="Geo-Fence Entry"){
      icon="assets/mapimages/alertsicon/geofencein.png";
    }else if(data.param7=="Geo-Fence Exit"){
      icon="assets/mapimages/alertsicon/geofenceout.png";
    }else if(data.param7=="ROUTE DEVIATION"){
      icon="assets/mapimages/alertsicon/tamper.png";
    }else if(data.param7=="Overspeed"){
      icon="assets/mapimages/alertsicon/overspeed.png";
    }else if(data.param7=="Harsh Acceleration"){
      icon="assets/mapimages/alertsicon/harshacceleration.png";
    }else if(data.param7=="Harsh Break"){
      icon="assets/mapimages/alertsicon/harshbreak.png";
    }else if(data.param7=="Bettary Low"){
      icon="assets/mapimages/alertsicon/bettarylow.png";
    }else if(data.param7=="Bettary Low"){
      icon="assets/mapimages/alertsicon/bettarylow.png";
    }else{
      icon="assets/mapimages/alertsicon/tamper.png";

      
    }

try{    headerSingleMarker(latlong,details,icon);}catch(e){alert(e)}

    
  }


  Switchmap(type){
    
  }

}
