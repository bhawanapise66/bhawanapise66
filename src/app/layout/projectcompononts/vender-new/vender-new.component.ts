import { Router } from '@angular/router';
import { VendormodelService } from './../../../APIService/vendormodel.service';
import { ListService } from './../../../../list.service';
import { PostService } from './../../../../post.service';
import { Paramcls } from './../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
// import * as $ from 'jquery';
import { CryptService } from '../services/crypt.service';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-vender-new',
  templateUrl: './vender-new.component.html',
  styleUrls: ['./vender-new.component.css']
})
export class VenderNewComponent implements OnInit {
  @Output()
  showDetails = new EventEmitter();

  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;

  vendorentryText: string; shortcodeentryText: string; cinnoentryText: string; gstentryText: string; officialnoentryText: string;
  officialemailentryText: string; supplierofText: string; altnumber: string;
  datafromrespo: string; count: number=0; validationmsg: string;

  personnameText: string; personnoText: string; personaltnoText: string; personemailText: string; cityText: any; regaddressText: string; pincodeText: string;


  AreaText: string; landmarkText: string;

  accountnoText: string; banknmText: string; branchnmText: string; ifscText: string; paymntText: string;

  ListOfCity$: Object; ListOfState$: Object; resdatalist = []; ListOfState = []; ListOfCity = [];

