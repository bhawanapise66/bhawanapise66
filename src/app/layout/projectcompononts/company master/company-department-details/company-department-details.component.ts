import { ExportToExcelService } from './../../services/export-to-excel.service';
import { PdfService } from './../../services/pdf.service';
import { CompanyService } from './../../services/company.service';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;



@Component({
  selector: 'app-company-department-details',
  templateUrl: './company-department-details.component.html',
  styleUrls: ['./company-department-details.component.css']
})
export class CompanyDepartmentDetailsComponent implements OnInit {

  count: any;
  departmentDetailsArray = [];write_privilege:string;
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };

  pageUrl = this.router.url
  deptName: any; deptCode: any; deptDesc: any; deptId: any; remark: any;
  encryptedpageNameValue: any;
  encryptedpageUrlValue: any;

  filter: string; itemsPerPage: any = 10; viewcount: string; key: any; reverse: any;
  pageNumber: any = 1; errorMessage: string
  invalidMessage: string;
  totalcount: any;
  ValueAlreadyGot: boolean = false;
  totalrecord: any = "NA";
  departmentArrayforPDf: any;
  excelData: any[];
  constructor(private cryptService: CryptService, private router: Router, private companyService: CompanyService,
    private pdfService: PdfService, private excelservice: ExportToExcelService) {
    this.EncryptPageName(); this.EncryptPageUrl();
  }

  ngOnInit() {
    this.clearfunction();
    this.CompanyDeptDetails();
    this.getCompDetailsForPDF();
    this.write_privilege =sessionStorage.getItem('writePrivilege');

    if(this.write_privilege == "false")
    {
   
      $("#editbtn").css("display", "none");
      $("#deletebtn").css("display", "none");
      $("#addnewdep").css("display", "none");
     $('#editbtn').hide();
     $('.material-icons md-18').css("display", "none");
     $('#deletebtn').attr('disabled','disabled');
     $('#addnewdep').attr('disabled','disabled');
    }


  }

  EncryptPageName() {
    this.encryptedpageNameValue = this.cryptService.encrypt("Company Employee Entry")
  }
  EncryptPageUrl() {
    this.encryptedpageUrlValue = this.cryptService.encrypt(this.pageUrl)
  }

  CompanyDeptDetails() {
   
    let dataL = {
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: this.totalrecord,
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.companyService.CompanyDeptDetails(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      if (response.statuscode == 200) {

        this.departmentDetailsArray = response.entity.list;
        this.viewcount = response.entity.viewCount;
        this.totalcount = response.entity.count;
       }
      else {
       }
    })
  }

  getCompDetailsForPDF() {
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

    this.companyService.CompanyDeptDetails(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      this.departmentArrayforPDf = response.entity.list;
      this.PrepareExcelData(this.departmentArrayforPDf);
    })
  }

  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "DEPARTMENT NAME": data[i].param2,
        "DEPARTMENT CODE": data[i].param3,
        "DESCRIPTION": data[i].param4,
        "CREATED DATE": data[i].param5,
      }
      this.excelData.push(obj);
    }
  }

  searchdata() {
     this.pageNumber = 1;
    this.itemsPerPage = 10;
    this.CompanyDeptDetails()
  }


  Refreshfunction() {
     this.itemsPerPage = 10;
    this.pageNumber = 1;
    this.filter = '';
    this.CompanyDeptDetails();
  }

  createPDF() {
    this.pdfService.CreatePDFData(this.excelData, 'Company Department');
  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'Company Department', 'componaydepartment');

  }

  sort(data) {
    this.reverse = !this.reverse;
  }

  DepartmentPageChange(event) {
    this.pageNumber = event;
    this.CompanyDeptDetails();
  }

  setdata(data) {
    this.deptName = data.param2;
    this.deptCode = data.param3;
    this.deptDesc = data.param4;
    this.deptId = data.param1;
    this.backdetailsbtn()
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

  UpdateCompanyDept() {
    this.deptName = this.deptName.substring(0, 1).toUpperCase() + this.deptName.substring(1);
    this.deptDesc = this.deptDesc.substring(0, 1).toUpperCase() + this.deptDesc.substring(1);
    this.remark = this.remark.substring(0, 1).toUpperCase() + this.remark.substring(1);

    if (this.deptName == "" || this.deptName == null) {
      $('#msg_errorupdate').html('Please Enter Department Name').show();
      $('#departmentNameId').focus();
      setTimeout(function () { document.getElementById("msg_errorupdate").style.display = "none"; }, 3000);
    }
    else if (this.deptCode == "" || this.deptCode == null) {
      $('#msg_errorupdate').html('Please Enter Department Code').show();
      $('#deptCodeId').focus();
      setTimeout(function () { document.getElementById("msg_errorupdate").style.display = "none"; }, 3000);
    }
    else if (this.deptDesc == "" || this.deptDesc == null) {
      $('#msg_errorupdate').html('Please Enter Department Description').show();
      $('#deptDescId').focus();
      setTimeout(function () { document.getElementById("msg_errorupdate").style.display = "none"; }, 3000);

    }
    else if (this.remark == "" || this.remark == null) {
      $('#msg_errorupdate').html('Please Enter Remark').show();
      $('#remarkId').focus();
      setTimeout(function () { document.getElementById("msg_errorupdate").style.display = "none"; }, 3000);

    }
    else {
      let dataL = {
        param1: this.remark,
        param2: this.deptId,
        param3: this.deptName,
        param4: this.deptCode,
        param5: this.deptDesc,
        param6: "",
        param7: "",
        param8: "",
        param9: "",
        param10: "",
        param11: "",
        param12: "",
        param13: "",
        param14: "",
        pageID: "7fwr4",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }

      this.companyService.UpdateCompanyDept(dataL).subscribe((response) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        if (response.statuscode == 200) {
          this.errorMessage = "data Updated Successfully"
          $("#updateSuccessModal").modal('show');
          this.CompanyDeptDetails();
          this.clearfunction();
          $("#myModalwizard").modal('hide');
          $('.modal-backdrop.show').css('display', 'none');
        }
        else {
          this.errorMessage = "Error in Updating Data"
          $("#ErrorModal").modal('show');
        }
      })
    }
  }
  deleteremark:string;
  DeleteCompanyDept() {
    var deleteremark = $('#departmentdelremark').val();
    this.deleteremark = deleteremark.substring(0, 1).toUpperCase() + deleteremark.substring(1);

    // Validate Contact Name
    if (!deleteremark && deleteremark.length <= 0) {
       $('#msg_error_delete').html('Please Enter Remark').show();
      $('#departmentdelremark').focus();
      setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        param1: this.deleteremark,
        param2: this.deptId,
        pageID: "7fwr4",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }

      this.companyService.DeleteCompanyDept(dataL).subscribe((response) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        $("#modeldelete").modal('hide');
        // $('.modal-backdrop.show').css('display', 'none');
        this.errorMessage= response.entity;
        if (response.statuscode == 200) {
       //   this.errorMessage = "Data Deleted Successfully"
          this.deleteremark="";
          $("#myModalwizard").modal('hide');
          $('.modal-backdrop.show').css('display', 'none');
          this.clearfunction();
          $("#updateSuccessModal").modal('show');
          this.CompanyDeptDetails();
        }
        else {
      //    this.errorMessage = "Error In Deleting Data"
          $("#ErrorModal").modal('show');
          $("#myModalwizard").modal('hide');
          $('.modal-backdrop.show').css('display', 'none');
        }
      })
    }

  }
clear()
{
  this.deleteremark="";
}

  clearfunction() {
    this.deptCode = ''; this.deptName = ''; this.deptDesc = ''; this.deptId = ''; this.remark = '';
  }
}
