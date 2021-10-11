import { ReportService } from './../../services/report.service';
import { HistoryService } from 'src/mapservices/history.service';
import { CryptService } from './../../services/crypt.service';
import { ListService } from 'src/list.service';
import { Router } from '@angular/router';
import { ExportToExcelService } from './../../services/export-to-excel.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';


declare var $: any;
import * as $ from 'jquery'
import * as moment from 'moment';
import { PdfService } from '../../services/pdf.service';
declare var jQuery: any;


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
  selector: 'app-patrolman-exception-report',
  templateUrl: './patrolman-exception-report.component.html',
  styleUrls: ['./patrolman-exception-report.component.css']
})
export class PatrolmanExceptionReportComponent implements OnInit {
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
  key;
  reverse: boolean = true
  notworking: any;
  notstartontime: any;
  notstarted_onstartlocation: any;
  notcompleted: any;
  completed: any;
  pdfData: any[];


  //  for poi 
  
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


  constructor(private excelservice: ExportToExcelService, private router: Router, private listService: ListService, private cryptService: CryptService, private historyservice: HistoryService, private reportService: ReportService,
    private pdfservice: PdfService) {
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
        var start = moment().subtract(2, 'days');
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
          dateLimit: { days: 2 }

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
      else { this.patrolmanExceptionReport() }
    }
    else if (this.isCustomer == true) {
      this.customerId = '';
      if (this.divisionIdArr.length == 0 || this.subdivisionIdArr.length == 0 || this.sectionIdArr.length == 0 || this.groupIdArr.length == 0 || this.deviceIdArr.length == 0) {
        this.submitted = true
      }
      else { this.patrolmanExceptionReport() }
    }

