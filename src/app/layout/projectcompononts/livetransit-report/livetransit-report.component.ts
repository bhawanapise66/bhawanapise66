import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { PostService } from 'src/post.service';
import { Router } from '@angular/router';
import { CryptService } from '../services/crypt.service';
import { ListService } from 'src/list.service';
import { HistoryService } from 'src/mapservices/history.service';
import { ExportToExcelService } from '../services/export-to-excel.service';
import { PdfService } from '../services/pdf.service';
declare var $: any;

import * as $ from 'jquery'


import * as moment from 'moment';
declare var $: any;
import * as xlsx from 'xlsx';
import { DatePipe } from '@angular/common';
declare var jQuery: any;

declare var AddLoader: any;
declare var RemoveLoader: any;
@Component({
  selector: 'app-livetransit-report',
  templateUrl: './livetransit-report.component.html',
  styleUrls: ['./livetransit-report.component.css']
})
export class LivetransitReportComponent implements OnInit {

  config = {
    displayKey: "param2",    // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '300px',
  };
  totalrecord: any;
  totalcount: any;
  pageNumber: any = 1;
  itemsPerPage: any = 10;
  filter: any = '';
  fromDate: any = '';
  fromTime: any = '';
  encryptedpageNameValue: any;
  reportData: any;
  viewcount: any;
  ValueAlreadyGot: boolean = false;
  errorMessage: any;
  key: any;
  reverse: boolean = true;
  reportPDFData: any;
  excelData: any[];
  toDate: any = '';
  encryptedpageUrlValue: any;
  issearched: boolean = false;
  liveSelectlist: ['All Vehicle', 'District', 'Vendor']

  // liveSelectlist: [{param1:'All Vehicle',param2:'All Vehicle'},{param1:'District',param2:'District'},{param1:'Vendor',param2:'Vendor'}]
  liveselect: any
  vehiclelist: any = []; districtObj: any; vendorObj: any; vehicleObj: any;
  vendorlist: any = [];
  districtlist: any = [];
  vehicleNo: any = '';
  lessee: any = '';
  destination: any = '';
  Source: any = '';
  transit_id: any = '';
  duration: any = '';
  vendortypeid: any = '';
  devicetypeid: any = '';
  isDistrict: boolean = false;
  isVendor: boolean = false;
  submitted: boolean;
  districtselect: any;
  vendorselect: any;
  vendorlbl: any;
  districtlbl: any;
  selectDateArray: string[];
  toTime: any;
  d = new Date(); total_Vehicle: any;
  total_Tp: any;
  total_picked: any;
  total_reached: any;
  total_time_expired: any;
  polling: any;
  nonpolling: any;
  vendorname: any;
  distictName: any;
  today: any
  imeiNo: any;
  iccdNo: any;
  simMobile1: any;
  simMobile2:any;
  network1: any;
  network2: any;
  makename: any;
  modelname: any;

  constructor(private datePipe: DatePipe, private pdfservice: PdfService, private excelservice: ExportToExcelService, private reportService: ReportService, private historyservice: HistoryService, private listService: ListService, private cryptService: CryptService, private router: Router, private postService: PostService) {
    this.encryptedpageNameValue = this.cryptService.encrypt('Live_Transit Report')
    this.encryptedpageUrlValue = this.cryptService.encrypt(this.router.url)

  }

  ngOnInit() {

    this.today = this.datePipe.transform(new Date(), "dd MMM yyyy")
    console.log(this.today)
    this.getvehicleList();
    this.getvendorList();
    this.getDistrictList();
    // datepicker starts
    (function ($) {
      $(document).ready(function () {

        /* calander single  picker ends */
        $('.datepicker').daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          minYear: 2021,
          minMonth: 6
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
        var start = moment().subtract(1, 'days');
        var end = moment();


        this.initialDate = start;
        this.endDate = end;
        function cb(start, end) {
          $('#daterangeadminux2 span').html(start.format('D MMM YYYY') + ' - ' + end.format('D MMM YYYY'));
          //  $('#daterangeadminux2 span').html(start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        }

        $('#daterangeadminux2').daterangepicker({
          startDate: start,
          endDate: end,
          opens: 'left',
          maxDate: new Date(),
          dateLimit: { days: 30 }

        }, cb);

        // this.initialDate =  $('#daterangeadminux2 span').html(start.format('MMM D, YY')).stringify() ;

        cb(start, end);
        $('#daterangeadminux2').on('show.daterangepicker', function (ev, picker) {
          var thisdp = $('.daterangepicker');
          setTimeout(function () {
            thisdp.addClass('active');
          }, 100);
        });
        // var path = 'assets/images/background-part.png';
        // $('.daterangepicker').append('<div class="background" style="background-image: url(' + path + '); z-index:-1; height:80px;"><img src="assets/images/background-part.png" alt="" style="display:none"></div>')
      });

    })(jQuery);
    //  datepicker ends
  }

  onSubmit() {
    // const inputElement = document.getElementById('daterange').innerHTML;
    // this.selectDateArray = inputElement.split(' - ', 2);
    // this.fromDate = this.selectDateArray[0];
    // this.toDate = this.selectDateArray[1];
    // this.d = new Date();


    if (this.liveselect == null || this.liveselect == "") {
      this.submitted = true;
    }
    else if ((this.liveselect == 'District') && (this.districtObj == null || this.districtObj == "")) {
      this.submitted = true;
    }
    else if ((this.liveselect == 'Vendor') && (this.vendorObj == null || this.vendorObj == "")) {
      this.submitted = true;
    }
    else {
      this.submitted = false; this.ValueAlreadyGot = false; this.LivetransitReport()
      document.getElementById('inputform').style.display = 'none'
      document.getElementById('outputdata').style.display = 'block'
    }


  }


  // api call for the LivetransitReport report data show in grid 
  LivetransitReport() {
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
     pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (err) { }
    this.reportService.LivetransitReport(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (err) { }

      if (response.statuscode == 200) {
        this.reportData = response.entity.detailsdata
        this.total_Vehicle = response.total_vehicle == null || response.total_vehicle == '' ? "NA" : response.total_vehicle;
        this.total_Tp = response.total_tp == null || response.total_tp == '' ? "NA" : response.total_tp;
        this.total_picked = response.total_picked == null || response.total_picked == '' ? "NA" : response.total_picked;
        this.total_reached = response.total_reached == null || response.total_reached == '' ? "NA" : response.total_reached;
        this.total_time_expired = response.total_time_expired == null || response.total_time_expired == '' ? "NA" : response.total_time_expired
        this.polling = response.polling == null || response.polling == '' ? "NA" : response.polling;
        this.nonpolling = response.nonpolling == null || response.nonpolling == '' ? "NA" : response.nonpolling;
        this.viewcount = response.entity.viewCount;
        if (this.ValueAlreadyGot == false) {
          this.totalcount = response.entity.count;
          // this.reportPDF();
        }
        // document.getElementById("inputform").style.display = "none"
        // document.getElementById("outputform").style.display = "block"
      }
      else {
        this.errorMessage = response.entity;
        $("#ErrorModal").modal('show');
      }
    })

  }

