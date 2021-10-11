import { PdfService } from './../../services/pdf.service';
import { ExportToExcelService } from './../../services/export-to-excel.service';
import { CompanyService } from './../../services/company.service';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { ListService } from './../../../../../list.service';
import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
declare var $: any;

declare var AddLoader: any;
declare var RemoveLoader: any;



@Component({
  selector: 'app-company-employee-details',
  templateUrl: './company-employee-details.component.html',
  styleUrls: ['./company-employee-details.component.css']
})
export class CompanyEmployeeDetailsComponent implements OnInit {
  count: any;

  filter: string = ''; pageNumber: any = 1; itemsPerPage: any = 10;
  viewcount: any; key: any; reverse: any;
  designationList: any[] = [];

  companyEmpGrid: any;write_privilege:string;


  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  encryptedpageNameValue: any;
  encryptedpageUrlValue: any;
  pageUrl = this.router.url;

  empName: any; empMobile: any; empEmail: any; empAddress: any; empState: any; empCity: any;
  empPincode: any; empDesignation: any; empDept: any;
  isChecked: boolean;
  corrAddress: any;
  selectstatereturn: any;
  selectcityreturn: any;
  statelistarr: any;
  departmentlistarr: any;
  designationlistarr: any;
  remark: any;
  empId: any; empCode: any;
  bankName: any;
  accNo: any;
  ifcsCode: any;
  bankAddress: any;
  responseMessage: string;
  totalcount: any;
  totalrecords: any = "NA";
  citylistarr: any;
  bankState: any;
  bankCity: any;
  selectdesignationreturn: any;
  selectdeptreturn: any;
  selectBankStatereturn: any;
  selectBankcityreturn: any;
  bankcitylistarr: any;
  companyEmpGridforPDF: any;
  excelData: any[];

  constructor(private listService: ListService, private cryptService: CryptService, private router: Router, private companyService: CompanyService,private excelservice: ExportToExcelService,private pdfservice: PdfService
  ) {
    this.EncryptPageName(); this.EncryptPageUrl();
  }

  ngOnInit() {
    this.CompanyEmpDetails();
    this.companyEmpDetailsPDF();


    this.Statelistfun();
    this.DepartmentList();
    this.DesignationList();

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
          $('#vendorName').focus();
          $('#msg_error').html('').hide();

          var isValid = true;
          var employeename = $('#employeeNameupdate').val();
          var ofcNo = $('#officialNoupdate').val();
          var ofcemail = $('#officialEmailupdate').val();
          var Regadd1 = $('#regaddressupdate').val();
          var state = $('#statedummyupdate').val();
        //  alert(state)
          var city = $('#citydummyupdate').val();

          if (employeename == '' || employeename == null) {
            isValid = false;
            $('#msg_error').html('Please Enter Employee Name').show();
            $('#employeeNameupdate').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
          }
          else if (ofcNo == "" || ofcNo == null || ofcNo.length < 10) {
            isValid = false;
            $('#msg_error').html('Please Enter Mobile No').show();
            $('#officialNoupdate').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
          }
          else if (ofcemail == null || ofcemail == "" || ofcemail.includes("@") == false || ofcemail.includes(".") == false) {
            isValid = false;
            $('#msg_error').html('Please Enter Valid Email').show();
            $('#officialEmailupdate').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
          }
          else if (Regadd1 == null || Regadd1 == '') {
            isValid = false;
            $('#msg_error').html('Please Enter Address').show();
            $('#regaddressupdate').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
          }

          else if (state == null || state == '') {
            isValid = false;
            $('#msg_error').html('Please Enter State').show();
            $('#stateentry').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
          }
          else if (city == null || city == '') {
            isValid = false;
            $('#msg_error').html('Please Enter City').show();
            $('#cityentry').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
          }

          if (isValid && index == 1) {
            $('#msg_error').html('').hide();
            $("#step-14").hide()
            $("#step-15").show();
            $("#step-16").hide();
            $("#step-17").hide();

            setClasses(index, steps);
            $(".buttonFinish").prop('disabled', true);
            $(".buttonNext").prop('disabled', false);

            isValid = false;
          }
          return isValid;
        }


