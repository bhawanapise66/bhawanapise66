import { DeviceManagerService } from './../../services/device-manager.service';
import { ListService } from './../../../../../list.service';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { Component, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';
import { pushAll } from '@amcharts/amcharts4/.internal/core/utils/Array';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;


@Component({
  selector: 'app-device-manager-entry',
  templateUrl: './device-manager-entry.component.html',
  styleUrls: ['./device-manager-entry.component.css']
})
export class DeviceManagerEntryComponent implements OnInit {

  pageNumber: any = 1; itemsPerPage: any = 10; filter: any = ''; totalRecords: any = "NA"; remark: string = '';

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5900,
    height: '200px',
  };
  encryptedpageNameValue: any;
  encryptedpageUrlValue: any;
  pageUrl = this.router.url;
  deviceTypeList: any; vendorList: any; deviceModelList: any; deviceTypeObj: any; vendorObj: any; deviceModelObj: any;
  imeiList: any; imeiObj: any; commandObj: any; commandList: any;


  constructor(private cryptService: CryptService, private router: Router, private listService: ListService, private devicemangerService: DeviceManagerService) {
    this.EncryptPageName();
    this.EncryptPageUrl();
  }

  ngOnInit() {
    this.DeviceType(); this.getCommandlist();
  }

  EncryptPageName() {
    this.cryptService.encrypt("Device Manager")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }


  DeviceType() {
    let dataL = {
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.DeviceTypeListAPI(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.deviceTypeList = response.entity.list
      }
    })
  }

  getVendorList() {
    let dataL = {
      pageID: "2",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.VendorListAPI(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.vendorList = response.entity.list;
      }
    })
  }

  getDeviceModelList() {
    let dataL = {
      param1: this.vendorObj.param1,
      param2: this.deviceTypeObj.param1,
      pageID: "2",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.DeviceModelListAPI(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.deviceModelList = response.entity.list;
      }
    })
  }

  getImeiList() {
    let dataL = {
      pageID: "2",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue,
      param1: this.vendorObj.param1,
      param2: this.deviceTypeObj.param1,
      // param3:this.deviceTypeObj.param1
    }
    this.listService.DeviceList_RawData(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.imeiList = response.entity.list;
      }
    })
  }

  getCommandlist() {
    let dataL = {
      pageID: "2",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue,
    }
    this.listService.DeviceCommandList(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.commandList = response.entity.list;
      }
    })
  }

  SendCommand() {

    var imeiArray = [];
    var deviceIdArray = [];
    for (let i = 0; i < this.imeiObj.length; i++) {
      imeiArray.push(this.imeiObj[i]["param2"]);
      deviceIdArray.push(this.imeiObj[i]["param1"]);

    }
    var isValid = true;
    if (this.deviceTypeObj == "" || this.deviceTypeObj == null) {
      isValid = false;
      $('#msg_devicetypeError').html('Please Select Device Type').show();
      $('#devicetypeid').focus();
      setTimeout(function () { document.getElementById("msg_devicetypeError").style.display = "none"; }, 3000);
    }
    else if (this.vendorObj == null || this.vendorObj == "") {
      isValid = false;
      $('#msg_VendorError').html('Please Select Vendor ').show();
      $('#vendorid').focus();
      setTimeout(function () { document.getElementById("msg_VendorError").style.display = "none"; }, 3000);
    }
    else if (this.deviceModelObj == null || this.deviceModelObj == '') {
      isValid = false;
      $('#msg_DeviceModelError').html('Please Select Device Model ').show();
      $('#devicemodelid').focus();
      setTimeout(function () { document.getElementById("msg_DeviceModelError").style.display = "none"; }, 3000);
    }
    else if (this.imeiObj == null || this.imeiObj.length==0) {
      isValid = false;
      $('#msg_imeiError').html('Please Select IMEI Number ').show();
      $('#imeiid').focus();
      setTimeout(function () { document.getElementById("msg_imeiError").style.display = "none"; }, 3000);
    }
    else if (this.commandObj == null || this.commandObj == '') {
      isValid = false;
      $('#msg_commandError').html('Please Select Command ').show();
      $('#commandid').focus();
      setTimeout(function () { document.getElementById("msg_commandError").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        "pageNo": this.pageNumber,
        "itemsPerPage": this.itemsPerPage,
        "searchBy": this.filter,
        "searchType": "",
        "totalRecords": this.totalRecords,
        "pageID": "234",
        "pageName": this.encryptedpageNameValue,
        "pageURL": this.encryptedpageUrlValue,
        "param1": this.remark,
        "param2": this.commandObj.param1,    //command id
        "param3": deviceIdArray.toString(),  //deviceid
        "param4": "", //command
        "param5": "", //command response
        "param6": imeiArray.toString() // imei number
      }
      this.devicemangerService.SendCommandToDevice(dataL).subscribe((response) => {
        alert(response.statuscode);

      })
    }
  }


}
