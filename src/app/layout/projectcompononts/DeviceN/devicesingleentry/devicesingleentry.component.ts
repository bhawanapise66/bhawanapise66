import { DevicemasterService } from './../../../../APIService/devicemaster.service';
import { Router } from '@angular/router';
import { ListService } from './../../../../../list.service';

import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as moment from 'moment';
import * as $ from 'jquery';
import { CryptService } from '../../services/crypt.service';
declare var jQuery: any; declare var $: any; declare var AddLoader: any; declare var RemoveLoader: any;
declare var SuccessAlert: any; declare var errorAlert: any;

@Component({
  selector: 'app-devicesingleentry',
  templateUrl: './devicesingleentry.component.html',
  styleUrls: ['./devicesingleentry.component.css']
})
export class DevicesingleentryComponent implements OnInit {

  encryptedpageNameValue: string; encryptedpageUrlValue: string; pageUrl = this.router.url;
  private _success = new Subject<string>(); successMessageUpdate: string;

  imeinoText: number; deviceserialText: string; ICCIDNoTextentry: string; mobile1Textentry: string; mobile2Textentry: string; selectnetwork1entry: string; selectnetwork2entry: string;
  ReceiptUpload: string; vendorlistdata: string; vendorText: any; modofdeliverylistdatadummy: string;

