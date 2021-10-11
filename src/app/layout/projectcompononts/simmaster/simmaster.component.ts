import { ListService } from './../../../../list.service';
import { string } from '@amcharts/amcharts4/core';
import { ExportToExcelService } from '../services/export-to-excel.service';
import { PdfService } from '../services/pdf.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CryptService } from '../services/crypt.service';
import { Router } from '@angular/router';
import { Paramcls } from '../../../../paramcls';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { SimservicemasterService } from '../services/simservicemaster.service';

import * as $ from 'jquery';
import * as moment from 'moment';
import { ThemeService } from 'ng2-charts';
import * as xlsx from 'xlsx';

//import * as $ from 'jquery';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;


export class SimEntry {

  simTypeName: string;
  simTypeId: any;
  simNo: any;
  mobileNo: any;
  networkid: string;
  networkname: string;
  vendorId: string;
  // primaryNo: any;
  // primaryNetworkid: string;
  // primaryNetworkName: string;
  fallbackNo: any;
  fallbackNetworkid: string;
  fallbackNetworkName: string;
}

@Component({
  selector: 'app-simmaster',
  templateUrl: './simmaster.component.html',
  styleUrls: ['./simmaster.component.css']
})
export class SimmasterComponent implements OnInit {
  sim = new SimEntry();

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  selectnetworkentry: any; simnoTextentry: string;
  simidspan: string; mobilenoTextentry: string; selectnetworkreturn: any; roleid: string;
  encryptedpageNameValue: string; encryptedpageUrlValue: string; pageUrl = this.router.url;
  public edited = false;

  stringifiedData: any; parsedJson: any; stringifiedresponse: any; parsedJsonresponse: any;
  stringifiedDataList: any; parsedJsonList: any; datafromrespo: string; deleteText: string;

  devdetail$: any; devicedetdata: any = []; globalPDF$: any;
  key: string = 'name'; reverse: boolean = true; count: number=0;
  p: any = "1"; pagecount: any = 10; nop: number; totrec: number; outorec: number; filter: any = '';
  excelData: any = []; pdfData: any = []; list = []; selectRowsText: string = "10"; ListOfvendorupdate = [];
  successMessageUpdate
  private _success = new Subject<string>(); staticAlertClosed = false; successMessage: string;

