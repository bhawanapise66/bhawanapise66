import { ExportToExcelService } from './../../services/export-to-excel.service';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { ListService } from './../../../../../list.service';
import { routerTransition } from 'src/app/router.animations';
//  dhammadeep dahiwale  
//  login actuivity report starts 
//  29-oct2020 

import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ReportService } from '../../services/report.service';
declare var $: any;

//import * as $ from 'jquery';
declare var jQuery: any;
import * as xlsx from 'xlsx';
declare var $: any;
// import '../../../../../assets/timepicker/wickedpicker.js'
import '../../../../../assets/timepicki/js/timepicki.js'
import '../../../../../assets/timepicki/css/timepicki.css'
import * as $ from 'jquery'
import { PdfService } from '../../services/pdf.service';
declare var AddLoader: any;
declare var RemoveLoader: any;



@Component({
  selector: 'app-login-activity-report',
  templateUrl: './login-activity-report.component.html',
  styleUrls: ['./login-activity-report.component.css'],
  animations: [routerTransition()]

})
export class LoginActivityReportComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  roleLists: any[];
  roleObj: any; deviceObj;

  encryptedpageNameValue: string; encryptedpageUrlValue: string

  pageUrl = this.router.url;

  config = {
    displayKey: "param2",
    search: true,
    limitTo: 5000,
    height: '300px',
  };
  roleName: any;
  roleId: any;
  ownersList: any;
  userObj: any;
  ownersId: any;
  ownersName: any;
  submitted: boolean;
  selectDateArray: string[];
  fromDate: string;
  toDate: string;
  fromTime: any;
  toTime: any;
  currentdate: string;
  pageNumber = 1;
  itemsPerPage: any = 10;
  filter = '';
  loginDetailsGrid: any;
  errorMessage: any;
  excelData: any[];
  viewcount: any;
  totalcount: any;
  loginDetailsGridAll: any;
  totalrecord: string = 'NA';
  ValueAlreadyGot: boolean = false;
  d: Date;
  key: any;
  reverse: boolean = true;
  pdfData: any[];
  PDFData: any[];
  constructor(private cryptService: CryptService, private router: Router, private listService: ListService, private reportService: ReportService, private excelservice: ExportToExcelService, private pdfService: PdfService) {
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
    this.cryptService.encrypt("Login Activity Report")
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


  OwnerListFn() {
    this.ownersList = null
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
      this.ownersList = response.entity.list;
    })

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

    if (this.roleId == "" || this.roleId == null || this.ownersId == "" || this.ownersId == null || this.fromDate == "" || this.fromDate == null ||
      this.toDate == "" || this.toDate == null || this.fromTime == "" || this.fromTime == null || this.toTime == "" || this.toTime == null) {
      this.submitted = true;
    }
    else {
      this.submitted = false;
      this.GetLoginActivityReport();
    }

  }


  GetLoginActivityReport() {
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
      "totalRecords": "NA",
      "param1": this.roleId,
      "param2": this.ownersId,
      "param3": this.fromDate,
      "param4": this.fromTime,
      "param5": this.toDate,
      "param6": this.toTime,
      "pageID": "1223",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (err) { }
    this.reportService.LoginActivityReport(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (err) { }
      if (response.statuscode == 200) {
        if (response.responseEntityCount == "1") {
          this.loginDetailsGrid = response.entity.list;
          this.viewcount = response.entity.viewCount;

          let summaryDetails = response.entity.count;
          if (this.ValueAlreadyGot == false) {

            let summaryArray = summaryDetails.split(", ");
            this.totalcount = summaryArray[0];
          }

          this.viewcount = response.entity.viewCount;
          if (this.viewcount == 0) {
            this.errorMessage = response.entity;
            $("#ErrorModal").modal('show');
          }
          else {
            document.getElementById("inputform").style.display = "none";
            document.getElementById("outputform").style.display = "block";
          }
        }
        else {
          this.errorMessage = response.entity;
          $("#ErrorModal").modal('show')
        }
      }
    })
  }

  pageChanged(event) {
    this.ValueAlreadyGot = true;
    this.pageNumber = event;
    this.GetLoginActivityReport()
  }

  searchdata() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1;
    this.GetLoginActivityReport()
  }

  Refreshfunction() {
    this.ValueAlreadyGot = false;
    this.itemsPerPage = 10;
    this.pageNumber = 1;
    this.filter = ''

    this.GetLoginActivityReport()
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
 
  gotoBack() {
    this.roleId = null; this.ownersId = null;
    (document.getElementById('fromTime') as HTMLInputElement).value = "00:00";
    (document.getElementById('toTime') as HTMLInputElement).value = "23:59";

    document.getElementById("inputform").style.display = "block";
    document.getElementById("outputform").style.display = "none";


    this.ngOnInit();
  }

  excelReport() {
    let dataL = {
      "pageNo": "",
      "itemsPerPage": "",
      "searchBy": this.filter,
      "searchType": "",
      "totalRecords": "NA",
      "param1": this.roleId,
      "param2": this.ownersId,
      "param3": this.fromDate,
      "param4": this.fromTime,
      "param5": this.toDate,
      "param6": this.toTime,
      "pageID": "1223",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    RemoveLoader()
    this.reportService.LoginActivityReport(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.loginDetailsGridAll = response.entity.list;
        this.PrepareExcelData(this.loginDetailsGridAll);
      }
    })
  }
  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "USERNAME ": data[i].param12,
        "ROLENAME": data[i].param11,
        "LOGIN BY ": data[i].param10,
        "LOGIN TIME": data[i].param2,
        "LOGOUT TIME": data[i].param3,
        "DURATION": data[i].param13,
        "LOGIN STATUS ": data[i].param4,
        "LOGIN IP": data[i].param5,
        "BROWSER": data[i].param6 + data[i].param7,
        "OS DETAILS": data[i].param8 + data[i].param9,
      }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'Login Activity Report', 'loginactivityreport');
  }

  pdfReport() {
    let dataL = {
      "pageNo": "",
      "itemsPerPage": "",
      "searchBy": this.filter,
      "searchType": "",
      "totalRecords": "NA",
      "param1": this.roleId,
      "param2": this.ownersId,
      "param3": this.fromDate,
      "param4": this.fromTime,
      "param5": this.toDate,
      "param6": this.toTime,
      "pageID": "1223",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    AddLoader()       
    this.reportService.LoginActivityReport(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        let pdfdata = response.entity.list;
        this.PreparePdfData(pdfdata);
      }
    })
  }
  PreparePdfData(data) {
    this.pdfData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "USERNAME ": data[i].param12,
        "ROLENAME": data[i].param11,
        "LOGIN BY ": data[i].param10,
        "LOGIN TIME": data[i].param2,
        "LOGOUT TIME": data[i].param3,
        "DURATION": data[i].param13,
        "LOGIN STATUS ": data[i].param4,
        "LOGIN IP": data[i].param5,
        "BROWSER": data[i].param6 + data[i].param7,
        "OS DETAILS": data[i].param8 + data[i].param9,
      }
      this.pdfData.push(obj);
    }
    this.exportToPdf()
  }

  exportToPdf() {
    this.pdfService.CreatePDFData(this.pdfData, 'Login Activity Report');
  }

}