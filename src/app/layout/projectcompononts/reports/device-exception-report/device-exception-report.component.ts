import { PdfService } from './../../services/pdf.service';
import { PostService } from './../../../../../post.service';
import { Splitter } from '@fullcalendar/core';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { ListService } from './../../../../../list.service';
import { ReportService } from './../../services/report.service';
import { routerTransition } from 'src/app/router.animations';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormBuilder, FormControl } from '@angular/forms';

// import { wickedpicker } from 'src/assets/timepicker/'
import 'src/assets/timepicker/wickedpicker.js'
// developer : dhammadeep dahiwale
// date 28-sep -2020

import { Component, OnInit, HostBinding, ElementRef, ViewChild } from '@angular/core';
import { Time } from '@angular/common';
import * as moment from 'moment';
declare var $: any;
// import '../../../../../assets/timepicker/wickedpicker.js'
import '../../../../../assets/timepicki/js/timepicki.js'
import '../../../../../assets/timepicki/css/timepicki.css'
import * as $ from 'jquery'

//import * as $ from 'jquery';
declare var jQuery: any;
import * as xlsx from 'xlsx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// import { BnNgIdleService } from 'bn-ng-idle';
import { ExportToExcelService } from '../../services/export-to-excel.service';
import { HistoryService } from 'src/mapservices/history.service';

declare var PopupInitialize: any;
declare var mapBuild: any;
declare var SwitchMap: any;
declare var container: any;
declare var content: any;
declare var closer: any;

declare var AddLoader: any;
declare var RemoveLoader: any;


import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/frozen";

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-device-exception-report',
  templateUrl: './device-exception-report.component.html',
  styleUrls: ['./device-exception-report.component.css']
})
export class DeviceExceptionReportComponent implements OnInit {


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
  vendorList: any;
  vendorIdArr: any[] = [];
  // vendorIdArr: string;


