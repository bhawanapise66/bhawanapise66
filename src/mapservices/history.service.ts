import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import {PostService} from 'src/post.service'


declare var ClearRailPoi:any;
declare var ClearRoute:any;
declare var ClearDirection:any;
declare var ClearAlert:any;
declare var StartEndPoint:any;
declare var AddHistoryPoints:any;
declare var PlotCoditionline:any;
declare var PlotCoditionline:any;
declare var ClearHistory:any;
declare var PlotRoute:any;
declare var PlotCoditionline:any;
const URL = 'https://track.indtrack.com/vtsindtrackapiv1/';
declare var PlotRailPoi:any;
declare var CustomFlyTo2:any;
declare var AddLoader:any;
declare var RemoveLoader:any;

@Injectable({
  providedIn: 'root'
})
export class HistoryService {


  constructor(private http: HttpClient,private postService:PostService) { }

  HistoryPlot(vehicleid,vehicleno,fromdate,fromtime,todate,totime,routetype,poitype,conditiontype,staticdata){
    this.ClearAll();
    AddLoader();
    var historyinputdata={
      "param1": vehicleid,
      "param2": fromdate,
      "param3": todate,
      "param4": fromtime,
      "param5":totime,
      "param6": "",
      "pageNo": "",
      "itemsPerPage": "",
      "searchBy": "",
      "searchType": "",
      "totalRecords": "NA",
      "pageID": staticdata.pageID,
      "pageName":staticdata.pageName,
      "pageURL": staticdata.pageURL
    }


        if(routetype=='1'){
              

          let requestData={
            "param3":vehicleno,
            "pageNo":"",
            "itemsPerPage":"",
            "searchBy":"",
            "searchType":"",
            "totalRecords":"NA",
            "pageID": staticdata.pageID,
            "pageName":staticdata.pageName,
            "pageURL": staticdata.pageURL
          
          }
  
        try{ClearRoute()}catch(e){}
        try{ClearRailPoi()}catch(e){}
  
  
  
  
  this.postService.GetRoutesDetails(requestData).subscribe((data) => {
    try{if(data.entity.list.length>0){

      this.PlotRoutes(data.entity.list);
      }
    }catch(e){}
   
    if(conditiontype=='Stop' || conditiontype=='Idle'){
      this.CallHistoryDataService2(historyinputdata,conditiontype,poitype)
    }else{
      this.CallHistoryDataService(historyinputdata,conditiontype,poitype)
   
    }

  })
  
   }else{
    if(conditiontype=='Stop' || conditiontype=='Idle'){
      this.CallHistoryDataService2(historyinputdata,conditiontype,poitype)
    }else{
      this.CallHistoryDataService(historyinputdata,conditiontype,poitype)
   
    }

    }

  }


  //=============== History Service

  CallHistoryDataService(inputdata,condition1:String,poicondition){
    let condtionvalue=condition1;
    this.postService.GetHistoryLogs(inputdata).subscribe((data) => {
        try{
          RemoveLoader();
          if(data.entity=="NO RECORD FOUND"){
            alert(data.entity)
          }else if( data.entity.list.length>0){
            var data=data.entity.list;
             this.PlothistoryLine(data,condition1);
               var end=data.length-1;
              this.PlotStartendpoint(data[0],data[end],condition1);

              if(poicondition=='1'){
                var poiinput={
                  "param3":inputdata.param1,
                  "pageNo":"",
                 "itemsPerPage":"",
                 "searchBy":"",
                 "searchType":"",
                 "totalRecords":"NA",
                 "pageID":"1",
                 "pageName":inputdata.pageName,
                 "pageURL":inputdata.pageURL
                }
                this.PoiService(poiinput)
              }

          }else{
            
          }


        }catch(e){}
    });
  }


  
  CallHistoryDataService2(inputdata,condition1:String,poicondition){
   

    this.postService.GetHistoryLogs(inputdata).subscribe((data) => {
        try{
          RemoveLoader();
          if(data.entity=="NO RECORD FOUND"){
            alert(data.entity)
          }else if( data.entity.list.length>0){
            var data=data.entity.list;
           

              var end=data.length-1;
              this.PlotStartendpoint(data[0],data[end],condition1);

              if(poicondition=='1'){
                var poiinput={
                  "param3":inputdata.param1,
                  "pageNo":"",
                 "itemsPerPage":"",
                 "searchBy":"",
                 "searchType":"",
                 "totalRecords":"NA",
                 "pageID":"1",
                 "pageName":inputdata.pageName,
                 "pageURL":inputdata.pageURL
                }
                this.PoiService(poiinput)
              }

          }else{
            
          }


        }catch(e){}
    });
  }


