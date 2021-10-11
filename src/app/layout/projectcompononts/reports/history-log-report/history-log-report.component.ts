import { HistoryService } from 'src/mapservices/history.service';
import { ExportToExcelService } from './../../services/export-to-excel.service';
import { ListService } from './../../../../../list.service';
import { ReportService } from './../../services/report.service';
import { CryptService } from './../../services/crypt.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $: any;
// import '../../../../../assets/timepicker/wickedpicker.js'
import '../../../../../assets/timepicki/js/timepicki.js';
import '../../../../../assets/timepicki/css/timepicki.css';
import * as $ from 'jquery';
declare var jQuery: any;

declare var PopupInitialize: any;
declare var mapBuild: any;
declare var SwitchMap: any;

declare var mapBuild: any;
declare var container: any;
declare var content: any;
declare var closer: any;


// daterangepicker imports
import '../../../../../assets/vendor/daterangepicker-master/daterangepicker.js';
import '../../../../../assets/vendor/daterangepicker-master/moment.min.js';
import * as moment from 'moment';

import * as xlsx from 'xlsx';
import { PdfService } from '../../services/pdf.service';
// import { BnNgIdleService } from 'bn-ng-idle';


declare var AddLoader: any;
declare var RemoveLoader: any;


@Component({
  selector: 'app-history-log-report',
  templateUrl: './history-log-report.component.html',
  styleUrls: ['./history-log-report.component.css']
})
export class HistoryLogReportComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  loginRoleId: any; isCustomer: boolean = false;
  fromTime; toTime;
  customerList: any[]; deviceList: any[];
  customerId: string; deviceIdArr: any[] = [];


  customerObj: any; deviceObj: any; customer: string = ''; device: string = null; fromDate: string; toDate: string; StartTime: string; endTime: string;

  count: number;
  customerListArray = [];
  vehicleList = [];

  submitted: boolean = false;

  encryptedpageNameValue: string; encryptedpageUrlValue: string
  pageUrl = this.router.url;
  selectDateArray: string[];

  pageNumber: number = 1; itemsPerPage: number = 10;
  trolleyReportArray = [];
  totalcount: any = '0';
  viewcount: any = '0';
  filter: any = "";

  DistanceSummery = 0; IdleSummery = 0; stopSummery = 0; runningSummery = 0; vehiclecount = 0;

  geofenceObj: any;
  config = {
    displayKey: "param2",
    // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '300px',
  };
  trolleyReportArrayforPDF: any;
  errorMessage: any;
  excelData: any;
  customerName: any;
  deviceName: any;
  currentdate: string;
  responseGridArray: any;
  imeiNumber: any;
  totalrecord: string = "NA";
  ValueAlreadyGot: boolean = false;
  address: any;
  d: Date;
  maploadflag: number = 0;
  historyData: { fromdate: any; fromtime: string; todate: any; totime: string; };
  key: any;
  reverse: boolean;
  pdfData: any[];
  constructor(private router: Router, private listService: ListService, private historyservice: HistoryService, private cryptService: CryptService, private reportService: ReportService, private excelservice: ExportToExcelService, private pdfservice: PdfService) {
    this.EncryptPageName(); this.EncryptPageUrl();
    this.loginRoleId = sessionStorage.getItem('rid');
    if (this.loginRoleId == '10' || this.loginRoleId == '11') {
      this.isCustomer = false;
      this.GetCustomerList();
    }
    else {
      this.isCustomer = true;
      this.GetVehicleList()
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
    this.cryptService.encrypt("History Log Report")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl);
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }

  GetCustomerList() {
    let dataL = {
      pageID: "2",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.CustomerListAPI(dataL).subscribe((response) => {
      this.customerList = response.entity.list;
    })
  }

  GetVehicleList() {
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
    this.submitted = true;
    const inputElement = document.getElementById('daterange').innerHTML;
    this.selectDateArray = inputElement.split(' to ', 2);
    this.fromDate = this.selectDateArray[0];
    this.toDate = this.selectDateArray[1];


    this.fromTime = $('#fromTime').val();
    this.toTime = $('#toTime').val();

    this.d = new Date();
    if ((this.isCustomer == false) && (this.customerId == null || this.customerId == '' || this.device == null || this.device == '')) {
      this.submitted = true;
    }
    else if ((this.isCustomer == true) && (this.deviceIdArr == [])) {
      this.submitted = true
    }
    else {
      this.submitted = false; this.ValueAlreadyGot = false; this.GetHistoryLogReport()
    }

  }


  GetHistoryLogReport() {
    if (this.ValueAlreadyGot == true) {
      this.totalrecord = this.totalcount;
    }
    else {
      this.totalrecord = "NA";
    }

    let dataL = {
      "param1": this.device,
      "param2": this.fromDate,
      "param3": this.toDate,
      "param4": this.fromTime,
      "param5": this.toTime,
      "param6": "",
      "pageNo": this.pageNumber,
      "itemsPerPage": this.itemsPerPage,
      "searchBy": this.filter,
      "searchType": "",
      "totalRecords": this.totalrecord,
      "pageID": "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (err) { }

    this.reportService.HistoryLogReport(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (err) { }

      if (response.statuscode == 200) {
        if (response.responseEntityCount == 1) {
          this.responseGridArray = response.entity.list;
          this.viewcount = response.entity.viewCount;
          if (this.ValueAlreadyGot == false) {
            this.totalcount = response.entity.count;
          }
          document.getElementById("inputform").style.display = "none";
          document.getElementById("outputform").style.display = "block";
        }
        else {
          this.errorMessage = response.entity;
          $("#ErrorModal").modal('show');
        }
      }
    })
  }


  excelReport() {
    let dataL = {
      "param1": this.device,
      "param2": this.fromDate,
      "param3": this.toDate,
      "param4": this.fromTime,
      "param5": this.toTime,
      "param6": "",
      "pageNo": "",
      "itemsPerPage": "",
      "searchBy": "",
      "searchType": "",
      "totalRecords": "NA",
      "pageID": "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    AddLoader()
    this.reportService.HistoryLogReport(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        this.trolleyReportArrayforPDF = response.entity.list;
        this.PrepareExcelData(this.trolleyReportArrayforPDF)
      }
    })
  }

  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "POLLING TIME": data[i].param2,
        "VEHICLE SPEED": data[i].param5,
        "IGNITION STATUS": data[i].param14,
        "GPS STATUS": data[i].param6,
        "STATUS MESSAGE": data[i].param15,
        "ALERT NAME": data[i].param12,
        "BATTERY STATUS": data[i].param21,
        "DATA MEESSAGE": data[i].param13,
      }
      this.excelData.push(obj);
    }
    this.exportToExcel()
  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'History Log Report', 'historylogreport');
  }

  pdfReport() {
    let dataL = {
      "param1": this.device,
      "param2": this.fromDate,
      "param3": this.toDate,
      "param4": this.fromTime,
      "param5": this.toTime,
      "param6": "",
      "pageNo": "",
      "itemsPerPage": "",
      "searchBy": "",
      "searchType": "",
      "totalRecords": "NA",
      "pageID": "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    AddLoader()
    this.reportService.HistoryLogReport(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        let pdfdata = response.entity.list;
        this.PreparePDFData(pdfdata)
      }
    })
  }

  PreparePDFData(data) {
    this.pdfData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "POLLING TIME": data[i].param2,
        "VEHICLE SPEED": data[i].param5,
        "IGNITION STATUS": data[i].param14,
        "GPS STATUS": data[i].param6,
        "STATUS MESSAGE": data[i].param15,
        "ALERT NAME": data[i].param12,
        "BATTERY STATUS": data[i].param21,
        "DATA MEESSAGE": data[i].param13,
      }
      this.pdfData.push(obj);
    }
    this.exportToPDF()
  }

  exportToPDF() {
    this.pdfservice.CreatePDFData(this.pdfData, 'History Log Report');
  }

  searchdata() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1;
    this.GetHistoryLogReport()
  }

  Refreshfunction() {
    this.ValueAlreadyGot = false;
    this.itemsPerPage = 10;
    this.pageNumber = 1;
    this.filter = ''
    this.GetHistoryLogReport();
  }

  pageChange(event) {
    this.ValueAlreadyGot = true
    this.pageNumber = event;
    this.GetHistoryLogReport();
  }

  changeItemsPerPage() {
    this.ValueAlreadyGot = true;
    this.pageNumber = 1;
    this.GetHistoryLogReport();
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  getLocation(lat, long, col) {
    let dataL = {
      param1: long,    //lattitude
      param2: lat,    //longitude
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.reportService.getlocation(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.address = response.entity.list[0]["param1"];
        document.getElementById("btn" + col).style.display = "none";
        document.getElementById("data" + col).style.display = "block"

      }
      else {
        console.log(response)
      }
    })
  }

  gotoBack() {

    (document.getElementById('fromTime') as HTMLInputElement).value = "00:00";
    (document.getElementById('toTime') as HTMLInputElement).value = "23:59";
    this.customerId = null; this.device = null; this.fromDate = ''; this.toDate = ''; this.fromTime = "00:00"; this.toTime = "23:59";

    document.getElementById("inputform").style.display = "block";
    document.getElementById("outputform").style.display = "none";

    this.ngOnInit();
  }

  getpoi(item) {

    let startdatetime = item.param6;
    let enddatetime = item.param7;
    let startDateTimeArray = []; let endDateTimeArray = [];
    startDateTimeArray = startdatetime.split(" ", 2);
    endDateTimeArray = enddatetime.split(" ", 2);
    const startdate = startDateTimeArray[0]; const starttime = startDateTimeArray[1]
    const enddate = endDateTimeArray[0]; const endtime = endDateTimeArray[1]

    console.log("vehicleid = " + item.param2 + " ; ");
    console.log("startdate = " + startdate + ";" + "starttime is  = " + starttime + " ; ")
    console.log("enddate = " + enddate + ";" + "endtime is  = " + endtime + " ; ")

    let dataL = {
      pageNo: "1",
      itemsPerPage: "10",
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      param1: "",
      param2: item.param2,
      param3: startdate,
      param4: starttime,
      param5: enddate,
      param6: endtime,
      param7: "All",
      pageID: "45",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.reportService.GeofenceReport(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.geofenceObj = response.entity.list;
      }
    })

  }


  historypdfdownload() {
    var sTable = document.getElementById('HistoryLogReportpdf').innerHTML;
    var style = "<style>";
    style = style + "table {width: 100%;font: 13px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";

    // CREATE A WINDOW OBJECT.
    var win = window.open('', '', 'height=700,width=700');

    win.document.write('<html><head>');
    win.document.write('<title>History Log Report</title>');   // <title> FOR PDF HEADER.
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
    let data1 = data.param2;
    let fromDateTimeArray = [];
    fromDateTimeArray = data1.split(' ');
    let fromDate = fromDateTimeArray[0];
    let fromTime = fromDateTimeArray[1] + " " + fromDateTimeArray[2];
    let data2 = data.param2;
    let toDateTimeArray = [];
    toDateTimeArray = data2.split(' ');
    let toDate = toDateTimeArray[0];
    let toTime = toDateTimeArray[1] + " " + toDateTimeArray[2];
    console.log(data1 + "  " + data2)


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
    this.historyservice.HistoryPlot(data.param19, data.param3, fromDate, fromTime, toDate, toTime, 0, 0, 5, staticdetails)

    // try { this.HistoryFunction(data.param2, data.param3) } catch (e) { }
  }
  preswitchid = "3"
  MapSwitch(layerindex) {
    if (this.preswitchid != "") {
      $("#" + this.preswitchid).removeClass("activeSwitchOption");
    }
    this.preswitchid = layerindex
    $("#" + layerindex).addClass("activeSwitchOption");
    try { SwitchMap(layerindex) } catch (e) {   }
  }


  CloseCollapse() {
    $('#collapseExample').collapse('hide');
  }


  OpenCollapse() {
    $("#mapswitcher").collapse('show');

  }


}
