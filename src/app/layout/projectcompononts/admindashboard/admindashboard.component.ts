import { PostService } from './../../../../post.service';
import { routerTransition } from 'src/app/router.animations';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { CryptService } from '../services/crypt.service';
import { Router } from '@angular/router';
import { AdmindashboardService } from '../services/admindashboard.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExportToExcelService } from '../services/export-to-excel.service';
import { Paramcls } from './../../../../paramcls';
import { PdfService } from '../services/pdf.service';
import '../../../../assets/mapscripts/mapview.js';
import '../../../../assets/mapscripts/maphistory';
import '../../../../assets/mapscripts/mapclusters.js';
import * as FileSaver from 'file-saver';
declare let html2canvas: any;

declare var $: any;declare var mapBuild:any;
declare var SwitchMap:any;
declare var  GetIcon:any;

declare var Livetrail:any;
declare var PopupInitialize:any;
declare var MakeClusters:any;
declare var SingleMarker:any;

declare var ClearCluster:any;
declare var ClearSingleMarkers;
declare var ClearLiveTrail;
declare var ClearAlert;
declare var ClearDirection; declare var DirectionIcon:any; declare var PoiSwitcher:any;
declare var SetSideGauge:any; declare var SideGuage: any;
declare var openFullscreen:any;
declare var PoiSwitcher:any;


declare var PolygonSwitcher:any;
declare var RouteSwitcher:any;


declare var container:any;
declare var content:any;
declare var closer:any;


declare var AddLoader:any;
declare var RemoveLoader:any;
declare var PlotRoute:any;

declare var ClearRoute:any;

declare var ClearRailPoi:any;
declare var PlotCoditionline:any;
declare var AddHistoryPoints:any;

declare var AnimationHistory:any;
declare var PlotRailPoi:any;
declare var ClearHistoryAnimation:any;
declare var ClearHistoryInterval:any;




@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css'],
  animations: [routerTransition()]
})
export class AdmindashboardComponent implements OnInit {

  encryptedpageNameValue: string; encryptedpageUrlValue: string; pageUrl = this.router.url;
  custcountdetail$: any; devicetypedata: any = []; devicestatus: number = 0; livestatus: number = 0;
  vehiclestatus: number = 0; stringifiedData: any; parsedJson: any; stringifiedresponse: any; parsedJsonresponse: any;
  stringifiedDataList: any; parsedJsonList: any; map: any; view: any;

  totaldevices: number = 0; totdevais: number = 0; totdevbasic: number = 0; totdevstock: number = 0;
  maintenancedevices: number = 0; maintdevreplace: number = 0; maintdevrepair: number = 0;
  totalcustomers: number = 0; totcustmember: number = 0; totcustmines: number = 0; totcustcorporate: number = 0;
  devicestatic: number = 0; devstaticpolling: number = 0; devstaticnonpolling: number = 0; totdevicesmonthlyorder: number = 0;
  outorec: number = 0; totrec: number = 0;  globalpagesummary$ = []; globalPDF$:any;
  selectRowsText:any=10; SelectRows:any; filtersummary:any;   pagecount:number;p: number;
  @ViewChild('epltable', { static: false }) epltable: ElementRef; filterside:string; liveInterval:any;
  name = 'html2canvas capture in Angular'; key: string = 'name'; reverse: boolean = true; count: number;
  speednumber:any=1;

  capturedImage;

  constructor(private http: HttpClient, private router: Router, private cryptService: CryptService, private postService: PostService,
    private adminService: AdmindashboardService , public excelservice: ExportToExcelService, public pdfservice: PdfService) { 

      //$.getScript('https://html2canvas.hertzen.com/dist/html2canvas.js', function () { });
    }

    allvehiclesdata:any=[];
  ngOnInit() {


    $("#Reasonentryid").hide(); $("#btnsendemail").hide();  

    //$.getScript('https://html2canvas.hertzen.com/dist/html2canvas.js', function () { });
    
    setTimeout(()=>{  
      let latlong=[78.9629,20.5937];
      new mapBuild('map',latlong)
      
   
      container=document.getElementById("popup");
      content=document.getElementById("popup-content");
      closer=document.getElementById("popup-closer");

      PopupInitialize();
        
        SwitchMap("3");
        this.GetAllvehicles("");
    }, 2000);

  

    this.AdminDashboardCount();

  }

