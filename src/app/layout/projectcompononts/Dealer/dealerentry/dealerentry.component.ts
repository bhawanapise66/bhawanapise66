import { DealermodelService } from './../../../../APIService/dealermodel.service';
import { VendormodelService } from './../../../../APIService/vendormodel.service';
import { Router } from '@angular/router';

import { ListService } from './../../../../../list.service';
//import { PostService } from './../../../../post.service';

import { Paramcls } from './../../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as xlsx from 'xlsx';
import * as $ from 'jquery';
import { CryptService } from '../../services/crypt.service';

declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;


@Component({
  selector: 'app-dealerentry',
  templateUrl: './dealerentry.component.html',
  styleUrls: ['./dealerentry.component.css']
})
export class DealerentryComponent implements OnInit {
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  public loading = false; p: number; pagecount: number; count: number;
  nop: number; totrec: number; outorec: number; filter: any; selectRows: string;

  deal_id: string;
  distributor_name: string; dealer_name: string; dealer_gst: string = ''; con_name: string; deal_state: string; deal_city: string; reg_add1: string;
  reg_add2: string; con_mobno: string; con_email: string; loginNameText: string; loginpasswordText: string; remarkText: string;
  datafromrespo: string;
  dealer_name_entry: string; reg_add2_entry: string; alt_mobno: string;
  distlist$: any; statlist$: any; citlist$: any; dealerdetail$: any; dealerdetailPDF$: any; ListOfCity$: Object; ListOfState$: Object;
  ListOfCity = []; ListOfState = []; distlist = []; viewcount: string;

  stringifiedData: any; parsedJson: any; stringifiedresponse: any; parsedJsonresponse: any;
  stringifiedDataList: any; parsedJsonList: any;

  stringifiedDatadist: any; parsedJsondist: any; stringifiedresponsedist: any; parsedJsonresponsedist: any;
  stringifiedDataListdist: any; parsedJsonListdist: any;