  public loading = false; p: number;



  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  config2 = {
    displayKey: "name", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  options = [{ name: "Cash", }, { name: "Credit", }, { name: "Partial", }]
  vendorTypeList: any[];
  vendorTypeId: any;
  vendortypeObj: any;
  supplyList: any;
  constructor(private vendormodelservice: VendormodelService, private listService: ListService, private cryptService: CryptService, private router: Router) { }

  ngOnInit() {

    (function ($) {
      $(document).ready(function () {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#selectvendortype').focus();
        })

        $("#saveentry").prop('disabled', true);
        $("#nextentry").prop('disabled', false);

        $("#stepentry-14").show();
        $("#stepentry-15").hide();
        $("#stepentry-16").hide();
        $("#stepentry-17").hide();


        $('#vendorNameentry').focus();
        $("#saveentry").prop('disabled', true);
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
          else if (validateentryStep2(index, steps) == false) {
            isStepValid = false;
          }
          else if (validateentryStep3(index, steps) == false) {
            isStepValid = false;
          }
          return isStepValid;
        }

        function validateentryStep1(index, steps) {
          $('#selectvendortype').focus();

          $('#msg_errorentry').html('').hide();

          var isValid = true;
          var vendortype = $('#vendortypeid1').val()
          var vendorname = $('#vendorNameentry').val();
          var shortcode = $('#shortCodeentry').val();
          var gstno = $('#GSTNoentry').val();
          var ofcNo = $('#officialNoentry').val();
          var cincNo = $('#CINNoentry').val();
          var altNo = $('#alternateNoentry').val();
          var ofcemail = $('#officialEmailentry').val();
          var atposition = ofcemail.indexOf("@");
          var dotposition = ofcemail.lastIndexOf(".");
          var devicetype = $('#devicetypedummy').val();
          // Validate Vendor Name

          // if (vendortype == null || vendortype == '') {
          //   isValid = false;
          //   $('#msg_errorentry').html('Please Select Vendor Type.').show();
          //   $('#selectvendortype').focus();
          //   setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          // }
          // else 
          if (!vendorname && vendorname.length <= 0 || vendorname.length < 3) {
            isValid = false;
            $('#msg_errorentry').html('Please Enter Vendor Name.').show();
            $('#vendorNameentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

          } else
            if (!shortcode && shortcode.length <= 0 || shortcode.length < 4) {
              // validate short code
              isValid = false;
              $('#msg_errorentry').html('Please Enter Short Code.').show();
              $('#shortCodeentry').focus();
              setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

            }
            else if ((cincNo.length < 21) && (cincNo != null && cincNo != '')) {
              // validate short code
              isValid = false;
              $('#msg_errorentry').html('Please Enter Valid CIN Number.').show();
              $('#cincNo').focus();
              setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

            }
            else if (!gstno && gstno.length <= 0 || gstno.length < 15) {
              isValid = false;
              $('#msg_errorentry').html('Please Enter GST No.').show();
              $('#GSTNoentry').focus();
              setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
            }
            else if ((ofcNo != null || ofcNo != "" || ofcNo != undefined) && ofcNo.length >= 1 && ofcNo.length <= 9) {
              isValid = false;
              $('#msg_errorentry').html('Please Enter Valid Official No.').show();
              $('#officialNoentry').focus();
              setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
            }

            else if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= ofcemail.length) {
              isValid = false;
              $('#msg_errorentry').html('Please Enter Valid Email.').show();
              $('#officialEmailentry').focus();
              setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

            }
            // else if (!devicetype && devicetype.length <= 0) {
            //   // validate GST No
            //   isValid = false;
            //   $('#msg_errorentry').html('Please Select Supply Of.').show();
            //   $('#supplytypeentry').focus();
            //   setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

            // }
 
          if (isValid && index == 1) {
            $('#msg_errorentry').html('').hide();

            $("#stepentry-14").hide()
            $("#stepentry-15").show();
            $("#stepentry-16").hide();
            $("#stepentry-17").hide();

            setClassesentry(index, steps);
            $('#pernameentry').focus();
            isValid = false;
          }
          return isValid;
        }


        function validateentryStep2(index, steps) {
          $('#pernameentry').focus();
          $('#msg_error_contactentry').html('').hide();

          var isValid = true;
          var persnname = $('#pernameentry').val();
          var phone = $('#alternateNoentry').val();
          var state = $('#selectstateentry').val();
          var city = $('#citydummyentry').val();
          var regadd = $('#regaddressentry').val();
          var pincode = $('#pincodenoid').val();
          var are = $('#areaid').val();
          var land = $('#landmarkid').val();


          // Validate Contact Name
          if (!persnname && persnname.length <= 0 || persnname.length < 3) {
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Person Name.').show();
            $('#pernameentry').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
          }
          else if ((phone.length != 10 && phone.length != 13)) {
            // validate GST No
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Phone No.').show();
            $('#alternateNoentry').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
          }
          else if (!state && state.length <= 0) {
            // validate state
            isValid = false;
            $('#msg_error_contactentry').html('Please Select State.').show();
            $('#stateentry').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

          } else if (!city && city.length <= 0) {
            // validate city
            isValid = false;
            $('#msg_error_contactentry').html('Please Select City.').show();
            $('#cityentry').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

          }
          else if ((are.length < 5) && (are != null && are != '')) {
            // validate city
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Area.').show();
            $('#areaid').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

          }
          else if ((land.length < 5) && (land != null && land != '')) {
            // validate city
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Landmark.').show();
            $('#landmarkid').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

          }
          else if (!regadd && regadd.length <= 0 || regadd.length < 5) {
            // validate city
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Registration Address ').show();
            $('#regaddressentry').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

          }
          else if (pincode.length < 5) {
            // validate Alternate Number
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Pincode').show();
            $('#pincodenoid').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
          }
 
          if (isValid && index == 2) {

            $('#msg_error_contactentry').html('').hide();
            $("#stepentry-15").hide();
            $("#stepentry-14").hide()
            $("#stepentry-16").show();
            $("#stepentry-17").hide();
            $('#accountNoentry').focus();

            $("#saveentry").prop('disabled', false);
            $("#nextentry").prop('disabled', true);
            setClassesentry(index, steps);
            isValid = false;
          }

          return isValid;
        }

        function validateentryStep3(index, steps) {

          $('#accountNoentry').focus();
          var isValid = true;

          var accno = $('#accountNoentry').val();
          var bname = $('#bnknam').val();
          var brnchnm = $('#branchnmid').val();
          var ifsc = $('#ifsccodeid').val();

          // Validate Contact Name
          if ((accno.length < 11) && (accno != null && accno != '')) {
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Account No.').show();
            $('#accountNoentry').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

          } else if ((bname.length < 3) && (bname != null && bname != '')) {
            // validate state
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Bank Name.').show();
            $('#bnknam').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

          } else if ((brnchnm.length < 3) && (brnchnm != null && brnchnm != '')) {
            // validate city
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Branch Name.').show();
            $('#branchnmid').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
          }
          else if ((ifsc.length < 3) && (ifsc != null && ifsc != '')) {
            // validate city
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Branch Name.').show();
            $('#ifsccodeid').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
          }
 
          if (isValid && index == 3) {
            $('#msg_accountNoentry').html('').hide();


            $("#stepentry-14").hide();
            $("#stepentry-15").hide();
            $("#stepentry-16").hide();

            setClassesentry(index, steps);
            $("#nextentry").prop('disabled', true);
            isValid = false;
          }
          return isValid;
        }
      });

    })(jQuery);
    this.Statelist();
    this.EncryptPageName();
    this.EncryptPageUrl();
    this.vendortypelist();
    this.DeviceTypeList();
    this.clearfunction();
  }


  EncryptPageName() {
    this.cryptService.encrypt("Vendor New")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    // console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    // console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }

  vendortypelist() {
    let dataL = {
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.VendorTypeList(dataL).subscribe((response) => {
      this.vendorTypeList = response.entity;
    })
  }

 

  getVendorTypeId() {
    this.vendorTypeId = this.vendortypeObj.param1;
    let dataL = {
      param1: this.vendorTypeId,
      param2: "",
    }
    this.listService.SupplyOfList(dataL).subscribe((response)=>{
      this.supplyList = response.entity;
      alert(this.supplyList[0].param1)
      console.log(this.supplyList[0].param1)
    })
  }

  // SupplyOfList() {
  //   this.getVendorTypeId();
  //   let dataL = {
  //     param1: this.vendorTypeId,
  //     param2: "",
  //   }
  //   this.listService.SupplyOfList(dataL).subscribe((response)=>{
  //     this.supplyList = response.entity;
  //   })
  // }

  devicetype: any;

  vensavebtn() {
    this.supplyidreturn = [];
    // for (let i = 0; i < this.dev_type.length; i++) {
    //   this.supplyidreturn.push(this.dev_type[i].param1)
    // }
    var cin = $("#CINNoentry").val();
    this.selectcity = this.cityText.param1;
    this.supplyidreturn.push("yARaqXo6A8pmLAGyWbqJWA==")
    this.devicetype = this.supplyidreturn

    this.vendorentryText = this.vendorentryText.substring(0, 1).toUpperCase() + this.vendorentryText.substring(1);
    this.personnameText = this.personnameText.substring(0, 1).toUpperCase() + this.personnameText.substring(1);
    this.AreaText = this.AreaText.substring(0, 1).toUpperCase() + this.AreaText.substring(1);
    this.landmarkText = this.landmarkText.substring(0, 1).toUpperCase() + this.landmarkText.substring(1);
    this.regaddressText = this.regaddressText.substring(0, 1).toUpperCase() + this.regaddressText.substring(1);

    let dataL = {
      remarks: "",
      vendorid: "",
      vendorcode: "",
      vendorname: this.vendorentryText,
      vendorshortcode: this.shortcodeentryText,
      vendorregaddress1: this.regaddressText,
      vendorregaddress2: "",
      vendorcity: this.selectcityentry,
      vendorstate: this.selectstate,
      vendorcin: this.cinnoentryText,
      vendorgst: this.gstentryText,
      vendorpan: "",
      vendorcitypincode: this.pincodeText,
      vendorofficialemailid: this.officialemailentryText,
      vendorlandlineno: this.officialnoentryText,
      vendorcontactperson: this.personnameText,
      vendorcontpersemailid: "info@gmail..ocm",
      vendorbankifsc1: this.ifscText,
      vendorbankaddress1: "",
      vendorcontactmobile: this.altnumber,
      vendorstatusflag: "",
      loginname: "",
      loginpasswd: "",
      vendorbankaccountno1: this.accountnoText,
      vendorbankname1: this.banknmText,
      vendorbankcityname1: "",
      vendorbankaccountno2: "",
      vendorbankname2: "",
      vendorbankifsc2: "",
      vendorbankaddress2: "",
      vendorbankcityname2: "",
      vendortypeid: "MEQesuRUGvkpIxXTgCIXvw==",
      vendorbankbranchname1: this.branchnmText,
      vendorbankbranchname2: "",
      vendorlandmark: this.landmarkText,
      vendorarea: this.AreaText,
      devicetypeid: this.devicetype
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.vendormodelservice.InsertVendorAPI(dataL).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.datafromrespo = data.entity;

      if (data.statuscode == 200) {
        $("#SuccessModalEntry").modal('show');
        this.showDetails.emit()
        this.closemodal();
      }
      else {
        $("#ErrorModalEntry").modal('show');
      }

    });
  }


  /*-------------List of State Api ---------------*/

  Statelist() {
    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.SelectStateListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfState = data.entity;
        this.loading = false;

      });
  }
  /*-------------List of City Api ---------------*/
  stateText: any;
  selectstate: string;
  selectcity: string;

  Citylist() {
    this.selectstate = this.stateText.param1;

    let keydata = {
      searchBy: this.selectstate,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.SelectCityListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfCity = data.entity;
        this.loading = false;

      });
  }
  selectcityentry: string;
  cityvalue() {
    this.selectcityentry = this.cityText.param1;
    //alert(this.selectcityentry);
  }

  ListOfDevicetype = [];
  DeviceTypeList() {

    let keydata = {
      param1: "",
      param2: "",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.DeviceTypeListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfDevicetype = data.entity.list;
        this.loading = false;

      });
  }
  /*-------------List of City Api ---------------*/
  dev_type: any[];
  supplyidreturn: any;
  supplyof(): void {

    // this.supplyidreturn = this.dev_type;
    this.supplyidreturn = this.dev_type.toString()
  }

  closemodal() {
    this.clearfunction();
    $("#exampleModal").modal('hide');
    $('.modal-backdrop.show').css('display', 'none');

  }

  clearfunction() {
    this.vendorTypeId = '';
    this.vendortypeObj = '';
    this.vendorentryText = "";
    this.shortcodeentryText = "";
    this.cinnoentryText = "";
    this.gstentryText = "";
    this.officialnoentryText = "";
    this.altnumber = "";
    this.officialemailentryText = "";
    this.dev_type = [];
    this.supplyidreturn = [];
    this.personnameText = "";
    this.stateText = "";
    this.cityText = "";
    this.AreaText = "";
    this.landmarkText = "";
    this.regaddressText = "";
    this.pincodeText = "";
    this.accountnoText = "";
    this.banknmText = "";
    this.branchnmText = "";
    this.ifscText = "";
    this.paymntText = "";

  }


}


