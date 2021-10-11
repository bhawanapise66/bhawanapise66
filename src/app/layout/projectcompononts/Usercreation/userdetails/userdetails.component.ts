import { ExportToExcelService } from './../../services/export-to-excel.service';
import { NewUserCreationModelService } from './../../../../APIService/new-user-creation-model.service';
import { CustomermodelService } from './../../../../APIService/customermodel.service';
import { Router } from '@angular/router';

import { ListService } from './../../../../../list.service';
import { PostService } from './../../../../../post.service';
import { Paramcls } from './../../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as xlsx from 'xlsx';
import * as $ from 'jquery';
import * as moment from 'moment';
import { CryptService } from './../../services/crypt.service';
//import { DevicemodelService } from '../../../../APIService/devicemodel.service';
import { DevicemodelService } from '../../../../APIService/devicemodel.service';
import { PdfService } from '../../services/pdf.service';
import { UserassignvehicleComponent } from '../userassignvehicle/userassignvehicle.component';
import { UserentryComponent } from '../userentry/userentry.component';

declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

declare var SuccessAlert: any;
declare var errorAlert: any;


@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  // @ViewChild('epltable', { static: false }) epltable: ElementRef;
  @ViewChild(UserassignvehicleComponent, {static : true}) child : UserassignvehicleComponent;
  @ViewChild(UserentryComponent, {static : true}) child1 : UserentryComponent;

  callRoleWiseUserList(){
    this.child.SelectUserListData();
}


  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  key: string = 'name'; reverse: boolean = true;
  filter: string="";
  write_privilege: string;
  norecord:any;
  pageUrl = this.router.url;
  private _success = new Subject<string>(); successMessageUpdate: string;
  datafromrespo: string;
  public loading = false; pageNumber: any = 1; itemsPerPage: any = 10; totalCount: number = 0; viewcount: number;

  vendorentryText: string; shortcodeentryText: string; cinnoentryText: string; gstentryText: string; officialnoentryText: string;
  officialemailentryText: string; supplierofText: string; altnumber: string;
  selectRowsText: string = "10";

  userRemarktext: string;
  loginNameText: string; loginpasswordText: string; selectrolid: string;

  model_id: string; deleteText: string;
  count: any = 0;

  deleteremarkText: string;
  Modelcode: string; ModelName: string; CertiAutho: string; TACcertNo: string; TACcertDate: string; TACcertval: string; Productiondate: string; COPcertNo: string; COPcertDate: string; COPcertval: string;
  DeviceTypeText: string; VendorNameText: string; remarkDevModText: string; cityText: string;
  ListOfVendor$: Object; ListOfDevicetype$: Object; ListOfCertAuth$: Object; DeviceModelDetails$: Object;
  ListOfState = []; ListOfCity = []; regaddressText: string;

  ListOfVendor = []; ListOfDevicetype = []; ListOfCertAuth = [];
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  excelData: any;
  excelpdfData$: any;
  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService,
    private NewusercreationService: NewUserCreationModelService, private listService: ListService,
    private cryptService: CryptService, private router: Router, private devicemodelService: DevicemodelService
    , public pdfservice: PdfService, private excelService: ExportToExcelService) {
    this.EncryptPageName();
    this.EncryptPageUrl();
  }

  ngOnInit() {
    // $('#nodata').hide();
    this.norecord=false;
    //  Added Count , ViewCount = 0 ............Date : 2-12-2020 Developer: Aditya Londhe
    this.ShowEmployeeDetail();
    this.totalCount = 0;
    this.viewcount = 0;

    this.write_privilege = sessionStorage.getItem('writePrivilege');

    if (this.write_privilege == "false") {
      $("#tabnew").css("display", "none");
      $("#tabnew1").css("display", "none");
      $("#addnew1").css("display", "none");
      $("#editbtn").css("display", "none");
      $("#deletebtn").css("display", "none");
      $("#addnew").css("display", "none");
      $('#editbtn').hide();
      $('.material-icons md-18').css("display", "none");
      $('#deletebtn').attr('disabled', 'disabled');
      $('#addnew').attr('disabled', 'disabled');
    }


    this.Statelist();
    this.UserRolelist();
    this.UserCreationDetail();
    this.clearfunction();
    this.UserCreationPDFDetail();

    /* ------------------------------- Wizards end Ts------------------------------------------------- */
  }
  EncryptPageName() {
    this.cryptService.encrypt("User Details")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
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
    //  this.Distributorlist();
    //  this.Dealerlist();
   
    // this.CustomerTypeList();
    // this.DeviceTypeList();
    // this.Vendorlist();
    // this.CertificateAuthlist();
    if (this.write_privilege == "false") {
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
    if (this.write_privilege == "false") {
      $('#editbtn').hide();
    }
  }

  UserCreationDetails$: any;
  UserCreationDetail() {
    
    this.loading = true;
    let keydata = {
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter.trim(),
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    AddLoader()
    // Distributor Detail Grid BIND LIST    
    this.NewusercreationService.UserCreationDetailsAPI(keydata).subscribe((data) => {
     RemoveLoader()
      if(data.responseEntityCount == "0")
      {
      
        this.UserCreationDetails$ = [];
        this.totalCount = 0;
        this.viewcount = 0;
      //$('#nodata').show();
       
      }else{
        this.UserCreationDetails$ = data.entity.list;
        this.totalCount = data.entity.count;
        this.viewcount = data.entity.viewCount;
      }
     
    });
    this.UserCreationPDFDetail();
  }

  searchdata() {
    this.pageNumber = 1;
    this.UserCreationDetail();
  }


  SelectRows() {
    this.pageNumber = 1;
    this.UserCreationDetail();
  }

  Refreshfunction() {
    this.pageNumber = 1;
    this.itemsPerPage = 10;
    this.filter = '';
    this.UserCreationDetail();
  }

  UserCreationPDFDetail() {

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

    // Distributor Detail Grid BIND LIST    
    this.NewusercreationService.UserCreationDetailsAPI(keydata).subscribe(
      (data) => {

        this.excelpdfData$ = data.entity.list;
        this.PrepareExcelData(this.excelpdfData$);
      });
  }


  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "Employee Name": data[i].param2,
        "Employee Email": data[i].param4,
        "Employee Mobile": data[i].param5,
        "Reg Address": data[i].param7,
        "State": data[i].param10,
        "City": data[i].param9,
        "Role": data[i].param15,
      }
      this.excelData.push(obj);
    }
  }


  exportToExcel() {
    this.excelService.ExportExcel(this.excelData, 'Employee Details', 'employeedetails')
  }

  createPDF() {
    let pdfTableData;
    let dataArray = []
    for (let i = 0; i < this.excelpdfData$.length; i++) {
      pdfTableData = {
        "#": i + 1,
        "Employee Name": this.excelpdfData$[i]["param2"],
        "Employee Email": this.excelpdfData$[i]["param4"],
        "Employee Mobile": this.excelpdfData$[i]["param5"],
        "Reg Address": this.excelpdfData$[i]["param7"],
        "State": this.excelpdfData$[i]["param10"],
        "City": this.excelpdfData$[i]["param9"],
        "Role": this.excelpdfData$[i]["param15"]
      }
      dataArray.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(dataArray, "Employee Details");

  }





  user_id: string; user_name: string; user_email: string; user_mobile: string; user_address: string; user_state: any; user_city: string; user_role: string;
  statereturn: any = '';
  cityreturn: any = '';
  rolereturn: any = ''; user_state1: any; user_city1: any;
  setdata(com) {
    $(".buttonFinish").prop('disabled', false);
    this.flagcount = 1;
    this.backdetailsbtn()
    let userdatadetails = com;
    this.user_id = userdatadetails.param1;
    this.user_name = userdatadetails.param2;
    this.user_email = userdatadetails.param4;
    this.user_mobile = userdatadetails.param5;
    this.altnumber = userdatadetails.param6;
    this.user_address = userdatadetails.param7;
    // this.customer_catog = modeldatadetails.param10;
    this.user_state = userdatadetails.param10;
    this.user_city = userdatadetails.param9;
    this.user_role = userdatadetails.param15;
    this.rolereturn = userdatadetails.param14;
    this.user_state1 = userdatadetails.param17;       //maharashtra
    this.user_city1 = userdatadetails.param16;      //ngp
    this.user_address.replace(/['"]+/g, '')
 
    for (var i = 0; i < this.ListOfState.length; i++) {
      if (this.user_state1 == this.ListOfState[i].param2) {
        this.statereturn = this.ListOfState[i].param1;
        this.user_state = this.ListOfState[i];
   
      }

    }
    if(this.user_state1 )
  
    this.Citylist();
  }

  bindCity() {
 
    this.ListOfCity.forEach(element => {
      if(this.user_city1  == element.param2){
        this.user_city = element;
        this.cityreturn1 = this.user_city["param1"];
      }
    });
   
  }
  flagcount: number = 0;
  SetState() {
    this.statereturn = this.user_state.param1;
    this.user_state1 = this.user_state.param2;
    this.flagcount = 2;
  }
  ModelMasterpageChanged(event) {
    this.pageNumber = event;
    this.UserCreationDetail();

  }

  sort(key) {

    //  alert(key);

    this.key = key;
    this.reverse = !this.reverse;

  }
  ModelDeletefunction() {
    var isValid = true;
    var deleteremark = $('#cusdelremark').val();
    // Validate Contact Name
    if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      $('#msg_error_delete').html('Please Enter Remark').show();
      $('#cusdelremark').focus();
      setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        param1: deleteremark,
        param2: this.user_id,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      this.NewusercreationService.DeleteNewusercreationAPI(dataL).subscribe((data) => {
        this.datafromrespo = data.entity;
        var msg = this.datafromrespo;
        if (data.statuscode == 200) {
          SuccessAlert(msg);
          this.UserCreationDetail();
          this.deleteText="";
          $("#myModalwizard").modal('hide');
          $("#modeldelete").modal('hide');
          $('.modal-backdrop.show').css('display', 'none');
        } else {
          $("#modeldelete").modal('hide');
          $('.modal-backdrop.show').css('display', 'none');
          errorAlert(msg);
        }



      });

    }
  }
  loginNameUpdateText: string; loginpasswordUpdateText: string;
  modelsaveeditbtn() {
    var ofcemail = $('#officialEmailupdate1').val();
    var atposition = ofcemail.indexOf("@");
    var dotposition = ofcemail.lastIndexOf(".");
    var stateid = this.getid(this.ListOfState, this.user_state);
    // var cityid = this.getid(this.ListOfCity, this.user_city);
    var roleid = this.getid(this.ListOfRoleId, this.user_role);
   var isValid = true;
   this.user_name = this.user_name.substring(0, 1).toUpperCase() + this.user_name.substring(1);

   this.userRemarktext = this.userRemarktext.substring(0, 1).toUpperCase() + this.userRemarktext.substring(1);

    var deleteremark = $('#userremark').val();
    // Validate Contact Name
    this.user_name = this.user_name.substring(0, 1).toUpperCase() + this.user_name.substring(1);
    this.userRemarktext = this.userRemarktext.substring(0, 1).toUpperCase() + this.userRemarktext.substring(1);
    if (this.user_name == null || this.user_name == '') {
      isValid = false;
      $('#msg_error').html('Please Enter Employee Name').show();
      $('#UserNameentry').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
    }
    else if (this.user_mobile == null || this.user_mobile == '') {
      isValid = false;
      $('#msg_error').html('Please Enter Mobile No.').show();
      $('#officialNoupdate').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
    }
    else
    if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= ofcemail.length) {
      isValid = false;
      $('#msg_error').html('Please Enter Valid Email.').show();
      $('#officialEmailupdate1').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);

    }

    else if (this.statereturn == null || this.statereturn == '') {
      isValid = false;
      $('#msg_error').html('Please Select State').show();
      $('#stateupdate').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
    }
    else
    // if (this.cityreturn1 == null || this.cityreturn1 == '')
    if(this.cityreturn1 == null || this.cityreturn1 == '') {
      isValid = false;
      $('#msg_error').html('Please Select City').show();
      $('#cityupdate').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
    }

    else if (this.user_address == null || this.user_address == '') {
      isValid = false;
      $('#msg_error').html('Please Enter Address').show();
      $('#regaddressupdate').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
    }
    else if (this.rolereturn == null || this.rolereturn == '') {
      isValid = false;
      $('#msg_error').html('Please Select Role').show();
      $('#roliupdate').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
    }
    else if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      $('#msg_errorremark').html('Please Enter Remark').show();
      $('#userremark').focus();
      setTimeout(function () { document.getElementById("msg_errorremark").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {

        param1: deleteremark,
        param2: this.user_id,
        param3: this.user_name,
        param4: this.user_address,
        param5: this.user_name,
        param6: this.user_email,
        param7: this.user_mobile,
        param8: this.altnumber,
        param9: this.user_address,
        param10: this.user_address,
        param11: this.user_city1,//cityid,
        param12: this.user_state1,
        param13: "",
        param14: "",
        param15: roleid,
        // param16: this.loginNameUpdateText,
        // param17: this.loginpasswordUpdateText,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue,
      }
      try { AddLoader() } catch (e) { alert(e) }
      this.NewusercreationService.UpdateNewusercreationAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.datafromrespo = data.entity;
        var msg = this.datafromrespo;
        if (data.statuscode == 200) {
          SuccessAlert(msg);
          this.clearfunction();
          this.UserCreationDetail()
          $('#myModalwizard').modal('hide');
          $('.modal-backdrop.show').css('display', 'none');

        }
        else {
          errorAlert(msg);
        }

      });
      this.UserCreationDetail()
    }
  }

  Statelist() {

    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.SelectStateListAPI(keydata).subscribe(
      (data) => {
        this.ListOfState = data.entity.list;
        this.loading = false;
      });
  }
  // cityselect() {
  //   this.selectcity = this.cityentryText.param1;
  //   this.user_city = this.cityentryText.param2;
  //   this.cityreturn = this.check(this.user_city);
  // }
  cityreturn1: any;
  SetCity() {
    this.cityreturn1 = this.user_city["param1"];
    this.user_city1 = this.user_city["param2"];
  
  }

  stateText: any;
  selectstateupdate: string;
  selectcity: string;
  cityentryText: any;

  Citylist() {
    // this.statereturn = this.check(this.user_state);
    // this.selectstateupdate = this.user_state.param1;

    let keydata = {
      param1: this.user_state1,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.SelectCityListAPI(keydata).subscribe((data) => {
        this.ListOfCity = data.entity.list;
        this.loading = false;
        if (this.flagcount == 1) {
       
          this.bindCity();
        }
      });
   
  }
  ListOfRoleId = [];
  UserRolelist() {

    let keydata = {

      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.UserRoleListAPI(keydata).subscribe(
      (data) => {
        this.ListOfRoleId = data.entity.list;
        this.loading = false;

      });
  }
  roleidText: any;
  selectrolelist: string;
  rolelistselect() {
    this.selectrolelist = this.roleidText.param1;

    this.rolereturn = this.user_role["param1"];
    //  this.rolereturn = this.check(this.user_role);
  }

  check(data) {
    try {
      if (typeof data === 'object') {
        return data.param1;
      }
      else if (data == '') {
      }
      else {

        return data;
      }
    } catch (e) {
      return '';
    }
  }

  getid(data, value) {
    // alert(JSON.stringify(data));
    try {
      if (typeof value === 'object') {
        return value.param1;
      }
      else {

        var index = data.findIndex(x => x.param2 === value);
        // alert("indexxx");
        return data[index].param1;
      }
    } catch (e) {
      return '';
    }

  }

  clearfunction() {

    this.user_name = ""; this.user_mobile = ""; this.user_email = ""; this.user_state = ""; this.statereturn = ""; this.user_city = "";
    this.cityreturn = ""; this.user_address = ""; this.user_role = ""; this.rolereturn = ""; this.loginNameUpdateText = "";
    this.loginpasswordUpdateText = ""; this.userRemarktext = "";

  }
  clearremark()
  {
    this.userRemarktext = "";
  }
  closemodal() {
    this.deleteText = "";
    $('#modeldelete').modal('hide');
    $('.modal-backdrop.show').css('display', 'none');
  }
  ShowEmployeeDetail()
  {
   
      $("#addnew1").css("display", "block");
      $("#addnew2").css("display", "none");
  }
  ShowAssignDetail()
  {

    $("#addnew2").css("display", "block");
      $("#addnew1").css("display", "none");
  }

  GetCustDetail()
  {
    this.child1.GetCustDetail1();
  }
  //=========================== Userentry ts

}
