import { ExportToExcelService } from './../../services/export-to-excel.service';
// import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { ListService } from './../../../../../list.service';
import { ReportService } from './../../services/report.service';
//  dhammadeep dahiwale  
//  raw data report starts 
//  29-oct2020 
declare var $: any;
// import '../../../../../assets/timepicker/wickedpicker.js'
import '../../../../../assets/timepicki/js/timepicki.js'
import '../../../../../assets/timepicki/css/timepicki.css'
import * as $ from 'jquery'


declare var AddLoader: any;
declare var RemoveLoader: any;

import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { routerTransition } from 'src/app/router.animations';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
declare var $: any;
//import * as $ from 'jquery';
declare var jQuery: any;
import * as xlsx from 'xlsx';


@Component({
  selector: 'app-raw-data-report',
  templateUrl: './raw-data-report.component.html',
  styleUrls: ['./raw-data-report.component.css'],
  animations: [routerTransition()]

})
export class RawDataReportComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  submitted: boolean = false;
  fromTime; toTime; filter = '';

  vendorListArray = []; deviceTypeArray = []; deviceListArray = [];
  encryptedpageNameValue: string; encryptedpageUrlValue: string
  pageUrl = this.router.url;

  reportResponseList = [];
  pageNumber: number = 1; itemsPerPage = 10;

  viewcountintable: any; totalcount: string;

  config = {
    displayKey: "param2",
    // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '300px',
  };
  vendorId: any;
  vendorObj: any;
  vendorName: any;
  deviceObj: any;
  deviceId: any;
  deviceName: any;
  deviceTypeId: any;
  deviceTypeName: any;
  deviceTypeObj: any;
  currentdate: string;
  date: any;
  errorMessage: any;
  ValueAlreadyGot: boolean = false;
  totalrecord: string = 'NA';
  reportResponseListForPDF: any;
  d: Date;
  excelData: any[];
  key: any;
  reverse: boolean = true;
  constructor(private reportService: ReportService, private excelservice: ExportToExcelService, private listService: ListService, private cryptService: CryptService, private router: Router) {
    this.EncryptPageName(); this.EncryptPageUrl();
  }


  ngOnInit() {

    // this.idleService.resetTimer();

    // timepicker starts
    $('.timepicker').timepicki();
    // timepicker ends

    this.getvendorList();
    this.getDeviceTypeList();

    (function ($) {
      $(document).ready(function () {

        /* calander single  picker ends */
        $('.datepicker').daterangepicker({
          singleDatePicker: true,
          maxDate: new Date(),
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

        function cb(start, end) {
          $('#daterangeadminux2 span').html(start.format('YYYY-MM-DD') + 'to' + end.format('YYYY-MM-DD'));
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
      format: 'dd-mm-yyyy',
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
    this.cryptService.encrypt("raw-data-report")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl);
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }


  getvendorList() {
    let dataL = {
      param1: '',
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.VendorListAPI(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      if (response.statuscode == 200) {
        this.vendorListArray = response.entity;
      }
    })
  }
  getDeviceTypeList() {
    let dataL = {
      param1: "",
      param2: "",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.DeviceTypeListAPI(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      if (response.statuscode == 200) {
        this.deviceTypeArray = response.entity.list;
      }
    })
  }



  getDeviceList() {

    let dataL = {
      param1: this.vendorId,   //vendor
      param2: this.deviceTypeId,//devicetype
      pageID: "2",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.DeviceList_RawData(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      if (response.statuscode == 200) {
        this.deviceListArray = response.entity.list;
      }
    })
  }

  getDevice() {
    this.deviceId = this.deviceObj.param1;
    this.deviceName = this.deviceObj.param2;
  }

  onSubmit() {
    this.d = new Date();

    this.fromTime = (document.getElementById("fromTime") as HTMLInputElement).value
    this.toTime = (document.getElementById("toTime") as HTMLInputElement).value

    this.date = (document.getElementById("dateinput") as HTMLInputElement).value;

    if (this.vendorId == null || this.vendorId == '' || this.deviceTypeId == null || this.deviceTypeId == '' || this.deviceId == null || this.deviceId == '') {
      this.submitted = true
    }
    else {
      this.getRawDataReport()
    }
  }

  getRawDataReport() {
    if (this.ValueAlreadyGot == true) {
      this.totalrecord = this.totalcount;
    }
    else {
      this.totalrecord = "NA";
    }
    let dataL = {
      "param1": this.vendorId,
      "param2": this.deviceId,
      "param3": this.date,
      "param4": this.fromTime,
      "param5": this.date,
      "param6": this.toTime,
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

    this.reportService.RawDatareportv1(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (err) { }

      if (response.statuscode == 200) {
        this.reportResponseList = response.entity;
        this.viewcountintable = this.reportResponseList.length;

        if(this.ValueAlreadyGot ==false){
          this.totalcount = response.count
        }
      }
      else {
        this.errorMessage = response.entity
        $("#RawErrorModal").modal('show')
      }
    })
  }

  getRawDataForPDF() {
    let dataL = {
      "param1": this.vendorId,
      "param2": this.deviceId,
      "param3": this.date,
      "param4": this.fromTime,
      "param5": this.date,
      "param6": this.toTime,
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
    try { AddLoader() } catch (err) { }
    this.reportService.RawDatareportv1(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (err) { }
      if (response.statuscode == 200) {
        if (response.responseEntityCount == "1") {
          this.reportResponseListForPDF = response.entity.list;
          this.PrepareExcelData(this.reportResponseListForPDF);
        }
        else {
          this.errorMessage = response.entity;
          $("#RawErrorModal").modal('show');
        }
      }
      else {
      }
    })
  }

  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "RECIEVE DATE TIME": data[i].param2,
        "DATA MESSAGE": data[i].param3,
        "PORT NUMBER": data[i].param5,
      }
      this.excelData.push(obj);
    }
  }

  searchdata() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1;
    this.getRawDataReport();
  }

  Refreshfunction() {
    this.ValueAlreadyGot = false;
    this.itemsPerPage = 10;
    this.pageNumber = 1; this.filter = ''
    this.getRawDataReport();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  gotoBack() {


    document.getElementById("inputform").style.display = "block";
    document.getElementById("outputform").style.display = "none";
  }
  createPDF() {
    // this.CompletedtripReportDetailPDF();
    var sTable = document.getElementById('rawDataReportPDF').innerHTML;
    var style = "<style>";
    style = style + "table {width: 100%;font: 13px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";

    // CREATE A WINDOW OBJECT.
    var win = window.open('', '', 'height=700,width=700');

    win.document.write('<html><head>');
    win.document.write('<title>Raw Data Report</title>');   // <title> FOR PDF HEADER.
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
    this.excelservice.ExportExcel(this.excelData, 'Distance travelled Report', 'distancereavelledreport');

  }
  reportPageChange(event) {
    this.pageNumber = event;
    this.getRawDataReport();
  }
}