  gotoBack() {
    document.getElementById('inputform').style.display = 'block'

    document.getElementById('outputdata').style.display = 'none'
  }
  // api call for vehiclelist 
  getvehicleList() {
    let dataL = {
      "param1": "jcYCA3xU/nItUAZWO5ZsKA==",
      "param2": "jcYCA3xU/nItUAZWO5ZsKA==",
      pageID: "",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.VehicleListReport(dataL).subscribe((response) => {
      this.vehiclelist = response.entity
      // console.log(this.vehiclelist)

    })
  }

  // api call for vehiclelist 
  getvendorList() {
    let dataL = {
      param1: this.vendortypeid,
      param2: this.devicetypeid,
      pageID: "",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.VendorList(dataL).subscribe((response) => {
      this.vendorlist = response.entity
      console.log(this.vendorlist)

    })
  }
  getVendor() {
    console.log(this.vendorObj)
    this.vendorname = this.vendorObj.param2;

  }
  getDistrict() {
    console.log(this.districtObj)
    this.distictName = this.districtObj.param2
  }
  // api call for vehiclelist 
  getDistrictList() {
    let dataL = {
      "param1": "dJ2lYyVrs+WXcoBwIKl+AA==",
      pageID: "",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.DistrictList(dataL).subscribe((response) => {
      this.districtlist = response.entity

    })
  }


  getData(item:any){
this.imeiNo=item.param5;
this.iccdNo=item.param6;
this.simMobile1=item.param9;
this.simMobile2=item.param11;
this.network1=item.param10;
this.network2=item.param12;
this.makename=item.param7;
this.modelname=item.pram8;
  }

  // function for searh data input field 
  searchdata() {
    this.ValueAlreadyGot = false;
    this.issearched = true;
    this.pageNumber = 1;
    this.LivetransitReport();
  }
  // function for Refresh data input field 
  refreshdata() {
    this.ValueAlreadyGot = false;
    this.itemsPerPage = 10;
    this.pageNumber = 1;
    this.filter = '';
    this.LivetransitReport();
  }
  // function for changeItemsPerPage  input field
  changeItemsPerPage() {
    if (this.issearched == false) {
      this.filter = ''
    }
    this.ValueAlreadyGot = true;
    this.pageNumber = 1;
    this.LivetransitReport()
  }
  // function for changePageNo for pagination

  changePageNo(event) {
    if (this.issearched == false) {
      this.filter = ''
    }
    this.pageNumber = event;

    this.ValueAlreadyGot = true;
    this.LivetransitReport();
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
      param3: this.fromDate,
      param5: this.toDate,
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (err) { }
    this.reportService.LivetransitReport(dataL).subscribe((response) => {
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
        "Tp No.": data[i].param1,
        "Vehicle No.": data[i].param2,
        "Lessee": data[i].param2,
        "Customer Name": data[i].param3,
        "Device Detail": data[i].param8,
        "Route": data[i].param4,
        "Picked Status": data[i].param6,
        "Reached Status": data[i].param7,
        "Distance Travelled": data[i].param15,
        "Stoppage": data[i].param16
      }
      this.excelData.push(obj);
    }
  }


  exportToPdf() {
    this.pdfservice.CreatePDFData(this.excelData, 'Live Transit  Report')
  }
  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'Live Transit Report', 'LivetransitReport')
  }

  ReportPDFDownload() {
    var sTable = document.getElementById('ReportForPDF').innerHTML;
    // var style = "<style>";
    // style = style + "table {width: 100%;font: 12px Arial;}";
    // style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    // style = style + "padding: 2px 3px;text-align: center;}";
    // style = style + ".center{display: inline-block;width: 175px;border: 3px solid #73AD21;color: black;margin: 0px 4% 0 3%;border-radius: 5px;}";
    // style = style + "</style>";

    // CREATE A WINDOW OBJECT.
    var win = window.open('', '', 'height=700,width=700');

    win.document.write('<html><head>');
    // win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');
    win.document.close(); 	// CLOSE THE CURRENT WINDOW.

    win.print();    // PRINT THE CONTENTS.
    win.close();
  }
}


