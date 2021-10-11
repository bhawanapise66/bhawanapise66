import { ExportToExcelService } from './../../services/export-to-excel.service';
import { ReportService } from './../../services/report.service';
import { ListService } from 'src/list.service';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var $: any;
import * as moment from 'moment';

//import * as $ from 'jquery';
declare var jQuery: any;
import * as xlsx from 'xlsx';
declare var $: any;
// import '../../../../../assets/timepicker/wickedpicker.js'
import '../../../../../assets/timepicki/js/timepicki.js'
import '../../../../../assets/timepicki/css/timepicki.css'
import * as $ from 'jquery'
declare var AddLoader: any;
declare var RemoveLoader: any;



@Component({
  selector: 'app-event-log-report',
  templateUrl: './event-log-report.component.html',
  styleUrls: ['./event-log-report.component.css']
})
export class EventLogReportComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  roleLists: any[];

  encryptedpageNameValue: string; encryptedpageUrlValue: string

  pageUrl = this.router.url;

  config = {
    displayKey: "param2",
    search: true,
    limitTo: 5000,
    height: '300px',
  };
  roleObj: any; roleName: any; roleId: any = ''; ownersList: any; userObj: any; ownersId: any = ''; ownersName: any;

  submitted: boolean; selectDateArray: string[];

  fromDate: string; toDate: string; fromTime: any; toTime: any; currentdate: string;
  pageNumber = 1; itemsPerPage: any = 10; filter = ''; totalrecord: string = 'NA'; totalcount: any; viewcount: any;

  any; errorMessage: any;
  excelData: any[];
  eventGridAll: any;
  ValueAlreadyGot: boolean = false;
  EventLogDetail: any;
  d: Date;
  key: any;
  reverse: boolean=true;
  constructor(private cryptService: CryptService, private router: Router, private listService: ListService, private reportService: ReportService, private excelservice: ExportToExcelService) {
    this.EncryptPageName(); this.EncryptPageUrl();
    this.RoleListFn()

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
    this.cryptService.encrypt("Event Log Activity Report")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl);
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }

  RoleListFn() {
    let dataL = {
      param1: "",
      param2: "",
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    AddLoader()
    this.listService.RoleList(dataL).subscribe((response) => {
      RemoveLoader()
      this.roleLists = <any[]>(response.entity.list)
    })
  }

  getRoleId() {
    this.roleId = this.roleObj.param1;
    this.roleName = this.roleObj.param2;
    this.OwnerListFn();
  }

  OwnerListFn() {
    let dataL = {
      param1: this.roleId,//roleId
      param2: "",
      pageID: "2",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    AddLoader()
    this.listService.RoleWiseUserList(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        this.ownersList = response.entity.list;
      }
    })

  }

  checkUser() {
    this.ownersId = this.userObj.param1;
    this.ownersName = this.userObj.param2;

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
    // this.currentdate = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear() + "  " + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

    if (this.fromDate == "" || this.fromDate == null ||
      this.toDate == "" || this.toDate == null || this.fromTime == "" || this.fromTime == null || this.toTime == "" || this.toTime == null) {
      this.submitted = true;
    }
    else {
      this.submitted = false;
      this.GetEventLogReport();
    }

  }


  GetEventLogReport() {
    if (this.ValueAlreadyGot == true) {
      this.totalrecord = this.totalcount;
    }
    else {
      this.totalrecord = "NA";
    }
    let dataL = {
      "pageNo": this.pageNumber,
      "itemsPerPage": this.itemsPerPage,
      "searchBy": this.filter,
      "searchType": "",
      "totalRecords": this.totalrecord,
      "param2": this.fromDate,
      "param3": this.toDate,
      "param4": this.roleId,
      "param5": this.ownersId,
      "pageID": "1223",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (err) { }
    this.reportService.EventLogReport(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (err) { }
      if (response.statuscode == 200) {

        this.EventLogDetail = response.entity.responsedatalist;
        this.viewcount = response.entity.viewCount;
        if (this.ValueAlreadyGot == false) {
          this.GetEventLogReportForPDF();
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

  pageChanged(event) {
    this.ValueAlreadyGot = true;
    this.pageNumber = event;
    this.GetEventLogReport()
  }

  searchdata() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1;
    this.GetEventLogReport()
  }

  Refreshfunction() {
    this.ValueAlreadyGot = false;
    this.itemsPerPage = 10;
    this.pageNumber = 1;
    this.filter = ''

    this.GetEventLogReport()
  }

  changeItemsPerPage() {
    this.ValueAlreadyGot = true;
    this.pageNumber = 1
    this.GetEventLogReport()
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  GetEventLogReportForPDF() {
    let dataL = {
      "pageNo": "",
      "itemsPerPage": "",
      "searchBy": this.filter,
      "searchType": "",
      "totalRecords": "NA",
      "param2": this.fromDate,
      "param3": this.toDate,
      "param4": this.roleId,
      "param5": this.ownersId,
      "pageID": "1223",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.reportService.EventLogReport(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.eventGridAll = response.entity.responsedatalist;
        this.PrepareExcelData(this.eventGridAll);
      }
      else {
      }
    })
  }


  gotoBack() {
    this.roleObj = null;
    this.userObj = null;
    (document.getElementById('fromTime') as HTMLInputElement).value = "00:00";
    (document.getElementById('toTime') as HTMLInputElement).value = "23:59";
    this.roleId = ""; this.ownersId = '', this.fromDate = ""; this.toDate = ""; this.fromTime = ""; this.toTime = "";
    document.getElementById("inputform").style.display = "block";
    document.getElementById("outputform").style.display = "none";
    this.ngOnInit();
  }

  loginreportPDFDownload() {
    var sTable = document.getElementById('eventlogpdf').innerHTML;
    var style = "<style>";
    style = style + "table {width: 100%;font: 13px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";

    // CREATE A WINDOW OBJECT.
    var win = window.open('', '', 'height=700,width=700');

    win.document.write('<html><head>');
    win.document.write('<title>Event Log Activity Report</title>');   // <title> FOR PDF HEADER.
    win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');

    win.document.close(); 	// CLOSE THE CURRENT WINDOW.

    win.print();    // PRINT THE CONTENTS.
    win.close();

  }

  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "PAGE NAME ": data[i].param11,
        "EVENT TYPE": data[i].param4,
        "RECORD TIME": data[i].param8,
        "IP ADDRESS": data[i].param13,
        "RESPONSE DATA": data[i].param6,
        "EVENT STATUS": data[i].param3,
        "API QUERY ": data[i].param5,
      }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'Event Log Activity Report', 'eventlogactivityreport');
  }

}
