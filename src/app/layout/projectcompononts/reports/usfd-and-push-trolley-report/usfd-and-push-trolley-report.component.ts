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

declare var PopupInitialize: any;
declare var mapBuild: any;
declare var SwitchMap: any;

declare var mapBuild: any;
declare var container: any;
declare var content: any;
declare var closer: any;




@Component({
  selector: 'app-usfd-and-push-trolley-report',
  templateUrl: './usfd-and-push-trolley-report.component.html',
  styleUrls: ['./usfd-and-push-trolley-report.component.css']
})
export class USFDAndPushTrolleyReportComponent implements OnInit {
  loginRoleId: string;


  customerList: any[]; divisionList: any[]; subDivisionlist: any[]; sectionList: any[]; groupList: any[]; deviceList: any[];
  customerId: string; divisionIdArr: any[] = []; subdivisionIdArr: any[] = []; sectionIdArr: any[] = []; groupIdArr: any[] = []; deviceIdArr: any[] = [];

  isCustomer: boolean = false; isDivision: boolean = false; isSubDivision: boolean = false; isSection: boolean = false;

  encryptedpageNameValue: any; encryptedpageUrlValue: any;
  pageUrl: any = this.router.url;
  selectDateArray: string[]; fromDate: string; toDate: string; fromTime: any; toTime: any;
  d: Date; submitted: boolean = false;
  pageNumber: any = 1; itemsPerPage: any = 10; filter: any = ''; totalrecord: any = 'NA'; viewcount: any; totalcount: any;

  keymanReportArray: any; keymanReportArrayforPDF: any;

  errorMessage: string;
  excelData: any[];
  geofenceObj: any;
  maploadflag: number = 0;
  historyData: { fromdate: any; fromtime: string; todate: any; totime: string; };
  date: any;
  ValueAlreadyGot: boolean = false; divisionChanged: boolean = false; subdivChanged: boolean = false; sectionChanged: boolean = false;
  trolleyReportArray: any;
  trolleyReportArrayforPDF: any;
  key;
  reverse: boolean = true;
  pdfData: any[];

  
  // for poi table 
  geofencePageNumber: any = 1;
  geofenceItemsPerPage: any = 2;
  vehicleIdArrforPOI: any[] = [];
  startdatePOI: any;
  starttimePOI: string;
  enddatePOI: any;
  endtimePOI: string;
  TotalCountPOI: any;
  poifilter: string = '';
  poiViewCount: any;


  constructor(private pdfService:PdfService  , private excelservice: ExportToExcelService, private router: Router, private listService: ListService, private cryptService: CryptService, private historyservice: HistoryService, private reportService: ReportService) {
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
        var start = moment().subtract(29, 'days');
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
      else { this.GetPushTrolleyReport() }
    }
    else if (this.isCustomer == true) {
      this.customerId = '';
      if (this.divisionIdArr.length == 0 || this.subdivisionIdArr.length == 0 || this.sectionIdArr.length == 0 || this.groupIdArr.length == 0 || this.deviceIdArr.length == 0) {
        this.submitted = true
      }
      else { this.GetPushTrolleyReport() }
    }