  accountnoText: string; banknmText: string; branchnmText: string; ifscText: string; paymntText: string; count: number; SIMNoTextentry: string;
  datafromrespo: string; theCheckbox = false; ListOfCity$: Object; ListOfState$: Object; networklist$: Object; resdatalist = []; ListOfModeofDelivery = []; ListOfvendor = []; ListOfmodel = []; ListOfdevicetype = [];
  public loading = false; p: number; modelText: any; devicetypeText: any; modellist: string; devicetypelist: string;
  modeofdeliverylistdata: string; pageNumber: any = 1; itemsPerPage: any = 10; filter: any = ''
  totalcount: any; DeviceDetails$: any; viewcount: number; receivedbyText: string; personmobileNo: string; mobile1objTextdummy: string;
  trackeridText: string; courierfromText: string; couriernameText: string; CourierReceivedate: string;
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };

  configmobile = {
    displayKey: "param3", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  network1Obj: any;
  devicetypeName: any;
  network2Obj: any;
  simlistArr1: any;
  simlistArr2: any;
  mobile1obj: any
  mobile2obj: any
  constructor(private deviceDetails: DevicemasterService, private listService: ListService, private cryptService: CryptService, private router: Router) {
    this.EncryptPageName();
    this.EncryptPageUrl();
  }

  ngOnInit() {

    (function ($) {
      $(document).ready(function () {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#vendorentrydemo').focus();
        })
      });
    })(jQuery);

    (function ($) {
      $(document).ready(function () {
        $('#vendorentrydemo').focus();
        $(".buttonFinish").prop('disabled', true);
        $("#step-14").show();
        $("#step-15").hide();
        $("#step-16").hide();
        $("#step-17").hide();
        $("#step-14").show();
        $("#stepentry-15").hide();
        $("#stepentry-16").hide();
        $("#stepentry-17").hide();


        $('#vendorentrydemo').focus();
        $(".buttonFinish").prop('disabled', true);
        $("#stepentry-14").show();
        $("#stepentry-15").hide();
        $("#stepentry-16").hide();
        $("#stepentry-17").hide();
        function setClassesentry(index, steps) {
          if (index < 0 || index > steps) return;
          if (index == 0) {
            $("#preventry").prop('disabled', true);
          } else {
            $("#preventry").prop('disabled', false);
          }
          if (index == steps) {
            $("#nextentry").text();
          } else {
            $("#nextentry").text();
          }
          $(".step-wizardentry ul li").each(function () {
            $(this).removeClass();
          });
          $(".step-wizardentry ul li:lt(" + index + ")").each(function () {
            $(this).addClass("done");
          });
          $(".step-wizardentry ul li:eq(" + index + ")").addClass("active")
          var p = index * (100 / steps);
          $("#progentry").width(p + '%');
        }
        $(".step-wizardentry ul button").click(function () {
          var step = $(this).find("div.step")[0].innerText;
          var steps = $(".step-wizardentry ul li").length;
          validateAllStepsentry(step - 1, steps);
        });
        $("#preventry").click(function () {
          var step = $(".step-wizardentry ul li.active div.step")[0].innerText;
          var steps = $(".step-wizardentry ul li").length;
          setClassesentry(step - 2, steps - 1);
          displayreviousSectionentry(step - 1);
        });
        $("#nextentry").click(function () {
          if ($(this).text() == 'done') {
          } else {
            var step;
            try {
              step = $(".step-wizardentry ul li.active div.step")[0].innerText;
            } catch (error) {
              step = $(".step-wizardentry ul li div.step")[0].innerText;
            }

            var steps = $(".step-wizardentry ul li").length;
            validateAllStepsentry(step, steps - 1);
          }
        });

        // initial state setup
        setClassesentry(0, $(".step-wizardentry ul li").length);

        function displayreviousSectionentry(index) {

          $("#nextentry").prop('disabled', false);
          switch (index) {
            case 0:
              $("#stepentry-14").show();
              $("#stepentry-15").hide();
              $("#stepentry-16").hide();
              $("#stepentry-17").hide();
              break;
            case 1:
              $("#stepentry-14").show();
              $("#stepentry-15").hide();
              $("#stepentry-16").hide();
              $("#stepentry-17").hide();
              break;
            case 2:
              $("#stepentry-14").hide();
              $("#stepentry-15").show();
              $("#stepentry-16").hide();
              $("#stepentry-17").hide();
              break;
            case 3:
              $("#stepentry-14").hide();
              $("#stepentry-15").hide();
              $("#stepentry-16").show();
              $("#stepentry-17").hide();
              break;
            default:
              $("#stepentry-14").show();
              $("#stepentry-15").hide();
              $("#stepentry-16").hide();
              $("#stepentry-17").hide();
          }
        }
        function validateAllStepsentry(index, steps) {
          var isStepValid = true;


          if (validateentryStep1(index, steps) == false) {
            isStepValid = false;
          } else if (validateentryStep2(index, steps) == false) {
            isStepValid = false;
          } else if (validateentryStep3(index, steps) == false) {
            isStepValid = false;
          } else if (validateentryStep4(index, steps) == false) {
            isStepValid = false;
          }
          return isStepValid;
        }
        function validateentryStep1(index, steps) {
          $('#vendorentrydemo').focus();

          $('#msg_errorentry').html('').hide();

          var isValid = true;

          var vend = $('#vendordummy').val();
          var mod = $('#modeofdelidummy').val();
          var receivedby = $('#receivedbynameentry').val();

          if (!vend && vend.length <= 0) {
            isValid = false;
            $('#msg_errorentry').html('Please Select Vendor.').show();
            $('#vendorentrydemo').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          else if (!mod && mod.length <= 0) {
            isValid = false;
            $('#msg_errorentry').html('Please Select Mode Of Delivery.').show();
            $('#receivedbynameentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          else if (!receivedby && receivedby.length <= 0) {
            isValid = false;
            $('#msg_errorentry').html('Please Enter Received By Name.').show();
            $('#receivedbynameentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }

          if (isValid && index == 1) {

            $('#msg_errorentry').html('').hide();

            $("#stepentry-14").hide()
            $("#stepentry-15").show();
            $("#stepentry-16").hide();
            $("#stepentry-17").hide();

            $(".buttonFinish").prop('disabled', false);
            $("#nextentry").prop('disabled', true);
            setClassesentry(index, steps);
            $('#devicetypeentry').focus();
            isValid = false;
          }
          return isValid;
        }
        function validateentryStep2(index, steps) {

          $('#devicetypeentry').focus();
          $('#msg_error_contactentry').html('').hide();

          var isValid = true;
          var venlist = $('#vendordummy').val();
          var model = $('#modellistdummy').val();

          var devicetype = $('#devicetypeentrydummy').val();
          var IMEIno = $('#IMEINoentry').val();
          var deviceserialno = $('#deviceserialentry').val();
          var checkdata = $('#checkboxdata').val();
          if (!devicetype && devicetype.length <= 0) {
            isValid = false;
            $('#msg_error_contactentry').html('Please Select Device Type').show();
            $('#devicetypeentry').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
          }
          else if (!model && model.length <= 0) {
            isValid = false;
            $('#msg_error_contactentry').html('Please Select Device Model').show();
            $('#modelentry').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
          }
          else if (!IMEIno && IMEIno.length <= 0 || IMEIno.length < 15) {
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter IMEI No. ').show();
            $('#IMEINoentry').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
          }
          else if (!deviceserialno && deviceserialno.length <= 0 || deviceserialno.length < 8) {
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Serial No. ').show();
            $('#deviceserialentry').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
          }


          if (isValid && index == 2) {

            var ofcemail = $('#devicetypeentrydummy').val();

            if (ofcemail == "AIS-140") {
              $("#aismob2ent").css("display", "block");
              $("#aisnet2ent").css("display", "block");
              $("#aisiccent").css("display", "block");

            } else if (ofcemail == "Basic" || ofcemail == "Personal Tracker App" || ofcemail == "Smart Tracker") {
              $("#aismob2ent").css("display", "none");
              $("#aisnet2ent").css("display", "none");
              $("#aisiccent").css("display", "none");
            }

            $('#msg_error_contactentry').html('').hide();

            $("#stepentry-15").hide();
            $("#stepentry-14").hide()
            $("#stepentry-16").show();
            $("#stepentry-17").hide();

            $(".buttonFinish").prop('disabled', false);
            $("#nextentry").prop('disabled', false);
            setClassesentry(index, steps);
            isValid = false;
          }

          return isValid;
        }
        function validateentryStep3(index, steps) {

          $('#accountNoentry').focus();
          var isValid = true;

          if (isValid && index == 3) {

            $('#msg_accountNoentry').html('').hide();
            $("#stepentry-14").hide();
            $("#stepentry-15").hide();
            $("#stepentry-16").hide();

            var ofcemail = $('#devicetypeentrydummy').val();

            setClassesentry(index, steps);
            $("#nextentry").prop('disabled', false); $(".buttonFinish").prop('disabled', false);
            isValid = false;
          }
          return isValid;
        }
        function validateentryStep4(index, steps) {

          return true;
        }





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


    document.getElementById("couriersaveentry").style.display = "none";
    document.getElementById("receivedsaveentry").style.display = "none";
    this.VendorList(); this.NetworkList(); this.ModeOfDeliveryList(); this.clearfunction();

    this._success.subscribe((message) => this.successMessageUpdate = message);

    this._success.pipe(debounceTime(8000)).subscribe(() => this.successMessageUpdate = null);
  }

  EncryptPageName() {
    this.cryptService.encrypt("Single Device Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }

  /*-------------List of State Api ---------------*/

  ModeOfDeliveryList() {

    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.DeliveryModeListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfModeofDelivery = data.entity;
        this.loading = false;

      });
  }
  VendorList() {

    let keydata = {
      param1: "Device",
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

  DevicetypeListBind() {
    this.vendorlistdata = this.vendorText.param1;
    let keydata = {
      param1: this.vendorlistdata,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.DeviceTypeListAPI(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.ListOfdevicetype = data.entity.list;
    });
  }

  DeviceModelList() {
    this.vendorlistdata = this.vendorText.param1;
    this.devicetypelist = this.devicetypeText.param1;
    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue,
      param1: this.vendorlistdata,
      param2: this.devicetypelist
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.DeviceModelListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfmodel = data.entity.list;

        this.loading = false;

      });
  }
  NetworkList() {
    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.NetworkListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.networklist$ = data.entity.list;
      });
  }

  SimList1() {
    this.selectnetwork1entry = this.network1Obj.param1;
    let dataL = {
      "param1": "",
      "param2": "",
      "param3": "",
      "param4": this.selectnetwork1entry,
      "param5": "deviceentry",
      "pageID": "erghy",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.simList(dataL).subscribe((response) => {
      this.simlistArr1 = response.entity
    })
  }
  SimList2() {
    this.selectnetwork2entry = this.network2Obj.param1;
    let dataL = {
      "param1": "",
      "param2": "",
      "param3": "",
      "param4": this.selectnetwork2entry,
      "param5": "deviceentry",
      "pageID": "aret",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.simList(dataL).subscribe((response) => {
      this.simlistArr2 = response.entity
    })
  }

  devicestep1validation() {
    this.DeviceModelList();
    this.devicetypeName = this.devicetypeText.param2;
    this.devicetypelist = this.devicetypeText.param1;
    if (this.devicetypeName == 'AIS-140') {
      this.theCheckbox = true;
      this.checkdata = "true"
      $(".buttonFinish").prop('disabled', true);
      $("#nextentry").prop('disabled', false);
      document.getElementById("aismob2ent").style.display = "block";
      document.getElementById("basicsimno").style.display = "none";
      document.getElementById("basicmobnoinput").style.display = "none";
      document.getElementById("basmob1").style.display = "none";
      document.getElementById("addnewbtnid").style.display = "none";
      document.getElementById("aisnet2ent").style.display = "block";
      document.getElementById("aisiccent").style.display = "block";

      $("#checkboxdata").attr("disabled", true);

    }
    else if (this.devicetypeName == 'Basic' || this.devicetypeName == 'Personal Tracker' || this.devicetypeName == 'Personal Tracker App' || this.devicetypeName == 'Smart Tracker') {
      this.theCheckbox = false;
      this.checkdata = "false"
      $("#checkboxdata").attr("disabled", false);

      $(".buttonFinish").prop('disabled', false);
      $("#nextentry").prop('disabled', true);

      document.getElementById("aismob2ent").style.display = "none";
      document.getElementById("basicsimno").style.display = "none";
      document.getElementById("basicmobnoinput").style.display = "none";
      document.getElementById("basmob1").style.display = "block";
      document.getElementById("addnewbtnid").style.display = "block";
      document.getElementById("aisnet2ent").style.display = "none";
      document.getElementById("aisiccent").style.display = "none";
    }
  }

  mobTextdummy: string;
  mobiledrpchange() {
    $(".buttonFinish").prop('disabled', false);

  }

  devmob: string;
  pushSimEntries() {

    var drpmob = $('#mobilenoentry').val();

    if (!this.mobile1Textentry && this.mobile1Textentry.length <= 0) {
      document.getElementById("basicsimno").style.display = "block";
      document.getElementById("basicmobnoinput").style.display = "block";
      $('#mobilenoentry').focus(); $(".buttonFinish").prop('disabled', false);
    }

  }

  checkdata: string = "false";

  toggleEditable(event) {
    if (event.target.checked) {

      var devicetype = $('#devicetypeentrydummy').val();
      var modelL = $('#modellistdummy').val();
      var imei = $('#IMEINoentry').val();
      var deviceserial = $('#deviceserialentry').val();

      if (!devicetype && devicetype.length <= 0) {

        $('#msg_error_contactentry').html('Please Select Device Type').show();
        $('#devicetypeentrydummy').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else if (!modelL && modelL.length <= 0) {

        $('#msg_error_contactentry').html('Please Select Device Model.').show();
        $('#modellistdummy').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else if (!imei && imei.length <= 0) {

        $('#msg_error_contactentry').html('Please Enter IMEI No.').show();
        $('#IMEINoentry').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else if (!deviceserial && deviceserial.length <= 0 || deviceserial.length < 8) {

        $('#msg_error_contactentry').html('Please Enter Device Serial No.').show();
        $('#modelentry').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else {
        this.checkdata = "true";
        $(".buttonFinish").prop('disabled', true);
        $("#nextentry").prop('disabled', false);
        $("#stepentry-15").hide();
        $("#stepentry-14").hide()
        $("#stepentry-16").show();
        $("#stepentry-17").hide();
        document.getElementById("aismob2ent").style.display = "none";
        document.getElementById("aisnet2ent").style.display = "none";
        document.getElementById("aisiccent").style.display = "none";
      }
    }
    else {
      this.checkdata = "false";
      document.getElementById("aismob2ent").style.display = "block";
      document.getElementById("basicsimno").style.display = "none";
      $(".buttonFinish").prop('disabled', false);
      $("#nextentry").prop('disabled', true);
      $("#stepentry-15").hide();
      $("#stepentry-14").show()
      $("#stepentry-16").hide();
      $("#stepentry-17").hide();
      this.selectnetwork1entry = ''; this.selectnetwork2entry = ''
      this.mobile1Textentry = ''; this.mobile2Textentry = ''

    }
  }

  modeofdeliveryText: any; modelivery: string; mobile1objdummy: string; mobno: string;

  handtohanddevicesavebtn() {

    var devicetype = $('#devicetypeentrydummy').val();
    var IMEIno = $('#IMEINoentry').val();
    var deviceserialno = $('#deviceserialentry').val();
    var receivedby = $('#receivedbynameentry').val();
    var couriernm = $('#couriernameentry').val();
    var cournmid = $('#couriernameentry').val();
    var trackerid = $('#trackeridentry').val();
    var courrecedtid = $('#courierreceivedateid').val();
    var courierfromid = $('#courierfromentry').val();
    var handfrom = $('#receivedfromentry').val();


    if (this.theCheckbox == false) {

      var isValid = true;

      this.modofdeliverylistdatadummy = this.modeofdeliveryText.param2;

      if (!this.vendorlistdata && this.vendorlistdata.length <= 0) {
        isValid = false;
        $('#msg_error_contactentry').html('Please Select Vendor').show();
        $('#vendorentrydemo').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else if (!receivedby && receivedby.length <= 0) {
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Received By Name').show();
        $('#receivedbynameentry').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else if (!devicetype && devicetype.length <= 0) {
        isValid = false;
        $('#msg_error_contactentry').html('Please Select Device Type').show();
        $('#devicetypeentry').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else if (!this.modellist && this.modellist.length <= 0) {
        isValid = false;
        $('#msg_error_contactentry').html('Please Select Device Model').show();
        $('#modelentry').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else if (!IMEIno && IMEIno.length <= 0 || IMEIno.length < 15) {
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter IMEI No. ').show();
        $('#IMEINoentry').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else {


        this.modelivery = this.modeofdeliveryText.param1;
        this.devicetypelist = this.devicetypeText.param1;
        this.modellist = this.modelText.param1;

        let dataL =
        {
          remarks: "ok",
          devicemakeid: this.vendorlistdata,
          devicemodelid: this.modellist,
          deviceimeino: this.imeinoText,
          deviceuniqueno: this.deviceserialText,
          deviceiccidno: this.SIMNoTextentry,
          mobilenumber1: "",
          mobilenumber2: "",
          networkid1: "",
          networkid2: "",
          simid: "",
          uploadedby: "Application",
          devicetype: this.devicetypelist,
          filename: "",
          filepath: "",
          noofdevice: "",
          couriername: "",
          invoiceno: "",
          receiveddate_invoicedate_deliverydate: courrecedtid,
          courierfrom: handfrom,
          producttype: "",
          issiminsert: this.theCheckbox,
          modeofdelivery: this.modelivery,
          dispatchdatetime: "",
          trackerid: "",
          receivedBy: "Mail",
          personName: this.receivedbyText,
          personMobileNo: this.personmobileNo,
          companyEmployeeid: "0",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
        }


        try { AddLoader() } catch (e) { alert(e) }
        this.deviceDetails.InsertDeviceAPI(dataL).subscribe((data) => {
          this.datafromrespo = data.entity;

          if (data.statuscode == 200) {
            SuccessAlert(data.entity);
            this.DeviceDetail(); this.closemodal(); this.clearfunction();
          }
          else {
            errorAlert(data.entity);
          }


          try { RemoveLoader() } catch (e) { alert(e) }

        });

      }


    }

    else if (this.theCheckbox == true) {

      $("#nextentry").prop('disabled', true);
      var isValid = true;
      var mobile1 = $('#mobile1identry').val();
      var network1 = $('#Network1identry').val();


      if (!this.vendorlistdata && this.vendorlistdata.length <= 0) {
        isValid = false;
        $('#msg_error_contactentry').html('Please Select Vendor').show();
        $('#vendorentrydemo').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else if (!this.modofdeliverylistdatadummy && this.modofdeliverylistdatadummy == null) {
        $('#msg_errorentry').html('Please Select Mode Of Delivery.').show();
        $('#courierbyid').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      else if (!receivedby && receivedby == null) {
        $('#msg_errorentry').html('Please Enter Received By Name.').show();
        $('#receivedbynameentry').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      else if (this.selectnetwork1entry == null || this.selectnetwork1entry == '') {
        isValid = false;
        $('#msg_error_simdetailsentry').html('Please Enter Network 1. ').show();
        $('#Network1identry').focus();
        setTimeout(function () { document.getElementById("msg_error_simdetailsentry").style.display = "none"; }, 3000);

      }
      else if (!receivedby && receivedby.length <= 0) {
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Received By Name').show();
        $('#receivedbynameentry').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else if ((this.ICCIDNoTextentry == null || this.ICCIDNoTextentry == '') && (this.ICCIDNoTextentry.length <= 19 && this.ICCIDNoTextentry.length >= 21) && this.devicetypeName == 'AIS-140') {
        isValid = false;
        $('#msg_error_simdetailsentry').html('Please Enter ICCID No.').show();
        $('#Network2identry').focus();
        setTimeout(function () { document.getElementById("msg_error_simdetailsentry").style.display = "none"; }, 3000);
      }

      else {

        this.modelivery = this.modeofdeliveryText.param1;
        this.devicetypelist = this.devicetypeText.param1;
        this.modellist = this.modelText.param1;
        this.mobile1objdummy = this.mobile1obj.param1;
        this.mobno = this.mobile1obj.param2;
        let dataL: any;

        if (this.devicetypeName == 'AIS-140') {
          dataL = {

            remarks: "",
            devicemakeid: this.vendorlistdata,
            devicemodelid: this.modellist,
            deviceimeino: this.imeinoText,
            deviceuniqueno: this.deviceserialText,
            deviceiccidno: this.ICCIDNoTextentry,
            mobilenumber1: this.mobile1Textentry,
            mobilenumber2: this.mobile2Textentry,
            networkid1: this.selectnetwork1entry,
            networkid2: this.selectnetwork2entry,
            simid: "",
            uploadedby: "Application",
            devicetype: this.devicetypelist,
            filename: "",
            filepath: "",
            noofdevice: "",
            couriername: "",
            invoiceno: "",
            receiveddate_invoicedate_deliverydate: courrecedtid,
            courierfrom: "",
            producttype: "",
            issiminsert: this.theCheckbox,
            modeofdelivery: this.modelivery,
            dispatchdatetime: "",
            trackerid: "",
            receivedBy: "Mail",
            personName: this.receivedbyText,
            personMobileNo: this.personmobileNo,
            companyEmployeeid: "0",
            pageName: this.encryptedpageNameValue,
            pageURL: this.encryptedpageUrlValue
          }

        }
        else {

          if (this.mobile1obj == null) {

            dataL = {
              remarks: "",
              devicemakeid: this.vendorlistdata,
              devicemodelid: this.modellist,
              deviceimeino: this.imeinoText,
              deviceuniqueno: this.deviceserialText,
              deviceiccidno: this.ICCIDNoTextentry,
              mobilenumber1: "",
              mobilenumber2: "",
              networkid1: this.selectnetwork1entry,
              networkid2: "",
              simid: this.mobile1objdummy,
              uploadedby: "Application",
              devicetype: this.devicetypelist,
              filename: "",
              filepath: "",
              noofdevice: "",
              couriername: "",
              invoiceno: "",
              receiveddate_invoicedate_deliverydate: courrecedtid,
              courierfrom: "",
              producttype: "",
              issiminsert: this.theCheckbox,
              modeofdelivery: this.modelivery,
              dispatchdatetime: "",
              trackerid: "",
              receivedBy: "Mail",
              personName: this.receivedbyText,
              personMobileNo: this.personmobileNo,
              companyEmployeeid: "0",
              pageName: this.encryptedpageNameValue,
              pageURL: this.encryptedpageUrlValue
            }
          }
          else {
            dataL = {
              remarks: "",
              devicemakeid: this.vendorlistdata,
              devicemodelid: this.modellist,
              deviceimeino: this.imeinoText,
              deviceuniqueno: this.deviceserialText,
              deviceiccidno: this.ICCIDNoTextentry,
              mobilenumber1: "",
              mobilenumber2: "",
              networkid1: this.selectnetwork1entry,
              networkid2: this.selectnetwork2entry,
              simid: this.mobile1objdummy,
              uploadedby: "Application",
              devicetype: this.devicetypelist,
              filename: "",
              filepath: "",
              noofdevice: "",
              couriername: "",
              invoiceno: "",
              receiveddate_invoicedate_deliverydate: courrecedtid,
              courierfrom: "",
              producttype: "",
              issiminsert: this.theCheckbox,
              modeofdelivery: this.modelivery,
              dispatchdatetime: "",
              trackerid: "",
              receivedBy: "Mail",
              personName: this.receivedbyText,
              personMobileNo: this.personmobileNo,
              companyEmployeeid: "0",
              pageName: this.encryptedpageNameValue,
              pageURL: this.encryptedpageUrlValue
            }
          }
        }

        try { AddLoader() } catch (e) { alert(e) }
        this.deviceDetails.InsertDeviceAPI(dataL).subscribe((data) => {
          try { RemoveLoader() } catch (e) { alert(e) }

          this.datafromrespo = data.entity;

          if (data.statuscode == 200) {
            SuccessAlert(data.entity);
            this.DeviceDetail(); this.closemodal(); this.clearfunction();
          }
          else {
            errorAlert(data.entity);
          }
        });

      }
    }
  }

  courierdevicesavebtn() {

    var devicetype = $('#devicetypeentrydummy').val();
    var IMEIno = $('#IMEINoentry').val();
    var deviceserialno = $('#deviceserialentry').val();
    var receivedby = $('#receivedbynameentry').val();
    var couriernm = $('#couriernameentry').val();
    var cournmid = $('#couriernameentry').val();
    var trackerid = $('#trackeridentry').val();
    var courrecedtid = $('#courierreceivedateid').val();
    var courierfromid = $('#courierfromentry').val();
    var handfrom = $('#receivedfromentry').val();


    if (this.theCheckbox == false) {

      var isValid = true;

      this.modofdeliverylistdatadummy = this.modeofdeliveryText.param2;

      if (!this.vendorlistdata && this.vendorlistdata.length <= 0) {
        isValid = false;
        $('#msg_error_contactentry').html('Please Select Vendor').show();
        $('#vendorentrydemo').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else if (!this.modofdeliverylistdatadummy && this.modofdeliverylistdatadummy == null) {
        $('#msg_errorentry').html('Please Select Mode Of Delivery.').show();
        $('#courierbyid').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      else if (!receivedby && receivedby == null) {
        $('#msg_errorentry').html('Please Enter Received By Name.').show();
        $('#receivedbynameentry').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      else if (!devicetype && devicetype.length <= 0) {
        isValid = false;
        $('#msg_error_contactentry').html('Please Select Device Type').show();
        $('#devicetypeentry').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else if (!this.modellist && this.modellist.length <= 0) {
        isValid = false;
        $('#msg_error_contactentry').html('Please Select Device Model').show();
        $('#modelentry').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else if (!IMEIno && IMEIno.length <= 0 || IMEIno.length < 15) {
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter IMEI No. ').show();
        $('#IMEINoentry').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else {
        this.modelivery = this.modeofdeliveryText.param1;
        this.devicetypelist = this.devicetypeText.param1;
        this.modellist = this.modelText.param1;
        this.mobile1objdummy = this.mobile1obj.param1;
        this.mobno = this.mobile1obj.param2;

        let dataL =
        {
          remarks: "ok",
          devicemakeid: this.vendorlistdata,
          devicemodelid: this.modellist,
          deviceimeino: this.imeinoText,
          deviceuniqueno: this.deviceserialText,
          deviceiccidno: this.SIMNoTextentry,
          mobilenumber1: "",
          mobilenumber2: "",
          networkid1: "",
          networkid2: "",
          simid: "",
          uploadedby: "Application",
          devicetype: this.devicetypelist,
          filename: "",
          filepath: "",
          noofdevice: "",
          couriername: cournmid,
          invoiceno: "",
          receiveddate_invoicedate_deliverydate: courrecedtid,
          courierfrom: courierfromid,
          producttype: "",
          issiminsert: this.theCheckbox,
          modeofdelivery: this.modelivery,
          dispatchdatetime: "",
          trackerid: trackerid,
          receivedBy: "Mail",
          personName: this.receivedbyText,
          personMobileNo: this.personmobileNo,
          companyEmployeeid: "0",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
        }


        try { AddLoader() } catch (e) { alert(e) }
        this.deviceDetails.InsertDeviceAPI(dataL).subscribe((data) => {
          this.datafromrespo = data.entity;

          if (data.statuscode == 200) {
            SuccessAlert(data.entity);
            this.DeviceDetail(); this.closemodal(); this.clearfunction();
          }
          else {
            errorAlert(data.entity);
          }
          try { RemoveLoader() } catch (e) { alert(e) }

        });

      }

    }

    else if (this.theCheckbox == true) {

      $("#nextentry").prop('disabled', true);
      var isValid = true;
      var mobile1 = $('#mobile1identry').val();
      var network1 = $('#Network1identry').val();



      if (this.selectnetwork1entry == null || this.selectnetwork1entry == '') {
        isValid = false;
        $('#msg_error_simdetailsentry').html('Please Enter Network 1. ').show();
        $('#Network1identry').focus();
        setTimeout(function () { document.getElementById("msg_error_simdetailsentry").style.display = "none"; }, 3000);

      }
      else if ((this.ICCIDNoTextentry == null || this.ICCIDNoTextentry == '') && (this.ICCIDNoTextentry.length <= 19 && this.ICCIDNoTextentry.length >= 21) && this.devicetypeName == 'AIS-140') {
        isValid = false;
        $('#msg_error_simdetailsentry').html('Please Enter ICCID No.').show();
        $('#Network2identry').focus();
        setTimeout(function () { document.getElementById("msg_error_simdetailsentry").style.display = "none"; }, 3000);
      }
      else if (!this.modofdeliverylistdatadummy && this.modofdeliverylistdatadummy == null) {
        $('#msg_errorentry').html('Please Select Mode Of Delivery.').show();
        $('#courierbyid').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      else if (!receivedby && receivedby == null) {
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

      else {

        this.modelivery = this.modeofdeliveryText.param1;
        this.devicetypelist = this.devicetypeText.param1;
        this.modellist = this.modelText.param1;

        let dataL: any;

        if (this.devicetypeName == 'AIS-140') {

          dataL = {

            remarks: "",
            devicemakeid: this.vendorlistdata,
            devicemodelid: this.modellist,
            deviceimeino: this.imeinoText,
            deviceuniqueno: this.deviceserialText,
            deviceiccidno: this.ICCIDNoTextentry,
            mobilenumber1: this.mobile1Textentry,
            mobilenumber2: this.mobile2Textentry,
            networkid1: this.selectnetwork1entry,
            networkid2: this.selectnetwork2entry,
            simid: "",
            uploadedby: "Application",
            devicetype: this.devicetypelist,
            filename: "",
            filepath: "",
            noofdevice: "",
            couriername: cournmid,
            invoiceno: "",
            receiveddate_invoicedate_deliverydate: courrecedtid,
            courierfrom: courierfromid,
            producttype: "",
            issiminsert: this.theCheckbox,
            modeofdelivery: this.modelivery,
            dispatchdatetime: "",
            trackerid: trackerid,
            receivedBy: "Mail",
            personName: this.receivedbyText,
            personMobileNo: this.personmobileNo,
            companyEmployeeid: "0",
            pageName: this.encryptedpageNameValue,
            pageURL: this.encryptedpageUrlValue
          }

        }
        else {

          if (this.mobile1obj == null) {
            dataL = {
              remarks: "",
              devicemakeid: this.vendorlistdata,
              devicemodelid: this.modellist,
              deviceimeino: this.imeinoText,
              deviceuniqueno: this.deviceserialText,
              deviceiccidno: this.ICCIDNoTextentry,
              mobilenumber1: "",
              mobilenumber2: "",
              networkid1: this.selectnetwork1entry,
              networkid2: "",
              simid: this.mobile1objdummy,
              uploadedby: "Application",
              devicetype: this.devicetypelist,
              filename: "",
              filepath: "",
              noofdevice: "",
              couriername: "",
              invoiceno: "",
              receiveddate_invoicedate_deliverydate: courrecedtid,
              courierfrom: courierfromid,
              producttype: "",
              issiminsert: this.theCheckbox,
              modeofdelivery: this.modelivery,
              dispatchdatetime: "",
              trackerid: trackerid,
              receivedBy: "Mail",
              personName: this.receivedbyText,
              personMobileNo: this.personmobileNo,
              companyEmployeeid: "0",
              pageName: this.encryptedpageNameValue,
              pageURL: this.encryptedpageUrlValue
            }
          }
          else {
            dataL = {
              remarks: "",
              devicemakeid: this.vendorlistdata,
              devicemodelid: this.modellist,
              deviceimeino: this.imeinoText,
              deviceuniqueno: this.deviceserialText,
              deviceiccidno: this.ICCIDNoTextentry,
              mobilenumber1: "",
              mobilenumber2: "",
              networkid1: this.selectnetwork1entry,
              networkid2: "",
              simid: this.mobile1objdummy,
              uploadedby: "Application",
              devicetype: this.devicetypelist,
              filename: "",
              filepath: "",
              noofdevice: "",
              couriername: "",
              invoiceno: "",
              receiveddate_invoicedate_deliverydate: courrecedtid,
              courierfrom: courierfromid,
              producttype: "",
              issiminsert: this.theCheckbox,
              modeofdelivery: this.modelivery,
              dispatchdatetime: "",
              trackerid: trackerid,
              receivedBy: "Mail",
              personName: this.receivedbyText,
              personMobileNo: this.personmobileNo,
              companyEmployeeid: "0",
              pageName: this.encryptedpageNameValue,
              pageURL: this.encryptedpageUrlValue
            }
          }
        }
        try { AddLoader() } catch (e) { alert(e) }
        this.deviceDetails.InsertDeviceAPI(dataL).subscribe((data) => {
          try { RemoveLoader() } catch (e) { alert(e) }

          this.datafromrespo = data.entity;

          if (data.statuscode == 200) {
            SuccessAlert(data.entity);
            this.DeviceDetail(); this.closemodal(); this.clearfunction();
          }
          else {
            errorAlert(data.entity);
          }
        });
      }

    }
  }

  DeviceDetail() {
    let keydata = {
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.deviceDetails.DeviceDetailsAPI(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.DeviceDetails$ = data.entity.responsedatalist;
      this.totalcount = data.entity.count;
      this.viewcount = data.entity.viewCount;
    });
  }

  /*-------------List of City Api ---------------*/

  clearfunction() {
    this.modeofdeliveryText = ""; this.ReceiptUpload = ""; this.vendorText = ""; this.modelText = ""; this.vendorlistdata = "";
    this.modellist = ""; this.devicetypeText = ""; this.deviceserialText = ""; this.devicetypelist = "";
    this.mobile1Textentry = ""; this.selectnetwork1entry = ""; this.mobile2Textentry = ""; this.selectnetwork2entry = "";
    this.ICCIDNoTextentry = ""; this.SIMNoTextentry = ""; this.imeinoText = null; this.mobile1obj = ""; this.network1Obj = "";
    document.getElementById("basicsimno").style.display = "none";
    document.getElementById("basicmobnoinput").style.display = "none";
    document.getElementById("recbydiv").style.display = "block";
    document.getElementById("courierinfodiv").style.display = "none"; $("#courierinfodiv").hide();
    document.getElementById("recdate").style.display = "block";
    document.getElementById("permobno").style.display = "none";
    document.getElementById("recfrm").style.display = "none";

    $("#stepentry-14").show(); $("#stepentry-15").hide(); $("#stepentry-16").hide(); $("#stepentry-17").hide();

  }

  closemodal() {
    $("#exampleModal").modal('hide');
    $('.modal-backdrop.show').css('display', 'none');
  }

  modeofdeliveryy() {
    this.modofdeliverylistdatadummy = this.modeofdeliveryText.param2;
    $("#nextentry").prop('disabled', false);
    var courierby = $('#courierbyid').val();

    if (this.modofdeliverylistdatadummy == "Courier") {
      // $('#courierinfodiv').show(); $('#recbydiv').hide();
      document.getElementById("recbydiv").style.display = "block";
      document.getElementById("recdate").style.display = "block";
      document.getElementById("courierinfodiv").style.display = "block";
      document.getElementById("permobno").style.display = "none";
      document.getElementById("recfrm").style.display = "none";
      document.getElementById("couriersaveentry").style.display = "block";
      document.getElementById("receivedsaveentry").style.display = "none";
    }
    else if (this.modofdeliverylistdatadummy == "Hand To Hand") {
      $("#nextentry").prop('disabled', false);
      document.getElementById("courierinfodiv").style.display = "none";
      document.getElementById("recbydiv").style.display = "block";
      document.getElementById("recdate").style.display = "block";
      document.getElementById("permobno").style.display = "block";
      document.getElementById("recfrm").style.display = "block";
      document.getElementById("couriersaveentry").style.display = "none";
      document.getElementById("receivedsaveentry").style.display = "block";
    }
  }

  vendorbind() {
    this.vendorlistdata = this.vendorText.param1;
  }

  step2validation() {
    this.modellist = this.modelText.param1;
  }

}