  AdminDashboardCount() {

    let keydata = {
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue

    }

    // Distributor Detail Grid BIND LIST    
    this.adminService.AdminDashboardCountAPI(keydata).subscribe(
      (data) => {

        let resdata = data;

        let resdatadrp = resdata['entity'];
       
        this.totaldevices = resdatadrp.param1;
        this.totdevais = resdatadrp.param3;
        this.totdevbasic = resdatadrp.param2;
        this.totdevstock = resdatadrp.param4;
        this.maintenancedevices = resdatadrp.param5;
        this.maintdevreplace = resdatadrp.param7;
        //this.maintdevrepair = this.parsedJsonList[0]["param1"];
        this.totalcustomers = resdatadrp.param8;
        this.totcustmember = resdatadrp.param9;
        this.totcustmines = resdatadrp.param10;
        this.totcustcorporate = resdatadrp.param11;
        this.totdevicesmonthlyorder = resdatadrp.param18;
        this.devstaticpolling = resdatadrp.param12;
        this.devstaticnonpolling = resdatadrp.param14;
        
      });
  }

  sort(key) {

    this.key = key;
    this.reverse = !this.reverse;

  }

   /* clickme() {

    $("#Reasonentryid").show(); $("#btnsendemail").show();

    html2canvas(document.querySelector("#capture")).then(canvas => {

      this.capturedImage = canvas.toDataURL();
      console.log("canvas.toDataURL() -->" + this.capturedImage);
              
      canvas.toBlob(function (blob) {
        
        //  just pass blob to something expecting a blob
        
        // Same as canvas.toDataURL(), just longer way to do it.
        var reader = new FileReader();
       
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          let base64data = reader.result;
          
          console.log("Base64--> " + base64data);
         
        }

      });


    });
  } 

  sendemail() {    

    html2canvas(document.querySelector("#capture")).then(canvas => {

      this.capturedImage = canvas.toDataURL();
      console.log("canvas.toDataURL() -->" + this.capturedImage);
              
      canvas.toBlob(function (blob) {
        
        //  just pass blob to something expecting a blob
        
        // Same as canvas.toDataURL(), just longer way to do it.
        var reader = new FileReader();
       
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          let base64data = reader.result;
          
          console.log("Base64--> " + base64data);

          let link = document.createElement("a");
          link.download = "image.png";
          link.href = URL.createObjectURL(blob);
          link.click();

        }

      });


    });

    $("#Reasonentryid").hide(); $("#btnsendemail").hide();
  }  */

