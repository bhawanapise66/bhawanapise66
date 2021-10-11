import { SimservicemasterService } from './../services/simservicemaster.service';
import { Router } from '@angular/router';
import { ListService } from './../../../../list.service';

import { Paramcls } from './../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as moment from 'moment';
import * as $ from 'jquery';
import { CryptService } from '../services/crypt.service';
import { DispatchedinstalledService } from '../services/dispatchedinstalled.service';


declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;


import { SimEntry } from '../simmaster/simmaster.component';

declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-simentry',
  templateUrl: './simentry.component.html',
  styleUrls: ['./simentry.component.css']
})
export class SimentryComponent implements OnInit {
  sim = new SimEntry();

  count: any;
  encryptedpageNameValue: string; encryptedpageUrlValue: string; pageUrl = this.router.url
  simTypeList: any[]; networkList: any[]; ListOfvendor = []; private _success = new Subject<string>(); successMessageUpdate: string;

  networkObj: any; simTypeObj: any; fallBackNetObj: any; courierbyText: any; trackeridText: string; vendorText: any;
  couriernameText: string; courierdate: string; CourierReceivedate: string; receivedbydummy: string; receivedbyText: string;
  responseMessage: any; vendorlistdata: string; courieraddressText: string; devdetail$: any;
  key: string = 'name'; reverse: boolean = true;
  p: any = "1"; pagecount: any = 10; nop: number; totrec: number; outorec: number; filter: any = '';
  networklistdata: string; personmobileNo: string; courierfromText: string;

  constructor(private cryptService: CryptService, private router: Router, private listService: ListService,
    private simService: SimservicemasterService) {
    this.EncryptPageName(); this.EncryptPageUrl();
  }

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

