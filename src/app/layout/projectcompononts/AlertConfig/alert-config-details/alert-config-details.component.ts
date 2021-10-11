import { PdfService } from './../../services/pdf.service';
import { ExportToExcelService } from './../../services/export-to-excel.service';
import { Paramcls } from './../../../../../paramcls';
import { ListService } from './../../../../../list.service';
import { CryptService } from './../../services/crypt.service';
import { Router } from '@angular/router';
import { AlertConfigurationModelService } from './../../../../APIService/alert-configuration-model.service';
import { Component, OnInit } from '@angular/core';
declare var AddLoader: any;
declare var RemoveLoader: any;

declare var $: any;


@Component({
  selector: 'app-alert-config-details',
  templateUrl: './alert-config-details.component.html',
  styleUrls: ['./alert-config-details.component.css']
})
export class AlertConfigDetailsComponent implements OnInit {
  encryptedpageNameValue: any; encryptedpageUrlValue: any;
  pageUrl = this.router.url
  config = {
    displayKey: "param2",
    search: true,
    limitTo: 1000,
    height: "200px"
  };
  customerList: any;
  customerObj: any;
  alertTypeDetailsList: any[];
  alertConfigDetails: any;

  MobileNumberliveText; MobileNumberText; numbercomlive;
  EmailHistoryText; numbercomhistory; changeValue; SelectAlertDetail; SelectliveAlert; addliveclick; editpageformhis; addhistoryclick;
  alerts: any[];
  alertrectype = 'SMS'
  customerName: any;
  alertType: any;
  notificationStatus: any;
  overspeedCount: any;
  emailList: any[]; phoneList: any[]; alertidList: any[];

  historyAlertList: any;
  mobileEdit: any; emailEdit: string;
  alertsArray: any;

  submitted: boolean = false;
  alertsIdArray: any;
  customerId: any;
  scheduleTime: any = ''; stoppageValue: any = '';
  responseMessage: string;
  alertConfigId: any;
  remark: string;
  reverse: any;
  key: any;

  customersearchid: string = 'All'; alerttype_searchId: string = 'both'
  totalcount: any;
  viewcount: any;
  pageNumber: any = 1;
  itemsPerPage: any = 10;
  filter: string = '';
  valueAlreadyGot: boolean = false;
  alertConfigDetailsPDF: any;
  excelData: any[];
  constructor(private alertconfigurationService: AlertConfigurationModelService, private router: Router, private cryptService: CryptService, private listService: ListService,
    private excelservice: ExportToExcelService, private pdfservice: PdfService) {
    this.EncryptPageName();
    this.EncryptPageUrl();
  }

  ngOnInit() {
    this.Customerlist();
    this.AlertConfigureDetails();
  }

  EncryptPageName() {
    this.cryptService.encrypt("Alert Configuration Details")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;

  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }


  getCustomerId() {
    this.customersearchid = this.customerObj.param1;
    this.AlertConfigureDetails();
  }
  AlertConfigureDetails() {
    let dataL = {
      param1: this.customersearchid,
      param2: this.alerttype_searchId,
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.alertconfigurationService.alertConfigurationDetails(dataL).subscribe((response) => {
      this.alertConfigDetails = response.entity.list;
      this.viewcount = response.entity.viewCount;
      if (this.valueAlreadyGot == false) {
        this.totalcount = response.entity.count;
        this.AlertConfigureDetailsPDF();
      }
    })
  }

  pageChanged(event) {
    this.valueAlreadyGot = true;
    this.pageNumber = event;
    this.AlertConfigureDetails();
  }

  searchdata() {
    this.valueAlreadyGot = false;
    this.itemsPerPage = 10;
    this.pageNumber = 1
    this.AlertConfigureDetails()
  }
  Refreshfunction() {
    this.valueAlreadyGot = false;
    this.itemsPerPage = 10;
    this.pageNumber = 1;
    this.filter = ''
    this.customersearchid = "All";
    this.alerttype_searchId = "both";
    this.AlertConfigureDetails();
  }

  changeItemsPerPage() {
    this.pageNumber = 1;
    this.valueAlreadyGot = true;
    this.AlertConfigureDetails();
  }

  AlertConfigureDetailsPDF() {
    let dataL = {
      param1: this.customersearchid,
      param2: this.alerttype_searchId,
      pageNo: "",
      itemsPerPage: "",
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.alertconfigurationService.alertConfigurationDetails(dataL).subscribe((response) => {
      this.alertConfigDetailsPDF = response.entity.list;
      this.PrepareExcelData(this.alertConfigDetailsPDF)
    })
  }


  createPDF() {
    let pdfTableData;
    let dataArray = []
    for (let i = 0; i < this.alertConfigDetailsPDF.length; i++) {
      pdfTableData = {
        "#": i + 1,
        "CUSTOMER NAME": this.alertConfigDetailsPDF[i]["param10"],
        "ALERT TYPE": this.alertConfigDetailsPDF[i]["param14"],
        "ALERTS": this.alertConfigDetailsPDF[i]["param9"],
        "OVERSPEED COUNT": this.alertConfigDetailsPDF[i]["param8"],
        "MOBILE NUMBER": this.alertConfigDetailsPDF[i]["param3"],
        "EMAIL": this.alertConfigDetailsPDF[i]["param4"],
        "NOTIFICATION": this.alertConfigDetailsPDF[i]["param5"],
        "CREATE DATE": this.alertConfigDetailsPDF[i]["param13"],

      }
      dataArray.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(dataArray, "Designation Details");

  }


  PrepareExcelData(data) {
    this.excelData = [];

    for (var i = 0; i < data.length; i++) {
      try {
        var obj = {

          "#": i + 1,
          "CUSTOMER NAME": data[i].param10,
          "ALERT TYPE": data[i].param14,
          "ALERTS": data[i].param9,
          "OVERSPEED COUNT": data[i].param8,
          "MOBILE NUMBER": data[i].param3,
          "EMAIL ID": data[i].param4,
          "NOTIFICATION STATUS": data[i].param5,
          "CREATE DATE": data[i].param13,
        }
      } catch (e) { }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'Alert Configuration Details', 'alrtconfiguration');
  }

  sort(data) {
    this.key = data
    this.reverse = !this.reverse
  }

  Customerlist() {
    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.CustomerListAPI(keydata).subscribe((data) => {
      this.customerList = data.entity.list;
    });
  }

  AlertTypeList(alerttype) {
    let keydata = {
      pageNo: '',
      itemsPerPage: '',
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    if (alerttype == "Live")
      this.alertconfigurationService.alertTypeDetails(keydata).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.alertTypeDetailsList = data.entity.list;
      });
    else if (alerttype == "History")
      this.alertconfigurationService.historyAlertTypeDetails(keydata).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.alertTypeDetailsList = data.entity.list;
      });
  }



  editpageform() {
    document.getElementById("backdetailsbtn").style.display = "block";
    document.getElementById("editbtn").style.display = "none";
    document.getElementById("vendordtls").style.display = "none";
    document.getElementById("container-fluid").style.display = "block";
    document.getElementById("modelfooter").style.display = "block";
    document.getElementById("uvmd").style.display = "block";
    document.getElementById("vmd").style.display = "none";
    this.AlertTypeList(this.alertType);

  }

  backdetailsbtn() {
    document.getElementById("uvmd").style.display = "none";
    document.getElementById("vmd").style.display = "block";
    document.getElementById("backdetailsbtn").style.display = "none";
    document.getElementById("editbtn").style.display = "block";
    document.getElementById("vendordtls").style.display = "block";
    document.getElementById("modelfooter").style.display = "none";
    document.getElementById("container-fluid").style.display = "none";
  }

