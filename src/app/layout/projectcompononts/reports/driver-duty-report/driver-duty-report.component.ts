import { Router } from '@angular/router';
import { PostService } from './../../../../../post.service';
import { CryptService } from './../../services/crypt.service';
import { ListService } from './../../../../../list.service';
import { HistoryService } from './../../../../../mapservices/history.service';
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
  selector: 'app-driver-duty-report',
  templateUrl: './driver-duty-report.component.html',
  styleUrls: ['./driver-duty-report.component.css']
})
export class DriverDutyReportComponent implements OnInit {

  encryptedpageNameValue: any; encryptedpageUrlValue: any;
  customerListArray: any; loginRoleId: any; vehicleList: any; isCustomer: boolean;
  customer: any; customerName: any; customerObj: any;

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
  pageUrl = this.router.url
  key: any;
  reverse: boolean=true;
  constructor(private pdfservice: PdfService, private excelservice: ExportToExcelService, private reportService: ReportService,
    private historyservice: HistoryService, private listService: ListService, private cryptService: CryptService,
    private router: Router, private postService: PostService) {
    this.encryptedpageNameValue = this.cryptService.encrypt('Driver Duty Report');
    this.encryptPageUrl();

    this.customerListArray = JSON.parse(sessionStorage.getItem("cl"));

    this.loginRoleId = sessionStorage.getItem('rid');

    if (this.loginRoleId == 10 || this.loginRoleId == 11) {
      this.getCustomerList();
      this.isCustomer = false;
    }
    else {
      this.isCustomer = true;
      this.GetVehicleList();

    }
  }

  encryptPageUrl() {
    let encpageurl = this.cryptService.encrypt(this.pageUrl);
    this.encryptedpageUrlValue = encpageurl;
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
        this.customerListArray = response.entity.list;
      }
    })
  }

  GetVehicleListAfterCustomer() {
    this.customer = this.customerObj.param1;
    this.customerName = this.customerObj.param2;
    let dataL = {
      param1: this.customer,
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
  
  checkvehicle() {
    this.device = this.deviceObj.param1;
    this.deviceName = this.deviceObj.param2;
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

    if (this.device == "" || this.device == null || this.fromDate == "" || this.fromDate == null ||
      this.toDate == "" || this.toDate == null || this.fromTime == "" || this.fromTime == null || this.toTime == "" || this.toTime == null) {
      this.submitted = true;
    }
    else {
      this.submitted = false;
      this.ValueAlreadyGot = false;
      this.DriverDutyReport();
    }

  }
  DriverDutyReport() {
    if (this.ValueAlreadyGot == true) {
      this.totalrecord = this.totalcount;
    }
    else {
      this.totalrecord = "NA";
    }
    let dataL = {
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: this.totalrecord,
      param1: this.customer,
      param2: this.device,
      param3: this.fromDate,
      param4: this.fromTime,
      param5: this.toDate,
      param6: this.toTime,
      pageID: "jgv",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (err) { }
    this.reportService.DriverDutyReport(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (err) { }

      if (response.statuscode == 200) {
        this.reportData = response.entity.responsedatalist;
        this.viewcount = response.entity.viewCount;
        if (this.ValueAlreadyGot == false) {
          this.totalcount = response.entity.count;
          this.reportPDF();
        }
        document.getElementById("inputform").style.display = "none"
        document.getElementById("outputform").style.display = "block"
      }
      else {
        this.errorMessage = response.entity;
        $("#ErrorModal").modal('show');
      }
    })

  }

  searchdata() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1;
    this.DriverDutyReport();
  }
  Refreshfunction() {
    this.ValueAlreadyGot = false;
    this.itemsPerPage = 10;
    this.pageNumber = 1;
    this.filter = '';
    this.DriverDutyReport();
  }
  changeItemsPerPage() {
    this.ValueAlreadyGot = true;
    this.pageNumber = 1;
    this.DriverDutyReport()
  }
  pageChange(event) {
    this.pageNumber = event
    this.ValueAlreadyGot = true;
    this.DriverDutyReport();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  reportPDF() {
    let dataL = {
      pageNo: "",
      itemsPerPage: "",
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      param1: this.customer,
      param2: this.device,
      param3: this.fromDate,
      param4: this.fromTime,
      param5: this.toDate,
      param6: this.toTime,
      pageID: "ghg",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (err) { }
    this.reportService.DriverDutyReport(dataL).subscribe((response) => {
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
    this.excelservice.ExportExcel(this.excelData, 'Driver Duty Report', 'driverdutyreport');
  }


  exportToPdf() {
    this.pdfservice.CreatePDFData(this.excelData, 'Driver Duty Report')
  }

  ReportPDFDownload() {
    var sTable = document.getElementById('ReportForPDF').innerHTML;
    var style = "<style>";
    style = style + "table {width: 100%;font: 13px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + ".center{display: inline-block;width: 175px;border: 3px solid #73AD21;color: black;margin: 0px 4% 0 3%;border-radius: 5px;}";
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
    this.device = ""; this.fromDate = ""; this.toDate = ""; this.fromTime = ""; this.toTime = "";

    document.getElementById("inputform").style.display = "block";
    document.getElementById("outputform").style.display = "none";

    this.ngOnInit();
  }

}