  pageUrl = this.router.url;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService, private vendormodelservice: VendormodelService, private listService: ListService, private dealerService: DealermodelService, private cryptService: CryptService, private router: Router) { }


  ngOnInit() {

    (function ($) {
      $(document).ready(function () {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#distributorentry').focus();
        })
      });
    })(jQuery);

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

          $('#msg_errorentry').html('').hide();
          //  $('#msg_shortcodeentry').html('').hide();
          // $('#msg_CINNoentry').html('').hide();
          // $('#msg_GSTNoentry').html('').hide();
          // $('msg_officenoentry').html('').hide();
          // $('msg_Officialemailentry').html('').hide();
          var isValid = true;
          var distname = $('#distdummy').val();
          var dealername = $('#dealernameidentry').val();
          // alert(dealername);
          // var cin = $('#CINNoentry').val();
          var gstno = $('#gstnoid').val();
          var regadd = $('#regaddress2identry').val();
          var state = $('#statedummyentry').val();
          var city = $('#citydummyentry').val();
          // Validate Vendor Name
          if (!distname && distname.length <= 0) {
            isValid = false;
            $('#msg_errorentry').html('Please Enter Distributor Name').show();
            $('#distributorentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          else if (!dealername && dealername.length <= 0 || dealername.length < 3) {
            // validate short code
            isValid = false;
            $('#msg_errorentry').html('Please Enter Dealer Name').show();
            $('#dealernameidentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          else if (!state && state.length <= 0) {
            // validate GST No
            isValid = false;
            $('#msg_errorentry').html('Please Select State').show();
            $('#stateentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          else if (!city && city.length <= 0) {
            // validate GST No
            isValid = false;
            $('#msg_errorentry').html('Please Select City').show();
            $('#cityentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          else if (!regadd && regadd.length <= 0 || regadd.length < 5) {
            // validate short code
            isValid = false;
            $('#msg_errorentry').html('Please Enter Registration Address').show();
            $('#regaddress2identry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          else if ((gstno != null || gstno != "" || gstno != undefined) && gstno.length >= 1 && gstno.length < 15) {

            isValid = false;
            $('#msg_errorentry').html('Please Enter Valid gst no').show();
            $('#gstnoid').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }

          if (isValid && index == 1) {

            $('#msg_errorentry').html('').hide();
            // $('#msg_shortcodeentry').html('').hide();
            // $('#msg_CINNoentry').html('').hide();
            // $('#msg_GSTNoentry').html('').hide();
            // $('msg_officenoentry').html('').hide();
            // $('msg_Officialemailentry').html('').hide();
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
          // $('#msg_contactNoentry').html('').hide();
          // $('#msg_alternateNoentry').html('').hide();
          // $('#msg_Stateentry').html('').hide();
          // $('#msg_cityentry').html('').hide();
          // $('#msg_regaddentry').html('').hide();
          var isValid = true;
          var persnname = $('#contactnameidentry').val();
          var contactNo = $('#contactno1identry').val();
          var altNO = $('#contactno2id').val();
          var email = $('#emailIdid').val();
          var atposition = email.indexOf("@");
          var dotposition = email.lastIndexOf(".");


          if (!persnname && persnname.length <= 0 || persnname.length < 3) {
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Contact Name').show();
            $('#contactnameidentry').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

          }
          else if (!contactNo && contactNo.length <= 0 || contactNo.length <= 9) {
            // validate state
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Contact No').show();
            $('#contactno1identry').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

          }
          else if (altNO.length != 0 && altNO.length < 10 && altNO.length >= 13) {
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Valid Alernate No').show();
            $('#contactno2id').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
          }
          else if (email.length != 0 && (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= email.length)) {
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Valid Email Id').show();
            $('#contactno2id').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

          }
          //else if (city==null){
          //   // validate city
          //   isValid = false;
          //   $('#msg_error_contactentry').html('Please Enter City').show(); 
          //   $('#cityentry').focus();        
          // }else if(!regadd && regadd.length <= 0 ){
          //   // validate city
          //   isValid = false;
          //   $('#msg_error_contactentry').html('Please Enter Valid Address ').show(); 
          //   $('#regaddressentry').focus();        
          //  }
          //else
          // if(!pincode && pincode.length <= 0){
          //  // validate Alternate Number
          //   isValid = false;
          //   $('#msg_error_contactentry').html('Please Enter Valid Pincode No.').show(); 
          //   $('#pincodeno').focus();        
          // }

          if (isValid && index == 2) {

            $('#msg_error_contactentry').html('').hide();
            // $('#msg_contactNoentry').html('').hide();
            //  $('#msg_alternateNoentry').html('').hide();
            //  $('#msg_stateentry').html('').hide();
            //  $('#msg_cityentry').html('').hide();
            //  $('#msg_regaddentry').html('').hide();
            $("#stepentry-15").hide();
            $("#stepentry-14").hide()
            $("#stepentry-16").show();
            $("#stepentry-17").hide();
            $('#accountNoentry').focus();

            $(".buttonFinish").prop('disabled', false);
            $("#nextentry").prop('disabled', true);
            setClassesentry(index, steps);
            isValid = false;
          }

          return isValid;
        }


        function validateentryStep3(index, steps) {

          $('#accountNoentry').focus();
          var isValid = true;

          var loginid = $('#loginNameid').val();
          var password = $('#loginpasswordid').val();
          if (!loginid && loginid.length <= 0) {
            isValid = false;
            $('#msg_error_loginpasswordentry').html('Please Enter Login ID').show();
            $('#loginNameid').focus();
            setTimeout(function () { document.getElementById("msg_error_loginpasswordentry").style.display = "none"; }, 3000);

          }
          else if (!password && password.length <= 0) {
            // validate state
            isValid = false;
            $('#msg_error_loginpasswordentry').html('Please Enter Password').show();
            $('#loginpasswordid').focus();
            setTimeout(function () { document.getElementById("msg_error_loginpasswordentry").style.display = "none"; }, 3000);

          }
          if (isValid && index == 3) {

            $('#msg_accountNoentry').html('').hide();
            $("#stepentry-14").hide();
            $("#stepentry-15").hide();
            $("#stepentry-16").hide();
            // $("#stepentry-17").show();

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
    // this.Statelist();
    this.EncryptPageName();
    this.EncryptPageUrl();
    this.Statelist();
    this.DistributorList(); this.clearfunction();
  }
  EncryptPageName() {
    this.cryptService.encrypt("Dealer Master")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    // console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    // console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }


  DistributorList() {

    let keydatanet = {
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    // Device Model List BIND LIST    
    this.listService.DistributorListAPI(keydatanet).subscribe(
      (datanet) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.distlist = datanet.entity.list;
        // let resdatanet = datanet;    
        // if (resdatanet['status'] == true) 
        // {             
        //   this.distlist = datanet.entity.list;
        // }
      });
  }

  Citylist() {
    this.selectstate = this.stateentry.param1;
    //(state);

    //alert((document.getElementById("statedummy") as HTMLInputElement).value)
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

        // console.log("wekcome_ "+data);
        this.ListOfCity = data.entity.list;

        this.loading = false;

      });
  }
  /*-------------List of City Api ---------------*/
  dummydist() {
    this.selectdistributor = this.distributorentry.param2;
  }
  selectcitydummy() {
    this.selectcity = this.cityentry.param2;
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

        // console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfState = data.entity.list;

        // console.log(JSON.stringify(" id array  ========== "+this.ListOfState));

        //  this.valueofstate = this.ListOfState;

        //  this.ven_state =  this.valueofstate.param2;

        //  console.log(JSON.stringify(" id array  ========== "+this.ven_state));

        this.loading = false;

      });
  }
  distributorentry: any;
  selectdistributor: string;

  stateentry: any;
  selectstate: string;

  cityentry: any;
  selectcity: string;
  dealsavebtn() {

    if (this.loginNameText == '' || this.loginNameText == null || this.loginNameText.length < 4) {
      $('#msg_error_loginpasswordentry').html('Please Enter Login ID').show();
      $('#loginNameid').focus();
      setTimeout(function () { document.getElementById("msg_error_loginpasswordentry").style.display = "none"; }, 3000);
    }
    else if (this.loginpasswordText == '' || this.loginpasswordText == null || this.loginpasswordText.length < 4) {
      $('#msg_error_loginpasswordentry').html('Please Enter Password').show();
      $('#loginpasswordid').focus();
      setTimeout(function () { document.getElementById("msg_error_loginpasswordentry").style.display = "none"; }, 3000);

    }
    else {


      this.selectdistributor = this.distributorentry.param1;
      this.selectstate = this.stateentry.param1;
      this.selectcity = this.cityentry.param1;
      // this.dealer_name = this.dealer_name.substring(0, 1).toUpperCase() + this.dealer_name.substring(1);
      // this.reg_add2_entry = this.reg_add2_entry.substring(0, 1).toUpperCase() + this.reg_add2_entry.substring(1);
      // this.con_name = this.con_name.substring(0, 1).toUpperCase() + this.con_name.substring(1);

      let dataL = {
        param1: "",
        param2: "",
        param3: this.dealer_name_entry,
        param4: this.dealer_gst,
        param5: this.reg_add2_entry,
        param6: this.reg_add2_entry,
        param7: this.selectcity,
        param8: this.selectstate,
        param9: this.con_name,
        param10: this.con_email,
        param11: this.con_mobno,
        param12: this.alt_mobno,
        param13: "0",
        param14: this.selectdistributor,
        param15: this.loginNameText,
        param16: this.loginpasswordText,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }

      this.dealerService.InsertdealerEditAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        //  alert(data);
        this.datafromrespo = data.entity;

        if (data.statuscode == 200) {
          $("#SuccessModalEntry").modal('show');
          this.closemodal(); this.clearfunction(); this.DealerDetail();
        }
        else {
          $("#ErrorModalEntry").modal('show');
        }
      });
    }

  }

  DealerDetail() {

    this.p = 1; this.pagecount = 10;


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
    try { AddLoader() } catch (e) { alert(e) }

    // Distributor Detail Grid BIND LIST    
    this.dealerService.DealerDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        let resdata = data;
        if (resdata['statuscode'] == '200') {

          let resdatadrp = resdata['entity'];
          // Convert to JSON  
          this.stringifiedData = JSON.stringify(resdatadrp);
          // Parse from JSON  
          this.parsedJson = JSON.parse(this.stringifiedData);
          let resdatadev = resdata['list'];

          // Convert to JSON  
          this.stringifiedDataList = JSON.stringify(this.parsedJson.list);
          // Parse from JSON  
          this.parsedJsonList = JSON.parse(this.stringifiedDataList);

          this.dealerdetail$ = this.parsedJsonList;
          this.nop = this.parsedJson;
          this.count = data.entity.count;
          this.viewcount = data.entity.viewCount;

        }



      });
  }

  closemodal() {
    $("#exampleModal").modal('hide');
    $('.modal-backdrop.show').css('display', 'none');

  }


  clearfunction() {

    this.distributorentry = ""; this.selectdistributor = ""; this.dealer_name_entry = ""; this.dealer_gst = ""; this.stateentry = "";
    this.selectstate = ""; this.selectcity = ""; this.reg_add2_entry = ""; this.con_name = ""; this.con_mobno = ""; this.alt_mobno = "";
    this.con_email = ""; this.loginNameText = ""; this.loginpasswordText = "";

  }

}
