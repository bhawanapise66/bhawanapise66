import { ExportToExcelService } from '../services/export-to-excel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CryptService } from '../services/crypt.service';
import { Router } from '@angular/router';
import { Paramcls } from '../../../../paramcls';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { RailwaydevicemanagementService } from '../services/railwaydevicemanagement.service';

import * as $ from 'jquery';
import * as moment from 'moment';
import { ThemeService } from 'ng2-charts';
import * as xlsx from 'xlsx';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
import { PdfService } from '../services/pdf.service';


//import * as $ from 'jquery';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-railwaydevicemanagement',
  templateUrl: './railwaydevicemanagement.component.html',
  styleUrls: ['./railwaydevicemanagement.component.css']
})
export class RailwaydevicemanagementComponent implements OnInit {

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  receivedateentry: string; devicenoTextentry: string; imeinoTextentry: string;
  mobileTextentry: string; RemarksTextentry: string; vehicleidspan: string;
  encryptedpageNameValue: string; encryptedpageUrlValue: string; pageUrl = this.router.url;
  public edited = false;

  stringifiedData: any; parsedJson: any; stringifiedresponse: any; parsedJsonresponse: any;
  stringifiedDataList: any; parsedJsonList: any; datafromrespo: string; deleteText: string;

  devdetail$: any; devicedetdata: any = []; globalPDF$: any;
  key: string = 'name'; reverse: boolean = true; count: number;
  p: number = 1; pagecount: number = 5; nop: number; totrec: number; outorec: number; filter: any;
  selectRowsText: string = "15"; excelData: any = [];