  createPDF() {
    let pdfTableData;
    let dataArray = []
    for (let i = 0; i < this.globalPDF$.length; i++) {
       pdfTableData = {
        "#": i + 1,
        "Vehicle No": this.globalPDF$[i]["param12"],
        "Polling Time": this.globalPDF$[i]["param32"],
        "Speed": this.globalPDF$[i]["param37"],
        "Ignition": this.globalPDF$[i]["param42"],
        "Direction": this.globalPDF$[i]["param7"],
        "GPS Status": this.globalPDF$[i]["param46"]
      }
      dataArray.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(dataArray,"Customer Dashboard Details");  
    }
  
  dataPDFexport() {
  
    this.globalPDF$ = null;
   
    if(this.filtersummary == "")
    {
     
        let keydata = {
          pageNo:"",
          itemsPerPage:"",    
          searchBy: "", 
          searchType:"",
          totalRecords:"NA",
          pageID: "7",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
        }
      
      //  try{AddLoader()}catch(e){}          
        try{this.adminService.GetVehicleDetailsformap(keydata).subscribe(
          (data)  => {                 
          // Parse from JSON  
          this.globalPDF$ = data.entity.list;      
          
        })
    
    }catch(e){}
  }
  else
  {
    let keydata = {
      pageNo:"",
      itemsPerPage:"",    
      searchBy: this.filtersummary, 
      searchType:"",
      totalRecords:"NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
  
  //  try{AddLoader()}catch(e){}          
    try{this.adminService.GetVehicleDetailsformap(keydata).subscribe(
      (data)  => {
      
      // Below code for all checkbox select.
      let resdata = data;    
    //  try{RemoveLoader()}catch(e){}  
      let resdatadrp = resdata['entity'];   
          // Convert to JSON  
      this.stringifiedData = JSON.stringify(resdatadrp);           
      // Parse from JSON  
      this.parsedJson = JSON.parse(this.stringifiedData);   
      let resdatadev = resdata['list'];        
      // Convert to JSON  
      this.stringifiedDataList = JSON.stringify(this.parsedJson.list);           
      // Parse from JSON  
      this.globalPDF$ = JSON.parse(this.stringifiedDataList);      
      
    })

}catch(e){}
  }
    
  }
  
  excelData:any=[];
  PrepareExcelData(data) {
    this.excelData = [];

    for (var i = 0; i < data.length; i++) {
      try {
        var obj = {

          "#": i + 1,
          "Vehicle No": data[i].param12,
          "Polling Time": data[i].param32,
          "Speed": data[i].param37,
          "Ignition": data[i].param42,
          "Direction": data[i].param46,
          "GPS Status": data[i].param45

        }
      } catch (e) { }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'Sim Details', 'simdetails');
  }


  
  PageLoadSummary(){
    
    this.p = 1; this.pagecount = 10;
    
    let service = this.adminService

   /*  setInterval(function(){ */

    let keydata = {
      pageNo:this.p,
      itemsPerPage:this.pagecount,    
      searchBy: "", 
      searchType:"",
      totalRecords:"NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
          
    try{service.GetVehicleDetailsformap(keydata).subscribe((data) => {
      
      //this.custService=data.entity.list;
      // Below code for all checkbox select.
      alert(data.entity.list.length)

      let resdata = data;    
      this.globalpagesummary$=data.entity.list;
      let resdatadrp = resdata['entity'];   
          // Convert to JSON  
      this.stringifiedData = JSON.stringify(resdatadrp);           
      // Parse from JSON  
      this.parsedJson = JSON.parse(this.stringifiedData);   
      let resdatadev = resdata['list'];  
      
       // Convert to JSON  
       this.stringifiedDataList = JSON.stringify(this.parsedJson.list);           
       // Parse from JSON  
       this.globalpagesummary$ = JSON.parse(this.stringifiedDataList); 
              
       this.totrec = data.entity.count;
       this.outorec = data.entity.viewCount;
       this.dataPDFexport();
    })
    
    }catch(e){}
  //}, 10000);
  }

  RefreshSummary(){
    
    this.p = 1; this.pagecount = 10;

    let keydata = {
      pageNo:this.p,
      itemsPerPage:this.pagecount,    
      searchBy: "", 
      searchType:"",
      totalRecords:"NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
          
    try{this.adminService.GetVehicleDetailsformap(keydata).subscribe((data) => {
      
      let resdata = data;    
        
      let resdatadrp = resdata['entity'];   
          // Convert to JSON  
      this.stringifiedData = JSON.stringify(resdatadrp);           
      // Parse from JSON  
      this.parsedJson = JSON.parse(this.stringifiedData);   
      let resdatadev = resdata['list'];  
      
       // Convert to JSON  
       this.stringifiedDataList = JSON.stringify(this.parsedJson.list);           
       // Parse from JSON  
       this.globalpagesummary$ = JSON.parse(this.stringifiedDataList);
       // alert(this.globalpagesummary$);
       this.totrec = data.entity.count;
       this.outorec = data.entity.viewCount;

       //alert(this.totrec);
    })
    
    }catch(e){}
  }
  

  searchsummarydata(){
    var search = $('#searchData').val();
              
    this.p = 1; this.pagecount = 10;
      
    let keydata = {
      pageNo:this.p,
      itemsPerPage:this.pagecount,    
      searchBy: search, 
      searchType:"",
      totalRecords:"NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    
     this.adminService.GetVehicleDetailsformap(keydata).subscribe((data) => {
      
        let resdatalist = data.entity.list;      
  
         let pagesumm = resdatalist;
       
         this.globalpagesummary$ = pagesumm;
         this.totrec =data.entity.count; 
          this.outorec = data.entity.viewCount;
       
      });
  }

  RowsBindChanged() {
    try{
    this.p = 1; this.pagecount = parseInt(this.selectRowsText);
  
    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
  //  try{AddLoader()}catch(e){} 
     // Page Load Detail Grid BIND LIST    
     this.adminService.GetVehicleDetailsformap(keydata).subscribe(
      (data)  => {
       // try{RemoveLoader()}catch(e){alert(e)} 
        let resdatalist = data.entity.list; 
     
  
         let vendorlist = resdatalist;
       
         this.globalpagesummary$ = vendorlist;
         this.totrec = data.entity.count;
          this.outorec = data.entity.viewCount;
         
      });
    }catch(e){}
  }
  
  pageChanged(event) {
    try{

      let service = this.adminService

    if (this.selectRowsText == null) {
  
      this.p = 1; this.pagecount = 10;
      

    let keydata = {
      pageNo:this.p,
      itemsPerPage:this.pagecount,    
      searchBy: "", 
      searchType:"",
      totalRecords:"NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
          
    service.GetVehicleDetailsformap(keydata).subscribe((data) => {
      
          let resdata = data;  
          //  try{RemoveLoader()}catch(e){}   
            let resdatadrp = resdata['entity'];   
                // Convert to JSON  
            this.stringifiedData = JSON.stringify(resdatadrp);           
            // Parse from JSON  
            this.parsedJson = JSON.parse(this.stringifiedData);   
            let resdatadev = resdata['list'];       
             // Convert to JSON  
             this.stringifiedDataList = JSON.stringify(this.parsedJson.list);           
             // Parse from JSON  
             this.globalpagesummary$ = JSON.parse(this.stringifiedDataList);
      
              this.totrec = data.entity.count;
              this.outorec = data.entity.viewCount;
    });
  }
    else {
  
      this.p = event; this.pagecount = parseInt(this.selectRowsText);
  
      // alert(this.pagecountdev);
      let keydata = {
        pageNo: this.p,
        itemsPerPage: this.pagecount,
        searchBy: "",
        searchType: "",
        totalRecords: "NA",
        pageID: "1",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
       
      }
  
      service.GetVehicleDetailsformap(keydata).subscribe((data) => {
      
        let resdata = data;  
      //  try{RemoveLoader()}catch(e){}   
        let resdatadrp = resdata['entity'];   
            // Convert to JSON  
        this.stringifiedData = JSON.stringify(resdatadrp);           
        // Parse from JSON  
        this.parsedJson = JSON.parse(this.stringifiedData);   
        let resdatadev = resdata['list'];       
         // Convert to JSON  
         this.stringifiedDataList = JSON.stringify(this.parsedJson.list);           
         // Parse from JSON  
         this.globalpagesummary$ = JSON.parse(this.stringifiedDataList);
  
        this.totrec = data.entity.count;
        this.outorec = data.entity.viewCount;
         
      });
    }
  }catch(e){}
  } 

  EncryptPageName() {
    this.cryptService.encrypt("Indtrack Admin Dashboard")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput

  }

  PlotClusterVehicles(data){
    //alert("data   "+data[0].param12)
    try{
      //alert(data)
      MakeClusters(data)
    }catch(e){//alert(e)
    }
    
    
    
    }
    
    
    
    //======= Clear All Markers 
    
    ClearAllData(){
      try{ClearCluster()}catch(e){//alert(e)
      }
      try{clearInterval(this.liveInterval)}catch(e){}
      ClearSingleMarkers()
    ClearLiveTrail()
     ClearAlert()
     ClearDirection()
    }
    
    
    
    
    //Live Trail
    
    
    //==================================
    
    vehicleid:any;
    SingleTrail(vehicledata){
      ClearSingleMarkers();
      let service=this.postService
      let prevData:any="";

      this.ClearAllData();
  


   
      var latlon=[];
      latlon.push(vehicledata.param36)  //long
      latlon.push(vehicledata.param35) //lat
      this.vehicleid=vehicledata.param11;
  
      var details={
        data:{
          "type":"live",             //type
          "title":vehicledata.param12,  //vehicle No
          "Customer":vehicledata.param22,
          "Ignition":vehicledata.param42,
          "GPS Status":vehicledata.param39,
          "Vehicle Type":vehicledata.param29,
          "Speed":vehicledata.param37,
          "Drection Name ":vehicledata.param46,
          "direction":vehicledata.param40,
  
        }
      }
  
      var ign ;
  
      if(vehicledata.param42 == "OFF")
      {
         ign = 0;
      }else if(vehicledata.param42 == "OFF")
      {
         ign = 1;
      }
      var icon="";
    
      try{ icon=GetIcon(details.data)}catch(e){console.log(e)}
      var alert={}
      
  
  
  

    
      let data={
        pageNo:"1",
        itemsPerPage:"10",
        searchBy:vehicledata.param12,
        searchType:"",
        totalRecords:"NA",
        pageID:"1",
        pageName:this.encryptedpageNameValue,
        pageURL:this.encryptedpageUrlValue
      }
      try{this.postService.GetSingleLiveVehicle(data).subscribe((data) => {
        if(data.entity.list.length>0){
          this.ClearAllData();
          $("#speedometer").show();
          $("#alertDiv").show();
         
    
          try{
            var liveData=data.entity.list[0];
         


            
                var details={
                  data:{
                    "type":"live",             //type
                    "title":vehicledata.param12,  //vehicle No
                    "Customer":vehicledata.param22,
                    "Ignition":liveData.param42,
                    "GPS Status":liveData.param39,
                    "Vehicle Type":liveData.param29,
                    "Speed":liveData.param37,
                    "Direction Name ":liveData.param46,
                    "direction":liveData.param40,
            
                  }
                }
            var latlong=[];
            latlong.push(Number(liveData.param36));
            latlong.push(Number(liveData.param35));
    
            try{ icon=GetIcon(details.data)}catch(e){console.log(e)}
            var type=0
            Livetrail(latlong,details,icon,type);
    
           try{ this.PlotLiveAlerts(liveData)}catch(e){}
        this.liveInterval=setInterval(function(){
    
              data={
                pageNo:"1",
                itemsPerPage:"10",
                searchBy:vehicledata.param12,
                searchType:"",
                totalRecords:"NA",
                pageID:"1",
                pageName:this.encryptedpageNameValue,
                pageURL:this.encryptedpageUrlValue
              }
              try{service.GetSingleLiveVehicle(data).subscribe((data) => {
                if(data.entity.list.length>0){
                  
            
                  try{
                    var liveData=data.entity.list[0];
                        
      var details={
        data:{
          "type":"live",             //type
          "title":vehicledata.param12,  //vehicle No
          "Customer":vehicledata.param22,
          "Ignition":liveData.param42,
          "GPS Status":liveData.param39,
          "Vehicle Type":liveData.param29,
          "Speed":liveData.param37,
          "Direction Name ":liveData.param46,
          "direction":liveData.param40,
  
        }
      }
                    var latlong=[];
                    latlong.push(Number(liveData.param36));
                    latlong.push(Number(liveData.param35));
            
                    try{ icon=GetIcon(details.data)}catch(e){console.log(e)}
                    var type=1;
                    Livetrail(latlong,details,icon,type);
                    if(prevData!=''){
                           
                        var details={
                          data:{
                            "type":"live",             //type
                            "title":vehicledata.param12,  //vehicle No
                            "Customer":vehicledata.param22,
                            "Ignition":prevData.param42,
                            "GPS Status":prevData.param39,
                            "Vehicle Type":prevData.param29,
                            "Speed":prevData.param37,
                            "Direction Name ":prevData.param46,
                            "direction":prevData.param40,
                    
                          }
                        }
                      var latlong=[];
                      latlong.push(Number(prevData.param36));
                      latlong.push(Number(prevData.param35));
                      //DirectionIcon  latlong,details,icon
                      var icon="assets/mapimages/mapicons/directionimage/"+prevData.param49
                      DirectionIcon(latlong,details,icon)
                    }
                    prevData=liveData;
             }catch(e){}
            
                }
              
              })
              
              }catch(e){}
          
          }, 10000);
    
        }catch(e){}
    
        }else{
          //alert("No Data Found")
        }
      
      })
      
      }catch(e){}
      
      }
    
      
    
      PlotLiveAlerts(data){
        for(var i=0;i<data.length;i++){
          var latlon=[];
          latlon.push(Number(data[i].param36))
          latlon.push(Number(data[i].param35))
    
      }
    
    }

    OpenCollapsesummary(){
      $("#summarycollapseButton").hide();  
    
      $('#summarycollapseExample').collapse('show');	
    }
    
    CloseCollapsesummary(){
    
      $('#summarycollapseExample').collapse('hide');	
      $("#summarycollapseButton").show();    
    }
     
       OpenFullScreen(){
        var elem=document.getElementById('innercontainer');
      
       try{openFullscreen(elem);}catch(e){}
       document.getElementById('map').style.height=screen.height+'px';
       document.getElementById('gridfulldiv').style.height=screen.height+'px';
      
      } 
    
      locationarray = []; lati:any; longi:any;
    
      showlocation(lo){
        try{
          this.lati = lo.param35;
          this.longi = lo.param36;
    
          let locinputsdata={
            param1:this.longi,
            param2: this.lati,            
            pageID:"1",
            pageName:this.encryptedpageNameValue,
            pageURL:this.encryptedpageUrlValue
          }
           // try{AddLoader()}catch(e){}
            this.adminService.GetLocationFind(locinputsdata).subscribe((data) => {
          
            let resdata = data.entity.list[0];              
            
            $('#locdiv'+lo.rowNumber).show(); $('#view'+lo.rowNumber).hide();    
            this.locationarray[lo.rowNumber] = resdata.param1;
    
          }) 
    
         // try{RemoveLoader()}catch(e){}
          
        }catch(e){}
      }
    
      
      
      //========================= GraphSlider 
      
      GraphSlider(){
        if($("#graphSlider").hasClass("sliderActive")){
          $("#graphSlider").removeClass("sliderActive")
        }else{
          $("#graphSlider").addClass("sliderActive")
        }
      
      }
      
      
      SliderMouseover(){
        $("#graphSlider").addClass("sliderActive")
      }
    
      ActiveDetails(id){
        if(id=='mapview'){
          document.getElementById('mapview').style.display='none';
          document.getElementById('gridview').style.display='block';
          document.getElementById("summarytable").style.display='none';
      
          document.getElementById('innercontainer').style.transform="rotateY(180deg)";
        }else{
          document.getElementById('gridview').style.display='none';
          document.getElementById("summarytable").style.display='none';
      
          document.getElementById('mapview').style.display='block';
          document.getElementById('innercontainer').style.transform="rotateY(0deg)";
        }
    
        
      
        
      
      }
      SwitcherRoute() {
        if ($("#routeSwitch").hasClass("iconDiv activeSwitchOption effect8")) {
    
          $("#routeSwitch").removeClass("activeSwitchOption effect8");
          RouteSwitcher(false);
        } else {
          $("#routeSwitch").addClass("activeSwitchOption effect8")
          RouteSwitcher(true);
        }
      }
      GetIcon(data){
  
        var icon="";
        var vehiclecolor=this.GetVehiclecolor(data.param47);
      
       
            if(data.param29=="Maxi Cab"){
              icon="assets/mapimages/vehiclesicon/taxi/icon-0.png"
            }else if(data.param29=="School Bus"){
             // icon="'assets/mapimages/mapicons/canter/canter-0.png";
              icon="assets/mapimages/vehiclesicon/bus/"+vehiclecolor+"/icon-0.png";
            }else if(data.param29=="Tanker"){
              icon="assets/mapimages/vehiclesicon/tanker/"+vehiclecolor+"/icon-0.png";
      
            }else if(data.param29=="Taxi"){
              icon="assets/mapimages/vehiclesicon/taxi/icon-0.png"
            }else if(data.param29=="Truck"){
              icon="assets/mapimages/vehiclesicon/truck/"+vehiclecolor+"/icon-0.png";
      
            }else if(data.param29=="KM" || data.param29=="PT" || data.param29=="Trailer"){
              icon="assets/mapimages/personicons/personiconblack.png";
            }else if(data.param29=="Dumper/Tipper"){
              icon="assets/mapimages/vehiclesicon/truck/"+vehiclecolor+"/icon-0.png";
            }else if(data.param29=="Mini motaryodha"){
              icon="assets/mapimages/vehiclesicon/jeep/"+vehiclecolor+"/icon-0.png";
      
            }else{
              icon="assets/mapimages/vehiclesicon/jeep/"+vehiclecolor+"/icon-0.png";
      
            }
        return icon;
      }

      

GetVehiclecolor(data){
  var vehiclecolor;
  if(data=="Running"){
    vehiclecolor="green";
  }else if(data=="Idle"){
    vehiclecolor="yellow";
  }else if(data="Stop"){
    vehiclecolor="red";
  }else{
    vehiclecolor="blue";
  }


  return vehiclecolor;

}
      



// ========= Plot Selected Vehicles  
PlotSelectedSingleVehicle(data){
  this.ClearAllData();
  


   
    var latlon=[];
    latlon.push(data.param36)  //long
    latlon.push(data.param35) //lat

    var details={
      data:{
        "type":"live",             //type
        "title":data.param12,  //vehicle No
        "Customer":data.param22,
        "Ignition":data.param42,
        "GPS Status":data.param39,
        "Vehicle Type":data.param29,
        "Speed":data.param37,
        "Drection Name ":data.param46,
        "direction":data.param40,

      }
    }

    var ign ;

    if(data.param42 == "OFF")
    {
       ign = 0;
    }else if(data.param42 == "OFF")
    {
       ign = 1;
    }
    var icon="";
  
    try{ icon=GetIcon(details.data)}catch(e){console.log(e)}
    var alert={}
    

   try{ SingleMarker(latlon,details,alert,icon)}catch(e){}


}



    
  GetAllvehicles(vehtype){
    this.p = 1; this.pagecount = 10;
    let keydata = {
      pageNo:this.p,
      itemsPerPage:this.pagecount,    
      searchBy: "", 
      searchType:vehtype,
      totalRecords:"NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
          
    try{this.postService.GetVehicleDetailsformap(keydata).subscribe((data) => {
      
      this.allvehiclesdata=data.entity.list;

      try{this.ClearAllData(); }catch(e){}
      try{ this.PlotClusterVehicles(this.allvehiclesdata); }catch(e){}
    })
    
    }catch(e){}
  }



 
preswitchid="3"
MapSwitch(layerindex){
try{
 if(this.preswitchid!=""){
   $("#switch"+this.preswitchid).removeClass("activeSwitchOption effect8");
 }
 this.preswitchid=layerindex;
}catch(e){}
 $("#switch"+layerindex).addClass("activeSwitchOption effect8");
 
 try{SwitchMap(layerindex)}catch(e){}
   }



CloseCollapse(){

 $("#mapswitcher").collapse('hide');	
 $("#collapseButton").show();    
}

OpenCollapse(){
 $("#collapseButton").hide();  
 $("#mapswitcher").collapse('show');

}
   SwitchPoi(){
    PoiSwitcher("false");
  }
  

  Slider(){ 
    console.log("slider");
  }


//================================= History Work



monthArray=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
routeArray:any=[];
startdetails:any;

HistoryFunction(vehicleno,type){
  try{AddLoader()}catch(e){}
  try{ ClearHistoryAnimation() }catch(e){}

  try{ ClearHistoryAnimation() }catch(e){}


//try{ this.ClearAll()}catch(e){}
 
 
 this.routeArray=[];
 
  try{this.GetRouteDetails(vehicleno,type)}catch(e){}

}


//===== Route  Details 


  
GetRouteDetails(vehicleno,type){
  //GetRouteDetails
  
  
  let requestData={
    "param3":vehicleno,
     "pageNo":"",
    "itemsPerPage":"",
    "searchBy":"",
    "searchType":"",
    "totalRecords":"NA",
    "pageID":"1",
    "pageName":this.encryptedpageNameValue,
    "pageURL":this.encryptedpageUrlValue
  
  }
  
  try{ClearRoute()}catch(e){}
  try{ClearRailPoi()}catch(e){}
  
  
  
  
  this.postService.GetRoutesDetails(requestData).subscribe((data) => {
    try{if(data.entity.list.length>0){
      let routeDetails=data.entity.list;
        for(var i=0;i<routeDetails.length;i++){
          let coord=JSON.parse(routeDetails[i].param4);
          coord=coord.coordinates;
        try{ PlotRoute(coord)}catch(e){}
        }
     
      }}catch(e){}
    try{this.HistoryService(vehicleno,type)}catch(e){}
  })
  

}   //end route details method




  
HistoryService(vehicleno,type){
  var requestData={};
  if(type=='1'){
     requestData={

      "param1":vehicleno,
      "param2":$("#fromDate").val(),
      "param3":$("#toDate").val(),
      "param4":$("#fromTime").val(),
      "param5":$("#toTime").val(),
      "param6": "",
       "pageNo":"",
      "itemsPerPage":"",
      "searchBy":"",
      "searchType":"",
      "totalRecords":"NA",
      "pageID":"1",
      "pageName":this.encryptedpageNameValue,
      "pageURL":this.encryptedpageUrlValue

    }
  }else{
    var d=new Date();
    var fromdate=d.getFullYear()+"-"+this.monthArray[d.getMonth()]+"-"+d.getDate();
    //var todate=d.getFullYear()+"-"+this.monthArray[d.getMonth()]+"-"+d.getDate();
  
     requestData={
  
       
      "param1":vehicleno,
      "param2":fromdate,
      "param3":fromdate,
      "param4":"12:01 AM",
      "param5":"11:59 PM",
      "param6": "",
       "pageNo":"",
      "itemsPerPage":"",
      "searchBy":"",
      "searchType":"",
      "totalRecords":"NA",
      "pageID":"1",
      "pageName":this.encryptedpageNameValue,
      "pageURL":this.encryptedpageUrlValue
  
    }
  
  }
  

  
  this.postService. GetHistoryLogs(requestData).subscribe((data) => {
   // try{this.Historydetailspanel(vehicleno)}catch(e){}
   try{RemoveLoader()}catch(e){}

    if(data.entity=="NO RECORD FOUND"){
     
    }else if(data.entity.list.length>0){
     let historyData=data.entity.list;


     for(var i=0;i<historyData.length;i++){
      
      var tempArray=[];
      tempArray.push(Number(historyData[i].param4))
      tempArray.push(Number(historyData[i].param3))
      var coord=[];
      var temp2=[];
      temp2.push(Number(historyData[i].param4));
      temp2.push(Number(historyData[i].param3))
      coord.push(temp2);
      var next=i+1;
      temp2=[];
     try{ temp2.push(Number(historyData[next].param4));
      temp2.push(Number(historyData[next].param3))
      coord.push(temp2);
      var color="black"
      var speed=Number(historyData[next].param5)}catch(e){}
      if(speed<=5){
        color="blue"

      }else if(speed>5){
        color="red"
      }
      PlotCoditionline(coord,color)
      this.routeArray.push(tempArray);

      var details={
        data:{
          'title':historyData[i].param19,
          'type':'live',
          'Speed':historyData[i].param5,
          'Updated At':historyData[i].param2,
          'Battery Status':historyData[i].param21
        }
      }
     try{ AddHistoryPoints(details,tempArray);}catch(e){}
      
    }

    this.startdetails={
      "data":{
        'title':historyData[0].param19,
        'type':'live',
        'Speed':historyData[0].param5,
        'Updated At':historyData[0].param2,
        'Battery Status':historyData[0].param21
      }
    }
   try{ AnimationHistory(this.routeArray,this.startdetails)	}catch(e){}

       
    }
    try{  this.PoiService(vehicleno)}catch(e){}
    

  });

}

  
PoiService(vehicleno){
  let requestData={
    "param1":"",
    "param2":"",

    "param3":vehicleno,
    "param4":"",
     "pageNo":"",
    "itemsPerPage":"",
    "searchBy":"",
    "searchType":"",
    "totalRecords":"NA",
    "pageID":"1",
    "pageName":this.encryptedpageNameValue,
    "pageURL":this.encryptedpageUrlValue
  
  }
this.postService.GetRailPoi(requestData).subscribe((data) => {
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
          "Range":poiDetails[i].param8+" KM",
          "Details":poiDetails[i].param2,
         
          "Location":poiDetails[i].param8+" , "+poiDetails[i].param9,

        }
      }
     try{ PlotRailPoi(icon,latlon,details)}catch(e){}
    }

  }
})

 }







 PauseHistory(){
  try{ ClearHistoryInterval() }catch(e){}
 

}



    }