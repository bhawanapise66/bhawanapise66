import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { ListService } from './../../../../../list.service';
import { ReportService } from './../../services/report.service';
import { ExportToExcelService } from './../../services/export-to-excel.service';
import { PdfService } from './../../services/pdf.service';
import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
declare var $: any;
// import '../../../../../assets/timepicker/wickedpicker.js'
import '../../../../../assets/timepicki/js/timepicki.js'
import '../../../../../assets/timepicki/css/timepicki.css'
import * as $ from 'jquery'

//import * as $ from 'jquery';
declare var jQuery: any;

declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-rail-exception-report',
  templateUrl: './rail-exception-report.component.html',
  styleUrls: ['./rail-exception-report.component.css']
})
export class RailExceptionReportComponent implements OnInit {
  encryptedpageNameValue: any; encryptedpageUrlValue: any;
  customerListArray: any; loginRoleId: any; vehicleList: any; isCustomer: boolean;
  customer: any; customerName: any; customerObj: any;


  grouplist: any[]; divisionlist: any[]; subdivisionlist: any[]; sectionlist: any[];
  groupObjArr: any[] = []; divisionObjArr: any[]; subDivisionObjArr: any[]; sectionObjArr: any[];
  groupIdArr: any[] = []; divisionIdArr: any[]; subdivisionIdArr: any[]; sectionIdArr: any[];

  isSubDivision: boolean = false;
  isDivision: boolean = false;
  isSection: boolean = false;
  GroupList: any[]; divisionList: any[]; subDivisionlist: any[]; deptList: any[]


  config = {
    displayKey: "param2",    // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '300px',
  };
  selectDateArray: string[];
  fromDate: string; toDate: string; fromTime: any; toTime: any;
  device: string; deviceObj: any; deviceName: any;

