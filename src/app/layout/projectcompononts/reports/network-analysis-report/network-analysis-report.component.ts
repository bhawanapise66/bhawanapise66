import { ReportService } from './../../services/report.service';
import { HistoryService } from 'src/mapservices/history.service';
import { ListService } from 'src/list.service';
import { CryptService } from './../../services/crypt.service';
import { Router } from '@angular/router';
import { ExportToExcelService } from './../../services/export-to-excel.service';
import { PdfService } from './../../services/pdf.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
declare var jQuery: any;
declare var $: any;

declare var AddLoader: any;
declare var RemoveLoader: any;


@Component({
  selector: 'app-network-analysis-report',
  templateUrl: './network-analysis-report.component.html',
  styleUrls: ['./network-analysis-report.component.css']
})
export class NetworkAnalysisReportComponent implements OnInit {
  encryptedpageNameValue: any;
  encryptedpageUrlValue: any;
  pageUrl: any = this.router.url;
  vendorList: any[] = []; deviceList: any[] = []; vendorIdArr: any[] = []; deviceIdArr: any[] = [];
  selectDateArray: string[];
  fromDate: string;
  toDate: string;
  submitted: boolean = false;
  pageNumber: any = 1;
  itemsPerPage: any = 10;
  filter: string = '';
  totalrecord: any = "NA";
  ValueAlreadyGot: boolean = false;
  totalcount: any;
  responseGridArray: any[];
  viewcount: any;
  errorMessage: any;
  key: any;
  reverse: boolean = false;
  d: Date;
  responseGridArraypdf: any;
  PDFData: any[];
  excelData: any;


  constructor(private pdfservice: PdfService, private excelservice: ExportToExcelService, private router: Router, private listService: ListService, private cryptService: CryptService, private historyservice: HistoryService, private reportService: ReportService) {
    this.EncryptPageName(); this.EncryptPageUrl();
    // this.loginRoleId = sessionStorage.getItem('rid');
    this.getVendorList()
    // if (this.loginRoleId == '10' || this.loginRoleId == '11') {
    //   this.isCustomer = false;
    //   this.getCustomerList();
    // }
    // else {
    //   this.isCustomer = true;
    // this.getVehicleList()
    // }

  }

