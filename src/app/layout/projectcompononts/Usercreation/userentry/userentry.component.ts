import { NewUserCreationModelService } from './../../../../APIService/new-user-creation-model.service';
import { UsercreationmodelService } from './../../../../APIService/usercreationmodel.service';
import { CustomermodelService } from './../../../../APIService/customermodel.service';
import { Router } from '@angular/router';
import { ListService } from './../../../../../list.service';

import { Paramcls } from './../../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as $ from 'jquery';
import { CryptService } from '../../services/crypt.service';
//import { DevicemodelService } from '../../../../APIService/devicemodel.service';
import { DevicemodelService } from '../../../../APIService/devicemodel.service';
import { NAMED_ENTITIES } from '@angular/compiler';
import { Jsonp } from '@angular/http';



declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
declare var SuccessAlert:any;
declare var errorAlert:any;

@Component({
  selector: 'app-userentry',
  templateUrl: './userentry.component.html',
  styleUrls: ['./userentry.component.css']
})
export class UserentryComponent implements OnInit {

  @Output()
  showDetails = new EventEmitter();

  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;
  datafromrespo: string;
  insert = false;assignveh = false;

  vendorentryText: string; shortcodeentryText: string; cinnoentryText: string; gstentryText: string; officialnoentryText: string;
  officialemailentryText: string; supplierofText: string; altnumber: string;
  count: number=0; loginNameText: string; loginpasswordText: string;

  personnameText: string; personnoText: string; personaltnoText: string; personemailText: string; regaddressText: string; pincodeText: string;
  ListOfState = []; ListOfCity = [];

  ListOfVendor$: Object; ListOfDevicetype$: Object; ListOfCertAuth$: Object;

  public loading = false; p: number; pagecount: number; viewcount: number;
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  constructor(private customerService:CustomermodelService,private modalService: NgbModal, private flashMessage: FlashMessagesService, private NewusercreationService: NewUserCreationModelService, private listService: ListService, private cryptService: CryptService, private router: Router, private usercreationService: UsercreationmodelService, private CustomermodelService: CustomermodelService, private devicemodelService: DevicemodelService) { }
  userKey1:any="";flagg:number=0;
  ngOnInit() {
    this.insert = false;this.assignveh = true;
    (function ($) {
      $(document).ready(function () {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#userNameentry').focus();
        })
      });
    })(jQuery);

    this.userKey1 = sessionStorage.getItem('rid')

    if (this.userKey1 == '10' || this.userKey1 == '11' || this.userKey1 == '16' || this.userKey1 == '21') {
      this.flagg = 0;
    }
    if (this.userKey1 == '14' || this.userKey1 == '18') {
  
      this.flagg = 1;
      this.CustomerV3ListAPIDetail();
 }
    this.EncryptPageName();
    this.EncryptPageUrl();
  
    this.Statelist();
    this.UserRolelist(); this.clearfunction();
  
    // this.DeviceTypeList();
    // this.CertificateAuthlist();


  }
  EncryptPageName() {
    this.cryptService.encrypt("Menu Management")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
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
  /*-------------List of City Api ---------------*/

  cityselect() {
    this.selectcity = this.cityentryText.param1;
    this.CityNew = this.cityentryText.param2;
  }
  stateText: any;
  selectstate: string;
  selectcity: string;
  cityentryText: any;
  cityid()
  {
    this.selectstate = this.stateText.param2;
  }
  Citylist() {
    if(this.flag1 == 2)
    {
      this.selectstate =  this.stateText.param2;
      this.cityentryText="";
    }
   
    let keydata = {
      param1: this.selectstate,
      itemsPerPage:"",
      searchBy:"",
      searchType:"",
      totalRecords:"NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.SelectCityV3ListAPI(keydata).subscribe((data) => {
      this.ListOfCity = data.entity;
     
 if(this.flag1 == 1)
 {
  this.bindCity();
 }

      this.loading = false;
    });
  }

