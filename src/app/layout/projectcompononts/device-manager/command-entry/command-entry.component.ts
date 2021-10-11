import { DeviceManagerService } from './../../services/device-manager.service';
import { CryptService } from './../../services/crypt.service';
import { Router } from '@angular/router';
import { ListService } from './../../../../../list.service';
import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;


@Component({
  selector: 'app-command-entry',
  templateUrl: './command-entry.component.html',
  styleUrls: ['./command-entry.component.css']
})
export class CommandEntryComponent implements OnInit {
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5900,
    height: '200px',
  };

  pageUrl = this.router.url;
  encryptedpageNameValue: any;
  encryptedpageUrlValue: any;
  deviceTypeList: any;
  vendorList: any;
  vendorObj: any; deviceModelObj: any;
  deviceTypeObj: any;
  deviceModelList: any;
  commandName: any;
  command: string;
  commandDesc: string;
  responseMessage: string;
  constructor(private listService: ListService, private router: Router, private cryptService: CryptService, private devicemangerService: DeviceManagerService) {
    this.EncryptPageName(); this.EncryptPageUrl();
  }

  ngOnInit() {
    this.getDeviceType();
    $("#devicetypeid").focus()
  }

  EncryptPageName() {
    this.cryptService.encrypt("command Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }


  getDeviceType() {
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
      param1:"",
      pageID: "2",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.VendorListAPI(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.vendorList = response.entity;
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


  CommandEntry() {
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
      $('#modelid').focus();
      setTimeout(function () { document.getElementById("msg_DeviceModelError").style.display = "none"; }, 3000);
    }
    else if (this.commandName == null || this.commandName == '') {
      isValid = false;
      $('#msg_commandNameError').html('Please Enter Command Name ').show();
      $('#commandnameid').focus();
      setTimeout(function () { document.getElementById("msg_commandNameError").style.display = "none"; }, 3000);
    }
    else if (this.commandName.length < 3 || this.commandName.length > 20) {
      isValid = false;
      $('#msg_commandNameError').html('Command Name should be at   3 to 20 characters long ').show();
      $('#commandnameid').focus();
      setTimeout(function () { document.getElementById("msg_commandNameError").style.display = "none"; }, 3000);
    }
    else if (this.command == null || this.command == '') {
      isValid = false;
      $('#msg_commandError').html('Please Enter Command  ').show();
      $('#commandid').focus();
      setTimeout(function () { document.getElementById("msg_commandError").style.display = "none"; }, 3000);
    }
    else if (this.command.length < 3 || this.command.length > 20) {
      isValid = false;
      $('#msg_commandError').html('Command Should  be  3 to 20 characters long  ').show();
      $('#commandid').focus();
      setTimeout(function () { document.getElementById("msg_commandError").style.display = "none"; }, 3000);
    }
    else if (this.commandDesc == null || this.commandDesc == '') {
      isValid = false;
      $('#msg_descError').html('Please Enter Command Description ').show();
      $('#descid').focus();
      setTimeout(function () { document.getElementById("msg_descError").style.display = "none"; }, 3000);
    }
    else if (this.commandDesc.length < 3) {
      isValid = false;
      $('#msg_descError').html('Description should be at least 3 characters long ').show();
      $('#descid').focus();
      setTimeout(function () { document.getElementById("msg_descError").style.display = "none"; }, 3000);
    }

    else {
      this.InsertCommand()
    }


  }

  InsertCommand() {
    let dataL = {
      param1: "",//'remarks',
      param2: "",//'dcommandid',
      param3: this.vendorObj.param1,//'devicemakeid',
      param4: this.deviceModelObj.param1,//'devicemodelid',
      param5: this.deviceTypeObj.param1,//'devicetypeid',
      param6: this.commandName,//'commandname',
      param7: this.command,//'command'
      param8: this.commandDesc,//'commanddescription'
    }
    AddLoader()
    this.devicemangerService.InsertCommand(dataL).subscribe((response) => {
      RemoveLoader()
       if (response.statuscode == 200) {
 
        this.responseMessage = response.entity
        $("#SuccesscommandModal1").modal('show');
        this.deviceTypeObj == null; this.vendorObj = null; this.deviceModelObj = null;
        this.commandName = null; this.command = null; this.commandDesc = null
      }
      else {
        this.responseMessage = response.entity
        $("#ErrorcommandModal1").modal('show');
      }
      // $('.modal-backdrop.show').css('display', 'none');

    })
  }
}