  ngOnInit() {

    (function ($) {
      $(document).ready(function () {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#simnetworkentry').focus();
        })

      });
    })(jQuery);


    (function ($) {
      $(document).ready(function () {

        /* calander picker */
        var start = moment().subtract(29, 'days');
        var end = moment();

        function cb(start, end) {
          $('#daterangeadminux2 span').html(start.format('D MMM, YY') + ' - ' + end.format('D MMM, YY'));
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
          $('#daterangeadminux2 span').html(start.format('D MMM, YY') + ' - ' + end.format('D MMM, YY'));
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

    this._success.subscribe((message) => this.successMessageUpdate = message);

    this._success.pipe(
      debounceTime(8000)
    ).subscribe(() => this.successMessageUpdate = null);

    this.SimTypeListFun(); this.NetworkList(); this.VendorList();
    document.getElementById("recbydiv").style.display = "block";
    document.getElementById("courierinfodiv").style.display = "none";
    document.getElementById("recdate").style.display = "block";
    document.getElementById("permobno").style.display = "none";
    document.getElementById("recfrm").style.display = "none";
  }

  EncryptPageName() {
    this.encryptedpageNameValue = this.cryptService.encrypt("Sim Entry")

  }

  EncryptPageUrl() {
    this.encryptedpageUrlValue = this.cryptService.encrypt(this.pageUrl)
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
      this.simTypeObj = this.simTypeList[0];
      this.sim.simTypeId = this.simTypeObj.param1;
      this.sim.simTypeName = this.simTypeObj.param2;
    })
  }

  NetworkList() {
    let dataL = {
      pageID: "2",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.NetworkListAPI(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      this.networkList = response.entity.list;
    })
  }

  getsimType() {
    this.sim.simTypeId = this.simTypeObj.param1;
    this.sim.simTypeName = this.simTypeObj.param2;
  }

  getNetwork() {
    this.sim.networkid = this.networkObj.param1;
    //this.sim.networkname = this.networkObj.param2
  }

  CourierbyChangeList() {

    this.receivedbydummy = this.courierbyText.param2;

    var courierby = $('#courierbyid').val();

    if (this.receivedbydummy == "Courier") {
      // $('#courierinfodiv').show(); $('#recbydiv').hide();
      document.getElementById("recbydiv").style.display = "block";
      document.getElementById("recdate").style.display = "block";
      document.getElementById("courierinfodiv").style.display = "block";
      document.getElementById("permobno").style.display = "none";
      document.getElementById("recfrm").style.display = "none";
    }
    else if (this.receivedbydummy == "By Hand") {
      //$('#courierinfodiv').hide(); $('#recbydiv').show(); 
      document.getElementById("courierinfodiv").style.display = "none";
      document.getElementById("recbydiv").style.display = "block";
      document.getElementById("recdate").style.display = "block";
      document.getElementById("permobno").style.display = "block";
      document.getElementById("recfrm").style.display = "block";
    }
  }

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
        this.ListOfvendor = data.entity;
      });
  }

  snet: string; ven: string;
  mobilenochange() {

    this.receivedbydummy = this.courierbyText.param2;
    this.snet = this.networkObj.param1;
    this.ven = this.vendorText.param1;
    var receivedby = $('#receivedbynameentry').val();
    var couriernm = $('#couriernameentry').val();
    var cournmid = $('#couriernameentry').val();
    var trackerid = $('#trackeridentry').val();

    if (!this.snet && this.snet == null) {
      $('#msg_errorentry').html('Please Select Network.').show();
      $('#simnetworkentry').focus();
      setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
    }
    else if (!this.ven && this.ven == null) {
      $('#msg_errorentry').html('Please Select Vendor.').show();
      $('#vendorentrydemo').focus();
      setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
    }
    else if (!this.receivedbydummy && this.receivedbydummy == null) {
      $('#msg_errorentry').html('Please Select Courier By.').show();
      $('#courierbyid').focus();
      setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
    }

    if (this.receivedbydummy == "By Hand") {

      if (!receivedby && receivedby == null) {
        $('#msg_errorentry').html('Please Enter Received By Name.').show();
        $('#receivedbynameentry').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      else if (this.sim.simNo == '' || this.sim.simNo == null || this.sim.simNo.length < 19 || this.sim.simNo.length > 21) {
        $('#msg_errorentry').html('Please Enter Valid Sim Number.').show();
        $('#simNumber').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      else if ((this.sim.mobileNo.length != 10) && (this.sim.mobileNo.length != 13)) {
        $('#msg_errorentry').html('Please Enter Valid Mobile Number 10 or 13 Digit.').show();
        $('#mobilenumber').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }

    }
    else if (this.receivedbydummy == "Courier") {
      if (!receivedby && receivedby == null) {
        $('#msg_errorentry').html('Please Enter Received By Name.').show();
        $('#receivedbynameentry').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      else if (!cournmid && cournmid == null) {
        $('#msg_errorentry').html('Please Enter Courier From.').show();
        $('#receivedbynameentry').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      else if (!trackerid && trackerid == null) {
        $('#msg_errorentry').html('Please Enter Tracker ID.').show();
        $('#trackeridentry').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      else if (this.sim.simNo == '' || this.sim.simNo == null || this.sim.simNo.length < 19 || this.sim.simNo.length > 21) {
        $('#msg_errorentry').html('Please Enter Valid Sim Number.').show();
        $('#simNumber').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      else if ((this.sim.mobileNo.length != 10) && (this.sim.mobileNo.length != 13)) {
        $('#msg_errorentry').html('Please Enter Valid Mobile Number 10 or 13 Digit.').show();
        $('#mobilenumber').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }

    }

  }


  PlasticSimEntryNew() {
console.log(this.receivedbyText)
    this.vendorlistdata = this.vendorText.param1;
    this.receivedbydummy = this.courierbyText.param2;
    this.snet = this.networkObj.param1;
    this.ven = this.vendorText.param1;
    var receivedby = $('#modofdeliverylistdatadummy').val();
    var couriernm = $('#couriernameentry').val();
    var cournmid = $('#couriernameentry').val();
    var trackerid = $('#trackeridentry').val();

    if (!this.snet && this.snet == null) {
      $('#msg_errorentry').html('Please Select Network.').show();
      $('#simnetworkentry').focus();
      setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
    }
    else if (!this.ven && this.ven == null) {
      $('#msg_errorentry').html('Please Select Vendor.').show();
      $('#vendorentrydemo').focus();
      setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
    }
    else if (!this.receivedbydummy && this.receivedbydummy == null) {
      $('#msg_errorentry').html('Please Select Mode Of Delivery.').show();
      $('#courierbyid').focus();
      setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
    }

    if (this.receivedbydummy == "By Hand") {

      if (!this.snet && this.snet == null) {
        $('#msg_errorentry').html('Please Select Network.').show();
        $('#simnetworkentry').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      else if (!this.ven && this.ven == null) {
        $('#msg_errorentry').html('Please Select Vendor.').show();
        $('#vendorentrydemo').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      else if (!this.receivedbydummy && this.receivedbydummy == null) {
        $('#msg_errorentry').html('Please Select Courier By.').show();
        $('#courierbyid').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      else if (!this.receivedbyText && this.receivedbyText == null) {
        $('#msg_errorentry').html('Please Enter Received By Name.').show();
        $('#receivedbynameentry').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      else if (this.sim.simNo == '' || this.sim.simNo == null || this.sim.simNo.length < 19 || this.sim.simNo.length > 21) {
        $('#msg_errorentry').html('Please Enter Valid Sim Number.').show();
        $('#simNumber').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      else if ((this.sim.mobileNo.length != 10) && (this.sim.mobileNo.length != 13)) {
        $('#msg_errorentry').html('Please Enter Valid Mobile Number 10 or 13 Digit.').show();
        $('#mobilenumber').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }

      else {

        var courdtid = $('#courierdateid').val();
        var courrecedtid = $('#courierreceivedateid').val();
        var recefrm = $('#receivedfromentry').val();
        var permobno = $('#personmobilenumber').val();

        let datacourier = {

          remarks: "ok",
          simid: "",
          simno: this.sim.simNo,
          mobilenumber1: this.sim.mobileNo,
          networkid1: this.sim.networkid,
          uploadedby: "Application",
          Excelname: "",
          simtypeid: this.sim.simTypeId,
          mobilenumber2: "",
          networkid2: "",
          deliverytype: this.receivedbydummy,
          couriername: "",
          dispatchdatetime: "",
          recivedatetime: courrecedtid,
          personename: receivedby,
          personemobileno: permobno,
          vehicleregno: "",
          trackerid: "",
          vendorId: this.vendorlistdata,
          simfrom: recefrm
        }
        try { AddLoader() } catch (e) { }

        this.simService.SIMInsertAPI(datacourier).subscribe((response) => {
          try { RemoveLoader() } catch (e) { }

          if (response.statuscode == "200") {

            this.responseMessage = response.entity
            $("#SuccessModalEntry").modal('show'); this.RefreshDeviceDetail(); this.closemodal();
          }
          else {
            this.responseMessage = response.entity
            $("#ErrorModalEntry").modal('show');

          }
        })
      }
    }
    else if (this.receivedbydummy == "Courier") {
      if (!this.snet && this.snet == null) {
        $('#msg_errorentry').html('Please Select Network.').show();
        $('#simnetworkentry').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      else if (!this.ven && this.ven == null) {
        $('#msg_errorentry').html('Please Select Vendor.').show();
        $('#vendorentrydemo').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      else if (!this.receivedbydummy && this.receivedbydummy == null) {
        $('#msg_errorentry').html('Please Select Mode Of Delivery.').show();
        $('#courierbyid').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      /*  else if (!receivedby && receivedby == null) {
         $('#msg_errorentry').html('Please Enter Received By Name.').show();
         $('#receivedbynameentry').focus();
         set Timeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
       }*/
      else if (!cournmid && cournmid == null) {
        $('#msg_errorentry').html('Please Enter Courier From.').show();
        $('#receivedbynameentry').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      else if (!trackerid && trackerid == null) {
        $('#msg_errorentry').html('Please Enter Tracker ID.').show();
        $('#trackeridentry').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      else if (this.sim.simNo == '' || this.sim.simNo == null || this.sim.simNo.length < 19 || this.sim.simNo.length > 21) {
        $('#msg_errorentry').html('Please Enter Valid Sim Number.').show();
        $('#simNumber').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      else if ((this.sim.mobileNo.length != 10) && (this.sim.mobileNo.length != 13)) {
        $('#msg_errorentry').html('Please Enter Valid Mobile Number 10 or 13 Digit.').show();
        $('#mobilenumber').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }

      else {

        var courdtid = $('#courierdateid').val();
        var courrecedtid = $('#courierreceivedateid').val();
        var courfrom = $('#courierfromentry').val();

        let datacourier = {

          remarks: "ok",
          simid: "",
          simno: this.sim.simNo,
          mobilenumber1: this.sim.mobileNo,
          networkid1: this.sim.networkid,
          uploadedby: "Application",
          Excelname: "",
          simtypeid: this.sim.simTypeId,
          mobilenumber2: "",
          networkid2: "",
          deliverytype: this.receivedbydummy,
          couriername: cournmid,
          dispatchdatetime: "",
          recivedatetime: courrecedtid,
          personename: receivedby,
          personemobileno: "",
          vehicleregno: "",
          trackerid: trackerid,
          vendorId: this.vendorlistdata,
          simfrom: courfrom
        }
        try { AddLoader() } catch (e) { }

        this.simService.SIMInsertAPI(datacourier).subscribe((response) => {
          try { RemoveLoader() } catch (e) { }

          if (response.statuscode == "200") {

            this.responseMessage = response.entity
            $("#SuccessModalEntry").modal('show'); this.RefreshDeviceDetail(); this.closemodal();
          }
          else {
            this.responseMessage = response.entity
            $("#ErrorModalEntry").modal('show');

          }
        })
      }
    }
  }


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
    this.simService.SIMdetailsAPI(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      this.devdetail$ = data.entity.responsedatalist;

      this.totrec = data.entity.count;
      this.outorec = data.entity.viewCount;

    });
  }


  PlasticSimEntry() {
    if (this.sim.simNo == '' || this.sim.simNo == null || this.sim.simNo.length < 10 || this.sim.simNo.length > 13) {
      $('#err_simentry').html('Please Enter Valid Sim Number.').show();
      $('#simNumber').focus();
      setTimeout(function () { document.getElementById("err_simentry").style.display = "none"; }, 3000);
    }
    else if ((this.sim.mobileNo.length != 10) && (this.sim.mobileNo.length != 13)) {
      $('#err_simentry').html('Please Enter Valid Mobile Number 10 or 13 Digit.').show();
      $('#mobilenumber').focus();
      setTimeout(function () { document.getElementById("err_simentry").style.display = "none"; }, 3000);
    }
    else if (this.sim.networkid == '' || this.sim.networkid == null) {
      $('#err_simentry').html('Please Select Network.').show();
      $('#simnetwork').focus();
      setTimeout(function () { document.getElementById("err_simentry").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        param1: '',
        param2: '',
        param3: this.sim.simNo,
        param4: this.sim.mobileNo,
        param5: this.sim.networkid,
        param6: 'Application',
        param7: '',
        param8: '',
        param9: this.sim.simTypeId,//     this.sim.simTypeId,
        param10: '',//this.sim.fallbackNo,
        param11: '',// this.sim.fallbackNetworkid
      }
      try { AddLoader() } catch (e) { }

      this.simService.SIMInsertAPI(dataL).subscribe((response) => {
        try { RemoveLoader() } catch (e) { }

        if (response.statuscode == "200") {
          this.responseMessage = response.entity
          $("#SuccessModalEntry").modal('show'); this.clearfunction();
        }
        else {
          this.responseMessage = response.entity
          $("#ErrorModalEntry").modal('show');

        }
      })
    }

  }

  ESimEntry() {
    if (this.sim.simNo == '' || this.sim.simNo == null) {
      $('#err_simentry').html('Please Enter Valid ICCID Number.').show();
      $('#simNumber').focus();
      setTimeout(function () { document.getElementById("err_simentry").style.display = "none"; }, 3000);
    }
    else if (this.sim.simNo.length != 19) {
      $('#err_simentry').html('ICCID Number Should Be at Least 19 Digit.').show();
      $('#simNumber').focus();
      setTimeout(function () { document.getElementById("err_simentry").style.display = "none"; }, 3000);

    }
    else if ((this.sim.mobileNo.length != 10) && (this.sim.mobileNo.length != 13)) {
      $('#err_simentry').html('Please Enter Valid Primary Number.').show();
      $('#mobilenumber').focus();
      setTimeout(function () { document.getElementById("err_simentry").style.display = "none"; }, 3000);
    }
    else if (this.sim.networkid == '' || this.sim.networkid == null || this.sim.networkid.length <= 9) {
      $('#err_simentry').html('Please Select Primary Network.').show();
      $('#simnetwork').focus();
      setTimeout(function () { document.getElementById("err_simentry").style.display = "none"; }, 3000);
    }
    else if (this.sim.fallbackNo == '' || this.sim.fallbackNo == null) {
      $('#err_simentry').html('Please Enter Valid Fallback Number.').show();
      $('#fallbacknumber').focus();
      setTimeout(function () { document.getElementById("err_simentry").style.display = "none"; }, 3000);
    }
    else if (this.sim.fallbackNetworkid == '' || this.sim.fallbackNetworkid == null) {
      $('#err_simentry').html('Please Select Fallback Network.').show();
      $('#fallbacknetwork').focus();
      setTimeout(function () { document.getElementById("err_simentry").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        param1: '',
        param2: '',
        param3: this.sim.simNo,
        param4: this.sim.mobileNo,
        param5: this.sim.networkid,
        param6: 'Application',
        param7: '',//Excelname',
        param8: '',//'ExcelFilePath',
        param9: this.sim.simTypeId,// 'simType',
        param10: this.sim.fallbackNo,// 'fallbackno',
        param11: this.sim.fallbackNetworkid,//'fallbacknetwork'
      }
      try { AddLoader() } catch (e) { }

      this.simService.SIMInsertAPI(dataL).subscribe((response) => {
        try { RemoveLoader() } catch (e) { }

        if (response.statuscode == "200") {
          //this.responseMessage = "Data Saved Successfully"
          this.responseMessage = response.entity
          $("#SuccessModalEntry").modal('show');
        }
        else {
          //this.responseMessage = "Error In Saving Data"
          this.responseMessage = response.entity
          $("#ErrorModalEntry").modal('show');

        }
      })
    }

  }

  entrymodalclose() {

    this.clearfunction();

    $('.modal-backdrop.show').css('display', 'none');
  }

  entrymodaladd() {

    $('#simentryModal').modal('show'); this.clearfunction();
  }


  closemodal() {

    $("#SuccessModalEntry").modal('hide');
    // $('#modeldelete').modal('hide');
    $('#simentryModal').modal('hide');

    $('.modal-backdrop.show').css('display', 'none');

  }

  clearfunction() {

    this.couriernameText = ""; this.courieraddressText = ""; this.personmobileNo = ""; this.receivedbyText = "";
    this.courierbyText = ""; this.trackeridText = ""; this.vendorText = ""; this.sim.mobileNo = ""; this.networkObj = "";
    this.sim.simNo = ""; this.courierfromText = "";
  }


}