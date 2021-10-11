import { MenuAssignmentService } from './../../services/menu-assignment.service';
import { ListService } from './../../../../../list.service';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { routerTransition } from 'src/app/router.animations';
import { Component, OnInit } from '@angular/core';
import { JsonpModule } from '@angular/http';
declare var jQuery: any;
import * as $ from 'jquery';



export class LoginRegister {
  roleId: string;
  roleWiseUser: string;
  username: string;
  password: string;
  cpassword: string;

}


@Component({
  selector: 'app-login-creation',
  templateUrl: './login-creation.component.html',
  styleUrls: ['./login-creation.component.css'],
  animations: [routerTransition()]

})
export class LoginCreationComponent implements OnInit {
  usernamevalid: boolean = true;
  passwordValid: boolean = true;
  cpasswordValid: boolean = true;
  logincreation = new LoginRegister()
  isValid: true;
  pageUrl = this.router.url
  roleLists = []; roleWiseUserList = [];
  regAddress: string;
  encryptedpageNameValue: string; encryptedpageUrlValue: string; roleDetails:any; filter:any; pagePerItems:string;
  pageNumber: any = 1; itemsPerPage: any = 10; viewCount: any; totalCount: any;

  loginDetailsArray: any;
  errorMessage: any;
  constructor(private cryptService: CryptService, private router: Router, private listService: ListService, private menuAssignmentService: MenuAssignmentService) {
    this.EncryptPageName(); this.EncryptPageUrl();
  }

