import { PostService } from './../../../../post.service';
import { routerTransition } from 'src/app/router.animations';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { CryptService } from '../services/crypt.service';
import { Router } from '@angular/router';
import { DealerdashboardService } from '../services/dealerdashboard.service';
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


@Component({
  selector: 'app-dealerdashboard',
  templateUrl: './dealerdashboard.component.html',
  styleUrls: ['./dealerdashboard.component.css'],
  animations: [routerTransition()]


})

export class DealerdashboardComponent implements OnInit {

  encryptedpageNameValue: string; encryptedpageUrlValue: string; pageUrl = this.router.url;
  custcountdetail$: any; devicetypedata: any = []; devicestatus: number = 0; livestatus: number = 0;
  vehiclestatus: number = 0; stringifiedData: any; parsedJson: any; stringifiedresponse: any; parsedJsonresponse: any;
  stringifiedDataList: any; parsedJsonList: any; map: any; view: any;

  totaldevices: number = 0; totinstalleddev: number = 0; totstockdev: number = 0; installedais140dev: number = 0;
  installbasicdev: number = 0; totalcustomers: number = 0; totmaintenancedev: number = 0; totcomplaintdev: number = 0; 
  totPaymentTypecashcount:number = 0; paymenttypeonlinecount: number = 0; totpaymenttypecheckcount: number = 0;  

  outorec: number = 0; totrec: number = 0;  globalpagesummary$ = []; globalPDF$:any;
  selectRowsText:any=10; SelectRows:any; filtersummary:any;   pagecount:number;p: number;
  @ViewChild('epltable', { static: false }) epltable: ElementRef; filterside:string; liveInterval:any;
  name = 'html2canvas capture in Angular'; key: string = 'name'; reverse: boolean = true; count: number;

  capturedImage;

  constructor(private http: HttpClient, private router: Router, private cryptService: CryptService, private potService: PostService,
    private dealService: DealerdashboardService , public excelservice: ExportToExcelService, public pdfservice: PdfService) { 

      //$.getScript('https://html2canvas.hertzen.com/dist/html2canvas.js', function () { });
    }

  ngOnInit() {

    $("#Reasonentryid").hide(); $("#btnsendemail").hide();  

    //$.getScript('https://html2canvas.hertzen.com/dist/html2canvas.js', function () { });
    
    setTimeout(function(){  
      let latlong=[78.9629,20.5937];
      new mapBuild('map',latlong)
   
      container=document.getElementById("popup");
      content=document.getElementById("popup-content");
      closer=document.getElementById("popup-closer");

      PopupInitialize();
   
        SwitchMap("3");
     
        SwitchMap("3");
    }, 2000);

  

    this.DealerDashboardCount();

  }

