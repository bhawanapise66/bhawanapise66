import { AssigndevicesubdivisionService } from './../../../../APIService/assigndevicesubdivision.service';
import { AssigndeviceemployeeService } from './../../../../APIService/assigndeviceemployee.service';
//import { EmployeeassigndepartmentService } from './../../../../APIService/employeeassigndepartment.service';
import { DeviceassigndepartmentmodelService } from './../../../../APIService/deviceassigndepartmentmodel.service';
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
  selector: 'app-subdivmappingentry',
  templateUrl: './subdivmappingentry.component.html',
  styleUrls: ['./subdivmappingentry.component.css']
})
export class SubdivmappingentryComponent implements OnInit {
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;

  selectedItemsList = [];
  checkedIDs = [];
  // ListOfdevicetype = [];
  devicetypebulkText = [];
  deleteText: string; successMessageUpdate: string; datafromrespo: string;
  filter: any;
  public loading = false;
  // config:number; 
  count: number;
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };

  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService, private employeemodelservice: EmployeemodelService, private listService: ListService, private cryptService: CryptService, private router: Router, private devicemappingService: DeviceassigndepartmentmodelService, private placeodrService: PlaceodrmodelService, private employeedevicemappingService: AssigndeviceemployeeService, private subdivisiondevicemappingService: AssigndevicesubdivisionService) {
    this.EncryptPageName();
    this.EncryptPageUrl();
  }
  userKey1: any;
  ngOnInit() {

    $("#label1").hide();
    $("#label2").hide();
    $("#assignbutton").hide();
    $("#custlist").css("display", "none");

    this.userKey1 = sessionStorage.getItem('rid')

    if (this.userKey1 == '10' || this.userKey1 == '11' || this.userKey1 == '16' || this.userKey1 == '21') {
      this.flag1 = 1;
      $("#customerentry").show();
      //  $("#label3").show();
      //  $("#label4").show(); 
      $('#customerentry').focus();
      this.Customerlist();
      $("#custlist").css("display", "block");
    }
    if (this.userKey1 == '14' || this.userKey1 == '18') {
      this.flag1 = 0;
      $("#customerentry").hide();
      //  $("#label3").hide();
      //  $("#label4").hide();
      $('#divisionentry').focus();
      $("#custlist").css("display", "none");
      this.Divisionlist();
    }

    (function ($) {
      $(document).ready(function () {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#divisionentry').focus();
        })
      });
    })(jQuery);

    // this.fetchSelectedItems();
    // this.fetchCheckedIDs();
    // this.Employeelist();
    // this.DeviceTypelist();
 
    //mainloader




    $(document).ready(function () {
      var numitems = $("#myList li").length;

      $("ul#myList").css("column-count", numitems / 2);
    });
    //  this.checkroleid()
    //this.demo();
  }

  clear() {
    this.customerText = "";
    this.datasave.length = 0;
    this.DiviText = "";
    // this.DiviText = undefined;
    this.SubDivisionTextentry = "";
    this.selectdivision = "";
    this.selectsubdivision = "";
    this.customerentryid="";
  }
  ListOfCustomer = [];
  Customerlist() {
    // alert("Lst");
    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.CustomerListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfCustomer = data.entity.list;
        this.loading = false;
      });
  }
  // checkid:string;
  // checkroleid(){
  //    this.checkid = sessionStorage.getItem('rid');
  //   if(this.checkid == '18' || this.checkid == '14'){
  //   this.Divisionlist();
  //    document.getElementById('divisionlist').style.display="block";
  //     document.getElementById('subdivisionlist').style.display="block";
  //   }
  //   else if(this.checkid == '25'){
  //   document.getElementById('divisionlist').style.display="none";
  //     document.getElementById('subdivisionlist').style.display="block";  
  //   }
  // }
  changeSelection() {
    this.fetchSelectedItems()
    this.demo();
    $("#assignbutton").prop('disabled', false);


  }

  fetchSelectedItems() {
    this.selectedItemsList = this.ListOfDevicetype.filter((value, index) => {
      return value.isChecked;

    });
  }

  fetchCheckedIDs() {

    this.ListOfDevicetype.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.param2);
      }
    });

  }

  datavalue: any;
  datasave = [];
  demo() {
    var checkedIDsdemo = [];
    this.datavalue = this.selectedItemsList;
    // console.log( this.datavalue);
    for (let i = 0; i < this.datavalue.length; i++) {
      checkedIDsdemo.push(this.selectedItemsList[i].param1);
      //   console.log("Id of value is"+checkedIDsdemo);
      this.datasave = checkedIDsdemo;
      this.savevalue();
    }
  }
  savevalue() {
    console.log(this.datasave);
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
  // ListOfEmployee = [];
  // EmployeeentryText:any;
  // selectemployee: string;
  //  Employeelist(){
  //    //this.selectstate = this.stateText.param1;
  //   // console.log(this.stateText.param2);
  //     let keydata = {
  //       param1:"",
  //       param2:"",
  //       pageID: "7",
  //        pageName: this.encryptedpageNameValue,
  //        pageURL: this.encryptedpageUrlValue
  //     }  
  //     try{AddLoader()}catch(e){alert(e)} 

  //     this.listService.SelectEmployeeCustomerListAPI(keydata).subscribe(
  //       (data)  => {

  //        try{RemoveLoader()}catch(e){alert(e)}

  //        // alert(JSON.stringify(data));
  //       //  console.log(data.entity)
  //        // console.log("wekcome_ "+data);
  //        this.ListOfEmployee = data.entity.list; 
  //       //  this.resdata =     
  //         this.loading = false; 

  //       });
  //   }
  ListofDivisiontext: any = [];
  DiviText: any;
  selectdivision: string = ""; customerText: any; custid: any = "";
  diviArr: any = []; flag1: number = 1;customerentryid:any;

  CustId() {
    this.custid = this.customerText.param1;
 
    this.customerentryid=this.custid;
    this.DiviText = "";
    this.SubDivisionTextentry = "";
    this.selectdivision = "";
    this.selectsubdivision = "";
  }
  Divisionlist() {
 
    this.SubDivisionTextentry = "";
    this.selectsubdivision = "";
    this.diviArr.length = 0;
    let keydata = {
      param1: this.custid,
      groupList: this.diviArr,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.SelectV3DivisionListAPI(keydata).subscribe(
      (data) => {

        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListofDivisiontext = data.entity;
        this.loading = false;

      });
  }

  ListOfSubDivision = [];
  SubDivisionTextentry: any;
  selectsubdivision: string;
  // SubDivisionlist(){
  //   //this.selectstate = this.stateText.param1;
  //  // console.log(this.stateText.param2);

  //  }

  //  ListOfDepartment = [];
  //  DepartmententryText:any;
  //  selectdepartment: string;
  //  Departmentlist(){
  //    //this.selectstate = this.stateText.param1;
  //   // console.log(this.stateText.param2);
  //     let keydata = {
  //       param1:"",
  //       param2:"",
  //       pageID: "7",
  //        pageName: this.encryptedpageNameValue,
  //        pageURL: this.encryptedpageUrlValue
  //     }  


  //     try{AddLoader()}catch(e){alert(e)}


  //     this.listService.SelectDepartmentListAPI(keydata).subscribe(
  //       (data)  => {

  //        try{RemoveLoader()}catch(e){alert(e)}

  //        // alert(JSON.stringify(data));
  //       //  console.log(data.entity)
  //        // console.log("wekcome_ "+data);
  //        this.ListOfDepartment = data.entity.list; 
  //       //  this.resdata =     
  //         this.loading = false; 

  //       });
  //   }

  ListOfDevicetype = [];
  DeviceTypeText: any;
  selectdevicetype = [];
  DeviceTypelist() {
    $("#assignbutton").show();
    //this.selectstate = this.stateText.param1;
    // console.log(this.stateText.param2);
    this.selectdivision = this.DiviText.param1;
    let keydata = {
      param1: "",
      param2: this.selectdivision,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.DeviceV3AssignSubDivisionAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        // alert(JSON.stringify(data));
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfDevicetype = data.entity;

        if (this.ListOfDevicetype.length == 0) {
          $("#label1").hide();
          $("#label2").hide();
          $("#assignbutton").hide();
        }
        //  this.resdata =     
        this.loading = false;

      });
  }
  EmployeeMapping() {
    var divisiondata = $('#divisiondummy').val();

    var subdivision = $('#subdivisiondummy').val();
    var customerentryidentry = $("#customerentryid").val();
    // var devicetype = $('#devicetypedummy').val();
    var isValid = true;
    if(this.flag1==1 && customerentryidentry == "")   
    {
      
        isValid = false;
      //  alert("btn click 2");
        $('#msg_vendorName1').html('Please Select Customer').show();
       $('#customerentry').focus();
        setTimeout(function(){document.getElementById("msg_vendorName1").style.display="none";}, 3000);
      
    }
   
    else
    if (!divisiondata && divisiondata.length <= 0) {
      // alert(devicetype);

      isValid = false;
      $('#msg_errorentry').html('Please Enter Division').show();
      $('#divisionentry').focus();
      setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
    }
    else if (!subdivision && subdivision.length <= 0) {

      isValid = false;
      $('#msg_vendorName2').html('Please Enter Sub Division').show();
      $('#subdivisionentry').focus();
      setTimeout(function () { document.getElementById("msg_vendorName2").style.display = "none"; }, 3000);
    }
    //  else if(!devicetype && devicetype.length <= 0){
    //    isValid = false;
    //    $('#msg_errorentry').html('Please Enter Device Type').show();
    //    $('#employeeentry').focus();
    //    setTimeout(function(){document.getElementById("msg_errorentry").style.display="none";}, 3000);
    //  }
    else {

      let dataL = {
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue,
        param1: "",
        // param2:this.selectdivision,
        param2: this.selectsubdivision,
        deviceList: this.datasave,

      }

      try { AddLoader() } catch (e) { alert(e) }

      this.subdivisiondevicemappingService.AssigndevicetoSubDivision(dataL).subscribe((data) => {

        try { RemoveLoader() } catch (e) { alert(e) }

        this.datafromrespo = data.entity;

        if (data.statuscode == '200') {
          $("#SuccessModalEntry").modal('show');
          for (let i = 0; i < this.ListOfDevicetype.length; i++) {
            this.ListOfDevicetype[i].isChecked = false;
          }

this. Divisionlist();
          this.clear();
          // this.ngOnInit();

        }
        else {
          $("#ErrorModalEntry").modal('show');
        }
      });
    }
  }

  selectdivisionval: string = ""; grpList: any = []; diviList: any = [];

  //subdivision list
  SelectDivisionData() {
  
    this.selectdivision = this.DiviText.param1;
    this.grpList.length = 0;
    this.diviList.push(this.selectdivision);

    let keydata = {
      param1: this.custid,
      groupList: this.grpList,
      divisionList: this.diviList,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.SelectV1SubDivisionListAPI(keydata).subscribe(
      (data) => {

        try { RemoveLoader() } catch (e) { alert(e) }

        // alert(JSON.stringify(data));
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfSubDivision = data.entity;
        //  this.resdata =     
        this.loading = false;

      });
  }
  SelectSubDivisionData() {
    this.selectsubdivision = this.SubDivisionTextentry.param1;
 
    $("#label1").show();
    $("#label2").show();

  }
  SelectDeviceType() {
    this.selectdevicetype = this.DeviceTypeText.param1;
  }
  DeviceDetailsClick() {
    this.router.navigate(['./Subdivisionmappingdetails']);
  }

  searchdataDeviceid() {
    var search = $('#searchDataDeviceID').val();
    //this.selectstate = this.stateText.param1;
    // console.log(this.stateText.param2);
    let keydata = {
      param1: "",
      param5: search,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.DeviceAssignSubDivisionAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        // alert(JSON.stringify(data));
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfDevicetype = data.entity;
        //  this.resdata =     
        this.loading = false;

      });
  }

}