        function validateStep2(index, steps) {
          $('#pername').focus();
          $('#msg_error_contact').html('').hide();

          var isValid = true;
          var deptName = $('#deptUpdate').val();
          var designation = $('#designationUpdate').val();
          var remark = $('#remarkUpdate').val();
          // var regaddress = $('#regaddressnew').val();
          // var state = $('#state').val();
          // var city = $('#city').val();
          // var pinCodeNo = $('#pincodeno').val();
          // Validate Contact Name
          if (!deptName && deptName.length <= 0) {
            isValid = false;
            $('#msg_error_contact').html('Please Select Department').show();
            $('#Departmentupdate').focus();
            setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

          }
          else if (!designation && designation.length <= 0) {
            isValid = false;
            $('#msg_error_contact').html('Please Select Designation').show();
            $('#Designationupdate').focus();
            setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

          }
          else 

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
      $("#addnewemp").css("display", "none");  $("#bulkadd").css("display", "none");
      
     $('#editbtn').hide();
     $('.material-icons md-18').css("display", "none");
     $('#deletebtn').attr('disabled','disabled');
     $('#addnewemp').attr('disabled','disabled'); $('#bulkadd').attr('disabled','disabled');
    }

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

  DepartmentList() {
    let dataL = {
      param1: "",
      param2: "",
      pageID: "2",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.CompanyDeptList(dataL).subscribe((response) => {
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
    this.listService.SelectDesignationListAPI(dataL).subscribe((response) => {
      this.designationlistarr = response.entity.list;
    })
  }

  CompanyEmpDetails() {
    let dataL = {
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: this.totalrecords,
      pageID: "112",
      pageName: this.encryptedpageUrlValue,
      pageURL: this.encryptedpageNameValue
    }
    this.companyService.CompanyEmpDetails(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.companyEmpGrid = response.entity.list;
        this.viewcount = response.entity.viewCount;
        this.totalcount = response.entity.count;
      }
    })
  }

  companyEmpDetailsPDF() {
    let dataL = {
      pageNo: '',
      itemsPerPage: '',
      searchBy: '',
      searchType: "",
      totalRecords: 'NA',
      pageID: "112",
      pageName: this.encryptedpageUrlValue,
      pageURL: this.encryptedpageNameValue
    }
    this.companyService.CompanyEmpDetails(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.companyEmpGridforPDF = response.entity.list;
        this.PrepareExcelData(this.companyEmpGridforPDF);

      }
    })
  }

  PrepareExcelData(data) {
    this.excelData = [];

    for (var i = 0; i < data.length; i++) {
      try {
        var obj = {
          "#": data[i].rowNumber,
          "Employee Name": data[i].param2,
          "Mobile No": data[i].param4,
          "Email": data[i].param24,
          "Department.": data[i].param22,
          "Address": data[i].param10,
        }
      } catch (e) { }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'Employee Details', 'employeedetails');
  }

  createPDF() {
    this.pdfservice.CreatePDFData(this.excelData, "Employee Details");

  }
  employeerpageChanged(event) {
    this.pageNumber = event;
    this.CompanyEmpDetails()
  }

  searchdata() {
    this.CompanyEmpDetails()
  }
