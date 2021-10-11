import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListService } from 'src/list.service';
import { HistoryService } from 'src/mapservices/history.service';
import { CryptService } from '../../../services/crypt.service';
import { ExportToExcelService } from '../../../services/export-to-excel.service';
import { PdfService } from '../../../services/pdf.service';
import { ReportService } from '../../../services/report.service';


declare var $: any;

import * as $ from 'jquery'


import * as moment from 'moment';
declare var $: any;
import * as xlsx from 'xlsx';
declare var jQuery: any;

declare var PopupInitialize: any;
declare var mapBuild: any;
declare var SwitchMap: any;

declare var container: any;
declare var content: any;
declare var closer: any;

declare var AddLoader: any;
declare var RemoveLoader: any;
@Component({
  selector: 'app-websitehitdetail',
  templateUrl: './websitehitdetail.component.html',
  styleUrls: ['./websitehitdetail.component.css']
})
export class WebsitehitdetailComponent implements OnInit {
  loginRoleId: string;

  customerList: any[]; deviceList: any[];
  customerId: string; deviceIdArr: any[] = [];

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
  totalMaxSpeed: any; totalgpsdistance: any; totalIdleTime: any; totalododistance: any;
  totalstoppagetime: any; totalworkingtime: any;

  responseGridArray: any; responseGridArrayForPdf: any;

  tolocationAddress: any[] = []; fromlocationAddress: any[] = [];
  key: any;
  reverse: boolean = true;
  PDFData: any[];



  constructor(private pdfservice: PdfService, private excelservice: ExportToExcelService, private router: Router, private listService: ListService, private cryptService: CryptService, private historyservice: HistoryService, private reportService: ReportService) {
    this.EncryptPageName(); this.EncryptPageUrl();
   

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

 

  onSubmit() {

    const inputElement = document.getElementById('daterange').innerHTML;
    this.selectDateArray = inputElement.split(' to ', 2);
    this.fromDate = this.selectDateArray[0];
    this.toDate = this.selectDateArray[1];


    this.fromTime = $('#fromTime').val();
    this.toTime = $('#toTime').val();

    this.d = new Date();

      this.submitted = false; this.ValueAlreadyGot = false; this.GetWebsiteHitReport()
    
  }

  GetWebsiteHitReport() {
    let dataL = {
      param1: "",
      param2: "",
      param3: this.fromDate,
      param4: this.fromTime,// "fromtime",
      param5: this.toDate,// "todate",
      param6: this.toTime,//"totime",
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter.trim(),
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (err) { }

    this.reportService.WebsiteHitReport(dataL).subscribe((response) => {
 
      RemoveLoader();
      if (response.statuscode == 200) {
        document.getElementById("inputform").style.display = 'none';
        document.getElementById("outputform").style.display = 'block'

        if (this.ValueAlreadyGot == false) {
          
          this.totalcount = response.count;
        }
        this.viewcount = response.entity.length;
        this.responseGridArray = response.entity;

      }
      else {
        this.errorMessage = response.entity;
        $("#ErrorModal").modal('show')
      }
    });
  }


  pageChange(event) {
    this.ValueAlreadyGot = true;
    this.pageNumber = event;
    this.totalrecord = this.totalcount;
    this.GetWebsiteHitReport();
  }

  searchdata() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1
    // this.totalrecord = this.totalcount;
    this.GetWebsiteHitReport();
  }

  changeItemsPerPage() {
    this.ValueAlreadyGot = true;
    this.totalrecord = this.totalcount;
    this.GetWebsiteHitReport();
  }

  Refreshfunction() {
    this.ValueAlreadyGot = false;
    this.itemsPerPage = 10;
    this.pageNumber = 1;
    this.filter = '';
    this.GetWebsiteHitReport();
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  GetDistanceReportForExcel() {
    let dataL = {
      param1: "",
      param2: "",
      param3: this.fromDate,
      param4: this.fromTime,// "fromtime",
      param5: this.toDate,// "todate",
      param6: this.toTime,//"totime",
      pageNo: this.pageNumber,
      itemsPerPage: "",
      searchBy: this.filter.trim(),
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (err) { }

    this.reportService.WebsiteHitReport(dataL).subscribe((response) => {
 
      RemoveLoader();
      if (response.statuscode == 200) {

        this.responseGridArrayForPdf = response.entity;
        try { RemoveLoader() } catch (err) { }
        this.PrepareExcelData(this.responseGridArrayForPdf);
      }
    })
  }

  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "IP ADDRESS": data[i].param5,
        "BROWSER DETAIL": data[i].param6,
        "OS DETAIL": data[i].param7,
        "HIT TIME": data[i].param2,
        "HIT COUNT": data[i].param8,
      
      }
      this.excelData.push(obj);
    }
    this.exportToExcel()
  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'Website Hit Report', 'websitehitreport');
  }
  GetDistanceReportForPDF() {
    let dataL = {
      param1: "",
      param2: "",
      param3: this.fromDate,
      param4: this.fromTime,// "fromtime",
      param5: this.toDate,// "todate",
      param6: this.toTime,//"totime",
      pageNo: this.pageNumber,
      itemsPerPage: "",
      searchBy: this.filter.trim(),
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (err) { }

    this.reportService.WebsiteHitReport(dataL).subscribe((response) => {
 
      RemoveLoader();
      if (response.statuscode == 200) {

        this.responseGridArrayForPdf = response.entity;
        try { RemoveLoader() } catch (err) { }
        this.PreparePDFData(this.responseGridArrayForPdf);
      }
    });

  }
  PreparePDFData(data) {
    this.PDFData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "IP ADDRESS": data[i].param5,
        "BROWSER DETAIL": data[i].param6,
        "OS DETAIL": data[i].param7,
        "HIT TIME": data[i].param2,
        "HIT COUNT": data[i].param8,
       }
      this.PDFData.push(obj);
    }
    this.exportToPdf()
  }
  exportToPdf() {
    this.pdfservice.CreatePDFData(this.PDFData, ' Website Hit Report')
  }


  gotoBack() {
    (document.getElementById('fromTime') as HTMLInputElement).value = "00:00";
    (document.getElementById('toTime') as HTMLInputElement).value = "23:59";
     this.fromDate = ""; this.toDate = ""; this.fromTime = ""; this.toTime = "";

    document.getElementById("inputform").style.display = "block";
    document.getElementById("outputform").style.display = "none";

    this.ngOnInit();
  }



 


  //===========================================================================================MapFunctionality    

  // Developer : Tafseer Khan
  // Date : 04-12-2020
  // Description : Functionalitiy For Map With History Track












}