  setdata(data: any) {
    this.alertConfigId = data.param1
    this.customerId = data.param2;
    this.customerName = data.param10;
    this.alertType = data.param14;
    let alertsArray = data.param9;
    this.alerts = alertsArray.split(",")
    this.alertidList = data.param6.split(',')
    this.alertsIdArray = "," + data.param6 + ","
    let emailArray = data.param4;
    this.emailList = emailArray.split(",")
    let phoneArray = data.param3;
    this.phoneList = phoneArray.split(",")
    this.notificationStatus = data.param5;
    this.overspeedCount = data.param8;
    this.scheduleTime = data.param15
  }

  pushEntryEdit() {
    if (this.alertrectype == "SMS") {
      if (this.mobileEdit == '' || this.mobileEdit == null || this.mobileEdit.length < 10) {
        this.submitted = true;
        $('#mobiletoedit').focus();
      }
      else {
        this.submitted = false;
        this.phoneList.push(this.mobileEdit)
        this.mobileEdit = '';
        $('#mobiletoedit').focus();
      }
    }

    else if (this.alertrectype == "Email") {
      if (this.emailEdit == '' || this.emailEdit == null || this.emailEdit.includes('@') == false) {
        this.submitted = true;
        $('#emailtoedit').focus();
      }
      else {
        this.submitted = false; this.emailList.push(this.emailEdit);
        this.emailEdit = '';
        $('#emailtoedit').focus();

      }
    }
  }

  removeNumber(number: any) {
    let index = (this.phoneList.indexOf(number))
    this.phoneList.splice(index, 1)
  }

  removeEmail(email) {
    let index = (this.emailList.indexOf(email))
    this.emailList.splice(index, 1)
  }

  getObj(data) {
    // alert(JSON.stringify(data))
    if (((document.getElementById("check" + data.rowNumber) as HTMLInputElement).checked) == true) {
      this.alertidList.push(data.param5)
    }
    else if (((document.getElementById("check" + data.rowNumber) as HTMLInputElement).checked) == false) {
      let index = this.alertidList.indexOf(data.param5)
      this.alertidList.splice(index, 1)
    }

  }

  UpdateAlertConfig() {

    let dataL = {
      param1: '',                                                        //"remarks",
      param2: this.customerId,                                           //"customerid",
      param3: this.phoneList.toString(),                                 //"[mobilenolist]",
      param4: this.emailList.toString(),                                 //"[emailidlist]",
      param5: this.notificationStatus,                                   //"isnotification",
      param6: this.alertidList.toString(),                                    // "[alertid]",
      param7: this.alertType,                                            // "alerttype --> Live/History",
      param8: this.scheduleTime,                                         //"scheduled time",
      param9: this.stoppageValue,                                        // "stoppagevalue",
      param10: this.overspeedCount,                                      //"overspeedvalue",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.alertconfigurationService.updateAlertConfigure(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.responseMessage = "Data Updated Successfully";
        $("#updateSuccessModal").modal('show');
      }
      else {
        this.responseMessage = "Error In Updating Data";
        $("#updateErrorModal").modal('show');

      }

    })

  }

  deleteAlertConfig() {
    if (this.remark == '' || this.remark == null) {
      $('#msg_error_delete').html('Please Enter Remark').show();
      $('#deleteremark').focus();
      setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 2000);
    }
    else {


      let dataL = {
        "param1": this.remark,
        "param2": this.alertConfigId
      }
      this.alertconfigurationService.deleteAlertConfigure(dataL).subscribe((response) => {
        this.responseMessage = response.entity;
        if (response.statuscode == 200) {
          //  this.responseMessage = "Data Deleted Successfully";
          this.AlertConfigureDetails();
          this.cleardelete();
          this.closemodal();
          $("#updateSuccessModal").modal('show');
        }
        else {
          //  this.responseMessage = "Error In Deleting Data";
          $("#updateErrorModal").modal('show');

        }
      })
    }
  }

  cleardelete() {
    this.remark = "";
  }


  closemodal() {
    $("#updateSuccessModal").modal('hide');
    $('#modeldelete').modal('hide');
    $('#myModalwizard').modal('hide');
    $('.modal-backdrop.show').css('display', 'none');
  }
}