  PlotStartendpoint(src,dest,conditiontype){
    var details={
      "data":{
        "title":src.param19,
        "type":"live",
        "Date/Time":src.param2,
        "Speed":src.param5,
        "Battery Status":src.param21,
          }
    }
    var latlong=[];
    latlong.push(Number(src.param4));
    latlong.push(Number(src.param3));
    
    var icon="assets/mapimages/markers/startpoint2.png";
    if(conditiontype=='Stop' || conditiontype=='Idle'){
   
    }else{
      StartEndPoint(details,icon,latlong);
    }


     details={
      "data":{
        "title":dest.param19,
        "type":"live",
        "Date/Time":dest.param2,
        "Speed":dest.param5,
        "Battery Status":dest.param21,
          }
    }
     latlong=[];
    latlong.push(Number(dest.param4));
    latlong.push(Number(dest.param3));
    var icon="assets/mapimages/markers/endpoint2.png";
    StartEndPoint(details,icon,latlong);
    CustomFlyTo2(latlong)



  }


// ========= Plot Route
  PlotRoutes(data){
    for(var i=0;i<data.length;i++){
      let coord=JSON.parse(data[i].param4);
      coord=coord.coordinates;
    try{ PlotRoute(coord)}catch(e){}
    }
  }

  //===== Plot History Line

  PlothistoryLine(data,conditiontype){
   

    if(conditiontype==''){

      var coord=[];

        for(var i=0;i<data.length;i++){
        var templatlon=[];
        templatlon.push(Number(data[i].param4))

        
        templatlon.push(Number(data[i].param3))
        coord.push(templatlon);
          
      }
      var color='black';
      PlotCoditionline(coord,color);

    
    }else{

      conditiontype=Number(conditiontype)
      for(var i=0;i<data.length;i++){
       try{
        var next=i+1;
        var templatlon=[];
        var coord=[];
        templatlon.push(Number(data[i].param4))
        templatlon.push(Number(data[i].param3))
        coord.push(templatlon);
        templatlon=[];
        templatlon.push(Number(data[next].param4))
        templatlon.push(Number(data[next].param3))
        coord.push(templatlon);
        var speed=Number(data[next].param5);
       }catch(e){}
          if(speed<=conditiontype){
            var color="blue";
            PlotCoditionline(coord,color);
          }else{
            var color="red";
            PlotCoditionline(coord,color);
          }

          this.PlotHistoryPoints(data[i])
      }

    }
  }


  //===============  Plot HistoryPoints  

 PlotHistoryPoints(data){
  var latlong=[]
  latlong.push(data.param4);
  latlong.push(data.param3);

  var details={
    "data":{
      'type':'live',
      'title':data.param19,
      'Updated At': data.param2,
      'Speed':data.param5,
      'Battery Status':data.param21
    }
  }

 try{ AddHistoryPoints(details,latlong);}catch(e){}
  



 }

  //============ Poi Plot Functionality

  
  
PoiService(requestData){
 
this.postService.GetRailPoi(requestData).subscribe((data) => {

 try{
  if(data.entity.list.length>0){
    
    var routeArray=[];
    let poiDetails=data.entity.list;
    // for(var i=0;i<poiDetails.length;i++){
    //   var latlon=[];
    //   latlon.push(Number(poiDetails[i].param9))
    //   latlon.push(Number(poiDetails[i].param8))
    //   routeArray.push(latlon);
    //  try{ PlotRoute(routeArray)}catch(e){}
    // }

    for(var i=0;i<poiDetails.length;i++){
      var latlon=[];
      latlon.push(Number(poiDetails[i].param9))
      latlon.push(Number(poiDetails[i].param8))
      var icon="assets/mapimages/mapstyleicon/railsignal.png";
      var details={
        "data":{
          "title":poiDetails[i].param2,
          "type":"live",
          "Range":poiDetails[i].param10+" KM",
          "Details":poiDetails[i].param7,

          "Location":poiDetails[i].param8+" , "+poiDetails[i].param9,

        }
      }
     try{ PlotRailPoi(icon,latlon,details)}catch(e){}
    }

  }

 }catch(e){}
})

 }



  ClearAll(){

     ClearRailPoi()
      ClearRoute()
      ClearDirection();
      ClearAlert();
      ClearHistory();
  }
  
}
