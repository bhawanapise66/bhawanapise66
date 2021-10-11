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

declare var AddLoader: any;
declare var RemoveLoader: any;
declare var container: any;
declare var content: any;
declare var closer: any;

@Component({
  selector: 'app-e-permit-report',
  templateUrl: './e-permit-report.component.html',
  styleUrls: ['./e-permit-report.component.css']
})
export class EPermitReportComponent implements OnInit {
  customerList: any[]; deviceList: any[];
  customerId: string; deviceIdArr: any[] = [];


  customerObj: any; deviceObj: any; customer: string = ''; device: string = ''; fromDate: string; toDate: string; StartTime: string; endTime: string;
  customerName: string; deviceName: any;
  isCustomer: boolean = false;

  inputVisible: boolean = true; filter = '';
  totalrecord: any = "NA";

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
    // if objects array passed which key to be displayed defaults to description
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
  totalMaxSpeed: any;
  overspeed: any;
  avgspeed: any;
  ValueAlreadyGot: boolean = false;
  d: Date;
  key: any;
  reverse: boolean = true;
  constructor(private pdfservice: PdfService, private excelservice: ExportToExcelService, private reportService: ReportService, private historyservice: HistoryService, private listService: ListService, private cryptService: CryptService, private router: Router, private postService: PostService) {
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
      this.getVehicleList();

    }
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
    this.cryptService.encrypt("e permit report")
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
      this.submitted = false; this.ValueAlreadyGot = false; this.GetEPermitReport()
    }

  }

  GetEPermitReport() {
    if (this.ValueAlreadyGot == true) {
      this.totalrecord = this.totalcount;
    }
    else {
      this.totalrecord = "NA";
    }
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
      "param15": "ALL",
      "pageNo": this.pageNumber,
      "itemsPerPage": this.itemsPerPage,
      "searchBy": this.filter,
      "searchType": "",
      "totalRecords": this.totalrecord,
      "pageID": "7",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (err) { alert(err) }

    this.reportService.EPermitReport1(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (err) { }
      if (response.statuscode == 200) {
        this.responseGridArray = response.entity;
        this.viewcount = response.entity.length;

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
    })
  }

  pageChange(event) {
    this.ValueAlreadyGot = true;
    this.pageNumber = event;
    this.GetEPermitReport();
  }

  searchdata() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1
    this.GetEPermitReport();
  }

  changeItemsPerPage() {
    this.ValueAlreadyGot = true;
    this.pageNumber = 1
    this.GetEPermitReport();
  }

  Refreshfunction() {
    this.ValueAlreadyGot = false;
    this.itemsPerPage = 10;
    this.pageNumber = 1;
    this.filter = '';
    this.GetEPermitReport();
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  GetEPermitReportforPdf() {
    let dataL = {
      "param1": this.customerId,
      "selectvehicleid": this.deviceIdArr,
      "param3": this.fromDate,
      "param4": this.toDate,
      "param5": this.fromTime,
      "param6": this.toTime,
      "divisionList": [],
      "subDivisionList": [],
      "dpartmentList": [],
      "groupList": [],
      "param15": "ALL",
      "pageNo": "",
      "itemsPerPage": "",
      "searchBy": this.filter,
      "searchType": "",
      "totalRecords": "NA",
      "pageID": "7",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (err) { }
    this.reportService.EPermitReport(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.responseGridArrayForPdf = response.entity.responsedatalist;
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
        "Vehicle Number": data[i].param9,
        "Extend Time ": data[i].param7,
        "Name": data[i].param3,
        "Mobile Number ": data[i].param4,
        "Remark": data[i].param5,
        "Verified Status": data[i].param8,
        //  "Moobilize track": data[i].param8,

      }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'Distance travelled Report', 'distancereavelledreport');
  }

  exportToPdf() {
    this.pdfservice.CreatePDFData(this.excelData, 'Distance Travelled Report')
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


  CloseCollapse() {

    $('#collapseExample').collapse('hide');
  }

  
  OpenCollapse() {
    $("#mapswitcher").collapse('show');

  }

  

}