  constructor(private pdfservice: PdfService, private excelservice: ExportToExcelService, private router: Router, private listService: ListService, private cryptService: CryptService, private historyservice: HistoryService, private reportService: ReportService) {
    this.EncryptPageName(); this.EncryptPageUrl();
    this.loginRoleId = sessionStorage.getItem('rid');
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
    this.cryptService.encrypt("Device Exception Report")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl);
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }

  // getCustomerList() {
  //   let dataL = {
  //     pageID: "2",
  //     "pageName": this.encryptedpageNameValue,
  //     "pageURL": this.encryptedpageUrlValue
  //   }
  //   this.listService.CustomerListAPI(dataL).subscribe((response) => {
  //     this.customerList = response.entity.list;
  //   })
  // }

  getVendorList() {
    let dataL = {
      param1: '',
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
    this.reportService.Exceptionreport(dataL).subscribe((response) => {
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

  createExcel() {
    let dataL = {
      param1: this.customerId,
      selectvehicleid: this.deviceIdArr,
      param3: this.fromDate,// "fromdate",
      param4: this.fromTime,// "fromtime",
      param5: this.toDate,// "todate",
      param6: this.toTime,// "totime",
      divisionList: [],// "divisionid[]",
      subDivisionList: [],// "subdivisionid[]",
      dpartmentList: [],// "departmentid[]",
      groupList: [],// "groupid[]",
      pageNo: "",
      itemsPerPage: "",
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (err) { }
    this.reportService.RailDistanceReport(dataL).subscribe((response) => {
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
        "VEHICLE NUMBER": data[i].param3,
        "START DATE": data[i].param4,
        "END DATE": data[i].param5,
        "DURATION": data[i].param22,
        "DISTANCE": data[i].param6,
        "ODOMETER DISTANCE": data[i].param14,
        "WORKING TIME": data[i].param17,
        "IDLE TIME": data[i].param18,
        "STOPPAGE TIME": data[i].param19,
      }
      this.excelData.push(obj);
    }
    this.exportToExcel()
  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'Device Exception Report', 'deviceexceptionreport');
  }
  createPdf() {
    let dataL = {
      param1: this.customerId,
      selectvehicleid: this.deviceIdArr,
      param3: this.fromDate,// "fromdate",
      param4: this.fromTime,// "fromtime",
      param5: this.toDate,// "todate",
      param6: this.toTime,// "totime",
      divisionList: [],// "divisionid[]",
      subDivisionList: [],// "subdivisionid[]",
      dpartmentList: [],// "departmentid[]",
      groupList: [],// "groupid[]",
      pageNo: "",
      itemsPerPage: "",
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (err) { }
    this.reportService.RailDistanceReport(dataL).subscribe((response) => {
      if (response.statuscode == 200) {

        this.responseGridArrayForPdf = response.entity;
        try { RemoveLoader() } catch (err) { }
        this.PreparePDFData(this.responseGridArrayForPdf);
      }
    })

  }
  PreparePDFData(data) {
    this.PDFData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "VEHICLE NUMBER": data[i].param3,
        "START DATE": data[i].param4,
        "END DATE": data[i].param5,
        "DURATION": data[i].param22,
        "DISTANCE": data[i].param6,
        "ODOMETER DISTANCE": data[i].param14,
        "WORKING TIME": data[i].param17,
        "IDLE TIME": data[i].param18,
        "STOPPAGE TIME": data[i].param19,
      }
      this.PDFData.push(obj);
    }
    this.exportToPdf()
  }
  exportToPdf() {
    this.pdfservice.CreatePDFData(this.PDFData, 'Device Exception Report')
  }


  gotoBack() {
    (document.getElementById('fromTime') as HTMLInputElement).value = "00:00";
    (document.getElementById('toTime') as HTMLInputElement).value = "23:59";
    this.customerId = null; this.deviceIdArr = []; this.fromDate = ""; this.toDate = ""; this.fromTime = ""; this.toTime = "";

    document.getElementById("inputform").style.display = "block";
    document.getElementById("outputform").style.display = "none";

    this.ngOnInit();
  }


  showChart() {

    let chart = am4core.create('chartdiv', am4charts.XYChart)
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend()
    chart.legend.position = 'top'
    chart.legend.paddingBottom = 20
    chart.legend.labels.template.maxWidth = 95

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
    xAxis.dataFields.category = 'category'
    xAxis.renderer.cellStartLocation = 0.1
    xAxis.renderer.cellEndLocation = 0.9
    xAxis.renderer.grid.template.location = 0;

    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;

    function createSeries(value, name) {
      let series = chart.series.push(new am4charts.ColumnSeries())
      series.dataFields.valueY = value
      series.dataFields.categoryX = 'category'
      series.name = name

      series.events.on("hidden", arrangeColumns);
      series.events.on("shown", arrangeColumns);

      let bullet = series.bullets.push(new am4charts.LabelBullet())
      bullet.interactionsEnabled = false
      bullet.dy = 30;
      bullet.label.text = '{valueY}'
      bullet.label.fill = am4core.color('#ffffff')

      return series;
    }


    chart.data = [
      //   { category: 'Place #1', first: 40, second: 55, },
      //   { category: 'Place #2', first: 30, second: 78, },
      //   { category: 'Place #3', first: 27, second: 40, },
      //   { category: 'Place #4', first: 50, second: 33, }
    ]

    for (let i = 0; i < this.responseGridArray.length; i++) {
      chart.data.push({ category: this.responseGridArray[i].param8, first: parseInt(this.responseGridArray[i].param4), second: parseInt(this.responseGridArray[i].param5) })
    }

    createSeries('first', 'Live');
    createSeries('second', 'History');

    function arrangeColumns() {

      let series = chart.series.getIndex(0);

      let w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
      if (series.dataItems.length > 1) {
        let x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
        let x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
        let delta = ((x1 - x0) / chart.series.length) * w;
        if (am4core.isNumber(delta)) {
          let middle = chart.series.length / 2;

          let newIndex = 0;
          chart.series.each(function (series) {
            if (!series.isHidden && !series.isHiding) {
              series.dummyData = newIndex;
              newIndex++;
            }
            else {
              series.dummyData = chart.series.indexOf(series);
            }
          })
          let visibleCount = newIndex;
          let newMiddle = visibleCount / 2;

          chart.series.each(function (series) {
            let trueIndex = chart.series.indexOf(series);
            let newIndex = series.dummyData;

            let dx = (newIndex - trueIndex + middle - newMiddle) * delta

            series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
            series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
          })
        }
      }
    }

  }
}
