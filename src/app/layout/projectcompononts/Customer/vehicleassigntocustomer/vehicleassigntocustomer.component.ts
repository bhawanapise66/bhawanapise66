import { ExportToExcelService } from '../../services/export-to-excel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CryptService } from '../../services/crypt.service';
import { Router } from '@angular/router';
import { Paramcls } from '../../../../../paramcls';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { CustomermodelService } from './../../../../APIService/customermodel.service';

import * as $ from 'jquery';
import * as moment from 'moment';
import { ThemeService } from 'ng2-charts';
import { PdfService } from '../../services/pdf.service';

declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
declare var SuccessAlert: any;
declare var errorAlert: any;
@Component({
  selector: 'app-vehicleassigntocustomer',
  templateUrl: './vehicleassigntocustomer.component.html',
  styleUrls: ['./vehicleassigntocustomer.component.css']
})
export class VehicleassigntocustomerComponent implements OnInit {

  selectcustomerentry: any; selectvehicleentry: any; deviceidspan: string; roleid: string;
  encryptedpageNameValue: string; encryptedpageUrlValue: string; pageUrl = this.router.url;
  public edited = false;
  isMasterSel: boolean;
  stringifiedData: any; parsedJson: any; stringifiedresponse: any; parsedJsonresponse: any;
  stringifiedDataList: any; parsedJsonList: any; datafromrespo: string; deleteText: string;

  devdetail$: any; devicedetdata: any = []; globalPDF$: any;
  key: string = 'name'; reverse: boolean = true; count: number;
  pageNumber: number = 1; itemsPerPage: number = 10; nop: number; totalCount: number; viewCount: number; filter: any;
  selectRowsText: string = "10"; excelData: any = []; list = []; ListOfVehicle = [];

