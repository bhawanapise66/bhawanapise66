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
import * as moment from 'moment';
import * as $ from 'jquery';
import { CryptService } from '../../services/crypt.service';
//import { DevicemodelService } from '../../../../APIService/devicemodel.service';
import { DevicemodelService } from '../../../../APIService/devicemodel.service';
declare var jQuery: any;
declare var $: any;

declare var AddLoader: any;
declare var RemoveLoader: any;


@Component({
  selector: 'app-modelentry',
  templateUrl: './modelentry.component.html',
  styleUrls: ['./modelentry.component.css']
})
export class ModelentryComponent implements OnInit {
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;
  public loading = false; p: number; pagecount: number; count: number = 0; viewcount: number;
  datafromrespo: string;

  Modelcodeentry: string; ModelNameentry: string; TACcertNoentry: string; TACcertDateentry: string; TACcertvalentry: string; COPcertNoentry: string; COPcertDateentry: string; COPcertvalentry: string;
  remarkDevModTextentry: string;

  ListOfVendor$: Object; ListOfDevicetype$: Object; ListOfCertAuth$: Object;ListOfVendorType$: Object;
  ListOfVendor = []; ListOfDevicetype = []; ListOfCertAuth = [];ListOfVendorType = [];

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  devicetypeName: any;

  constructor(private listService: ListService, private cryptService: CryptService, private router: Router, private devicemodelService: DevicemodelService) {

    this.EncryptPageName();
    this.EncryptPageUrl();
  }

  ngOnInit() {

    (function ($) {
      $(document).ready(function () {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#vendornameentry ').focus();
        })
      });
    })(jQuery);

    this.Vendorlist();
    this.DeviceTypeList();
    this.CertificateAuthlist();
    this.clearfunction();

  }
  EncryptPageName() {
    this.encryptedpageNameValue = this.cryptService.encrypt("Device Model Entry")
  }
  EncryptPageUrl() {
    this.encryptedpageUrlValue = this.cryptService.encrypt(this.pageUrl)
  }
  
  Vendorlist(){
    let keydata = {
      param1: "MEQesuRUGvkpIxXTgCIXvw==",    //vendortypeid
      param2:"yARaqXo6A8pmLAGyWbqJWA==",    //devicetypeid
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.VendorListAPI(keydata).subscribe(
      (data) => {
        this.ListOfVendor = data.entity;
      });

  }

  getDevicetypeId() {
    this.selectdevicetype = this.DeviceTypeTextentry.param1;
    this.devicetypeName = this.DeviceTypeTextentry.param2;
  }

  getVendorId() {
    this.selectvendorname = this.VendorNameTextentry.param1;
    this.DeviceTypeList()
  }

  CertificateAuthlist() {

    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.CertAuthListAPI(keydata).subscribe(
      (data) => {
        this.ListOfCertAuth = data.entity.list;

      });
  }
  /* ------------------- Certificate Api function -------------------*/

  DeviceTypeList() {

    let keydata = {
      param1: "",
      param2: "",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.DeviceTypeListAPI(keydata).subscribe(
      (data) => {
        this.ListOfDevicetype = data.entity;
      });
  }
  DeviceTypeTextentry: any;
  selectdevicetype: string;

  VendorNameTextentry: any;
  selectvendorname: string;

  CertiAuthoentry: any;
  selectcertautho: string;

  insertdevicemodel() {
    if (this.selectvendorname == null || this.selectvendorname == '') {
      $('#msg_errorentry').html('Please Enter Device Type').show();
      $('#devicetypeentry').focus();
      setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
    } 
    // else if (this.selectdevicetype == null || this.selectdevicetype == '') {
    //   $('#msg_errorentry').html('Please Enter Vendor Name').show();
    //   $('#vendornameentry').focus();
    //   setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
    // }
    else if (this.ModelNameentry == null || this.ModelNameentry == '') {
      $('#msg_errorentry').html('Please Enter Model Name').show();
      $('#modelnameentry').focus();
      setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
    }
    else if (this.Modelcodeentry == null || this.Modelcodeentry == '') {
      $('#msg_errorentry').html('Please Enter Model Code').show();
      $('#modelcodeentry').focus();
      setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        remarks: "",
        devmodelid: '',
        devmodelcode: this.Modelcodeentry,
        devmodelname: this.ModelNameentry,
        devmodelcertby: '',
        devmodtaccertno: '',
        devmodtaccertdate: '',
        devmodtaccertvaildity: '',
        devmodproddate: '',
        devmodcopcertno: '',
        devmodcopcertdate: '',
        devmodcopcertvalidity: '',
        devmodcertupload: '',
        vendorid: this.selectvendorname,
        devicetypeid: "yARaqXo6A8pmLAGyWbqJWA==",
        pageID: "1",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      AddLoader()
      this.devicemodelService.InsertdevicemodelAPI(dataL).subscribe((data) => {
        RemoveLoader();
        this.datafromrespo = data.entity;
        if (data.statuscode == 200) {
          $("#SuccessModalEntry").modal('show');
        }
        else {
          $("#ErrorModalEntry").modal('show');
        }
      });
    }
  }

  clearfunction() {
    this.remarkDevModTextentry = ''; this.Modelcodeentry = ''; this.ModelNameentry = ''; this.selectcertautho = '';
    this.selectdevicetype = ''; this.selectvendorname = '';
  }

  closemodal() {
    $("#SuccessModalEntry").modal('hide');
    $("#ErrorModalEntry").modal('hide');
    $('#modeldelete').modal('hide');
    $('#exampleModal').modal('hide');
    $('.modal-backdrop.show').css('display', 'none');
    this.clearfunction();
  }

}
