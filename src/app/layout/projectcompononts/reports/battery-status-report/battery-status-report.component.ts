import { ReportService } from './../../services/report.service';
import { number } from '@amcharts/amcharts4/core';
import { ExportToExcelService } from './../../services/export-to-excel.service';
import { ListService } from 'src/list.service';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { Component, OnInit } from '@angular/core';
// import { BnNgIdleService } from 'bn-ng-idle';

declare var jQuery: any;
declare var $: any;
import * as moment from 'moment';


declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-battery-status-report',
  templateUrl: './battery-status-report.component.html',
  styleUrls: ['./battery-status-report.component.css']
})
export class BatteryStatusReportComponent implements OnInit {

  isDivision = false; isSubDiv = false; isDept = false;
  pageUrl = this.router.url;
  encryptedpageUrlValue: any; encryptedpageNameValue: any;
  divisionListArray: any;

  selectDateArray: string[];

  divisionObj; departmentListArray: any;
  vehiclelist: any; divisionId: any = ''; deptObj: any; deptId: any = ''; fromDate: string; toDate: string; fromTime: any; toTime: any;

  deviceObjArr: any[] = []; deviceIdArr: any[] = []
  grouplist: any[]; divisionlist: any[]; subdivisionlist: any[]; sectionlist: any[];
  groupObjArr: any[] = []; divisionObjArr: any[] = []; subDivisionObjArr: any[] = []; sectionObjArr: any[] = [];
  groupIdArr: any[]; divisionIdArr: any[]; subdivisionIdArr: any[]; sectionIdArr: any[];

  configcustomer = { displayKey: "param2", search: true, limitTo: 5000, height: '300px', placeholder: 'Select Customer' };
  configgroup = { displayKey: "param2", search: true, limitTo: 5000, height: '300px', placeholder: 'Select Group' };
  configdiv = { displayKey: "param2", search: true, limitTo: 5000, height: '300px', placeholder: 'Select Division' };
  configsubdiv = { displayKey: "param2", search: true, limitTo: 5000, height: '300px', placeholder: 'Select Subdivision' };
  configsection = { displayKey: "param2", search: true, limitTo: 5000, height: '300px', placeholder: 'Select Section' };
  configdevice = { displayKey: "param2", search: true, limitTo: 5000, height: '300px', placeholder: 'Select Device' };

  isSubDivision: boolean = false;
  isSection: boolean = false;
  GroupList: any[]; subDivisionlist: any[]; deptList: any[]

  itemsPerPage: number = 10;

  itsRoleId: any = ""; itsOwnersId: any = ""; pageNumber: any = 1; filter: any = '';
  totalstoppagetime; totalworkingtime; totalododistance; viewcount

  config = {
    displayKey: "param2",
    search: true,
    limitTo: 5000,
    height: '300px',
  };

  vehicleId: string;
  vehicleObj: any;
  submitted: boolean;
  excelData: any;
  divisionName: any;
  deptName: any;
  deviceName: any;
  currentdate: string;

  totalcount: any;
  totalgpsdistance; totalIdleTime;
  loginRoleId: string;
  totalrecord: any = "NA";
  ValueAlreadyGot: boolean = false;
  d: Date;
  custumerid: any;
  isCustomer: boolean;
  customer: any;
  customerObj: any;
  customerListArray: any;
  count: any;
  reportList: any;
  key: any;
  reverse: boolean = true;
  errorMessage: any;
  constructor(private reportService: ReportService, private cryptService: CryptService, private router: Router, private listService: ListService, private excelservice: ExportToExcelService) {
    this.EncryptPageName(); this.EncryptPageUrl();

    this.loginRoleId = sessionStorage.getItem('rid');

    if (this.loginRoleId == "10" || this.loginRoleId == "11"|| this.loginRoleId == '16'|| this.loginRoleId == '21') {
      this.getCustomerList();
      this.isCustomer = false;
    }
    else if (this.loginRoleId == "18") { this.isCustomer = true; this.getDivisionList() }

    if (this.loginRoleId == "25") {
      this.isSubDivision = true; this.divisionIdArr = []; this.getDeptList();
    }
    if (this.loginRoleId == "24") {
      this.isDivision = true;
    }
    if (this.loginRoleId == "22") {
      this.isSection = true;
    }


  }