  DealerDashboardCount() {

    let keydata = {
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue

    }

    // Distributor Detail Grid BIND LIST    
    this.dealService.DealerDashboardCountAPI(keydata).subscribe(
      (data) => {

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
        this.parsedJsonList = JSON.parse(this.stringifiedDataList);    

        this.totaldevices = this.parsedJsonList[0]["param1"];
        this.totinstalleddev = this.parsedJsonList[0]["param2"];
        this.totstockdev = this.parsedJsonList[0]["param3"];
        this.installedais140dev = this.parsedJsonList[0]["param4"];
        this.installbasicdev = this.parsedJsonList[0]["param5"];
        this.totalcustomers = this.parsedJsonList[0]["param6"];
        this.totmaintenancedev = this.parsedJsonList[0]["param7"];
        this.totcomplaintdev = this.parsedJsonList[0]["param8"];
        this.totPaymentTypecashcount = this.parsedJsonList[0]["param9"];
        this.paymenttypeonlinecount = this.parsedJsonList[0]["param10"];
        this.totpaymenttypecheckcount = this.parsedJsonList[0]["param11"];    

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
        try{
          
          /* this.adminService.GetVehicleDetailsformap(keydata).subscribe(
          (data)  => {                 
          // Parse from JSON  
          this.globalPDF$ = data.entity.list;      
          
        }) */
    
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
    try{
      
     /*  this.adminService.GetVehicleDetailsformap(keydata).subscribe(
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
      
    }) */

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
    
    let service = this.dealService

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
          
    try{
      
      /* service.GetVehicleDetailsformap(keydata).subscribe((data) => {
      
      //this.custService=data.entity.list;
      // Below code for all checkbox select.
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
              
       this.totrec = data.entity.count;
       this.outorec = data.entity.viewCount;
       this.dataPDFexport();
    }) */
    
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
          
    try{
      
      /* this.adminService.GetVehicleDetailsformap(keydata).subscribe((data) => {
      
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
    }) */
    
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
    
     /* this.adminService.GetVehicleDetailsformap(keydata).subscribe((data) => {
      
        let resdatalist = data.entity.list;      
  
         let pagesumm = resdatalist;
       
         this.globalpagesummary$ = pagesumm;
         this.totrec =data.entity.count; 
          this.outorec = data.entity.viewCount;
       
      }); */
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
     /* this.adminService.GetVehicleDetailsformap(keydata).subscribe(
      (data)  => {
       // try{RemoveLoader()}catch(e){alert(e)} 
        let resdatalist = data.entity.list; 
     
  
         let vendorlist = resdatalist;
       
         this.globalpagesummary$ = vendorlist;
         this.totrec = data.entity.count;
          this.outorec = data.entity.viewCount;
         
      }); */
    }catch(e){}
  }
  
  pageChanged(event) {
    try{

      let service = this.dealService

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
          
    /* service.GetVehicleDetailsformap(keydata).subscribe((data) => {
      
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
    }); */
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
  
     /*  service.GetVehicleDetailsformap(keydata).subscribe((data) => {
      
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
         
      }); */
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
    
    
    SingleTrail(vehicleno){
      ClearSingleMarkers();
      let service=this.potService
      let prevData:any="";
    
      let data={
        pageNo:"1",
        itemsPerPage:"10",
        searchBy:vehicleno,
        searchType:"",
        totalRecords:"NA",
        pageID:"1",
        pageName:this.encryptedpageNameValue,
        pageURL:this.encryptedpageUrlValue
      }
      try{this.potService.GetSingleLiveVehicle(data).subscribe((data) => {
        if(data.entity.list.length>0){
          this.ClearAllData();
          $("#speedometer").show();
          $("#alertDiv").show();
         
    
          try{
            var liveData=data.entity.list[0];
            var details={
              data:{
                "type":"live",
                "title":vehicleno,
                "Ignition":liveData.param42,
                "GPS Status":liveData.param39,
                "Speed":liveData.param37,
    
    
              }
            }
            var latlong=[];
            latlong.push(Number(liveData.param36));
            latlong.push(Number(liveData.param35));
    
            var icon="assets/mapimages/mapicons/canterG/canterG-0.png"
            var type=0
            Livetrail(latlong,details,icon,type);
    
           try{ this.PlotLiveAlerts(liveData)}catch(e){}
        this.liveInterval=setInterval(function(){
    
              data={
                pageNo:"1",
                itemsPerPage:"10",
                searchBy:vehicleno,
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
                        "type":"live",
                        "title":vehicleno,
                        "Ignition":liveData.param42,
                        "GPS Status":liveData.param39,
                        "Speed":liveData.param37
            
            
                      }
                    }
                    var latlong=[];
                    latlong.push(Number(liveData.param36));
                    latlong.push(Number(liveData.param35));
            
                    var icon="assets/mapimages/mapicons/canterG/canterG-0.png"
                    var type=1;
                    Livetrail(latlong,details,icon,type);
                    if(prevData!=''){
                      var details={
                        data:{
                          "type":"live",
                          "title":vehicleno,
                          "Ignition":prevData.param42,
                          "GPS Status":prevData.param39,
                          "Speed":prevData.param37
              
              
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
    
    OpenCollapse(){
      $("#collapseButton").hide();  
    
      $('#collapseExample').collapse('show');	
    }
    
    CloseCollapse(){
    
      $('#collapseExample').collapse('hide');	
      $("#collapseButton").show();    
    }
    
    OpenCollapsesummary(){
      $("#summarycollapseButton").hide();  
    
      $('#summarycollapseExample').collapse('show');	
    }
    
    CloseCollapsesummary(){
    
      $('#summarycollapseExample').collapse('hide');	
      $("#summarycollapseButton").show();    
    }
      
    preswitchid="3"
    MapSwitch(layerindex){
     if(this.preswitchid!=""){
       $("#"+this.preswitchid).removeClass("activeSwitchOption");
       $("#"+this.preswitchid).removeClass("effect8");
     }
     this.preswitchid=layerindex
     $("#"+layerindex).addClass("activeSwitchOption");
     $("#"+layerindex).addClass("effect8");
     try{SwitchMap(layerindex)}catch(e){
       //alert(e)
    }
       }
    
       SwitchPoi(){
        PoiSwitcher("false");
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
            /* this.adminService.GetLocationFind(locinputsdata).subscribe((data) => {
          
            let resdata = data.entity.list[0];              
            
            $('#locdiv'+lo.rowNumber).show(); $('#view'+lo.rowNumber).hide();    
            this.locationarray[lo.rowNumber] = resdata.param1;
    
          })  */
    
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
    }