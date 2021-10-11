import { DepartmentMasterService } from './../../services/department-master.service';
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
import { isGeneratedFile } from '@angular/compiler/src/aot/util';

declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
@Component({
  selector: 'app-department-entry',
  templateUrl: './department-entry.component.html',
  styleUrls: ['./department-entry.component.css']
})
export class DepartmentEntryComponent implements OnInit {
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  pageUrl = this.router.url;
  errorMessagemsg: string;
  pageNumber: number = 1; itemsPerPage: number = 10; viewcount: number; totalCount;

  departmentName: string;
  departmentDesc: string;
  loginName: string; password: string;
  personName: string;
  mobileNumber: string;
  emailId: string;
  address: string;
  pincode: string;
  divisionid: string;
  subDivisionId: string;

  subDivisionObj: any;

  divisionObj: any;
  divisionList: any = []; subDivisionList: any = [];


  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5900,
    height: '200px',
  };
  constructor(private router: Router, private cryptService: CryptService, private departmentService: DepartmentMasterService, private listService: ListService) {
    this.EncryptPageName();
    this.EncryptPageUrl();
    this.DivisionList(); this.customerList();
  }
  userKey: any; flag1: number = 0;
  ngOnInit() {
    this.userKey = sessionStorage.getItem('rid');
    if (this.userKey == '10' || this.userKey == '11' || this.userKey == '16' || this.userKey == '21') {
      this.flag1 = 1;
      $('#deptcustentry').show();
      (function ($) {
        $(document).ready(function () {
          $('#exampleModal').on('shown.bs.modal', function () {
            $('#custdept').focus();
          })
        });
      })(jQuery);
    }
    else {
      this.flag1 = 0;
      $('#deptcustentry').hide();
      (function ($) {
        $(document).ready(function () {
          $('#exampleModal').on('shown.bs.modal', function () {
            $('#divisionId').focus();
          })
        });
      })(jQuery);
    }


    this.clearfunction();

    (function ($) {
      $(document).ready(function () {
        $('#vendorName').focus();
        $(".buttonFinish").prop('disabled', false);
        $(".buttonNext").prop('disabled', false);
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
          var Distname = $('#distrbutornameentry').val();
          var DealerName = $('#dealernameentry').val();
          // alert("sdjb"+distributorname);
          var customertype = $('#customertypeentry').val();
          var companyname = $('#companynameentry').val();
          //Validate Vendor Name


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

  }

  EncryptPageName() {
    this.cryptService.encrypt("Deptartment Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    // console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    // console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }
  //subDivisionObj:any;
  // divisionid:string;
  getsubDivisionId() {
    // console.log(this.subDivisionObj)
    this.subDivisionId = this.subDivisionObj.param1;
  }

  insertDepartment() {

    var customerentryidentry = $("#customerentryid1dept").val();

    if (this.flag1 == 1 && !customerentryidentry && customerentryidentry.length <= 0) {
      $('#divisionError').html('Please Select Customer').show();
      $('#custdept').focus();
      setTimeout(function () { document.getElementById("divisionError").style.display = "none"; }, 3000);
    }
    else
      if (this.divisionid == '' || this.divisionid == null) {
        $('#divisionError').html('Please Select Division').show();
        $('#divisionId').focus();
        setTimeout(function () { document.getElementById("divisionError").style.display = "none"; }, 3000);
      }
      else if (this.subDivisionObj == '' || this.subDivisionObj == null) {
        $('#subDivisionError').html('Please Select Sub Division').show();
        $('#subDivisionId').focus();
        setTimeout(function () { document.getElementById("subDivisionError").style.display = "none"; }, 3000);

      }
      else if (this.departmentName == '' || this.departmentName == null) {
        $('#departmentError').html('Please Enter Department Name').show();
        $('#departmentname').focus();

        setTimeout(function () { document.getElementById("departmentError").style.display = "none"; }, 3000);
      }
      else if (this.departmentDesc == '' || this.departmentDesc == null) {
        $('#departmentDescError').html('Please Enter department Description').show();
        $('#descriptionentry').focus();
        setTimeout(function () { document.getElementById("departmentDescError").style.display = "none"; }, 3000);
      } else {
        let dataL = {
          remark: "",
          departmentName: this.departmentName,
          departmentCode: "",
          departmentDescription: this.departmentDesc,
          loginName: this.loginName,
          loginPasswad: this.password,
          personName: "",
          personMobileNo: "",
          personEmailId: "",
          personAddress: "",
          personPincode: "",
          divisionId: this.divisionid,
          subdivisionId: this.subDivisionId,
          customerId: this.deptcust,
          pageID: "7",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
        }
        try { AddLoader() } catch (e) { alert(e) }
        this.departmentService.InsertDepartment(dataL).subscribe((response) => {
          try { RemoveLoader() } catch (e) { alert(e) }
          this.errorMessage = response.entity;
          if (response.statuscode == 200) {
           // alert("success message is " + this.errorMessage)
            $("#updateSuccessModal1").modal('show');
          }
          else {
          //  alert("error message is " + this.errorMessage)

            $("#ErrorModal1").modal('show');

          }
        })
      }

  }
  errorMessage: any;
  DivisionList() {
    let dataL = {
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.departmentService.divisionList(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      if (response.statuscode == 200) {
        this.divisionList = response.entity.list;
      }
    })
  }

  SubDivisionList() {
    this.divisionid = this.divisionObj.param1;

    let dataL = {
      param1: this.divisionid,
      pageID: "2",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.departmentService.SubDivisionListApi(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      if (response.statuscode == 200) {
        this.subDivisionList = response.entity.list;
      }
    })
  }

  closemodal() {
    $("#exampleModal").modal('hide');

    $('.modal-backdrop.show').css('display', 'none');
    this.clearfunction();
    this.DeptartmentDetailsentry();
  }

  clearfunction() {
    this.divisionObj = ""; this.subDivisionObj = ""; this.customerentry = ""; this.customerentryid = "";
    this.departmentName = ""; this.departmentDesc = "";
  }

  customerListArray: any = [];
  customerList() {
    let dataL = {
      pageNo: "1",
      itemsPerPage: "1000",
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    try { AddLoader() } catch (e) { alert(e) }
    this.listService.CustomerListAPI(dataL).subscribe((response) => {

      try { RemoveLoader() } catch (e) { alert(e) }
      if (response.statuscode == '200') {
        this.customerListArray = response.entity.list;
      }
    })
  }

  customerentry: string; customerentryid: string;
  SelectcustomerData() {
    this.customerentryid = this.customerentry["param1"];
    this.deptcust = this.customerentryid;
  }
  deptcust: any = 0;


  DeptartmentDetailsentry() {
    let dataL = {
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    try { AddLoader() } catch (e) { alert(e) }
    this.departmentService.DepartmentDetails(dataL).subscribe((response) => {

      try { RemoveLoader() } catch (e) { alert(e) }
      if (response.statuscode == '200') {
        this.departmentDetailsArray = response.entity.responsedatalist;
        this.count = response.entity.count;
        this.viewcount = response.entity.viewCount;
   
      }
      else {
      }
    })
  }
  departmentDetailsArray:any=[];count:number;
}
