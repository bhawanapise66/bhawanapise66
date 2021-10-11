import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuAssignmentService } from './../../services/menu-assignment.service';
import { ListService } from './../../../../../list.service';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { routerTransition } from 'src/app/router.animations';
import { JsonpModule } from '@angular/http';
declare var jQuery: any;
import * as $ from 'jquery';
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;


@Component({
  selector: 'app-login-creation-entry',
  templateUrl: './login-creation-entry.component.html',
  styleUrls: ['./login-creation-entry.component.css']
})
export class LoginCreationEntryComponent implements OnInit {

  @Output()
  showDetails = new EventEmitter();

  loginName: string; password: string; cPasssword: string; roleId: string; OwnersId: string; Welcomename: string;
  roleObj: any; ownersObj: any;
  datafromrespo: string;


  usernamevalid: boolean = true;
  passwordValid: boolean = true;
  cpasswordValid: boolean = true;
  isValid: true;
  pageUrl = this.router.url
  roleLists = []; ownersList = [];
  regAddress: string;
  encryptedpageNameValue: string; encryptedpageUrlValue: string;
  pageNumber: any = 1; itemsPerPage: any = 10; viewCount: any; totalCount: any;

  loginDetailsArray: any;
  errorMessage: any;


  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 1000,
    height: '200px',
  };
  constructor(private cryptService: CryptService, private router: Router, private listService: ListService, private menuAssignmentService: MenuAssignmentService) {
    this.EncryptPageName(); this.EncryptPageUrl();
  }


  ngOnInit() {

      (function ($) {
        $(document).ready(function () {
          $('#exampleModal').on('shown.bs.modal', function () {
            $('#roles').focus();
          })
        });
      })(jQuery);
 
    (function ($) {

       $(document).ready(function () {
        $('#vendorName').focus();
        $("#saveentry").prop('disabled', true);
        $("#nextentry").prop('disabled', false);

        $("#stepentry-14").show();
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
            }
          // else
          // if(validateentryStep3(index, steps) == false){
          //   isStepValid = false;        
          // }else
          //  if(validateentryStep4(index, steps) == false){
          //   isStepValid = false;        
          // }
          return isStepValid;
        }

        function validateentryStep1(index, steps) {
          $("#saveentry").prop('disabled', true);

          $('#distrbutorname').focus();
          $('#msg_errorentry').html('').hide();

          var isValid = true;
          var Rolename = $('#roledummy').val();
          var Username = $('#userdummy').val();

          //Validate Vendor Name
          if (!Rolename && Rolename.length <= 0) {
            isValid = false;
            $('#msg_errorentry').html('Please Select Role').show();
            $('#roles').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

          } else if (!Username && Username.length <= 0) {
            isValid = false;
            $('#msg_errorentry').html('Please Select User').show();
            $('#owners').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

          }


          if (isValid && index == 1) {

            $('#msg_errorentry').html('').hide();
            $("#stepentry-14").hide()
            $("#stepentry-15").show();
            $("#stepentry-16").hide();
            $("#stepentry-17").hide();

            setClassesentry(index, steps);
            $("#saveentry").prop('disabled', false);
            $("#nextentry").prop('disabled', true);
            $('#pername').focus();
            isValid = false;
          }
          return isValid;
        }


        function validateentryStep2(index, steps) {
          $('#textusername').focus();
          $("#saveentry").prop('disabled', false);
          $("#nextentry").prop('disabled', true);
          // $('#msg_contactNo').html('').hide();
          // $('#msg_alternateNo').html('').hide();
          // $('#msg_State').html('').hide();
          // $('#msg_city').html('').hide();
          $('#msg_error_contactentry').html('').hide();
          var isValid = true;
          var Username = $('#textusername').val();
          var Password = $('#textpassword').val();
          var Confpass = $('#textcpassword').val();
          //  var regaddress = $('#regaddressnew').val();
          //  var state = $('#state').val();
          //  var city = $('#city').val();
          //  var pinCodeNo = $('#pincodeno').val();
          // Validate Contact Name
          if (!Username && Username.length <= 0) {
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Person Name').show();
            $('#pername').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

          } else if (!Password && Password.length <= 0) {
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Contact Number').show();
            $('#contactNo').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

          }
          else if (!Confpass && Confpass.length <= 0) {
            // validate state
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter State').show();
            $('#state').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
          }

          if (isValid && index == 2) {

            $('#msg_contactNo').html('').hide();
            $('#msg_alternateNo').html('').hide();
            $('#msg_state').html('').hide();
            $('#msg_city').html('').hide();
            $("#stepentry-15").hide();
            $("#stepentry-14").show()
            $("#stepentry-16").hide();
            $("#stepentry-17").hide();
            $('#accountNo').focus();

            $("#saveentry").prop('disabled', true);
            $("#nextenry").prop('disabled', false);
            setClassesentry(index, steps);
            isValid = false;
          }

          return isValid;
        }


      });




    })(jQuery);
    // this.Statelist();
    this.EncryptPageName();
    this.EncryptPageUrl();
    this.RoleList();
    //  this.Dealerlist();
    //  this.CustomerTypeList();
    //  this.CustomerCategorylist();
  }

  EncryptPageName() {
    this.cryptService.encrypt("Login Creation Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl);
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }

  RoleList() {
    let dataL = {
      param1: "",
      param2: "",
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.RoleList(dataL).subscribe((response) => {
      this.roleLists = <any[]>(response.entity)
    })
  }

  selectrole: string;
  RoleWiseUserList() {
    this.ownersObj=null

    this.selectrole = this.roleObj.param2;
    this.roleId = this.roleObj.param1;
    this.Welcomename = this.roleObj.param2;
    let dataL = {
      param1: this.roleId,
      param2: "",
      pageID: "324",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    AddLoader()
    this.menuAssignmentService.rolewiseuserforlogincreation(dataL).subscribe((response) => {
      RemoveLoader()
      if (response.statuscode == 200) {
        this.ownersList = response.entity;
      }
    })

  }

  selectowner: string;

  getOwnersId() {
    this.selectowner = this.ownersObj.param2;
    this.OwnersId = this.ownersObj.param1;
    this.Welcomename = this.ownersObj.param2;
  }

  closemodal() {
    //alert("come ");
    $("#SuccessModalEntry").modal('hide');
    $("#ErrorModalEntry").modal('hide');
    $('#modeldelete').modal('hide');
    $('#exampleModal').modal('hide');
    $('.modal-backdrop.show').css('display', 'none');
  }

  InsertLogin() {
    if (this.loginName == null || this.loginName == '') {
      $('#msg_error_contactentry').html('Please Enter Username').show();
      $('#textusername').focus();
      setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
    }
    else if (this.loginName.length < 4) {
      $('#msg_error_contactentry').html('Username Should be at least four characters').show();
      $('#textusername').focus();
      setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

    }
    else if (this.password == null || this.password == '') {
      $('#msg_error_contactentry').html('Please Enter Password').show();
      $('#textpassword').focus();
      setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
    }
    else if (this.password.length < 4) {
      $('#msg_error_contactentry').html('Password should be at least four characters').show();
      $('#textpassword').focus();
      setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
    }
    else if (this.cPasssword == null || this.cPasssword == '') {
      $('#msg_error_contactentry').html('Please Re Enter Password').show();
      $('#textcpassword').focus();
      setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
    }
    else if (this.password != this.cPasssword) {
      $('#msg_error_contactentry').html('Password Does Not Match').show();
      $('#textcpassword').focus();
      setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

    }
    else {
      let dataL = {
        // param1: "",
        // param2: "",
        // param3: this.loginName,
        // param4: this.password,
        // param5: this.roleId,
        // param6: this.OwnersId,
        // param7: this.Welcomename,
        // pageID: "234",
        // pageName: this.encryptedpageNameValue,
        // pageURL: this.encryptedpageUrlValue

          "remarks":"Ok",
          "loginId": "",
          "loginName": this.loginName,
          "loginPassword": this.password,
          "loginRoleId": this.roleId,
          "loginOwnerId": this.OwnersId,
          "welcomeName": this.Welcomename,
          "readpermission":"true",
          "writepermission":"false"

      }
      try { AddLoader() } catch (e) { alert(e) }
      this.menuAssignmentService.CreateLogin(dataL).subscribe((response) => {
        this.refreshEntry()
        this.showDetails.emit()
        try { RemoveLoader() } catch (e) { alert(e) }
        if (response.statuscode == 200) {
          this.datafromrespo = response.entity;
          $("#SuccessModalEntry").modal('show');
        }
        else {
          this.datafromrespo = response.entity;
          $("#ErrorModalEntry").modal('show');
        }
      })
    }
  }

  
  refreshEntry() {
    this.roleObj = null; this.ownersObj = null
    this.selectrole = ''; this.selectowner = '';
    this.loginName = undefined; this.password = undefined; this.cPasssword = undefined;
    this.closemodal();

    this.ngOnInit();
  }
}