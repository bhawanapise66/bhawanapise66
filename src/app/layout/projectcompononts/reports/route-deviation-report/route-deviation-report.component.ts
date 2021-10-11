import { ExportToExcelService } from './../../services/export-to-excel.service';
// import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { ListService } from './../../../../../list.service';
import { ReportService } from './../../services/report.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $: any;
import * as moment from 'moment';

declare var $: any;
// import '../../../../../assets/timepicker/wickedpicker.js'
import '../../../../../assets/timepicki/js/timepicki.js'
import '../../../../../assets/timepicki/css/timepicki.css'
import * as $ from 'jquery'


declare var jQuery: any;
import * as xlsx from 'xlsx';
import { HistoryService } from 'src/mapservices/history.service';
import { PdfService } from '../../services/pdf.service';

declare var AddLoader: any;
declare var RemoveLoader: any;

declare var PopupInitialize: any;
declare var mapBuild: any;
declare var SwitchMap: any;
declare var container: any;
declare var content: any;
declare var closer: any;

@Component({
  selector: 'app-route-deviation-report',
  templateUrl: './route-deviation-report.component.html',
  styleUrls: ['./route-deviation-report.component.css']
})
export class RouteDeviationReportComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  loginRoleId: any; isCustomer: boolean = false;


  customerList: any[]; deviceList: any[];
  customerId: string; deviceIdArr: any[] = [];

  customerObj: any; deviceObj: any; customer: string = ''; device: string = ''; fromDate: string; toDate: string; StartTime: string; endTime: string;
  filter;

  inputVisible: boolean = true;
  maploadflag: any;
  historyData: any;

  customerListArray = [];
  vehicleList = [];
  encryptedpageNameValue: string; encryptedpageUrlValue: string
  pageUrl = this.router.url;

  dateVar = new Date()
  custObj: any;

  selectDateArray = [];


  completeDate: string;
  datepickerVisible: boolean = true;
  daterangePickerVisible: boolean = false;

  // inputVisible = true;
  reportResponseList = [];

  submitted: boolean = false;
  vehiclesavailable: boolean;
  count: any;
  //TIMEPICKER


  pageNumber: any = 1;
  itemsPerPage: any = 10;
  totalOdoDistance: any;

  speedviolation: any;
  maxspeed: any;
  totalcount: any;
  viewcount: any;
  totalIdleTime; totalStoppageTime; totalCustomerCount; totalRunningTime;

  config = {
    displayKey: "param2",
    // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };
  toTime: any;
  fromTime: any;
  errorMessage: any;
  excelData: any;
  customerName: any;
  deviceName: any;
  totalrecord: any = 'NA';
  ValueAlreadyGot: boolean = false;
  totalTime: any;
  totalInTime: any;
  totalOutTime: any;
  currentdate: string;
  d: Date;
  key: any;
  reverse: boolean = true;
  pdfData: any[];
  constructor(private pdfservice: PdfService, private reportService: ReportService, private historyservice: HistoryService, private listService: ListService, private cryptService: CryptService, private router: Router, private excelservice: ExportToExcelService) {

    this.EncryptPageName(); this.EncryptPageUrl();

    this.loginRoleId = sessionStorage.getItem('rid');
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
    // this.idleService.resetTimer();

    // timepicker starts
    $('.timepicker').timepicki();
    // timepicker ends


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
    //  datepicker ends

  }
  EncryptPageName() {
    this.cryptService.encrypt("route-deviation-report")
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

    this.d = new Date();
    // this.currentdate = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear() + "  " + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

    const inputElement = document.getElementById('daterange').innerHTML;
    this.selectDateArray = inputElement.split(' to ', 2);
    this.fromDate = this.selectDateArray[0];
    this.toDate = this.selectDateArray[1];

    this.fromTime = $('#fromTime').val();
    this.toTime = $('#toTime').val();

    if ((this.isCustomer == false) && (this.customerId == null || this.customerId == '' || this.deviceIdArr == [])) {
      this.submitted = true;
    }
    else if ((this.isCustomer == true) && (this.deviceIdArr == [])) {
      this.submitted = true
    }
    else {
      this.submitted = false; this.ValueAlreadyGot = false; this.GetRouteDaviationReport()
    }
  }

  GetRouteDaviationReport() {
    let vehicledata = [];
    if (this.deviceList.length == this.deviceIdArr.length) { vehicledata = ['All'] }
    else { vehicledata = this.deviceIdArr }

    if (this.ValueAlreadyGot == true) {
      this.totalrecord = this.totalcount;
    }
    else { this.totalrecord = "NA" }
    let dataL = {
      "param1": this.customerId,
      "selectvehicleid": vehicledata,
      "param3": this.fromDate,
      "param4": this.fromTime,
      "param5": this.toDate,
      "param6": this.toTime,
      "divisionList": [],
      "subDivisionList": [],
      "dpartmentList": [],
      "groupList": [],
      "pageNo": this.pageNumber,
      "itemsPerPage": this.itemsPerPage,
      "searchBy": this.filter,
      "searchType": "",
      "totalRecords": this.totalrecord,
      "pageID": "7",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue

    }
    try { AddLoader() } catch (err) { }

    this.reportService.RailRouteDeviationReport(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (err) { }
      if (response.statuscode == 200) {
        this.reportResponseList = response.entity;
        this.viewcount = this.reportResponseList.length;

        if (this.ValueAlreadyGot == false) {
          this.totalcount = response.count;
          this.totalTime = response.totaltimeinroutedev;
          this.totalOutTime = response.totalroutedevout;
          this.totalInTime = response.totalroutedevin;
        }
        document.getElementById('inputform').style.display = 'none';
        document.getElementById('outputform').style.display = 'block'
      }
      else {
        this.errorMessage = response.entity
        $("#ErrorModal").modal('show')
      }
    })
  }



  changePage(event) {
    this.pageNumber = event;
    this.GetRouteDaviationReport();
  }

  searchdata() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1;
    this.GetRouteDaviationReport();
  }

  Refreshfunction() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1;
    this.itemsPerPage = 10; this.filter = ''
    this.GetRouteDaviationReport();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  reportPdf() {
    let dataL = {
      "param1": this.customerId,
      "selectvehicleid": this.deviceIdArr,
      "param3": this.fromDate,
      "param4": this.fromTime,
      "param5": this.toDate,
      "param6": this.toTime,
      "divisionList": [],
      "subDivisionList": [],
      "dpartmentList": [],
      "groupList": [],
      "pageNo": "",
      "itemsPerPage": "",
      "searchBy": this.filter,
      "searchType": "",
      "totalRecords": "NA",
      "pageID": "7",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    AddLoader()
    this.reportService.RailRouteDeviationReport(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        let exceldata = response.entity;
        this.PreparePdfData(exceldata)
      }
    })
  }
  PreparePdfData(data) {
    this.pdfData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "VEHICLE NUMBER": data[i].param3,
        "VEHICLE CLASS": data[i].param13,
        "IN DATE TIME": data[i].param6 + " " + data[i].param7,
        "OUT DATE TIME": data[i].param6,
        "DURATION": data[i].param11,
        "ROUTE NAME": data[i].param19,
      }
      this.pdfData.push(obj);
    }
    this.exportToPdf()
  }
  exportToPdf() {
    this.pdfservice.CreatePDFData(this.pdfData, 'Route Deviation Report');
  }


  reportExcel() {
    let dataL = {
      "param1": this.customerId,
      "selectvehicleid": this.deviceIdArr,
      "param3": this.fromDate,
      "param4": this.fromTime,
      "param5": this.toDate,
      "param6": this.toTime,
      "divisionList": [],
      "subDivisionList": [],
      "dpartmentList": [],
      "groupList": [],
      "pageNo": "",
      "itemsPerPage": "",
      "searchBy": this.filter,
      "searchType": "",
      "totalRecords": "NA",
      "pageID": "7",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    AddLoader()
    this.reportService.RailRouteDeviationReport(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        let exceldata = response.entity;
        this.PrepareExcelData(exceldata)
      }
    })
  }
  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "VEHICLE NUMBER": data[i].param3,
        "VEHICLE CLASS": data[i].param13,
        "IN DATE TIME": data[i].param6 + " " + data[i].param7,
        "OUT DATE TIME": data[i].param6,
        "DURATION": data[i].param11,
        "ROUTE NAME": data[i].param19,
      }
      this.excelData.push(obj);
    }
    this.exportToExcel()
  }
  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'Route Deviation Report', 'routedeviationreport');
  }
  gotoBack() {
    this.customerId = null; this.deviceIdArr = []; this.fromDate = ""; this.toDate = ""; this.fromTime = ""; this.toTime = "";

    (document.getElementById('fromTime') as HTMLInputElement).value = "00:00";
    (document.getElementById('toTime') as HTMLInputElement).value = "23:59";
 

    document.getElementById("inputform").style.display = "block";
    document.getElementById("outputform").style.display = "none";

    this.ngOnInit();
  }


  RouteDeviationReportPDFDownload() {
    var sTable = document.getElementById('routeDeviationPDF').innerHTML;
    var style = "<style>";
    style = style + "table {width: 100%;font: 13px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + ".center{display: inline-block;width: 175px;border: 3px solid #73AD21;color: black;margin: 0px 4% 0 3%;border-radius: 5px;}";

    style = style + "</style>";

    // CREATE A WINDOW OBJECT.
    var win = window.open('', '', 'height=700,width=700');

    win.document.write('<html><head>');
    win.document.write('<title>Route Deviation Report</title>');   // <title> FOR PDF HEADER.
    win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');

    win.document.close(); 	// CLOSE THE CURRENT WINDOW.

    win.print();    // PRINT THE CONTENTS.
    win.close();

  }





  Openmap(data) {
    let data1 = data.param7;
    let fromDateTimeArray = [];
    fromDateTimeArray = data1.split(' ');
    let fromDate = fromDateTimeArray[0];
    let fromTime = fromDateTimeArray[1]
    let data2 = data.param9;
    let toDateTimeArray = [];
    toDateTimeArray = data2.split(' ');
    let toDate = toDateTimeArray[0];
    let toTime = toDateTimeArray[1];
    console.log(data1 + " " + data2)
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
