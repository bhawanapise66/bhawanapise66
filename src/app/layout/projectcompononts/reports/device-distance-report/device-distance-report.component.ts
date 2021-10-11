import { PdfService } from './../../services/pdf.service';
import { PostService } from './../../../../../post.service';
import { Splitter } from '@fullcalendar/core';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { ListService } from './../../../../../list.service';
import { ReportService } from './../../services/report.service';
import { routerTransition } from 'src/app/router.animations';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormBuilder, FormControl } from '@angular/forms';

// import { wickedpicker } from 'src/assets/timepicker/'
import 'src/assets/timepicker/wickedpicker.js'
// developer : dhammadeep dahiwale
// date 28-sep -2020

import { Component, OnInit, HostBinding, ElementRef, ViewChild } from '@angular/core';
import { Time } from '@angular/common';
import * as moment from 'moment';
declare var $: any;
// import '../../../../../assets/timepicker/wickedpicker.js'
import '../../../../../assets/timepicki/js/timepicki.js'
import '../../../../../assets/timepicki/css/timepicki.css'
import * as $ from 'jquery'

//import * as $ from 'jquery';
declare var jQuery: any;
import * as xlsx from 'xlsx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// import { BnNgIdleService } from 'bn-ng-idle';
import { ExportToExcelService } from '../../services/export-to-excel.service';
import { HistoryService } from 'src/mapservices/history.service';

declare var PopupInitialize: any;
declare var mapBuild: any;
declare var SwitchMap: any;
declare var container: any;
declare var content: any;
declare var closer: any;

declare var AddLoader: any;
declare var RemoveLoader: any;

/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_kelly);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-device-distance-report',
  templateUrl: './device-distance-report.component.html',
  styleUrls: ['./device-distance-report.component.css']
})
export class DeviceDistanceReportComponent implements OnInit {


  loginRoleId: string;

  customerList: any[]; deviceList: any[];
  customerId: string; deviceIdArr: any[] = [];

  isCustomer: boolean = false; isDivision: boolean = false; isSubDivision: boolean = false; isSection: boolean = false;

  encryptedpageNameValue: any; encryptedpageUrlValue: any;
  pageUrl: any = this.router.url;
  selectDateArray: string[]; fromDate: string; toDate: string; fromTime: any; toTime: any;
  d: Date; submitted: boolean = false;
  pageNumber: any = 1; itemsPerPage: any = 10; filter: any = ''; totalrecord: any = 'NA'; viewcount: any; totalcount: any;


  errorMessage: string;
  excelData: any[];
  geofenceObj: any;
  maploadflag: number = 0;
  historyData: { fromdate: any; fromtime: string; todate: any; totime: string; };
  date: any;
  ValueAlreadyGot: boolean = false; divisionChanged: boolean = false; subdivChanged: boolean = false; sectionChanged: boolean = false;
  totalMaxSpeed: any; totalgpsdistance: any; totalIdleTime: any; totalododistance: any;
  totalstoppagetime: any; totalworkingtime: any;

  responseGridArray: any; responseGridArrayForPdf: any;

  tolocationAddress: any[] = []; fromlocationAddress: any[] = [];
  key: any;
  reverse: boolean = true;
  PDFData: any[];
  vendorList: any[];
  vendorId: string;


  constructor(private pdfservice: PdfService, private excelservice: ExportToExcelService, private router: Router, private listService: ListService, private cryptService: CryptService, private historyservice: HistoryService, private reportService: ReportService) {
    this.EncryptPageName(); this.EncryptPageUrl();
    this.loginRoleId = sessionStorage.getItem('rid');
    // this.getVendorList();
    if (this.loginRoleId == '10' || this.loginRoleId == '11') {
      this.isCustomer = false;
      this.getCustomerList();
    }
    else {
      this.isCustomer = true;
      this.getVehicleList()
    }

  }

