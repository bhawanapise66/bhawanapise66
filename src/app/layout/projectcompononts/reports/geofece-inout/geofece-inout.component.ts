import { HistoryService } from './../../../../../mapservices/history.service';
import { ExportToExcelService } from './../../services/export-to-excel.service';
// import { BnNgIdleService } from 'bn-ng-idle';
import { PostService } from './../../../../../post.service';
import { CryptService } from './../../services/crypt.service';
import { Router } from '@angular/router';
import { ListService } from './../../../../../list.service';
import { ReportService } from './../../services/report.service';
// developer : dhammadeep dahiwale
// date  : 28-sep 2020

declare var $: any;
// import '../../../../../assets/timepicker/wickedpicker.js'
import '../../../../../assets/timepicki/js/timepicki.js'
import '../../../../../assets/timepicki/css/timepicki.css'
import * as $ from 'jquery'


import { routerTransition } from 'src/app/router.animations';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';

declare var jQuery: any;
import * as xlsx from 'xlsx';
import { PdfService } from '../../services/pdf.service';


declare var PopupInitialize: any;
declare var mapBuild: any;
declare var SwitchMap: any;



declare var container: any;
declare var content: any;
declare var closer: any;



declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-geofece-inout',
  templateUrl: './geofece-inout.component.html',
  styleUrls: ['./geofece-inout.component.css'],
  animations: [routerTransition()]

})
export class GeofeceInoutComponent implements OnInit {
  isCustomer = false; loginRoleId;
  inputVisible: boolean = true; outputVisible: boolean = false;

  customerList: any[]; deviceList: any[];
  customerId: string; deviceIdArr: any[] = [];

  customerObj: any; deviceObj: any; device: any; customer: string = ''; fromDate: string; toDate: string; StartTime: string; endTime: string;

  isSubDivision: boolean = false;
  isDivision: boolean = false;
  isSection: boolean = false;

  filter = '';

  submitted = false;
  vehicleList = [];
  encryptedpageNameValue: string; encryptedpageUrlValue: string
  pageUrl = this.router.url;

  selectDateArray = [];
  pageNumber: number = 1; itemsPerPage: any = 10

  reportGridArray = [];

  maploadflag: any = 0;
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
  geofenceinCount: any;


  vehiclesavailable: boolean = false;
  viewcount: any;
  totalcount: any;


  vehicleId: any;
  reportGrid: any[];

  config = {
    displayKey: "param2",
    search: true,
    limitTo: 5000,
    height: '300px',
  };
  toTime: any;
  fromTime: any;
  reportGridForPDF: any;
  totalOdometerDistance: any;
  errorMessage: any;
  excelData: any[];
  deviceName: any;
  customerName: any;
  currentdate: string;
  ValueAlreadyGot: boolean = false;
  totalrecord: any = "NA";
  totalGeofenceTime: any;
  totalGeoIn: any;
  totalGeoOut: any;
  d: Date;
  key: any;
  reverse: boolean = true;
  pdfData: any[];
  constructor(private reportService: ReportService, private historyservice: HistoryService, private listService: ListService, private router: Router, private cryptService: CryptService, private pdfService: PdfService, private excelservice: ExportToExcelService) {
    this.EncryptPageName(); this.EncryptPageUrl();

    this.loginRoleId = sessionStorage.getItem('rid');
    if (this.loginRoleId == '10' || this.loginRoleId == '11') {
      this.isCustomer = false;
      this.GetCustomerList();
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
          // $('#daterangeadminux2 span').html(start.format('MMM D, YY') + ' - ' + end.format('MMM D, YY'));
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
    this.cryptService.encrypt("geofence-inout-report")
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


    this.d = new Date();



    this.fromTime = $('#fromTime').val();
    this.toTime = $('#toTime').val();

    if ((this.isCustomer == false) && (this.customerId == null || this.customerId == '' || this.deviceIdArr == [])) {
      this.submitted = true;
    }
    else if ((this.isCustomer == true) && (this.deviceIdArr == [])) {
      this.submitted = true
    }
    else {
      this.submitted = false; this.ValueAlreadyGot = false; this.GetGeofenceReport()
    }
  }


  GetGeofenceReport() {

    if (this.isCustomer == true) { this.customerId = '' }
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
      "param15": "ALL",
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

    this.reportService.GeofenceReportV1(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (err) { }
      if (response.statuscode == 200) {
        this.reportGrid = response.entity;
        this.viewcount = this.reportGrid.length
        document.getElementById('inputform').style.display = 'none';
        document.getElementById('outputform').style.display = 'block'

        if (this.ValueAlreadyGot == false) {
          this.totalcount = response.count;
          this.totalGeoIn = response.totalgeofencein;
          this.totalGeoOut = response.totalgeofenceout;
          this.totalGeofenceTime = response.totaltimeingeofence;
        }
      }
      else {
        this.errorMessage = response.entity;
        $("#ErrorModal1").modal('show')
      }
    })
  }


