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
  selector: 'app-emp-mappingentry',
  templateUrl: './emp-mappingentry.component.html',
  styleUrls: ['./emp-mappingentry.component.css']
})
export class EmpMappingentryComponent implements OnInit {
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

  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService, private employeemodelservice: EmployeemodelService, private listService: ListService, private cryptService: CryptService, private router: Router, private devicemappingService: DeviceassigndepartmentmodelService, private placeodrService: PlaceodrmodelService, private employeedevicemappingService: AssigndeviceemployeeService) {
    this.EncryptPageName();
    this.EncryptPageUrl();
  }


  userKey1: any; flag1: number = 1;
  ngOnInit() {
    $("#label1").hide();
    $("#label2").hide();
    $("#assignbutton").hide();
    $("#custlist").css("display", "none");
    this.fetchSelectedItems();
    this.fetchCheckedIDs();

 
    //mainloader

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
      this.Divisionlist();
      $("#customerentry").hide();
      //  $("#label3").hide();
      //  $("#label4").hide();
      $('#devicetypebulkentry').focus();
      $("#custlist").css("display", "none");
    }


    $(document).ready(function () {
      var numitems = $("#myList li").length;

      $("ul#myList").css("column-count", numitems / 2);
    });
    //this.demo();
  }
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
    // for (let i=0;i<this.selectedItemsList.length;i++){
    //   this.checkedIDsdemo.push(this.checkboxesDataList[i].id);  
    //    console.log("Id of value is"+this.checkedIDsdemo);
    // }
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

  SelectEmployeeData() {
    this.selectemployee = this.EmployeeentryText.param1;
    $("#label1").show();
    $("#label2").show();
    //alert(this.selectdepartment);
  }
  ListOfEmployee = [];
  EmployeeentryText: any;
  selectemployee: string;
  custid: any=""; customerText: any; customerentryid: any;
  CustId() {
    this.custid = this.customerText.param1;
    this.customerentryid = this.custid;

  }


  diviArr: any = [];
  Divisionlist() {

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
        this.ListOfEmployee = data.entity;
        this.loading = false;

      });
  }
  ListOfDevicetype = [];


  DeviceTypelist() {
    $("#assignbutton").show();
    //this.selectstate = this.stateText.param1;
    // console.log(this.stateText.param2);
    this.selectemployee = this.EmployeeentryText.param1;
    let keydata = {
      param1: "",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.DeviceV3AssignDivisionListAPI(keydata).subscribe(
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

  EmployeeMapping() {
    var departmentdata = $('#employeedummy').val();
    var isValid = true;

    if (!departmentdata && departmentdata.length <= 0) {
      // alert(devicetype);
      isValid = false;
      $('#msg_errorentry').html('Please Enter Division').show();
      $('#employeedummy').focus();
      setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue,
        param1: "",
        param2: this.selectemployee,
        deviceList: this.datasave,

      }

      try { AddLoader() } catch (e) { alert(e) }

      this.employeedevicemappingService.Assigndevicetodivision(dataL).subscribe((data) => {

        try { RemoveLoader() } catch (e) { alert(e) }

        this.datafromrespo = data.entity;

        if (data.statuscode == '200') {
          $("#SuccessModalEntry").modal('show');
          for (let i = 0; i < this.ListOfDevicetype.length; i++) {
            this.ListOfDevicetype[i].isChecked = false;
          }
          this.clear();
        }
        else {
          $("#ErrorModalEntry").modal('show');
        }
      });
    }
  }
  DeviceDetailsClick() {
    this.router.navigate(['./DivisiondeptDetails']);
  }


  clear() {
    this.customerText = "";
    this.customerentryid = "";
    this.EmployeeentryText = "";
    this.selectemployee = "";
    
  }

  // Developer 	: Aditya Londhe
  // Date      	: 4-1-2020
  // Description : Device Division Mapping
  // Modified By:  Aditya Londhe 
  // Description : Added Search Box to search device Id 
  // Update date : 8-1-2020

  searchdataDeviceid() {
    //this.selectstate = this.stateText.param1;
    // console.log(this.stateText.param2);
    var search = $('#searchDataDeviceID').val();

    let keydata = {
      param1: "",
      param5: search,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.DeviceV3AssignDivisionListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        // alert(JSON.stringify(data));
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfDevicetype = data.entity;
        if (this.ListOfDevicetype.length == 0 || data.statuscode == '500') {
          $("#label1").hide();
          $("#label2").hide();
          $("#assignbutton").hide();
        }
        //  this.resdata =     
        this.loading = false;

      });

  }
  closemodal() {
    //alert("come ");
    $("#SuccessModel").modal('hide');

    $('#modeldelete').modal('hide');
    $('#myModalwizard').modal('hide');

    $('.modal-backdrop.show').css('display', 'none');

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
}
