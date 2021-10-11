import { ExportToExcelService } from './../../services/export-to-excel.service';
import { PostService } from './../../../../../post.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CryptService } from './../../services/crypt.service';
import { Router } from '@angular/router';
import { ListService } from './../../../../../list.service';
import { ReportService } from './../../services/report.service';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { routerTransition } from 'src/app/router.animations';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import '../../../../../assets/timepicker/wickedpicker.js';


declare var $: any;
// import '../../../../../assets/timepicker/wickedpicker.js'
import '../../../../../assets/timepicki/js/timepicki.js'
import '../../../../../assets/timepicki/css/timepicki.css'
import * as $ from 'jquery'


import * as moment from 'moment';
declare var $: any;
import * as xlsx from 'xlsx';
import { HistoryService } from 'src/mapservices/history.service';
import { PdfService } from '../../services/pdf.service';

declare var PopupInitialize: any;
declare var mapBuild: any;
declare var SwitchMap: any;
declare var container: any;
declare var content: any;
declare var closer: any;

declare var AddLoader: any;
declare var RemoveLoader: any;


//import * as $ from 'jquery';
declare var jQuery: any;
@Component({
  selector: 'app-working-report',
  templateUrl: './working-report.component.html',
  styleUrls: ['./working-report.component.css'],
  animations: [routerTransition()]

})
export class WorkingReportComponent implements OnInit {
  loginRoleId: any; isCustomer: boolean = false;
  vehiclesavailable: boolean = false;
  customerList: any[]; deviceList: any[];
  customerId: string; deviceIdArr: any[] = [];

  customerObj: any; deviceObj: any; customer: string = ''; device: string = ''; fromDate: string; toDate: string; StartTime: string; endTime: string;
  filter = '';

  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  viewData: boolean = false;
  itemsPerPage: number = 10;
  outputVisible: boolean = false;
  submitted: boolean = false;
  customerListArr = []; vehicleList = [];
  pageNumber: number = 1;

  historyData: any;
  emergencyCount = 0;
  harshbreakCount = 0;
  harshAccCount = 0;
  overspeedCount = 0;

  stopageCount = 0;
  ignitiononCount = 0;
  ignitionoffCount = 0;
  routeDeviationstartCount = 0;
  routeDeviationendCount = 0;
  bettaryLowCount = 0;
  tamperCount = 0;
  tripstartCount = 0;
  tripendCount = 0;
  locationAddress = [];
  tolocationAdd = [];

  encryptedpageNameValue: string; encryptedpageUrlValue: string
  pageUrl = this.router.url;

  maploadflag: any = 0;
  selectDateArray = [];

  // response output
  inputVisible: boolean = true;

  totalDistance: any = 0;  // summary1: " total distance",
  totalOdoDistance: any = 0; // summary2: "odometer distance",
  totalidletime: any = 0; // summary3: "total idle time",
  totalstoppagetime: any = 0; // summary4: "total stoppage time",
  totalworkingtime: any = 0; // summary5: "total working time",
  speedviolation: any = 0; // summary6: "speed voilation",
  maxspeed: any = 0;  // summery7: "max speed"
  totalcount: any = 0; // count: actual count,
  pagePerItem: any = 10; // viewCount: current showing list count
  reportResponseList = [];

  geofenceinCount: any;
  viewcount: any;

