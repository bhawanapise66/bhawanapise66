import { CompanyService } from './../../services/company.service';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;


export class CompanyDept {
  deptId: string;
  deptName: string;
  deptCode: string;
  deptDesc: string;
  remark: string;
}


@Component({
  selector: 'app-company-department-entry',
  templateUrl: './company-department-entry.component.html',
  styleUrls: ['./company-department-entry.component.css']
})
export class CompanyDepartmentEntryComponent implements OnInit {
@Output()
showDetails = new EventEmitter();


  errorMessage: string;
  count: any;

  isFormValid: boolean = true;

  deptform = new CompanyDept()
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  pageUrl = this.router.url
  invalidMessage: any;
  encryptedpageNameValue: any; encryptedpageUrlValue: any;

  constructor(private cryptService: CryptService, private router: Router, private companyService: CompanyService) {
    this.EncryptPageName();
    this.EncryptPageUrl()
  }

  ngOnInit() {
  }

  EncryptPageName() {
    this.encryptedpageNameValue = this.cryptService.encrypt("Company Employee Entry")
  }
  EncryptPageUrl() {
    this.encryptedpageUrlValue = this.cryptService.encrypt(this.pageUrl)
  }
  resetForm() {
    this.deptform.deptName = ''; this.deptform.deptCode == ''; this.deptform.deptDesc == ''
  }
  checkValidation() {
    this.isFormValid = true;
    if (this.deptform.deptName == null || this.deptform.deptName == '') {
      this.isFormValid = false;
      $("#deptname").focus()
      this.invalidMessage = "Please Enter Department Name"
    }
    else if (this.deptform.deptCode == null || this.deptform.deptCode == '') {
      $("#deptcode").focus()
      this.isFormValid = false;
      this.invalidMessage = "Please Enter Department Code"
    }
    else if (this.deptform.deptDesc == null || this.deptform.deptDesc == '' || this.deptform.deptDesc.length <= 5) {
      $("#deptdesc").focus()
      this.isFormValid = false;
      this.invalidMessage = "Please Enter Department Description"
    }
    else {
      this.isFormValid = true;
      this.insertCompanyDept();
    }
  }

  insertCompanyDept() {
    this.deptform.deptName = this.deptform.deptName.substring(0, 1).toUpperCase() + this.deptform.deptName.substring(1);
    this.deptform.deptDesc = this.deptform.deptDesc.substring(0, 1).toUpperCase() + this.deptform.deptDesc.substring(1);
    let dataL = {
      param1: "",
      param2: "",
      param3: this.deptform.deptName,
      param4: this.deptform.deptCode,
      param5: this.deptform.deptDesc,
      param6: "",
      param7: "",
      param8: "",
      param9: "",
      param10: "",
      pageID: '234r',
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.companyService.InsertCompanyDept(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      if (response.statuscode == 200) {
        this.errorMessage = "Data Saved Successfully"
        $("#insertSuccessModal").modal('show');
        this.clearfunction();
        $("#exampleModal").modal('hide');
        $('.modal-backdrop.show').css('display', 'none');

        this.showDetails.emit()
      }
      else {
        this.errorMessage = "Error In Saving Data"
        $("#ErrorModal").modal('show');
      }
    })
  }

  clearfunction() {
    this.deptform.deptName = ''; this.deptform.deptCode = ''; this.deptform.deptDesc = '';
  }
}
