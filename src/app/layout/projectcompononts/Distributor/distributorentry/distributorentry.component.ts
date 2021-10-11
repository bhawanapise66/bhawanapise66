import { DistributormodelService } from './../../../../APIService/distributormodel.service';
//import { DistributorService } from './../../../../../distributor.service';
import { Router } from '@angular/router';
import { ListService } from './../../../../../list.service';
import { PostService } from './../../../../../post.service';
import { Paramcls } from './../../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as $ from 'jquery';
import { CryptService } from '../../services/crypt.service';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-distributorentry',
  templateUrl: './distributorentry.component.html',
  styleUrls: ['./distributorentry.component.css']
})
export class DistributorentryComponent implements OnInit {
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;

  distentryText: string; pincodeText: string; regaddressText: string; gstentryText: string; distidentryText: string;

  personnameText: string; personnoText: string; personaltnoText: string; personemailText: string; CompanyidText: string; AreaText: string; supplierofText: string; landmarkText: string;

  dist_id: string; dist_name: string; short_code: string; vendor_cin: string; dist_gst: string = '';
  off_no: string; off_email: string; con_name: string; con_email: string; con_mobno: string;
  ven_state: string; ven_city: string; reg_add: string; pin_code: string; bank_acc: string = '';
  distid_Text: string; mobno_Text: string; emailentry: string;

  bank_name: string; bank_ifsc: string = ''; bank_add: string; company_id: string; count: number; datafromrespo: string;

  accountnoText: string; banknmText: string; branchnmText: string; ifscText: string; paymntText: string;
  ListOfCity$: Object; ListOfState$: Object; resdatalist = []; ListOfState = []; ListOfCity = [];