    else if (this.isDivision == true) {
      this.customerId = '';
      if (this.subdivisionIdArr.length == 0 || this.sectionIdArr.length == 0 || this.groupIdArr.length == 0 || this.deviceIdArr.length == 0) {
        this.submitted = true
      }
      else { this.patrolmanExceptionReport() }
    }
    else if (this.isSubDivision == true) {
      this.customerId = '';
      if (this.sectionIdArr.length == 0 || this.groupIdArr.length == 0 || this.deviceIdArr.length == 0) {
        this.submitted = true
      }
      else { this.patrolmanExceptionReport() }
    } else if (this.isSection == true) {
      this.customerId = '';
      if (this.groupIdArr.length == 0 || this.deviceIdArr.length == 0) {
        this.submitted = true
      }
      else { this.patrolmanExceptionReport() }
    }
  }

  patrolmanExceptionReport() {
    let vehicledata = [];

    if (this.deviceList.length == this.deviceIdArr.length) { vehicledata = ['All'] }
    else { vehicledata = this.deviceIdArr }


    if (this.ValueAlreadyGot == true) {
      this.totalrecord = this.totalcount;
    }
    else { this.totalrecord = "NA"; }
    let dataL = {
      param1: this.customerId,// "selectcustomerid-->ALL/ID",
      selectvehicleid: this.deviceIdArr,// "selectvehicleid[]",
      param3: this.fromDate,// "fromdate",
      param4: this.fromTime,//"fromtime",
      param5: this.toDate,// "todate",
      param6: this.toTime,// "totime",
      divisionList: this.divisionIdArr,// "divisionid[]",
      subDivisionList: this.subdivisionIdArr,// "subdivisionid[]",
      dpartmentList: this.sectionIdArr,// "departmentid[]",
      groupList: this.groupIdArr,// "groupid[]",
      param15: "All",// "selectpoiid-->ALL/ID",
      param16: 'exceptionpatrolman',
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: this.totalrecord,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    AddLoader()
    this.reportService.RailwayExceptionReport(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        this.keymanReportArray = response.entity.responsedatalist;
        this.viewcount = this.keymanReportArray.length;

        if (this.ValueAlreadyGot == false) {
          this.totalcount = response.entity.count;
          this.notworking = response.entity.notworking
          this.notstartontime = response.entity.notstartedattime
          this.notstarted_onstartlocation = response.entity.notstartedatstartloc
          this.notcompleted = response.entity.notcompleted
          this.completed = response.entity.completed
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

  reportPdf() {
    let dataL = {
      param1: this.customerId,// "selectcustomerid-->ALL/ID",
      selectvehicleid: this.deviceIdArr,// "selectvehicleid[]",
      param3: this.fromDate,// "fromdate",
      param4: this.fromTime,//"fromtime",
      param5: this.toDate,// "todate",
      param6: this.toTime,// "totime",
      divisionList: this.divisionIdArr,// "divisionid[]",
      subDivisionList: this.subdivisionIdArr,// "subdivisionid[]",
      dpartmentList: this.sectionIdArr,// "departmentid[]",
      groupList: this.groupIdArr,// "groupid[]",
      param15: "All",// "selectpoiid-->ALL/ID",
      param16: 'exceptionpatrolman',
      pageNo: "",
      itemsPerPage: "",
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    AddLoader()
    this.reportService.RailwayExceptionReport(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        this.keymanReportArrayforPDF = response.entity.responsedatalist;
        this.PreparePdfData(this.keymanReportArrayforPDF)
      }
    })
  }

  PreparePdfData(data) {
    this.pdfData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "ALLOTED /DEVICE NAME": data[i].param30,
        "ROUTE NAME": data[i].param36,
        "ACTUAL START TIME": data[i].param17,
        "ACTUAL END TIME": data[i].param18,
        "DELAY FROM ALLOTED STARTED TIME (Min)": data[i].param37,
        "ALLOWED DISTANCE": data[i].param8,
        "ACTUAL DISTANCE COVER": data[i].param14,
        "MAX SPEED": data[i].param15,
        "AVG SPEED ": data[i].param16,
        "DEVIATED FROM ALLOTED DISTANCE (Km) ": data[i].param35,
        "NO. OF TRIPS ": data[i].param11,
        "STOPPAGE COUNT": data[i].param33,
      }
      this.pdfData.push(obj);
    }
    this.exportToPdf()
  }

  exportToPdf() {
    this.pdfservice.CreatePDFData(this.pdfData, 'Patrolman Exception Report');
  }

  reportExcel() {
    let dataL = {
      param1: this.customerId,// "selectcustomerid-->ALL/ID",
      selectvehicleid: this.deviceIdArr,// "selectvehicleid[]",
      param3: this.fromDate,// "fromdate",
      param4: this.fromTime,//"fromtime",
      param5: this.toDate,// "todate",
      param6: this.toTime,// "totime",
      divisionList: this.divisionIdArr,// "divisionid[]",
      subDivisionList: this.subdivisionIdArr,// "subdivisionid[]",
      dpartmentList: this.sectionIdArr,// "departmentid[]",
      groupList: this.groupIdArr,// "groupid[]",
      param15: "All",// "selectpoiid-->ALL/ID",
      param16: 'exceptionpatrolman',
      pageNo: "",
      itemsPerPage: "",
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    AddLoader()
    this.reportService.RailwayExceptionReport(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        this.keymanReportArrayforPDF = response.entity.responsedatalist;
        this.PrepareExcelData(this.keymanReportArrayforPDF)
      }
    })
  }

  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "ALLOTED /DEVICE NAME": data[i].param30,
        "ROUTE NAME": data[i].param36,
        "ALLOTED START TIME": data[i].param9,
        "ACTUAL START TIME": data[i].param17,
        "ALLOTED END TIME": data[i].param10,
        "ACTUAL END TIME": data[i].param18,
        "DELAY FROM ALLOTED STARTED TIME (Min)": data[i].param37,
        "ALLOWED DISTANCE": data[i].param8,
        "ACTUAL DISTANCE COVER": data[i].param14,
        "MAX SPEED": data[i].param15,
        "AVG SPEED ": data[i].param16,
        "DEVIATED FROM ALLOTED DISTANCE (Km) ": data[i].param35,
        "NO. OF TRIPS ": data[i].param11,
        "STOPPAGE COUNT": data[i].param33,
      }
      this.excelData.push(obj);
    }
    this.exportToExcel()
  }

  exportToExcel() {
    try {
      this.excelservice.ExportExcel(this.excelData, 'Patrolman Exception Report', 'partolmanexceptionreport');
    }
    catch (e) {
      alert("on button function" + e)
    }
  }


  pageChanged(event) {
    this.ValueAlreadyGot = true;
    this.pageNumber = event;
    this.patrolmanExceptionReport();
  }

  searchdata() {
    // this.ValueAlreadyGot = true;
    this.ValueAlreadyGot = false;
    this.pageNumber = 1
    this.patrolmanExceptionReport();
  }

  Refreshfunction() {
    this.ValueAlreadyGot = false;
    this.itemsPerPage = 10;
    this.pageNumber = 1;
    this.filter = ''

    this.patrolmanExceptionReport();
  }

  changeItemsPerPage() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1;
    this.filter = ''

    this.patrolmanExceptionReport();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  gotoBack() {
    // this.customerObj = null;
    // this.deviceObj = null;
    (document.getElementById('fromTime') as HTMLInputElement).value = "00:00";
    (document.getElementById('toTime') as HTMLInputElement).value = "23:59";

    this.customerId = null; this.divisionIdArr = []; this.subdivisionIdArr = []; this.sectionIdArr = [];
    this.groupIdArr = []; this.deviceIdArr = []; this.deviceIdArr = []

    this.ngOnInit();
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
    let startdatetime = data.param17;
    let enddatetime = data.param18;
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


  keymanReportPDFDownload() {
    var sTable = document.getElementById('keymanreportForPDF').innerHTML;
    var style = "<style>";
    style = style + "table {width: 100%;font: 13px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + ".table>thead>tr>th{text-transform:uppercase;}";

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
    let data1 = data.param17;
    let fromDateTimeArray = [];
    fromDateTimeArray = data1.split(' ');
    let fromDate = fromDateTimeArray[0]; let fromTime = fromDateTimeArray[1] + " " + fromDateTimeArray[2];
    let data2 = data.param18;
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