bindCity()
{
  for(var j=0;(j< this.ListOfCity.length && (this.selectstate == this.CustState) );j++)
  {
          if(this.CustCity == this.ListOfCity[j].param2)
          {
             this.cityentryText = this.ListOfCity[j].param2;
          }
  }
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
    document.getElementById('dummyroleid').innerHTML = this.selectrolelist

  }
  userentryText: string;

  usersavebtn() {

    var isValid = true;
    var Username = $('#userNameentry').val();
    this.userentryText = Username.substring(0, 1).toUpperCase() + Username.substring(1);

    var Mobileno = $('#officialNoentry').val();
    var ofcemail = $('#officialEmailentry').val();
    var atposition = ofcemail.indexOf("@");
    var dotposition = ofcemail.lastIndexOf(".");

    var state = $('#dummystate').val();
    var city = $('#dummycity').val();
    var regaddress = $('#regaddressentry').val();
    var roleid11 = $('#dummyroleid11').val();
    this.regaddressText.replace(/['"]+/g, '')

    //Validate Vendor Name
    if (!Username && Username.length <= 0) {
      isValid = false;
     
      $('#msg_errorentryuser').html('Please Enter Employee Name').show();
      $('#userNameentry').focus();
      setTimeout(function () { document.getElementById("msg_errorentryuser").style.display = "none"; }, 3000);
    } else
      if (!Mobileno && Mobileno.length <= 0 || Mobileno.length < 9) {
     
        isValid = false;
        $('#msg_errorentryuser').html('Please Enter Mobile No').show();
        $('#officialNoentry').focus();
        setTimeout(function () { document.getElementById("msg_errorentryuser").style.display = "none"; }, 3000);
      }
   else
        if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= ofcemail.length) {
          isValid = false;
          $('#msg_errorentryuser').html('Please Enter Valid Email.').show();
          $('#officialEmailentry').focus();
          setTimeout(function () { document.getElementById("msg_errorentryuser").style.display = "none"; }, 3000);

        }
      else 
    if (!state && state.length <= 0) {
    
        // validate Official Email
        isValid = false;
        $('#msg_errorentryuser').html('Please Enter State').show();
        $('#stateentry').focus();
        setTimeout(function () { document.getElementById("msg_errorentryuser").style.display = "none"; }, 3000);
      }
      else if (!city && city.length <= 0) {
       
        isValid = false;
        $('#msg_errorentryuser').html('Please Enter City').show();
        $('#cityentry').focus();
        setTimeout(function () { document.getElementById("msg_errorentryuser").style.display = "none"; }, 3000);
      }
      else if (!regaddress && regaddress.length <= 0) {
    
        isValid = false;
        $('#msg_errorentryuser').html('Please Enter Reg Address').show();
        $('#regaddressentry').focus();
        setTimeout(function () { document.getElementById("msg_errorentryuser").style.display = "none"; }, 3000);
      }
      else if (roleid11 == null || roleid11 == '') {
    
        // validate Official Email
        isValid = false;
        $('#msg_errorentryuser').html('Please Select Role').show();
        $('#roleIdEntry').focus();
        setTimeout(function () { document.getElementById("msg_errorentryuser").style.display = "none"; }, 3000);
      }
else{
  
      let dataL = {

        param1: "",
        param2: "",
        param3: this.userentryText, param4: this.regaddressText, param5: this.userentryText, param6: this.officialemailentryText, param7: this.officialnoentryText, param8: this.altnumber, param9: this.regaddressText, param10: this.regaddressText,
        param11: this.CityNew, param12: this.selectstate, param13: "", param14: "", param15: this.selectrolelist, param16:"", param17:"",
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue,
      }
     
      
      try { AddLoader() } catch (e) { alert(e) }

      this.NewusercreationService.InsertNewusercreationAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.datafromrespo = data.entity;
        var msg = this.datafromrespo;
        if (data.statuscode == 200) {
          SuccessAlert(msg);
          $("#exampleModal").modal('hide');
          $('.modal-backdrop.show').css('display', 'none');
          this.clearfunction();
          this.showDetails.emit()
        }else{
          errorAlert(msg);
        }
        $('.modal-backdrop.show').css('display', 'none');

      });
}
  }

  clearfunction() {

    this.userentryText = ""; this.officialnoentryText = ""; this.altnumber = ""; this.officialemailentryText = ""; this.selectstate = "";
    this.cityentryText = ""; this.selectcity = ""; this.regaddressText = ""; this.roleidText = ""; this.loginNameText = ""; this.loginpasswordText = "";
    this.stateText = "";
  }


  CustCity:any;CustState:any;CustAddress:any;

  flagChange()
  {
    this.flag1=2;
    this.selectstate = this.stateText.param2;
  }

  StateCityAddress()
  {
    if(this.flag1 == 1)
    {
      this.CustomerV3ListAPIDetail();
    }
  }
  CustomerV3ListAPIDetail() {

    this.loading = true;

 
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
    try { AddLoader() } catch (e) { alert(e) }


    // Distributor Detail Grid BIND LIST    
    this.customerService.CustomerDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        let resdatalist = data.entity.responsedatalist[0];
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);

        let vendorlist = resdatalist;

        this.CustObj = vendorlist;
     

 this.CustCity = this.CustObj.param8;
 this.CustStateId = this.CustObj.param19;
 this.selectstate = this.CustStateId;
 this.selectcity = this.CustObj.param20;

this.CustState = this.CustObj.param9;
this.CityNew = this.CustCity;
 this.regaddressText = this.CustObj.param7;

 for(var i=0;i<  this.ListOfState.length;i++)
    {
            if(this.CustState == this.ListOfState[i].param2)
            {
               this.stateText = this.ListOfState[i].param2;
               this.selectstate = this.ListOfState[i].param2; 
             this.flag1=1;
            }
    }
    this.Citylist();

  

 // this.stateText = this.CustState;this.cityentryText = this.CustCity;this.regaddressText = this.CustAddress;
    });
  }
  CustStateId:any;flag1:number=0;CityNew:any;

  CustObj:any=[];selectedDatasource:any;
  isTextFieldType: boolean;
  togglePasswordFieldType()
  {
    this.isTextFieldType = !this.isTextFieldType;
  }


  GetCustDetail1()
  {
    if(this.flagg == 1)
    {
this.CustomerV3ListAPIDetail();
    }
    if(this.flagg == 0){
this.clearfunction();    }
  }
}