  submitted: boolean = false;
  d: Date;
  ValueAlreadyGot: boolean;
  pageNumber: any = 1; itemsPerPage: any = 10; filter: any = ''; totalrecord: any = 'NA'; totalcount: any;
  reportData: any;
  errorMessage: any;
  viewcount: any;
  reportPDFData: any;
  excelData: any[];
  deviceIdArr: any[];
  deviceObjArr: any;
  key: any;
  reverse: boolean=true;
  constructor(private pdfservice: PdfService, private excelservice: ExportToExcelService, private reportService: ReportService,
    private listService: ListService, private cryptService: CryptService, private router: Router,) {
    this.encryptedpageNameValue = this.cryptService.encrypt('Alert Message Report')
    this.encryptedpageNameValue = this.cryptService.encrypt(this.router.url)

    this.customerListArray = JSON.parse(sessionStorage.getItem("cl"));

    this.loginRoleId = sessionStorage.getItem('rid');

    if (this.loginRoleId == '10' || this.loginRoleId == '11'|| this.loginRoleId == '16'|| this.loginRoleId == '21') {
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
          maxDate: new Date(),
          dateLimit: { months: 1 }

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
        }
      }
    })
  }

  getDivisionList() {
    if (this.isCustomer == false) {
      this.customer = this.customerObj["param1"]
    }
    else {
      this.customer = ''
    }
    let dataL = {
      param1: this.customer,
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

  getSubDivisionList() {
    this.divisionIdArr = [];

    if (this.isDivision == false) {
      this.divisionObjArr.forEach(element => { this.divisionIdArr.push(element.param1) });
    }
    let dataL = {
      param1: this.customer,// custumerid, 
      groupList: [],// this.groupIdArr,// groupid[], 
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
      param1: "",
      param14: "All",
      "pageID": "wegw",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.grouplist(dataL).subscribe((response) => {
      this.GroupList = response.entity;
    })
  }


  GetVehicleListAfterCustomer() {
    this.groupIdArr = []; this.sectionIdArr = [];

    this.groupObjArr.forEach(element => { this.groupIdArr.push(element.param1) });
    if (this.isSection == false) {
      this.sectionObjArr.forEach(element => { this.sectionIdArr.push(element.param1) });
    }
    else if (this.isSection == true) { this.divisionIdArr = []; this.subdivisionIdArr = [] }

    let dataL = {
      param1: this.customer,
      param15: "All",
      groupList: this.groupIdArr,
      divisionList: this.divisionIdArr,
      subDivisionList: this.subdivisionIdArr,
      dpartmentList: this.sectionIdArr,
      "pageID": "",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.vehicleListv1(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.vehicleList = response.entity;
      }

    })
  }

  GetVehicleList() {
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
        this.vehicleList = response.entity.list;
      }
    })
  }
  checkAll(item, param) {
    var allselected: boolean = false
    for (let i = 0; i < item.length; i++) {
      if (item[i].param1 == "0") {
        allselected = true;
      }
    }
    console.log(allselected);
    if (allselected == true && param == "group") {
      this.groupObjArr = []
      this.groupObjArr = this.GroupList;
    }
    else if (allselected == true && param == 'device') {
      this.deviceIdArr = []
      this.deviceObjArr = this.vehicleList;
    }
  }

  onSubmit() {

    this.deviceIdArr = [];
    this.deviceObjArr.forEach(element => { this.deviceIdArr.push(element.param3) });
    if (this.vehicleList.length == this.deviceIdArr.length) {
      this.deviceIdArr = ['All']
    }
    const inputElement = document.getElementById('daterange').innerHTML;
    this.selectDateArray = inputElement.split(' to ', 2);
    this.fromDate = this.selectDateArray[0];
    this.toDate = this.selectDateArray[1];
    this.fromTime = $('#fromTime').val();
    this.toTime = $('#toTime').val();

    this.d = new Date();

    if (this.loginRoleId == "10" || this.loginRoleId == "11") {
      if (this.customer == '' || this.divisionObjArr.length == 0 || this.subDivisionObjArr.length == 0 || this.sectionObjArr.length == 0 || this.groupObjArr.length == 0 || this.deviceObjArr.length == 0) {
        this.submitted = true
      }
      else { this.ExceptionReport() }
    }
    else if (this.isCustomer == true) {
      if (this.divisionObjArr.length == 0 || this.subDivisionObjArr.length == 0 || this.sectionObjArr.length == 0 || this.groupObjArr.length == 0 || this.deviceObjArr.length == 0) {
        this.submitted = true
      }
      else { this.ExceptionReport() }
    }

    else if (this.isDivision == true) {
      if (this.subDivisionObjArr.length == 0 || this.sectionObjArr.length == 0 || this.groupObjArr.length == 0 || this.deviceObjArr.length == 0) {
        this.submitted = true
      }
      else { this.ExceptionReport() }
    }
    else if (this.isSubDivision == true) {
      if (this.sectionObjArr.length == 0 || this.groupObjArr.length == 0 || this.deviceObjArr.length == 0) {
        this.submitted = true
      }
      else { this.ExceptionReport() }
    } else if (this.isSection == true) {
      if (this.groupObjArr.length == 0 || this.deviceObjArr.length == 0) {
        this.submitted = true
      }
      else { this.ExceptionReport() }

    }
  }

  // ExceptionReport() {
  //   if (this.ValueAlreadyGot == true) {
  //     this.totalrecord = this.totalcount;
  //   }
  //   else {
  //     this.totalrecord = "NA";
  //   }
  //   let dataL = {
  //     param1: this.customer,
  //     param2: this.device,
  //     param3: this.fromDate,
  //     param4: this.fromTime,
  //     param5: this.toDate,
  //     param6: this.toTime,
  //     param7: "All",
  //     pageNo: this.pageNumber,
  //     itemsPerPage: this.itemsPerPage,
  //     searchBy: this.filter,
  //     searchType: "",
  //     totalRecords: this.totalrecord,
  //     pageID: "7",
  //     pageName: this.encryptedpageNameValue,
  //     pageURL: this.encryptedpageUrlValue

  //   }
  //   try { AddLoader() } catch (err) { }
  //   this.reportService.RailwayExceptionReport(dataL).subscribe((response) => {
  //     try { RemoveLoader() } catch (err) { }

  //     if (response.statuscode == 200) {
  //       this.reportData = response.entity.responsedatalist;
  //       this.viewcount = response.entity.viewCount;
  //       if (this.ValueAlreadyGot == false) {
  //         this.totalcount = response.entity.count;
  //         this.reportPDF();
  //       }
  //       document.getElementById("inputform").style.display = "none"
  //       document.getElementById("outputform").style.display = "block"
  //     }
  //     else {
  //       this.errorMessage = response.entity;
  //       $("#ErrorModal").modal('show');
  //     }
  //   })

  // }

  ExceptionReport() {
    let dataL = {
      param1: this.customer,// "selectcustomerid-->ALL/ID",
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
      param16: '',
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
      RemoveLoader();
      if (response.statuscode == 200) {
        this.reportData = response.entity;
        this.viewcount = this.reportData.length
      }
      else {
        this.errorMessage = response.entity;
        $("#ErrorModal").modal('show')
      }
    })
  }


  filterBy_NotWorking() {
    alert("Filter By Not Working")
  }
  filterBy_NotStartedOnTime() {
    alert("FilterBy Not Started On Time")
  }
  filterBy_NotOnStartLocation() {
    alert("filter by not started On Start Location")
  }
  filterBy_NotCompleted() {
    alert("fllter by not completed")
  }


  searchdata() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1;
    this.ExceptionReport();
  }
  Refreshfunction() {
    this.ValueAlreadyGot = false;
    this.itemsPerPage = 10;
    this.pageNumber = 1;
    this.filter = '';
    this.ExceptionReport();
  }
  changeItemsPerPage() {
    this.ValueAlreadyGot = true;
    this.pageNumber = 1;
    this.ExceptionReport()
  }
  pageChange(event) {
    this.pageNumber = event;
    this.ValueAlreadyGot = true;
    this.ExceptionReport();
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  reportPDF() {
    let dataL = {
      param1: this.customer,
      param2: this.device,
      param3: this.fromDate,
      param4: this.fromTime,
      param5: this.toDate,
      param6: this.toTime,
      param7: "All",
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: this.totalrecord,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue

    }
    try { AddLoader() } catch (err) { }
    this.reportService.RailwayExceptionReport(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (err) { }

      if (response.statuscode == 200) {
        this.reportPDFData = response.entity.responsedatalist;
        this.PrepareExcelData(this.reportPDFData);

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
        "VEHICLE NO.": data[i].param3,
        "GPS DATE TIME": data[i].param4,
        "ALERT DATE TIME": data[i].param5,
        "MOBILE NO.": data[i].param6,
        "ALERT NAME": data[i].param7,
        "ALERT TYPE": data[i].param8,
        "ALERT MESSAGE": data[i].param9
      }
      this.excelData.push(obj);
    }
  }



  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'Exception Report', 'exceptionreport')
  }

  ReportPDFDownload() {
    var sTable = document.getElementById('ReportForPDF').innerHTML;
    var style = "<style>";
    style = style + "table {width: 100%;font: 13px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + ".center{display: inline-block;width: 47%;border: 3px solid #73AD21;color: black;margin: 0px 1% 0 1%;border-radius: 5px;}";
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

  gotoBack() {
    this.customerObj = null;
    this.deviceObj = null;
    (document.getElementById('fromTime') as HTMLInputElement).value = "00:00";
    (document.getElementById('toTime') as HTMLInputElement).value = "23:59";
    this.divisionIdArr = []; this.subdivisionIdArr = []; this.sectionIdArr = [];
    this.groupIdArr = []; this.deviceIdArr = [];this.deviceIdArr=[]

    document.getElementById("inputform").style.display = "block";
    document.getElementById("outputform").style.display = "none";

    this.ngOnInit();
  }

}