  ngOnInit() {

    // timepicker starts
    $('.timepicker').timepicki();
    //timepickr ends

    // datepicker starts
    (function ($) {
      $(document).ready(function () {

        /* calander single  picker ends */
        $('.datepicker').daterangepicker({
          singleDatePicker: true,
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
        /* calander single picker ends */

        /* calander picker */
        var start = moment().subtract(7, 'days');
        var end = moment();


        this.initialDate = start;
        this.endDate = end;
        function cb(start, end) {
          $('#daterangeadminux2 span').html(start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        }

        $('#daterangeadminux2').daterangepicker({
          startDate: start,
          endDate: end,
          opens: 'left',
          maxDate: new Date(),
          dateLimit: { days: 7 }

        }, cb);

        // this.initialDate =  $('#daterangeadminux2 span').html(start.format('MMM D, YY')).stringify() ;

        cb(start, end);
        $('#daterangeadminux2').on('show.daterangepicker', function (ev, picker) {
          var thisdp = $('.daterangepicker');
          setTimeout(function () {
            thisdp.addClass('active');
          }, 100);
        });
        var path = 'assets/images/background-part.png';
        $('.daterangepicker').append('<div class="background" style="background-image: url(' + path + '); z-index:-1; height:80px;"><img src="assets/images/background-part.png" alt="" style="display:none"></div>')
      });

    })(jQuery);
    //  datepicker ends
  }


  EncryptPageName() {
    this.cryptService.encrypt("Device Distance Report")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl);
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }


  getCustomerList() {
    let dataL = {
      pageID: "2",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.CustomerListAPI(dataL).subscribe((response) => {
      this.customerList = response.entity.list;
    })
  }


  getVehicleList() {
    let dataL = {
      param1: '',
      groupList: [],
      divisionList: [],
      subDivisionList: [],
      dpartmentList: [],
      "pageID": "",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    AddLoader()
    this.listService.vehicleListv1(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        this.deviceList = response.entity;
      }
    })
  }

  GetVehicleListAfterCustomer() {
    let dataL = {
      param1: this.customerId,
      groupList: [],
      divisionList: [],
      subDivisionList: [],
      dpartmentList: [],
      "pageID": "",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    AddLoader()
    this.listService.vehicleListv1(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        this.deviceList = response.entity;
      }
    })
  }

  onSubmit() {

    const inputElement = document.getElementById('daterange').innerHTML;
    this.selectDateArray = inputElement.split(' to ', 2);
    this.fromDate = this.selectDateArray[0];
    this.toDate = this.selectDateArray[1];
 
    this.d = new Date();

    if ((this.isCustomer == false) && (this.customerId == null || this.customerId == '' || this.deviceIdArr == [])) {
      this.submitted = true;
    }
    else if ((this.isCustomer == true) && (this.deviceIdArr == [])) {
      this.submitted = true
    }
    else {
      this.submitted = false; this.ValueAlreadyGot = false; this.GetDistanceReport()
    }
  }

  GetDistanceReport() {
    if(this.isCustomer==true){this.customerId = ''}
    let vehicledata = [];
    if (this.deviceList.length == this.deviceIdArr.length) { vehicledata = ['All'] }
    else { vehicledata = this.deviceIdArr }

    if (this.ValueAlreadyGot == true) {
      this.totalrecord = this.totalcount;
    }
    else { this.totalrecord = "NA" }
    let dataL = {
      param1: this.customerId,
      selectvehicleid: this.deviceIdArr,
      param3: this.fromDate,// "fromdate",
      param4: this.fromTime,// "fromtime",
      param5: this.toDate,// "todate",
      param6: this.toTime,// "totime",
      divisionList: [],// "divisionid[]",
      subDivisionList: [],// "subdivisionid[]",
      dpartmentList: [],// "departmentid[]",
      groupList: [],// "groupid[]",
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: this.totalrecord,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    AddLoader()
    this.reportService.RailDistanceReport(dataL).subscribe((response) => {
      RemoveLoader();
      if (response.statuscode == 200) {
        document.getElementById("inputform").style.display = 'none';
        document.getElementById("outputform").style.display = 'block'
        this.viewcount = response.entity.length;
        this.responseGridArray = response.entity;
     
        if (this.ValueAlreadyGot == false) {
          this.totalMaxSpeed = response.maxspeed;
          this.totalgpsdistance = response.totaldistance;
          this.totalIdleTime = response.totalidletime;
          this.totalododistance = response.totalododistance;
          this.totalstoppagetime = response.totalstoppagetime;
          this.totalworkingtime = response.totalworkingtime;
          this.totalcount = response.count;
          // this.createchart()
        }
      }
      else {
        this.errorMessage = response.entity;
        $("#ErrorModal").modal('show')
      }
    })
  }


  pageChange(event) {
    this.ValueAlreadyGot = true;
    this.pageNumber = event;
    this.totalrecord = this.totalcount;
    this.GetDistanceReport();
  }

  searchdata() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1
    // this.totalrecord = this.totalcount;
    this.GetDistanceReport();
  }

  changeItemsPerPage() {
    this.ValueAlreadyGot = true;
    this.totalrecord = this.totalcount;
    this.GetDistanceReport();
  }

  Refreshfunction() {
    this.ValueAlreadyGot = false;
    this.itemsPerPage = 10;
    this.pageNumber = 1;
    this.filter = '';
    this.GetDistanceReport();
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  createchart() {

    // Create chart instance
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.paddingRight = 20;

    // Add data
    chart.data = [{ "year": "1950", "value": -0.307 },
    { "year": "1951", "value": -0.168 },
    { "year": "1952", "value": -0.073 },
    { "year": "1953", "value": -0.027 },
    { "year": "1954", "value": -0.251 },
    { "year": "1955", "value": -0.281 },
    { "year": "1956", "value": -0.348 },
    { "year": "1957", "value": -0.074 },
    { "year": "1958", "value": -0.011 },
    { "year": "1959", "value": -0.074 },
    { "year": "1960", "value": -0.124 },
    { "year": "1961", "value": -0.024 },
    { "year": "1962", "value": -0.022 },
    { "year": "1963", "value": 0 },
    { "year": "1964", "value": -0.296 },
    { "year": "1965", "value": -0.217 },
    { "year": "1966", "value": -0.147 },
    { "year": "1967", "value": -0.15 },
    { "year": "1968", "value": -0.16 },
    { "year": "1969", "value": -0.011 },
    { "year": "1970", "value": -0.068 },
    { "year": "1971", "value": -0.19 },
    { "year": "1972", "value": -0.056 },
    { "year": "1973", "value": 0.077 },
    { "year": "1974", "value": -0.213 },
    { "year": "1975", "value": -0.17 },
    { "year": "1976", "value": -0.254 },
    { "year": "1977", "value": 0.019 },
    { "year": "1978", "value": -0.063 },
    { "year": "1979", "value": 0.05 },
    { "year": "1980", "value": 0.077 },
    { "year": "1981", "value": 0.12 },
    { "year": "1982", "value": 0.011 },
    { "year": "1983", "value": 0.177 },
    { "year": "1984", "value": -0.021 },
    { "year": "1985", "value": -0.037 },
    { "year": "1986", "value": 0.03 },
    { "year": "1987", "value": 0.179 },
    { "year": "1988", "value": 0.18 },
    { "year": "1989", "value": 0.104 },
    { "year": "1990", "value": 0.255 },
    { "year": "1991", "value": 0.21 },
    { "year": "1992", "value": 0.065 },
    { "year": "1993", "value": 0.11 },
    { "year": "1994", "value": 0.172 },
    { "year": "1995", "value": 0.269 },
    { "year": "1996", "value": 0.141 },
    { "year": "1997", "value": 0.353 },
    { "year": "1998", "value": 0.548 },
    { "year": "1999", "value": 0.298 },
    { "year": "2000", "value": 0.267 },
    { "year": "2001", "value": 0.411 },
    { "year": "2002", "value": 0.462 },
    { "year": "2003", "value": 0.47 },
    { "year": "2004", "value": 0.445 },
    { "year": "2005", "value": 0.47 }];

    for (let i = 0; i < this.responseGridArray.length; i++) {

    }

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.minGridDistance = 50;
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.startLocation = 0.5;
    categoryAxis.endLocation = 0.5;

    // Create value axis
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.baseValue = 0;

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "year";
    series.strokeWidth = 2;
    series.tensionX = 0.77;

    // bullet is added because we add tooltip to a bullet for it to change color
    let bullet = series.bullets.push(new am4charts.Bullet());
    bullet.tooltipText = "{valueY}";

    bullet.adapter.add("fill", function (fill, target) {
      // if (target.dataItem.valueY < 0) {
      //   return am4core.color("#FF0000");
      // }
      return fill;
    })
    let range = valueAxis.createSeriesRange(series);
    range.value = 0;
    range.endValue = -1000;
    range.contents.stroke = am4core.color("#FF0000");
    range.contents.fill = range.contents.stroke;

    // Add scrollbar
    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    chart.cursor = new am4charts.XYCursor();

  }
  GetDistanceReportForExcel() {
    let dataL = {
      param1: this.customerId,
      selectvehicleid: this.deviceIdArr,
      param3: this.fromDate,// "fromdate",
      param4: this.fromTime,// "fromtime",
      param5: this.toDate,// "todate",
      param6: this.toTime,// "totime",
      divisionList: [],// "divisionid[]",
      subDivisionList: [],// "subdivisionid[]",
      dpartmentList: [],// "departmentid[]",
      groupList: [],// "groupid[]",
      pageNo: "",
      itemsPerPage: "",
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (err) { }
    this.reportService.RailDistanceReport(dataL).subscribe((response) => {
      if (response.statuscode == 200) {

        this.responseGridArrayForPdf = response.entity;
        try { RemoveLoader() } catch (err) { }
        this.PrepareExcelData(this.responseGridArrayForPdf);
      }
    })
  }

  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "VEHICLE NUMBER": data[i].param3,
        "START DATE": data[i].param4,
        "END DATE": data[i].param5,
        "DURATION": data[i].param22,
        "DISTANCE": data[i].param6,
        "ODOMETER DISTANCE": data[i].param14,
        "WORKING TIME": data[i].param17,
        "IDLE TIME": data[i].param18,
        "STOPPAGE TIME": data[i].param19,
      }
      this.excelData.push(obj);
    }
    this.exportToExcel()
  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'Device Distance Report', 'devicedistance');
  }
  GetDistanceReportForPDF() {
    let dataL = {
      param1: this.customerId,
      selectvehicleid: this.deviceIdArr,
      param3: this.fromDate,// "fromdate",
      param4: this.fromTime,// "fromtime",
      param5: this.toDate,// "todate",
      param6: this.toTime,// "totime",
      divisionList: [],// "divisionid[]",
      subDivisionList: [],// "subdivisionid[]",
      dpartmentList: [],// "departmentid[]",
      groupList: [],// "groupid[]",
      pageNo: "",
      itemsPerPage: "",
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (err) { }
    this.reportService.RailDistanceReport(dataL).subscribe((response) => {
      if (response.statuscode == 200) {

        this.responseGridArrayForPdf = response.entity;
        try { RemoveLoader() } catch (err) { }
        this.PreparePDFData(this.responseGridArrayForPdf);
      }
    })

  }
  PreparePDFData(data) {
    this.PDFData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "VEHICLE NUMBER": data[i].param3,
        "START DATE": data[i].param4,
        "END DATE": data[i].param5,
        "DURATION": data[i].param22,
        "DISTANCE": data[i].param6,
        "ODOMETER DISTANCE": data[i].param14,
        "WORKING TIME": data[i].param17,
        "IDLE TIME": data[i].param18,
        "STOPPAGE TIME": data[i].param19,
      }
      this.PDFData.push(obj);
    }
    this.exportToPdf()
  }
  exportToPdf() {
    this.pdfservice.CreatePDFData(this.PDFData, 'Device Distance Report')
  }


  gotoBack() {

    this.customerId = null; this.deviceIdArr = []; this.fromDate = ""; this.toDate = "";
    document.getElementById("inputform").style.display = "block";
    document.getElementById("outputform").style.display = "none";

    this.ngOnInit();
  }

  viewtolocation(data) {
    let dataL = {
      param1: data.param11,    //lattitude
      param2: data.param10,    //longitude
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.reportService.getlocation(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        let locaAddr = response.entity.list[0];
        $('#tobeforeapi' + data.rowNumber).hide();
        $('#toafterapi' + data.rowNumber).show();
        this.tolocationAddress[data.rowNumber] = locaAddr.param1;
      }
      else {
        console.log(response)
      }
    })
  }

  viewfromlocation(data) {
    let dataL = {
      param1: data.param8,    //lattitude
      param2: data.param7,    //longitude
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.reportService.getlocation(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        let locaAddr = response.entity.list[0];
        $('#frombeforeapi' + data.rowNumber).hide();
        $('#fromafterapi' + data.rowNumber).show();
        this.fromlocationAddress[data.rowNumber] = locaAddr.param1;
      }
      else {
        console.log(response)
      }
    })
  }

  distanceTravelledReportPDFDownload() {
    var sTable = document.getElementById('distanceTravelledPDF').innerHTML;
    var style = "<style>";
    style = style + "table {width: 100%;font: 13px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + ".center{display: inline-block;width: 175px;border: 3px solid #73AD21;color: black;margin: 0px 4% 0 3%;border-radius: 5px;}";
    style = style + "</style>";

    // CREATE A WINDOW OBJECT.
    var win = window.open('', '', 'height=700,width=700');

    win.document.write('<html><head>');
    win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');
    win.document.close(); 	// CLOSE THE CURRENT WINDOW.

    win.print();    // PRINT THE CONTENTS.
    win.close();
  }
  //===========================================================================================MapFunctionality    

  // Developer : Tafseer Khan
  // Date : 04-12-2020
  // Description : Functionalitiy For Map With History Track



  Openmap(data) {
    let data1 = data.param4;
    let fromDateTimeArray = [];
    fromDateTimeArray = data1.split(' ');
    let fromDate = fromDateTimeArray[0]; let fromTime = fromDateTimeArray[1] + " " + fromDateTimeArray[2];
    let data2 = data.param5;
    let toDateTimeArray = [];
    toDateTimeArray = data2.split(' ');
    let toDate = toDateTimeArray[0]; let toTime = toDateTimeArray[1] + " " + toDateTimeArray[2];
    console.log(fromDate + " ," + fromTime + ' ,' + toDate + ' ,' + toTime)

    document.getElementById("map").style.height = screen.height - 220 + "px"
    $('#maptrack').modal('show');

    if (this.maploadflag == 0) {

      //==============map functionality

      //===== BuildMap
      let center = [79.0882, 21.1458]
      try { new mapBuild('map', center) } catch (e) { }
      try {
        container = document.getElementById("popup");
        content = document.getElementById("popup-content");
        closer = document.getElementById("popup-closer");

        PopupInitialize();
      } catch (e) { }
      try { SwitchMap("3") } catch (e) { alert("come" + e) }
      this.maploadflag = 1;


      this.historyData = {

        fromdate: fromDate,
        fromtime: fromTime,
        todate: toDate,
        totime: toTime,
      }

      //call History Funciton

      //=========== mapfunctionality end
    }

    var staticdetails = {

      "pageID": "1",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }

    // this.historyservice.HistoryPlot(data.param2, data.param3, this.historyData.fromdate, this.historyData.fromtime, this.historyData.todate, this.historyData.totime, '0', '0', '5', staticdetails);
    this.historyservice.HistoryPlot(data.param2, data.param3, fromDate, fromTime, toDate, toTime, 0, 0, 5, staticdetails)
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



  OpenCollapse() {
    $("#mapswitcher").collapse('show');

  }

  CloseCollapse() {
    $("#mapswitcher").collapse('hide');
  }



}
