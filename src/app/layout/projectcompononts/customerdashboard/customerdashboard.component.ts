import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';

import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomerdashboardService } from '../services/customerdashboard.service';
import { PostService } from '../../../../post.service';
import { CryptService } from '../services/crypt.service';
import { Router } from '@angular/router';
import { ExportToExcelService } from '../services/export-to-excel.service';
import { Paramcls } from './../../../../paramcls';
import { PdfService } from '../services/pdf.service';
import '../../../../assets/timepicker/wickedpicker.js';

import * as moment from 'moment';


import { trigger, state, style, transition, animate } from '@angular/animations';


declare var RemoveLoader: any;

declare var AddLoader: any;

declare var GetEmergencyalertDetails: any;
declare var mapBuild: any;
declare var SwitchMap: any;
declare var jQuery: any;
declare var StartEndPoint: any;

declare var Livetrail: any;
declare var PopupInitialize: any;
declare var MakeClusters: any;
declare var SingleMarker: any;
declare var ClearCluster: any;
declare var ClearSingleMarkers;
declare var ClearLiveTrail;
declare var ClearAlert;
declare var ClearDirection; declare var DirectionIcon: any; declare var PoiSwitcher: any;
declare var SetSideGauge: any; declare var SideGuage: any;
declare var openFullscreen: any;
declare var PoiSwitcher: any;


declare var PolygonSwitcher: any;
declare var RouteSwitcher: any;
declare var GetIcon: any;
declare var Gauge: any;
declare var Donut: any;
declare var container: any;
declare var content: any;
declare var closer: any;
declare var PlotCompleteHistory: any;

declare var CanvasJS: any;

declare var VehicleChart: any;
declare var LiveVehicleChart: any;

declare var ClearPolygonDraw: any;
declare var ClearAnimation: any;

declare var ClearHistoryInterval: any;

declare var ResumeAnimation: any;

declare var ClearHistoryInterval: any;
declare var ClearHistoryAnimation1: any;
declare var RestartAnimation: any;
declare var GetIcon: any;
declare var CustomFlyTo: any;
declare var AnimationLine: any;
declare var ClearHistory: any;
declare var Swiper: any;
declare var swiper: any;

declare var GetDirectionIcon: any;








const httpOptions = {
  headers: new HttpHeaders({
    'Headerkey': localStorage.getItem("headerKey"),
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'https://api.indtrack.co.in/personaltrackingapiangular/',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

  })
};

declare var $: any; declare var Highcharts: any;



@Component({
  selector: 'app-customerdashboard',
  templateUrl: './customerdashboard.component.html',
  styleUrls: ['./customerdashboard.component.css'],

})

export class CustomerdashboardComponent implements OnInit {

  historytrackspeed: any = 5;
  testingdata: any = "tafseer";
  roleid = sessionStorage.getItem("rid");
  countdata: any = {};
  initialoverspeed: any = 0;
  alertcounts: any = {};
  allvehiclesdata: any = [];
  filtervehicles = [];
  overspeedvehicles: any = [];
  singleoverspeedvehicle: any = {};
  pagecount: number;
  totalrecords: any = 0;
  nop: number; totrec: number; outorec: number; filtersummary: any; selectRows: any;
  p: number;
  stringifiedData: any; parsedJson: any; stringifiedresponse: any; parsedJsonresponse: any;
  stringifiedDataList: any; parsedJsonList: any;
  encryptedpageNameValue: string; encryptedpageUrlValue: string; pageUrl = this.router.url;
  custcountdetail$: any; devicetypedata: any = []; devicestatus: number = 0; livestatus: number = 0;
  vehiclestatus: number = 0; harshstatus: number = 0; distancestatus: number = 0; emergencystatus: number = 0;
  pollingcount: number = 0; nonpollingcount: number = 0; maintenancecount: number = 0; stopcount: number = 0;
  runningcount: number = 0; idlecount: number = 0; stoplivecount: number = 0; ontripcount: number = 0;
  todayemergencycount: number = 0; lasthremergencycount: number = 0; lastweekemergencycount: number = 0;
  lastmonthemergencycount: number = 0; lasthrdistancecount: number = 0;
  lastweekdistancecount: number = 0; lastmonthdistancecount: number = 0; lasthrharshbreakcount: number = 0;
  lastweekharshbreakcount: number = 0; devicetypecount: number = 0; devicetypename: any;
  overspeedstatuscount: number = 0; overspeedalertcount: number = 0; overspeedcount: number = 0;
  isfrmChecked: any; speedover: number = 0; vehistore: string; vehidstore: string;
  Array: string[] = []; allvehicle$: Object; polling$: Object; custdashall$: object; globalPDF$: any;
  globaldistance$: object; globalalertemrgency$: object;
  speednumber: number = 1;
  isTrade: boolean = false
  isNonTrade: boolean = false
  checkAllNonTrades: boolean = false
  checkAllTrades: boolean = false

  nontrade = []; globalclickdetails$ = []; globalvehicleclickdetails$ = []; globalpagesummary$ = [];
  isMasterSel: boolean; isSelected: boolean; categoryList: any; isMasterSelsummary: boolean; isSelectedsummary: boolean;
  checkedCategoryList: any; checkedCategoryListummary: any; pollclick$: object; custdashallcheckside$: object

  checkedCategoryListside: any; sessionpagesummary: any;

  vehicleno: any; pollingtime: any; customername: any; contactno: any; locationlat: any;
  locationlong: any; liveInterval: any;

  MakeClusters: string; key: string = 'name'; reverse: boolean = true; config: any;
  selectRowsText: any = 10; SelectRows: any;
  @ViewChild('epltable', { static: false }) epltable: ElementRef; filterside: string;

  constructor(private http: HttpClient, private ngZone: NgZone, private custService: CustomerdashboardService, private router: Router,
    private cryptService: CryptService, private postService: PostService, public excelservice: ExportToExcelService, public pdfservice: PdfService) {

    this.isMasterSel = true; this.isSelected = true;

  }


  //sorting
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  checkUncheckAll() {
    try {

      for (var i = 0; i < this.globalpagesummary$.length; i++) {
        this.globalpagesummary$[i].isSelectedsummary = this.isMasterSelsummary;
      }
      if (this.isMasterSelsummary == true) {
        this.ClearAllData();
        this.PlotClusterVehicles(this.globalpagesummary$);

      } else {
        this.ClearAllData()
      }
      this.getCheckedItemList(); ClearCluster();
    } catch (e) { }
  }

  isAllSelected() {
    try {
      this.isMasterSelsummary = this.globalpagesummary$.every(function (item: any) {
        return item.isSelectedsummary == true;
      })
      this.getCheckedItemList();
    } catch (e) { }
  }

  getCheckedItemList() {
    try {

      this.checkedCategoryListummary = [];
      for (var i = 0; i < this.globalpagesummary$.length; i++) {
        if (this.globalpagesummary$[i].isSelectedsummary)
          this.checkedCategoryListummary.push(this.globalpagesummary$[i]);
      }

      try { this.PlotSelectedSingleVehicle(this.checkedCategoryListummary) } catch (e) { //
      }

    } catch (e) { }
  }