  config = {
    displayKey: "param2",
    // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '300px',
  };
  fromTime: any;
  toTime: any;
  reportResponseListForPDF: any;
  errorMessage: any;
  excelData: any[];
  deviceName: any;
  customerName: any;
  currentdate: string;
  ValueAlreadyGot: boolean = false;
  totalrecord: any = "NA";
  avgspeed: any;
  d: Date;
  key: any;
  reverse: boolean = true;
  pdfData: any[];
  constructor(private pdfservice: PdfService, private historyservice: HistoryService, private reportService: ReportService, private listService: ListService, private router: Router, private cryptService: CryptService, private excelservice: ExportToExcelService) {
    this.EncryptPageName(); this.EncryptPageUrl();

    this.loginRoleId = sessionStorage.getItem('rid');
    if (this.loginRoleId == 10 || this.loginRoleId == 11) {
      this.GetCustomerList();
      this.isCustomer = false;
    }
    else {
      this.GetVehicleList();
      this.customerId =''
      this.isCustomer = true;
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
        var start = moment().subtract(1, 'days');
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
          maxDate: new Date(),
          dateLimit: { days: 1 }

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
    this.cryptService.encrypt("working report")
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
      if (response.statuscode == 200) {
        this.customerListArr = response.entity.list;
      }
    })
  }


  GetVehicleListAfterCustomer() {
    this.deviceIdArr = []
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
    else if ((this.isCustomer == true) && (this.deviceIdArr == []|| this.deviceIdArr.length==0)) {
      this.submitted = true
    }
    else {
      this.submitted = false; this.ValueAlreadyGot = false; this.WorkingReport()
    }

  }

  WorkingReport() {
    let vehicledata = [];

    if (this.deviceList.length == this.deviceIdArr.length) { vehicledata = ['All'] }
    else { vehicledata = this.deviceIdArr }


    if (this.ValueAlreadyGot == true) {
      this.totalrecord = this.totalcount;
    }
    else { this.totalrecord = "NA"; }
    let dataL = {
      param1: this.customerId,
      selectvehicleid: vehicledata,// this.deviceIdArr,
      param3: this.fromDate,
      param4: this.fromTime,// "fromtime",
      param5: this.toDate,// "todate",
      param6: this.toTime,//"totime",
      divisionList: [],// "divisionid[]",
      subDivisionList: [],// "subdivisionid[]",
      dpartmentList: [],// "departmentid[]",
      groupList: [],// "groupid[]",
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "running",
      totalRecords: this.totalrecord,
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (err) { }

    this.reportService.railVehiclesummaryReport(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (err) { }

      if (response.statuscode == 200) {
        this.locationAddress = []; this.tolocationAdd = [];

        this.reportResponseList = response.entity;
        this.viewcount = this.reportResponseList.length;
        document.getElementById("inputform").style.display = "none";
        document.getElementById("outputform").style.display = "block";

        if (this.ValueAlreadyGot == false) {
          this.totalcount = response.count;
          this.totalDistance = response.totaldistance;
          this.totalworkingtime = response.totalworkingtime;
          this.overspeedCount = response.overspeedcount;
          this.maxspeed = response.maxspeed;
        }
      }
      else {
        this.errorMessage = response.entity;
        $("#ErrorModal").modal('show');
      }

    })
  }


  Refreshfunction() {
    this.ValueAlreadyGot = false;
    this.itemsPerPage = 10;
    this.pageNumber = 1;
    this.filter = ''
    this.WorkingReport();
  }
  searchdata() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1;
    this.WorkingReport();
  }


  pageChanged(event) {
    this.ValueAlreadyGot = true;
    this.pageNumber = event;
    this.WorkingReport()
  }

  changeItemsPerPage() {
    this.ValueAlreadyGot = true;
    this.pageNumber = 1;
    this.WorkingReport();
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  workingReportForExcel() {
    let dataL = {
      pageNo: "",
      itemsPerPage: "",
      searchBy: "",
      searchType: "running",
      totalRecords: "NA",
      param1: this.customerId,
      selectvehicleid: this.deviceIdArr,// this.deviceIdArr,
      param3: this.fromDate,
      param4: this.fromTime,// "fromtime",
      param5: this.toDate,// "todate",
      param6: this.toTime,//"totime",
      divisionList: [],// "divisionid[]",
      subDivisionList: [],// "subdivisionid[]",
      dpartmentList: [],// "departmentid[]",
      groupList: [],// "groupid[]",
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.reportService.railVehiclesummaryReport(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.reportResponseListForPDF = response.entity;
        this.preparePDFData(this.reportResponseListForPDF)
      }
    })
  }

  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "VEHICLE NUMBER": data[i].param4,
        "START DATE": data[i].param14,
        "END DATE": data[i].param16,
        "DISTANCE": data[i].param18,
        "DURATION": data[i].param22,
        "STATUS TYPE": data[i].param17,
        "MAX SPEED": data[i].param20,
      }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'Working Report', 'workingreport');
  }


  workingReportForPDF() {
    let dataL = {
      pageNo: "",
      itemsPerPage: "",
      searchBy: "",
      searchType: "running",
      totalRecords: "NA",
      param1: this.customerId,
      selectvehicleid: this.deviceIdArr,// this.deviceIdArr,
      param3: this.fromDate,
      param4: this.fromTime,// "fromtime",
      param5: this.toDate,// "todate",
      param6: this.toTime,//"totime",
      divisionList: [],// "divisionid[]",
      subDivisionList: [],// "subdivisionid[]",
      dpartmentList: [],// "departmentid[]",
      groupList: [],// "groupid[]",
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.reportService.railVehiclesummaryReport(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.reportResponseListForPDF = response.entity;
        this.preparePDFData(this.reportResponseListForPDF)
      }
    })
  }
  
  preparePDFData(data) {
    this.pdfData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "VEHICLE NUMBER": data[i].param4,
        "START DATE": data[i].param14,
        "END DATE": data[i].param16,
        "DISTANCE": data[i].param18,
        "DURATION": data[i].param22,
        "STATUS TYPE": data[i].param17,
        "MAX SPEED": data[i].param20,
      }
      this.pdfData.push(obj);
    }
    this.exportToPDF()
  }

  exportToPDF() {
    this.pdfservice.CreatePDFData(this.pdfData, 'Working Report');
  }
  gotoBack() {
 
    this.customerId = null; this.deviceIdArr = []; this.fromDate = ''; this.toDate = ''; this.fromTime = "00:00"; this.toTime = "23:59";

    (document.getElementById('fromTime') as HTMLInputElement).value = "00:00";
    (document.getElementById('toTime') as HTMLInputElement).value = "23:59";
 
    document.getElementById("inputform").style.display = "block";
    document.getElementById("outputform").style.display = "none";
    this.ngOnInit();
  }



  pdfdownload() {
    var sTable = document.getElementById('workingreportPDF').innerHTML;
    var style = "<style>";
    style = style + "table {width: 100%;font: 14px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + ".center{display: inline-block;width: 135px;border: 3px solid #73AD21;color: black;margin: 0px 2% 0 2%;border-radius: 5px;}";

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

  viewtolocation(data) {
    let dataL = {
      param1: data.param9,    //lattitude
      param2: data.param8,    //longitude
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.reportService.getlocation(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        let locaAddr = response.entity.list[0];
        $('#tobeforeapi' + data.rowNumber).hide(); $('#afterApito' + data.rowNumber).show();
        this.tolocationAdd[data.rowNumber] = locaAddr.param1;
      }
      else {
        console.log(response)
      }
    })
  }
  viewfromlocation(data) {
    let dataL = {
      param1: data.param7,    //lattitude
      param2: data.param6,    //longitude
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.reportService.getlocation(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        let locaAddr = response.entity.list[0];
        $('#frombeforeapi' + data.rowNumber).hide(); $('#afterapi' + data.rowNumber).show();
        this.locationAddress[data.rowNumber] = locaAddr.param1;
      }
      else {
        console.log(response)
      }
    })
  }


  //===========================================================================================MapFunctionality    

  // Developer : Tafseer Khan
  // Date : 04-12-2020
  // Description : Functionalitiy For Map With History Track





  Openmap(data) {
    let data1 = data.param14;
    let fromDateTimeArray = [];
    fromDateTimeArray = data1.split(' ');
    let fromDate = fromDateTimeArray[0]; let fromTime = fromDateTimeArray[1] + " " + fromDateTimeArray[2];
    let data2 = data.param16;
    let toDateTimeArray = [];
    toDateTimeArray = data2.split(' ');
    let toDate = toDateTimeArray[0];
    let toTime = toDateTimeArray[1] + " " + toDateTimeArray[2];
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

    // this.historyservice.HistoryPlot(data.param3, data.param4, this.historyData.fromdate, this.historyData.fromtime, this.historyData.todate, this.historyData.totime, '0', '0', '5', staticdetails);
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
