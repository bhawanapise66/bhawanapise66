import { ListService } from './../../../../../list.service';
import { CryptService } from './../../services/crypt.service';
import { AlertConfigurationModelService } from './../../../../APIService/alert-configuration-model.service';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

declare var AddLoader: any;
declare var RemoveLoader: any;


declare var $: any;

@Component({
  selector: 'app-historyalert',
  templateUrl: './historyalert.component.html',
  styleUrls: ['./historyalert.component.css']
})
export class HistoryalertComponent implements OnInit {

  @Output()
  showDetails = new EventEmitter();



  encryptedpageNameValue: any; encryptedpageUrlValue: any;
  SelectedCustomerforHistory: any;
  alertRecieveType: string = 'Email';
  pageUrl = this.router.url
  customerListforHistory: any;
  mobileNumber: string; emailid: string; notification: boolean = false; stoppageCount: any = ''; overSpeedCount: any = '';

  phoneList = []; emailList = []; alertIdList: any[];

  historyAlertList: any;
  submitted: boolean = false;
  showInputFIeld: boolean = false;
  responseMessage: any;

  config = {
    displayKey: "param2",
    search: true,
    limitTo: 1000,
    height: "200px"
  };
  scheduledTime: any;
  historyresponseMessage: string;
  constructor(private alertconfigurationService: AlertConfigurationModelService, private router: Router, private cryptService: CryptService,
    private listService: ListService) {
    this.EncryptPageName();
    this.EncryptPageUrl();
  }

  ngOnInit() {
    $('.timepicker').timepicki();

    this.Customerlist();
    this.HistoryAlertTypeDetails();
  }
  EncryptPageName() {
    this.cryptService.encrypt("History Alert Configuration")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;

  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }

  Customerlist() {
    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.CustomerListAPI(keydata).subscribe((data) => {
      this.customerListforHistory = data.entity.list;
    });
  }

  HistoryAlertTypeDetails() {
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
    this.alertconfigurationService.historyAlertTypeDetails(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.historyAlertList = data.entity.list;
    });
  }


  pushEntries() {
    if (this.alertRecieveType == "SMS") {
      if (this.mobileNumber == '' || this.mobileNumber == null || this.mobileNumber.length < 10) {
        this.submitted = true;
        $('#mobileno').focus();

      }
      else {
        this.submitted = false;
        this.phoneList.push(this.mobileNumber)
        this.mobileNumber = '';
        $('#mobileno').focus();

      }
    }
    else if (this.alertRecieveType == "Email") {
      if (this.emailid == '' || this.emailid == null || this.emailid.includes('@') == false) {
        this.submitted = true; $('#emailad').focus();
      }
      else {
        this.submitted = false; this.emailList.push(this.emailid);
        this.emailid = ''; $('#emailad').focus();

      }
    }
    else if (this.alertRecieveType == "Notification") {
      this.notification = false
    }
  }


  deleteEntries(value) {
    if (this.alertRecieveType == 'SMS') {
      this.phoneList.forEach((element, index) => {
        if (element == value) this.phoneList.splice(index, 1);
      });
    }

    else if (this.alertRecieveType == 'Email') {
      this.emailList.forEach((element, index) => {
        if (element == value) this.emailList.splice(index, 1);
      });
    }


  }

  useInput(data) {
    console.log(data);
    if (data.param2.includes("Over") == true) {
      this.showInputFIeld = true
    }
    else if (data.param2.includes("Stop") == true) {
      this.showInputFIeld = true
    }
  }

  insertHistoryAlert() {

    this.scheduledTime = (document.getElementById("scheduleTime") as HTMLInputElement).value;

    this.alertIdList = [];
    for (let i = 0; i < this.historyAlertList.length; i++) {
      if ((document.getElementById("checkedforhistory" + (i + 1)) as HTMLInputElement).checked == true) {
        this.alertIdList.push(this.historyAlertList[i]['param1'])
      }
    }


    if (this.SelectedCustomerforHistory == null || this.SelectedCustomerforHistory == '' || this.SelectedCustomerforHistory == undefined) {
      $('#msg_historycustomerEmpty').html('Please Select Customers').show();
      $('#historyCustomer').focus();
      setTimeout(function () { document.getElementById("msg_historycustomerEmpty").style.display = "none"; }, 3000);

    }

    else if (this.emailList.length == 0) {
      $('#msg_DataEmptyHistory').html('Please Enter Email').show();
      $('#alerttyp').focus();
      setTimeout(function () { document.getElementById("msg_DataEmptyHistory").style.display = "none"; }, 2000);
    }
    else if (this.alertIdList.length == 0) {
      $('#msg_AlertSelectHistory').html('Please Select Alert Type').show();
      setTimeout(function () { document.getElementById("msg_AlertSelectHistory").style.display = "none"; }, 2000);
    }

    else {
      let dataL = {
        param1: '',
        param2: this.SelectedCustomerforHistory.param1,
        param3: this.phoneList.toString(),
        param4: this.emailList.toString(),
        param5: this.notification,
        param6: this.alertIdList.toString(),
        param7: 'History',
        param8: this.scheduledTime,
        param9: this.stoppageCount,
        param10: this.overSpeedCount,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      this.alertconfigurationService.insertalertconfigure(dataL).subscribe((response) => {
        if (response.statuscode == 200) {
          this.historyresponseMessage = "Alert Saved Successfully";
          $("#historyinsertSuccessModal").modal('show');
          this.clear();
          this.showDetails.emit()
        }
        else {
          this.historyresponseMessage = "Error in saving Alert";
          $("#historyErrorModal").modal('show');
        }
      })

    }

  }

  clear()
{
this.SelectedCustomerforHistory.param1 ="";
this.phoneList.length = 0;
this.emailList.length = 0;
this.notification = false;
this.scheduledTime = "";
this.stoppageCount = "";
this.overSpeedCount = "";
this.alertIdList.length = 0;
for (let i = 0; i < this.historyAlertList.length; i++) {
  (document.getElementById("checkedforhistory" + (i + 1)) as HTMLInputElement).checked = false;
  }

 
}
}