  checkUncheckAllside() {
    try {
      for (var i = 0; i < this.globalclickdetails$.length; i++) {
        this.globalclickdetails$[i].isSelected = this.isMasterSel;

      }
      //alert("come at all selected"+this.isMasterSel) 
      if (this.isMasterSel == true) {
        this.ClearAllData(); //alert(this.globalclickdetails$.length)
        this.PlotClusterVehicles(this.globalclickdetails$);
      } else {
        this.ClearAllData()
      }
      this.getCheckedItemListside(); ClearCluster();

    } catch (e) { }
  }

  isAllSelectedside() {
    try {
      this.isMasterSel = this.globalclickdetails$.every(function (item: any) {

        return item.isSelected == true;

      })
      this.getCheckedItemListside();
    } catch (e) { }
  }

  getCheckedItemListside() {
    try {
      this.checkedCategoryList = [];
      for (var i = 0; i < this.globalclickdetails$.length; i++) {
        if (this.globalclickdetails$[i].isSelected)
          this.checkedCategoryList.push(this.globalclickdetails$[i]);
      }
      try { this.PlotSelectedSingleVehicle(this.checkedCategoryList) } catch (e) { //
      }



    } catch (e) { }

  }


  // ========= Plot Selected Vehicles  
  PlotSelectedSingleVehicle(data) {
    this.ClearAllData();
    document.getElementById("historytrackoption").style.display = "none";


    for (var i = 0; i < data.length; i++) {


      var latlon = [];
      latlon.push(data[i].param36)  //long
      latlon.push(data[i].param35) //lat

      var details = {
        data: {

          "type": "live",
          "title": data[i].param12,
          "Updated At": data[i].param32,
          "VehicleStatus": data[i].param47,
          "Speed": data[i].param37 + " km/hr",
          "Ignition": data[i].param42,
          "GPS Status": data[i].param39,
          "Direction": data[i].param46,
          "direction": data[i].param40,
          "Vehicle Type": data[i].param29,

          "maptrack": data[i].param11

        }
      }

      var ign;

      if (data[i].param42 == "OFF") {
        ign = 0;
      } else if (data[i].param42 == "OFF") {
        ign = 1;
      }
      var icon = "";

      try { icon = GetIcon(details.data) } catch (e) { console.log(e) }
      var alert = {}


      try { SingleMarker(latlon, details, alert, icon) } catch (e) { }
    }

  }
  singleVehicleDetails: any;
  ngOnInit() {



    // $(document).ready(function() {
    //   new Swiper('.swiper-container', {
    //     speed: 400,
    //     spaceBetween: 100,
    //     autoplay: true,
    //     disableOnInteraction: true,
    //    // prevArrow: '<button class="slide-arrow prev-arrow"></button>',
    //     //nextArrow: '<button class="slide-arrow next-arrow"></button>'
    //   });
    //   var mySwiper = document.querySelector('.swiper-container').swiper

    //   $(".swiper-container").mouseenter(function() {
    //     mySwiper.autoplay.stop();
    //     console.log('slider stopped');
    //   });

    //   $(".swiper-container").mouseleave(function() {
    //     mySwiper.autoplay.start();
    //     console.log('slider started again');
    //   });
    // });





    $(document).ready(function () {



      /* calander single  picker ends */
      $('.datepicker').daterangepicker({
        singleDatePicker: true,
        locale: {
          format: 'YYYY-MM-DD'
        },
        showDropdowns: true,
        minYear: 1901
      }, function (start, end, label) { });

      $('.datepicker').on('show.daterangepicker', function (ev, picker) {
        var thisdp = $('.daterangepicker');

        setTimeout(function () {
          thisdp.addClass('active');
        }, 100);
      });
      $('.datepicker').on('hide.daterangepicker', function (ev, picker) {
        var thisdpc = $('.daterangepicker');
        thisdpc.removeClass('active');
      });


    });





    $(function () {
      $('.timepicker1').wickedpicker('time');
      $('.timepicker2').wickedpicker('time');

      $('.timepicker1').wickedpicker({
        // current time
        now: "00:00",
        // 12- or 24-hour format
        twentyFour: false,
        // CSS classes
        upArrow: 'wickedpicker__controls__control-up',
        downArrow: 'wickedpicker__controls__control-down',
        close: 'wickedpicker__close',
        hoverState: 'hover-state',
        // title
        title: 'From Time'
      });

      $('.timepicker2').wickedpicker({
        // current time
        // 	 			 		 now: today.getHours() + ':' + today.getMinutes(),
        now: "23:59",
        title: 'To Time',
        // 12- or 24-hour format
        // 	 			 		  twentyFour: false,
        // CSS classes
        upArrow: 'wickedpicker__controls__control-up',
        downArrow: 'wickedpicker__controls__control-down',
        close: 'wickedpicker__close',
        hoverState: 'hover-state'
        // title

      });
    });


    this.EncryptPageName()
    this.EncryptPageUrl()

    //  window['angularComponentReference'] = { component: this, zone: this.ngZone, loadAngularFunction: (data1, data2) => this.angularFunctionCalled(data1, data2), };

    window['angularComponentReferencelive'] = { component: this, zone: this.ngZone, loadAngularFunction: (inputdata) => this.gridlivetrack(inputdata), };
    window['angularComponentReferencehistory'] = { component: this, zone: this.ngZone, loadAngularFunction: (inputdata) => this.Historymodal(inputdata), };


    //GetLocation();
    try { SideGuage("chartdivside") } catch (e) { }
    try { SetSideGauge(0); } catch (e) { }
    let latlong = [78.9629, 20.5937];
    setTimeout(() => {

      new mapBuild('map', latlong)

      container = document.getElementById("popup");
      content = document.getElementById("popup-content");
      closer = document.getElementById("popup-closer");

      PopupInitialize();

      SwitchMap("3");

      this.AllVehiclesData()


    }, 2000);



    this.CustomerDashboardCount(); this.DistanceCount(); this.DashboardAlertEmergencyCount();
    $('#vehicleonclickdetail').hide(); $('#speedodiv').hide(); $('#livetrackdiv').hide();
    $('#allpgloadgrid').show(); $('#mainpgloadgrid').hide();

    this.PageLoadSummary();


    this.isMasterSel = true;

    //-------------------------------------
    let mydata = "";

    this.http.post('  https://track.indtrack.com/vtsindtrackapiv1', mydata, httpOptions).subscribe(data => {

    });

    document.addEventListener("fullscreenchange", function () {
      var myheight = screen.height;
      if (document.getElementById('map').style.height == myheight + 'px') {
        document.getElementById('map').style.height = '567px';
        //  document.getElementById('gridfulldiv').style.height='471px';
      }
      //  
    });

  }