  private _success = new Subject<string>(); staticAlertClosed = false; successMessage: string; isSelecteddevicesummary: boolean;
  isCustomer: any; filtersim: any;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };

  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService, private cryptService: CryptService, private router: Router, private devreqService: CustomermodelService
    , public excelservice: ExportToExcelService, public pdfservice: PdfService) {

    this.EncryptPageName(); this.EncryptPageUrl(); this.isSelecteddevicesummary = false;
    this.isSelected = false;
  }

  ngOnInit() {
    $('#devicetbl').css('display', 'none');
    $('#assignbutton').css('display', 'none');
    $("#assignbutton").prop('disabled', true);
    try {
      $('#customerentry2').focus();
      this.roleid = sessionStorage.getItem("rid");
      // if (this.roleid == "14" || this.roleid == "18") { this.isCustomer = true; }
      // else { this.isCustomer = false; this.Customerlist(); }

      this.Customerlist();

      $('#alertmsg').hide(); $('#saveentry').show(); $('#updateentry').hide();

      setTimeout(() => this.staticAlertClosed = true, 20000);

      this._success.subscribe((message) => this.successMessage = message);

      this._success.pipe(
        debounceTime(8000)
      ).subscribe(() => this.successMessage = null);

    } catch (e) { }

  }

  EncryptPageName() {
    this.encryptedpageNameValue = this.cryptService.encrypt("Vehicle Assign To Customer")
  }
  EncryptPageUrl() {
    this.encryptedpageUrlValue = this.cryptService.encrypt(this.pageUrl)
  }

  ListOfCustomer = []; selectcustomer: string; selectcustomrobj: any;
  Customerlist() {
    try {
      let keydata = {
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }
      this.devreqService.CustomerListAPI(keydata).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfCustomer = data.entity.list;
      });
    } catch (e) { }
  }

  Vehiclelist() {

    try {

      this.selectcustomerreturn = this.selectcustomerentry.param1;

      let keydata = {
        param1: "",
        param2: this.selectcustomerreturn,
        // param2:"14",
        //  param3:"vehicle assign to customer",
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }

      //try{AddLoader()}catch(e){alert(e)}
      this.devreqService.VehicleListAPI_V3(keydata).subscribe(
        (data) => {
          //try{RemoveLoader()}catch(e){alert(e)}
          this.ListOfVehicle = data.entity;

          for (let j = 0; j < this.ListOfVehicle.length; j++) {
            if (this.ListOfVehicle[j]["param4"] == 'true') {
              this.flag = 1;
              this.ListOfVehicle[j].isSelecteddevicesummary = true;
            }
            // if(this.flag == 0) {
            //   this.ListOfVehicle[j].isSelected = 'false';
            // }
          }

        });
    } catch (e) { }
  }

  selectcustomerreturn: string; flag: number = 0;
  getCustomerId() {
    this.selectcustomerreturn = this.selectcustomerentry.param1;
    $('#devicetbl').css('display', 'block'); $('#assignbutton').css('display', 'block');
  }

  selectvehiclereturn: string;
  selectvehicledummy() {
    this.selectvehiclereturn = this.selectvehicleentry.param1;
  }

  onItemChange(e) {
    var a = e.target.value;
    console.log(a);
  }
  item1: any;

  checkedCategoryList: any; datasave = [];
  customergetid: string; vehicleIdList: any[];
  ADDRecord() {
    this.filtersim = "";
    this.selectcustomerreturn = this.selectcustomerentry.param1;

    // this.vehicleIdList = [];
    // for (let i = 0; i < this.ListOfVehicle.length; i++) {
    //   if ($('#abc' + i).is(":checked") == true) {

    //     this.vehicleIdList.push(this.ListOfVehicle[i]["param1"]);
    //     console.log(this.vehicleIdList);
    //   }
    // }




    if (this.selectcustomerentry == '' || this.selectcustomerentry == null) {
      $('#err_customer').html('Please Select Customer.');
      $('#selectcustomerentry').focus();
      setTimeout(function () { document.getElementById("err_customer").style.display = "none"; }, 3000);
    }

    else {

      $('#saveentry').show(); $('#updateentry').hide();

      try {

        let dataL = {

          remarks: "ok",         //remark
          customerList: this.datasave,                             //customer
          customerid: this.selectcustomerreturn,         //vehicle
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue

        }
        try { AddLoader() } catch (e) { }
        this.devreqService.AssignVehicleToCustomerAPI(dataL).subscribe((data) => {
          try { RemoveLoader() } catch (e) { }
          this.datafromrespo = data.entity;
          var msg = this.datafromrespo;
          if (data.statuscode == '200') {
            SuccessAlert(msg);
            this.clearfunction();
            $('#devicetbl').css('display', 'none'); $('#assignbutton').css('display', 'none');

          }
          else {

            errorAlert(msg);

            this.clearfunction();
          }

        }, err => {

        });

      } catch (e) { }
    }

  }

  check(data) {
    try {
      if (typeof data === 'object') {
        //console.log("come in object if")
        return data.param1;
      }
      else if (data == '') {
        //console.log("come in Else if")
      }
      else {
        //console.log(data.length)

        return data;
      }
    } catch (e) {
      return '';
    }
  }

  getid(data, value) {
    try {
      if (typeof value === 'object') {
        // console.log("come in object if")
        // console.log( value.param1 +"  ====  "+ value.param2);
        return value.param1;
        // return data.param1;
      }
      else {
        //alert(value)
        //console.log("come in else")
        var index = data.findIndex(x => x.param2 === value);
        //alert(index)
        return data[index].param1;
      }
    } catch (e) {
      return '';
    }

  }
  isSelected: boolean;
  clearfunction() {
    try {

      this.isSelecteddevicesummary = false;
      this.selectcustomerentry = "";
      this.vehicleIdList.length = 0;
      this.ListOfVehicle.length = 0;

    } catch (e) { }
  }

  closemodal() {

    $("#successmodel").modal('hide');
    $('#modeldelete').modal('hide');
    $('#myModalwizard').modal('hide');

    $('.modal-backdrop.show').css('display', 'none');

  }

  checkUncheckAllnew() {
    if ($("#checkedisMaster").prop("checked") == true) {
      for (let i = 0; i < this.ListOfVehicle.length; i++) {
        //   $("#abc"+i).prop("checked", true);
        this.ListOfVehicle[i].isSelecteddevicesummary = true;
      }
    }
    if ($("#checkedisMaster").prop("checked") == false) {
      for (let i = 0; i < this.ListOfVehicle.length; i++) {
        this.ListOfVehicle[i].isSelecteddevicesummary = false;
      }
    }

  }


  changeSelection() {
    this.fetchSelectedItems()
    this.demo();
  }
  selectedItemsList = [];
  fetchSelectedItems() {
    this.selectedItemsList = this.ListOfVehicle.filter((value, index) => {
      return value.isSelecteddevicesummary;

    });
  }
  checkedIDs = [];
  fetchCheckedIDs() {

    this.ListOfVehicle.forEach((value, index) => {
      if (value.isSelecteddevicesummary) {
        this.checkedIDs.push(value.param2);
      }
    });

  }

  datavalue: any;

  demo() {
    var checkedIDsdemo = [];
    this.datavalue = this.selectedItemsList;
    // console.log( this.datavalue);

    if (this.datavalue.length > 0) {
      $("#assignbutton").prop('disabled', false);

    } else {
      $("#assignbutton").prop('disabled', true);
    }
    for (let i = 0; i < this.datavalue.length; i++) {

      checkedIDsdemo.push(this.selectedItemsList[i].param3);
      //   console.log("Id of value is"+checkedIDsdemo);
      this.datasave = checkedIDsdemo;
      this.savevalue();
    }
  }
  savevalue() {
    console.log(this.datasave);
  }
}