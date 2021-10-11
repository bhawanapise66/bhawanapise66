import { ExportToExcelService } from './../../services/export-to-excel.service';
import { PostService } from './../../../../../post.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CryptService } from './../../services/crypt.service';
import { Router } from '@angular/router';
import { SummaryreportService } from './../../services/summaryreport.service';
import { ReportService } from './../../services/report.service';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { routerTransition } from 'src/app/router.animations';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';



declare var $: any;

import * as $ from 'jquery'


import * as moment from 'moment';
declare var $: any;
import * as xlsx from 'xlsx';
declare var jQuery: any;

@Component({
  selector: 'app-summaryreport',
  templateUrl: './summaryreport.component.html',
  styleUrls: ['./summaryreport.component.css'],
  animations: [routerTransition()]
})
export class SummaryreportComponent implements OnInit {

  loginRoleId: any; isCustomer: boolean = false; vehiclesavailable: boolean = false; selectDateArray = [];

  customerObj: any; deviceObj: any; customer: string = ''; device: string = ''; fromDate: string; toDate: string; StartTime: string; endTime: string;
  filter; count: number; trolleyReportArray = []; @ViewChild('epltable', { static: false }) epltable: ElementRef;

  divisionObj; divisionId; sectionObj; sectionId;

  viewData: boolean = false; outputVisible: boolean = false; submitted: boolean = false;
  customerListArray = []; vehicleList = [];
  config = {
    displayKey: "param2",
    // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };


  fromTime: any; toTime: any;
  reportResponseListForPDF: any; encryptedpageNameValue: string; encryptedpageUrlValue: string; pageUrl = this.router.url;

  inputVisible: boolean = true;

  constructor(private fb: FormBuilder, private postService: PostService, private reportService: ReportService,
    private sumrptService: SummaryreportService, private router: Router, private cryptService: CryptService,
    private modalService: NgbModal, public excelservice: ExportToExcelService) {
    this.EncryptPageName(); this.EncryptPageUrl();


  }

  ngOnInit() {

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
    //  datepicker ends

    this.Divisionlist(); this.Sectionlist();

  }

  getDviisionId() {
    this.divisionId = this.divisionObj.param1;
  }

  ListOfDivision = []; //assigntoentry:string; selectassigntoentry:any; assigntoupdate:string;
  Divisionlist() {

    let keydata = {
      param7: "All",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    //try{AddLoader()}catch(e){alert(e)}
    this.sumrptService.DivisionListAPI(keydata).subscribe(
      (data) => {
        if (data.statuscode == 200) {
          this.ListOfDivision = data.entity.list;
        }
      });

  }

  ListOfSection = [];

  getSectionId() {
    this.sectionId = this.sectionObj.param1;
  }

  //assigntoentry:string; selectassigntoentry:any; assigntoupdate:string;
  Sectionlist() {

    let keydata = {
      param7: "All",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    //try{AddLoader()}catch(e){alert(e)}
    this.sumrptService.DepartmentORSectionListAPI(keydata).subscribe(
      (data) => {
        //try{RemoveLoader()}catch(e){alert(e)}
        this.ListOfSection = data.entity.list;

      });

  }

  gotoBack() {
    $('#inputform').show(); $('#outputform').hide();
  }

  stringifiedData: any; parsedJson: any; stringifiedresponse: any; parsedJsonresponse: any;
  stringifiedDataList: any; parsedJsonList: any; divisionselect: string; sectionselect: string;

  devdetail$: any; devicedetdata: any = []; fromdateval: string; todateval: string; selectToDateArray = [];
  selectToDatemm = []; finalfromyy: any; finalfrommm: string; finaltoyy: string; finaltomm: string;
  finalfromdate: string; finaltodate: string; divisionlbl: string; sectionlbl: string; fromdatelbl: string; todatelbl: string;

  totalcountlbl: number = 0; totaldistancelbl: number = 0; totalmaintainancecountlbl: number = 0; totalnonworkingcountlbl: number = 0;
  totalworkingcountlbl: number = 0;

  onGenerate() {
    try {

      this.submitted = false;
      this.divisionselect = this.divisionObj.param1;
      this.sectionselect = this.sectionObj.param1;
      this.divisionlbl = this.divisionObj.param2;
      this.sectionlbl = this.sectionObj.param2;

      /* const inputElement = document.getElementById('daterange').innerHTML;
      
      var res = inputElement.substring(11, 21);
      var resfromyy = inputElement.substring(8, 10);  //from year value
      var resfromdd = inputElement.substring(4, 5);  //from date value
      this.selectDateArray = inputElement.split(' ', 4);
      var resfrommm = this.selectDateArray[0];  //from date value
  
       if(resfromyy == "21")
      { 
        this.finalfromyy = "20" + resfromyy;
      }
  
      if(resfrommm == "Jan")
      {
        this.finalfrommm = "01";
      }
      else if(resfrommm == "Feb")
      {
        this.finalfrommm = "02";
      }
      else if(resfrommm == "Mar")
      {
        this.finalfrommm = "03";
      }
      else if(resfrommm == "Apr")
      {
        this.finalfrommm = "04";
      }
      else if(resfrommm == "May")
      {
        this.finalfrommm = "05";
      }
      else if(resfrommm == "Jun")
      {
        this.finalfrommm = "06";
      }
      else if(resfrommm == "Jul")
      {
        this.finalfrommm = "07";
      }
      else if(resfrommm == "Aug")
      {
        this.finalfrommm = "08";
      }
      else if(resfrommm == "Sep")
      {
        this.finalfrommm = "09";
      }
      else if(resfrommm == "Oct")
      {
        this.finalfrommm = "10";
      }
      else if(resfrommm == "Nov")
      {
        this.finalfrommm = "11";
      }
      else if(resfrommm == "Dec")
      {
        this.finalfrommm = "12";
      }
      
      this.finalfromdate = this.finalfromyy +"-"+ this.finalfrommm +"-"+ resfromdd;
  
      this.selectToDateArray = inputElement.split(' - ', 11); 
      var restoval = this.selectToDateArray[1];  //To date value
      var restoyy = restoval.substring(8, 10);  //To year value
      var restodd = restoval.substring(4, 5);  //To date     
      this.selectToDatemm = restoval.split(' ', 4);
      var restommm = this.selectToDatemm[0];  //To Month value
  
      if(restoyy == "21")
      {
        this.finaltoyy = "20" + "" + restoyy;
      }
  
      if(restommm == "Jan")
      {
        this.finaltomm = "01";
      }
      else if(restommm == "Feb")
      {
        this.finaltomm = "02";
      }
      else if(restommm == "Mar")
      {
        this.finaltomm = "03";
      }
      else if(restommm == "Apr")
      {
        this.finaltomm = "04";
      }
      else if(restommm == "May")
      {
        this.finaltomm = "05";
      }
      else if(restommm == "Jun")
      {
        this.finaltomm = "06";
      }
      else if(restommm == "Jul")
      {
        this.finaltomm = "07";
      }
      else if(restommm == "Aug")
      {
        this.finaltomm = "08";
      }
      else if(restommm == "Sep")
      {
        this.finaltomm = "09";
      }
      else if(restommm == "Oct")
      {
        this.finaltomm = "10";
      }
      else if(restommm == "Nov")
      {
        this.finaltomm = "11";
      }
      else if(restommm == "Dec")
      {
        this.finaltomm = "12";
      }
  
      this.finaltodate = this.finaltoyy +"-"+ this.finaltomm +"-"+ restodd;
      this.fromdatelbl = resfromdd +"-"+resfrommm +"-"+this.finalfromyy; this.todatelbl = restodd +"-"+ restommm +"-"+ this.finaltoyy;
  
       */

      const inputElement = document.getElementById('daterange').innerHTML;
      this.selectDateArray = inputElement.split(' to ', 2);
      this.fromDate = this.selectDateArray[0];
      this.toDate = this.selectDateArray[1];

      if (this.divisionId == null || this.divisionId == "") {
        this.submitted = true;
      }
      else if (this.sectionId == null || this.sectionId == "") {
        this.submitted = true;
      }
      else {
        document.getElementById("inputform").style.display = "none";

        document.getElementById("outputform").style.display = "block"

        let keydata = {
          pageNo: "",
          itemsPerPage: "",
          searchBy: "",
          searchType: "",
          totalRecords: "NA",
          param1: "All",
          param2: "All",
          param3: this.fromDate,
          param4: "00:00:00",
          param5: this.toDate,
          param6: "00:00:00",
          param7: this.divisionselect,
          param8: this.sectionselect,
          pageID: "",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
        }

        // Distributor Detail Grid BIND LIST    
        this.sumrptService.SummaryReportAPI(keydata).subscribe(
          (data) => {
            var devisionData = data.entity.responsedivisiondata;
            let resdata = data;
            //  try{RemoveLoader()}catch(e){}   
            let resdatadrp = resdata['entity'];
            // Convert to JSON  
            this.stringifiedData = JSON.stringify(resdatadrp);
            // Parse from JSON  
            this.parsedJson = JSON.parse(this.stringifiedData);
            let resdatadev = resdata['responsedivisiondata'];
            // Convert to JSON  
            this.stringifiedDataList = JSON.stringify(this.parsedJson.responsedivisiondata);
            // Parse from JSON  
            this.parsedJsonList = JSON.parse(this.stringifiedDataList);
            this.devdetail$ = JSON.parse(this.stringifiedDataList);
            this.devicedetdata = JSON.parse(this.stringifiedDataList);

            this.totalcountlbl = this.parsedJson["totalcount"];
            this.totaldistancelbl = this.parsedJson["totaldistance"];
            this.totalmaintainancecountlbl = this.parsedJson["totalmaintainancecount"];
            this.totalnonworkingcountlbl = this.parsedJson["totalnonworkingcount"];
            this.totalworkingcountlbl = this.parsedJson["totalworkingcount"];

            for (let i = 0; i < devisionData.length; i++) {
              if (devisionData[i].divisionname == 'East') {
                // console.log(devisionData[i].responsesubdivisiondata)
                this.eastsections = devisionData[i].responsesubdivisiondata
              } else if (devisionData[i].divisionname == 'North') {
                // console.log(devisionData[i].responsesubdivisiondata)
                this.northsections = devisionData[i].responsesubdivisiondata
              } else if (devisionData[i].divisionname == 'South') {
                // console.log(devisionData[i].responsesubdivisiondata)
                this.southsections = devisionData[i].responsesubdivisiondata
              } else if (devisionData[i].divisionname == 'Central') {
                // console.log(devisionData[i].responsesubdivisiondata)
                this.centralsections = devisionData[i].responsesubdivisiondata
              }

            }

          });
      }
    } catch (e) { }


  }

  vehiclesdata: any; subdevisionData: any = []; centralsections: any; eastsections: any; northsections: any; southsections: any;


  SubDivisionsTotalfilter(type) {
    var data = [];
    if (type == 'Central') {
      data = this.centralsections
    } else if (type == 'East') {
      data = this.eastsections
    } else if (type == 'North') {
      data = this.northsections
    } else if (type == 'South') {
      data = this.southsections
    }
    return data;
  }

  /*                                PDF                                      */

  createPDF() {
    // this.SOSReportDetailPDF();
    var sTable = document.getElementById('PDFTable').innerHTML;

    var style = "<style>";
    style = style + "table {width: 100%;font: 17px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";

    // CREATE A WINDOW OBJECT.
    var win = window.open('', '', 'height=700,width=700');

    win.document.write('<html><head>');
    win.document.write('<title>Summary Report Details</title>');   // <title> FOR PDF HEADER.
    win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');

    win.document.close(); 	// CLOSE THE CURRENT WINDOW.

    win.print();    // PRINT THE CONTENTS.
  }

  onPDF() {
    try {

      this.divisionselect = this.divisionObj.param1;
      this.sectionselect = this.sectionObj.param1;
      this.divisionlbl = this.divisionObj.param2;
      this.sectionlbl = this.sectionObj.param2;

      /* const inputElement = document.getElementById('daterange').innerHTML;
      
      var res = inputElement.substring(11, 21);
      var resfromyy = inputElement.substring(7, 9);  //from year value
      var resfromdd = inputElement.substring(4, 5);  //from date value
      this.selectDateArray = inputElement.split(' ', 4);
      var resfrommm = this.selectDateArray[0];  //from date value
    
      if(resfromyy == "21")
      {
        this.finalfromyy = "20" + "" + resfromyy;
      }
    
      if(resfrommm == "Jan")
      {
        this.finalfrommm = "01";
      }
      else if(resfrommm == "Feb")
      {
        this.finalfrommm = "02";
      }
      else if(resfrommm == "Mar")
      {
        this.finalfrommm = "03";
      }
      else if(resfrommm == "Apr")
      {
        this.finalfrommm = "04";
      }
      else if(resfrommm == "May")
      {
        this.finalfrommm = "05";
      }
      else if(resfrommm == "Jun")
      {
        this.finalfrommm = "06";
      }
      else if(resfrommm == "Jul")
      {
        this.finalfrommm = "07";
      }
      else if(resfrommm == "Aug")
      {
        this.finalfrommm = "08";
      }
      else if(resfrommm == "Sep")
      {
        this.finalfrommm = "09";
      }
      else if(resfrommm == "Oct")
      {
        this.finalfrommm = "10";
      }
      else if(resfrommm == "Nov")
      {
        this.finalfrommm = "11";
      }
      else if(resfrommm == "Dec")
      {
        this.finalfrommm = "12";
      }
    
      this.finalfromdate = this.finalfromyy +"-"+ this.finalfrommm +"-"+ resfromdd;
    
      this.selectToDateArray = inputElement.split(' - ', 11); 
      var restoval = this.selectToDateArray[1];  //To date value
      var restoyy = restoval.substring(7, 9);  //To year value
      var restodd = restoval.substring(4, 5);  //To date     
      this.selectToDatemm = restoval.split(' ', 4);
      var restommm = this.selectToDatemm[0];  //To Month value
    
      if(restoyy == "21")
      {
        this.finaltoyy = "20" + "" + restoyy;
      }
    
      if(restommm == "Jan")
      {
        this.finaltomm = "01";
      }
      else if(restommm == "Feb")
      {
        this.finaltomm = "02";
      }
      else if(restommm == "Mar")
      {
        this.finaltomm = "03";
      }
      else if(restommm == "Apr")
      {
        this.finaltomm = "04";
      }
      else if(restommm == "May")
      {
        this.finaltomm = "05";
      }
      else if(restommm == "Jun")
      {
        this.finaltomm = "06";
      }
      else if(restommm == "Jul")
      {
        this.finaltomm = "07";
      }
      else if(restommm == "Aug")
      {
        this.finaltomm = "08";
      }
      else if(restommm == "Sep")
      {
        this.finaltomm = "09";
      }
      else if(restommm == "Oct")
      {
        this.finaltomm = "10";
      }
      else if(restommm == "Nov")
      {
        this.finaltomm = "11";
      }
      else if(restommm == "Dec")
      {
        this.finaltomm = "12";
      }
    
      this.finaltodate = this.finaltoyy +"-"+ this.finaltomm +"-"+ restodd;
      this.fromdatelbl = resfromdd +"-"+resfrommm +"-"+this.finalfromyy; this.todatelbl = restodd +"-"+ restommm +"-"+ this.finaltoyy;
     */

      const inputElement = document.getElementById('daterange').innerHTML;
      this.selectDateArray = inputElement.split(' to ', 2);
      this.fromDate = this.selectDateArray[0];
      this.toDate = this.selectDateArray[1];

      if (this.divisionId == null || this.divisionId == "") {
        this.submitted = true;
      }
      else if (this.sectionId == null || this.sectionId == "") {
        this.submitted = true;
      }
      else {
        document.getElementById("inputform").style.display = "none";

        document.getElementById("outputform").style.display = "block"

        let keydata = {
          pageNo: "",
          itemsPerPage: "",
          searchBy: "",
          searchType: "",
          totalRecords: "NA",
          param1: "All",
          param2: "All",
          param3: this.fromDate,
          param4: "00:00:00",
          param5: this.toDate,
          param6: "00:00:00",
          param7: this.divisionselect,
          param8: this.sectionselect,
          pageID: "",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
        }

        // Summary Detail Grid BIND LIST    
        this.sumrptService.SummaryReportAPI(keydata).subscribe(
          (data) => {
            var devisionData = data.entity.responsedivisiondata;
            let resdata = data;
            //  try{RemoveLoader()}catch(e){}   
            let resdatadrp = resdata['entity'];
            // Convert to JSON  
            this.stringifiedData = JSON.stringify(resdatadrp);
            // Parse from JSON  
            this.parsedJson = JSON.parse(this.stringifiedData);
            let resdatadev = resdata['responsedivisiondata'];
            // Convert to JSON  
            this.stringifiedDataList = JSON.stringify(this.parsedJson.responsedivisiondata);
            // Parse from JSON  
            this.parsedJsonList = JSON.parse(this.stringifiedDataList);
            this.devdetail$ = JSON.parse(this.stringifiedDataList);
            this.devicedetdata = JSON.parse(this.stringifiedDataList);

            this.totalcountlbl = this.parsedJson["totalcount"];
            this.totaldistancelbl = this.parsedJson["totaldistance"];
            this.totalmaintainancecountlbl = this.parsedJson["totalmaintainancecount"];
            this.totalnonworkingcountlbl = this.parsedJson["totalnonworkingcount"];
            this.totalworkingcountlbl = this.parsedJson["totalworkingcount"];

            for (let i = 0; i < devisionData.length; i++) {
              if (devisionData[i].divisionname == 'East') {
                // console.log(devisionData[i].responsesubdivisiondata)
                this.eastsections = devisionData[i].responsesubdivisiondata
              } else if (devisionData[i].divisionname == 'North') {
                // console.log(devisionData[i].responsesubdivisiondata)
                this.northsections = devisionData[i].responsesubdivisiondata
              } else if (devisionData[i].divisionname == 'South') {
                // console.log(devisionData[i].responsesubdivisiondata)
                this.southsections = devisionData[i].responsesubdivisiondata
              } else if (devisionData[i].divisionname == 'Central') {
                // console.log(devisionData[i].responsesubdivisiondata)
                this.centralsections = devisionData[i].responsesubdivisiondata
              }

            }

            //this.dataPDFexport();       responsedivisiondata
            //this.dataexportexcel();
          });
      }
    } catch (e) { }


  }

  /*          Excel                 */

  dataexportexcel() {

    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'summaryreportdetails.xlsx');

  }

  excelData: any = [];

  PrepareExcelData(data) {
    this.excelData = [];

    for (var i = 0; i < data.length; i++) {
      try {
        var obj = {

          "#": i + 1,
          "Section / Department": data[i].param69,
          "Received Date": data[i].param74,
          "Device No": data[i].param12,
          "IMEI NO": data[i].param4,
          "Mobile No.": data[i].param5,
          "Network": data[i].param7,
          "Assign To": data[i].param37,
          "Device Status": data[i].param61,
          "Remark": data[i].param75,

        }
      } catch (e) { }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'RailwayDevice Details', 'railwaydevicedetails');
  }

  EncryptPageName() {
    this.cryptService.encrypt("vehiclesummeryreport")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl);
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }

}
