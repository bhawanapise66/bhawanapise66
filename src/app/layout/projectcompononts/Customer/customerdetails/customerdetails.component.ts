import { CustomermodelService } from './../../../../APIService/customermodel.service';
import { Router } from '@angular/router';
//import { DevicemodelService } from './../../../../../devicemodel.service';
import { ListService } from './../../../../../list.service';
import { PostService } from './../../../../../post.service';
import { Paramcls } from './../../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as xlsx from 'xlsx';
import * as $ from 'jquery';
import { CryptService } from './../../services/crypt.service';
import { PdfService } from '../../services/pdf.service';
import { ExportToExcelService } from './../../services/export-to-excel.service';
//import * as $ from 'jquery';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-customerdetails',
  templateUrl: './customerdetails.component.html',
  styleUrls: ['./customerdetails.component.css']
})
export class CustomerdetailsComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  timer: any;
  pageUrl = this.router.url;
  selectRowsText: string = "10";
  private _success = new Subject<string>(); successMessageUpdate: string;
  public loading = false; p: number; pagecount: number; count: number; viewcount: number;
  key: string = 'name'; reverse: boolean = true;
  CustRemarktext: string; filter: string; deleteText: string; datafromrespo: string;


  cust_email: string; cust_mobno: string; cust_state: any; cust_city: any; cust_alt_mobno: string; reg_add: string; pin_code: string;
  customer_id: string; submitted=false; remarkText:string;

  ListOfDistributor$: Object; ListOfDealer$: Object; ListOfState$: Object; ListOfCity$: Object; CustomerDetails$: any; ListOfCustomerType$: Object; ListOfCustomerCategory$: Object;

  custtypeText: string; custcategoryText: string; company_name: string; excelpdfDetails$: any; pdfData: any = [];


  distibutorText: string; dealerText: string; Customertype: string; compnameText: string;

  ListOfState = []; ListOfCity = []; ListOfDistributor = []; ListOfDealer = []; ListOfCustomerCategory = []; ListOfCustomerType = [];


  personnameText: string; personnoText: string; personaltnoText: string; personemailText: string; cityText: string; AreaText: string = ''; landmarkText: string = ''; regaddressText: string; pincodeText: string;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };

  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService, private listService: ListService,
    private cryptService: CryptService, private router: Router, private customerService: CustomermodelService
    , public pdfservice: PdfService, private excelService: ExportToExcelService) { }


  ngOnInit() {
    /* ------------------------------- Wizards start Ts------------------------------------------------- */
    (function ($) {
      $(document).ready(function () {
        $('#myModalwizard').on('shown.bs.modal', function () {
          $('#distrbutorname').focus();
        })
      });
    })(jQuery);

    this.count = 0;
    this.viewcount = 0;
    (function ($) {
      $(document).ready(function () {
        $('#vendorName').focus();
        $("#save").prop('disabled', true);
        $("#step-14").show();
        $("#step-15").hide();
        $("#step-16").hide();
        $("#step-17").hide();
        function setClasses(index, steps) {
          if (index < 0 || index > steps) return;
          if (index == 0) {
            $("#prev").prop('disabled', true);
          } else {
            $("#prev").prop('disabled', false);
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
            // alert("submit the form?!?")
          } else {
            var step;
            try {
              step = $(".step-wizard ul li.active div.step")[0].innerText;
            } catch (error) {
              step = $(".step-wizard ul li div.step")[0].innerText;
            }

            var steps = $(".step-wizard ul li").length;
            validateAllSteps(step, steps - 1);
            //setClasses(step, steps - 1);
          }
        });

        // initial state setup
        setClasses(0, $(".step-wizard ul li").length);

        function displayreviousSection(index) {

          $("#next").prop('disabled', false);
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

        function validateStep1(index, steps) {
          $('#distrbutorname').focus();
          $('#msg_error').html('').hide();
          // $('#msg_vendorName').html('').hide();
          // $('#msg_shortcode').html('').hide();
          // $('#msg_OfficialNo').html('').hide();
          // $('#msg_Officialemail').html('').hide();
          var isValid = true;
          // var Distname = $('#distrbutorname').val();
          var Distname = $('#distdummyupdate').val();
          // var DealerName = $('#dealername').val();
          var DealerName = $('#dealerdummyupdate').val();
          // alert("sdjb"+distributorname);
          // var customertype = $('#customertype').val();
          var customertype = $('#customertypedummyupdate').val();

          // var companyname = $('#companyname').val();
          var companyname = $('#companyname').val();

          var customercatagory = $('#customercategory').val();

          var customercatagoryupdate01 = $('#customercategdummyupdate1').val();
          //Validate Vendor Name
          if (Distname.length <= 0) {
            isValid = false;
            //alert(""+Distname);
            $('#msg_error').html('Please Select Distributor Name').show();
            $('#distrbutorname').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);


          } else if (DealerName.length <= 0) {
            // validate short code
            isValid = false;
            $('#msg_error').html('Please Select Dealer Name').show();
            $('#dealername').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);

          } else if (customertype.length <= 0) {
            // validate Official No
            isValid = false;
            $('#msg_error').html('Please Select Customer Type').show();
            $('#customertype').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);

          } else if (customercatagory == null) {
            // validate Official Email
            isValid = false;
            $('#msg_error').html('Please Select Customer Catagory').show();
            $('#customercategory').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);

          } else if (customercatagoryupdate01 == "ezIfxL4tox2A8vxy2Q8BrQ==") {
            if (!companyname && companyname.length <= 0) {
              // validate Official Email
              isValid = false;
              $('#msg_error').html('Please Enter Company Name').show();
              $('#companyname').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);

            }
          }

          if (isValid && index == 1) {

            // $('#msg_vendorName').html('').hide();
            // $('#msg_shortcode').html('').hide();
            // $('#msg_OfficialNo').html('').hide();
            // $('#msg_Officialemail').html('').hide();
            $('#msg_error').html('').hide();
            $("#step-14").hide()
            $("#step-15").show();
            $("#step-16").hide();
            $("#step-17").hide();

            setClasses(index, steps);
            $("#save").prop('disabled', false);
            $("#next").prop('disabled', true);
            $('#pername').focus();
            isValid = false;
          }
          return isValid;
        }


        function validateStep2(index, steps) {
          $('#pername').focus();

          // $('#msg_contactNo').html('').hide();
          // $('#msg_alternateNo').html('').hide();
          // $('#msg_State').html('').hide();
          // $('#msg_city').html('').hide();
          $('#msg_error_contact').html('').hide();
          var isValid = true;
          var personname = $('#pername').val();
          var contactNo = $('#contactNo').val();
          var alternateNo = $('#alternateNo').val();
          var regaddress = $('#regaddressnew').val();
          var state = $('#state').val();
          var city = $('#city').val();
          var pinCodeNo = $('#pincodeno').val();
          // Validate Contact Name
          if (!personname && personname.length <= 0) {
            isValid = false;
            $('#msg_error_contact').html('Please Enter Person Name').show();
            $('#pername').focus();
          } else
            if (!contactNo && contactNo.length <= 0) {
              isValid = false;
              $('#msg_error_contact').html('Please Enter Contact Number').show();
              $('#contactNo').focus();
            }

            else if (state == null) {
              // validate state
              isValid = false;
              $('#msg_error_contact').html('Please Enter State').show();
              $('#state').focus();

            } else if (city == null) {
              // validate city
              isValid = false;
              $('#msg_error_contact').html('Please Enter City').show();
              $('#city').focus();
            }
            else
              if (!regaddress && regaddress.length <= 0) {
                // validate Alternate Number
                isValid = false;
                $('#msg_error_contact').html('Please Enter Reg Address').show();
                $('#regaddressnew').focus();
              } else
                if (!pinCodeNo && pinCodeNo.length <= 0) {
                  // validate Alternate Number
                  isValid = false;
                  $('#msg_pincode').html('Please Enter Valid Pincode No.').show();
                  $('#alternateNo').focus();
                }

          if (isValid && index == 2) {

            $('#msg_contactNo').html('').hide();
            $('#msg_alternateNo').html('').hide();
            $('#msg_state').html('').hide();
            $('#msg_city').html('').hide();
            $("#step-15").hide();
            $("#step-14").hide()
            $("#step-16").show();
            $("#step-17").hide();
            $('#accountNo').focus();

            $("#save").prop('disabled', false);
            $("#next").prop('disabled', true);
            setClasses(index, steps);
            isValid = false;
          }

          return isValid;
        }


        function validateStep3(index, steps) {

          $('#accountNo').focus();
          var isValid = true;
          var accountNo = $('#accountNo').val();
          $('#msg_accountNo').html('').hide();
          // Validate Account No
          if (!accountNo && accountNo.length <= 0) {
            isValid = false;
            $('#msg_accountNo').html('Please Enter Account Number').show();
            $('#accountNo').focus();
          }
          if (isValid && index == 3) {

            $('#msg_contactNo').html('').hide();
            $("#step-14").hide();
            $("#step-15").hide();
            $("#step-16").hide();
            $("#step-17").show();

            setClasses(index, steps);
            $("#next").prop('disabled', true);
            $("#save").prop('disabled', false);
            isValid = false;
          }
          return isValid;
        }
        function validateStep4(index, steps) {
          // alert("success");
          return true;
        }
      });
    })(jQuery);
    this.EncryptPageName();
    this.EncryptPageUrl();

    this.CustomerDetail(); this.clearfunction();

    /* ------------------------------- Wizards end Ts------------------------------------------------- */
  }
  EncryptPageName() {
    this.cryptService.encrypt("Customer Details")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }

  getDistId() {
    this.selectdistributoridreturn = this.distributor_id.param1;
  }
  getDealerId() {
    this.selectdealeridreturn = this.dealer_id.param1
  }

  getCtypeId() {
    this.selectcusttypereturn = this.customer_type.param1;
  }
  editpageform() {

    if (this.selectcustcatogreturn == "organization") {
      this.selectcustcatogreturn1 = "ezIfxL4tox2A8vxy2Q8BrQ==";
      $('#starsymbolname').show();
    } else {
      $('#starsymbolname').hide();
    }
    document.getElementById("backdetailsbtn").style.display = "block";
    document.getElementById("editbtn").style.display = "none";
    // document.getElementById("customerdtls").style.display="none";
    // document.getElementById("bankdtls").style.display="none";
    document.getElementById("vendordtls").style.display = "none";
    //  document.getElementById("rev2btn").style.display="none";
    //  document.getElementById("revbtn").style.display="none";
    //  document.getElementById("nextviewbtn").style.display="none";
    //  document.getElementById("next2viewbtn").style.display="none";
    document.getElementById("container").style.display = "block";
    document.getElementById("modelfooter").style.display = "block";
    document.getElementById("uvmd").style.display = "block";
    document.getElementById("vmd").style.display = "none";
    this.Distributorlist();
    this.Dealerlist();
    this.Citylist();
    this.CustomerTypeList();
    this.CustomerCategorylist();
    this.Statelist();
  }
  backdetailsbtn() {
    document.getElementById("uvmd").style.display = "none";
    document.getElementById("vmd").style.display = "block";
    document.getElementById("backdetailsbtn").style.display = "none";
    document.getElementById("editbtn").style.display = "block";
    // document.getElementById("customerdtls").style.display="block";
    // document.getElementById("bankdtls").style.display="block";
    document.getElementById("vendordtls").style.display = "block";
    document.getElementById("modelfooter").style.display = "none";
    //  document.getElementById("rev2btn").style.display="none";
    //  document.getElementById("revbtn").style.display="none";
    //  document.getElementById("nextviewbtn").style.display="block";
    //  document.getElementById("next2viewbtn").style.display="none";
    document.getElementById("container").style.display = "none";
    //  document.getElementById("bankdtls").style.display="none";
    //  document.getElementById("customerdtls").style.display="none";
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


        // let statelist = resdatalist;

        // this.ListOfDistributor$ = statelist;

        this.loading = false;

      });
  }
  Dealerlist() {

    let keydata = {
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
  /*-------------List of City Api ---------------*/
  statedummyupdate:string;
  Citylist() {
    this.statedummyupdate = this.cust_state.param1;
    let keydata = {
      param1: this.statedummyupdate,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.SelectCityListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.ListOfCity = data.entity.list;

        this.loading = false;

      });
  }
  /*-------------List of City Api ---------------*/
  getCityId() {
    this.selectcityreturn = this.cust_city.param1;
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
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);

        //   let statelist = resdatalist;
        // //  let resdatadev = resdata['list'];
        // //  console.log(resdatadev);
        // //  console.log(statelist);
        //   this.ListOfState$ = statelist;

        this.loading = false;

      });
  }

  /*-------------List of State Api ---------------*/
  customer_name: string;
  distributor_id: any;

  selectdistributot: string;
  // distibutorText:any;
  dealer_id: any;
  selectdealer: string;
  // dealer_name:any;
  customer_type: any;
  selectcustomertype: string;

  cust_catagory: any;
  selectcustomercatagory: string;
  // custcategoryText:any;
  selectstate: string;
  selectcity: string;

  vensaveeditbtn() {
    // this.selectdistributot = this.distributor_name.param2;
    // this.selectdealer = this.dealer_name.param2;
    // this.selectcustomercatagory = this.cust_catagory.param2;
    // this.selectcustomertype = this.customer_type.param2;
    // this.selectstate = this.cust_state.param2;
    // this.selectcity = this.cust_city.param2;
    this.submitted = true;
    var selectdistributorid2 = this.getid(this.ListOfDistributor, this.distributor_id);
    var selectdealerid2 = this.getid(this.ListOfDealer, this.dealer_id);
    var selectcustomercatagoryid2 = this.getid(this.ListOfCustomerCategory, this.customer_catog);
    var selectcustomertypeid2 = this.getid(this.ListOfCustomerType, this.customer_type);
    var selectstateid2 = this.getid(this.ListOfState, this.cust_state);
    var selectcityid2 = this.getid(this.ListOfCity, this.cust_city);

    $('#msg_error_contact').html('').hide();
    var isValid = true;

    var custname = $('#pernameup').val();
    var contactNo = $('#contactNoup').val();
    var alterNo = $('#alternateNoup').val();

    var cemail = $('#officialEmailup').val();
    var atposition = cemail.indexOf("@");
    var dotposition = cemail.lastIndexOf(".");

    var devicetype = $('#devicetypedummy').val();
    var regaddress = $('#regaddressup').val();
    var state = $('#statedummyupdate').val();
    var city = $('#citydummyupdate').val();
    var pinCodeNo = $('#pincodenoup').val();
    var arid = $('#areaup').val();
    var landid = $('#landmarkup').val();
    var remid = $('#custremarkup').val();

    if (this.company_name != null) {
      this.company_name = this.company_name.substring(0, 1).toUpperCase() + this.company_name.substring(1);
    }
    this.customer_name = this.customer_name.substring(0, 1).toUpperCase() + this.customer_name.substring(1);
    if (arid.length > 0) {
      this.AreaText = this.AreaText.substring(0, 1).toUpperCase() + this.AreaText.substring(1);
    }
    if (landid.length > 0) {
      this.landmarkText = this.landmarkText.substring(0, 1).toUpperCase() + this.landmarkText.substring(1);
    }
    this.reg_add = this.reg_add.substring(0, 1).toUpperCase() + this.reg_add.substring(1);
    this.CustRemarktext = this.CustRemarktext.substring(0, 1).toUpperCase() + this.CustRemarktext.substring(1);


    // Validate Contact Name
    if (!custname && custname.length <= 0 || custname.length < 3) {
      isValid = false;
      $('#msg_error_contact').html('Please Enter Customer Name.').show();
      $('#pernameup').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
    } else if (!contactNo && contactNo.length <= 0 || contactNo.length < 10) {
      isValid = false;
      $('#msg_error_contact').html('Please Enter Contact Number.').show();
      $('#contactNoup').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
    }
    else if ((alterNo.length < 10) && (alterNo != null && alterNo != '')) {
      isValid = false;
      $('#msg_error_contact').html('Please Enter Alternate Contact Number.').show();
      $('#alternateNoup').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
    }
    else if ((atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= cemail.length) && (cemail != null && cemail != '')) {
      isValid = false;
      $('#msg_error_contact').html('Please Enter Valid Email.').show();
      $('#officialEmailup').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
    }
    else if (state == null || state == '') {
      // validate state
      isValid = false;
      $('#msg_error_contact').html('Please Select State.').show();
      $('#stateup').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

    } else if (city == null || city == '') {
      // validate city
      isValid = false;
      $('#msg_error_contact').html('Please Select City.').show();
      $('#cityup').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
    }
    else if ((arid.length < 5) && (arid != null && arid != '')) {
      // validate city
      isValid = false;
      $('#msg_error_contact').html('Please Enter Area.').show();
      $('#areaup').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
    }
    else if ((landid.length < 5) && (landid != null && landid != '')) {
      // validate city
      isValid = false;
      $('#msg_error_contact').html('Please Enter Landmark.').show();
      $('#landmarkup').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
    }
    else if (!regaddress && regaddress.length <= 0 || regaddress.length < 5) {
      // validate Alternate Number
      isValid = false;
      $('#msg_error_contact').html('Please Enter Reg Address.').show();
      $('#regaddressup').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
    }
    else if (!pinCodeNo && pinCodeNo.length <= 0 || pinCodeNo.length < 5) {
      // validate Alternate Number
      isValid = false;
      $('#msg_error_contact').html('Please Enter Valid Pincode No.').show();
      $('#pincodenoup').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
    }
    else if ((remid.length < 5) && (remid != null || remid != '')) {
      // validate Alternate Number
      isValid = false;
      $('#msg_error_contact').html('Please Enter Remark.').show();
      $('#custremarkup').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
    }

    else {
      let dataL = {
        param1: this.CustRemarktext,
        param2: this.customer_id,
        param3: this.customer_name, param4: selectcustomertypeid2, param5: this.cust_mobno, param6: this.cust_email, param7: this.cust_alt_mobno, param8: this.reg_add, param9: selectcityid2, param10: selectstateid2,
        param11: this.pin_code, param12: selectdistributorid2, param13: selectdealerid2, param14: this.company_name, param15: selectcustomercatagoryid2, param16: "", param17: "",
        param18: this.landmarkText, param19: this.AreaText,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }

      this.customerService.UpdatecustomerEditAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        //  alert(data);
        this.datafromrespo = data.entity;

        // if(this.datafromrespo == 'Successfully updated.')
        // {
        // $("#successmodel").modal('show');
        // this.CustomerDetail();
        // }
        // else
        // {
        //  $("#notifymodel").modal('show');
        // }

        if (this.datafromrespo == 'Successfully updated.') {
          $("#SuccessModal").modal('show');
          this.CustomerDetail(); this.clearfunction();
        }
        else {
          $("#ErrorModal").modal('show');
        }
      });
    }
  }


  // customer details function 

  CustomerDetail() {

    this.loading = true;

    this.p = 1; this.pagecount = 10;
    //  console.log("p" + this.p);

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
    this.customerService.CustomerDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        let resdatalist = data.entity.responsedatalist;
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);

        let vendorlist = resdatalist;

        this.CustomerDetails$ = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
        // console.log(this.count);

      });
  }

  /*---------------- cunstomer details function end  --------------------*/
  /*---------------Customer search start --------------------------*/

  searchdata() {
    var search = $('#searchData').val();
    this.loading = true;

    this.p = 1; this.pagecount = 10;
    //  console.log("p" + this.p);

    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: search,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    // Distributor Detail Grid BIND LIST    
    this.customerService.CustomerDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        let resdatalist = data.entity.responsedatalist;


        let vendorlist = resdatalist;

        this.CustomerDetails$ = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
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

  SelectRows() {

    var search = $('#searchData').val();
    var selectrow = $('#selectrow1').val();
    // alert(selectrow);
    this.loading = true;
    // alert("selectrow "+ selectrow);
    this.p = 1; this.pagecount = selectrow;
    //  console.log("p" + this.p);

    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: search,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }


    // Distributor Detail Grid BIND LIST    
    this.customerService.CustomerDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        let resdatalist = data.entity.responsedatalist;


        let vendorlist = resdatalist;

        this.CustomerDetails$ = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }

  customer_catog: any; dealeridspan:string; distributoridspan:string;
  setdata(com: Paramcls) {
    console.log(com)
    
    this.customer_id = com.param1;
    this.distributor_id = com.param14;
    this.dealer_id = com.param15;

    this.distributoridspan = com.param18;
    this.dealeridspan = com.param17;

    this.customer_type = com.param16;
    this.customer_catog = com.param3;
    this.customer_name = com.param2;
    this.company_name = com.param11;
    // this.cust_email = com.param13;
    // this.con_name = com.param15; 

    this.cust_email = com.param5;
    this.cust_mobno = com.param4;
    this.cust_alt_mobno = com.param6;
    this.cust_state = com.param9;
    this.cust_city = com.param8;
    this.reg_add = com.param7;
    this.pin_code = com.param10;
    this.AreaText = com.param23;
    this.landmarkText = com.param24;
    if (this.AreaText == null) { this.AreaText = '' }
    if (this.landmarkText == null) { this.landmarkText = '' }
    this.selectdistributoridreturn = this.check(this.distributor_id);
    this.selectdealeridreturn = this.check(this.dealer_id);
    this.selectcusttypereturn = this.check(this.customer_type);
    this.selectcustcatogreturn = this.check(this.customer_catog);
    //   alert(this.selectcustcatogreturn);                      individual organization

    this.selectstatereturn = this.check(this.cust_state);
    this.selectcityreturn = this.check(this.cust_city);
    this.Citylist();
    this.backdetailsbtn();

  }

  selectdistributoridreturn: string;
  selectdealeridreturn: string;
  selectcusttypereturn: string;
  selectcustcatogreturn: string;
  selectstatereturn: string;
  selectcityreturn: string;

  Refreshfunction() {
    this.filter = "";
    this.selectRowsText = "10";
    this.loading = true;

    this.p = 1; this.pagecount = 10;
    //  console.log("p" + this.p);

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
    this.customerService.CustomerDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        let resdatalist = data.entity.responsedatalist;
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);

        let vendorlist = resdatalist;

        this.CustomerDetails$ = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }

  /*------------------Search End ---------------------*/
  /* exportToPDF() {
  
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
    this.customerService.CustomerDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        
        this.PreparePDFData(data.entity.list);
        
        this.pdfservice.CreatePDFData(this.pdfData, "Customer Details");
      });
  }
  
  PreparePDFData(data) {
    let pdfTableData;
    for (let i = 0; i < data.length; i++) {
      pdfTableData = {
        "#": i + 1,
        "Distributor": data[i].param14,
        "Dealer": data[i].param15,
        "Customer Type": data[i].param18,
        "Customer Category": data[i].param3,
        "Customer Name": data[i].param2,
        "Mobile No.": data[i].param4,
        "Email Id": data[i].param5,
        "Address": data[i].param7,
        "Pincode": data[i].param10,
        "City": data[i].param8,
        "State": data[i].param9,
        "Creation Date": data[i].param16
      }
      this.pdfData.push(pdfTableData)
    };
  }
   
   excelData:any=[];
    PrepareExcelData(data) {
      this.excelData = [];
  
      for (var i = 0; i < data.length; i++) {
        try {
          var obj = {
  
            "#": i + 1,
            "Distributor": data[i].param14,
            "Dealer": data[i].param15,
           
            "Customer Type": data[i].param18,
            "Customer Category": data[i].param3,
            // "Name": data[i].param11,
            "Customer Name": data[i].param2,
            "Mobile No.": data[i].param4,
            "Email Id": data[i].param5,
            "Address": data[i].param7,
            "Pincode": data[i].param10,
            "City": data[i].param8,
            "State": data[i].param9,
            "Creation Date": data[i].param16,
      
  
          }
        } catch (e) { }
        this.excelData.push(obj);
      }
    }
  
    exportToExcel() {
      this.excelservice.ExportExcel(this.excelData, 'Customer Details', 'customerdetails');
    } */
  excelpdfDatapdf: any; excelData: any[];
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
    this.customerService.CustomerDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.excelpdfDatapdf = data.entity.responsedatalist;
        this.PrepareExcelData(this.excelpdfDatapdf);
        this.excelService.ExportExcel(this.excelData, "Customer Details", 'customerdetails')

      });
  }

  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": i + 1,



        // "Customer Type": data[i].param18,
        // "Customer Category": data[i].param3,
        // // "Name": data[i].param11,
        // "Customer Name": data[i].param2,
        // "Mobile No.": data[i].param4,
        // "Email Id": data[i].param5,
        // "Address": data[i].param7,
        // "Pincode": data[i].param10,
        // "City": data[i].param8,
        // "State": data[i].param9,
        // "Creation Date": data[i].param16,

        "Distributor": data[i]["param14"],
        "Dealer": data[i]["param15"],
        "Customer Type": data[i]["param27"],
        "Customer Category": data[i]["param3"],
        "Customer Name": data[i]["param2"],
        "Mobile No.": data[i]["param4"],
        "Email Id": data[i]["param5"],
        "Address": data[i]["param7"],
        "Pincode": data[i]["param10"],
        "City": data[i]["param8"],
        "State": data[i]["param9"]
      }
      this.excelData.push(obj);
    }
  }


  PreparepdfData()  {
    let pdfTableData;
    let dataArray = [];
 
    for (let i = 0; i < this.excelpdfDatapdf.length; i++) {
       pdfTableData = {
        "#": i + 1,
        "Customer Type": this.excelpdfDatapdf[i]["param27"],
        "Customer Category": this.excelpdfDatapdf[i]["param3"],
        "Customer Name": this.excelpdfDatapdf[i]["param2"],
        "Mobile No.": this.excelpdfDatapdf[i]["param4"],
        "Email Id": this.excelpdfDatapdf[i]["param5"],
        "Address": this.excelpdfDatapdf[i]["param7"],
        "Pincode": this.excelpdfDatapdf[i]["param10"],
        "City": this.excelpdfDatapdf[i]["param8"],
        "State": this.excelpdfDatapdf[i]["param9"]
        
      }
      dataArray.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(dataArray,"Customer Details");  
  
  }



  exportToPDF() {
//var search = $('#searchData').val();

    this.loading = true;

    this.p = 1; 
    //this.pagecount = 5;
  

    let keydata = {
      pageNo: "",
      itemsPerPage: "",
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
   try { AddLoader() } catch (e) { alert(e) }
   this.customerService.CustomerDetailsAPI(keydata).subscribe(
      (data) => {
       try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.responsedatalist;
       

        let vendorlist = resdatalist;

        this.excelpdfDatapdf = vendorlist;
       
        this.PreparepdfData();
      
        this.loading = false;
      });
  }




  CustomerpageChanged(event) {

    var selectrow = $('#selectrow1').val();
    this.p = event; this.pagecount = 10;
    //  console.log("p" + this.p);

    let keydata = {
      pageNo: this.p,
      itemsPerPage: selectrow,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    // Distributor Detail Grid BIND LIST    
    this.customerService.CustomerDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        let resdatalist = data.entity.responsedatalist;
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);

        let vendorlist = resdatalist;

        this.CustomerDetails$ = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }
  sort(key) {

    // alert(key);

    this.key = key;
    this.reverse = !this.reverse;

  }
  CustomerDeletefunction() {
    var isValid = true;
    var deleteremark = $('#cusdelremark').val();
    deleteremark = deleteremark.substring(0, 1).toUpperCase() + deleteremark.substring(1);

    // Validate Contact Name
    if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      // $('#msg_error_delete').html('Please Enter Remark').show();
      this._success.next('Please Enter Remark.');
      $('#cusdelremark').focus();
    }
    else {
      let dataL = {
        param1: deleteremark,
        param2: this.customer_id,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }
      try { AddLoader() } catch (e) { alert(e) }

      this.customerService.DeleteCustomerAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        //  alert(data);
        this.datafromrespo = data.entity;

        // if(this.datafromrespo == 'Successfully deleted.')
        // {
        // $("#successmodel").modal('show');
        // this.CustomerDetail();
        // }
        // else
        // {
        //  $("#notifymodel").modal('show');
        // }
        if (this.datafromrespo == 'Successfully deleted.') {
          $("#SuccessModal").modal('show');
          this.closemodal();
          this.CustomerDetail();

        }
        else {
          $("#ErrorModal").modal('show');
        }
      });
      // alert("error in inserting data");
    }
  }
  closemodal() {
    //alert("come ");
    this.deleteText = "";
    $("#successmodel").modal('hide');

    $('#modeldelete').modal('hide');
    $('#myModalwizard').modal('hide');

    $('.modal-backdrop.show').css('display', 'none');

  }

  check(data) {
    try {
      if (typeof data === 'object') {
        //    console.log("come in object if")
        return data.param1;
      }
      else if (data == '') {
        //    console.log("come in Else if")
      }
      else {
        //    console.log(data.length)

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
        //alert(value)
        var index = data.findIndex(x => x.param2 === value);
        //alert(index)
        return data[index].param1;
      }
    } catch (e) {
      return '';
    }

  }

  clearfunction() {
    this.distributor_id = ""; this.selectdistributoridreturn = ""; this.dealer_id = ""; this.selectdealeridreturn = "";
    this.customer_type = ""; this.selectcusttypereturn = ""; this.customer_catog = ""; this.selectcustcatogreturn = "";
    this.company_name = ""; this.customer_name = ""; this.cust_mobno = ""; this.cust_alt_mobno = ""; this.cust_email = "";
    this.cust_state = ""; this.selectstatereturn = ""; this.cust_city = ""; this.selectcityreturn = ""; this.AreaText = "";
    this.landmarkText = ""; this.reg_add = ""; this.pin_code = ""; this.CustRemarktext = "";

  }
  selectcustcatogreturn1: string;
  custcategoryfunction() {
    this.selectcustcatogreturn1 = this.customer_catog.param1;
    if (this.selectcustcatogreturn1 == "ezIfxL4tox2A8vxy2Q8BrQ==") {
      $('#starsymbolname').show();
    } else {
      $('#starsymbolname').hide();
    }
  }

}
