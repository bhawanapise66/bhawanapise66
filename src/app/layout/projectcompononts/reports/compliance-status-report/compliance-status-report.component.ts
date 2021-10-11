import { PostService } from './../../../../../post.service';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { ListService } from './../../../../../list.service';
import { ReportService } from './../../services/report.service';
import { routerTransition } from 'src/app/router.animations';

// import { wickedpicker } from 'src/assets/timepicker/'
import 'src/assets/timepicker/wickedpicker.js'
// developer : dhammadeep dahiwale
// date 28-sep -2020

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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

declare var AddLoader: any;
declare var RemoveLoader: any;
declare var container: any;
declare var content: any;
declare var closer: any;


@Component({
  selector: 'app-compliance-status-report',
  templateUrl: './compliance-status-report.component.html',
  styleUrls: ['./compliance-status-report.component.css'],
  animations: [routerTransition()]

})
export class ComplianceStatusReportComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  customerObj: any; deviceObj: any; customer: string = ''; device: string = ''; fromDate: string; toDate: string; StartTime: string; endTime: string;
  customerName: string; deviceName: any;
  isCustomer: boolean = false;

  inputVisible: boolean = true; filter;

  customerListArray = []; encryptedCustomerList = [];
  vehicleList = [];
  encryptedpageNameValue: string; encryptedpageUrlValue: string
  pageUrl = this.router.url;
  totalworkingtime: any;
  totalIdleTime: any;
  totalgpsdistance: any;
  totalododistance: any;
  itemsPerPage: number = 10;
  totalcount: any;
  pageNumber: number = 1
  responseGridArray = [];


  historyData: any;
  maploadflag: any = 0;

  selectDateArray = [];



  completeDate: string;
  datepickerVisible: boolean = true;
  daterangePickerVisible: boolean = false;

  // inputVisible = true;
  submitted: boolean = false;
  viewcount: any;


  loginRoleId;
  //TIMEPICKER


  config = {
    displayKey: "param2",
    search: true,
    limitTo: 5000,
    height: '300px',
  };
  fromTime: any;
  toTime: any;
  responseGridArrayForPdf: any;
  locationAddress: any;
  tolocationAdd: any;
  totalstoppagetime: any;
  errorMessage: any;
  excelData: any[];
  currentdate: string;
  tolocationAddress: any = [];
  fromlocationAddress: any = [];
  d: Date;
  key: any;
  reverse: boolean = true;
  constructor(private excelservice: ExportToExcelService, private reportService: ReportService, private historyservice: HistoryService, private listService: ListService, private cryptService: CryptService, private router: Router, private postService: PostService) {
    this.EncryptPageName();
    this.EncryptPageUrl();


    this.customerListArray = JSON.parse(sessionStorage.getItem("cl"));

    this.loginRoleId = sessionStorage.getItem('rid');

    if (this.loginRoleId == 10 || this.loginRoleId == 11) {
      this.getCustomerList();
      this.isCustomer = false;
    }
    else {

      this.isCustomer = true;
    }
    this.GetVehicleList();
  }

  ngOnInit() {

    // this.idleService.resetTimer();


    // timepicker starts
    $('.timepicker').timepicki();
    // timepicker ends



    // datepicker
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
        var start = moment().subtract(29, 'days');
        var end = moment();


        this.initialDate = start;
        this.endDate = end;
        function cb(start, end) {
          // $('#daterangeadminux2 span').html(start.format('MMM D, YY') + ' - ' + end.format('MMM D, YY'));
          $('#daterangeadminux2 span').html(start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        }

        $('#daterangeadminux2').daterangepicker({
          startDate: start,
          endDate: end,
          opens: 'left',
          maxDate: new Date()
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

  }
  EncryptPageName() {
    this.cryptService.encrypt("compliance-status-report")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl);
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }

  getCustomerList() {
    let dataL = {
      pageID: "2",
      param7: "All",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.CustomerListAPI(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        if (response.entity == "NO RECORD FOUND") {
        }
        else {
          this.customerListArray = response.entity.list;
        }
      }
    })
  }

  GetVehicleListAfterCustomer() {
    this.customer = this.customerObj.param1;
    this.customerName = this.customerObj.param2;
    let dataL = {
      param1: this.customer,
      param2: "",
      param7: "All",
      pageID: "",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.VehicleList(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.vehicleList = response.entity.list;
      }
    })
  }

  GetVehicleList() {
    let dataL = {
      param1: "",
      param2: "",
      param7: "All",
      pageID: "",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.VehicleList(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.vehicleList = response.entity.list;
      }
    })
  }

  checkvehicle() {
    this.device = this.deviceObj.param1;
    this.deviceName = this.deviceObj.param2;
  }


  onSubmit() {
    const inputElement = document.getElementById('daterange').innerHTML;
    this.selectDateArray = inputElement.split(' to ', 2);
    this.fromDate = this.selectDateArray[0];
    this.toDate = this.selectDateArray[1];
    this.fromTime = $('#fromTime').val();
    this.toTime = $('#toTime').val();


    this.d = new Date();
    // this.currentdate = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear() + "  " + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();


    if (this.device == "" || this.device == null || this.fromDate == "" || this.fromDate == null ||
      this.toDate == "" || this.toDate == null || this.fromTime == "" || this.fromTime == null || this.toTime == "" || this.toTime == null) {
      this.submitted = true;
    }
    else {
      this.submitted = false;
      this.GetDistanceReport();
    }

  }

  GetDistanceReport() {
    let dataL = {
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      param1: this.customer,
      param2: this.device,
      param3: this.fromDate,
      param4: this.fromTime,
      param5: this.toDate,
      param6: this.toTime,
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue

    }
    try { AddLoader() } catch (err) { }

    this.reportService.DistanceReport(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        try { RemoveLoader() } catch (err) { }
        if (response.responseEntityCount == "1") {
          this.responseGridArray = response.entity.list;
          this.totalworkingtime = response.entity.summary1;
          this.totalIdleTime = response.entity.summary2;
          this.totalgpsdistance = response.entity.summary3;
          this.totalododistance = response.entity.summary4;
          this.totalstoppagetime = response.entity.summary5;
          this.viewcount = response.entity.viewCount;
          this.totalcount = response.entity.count;
          document.getElementById("inputform").style.display = "none";
          document.getElementById("outputform").style.display = "block";
          this.GetDistanceReportForPDF();

        }
        else {
          this.errorMessage = response.entity;
          $("#ErrorModal").modal('show');
        }
      }
    })
  }

  pageChange(event) {
    this.pageNumber = event;
    this.GetDistanceReport();
  }

  searchdata() {
    this.pageNumber = 1
    this.GetDistanceReport();
  }
  Refreshfunction() {
    this.pageNumber = 1;
    this.itemsPerPage = 10;
    this.filter = '';
    this.GetDistanceReport();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  GetDistanceReportForPDF() {
    let dataL = {
      pageNo: "",
      itemsPerPage: "",
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      param1: this.customer,
      param2: this.device,
      param3: this.fromDate,
      param4: this.fromTime,
      param5: this.toDate,
      param6: this.toTime,
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue

    }
    this.reportService.DistanceReport(dataL).subscribe((response) => {
      if (response.statuscode == 200) {

        this.responseGridArrayForPdf = response.entity.list;
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
  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'Distance travelled Report', 'distancereavelledreport');
  }


  gotoBack() {

    this.customerObj = null;
    this.deviceObj = null;
    (document.getElementById('fromTime') as HTMLInputElement).value = "00:00";
    (document.getElementById('toTime') as HTMLInputElement).value = "23:59";
    this.device = ""; this.fromDate = ""; this.toDate = ""; this.fromTime = ""; this.toTime = "";

    document.getElementById("inputform").style.display = "block";
    document.getElementById("outputform").style.display = "none";

    this.ngOnInit();
  }

  viewtolocation(data) {
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
    style = style + "table {width: 100%;font: 17px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";

    // CREATE A WINDOW OBJECT.
    var win = window.open('', '', 'height=700,width=700');

    win.document.write('<html><head>');
    win.document.write('<title>Distance Travelled Report</title>');   // <title> FOR PDF HEADER.
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
    fromDateTimeArray = data1.split(' ', 2);
    let fromDate = fromDateTimeArray[0]; let fromTime = fromDateTimeArray[1];
    let data2 = data.param5;
    let toDateTimeArray = [];
    toDateTimeArray = data2.split(' ', 2);
    let toDate = toDateTimeArray[0]; let toTime = toDateTimeArray[1];
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

    // try { this.HistoryFunction(data.param2, data.param3) } catch (e) { }
  }

  preswitchid = "3"
  MapSwitch(layerindex) {
    if (this.preswitchid != "") {
      $("#" + this.preswitchid).removeClass("activeSwitchOption");
    }
    this.preswitchid = layerindex
    $("#" + layerindex).addClass("activeSwitchOption");
    try { SwitchMap(layerindex) } catch (e) { }
  }


  OpenCollapse() {
    $("#mapswitcher").collapse('show');
  }
  CloseCollapse() {
    $('#collapseExample').collapse('hide');
  }


}