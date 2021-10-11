import { routerTransition } from 'src/app/router.animations';
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
  selector: 'app-mis-report',
  templateUrl: './mis-report.component.html',
  styleUrls: ['./mis-report.component.css'],
  animations: [routerTransition()]

})
export class MISReportComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  loginRoleId: any; isCustomer: boolean = false;
  fromTime; toTime;
  customerList: any[]; deviceList: any[];
  customerId: string; deviceIdArr: any[] = [];


  customerObj: any; deviceObj: any; customer: string = ''; device: string = ''; fromDate: string; toDate: string; StartTime: string; endTime: string;

  count: number;
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
  errorMessage: any;
  excelData: any;
  customerName: any;
  deviceName: any;
  currentdate = new Date();
  responseGridArray: any;
  ValueAlreadyGot: boolean = false;
  totalrecord: any = 'NA';
  misreportforPDF: any;
  d: Date;
  key: any;
  reverse: boolean = true;
  pdfData: any[];
  constructor(private router: Router, private listService: ListService, private cryptService: CryptService, private reportService: ReportService, private excelservice: ExportToExcelService,private pdfservice:PdfService) {
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
    this.cryptService.encrypt("MIS Report")
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
    this.submitted = true;
    const inputElement = document.getElementById('daterange').innerHTML;
    this.selectDateArray = inputElement.split(' to ', 2);
    this.fromDate = this.selectDateArray[0];
    this.toDate = this.selectDateArray[1];


    this.fromTime = $('#fromTime').val();
    this.toTime = $('#toTime').val();

    this.d = new Date();

    if ((this.isCustomer == false) && (this.customerId == null || this.customerId == '' || this.deviceIdArr == [])) {
      this.submitted = true;
    }
    else if ((this.isCustomer == true) && (this.deviceIdArr == [])) {
      this.submitted = true
    }
    else {
      this.submitted = false; this.ValueAlreadyGot = false; this.GetMISReport()
    }

  }


  GetMISReport() {
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

    this.reportService.EslMisReportv1(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (err) { }

      if (response.statuscode == 200) {
        this.responseGridArray = response.entity;
        this.viewcount = this.responseGridArray.length
        if (this.ValueAlreadyGot == false) {
          this.totalcount = response.count
        }
      }
      else {
        this.errorMessage = response.entity
        $("#ErrorModal").modal('show')
      }
    })
  }

  searchdata() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1
    this.GetMISReport()
  }

  pageChange(event) {
    this.ValueAlreadyGot = true;
    this.pageNumber = event;
    this.GetMISReport();
  }

  Refreshfunction() {
    this.itemsPerPage = 10;
    this.pageNumber = 1;
    this.filter = ''
    this.GetMISReport();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }


  pdfreport() {
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
    this.reportService.HistoryLogReport(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.misreportforPDF = response.entity.list;
        this.PreparePdfData(this.misreportforPDF)
      }
    })
  }

  PreparePdfData(data) {
    this.pdfData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "NAME OF USFD/PT M/C": data[i].param26,
        "START LOCATION": data[i].param18,
        "END LOCATION": data[i].param22,
        "ACTUAL START TIME": data[i].param6,
        "ACTUA END TIME": data[i].param7,
        "DISTANCE": data[i].param8,
        "RUNNING": data[i].param9,
        "IDLE": data[i].param10,
        "STOPPAGE": data[i].param11,
        "NO. OF IDLE": data[i].param12,
        "AVG": data[i].param13,
        "MAX ": data[i].param14,
        "OVERSPEED": data[i].param15,
        "T. STOP": data[i].param16,
        "IDLE PAGE DETAILS ": data[i].param17,
      }
      this.pdfData.push(obj);
    }
  }

  exportToPdf() {
    this.pdfservice.CreatePDFData(this.pdfData, 'MIS Report');
  }

  excelreport() {
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
    this.reportService.HistoryLogReport(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.misreportforPDF = response.entity.list;
        this.PrepareExcelData(this.misreportforPDF)
      }
    })
  }

  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "NAME OF USFD/PT M/C": data[i].param26,
        "START LOCATION": data[i].param18,
        "END LOCATION": data[i].param22,
        "ACTUAL START TIME": data[i].param6,
        "ACTUA END TIME": data[i].param7,
        "DISTANCE": data[i].param8,
        "RUNNING": data[i].param9,
        "IDLE": data[i].param10,
        "STOPPAGE": data[i].param11,
        "NO. OF IDLE": data[i].param12,
        "AVG": data[i].param13,
        "MAX ": data[i].param14,
        "OVERSPEED": data[i].param15,
        "T. STOP": data[i].param16,
        "IDLE PAGE DETAILS ": data[i].param17,
      }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'MIS Report', 'MISreport');
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


  misReportPDFDownload() {
    var sTable = document.getElementById('misReportPDF').innerHTML;
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


}
