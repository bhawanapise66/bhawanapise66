import { CompanyService } from './../../services/company.service';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { ListService } from './../../../../../list.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-company-employee-entry',
  templateUrl: './company-employee-entry.component.html',
  styleUrls: ['./company-employee-entry.component.css']
})
export class CompanyEmployeeEntryComponent implements OnInit {
  @Output()
  showDetails = new EventEmitter();

  count: any;
  pageUrl = this.router.url; isChecked: any;


  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  encryptedpageNameValue: any;
  encryptedpageUrlValue: any;

  statelistarr: any[]; citylistarr: any[];
  employeeName: string; mobileNumber: string; emailId: string; permAddres: string; corrAddress: string = "";
  stateObj: any; cityObj: any; designationObj: any; departmentObj: any; pincode: string = '';
  stateEncId: any; cityEncId: any; designationEncId: string; departmentEncId: string; password: string; userName: string;
  departmentlistarr: any[]; designationlistarr: any[];
  bankName: string = ''; bankAccNumber: any = ''; ifscCode: any = ''; bankAddress: string = '';
  bankStateObj: any; bankCityObj: any; bankStateEncId: string = ''; bankcityEncId: string = '';

  responseMessage: string;
  errorMessage: string;
  bankcitylistarr: any;
  constructor(private listService: ListService, private cryptService: CryptService, private router: Router, private companyService: CompanyService) {
    this.EncryptPageName(); this.EncryptPageUrl()
  }

