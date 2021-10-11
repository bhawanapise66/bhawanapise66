import { PostService } from './../../../../../post.service';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { ListService } from './../../../../../list.service';
import { ReportService } from './../../services/report.service';
import { ExportToExcelService } from './../../services/export-to-excel.service';
import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var jQuery: any;
import * as moment from 'moment';
import { HistoryService } from 'src/mapservices/history.service';
import { PdfService } from '../../services/pdf.service';



declare var PopupInitialize: any;
declare var mapBuild: any;
declare var SwitchMap: any;



declare var container: any;
declare var content: any;
declare var closer: any;




declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-alert-resolve-report',
  templateUrl: './alert-resolve-report.component.html',
  styleUrls: ['./alert-resolve-report.component.css']
})
export class AlertResolveReportComponent implements OnInit {
  loginRoleId: string;


  customerList: any[]; divisionList: any[]; subDivisionlist: any[]; sectionList: any[]; groupList: any[]; deviceList: any[];
  customerId: string; divisionIdArr: any[] = []; subdivisionIdArr: any[] = []; sectionIdArr: any[] = []; groupIdArr: any[] = []; deviceIdArr: any[] = [];

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
  key; reverse: boolean = true;
  responseGridArray: any;
  responseGridArrayforPDF: any;
  locationAddress: any[] = [];