  ngOnInit() {
    // this.showChart()


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
    this.cryptService.encrypt("Network Analysis Report")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl);
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }


  getVendorList() {
    let dataL = {
      param1: 'Device',
      param2:''
    }
    this.listService.VendorListAPI(dataL).subscribe((response) => {
      this.vendorList = response.entity;
    })
  }

  getVehicleList() {
    if (this.vendorIdArr.length > 0) {
      let dataL = {
        vendorList: this.vendorIdArr,
      }
      AddLoader()
      this.listService.vendorAssignVehicleList(dataL).subscribe((response) => {
        RemoveLoader()
        if (response.statuscode == 200) {
          this.deviceList = response.entity;
        }
      })
    }
  }



  onSubmit() {

    const inputElement = document.getElementById('daterange').innerHTML;
    this.selectDateArray = inputElement.split(' to ', 2);
    this.fromDate = this.selectDateArray[0];
    this.toDate = this.selectDateArray[1];

    this.d = new Date();
    if (this.vendorIdArr.length == 0 || this.deviceIdArr.length == 0) {
      this.submitted = true;
    }
    else {
      this.GetExcpetionReport();
    }

  }
  getcolor(value) {
    return value == '0' ? '#dc2f2ffa' : '#ffffff00'
  }


  GetExcpetionReport() {
    if (this.ValueAlreadyGot == false) { this.totalrecord = "NA" }
    else { this.totalrecord = this.totalcount; }
    let dataL = {
      "param1": "ALL",
      "selectvehicleid": this.deviceIdArr,
      "param3": this.fromDate,
      "param4": "00:00:00",
      "param5": this.toDate,
      "param6": "23:59:59",
      "vendorList": this.vendorIdArr,
      "pageNo": this.pageNumber,
      "itemsPerPage": this.itemsPerPage,
      "searchBy": this.filter,
      "searchType": "",
      "totalRecords": this.totalrecord,
      "pageID": "7",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    AddLoader()
    this.reportService.NetworkAnalysis(dataL).subscribe((response) => {
      RemoveLoader();
      if (response.statuscode == 200) {
        document.getElementById("inputform").style.display = 'none';
        document.getElementById("outputform").style.display = 'block'
        this.responseGridArray = response.entity;
        this.viewcount = this.responseGridArray.length;
        if (this.ValueAlreadyGot == false) {
          this.totalcount = response.count;
          // this.showChart();
        }
      }
      else {
        this.errorMessage = response.entity;
        $("#ErrorModal").modal('show')
      }
    })
  }


  pageChange(event) {
    this.ValueAlreadyGot = true;
    this.pageNumber = event;
    this.totalrecord = this.totalcount;
    this.GetExcpetionReport();
  }

  searchdata() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1
    this.GetExcpetionReport();
  }

  changeItemsPerPage() {
    this.ValueAlreadyGot = true;
    this.pageNumber = 1
    this.totalrecord = this.totalcount;
    this.GetExcpetionReport();
  }

  Refreshfunction() {
    this.ValueAlreadyGot = false;
    this.itemsPerPage = 10;
    this.pageNumber = 1;
    this.filter = '';
    this.GetExcpetionReport();
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }


  
  gotoBack() {
this.vendorIdArr = [];
     this.deviceIdArr = []; this.fromDate = ""; this.toDate = "";
    document.getElementById("inputform").style.display = "block";
    document.getElementById("outputform").style.display = "none";

    this.ngOnInit();
  }

  createPdf() {
    let dataL = {
      "param1": "ALL",
      "selectvehicleid": this.deviceIdArr,
      "param3": this.fromDate,
      "param4": "00:00:00",
      "param5": this.toDate,
      "param6": "23:59:59",
      "vendorList": this.vendorIdArr,
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
    this.reportService.NetworkAnalysis(dataL).subscribe((response) => {
      RemoveLoader();
      if (response.statuscode == 200) {
        this.responseGridArraypdf = response.entity;
        this.PreparePDFData(this.responseGridArraypdf)
      }
    })
  }

  PreparePDFData(data) {
    this.PDFData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "Vendor Name": data[i].param7,
        "Device Type": data[i].param16,
        "IMEI No.": data[i].param2,
        "Vehicle No": data[i].param10,
        "Start Time": data[i].param18,
        "End Time": data[i].param19,
        "Live Count": data[i].param4,
        "History Count": data[i].param5,
      }
      this.PDFData.push(obj);
    }
    this.pdfservice.CreatePDFData(this.PDFData, 'Network Analysis Report')
  }

  createExcel() {
    let dataL = {
      "param1": "ALL",
      "selectvehicleid": this.deviceIdArr,
      "param3": this.fromDate,
      "param4": "00:00:00",
      "param5": this.toDate,
      "param6": "23:59:59",
      "vendorList": this.vendorIdArr,
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
    this.reportService.NetworkAnalysis(dataL).subscribe((response) => {
      RemoveLoader();
      if (response.statuscode == 200) {
        this.responseGridArraypdf = response.entity;
        this.PrepareExcelData(this.responseGridArraypdf)
      }
    })
  }

  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "Vendor Name": data[i].param7,
        "Device Type": data[i].param16,
        "IMEI No.": data[i].param2,
        "Vehicle No": data[i].param10,
        "Start Time": data[i].param18,
        "End Time": data[i].param19,
        "Live Count": data[i].param4,
        "History Count": data[i].param5,
      }
      this.excelData.push(obj);
    }
    this.excelservice.ExportExcel(this.excelData, 'Network Analysis Report','netowkranalysis')
  }
}
