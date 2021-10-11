import { PdfService } from './../../services/pdf.service';
import { ExportToExcelService } from './../../services/export-to-excel.service';
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

declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;



@Component({
  selector: 'app-modeldetails',
  templateUrl: './modeldetails.component.html',
  styleUrls: ['./modeldetails.component.css']
})
export class ModeldetailsComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  key: string = 'name'; reverse: boolean = true;
  filter: string = '';

  pageUrl = this.router.url; selectRowsText: string = "10";

  private _success = new Subject<string>(); successMessageUpdate: string;
  datafromrespo: string;
  pageNumber: any = 1; itemsPerPage: any = 10;
  viewcount: number;

  model_code: string; model_name: string; TAC_cert_no: string;
  TAC_cert_date: string; TAC_cert_validity: string; COP_cert_no: string; COP_cert_date: string; COP_cert_validity: string;
  model_id: string; deleteText: string;

  deleteremarkText: string;
  Modelcode: string; ModelName: string; CertiAutho: string; TACcertNo: string; TACcertDate: string; TACcertval: string; Productiondate: string; COPcertNo: string; COPcertDate: string; COPcertval: string;
  DeviceTypeText: string; VendorNameText: string; remarkDevModText: string;
  ListOfVendor$: Object; ListOfDevicetype$: Object; ListOfCertAuth$: Object; DeviceModelDetails$: Object;
  ListOfVendor = []; ListOfDevicetype = []; ListOfCertAuth = [];
  count: any = 9999;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  deviceModelPDFData: any;
  excelData: any[];
  totalcount: any;
  devicetypeName: any;
  remarkText: any;

  constructor(private listService: ListService, private cryptService: CryptService, private router: Router, private devicemodelService: DevicemodelService,
    private excelservice: ExportToExcelService, private pdfservice: PdfService) {
    this.EncryptPageName();
    this.EncryptPageUrl();
  }


  ngOnInit() {
    //  Added Count , ViewCount = 0 ............Date : 2-12-2020 Developer: Aditya Londhe
    this.viewcount = 0;
    /* ------------------------------- Wizards start Ts------------------------------------------------- */

    this.DeviceModelDetail();

    /* ------------------------------- Wizards end Ts------------------------------------------------- */
  }
  EncryptPageName() {
    this.encryptedpageNameValue = this.cryptService.encrypt("Device Model Details")
  }
  EncryptPageUrl() {
    this.encryptedpageUrlValue = this.cryptService.encrypt(this.pageUrl)
  }

  editpageform() {
    document.getElementById("backdetailsbtn").style.display = "block";
    document.getElementById("editbtn").style.display = "none";
    // document.getElementById("vendordtls").style.display = "none";
    document.getElementById("container").style.display = "block";
    document.getElementById("modelfooter").style.display = "block";
    document.getElementById("uvmd").style.display = "block";
    document.getElementById("vmd").style.display = "none";
  
    // this.CertificateAuthlist();
  }
  backdetailsbtn() {
    document.getElementById("uvmd").style.display = "none";
    document.getElementById("vmd").style.display = "block";
    document.getElementById("backdetailsbtn").style.display = "none";
    document.getElementById("editbtn").style.display = "block";
    document.getElementById("vendordtls").style.display = "block";
    document.getElementById("modelfooter").style.display = "none";
    document.getElementById("container").style.display = "none";
  }

  Vendorlist() {

    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.VendorListAPI(keydata).subscribe((data) => {
      this.ListOfVendor = data.entity.list;
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
    AddLoader();
    this.listService.DeviceTypeListAPI(keydata).subscribe((data) => {
      RemoveLoader();
      this.ListOfDevicetype = data.entity.list;
    });
  }

  CertificateAuthlist() {

    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.CertAuthListAPI(keydata).subscribe((data) => {
      this.ListOfCertAuth = data.entity.list;
    });
  }

  // Save Edit device model start 
  dev_type: any;
  selectdevicetype: string;

  vendor_name: any;
  selectvendorname: string;

  certification_autho: any;
  selectcertautho: string;

  devicetypeid: string; vendorid: string;

  getDevicetypeId() {
    this.devicetypeName = this.dev_type.param2;
    this.devicetypereturn = this.dev_type.param1;
    console.log(this.devicetypereturn)
    if (this.devicetypeName != 'AIS-140') {
      this.model_code = ''
    }
  }


  /* ------------------------- Device Model Details API -----------------*/
  DeviceModelDetail() {
    let keydata = {
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
    }
    AddLoader();
    this.devicemodelService.DeviceModelDetailsAPI(keydata).subscribe((data) => {
      RemoveLoader();
      this.DeviceModelDetails$ = data.entity.responsedatalist;
      this.totalcount = data.entity.count;
      this.viewcount = data.entity.viewCount;
    });
  }

  searchdata() {
    this.pageNumber = 1;
    this.DeviceModelDetail();
  }

  changeItemsPerPage() {
    this.pageNumber = 1;
    this.DeviceModelDetail();
  }


  Refreshfunction() {
    this.pageNumber = 1;
    this.itemsPerPage = 10;
    this.filter = '';
    this.DeviceModelDetail();
  }

  pageChange(event) {
    this.pageNumber = event;
    this.DeviceModelDetail();
  }

  updatedevicemodel() {

    if (this.remarkText == null || this.remarkText == '') {
      $("#remarkupdate").focus();
    }

    else if (this.vendornamereturn == null || this.vendornamereturn == '') {
      $('#msg_error').html('Please Select Vendor').show();
      $('#vendornameup').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
    }
    else if (this.devicetypereturn == null || this.devicetypereturn == '') {
      alert('fas gaya beta')
      $('#msg_error').html('Please Select Device Type').show();
      $('#devicetdevicetypeupype').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
    }
    else if (this.model_name == null || this.model_name == '') {
      $('#msg_error').html('Please Enter Model Name').show();
      $('#modelnameup').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
    }
    else if (this.devicetypeName == 'AIS-140' && (this.model_code == null || this.model_code == '')) {
      $('#msg_error').html('Please Enter Model Code').show();
      $('#modelcodeup').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        remarks: this.remarkText,
        devmodelid: this.model_id,
        devmodelcode: this.model_code,
        devmodelname: this.model_name,
        devmodelcertby: '',
        devmodtaccertno: '',
        devmodtaccertdate: '',
        devmodtaccertvaildity: '',
        devmodproddate: '',
        devmodcopcertno: '',
        devmodcopcertdate: '',
        devmodcopcertvalidity: '',
        devmodcertupload: '',
        vendorid: this.vendornamereturn,
        devicetypeid: this.devicetypereturn,
        "pageID": "1",
        "pageName": this.encryptedpageNameValue,
        "pageURL": this.encryptedpageUrlValue
      }
      AddLoader()
      this.devicemodelService.UpdatedevicemodelAPI(dataL).subscribe((data) => {
        RemoveLoader();
        this.datafromrespo = data.entity;
        if (data.statuscode == 200) {
          $("#SuccessModal").modal('show');
          this.DeviceModelDetail();
          this.clearfunction();
        }
        else {
          $("#ErrorModal").modal('show');
        }
      });
    }
  }

  DeviceModelForPDF() {
    let keydata = {
      pageNo: "",
      itemsPerPage: "",
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
    }
    AddLoader()
    this.devicemodelService.DeviceModelDetailsAPI(keydata).subscribe((data) => {
      RemoveLoader();
      this.deviceModelPDFData = data.entity.responsedatalist
      this.PrepareExcelData(this.deviceModelPDFData);
    });
  }

  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i]["rowNumber"],
        "Vendor Name": data[i]["param14"],
        "Device Type": data[i]["param18"],
        "Model Code": data[i]["param2"],
        "Model Name": data[i]["param3"],        
        "Creation Date": data[i]["param15"],
      }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, "Device Model Detail", 'devicemodel')
  }

  createPDF() {
    let keydata = {
      pageNo: "",
      itemsPerPage: "",
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
    }
    this.devicemodelService.DeviceModelDetailsAPI(keydata).subscribe((data) => {
      if (data.statuscode == 200) {
        this.deviceModelPDFData = data.entity.responsedatalist

        let pdfTableData;
        let dataArray = []
        for (let i = 0; i < this.deviceModelPDFData.length; i++) {
          pdfTableData = {
            "#": this.deviceModelPDFData[i]["rowNumber"],
            "Vendor Name": this.deviceModelPDFData[i]["param14"],
            "Device Type": this.deviceModelPDFData[i]["param18"],
            "Model Code": this.deviceModelPDFData[i]["param2"],
            "Model Name": this.deviceModelPDFData[i]["param3"],            
            "Creation Date": this.deviceModelPDFData[i]["param15"],
          }
          dataArray.push(pdfTableData)
        };
        this.pdfservice.CreatePDFData(dataArray, "Device Model Details");

      }
    })
  }

  /* ------------------------- Device Model Details API -----------------*/

  /* ------------------------- Device Model Search Details API -----------------*/


  devicetypereturn: string; vendornamereturn: string; certiauthoreturn: string;
  setdata(com) {
    this.DeviceTypeList();
    this.Vendorlist();
    this.vendornamereturn = com.param13;
    this.vendor_name = com.param14;
    // this.dev_type = com.param18;
    this.devicetypereturn = com.param17;
    this.model_name = com.param3;
    this.model_code = com.param2;
    this.devicetypeName = com.param18
    this.model_id = com.param1;

    for(let i=0;i<this.ListOfDevicetype.length;i++){
      if(this.ListOfDevicetype[i]["param2"] ==com.param18){
        this.dev_type = this.ListOfDevicetype[i]
      }
    }
    
  }


  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;

  }
  ModelDeletefunction() {
    var isValid = true;
    var deleteremark = $('#cusdelremark').val();
    if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      $('#msg_error_delete').html('Please Enter Remark').show();
      $('#cusdelremark').focus();
      setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        param1: deleteremark,
        param2: this.model_id,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }
      AddLoader()
      this.devicemodelService.DeleteModelAPI(dataL).subscribe((data) => {
        RemoveLoader()
        this.datafromrespo = data.entity;
        $("#modeldelete").modal('hide');
        if (data.statuscode == 200) {
          $("#myModalwizard").modal('hide');
          $("#SuccessModal").modal('show');
          this.DeviceModelDetail();
        }
        else {
          $("#ErrorModal").modal('show');
        }
      });
    }
  }

  closemodal() {
    //alert("come ");
    $("#successmodel").modal('hide');

    $('#modeldelete').modal('hide');
    $('#myModalwizard').modal('hide');

    $('.modal-backdrop.show').css('display', 'none');

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
    try {
      if (typeof value === 'object') {
        return value.param1;
      }
      else {
        var index = data.findIndex(x => x.param2 === value);
        //alert(index)
        return data[index].param1;
      }
    } catch (e) {
      return '';
    }

  }

  clearfunction() {

    this.remarkDevModText = ''; this.model_id = ''; this.model_code = ''; this.model_name = ''; this.vendor_name = '';
    this.dev_type = '';


  }

}