  upcourierbyText: any; uptrackeridText: string; upvendorText: any; upnetworklistdata: string;
  upcouriernameText: string; upcourierdate: string; upCourierReceivedate: string;
  responseMessage: any; upvendorlistdata: string; upcourieraddressText: string; upnetworkObj: any;
  upreceivedbyText: string; upcourierfromText: string; uppersonmobileNo: string;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };

  config2 = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  options = [
    { param2: "Courier", }, { param2: "By Hand", }
  ]

  simTypeList: any; networkObj: any; simTypeObj: any; fallBackNetObj: any; fallBackNetId: any; fallbackNumber: any;
  fallbackNetwork: any; simTypeName: any = "Plastic Sim"; simTypeId: any; simNo: any; mobileNumber: any; networkId: any;
  networkName: any; fallbackNetworkId: any; fallbackNetworkName: any; simId: any; upreceivedbydummy: string;
  upnetworkdummy: string;

  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService, private listService: ListService,
    private cryptService: CryptService, private router: Router, private devreqService: SimservicemasterService
    , public excelservice: ExportToExcelService, public pdfservice: PdfService) {

    this.EncryptPageName(); this.EncryptPageUrl();
  }

  ngOnInit() {
    this.SimTypeListFun();

    try {
      (function ($) {
        $(document).ready(function () {
          $('#updateSimModal').on('shown.bs.modal', function () {
            $('#simnoidentry').focus();
          })
        });
      })(jQuery);






      (function ($) {
        $(document).ready(function () {

          /* calander picker */
          var start = moment().subtract(29, 'days');
          var end = moment();

          function cb(start, end) {
            $('#daterangeadminux2 span').html(start.format('MMM D, YY') + ' - ' + end.format('MMM D, YY'));
          }

          $('#daterangeadminux2').daterangepicker({
            startDate: start,
            endDate: end,
            opens: 'left'
          }, cb);

          cb(start, end);
          $('#daterangeadminux2').on('show.daterangepicker', function (ev, picker) {
            var thisdp = $('.daterangepicker');
            setTimeout(function () {
              thisdp.addClass('active');
            }, 100);
          });
          $('#daterangeadminux2').on('hide.daterangepicker', function (ev, picker) {
            var thisdpc = $('.daterangepicker');
            thisdpc.removeClass('active');

          });
          var path = '../assets/img/background-part.png';
          $('.daterangepicker2').append('<div class="background" style="background-image: url(' + path + '); z-index:-1; height:00px;"><img src="../assets/img/background-part.png" alt="" style="display:none"></div>')
          /* calander picker ends */

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

        });



      })(jQuery);

      (function ($) {
        $(document).ready(function () {

          /* calander picker */
          var start = moment().subtract(29, 'days');
          var end = moment();

          function cb(start, end) {
            $('#daterangeadminux2 span').html(start.format('MMM D, YY') + ' - ' + end.format('MMM D, YY'));
          }

          $('#daterangeadminux2').daterangepicker({
            startDate: start,
            endDate: end,
            opens: 'left'
          }, cb);

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

      $('#customerdiv').hide();
      this.roleid = localStorage.getItem("rid");

      this.Networklist(); this.SimDetail(); this.VendorList();
      document.getElementById("uprecbydiv").style.display = "none";
      document.getElementById("upcourierinfodiv").style.display = "none";

      document.getElementById("uprecdate").style.display = "none";
      document.getElementById("uprecfrm").style.display = "none";
      document.getElementById("uppermobno").style.display = "none";

      $('#alertmsg').hide();

      setTimeout(() => this.staticAlertClosed = true, 20000);

      this._success.subscribe((message) => this.successMessage = message);

      this._success.pipe(
        debounceTime(8000)
      ).subscribe(() => this.successMessage = null);



    } catch (e) { }

  }

  SimTypeListFun() {
    let dataL = {
      "pageID": "dd4",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.SimType(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      this.simTypeList = response.entity;
    })
  }

  sort(key) {

    this.key = key;
    this.reverse = !this.reverse;

  }

  // getsimType() {
  //   this.sim.simTypeId = this.simTypeObj.param1;
  //   this.sim.simTypeName = this.simTypeObj.param2;
  // }

  mobilevalidation() {
    try {

      if (this.mobilenoTextentry.length == 10) {
        this._success.next(`Mobile No. must be at least minimum 10 characters.`);
        $('#alertmsg').show(); $('#mobilenoidentry').focus();
        return false;
      }
      else if (this.mobilenoTextentry.length == 13) {
        this._success.next(`Mobile No. must be at least maximum 13 characters.`);
        $('#alertmsg').show(); $('#mobilenoidentry').focus();
        return false;
      }
    }
    catch (ex) { }
  }

  upListOfNetwork = []; selectnetwork: string; selectnetworkobj: any;
  Networklist() {

    try {
      let keydata = {
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }
      this.devreqService.NetworkListAPI(keydata).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.upListOfNetwork = data.entity.list;

      });
    } catch (e) { }
  }

  network: string;

  VendorList() {

    let keydata = {
      param1: "Sim",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.VendorListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfvendorupdate = data.entity;
      });
  }

  upcourierbythird: string; coueiernmview: string; courieraddressview: string; courierbyview: string; courierdtview: string;
  courierrecedt: string; vendorview: string; couriertrackeridview: string; upvendorthird: string; modeofdeliview: string;
  receiveddateview: string; receivedbyview: string; mobilenoview: string; receivedfromview: string;

  setdata(data) {

    document.getElementById("uptital").style.display = "none";
    document.getElementById("vmd").style.display = "block";

    this.simId = data.param1;
    this.simTypeObj = data.param14
    this.simTypeName = data.param14;
    this.simTypeId = data.param15;
    this.simNo = data.param2;
    this.mobileNumber = data.param3;
    this.fallbackNumber = data.param4;
    this.upnetworkObj = data.param6;
    this.fallbackNetworkId = data.param7;
    this.fallbackNetworkName = data.param8;

    this.fallBackNetObj = data.param8;
    this.upcouriernameText = data.param19;
    this.coueiernmview = data.param19;
    this.upcourierdate = data.param20;
    this.courierdtview = data.param20;
    this.upCourierReceivedate = data.param21;
    this.courierrecedt = data.param21;
    this.upcourierbyText = data.param18;
    this.courierbyview = data.param18;
    this.uptrackeridText = data.param25;
    this.couriertrackeridview = data.param25;
    this.upvendorText = data.param27;
    this.upreceivedbyText = data.param22;
    this.modeofdeliview = data.param18;
    this.receiveddateview = data.param21;
    this.receivedbyview = data.param22;
    this.uppersonmobileNo = data.param23;
    this.mobilenoview = data.param23;


    if (data.param18 == "Courier") {
      this.upreceivedbyText = data.param22;
      document.getElementById("uprecbydiv").style.display = "none";
      document.getElementById("uprecdate").style.display = "none";
      document.getElementById("upcourierinfodiv").style.display = "block";
      document.getElementById("uprecfrm").style.display = "none";
      document.getElementById("uppermobno").style.display = "none";
    }
    else if (data.param18 == "By Hand") {
      this.upreceivedbyText = data.param22;
      document.getElementById("upcourierinfodiv").style.display = "none";
      document.getElementById("uprecdate").style.display = "block";
      document.getElementById("uprecbydiv").style.display = "block";
      document.getElementById("uprecfrm").style.display = "block";
      document.getElementById("uppermobno").style.display = "block";
    }
    this.vendorview = data.param27;

    this.upcourierbythird = this.upcourierbyText;
    this.VendorList(); this.Networklist();
    this.upnetworklistdata = this.check(this.upnetworkObj);
    this.upvendorlistdata = this.check(this.upvendorText);

  }

  getsimTypeEdit() {
    this.simTypeId = this.simTypeObj.param1;
    this.simTypeName = this.simTypeObj.param2;
  }

  getNetworkEdit() {
    this.networkId = this.upnetworkObj.param1;
    //this.networkName = this.networkObj.param2;
  }

  getfallbackNetedit() {
    this.fallbackNetworkId = this.fallBackNetObj.param1
    this.fallbackNetworkName = this.fallBackNetObj.param2;
  }

  editpageform() {
    document.getElementById("backdetailsbtn").style.display = "block";
    document.getElementById("editbtn").style.display = "none";
    document.getElementById("vendordtls").style.display = "none";
    document.getElementById("container").style.display = "block";
    document.getElementById("upmodelfooter").style.display = "block";
    $('#vmd').hide(); $('#uptital').show();
    document.getElementById("vmd").style.display = "none";
    document.getElementById("uptital").style.display = "block";
  }

  backdetailsbtn() {
    document.getElementById("uptital").style.display = "none";
    document.getElementById("vmd").style.display = "block";
    document.getElementById("backdetailsbtn").style.display = "none";
    document.getElementById("editbtn").style.display = "block";
    document.getElementById("vendordtls").style.display = "block";
    document.getElementById("upmodelfooter").style.display = "none";
    document.getElementById("container").style.display = "none";
  }
  sectionindex: any;

  RefreshDeviceDetail() {

    this.p = 1; this.pagecount = 10;
    this.filter = '';

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
    try { AddLoader() } catch (e) { alert(e) }

    // Distributor Detail Grid BIND LIST    
    this.devreqService.SIMdetailsAPI(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      let resdata = data;
      let resdatadrp = resdata['entity'];
      // Convert to JSON  
      this.stringifiedData = JSON.stringify(resdatadrp);
      // Parse from JSON  
      this.parsedJson = JSON.parse(this.stringifiedData);
      let resdatadev = resdata['responsedatalist'];
      // Convert to JSON  
      this.stringifiedDataList = JSON.stringify(this.parsedJson.responsedatalist);
      // Parse from JSON  
      this.devdetail$ = JSON.parse(this.stringifiedDataList);

      this.nop = this.parsedJson;
      this.totrec = data.entity.count;
      this.outorec = data.entity.viewCount;

    });
  }

  SimDetail() {

    this.p = 1; this.pagecount = 10;

    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    // Distributor Detail Grid BIND LIST    
    this.devreqService.SIMdetailsAPI(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      let resdata = data;
      //  try{RemoveLoader()}catch(e){}   
      let resdatadrp = resdata['entity'];
      // Convert to JSON  
      this.stringifiedData = JSON.stringify(resdatadrp);
      // Parse from JSON  
      this.parsedJson = JSON.parse(this.stringifiedData);
      let resdatadev = resdata['responsedatalist'];
      // Convert to JSON  
      this.stringifiedDataList = JSON.stringify(this.parsedJson.responsedatalist);
      // Parse from JSON  
      this.devdetail$ = JSON.parse(this.stringifiedDataList);

      this.nop = this.parsedJson;
      this.totrec = data.entity.count;
      this.outorec = data.entity.viewCount;

      // this.dataPDFexport();

    });
  }

  pageChanged(event) {
    try {
      if (this.selectRowsText == null) {

        this.p = event; this.pagecount = 10;

        let keydata = {
          pageNo: this.p,
          itemsPerPage: this.pagecount,
          searchBy: this.filter,
          searchType: "",
          totalRecords: "NA",
          pageID: "1",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
        }
        try { AddLoader() } catch (e) { }
        // Page Load Detail Grid BIND LIST    
        this.devreqService.SIMdetailsAPI(keydata).subscribe((data) => {
          try { RemoveLoader() } catch (e) { }

          let resdata = data;
          let resdatadrp = resdata['entity'];
          // Convert to JSON  
          this.stringifiedData = JSON.stringify(resdatadrp);
          // Parse from JSON  
          this.parsedJson = JSON.parse(this.stringifiedData);
          let resdatadev = resdata['responsedatalist'];
          // Convert to JSON  
          this.stringifiedDataList = JSON.stringify(this.parsedJson.responsedatalist);
          // Parse from JSON  
          this.devdetail$ = JSON.parse(this.stringifiedDataList);

          this.nop = this.parsedJson;
          this.totrec = data.entity.count;
          this.outorec = data.entity.viewCount;
        });
      }
      else {

        this.p = event; this.pagecount = parseInt(this.selectRowsText);

        let keydata = {
          pageNo: this.p,
          itemsPerPage: this.pagecount,
          searchBy: this.filter,
          searchType: "",
          totalRecords: "NA",
          pageID: "1",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue

        }
        try { AddLoader() } catch (e) { alert(e) }

        this.devreqService.SIMdetailsAPI(keydata).subscribe((data) => {
          try { RemoveLoader() } catch (e) { alert(e) }

          let resdata = data;
          //  try{RemoveLoader()}catch(e){}   
          let resdatadrp = resdata['entity'];
          // Convert to JSON  
          this.stringifiedData = JSON.stringify(resdatadrp);
          // Parse from JSON  
          this.parsedJson = JSON.parse(this.stringifiedData);
          let resdatadev = resdata['responsedatalist'];
          // Convert to JSON  
          this.stringifiedDataList = JSON.stringify(this.parsedJson.responsedatalist);
          // Parse from JSON  
          this.devdetail$ = JSON.parse(this.stringifiedDataList);

          this.nop = this.parsedJson;
          this.totrec = data.entity.count;
          this.outorec = data.entity.viewCount;

        });
      }
    } catch (e) { }
  }


  searchdata() {

    this.p = 1; this.pagecount = 10;

    let dataL = {
      pageNo: "1",
      itemsPerPage: "10",
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.devreqService.SIMdetailsAPI(dataL).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      let resdatalist = data.entity.responsedatalist;
      let vendorlist = resdatalist;
      this.devdetail$ = vendorlist;
      this.totrec = data.entity.count;
      this.outorec = data.entity.viewCount;
      console.log(this.totrec + typeof(this.totrec))
    });
  }

  RowsBindChanged() {
    try {
      this.p = 1; this.pagecount = parseInt(this.selectRowsText);

      let keydata = {
        pageNo: this.p,
        itemsPerPage: this.pagecount,
        searchBy: this.filter,
        searchType: "",
        totalRecords: "NA",
        pageID: "1",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { }
      // Page Load Detail Grid BIND LIST    
      this.devreqService.SIMdetailsAPI(keydata).subscribe(
        (data) => {
          try { RemoveLoader() } catch (e) { alert(e) }
          let resdatalist = data.entity.responsedatalist;
          let vendorlist = resdatalist;
          this.devdetail$ = vendorlist;
          this.totrec = data.entity.count;
          this.outorec = data.entity.viewCount;

        });
    } catch (e) { }
  }

  exportToPDF() {

    this.globalPDF$ = null;
    let keydata = {
      pageNo: "",
      itemsPerPage: "",
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.devreqService.SIMdetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.PreparePDFData(data.entity.responsedatalist);

        this.pdfservice.CreatePDFData(this.pdfData, "Sim Details");
      });
  }

  PreparePDFData(data) {
    let pdfTableData;
    for (let i = 0; i < data.length; i++) {
      pdfTableData = {
        "#": i + 1,
        "Sim Type": data[i].param14,
        "Sim Number": data[i].param2,
        "Mobile Number 1": data[i].param3,
        "Network 1": data[i].param6,
        "Creation date": data[i].param13,
        "Device status": data[i].param9,
        "Vehicle status": data[i].param12
      }
      this.pdfData.push(pdfTableData)
    };
  }

  exportToExcel() {

    this.globalPDF$ = null;
    let keydata = {
      pageNo: "",
      itemsPerPage: "",
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.devreqService.SIMdetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.PrepareExcelData(data.entity.responsedatalist);
        this.excelservice.ExportExcel(this.excelData, 'Sim Details', 'simdetails');
      });
  }

  PrepareExcelData(data) {
    this.excelData = [];

    for (var i = 0; i < data.length; i++) {
      try {
        var obj = {

          "#": i + 1,
          "Sim Type": data[i].param14,
          "Sim Number": data[i].param2,
          "Mobile Number 1": data[i].param3,
          "Network 1": data[i].param6,
          "Creation date": data[i].param13,
          "Device status": data[i].param9,
          "Vehicle status": data[i].param12

        }
      } catch (e) { }
      this.excelData.push(obj);
    }
  }




  clearfunction() {
    try {

      this.upnetworkObj = ""; this.mobileNumber = ""; this.simNo = ""; this.simTypeObj = "";
      this.upcourierbyText = ""; this.uptrackeridText = ""; this.upvendorText = ""; this.upcouriernameText = "";
      this.upcourierdate = ""; this.upCourierReceivedate = ""; this.upvendorlistdata = ""; this.upcourieraddressText = "";

    } catch (e) { }
  }

  Deletefunction() {
    var isValid = true;
    var deleteremark = $('#deleteremark').val();
    // Validate Contact Name
    if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      // $('#msg_error_delete').html('Please Enter Remark').show();
      $('#msg_error_delete').html('Please Enter Remark').show();
      $('#deleteremark').focus();
      setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        param1: this.deleteText,
        param2: this.simidspan,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }
      try { AddLoader() } catch (e) { alert(e) }

      this.devreqService.SIMDeleteAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.datafromrespo = data.entity;

        if (data.statuscode == "200") {
          this.responseMessage = data.entity;
          this.closemodal();
          this.SimDetail()
          $("#upSuccessModal").modal('show');
        }
        else {
          this.responseMessage = data.entity;
          $("#upErrorModal").modal('show');
        }
      });

    }
  }

  closemodal() {

    $("#successmodel").modal('hide');
    $('#modeldelete').modal('hide');
    $('#updateSimModal').modal('hide');

    $('.modal-backdrop.show').css('display', 'none');

  }

  DeleteModal(devmang: Paramcls) {
    try {

      this.simidspan = devmang.param1;

    } catch (e) { }

  }

  upvendordummy() {
    //this.upvendorthird = this.upvendorText.param1;
    this.upvendorlistdata = this.check(this.upvendorText);

  }

  networkupdate: any;

  upselecnetworkdummy() {
    this.selectnetworkreturn = this.check(this.upnetworkObj);
  }

  upCourierbyChangeList() {
    this.upreceivedbydummy = this.upcourierbyText.param2;
    this.upcourierbythird = this.upreceivedbydummy;

    var courierby = $('#courierbyid').val();

    if (this.upcourierbythird == "Courier") {
      document.getElementById("uprecbydiv").style.display = "block"; $('#uprecbydiv').show();
      document.getElementById("uprecdate").style.display = "block"; $('#uprecdate').show();
      document.getElementById("upcourierinfodiv").style.display = "block"; $('#upcourierinfodiv').show();
      document.getElementById("uppermobno").style.display = "none"; $('#uppermobno').hide();
      document.getElementById("uprecfrm").style.display = "none"; $('#uprecfrm').hide();
      document.getElementById("upcouriersaveentry").style.display = "block"; $('#upcouriersaveentry').show();
      document.getElementById("upreceivedsaveentry").style.display = "none"; $('#upreceivedsaveentry').show();

    }
    else if (this.upcourierbythird == "By Hand") {
      document.getElementById("upcourierinfodiv").style.display = "none";
      document.getElementById("uprecbydiv").style.display = "block";
      document.getElementById("uprecdate").style.display = "block";
      document.getElementById("uppermobno").style.display = "block";
      document.getElementById("uprecfrm").style.display = "block";
      document.getElementById("upcouriersaveentry").style.display = "none";
      document.getElementById("upreceivedsaveentry").style.display = "block";
    }
  }

  check(data) {
    try {
      if (typeof data === 'object') {
        return data.param1;
      }
      else if (data == '') {
      }
      else {
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
        // return data.param1;
      }
      else {

        var index = data.findIndex(x => x.param2 === value);

        return data[index].param1;
      }
    } catch (e) {
      return '';
    }

  }

  EncryptPageName() {
    this.cryptService.encrypt("Sim Master")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput

  }

  simbulkentryClick() {
    this.router.navigate(['./simUploadentry']);
  }

  upsnet: string; upven: string;
  PlastciSimUpdate() {

    var venid = this.getid(this.ListOfvendorupdate, this.upvendorText);
    var netid = this.getid(this.upListOfNetwork, this.upnetworkObj);

    if (!netid && netid == null) {
      $('#msg_errorupdate').html('Please Select Network.').show();
      $('#upsimnetwork').focus();
      setTimeout(function () { document.getElementById("msg_errorupdate").style.display = "none"; }, 3000);
    }
    else if (!venid && venid == null) {
      $('#msg_errorupdate').html('Please Select Vendor.').show();
      $('#upvendorText').focus();
      setTimeout(function () { document.getElementById("msg_errorupdate").style.display = "none"; }, 3000);
    }

    if (this.simNo == '' || this.simNo == null || this.simNo.length < 10 || this.simNo.length > 21) {
      $('#msg_errorupdate').html('Please Enter Valid Sim Number').show();
      $('#simNumbereidit').focus();
      setTimeout(function () { document.getElementById("msg_errorupdate").style.display = "none"; }, 3000);
    }
    else if (this.mobileNumber == '' || this.mobileNumber == null) {
      $('#msg_errorupdate').html('Please Enter Valid Mobile Number').show();
      $('#mobilenumberedit').focus();
      setTimeout(function () { document.getElementById("msg_errorupdate").style.display = "none"; }, 3000);
    }
    else if (this.mobileNumber.length != 10 && this.mobileNumber.length != 13) {
      $('#msg_errorupdate').html('Please Enter Valid Mobile Number').show();
      $('#mobilenumberedit').focus();
      setTimeout(function () { document.getElementById("msg_errorupdate").style.display = "none"; }, 3000);
    }
    else if (this.upnetworkObj == '' || this.upnetworkObj == null) {
      $('#msg_errorupdate').html('Please Select Network').show();
      $('#upsimnetwork').focus();
      setTimeout(function () { document.getElementById("msg_errorupdate").style.display = "none"; }, 3000);
    }
    else {


      var simn = $('#simNumbereidit').val();
      var simtyp = $('#simtypeedit').val();
      var mob1 = $('#mobilenumberedit').val();
      var courdtid = $('#upcourierdateid').val();
      var courrecedtid = $('#upcourierreceivedateid').val();
      var cournmid = $('#upcouriernameentry').val();
      var trackerid = $('#uptrackeridentry').val();
      var receivedby = $('#upreceivedbynameentry').val();

      let dataL = {

        remarks: "ok",
        simid: this.simId,
        simno: simn,
        mobilenumber1: mob1,
        networkid1: netid,
        uploadedby: "Application",
        Excelname: "",
        simtypeid: simtyp,
        mobilenumber2: "",
        networkid2: "",
        deliverytype: this.upcourierbythird,
        couriername: cournmid,
        dispatchdatetime: courdtid,
        recivedatetime: courrecedtid,
        personename: receivedby,
        personemobileno: "",
        vehicleregno: "",
        trackerid: trackerid,
        vendorId: venid
      }
      try { AddLoader() } catch (e) { }

      this.devreqService.SIMUpdateAPI(dataL).subscribe((response) => {
        try { RemoveLoader() } catch (e) { }

        if (response.statuscode == "200") {

          this.responseMessage = response.entity;
          $("#upSuccessModal").modal('show'); this.RefreshDeviceDetail();
        }
        else {
          this.responseMessage = response.entity
          $("#upErrorModal").modal('show');

        }
      })
    }

  }

  upentrymodalclose() {

    $('#updateSimModal').hide();
    $('#upSuccessModal').hide();
    this.clearfunction();

    $('.modal-backdrop.show').css('display', 'none');
  }

  upentrymodaladd() {
    $('#upSuccessModal').hide();
    this.clearfunction();
    $('.modal-backdrop.show').css('display', 'none');
  }

}