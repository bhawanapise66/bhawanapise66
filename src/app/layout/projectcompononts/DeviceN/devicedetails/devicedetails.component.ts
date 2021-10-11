import { ExportToExcelService } from './../../services/export-to-excel.service';
import { DevicemasterService } from './../../../../APIService/devicemaster.service';
import { DevicemodelService } from './../../../../APIService/devicemodel.service';

import { Router } from '@angular/router';

import { ListService } from './../../../../../list.service';
import { Paramcls } from './../../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as moment from 'moment';
import * as xlsx from 'xlsx';
import * as $ from 'jquery';
import { CryptService } from '../../services/crypt.service';
import { PdfService } from '../../services/pdf.service';
declare var jQuery: any;declare var $: any;declare var AddLoader: any;declare var RemoveLoader: any; 
declare var SuccessAlert:any; declare var errorAlert: any;

@Component({
  selector: 'app-devicedetails',
  templateUrl: './devicedetails.component.html',
  styleUrls: ['./devicedetails.component.css']
})
export class DevicedetailsComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef; encryptedpageNameValue: string; encryptedpageUrlValue: string;
  key: string = 'name'; reverse: boolean = true; DeviceDetails$: any; pageUrl = this.router.url; public loading = false;
  deleteText: string; datafromrespo: string; ListOfCity$: Object; ListOfState$: Object; networklist$: Object; resdatalist = [];
  ListOfModeofDelivery = []; ListOfvendor = []; ListOfmodel = []; ListOfdevicetype = []; private _success = new Subject<string>(); 
  successMessageUpdate: string; count: number=0; viewcount: number; Remarkupdate: string; vendor_Text: any; model_Text: any;
  upmodeofdelivery_Text: any; devicetype_Text: any; imeino_Text: string; deviceserial_Text: string; mobile1_Text: string; 
  selectnetwork1_Text: any; mobile2_Text: string; selectnetwork2_Text: string; ICCIDNo_Text: string;
  ReceiptUpload: string; SIMNoTextupdate: string; ModeOfDelivery: string; trackeridText:string; uptheCheckbox = false;

  upreceivedbyText:string; uppersonmobileNo:string; upmobile1objTextdummy:string; upmobile1obj:any; upmobile1Textentry: string;
  uptrackeridText:string; upcourierfromText:string; upcouriernameText:string; upCourierReceivedate:string;  uprecfromText:string;

  vendorlistdataupdate: string; modellistupdate: string; devicetypelistupdate: string; upsimlistArr1: any;

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

  excelData: any[]; excelpdfData$: any;  pageNumber: any = 1; itemsPerPage: any = 10; filter: any = '';
  totalcount: any;  devicetypeNameUpdate: any;

  constructor(private excelService: ExportToExcelService,
    private deviceDetails: DevicemasterService, private listService: ListService, private cryptService: CryptService,
    private router: Router, public pdfservice: PdfService) {
    this.EncryptPageName(); this.EncryptPageUrl();

  }

  ngOnInit() {
    //  Added Count 
    this.count = 0;  this.viewcount = 0;
    /* ------------------------------- Wizards start Ts------------------------------------------------- */

    (function ($) {
      $(document).ready(function () {
        $(".buttonFinish").prop('disabled', false);
        $("#step-14").show();
        $("#step-15").hide();
        $("#step-16").hide();
        $("#step-17").hide();
        function setClasses(index, steps) {
          if (index < 0 || index > steps) return;
          if (index == 0) {
            $(".buttonPrevious").prop('disabled', true);
          } else {
            $(".buttonPrevious").prop('disabled', false);
          }
          if (index == steps) {
            $(".buttonPreviousNext").text('done');
          } else {
            $(".buttonPreviousNext").text('next');
          }
          $(".step-wizard ul li").each(function () {
            $(this).removeClass();
          });
          $(".step-wizard ul li:lt(" + index + ")").each(function () {
            $(this).addClass("done");
          });
          $(".step-wizard ul li:eq(" + index + ")").addClass("active")
          var p = index * (100 / steps);
          $("#prog").width(p + '%');
        }
        $(".step-wizard ul button").click(function () {
          var step = $(this).find("div.step")[0].innerText;
          var steps = $(".step-wizard ul li").length;
          validateAllSteps(step - 1, steps);
        });
        $("#prev").click(function () {
          var step = $(".step-wizard ul li.active div.step")[0].innerText;
          var steps = $(".step-wizard ul li").length;
          setClasses(step - 2, steps - 1);
          displayreviousSection(step - 1);
        });
        $("#next").click(function () {
          if ($(this).text() == 'done') {
          } else {
            var step;
            try {
              step = $(".step-wizard ul li.active div.step")[0].innerText;
            } catch (error) {
              step = $(".step-wizard ul li div.step")[0].innerText;
            }

            var steps = $(".step-wizard ul li").length;
            validateAllSteps(step, steps - 1);
            
          }
        });

        // initial state setup
        setClasses(0, $(".step-wizard ul li").length);

        function displayreviousSection(index) {

          $(".buttonNext1").prop('disabled', false);
          switch (index) {
            case 0:
              $("#step-14").show();
              $("#step-15").hide();
              $("#step-16").hide();
              $("#step-17").hide();
              break;
            case 1:
              $("#step-14").show();
              $("#step-15").hide();
              $("#step-16").hide();
              $("#step-17").hide();
              break;
            case 2:
              $("#step-14").hide();
              $("#step-15").show();
              $("#step-16").hide();
              $("#step-17").hide();
              break;
            case 3:
              $("#step-14").hide();
              $("#step-15").hide();
              $("#step-16").show();
              $("#step-17").hide();
              break;
            default:
              $("#step-14").show();
              $("#step-15").hide();
              $("#step-16").hide();
              $("#step-17").hide();
          }
        }

        function validateAllSteps(index, steps) {
          var isStepValid = true;


          if (validateStep1(index, steps) == false) {
            isStepValid = false;
          } else if (validateStep2(index, steps) == false) {
            isStepValid = false;
          } else if (validateStep3(index, steps) == false) {
            isStepValid = false;
          } else if (validateStep4(index, steps) == false) {
            isStepValid = false;
          }
          return isStepValid;
        }

        function validateStep1(index, steps): boolean {
          $('#msg_error').html('').hide();

          var isValid = true;
          var modeofdelivery = $('#modeofdeliveryupdate').val();

          if (!modeofdelivery && modeofdelivery.length <= 0) {
            isValid = false;
            $('#msg_error').html('Please Enter Mode Of Delivery').show();
            $('#modeofdelivery').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
          }

          if (isValid && index == 1) {


            $('#msg_error').html('').hide();
            $("#step-14").hide()
            $("#step-15").show();
            $("#step-16").hide();
            $("#step-17").hide();

            const satra = $("checkboxdataupdate").val()
            if (satra == false) {
              $(".buttonFinish").prop('disabled', false);
              $("#next").prop('disabled', true);
            }
            else {
              $(".buttonFinish").prop('disabled', true);
              $("#next").prop('disabled', false);
            }
            
            setClasses(index, steps);
            $('#pername').focus();
            isValid = false;
          }
          return isValid;
        }


        function validateStep2(index, steps) {
          $('#pername').focus();
          $('#msg_error_contact').html('').hide();

          var isValid = true;
          var devicetype = $('#devicetypeupdatedummy').val();
          var IMEIno = $('#IMEINoupdate').val();
          var deviceserialno = $('#deviceserialupdate').val();
          var modellist = $('#modellistupd').val();


          var checkdata = $('#checkboxdata').val();
          
            if (!modellist && modellist.length <= 0) {
              // validate short code
              isValid = false;
              $('#msg_error').html('Please Enter Device Model').show();
              $('#model').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
            }
          if (!devicetype && devicetype.length <= 0) {
            isValid = false;
            $('#msg_error_contact').html('Please Enter Device Type').show();
            $('#devicetypeupdate').focus();
            setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
          }
          else if (!IMEIno && IMEIno.length <= 0 || IMEIno.length < 15) {
            isValid = false;
            $('#msg_error_contact').html('Please Enter IMEI No. ').show();
            $('#IMEINoupdate').focus();
            setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

          }
          else
            if (!deviceserialno && deviceserialno.length <= 0 || deviceserialno.length < 8) {
              isValid = false;
              $('#msg_error_contact').html('Please Enter Device Serial No.').show();
              $('#deviceserialupdate').focus();
              setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

            }

          if (isValid && index == 2) {

            $('#msg_error_contact').html('').hide();
            $("#step-15").hide();
            $("#step-14").hide()
            $("#step-16").show();
            $("#step-17").hide();
            $('#accountNo').focus();


            $(".buttonFinish").prop('disabled', false);
            $(".buttonNext").prop('disabled', true);


            setClasses(index, steps);
            isValid = false;
          }

          return isValid;
        }


        function validateStep3(index, steps) {

          $('#accountNo').focus();
          var isValid = true;
          
          if (isValid && index == 3) {

            $('#msg_contactNo').html('').hide();
            $("#step-14").hide();
            $("#step-15").hide();
            $("#step-16").hide();
            $("#step-17").show();

            setClasses(index, steps);
            $(".buttonNext1").prop('disabled', true);
            $(".buttonFinish").prop('disabled', false);
            isValid = false;
          }
          return isValid;
        }
        function validateStep4(index, steps) {
          
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

    this.DeviceDetail(); this.clearfunction();

    this._success.subscribe((message) => this.successMessageUpdate = message);

    this._success.pipe(
      debounceTime(8000)
    ).subscribe(() => this.successMessageUpdate = null);

    document.getElementById("uprecbydiv").style.display = "block";  $('#uprecbydiv').show();
    document.getElementById("upcourierinfodiv").style.display = "none"; $('#upcourierinfodiv').hide();
    document.getElementById("uprecdate").style.display = "block"; $('#uprecdate').show();
    document.getElementById("uppermobno").style.display = "none";  $('#uppermobno').hide();
    document.getElementById("uprecfrm").style.display = "none"; $('#uprecfrm').hide();  
    document.getElementById("upcouriersaveentry").style.display = "none"; $('#upcouriersaveentry').hide(); 
    document.getElementById("upreceivedsaveentry").style.display = "none"; $('#upreceivedsaveentry').hide(); 

    /* ------------------------------- Wizards end Ts------------------------------------------------- */
  }


  /*------------------------------------------ View Next ----------------------------------------------------*/
  EncryptPageName() {
    this.cryptService.encrypt("Device Details")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
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

  searchdata() {
    this.pageNumber = 1;
    this.DeviceDetail();
  }

  changeItemsPerPage() {
    this.pageNumber = 1;
    this.DeviceDetail()
  }

  Refreshfunction() {
    this.itemsPerPage = 10;
    this.pageNumber = 1;
    this.filter = '';
    this.DeviceDetail()
  }


  PageChange(event) {
    this.pageNumber = event;
    this.DeviceDetail();
  }


  editpageform() {
    $(".buttonNext").prop('disabled', false);


    document.getElementById("backdetailsbtn").style.display = "block";
    document.getElementById("editbtn").style.display = "none";
    document.getElementById("vendordtls").style.display = "none";
    document.getElementById("container").style.display = "block";
    document.getElementById("modelfooter").style.display = "block";
    document.getElementById("uvmd").style.display = "block";
    document.getElementById("vmd").style.display = "none";
    this.VendorList(); this.NetworkList(); this.ModeOfDeliveryList(); this.DevicetypeList();

    if (this.mobile1_Text == '') {
      this.uptheCheckbox = false;
    }
    else {
      this.uptheCheckbox = true;
    }
  }

  backdetailsbtn() {
    document.getElementById("uvmd").style.display = "none";
    document.getElementById("vmd").style.display = "block";
    document.getElementById("backdetailsbtn").style.display = "none";
    document.getElementById("editbtn").style.display = "block";
    document.getElementById("vendordtls").style.display = "block";
    document.getElementById("modelfooter").style.display = "none";
    document.getElementById("container").style.display = "none";
    
  }



  ModeOfDeliveryList() {


    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.DeliveryModeListAPI(keydata).subscribe((data) => {
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
  vendorlistdata: string;

  DeviceModelList() {

    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue,
      param1: this.vendorlistdataupdate,
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.DeviceModelListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfmodel = data.entity.list;
        this.loading = false;

      });
  }
  networklist: any; network1list = []; network2list = [];

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
        this.network1list = data.entity.list;
        this.network2list = data.entity.list;
        this.loading = false;

      });
  }

  DevicetypeList() {

    this.vendorreturn = this.vendor_Text.param1;
   
    let keydata = {
      param1: this.vendorreturn,
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

  
  uupdatemodeofvalidation() {
    this.modeofdeliverylistdataupdate = this.upmodeofdelivery_Text.param2;
    
    if(this.modeofdeliverylistdataupdate == "Courier")
    {
   // $('#courierinfodiv').show(); $('#recbydiv').hide();
    document.getElementById("uprecbydiv").style.display = "block"; $('#uprecbydiv').show();
    document.getElementById("uprecdate").style.display = "block"; $('#uprecdate').show();
    document.getElementById("upcourierinfodiv").style.display = "block"; $('#upcourierinfodiv').show();
    document.getElementById("uppermobno").style.display = "none"; $('#uppermobno').hide();
    document.getElementById("uprecfrm").style.display = "none"; $('#uprecfrm').hide();
    document.getElementById("upcouriersaveentry").style.display = "block"; $('#upcouriersaveentry').show();
    document.getElementById("upreceivedsaveentry").style.display = "none"; $('#upreceivedsaveentry').hide();
    }
    else if(this.modeofdeliverylistdataupdate == "Hand To Hand")
    {
      //$('#courierinfodiv').hide(); $('#recbydiv').show(); 
      document.getElementById("upcourierinfodiv").style.display = "none";
      document.getElementById("uprecbydiv").style.display = "block";
      document.getElementById("uprecdate").style.display = "block";
      document.getElementById("uppermobno").style.display = "block";
      document.getElementById("uprecfrm").style.display = "block";
      document.getElementById("upcouriersaveentry").style.display = "none";
      document.getElementById("upreceivedsaveentry").style.display = "block";
  }
  }

  step1validation() {
    this.vendorlistdataupdate = this.vendor_Text.param1;

  }

  step2validation() {
    this.modelreturn = this.check(this.model_Text);

    this.modellistupdate = this.model_Text.param2;
  }

  devicestep1validation() {
    this.devicetypereturn = this.devicetype_Text.param1
    this.devicetypeNameUpdate = this.devicetype_Text.param2
    this.devicetypelistupdate = this.devicetype_Text.param2;
    if (this.devicetypeNameUpdate == 'AIS-140') {
      this.uptheCheckbox == true;
      $(".buttonFinish").prop('disabled', true);
      $("#next").prop('disabled', false);


      document.getElementById("aismob2update").style.display = "block";
      document.getElementById("basicsimnoupdate").style.display = "none";
      document.getElementById("basmob1update").style.display = "block";
      document.getElementById("basnet1update").style.display = "block";
      document.getElementById("aisnet2update").style.display = "block";
      document.getElementById("aisiccupdate").style.display = "block";
      document.getElementById("basicsimnoupdate").style.display = "none";

    }
    else if (this.devicetypeNameUpdate == 'Basic' || this.devicetypeNameUpdate == 'Personal Tracker' || this.devicetypeNameUpdate == 'Personal Tracker App' || this.devicetypeNameUpdate == 'Smart Tracker') {
      this.uptheCheckbox = false;
      $(".buttonFinish").prop('disabled', false);
      $("#next").prop('disabled', true);
      document.getElementById("aismob2update").style.display = "none";

      document.getElementById("aisnet2update").style.display = "none";
      document.getElementById("aisiccupdate").style.display = "none";
      document.getElementById("basicsimnoupdate").style.display = "block";
    }

    this.DeviceModelList()
  }

  toggleEditable(event) {
    if (event.target.checked) {

      var devicetype = $('#devicetypeupdatedummy').val();
      var IMEIno = $('#IMEINoupdate').val();
      var deviceserialno = $('#deviceserialupdate').val();
      var checkdata = $('#checkboxdataupdate').val();
      // Validate Contact Name
      if (!devicetype && devicetype.length <= 0) {
       
        $('#msg_error_contact').html('Please Select Device Type').show();
        $('#devicetypeupdate').focus();
        setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
      }
      else if (!IMEIno && IMEIno.length <= 0 || IMEIno.length < 15) {
        // validate city
        
        $('#msg_error_contact').html('Please Enter IMEI No. ').show();
        $('#IMEINoupdate').focus();
        setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
      }
      else
        if (!deviceserialno && deviceserialno.length <= 0 || deviceserialno.length < 8) {
          // validate Alternate Number
          
          $('#msg_error_contact').html('Please Enter Device Serial No.').show();
          $('#deviceserialupdate').focus();
          setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

        }

        $(".buttonFinish").prop('disabled', true);
        $("#next").prop('disabled', false);
    }
    else {
      $(".buttonFinish").prop('disabled', false);
      $("#next").prop('disabled', true);
    }
  }

  pushSimEntries(){
    
    var drpmob = $('#mobilenoentry').val();
   
    if (!this.upmobile1Textentry && this.upmobile1Textentry.length <= 0) {
      document.getElementById("basicsimno").style.display = "block";
      document.getElementById("basmob1update").style.display = "block";
      $('#mobile1_Text').focus(); $(".buttonFinish").prop('disabled', false);
    }
    
  }

  device_id: string; installationdate: string; modeofdeliverylistdataupdate: any = ''; vendorreturn: any = '';
  modelreturn: any = ''; devicetypereturn: any = ''; networkreturn: any = ''; network2return: any = ''; SimID:any;
  devicemakeid:any; devicemodelid:any;

  setdata(dev) {    

    let devicedetails = dev;
    this.device_id = devicedetails.param1;
    this.devicemakeid = devicedetails.param2;
    this.devicemodelid = devicedetails.param3;
    
    this.vendor_Text = devicedetails.param11;
    this.model_Text = devicedetails.param14; 
    this.devicetype_Text = devicedetails.param52;
    this.imeino_Text = devicedetails.param4;
    this.deviceserial_Text = devicedetails.param5;
   
    if (this.devicetype_Text == 'AIS-140'){
        this.mobile2_Text = devicedetails.param8;         
    }
    else{
        this.mobile2_Text = "";         
    }   
    
    this.selectnetwork1_Text = devicedetails.param9;
    this.selectnetwork2_Text = devicedetails.param10;
    this.ICCIDNo_Text = devicedetails.param6;
    this.SIMNoTextupdate = devicedetails.param6;
    this.installationdate = devicedetails.param56;
    this.upmodeofdelivery_Text = devicedetails.param57;
    this.devicetypereturn = devicedetails.param53;
    this.modeofdeliverylistdataupdate = devicedetails.param57;
    this.SimID = devicedetails.param58;
    this.upmobile1obj =  devicedetails.param7;
    this.vendorreturn = this.check(this.vendor_Text);
    this.modelreturn = this.check(this.model_Text); 
    this.networkreturn = devicedetails.param63;
    this.network2return = devicedetails.param64;
    this.upreceivedbyText = devicedetails.param71;
    this.uppersonmobileNo = devicedetails.param73; 
    this.upcouriernameText = devicedetails.param68;
    this.upcourierfromText = devicedetails.param76;
    this.uptrackeridText = devicedetails.param74;
       
    this.networkidget = this.selectnetwork1_Text.param1;
   
    if(this.upmobile1obj == null)
    {
        (document.getElementById("checkboxdataupdate") as HTMLInputElement).checked = false; 
    }
    else
    {
        (document.getElementById("checkboxdataupdate") as HTMLInputElement).checked = true;
    }

    let keydata = {
      // param1: this.vendorlistdataup,                              //vendorlistdataup,              devicemakeid
       param1:this.SimID,
       param2: this.device_id,                             //devicetypelistup,           devicetypeid
       param3: devicedetails.param47,
       param4: devicedetails.param63,
       param6:"for unassign",
       pageID: "7",
       pageName: this.encryptedpageNameValue,
       pageURL: this.encryptedpageUrlValue
     }
 
     try { AddLoader() } catch (e) { alert(e) }
     this.deviceDetails.SimDropListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.upsimlistArr1 = data.entity;
        
      });
    try { RemoveLoader() } catch (e) { alert(e) }  

    this.checkdatafornetwork(); this.DeviceModelList(); this.NetworkList(); this.ModeOfDeliveryList(); this.DevicetypeList();

    if(this.modeofdeliverylistdataupdate == 'Courier')
    {
   // $('#courierinfodiv').show(); $('#recbydiv').hide();
    document.getElementById("uprecbydiv").style.display = "block";
    document.getElementById("uprecdate").style.display = "block";
    document.getElementById("upcourierinfodiv").style.display = "block";
    document.getElementById("uppermobno").style.display = "none";
    document.getElementById("uprecfrm").style.display = "none";
    document.getElementById("upcouriersaveentry").style.display = "block";
    document.getElementById("upreceivedsaveentry").style.display = "none";
    }
    else if(this.modeofdeliverylistdataupdate == 'Hand To Hand')
    {
      //$('#courierinfodiv').hide(); $('#recbydiv').show(); 
      document.getElementById("upcourierinfodiv").style.display = "none";
      document.getElementById("uprecbydiv").style.display = "block";
      document.getElementById("uprecdate").style.display = "block";
      document.getElementById("uppermobno").style.display = "block";
      document.getElementById("uprecfrm").style.display = "block";
      document.getElementById("upcouriersaveentry").style.display = "none";
      document.getElementById("upreceivedsaveentry").style.display = "block";
  }
   
    

  }

  checkdatafornetwork() {
    if (this.devicetype_Text == 'AIS-140') {

      document.getElementById("mobiletwo").style.display = "block";
      document.getElementById("networktwo").style.display = "block";
      document.getElementById("iccidno").style.display = "block";
      document.getElementById("simno").style.display = "none";

    }
    else {
      document.getElementById("mobiletwo").style.display = "none";
      document.getElementById("networktwo").style.display = "none";
      document.getElementById("iccidno").style.display = "none";
      document.getElementById("simno").style.display = "block";
    }
  }

  networkidget:string;
  selectnet1() {
    
    var modelid = this.getid(this.ListOfmodel, this.model_Text);
    this.networkreturn = this.check(this.selectnetwork1_Text);
    var vendoridvaldrp = this.getid(this.ListOfvendor, this.vendor_Text);
    var devicetypeidvaldrp = this.getid(this.ListOfdevicetype, this.devicetype_Text);
   
    this.networkidget = this.selectnetwork1_Text.param1;

    let keydata = {
      // param1: this.vendorlistdataup,                              //vendorlistdataup,              devicemakeid
       param1:this.SimID,
       param2: this.device_id,                             //devicetypelistup,           devicetypeid
       param3: modelid,
       param4: this.networkidget,
       param6:"for unassign",
       pageID: "7",
       pageName: this.encryptedpageNameValue,
       pageURL: this.encryptedpageUrlValue
     }
 
     try { AddLoader() } catch (e) { alert(e) }
     this.deviceDetails.SimDropListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.upsimlistArr1 = data.entity;
        
      });
    try { RemoveLoader() } catch (e) { alert(e) }  
 
  }

  selectnet2() {
    this.network2return = this.check(this.selectnetwork2_Text);
  }

  updatedevice() {
   
    if ((document.getElementById("checkboxdataupdate") as HTMLInputElement).checked == false) {
      var isValid = true;

      var modofdeliid = this.getid(this.ListOfModeofDelivery, this.upmodeofdelivery_Text);
      var vendoridval = this.getid(this.ListOfvendor, this.vendor_Text);
      var modelid = this.getid(this.ListOfmodel, this.model_Text);
      var devicetypeidval = this.getid(this.ListOfdevicetype, this.devicetype_Text);
      var networkid = this.getid(this.network1list, this.selectnetwork1_Text);

      var devicetype = $('#devicetypeupdatedummy').val();
      var IMEIno = $('#IMEINoupdate').val();
      var deviceserialno = $('#deviceserialupdate').val();
      var checkdata = $('#checkboxdataupdate').val();
      // Validate Contact Name
      if (!devicetype && devicetype.length <= 0) {
        
        isValid = false;
        $('#msg_error_contact').html('Please Select Device Type').show();
        $('#devicetypeupdate').focus();
        setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
      }
      else if (!IMEIno && IMEIno.length <= 0 || IMEIno.length < 15) {
        // validate city
        
        isValid = false;
        $('#msg_error_contact').html('Please Enter IMEI No. ').show();
        $('#IMEINoupdate').focus();
        setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
      }
      else if (!deviceserialno && deviceserialno.length <= 0 || deviceserialno.length < 8) {
          // validate Alternate Number
          isValid = false;
          $('#msg_error_contact').html('Please Enter Device Serial No.').show();
          $('#deviceserialupdate').focus();
          setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

        }
        else if (this.Remarkupdate == null || this.Remarkupdate == '' || this.Remarkupdate.length < 10) {
          $("#remarkupdate").focus();
        }
        else {
          
          let dataL;

          
            dataL = {
              remarks: this.Remarkupdate,
              deviceid: this.device_id,
              devicemakeid: vendoridval,
              devicemodelid: modelidval,
              deviceimeino: this.imeino_Text,
              deviceuniqueno: this.deviceserial_Text,
              deviceiccidno: "",
              mobilenumber1: "",
              mobilenumber2: "",
              networkid1: networkid,
              networkid2: "",
              simid: "",
              uploadedby: "Application",
              devicetype: devicetypeidval,
              filename: "",
              filepath: "",
              noofdevice: "",
              couriername: "",
              invoiceno: "",
              receiveddate_invoicedate_deliverydate: this.installationdate,
              courierfrom: "",
              producttype: "",
              issiminsert: (document.getElementById("checkboxdataupdate") as HTMLInputElement).checked,
              modeofdelivery:modofdeliid,
              dispatchdatetime:"",
              trackerid:"",
              receivedBy:"",
              personName:this.upreceivedbyText,
              personMobileNo:this.uppersonmobileNo,
              companyEmployeeid:"0",
              pageName:this.encryptedpageNameValue,
              pageURL:this.encryptedpageUrlValue
              
            }          
               
          try { AddLoader() } catch (e) { alert(e) }
          this.deviceDetails.UpdateDeviceAPI(dataL).subscribe((data) => {
            this.datafromrespo = data.entity;

            if (data.statuscode == 200) {
              SuccessAlert( data.entity);
              this.DeviceDetail(); this.closemodal(); this.clearfunction();
            }
            else {
              errorAlert(data.entity);
            }
            try { RemoveLoader() } catch (e) { alert(e) }

          });

        }
    }
    else if ((document.getElementById("checkboxdataupdate") as HTMLInputElement).checked == true) {

      var vendoridval = this.getid(this.ListOfvendor, this.vendor_Text);
      var modelidval = this.getid(this.ListOfmodel, this.model_Text);
      var devicetypeidval = this.getid(this.ListOfdevicetype, this.devicetype_Text);
      var networkid = this.getid(this.network1list, this.selectnetwork1_Text);
      var modofdeliid = this.getid(this.ListOfModeofDelivery, this.upmodeofdelivery_Text);
      var isValid = true;
      var mobile1 = $('#mobile1idupdate').val();
      var network1 = $('#Network1idupdate').val();
      var remark = $('#remarkupdate').val();
      
       if (network1 == null) {
        // validate city        
        isValid = false;
        $('#msg_error_simdetails').html('Please Enter Network 1. ').show();
        $('#Network1idupdate').focus();
        setTimeout(function () { document.getElementById("msg_error_simdetails").style.display = "none"; }, 3000);

      }
      if (!remark && remark.length <= 0 || remark.length < 3) {
        
        isValid = false;
        $('#msg_error_simdetails').html('Please Enter Remark.').show();
        $('#remarkupdate').focus();
        setTimeout(function () { document.getElementById("msg_error_simdetails").style.display = "none"; }, 3000);
      }
      else {

        let dataL;
       
        if (this.devicetype_Text == "AIS-140") {
            dataL = {
              remarks: this.Remarkupdate,
              deviceid: this.device_id,
              devicemakeid: vendoridval,
              devicemodelid: modelidval,
              deviceimeino: this.imeino_Text,
              deviceuniqueno: this.deviceserial_Text,
              deviceiccidno: this.ICCIDNo_Text,
              mobilenumber1: this.mobile1_Text,
              mobilenumber2: this.mobile2_Text,
              networkid1: this.networkreturn,
              networkid2: this.network2return,
              simid: "",
              uploadedby: "Application",
              devicetype: devicetypeidval,
              filename: "",
              filepath: "",
              noofdevice: "",
              couriername: "",
              invoiceno: "",
              receiveddate_invoicedate_deliverydate: this.installationdate,
              modeofdelivery:modofdeliid,
              dispatchdatetime:"",
              courierfrom: "",
              producttype: "",
              issiminsert: (document.getElementById("checkboxdataupdate") as HTMLInputElement).checked,
              trackerid:"",
              receivedBy:"",
              personName:this.upreceivedbyText,
              personMobileNo:this.uppersonmobileNo,
              companyEmployeeid:"0",
              pageName:this.encryptedpageNameValue,
              pageURL:this.encryptedpageUrlValue
            }
          }
          else {
           
          if(this.upmobile1obj == null)
          {
            dataL = {
              remarks: this.Remarkupdate,
              deviceid: this.device_id,
              devicemakeid: vendoridval,
              devicemodelid: modelidval,
              deviceimeino: this.imeino_Text,
              deviceuniqueno: this.deviceserial_Text,
              deviceiccidno: this.SIMNoTextupdate,
              mobilenumber1: this.mobile1_Text,
              mobilenumber2: "",
              networkid1: this.networkreturn,
              networkid2: "",
              simid: "",
              uploadedby: "Application",
              devicetype: devicetypeidval,
              filename: "",
              filepath: "",
              noofdevice: "",
              couriername: "",
              invoiceno: "",
              receiveddate_invoicedate_deliverydate: this.installationdate,
              courierfrom: "",
              producttype: "",
              issiminsert: (document.getElementById("checkboxdataupdate") as HTMLInputElement).checked,
              modeofdelivery:modofdeliid,
              dispatchdatetime:"",
              trackerid:"",
              receivedBy:"",
              personName:this.upreceivedbyText,
              personMobileNo:this.uppersonmobileNo,
              companyEmployeeid:"0",
              pageName:this.encryptedpageNameValue,
              pageURL:this.encryptedpageUrlValue
            }
          }
          else
          {
            dataL = {
              remarks: this.Remarkupdate,
              deviceid: this.device_id,
              devicemakeid: vendoridval,
              devicemodelid: modelidval,
              deviceimeino: this.imeino_Text,
              deviceuniqueno: this.deviceserial_Text,
              deviceiccidno: this.SIMNoTextupdate,
              mobilenumber1: this.upmobile1obj,
              mobilenumber2: "",
              networkid1: this.networkreturn,
              networkid2: "",
              simid: "",
              uploadedby: "Application",
              devicetype: devicetypeidval,
              filename: "",
              filepath: "",
              noofdevice: "",
              couriername: "",
              invoiceno: "",
              receiveddate_invoicedate_deliverydate: this.installationdate,
              courierfrom: "",
              producttype: "",
              issiminsert: (document.getElementById("checkboxdataupdate") as HTMLInputElement).checked,
              modeofdelivery:modofdeliid,
              dispatchdatetime:"",
              trackerid:"",
              receivedBy:"",
              personName:this.upreceivedbyText,
              personMobileNo:this.uppersonmobileNo,
              companyEmployeeid:"0",
              pageName:this.encryptedpageNameValue,
              pageURL:this.encryptedpageUrlValue
            }
          }

          }
        
        try { AddLoader() } catch (e) { alert(e) }
        this.deviceDetails.UpdateDeviceAPI(dataL).subscribe((data) => {
          try { RemoveLoader() } catch (e) { alert(e) }

          this.datafromrespo = data.entity;

          if (data.statuscode == 200) {
            SuccessAlert( data.entity);
            this.clearfunction(); this.DeviceDetail(); this.closemodal();
          }
          else {
            errorAlert(data.entity);
          }
        });

      }

    }
  }

  courierupdatedevice() {
    
    if ((document.getElementById("checkboxdataupdate") as HTMLInputElement).checked == false) {
      var isValid = true;

      var modofdeliid = this.getid(this.ListOfModeofDelivery, this.upmodeofdelivery_Text);
      var vendoridval = this.getid(this.ListOfvendor, this.vendor_Text);
      var modelid = this.getid(this.ListOfmodel, this.model_Text);
      var devicetypeidval = this.getid(this.ListOfdevicetype, this.devicetype_Text);
      var networkid = this.getid(this.network1list, this.selectnetwork1_Text);

      var devicetype = $('#devicetypeupdatedummy').val();
      var IMEIno = $('#IMEINoupdate').val();
      var deviceserialno = $('#deviceserialupdate').val();
      var checkdata = $('#checkboxdataupdate').val();
      // Validate Contact Name
      if (!devicetype && devicetype.length <= 0) {
        
        isValid = false;
        $('#msg_error_contact').html('Please Select Device Type').show();
        $('#devicetypeupdate').focus();
        setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
      }
      else if (!IMEIno && IMEIno.length <= 0 || IMEIno.length < 15) {
        // validate city
        
        isValid = false;
        $('#msg_error_contact').html('Please Enter IMEI No. ').show();
        $('#IMEINoupdate').focus();
        setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
      }
      else
        if (!deviceserialno && deviceserialno.length <= 0 || deviceserialno.length < 15) {
          // validate Alternate Number
          isValid = false;
          $('#msg_error_contact').html('Please Enter Device Serial No.').show();
          $('#deviceserialupdate').focus();
          setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

        }
        else if (this.Remarkupdate == null || this.Remarkupdate == '' || this.Remarkupdate.length < 10) {
          $("#remarkupdate").focus();
        }
        else {

          let dataL;

          if(this.upmobile1obj == null)
          {
          dataL = {
            remarks: this.Remarkupdate,
            deviceid: this.device_id,
            devicemakeid: vendoridval,
            devicemodelid: modelidval,
            deviceimeino: this.imeino_Text,
            deviceuniqueno: this.deviceserial_Text,
            deviceiccidno: "",
            mobilenumber1: this.mobile1_Text,
            mobilenumber2: "",
            networkid1: networkid,
            networkid2: "",
            simid: "",
            uploadedby: "Application",
            devicetype: devicetypeidval,
            filename: "",
            filepath: "",
            noofdevice: "",
            couriername: this.upcouriernameText,
            invoiceno: "",
            receiveddate_invoicedate_deliverydate: this.installationdate,
            courierfrom: this.upcourierfromText,
            producttype: "",
            issiminsert: (document.getElementById("checkboxdataupdate") as HTMLInputElement).checked,
            modeofdelivery: modofdeliid,
            dispatchdatetime:"",
            trackerid:this.trackeridText,
            receivedBy:"",
            personName:this.upreceivedbyText,
            personMobileNo:this.uppersonmobileNo,
            companyEmployeeid:"0",
            pageName:this.encryptedpageNameValue,
            pageURL:this.encryptedpageUrlValue
          }
        }
        else{
          dataL = {
            remarks: this.Remarkupdate,
            deviceid: this.device_id,
            devicemakeid: vendoridval,
            devicemodelid: modelidval,
            deviceimeino: this.imeino_Text,
            deviceuniqueno: this.deviceserial_Text,
            deviceiccidno: "",
            mobilenumber1: this.upmobile1obj,
            mobilenumber2: "",
            networkid1: networkid,
            networkid2: "",
            simid: "",
            uploadedby: "Application",
            devicetype: devicetypeidval,
            filename: "",
            filepath: "",
            noofdevice: "",
            couriername: this.upcouriernameText,
            invoiceno: "",
            receiveddate_invoicedate_deliverydate: this.installationdate,
            courierfrom: this.upcourierfromText,
            producttype: "",
            issiminsert: (document.getElementById("checkboxdataupdate") as HTMLInputElement).checked,
            modeofdelivery: modofdeliid,
            dispatchdatetime:"",
            trackerid:this.trackeridText,
            receivedBy:"",
            personName:this.upreceivedbyText,
            personMobileNo:this.uppersonmobileNo,
            companyEmployeeid:"0",
            pageName:this.encryptedpageNameValue,
            pageURL:this.encryptedpageUrlValue
          }
        }
          try { AddLoader() } catch (e) { alert(e) }
          this.deviceDetails.UpdateDeviceAPI(dataL).subscribe((data) => {
            this.datafromrespo = data.entity;

            if (data.statuscode == 200) {
              SuccessAlert( data.entity);
               this.clearfunction(); this.DeviceDetail(); this.closemodal();
            }
            else {
              errorAlert(data.entity);
            }
            try { RemoveLoader() } catch (e) { alert(e) }

          });

        }
    }
    else if ((document.getElementById("checkboxdataupdate") as HTMLInputElement).checked == true) {

      var vendoridval = this.getid(this.ListOfvendor, this.vendor_Text);
      var modelidval = this.getid(this.ListOfmodel, this.model_Text);
      var devicetypeidval = this.getid(this.ListOfdevicetype, this.devicetype_Text);
      var networkid = this.getid(this.network1list, this.selectnetwork1_Text);
      var modofdeliid = this.getid(this.ListOfModeofDelivery, this.upmodeofdelivery_Text);
      var isValid = true;
      var mobile1 = $('#mobile1idupdate').val();
      var network1 = $('#Network1idupdate').val();
      var remark = $('#remarkupdate').val();
      
      if ((mobile1.length != 10) && (mobile1.length != 13)) {
        
        isValid = false;
        $('#msg_error_simdetails').html('Please Enter Mobile No 1.').show();
        $('#mobile1idupdate').focus();
        setTimeout(function () { document.getElementById("msg_error_simdetails").style.display = "none"; }, 3000);
      }
      else if (network1 == null) {
        // validate city
        
        isValid = false;
        $('#msg_error_simdetails').html('Please Enter Network 1. ').show();
        $('#Network1idupdate').focus();
        setTimeout(function () { document.getElementById("msg_error_simdetails").style.display = "none"; }, 3000);

      }
      if (!remark && remark.length <= 0 || remark.length < 3) {
        
        isValid = false;
        $('#msg_error_simdetails').html('Please Enter Remark.').show();
        $('#remarkupdate').focus();
        setTimeout(function () { document.getElementById("msg_error_simdetails").style.display = "none"; }, 3000);
      }
      else {
        let dataL;
        if (this.devicetype_Text == "AIS-140") {
          dataL = {
            remarks: this.Remarkupdate,
            deviceid: this.device_id,
            devicemakeid: vendoridval,
            devicemodelid: modelidval,
            deviceimeino: this.imeino_Text,
            deviceuniqueno: this.deviceserial_Text,
            deviceiccidno: this.ICCIDNo_Text,
            mobilenumber1: this.mobile1_Text,
            mobilenumber2: this.mobile2_Text,
            networkid1: this.networkreturn,
            networkid2: this.network2return,
            simid: "",
            uploadedby: "Application",
            devicetype: devicetypeidval,
            filename: "",
            filepath: "",
            noofdevice: "",
            couriername: this.upcouriernameText,
            invoiceno: "",
            receiveddate_invoicedate_deliverydate: this.installationdate,
            courierfrom: this.upcourierfromText,
            producttype: "",
            issiminsert: (document.getElementById("checkboxdataupdate") as HTMLInputElement).checked,
            modeofdelivery:modofdeliid,
            dispatchdatetime:"",
            trackerid:this.trackeridText,
            receivedBy:"",
            personName:this.upreceivedbyText,
            personMobileNo:this.uppersonmobileNo,
            companyEmployeeid:"0",
            pageName:this.encryptedpageNameValue,
            pageURL:this.encryptedpageUrlValue
          }
        }
        else {

          if(this.upmobile1obj == null)
          {
          dataL = {            
            remarks: this.Remarkupdate,
            deviceid: this.device_id,
            devicemakeid: vendoridval,
            devicemodelid: modelidval,
            deviceimeino: this.imeino_Text,
            deviceuniqueno: this.deviceserial_Text,
            deviceiccidno: this.SIMNoTextupdate,
            mobilenumber1: this.mobile1_Text,
            mobilenumber2: "",
            networkid1: this.networkreturn,
            networkid2: "",
            simid: "",
            uploadedby: "Application",
            devicetype: devicetypeidval,
            filename: "",
            filepath: "",
            noofdevice: "",
            couriername: this.upcouriernameText,
            invoiceno: "",
            receiveddate_invoicedate_deliverydate: this.installationdate,
            courierfrom: this.upcourierfromText,
            producttype: "",
            issiminsert: (document.getElementById("checkboxdataupdate") as HTMLInputElement).checked,
            modeofdelivery:modofdeliid,
            dispatchdatetime:"",
            trackerid:this.trackeridText,
            receivedBy:"",
            personName:this.upreceivedbyText,
            personMobileNo:this.uppersonmobileNo,
            companyEmployeeid:"0",
            pageName:this.encryptedpageNameValue,
            pageURL:this.encryptedpageUrlValue
          }
        }
        else{

          dataL = {            
            remarks: this.Remarkupdate,
            deviceid: this.device_id,
            devicemakeid: vendoridval,
            devicemodelid: modelidval,
            deviceimeino: this.imeino_Text,
            deviceuniqueno: this.deviceserial_Text,
            deviceiccidno: this.SIMNoTextupdate,
            mobilenumber1: this.upmobile1obj,
            mobilenumber2: "",
            networkid1: this.networkreturn,
            networkid2: "",
            simid: "",
            uploadedby: "Application",
            devicetype: devicetypeidval,
            filename: "",
            filepath: "",
            noofdevice: "",
            couriername: this.upcouriernameText,
            invoiceno: "",
            receiveddate_invoicedate_deliverydate: this.installationdate,
            courierfrom: this.upcourierfromText,
            producttype: "",
            issiminsert: (document.getElementById("checkboxdataupdate") as HTMLInputElement).checked,
            modeofdelivery:modofdeliid,
            dispatchdatetime:"",
            trackerid:this.trackeridText,
            receivedBy:"",
            personName:this.upreceivedbyText,
            personMobileNo:this.uppersonmobileNo,
            companyEmployeeid:"0",
            pageName:this.encryptedpageNameValue,
            pageURL:this.encryptedpageUrlValue
          }
        }
        }

        try { AddLoader() } catch (e) { alert(e) }
        this.deviceDetails.UpdateDeviceAPI(dataL).subscribe((data) => {
          try { RemoveLoader() } catch (e) { alert(e) }

          this.datafromrespo = data.entity;

          if (data.statuscode == 200) {
            SuccessAlert( data.entity);
            this.DeviceDetail(); this.closemodal(); this.clearfunction();
          }
          else {
            errorAlert(data.entity);
          }
         
        });

      }

    }
  }
  
  checkdata: string;
  deleteDevice() {
    var isValid = true;
    var deleteremark = $('#vendelremark').val();
    // Validate Contact Name
    if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      
      this._success.next('Please Enter Remark.');
      $('#vendelremark').focus();
    }
    else {
      $("#modeldelete").modal('show');

      let dataL = {
        param1: deleteremark,
        param2: this.device_id,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }
      this.deviceDetails.DeleteDeviceAPI(dataL).subscribe((data) => {
        this.datafromrespo = data.entity;

        if (data.statuscode == 200) {
          $("#SuccessModal").modal('show');
          this.DeviceDetail();
        }
        else {
          $("#ErrorModal").modal('show');
        }
      });
    }
  }
  //DevicePDFDetail
  exportToExcel() {

    var search = $('#searchData').val();

    let keydata = {
      pageNo: "",
      itemsPerPage: "",
      searchBy: search,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.deviceDetails.DeviceDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.excelpdfData$ = data.entity.responsedatalist;
        this.PrepareExcelData(this.excelpdfData$);
        this.excelService.ExportExcel(this.excelData, "Device Details", 'devicedetails')

      });
  }

  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": i + 1,
        "Device Type": data[i]["param52"],
        "Vendor Name": data[i]["param11"],
        "Model": data[i]["param14"],
        "IMEI No.": data[i]["param4"],
        "Device Serial No": data[i]["param5"],
        "ICCID /SIM No": data[i]["param6"],
        "Mobile No 1": data[i]["param7"],
        "Mobile No 2": data[i]["param8"],
        "Network 1": data[i]["param9"],
        "Network 2": data[i]["param10"],
        "Entry Date": data[i]["param55"],
        "Status": data[i]["param29"]
      }
      this.excelData.push(obj);
    }
  }


  exportToPDF() {

    var search = $('#searchData').val();

    let keydata = {
      pageNo: "",
      itemsPerPage: "",
      searchBy: search,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.deviceDetails.DeviceDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.excelpdfData$ = data.entity.responsedatalist;
        this.PreparePDFData(this.excelpdfData$);
        this.excelService.ExportExcel(this.excelData, "Device Details", 'devicedetails')

      });
  }

  PreparePDFData(data) {
    let pdfTableData;
    let dataArray = []
    for (let i = 0; i < data.length; i++) {
      pdfTableData = {
        "#": i + 1,
        "Device Type": data[i]["param52"],
        "Vendor Name": data[i]["param11"],
        "Model": data[i]["param14"],
        "IMEI No.": data[i]["param4"],
        "Device Serial No": data[i]["param5"],
        "ICCID /SIM No": data[i]["param6"],
        "Mobile No 1": data[i]["param7"],
        "Mobile No 2": data[i]["param8"],
        "Network 1": data[i]["param9"],
        "Network 2": data[i]["param10"],
        "Entry Date": data[i]["param55"],
        "Status": data[i]["param29"]
      }
      dataArray.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(dataArray, "Device Details");

  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  bulkentryClick() {
    this.router.navigate(['./bulkentry']);
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
      }
      else {
        var index = data.findIndex(x => x.param2 === value);
        return data[index].param1;
      }
    } catch (e) {
      return '';
    }

  }

  closemodal() {
    $("#SuccessModel").modal('hide');

    $('#modeldelete').modal('hide');
    $('#myModalwizard').modal('hide');

    $('.modal-backdrop.show').css('display', 'none');
    this.clearfunction();
  }

  clearfunction() {

    this.upmodeofdelivery_Text = ""; this.installationdate = ""; this.vendor_Text = ""; this.vendorreturn = ""; this.model_Text = "";
    this.modelreturn = ""; this.modeofdeliverylistdataupdate = ""; this.devicetype_Text = ""; this.devicetypereturn = "";
    this.imeino_Text = ""; this.deviceserial_Text = ""; this.mobile1_Text = ""; this.selectnetwork1_Text = ""; this.networkreturn = "";
    this.mobile2_Text = ""; this.selectnetwork2_Text = ""; this.network2return = ""; this.ICCIDNo_Text = ""; this.SIMNoTextupdate = "";
    this.Remarkupdate = "";this.upmodeofdelivery_Text = ""; this.upreceivedbyText = ""; this.uppersonmobileNo = ""; this.uprecfromText = "";
    this.upcouriernameText = ""; this.upcourierfromText = ""; this.uptrackeridText = ""; 

    document.getElementById("basicsimno").style.display = "none";
    document.getElementById("basmob1update").style.display = "none";
    
  }

}