  ngOnInit() {
    this.LoginDetails();
    this.RoleList();

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
            $("#nextentry").text('done');
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
          } else
            if (validateentryStep2(index, steps) == false) {
              isStepValid = false;
            } else
              if (validateentryStep3(index, steps) == false) {
                isStepValid = false;
              }
          return isStepValid;
        }

        function validateentryStep1(index, steps) {
          $('#devicetypeentry').focus();

          $('#msg_devicetypeentry').html('').hide();
          $('#msg_vendorlistentry').html('').hide();
          $('#msg_modelcodeentry').html('').hide();
          $('#msg_modelnameentry').html('').hide();

          var isValid = true;

          var role = $('#logintregisterrole').val();
          var registeruser = $('#loginregisteruser').val();


          // Validate  user Step Details

          if (role == null) {
            isValid = false;
            $('#roleValidation').html('Please Enter role').show();
            $('#logintregisterrole').focus();
            console.log(registeruser)

          }
          else if (registeruser == null || registeruser =="") {
            isValid = false;
            $('#userValidation').html('Please Enter user').show();
            $('#loginregisteruser').focus();
          }



          if (isValid && index == 1) {

            $('#msg_devicetypeentry').html('').hide();
            $('#msg_vendorlistentry').html('').hide();
            $('#msg_modelcodeentry').html('').hide();
            $('#msg_modelnameentry').html('').hide();

            $("#stepentry-14").hide()
            $("#stepentry-15").show();
            $("#stepentry-16").hide();
            $("#stepentry-17").hide();

            setClassesentry(index, steps);
            $('#pernameentry').focus();
            isValid = false;
            $("#nextentry").prop('disabled', true);
            $("#saveentry").prop('disabled', false);
          }
          return isValid;
        }

        function validateentryStep2(index, steps) {
          var isValid = true;
          var username = $('#logintregisterrole').val();
          var password = $('#logintregisterrole').val();
          var cpassword = $('#loginregisteruser').val();
          var isValid = true;

          // Validate  user Step Details

          if (username == null) {
            isValid = false;
            $('#usernameinvaild').html('Please Enter username').show();
            $('#textusername').focus();

          }
          else if (password == null) {
            isValid = false;
            $('#passwordinvalid').html('Please Enter password').show();
            $('#textpassword').focus();
          }
          else if (cpassword == null) {
            isValid = false;
            $('#cpasswordinvalid').html('please re-enter password').show();
            $('#textcpassword').focus();
          }
          if (isValid && index == 2) {

            // $('#msg_pernameentry').html('').hide();
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

          // $('#accountNoentry').focus();
          var isValid = true;
          //  var accountNo = $('#accountNoentry').val();
          //  $('#msg_accountNoentry').html('').hide();
          // Validate Account No
          //  if(!accountNo && accountNo.length <= 0){
          //    isValid = false;
          //    $('#msg_accountNoentry').html('Please Enter Account Number').show();
          //    $('#accountNoentry').focus();
          //  }
          if (isValid && index == 3) {

            //  $('#msg_accountNoentry').html('').hide();
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
      });
    })(jQuery);


  }
  EncryptPageName() {
    this.cryptService.encrypt("Login Creation")
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
      this.roleLists = <any[]>(response.entity.list)
      // alert(JSON.stringify(this.roleLists))
      this, this.roleLists = response.entity.list;
      // this.roleId = roles["param2"];
      // console.log(response.entity.list)
      // console.log(this.roleId)
    })
  }

  RoleWiseUserList() {
    let dataL = {
      param1: this.logincreation.roleId,
      param2: "",
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.RoleWiseUserList(dataL).subscribe((response) => {
      let data = <any[]>(response)
      let listdata = response.entity.list
      // console.log(data)
      // console.log(listdata)
      this.roleWiseUserList = listdata
      // alert(JSON.stringify(this.roleWiseUserList))
    })
  }

  CreateLogin() {
    this.validatefunction();

    let dataL = {
      // param1: "",
      // param2: "",
      // param3: this.logincreation.username,
      // param4: this.logincreation.password,
      // param5: this.logincreation.roleId,
      // param6: this.logincreation.roleWiseUser,
      // pageID: "",
      // pageName: this.encryptedpageNameValue,
      // pageURL: this.encryptedpageUrlValue
      param1: "",
      param2: "",
      param3: this.logincreation.username,
      param4: this.logincreation.password,
      param5: this.logincreation.roleId,
      param6: this.logincreation.roleWiseUser,
      param7: "",  //welcomenmae
      pageID: "344",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.menuAssignmentService.CreateLogin(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        if (response.entity == "Successfully Saved.") {
          this.errorMessage = response.entity;
          $("#insertSuccessModal").modal('show');
          this.ngOnInit();
        }
        else {
          this.errorMessage = response.entity
          $("#ErrorModal").modal('show');
        }
      }
      else {
        this.errorMessage = response.entity;
        $("#ErrorModal").modal('show');
      }
    })

  }

  validatefunction() {

    let usernamevalid: boolean = true;
    let passwordValid: boolean = true;
    let cpasswordValid: boolean = true;
    if (this.logincreation.username == null) {
      usernamevalid = false
      document.getElementById("usernameinvaild").innerHTML = "please enter username"
    }
    else if (this.logincreation.password == null) {
      passwordValid = false;
      document.getElementById("passwordinvalid").innerHTML = "please enter password"
    }
    else if (this.logincreation.cpassword == null) {
      cpasswordValid = false
      document.getElementById("cpasswordinvalid").innerHTML = "please re enter password"
    }
    else if (this.logincreation.password != this.logincreation.cpassword) {
      document.getElementById("cpasswordinvalid").innerHTML = "password does not match"
    }
    else {

    }
  }

  LoginDetails() {

    this.logincreation.roleId = ""; this.logincreation.roleWiseUser = "";
    let dataL = {
      param1: this.logincreation.roleId,      //All/id
      param2: this.logincreation.roleWiseUser,      //All/id
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.menuAssignmentService.LoginDetails(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.loginDetailsArray = response.entity.list;
      }
      else {
        alert(response.entity);
      }
    })
  }
  pageChanged(event){
    this.pageNumber=event;
    this.LoginDetails();

  }


}
