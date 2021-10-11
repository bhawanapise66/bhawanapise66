import { ExportToExcelService } from './../../services/export-to-excel.service';
import { DistributormodelService } from './../../../../APIService/distributormodel.service';

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
import { PdfService } from '../../services/pdf.service';

//import * as $ from 'jquery';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-distributordetails',
  templateUrl: './distributordetails.component.html',
  styleUrls: ['./distributordetails.component.css']
})
export class DistributordetailsComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;
  count: number; viewcount: number;
  key: string = 'name'; reverse: boolean = true; p: number;
  vendornewText: string; shortcodeText: string; cinnoText: string; gstText: string; officialnoText: string; officialemailText: string; supplierofText: string;

  personnameText: string; personnoText: string; personaltnoText: string; personemailText: string; stateText: string; cityText: string; regaddressText: string; pincodeText: string;
  selectRowsText: string = "10";

  AreaText: string; landmarkText: string; remarkText: string; datafromrespo: string;



  accountnoText: string; banknmText: string; branchnmText: string = ''; ifscText: string; paymntText: string;
  vendordatadetails: Object; submitted=false;

  dist_id: string; dist_name_update: string; short_code: string; vendor_cin: string; dist_gst_update: string;
  off_no: string; off_email: string; con_name_update: string; con_email_update: string; con_mobno_update: string; ven_state: string;
  reg_add_update: string; pin_code_update: string; bank_acc_update: string;
  bank_name_update: string; bank_ifsc_update: string; bank_add_update: string; company_id: string;

  deleteText: string; ListOfCity$: Object; ListOfState$: Object; resdatalist = []; ListOfState = []; ListOfCity = [];

  public loading = false; pagecount: number; stringifiedData: any; parsedJson: any; stringifiedDataList: any; parsedJsonList: any;
  nop: number; totrec: number; outorec: number; filter: any; selectRows: string; Searchvendor: string; itemsPerPage: string;
  VendorDetails$: Object;


  DistributorDetails$: any;
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  excelData: any[];
  excelpdfData$: any;
  con_altno_update: any;

  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService, private listService: ListService,
    private cryptService: CryptService, private distributorService: DistributormodelService, private router: Router
    , public pdfservice: PdfService, private excelService: ExportToExcelService) { }

  ngOnInit() {
    /* ------------------------------- Wizards start Ts------------------------------------------------- */
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
          } else
            if (validateStep2(index, steps) == false) {
              isStepValid = false;
            } else
              if (validateStep3(index, steps) == false) {
                isStepValid = false;
              } else
                if (validateStep4(index, steps) == false) {
                  isStepValid = false;
                }
          return isStepValid;
        }

        function validateStep1(index, steps) {
          $('#vendorName').focus();
          $('#msg_error').html('').hide();
          // $('#msg_vendorName').html('').hide();
          // $('#msg_shortcode').html('').hide();
          // $('#msg_OfficialNo').html('').hide();
          // $('#msg_Officialemail').html('').hide();
          var isValid = true;
          var vendorname = $('#vendorName').val();

          var officialno = $('#officialNo').val();
          var officialemail = $('#officialEmail').val();
          var altnoupdate = $("#alternateNo1").val();
          var gstnoupdate = $("#GSTNo1").val();

          // Validate Vendor Name
          if (!vendorname && vendorname.length <= 0) {
            isValid = false;
            $('#msg_error').html('Please Enter Distributor Name').show();
            $('#vendorName').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);

          }
          //+6
          //else 
          //  if(!shortcode && shortcode.length <= 0){
          //   // validate short code
          //    isValid = false;
          //    $('#msg_error').html('Please Enter Short Code').show(); 
          //    $('#shortCode').focus();        
          // }
          else if (!officialno && officialno.length <= 0) {
            // validate Official No
            isValid = false;
            $('#msg_error').html('Please Enter Official No').show();
            $('#officialNo').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);

          } else if (!officialemail && officialemail.length <= 0) {
            // validate Official Email
            isValid = false;
            $('#msg_error').html('Please Enter Official Email').show();
            $('#officialEmail').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);

          }
          else if ((gstnoupdate != null || gstnoupdate != "" || gstnoupdate != undefined) && gstnoupdate.length >= 1 && gstnoupdate.length < 15) {
            isValid = false;
            $('#msg_error').html('Please Enter Valid GST No.').show();
            $('#GSTNo1').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
          }
          else if ((altnoupdate != null || altnoupdate != "" || altnoupdate != undefined) && altnoupdate.length >= 1 && altnoupdate.length <= 9) {
            isValid = false;
            $('#msg_error').html('Please Enter Valid mobile Number ').show();
            $('#alternateNo1').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
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
            $('#pername').focus();
            isValid = false;
          }
          return isValid;
        }


        function validateStep2(index, steps) {
          $('#pername').focus();
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
            setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

          }

          else if (state == null) {
            // validate state
            isValid = false;
            $('#msg_error_contact').html('Please Select State').show();
            $('#state').focus();
            setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);


          } else if (city == null) {
            // validate city
            isValid = false;
            $('#msg_error_contact').html('Please Enter City').show();
            $('#city').focus();
            setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

          } else
            if (!regaddress && regaddress.length <= 0 || regaddress.length <= 5) {
              // validate Alternate Number
              isValid = false;
              $('#msg_error_contact').html('Please Enter Reg Address').show();
              $('#regaddressnew').focus();
              setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

            }
            else if (!pinCodeNo && pinCodeNo.length <= 0 || pinCodeNo.length <= 5) {
              // validate Alternate Number
              isValid = false;
              $('#msg_error_contact').html('Please Enter Valid Pincode No.').show();
              $('#alternateNo').focus();
              setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

            }

          if (isValid && index == 2) {

            $('#msg_error_contact').html('').hide();
            //    $('#msg_alternateNo').html('').hide();
            //    $('#msg_state').html('').hide();
            // $('#msg_city').html('').hide();
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
          //  var accountNo = $('#accountNo').val();
          //  $('#msg_accountNo').html('').hide();
          //  // Validate Account No
          //  if(!accountNo && accountNo.length <= 0){
          //    isValid = false;
          //    $('#msg_accountNo').html('Please Enter Account Number').show();
          //    $('#accountNo').focus();
          //  }
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

    this.DistributorDetail(); this.clearfunction();

    /* ------------------------------- Wizards end Ts------------------------------------------------- */
  }


  /*------------------------------------------ Encrypted page name and Url 
   Start Name : 24-11-2020  ----------------------------------------------------*/
  EncryptPageName() {
    this.cryptService.encrypt("Distributor Details")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }

  /*------------------------------------------ Encrypted page name and Url End
  Start Name : 24-11-2020  ----------------------------------------------------*/


  /*------------------------------------------ Onclick Button edit and back functionality end
    Start Name : 24-11-2020  ----------------------------------------------------*/
  editpageform() {
    document.getElementById("backdetailsbtn").style.display = "block";
    document.getElementById("editbtn").style.display = "none";
    // document.getElementById("customerdtls").style.display="none";
    // document.getElementById("bankdtls").style.display="none";
    document.getElementById("vendordtls").style.display = "none";

    document.getElementById("container").style.display = "block";
    document.getElementById("modelfooter").style.display = "block";
    document.getElementById("uvmd").style.display = "block";
    document.getElementById("vmd").style.display = "none";
    this.Citylist();
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

    document.getElementById("container").style.display = "none";

  }

  /*------------------------------------------ Onclick Button edit and back functionality end
  Start Name : 24-11-2020  ----------------------------------------------------*/

  ven_city_update: any;
  selectcity: string;

  selectstate: string;
  distsaveeditbtn() {
    // alert("btn click1");
    this.submitted = true;
    this.selectstate = this.dist_state_update.param2;
    this.selectcity = this.ven_city_update.param2;
    var stateid = this.getid(this.ListOfState, this.dist_state_update);
    var cityid = this.getid(this.ListOfCity, this.ven_city_update);

    var isValid = true;
    var res = $('#Remark').val();

    if (!res && res.length <= 0 || res.length < 10) {
      isValid = false;
      $('#msg_error_account').html('Please Enter Remark').show();
      $('#Remark').focus();
      setTimeout(function () { document.getElementById("msg_error_account").style.display = "none"; }, 3000);
    }
    else if ((this.bank_acc_update != '') && this.bank_acc_update.length >= 1 && this.bank_acc_update.length < 9) {

      isValid = false;
      $('#msg_error_account').html('Please Enter Valid Account Number').show();
      $('#accountNo').focus();
      setTimeout(function () { document.getElementById("msg_error_account").style.display = "none"; }, 3000);

      // if (this.bank_acc_update.length >= 1 && this.bank_acc_update.length < 9) {

      // }
      // alert("not Null or blank")
    }
    else if ((this.bank_ifsc_update != '') && this.bank_ifsc_update.length < 10) {
      $('#msg_error_account').html('Please Enter Valid IFSC Code').show();
      $('#bankifscupdate').focus();
      setTimeout(function () { document.getElementById("msg_error_account").style.display = "none"; }, 3000);


    }
    else {

        // this.dist_name_update = this.dist_name_update.substring(0, 1).toUpperCase() + this.dist_name_update.substring(1);
        // this.con_name_update = this.con_name_update.substring(0, 1).toUpperCase() + this.con_name_update.substring(1);
        // this.AreaText = this.AreaText.substring(0, 1).toUpperCase() + this.AreaText.substring(1);
        // this.landmarkText = this.landmarkText.substring(0, 1).toUpperCase() + this.landmarkText.substring(1);
        // this.reg_add_update = this.reg_add_update.substring(0, 1).toUpperCase() + this.reg_add_update.substring(1);
        // this.bank_name_update = this.bank_name_update.substring(0, 1).toUpperCase() + this.bank_name_update.substring(1);
        // this.bank_add_update = this.bank_add_update.substring(0, 1).toUpperCase() + this.bank_add_update.substring(1);
        // this.remarkText = this.remarkText.substring(0, 1).toUpperCase() + this.remarkText.substring(1);

        let dataL = {
          param1: res,
          param2: this.dist_id,
          param3: this.dist_name_update,
          param4: this.dist_gst_update,
          param5: this.reg_add_update,
          param6: this.reg_add_update,
          param7: cityid,
          param8: stateid,
          param9: this.con_name_update,
          param10: this.con_email_update,
          param11: this.con_mobno_update,
          param12: this.con_altno_update,
          param13: "",
          param14: "",
          param15: "",

          param16: this.bank_acc_update,
          param17: this.bank_name_update,
          param18: this.bank_ifsc_update,
          param19: "",
          param20: "",
          param21: this.bank_acc_update,
          param22: this.bank_name_update,
          param23: this.bank_ifsc_update,
          param25: "",
          param26: this.paymntText,
          param27: this.AreaText,
          param28: this.landmarkText,
          param29: this.pin_code_update,
          param30: this.branchnmText,
          pageID: "7",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
        }
        try { AddLoader() } catch (e) { alert(e) }
        this.distributorService.UpdatedistributorAPI(dataL).subscribe((data) => {
          try { RemoveLoader() } catch (e) { alert(e) }
          //  alert(dataL);
          //  alert(data);
          // alert("btn click");
          this.datafromrespo = data.entity;
          // alert(this.datafromrespo);
          // if(this.datafromrespo == 'Successfully updated.')
          // {
          // $("#successmodel").modal('show');
          // this.DistributorDetail();
          // }
          // else
          // {
          //  $("#notifymodel").modal('show');
          // }
          this.datafromrespo = data.entity;

          if (data.statuscode == 200) {
            // alert(this.datafromrespo);
            this.DistributorDetail();
            $("#SuccessModal").modal('show');
            this.clearfunction();
            this.closemodal();
          }
          else {
            $("#ErrorModal").modal('show');
          }
        });
      }
      //alert("error in inserting data");
    }
    /*-------------List of City Api ---------------*/
    dist_state_update: any;
    Citylist() {

      // this.selectstate = this.dist_state_update;
      //console.log(this.dist_state.param2);
      let keydata = {
        param1: this.dist_state_update.param1,
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

    /*------------- List of State Api  ---------------*/
    DistributorDetail() {

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
      this.distributorService.DistributorDetailsAPI(keydata).subscribe(
        (data) => {
          try { RemoveLoader() } catch (e) { alert(e) }
          //  console.log(data.entity)
          // console.log("wekcome_ "+data);
          let resdatalist = data.entity.list;
          //  this.resdata = 
          // console.log("wekcome_ "+resdata);

          let distributorlist = resdatalist;
          this.count = data.entity.count;
          this.viewcount = data.entity.viewCount;
          this.DistributorDetails$ = distributorlist;

          this.DistributorPDFDetail();
        });
    }



    DistributorDeletefunction() {
      var isValid = true;
      var deleteremark = $('#divisiondelremark').val();
      deleteremark = deleteremark.substring(0, 1).toUpperCase() + deleteremark.substring(1);

      // Validate Contact Name
      if (!deleteremark && deleteremark.length <= 0) {
        isValid = false;
        // $('#msg_error_delete').html('Please Enter Remark').show();
        $('#msg_error_delete').html('Please Enter Remark').show();
        $('#divisiondelremark').focus();
        setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);
      }
      else {
        let dataL = {
          param1: deleteremark,
          param2: this.dist_id,
          pageID: "7",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue

        }
        try { AddLoader() } catch (e) { alert(e) }

        this.distributorService.DeleteDistributorAPI(dataL).subscribe((data) => {
          try { RemoveLoader() } catch (e) { alert(e) }

          //  alert(data);
          this.datafromrespo = data.entity;

          if (this.datafromrespo == 'Successfully deleted.') {
            $("#SuccessModal").modal('show');
            this.deleteText = "";
            this.DistributorDetail();
            this.closemodal(); this.clearfunction();
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
      this.clearfunction();
    }
    // VendorDeletefunction(){
    //   let dataL = {
    //     param1:this.deleteText,
    //     param2:"1006",
    //     pageId:"7", pageName:"adsaasas",pageURL:"sdfhfdssgh6437gfds"

    //       }
    //   this.distributorService.DeleteDistributorAPI(dataL).subscribe((data)=>{
    //   //  alert(dataL);
    //   //  alert(data);
    //   })
    //  // alert("error in inserting data");
    // }
    selectstatereturn: string; selectcityreturn: string;
    setdata(com) {
      // alert(com);
      let distridatadetails = com;
      this.dist_id = distridatadetails.param1;
      this.dist_name_update = distridatadetails.param2;
      this.dist_gst_update = distridatadetails.param3;
      this.con_name_update = distridatadetails.param8;
      this.con_email_update = distridatadetails.param9;
      this.con_mobno_update = distridatadetails.param10;
      this.con_altno_update = distridatadetails.param11;
      this.dist_state_update = distridatadetails.param7;
      this.ven_city_update = distridatadetails.param6;
      this.reg_add_update = distridatadetails.param4;
      this.bank_acc_update = distridatadetails.param17;
      this.bank_name_update = distridatadetails.param18;
      this.bank_ifsc_update = distridatadetails.param19;
      this.bank_add_update = distridatadetails.param20;

      this.AreaText = distridatadetails.param30;
      this.landmarkText = distridatadetails.param31;
      this.pin_code_update = distridatadetails.param32;
      this.paymntText = distridatadetails.param29;
      this.branchnmText = distridatadetails.param33;

      this.selectstatereturn = this.check(this.dist_state_update);
      this.selectcityreturn = this.check(this.ven_city_update);
      this.backdetailsbtn();
      if (this.bank_acc_update == null) { this.bank_acc_update = '' }
      if (this.bank_ifsc_update == null) { this.bank_ifsc_update = '' }
      if (this.bank_name_update == null) { this.bank_name_update = '' }
      if (this.branchnmText == null) { this.branchnmText = '' }


      // alert(vendordatadetails.param4);
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
          //   console.log(data.length)

          return data;
        }
      } catch (e) {
        return '';
      }
    }
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
      this.distributorService.DistributorDetailsAPI(keydata).subscribe(
        (data) => {
          try { RemoveLoader() } catch (e) { alert(e) }
          let resdatalist = data.entity.list;


          let vendorlist = resdatalist;

          this.DistributorDetails$ = vendorlist;
          this.count = data.entity.count;
          this.viewcount = data.entity.viewCount;

          this.loading = false;
        });
    }

    SelectRows() {

      var search = $('#searchData').val();
      var selectrow = $('#selectrow1').val();
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
      this.distributorService.DistributorDetailsAPI(keydata).subscribe(
        (data) => {
          try { RemoveLoader() } catch (e) { alert(e) }
          let resdatalist = data.entity.list;


          let vendorlist = resdatalist;

          this.DistributorDetails$ = vendorlist;
          this.count = data.entity.count;
          this.viewcount = data.entity.viewCount;

          this.loading = false;
        });
    }




    DistributorPDFDetail() {


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
      // Distributor Detail Grid BIND LIST    
      this.distributorService.DistributorDetailsAPI(keydata).subscribe(
        (data) => {
          try { RemoveLoader() } catch (e) { alert(e) }

          this.excelpdfData$ = data.entity.list;
          this.PrepareExcelData(this.excelpdfData$);
        });
    }

    PrepareExcelData(data) {
      this.excelData = [];
      for (var i = 0; i < data.length; i++) {
        var obj = {
          "#": data[i].rowNumber,
          "DISTRIBUTOR NAME": data[i].param2,
          "EMAIL ID": data[i].param9,
          "GST NO.": data[i].param3,
          "MOBILE NO.": data[i].param10,
          "STATE": data[i].param7,
          "CITY": data[i].param6,
          "ADDRESS": data[i].param4,
        }
        this.excelData.push(obj);
      }
    }

    exportToExcel() {
      this.excelService.ExportExcel(this.excelData, 'Distributor Details', 'distributordetails')
    }
    createPDF() {
      let pdfTableData;
      let dataArray = []
      for (let i = 0; i < this.excelpdfData$.length; i++) {
        pdfTableData = {
          "#": i + 1,
          "Distributor Name": this.excelpdfData$[i]["param2"],
          "Email Id": this.excelpdfData$[i]["param9"],
          "GST No": this.excelpdfData$[i]["param3"],
          "Mobile No.": this.excelpdfData$[i]["param10"],
          "State": this.excelpdfData$[i]["param7"],
          "City": this.excelpdfData$[i]["param6"],
          "Address": this.excelpdfData$[i]["param4"]
        }
        dataArray.push(pdfTableData)
      };
      this.pdfservice.CreatePDFData(dataArray, "Distributor Details");
    }




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
      this.distributorService.DistributorDetailsAPI(keydata).subscribe(
        (data) => {
          try { RemoveLoader() } catch (e) { alert(e) }
          //  console.log(data.entity)
          // console.log("wekcome_ "+data);
          let resdatalist = data.entity.list;
          //  this.resdata = 
          // console.log("wekcome_ "+resdata);

          let vendorlist = resdatalist;
          //  let resdatadev = resdata['list'];
          //  console.log(resdatadev);
          //  console.log(vendorlist);
          this.DistributorDetails$ = vendorlist;
          this.count = data.entity.count;
          this.viewcount = data.entity.viewCount;

          this.loading = false;
        });
    }

    VendorMasterpageChanged(event) {
      this.p = event; this.pagecount = $("#selectrow1").val();
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
      this.distributorService.DistributorDetailsAPI(keydata).subscribe(
        (data) => {
          try { RemoveLoader() } catch (e) { alert(e) }

          let resdatalist = data.entity.list;


          let vendorlist = resdatalist;

          this.DistributorDetails$ = vendorlist;
          this.count = data.entity.count;
          this.viewcount = data.entity.viewCount;

          this.loading = false;
        });
    }


    //sorting
    sort(key) {

      //  alert(key);

      this.key = key;
      this.reverse = !this.reverse;

    }
    getid(data, value) {
      // alert(JSON.stringify(data));
      try {
        if (typeof value === 'object') {
          //  alert(value)
          //   console.log("come in object if")
          //   console.log(value.param1 + "  ====  " + value.param2);
          return value.param1;
          // return data.param1;
        }
        else {
          // alert(JSON.stringify(data));

          //  alert("value"+value+"value");
          //  console.log("come in else")
          var index = data.findIndex(x => x.param2 === value);
          // alert("indexxx");
          return data[index].param1;
        }
      } catch (e) {
        return '';
      }

    }

    clearfunction() {

      this.dist_name_update = ""; this.dist_gst_update = ""; this.con_mobno_update = ""; this.con_email_update = ""; this.con_name_update = "";
      this.dist_state_update = ""; this.selectstatereturn = ""; this.ven_city_update = ""; this.selectcityreturn = ""; this.AreaText = "";
      this.landmarkText = ""; this.reg_add_update = ""; this.pin_code_update = ""; this.bank_acc_update = ""; this.bank_name_update = "";
      this.bank_add_update = ""; this.bank_ifsc_update = ""; this.paymntText = ""; this.remarkText = "";

    }


  }