  changePage(event) {
    this.pageNumber = event;
    this.ValueAlreadyGot = true;
    this.GetGeofenceReport();
  }

  searchdata() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1;
    this.GetGeofenceReport();
  }

  Refreshfunction() {
    this.ValueAlreadyGot = false;
    this.itemsPerPage = 10;
    this.pageNumber = 1;
    this.filter = ''

    this.GetGeofenceReport();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  excelReport() {
    let dataL = {
      "param1": this.customerId,
      "selectvehicleid": this.deviceIdArr,
      "param3": this.fromDate,
      "param4": this.fromTime,
      "param5": this.toDate,
      "param6": this.toTime,
      "param15": "ALL",
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
    this.reportService.GeofenceReportV1(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        this.reportGridForPDF = response.entity;
        this.PrepareExcelData(this.reportGridForPDF)
      }
    })
  }

  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "VEHICLE NUMBER": data[i].param16,
        "POI NAME": data[i].param18,
        "POI TYPE": data[i].param23,
        "IN TIME": data[i].param6,
        "OUT TIME": data[i].param9,
        "DURATION": data[i].param15,
      }
      this.excelData.push(obj);
    }
    this.exportToExcel()
  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'Geofence In Out Report', 'geofencereport');
  }

  pdfReport() {
    let dataL = {
      "param1": this.customerId,
      "selectvehicleid": this.deviceIdArr,
      "param3": this.fromDate,
      "param4": this.fromTime,
      "param5": this.toDate,
      "param6": this.toTime,
      "param15": "ALL",
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
    this.reportService.GeofenceReportV1(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        let pdfdata = response.entity;
        this.PreparePdfData(pdfdata)
      }
    })
  }

  PreparePdfData(data) {
    this.pdfData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "VEHICLE NUMBER": data[i].param16,
        "POI NAME": data[i].param23,
        "POI TYPE": data[i].param24,
        "IN TIME": data[i].param6,
        "OUT TIME": data[i].param9,
        "DURATION": data[i].param15,

      }
      this.pdfData.push(obj);
    }
    this.exportToPDF()
  }

  exportToPDF() {
    this.pdfService.CreatePDFData(this.pdfData, 'Geofence In Out Report',);
  }

  gotoBack() {

    (document.getElementById('fromTime') as HTMLInputElement).value = "00:00";
    (document.getElementById('toTime') as HTMLInputElement).value = "23:59";
    this.customerId = null; this.deviceIdArr = []; this.fromDate = ''; this.toDate = ''; this.fromTime = "00:00"; this.toTime = "23:59";

    document.getElementById("inputform").style.display = "block";
    document.getElementById("outputform").style.display = "none";

    this.ngOnInit();
  }


  //===========================================================================================MapFunctionality    

  // Developer : Tafseer Khan
  // Date : 04-12-2020
  // Description : Functionalitiy For Map With History Track
  // Developer : Tafseer Khan
  // Date : 04-12-2020
  // Description : Functionalitiy For Map With History Track




  Openmap(data) {
    let data1 = data.param6;
    let fromDateTimeArray = [];
    fromDateTimeArray = data1.split(' ');
    let fromDate = fromDateTimeArray[0];
    let fromTime = fromDateTimeArray[1]

    let data2 = data.param9;
    let toDateTimeArray = [];
    toDateTimeArray = data2.split(' ');
    let toDate = toDateTimeArray[0]; let toTime = toDateTimeArray[1]

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