  constructor(private excelservice: ExportToExcelService, private router: Router, private listService: ListService, private cryptService: CryptService, private historyservice: HistoryService, private reportService: ReportService, private pdfservice: PdfService) {
    this.EncryptPageName(); this.EncryptPageUrl();
    this.loginRoleId = sessionStorage.getItem('rid');

    if (this.loginRoleId == '10' || this.loginRoleId == '11'|| this.loginRoleId == '16'|| this.loginRoleId == '21') {
      this.getCustomerList(); this.isCustomer = false;
    }
    else if (this.loginRoleId == "18") { this.isCustomer = true; this.customerId = ''; this.getGroupList(); this.getDivisionList() }

    if (this.loginRoleId == "25") {
      this.customerId = ''; this.isSubDivision = true; this.divisionIdArr = []; this.getDeptList();
    }
    if (this.loginRoleId == "24") {
      this.customerId = ''; this.isDivision = true; this.getSubDivisionList()
    }
    if (this.loginRoleId == "22") {
      this.customerId = ''; this.getGroupList(); this.isSection = true;
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


  getDivisionList() {
    this.divisionIdArr = []; this.subdivisionIdArr = []; this.sectionIdArr = []; this.groupIdArr = []; this.deviceIdArr = []

    let dataL = {
      param1: this.customerId,
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
  changeDivision() {
    this.subdivisionIdArr = []; this.sectionIdArr = []; this.groupIdArr = []; this.deviceIdArr = []; this.divisionChanged = true
  }
  getSubDivisionList() {
    if (this.divisionChanged == true) {
      let dataL = {
        param1: this.customerId,// custumerid, 
        groupList: [],// this.groupIdArr,// groupid[], 
        divisionList: this.divisionIdArr,// divisionid[],
        "pageID": "rte",
        "pageName": this.encryptedpageNameValue,
        "pageURL": this.encryptedpageUrlValue
      }
      AddLoader()
      this.listService.subdivisionlistv1(dataL).subscribe((response) => {
        RemoveLoader()
        this.subDivisionlist = response.entity
      })
      this.divisionChanged = false;
    }
  }


  changeSubDiv() {
    this.sectionIdArr = [];
    this.groupIdArr = [];
    this.deviceIdArr = [];
    this.subdivChanged = true
  }
  getDeptList() {
    if (this.subdivChanged == true) {
      let dataL = {
        param1: this.customerId,
        groupList: [],// groupid[], 
        divisionList: this.divisionIdArr,// divisionid[],
        subDivisionList: this.subdivisionIdArr,// subdivisionid[],
        "pageID": "",
        "pageName": this.encryptedpageNameValue,
        "pageURL": this.encryptedpageUrlValue
      }
      AddLoader()
      this.listService.departmentlistv1(dataL).subscribe((response) => {
        RemoveLoader();
        this.sectionList = response.entity;
      })
      this.subdivChanged = false
    }
  }

  changeSection() {
    this.groupIdArr = []; this.sectionChanged = true;
  }

  getGroupList() {
    if (this.sectionChanged == true) {

      let dataL = {
        param1: this.customerId,
        "pageID": "wegw",
        "pageName": this.encryptedpageNameValue,
        "pageURL": this.encryptedpageUrlValue
      }
      AddLoader()
      this.listService.grouplist(dataL).subscribe(response => {
        RemoveLoader()
        this.groupList = response.entity;
      })
      this.sectionChanged = false
    }
  }

  setdevicelist() {
    this.deviceIdArr = []
  }

  GetVehicleListAfterCustomer() {
    let dataL = {
      param1: this.customerId,
      groupList: this.groupIdArr,
      divisionList: this.divisionIdArr,
      subDivisionList: this.subdivisionIdArr,
      dpartmentList: this.sectionIdArr,
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

    if (this.loginRoleId == "10" || this.loginRoleId == "11") {
      if (this.customerId == '' || this.divisionIdArr.length == 0 || this.subdivisionIdArr.length == 0 || this.sectionIdArr.length == 0 || this.groupIdArr.length == 0 || this.deviceIdArr.length == 0) {
        this.submitted = true
      }
      else { this.GetAlerteReport() }
    }
    else if (this.isCustomer == true) {
      if (this.divisionIdArr.length == 0 || this.subdivisionIdArr.length == 0 || this.sectionIdArr.length == 0 || this.groupIdArr.length == 0 || this.deviceIdArr.length == 0) {
        this.submitted = true
      }
      else { this.GetAlerteReport() }
    }

    else if (this.isDivision == true) {
      if (this.subdivisionIdArr.length == 0 || this.sectionIdArr.length == 0 || this.groupIdArr.length == 0 || this.deviceIdArr.length == 0) {
        this.submitted = true
      }
      else { this.GetAlerteReport() }
    }
    else if (this.isSubDivision == true) {
      if (this.sectionIdArr.length == 0 || this.groupIdArr.length == 0 || this.deviceIdArr.length == 0) {
        this.submitted = true
      }
      else { this.GetAlerteReport() }
    } else if (this.isSection == true) {
      if (this.groupIdArr.length == 0 || this.deviceIdArr.length == 0) {
        this.submitted = true
      }
      else { this.GetAlerteReport() }
    }
  }


  GetAlerteReport() {

    let vehicledata = [];

    if (this.deviceList.length == this.deviceIdArr.length) { vehicledata = ['All'] }
    else { vehicledata = this.deviceIdArr }


    let dataL = {
      "param1": this.customerId,// "selectcustomerid-->ALL/ID",
      "selectvehicleid": vehicledata,// "selectvehicleid[]",
      "param3": this.fromDate,// "fromdate",
      "param4": this.fromTime,// "fromtime",
      "param5": this.toDate,// "todate",
      "param6": this.toTime,// "totime",
      "divisionList": this.divisionIdArr,// "divisionid[]",
      "subDivisionList": this.subdivisionIdArr,// "subdivisionid[]",
      "dpartmentList": this.sectionIdArr,// "departmentid[]",
      "groupList": this.groupIdArr,// "groupid[]",
      "param15": "All",// "selectpoiid-->ALL/ID",
      "pageNo": this.pageNumber,
      "itemsPerPage": this.itemsPerPage,
      "searchBy": this.filter,
      "searchType": "",
      "totalRecords": this.totalrecord,
      "pageID": "7",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageNameValue
    }
    AddLoader()
    this.reportService.railAlertResolveReport(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        this.responseGridArray = response.entity.list;
        this.viewcount = this.responseGridArray.length;

        if (this.ValueAlreadyGot == false) {
          this.totalcount = response.entity.count;
        }
        document.getElementById('inputform').style.display = 'none'
        document.getElementById('outputform').style.display = 'block'
      }
      else {
        this.errorMessage = response.entity;
        $("#ErrorModal").modal('show')
      }
    })
  }

  changePage(event) {
    this.ValueAlreadyGot = true;
    this.pageNumber = event;
    this.totalrecord = this.totalcount;
    this.GetAlerteReport()
  }

  changeItemsPerPage() {
    this.ValueAlreadyGot = true;
    this.totalrecord = this.totalcount;
    this.GetAlerteReport()
  }

  searchdata() {
    this.ValueAlreadyGot = false;
    this.pageNumber = 1;
    this.GetAlerteReport()
  }

  Refreshfunction() {
    this.ValueAlreadyGot = false;
    this.itemsPerPage = 10;
    this.pageNumber = 1;
    this.filter = ''
    this.GetAlerteReport();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  exportToPDF() {

    let dataL = {
      "param1": this.customerId,// "selectcustomerid-->ALL/ID",
      "selectvehicleid": this.deviceIdArr,// "selectvehicleid[]",
      "param3": this.fromDate,// "fromdate",
      "param4": this.fromTime,// "fromtime",
      "param5": this.toDate,// "todate",
      "param6": this.toTime,// "totime",
      "divisionList": this.divisionIdArr,// "divisionid[]",
      "subDivisionList": this.subdivisionIdArr,// "subdivisionid[]",
      "dpartmentList": this.sectionIdArr,// "departmentid[]",
      "groupList": this.groupIdArr,// "groupid[]",
      "param15": "All",// "selectpoiid-->ALL/ID",
      "pageNo": "1",
      "itemsPerPage": "",
      "searchBy": this.filter,
      "searchType": "",
      "totalRecords": 'NA',
      "pageID": "7",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageNameValue
    }
    this.reportService.railAlertResolveReport(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.responseGridArrayforPDF = response.entity.list;
        var pdfTableData;
        var dataArray = []
        for (let i = 0; i < this.responseGridArrayforPDF.length; i++) {
          pdfTableData = {
            "#": this.responseGridArrayforPDF[i]["rowNumber"],
            "Vehicle name": this.responseGridArrayforPDF[i]["param8"],
            "Alert Name": this.responseGridArrayforPDF[i]["param19"],
            "Alert Time": this.responseGridArrayforPDF[i]["param6"],
            "Resolve Time": this.responseGridArrayforPDF[i]["param5"],
            "Action Taken": this.responseGridArrayforPDF[i]["param20"],
            "Reason": this.responseGridArrayforPDF[i]["param22"],
            "Person Name": this.responseGridArrayforPDF[i]["param21"],
          }
          dataArray.push(pdfTableData)
        };
        this.pdfservice.CreatePDFData(dataArray, "Railway Distance Report");
      }
      else {
        this.errorMessage = response.entity;
        $("#ErrorModal").modal('show')
      }
    })
  }


  gotoBack() {
    document.getElementById('inputform').style.display = 'block';
    document.getElementById('outputform').style.display = 'none';

    this.customerId = ''; this.divisionIdArr = []; this.subdivisionIdArr = []; this.sectionIdArr = []; this.groupIdArr = []; this.deviceIdArr = []
 this.ngOnInit();
 document.getElementById('inputform').style.display = 'block'
 document.getElementById('outputform').style.display = 'none'
  }

  viewlocation(data) {
    let dataL = {
      param1: data.param10,    //lattitude
      param2: data.param9,    //longitude
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.reportService.getlocation(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        let locaAddr = response.entity.list[0];
        $('#beforeapi' + data.rowNumber).hide();
        $('#afterapi' + data.rowNumber).show();
        this.locationAddress[data.rowNumber] = locaAddr.param1;
      }
      else {
      }
    })
  }
  exportToExcel() {
    let dataL = {
      "param1": this.customerId,// "selectcustomerid-->ALL/ID",
      "selectvehicleid": this.deviceIdArr,// "selectvehicleid[]",
      "param3": this.fromDate,// "fromdate",
      "param4": this.fromTime,// "fromtime",
      "param5": this.toDate,// "todate",
      "param6": this.toTime,// "totime",
      "divisionList": this.divisionIdArr,// "divisionid[]",
      "subDivisionList": this.subdivisionIdArr,// "subdivisionid[]",
      "dpartmentList": this.sectionIdArr,// "departmentid[]",
      "groupList": this.groupIdArr,// "groupid[]",
      "param15": "All",// "selectpoiid-->ALL/ID",
      "pageNo": "1",
      "itemsPerPage": "",
      "searchBy": this.filter,
      "searchType": "",
      "totalRecords": 'NA',
      "pageID": "7",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageNameValue
    }
    this.reportService.railAlertResolveReport(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.responseGridArrayforPDF = response.entity.list;
        this.PrepareExcelData(this.responseGridArrayforPDF)
      }
    })
  }
  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "VEHICLE NUMBER": data[i].param8,
        "ALERT NAME ": data[i].param19,
        "ALERT TIME": data[i].param6,
        "RESOLVED TIME": data[i].param5,
        "ACTION TAKEN": data[i].param2,
        "PERMISSION": data[i].param20,
        "REASON": data[i].param22,
        "PERSON NAME": data[i].param21,
        "MOBILE NUMBER": data[i].param3,

      }
      this.excelData.push(obj);
    }
    this.excelservice.ExportExcel(this.excelData, 'Alert Resolve Report', 'alertresolvereport');

  }


  Openmap(data) {
    let data1 = data.param5;
    let fromDateTimeArray = [];
    fromDateTimeArray = data1.split(' ');
    let fromDate = fromDateTimeArray[0];
    let fromTime = fromDateTimeArray[1] + " " + fromDateTimeArray[2]

    let data2 = data.param6;
    let toDateTimeArray = [];
    toDateTimeArray = data2.split(' ');
    let toDate = toDateTimeArray[0];
    let toTime = toDateTimeArray[1] + " " + toDateTimeArray[2]

    console.log(fromDate + " ," + fromTime + ' ,' + toDate + ' ,' + toTime)

    document.getElementById("map").style.height = screen.height - 220 + "px"
    $('#maptrack').modal('show');

    if (this.maploadflag == 0) {

      //==============map functionality

      //===== BuildMap
      let center = [79.0882, 21.1458]
      try { new mapBuild('map', center) } catch (e) { }
      try {
        container = document.getElementById("popup");
        content = document.getElementById("popup-content");
        closer = document.getElementById("popup-closer");

        PopupInitialize();
      } catch (e) { }
      try { SwitchMap("3") } catch (e) { alert("come" + e) }
      this.maploadflag = 1;

      this.historyData = {

        fromdate: fromDate,
        fromtime: fromTime,
        todate: toDate,
        totime: toTime,
      }

      //call History Funciton

      //=========== mapfunctionality end
    }

    var staticdetails = {

      "pageID": "1",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }

    // this.historyservice.HistoryPlot(data.param2, data.param2, this.historyData.fromdate, this.historyData.fromtime, this.historyData.todate, this.historyData.totime, '0', '0', '5', staticdetails);
    this.historyservice.HistoryPlot(data.param1, data.param3, fromDate, fromTime, toDate, toTime, 0, 0, 5, staticdetails)

  }

  preswitchid = "3"
  MapSwitch(layerindex) {
    try {
      if (this.preswitchid != "") {
        $("#switch" + this.preswitchid).removeClass("activeSwitchOption effect8");
      }
      this.preswitchid = layerindex;
    } catch (e) { }
    $("#switch" + layerindex).addClass("activeSwitchOption effect8");

    try { SwitchMap(layerindex) } catch (e) { }
  }



  OpenCollapse() {
    $("#mapswitcher").collapse('show');

  }

  CloseCollapse() {
    $("#mapswitcher").collapse('hide');
  }

}

