import { ListService } from './../../../../../list.service';

import { Component, OnInit } from '@angular/core';
import { NgOption } from '@ng-select/ng-select';
import { PdfService } from '../../services/pdf.service';
import { ExportToExcelService } from '../../services/export-to-excel.service';
import { ReportService } from '../../services/report.service';
import { HistoryService } from 'src/mapservices/history.service';
import { CryptService } from '../../services/crypt.service';
import { Router } from '@angular/router';
import { PostService } from 'src/post.service';
import * as moment from 'moment';
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
declare var jQuery: any;

@Component({
  selector: 'app-timeviewer',
  templateUrl: './timeviewer.component.html',
  styleUrls: ['./timeviewer.component.css']
})
export class TimeviewerComponent implements OnInit {
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



  constructor(private pdfservice: PdfService, private excelservice: ExportToExcelService, private router: Router, private listService: ListService, private cryptService: CryptService, private historyservice: HistoryService, private reportService: ReportService) {
    this.EncryptPageName(); this.EncryptPageUrl();
    this.loginRoleId = sessionStorage.getItem('rid');

    if (this.loginRoleId == '10' || this.loginRoleId == '11') {
      this.isCustomer = false;
      this.getCustomerList();
    }
    else {
      this.isCustomer = true;
      this.getVehicleList()
    }

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
        var start = moment().subtract(29, 'days');
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
    this.cryptService.encrypt("keyman_patrolman Report")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl);
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }

  getCustomerList() {
    let dataL = {
      pageID: "2",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.CustomerListAPI(dataL).subscribe((response) => {
      this.customerList = response.entity.list;
    })
  }

  getVehicleList() {
    let dataL = {
      param1: '',
      groupList: [],
      divisionList: [],
      subDivisionList: [],
      dpartmentList: [],
      "pageID": "",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    AddLoader()
    this.listService.vehicleListv1(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        this.deviceList = response.entity;
      }
    })
  }
  GetVehicleListAfterCustomer() {
    let dataL = {
      param1: this.customerId,
      groupList: [],
      divisionList: [],
      subDivisionList: [],
      dpartmentList: [],
      "pageID": "",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    AddLoader()
    this.listService.vehicleListv1(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        this.deviceList = response.entity;
      }
    })
  }

  onSubmit() {

    const inputElement = document.getElementById('daterange').innerHTML;
    this.selectDateArray = inputElement.split(' to ', 2);
    this.fromDate = this.selectDateArray[0];
    this.toDate = this.selectDateArray[1];


    this.fromTime = $('#fromTime').val();
    this.toTime = $('#toTime').val();

    this.d = new Date();

    if (this.deviceIdArr == [] || this.deviceIdArr == [] || this.fromDate == "" || this.fromDate == null ||
      this.toDate == "" || this.toDate == null || this.fromTime == "" || this.fromTime == null || this.toTime == "" || this.toTime == null) {
      this.submitted = true;
    }
    else {
      this.submitted = false;
      this.ValueAlreadyGot = false;
      this.GetDistanceReport();
    }
  }

  GetDistanceReport() {
    let vehicledata = [];
    if (this.deviceList.length == this.deviceIdArr.length) { vehicledata = ['All'] }
    else { vehicledata = this.deviceIdArr }

    if (this.ValueAlreadyGot == true) {
      this.totalrecord = this.totalcount;
    }
    else { this.totalrecord = "NA" }
    let dataL = {
      param1: this.customerId,
      selectvehicleid: vehicledata,
      param3: this.fromDate,// "fromdate",
      param4: this.fromTime,// "fromtime",
      param5: this.toDate,// "todate",
      param6: this.toTime,// "totime",
      divisionList: [],// "divisionid[]",
      subDivisionList: [],// "subdivisionid[]",
      dpartmentList: [],// "departmentid[]",
      groupList: [],// "groupid[]",
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
    this.reportService.RailDistanceReport(dataL).subscribe((response) => {
      RemoveLoader();
      if (response.statuscode == 200) {
        document.getElementById("inputform").style.display = 'none';
        document.getElementById("outputform").style.display = 'block'

        if (this.ValueAlreadyGot == false) {
          this.totalMaxSpeed = response.maxspeed;
          this.totalgpsdistance = response.totaldistance;
          this.totalIdleTime = response.totalidletime;
          this.totalododistance = response.totalododistance;
          this.totalstoppagetime = response.totalstoppagetime;
          this.totalworkingtime = response.totalworkingtime;
          this.totalcount = response.count;
        }
        this.viewcount = response.entity.length;
        this.responseGridArray = response.entity;

      }
      else {
        this.errorMessage = response.entity;
        $("#ErrorModal").modal('show')
      }
    })
  }


}
