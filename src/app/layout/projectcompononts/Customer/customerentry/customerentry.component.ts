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
  selector: 'app-customerentry',
  templateUrl: './customerentry.component.html',
  styleUrls: ['./customerentry.component.css']
})
export class CustomerentryComponent implements OnInit {
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;

  count: number; viewcount: number;
  public loading = false; p: number; pagecount: number;
  CustRemarktext: string;
  ListOfDistributor$: Object; ListOfDealer$: Object; ListOfState$: Object; ListOfCity$: Object; CustomerDetails$: Object; ListOfCustomerCategory$: Object; ListOfCustomerType$: Object;

  datafromrespo: string;

  ListOfState = []; ListOfCity = []; ListOfDistributor = []; ListOfDealer = []; ListOfCustomerCategory = []; ListOfCustomerType = [];

  personnameText: string; personnoText: string; personaltnoText: string; personemailText: string; AreaText: string; landmarkText: string; regaddressText: string; pincodeText: string;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };
  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService, private listService: ListService, private cryptService: CryptService, private router: Router, private customerService: CustomermodelService) {
    var rollid = sessionStorage.getItem("rid");
    //alert(rollid);
    if (rollid == '12') {
      $('#distidcheck').hide();
      $('#dealeridcheck').show();
    }
    else if (rollid == '13') {
      $('#distidcheck').hide();
      $('#dealeridcheck').hide();
    }
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
        $("#saveentry").prop('disabled', true);
        $("#preventry").prop('disabled', true);
        $("#nextentry").prop('disabled', false);


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
          $("#preventry").prop('disabled', true);
          $("#saveentry").prop('disabled', true);

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
          $('#distrbutorname').focus();
          $('#msg_errorentry').html('').hide();

          var isValid = true;
          var Distname = $('#distributordummyentry').val();
          var DealerName = $('#dealerdummyentry').val();
          // alert("sdjb"+distributorname);
          var customertype = $('#customertypedummyentry').val();
          var customercatagory = $('#customercategdummyentry').val();

          var companyname = $('#companynameentry').val();
           if (!Distname && Distname.length <= 0) {
            isValid = false;
            //alert(""+Distname);
            $('#msg_errorentry').html('Please Select Distributor').show();
            $('#distrbutornameentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

          }
          else if (!DealerName && DealerName.length <= 0) {
            // validate short code
            isValid = false;
            $('#msg_errorentry').html('Please Select Dealer').show();
            $('#dealernameentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          else if (!customertype && customertype.length <= 0) {
            // validate Official No
            isValid = false;
            $('#msg_errorentry').html('Please Select Customer Type').show();
            $('#customertypeentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

          } else if (!customercatagory && customercatagory.length <= 0) {
            // validate Official No
            isValid = false;
            $('#msg_errorentry').html('Please Select Customer Catagory').show();
            $('#customercategoryentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

          }
          else if (customercatagory == "ezIfxL4tox2A8vxy2Q8BrQ==") {
            if (!companyname && companyname.length <= 0 || companyname.length < 3) {
              // validate Official Email
              isValid = false;
              $('#msg_errorentry').html('Please Enter Company Name').show();
              $('#companynameentry').focus();
              setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

            }
          }
 
          if (isValid && index == 1) {

            $('#msg_errorentry').html('').hide();
            $("#stepentry-14").hide()
            $("#stepentry-15").show();
            $("#saveentry").prop('disabled', false);
            $("#nextentry").prop('disabled', true);
            $('#pername').focus();
            setClassesentry(index, steps);

            isValid = false;
          }
          return isValid;
        }


        function validateentryStep2(index, steps) {
          $('#pername').focus();
  $('#msg_error_contactentry').html('').hide();
          var isValid = true;
          /* var personname = $('#pername').val();
          var contactNo = $('#contactNo').val();
          var alterNo = $('#alternateNoentry').val(); 

          var cemail = $('#custemailid').val();
          var atposition=cemail.indexOf("@");  
          var dotposition=cemail.lastIndexOf("."); 

          var devicetype = $('#devicetypedummy').val();
          var regaddress = $('#regaddressnewentry').val();
          var state = $('#stateentry').val();
          var city = $('#cityname').val();
          var pinCodeNo = $('#pincodenoentry').val(); 
          var arid = $('#areaid').val();  
          var landid = $('#landmarkid').val();
          var remid = $('#custremarkid').val();

          // Validate Contact Name
          if (!personname && personname.length <= 0 || personname.length < 3) {
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Customer Name.').show();
            $('#pername').focus();
          } else
            if (!contactNo && contactNo.length <= 0 || contactNo.length < 10) {
              isValid = false;
              $('#msg_error_contactentry').html('Please Enter Contact Number.').show();
              $('#contactNo').focus();
            }     
            else
            if (!alterNo && alterNo.length <= 0 || alterNo.length < 10) {
              isValid = false;
              $('#msg_error_contactentry').html('Please Enter Alternate Contact Number.').show();
              $('#alternateNoentry').focus();
            }
            else if(atposition<1 || dotposition<atposition+2 || dotposition+2>=cemail.length){
              // validate GST No
              isValid = false;
              $('#msg_error_contactentry').html('Please Enter Valid Email.').show(); 
              $('#officialEmailentry').focus(); 
              setTimeout(function(){document.getElementById("msg_error_contactentry").style.display="none";}, 3000);  
             
            }
            else if (state == null || state == '') {
              // validate state
              isValid = false;
              $('#msg_error_contactentry').html('Please Select State.').show();
              $('#state').focus();

            } else if (city == null || city == '') {
              // validate city
              isValid = false;
              $('#msg_error_contactentry').html('Please Select City.').show();
              $('#city').focus();
            }   
            else if (arid.length < 5) {
              // validate city
              isValid = false;
              $('#msg_error_contactentry').html('Please Enter Area.').show();
              $('#areaid').focus();
            }  
            else if (landid.length < 5) {
              // validate city
              isValid = false;
              $('#msg_error_contactentry').html('Please Enter Landmark.').show();
              $('#landmarkid').focus();
            }
            else
              if (!regaddress && regaddress.length <= 0 || regaddress.length < 5) {
                // validate Alternate Number
                isValid = false;
                $('#msg_error_contactentry').html('Please Enter Reg Address.').show();
                $('#regaddressnewentry').focus();
              } else
                if (!pinCodeNo && pinCodeNo.length <= 0 || pinCodeNo.length < 5) {
                  // validate Alternate Number
                  isValid = false;
                  $('#msg_error_contactentry').html('Please Enter Valid Pincode No.').show();
                  $('#pincodenoentry').focus();
                }  
                else
                if (remid.length < 5) {
                  // validate Alternate Number
                  isValid = false;
                  $('#msg_error_contactentry').html('Please Enter Remark.').show();
                  $('#custremarkid').focus();
                } */

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
    this.EncryptPageUrl();
    this.Distributorlist();
    // this.Dealerlist();
    this.CustomerTypeList();
    this.CustomerCategorylist(); this.clearfunction();
  }
  EncryptPageName() {
    this.cryptService.encrypt("Customer Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    // console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    // console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }

  Distributorlist() {

    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.DistributorListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfDistributor = data.entity.list;

      });
  }
  Dealerlist() {

    let keydata = {
      param1: this.selectdistributor,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.DealerListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfDealer = data.entity.list;


        // let statelist = resdatalist;

        // this.ListOfDealer$ = statelist;

        this.loading = false;

      });
  }
  CustomerCategorylist() {

    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.CustomerCategoryListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfCustomerCategory = data.entity.list;


        // let customercatlist = resdatalist;

        // this.ListOfCustomerCategory$ = customercatlist;

        this.loading = false;

      });
  }
  CustomerTypeList() {

    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.CustomerTypeListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfCustomerType = data.entity.list;


        // let custlistlist = resdatalist;

        // this.ListOfCustomerType$ = custlistlist;

        this.loading = false;

      });
  }

  /*-------------List of City Api ---------------*/
  stateText: any;
  cityText: any;
  Citylist() {
    this.selectstate = this.stateText.param1;
    //  console.log(this.stateText.param2);
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
        // console.log("wekcome_ "+resdata);

        //   let citylist = resdatalist;
        // //  let resdatadev = resdata['list'];
        // //  console.log(resdatadev);
        // //  console.log(citylist);
        //   this.ListOfCity$ = citylist;




        this.loading = false;

      });
  }
  /*-------------List of City Api ---------------*/

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

        this.loading = false;

      });
  }
  getCityId() {
    this.selectcity = this.cityText.param1;

  }
  /*-------------List of State Api ---------------*/
  Customertype: string; compnameText: string;

  custtypeText: any;
  selectcusttype: string;


  selectdistributot: string;
  distibutorText: any;
  selectdealer: string;
  dealerText: any;
  selectcustomercatagory: string;
  custcategoryText: any;
  selectstate: string;
  selectcity: string;

  vensavebtn() {
    this.selectdistributot = this.distibutorText.param1;
    this.selectdealer = this.dealerText.param1;
    this.selectcusttype = this.custtypeText.param1;
    this.selectcustomercatagory = this.custcategoryText.param1;
    this.selectstate = this.stateText.param1;
    this.selectcity = this.cityText.param1;
    $('#msg_error_contactentry').html('').hide();
    var isValid = true;
    var custname = $('#pernameentry').val();
    var contactNo = $('#contactNoentry').val();
    var alterNo = $('#alternateNoentry').val();

    var cemail = $('#custemailid').val();
    var atposition = cemail.indexOf("@");
    var dotposition = cemail.lastIndexOf(".");

    var devicetype = $('#devicetypedummy').val();
    var regaddress = $('#regaddressnewentry').val();
    var state = $('#statename').val();
    var city = $('#cityname').val();
    var pinCodeNo = $('#pincodenoentry').val();
    var arid = $('#areaid').val();
    var landid = $('#landmarkid').val();
    var remid = $('#custremarkid').val();
    // alert(personname);
    this.compnameText = this.compnameText.substring(0, 1).toUpperCase() + this.compnameText.substring(1);
    this.personnameText = this.personnameText.substring(0, 1).toUpperCase() + this.personnameText.substring(1);
    this.AreaText = this.AreaText.substring(0, 1).toUpperCase() + this.AreaText.substring(1);
    this.landmarkText = this.landmarkText.substring(0, 1).toUpperCase() + this.landmarkText.substring(1);
    this.regaddressText = this.regaddressText.substring(0, 1).toUpperCase() + this.regaddressText.substring(1);
    this.CustRemarktext = this.CustRemarktext.substring(0, 1).toUpperCase() + this.CustRemarktext.substring(1);



    // Validate Contact Name
    if (!custname && custname.length <= 0 || custname.length < 3) {
      isValid = false;
      $('#msg_error_contactentry').html('Please Enter Customer Name.').show();
      $('#pernameentry').focus();
      setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
    } else
      if (!contactNo && contactNo.length <= 0 || contactNo.length < 10) {
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Contact Number.').show();
        $('#contactNoentry').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else if ((alterNo.length < 10) && (alterNo != null && alterNo != '')) {
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Alternate Contact Number.').show();
        $('#alternateNoentry').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else if ((atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= cemail.length) && (cemail != null && cemail != '')) {
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Valid Email.').show();
        $('#officialEmailentry').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else if (state == null || state == '') {
        // validate state
        isValid = false;
        $('#msg_error_contactentry').html('Please Select State.').show();
        $('#statename').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

      } else if (city == null || city == '') {
        // validate city
        isValid = false;
        $('#msg_error_contactentry').html('Please Select City.').show();
        $('#city').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else if ((arid.length < 5) && (arid != null && arid != '')) {
        // validate city
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Area.').show();
        $('#areaid').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else if ((landid.length < 5) && (landid != null && landid != '')) {
        // validate city
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Landmark.').show();
        $('#landmarkid').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else if (!regaddress && regaddress.length <= 0 || regaddress.length < 5) {
        // validate Alternate Number
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Reg Address.').show();
        $('#regaddressnewentry').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else if (!pinCodeNo && pinCodeNo.length <= 0 || pinCodeNo.length < 5) {
        // validate Alternate Number
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Valid Pincode No.').show();
        $('#pincodenoentry').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else if ((remid.length < 5) && (remid != null && remid != '')) {
        // validate Alternate Number
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Remark.').show();
        $('#custremarkid').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else {
        let dataL = {
          param1: this.CustRemarktext,
          param2: "",
          param3: this.personnameText, param4: this.selectcusttype, param5: this.personnoText, param6: this.personemailText, param7: this.personaltnoText, param8: this.regaddressText, param9: this.selectcity, param10: this.selectstate,
          param11: this.pincodeText, param12: this.selectdistributot, param13: this.selectdealer, param14: this.compnameText, param15: this.selectcustomercatagory, param16: "admin", param17: "admin@123",
          param18: this.landmarkText, param19: this.AreaText,
          pageID: "7",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
        }
        try { AddLoader() } catch (e) { alert(e) }
        this.customerService.InsertcustomerAPI(dataL).subscribe((data) => {
          try { RemoveLoader() } catch (e) { alert(e) }
          //  alert(data);
          this.datafromrespo = data.entity;

          if (this.datafromrespo == 'Successfully Saved.') {
            $("#SuccessModalEntry").modal('show');
            this.closemodal();
            this.clearfunction();
          }
          else {
            $("#ErrorModalEntry").modal('show');
          }

          // Ishant - Response messages

          /*  if(this.datafromrespo == 'Success Response')
           {
           $("#SuccessModalEntry").modal('show');this.clearfunction();this.closemodal();
           }
           else if(this.datafromrespo == 'API Validation Error')
           {
           $("#ErrorModalEntry").modal('show');this.closemodal();
           }
           else if(this.datafromrespo == 'INTERNAL SERVER ERROR')
           {
           $("#ErrorModalEntry").modal('show');this.closemodal();
           }
           else if(this.datafromrespo == 'DB Validation Error')
           {
           $("#ErrorModalEntry").modal('show');this.closemodal();
           }
           else if(this.datafromrespo == 'DB Data Validation Error')
           {
           $("#ErrorModalEntry").modal('show');this.closemodal();
           }
           else
           {
            $("#ErrorModalEntry").modal('show');
           } */
        });
      }
  }

  closemodal() {
    $("#exampleModal").modal('hide');
    $('.modal-backdrop.show').css('display', 'none');
  }
  selectdistributor: string; selectcustcatog: string;

  Distributorid() {
    this.selectdistributor = this.distibutorText.param1;
    this.Dealerlist()
  }
  Dealerid() {
    this.selectdealer = this.dealerText.param1;
  }
  custtype() {
    this.selectcusttype = this.custtypeText.param1;
  }
  custcategname: string;
  custcategory() {

    this.selectcustcatog = this.custcategoryText.param1;
    if (this.selectcustcatog == "ezIfxL4tox2A8vxy2Q8BrQ==") {
      $('#starsymbol').show();
    } else {
      $('#starsymbol').hide();
    }
  }

  clearfunction() {
    this.distibutorText = ""; this.selectdistributor = ""; this.dealerText = ""; this.selectdealer = "";
    this.custtypeText = ""; this.selectcusttype = ""; this.custcategoryText = ""; this.selectcustcatog = "";
    this.compnameText = ""; this.personnameText = ""; this.personnoText = ""; this.personaltnoText = "";
    this.personemailText = ""; this.stateText = ""; this.cityText = ""; this.AreaText = ""; this.landmarkText = "";
    this.regaddressText = ""; this.pincodeText = ""; this.CustRemarktext = "";
  }

}