    else if (this.isDivision == true) {
      this.customerId = '';
      if (this.subdivisionIdArr.length == 0 || this.sectionIdArr.length == 0 || this.groupIdArr.length == 0 || this.deviceIdArr.length == 0) {
        this.submitted = true
      }
      else { this.GetPushTrolleyReport() }
    }
    else if (this.isSubDivision == true) {
      this.customerId = '';
      if (this.sectionIdArr.length == 0 || this.groupIdArr.length == 0 || this.deviceIdArr.length == 0) {
        this.submitted = true
      }
      else { this.GetPushTrolleyReport() }
    } else if (this.isSection == true) {
      this.customerId = '';
      if (this.groupIdArr.length == 0 || this.deviceIdArr.length == 0) {
        this.submitted = true
      }
      else { this.GetPushTrolleyReport() }
    }
  }

  // GetPushTrolleyReport() {
  //   if (this.ValueAlreadyGot == true) {
  //     this.totalrecord = this.totalcount;
  //   }
  //   else {
  //     this.totalrecord = "NA";
  //   }
  //   let dataL = {
  //     pageNo: this.pageNumber,
  //     itemsPerPage: this.itemsPerPage,
  //     searchBy: this.filter,
  //     searchType: "",
  //     totalRecords: this.totalrecord,
  //     param1: this.customer,
  //     param2: this.device,
  //     param3: this.fromDate,
  //     param4: this.fromTime,
  //     param5: this.toDate,
  //     param6: this.toTime,
  //     param7: "All",
  //     pageID: "7",
  //     pageName: this.encryptedpageNameValue,
  //     pageURL: this.encryptedpageUrlValue
  //   }
  //   try { AddLoader() } catch (err) { }

  //   this.reportService.TrolleyReport(dataL).subscribe((response) => {
  //     if (response.statuscode == 200) {
  //       try { RemoveLoader() } catch (err) { }
  //       if (response.responseEntityCount == "1") {

  //         document.getElementById("inputform").style.display = "none";
  //         document.getElementById("outputform").style.display = "block";

  //         this.trolleyReportArray = response.entity.list;
  //         this.viewcount = response.entity.viewCount;
  //         this.DistanceSummery = response.entity.summary1
  //         this.IdleSummery = response.entity.summary2;
  //         this.stopSummery = response.entity.summary3;
  //         this.vehiclecount = response.entity.summary4;
  //         this.runningSummery = response.entity.summary5;
  //         if (this.ValueAlreadyGot == false) {
  //           this.totalcount = response.entity.count;
  //           this.GetPushTrolleyReportforPDF();
  //         }
  //       } else {
  //         this.errorMessage = response.entity;
  //         $("#ErrorModal").modal('show');
  //       }
  //     }

  //   })
  // }
  GetPushTrolleyReport() {
    let vehicledata = [];

    if (this.deviceList.length == this.deviceIdArr.length) { vehicledata = ['All'] }
    else { vehicledata = this.deviceIdArr }

    let dataL = {
      param1: this.customerId,// "selectcustomerid-->ALL/ID",
      deviceList: vehicledata,// "imeino/deviceid",
      param3: this.fromDate,// "fromdate",
      param4: this.fromTime,// "fromtime",
      param5: this.toDate,// "todate",
      param6: this.toTime,// "totime",
      divisionList: this.divisionIdArr,// "divisionid[]",
      subDivisionList: this.subdivisionIdArr,// "subdivisionid[]",
      dpartmentList: this.sectionIdArr,// "departmentid[]",
      groupList: this.groupIdArr,// "groupid[]",
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: this.totalrecord,
      pageID: "7r",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue,
      param15: "All"
    }
    AddLoader()
    this.reportService.RailTrolleyReport(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        this.trolleyReportArray = response.entity;
        this.viewcount = response.entity.length;
        if (this.ValueAlreadyGot == false) {
          this.totalcount = response.count;
        }
        document.getElementById('inputform').style.display = 'none';
        document.getElementById('outputform').style.display = 'block';
      }
      else {
        this.errorMessage = response.entity;
        $("#ErrorModal").modal('show')
      }
    })
  }



  reportExcel() {
    let dataL = {
      param1: this.customerId,// "selectcustomerid-->ALL/ID",
      deviceList: this.deviceIdArr,// "imeino/deviceid",
      param3: this.fromDate,// "fromdate",
      param4: this.fromTime,// "fromtime",
      param5: this.toDate,// "todate",
      param6: this.toTime,// "totime",
      divisionList: this.divisionIdArr,// "divisionid[]",
      subDivisionList: this.subdivisionIdArr,// "subdivisionid[]",
      dpartmentList: this.sectionIdArr,// "departmentid[]",
      groupList: this.groupIdArr,// "groupid[]",
      pageNo: "",
      itemsPerPage: "",
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7r",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue,
      param15: "All"
    }
    this.reportService.RailTrolleyReport(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.trolleyReportArrayforPDF = response.entity;
        this.PrepareExcelData(this.trolleyReportArrayforPDF)
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
    this.exportToExcel()
  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'Trolley Report', 'trolleyreport');
  }

  

  reportPdf() {
    let dataL = {
      param1: this.customerId,// "selectcustomerid-->ALL/ID",
      deviceList: this.deviceIdArr,// "imeino/deviceid",
      param3: this.fromDate,// "fromdate",
      param4: this.fromTime,// "fromtime",
      param5: this.toDate,// "todate",
      param6: this.toTime,// "totime",
      divisionList: this.divisionIdArr,// "divisionid[]",
      subDivisionList: this.subdivisionIdArr,// "subdivisionid[]",
      dpartmentList: this.sectionIdArr,// "departmentid[]",
      groupList: this.groupIdArr,// "groupid[]",
      pageNo: "",
      itemsPerPage: "",
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7r",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue,
      param15: "All"
    }
    AddLoader()
    this.reportService.RailTrolleyReport(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        this.trolleyReportArrayforPDF = response.entity;
        this.PreparePdfData(this.trolleyReportArrayforPDF)
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
    this.exportToPdf()
  }

  exportToPdf() {
    this.pdfService.CreatePDFData(this.pdfData, 'Trolley Report');
  }

  searchdata() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1;
    this.GetPushTrolleyReport()
  }

  pageChanged(event) {
    this.ValueAlreadyGot = true;
    this.pageNumber = event;
    this.GetPushTrolleyReport();
  }
  changeItemsPerPage() {
    this.ValueAlreadyGot = true;
    this.pageNumber = 1;
    this.GetPushTrolleyReport()
  }

  Refreshfunction() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1;
    this.itemsPerPage = 10; this.filter = ''
    this.GetPushTrolleyReport();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  gotoBack() {
    (document.getElementById('fromTime') as HTMLInputElement).value = "00:00";
    (document.getElementById('toTime') as HTMLInputElement).value = "23:59";

    this.customerId = null; this.divisionIdArr = []; this.subdivisionIdArr = []; this.sectionIdArr = []; this.groupIdArr = []; this.deviceIdArr = []

    document.getElementById("inputform").style.display = "block";
    document.getElementById("outputform").style.display = "none";

    this.ngOnInit();
  }

  getpoi(data) {
    this.geofenceObj = []
    this.geofenceItemsPerPage = 5;
    this.geofencePageNumber = 1;
    this.vehicleIdArrforPOI = []
    let vehicleid = data.param2;
    let decryptedvehicleId: any
    this.geofenceObj = null;
    let startdatetime = data.param6;
    let enddatetime = data.param7;
    let startDateTimeArray = [];
    let endDateTimeArray = [];
    startDateTimeArray = startdatetime.split(" ");
    endDateTimeArray = enddatetime.split(" ");
    this.startdatePOI = startDateTimeArray[0];
    this.starttimePOI = startDateTimeArray[1] + " " + startDateTimeArray[2]
    this.enddatePOI = endDateTimeArray[0];
    this.endtimePOI = endDateTimeArray[1] + " " + endDateTimeArray[2]
    this.reportService.decrypt(vehicleid).subscribe((response) => {
      decryptedvehicleId = response.entity.param1;
      console.log(decryptedvehicleId);
      this.vehicleIdArrforPOI.push(decryptedvehicleId)
      this.getPoiData()
    })


  }


