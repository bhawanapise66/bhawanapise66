import { EmployeemodelService } from './../../../../APIService/employeemodel.service';
import { PlaceodrmodelService } from './../../../../APIService/placeodrmodel.service';
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
  selector: 'app-employeeentry',
  templateUrl: './employeeentry.component.html',
  styleUrls: ['./employeeentry.component.css']
})
export class EmployeeentryComponent implements OnInit {
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;

  public loading = false; p: number; pagecount: number; count: number;
  SelectPageText: string; Tipsdetails: string; SelectPagetype$: Object;
  private _success = new Subject<string>(); successMessage: string; supplierofText: string; remarkText: string;
  datafromrespo: string; usernameText: string; passwordText: string;

  isChecked: string; filter: string;

  //DivisionText:any;
  DesignationentryText: any;

  employeeentryText: string; mobilenoentryText: string; officialemailentryText: string; regaddressText: string; pincodeText: string;
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };

  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService, private employeemodelservice: EmployeemodelService, private listService: ListService, private cryptService: CryptService, private router: Router, private customerService: CustomermodelService, private placeodrService: PlaceodrmodelService) {
    this.EncryptPageName();
    this.EncryptPageUrl();
  }


  ngOnInit() {

    (function ($) {
      $(document).ready(function () {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#employeeNameentry').focus();
        })
      });
    })(jQuery);


    this.Statelist();
    this.Divisionlist();
    this.clearfunction();


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
          $('#employeeentryText').focus();

          $('#msg_errorentry').html('').hide();
          //  $('#msg_shortcodeentry').html('').hide();
          // $('#msg_CINNoentry').html('').hide();
          // $('#msg_GSTNoentry').html('').hide();
          // $('msg_officenoentry').html('').hide();
          // $('msg_Officialemailentry').html('').hide();
          var isValid = true;
          var employeename = $('#employeeNameentry').val();
          var ofcNo = $('#officialNoentry').val();
          var ofcemail = $('#officialEmailentry').val();
          var Regadd1 = $('#regaddressentry').val();
          var state = $('#statedummy').val();
          var city = $('#citydummy').val();

          // Validate Vendor Name
          if (!employeename && employeename.length <= 0) {
            isValid = false;
            $('#msg_errorentry').html('Please Enter Employee Name').show();
            $('#employeeNameentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          else if (!ofcNo && ofcNo.length <= 0) {
            // validate GST No
            isValid = false;
            $('#msg_errorentry').html('Please Enter Official No').show();
            $('#officialNoentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          } else if (!ofcemail && ofcemail.length <= 0) {
            // validate GST No
            isValid = false;
            $('#msg_errorentry').html('Please Enter Valid Email').show();
            $('#officialEmailentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          } else if (!Regadd1 && Regadd1.length <= 0) {
            // validate GST No
            isValid = false;
            $('#msg_errorentry').html('Please Enter Permenant Address').show();
            $('#regaddressentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          // else if(!Regadd2 && Regadd2.length <= 0 ){
          //   // validate GST No
          //   isValid = false;
          //   $('#msg_errorentry').html('Please Enter Temparary Address').show(); 
          //   $('#regaddresstempentry').focus(); 
          //   setTimeout(function(){document.getElementById("msg_errorentry").style.display="none";}, 3000);         
          // }
          else if (!state && state.length <= 0) {
            // validate GST No
            isValid = false;
            $('#msg_errorentry').html('Please Enter State').show();
            $('#stateentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          else if (!city && city.length <= 0) {
            // validate GST No
            isValid = false;
            $('#msg_errorentry').html('Please Enter State').show();
            $('#cityentry').focus();
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
          var division = $('#divisiondummy').val();
          var Department = $('#departmentdummy').val();
          var designation = $('#designationdummy').val();

          // Validate Contact Name
          if (!division && division.length <= 0) {
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Division').show();
            $('#Divisionentry').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

          } else if (!Department && Department.length <= 0) {
            // validate state
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Department').show();
            $('#Departmententry').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

          }
          else if (!designation && designation.length <= 0) {
            // validate state
            isValid = false;
            $('#msg_error_contactentry').html('Please Enter Designation').show();
            $('#Designationentry').focus();
            setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

          }

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

  }


  EncryptPageName() {
    this.cryptService.encrypt("Employee Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    // console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    // console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }
  cityText: any;
  selectdesignation: string;
  vensavebtn() {
    //  var cin = $("#CINNoentry").val();
    // this.selectcity = this.cityText.param2;
    // this.selectstate = this.stateText.param2;
    // this.selectdivision = this.DivisionText.param1;
    // this.selectdesignation = this.DesignationentryText.param1;
    var Username = $('#Username').val();
    var Password = $('#Password').val();
    var isValid = true;
    //$('#msg_accountNo').html('').hide();
    // Validate Account No
    if (!Username && Username.length <= 0) {
      isValid = false;
      $('#msg_error_loginentry').html('Please Enter Username').show();
      $('#Username').focus();
      setTimeout(function () { document.getElementById("msg_error_loginentry").style.display = "none"; }, 3000);
    }
    else if (!Password && Password.length <= 0) {
      isValid = false;
      $('#msg_error_loginentry').html('Please Enter Password').show();
      $('#Password').focus();
      setTimeout(function () { document.getElementById("msg_error_loginentry").style.display = "none"; }, 3000);
    }
    else {
      this.selectdepartment = this.DepartmententryText.param1;

      this.selectdivision = this.DivisionentryText.param1;

      this.selectsubdivision = this.SubDivisionentryText.param1;

      this.selectdesignation = this.DesignationentryText.param1;

      let dataL = {
        param1: "",
        param2: "",
        param3: this.employeeentryText, param4: "", param5: this.mobilenoentryText, param6: this.mobilenoentryText, param7: this.selectcity, param8: this.selectstate, param9: this.regaddressText, param10: this.pincodeText,
        param11: "", param12: this.selectdesignation, param13: "", param14: "", param15: "", param16: "", param17: "", param18: "", param19: this.selectdivision, param20: this.selectdepartment,
        param21: this.usernameText, param22: this.passwordText, param23: this.officialemailentryText, param24: this.selectsubdivision,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }

      try { AddLoader() } catch (e) { alert(e) }

      this.employeemodelservice.InsertemployeeAPI(dataL).subscribe((data) => {

        try { RemoveLoader() } catch (e) { alert(e) }

        this.datafromrespo = data.entity;
        //alert("aaaaaaaa"+this.datafromrespo);
        if (this.datafromrespo == 'Successfully Saved.') {
          $("#SuccessModalEntry").modal('show');
          this.clearfunction();
        }
        else {
          $("#ErrorModalEntry").modal('show');
        }
      });
    }
    // alert("error in inserting data");

  }

  stateText: any;
  selectstate: string;
  selectcity: string;
  ListOfCity = [];

  Citylist() {
    this.selectstate = this.stateText.param1;
    console.log(this.stateText.param2);
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
        this.ListOfCity = data.entity.list;
        //  this.resdata =     
        this.loading = false;

      });
  }

  ListOfState = [];
  Statelist() {
    // alert("sncjkdsbkcjdjvcjdsh cv/dshucv hdsuhvcudhucv hudh vdvid");
    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectStateListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfState = data.entity.list;
        // this.ListOfState = statelist;

        this.loading = false;
        // this.Divisionlist();
        // this.Designationlist();
        // this.Departmentlist();
      });

  }

  ListOfDivision = [];
  DivisionentryText: any;
  selectdivision: string;

  Divisionlist() {


    let keydata = {
      param1: "",
      param2: "",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectDivisionListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfDivision = data.entity.list;
        // this.ListOfState = statelist;

        this.loading = false;

      });
    this.Designationlist();

  }

  ListOfDesignation = [];
  // DesignationentryText:any

  Designationlist() {

    let keydata = {
      param1: "",
      param2: "",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectDesignationListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfDesignation = data.entity.list;
        // this.ListOfState = statelist;

        this.loading = false;

      });
  }
  DepartmententryText: any;
  selectdepartment: string;
  ListOfDepartment = [];
  // Departmentlist(){

  //   let keydata = {
  //     param1:"",
  //     param2:"",
  //     pageID: "7",
  //      pageName: this.encryptedpageNameValue,
  //      pageURL: this.encryptedpageUrlValue
  //   }  
  //   try{AddLoader()}catch(e){alert(e)}
  //   this.listService.SelectDepartmentListAPI(keydata).subscribe(
  //     (data)  => {
  //       try{RemoveLoader()}catch(e){alert(e)}
  //      this.ListOfDepartment = data.entity.list;
  //       // this.ListOfState = statelist;

  //       this.loading = false; 

  //     });
  // }
  //regaddressText:string;
  corrospondanceaddress: string;
  AddressSelection() {
    this.corrospondanceaddress = this.regaddressText;

  }
  selectcitydummy() {
    this.selectcity = this.cityText.param2;
  }

  selectdummydepartment() {
    this.selectdepartment = this.DepartmententryText.param2;
  }
  // selectdummydivision(){
  //   this.selectdivision = this.DivisionText.param2;
  // }
  selectdummydesignation() {
    this.selectdesignation = this.DesignationentryText.param2;
  }

  ListOfSubDivision = [];
  SubDivisionentryText: any;
  selectsubdivision: string;
  SelectDivisionData() {
    this.selectdivision = this.DivisionentryText.param1;
    // console.log(this.stateText.param2);
    let keydata = {
      param1: this.selectdivision,

      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.SelectSubDivisionListAPI(keydata).subscribe(
      (data) => {

        try { RemoveLoader() } catch (e) { alert(e) }

        // alert(JSON.stringify(data));
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfSubDivision = data.entity.list;
        //  this.resdata =     
        this.loading = false;

      });
  }

  //  ListOfDepartment = [];
  //  DepartmententryText:any;
  //  selectdepartment: string;
  SelectSubDivisionData() {
    this.selectsubdivision = this.SubDivisionentryText.param1;
    // console.log(this.stateText.param2);
    let keydata = {

      param1: this.selectdivision,
      param2: this.selectsubdivision,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }


    try { AddLoader() } catch (e) { alert(e) }


    this.listService.SelectDepartmentListAPI(keydata).subscribe(
      (data) => {

        try { RemoveLoader() } catch (e) { alert(e) }

        // alert(JSON.stringify(data));
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfDepartment = data.entity.list;
        //  this.resdata =     
        this.loading = false;

      });
  }

  clearfunction() {

    this.employeeentryText = ""; this.mobilenoentryText = ""; this.officialemailentryText = ""; this.regaddressText = "";
    this.corrospondanceaddress = ""; this.stateText = ""; this.selectstate = ""; this.cityText = ""; this.selectcity = "";
    this.pincodeText = ""; this.DivisionentryText = ""; this.selectdivision = ""; this.SubDivisionentryText = "";
    this.selectsubdivision = ""; this.selectdepartment = ""; this.DesignationentryText = "";
    this.selectdesignation = ""; this.usernameText = ""; this.passwordText = "";

  }

}