  ngOnInit() {

    this.Statelistfun();
    this.DepartmentList();
    this.DesignationList();
    // this.clearfunction();

    (function ($) {
      $(document).ready(function () {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#employeeNameId').focus();
        })
      });
    })(jQuery);

    (function ($) {
      $(document).ready(function () {
        $('#employeeNameId').focus();
        $(".buttonFinish").prop('disabled', true);
        $("#step-14").show();
        $("#step-15").hide();
        $("#step-16").hide();
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
          } else {
            var step;
            try {
              step = $(".step-wizardentry ul li.active div.step")[0].innerText;
            } catch (error) {
              step = $(".step-wizardentry ul li div.step")[0].innerText;
            }

            var steps = $(".step-wizardentry ul li").length;
            validateAllStepsentry(step, steps - 1);
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
          }
          else if (validateentryStep2(index, steps) == false) {
            isStepValid = false;
          }
          else if (validateentryStep3(index, steps) == false) {
            isStepValid = false;
          }
          else if (validateentryStep4(index, steps) == false) {
            isStepValid = false;
          }
          return isStepValid;
        }

        function validateentryStep1(index, steps) {

          $('#msg_errorentry').html('').hide();

          var isValid = true;
          var employeename = $('#employeeNameId').val();
          var mobileNo = $('#mobileNoId').val();
          var emailAddress = $('#emailAddressId').val();
          var permAddress = $('#permAddressId').val();
          var state = $('#stateencid').val();
          var city = $('#cityencid').val();


          if (employeename == '' || employeename == null) {
            isValid = false;
            $('#msg_errorentry').html('Please Enter Employee Name').show();
            $('#employeeNameId').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          else if (mobileNo == '' || mobileNo == null || mobileNo.length < 10) {
            isValid = false;
            $('#msg_errorentry').html('Please Enter Mobile No').show();
            $('#mobileNoId').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          else if (emailAddress == '' || emailAddress == null ||emailAddress.includes("@")==false  ||emailAddress.includes(".")==false) {
            isValid = false;
            $('#msg_errorentry').html('Please Enter Valid Email').show();
            $('#emailAddressId').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          else if (permAddress == '' || permAddress == null) {
            isValid = false;
            $('#msg_errorentry').html('Please Enter Permenant Address').show();
            $('#permAddressId').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }

          else if (state == null || state == '') {
            isValid = false;
            $('#msg_errorentry').html('Please Enter State').show();
            $('#stateId').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          else if (city == null || city == '') {
            isValid = false;
            $('#msg_errorentry').html('Please Enter City').show();
            $('#cityId').focus();
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
          $('#DepartmentId').focus();
          $('#msg_error_contactentry').html('').hide();

          var isValid = true;
          var department = $('#deptId').val();
          var designation = $('#designationId').val();

          // Validate Contact Name
          if (department == null || department == '') {
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Department').show();
            $('#DepartmentId').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
          }
          else if (designation == null || designation == '') {
            // validate state
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Designation').show();
            $('#DesignationId').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
          }

          if (isValid && index == 2) {

            $('#msg_error_contactentry').html('').hide();

            $("#stepentry-15").hide();
            $("#stepentry-14").hide()
            $("#stepentry-16").show();
            $("#stepentry-17").hide();
            $('#accountNoentry').focus();

            $(".buttonFinish").prop('disabled', true);
            $("#nextentry").prop('disabled', false);
            setClassesentry(index, steps);
            isValid = false;
          }


          return isValid;
        }

        function validateentryStep3(index, steps) {

          $('#bankNameid').focus();
          var isValid = true;
          var bankname = $('#bankNameid').val();
          var accountnumber = $('#bankAccountid').val();
          var ifsccode = $('#ifscCodeid').val();
          var bankstatestate = $('#bankstateencid').val();
          var bankcity = $('#bankcityencid').val();

          if (isValid && index == 3) {

            $('#msg_accountNoentry').html('').hide();
            $("#stepentry-14").hide();
            $("#stepentry-15").hide();
            $("#stepentry-16").hide();
            $("#stepentry-17").show();

            $(".buttonFinish").prop('disabled', false);
            $("#nextentry").prop('disabled', true);
            setClassesentry(index, steps);
            isValid = false;
          }
          return isValid;
        }

        function validateentryStep4(index, steps) {
          $('#bankNameid').focus();


          $(".buttonFinish").prop('disabled', false);
          $("#nextentry").prop('disabled', true);
          setClassesentry(index, steps);

          return true;
        }

      });
    })(jQuery);


  }


  EncryptPageName() {
    this.encryptedpageNameValue = this.cryptService.encrypt("Company Employee Entry")
  }
  EncryptPageUrl() {
    this.encryptedpageUrlValue = this.cryptService.encrypt(this.pageUrl)
  }

  Statelistfun() {
    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectStateListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.statelistarr = data.entity.list;
      });
  }

  getCitylist() {
    this.stateEncId = this.stateObj.param1;

    let keydata = {
      param1: this.stateEncId,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectCityListAPI(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.citylistarr = data.entity.list;
    });
  }


  AddressSelection() {
    if (this.isChecked == true) {
      this.corrAddress = this.permAddres
    }
    else {
      this.corrAddress = ''
    }
  }

  getCityId() {
    this.cityEncId = this.cityObj.param1;
  }

  DepartmentList() {
    let dataL = {
      param1: "",
      param2: "",
      pageID: "2",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.CompanyDeptList(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.departmentlistarr = response.entity.list;
    })

  }

  DesignationList() {
    let dataL = {
      param1: "",
      param2: "",
      pageID: "2",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectDesignationListAPI(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.designationlistarr = response.entity.list;
    })
  }

  getDeptId() {
    this.departmentEncId = this.departmentObj.param1;
  }

  getDesignationId() {
    this.designationEncId = this.designationObj.param1;
  }
  getBankStateId() {
    this.bankStateEncId = this.bankStateObj.param1;
    let keydata = {
      param1: this.bankStateEncId,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectCityListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.bankcitylistarr = data.entity.list;
      });

  }
  getBankCityId() {
    this.bankcityEncId = this.bankCityObj.param1;
  }

  CompanyEmployeeEntry() {


    if(!this.userName && this.userName.length <= 0) {
    
      $('#msg_creadentials').html('Please Enter Username').show();
      $('#Username').focus();
      setTimeout(function () { document.getElementById("msg_creadentials").style.display = "none"; }, 3000);
    }
    else if (!this.password && this.password.length <= 0) {
   
      $('#msg_creadentials').html('Please Enter Password').show();
      $('#Password').focus();
      setTimeout(function () { document.getElementById("msg_creadentials").style.display = "none"; }, 3000);
    }
    else {
     
      this.fieldCap();
      let dataL = {
        param1: "",
        param2: "",
        param3: this.employeeName,//"empname",
        param4: "",//empcode",
        param5: this.mobileNumber,//"empmobileno1",
        param6: this.mobileNumber,//"empmobileno2",
        param7: this.cityEncId,//"empcity",
        param8: this.stateEncId,//"empstate",
        param9: this.permAddres,// "empaddress",
        param10: this.pincode,// "emppincode",
        param11: '', //"empdob",
        param12: this.designationEncId,    //"designationId",
        param13: this.bankAccNumber,          //"bankaccountno1",
        param14: this.bankName,       // "bankname1",
        param15: this.ifscCode,       //  "bankifsc1",
        param16: this.bankAddress,      // "bankaddress1",
        param17: this.bankcityEncId,   // "bankcityname1",
        param18: this.bankStateEncId,        //"bankstatename1",
        param19: '',     // "divisionid",
        param20: this.departmentEncId,// "departmentid",
        param21: this.userName,//"loginname",
        param22: this.password,// "loginpasswd",
        param23: this.emailId,//"empemailid",
        param24: '',// "subdivisionid",
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
       console.log(dataL)
      try { AddLoader() } catch (e) { alert(e) }
      this.companyService.InsertCompanyEmp(dataL).subscribe((response) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.responseMessage = response.entity;
        if(response.statuscode == 200)
        {
      
          $("#SuccessModalEntry").modal('show');
          this.closemodal();
          this.clear();
        }
        else{
          $("#ErrorModalEntry").modal('show');
          this.closemodal();
        }
      
      })
    }
  }

clear()
{
  this.employeeName="";this.mobileNumber="";this.emailId="";this.permAddres="";this.isChecked=false;
  this.corrAddress="";this.stateObj="";this.stateEncId="";this.cityObj="";this.cityEncId="";
  this.departmentObj="";this.departmentEncId="";this.designationObj="";this.designationEncId="";
  this.bankName="";this.bankAccNumber="";this.ifscCode="";this.bankAddress="";this.bankStateObj="";
  this.bankStateEncId="";this.bankCityObj="";this.bankcityEncId="";this.userName="";this.password="";
}

fieldCap()
{
  this.employeeName = this.employeeName.substring(0, 1).toUpperCase() + this.employeeName.substring(1);
  this.permAddres = this.permAddres.substring(0, 1).toUpperCase() + this.permAddres.substring(1);
  this.corrAddress = this.corrAddress.substring(0, 1).toUpperCase() + this.corrAddress.substring(1);
  this.bankName = this.bankName.substring(0, 1).toUpperCase() + this.bankName.substring(1);
  this.bankAddress = this.bankAddress.substring(0, 1).toUpperCase() + this.bankAddress.substring(1);

}


closemodal() { 
  this.clear();
$('#exampleModal').modal('hide');
$('.modal-backdrop.show').css('display', 'none');
}
}