  ngOnInit() {

    // this.idleService.resetTimer();
    // timepicker starts
    $('.timepicker').timepicki();
    //timepickr ends


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

    this.getGroupList();
  }

  getCustomerList() {
    let dataL = {
      pageID: "2",
      param7: "All",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.CustomerListAPI(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        if (response.entity == "NO RECORD FOUND") {
        }
        else {
          this.customerListArray = response.entity.list;
          this.count = response.entity.count;
        }
      }
    })
  }


  EncryptPageName() {
    this.cryptService.encrypt("Battery Status Report")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl);
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }


  getDivisionList() {
    if (this.isCustomer == false) {
      this.customer = this.customerObj.param1;
    }
    else {
      this.customer = ''
    }

    let dataL = {
      param1: this.customer,
      groupList: [],
      "pageID": 'erg3',
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.divisionlistv1(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.divisionListArray = response.entity;
      }
    })
  }


  getSubDivisionList() {
    this.divisionIdArr = [];
    this.divisionObjArr.forEach(element => { this.divisionIdArr.push(element.param1) });
    let dataL = {
      param1: this.customer,// custumerid, 
      groupList: [],// groupid[], 
      divisionList: this.divisionIdArr,// divisionid[],
      "pageID": "rte",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.subdivisionlistv1(dataL).subscribe((response) => {
      this.subDivisionlist = response.entity
    })
  }

  getDeptList() {
    this.subdivisionIdArr = [];
    if (this.isSubDivision == false) {
      this.subDivisionObjArr.forEach(element => { this.subdivisionIdArr.push(element.param1) });
    }

    let dataL = {
      param1: this.customer,
      groupList: [],// groupid[], 
      divisionList: this.divisionIdArr,// divisionid[],
      subDivisionList: this.subdivisionIdArr,// subdivisionid[],
      "pageID": "",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.departmentlistv1(dataL).subscribe((response) => {
      this.deptList = response.entity
    })
  }

  getGroupList() {
    let dataL = {
      param1: this.customer,
      "pageID": "wef",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.grouplist(dataL).subscribe((response) => {
      this.GroupList = response.entity
    })
  }

  getDevice() {
    this.sectionIdArr = [];
    if (this.isSection == false) {
      this.sectionObjArr.forEach(element => { this.sectionIdArr.push(element.param1) });
    }
    this.vehicleList();
  }

  vehicleListForDept() {
    let dataL = {
      param1: "",
      param2: "",
      param7: "All",
      pageID: "",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.VehicleList(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.vehiclelist = response.entity.list;
      }
    })
  }

  vehicleList() {
    if (this.deptName == "All") {
      if (this.divisionName == "All") {
        this.itsRoleId = '';
        this.itsOwnersId = '';
      }
      else {
        this.itsRoleId = "24";
        this.itsOwnersId = this.divisionId;
      }
    }
    else {
      this.itsRoleId = "22";
      this.itsOwnersId = this.deptId;
    }

    let dataL = {
      param1: this.customer,
      groupList: this.groupIdArr,
      divisionList: this.divisionIdArr,
      subDivisionList: this.subdivisionIdArr,
      dpartmentList: this.sectionIdArr,
      "pageID": "",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.VehicleList(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.vehiclelist = response.entity.list;
      }
    })




  }


  getVehicleId() {
    this.vehicleId = this.vehicleObj.param1;
    this.deviceName = this.vehicleObj.param2;
  }

  onSubmit() {
    const inputElement = document.getElementById('daterange').innerHTML;
    this.selectDateArray = inputElement.split(' to ', 2);
    this.fromDate = this.selectDateArray[0];
    this.toDate = this.selectDateArray[1];
    this.fromTime = $('#fromTime').val();
    this.toTime = $('#toTime').val();

    this.d = new Date();
    // this.currentdate = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear() + "  " + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

    if (this.deptId == "" || this.deptId == null || this.vehicleId == "" || this.vehicleId == null || this.fromDate == "" || this.fromDate == null ||
      this.toDate == "" || this.toDate == null || this.fromTime == "" || this.fromTime == null || this.toTime == "" || this.toTime == null) {
      this.submitted = true;
    }
    else {
      this.submitted = false;
      this.getbatteryStatusReport()
    }
  }

  getbatteryStatusReport() {
    if (this.ValueAlreadyGot == true) {
      this.totalrecord = this.totalcount;
    }
    else {
      this.totalrecord = "NA";
    }
    let batteryReqParam = {
      "pageNo": this.pageNumber,
      "itemsPerPage": this.itemsPerPage,
      "searchBy": this.filter,
      "searchType": "",
      "totalRecords": this.totalrecord,
      "param1": this.itsRoleId,
      "param2": this.itsOwnersId,
      "param3": this.fromDate,
      "param4": this.fromTime,
      "param5": this.toDate,
      "param6": this.toTime,
      "param7": this.divisionId,
      "param8": this.deptId,
      "pageID": "1",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (err) { }

    this.reportService.RailwayBatteryReport(batteryReqParam).subscribe((response) => {
      try { RemoveLoader() } catch (err) { }
      if (response.statuscode == 200) {
        this.ValueAlreadyGot = true;
        this.reportList = response.entity;
        this.totalcount = response.entity.count;
      }
      else {
        this.errorMessage  = response.entity
      }
    })


    document.getElementById("inputform").style.display = "none";
    document.getElementById("outputform").style.display = "block";
    this.PrepareExcelData(this.reportList)
  }

  pageChange(event) {
    this.ValueAlreadyGot = true;
    this.pageNumber = event;
    this.getbatteryStatusReport();
  }

  searchdata() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1
    this.getbatteryStatusReport();
  }

  Refreshfunction() {
    this.ValueAlreadyGot = false;
    this.itemsPerPage = 10;
    this.pageNumber = 1;
    this.filter = '';
    this.getbatteryStatusReport();
  }
  changeItemsPerPage() {
    this.ValueAlreadyGot = true;
    this.getbatteryStatusReport();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  gotoBack() {
    this.divisionObj = null;
    this.deptObj = null;

    (document.getElementById('fromTime') as HTMLInputElement).value = "00:00";
    (document.getElementById('toTime') as HTMLInputElement).value = "23:59";
    this.divisionId = ""; this.deptId = ''; this.fromDate = ""; this.toDate = ""; this.fromTime = ""; this.toTime = "";

    document.getElementById("inputform").style.display = "block";
    document.getElementById("outputform").style.display = "none";

    this.ngOnInit();
  }

  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].number,
        "DIVISION": data[i].Division,
        "SECTION/DEPARMTENT": data[i].section,
        "DEVICE NUMBER": data[i].device,
        "DATE": data[i].date,
        "BATTERY STATUS": data[i].batterystatus,
        "FROM TIME": data[i].fromtime,
        "TO TIME": data[i].totime,
        "DURATION": data[i].duration,
      }
      this.excelData.push(obj);
    }
  }

  batteryStatusReportForPDFDownload() {
    var sTable = document.getElementById('batteryStatusPDF').innerHTML;
    var style = "<style>";
    style = style + "table {width: 100%;font: 17px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";

    // CREATE A WINDOW OBJECT.
    var win = window.open('', '', 'height=700,width=700');

    win.document.write('<html><head>');
    win.document.write('<title>Battery status Report</title>');   // <title> FOR PDF HEADER.
    win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');

    win.document.close(); 	// CLOSE THE CURRENT WINDOW.

    win.print();    // PRINT THE CONTENTS.
    win.close();

  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'Battery Status Report', 'batterystatusreport');
  }

}