altmno:number;
  setdata(data) {
  //  console.log(JSON.stringify(data));
    this.empId = data.param1;   //empid
    this.empName = data.param2;  //empname
    this.empCode = data.param3;  //
    this.empMobile = data.param4; //mno
    this.altmno = data.param5;   //altmno
    this.selectcityreturn1 = data.param6;   //cityid           //city id  i.e 1
    this.empCity = data.param7;              //cityname                             
    this.selectstatereturn1 = data.param8;   //stateid          //state id i.e 18
    this.empState = data.param9;             //statename
    this.empAddress = data.param10;    //address
    this.empPincode = data.param11;   //pincode
    this.empDesignation = data.param14;  //designation
    this.accNo = data.param15;    //acc no.
    this.bankName = data.param16;   //bank name
    this.ifcsCode = data.param17;  //ifsc
    this.bankAddress = data.param18;  //bank address
    this.bankCity = data.param19;    //bank city
    this.bankState = data.param20;   //bank state

    this.empDept = data.param22;        //deptment
    this.empEmail = data.param24;    //emailid

    this.selectdesignationreturn = data.param13;
    this.selectdeptreturn = data.param21;
    this.statebank = data.param27;
    this.citybank = data.param26;
  
    // this.citybank = this.getid(this.bankcitylistarr, this.bankCity);
    // this.statebank = this.getid(this.statelistarr, this.bankState);
//alert(this.citybank);
//alert(this.statebank);
    this.backdetailsbtn();
  }
  stateupdateid:string;cityupdateid:string;
  citybank:string;
  statebank:string;
  
  AddressSelection() {
    if (this.isChecked == true) {
      this.corrAddress = this.empAddress
    }
    else {
      this.corrAddress = ''
    }
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
    // this.Citylist();
    this.getBankStateId1();
    this.getStateId();

  if(this.write_privilege == "false")
  {
    $('#editbtn').hide();
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
      $('#editbtn').hide();
    }
  }

  Refreshfunction() {
    this.itemsPerPage = 10;
    this.pageNumber = 1;
    this.filter = '';
    this.CompanyEmpDetails();
  }

  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
    
   }


  getDeptId() {
    this.selectdeptreturn = this.empDept.param1;
  }
  getDesignationId() {
    this.selectdesignationreturn = this.empDesignation.param1;
  }

  getBankStateId1() {

  //  alert(this.statebank);
    let keydata = {
      param1: this.statebank,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectCityListAPI(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.bankcitylistarr = data.entity.list;
    });

  }
  getIdState()
  {
    this.statebank=this.bankState.param1;
  //  alert(this.statebank);
  }
  getBankCityId1() {
    this.citybank = this.bankCity.param1;
  //  alert(this.citybank);
   
  }
  selectstatereturn1:string;
  getStateId1()
  {
    this.selectstatereturn = this.empState.param1;
  //  alert(this.selectstatereturn);
    this.selectstatereturn1= this.selectstatereturn;
  }
  getStateId() {
   
    
 
    let keydata = {
      param1: this.selectstatereturn1,
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

  selectcityreturn1:string;
  getCityId() {
  //  this.selectcityreturn = this.empCity.param1;
  //  alert(this.selectcityreturn);
    this.selectcityreturn1 = this.empCity.param1;
  }


  getid(data, value) {
    try {
      if (typeof value === 'object') {
     //   console.log("come in object if")
     //   console.log(value.param1 + "  ====  " + value.param2);
        return value.param1;
        // return data.param1;
      }
      else {
    
       // console.log("come in else")
        var index = data.findIndex(x => x.param2 === value);
       
        return data[index].param1;
      }
    } catch (e) {
      return '';
    }
  
  }

  UpdateEmployee() {
    var remark = $('#remarkUpdate').val();
    this.remark = remark.substring(0, 1).toUpperCase() + remark.substring(1);
    if (remark == '' || remark == null) {
    
      $('#msg_err').html('Please Enter Remark').show();
      $('#remarkUpdate').focus();
      setTimeout(function () { document.getElementById("msg_err").style.display = "none"; }, 3000);

    }
 else{
    let dataL = {
      param1: this.remark,
      param2: this.empId,
      param3: this.empName,
      param4: this.empCode,
      param5: this.empMobile,
      param6: "",
      param7: this.selectcityreturn1,
      param8: this.selectstatereturn1,
      param9: this.empAddress,
      param10: this.empPincode,
      param11: "",
      param12: this.selectdesignationreturn,   //designation
      param13: this.accNo,//      "bankaccountno1",
      param14: this.bankName,//"bankname1",
      param15: this.ifcsCode,//"bankifsc1",
      param16: this.bankAddress,// "bankaddress1",
      param17: this.citybank,//"bankcityname1",
      param18: this.statebank,//"bankstatename1",
      param19: '',//"divisionid",
      param20: this.selectdeptreturn,//"departmentid",
      param21: "",
      param22: "",
      param23: this.empEmail,
      param24: "",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.companyService.UpadateCompanyEmp(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.datafromrespo = response.entity;
    
      if(response.statuscode == '200')
      {
        $("#successmodel").modal('show');
        // this.clear();
        this.remark="";
        this.ngOnInit();
        this.closemodal();
       
        }
     
      else
      {
       $("#notifymodel").modal('show');
      }
      });
    }
  }
  clearfunction()
  {
    this.remark="";
  }
  deleteremark:string;
  datafromrespo:string;
  DeleteEmployee() {
    if (this.deleteremark == null || this.deleteremark == '') {
      $('#msg_error_delete').html('Please Enter Remark').show();
      $('#employeedelremark').focus();
      setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);

    }
    else {
      let dataL = {
        param1: this.deleteremark,
        param2: this.empId,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      this.companyService.DeleteCompanyEmp(dataL).subscribe((response) => {
       
   try { RemoveLoader() } catch (e) { alert(e) }
   this.datafromrespo = response.entity;
 
   if(response.statuscode == '200')
   {
     $("#successmodel").modal('show');
     // this.clear();
     
     this.ngOnInit();
     this.closemodal();
    
     }
  
   else
   {
    $("#notifymodel").modal('show');
   }
   });



    }
  }



  closemodal() { 
            this.deleteremark="";
    $("#successmodel").modal('hide');
    $('#modeldelete').modal('hide');
    $('#myModalwizard').modal('hide');
    $('.modal-backdrop.show').css('display', 'none');
  }
}