getPoiData() {
  let georeqparam = {
    "param1": "",
    "selectvehicleid": this.vehicleIdArrforPOI,
    "param3": this.startdatePOI,
    "param4": this.starttimePOI,
    "param5": this.enddatePOI,
    "param6": this.endtimePOI,
    "param15": "ALL",
    "divisionList": [],
    "subDivisionList": [],
    "dpartmentList": [],
    "groupList": [],
    "pageNo": this.geofencePageNumber,
    "itemsPerPage": this.geofenceItemsPerPage,
    "searchBy": this.poifilter,
    "searchType": "",
    "totalRecords": "NA",
    "pageID": "7",
    "pageName": this.encryptedpageNameValue,
    "pageURL": this.encryptedpageUrlValue
  }
  AddLoader()
  this.reportService.GeofenceReportV1(georeqparam).subscribe((response) => {
    RemoveLoader()
    if (response.statuscode == 200) {
      this.geofenceObj = response.entity;
      this.TotalCountPOI = response.count;
      this.poiViewCount = response.entity.length;
      $("#poimodal").modal('show')
    }
    else {
      this.errorMessage = response.entity
      $("#ErrorModal").modal('show')
    }
  })
}


prevPage() {
  if (this.geofencePageNumber > 1) {
    this.geofencePageNumber = this.geofencePageNumber - 1
    this.getPoiData()
  }
}
nextPage() {
  if (this.geofencePageNumber ==1 || this.geofencePageNumber < (this.TotalCountPOI /this.poiViewCount)) {
    this.geofencePageNumber = this.geofencePageNumber + 1;
    this.getPoiData()
  }
}
searchPOI() {
  this.geofencePageNumber = 1;
  this.getPoiData()
}
changecountPOI() {
  this.geofencePageNumber = 1;
  this.getPoiData()
}
RefreshPoi() {
  this.geofencePageNumber = 1;
  this.geofenceItemsPerPage = 2;
  this.poifilter = '';
  this.getPoiData()
}



  Openmap(data) {
    let data1 = data.param6;
    let fromDateTimeArray = [];
    fromDateTimeArray = data1.split(' ');
    let fromDate = fromDateTimeArray[0]; let fromTime = fromDateTimeArray[1] + " " + fromDateTimeArray[2];
    let data2 = data.param7;
    let toDateTimeArray = [];
    toDateTimeArray = data2.split(' ');
    let toDate = toDateTimeArray[0]; let toTime = toDateTimeArray[1] + " " + toDateTimeArray[2];
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
