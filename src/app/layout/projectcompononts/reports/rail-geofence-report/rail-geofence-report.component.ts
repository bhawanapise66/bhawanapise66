import { ExportToExcelService } from './../../services/export-to-excel.service';
import { PostService } from './../../../../../post.service';
import { CryptService } from './../../services/crypt.service';
import { Router } from '@angular/router';
import { ListService } from 'src/list.service';
import { HistoryService } from './../../../../../mapservices/history.service';
import { ReportService } from './../../services/report.service';
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
  selector: 'app-rail-geofence-report',
  templateUrl: './rail-geofence-report.component.html',
  styleUrls: ['./rail-geofence-report.component.css']
})
export class RailGeofenceReportComponent implements OnInit {
  loginRoleId: string;


  customerList: any[]; divisionList: any[]; subDivisionlist: any[]; sectionList: any[]; groupList: any[]; deviceList: any[];
  customerId: string; divisionIdArr: any[] = []; subdivisionIdArr: any[] = []; sectionIdArr: any[] = []; groupIdArr: any[] = []; deviceIdArr: any[] = [];

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
  totalGeofenceTime; totalGeoIn; totalGeoOut
  reportGrid: any;
  reportGridForPDF: any;
  key: any;
  reverse: boolean = true;
  pdfData: any[];


