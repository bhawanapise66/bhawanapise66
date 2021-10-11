import { EmployeemodelService } from './../../../../APIService/employeemodel.service';
import { PlaceodrmodelService } from './../../../../APIService/placeodrmodel.service';
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
import * as $ from 'jquery';
import * as xlsx from 'xlsx'
import { CryptService } from '../../services/crypt.service';
import { PdfService } from '../../services/pdf.service';
import { ExportToExcelService } from '../../services/export-to-excel.service';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.css']
})
export class EmployeedetailsComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  key: string = 'name'; reverse: boolean = true; p: number;

  selectRowsText: string = "10";write_privilege:string; 
  pageUrl = this.router.url;
  public loading = false; pagecount: number; count: number; viewcount: number;
  SelectPageText: string; PlaceOrderDetails$: Object; remarkText: string; deleteText: string; EmployeeDetails$: any;
  private _success = new Subject<string>(); successMessageUpdate: string; officialemailupdateText: string; employeeidupdate: string;
  datafromrespo: string; excelpdfDetails$ = [];
  usernameTextupdate: string; passwordTextupdate: string;

  employeeupdateText: string; mobilenoupdateText: string;
  regaddressUpdateText: string; pincodeUpdateText: string; filter: string; isChecked: string; corrospondanceaddress: string; pincodeText: string;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService, 
    private employeemodelservice: EmployeemodelService, private listService: ListService, private cryptService: CryptService, 
    private router: Router, private placeodrService: PlaceodrmodelService, public pdfservice: PdfService, public excelservice: ExportToExcelService) {

  }

  ngOnInit() {
    //  Added Count , ViewCount = 0 ............Date : 2-12-2020 Developer: Aditya Londhe
    this.count = 0;
    this.viewcount = 0;
    /* ------------------------------- Wizards start Ts------------------------------------------------- */


    (function ($) {
      $(document).ready(function () {
        $('#vendorName').focus();
        $(".buttonFinish").prop('disabled', true);
        $("#step-14").show();
        $("#step-15").hide();
        $("#step-16").hide();
        $("#step-17").hide();
        function setClasses(index, steps) {
          if (index < 0 || index > steps) return;
          if (index == 0) {
            $(".buttonPrevious").prop('disabled', true);
          } else {
            $(".buttonPrevious").prop('disabled', false);
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

          $(".buttonNext").prop('disabled', false);
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
          var employeename = $('#employeeNameupdate').val();
          var ofcNo = $('#officialNoupdate').val();
          var ofcemail = $('#officialEmailupdate').val();
          var Regadd1 = $('#regaddressupdate').val();
          var state = $('#statedummyupdate').val();
          var city = $('#citydummyupdate').val();

          // Validate Vendor Name
          if (!employeename && employeename.length <= 0) {
            isValid = false;
            $('#msg_error').html('Please Enter Employee Name').show();
            $('#employeeNameupdate').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
          }
          else if (!ofcNo && ofcNo.length <= 0) {
            // validate GST No
            isValid = false;
            $('#msg_error').html('Please Enter Official No').show();
            $('#officialNoupdate').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
          } else if (!ofcemail && ofcemail.length <= 0) {
            // validate GST No
            isValid = false;
            $('#msg_error').html('Please Enter Valid Email').show();
            $('#officialEmailupdate').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
          } else if (!Regadd1 && Regadd1.length <= 0) {
            // validate GST No
            isValid = false;
            $('#msg_error').html('Please Enter Address').show();
            $('#regaddressupdate').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
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
            $('#msg_error').html('Please Enter State').show();
            $('#stateentry').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
          }
          else if (!city && city.length <= 0) {
            // validate GST No
            isValid = false;
            $('#msg_error').html('Please Enter City').show();
            $('#cityentry').focus();
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
            $(".buttonFinish").prop('disabled', false);
            $(".buttonNext").prop('disabled', true);

            isValid = false;
          }
          return isValid;
        }


        function validateStep2(index, steps) {
          $('#pername').focus();
          $('#msg_error_contact').html('').hide();
          // $('#msg_alternateNo').html('').hide();
          // $('#msg_State').html('').hide();
          // $('#msg_city').html('').hide();
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
          }

          //  else if(state == null){ 
          //   // validate state
          //    isValid = false;
          //    $('#msg_error_contact').html('Please Enter State').show();     
          //    $('#state').focus();   

          //  }else if(city == null ){
          //   // validate city
          //   isValid = false;
          //   $('#msg_error_contact').html('Please Enter City').show(); 
          //   $('#city').focus();        
          // } 
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
                $('#msg_error_contact').html('Please Enter Valid Pincode No.').show();
                $('#alternateNo').focus();
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

            $(".buttonFinish").prop('disabled', false);
            $(".buttonNext").prop('disabled', true);
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
            $(".buttonNext").prop('disabled', true);
            $(".buttonFinish").prop('disabled', false);
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


    this.write_privilege =sessionStorage.getItem('writePrivilege');
    if(this.write_privilege == "false")
    {
      $("#editbtn").css("display", "none");
      $("#deletebtn").css("display", "none");
      $("#addnewemp").css("display", "none");
      $("#bulkid").css("display", "none");
      $('.material-icons md-18').css("display", "none");
     $('#editbtn').attr('disabled','disabled');
     $('#deletebtn').attr('disabled','disabled');
     $('#addnewemp').attr('disabled','disabled');
     
    }
    this.EncryptPageName();
    this.EncryptPageUrl();

    this.EmployeeDetail();
    this.Statelist(); this.clearfunction();


    /* ------------------------------- Wizards end Ts------------------------------------------------- */
  }

  EncryptPageName() {
    this.cryptService.encrypt("Employee Details")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }
  editpageform() {
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
    this.Statelist();
    this.Divisionlist();
    this.Designationlist();
    // this.Departmentdemolist();
    if(this.write_privilege == "false")
    {
      $("#editbtn").css("display", "none");
    }

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
    if(this.write_privilege == "false")
    {
      $("#editbtn").css("display", "none");
    }
  }

  selectdatastate: string;
  selectdatacity: string;
  selectdesignation: string;

  vensaveeditbtn() {
    var isValid = true;
    var division = this.getid(this.ListOfDivision, this.Division_Text);
    //alert("diiiiiiii"+division);
    var subdivision = this.getid(this.ListOfSubDivision, this.SUbDivision_Text);
    //alert("subdiiii"+subdivision);
    var Department = this.getid(this.ListOfDepartment, this.Department_Name);
    //alert("deppppp"+Department);
    var designation = this.getid(this.ListOfDesignation, this.DesignationupdateText);
    //alert("desiggggg"+designation);
    var remark = $('#employeeremarkupdate').val();
    // $('#divisiondummyupdate').val();
    // Validate Contact Name
    //if(!division && division.length <= 0){
    if (division == null) {
      isValid = false;
      $('#msg_error_contact').html('Please Enter Division').show();
      $('#Divisionupdate').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

    }
    else if (subdivision == null) {
      // validate state
      isValid = false;
      $('#msg_error_contact').html('Please Enter Sub Division').show();
      $('#SubDivisionupdate').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

    }
    //else if(!Department && Department.length <= 0){
    else if (Department == null) {
      // validate state
      isValid = false;
      $('#msg_error_contact').html('Please Enter Department').show();
      $('#Departmentupdate').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

    }
    else if (designation == null) {
      //  else if(!designation && designation.length <= 0){
      // validate state
      isValid = false;
      $('#msg_error_contact').html('Please Enter Designation').show();
      $('#Designationupdate').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

    }
    else if (!remark && remark.length <= 0) {
      // validate state
      isValid = false;
      $('#msg_error_contact').html('Please Enter Remark').show();
      $('#employeeremarkupdate').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

    }



    else {
      // this.selectdatastate =  this.stateTextUpdate.param1;
      // this.selectdatacity =  this.cityTextUpdate.param1;

      //   this.selectdepartment = this.DepartmentTextUpdate.param1;
      //   this.selectdivisionupdate = this.DivisionTextUpdate.param1;
      //   this.selectdesignation = this.DesignationTextUpdate.param1;
      let dataL = {
        param1: remark,
        param2: this.employeeidupdate,
        param3: this.employeeupdateText, param4: "", param5: this.mobilenoupdateText, param6: this.mobilenoupdateText, param7: this.selectdatacity, param8: this.selectdatastate, param9: this.regaddressUpdateText,
        param10: this.pincodeUpdateText, param11: "", param12: designation, param13: "", param14: "", param15: "", param16: "", param17: "",
        param18: "",
        param19: division, param20: Department,
        param21: "", param22: "", param23: this.officialemailupdateText, param24: subdivision,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }

      try { AddLoader() } catch (e) { alert(e) }
      this.employeemodelservice.UpdateEmployeeAPI(dataL).subscribe((data) => {
        //  alert(dataL);
        //  alert(data);
        try { RemoveLoader() } catch (e) { alert(e) }
        this.datafromrespo = data.entity;

        if (this.datafromrespo == 'Successfully updated.') {
          $("#SuccessModal").modal('show');
          this.EmployeeDetail(); this.clearfunction();
        }
        else {
          $("#notifymodel").modal('show');
        }
      });
    }
  }
  ListOfState = [];
  ListOfCity = [];
  RemarkupdateText: string;
  EmployeeDetail() {
    // alert("jdbkbsckdbsv");
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
    this.employeemodelservice.EmployeeDetailsAPI(keydata).subscribe(
      (data) => {

        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.list;
        this.EmployeeDetailsarr = resdatalist;
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);
        if(data.statuscode == '200' && resdatalist == "NO RECORD FOUND")
        {
          this.keybooleana2=false;
        }
        else
        if(data.statuscode == '200' && this.EmployeeDetailsarr.length !=0  )
        {
          this.keybooleana2=true;
          let vendorlist = resdatalist;
          this.count = data.entity.count;
          this.viewcount = data.entity.viewCount;
          this.EmployeeDetails$ = vendorlist;
  
          this.EmployeePDFDetail();
        }
       
      });
  }
  emp_state_Text: any;EmployeeDetailsarr:any=[];
  emp_city_Text: any;
  Division_Text: any;
  DesignationupdateText: any; keybooleana2:boolean;

  selectcityupdate: string;
  selectstateupdate: string;
  Department_Name: any;
  SUbDivision_Text: any;

  setdata(com) {
    //  this.selectcity = this.emp_city_Text.param2;
    // alert(com);
    let vendordatadetails = com;
    //  this.vendor_id = vendordatadetails.param1;
    this.employeeidupdate = vendordatadetails.param1;
    this.employeeupdateText = vendordatadetails.param2;
    this.mobilenoupdateText = vendordatadetails.param4;
    this.officialemailupdateText = vendordatadetails.param26;
    this.regaddressUpdateText = vendordatadetails.param10;
    this.pincodeUpdateText = vendordatadetails.param11;
    this.emp_city_Text = vendordatadetails.param7;
    this.emp_state_Text = vendordatadetails.param9;
    this.Division_Text = vendordatadetails.param28;
    this.SUbDivision_Text = vendordatadetails.param31;
    this.Department_Name = vendordatadetails.param24;
    this.DesignationupdateText = vendordatadetails.param14;
    this.usernameTextupdate = vendordatadetails.param29;
    this.passwordTextupdate = vendordatadetails.param30;

    this.selectstatereturn = this.check(this.emp_state_Text);
    this.selectcityreturn = this.check(this.emp_city_Text);
    this.divisionreturn = this.check(this.Division_Text);
    this.subdivisionreturn = this.check(this.SUbDivision_Text);
    this.departmentreturn = this.check(this.Department_Name);
    this.designationreturn = this.check(this.DesignationupdateText);

    // alert(vendordatadetails.param4);
  }
  employeeMasterpageChanged(event) {
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

    // Distributor Detail Grid BIND LIST    
    this.employeemodelservice.EmployeeDetailsAPI(keydata).subscribe(
      (data) => {
        //  alert(JSON.stringify(data));
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        let resdatalist = data.entity.list;
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);

        let vendorlist = resdatalist;
        //  let resdatadev = resdata['list'];
        //  console.log(resdatadev);
        //  console.log(vendorlist);
        this.EmployeeDetails$ = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }

  ListOfDivision = [];
  DivisionTextUpdate: any;
  selectdivisionupdate: string;
  //this.selectdivision = this.DivisionText.param2;
  Divisionlist() {


    let keydata = {
      param1: "",
      param2: "",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.SelectDivisionListAPI(keydata).subscribe(
      (data) => {

        this.ListOfDivision = data.entity.list;
        // this.ListOfState = statelist;

        this.loading = false;

      });
  }
  DesignationTextUpdate: any;
  ListOfDesignation = [];
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

  // stateText:any;
  //  selectstate:string;
  //  selectcity:string;
  //  ListOfCity = [];
  cityTextUpdate: any;
  CitylistUpdate() {

    this.selectstatereturn = this.check(this.emp_state_Text);

    this.selectstateupdate = this.emp_state_Text.param1;
    // console.log(this.stateText.param2);
    let keydata = {
      param1: this.selectstateupdate,
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
  stateTextUpdate: any;
  // ListOfState = [];
  Statelist() {
    //  alert("aknxsjaxkjsbackbsakcbsbcjbjsacjsn");
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

      });
  }

  DepartmentTextUpdate: any;
  selectdepartment: string;
  ListOfDepartment = [];
  Departmentdemolist() {

    this.subdivisionreturn = this.check(this.SUbDivision_Text);


    this.selectdepartment = this.SUbDivision_Text.param1;
    let keydata = {
      param1: "",
      param2: "",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectDepartmentListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfDepartment = data.entity.list;
        // this.ListOfState = statelist;

        this.loading = false;

      });
  }

  EmployeeDeletefunction() {
    var isValid = true;
    var deleteremark = $('#employeedelremark').val();
    // Validate Contact Name
    if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      $('#msg_error_delete').html('Please Enter Remark').show();
      $('#employeedelremark').focus();
      setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        param1: deleteremark,
        param2: this.employeeidupdate,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }
      try { AddLoader() } catch (e) { alert(e) }
      this.employeemodelservice.DeleteEmployeeAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.datafromrespo = data.entity;

        if (this.datafromrespo == 'Successfully Deleted.') {
          $("#SuccessModal").modal('show');
          this.EmployeeDetail();
        }
        else {
          $("#notifymodel").modal('show');
        }
      });
      // alert("error in inserting data");
    }
  }
  selectdivision: string;
  ListOfSubDivision: any;
  selectsubdivision() {
    this.divisionreturn = this.check(this.Division_Text);
    this.selectdivision = this.Division_Text.param1;
    let keydata = {
      param1: this.selectdivision,
      param2: "",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectSubDivisionListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfSubDivision = data.entity.list;
        // this.ListOfState = statelist;

        this.loading = false;

      });
  }
  AddressSelection() {
    this.corrospondanceaddress = this.regaddressUpdateText;

  }
  selectcityreturn: any = '';
  divisionreturn: any = '';
  subdivisionreturn: any = '';
  departmentreturn: any = '';
  designationreturn: any = '';
  selectcitydummy() {
    this.selectcityreturn = this.check(this.emp_city_Text);
    this.selectcityupdate = this.emp_city_Text.param2;
  }
  selectdummydepartment() {
    this.departmentreturn = this.check(this.Department_Name);

    this.selectdepartment = this.Department_Name.param2;
  }
  selectsubdivisiondummy() {
    this.subdivisionreturn = this.check(this.SUbDivision_Text);

    this.selectdivisionupdate = this.SUbDivision_Text.param2;
    // alert("aaaaaa");
  }
  selectdummydesignation() {
    this.designationreturn = this.check(this.DesignationupdateText);

    this.selectdesignation = this.DesignationupdateText.param2;
  }
  bulkentryClick() {
    this.router.navigate(['./empbulkentry']);
  }
  // employeeMasterpageChanged(event){
  //   var search = $('#searchData').val();
  //   var selectrow = $('#selectrow').val();
  //   this.p = event; this.pagecount = selectrow;
  //   //  console.log("p" + this.p);

  //     let keydata = {
  //       pageNo:this.p,
  //       itemsPerPage:this.pagecount,    
  //       searchBy: "", 
  //       searchType:"",
  //       totalRecords:"NA",
  //       pageID: "7",
  //       pageName: this.encryptedpageNameValue,
  //       pageURL: this.encryptedpageUrlValue
  //     }
  //     try{AddLoader()}catch(e){alert(e)} 
  //      // Distributor Detail Grid BIND LIST    
  //      this.employeemodelservice.EmployeeDetailsAPI(keydata).subscribe(
  //       (data)  => {
  //         try{RemoveLoader()}catch(e){alert(e)} 
  //       //  console.log(data.entity)
  //         // console.log("wekcome_ "+data);
  //         let resdatalist = data.entity.list; 
  //        //  this.resdata = 
  //        // console.log("wekcome_ "+resdata);

  //          let vendorlist = resdatalist;
  //        //  let resdatadev = resdata['list'];
  //        //  console.log(resdatadev);
  //        //  console.log(vendorlist);
  //          this.EmployeeDetails$ = vendorlist;
  //          this.count = data.entity.count;
  //          this.viewcount = data.entity.viewCount;

  //          this.loading = false; 
  //       });
  //    }

  DesignationDeletefunction() {
    var isValid = true;
    var deleteremark = $('#employeedelremark').val();
    // Validate Contact Name
    if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      // $('#msg_error_delete').html('Please Enter Remark').show();
      $('#msg_error_delete').html('Please Enter Remark').show();
      $('#employeedelremark').focus();
      setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        param1: deleteremark,
        param2: this.employeeidupdate,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }


      try { AddLoader() } catch (e) { alert(e) }


      this.employeemodelservice.DeleteEmployeeAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        //  alert(data);
        this.datafromrespo = data.entity;

        if (this.datafromrespo == 'Successfully deleted.') {
          $("#SuccessModal").modal('show');
          this.EmployeeDetail();
          this.closemodal();

          //  $('#modeldelete').modal('toggle');
        }
        else {
          $("#ErrorModal").modal('show');
        }
      });
      // alert("error in inserting data");
    }

  }
  closemodal() {
    
    $("#SuccessModel").modal('hide');

    $('#modeldelete').modal('hide');
    $('#myModalwizard').modal('hide');

    $('.modal-backdrop.show').css('display', 'none');
    this.clearfunction();
  }

  DesignationMasterpageChanged(event) {
    this.p = event; this.pagecount = 10;
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
    this.employeemodelservice.EmployeeDetailsAPI(keydata).subscribe(
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
        this.EmployeeDetails$ = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }
  Refreshfunction() {
    this.selectRowsText = "10";
    this.loading = true;
 this.filter="";
    this.EmployeeDetail();
  }

  EmployeePDFDetail() {
   
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
   //    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.employeemodelservice.EmployeeDetailsAPI(keydata).subscribe(
      (data) => {

       // try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.responsedatalist; 
        let vendorlist = resdatalist;
        this.excelpdfDetails$ = vendorlist;
        this.PrepareExcelData(this.excelpdfDetails$);
      });
  }

  createPDF() {
    let pdfTableData;
    let dataArray = []
    for (let i = 0; i < this.excelpdfDetails$.length; i++) {
       pdfTableData = {
        "#": i + 1,
        "Employee Name": this.excelpdfDetails$[i]["param2"],
        "Mobile No": this.excelpdfDetails$[i]["param4"],
        "Email": this.excelpdfDetails$[i]["param26"],
        "Address": this.excelpdfDetails$[i]["param10"],
        "Division": this.excelpdfDetails$[i]["param28"],
        "Sub Division": this.excelpdfDetails$[i]["param31"],
        "Designation": this.excelpdfDetails$[i]["param14"]
      }
      dataArray.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(dataArray,"User Details");  

  }

  excelData:any=[];
  PrepareExcelData(data) {
    this.excelData = [];

    for (var i = 0; i < data.length; i++) {
      try {
        var obj = {

          "#": i + 1,
          "Employee Name": data[i].param2,
          "Mobile No": data[i].param4,
          "Email": data[i].param26,
          "Address": data[i].param10,
          "Division": data[i].param28,
          "Sub Division": data[i].param31,
          "Designation": data[i].param14

        }
      } catch (e) { }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'Employee Details', 'employeedetails');
  }

  SelectRows() {

    var search = $('#searchData').val();
    var selectrow = $('#selectrow1').val();
    this.loading = true;
 //   alert("selectrow " + selectrow);
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
    this.employeemodelservice.EmployeeDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.list;
        if(data.statuscode == '200' && resdatalist == "NO RECORD FOUND")
        {
          $("#pgchange").hide();
        }
        else
        {

        let vendorlist = resdatalist;

        this.EmployeeDetails$ = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
        }
      });
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
    this.employeemodelservice.EmployeeDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.list;
        if(data.statuscode == '200' && resdatalist == "NO RECORD FOUND")
        {
          $("#pgchange").hide();
        }
        else
        {

        let vendorlist = resdatalist;

        this.EmployeeDetails$ = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
        }
      });
  }

  sort(key) {

    //  alert(key);

    this.key = key;
    this.reverse = !this.reverse;

  }
  selectstatereturn: any = '';
  check(data) {
    try {
      if (typeof data === 'object') {
        console.log("come in object if")
        return data.param1;
      }
      else if (data == '') {
        console.log("come in Else if")
      }
      else {
        console.log(data.length)

        return data;
      }
    } catch (e) {
      return '';
    }
  }

  getid(data, value) {
    try {
      if (typeof value === 'object') {
        console.log("come in object if")
        console.log(value.param1 + "  ====  " + value.param2);
        return value.param1;
        // return data.param1;
      }
      else {
        //alert(value)
        console.log("come in else")
        var index = data.findIndex(x => x.param2 === value);
        //alert(index)
        return data[index].param1;
      }
    } catch (e) {
      return '';
    }

  }

  clearfunction(){

    this.employeeupdateText=""; this.mobilenoupdateText=""; this.officialemailupdateText=""; this.regaddressUpdateText="";
    this.corrospondanceaddress=""; this.emp_state_Text=""; this.selectstatereturn=""; this.emp_city_Text="";
    this.selectcityreturn=""; this.pincodeText=""; this.Division_Text=""; this.divisionreturn="";this.SUbDivision_Text="";
    this.subdivisionreturn=""; this.Department_Name=""; this.departmentreturn=""; this.DesignationupdateText="";
    this.designationreturn=""; this.RemarkupdateText=""; 

  }
}
