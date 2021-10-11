import { ExportToExcelService } from './../../services/export-to-excel.service';
import { PdfService } from './../../services/pdf.service';
import { ListService } from './../../../../../list.service';
import { DeviceManagerService } from './../../services/device-manager.service';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;


@Component({
  selector: 'app-command-details',
  templateUrl: './command-details.component.html',
  styleUrls: ['./command-details.component.css']
})
export class CommandDetailsComponent implements OnInit {
  count; p; pagecount; reverse; key; filter: string = '';
  commandDetails: any[];
  encryptedpageNameValue: any;
  encryptedpageUrlValue: any;
  pageUrl = this.router.url;
  pageNumber: any = 1;
  itemsPerPage: any = 10;
  totalrecords: any = "NA";
  write_privilege: string;
  remark = '';
  dcommandId = '';
  devicemodelName = '';
  vendorName = '';
  deviceTypeName = '';
  deviceMakeId = '';
  deviceModelId = '';
  deviceTypeId = '';
  commandName = '';
  command = '';
  commandDesc = '';


  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5900,
    height: '200px',
  };
  vendorList: any;
  vendorObj: any;
  deviceTypeObj: any;
  deviceModelList: any;
  deviceTypeList: any;
  deviceModelObj: any;
  responseMessage: string;
  viewcount: any;
  totalcount: any;
  deleteText: any;
  commandDetailsForPDF: any;
  excelData: any[];



  constructor(private cryptService: CryptService, private excelService: ExportToExcelService, private router: Router, private deviceManagerService: DeviceManagerService, private listService: ListService, private pdfService: PdfService) {
    this.EncryptPageName();
    this.EncryptPageUrl();
  }

  ngOnInit() {
    this.getDeviceCommandDetails();
    this.DeviceCommandDetailsPDF();
    this.write_privilege = sessionStorage.getItem('writePrivilege');

    if (this.write_privilege == "false") {
      $("#editbtn").css("display", "none");
      $("#deletebtn").css("display", "none");
      $("#addnew").css("display", "none");
      $('#editbtn').hide();
      $('.material-icons md-18').css("display", "none");
      $('#deletebtn').attr('disabled', 'disabled');
      $('#addnew').attr('disabled', 'disabled');
    }
  }

  EncryptPageName() {
    this.cryptService.encrypt("Command Details")
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
    this.deviceTypeId = this.deviceTypeObj.param1;
    let dataL = {
      param1: "",
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
    this.deviceMakeId = this.vendorObj.param1;
    let dataL = {
      param1: this.vendorObj.param1,
      param2: this.deviceTypeObj.param1,
      pageID: "2",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.DeviceModelListAPI(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.deviceModelList = response.entity;
      }
    })
  }

  getDeviceModelId() {
    this.deviceModelId = this.deviceModelObj.param1;
  }


  getDeviceCommandDetails() {

    let dataL = {
      "pageNo": this.pageNumber,
      "itemsPerPage": this.itemsPerPage,
      "searchBy": this.filter,
      "searchType": "",
      "totalRecords": this.totalrecords,
      "pageID": "1",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.deviceManagerService.DeviceCommandDetails(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      if (response.statuscode == 200) {
        if (response.responseEntityCount == 1) {
          this.commandDetails = response.entity.list;
          this.viewcount = response.entity.viewCount;
          this.totalcount = response.entity.count;
        }
      }
    })

  }

  setdata(item) {
    this.dcommandId = item.param1;
    this.deviceTypeObj = item.param13;
    this.deviceTypeId = item.param4;
    this.deviceMakeId = item.param2;
    this.vendorObj = item.param12;
    this.deviceModelId = item.param3;
    this.deviceModelObj = item.param11;
    this.commandName = item.param5;
    this.command = item.param6;
    this.commandDesc = item.param7;
    this.devicemodelName = item.param11;
    this.vendorName = item.param12;
    this.deviceTypeName = item.param13;
    this.getDeviceType();

  }

  searchdata() {
    this.getDeviceCommandDetails();
  }

  changeItemsPerPage() {
    this.pageNumber = 1;
    this.getDeviceCommandDetails()
  }

  editpageform() {
    document.getElementById("backdetailsbtn").style.display = "block";
    document.getElementById("editbtn").style.display = "none";
    document.getElementById("vendordtls").style.display = "none";
    document.getElementById("container").style.display = "block";
    document.getElementById("modelfooter").style.display = "block";
    document.getElementById("uvmd").style.display = "block";
    document.getElementById("vmd").style.display = "none";
    if(this.write_privilege == "false")
    {
      $('#editbtn').hide();
    }
  }

  backdetailsbtn() {
    document.getElementById("uvmd").style.display = "none";
    document.getElementById("vmd").style.display = "block";
    document.getElementById("backdetailsbtn").style.display = "none";
    document.getElementById("editbtn").style.display = "block";
    document.getElementById("vendordtls").style.display = "block";
    document.getElementById("modelfooter").style.display = "none";
    document.getElementById("container").style.display = "none";
    if(this.write_privilege == "false")
    {
      $('#editbtn').hide();
    }
  }


  updateCommand() {
    var isValid = true;
    var remark = $('#remarkId').val();
    this.remark = remark.substring(0, 1).toUpperCase() + remark.substring(1);

    if (this.deviceTypeId == null || this.deviceTypeId == '') {
      isValid = false;
      $('#msg_devicetypeErr').html('Please Select Device Type').show();
      $('#devicetypeid').focus();
      setTimeout(function () { document.getElementById("msg_devicetypeErr").style.display = "none"; }, 3000);
    }
    else if (this.deviceMakeId == null || this.deviceMakeId == '') {
      isValid = false;
      $('#msg_vendorErr').html('Please Select Vendor').show();
      $('#vendorId').focus();
      setTimeout(function () { document.getElementById("msg_vendorErr").style.display = "none"; }, 3000);
    }
    else if (this.deviceModelId == null || this.deviceModelId == '') {
      isValid = false;
      $('#msg_modelErr').html('Please Select Device Model').show();
      $('#devicemodelid').focus();
      setTimeout(function () { document.getElementById("msg_modelErr").style.display = "none"; }, 3000);
    }
    else if (this.commandName == null || this.commandName == '') {
      isValid = false;
      $('#msg_cmdNameErr').html('Please Enter Command Name').show();
      $('#cNameId').focus();
      setTimeout(function () { document.getElementById("msg_cmdNameErr").style.display = "none"; }, 3000);
    }

    else if (this.command == null || this.command == '') {
      isValid = false;
      $('#msg_cmdErr').html('Please Enter Command').show();
      $('#commandId').focus();
      setTimeout(function () { document.getElementById("msg_cmdErr").style.display = "none"; }, 3000);
    }
    else if (this.commandDesc == null || this.commandDesc == '') {
      isValid = false;
      $('#msg_CmdDescErr').html('Please Enter Description').show();
      $('#descId').focus();
      setTimeout(function () { document.getElementById("msg_CmdDescErr").style.display = "none"; }, 3000);
    }

    else if (this.remark == null || this.remark == '') {
      isValid = false;
      $('#msg_errorremark').html('Please Enter remark').show();
      $('#remarkId').focus();
      setTimeout(function () { document.getElementById("msg_errorremark").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        param1: this.remark,
        param2: this.dcommandId,
        param3: this.deviceMakeId,
        param4: this.deviceModelId,
        param5: this.deviceTypeId,
        param6: this.commandName,
        param7: this.command,
        param8: this.commandDesc
      }
      try { AddLoader() } catch (e) { alert(e) }
      this.deviceManagerService.UpdateCommand(dataL).subscribe((response) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.responseMessage = response.entity;
        if (response.statuscode == 200) {

          $("#SuccessModal").modal('show');
          this.closemodal();
          this.clear();

        }
        else {

          $("#ErrorModal").modal('show');
          this.clear();
        }
      })
    }

  }
  clear() {
    this.remark = "";
    this.dcommandId = "";
    this.deviceMakeId = "";
    this.deviceModelId = "";
    this.deviceTypeId = "";
    this.commandName = "";
    this.command = "";
    this.commandDesc = "";
  }

  DeviceCommandDetailsPDF() {
    let dataL = {
      "pageNo": "",
      "itemsPerPage": "",
      "searchBy": "",
      "searchType": "",
      "totalRecords": "",
      "pageID": "1",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.deviceManagerService.DeviceCommandDetails(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        if (response.responseEntityCount == 1) {
          this.commandDetailsForPDF = response.entity.list;
          this.PrepareExcelData(this.commandDetailsForPDF);

        }
      }
    })

  }

  createPDF() {
    let pdfTableData;
    let dataArray = []
    for (let i = 0; i < this.commandDetailsForPDF.length; i++) {
      pdfTableData = {
        "#": this.commandDetailsForPDF[i]["rowNumber"],
        "Device Type": this.commandDetailsForPDF[i]["param13"],
        "Vendor": this.commandDetailsForPDF[i]["param12"],
        "Device Model": this.commandDetailsForPDF[i]["param11"],
        "Command Name": this.commandDetailsForPDF[i]["param5"],
        "Command Description": this.commandDetailsForPDF[i]["param7"]
      }
      dataArray.push(pdfTableData)
    };
    this.pdfService.CreatePDFData(dataArray, "Command Details");

  }

  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "Device Type": data[i].param13,
        "Vendor ": data[i].param12,
        "Device Model ": data[i].param11,
        "Command Name ": data[i].param5,
        "Command Description": data[i].param7,
      }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    this.excelService.ExportExcel(this.excelData, 'Command Details', 'commanddetails')
  }

  deleteCommand() {
    if (this.deleteText == '' || this.deleteText == null) {
      document.getElementById("deleteremark").innerHTML = "Please Enter Remark";
      $('#commandDelremark').focus();
      setTimeout(function () { document.getElementById("deleteremark").style.display = "none"; }, 3000);

    }
    else {
      let dataL = {
        param1: this.deleteText,
        param2: this.dcommandId,
        pageId: '1',
        pageName: this.encryptedpageNameValue,
        pageUrl: this.encryptedpageUrlValue
      }
      this.deviceManagerService.DeleteCommand(dataL).subscribe((response) => {
        $("#modeldelete").modal('hide');
        this.responseMessage = response.entity
        if (response.statuscode == 200) {

          $("#SuccessModal").modal('show');
          this.deleteText = "";
          this.closemodal();
        }
        else {

          $("#ErrorModal").modal('show');
          this.closemodal();

        }
      })
    }
  }


  closemodal() {

    $("#SuccessModal").modal('hide');

    $('#modeldelete').modal('hide');
    $('#myModalwizard').modal('hide');

    $('.modal-backdrop.show').css('display', 'none');

  }
  Refreshfunction() {
    this.itemsPerPage = 10;
    this.pageNumber = 1;
    this.filter = ''
    this.getDeviceCommandDetails();
  }
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  changePageNumber(event) {
    this.pageNumber = event;
    this.getDeviceCommandDetails()
  }
}