  constructor(private excelservice: ExportToExcelService, private pdfService: PdfService, private router: Router, private listService: ListService, private cryptService: CryptService, private historyservice: HistoryService, private reportService: ReportService) {
    this.EncryptPageName(); this.EncryptPageUrl();
    this.loginRoleId = sessionStorage.getItem('rid');

    if (this.loginRoleId == '10' || this.loginRoleId == '11'|| this.loginRoleId == '16'|| this.loginRoleId == '21') {
      this.getCustomerList(); this.isCustomer = false;
    }
    else if (this.loginRoleId == "18") { this.isCustomer = true; this.customerId = ''; this.getGroupList(); this.getDivisionList() }

    if (this.loginRoleId == "25") {
      this.customerId = ''; this.isSubDivision = true; this.divisionIdArr = []; this.getDeptList();
    }
    if (this.loginRoleId == "24") {
      this.customerId = ''; this.isDivision = true; this.getSubDivisionList()
    }
    if (this.loginRoleId == "22") {
      this.customerId = ''; this.getGroupList(); this.isSection = true;
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
    this.cryptService.encrypt("keyman_patrolman Report")
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


  getDivisionList() {
    this.divisionIdArr = []; this.subdivisionIdArr = []; this.sectionIdArr = []; this.groupIdArr = []; this.deviceIdArr = []

    let dataL = {
      param1: this.customerId,
      groupList: [],//groupid[], 
      "pageID": "",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    AddLoader()
    this.listService.divisionlistv1(dataL).subscribe((response) => {
      RemoveLoader()
      this.divisionList = response.entity
    })


  }
  changeDivision() {
    this.subdivisionIdArr = []; this.sectionIdArr = []; this.groupIdArr = []; this.deviceIdArr = []; this.divisionChanged = true
  }
  getSubDivisionList() {
    if (this.divisionChanged == true) {
      let dataL = {
        param1: this.customerId,// custumerid, 
        groupList: [],// this.groupIdArr,// groupid[], 
        divisionList: this.divisionIdArr,// divisionid[],
        "pageID": "rte",
        "pageName": this.encryptedpageNameValue,
        "pageURL": this.encryptedpageUrlValue
      }
      AddLoader()
      this.listService.subdivisionlistv1(dataL).subscribe((response) => {
        RemoveLoader()
        this.subDivisionlist = response.entity
      })
      this.divisionChanged = false;
    }
  }


  changeSubDiv() {
    this.sectionIdArr = [];
    this.groupIdArr = [];
    this.deviceIdArr = [];
    this.subdivChanged = true
  }
  getDeptList() {
    if (this.subdivChanged == true) {
      let dataL = {
        param1: this.customerId,
        groupList: [],// groupid[], 
        divisionList: this.divisionIdArr,// divisionid[],
        subDivisionList: this.subdivisionIdArr,// subdivisionid[],
        "pageID": "",
        "pageName": this.encryptedpageNameValue,
        "pageURL": this.encryptedpageUrlValue
      }
      AddLoader()
      this.listService.departmentlistv1(dataL).subscribe((response) => {
        RemoveLoader();
        this.sectionList = response.entity;
      })
      this.subdivChanged = false
    }
  }

  changeSection() {
    this.groupIdArr = []; this.sectionChanged = true;
  }

  getGroupList() {
    if (this.sectionChanged == true) {

      let dataL = {
        param1: this.customerId,
        "pageID": "wegw",
        "pageName": this.encryptedpageNameValue,
        "pageURL": this.encryptedpageUrlValue
      }
      AddLoader()
      this.listService.grouplist(dataL).subscribe(response => {
        RemoveLoader()
        this.groupList = response.entity;
      })
      this.sectionChanged = false
    }
  }

  setdevicelist() {
    this.deviceIdArr = []
  }
  GetVehicleListAfterCustomer() {
    let dataL = {
      param1: this.customerId,
      groupList: this.groupIdArr,
      divisionList: this.divisionIdArr,
      subDivisionList: this.subdivisionIdArr,
      dpartmentList: this.sectionIdArr,
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

    if (this.loginRoleId == "10" || this.loginRoleId == "11") {
      if (this.customerId == '' || this.divisionIdArr.length == 0 || this.subdivisionIdArr.length == 0 || this.sectionIdArr.length == 0 || this.groupIdArr.length == 0 || this.deviceIdArr.length == 0) {
        this.submitted = true
      }
      else { this.getGeofenceReport() }
    }
    else if (this.isCustomer == true) {
      this.customerId='';
      if (this.divisionIdArr.length == 0 || this.subdivisionIdArr.length == 0 || this.sectionIdArr.length == 0 || this.groupIdArr.length == 0 || this.deviceIdArr.length == 0) {
        this.submitted = true
      }
      else { this.getGeofenceReport() }
    }

    else if (this.isDivision == true) {
      this.customerId='';
      if (this.subdivisionIdArr.length == 0 || this.sectionIdArr.length == 0 || this.groupIdArr.length == 0 || this.deviceIdArr.length == 0) {
        this.submitted = true
      }
      else { this.getGeofenceReport() }
    }
    else if (this.isSubDivision == true) {
      this.customerId='';
      if (this.sectionIdArr.length == 0 || this.groupIdArr.length == 0 || this.deviceIdArr.length == 0) {
        this.submitted = true
      }
      else { this.getGeofenceReport() }
    } else if (this.isSection == true) {
      this.customerId='';
      if (this.groupIdArr.length == 0 || this.deviceIdArr.length == 0) {
        this.submitted = true
      }
      else { this.getGeofenceReport() }
    }
  }

  getGeofenceReport() {
    let vehicledata = [];

    if (this.deviceList.length == this.deviceIdArr.length) {
      vehicledata = ["All"]
    }
    else {
      vehicledata = this.deviceIdArr
    }
    let dataL = {
      param1: this.customerId,// "selectcustomerIdid-->ALL/ID",
      selectvehicleid: vehicledata,// "selectvehicleid[]",
      param3: this.fromDate,// "fromdate",
      param4: this.fromTime,// "fromtime",
      param5: this.toDate,// "todate",
      param6: this.toTime,// "totime",
      divisionList: this.divisionIdArr,// "divisionid[]",
      subDivisionList: this.subdivisionIdArr,// "subdivisionid[]",
      dpartmentList: this.sectionIdArr,// "departmentid[]",
      groupList: this.groupIdArr,// "groupid[]",
      param15: "All",// "selectpoiid-->ALL/ID",
      pageNo: this.pageNumber,//,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: this.totalrecord,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    AddLoader()
    this.reportService.GeofenceReportV1(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {

        this.reportGrid = response.entity;
        this.viewcount = this.reportGrid.length;
        if (this.ValueAlreadyGot == false) {
          this.totalcount = response.count
          this.totalGeoIn = response.totalgeofencein;
          this.totalGeoOut = response.totalgeofenceout;
          this.totalGeofenceTime = response.totaltimeingeofence;
        }
        document.getElementById('inputform').style.display = 'none';
        document.getElementById('outputform').style.display = 'block'
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
    this.getGeofenceReport();
  }
  changeItemsPerPage() {
    this.pageNumber = 1;
    this.getGeofenceReport();
  }
  searchdata() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1;
    this.getGeofenceReport();
  }

  Refreshfunction() {
    this.ValueAlreadyGot = false;
    this.itemsPerPage = 10;
    this.pageNumber = 1;
    this.filter = ''

    this.getGeofenceReport();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }



  gotoBack() {

    (document.getElementById('fromTime') as HTMLInputElement).value = "00:00";
    (document.getElementById('toTime') as HTMLInputElement).value = "23:59";
    this.customerId = null; this.divisionIdArr = []; this.subdivisionIdArr = []; this.sectionIdArr = [];
    this.groupIdArr = []; this.deviceIdArr = []; this.deviceIdArr = []

    document.getElementById("inputform").style.display = "block";
    document.getElementById("outputform").style.display = "none";

    this.ngOnInit();
  }

  // exportToExcel() {
  //   const ws: xlsx.WorkSheet =
  //     xlsx.utils.table_to_sheet(this.epltable.nativeElement);
  //   const wb: xlsx.WorkBook = xlsx.utils.book_new();
  //   xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   xlsx.writeFile(wb, 'Geofence In-Out Report.xlsx');
  // }


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
        "POI TYPE": data[i].param24,
        "IN TIME": data[i].param6,
        "OUT TIME": data[i].param9,
        "DURATION": data[i].param15,

      }
      this.excelData.push(obj);
    }
    this.exportToExcel();
  }

  exportToExcel() {
 //   this.excelReport();
   
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
    let fromDate = fromDateTimeArray[0]; let fromTime = fromDateTimeArray[1]
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
