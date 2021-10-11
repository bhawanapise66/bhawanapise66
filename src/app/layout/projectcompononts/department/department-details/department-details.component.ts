import { ExportToExcelService } from './../../services/export-to-excel.service';
import { ListService } from './../../../../../list.service';
import { DepartmentMasterService } from './../../services/department-master.service';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import * as xlsx from 'xlsx'
import { PdfService } from '../../services/pdf.service';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  encryptedpageUrlValue: string; encryptedpageNameValue: string;
  pageUrl = this.router.url; searchkey: string;
  departmentDetailsArray: any;
  designationList = [];
  errorMessage: string;
  datafromrespo: string;
  userKey: any;
  pageNumber: number = 1; itemsPerPage: number = 10; reverse: boolean = true; key: any; filter: any;

  deleteText: string; departmentId: string; departmentName: string; departmentDesc: string; loginName: string; password: string;
  personName: string; mobileNumber: string; emailId: string; address: string; pincode: string; divisionname: any;

  divisionObj: any; subDivisionList = []; division: string; Subdivision: string;
  subDivisionObj: any;
  public loading = false; p: number; pagecount: number; count: number; viewcount: number;

  divisionid: string; subdivisionName: string; subdivisionId: string; remark: string; divisionList: any;
  write_privilege:string; 
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 1000000,
    height: '200px',
  };
  departmentDetailsArrayforPDF: any=[];
  excelData: any[];
  constructor(private cryptService: CryptService, private router: Router, private departmentService: DepartmentMasterService,
    private listService: ListService, public pdfservice: PdfService, private excelservice: ExportToExcelService) { }

  ngOnInit() {
    /* ----------------------------------- Wizards start Ts------------------------------------------------- */

    (function ($) {
      $(document).ready(function () {
        $('#vendorName').focus();
        $(".buttonFinish").prop('disabled', false);
        $(".buttonNext").prop('disabled', false);
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
          } else {
            var step;
            try {
              step = $(".step-wizard ul li.active div.step")[0].innerText;
            } catch (error) {
              step = $(".step-wizard ul li div.step")[0].innerText;
            }

            var steps = $(".step-wizard ul li").length;
            // validateAllSteps(step, steps - 1);
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
          //  $('#msg_OfficialNo').html('').hide();
          //  $('#msg_Officialemail').html('').hide();
          var isValid = true;
          var departmentNameId = $('#departmentNameId').val();
          var Descriptionupdate = $('#Descriptionupdate').val();

          var Remark = $('#Remark').val();
          // Validate Vendor Name
          if (!departmentNameId && departmentNameId.length <= 0) {
            // validate Official No
            isValid = false;
            $('#msg_errorentry').html('Please Enter Department').show();
            $('#departmentNameId').focus();
          }
          else if (!Descriptionupdate && Descriptionupdate.length <= 0) {
            // validate Official No
            isValid = false;
            $('#msg_errorentry').html('Please Enter Department Description').show();
            $('#Descriptionupdate').focus();
          }
          else if (!Remark && Remark.length <= 0) {
            // validate Official No
            isValid = false;
            $('#msg_errorentry').html('Please Enter Remark').show();
            $('#Remark').focus();
          }

          if (isValid && index == 1) {

            // $('#msg_vendorName').html('').hide();
            // $('#msg_shortcode').html('').hide();
            // $('#msg_OfficialNo').html('').hide();
            // $('#msg_Officialemail').html('').hide();
            $('#msg_error').html('').hide();
            // $("#step-14").hide()
            // $("#step-15").show();
            // $("#step-16").hide();
            // $("#step-17").hide();

            setClasses(index, steps);
            $(".buttonFinish").prop('disabled', false);
            $('#pername').focus();
            isValid = false;
          }
          return isValid;
        }


        function validateStep2(index, steps) {
          $('#pername').focus();
          $('#msg_contactNo').html('').hide();
          $('#msg_alternateNo').html('').hide();
          $('#msg_State').html('').hide();
          $('#msg_city').html('').hide();
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
            $('#msg_pername').html('Please Enter Contact Number').show();
            $('#pername').focus();
          } else
            if (!contactNo && contactNo.length <= 0) {
              isValid = false;
              $('#msg_contactNo').html('Please Enter Contact Number').show();
              $('#contactNo').focus();
            } else
              if (!alternateNo && alternateNo.length <= 0) {
                // validate Alternate Number
                isValid = false;
                $('#msg_alternateNo').html('Please Enter Alternate Number').show();
                $('#alternateNo').focus();
              }
              else
                if (!regaddress && regaddress.length <= 0) {
                  // validate Alternate Number
                  isValid = false;
                  $('#msg_regadd').html('Please Enter Reg Address').show();
                  $('#regaddressnew').focus();
                }
                else if (state.length <= 0 && state == 'choose') {
                  // validate state
                  isValid = false;
                  $('#msg_State').html('Please Enter State').show();
                  $('#state').focus();

                } else if (!city && city.length <= 0 && city == 'choose') {
                  // validate city
                  isValid = false;
                  $('#msg_city').html('Please Enter City').show();
                  $('#city').focus();
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
            $(".buttonNext").prop('disabled', true);
            $(".buttonFinish").prop('disabled', false);
            isValid = false;
          }
          return isValid;
        }
        function validateStep4(index, steps) {
          return true;
        }
      });
    })(jQuery);

    this.userKey = sessionStorage.getItem('rid')
    this.write_privilege =sessionStorage.getItem('writePrivilege');
    if(this.write_privilege == "false")
    {
      $("#editbtn").css("display", "none");
      $("#deletebtn").css("display", "none");
      $("#addnewdept").css("display", "none");
     $('#editbtn').attr('disabled','disabled');
     $('#deletebtn').attr('disabled','disabled');
     $('#addnewdept').attr('disabled','disabled');
    }
    if (this.userKey == '10' || this.userKey == '11' || this.userKey == '16' || this.userKey == '21') {
     $("#updatecustid").show();
     $("#viewidcustdiv").show();
      this.flag1 = 1;
      this.customername14 = true;
      this.customername18 = true;

    } else {
      $("#updatecustid").hide();
      $("#viewidcustdiv").hide();

      this.flag1 = 0;
      this.customername14 = false;
      this.customername18 = false;
    }
    this.EncryptPageName();
    this.EncryptPageUrl();
    this.divisionDetails();
    this.DeptartmentDetails(); this.clearfunction();
    //  this._success.subscribe((message) => this.successMessageUpdate = message);    

    //  this._success.pipe(
    //    debounceTime(8000)
    //  ).subscribe(() => this.successMessageUpdate = null);

    /* ------------------------------- Wizards end Ts------------------------------------------------- */
  }
  flag1: number; customername14: boolean; customername18: boolean;
  EncryptPageName() {
    this.cryptService.encrypt("Deptartment Details")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }

  DeptartmentDetails() {
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
        this.DeptartmentPDFDetails();
      }
      else {
      }
    })
  }





  subdivname: any; getdividreturn: any;
  setdata(data) {
    this.backdetailsbtn();
    this.departmentId = data.param1;
    this.departmentName = data.param2;
    this.departmentDesc = data.param4;
    // this.personName = data.param8;
    // this.mobileNumber = data.param9;
    // this.emailId = data.param10;
    // this.address = data.param11;
    this.subdivname = data.param19;
    this.getsubdivisionreturn= data.param18;
    this.divisionname = data.param16;
    this.getdivisionreturn=data.param15;
    this.deptcustomerupdateTextid=data.param6;
    this.deptcustomerupdateTextname=data.param7;
    // this.getdivisionreturn = this.check(this.divisionname);
    // this.getsubdivisionreturn = this.check(this.subdivname);
    //  this.getdividreturn = this.getid(this.subDivisionList ,this.subdivname);
    this.backdetailsbtn();
  };

  editpageform() {
    this.customerList();
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
    // this.Citylist();
    this.divisionDetails();
    this.getsubDivisionId();
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




  DeleteDepartment() {
    let dataL = {
      param1: this.deleteText,
      param2: this.departmentId,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.departmentService.DeleteDepartment(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      if (response.statuscode == '200') {
        this.errorMessage = response.entity;
        $("#updateSuccessModal").modal('show');
        this.DeptartmentDetails();
        this.deleteText="";
      }
      else {
        this.errorMessage = response.entity;
        $("#ErrorModal").modal('show');
      }

    })
  }



  divisionDetails() {
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
    this.listService.SelectDivisionListAPI(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.divisionList = response.entity.list
    })
  }


  updateDepartment() {
   // var divisionname = this.getid(this.divisionList, this.divisionname);
    // alert("divisonnnnnnn"+divisionname)
    // var subdivision = this.getid(this.subDivisionList, this.subdivname);
    // alert("aaaaaaaaaaaaa"+subdivision)
    var department = $("#departmentNameId").val();
    var description = $("#Descriptionupdate").val();
    var remark = $("#remarkId").val();
    var dummydept = $("#customerupdatedeptid").val();

     var divisionname = $("#divisionupdatedummy").val();
    // alert(divisionname);
     var subdivision = $("#subdivisionupdatedummy").val();
     
    var isValid = true;
    if (this.flag1==1 &&(!dummydept && dummydept.length <= 0)) {
      // alert(devicetype);
      isValid = false;
      $('#msg_errorupdate').html('Please Select Customer').show();
      $('#customerupdatedept').focus();
      setTimeout(function () { document.getElementById("msg_errorupdate").style.display = "none"; }, 3000);
    }
    else
    if (!divisionname && divisionname.length <= 0) {
      // alert(devicetype);
      isValid = false;
      $('#msg_errorupdate').html('Please Enter Division').show();
      $('#division').focus();
      setTimeout(function () { document.getElementById("msg_errorupdate").style.display = "none"; }, 3000);
    }
    else if (!subdivision && subdivision.length <= 0) {
      isValid = false;
      $('#msg_errorupdate').html('Please Enter Sub Division').show();
      $('#subdivision').focus();
      setTimeout(function () { document.getElementById("msg_errorupdate").style.display = "none"; }, 3000);
    }
    else if (!department && department.length <= 0) {
      isValid = false;
      $('#msg_errorupdate').html('Please Enter Department').show();
      $('#departmentNameId').focus();
      setTimeout(function () { document.getElementById("msg_errorupdate").style.display = "none"; }, 3000);
    }
    else if (!description && description.length <= 0) {
      isValid = false;
      $('#msg_errorupdate').html('Please Enter Description').show();
      $('#Descriptionupdate').focus();
      setTimeout(function () { document.getElementById("msg_errorupdate").style.display = "none"; }, 3000);
    }
    else if (!remark && remark.length <= 0) {
      isValid = false;
      $('#msg_errorupdate').html('Please Enter Remark').show();
      $('#remarkId').focus();
      setTimeout(function () { document.getElementById("msg_errorupdate").style.display = "none"; }, 3000);
    }

    else {
      let dataL = {
        remark: this.remark,
        departmentId:this.departmentId,
        departmentName: department,
        departmentCode:"",
        departmentDescription: description,
        loginName: "",
        loginPasswad: "",
        personName: "",
        personMobileNo:"",
        personEmailId: "",
        personAddress: "",
        personPincode: "",
        personDesignationId:"",
        divisionId:this.getdivisionreturn,
        subdivisionId: this.getsubdivisionreturn,
        customerId:this.deptcustomerupdateTextid,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }
      this.departmentService.UpdateDepartment(dataL).subscribe((response) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.errorMessage = response.entity;
        if (response.statuscode == '200') {
         
            $("#updateSuccessModal").modal('show');
            this.DeptartmentDetails(); this.clearfunction();
          
          this.closemodal();
        }
        else {
          this.errorMessage = response.entity;
          $("#ErrorModal").modal('show');

        }
      })
    }

  }

  DepartmentPageChange(event) {
    this.pageNumber = event;
    this.pagecount = $("#selectrow1").val();
    //  console.log("p" + this.p);
    this.itemsPerPage = this.pagecount;
    let keydata = {
      pageNo: this.pageNumber,
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
    this.departmentService.DepartmentDetails(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.list;
        let vendorlist = resdatalist;
        this.departmentDetailsArray = data.entity.responsedatalist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });

  }
 
  searchdata() {
    let dataL = {
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
    this.departmentService.DepartmentDetails(dataL).subscribe((response) => {

      try { RemoveLoader() } catch (e) { alert(e) }
      if (response.statuscode == 200) {
        this.departmentDetailsArray = response.entity.responsedatalist;
        this.count = response.entity.count;
        this.viewcount = response.entity.viewCount;
      }
    })
  }

  Refreshfunction() {
    this.pageNumber = 1; this.itemsPerPage = 10;
    this.filter = ''
    this.DeptartmentDetails()

  }

  getdivisionreturn: any = '';
  getsubdivisionreturn: any = '';
  divisionidupdate()
  {
    this.getdivisionreturn = this.divisionname.param1;
  }
  getsubDivisionId() {
   // this.getdivisionreturn = this.check(this.divisionname);

   
  //  alert(this.getdivisionreturn);

    let dataL = {
      param1: this.getdivisionreturn,
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


  DeptartmentPDFDetails() {
    let dataL = {
      pageNo: "",
      itemsPerPage: "",
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
        this.departmentDetailsArrayforPDF = response.entity.responsedatalist;
        this.PrepareExcelData(this.departmentDetailsArrayforPDF);
      }
      else {
      }
    })
  }

  PrepareExcelData(data) {
    this.excelData = [];
    if (this.flag1 == 1) {
      for (var i = 0; i < data.length; i++) {
        var obj = {
          "#": data[i]["rowNumber"],
          "Customer Name": data[i]["param7"],
         

          "Division": data[i]["param16"],
          "Sub Division": data[i]["param19"],
          "Department": data[i]["param2"],
          "Description": data[i]["param4"]
        }
        this.excelData.push(obj);
      }
    } else {
      for (var i = 0; i < data.length; i++) {
        var obj1 = {
          "#": data[i]["rowNumber"],
         
          "Division": data[i]["param16"],
          "Sub Division": data[i]["param19"],
          "Department": data[i]["param2"],
          "Description": data[i]["param4"]
        }
        this.excelData.push(obj1);
      }
    }

  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, "Department Details", 'department')
  }



  createPDF() {
    let pdfTableData;
    let dataArray = []
    if (this.flag1 == 1) {
      for (let i = 0; i < this.departmentDetailsArrayforPDF.length; i++) {
        pdfTableData = {
          "#": i + 1,
          "Customer Name": this.departmentDetailsArrayforPDF[i]["param7"],

          "Division": this.departmentDetailsArrayforPDF[i]["param16"],
          "Sub Division": this.departmentDetailsArrayforPDF[i]["param19"],
          
          "Department": this.departmentDetailsArrayforPDF[i]["param2"],
          "Description": this.departmentDetailsArrayforPDF[i]["param4"],
        }
        dataArray.push(pdfTableData)
      };
    }
    else {
      for (let i = 0; i < this.departmentDetailsArrayforPDF.length; i++) {
        pdfTableData = {
          "#": i + 1,
      
          "Division": this.departmentDetailsArrayforPDF[i]["param16"],
          "Sub Division": this.departmentDetailsArrayforPDF[i]["param19"],
          "Department": this.departmentDetailsArrayforPDF[i]["param2"],
          "Description": this.departmentDetailsArrayforPDF[i]["param4"]
        }
        dataArray.push(pdfTableData)
      };
    }

    this.pdfservice.CreatePDFData(dataArray, "Department Details");
  }
  SelectRows() {

    var search = $('#searchData').val();
    var selectrow = $('#selectrow1').val();
    this.loading = true;
    // alert("selectrow "+ selectrow);
    this.p = 1; this.pagecount = selectrow;
    //  console.log("p" + this.p);
    this.itemsPerPage = this.pagecount;

    let keydata = {
      pageNo: this.pageNumber,
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
    this.departmentService.DepartmentDetails(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.responsedatalist;


        let vendorlist = resdatalist;

        this.departmentDetailsArray = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }
  showcount: string;
  check(data) {
    try {
      if (typeof data === 'object') {
        // console.log("come in object if")
        return data.param1;

      } else if (data == '') {
        //  console.log("come in else if ")
        return data;


      } else {
        //   console.log(data.length)

        return data;
      }
    } catch (e) {
      return '';
    }



  }
  subdivisionid: string;
  getsubDivisionIddummy() {
    //this.getsubdivisionreturn = this.check(this.subdivname);
        this.getsubdivisionreturn = this.subdivname.param1;
  }

  getid(data, value) {
    try {
      if (typeof value === 'object') {
      //  console.log("come in object if")

        return value.param1;
        // return data.param1;
      }
      else {
        //  alert(value)
        var index = data.findIndex(x => x.param2 === value);
        //  alert(index)
        return data[index].param1;
      }
    } catch (e) {
      return '';
    }

  }
  DepartmentDeletefunction() {
    var isValid = true;
    var deleteremark = $('#departmentdelremark').val();
    deleteremark = deleteremark.substring(0, 1).toUpperCase() + deleteremark.substring(1);
    // Validate Contact Name
    if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      // $('#msg_error_delete').html('Please Enter Remark').show();
      $('#msg_error_delete').html('Please Enter Remark').show();
      $('#departmentdelremark').focus();
      setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        param1: deleteremark,
        param2: this.departmentId,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }
      try { AddLoader() } catch (e) { alert(e) }

      this.departmentService.DeleteDepartment(dataL).subscribe((response) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.errorMessage = response.entity;
        if (response.statuscode == '200') {
         
            $("#updateSuccessModal").modal('show');
            this.DeptartmentDetails(); this.clearfunction();
          
          this.closemodal();
        }
        else {
          this.errorMessage = response.entity;
          $("#ErrorModal").modal('show');

        }
      })
    }

  }
  closemodal() {
    //alert("come ");
    $("#successmodel").modal('hide');

    $('#modeldelete').modal('hide');
    $('#myModalwizard').modal('hide');

    $('.modal-backdrop.show').css('display', 'none');
    this.clearfunction();
  }
  sort(key) {

    //  alert(key);   

    this.key = key;
    this.reverse = !this.reverse;

  }

  clearfunction() {
    this.divisionname = ""; this.getdivisionreturn = ""; this.subdivname = ""; this.getsubdivisionreturn = "";
    this.departmentName = ""; this.departmentDesc = ""; this.remark = ""; this.deptcustomerupdateTextname="";
    this.deptcustomerupdateTextid="";this.deleteText="";
  }

  deptcustomerupdateTextname:any;deptcustomerupdateTextid:any;
  SelectdeptcustomerDataupdate()
  {
this.deptcustomerupdateTextid=this.deptcustomerupdateTextname["param1"];
  }


  customerListArray:any=[];
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
}
