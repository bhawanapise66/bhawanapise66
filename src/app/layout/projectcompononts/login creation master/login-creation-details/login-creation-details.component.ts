import { routerTransition } from 'src/app/router.animations';
import { ExportToExcelService } from './../../services/export-to-excel.service';
import { style } from '@angular/animations';
import { LoginRegister } from './../../Menu Management/login-creation/login-creation.component';
import { Component, OnInit, ɵConsole, ElementRef, ViewChild } from '@angular/core';
//import { Component, OnInit ,  } from '@angular/core';

import { CryptService } from '../../services/crypt.service';
import { Router } from '@angular/router';
import { ListService } from 'src/list.service';
import { MenuAssignmentService } from '../../services/menu-assignment.service';
declare var jQuery: any;
import * as $ from 'jquery';
import * as xlsx from 'xlsx';
import { PdfService } from '../../services/pdf.service';

declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
declare var SuccessAlert: any;
declare var errorAlert: any;


@Component({
  selector: 'app-login-creation-details',
  templateUrl: './login-creation-details.component.html',
  styleUrls: ['./login-creation-details.component.css'],
  animations: [routerTransition()]

})
export class LoginCreationDetailsComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  pageUrl = this.router.url;
  key: string = 'name'; reverse: boolean = true;
  public loading = false; pagecount: number; count: number; viewcount: number;
  SelectPageText: string; PlaceOrderDetails$: Object; remarkText: string; deleteText: string; EmployeeDetails$: Object;
  successMessageUpdate: string; officialemailupdateText: string; employeeidupdate: string;
  datafromrespo: string;
  usernameTextupdate: string; passwordTextupdate: string;

  employeeupdateText: string; mobilenoupdateText: string;
  regaddressUpdateText: string; pincodeUpdateText: string; filter: string; isChecked: string; corrospondanceaddress: string; pincodeText: string;

  loginName: string; password: string = ''; cPasssword: string; roleId: string; OwnersId: string;
  newPass: string; cNewPass: string; encOldPass: string; encNewPass: string; encCnewPass: string;

  usernamevalid: boolean = true;
  passwordValid: boolean = true;
  cpasswordValid: boolean = true; keybooleana: boolean;

  toChange: boolean; statusbuttonvisible: boolean; passwordbuttonvisible: boolean; getPasswordVisible: boolean;
  logincreation = new LoginRegister()
  isValid: true;
  //pageUrl = this.router.url
  roleLists = []; roleWiseUserList = [];
  regAddress: string;
  encryptedpageNameValue: string; encryptedpageUrlValue: string;
  pageNumber: any = 1; itemsPerPage: any = 10; viewCount: any;

  loginDetailsArray: any = [];
  errorMessage: any; yourpassword: string = "";
  //filter: any = "";
  phoneNumber: any;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 123456,
    height: '200px',
  };
  loginId: any;
  action: any;
  remark: any;
  welcomeName: any;
  roleName: any;
  ActiveStatus: any;
  loginDetailsArray$: any;
  excelData: any[];
  excelpdfData$: any;
  isPassBlank: boolean=false;
  constructor(private cryptService: CryptService, private router: Router, private listService: ListService,
    private menuAssignmentService: MenuAssignmentService, public pdfservice: PdfService, private excelService: ExportToExcelService) {
    this.EncryptPageName(); this.EncryptPageUrl();
  }


  ngOnInit() {
    this.remark = ''; this.action = '';
    this.LoginDetails();
    this.RoleList();
    this.resetData();

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

          }
          else if (registeruser == null) {
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
    this.keybooleana = true;
    this.write_privilege = sessionStorage.getItem('writePrivilege');
    if (this.write_privilege == "false") {

      $('#addnewlog').attr('disabled', 'disabled');
      $("#addnewlog").css("display", "none");
      $("#visibleaction").css("display", "none");

      this.keybooleana = false;

    }
  }
  write_privilege: string;
  EncryptPageName() {
    this.cryptService.encrypt("Login Creation Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl);
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }

  LoginDetails() {
    let dataL = {
      param1: "",
      param2: "",
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }


    this.menuAssignmentService.LoginDetails(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      if (response.statuscode == 200) {
        this.loginDetailsArray = response.entity.responsedatalist;
        //changes by Pratiksha : response parameter updated
        this.loginDetailsArray = response.entity.responsedatalist;
        this.count = response.entity.count;
        this.viewcount = response.entity.viewCount;
        this.LoginPDFDetails();
      }
      else {

      }
    })
  }


  loginPageChange(event) {
    this.pageNumber = event;
    let keydata = {
      param1: "",
      param2: "",
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    // Distributor Detail Grid BIND LIST    
    this.menuAssignmentService.LoginDetails(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }


      let resdatalist = data.entity.responsedatalist;

      let vendorlist = resdatalist;
      this.loginDetailsArray = vendorlist;
      this.count = data.entity.count;
      this.viewcount = data.entity.viewCount;

      this.loading = false;
    });
  }


  selectrow: string = '10';
  Refreshfunction() {
    this.filter = ""; this.itemsPerPage = 10; this.pageNumber = 1;
    this.LoginDetails();
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
      this.roleLists = response.entity.list;
    })
  }

  closemodal() {
    $("#SuccessModel").modal('hide');

    $('#modeldelete').modal('hide');
    $('#myModalwizard').modal('hide');

    $('.modal-backdrop.show').css('display', 'none');

  }

  RoleWiseUserList() {
    let dataL = {
      param1: "",
      param2: "",
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.RoleWiseUserList(dataL).subscribe((response) => {
      let data = <any[]>(response)
      let listdata = response.entity.list
      this.roleWiseUserList = listdata
    })
  }

  setdata(item) {
    this.loginId = item.param1;
    this.loginName = item.param2;
    this.roleId = item.param4;
    this.roleName = item.param6;
    this.OwnersId = item.param5;
    this.welcomeName = item.param7;
    this.ActiveStatus = item.param8;
  }

  resetData() {
    this.loginName = ""
    this.password = ""
    this.cPasssword = ""
    this.roleId = ""
    this.OwnersId = ''
    this.newPass = ""
    this.cNewPass = ""
    this.encOldPass = ""
    this.encNewPass = ""
    this.encCnewPass = ""
  }


  todelete: boolean; deleteButtonVisible: boolean;
  ActiveButton() {
    this.todelete = false;
    this.toChange = false;
    this.statusbuttonvisible = false; this.passwordbuttonvisible = false; this.getPasswordVisible = false
    if (this.action == null || this.action == "") {
      this.toChange = false;
      document.getElementById("getpasswordbutton").style.display = "none";

    }
    else if (this.action == "Change Password") {
      this.toChange = true;
      this.passwordbuttonvisible = true;
      this.getPasswordVisible = false;
      document.getElementById("deletebuttonlogin").style.display = "none";
      document.getElementById("getpasswordbutton").style.display = "none";

    }
    else if (this.action == "Delete") {
      document.getElementById("deletebuttonlogin").style.display = "block";
      document.getElementById("getpasswordbutton").style.display = "none";

    }
    else if (this.action == "Get Password") {
      this.getPasswordVisible = true;
      this.passwordbuttonvisible = false;
      document.getElementById("deletebuttonlogin").style.display = "none";
      document.getElementById("getpasswordbutton").style.display = "block";
    }
    else {
      this.toChange = true;
      this.statusbuttonvisible = true;
      this.getPasswordVisible = false;
      this.passwordbuttonvisible = false;
      document.getElementById("deletebuttonlogin").style.display = "none";
      document.getElementById("getpasswordbutton").style.display = "none";

    }
  }


  UpdateLoginStatus() {
    if (this.remark == null || this.remark == "") {
      $('#remarkError').html('Please Enter Remark').show();
      $('#remarkField').focus();
      setTimeout(function () { document.getElementById("remarkError").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        param1: this.remark,
        param2: this.loginId,
        param3: this.action,
        pageID: "55",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      AddLoader()
      this.menuAssignmentService.UpdateLoginStatus(dataL).subscribe((response) => {
        RemoveLoader()
        if (response.statuscode == 200) {
          $("#myModalwizard").modal("hide");
          $(".modal-backdrop.show").css("display", "none");
          SuccessAlert(response.entity)
          this.ngOnInit();
          this.resetData();
          this.LoginDetails();
          this.toChange = false
        }
        else {
          $("#myModalwizard").modal("hide");
          $(".modal-backdrop.show").css("display", "none");
          errorAlert(response.entity)
          this.ngOnInit(); this.resetData();

        }
      })
    }

  }



  ResetPassword() {
    if (this.remark == null || this.remark == "") {
      $('#remarkError').html('Please Enter Remark').show();
      $('#remarkField').focus();
      setTimeout(function () { document.getElementById("remarkError").style.display = "none"; }, 3000);
    }
    else if (this.password == null || this.password == "") {
      // $('#passError').html('Please Enter Old Password').show();
       // console.log(this.password)
      // document.getElementById('passError').innerHTML = 'Please Enter Old Password'
      $('#passField').focus();
      setTimeout(function () { document.getElementById("passError").style.display = "none"; }, 3000);
    }
    else if (this.newPass == null || this.newPass == "") {
      console.log(this.newPass)
      $('#newpassError').html('Please Enter New Password').show();
      $('#newPassField').focus();
      setTimeout(function () { document.getElementById("newpassError").style.display = "none"; }, 3000);
    }
    else if (this.cNewPass == null || this.cNewPass == "") {
      $('#cnewpassError').html('Please Re Enter New Password').show();
      $('#cnewPassField').focus();
      setTimeout(function () { document.getElementById("cnewpassError").style.display = "none"; }, 3000);
    }
    else if (this.newPass != this.cNewPass) {
      $('#newpassError').html('the new Password and confirm Password did not matched').show();
      $('#cnewPassField').focus();
      setTimeout(function () { document.getElementById("newpassError").style.display = "none"; }, 3000);
    }
    else {
      this.encOldPass = this.cryptService.encrypt(this.password);
      this.encNewPass = this.cryptService.encrypt(this.newPass);
      this.encCnewPass = this.cryptService.encrypt(this.cNewPass);


      let dataL = {
        param1: this.remark,
        param2: this.loginId,
        param3: this.encOldPass,
        param4: this.encNewPass,
        param5: this.encCnewPass,
        pageID: "3r4",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      this.menuAssignmentService.ResetPassword(dataL).subscribe((response) => {
        if (response.statuscode == 200) {
          this.errorMessage = response.entity;
          $("#myModalwizard").modal("hide");
          $("#updateSuccessModal1").modal('show');
          $(".modal-backdrop.show").css("display", "none");
          this.ngOnInit(); this.resetData();
        }
        else {
          this.errorMessage = response.entity;
          $("#myModalwizard").modal("hide");
          $("#ErrorModal1").modal('show');
          $(".modal-backdrop").css("display", "none");
          this.ngOnInit(); this.resetData();
        }
      })
    }
  }



  LoginPDFDetails() {
    let dataL = {
      param1: "",
      param2: "",
      pageNo: "",
      itemsPerPage: "",
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.menuAssignmentService.LoginDetails(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.excelpdfData$ = response.entity.responsedatalist;
        this.PrepareExcelData(this.excelpdfData$);
      }
      else {
      }
    })
  }

  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "WELCOME NAME": data[i].param7,
        "LOGIN NAME": data[i].param2,
        "ROLE NAME": data[i].param6,
        "CREATE DATE": data[i].param9,
        "STATUS": data[i].param8,

      }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    this.excelService.ExportExcel(this.excelData, 'User Management', 'usermanagement')
  }

  createPDF() {
    let pdfTableData;
    let dataArray = []
    for (let i = 0; i < this.excelpdfData$.length; i++) {
      pdfTableData = {
        "#": i + 1,
        "Welcome Name": this.excelpdfData$[i]["param7"],
        "Login Name": this.excelpdfData$[i]["param2"],
        "Role Name": this.excelpdfData$[i]["param6"],
        "Create Date": this.excelpdfData$[i]["param9"],
        "Status": this.excelpdfData$[i]["param8"]
      }
      dataArray.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(dataArray, "Login Creation");

  }

  SelectRows() {
    this.pageNumber = 1;

    let keydata = {
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.menuAssignmentService.LoginDetails(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.responsedatalist;


        let vendorlist = resdatalist;

        this.loginDetailsArray = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }
  searchdata() {

    this.pageNumber = 1;

    let keydata = {
      param1: "",
      param2: "",
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.menuAssignmentService.LoginDetails(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.responsedatalist;


        let vendorlist = resdatalist;

        this.loginDetailsArray = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }
  backdetailsbtn() {

  }
  vensaveeditbtn() {

  }
  sort(key) {

    //  alert(key);

    this.key = key;
    this.reverse = !this.reverse;

  }

}