  private _success = new Subject<string>(); staticAlertClosed = false; successMessage: string;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };

  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService,
    private cryptService: CryptService, private router: Router, private devmangService: RailwaydevicemanagementService,
    public excelservice: ExportToExcelService, public pdfservice: PdfService) {

    this.EncryptPageName(); this.EncryptPageUrl(); this.keybooleana1=true;
  }
  write_privilege:string;  keybooleana:boolean; keybooleana1:boolean;
  ngOnInit() {
    try {

      this.keybooleana=true;
      $('#sectionentry').focus();


      this.Sectionlist(); this.Networklist(); this.AssignTolist(); this.DeviceStatuslist(); this.RailwayDeviceDetail();

      $('#alertmsg').hide(); $('#saveentry').show(); $('#updateentry').hide();
      this.write_privilege =sessionStorage.getItem('writePrivilege');
   if(this.write_privilege == "false")
   {
    $("#actionid").css("display", "none");
    $("#actionid1").css("display", "none");
    $("#editcard").css("display", "none");
    this.keybooleana=false;

    this.keybooleana1=false;
   }
      (function ($) {

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
             
              $('#daterangeadminux2 span').html(start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
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
            $('.daterangepicker').append('<div class="background" style="background-image: url(" + path + "); z-index:-1; height:80px;"><img src="assets/images/background-part.png" alt="" style="display:none"></div>')
          });

        })(jQuery);

        $(document).ready(function () {
          /* calander single  picker ends */
          $('.datepicker').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            minYear: 1901,
            maxDate: new Date()

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
        });
      })(jQuery);

      setTimeout(() => this.staticAlertClosed = true, 20000);

      this._success.subscribe((message) => this.successMessage = message);

      this._success.pipe(
        debounceTime(8000)
      ).subscribe(() => this.successMessage = null);



    } catch (e) { }

  }


  sort(key) {

    this.key = key;
    this.reverse = !this.reverse;

  }



  onReceivedDateChange() {
    try {
      $('#managementdiv').show();
      //document.getElementById("devicemanagementdiv").style.display = "block";
    }
    catch (error) {
      err => {

      }
    }

  }

  ListOfSection = []; selectsection: string; selectsectionentry: any; selectsectionobj: any;
  Sectionlist() {

    try {
      let keydata = {
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }

      //try{AddLoader()}catch(e){alert(e)}
      this.devmangService.DepartmentORSectionListAPI(keydata).subscribe(
        (data) => {
          //try{RemoveLoader()}catch(e){alert(e)}
          this.ListOfSection = data.entity.list;

        });
    } catch (e) { }
  }

  ListOfDeviceStatus = []; selectstatus: string; selectstatusentry: any;
  DeviceStatuslist() {

    try {
      let keydata = {
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }

      //try{AddLoader()}catch(e){alert(e)}
      this.devmangService.DeviceStatusListAPI(keydata).subscribe(
        (data) => {
          //try{RemoveLoader()}catch(e){alert(e)}
          this.ListOfDeviceStatus = data.entity.list;

        });
    } catch (e) { }
  }

  ListOfNetwork = []; networkentry: string; selectnetworkentrynew: any;
  Networklist() {

    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    //try{AddLoader()}catch(e){alert(e)}
    this.devmangService.NetworkListAPI(keydata).subscribe(
      (data) => {
        //try{RemoveLoader()}catch(e){alert(e)}
        this.ListOfNetwork = data.entity.list;

      });

  }

  ListOfAssignTo = []; assigntoentry: string; selectassigntoentry: any;
  AssignTolist() {

    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    //try{AddLoader()}catch(e){alert(e)}
    this.devmangService.AssignToListAPI(keydata).subscribe(
      (data) => {
        //try{RemoveLoader()}catch(e){alert(e)}
        this.ListOfAssignTo = data.entity.list;

      });

  }

  ADDRecord() {
    this.receivedateentry = $('#receivedateidentry').val();

    // Validate Section
    if (this.selectsectionentry == '') {


      this._success.next(`Please Select Section.`);
      $('#alertmsg').show(); $('#sectionentry').focus();
      return false;
    }
    else if (this.receivedateentry == '') {
      this._success.next(`Please Select Received Date..`);
      $('#receivedateidentry').focus(); $('#alertmsg').show();
      return false;
    }
    else if (this.devicenoTextentry == '') {
      this._success.next(`Please Enter Device Number.`);
      $('#devicenoidentry').focus(); $('#alertmsg').show();
      return false;

    }
    else if (this.imeinoTextentry == '') {
      this._success.next(`Please Enter IMEI Number.`);
      $('#imeinoidentry').focus(); $('#alertmsg').show();
      return false;
    }
    else if ((this.mobileTextentry.length != 10) && (this.mobileTextentry.length != 13)) {
      this._success.next(`Please Enter Mobile Number 10 or 13 digit.`);
      $('#mobileidentry').focus(); $('#alertmsg').show();
      return false;
    }
    else if (this.selectassigntoentry == '') {
      this._success.next(`Please Select Assign To.`);
      $('#assigntoentry').focus(); $('#alertmsg').show();
      return false;
    }
    else if (this.selectstatusentry == '') {
      this._success.next(`Please Select Status.`);
      $('#statusentry').focus(); $('#alertmsg').show();
      return false;
    }
    else if (this.selectnetworkentrynew == '') {
      this._success.next(`Please Select Network.`);
      $('#network').focus(); $('#alertmsg').show();
      return false;
    }
    else if (this.RemarksTextentry == '') {
      this._success.next(`Please Enter Remark.`);
      $('#remarksentry').focus(); $('#alertmsg').show();
      return false;
    }
    else {

      $('#saveentry').show(); $('#updateentry').hide();

      this.assigntoentry = this.selectassigntoentry.param1;
      this.networkentry = this.selectnetworkentrynew.param1;
      this.selectstatus = this.selectstatusentry.param1;
      this.selectsection = this.selectsectionentry.param1;
      try {

        let dataL = {
          param1: this.RemarksTextentry,
          param2: "0",
          param3: this.devicenoTextentry,
          param4: this.imeinoTextentry,
          param5: this.mobileTextentry,
          param6: this.networkentry,
          param7: this.assigntoentry,
          param8: this.selectsection,
          param9: this.selectstatus,
          param10: "section",
          param11: this.receivedateentry,
          pageID: "3",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue

        }
        try { AddLoader() } catch (e) { }
        this.devmangService.DeviceManagementInsertAPI(dataL).subscribe(
          (data) => {
            try { RemoveLoader() } catch (e) { }
           
            this.datafromrespo = data.entity;
            let statuscode = data.statuscode;

            if (statuscode == '200') {

              $("#SuccessModal").modal('show');
              this.clearfunction(); this.RailwayDeviceDetail();
            }
            else {
              $("#ErrorModal").modal('show');
            }
            
          }, err => {

          });

      } catch (e) { }
    }
  }
  sectionindex: any;
  Updatedata(devmang: Paramcls) {
    try {

      $('#saveentry').hide(); $('#updateentry').show();

      this.vehicleidspan = devmang.param11;
      this.selectsectionentry = devmang.param69;
      this.receivedateentry = devmang.param74;
      this.RemarksTextentry = devmang.param75;
      this.selectassigntoentry = devmang.param37;
      this.selectnetworkentrynew = devmang.param7;
      this.selectstatusentry = devmang.param61;
      // this.receivedateentry = devmang.param33;
      this.devicenoTextentry = devmang.param12;
      this.imeinoTextentry = devmang.param2;
      this.mobileTextentry = devmang.param5;

      this.selectsectionreturn = this.check(this.selectsectionentry);
      this.selectassigntoreturn = this.check(this.selectassigntoentry);
      this.selectnetworkreturn = this.check(this.selectnetworkentrynew);
      this.selectdevicestatusreturn = this.check(this.selectstatusentry);
      this.selectnetworkreturn = this.cryptService.encrypt(devmang.param76);
      (document.getElementById("receivedateidentry")as HTMLInputElement).value = devmang.param74
      this.selectnetworkreturn = devmang.param76;


    } catch (e) { }

  }

  selectdatasection: string; selectdataassignto: string; selectdatadevicestatus: string; selectdatanetwork: string;
  networkupdate: any; assigntoupdate: any; selectsectionupdate: any; selectstatusupdate: any;

  UpdateRecord() {
    this.receivedateentry = $('#receivedateidentry').val();

    var section = this.getid(this.ListOfSection, this.selectsectionentry);
    var assignto = this.getid(this.ListOfAssignTo, this.selectassigntoentry);
    var devicestatus = this.getid(this.ListOfDeviceStatus, this.selectstatusentry);
    
    var network = this.selectnetworkreturn;    
    $('#saveentry').hide(); $('#updateentry').show();

   

    try {

      let dataL = {

        param1: this.RemarksTextentry,
        param2: this.vehicleidspan,
        param3: this.devicenoTextentry,
        param4: this.imeinoTextentry,
        param5: this.mobileTextentry,
        param6: network,
        param7: assignto,
        param8: section,
        param9: devicestatus,
        param10: "section",
        param11: this.receivedateentry,
        pageID: "3",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }

      this.devmangService.DeviceManagementUpdateAPI(dataL).subscribe(
        (data) => {
          
          let resdata = data;
          this.datafromrespo = data.entity;

          if (this.datafromrespo == 'Successfully saved.') {
            $("#SuccessModal").modal('show'); this.clearfunction(); this.RailwayDeviceDetail();
            $('#updateentry').hide(); $('#saveentry').show();
          }
          else {
            $("#ErrorModal").modal('show');
          }
         


        }, err => {

        });

    } catch (e) { }
    //}
  }

  selectnetworkreturn: any = '';
  selectdevicestatusreturn: any = '';
  selectassigntoreturn: any = '';
  selectsectionreturn: any = ';'

  selectnetworkdummy() {
    this.selectnetworkreturn = this.check(this.selectnetworkentrynew);
    this.networkupdate = this.selectnetworkentrynew.param1;
  }
  selectdevicestatusdummy() {
    this.selectdevicestatusreturn = this.check(this.selectstatusentry);

    this.selectstatusupdate = this.selectstatusentry.param1;
  }
  selectassigntodummy() {
    this.selectassigntoreturn = this.check(this.selectassigntoentry);

    this.assigntoupdate = this.selectassigntoentry.param1;
  }
  selectsectiondummy() {
    this.selectsectionreturn = this.check(this.selectsectionentry);

    this.selectsectionupdate = this.selectsectionentry.param2;
  }

  check(data) {
    try {
      if (typeof data === 'object') {
       
        return data.param1;
      }
      else if (data == '') {
       
      }
      else {
        console.log(data.length)

        return data;
      }
    } catch (e) {
      return '';
    }
  }

  getid(data, value) {
    try {
      if (typeof value === 'object') {
        
        return value.param1;
        
      }
      else {
        
        var index = data.findIndex(x => x.param2 === value);
        
        return data[index].param1;
      }
    } catch (e) {
      return '';
    }

  }



  RefreshDeviceDetail() {

    this.p = 1; this.pagecount = 15;

    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    // Distributor Detail Grid BIND LIST    
    this.devmangService.GetBindTable(keydata).subscribe(
      (data) => {

        let resdata = data;
        //  try{RemoveLoader()}catch(e){}   
        let resdatadrp = resdata['entity'];
        // Convert to JSON  
        this.stringifiedData = JSON.stringify(resdatadrp);
        // Parse from JSON  
        this.parsedJson = JSON.parse(this.stringifiedData);
        let resdatadev = resdata['list'];
        // Convert to JSON  
        this.stringifiedDataList = JSON.stringify(this.parsedJson.list);
        // Parse from JSON  
        this.devdetail$ = JSON.parse(this.stringifiedDataList);
        this.devicedetdata = JSON.parse(this.stringifiedDataList);

        this.nop = this.parsedJson;
        this.totrec = data.entity.count;
        this.outorec = data.entity.viewCount;

      });
  }

  RailwayDeviceDetail() {

    this.p = 1; this.pagecount = 15;

    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    // Distributor Detail Grid BIND LIST    
    this.devmangService.GetBindTable(keydata).subscribe(
      (data) => {

        let resdata = data;
        //  try{RemoveLoader()}catch(e){}   
        let resdatadrp = resdata['entity'];
        // Convert to JSON  
        this.stringifiedData = JSON.stringify(resdatadrp);
        // Parse from JSON  
        this.parsedJson = JSON.parse(this.stringifiedData);
        let resdatadev = resdata['list'];
        // Convert to JSON  
        this.stringifiedDataList = JSON.stringify(this.parsedJson.list);
        // Parse from JSON  
        this.devdetail$ = JSON.parse(this.stringifiedDataList);
        this.devicedetdata = JSON.parse(this.stringifiedDataList);

        this.nop = this.parsedJson;
        this.totrec = data.entity.count;
        this.outorec = data.entity.viewCount;
        this.dataPDFexport();

      });
  }



  pageChanged(event) {
    try {
      if (this.selectRowsText == null) {

        this.p = event; this.pagecount = 15;

        let keydata = {
          pageNo: this.p,
          itemsPerPage: this.pagecount,
          searchBy: "",
          searchType: "",
          totalRecords: "NA",
          pageID: "1",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
        }
        //  try{AddLoader()}catch(e){}
        // Page Load Detail Grid BIND LIST    
        this.devmangService.GetBindTable(keydata).subscribe(
          (data) => {

            let resdata = data;
            //  try{RemoveLoader()}catch(e){}   
            let resdatadrp = resdata['entity'];
            // Convert to JSON  
            this.stringifiedData = JSON.stringify(resdatadrp);
            // Parse from JSON  
            this.parsedJson = JSON.parse(this.stringifiedData);
            let resdatadev = resdata['list'];
            // Convert to JSON  
            this.stringifiedDataList = JSON.stringify(this.parsedJson.list);
            alert(this.stringifiedDataList.length);
            // Parse from JSON  
            this.devdetail$ = JSON.parse(this.stringifiedDataList);
            this.devicedetdata = JSON.parse(this.stringifiedDataList);

            this.nop = this.parsedJson;
            this.totrec = data.entity.count;
            this.outorec = data.entity.viewCount;
          });
      }
      else {

        this.p = event; this.pagecount = parseInt(this.selectRowsText);

        // alert(this.pagecountdev);
        let keydata = {
          pageNo: this.p,
          itemsPerPage: this.pagecount,
          searchBy: "",
          searchType: "",
          totalRecords: "NA",
          pageID: "1",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue

        }

        this.devmangService.GetBindTable(keydata).subscribe(
          (data) => {

            let resdata = data;
            //  try{RemoveLoader()}catch(e){}   
            let resdatadrp = resdata['entity'];
            // Convert to JSON  
            this.stringifiedData = JSON.stringify(resdatadrp);
            // Parse from JSON  
            this.parsedJson = JSON.parse(this.stringifiedData);
            let resdatadev = resdata['list'];
            // Convert to JSON  
            this.stringifiedDataList = JSON.stringify(this.parsedJson.list);
            // Parse from JSON  
            this.devdetail$ = JSON.parse(this.stringifiedDataList);
            this.devicedetdata = JSON.parse(this.stringifiedDataList);

            this.nop = this.parsedJson;
            this.totrec = data.entity.count;
            this.outorec = data.entity.viewCount;

          });
      }
    } catch (e) { }
  }

  searchdata() {
    var search = $('#searchData').val();

    this.p = 1; this.pagecount = 15;
    //  console.log("p" + this.p);

    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: search,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    //try{AddLoader()}catch(e){alert(e)} 
    // Distributor Detail Grid BIND LIST    
    this.devmangService.GetBindTable(keydata).subscribe(
      (data) => {
        // try{RemoveLoader()}catch(e){alert(e)} 
        let resdatalist = data.entity.list;


        let vendorlist = resdatalist;

        this.devdetail$ = vendorlist;
        this.totrec = data.entity.count;
        this.outorec = data.entity.viewCount;
      });
  }

  RowsBindChanged() {
    try {
      this.p = 1; this.pagecount = parseInt(this.selectRowsText);

      let keydata = {
        pageNo: this.p,
        itemsPerPage: this.pagecount,
        searchBy: "",
        searchType: "",
        totalRecords: "NA",
        pageID: "1",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      //  try{AddLoader()}catch(e){} 
      // Page Load Detail Grid BIND LIST    
      this.devmangService.GetBindTable(keydata).subscribe(
        (data) => {
          
          let resdatalist = data.entity.list;


          let vendorlist = resdatalist;

          this.devdetail$ = vendorlist;
          this.totrec = data.entity.count;
          this.outorec = data.entity.viewCount;

        });
    } catch (e) { }
  }

  createPDF() {
    let pdfTableData;
    let dataArray = []
    for (let i = 0; i < this.globalPDF$.length; i++) {
      pdfTableData = {
        "#": i + 1,
        "Section / Department": this.globalPDF$[i]["param69"],
        "Received Date": this.globalPDF$[i]["param74"],
        "Device No": this.globalPDF$[i]["param12"],
        "IMEI No.": this.globalPDF$[i]["param2"],
        "Mobile No.": this.globalPDF$[i]["param5"],
        "Network": this.globalPDF$[i]["param7"],
        "Assign To": this.globalPDF$[i]["param37"],
        "Device Status": this.globalPDF$[i]["param61"],
        "Polling Time": this.globalPDF$[i]["param40"],
        "Remark": this.globalPDF$[i]["param75"]
      }
      dataArray.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(dataArray, "Device Details");
  }

  dataPDFexport() {

    this.globalPDF$ = null;

    let keydata = {
      pageNo: "",
      itemsPerPage: "",
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    //  try{AddLoader()}catch(e){}          
    try {
      this.devmangService.GetBindTable(keydata).subscribe(
        (data) => {

          // Parse from JSON  
          this.globalPDF$ = data.entity.list;
         this.PrepareExcelData(this.globalPDF$ );
        })

    } catch (e) { }

  }

  // dataexportexcel() {

  //   const ws: xlsx.WorkSheet =
  //     xlsx.utils.table_to_sheet(this.epltable.nativeElement);
  //   const wb: xlsx.WorkBook = xlsx.utils.book_new();
  //   xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   xlsx.writeFile(wb, 'railwaydevicemanagementdetails.xlsx');

  // }

  PrepareExcelData(data) {
    this.excelData = [];

    for (var i = 0; i < data.length; i++) {
      try {
        var obj = {

          "#": i + 1,
          "Section / Department": data[i].param69,
          "Received Date": data[i].param74,
          "Device No": data[i].param12,
          "IMEI NO": data[i].param2,
          "Mobile No.": data[i].param5,
          "Network": data[i].param7,
          "Assign To": data[i].param37,
          "Device Status": data[i].param61,
          "Polling Time": data[i].param40,
          "Remark": data[i].param75,

        }
      } catch (e) { }
      this.excelData.push(obj);
    }
  }

  dataexportexcel() {
    this.dataPDFexport();
    this.excelservice.ExportExcel(this.excelData, 'RailwayDevice Details', 'railwaydevicedetails');
  }

  clearfunction() {
    try {

      this.selectsectionentry = ""; this.receivedateentry = ""; this.devicenoTextentry = ""; this.imeinoTextentry = "";
      this.mobileTextentry = ""; this.selectassigntoentry = ""; this.selectstatusentry = "";
      this.selectnetworkentrynew = ""; this.RemarksTextentry = "";


    } catch (e) { }
  }

  Deletefunction() {
    var isValid = true;
    var deleteremark = $('#deleteremark').val();
    // Validate Contact Name
    if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      
      $('#msg_error_delete').html('Please Enter Remark').show();
      $('#deleteremark').focus();
      setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        param1: this.deleteText,
        param2: this.vehicleidspan,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }
      
      this.devmangService.DeviceManagementDeleteAPI(dataL).subscribe((data) => {
        
        this.datafromrespo = data.entity;

        if (this.datafromrespo == 'Successfully Deleted.') {
          $("#SuccessModal").modal('show');
          this.RailwayDeviceDetail();
          this.closemodal();
        }
        else {
          $("#ErrorModal").modal('show');
        }
      });

    }
  }

  closemodal() {

    $("#successmodel").modal('hide');
    $('#modeldelete').modal('hide');
    $('#myModalwizard').modal('hide');

    $('.modal-backdrop.show').css('display', 'none');

  }

  DeleteModal(devmang: Paramcls) {
    try {

      this.vehicleidspan = devmang.param11;

    } catch (e) { }

  }

  EncryptPageName() {
    this.cryptService.encrypt("RailwayDeviceManagementEntry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    
  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    
  }

}
