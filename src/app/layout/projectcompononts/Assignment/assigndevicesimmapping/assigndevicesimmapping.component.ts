import { style } from '@angular/animations';
import { DevicemasterService } from './../../../../APIService/devicemaster.service';
import { DevicemodelService } from './../../../../APIService/devicemodel.service';
import { Router } from '@angular/router';
import { VendormodelService } from './../../../../APIService/vendormodel.service';
import { ListService } from './../../../../../list.service';
import { PostService } from './../../../../../post.service';
import { Paramcls } from './../../../../../paramcls';
import { Simasstodevice } from './../../Assignment/simasstodevice';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as moment from 'moment';
import * as $ from 'jquery';
import { CryptService } from '../../services/crypt.service';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-assigndevicesimmapping',
  templateUrl: './assigndevicesimmapping.component.html',
  styleUrls: ['./assigndevicesimmapping.component.css']
})
export class AssigndevicesimmappingComponent implements OnInit {

  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;
  private _success = new Subject<string>(); successMessageUpdate: string;

  count: number; datafromrespo: string;
  resdatalist = []; ListOfDevice = []; ListOfSim = []; ListOfvendor = []; ListOfmodel = []; ListOfdevicetype = [];
  public loading = false; p: number; modelText: any; devicetypeText: any; modellist: string; devicetypelist: string;
  devicelist: string; simnolist: string; deviceText: any; simnodrpText: any; ListOfNetwork = [];

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService,
    private deviceDetails: DevicemasterService, private listService: ListService, private cryptService: CryptService,
    private router: Router) {
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
        $(".buttonFinish").prop('disabled', false);
        $("#step-14").show();
        $("#step-15").hide();
        $("#step-16").hide();
        $("#step-17").hide();
        $("#step-14").show();
        $("#stepentry-15").hide();
        $("#stepentry-16").hide();
        $("#stepentry-17").hide();


        $(".buttonFinish").prop('disabled', false);
        $("#stepentryentry-14").show();
        $("#stepentryentry-15").hide();
        $("#stepentryentry-16").hide();
        $("#stepentryentry-17").hide();
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
            //setClassesentry(step, steps - 1);
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
          }

          return isStepValid;
        }
        function validateentryStep1(index, steps) {

          $('#msg_errorentry').html('').hide();

          var isValid = true;

          var venlist = $('#vendordummy').val();
          var model = $('#modellistdummy').val();
          var devicetype = $('#devicetypeentrydummy').val();
          var device = $('#deviceid_entry').val();
          var sim = $('#simnoentrydummy').val();

          if (!venlist && venlist <= 0) {
            // validate short code
            isValid = false;
            $('#msg_errorentry').html('Please Select Vendor.').show();
            $('#vendorentrydemo').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          else if (!model && model <= 0) {
            // validate short code
            isValid = false;
            $('#msg_errorentry').html('Please Select Device Model.').show();
            $('#modelentry').focus();
          }
          else if (!devicetype && devicetype <= 0) {
            // validate short code
            isValid = false;
            $('#msg_errorentry').html('Please Select Device Type.').show();
            $('#devicetypeentry').focus();
          }
          else if (!device && device <= 0) {
            // validate short code
            isValid = false;
            $('#msg_errorentry').html('Please Select Device.').show();
            $('#deviceentryid').focus();
          }
          else if (!sim && sim <= 0) {
            // validate short code
            isValid = false;
            $('#msg_errorentry').html('Please Select Sim.').show();
            $('#simnodrpentry').focus();
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

            isValid = false;
          }
          return isValid;
        }

      });

    })(jQuery);

    this.VendorList(); this.NetworkList();
    //  this.DevicetypelList();

    this.clearfunction();
    this._success.subscribe((message) => this.successMessageUpdate = message);

    this._success.pipe(
      debounceTime(8000)
    ).subscribe(() => this.successMessageUpdate = null);
  }
  EncryptPageName() {
    this.cryptService.encrypt("Assign Device Sim")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }

  /*-------------List of State Api ---------------*/


  VendorList() {

    let keydata = {
      param1: 'device',
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.VendorListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfvendor = data.entity;

        this.loading = false;

      });
  }
  DeviceTypeList() {
    this.devicetypelist = this.devicetypeText.param1;
 
    this.modelText = "";
    this.modellist = "";
    this.deviceText = "";
    this.devicelist = "";
    this.networkText = "";
    this.networkTextid = "";
    this.simnodrpText = "";
    this.simnolist = "";
  
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
        // this.ListOfState = statelist;

        this.loading = false;

      });
  }

  DevicetypelList() {

    let keydata = {
      param1: "sim assign to device",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.DeviceTypeListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.ListOfdevicetype = data.entity.list;

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

        this.ListOfNetwork = data.entity.list;

        this.loading = false;

      });
  }

  DeviceTypeChange() {

    this.DeviceSimList();
  }

  DeviceSimList() {

    this.vendorlistdata = this.vendorText.param1;
    this.devicetypelist = this.devicetypeText.param1;
    this.modellist = this.modelText.param1;
    //this.networkTextid = this.networkText.param1;
    let keydata = {
      param1: this.vendorlistdata,
      param2: this.devicetypelist,
      param3: this.modellist,
      param4: this.networkTextid,
      param5: "sim assign to device",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    try { AddLoader() } catch (e) { alert(e) }
    this.deviceDetails.DeviceDropListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfDevice = data.entity;
        this.loading = false;

      });
      try { AddLoader() } catch (e) { alert(e) }
    this.deviceDetails.SimDropListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfSim = data.entity;
        this.loading = false;

      });
  }

  devicesavebtn() {

    $('#invalidmsg').html('').hide();

    var isValid = true;

    var venlist = $('#vendordummy').val();
    var model = $('#modellistdummy').val();
    var devicetype = $('#devicetypeentrydummy').val();
    var device = $('#deviceid_entry').val();
   
    var sim = $('#simnoentrydummy').val();
    var network = $('#networkdummid').val();
  

    if (!venlist && venlist <= 0) {
      
      isValid = false;
      $('#errormsg').html('Please Select Vendor.').show();
      $('#vendorentrydemo').focus();
      setTimeout(function () { document.getElementById("errormsg").style.display = "none"; }, 3000);
    }
    else if (!devicetype && devicetype <= 0) {
    
      isValid = false;
      $('#errormsg').html('Please Select Device Type.').show();
      $('#devicetypeentry').focus();
      setTimeout(function () { document.getElementById("errormsg").style.display = "none"; }, 3000);

    }
    else if (!model && model <= 0) {
     
      isValid = false;
      $('#errormsg').html('Please Select Device Model.').show();
      $('#modelentry').focus();
      setTimeout(function () { document.getElementById("errormsg").style.display = "none"; }, 3000);

    }

    else if (!device && device <= 0) {
     
      isValid = false;
      $('#errormsg').html('Please Select Device.').show();
      $('#deviceentryid').focus();
      setTimeout(function () { document.getElementById("errormsg").style.display = "none"; }, 3000);

    }
    else if (!network && network <= 0) {
     
      isValid = false;
      $('#errormsg').html('Please Select Network.').show();
      $('#networkentryid').focus();
      setTimeout(function () { document.getElementById("errormsg").style.display = "none"; }, 3000);

    }
    else if (!sim && sim <= 0) {
     
      isValid = false;
      $('#errormsg').html('Please Select Sim.').show();
      $('#simnodrpentry').focus();
      setTimeout(function () { document.getElementById("errormsg").style.display = "none"; }, 3000);

    }
    else {
  
      // this.vendorlistdata = this.vendorText.param1;
      // this.devicetypelist = this.devicetypeText.param1;
      // this.modellist = this.modelText.param1;
      // this.devicelist = this.deviceText.param1;
      // this.simnolist = this.simnodrpText.param1;

      let dataL = {
        remarks: "Ok",
        deviceId: this.devicelist,
        simId: this.simnolist
        // pageID: "7",
        // pageName: this.encryptedpageNameValue,
        // pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }
      this.deviceDetails.SimAssignToDeviceAPI(dataL).subscribe((data) => {
        this.clearfunction();
        try { RemoveLoader() } catch (e) { alert(e) }

        this.datafromrespo = data.entity;

        if (data.statuscode == '200') {
          $("#successmodelEntry").modal('show');
          this.closemodal();
          this.clearfunction();
        }
        else {
          $("#ErrorModalEntry").modal('show');
        }

      });

    }
  }

  closemodal() {
    $("#exampleModal").modal('hide');
    $('.modal-backdrop.show').css('display', 'none');
  }

  /*-------------List of City Api ---------------*/

  clearfunction() {
    this.vendorText = ""; this.modelText = ""; this.devicetypeText = ""; this.deviceText = ""; this.simnodrpText = "";

  }

  vendorText: any; vendorlistdata: string; modellistdummy: string;
  vendorbind() {
    this.vendorlistdata = this.vendorText.param1;
    this.devicetypeText = "";
    this.devicetypelist = "";
    this.modelText = "";
    this.modellist = "";
    this.deviceText = "";
    this.devicelist = "";
    this.networkText = "";
    this.networkTextid = "";
    this.simnodrpText = "";
    this.simnolist = "";
 
  }


  devicebind() {
    this.devicelist = this.deviceText.param1;
  
    this.networkText = "";
    this.networkTextid = "";
    this.simnodrpText = "";
    this.simnolist = "";

  }

  simbind() {
    this.simnolist = this.simnodrpText.param1;
    
  }

  step2validation() {
    this.modellist = this.modelText.param1;
    this.deviceText = "";
    this.devicelist = "";
    this.networkText = "";
    this.networkTextid = "";
    this.simnodrpText = "";
    this.simnolist = "";

  }

  networkText: any; networkTextid: any = "";
  networkbind() {
    this.networkTextid = this.networkText.param1;
 
    this.simnodrpText = "";
    this.simnolist = "";

  }

}
