import { PlanmasterService } from './../../../../APIService/planmaster.service';
import { CustomermodelService } from './../../../../APIService/customermodel.service';
import { Router } from '@angular/router';
import { ListService } from './../../../../../list.service';

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
  selector: 'app-planentry',
  templateUrl: './planentry.component.html',
  styleUrls: ['./planentry.component.css']
})
export class PlanentryComponent implements OnInit {

  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;

  count: number; viewcount: number;
  public loading = false; p: number;
  datafromrespo: string;PlanNameText:string; PlanDiscriptionText:string; Amount:string; DataMB:string; SMSCount:string; ValiditydaysText:string;


  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };
  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService, private listService: ListService, private cryptService: CryptService, private router: Router, private planService: PlanmasterService) {
  }

  ngOnInit() {

    (function ($) {
      $(document).ready(function () {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#distrbutornameentry').focus();
        })
      });
    })(jQuery);

   $('#starsymbol').hide();
    (function ($) {
      $(document).ready(function () {
        $('#vendorName').focus();
        $(".buttonFinish").prop('disabled', true);
        $("#step-14").show();
        $("#step-15").hide();
        $("#step-16").hide();
        $("#step-17").hide();
        $("#step-14").show();
        $("#stepentry-15").hide();
        $("#stepentry-16").hide();
        $("#stepentry-17").hide();







        $('#vendorNameentry').focus();
        $(".buttonFinish").prop('disabled', true);
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
          } else
            if (validateentryStep2(index, steps) == false) {
              isStepValid = false;
            } else
              if (validateentryStep3(index, steps) == false) {
                isStepValid = false;
              } else
                if (validateentryStep4(index, steps) == false) {
                  isStepValid = false;
                }
          return isStepValid;
        }

        function validateentryStep1(index, steps) {
          $('#distrbutorname').focus();
          $('#msg_errorentry').html('').hide();
          // $('#msg_vendorName').html('').hide();
          // $('#msg_shortcode').html('').hide();
          // $('#msg_OfficialNo').html('').hide();
          // $('#msg_Officialemail').html('').hide();
          var isValid = true;
          var planname = $('#plannameentry').val();
          var plandiscription = $('#plandiscriptionentry').val();
          // alert("sdjb"+distributorname);
          var amount = $('#amountentry').val();
          var network = $('#networkentrydummy').val();
         
          var vendor = $('#vendorentrydummy').val();
         
          if (!planname && planname.length <= 0) {
            isValid = false;
            //alert(""+Distname);
            $('#msg_errorentry').html('Please Enter Plan Name').show();
            $('#plannameentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

          }
          else if (!plandiscription && plandiscription.length <= 0) {
            // validate short code
            isValid = false;
            $('#msg_errorentry').html('Please Enter Plan Discription').show();
            $('#plandiscriptionentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          else if (!amount && amount.length <= 0) {
            // validate Official No
            isValid = false;
            $('#msg_errorentry').html('Please Enter Amount').show();
            $('#amountentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

          } else if (!network && network.length <= 0) {
            // validate Official No
            isValid = false;
            $('#msg_errorentry').html('Please Select Network').show();
            $('#Network1identry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

          } else if (!vendor && vendor.length <= 0) {
            // validate Official No
            isValid = false;
            $('#msg_errorentry').html('Please Select Vendor').show();
            $('#vendorentrydemo').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

          }
          
          
        

          if (isValid && index == 1) {

            // $('#msg_vendorName').html('').hide();
            // $('#msg_shortcode').html('').hide();
            // $('#msg_OfficialNo').html('').hide();
            // $('#msg_Officialemail').html('').hide();
            $('#msg_errorentry').html('').hide();
            $("#stepentry-14").hide()
            $("#stepentry-15").show();
            $("#stepentry-16").hide();
            $("#stepentry-17").hide();

            setClassesentry(index, steps);
            $(".buttonFinish").prop('disabled', false);
            $(".buttonNext").prop('disabled', true);
            $('#pername').focus();
            isValid = false;
          }
          return isValid;
        }


        function validateentryStep2(index, steps) {
          $('#pername').focus();

          // $('#msg_contactNo').html('').hide();
          // $('#msg_alternateNo').html('').hide();
          // $('#msg_State').html('').hide();
          // $('#msg_city').html('').hide();
          $('#msg_error_contactentry').html('').hide();
          var isValid = true;
          

          if (isValid && index == 2) {

            $('#msg_contactNo').html('').hide();
            $('#msg_alternateNo').html('').hide();
            $('#msg_state').html('').hide();
            $('#msg_city').html('').hide();
            $("#stepentry-15").hide();
            $("#stepentry-14").hide()
            $("#stepentry-16").show();
            $("#stepentry-17").hide();
            $('#accountNo').focus();

            $(".buttonFinish").prop('disabled', false);
            $(".buttonNext").prop('disabled', true);
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
   
    this.EncryptPageName();
    this.EncryptPageUrl();
    this.NetworkList();
    this.VendorList();
   // this.clearfunction();
  }
  EncryptPageName() {
    this.cryptService.encrypt("Plan Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    // console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    // console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }

  networklist: any;
  network1list:Object;

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
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.network1list = data.entity.list;
        
        // this.ListOfState = statelist;

        this.loading = false;

      });
  }
  selectnetwork1_Text:any;
  networkreturn:string;
  selectnet1(){
    this.networkreturn = this.selectnetwork1_Text.param1;
  }

  ListOfvendor:Object;
  VendorList() {

    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.VendorListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
          this.ListOfvendor = data.entity.list;
 
        this.loading = false;

      });
  }
  vendorText:any;
  vendorlistdata:string;
  selectvendorList(){
    this.vendorlistdata = this.vendorText.param1;
  }
  vensavebtn(){
    var planname = $('#plannameentry').val();
          var plandiscription = $('#plandiscriptionentry').val();
          // alert("sdjb"+distributorname);
          var amount = $('#amountentry').val();
          var network = $('#networkentrydummy').val();
         
          var vendor = $('#vendorentrydummy').val();

    var dataindb = $('#datainmbentry').val();
    var smscount = $('#smscountentry').val();
    var validity = $('#validityentry').val();
    var status = $("input[type='radio'][name='status']:checked").val();
    var isValid = true;

    if (!dataindb && dataindb.length <= 0) {
      isValid = false;
      //alert(""+Distname);
      $('#msg_error_contactentry').html('Please Enter Data In MB').show();
      $('#datainmbentry').focus();
      setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

    }
    else if(!smscount && smscount.length <= 0) {
      isValid = false;
      //alert(""+Distname);
      $('#msg_error_contactentry').html('Please Enter SMS Count').show();
      $('#smscountentry').focus();
      setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

    }
    else if(!validity && validity.length <= 0) {
      isValid = false;
      //alert(""+Distname);
      $('#msg_error_contactentry').html('Please Enter Validity').show();
      $('#validityentry').focus();
      setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

    }
    else {
      let dataL = {
        remarks: "",
        planid: 0,
        planname: planname, plandescription: plandiscription, planammount: amount, plandatainmb: dataindb,
        plansmscount: smscount, planvalidityindays: validity, planiscalling: status, plannetworkid: this.networkreturn,
        planvendorid: this.vendorlistdata, planmark: "", 
        // pageID: "7",
        // pageName: this.encryptedpageNameValue,
        // pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }
      this.planService.InsertPlanmasterAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        //  alert(data);
        this.datafromrespo = data.entity;

        if (this.datafromrespo == 'Successfully Saved.') {
          $("#SuccessModalEntry").modal('show');
          //this.closemodal();
          //this.clearfunction();
        }
        else {
          $("#ErrorModalEntry").modal('show');
        }
    });
  }
  
  }

}
