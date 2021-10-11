import { ExportToExcelService } from './../../services/export-to-excel.service';
import { ListService } from './../../../../../list.service';
import { ReportService } from './../../services/report.service';
import { CryptService } from './../../services/crypt.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var $: any;
import '../../../../../assets/timepicki/js/timepicki.js';
import '../../../../../assets/timepicki/css/timepicki.css';
import * as $ from 'jquery';
declare var jQuery: any;

import '../../../../../assets/vendor/daterangepicker-master/daterangepicker.js';
import '../../../../../assets/vendor/daterangepicker-master/moment.min.js';
import * as moment from 'moment';

import * as xlsx from 'xlsx';
import { HistoryService } from 'src/mapservices/history.service';
import { ReplaySubject } from 'rxjs';
// import { BnNgIdleService } from 'bn-ng-idle';


declare var AddLoader: any;
declare var RemoveLoader: any;
declare var PopupInitialize: any;
declare var mapBuild: any;
declare var SwitchMap: any;
declare var container: any;
declare var content: any;
declare var closer: any;


@Component({
  selector: 'app-trip-report',
  templateUrl: './trip-report.component.html',
  styleUrls: ['./trip-report.component.css']
})
export class TripReportComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  loginRoleId: any; isCustomer: boolean = false;
  fromTime; toTime;

  customerList: any[]; deviceList: any[];
  customerId: string; deviceIdArr: any[] = [];

  maploadflag: any;
  historyData: any;


  customerObj: any; deviceObjArr: any[]; customer: string = '';  fromDate: string; toDate: string; StartTime: string; endTime: string;

  count: number;
  customerListArray = [];
  vehicleList = [];

  submitted: boolean = false;

  encryptedpageNameValue: string; encryptedpageUrlValue: string
  pageUrl = this.router.url;
  selectDateArray: string[];

  pageNumber: number = 1; itemsPerPage: number = 10;
  responseGridArray = [];
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
  ValueAlreadyGot: boolean = false;
  totalrecord: any;
  d: Date;
  key: any;
  reverse: boolean=true;
  constructor(private router: Router, private listService: ListService, private historyservice: HistoryService, private cryptService: CryptService, private reportService: ReportService, private excelservice: ExportToExcelService) {
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
    this.cryptService.encrypt("trip report")
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
    this.deviceIdArr=[];
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
      this.submitted = false; this.ValueAlreadyGot = false; this.GetTripReport()
    }
  }


  
  GetTripReport() {
    let vehicledata = [];
    if (this.deviceList.length == this.deviceIdArr.length) { vehicledata = ['All'] }
    else { vehicledata = this.deviceIdArr }

    if (this.ValueAlreadyGot == true) {
      this.totalrecord = this.totalcount;
    }
    else { this.totalrecord = "NA" }
 
    let dataL = {
      param1:this.customerId,// "selectcustomerid-->ALL/ID",
      selectvehicleid:vehicledata,// "selectvehicleid[]",
      param3:this.fromDate,// "fromdate",
      param4:this.fromTime,// "fromtime",
      param5: this.toDate,// "todate",
      param6:this.toTime,// "totime",
      divisionList: [],// "divisionid[]",
      subDivisionList:[],// "subdivisionid[]",
      dpartmentList:[],// "departmentid[]",
      groupList:[],// "groupid[]",
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: this.totalrecord ,
      pageID: "7",
      pageName:this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue

    }
    AddLoader()
    this.reportService.TripReportv1(dataL).subscribe((response) => {
      RemoveLoader();
      if (response.statuscode == 200) {
        this.responseGridArray = response.entity
      }
      else {
        this.errorMessage = response.entity;
        $("#ErrorModal").modal('show');
      }
    })
  }
 
  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "Vehicle No.": data[i].param10,
        "Start point.": data[i].param17,
        "Start Time": data[i].param5,
        "End Point": data[i].param24,
        "End Time": data[i].param6,
        "Duration": data[i].param9,
        "Distance": data[i].param7,
        "Total Stoppage": data[i].param8,
        "Customer Name": data[i].param13,
        "Mobile Number": data[i].param15,
      }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'Trip Report', 'tripreport');
  }

  searchdata() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1;
    this.GetTripReport()
  }

  Refreshfunction() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1;
    this.itemsPerPage = 10; this.filter = ''
    this.GetTripReport()
  }

  pageChanged(event) {
    this.pageNumber = event;
    this.GetTripReport();
  }

  changeItemsPerPage() {
    this.ValueAlreadyGot = true;
    this.pageNumber = 1;
    this.GetTripReport();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  gotoBack() {
   
    (document.getElementById('fromTime') as HTMLInputElement).value = "00:00";
    (document.getElementById('toTime') as HTMLInputElement).value = "23:59";
    this.customerId = null; this.deviceIdArr = []; this.fromDate = ""; this.toDate = ""; this.fromTime = ""; this.toTime = "";


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

  trolleyReportPDFDownload() {
    var sTable = document.getElementById('tripreportPDF').innerHTML;
    var style = "<style>";
    style = style + "table {width: 100%;font: 13px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";

    // CREATE A WINDOW OBJECT.
    var win = window.open('', '', 'height=700,width=700');

    win.document.write('<html><head>');
    win.document.write('<title>Trip Report</title>');   // <title> FOR PDF HEADER.
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

    // this.historyservice.HistoryPlot(data.param2, data.param2, this.historyData.fromdate, this.historyData.fromtime, this.historyData.todate, this.historyData.totime, '0', '0', '5', staticdetails);
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