  angularFunctionCalled(datax, datay) {
    var month = datax.getMonth() + 1;
    var inputdate = datax.getFullYear() + "-" + month + "-" + datax.getDate();
    var inputtime = datax.getHours() + ":" + datax.getMinutes() + ":00";

    let inputsdata;

    inputsdata = {
      param1: inputdate,
      param2: inputtime,
      pageNo: "NA",
      itemsPerPage: "NA",
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    this.custService.EmergencyDetails(inputsdata).subscribe((data) => {
      let emergencydetails = data.entity.responsedatalist;
      this.allvehiclesdata = emergencydetails;
      try { this.ClearAllData(); } catch (e) { }
      try { this.PlotClusterVehicles(this.allvehiclesdata); } catch (e) { }


    })


  }

  DistanceCount() {
    try {


      let inputsdata;

      inputsdata = {
        pageID: "1",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }

      this.custService.DistanceCountAPI(inputsdata).subscribe((data) => {

        let resdata = data;

        let resdatadrp = resdata['entity'];
        // Convert to JSON  
        this.stringifiedData = JSON.stringify(resdatadrp);
        // Parse from JSON  
        this.parsedJson = JSON.parse(this.stringifiedData);
        let resdatadev = resdata['list'];

        //alert(resdata['list'])
        // Convert to JSON  
        this.stringifiedDataList = JSON.stringify(this.parsedJson.list);
        // Parse from JSON  
        this.globaldistance$ = JSON.parse(this.stringifiedDataList);

        this.lasthrdistancecount = this.globaldistance$[0]["param2"];
        this.lastweekdistancecount = this.globaldistance$[0]["param3"];
        this.lastmonthdistancecount = this.globaldistance$[0]["param4"];
        this.distancestatus = this.globaldistance$[0]["param1"];

      })

    } catch (e) { }
  }

  DashboardAlertEmergencyCount() {
    try {


      let inputsdata;

      inputsdata = {
        pageNo: "1",
        itemsPerPage: "20",
        searchBy: "",
        searchType: "",
        totalRecords: "NA",
        pageID: "1",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }

      this.custService.DashboardAlertCountAPI(inputsdata).subscribe((data) => {

        this.alertcounts = data.entity.list;


      })

    } catch (e) { }
  }


  CustomerDashliveAllvehicles(vehtype) {

    this.p = 1; this.pagecount = 10;
    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: "",
      searchType: vehtype,
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    try {
      this.custService.GetVehicleDetailsformap(keydata).subscribe((data) => {

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
        this.globalvehicleclickdetails$ = JSON.parse(this.stringifiedDataList);
      })

    } catch (e) { }
  }

  createPDF() {
    let pdfTableData;
    let dataArray = []


    if (this.roleid == "10" || this.roleid == "11" || this.roleid == "16" || this.roleid == "16") {

      for (var i = 0; i < this.globalPDF$.length; i++) {
        try {


          let pdfTableData: any = {
            "#": i + 1,
            "Customer Name": this.globalPDF$[i].param22,
            "Vehicle No": this.globalPDF$[i].param12,
            "Device Type": this.globalPDF$[i].param65,
            "IMEI No.": this.globalPDF$[i].param3,
            "Updated On .": this.globalPDF$[i].param32,
            "Speed.": this.globalPDF$[i].param37,
            "Ignition": this.globalPDF$[i].param42,
            "GPS Status": this.globalPDF$[i].param39,
            "Direction": this.globalPDF$[i].param46,
            "Latitude": this.globalPDF$[i].param36,
            "Longitude": this.globalPDF$[i].param36
          }
          dataArray.push(pdfTableData)

        } catch (e) { }
      }
    } else {
      for (var i = 0; i < this.globalPDF$.length; i++) {
        try {


          let pdfTableData = {
            "#": i + 1,
            "Vehicle No": this.globalPDF$[i].param12,
            "Device Type": this.globalPDF$[i].param8,
            " ICCID No.": this.globalPDF$[i].param5,
            "Updated On .": this.globalPDF$[i].param32,
            "Speed.": this.globalPDF$[i].param37,
            "Ignition": this.globalPDF$[i].param42,
            "GPS Status": this.globalPDF$[i].param39,
            "Direction": this.globalPDF$[i].param46,
            "Latitude": this.globalPDF$[i].param36,
            "Longitude": this.globalPDF$[i].param36
          }
          dataArray.push(pdfTableData)

        } catch (e) { }
      }
    }



    this.pdfservice.CreatePDFData(dataArray, "Customer Dashboard Details");
  }

  dataPDFexport() {

    this.globalPDF$ = null;

    if (this.filtersummary == "") {

      let keydata = {
        pageNo: "",
        itemsPerPage: "",
        searchBy: "",
        searchType: "",
        totalRecords: "NA",
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }

      //  try{AddLoader()}catch(e){}          
      try {
        this.custService.GetVehicleDetailsformap(keydata).subscribe(
          (data) => {
            // Parse from JSON  
            this.globalPDF$ = data.entity.list;

          })

      } catch (e) { }
    }
    else {
      let keydata = {
        pageNo: "",
        itemsPerPage: "",
        searchBy: this.filtersummary,
        searchType: "",
        totalRecords: "NA",
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }

      //  try{AddLoader()}catch(e){}          
      try {
        this.custService.GetVehicleDetailsformap(keydata).subscribe(
          (data) => {

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

      } catch (e) { }
    }

  }

  excelData: any = [];
  PrepareExcelData(data) {
    this.excelData = [];
    if (this.roleid == "10" || this.roleid == "11" || this.roleid == "16" || this.roleid == "16") {

      for (var i = 0; i < data.length; i++) {
        try {


          let obj: any = {
            "#": i + 1,
            "Customer Name": data[i].param22,
            "Vehicle No": data[i].param12,
            "Device Type": data[i].param65,
            "IMEI No.": data[i].param3,
            "Updated On .": data[i].param32,
            "Speed.": data[i].param37,
            "Ignition": data[i].param42,
            "GPS Status": data[i].param39,
            "Direction": data[i].param46,
            "Latitude": data[i].param36,
            "Longitude": data[i].param36
          }
          this.excelData.push(obj);

        } catch (e) { }
      }
    } else {
      for (var i = 0; i < data.length; i++) {
        try {


          let obj = {
            "#": i + 1,
            "Vehicle No": data[i].param12,
            "Device Type": data[i].param65,
            "IMEI No.": data[i].param5,
            "Updated On .": data[i].param32,
            "Speed.": data[i].param37,
            "Ignition": data[i].param42,
            "GPS Status": data[i].param39,
            "Direction": data[i].param46,
            "Latitude": data[i].param36,
            "Longitude": data[i].param36
          }
          this.excelData.push(obj);

        } catch (e) { }
      }
    }



  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'Vehicle Details', 'Vehicle Details');
  }



  PageLoadSummary() {

    this.p = 1; this.pagecount = 10;

    let service = this.custService

    /*  setInterval(function(){ */

    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    try {
      service.GetVehicleDetailsformap(keydata).subscribe((data) => {

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
      })

    } catch (e) { }
    //}, 10000);
  }

  RefreshSummary() {

    this.filtersummary = "";
    this.AllVehiclesData()
  }







  AllVehiclesData() {
    let service = this.custService;

    let keydata = {
      pageNo: "",
      itemsPerPage: "",
      searchBy: this.filtersummary,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    service.GetVehicleDetailsformap(keydata).subscribe((data) => {

      this.allvehiclesdata = data.entity.list;
      this.globalclickdetails$ = this.allvehiclesdata;
      this.CreateTable(this.allvehiclesdata);
      this.PrepareExcelData(this.allvehiclesdata);
      this.OverSpeedVehiclesSearch(this.allvehiclesdata);
    });
  }





  testinterval: any;
  CustomerDashboardCount() {
    try {

      let service = this.custService
      //  interval(10000).subscribe(x => {

      this.p = 1; this.pagecount = 10;
      let keydata = {
        pageID: "1",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }

      // Distributor Detail Grid BIND LIST    
      service.CustDashboardCountAPI(keydata).subscribe(
        (data) => {
          let resdata = data;
          this.countdata = resdata.entity.list[0];
          let vehiclechartdata = [];
          this.initialoverspeed = Number(this.countdata.param15);

          //  ===== gaugemeter
          try {
            let total = Number(this.countdata.param17) + Number(this.countdata.param18);

            this.BasicDeviceMeter(Number(this.countdata.param18), total);
            this.AisDeviceMeter(Number(this.countdata.param17), total);




          } catch (e) { }


          //============

          let colorarray = [];
          if (this.countdata.param2 != "0") {
            vehiclechartdata.push({
              "label": "Polling",
              "value": Number(this.countdata.param2)
            });
            colorarray.push("#64c146fc");
          }
          if (this.countdata.param3 != "0") {
            vehiclechartdata.push({
              "label": "Non Polling",
              "value": Number(this.countdata.param3)
            })
            colorarray.push("#468a8a");
          }
          if (this.countdata.param7 != "0") {
            vehiclechartdata.push({
              "label": "Stop",
              "value": Number(this.countdata.param7)
            })
            colorarray.push("#da3c3c");


          }
          if (this.countdata.param4 != "0") {
            vehiclechartdata.push({
              "label": "Maintanance",
              "value": Number(this.countdata.param4)
            })
            colorarray.push("#efe92d");


          }

          VehicleChart("vehicleschart", vehiclechartdata, colorarray);

          let livevehiclechartdata = [{
            "label": "Running",
            "value": Number(this.countdata.param5)
          }, {
            "label": "Idle",
            "value": Number(this.countdata.param6)
          }, {
            "label": "Stop",
            "value": Number(this.countdata.param7)
          }, {
            "label": "On Trip",
            "value": Number(this.countdata.param8)
          }];

          LiveVehicleChart("livevehiclechart", livevehiclechartdata);
          // try{ this.BindData(this.countdata);    }catch(e){}
        });

      service.Emergencygraphcount(keydata).subscribe(
        (data) => {
          let responsedata = data.entity.responsedatalist;
          this.EmergencyChart(responsedata);
        });




      // });

    } catch (e) { }
  }

  BindData(data) {
    try {
      this.devicestatus = data[0].param10;
      this.livestatus = data[0].param1;
      this.vehiclestatus = data[0]["param5"];
      this.harshstatus = data[0]["param15"];

      this.emergencystatus = data[0]["param14"];
      this.pollingcount = data[0]["param2"];
      this.nonpollingcount = data[0]["param3"];
      this.maintenancecount = data[0]["param4"];
      this.stopcount = data[0]["param7"];
      this.runningcount = data[0]["param5"];
      this.idlecount = data[0]["param6"];
      this.stoplivecount = data[0]["param7"];
      this.ontripcount = data[0]["param8"];
      this.overspeedcount = data[0]["param9"];


    } catch (e) { }
  }

  Back() {
    try {

      $('#allpgloadgrid').show(); $('#vehicleonclickdetail').hide(); $('#speedodiv').hide();
      $('#livetrackdiv').hide();

      let keydata = {
        pageNo: "",
        itemsPerPage: "",
        searchBy: "",
        searchType: "All",
        totalRecords: "NA",
        pageID: "9",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }

      // Distributor Detail Grid BIND LIST    
      this.custService.GetVehicleDetailsformap(keydata).subscribe(
        (data) => {

          let resdata = data;

          this.globalclickdetails$ = data.entity.list;

        });
    } catch (e) { }
  }

  sidesummarysearch() {
    var searchside = $('#searchDataside').val();

    let keydata = {
      pageNo: "",
      itemsPerPage: "",
      searchBy: searchside,
      searchType: "All",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    this.custService.GetVehicleDetailsformap(keydata).subscribe((data) => {

      this.globalclickdetails$ = data.entity.list;

    });
  }

  TypeVehicleClickDetails(cdet: Paramcls) {
    try {

      $('#allpgloadgrid').hide(); $('#vehicleonclickdetail').show(); $('#speedodiv').show();
      $('#livetrackdiv').show();

      var speed = cdet.param37;
      localStorage.setItem('vehicleid', speed);

      this.vehicleno = cdet.param12;
      this.pollingtime = cdet.param32;
      this.customername = cdet.param22;
      this.contactno = cdet.param23;
      this.locationlat = cdet.param35;
      this.locationlong = cdet.param36;

      // map functions =======

      // try{PopupInitialize()}catch(e){}
      let latlong1 = [78.9629, 20.5937];
      let details = {
        data: {
          "title": "MH20",
          "GPS Status": "Valid",
          "Ignition": "ON",
          "Time": "12:10:02",

        }
      }

      let alert = {}
      let icon = "assets/mapimages/mapicons/jeepG/jeepG-45.png";
      try { Livetrail(latlong1, details, alert, icon) } catch (e) { }
      try { SetSideGauge(speed); } catch (e) { }
      //this.speedupdate.randomValue("30");
      //== map end
      //this.gaugemeter();
    } catch (e) { }
  }




  VehicleClickDetails() {
    try {
      $("#vehicleonclickdetail").show(); $("#speedodiv").show(); $('#livetrackdiv').show();

      /*  this.vehicleno = cdet.param12;
       this.pollingtime = cdet.param32; 
       this.customername = cdet.param22;
       this.contactno = cdet.param23;
       this.locationlat = cdet.param35;
       this.locationlong = cdet.param36; */

      // map functions =======

      // try{PopupInitialize()}catch(e){}
      let latlong1 = [78.9629, 20.5937];
      let details = {
        data: {
          "title": "MH20",
          "GPS Status": "Valid",
          "Ignition": "ON",
          "Time": "12:10:02",

        }
      }

      let alert = {}
      let icon = "assets/mapimages/mapicons/jeepG/jeepG-45.png";
      try { Livetrail(latlong1, details, alert, icon) } catch (e) { }
      //== map end
    } catch (e) { }
  }

  PlotClusterVehicles(data) {
    //alert("data   "+data[0].param12)
    try {
      //alert(data)
      MakeClusters(data)
    } catch (e) {//
    }



  }



  //======= Clear All Markers 

  ClearAllData() {
    try { ClearCluster() } catch (e) {//
    }


    try { clearInterval(this.liveInterval) } catch (e) { }
    try { clearInterval(this.liveInterval) } catch (e) { }
    try { ClearSingleMarkers() } catch (e) { }
    try { ClearHistory() } catch (e) { }
    try { ClearLiveTrail() } catch (e) { }
    try { ClearCluster() } catch (e) { }
    try { ClearAlert() } catch (e) { }
    try { ClearDirection() } catch (e) { }
    try { ClearAnimation() } catch (e) { }
    try { ClearHistoryInterval() } catch (e) { }
    try { ClearHistoryAnimation1() } catch (e) { }


    try { clearInterval(this.liveInterval) } catch (e) { }
    ClearSingleMarkers()
    ClearLiveTrail()
    ClearAlert()
    ClearDirection()
  }




  //Live Trail


  //==================================


  SingleTrail(vehicleno) {
    ClearSingleMarkers();
    let service = this.postService
    let prevData: any = "";

    let data = {
      pageNo: "1",
      itemsPerPage: "10",
      searchBy: vehicleno,
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try {
      this.postService.GetSingleLiveVehicle(data).subscribe((data) => {
        if (data.entity.list.length > 0) {
          this.ClearAllData();
          $("#speedometer").show();
          $("#alertDiv").show();


          try {
            var liveData = data.entity.list[0];
            var details = {
              data: {

                "type": "live",
                "title": liveData.param12,
                "Updated At": liveData.param32,
                "VehicleStatus": liveData.param47,
                "Speed": liveData.param37 + " km/hr",
                "Ignition": liveData.param42,
                "GPS Status": liveData.param39,
                "Direction": liveData.param46,
                "direction": liveData.param40,
                "Vehicle Type": liveData.param29,
                //   "historytrack"

                // "maptrack": liveData.param11




              }
            }
            var latlong = [];
            latlong.push(Number(liveData.param36));
            latlong.push(Number(liveData.param35));

            try { var icon = GetIcon(details.data) } catch (e) { console.log(e) }
            var type = 0
            Livetrail(latlong, details, icon, type);

            try { this.PlotLiveAlerts(liveData) } catch (e) { }
            this.liveInterval = setInterval(function () {

              data = {
                pageNo: "1",
                itemsPerPage: "10",
                searchBy: vehicleno,
                searchType: "",
                totalRecords: "NA",
                pageID: "1",
                pageName: this.encryptedpageNameValue,
                pageURL: this.encryptedpageUrlValue
              }
              try {
                service.GetSingleLiveVehicle(data).subscribe((data) => {
                  if (data.entity.list.length > 0) {


                    try {
                      var liveData = data.entity.list[0];
                      var details = {
                        data: {

                          "type": "live",
                          "title": liveData.param12,
                          "Updated At": liveData.param32,
                          "VehicleStatus": liveData.param47,
                          "Speed": liveData.param37 + " km/hr",
                          "Ignition": liveData.param42,
                          "GPS Status": liveData.param39,
                          "Direction": liveData.param46,
                          "direction": liveData.param40,
                          "Vehicle Type": liveData.param29,

                          // "maptrack": liveData.param11


                        }
                      }
                      var latlong = [];
                      latlong.push(Number(liveData.param36));
                      latlong.push(Number(liveData.param35));

                      try { var icon = GetIcon(details.data) } catch (e) { console.log(e) }
                      var type = 1;
                      Livetrail(latlong, details, icon, type);
                      if (prevData != '') {
                        var details = {
                          data: {

                            "type": "live",
                            "title": liveData.param12,
                            "Updated At": liveData.param32,
                            "VehicleStatus": liveData.param47,
                            "Speed": liveData.param37 + " km/hr",
                            "Ignition": liveData.param42,
                            "GPS Status": liveData.param39,
                            "Direction": liveData.param46,
                            "direction": liveData.param40,
                            "Vehicle Type": liveData.param29,

                            // "maptrack": liveData.param11


                          }
                        }
                        var latlong = [];
                        latlong.push(Number(prevData.param36));
                        latlong.push(Number(prevData.param35));
                        //DirectionIcon  latlong,details,icon
                        try { icon = GetDirectionIcon(details.data) } catch (e) { console.log(e) }
                        DirectionIcon(latlong, details, icon)
                      }
                      prevData = liveData;
                    } catch (e) { }

                  }

                })

              } catch (e) { }

            }, 10000);

          } catch (e) { }

        } else {
          //alert("No Data Found")
        }

      })

    } catch (e) { }

  }



  PlotLiveAlerts(data) {
    for (var i = 0; i < data.length; i++) {
      var latlon = [];
      latlon.push(Number(data[i].param36))
      latlon.push(Number(data[i].param35))

    }

  }

  OpenCollapsesummary() {
    $("#summarycollapseButton").hide();

    $('#summarycollapseExample').collapse('show');
  }

  CloseCollapsesummary() {

    $('#summarycollapseExample').collapse('hide');
    $("#summarycollapseButton").show();
  }


  preswitchid = "3"
  MapSwitch(layerindex) {
    try {
      if (this.preswitchid != "") {
        $("#switch" + this.preswitchid).removeClass("activeSwitchOption effect8");
      }
      this.preswitchid = layerindex;
    } catch (e) { }
    $("#switch" + layerindex).addClass("activeSwitchOption effect8");

    try { SwitchMap(layerindex) } catch (e) { }
  }



  CloseCollapse() {

    $("#mapswitcher").collapse('hide');
    $("#collapseButton").show();
  }

  OpenCollapse() {
    $("#collapseButton").hide();
    $("#mapswitcher").collapse('show');

  }
  SwitchPoi() {
    PoiSwitcher("false");
  }



  OpenFullScreen() {
    var elem = document.getElementById('innercontainer');

    try { openFullscreen(elem); } catch (e) { }
    document.getElementById('map').style.height = screen.height + 'px';
    document.getElementById('gridfulldiv').style.height = screen.height + 'px';

  }

  locationarray = []; lati: any; longi: any;


  showlocation() {
    var lo;
    try {
      this.lati = lo.param35;
      this.longi = lo.param36;

      let locinputsdata = {
        param1: this.longi,
        param2: this.lati,
        pageID: "1",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      // try{AddLoader()}catch(e){}
      this.custService.GetLocationFind(locinputsdata).subscribe((data) => {

        let resdata = data.entity.list[0];

        $('#locdiv' + lo.rowNumber).show(); $('#view' + lo.rowNumber).hide();
        this.locationarray[lo.rowNumber] = resdata.param1;

      })

      // try{RemoveLoader()}catch(e){}

    } catch (e) { }
  }



  //========================= GraphSlider 

  GraphSlider() {
    if ($("#graphSlider").hasClass("sliderActive")) {
      $("#graphSlider").removeClass("sliderActive")
    } else {
      $("#graphSlider").addClass("sliderActive")
    }

  }


  SliderMouseover() {
    $("#graphSlider").addClass("sliderActive")
  }

  ActiveDetails(id) {
    if (id == 'mapview') {
      document.getElementById('mapview').style.display = 'none';
      document.getElementById('gridview').style.display = 'block';
      document.getElementById("summarytable").style.display = 'none';
      document.getElementById("frontmap").style.zIndex = "1";

      document.getElementById('innercontainer').style.transform = "rotateY(180deg)";
    } else {

      document.getElementById("frontmap").style.zIndex = "0";

      document.getElementById('gridview').style.display = 'none';
      document.getElementById("summarytable").style.display = 'none';

      document.getElementById('mapview').style.display = 'block';

      document.getElementById('innercontainer').style.transform = "rotateY(0deg)";

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



  OverspeedGauge(value) {

    var opts = {
      angle: -0.2, // The span of the gauge arc
      lineWidth: 0.1, // The line thickness
      radiusScale: 0.75, // Relative radius
      pointer: {
        length: 0.6, // // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: '#000000' // Fill color
      },
      staticLabels: {
        font: "8px sans-serif",
        labels: [0, 20, 40, 60, 80, 100],
        fractionDigits: 0,
        color: "000000"
      },
      staticZones: [
        { strokeStyle: "#23D41A", min: 0, max: 20 },
        { strokeStyle: "#90E014 ", min: 20, max: 30 },
        { strokeStyle: "#BEE014", min: 30, max: 40 },
        { strokeStyle: "#E07A14", min: 40, max: 60 },
        { strokeStyle: "#E01B14", min: 60, max: 100 }
      ],
      limitMax: false,
      limitMin: false,
      highDpiSupport: true,
      renderTicks: {
        divisions: 4,
        divWidth: 1.1,
        divLength: 0.53,
        divColor: '#333333',
        subDivisions: 3,
        subLength: 0.5,
        subWidth: 0.6,
        subColor: '#666666'
      }
    };
    var target = document.getElementById('demo'); // your canvas element
    var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    document.getElementById("preview-textfield").className = "preview-textfield";
    gauge.setTextField(document.getElementById("preview-textfield"));
    gauge.maxValue = 100; // set max gauge value
    gauge.setMinValue(0);  // set min value
    gauge.set(value); // set actual value


  }



  BasicDeviceMeter(count, total) {

    var opts = {
      angle: 0.3, // The span of the gauge arc
      lineWidth: 0.07, // The line thickness
      radiusScale: 0.4, // Relative radius
      pointer: {
        length: 0.6, // // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: '#000000' // Fill color
      },

      limitMax: false,     // If false, max value increases automatically if value > maxValue
      limitMin: false,     // If true, the min value of the gauge will be fixed
      colorStart: '#070C61',   // Colors
      colorStop: '#070C61',    // just experiment with them
      strokeColor: '#EEEEEE',  // to see which ones work best for you
      generateGradient: true,
      highDpiSupport: true,     // High resolution support// renderTicks is Optional

    };
    var target = document.getElementById('basic'); // your canvas element
    var gauge = new Donut(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = total; // set max gauge value
    gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 32;
    // set animation speed (32 is default value)
    gauge.set(count);

    if (count > 0) {
      document.getElementById("basic-preview").innerHTML = "";
      document.getElementById("basic-preview").className = "preview-textfield";
      gauge.setTextField(document.getElementById("basic-preview"));
    }

  }



  AisDeviceMeter(count, total) {


    var opts = {
      angle: 0.3, // The span of the gauge arc
      lineWidth: 0.07, // The line thickness
      radiusScale: 0.4, // Relative radius
      pointer: {
        length: 0.6, // // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: '#000000' // Fill color
      },


      limitMax: false,     // If false, max value increases automatically if value > maxValue
      limitMin: false,     // If true, the min value of the gauge will be fixed
      colorStart: '#070C61',   // Colors
      colorStop: '#070C61',    // just experiment with them
      strokeColor: '#EEEEEE',  // to see which ones work best for you
      generateGradient: true,
      highDpiSupport: true,     // High resolution support// renderTicks is Optional

    };
    var target = document.getElementById('ais'); // your canvas element
    var gauge = new Donut(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = total; // set max gauge value
    gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 32;
    // set animation speed (32 is default value)
    gauge.set(count);

    if (count > 0) {
      document.getElementById("ais-preview").innerHTML = "";
      document.getElementById("ais-preview").className = "preview-textfield";
      gauge.setTextField(document.getElementById("ais-preview"));
    }

  }



  EmergencyChart(data) {

    var chartdata = [];
    for (var i = 0; i < data.length; i++) {
      chartdata.push({
        x: new
          Date(data[i].param2), y: Number(data[i].param2)
      });
    }

    var chart = new CanvasJS.Chart("emergencychart", {
      animationEnabled: true,
      title: {},
      backgroundColor: "#5f5f5f00",
      // width: 280,
      axisX: {
        labelFontSize: 10,
        labelFontWeight: "bold",
        labelFontColor: "black",
      },
      axisY: {
        labelFontSize: 10,
        labelFontWeight: "bold",
        labelFontColor: "black",
        includeZero: true,

      },
      data: [{
        type: "line",
        name: "CPU Utilization",
        connectNullData: true,
        //nullDataLineDashType: "solid",
        xValueType: "dateTime",
        xValueFormatString: "hh:mm TT",
        yValueFormatString: "#",
        click: function (e) {

          this.GetEmergencyDetails(e.dataPoint.x, e.dataPoint.y)
          //  GetEmergencyalertDetails(e.dataPoint.x, e.dataPoint.y);
        },
        dataPoints: chartdata
        // dataPoints:[
        //   {x:new Date("2021-04-12 02:01:00"),y:12},
        //   {x:new Date("2021-04-12 04:01:00"),y:34},
        //    {x:new Date("2021-04-12 06:01:00"),y:10}
        // ] 
      }]
    });
    chart.render();

  }

  location: any = "test";

  CreateTable(data) {

    try { this.ClearAllData(); } catch (e) { }
    try { this.PlotClusterVehicles(data); } catch (e) { }
    document.getElementById("historytrackoption").style.display = "none";

    this.totalrecords = data.length;

    var tablecontainer = "<div>"
    var table = '<table id="vehicleTable" class="table table-hover table-striped customertable" style=" width: 100%; " >' +
      ' <thead >' +
      '<tr class="customertableheader">' +
      '<th >#</th>' +

      '<th id="customerth">Customer </th>' +
      '<th >Vehicle No</th>' +
      '<th >Device Type</th>' +
      '<th >IMEI No.</th>' +
      '<th >Updated At </th>' +
      '<th >Speed</th>' +
      '<th >Ignition </th>' +
      '<th >Direction </th>' +

      '<th >GPS Status</th>' +
      '<th >Location</th>' +
      '<th >Track</th>' +
      '</tr>' +
      ' <tbody >';

    for (var i = 0; i < data.length; i++) {
      let rowno = i + 1;
      table = table + ' <tr><td class="grdcontent">' + rowno + '</td>' +
        '<td class="grdcontent customertdclass" id="customertd' + i + '">' + data[i].param22 + '</td > ' +
        '<td class="grdcontent" data-html="true" data-toggle="popover" data-trigger="focus"  title="  Chassis No. : ' + data[i].param13 + ' \n Engine No. : ' + data[i].param14 + '\n Vehicle Type : ' + data[i].param19 + '\n Vehicle Model : ' + data[i].param25 + ' " data-content="<div><b>Example popover</b> - content</div>" >' + '<span style="font-weight:bolder;font-size:11px;color:darkblue">' + data[i].param12 + '</span>' + '</td > ' +
        '<td class="grdcontent" >' + data[i].param65 + '</td>' +
        '<td class="grdcontent" data-html="true" data-toggle="popover" data-trigger="focus"  title="  Device Vendor. : ' + data[i].param8 + '\n ICCID No. : ' + data[i].param5 + '\n Primary Network : ' + data[i].param69 + '\n MSISD No. : ' + data[i].param67 + '\n Fallback No. : ' + data[i].param70 + '\n MSISD No. 2 : ' + data[i].param68 + ' " data-content="<div><b>Example popover</b> - content</div>" >' + '<span style="font-weight:bolder;font-size:11px;color:darkblue">' + data[i].param3 + '</span>' + '</td > ';
      if (data[i].param32 == null) { table = table + '<td class="grdcontent" > NA </td>'; }
      else { table = table + '<td class="grdcontent" >' + data[i].param32 + '</td>'; }

      if (data[i].param37 == null) { table = table + '<td class="grdcontent" > NA </td>'; }
      else { table = table + '<td class="grdcontent" >' + data[i].param37 + '</td>'; }
      table = table + '<td class="grdcontent" >' + data[i].param42 + '</td>' +
        '<td class="grdcontent" >' + data[i].param46 + '</td>';
      // '<td class="grdcontent" >' + data[i].param39 + '</td>' ;

      // for fallback network and and sim 2 
      // if (data[i].param68 == '' || data[i].param70 == '') {
      //   table = table + '<td class="grdcontent" > NA </td>';
      // }
      // else {
      //   table = table + '<td class="grdcontent" >' + data[i].param70 + '<br>' + ' ' + data[i].param68 + '</td>';
      // }
      // '<td class="grdcontent">' + data[i].param32 + "<br>" + data[i].param37 + '</td>'

      // if (data[i].param42 == 'ON') {
      // if (data[i].param32 == null && data.param37 == null) {
      //   table = table + '<td class="grdcontent" > NA </td>';
      // }
      // else {
      //   table = table + '<td style=" background-color: #aff381;; color: rgb(4 122 13);font-size:10px">' + data[i].param32 + '<br>' + data[i].param37 + ' km/h  </td>';
      // }
      // } else {
      //   table = table + '<td style="background-color: rgb(241, 141, 137);color: rgb(91 7 4); ">' + data[i].param32 + '<br>' + data[i].param37 + '</td>';
      // }
      // table = table + '<td class="grdcontent">' + data[i].param42 + '<br>' + data[i].param46 + '</td>';

      if (data[i].param39 == 'Valid') {
        table = table + '<td class="grdcontent" style="background-color: #9aeb8c; color: rgb(106 64 1);">' + data[i].param39 + '</div></td>'
      } else {
        table = table + '<td class="grdcontent" style="background-color: #fcc491; color: rgb(106 64 1);">' + data[i].param39 + '</div></td>'

      }


      if (data[i].param35 == null || data[i].param36 == null) {
        table = table + '<td class="grdcontent" style=" font-size: 11px;  text-align: center;">' +
          '<div   title="Location Show Of Selected Record."  style=" cursor: pointer; font-size:10px;color:rgb(14, 4, 156); font-weight: bold;" id="view' + i + '"> NA </div>';

      }
      else {
        table = table + '<td class="grdcontent" style=" font-size: 11px;  text-align: center;">' +
          '<div   title="Location Show Of Selected Record."  style=" cursor: pointer; font-size:10px;color:rgb(14, 4, 156); font-weight: bold;" id="view' + i + '">' + data[i].param35 + '<br>' + data[i].param36 + '</div>';

      }


      table = table + '</td>';
      // '<td>---</td>' +


      var trackfuction = 'livetrackfunction("' + data[i].param11 + '")';
      if (data[i].param36 == null || data[i].param35 == null || data[i].param36 == "" || data[i].param35 == "" || data[i].param36 == "NA" || data[i].param35 == "NA") {
        table = table + "<td><a title='No Data found' style='cursor'><i style='font-size: 20px;color: #02a502;cursor: not-allowed;' class='fa fa-map-marker'></i></a></td>";


      } else {
        table = table + "<td><a onclick='" + trackfuction + "'><i style='font-size: 20px;color: #02a502;cursor:pointer' class='fa fa-map-marker'></i></a></td>";

      }
    }
    tablecontainer = table + '</tr></tbody></table></div>'
    document.getElementById('tablediv').innerHTML = tablecontainer;

    if (this.roleid == "10" || this.roleid == "11" || this.roleid == "16" || this.roleid == "16") {
      for (var i = 0; i < data.length; i++) {
        $("#customerth").css("display", "block");
        $("#customertd" + i).css("display", "block");
      }




    } else {
      for (var i = 0; i < data.length; i++) {
        $("#customerth").css("display", "none");
        $("#customertd" + i).css("display", "none");
      }


    }
  }





  SearchFilterTable() {
    this.AllVehiclesData();

    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchData");
    filter = input.value.toUpperCase();
    table = document.getElementById("vehicleTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  OverSpeedVehiclesSearch(data) {
    var highestspeed = 0;

    //this.initialoverspeed
    this.overspeedvehicles = data.filter(indexdata => indexdata.param37 > 5);
    this.singleoverspeedvehicle = this.overspeedvehicles[0];
    this.OverspeedGauge(Number(this.singleoverspeedvehicle.param37));
  }

  //this.allvehiclesdata

  FilterVehicleStatus(type) {
    if (type == "All") {
      this.filtervehicles = this.allvehiclesdata;
    } else if (type == "Polling") {
      this.filtervehicles = this.allvehiclesdata.filter(indexdata => (indexdata.param47 == "Running") || (indexdata.param47 == "Idle") || (indexdata.param47 == "Stop"));

    } else {
      this.filtervehicles = this.allvehiclesdata.filter(indexdata => indexdata.param47 == type);

    }
    this.CreateTable(this.filtervehicles);
    //this.filtervehicles=this.allvehiclesdata.filter(indexdata => indexdata.param37>5);

  }

  FilterOverspeed() {
    //initialoverspeed
    this.filtervehicles = this.allvehiclesdata.filter(indexdata => Number(indexdata.param37) > this.initialoverspeed);
    this.CreateTable(this.filtervehicles);

  }

  FilterDevicetype(type) {
    if (type == "All") {
      this.filtervehicles = this.allvehiclesdata;
      this.CreateTable(this.filtervehicles);
    } else {
      this.filtervehicles = this.allvehiclesdata.filter(indexdata => indexdata.param65 == type);
      this.CreateTable(this.filtervehicles);
    }


  }

  PlotOverspeedVehicle(data) {
    this.ClearAllData();
    document.getElementById("historytrackoption").style.display = "none";

    var latlon = [];
    latlon.push(data.param36)  //long
    latlon.push(data.param35) //lat

    var details = {
      data: {
        "type": "live",
        "title": data.param12,
        "Updated At": data.param32,
        "VehicleStatus": data.param47,
        "Speed": data.param37 + " km/hr",
        "Ignition": data.param42,
        "GPS Status": data.param39,
        "Direction": data.param46,
        "direction": data.param40,
        "Vehicle Type": data.param29,
        "maptrack": data.param11


      }
    }

    var ign;

    if (data.param42 == "OFF") {
      ign = 0;
    } else if (data.param42 == "OFF") {
      ign = 1;
    }
    var icon = "";

    try { icon = GetIcon(details.data) } catch (e) { console.log(e) }
    var alert = {}


    try { SingleMarker(latlon, details, alert, icon) } catch (e) { }




  }

  EncryptPageName() {
    this.cryptService.encrypt("customerdashboard")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl);
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }



  historyvehicleno: any;
  Historymodal(vehicleno) {
    this.historyvehicleno = vehicleno;

    $("#historymodal").modal("show")
  }




  HistoryFunction(data) {

    this.ClearAllData()

    let requestData = {

      "param1": data,
      "param2": $("#fromDate").val(),
      "param3": $("#toDate").val(),
      "param4": $("#fromTime").val(),
      "param5": $("#toTime").val(),
      "param6": "",
      "pageNo": "",
      "itemsPerPage": "",
      "searchBy": "",
      "searchType": "",
      "totalRecords": "NA",
      "pageID": "1",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue

    }

    try {
      this.ClearAllData()
      try { AddLoader() } catch (e) { }

      this.postService.GetHistoryLogs(requestData).subscribe((data) => {
        try { RemoveLoader() } catch (e) { }
        $("#historymodal").modal("hide")

        if (data.entity == "NO RECORD FOUND") {
          alert(data.entity);
          this.ClearAllData()

        } else if (data.entity.list.length > 0) {
          this.ClearAllData()
          let historyData = data.entity.list;
          try {
            $("#playbutton").css('display', 'block');
            $("#pausebutton").css('display', 'block');

            document.getElementById("historytrackoption").style.display = "flex";
          } catch (e) { }
          try { this.HistoryPlot(historyData) } catch (e) { };

          // try { this.PlotHistoryAlerts(historyData) } catch (e) { };
        }
        // this.locationData=data.display_name;
        // try{
        //   document.getElementById('getlocationLink').style.display='none';
        //   document.getElementById('locationDiv').style.display='block';
        // }catch(e){}



      })

    } catch (e) { }

    // GetHistoryLogs
  }



  HistoryPlot(data) {

    //   $("#speedometer").hide();
    //  $("#alertDiv").show();

    //======= History track

    // ======== End Point
    var index = data.length - 1;
    var details = {
      data: {
        "type": "historyend",
        //   "title": this.singleVehicleDetails.param12,
        "Ignition": data[index].param14,
        "Gps Status": data[index].param15,
        "Date/Time": data[index].param2
      }
    }
    var latlon = [];
    latlon.push(Number(data[index].param4));
    latlon.push(Number(data[index].param3));
    var icon = "assets/mapimages/markers/endpoint2.png"
    try { StartEndPoint(details, icon, latlon) } catch (e) { }


    //=========== Start Point

    details = {
      data: {
        "type": "historystart",
        //  "title": this.singleVehicleDetails.param12,
        "Ignition": data[0].param14,
        "Gps Status": data[0].param15,
        "Date/Time": data[0].param2
      }
    }
    latlon = [];
    latlon.push(Number(data[0].param4));
    latlon.push(Number(data[0].param3));
    icon = "assets/mapimages/markers/startpoint2.png"
    try { StartEndPoint(details, icon, latlon) } catch (e) { }

    CustomFlyTo(latlon);


    try { AnimationLine(data, this.historytrackspeed); } catch (e) { }

    //======================= 


  }



  GetIcon(data) {

    var icon = "";
    var vehiclecolor = this.GetVehiclecolor(data.param47);


    if (data.param29 == "Maxi Cab") {
      icon = "assets/mapimages/vehiclesicon/taxi/icon-0.png"
    } else if (data.param29 == "School Bus") {
      // icon="'assets/mapimages/mapicons/canter/canter-0.png";
      icon = "assets/mapimages/vehiclesicon/bus/" + vehiclecolor + "/icon-0.png";
    } else if (data.param29 == "Tanker") {
      icon = "assets/mapimages/vehiclesicon/tanker/" + vehiclecolor + "/icon-0.png";

    } else if (data.param29 == "Taxi") {
      icon = "assets/mapimages/vehiclesicon/taxi/icon-0.png"
    } else if (data.param29 == "Truck") {
      icon = "assets/mapimages/vehiclesicon/truck/" + vehiclecolor + "/icon-0.png";

    } else if (data.param29 == "KM" || data.param29 == "PT" || data.param29 == "Trailer") {
      icon = "assets/mapimages/personicons/personiconblack.png";
    } else if (data.param29 == "Dumper/Tipper") {
      icon = "assets/mapimages/vehiclesicon/truck/" + vehiclecolor + "/icon-0.png";
    } else if (data.param29 == "Mini motaryodha") {
      icon = "assets/mapimages/vehiclesicon/jeep/" + vehiclecolor + "/icon-0.png";

    } else {
      icon = "assets/mapimages/vehiclesicon/jeep/" + vehiclecolor + "/icon-0.png";

    }
    return icon;
  }




  StopHistory() {
    try { ClearHistoryAnimation1() } catch (e) { }
    //document.g

    $("#playbutton").css('pausebutton', 'none');
    $("#pausebutton").css('display', 'none');

    try { PlotCompleteHistory() } catch (e) { }


  }


  GetVehiclecolor(data) {
    var vehiclecolor;
    if (data == "Running") {
      vehiclecolor = "green";
    } else if (data == "Idle") {
      vehiclecolor = "yellow";
    } else if (data = "Stop") {
      vehiclecolor = "red";
    } else {
      vehiclecolor = "blue";
    }


    return vehiclecolor;

  }




  PauseHistory() {
    try { ClearHistoryInterval() } catch (e) { }


  }

  ResumeAnimation() {
    try { ResumeAnimation(this.historytrackspeed) } catch (e) { }
  }

  RestartAnimation() {
    try { ClearHistoryInterval() } catch (e) { }
    try { ClearHistoryAnimation1() } catch (e) { }
    $("#playbutton").css('display', 'block');
    $("#pausebutton").css('display', 'block');




    RestartAnimation(this.historytrackspeed)


  }

  GetEmergencyDetails(time, count) {

  }





  gridlivetrack(inputdata) {
    try { this.ActiveDetails('mapview'); } catch (e) { }
    try { this.SingleTrail(inputdata); } catch (e) { }



  }

  ChangeHistoryspeed() {

    try { ClearHistoryInterval() } catch (e) { }
    try { ResumeAnimation(this.historytrackspeed) } catch (e) { }


  }

}