  public loading = false; p: number;
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService, private distributorService: DistributormodelService, private postService: PostService, private listService: ListService, private cryptService: CryptService, private router: Router) { }

  ngOnInit() {

    (function ($) {
      $(document).ready(function () {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#DistributorNameentry').focus();
        })
      });
    })(jQuery);


    (function ($) {
      $(document).ready(function () {
        $('#vendorName').focus();
        $("#saveentry").prop('disabled', true);
        $("#step-14").show();
        $("#step-15").hide();
        $("#step-16").hide();
        $("#step-17").hide();
        $("#step-14").show();
        $("#stepentry-15").hide();
        $("#stepentry-16").hide();
        $("#stepentry-17").hide();







        $('#vendorNameentry').focus();
        $("#saveentry").prop('disabled', true);
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
            // alert("submit the form?!?")
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
          $('#vendorNameentry').focus();

          $('#msg_distentry').html('').hide();
          $('#msg_shortcodeentry').html('').hide();
          //  $('#msg_vendorNameentry').html('').hide();
          //   $('#msg_shortcodeentry').html('').hide();
          $('#msg_stateentry').html('').hide();
          $('#msg_Cityn').html('').hide();
          $('#msg_regadde').html('').hide();
          var isValid = true;
          var distname = $('#DistributorNameentry').val();
          var gstno = $('#GSTNo').val();
          var altno = $('#alternateNo').val();
          // var gstno = $('#GSTNoentry').val();
          var mobileno = $('#officialNoentry').val();
          var email = $('#officialEmailentry').val();
          //  alert(email);
          var atposition = email.indexOf("@");
          var dotposition = email.lastIndexOf(".");
          //var add = $('#regaddressentry').val();
          // var pincode = $('#pincodeno').val();
          // Validate distributor Name

          if (!distname && distname.length <= 0 || distname.length < 3) {
            isValid = false;
            $('#msg_errorentry').html('Please Enter Distributor Name').show();
            $('#DistributorNameentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

          }

          else if (!mobileno && mobileno.length <= 0 || mobileno.length < 10) {
            // validate GST No
            isValid = false;
            $('#msg_errorentry').html('Please Enter Mobile No').show();
            $('#officialNoentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

          }
          else if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= email.length) {
            // validate Email
            isValid = false;
            $('#msg_errorentry').html('Please Enter Valid Email').show();
            $('#officialEmailentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

          }
          else if ((gstno != null || gstno != "" || gstno != undefined) && gstno.length >= 1 && gstno.length < 15) {
            isValid = false;
            $('#msg_errorentry').html('Please Enter Valid gst no').show();
            $('#officialEmailentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          else if ((altno != null || altno != "" || altno != undefined) && altno.length >= 1 && altno.length <= 9) {
            isValid = false;
            $('#msg_errorentry').html('Please Enter Valid Alternate no.').show();
            $('#officialEmailentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          //else if(!city && city==null ){
          //   // validate GST No
          //   isValid = false;
          //   $('#msg_Cityn').html('Please Enter City').show(); 
          //   $('#cityentry').focus();        
          // }else if(!add && add.length <= 0 ){
          //   // validate GST No
          //   isValid = false;
          //   $('#msg_regadde').html('Please Enter Valid Address').show(); 
          //   $('#regaddressentry').focus();        
          // }

          if (isValid && index == 1) {

            $('#msg_vendorNameentry').html('').hide();
            $('#msg_shortcodeentry').html('').hide();
            $('#msg_stateentry').html('').hide();
            $('#msg_city').html('').hide();
            $('#msg_regadd').html('').hide();
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
          $('#msg_pernameentry').html('').hide();
          $('#msg_contactNoentry').html('').hide();
          $('#msg_alternateNoentry').html('').hide();
          $('#msg_Stateentry').html('').hide();
          $('#msg_cityentry').html('').hide();
          $('#msg_regaddentry').html('').hide();
          var isValid = true;
          var persnname = $('#pernameentry').val();
          var state = $('#statedummy').val();
          var city = $('#citydummy').val();
          var regadd = $('#regaddressentry').val();
          var pincode = $('#pincodenoentry').val();
          // var email = $('personemail').val();

          // Validate Contact Name
          if (!persnname && persnname.length <= 5) {
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Person Name').show();
            $('#pernameentry').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

          }
          else if (!state && state.length <= 0) {
            isValid = false;
            $('#msg_error_contactentry').html('Please Select State').show();
            $('#stateentry').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

          }
          else if (!city && city.length <= 0) {
            // validate Alternate Number
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter City').show();
            $('#cityentry').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

          }
          else if (!regadd && regadd.length <= 0 || regadd.length <= 5) {
            //   // validate state
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Valid Addresss').show();
            $('#regaddressentry').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

          }
          else if (!pincode && pincode.length <= 0 || pincode.length < 6) {
            // validate city
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Valid Pincode').show();
            $('#pincodenoentry').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

          }

          //   // validate city
          //   isValid = false;
          //   $('#msg_cityentry').html('Please Enter City').show(); 
          //   $('#cityentry').focus();        
          // }
          if (isValid && index == 2) {

            $('#msg_pernameentry').html('').hide();
            $('#msg_contactNoentry').html('').hide();
            $('#msg_alternateNoentry').html('').hide();
            $('#msg_stateentry').html('').hide();
            $('#msg_cityentry').html('').hide();
            $('#msg_regaddentry').html('').hide();
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
          var accountNo = $('#accountNoentry').val();
          $('#msg_accountNoentry').html('').hide();
          // Validate Account No
          if (!accountNo && accountNo.length <= 0) {
            isValid = false;
            $('#msg_accountNoentry').html('Please Enter Account Number').show();
            $('#accountNoentry').focus();
          }
          if (isValid && index == 3) {

            $('#msg_accountNoentry').html('').hide();
            $("#stepentry-14").hide();
            $("#stepentry-15").hide();
            $("#stepentry-16").hide();
            $("#stepentry-17").show();

            setClassesentry(index, steps);
            $("#nextentry").prop('disabled', true);
            isValid = false;
          }
          return isValid;
        }
        function validateentryStep4(index, steps) {
          // alert("success")
          return true;
        }

      });




    })(jQuery);
    this.Statelist();
    this.EncryptPageName();
    this.EncryptPageUrl(); this.clearfunction();
  }

  EncryptPageName() {
    this.cryptService.encrypt("Distributor Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
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

        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfState = data.entity.list;
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);



        this.loading = false;

      });
  }
  Citylistdummy() {
    this.selectcity = this.cityText.param2;
  }
  /*------------- List of City Api ---------------*/
  //stateText:any;
  selectstate: string;

  cityText: any;
  selectcity: string;
  Distributorsavebtn() {
    this.selectstate = this.stateText.param2;
    this.selectcity = this.cityText.param2;
    var isValid = true;

    if (this.bank_acc != '' && this.bank_acc.length < 9) {
      $('#msg_error_accountentry').html('Please Enter Valid Account Number').show();
      $('#accountNoentry').focus();
      setTimeout(function () { document.getElementById("msg_error_accountentry").style.display = "none"; }, 3000);
}
    else if(this.bank_ifsc!='' && this.bank_ifsc.length !=11){
      $('#msg_error_accountentry').html('Please Enter Valid IFSC Code').show();
      $('#bankifsc').focus();
      setTimeout(function () { document.getElementById("msg_error_accountentry").style.display = "none"; }, 3000);

    }
    else {


      this.dist_name = this.dist_name.substring(0, 1).toUpperCase() + this.dist_name.substring(1);
      this.con_name = this.con_name.substring(0, 1).toUpperCase() + this.con_name.substring(1);
      this.AreaText = this.AreaText.substring(0, 1).toUpperCase() + this.AreaText.substring(1);
      this.landmarkText = this.landmarkText.substring(0, 1).toUpperCase() + this.landmarkText.substring(1);
      this.reg_add = this.reg_add.substring(0, 1).toUpperCase() + this.reg_add.substring(1);
      this.bank_name = this.bank_name.substring(0, 1).toUpperCase() + this.bank_name.substring(1);
      this.bank_add = this.bank_add.substring(0, 1).toUpperCase() + this.bank_add.substring(1);



      let dataL = {
        param1: "",
        param2: "",
        param3: this.dist_name,
        param4: this.dist_gst,
        param5: this.reg_add,
        param6: this.reg_add,
        param7: this.selectcity,
        param8: this.selectstate,
        param9: this.con_name,
        param10: this.emailentry,
        param11: this.mobno_Text,
        param12: this.con_mobno,
        param13: "",   //companyid
        param14: "",    //loginnam
        param15: "",    //password
        param16: this.bank_acc,
        param17: this.bank_name,
        param18: this.bank_ifsc,
        param19: "",
        param20: "",
        param21: this.bank_acc,
        param22: this.bank_name,
        param23: this.bank_ifsc,
        param24: "",
        param25: "",
        param26: this.paymntText,
        param27: this.AreaText,         //"distributor Area",
        param28: this.landmarkText,     //"distributor Landmark",
        param29: this.pincodeText,      // "distributor Pincode",
        param30: this.bank_add,
        // param31: "",
        // param32: "",
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }
      this.distributorService.InsertdistributorAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.datafromrespo = data.entity;
        if (data.statuscode == 200) {
          $("#successmodelentry").modal('show');
          this.clearfunction();
          this.closemodal();
        }
        else {
          $("#notifymodelentry").modal('show');
        }
      });
    }
  }



  closemodal() {
    $("#exampleModal").modal('hide');
    $('.modal-backdrop.show').css('display', 'none');
  }
  /*------------- List of City Api ---------------*/
  stateText: any;
  Citylist() {
    this.selectstate = this.stateText.param2;

    let keydata = {
      param1: this.selectstate,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.SelectCityListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfCity = data.entity.list;
        //  this.resdata = 

        this.loading = false;

      });
  }
  /*-------------List of City Api ---------------*/


  clearfunction() {

    this.dist_name = ""; this.dist_gst = ""; this.mobno_Text = ""; this.con_mobno = ""; this.emailentry = ""; this.con_name = "";
    this.stateText = ""; this.selectstate = ""; this.cityText = ""; this.selectcity = ""; this.AreaText = ""; this.landmarkText = "";
    this.reg_add = ""; this.pincodeText = ""; this.bank_acc = ""; this.bank_name = ""; this.bank_add = ""; this.bank_ifsc = "";
    this.paymntText = "";

  }
}
