import { AlertConfigDetailsComponent } from './../alert-config-details/alert-config-details.component';
import { Router } from '@angular/router';
import { AlertConfigurationModelService } from './../../../../APIService/alert-configuration-model.service';
import { ListService } from './../../../../../list.service';
import { Component, Input, OnInit, Output, EventEmitter, ViewChildren } from '@angular/core';
import { CryptService } from '../../services/crypt.service';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';

declare var AddLoader: any;
declare var RemoveLoader: any;

declare var $: any;


@Component({
  selector: 'app-livealert',
  templateUrl: './livealert.component.html',
  styleUrls: ['./livealert.component.css']
})
export class LivealertComponent implements OnInit {
  @ViewChildren("app-alert-config-details")
  children: AlertConfigDetailsComponent[];

  @Output()
  showDetails = new EventEmitter();

  config = {
    displayKey: "param2",
    search: true,
    limitTo: 1000,
    height: "200px"
  };
  encryptedpageNameValue: any; encryptedpageUrlValue: any;
  pageUrl = this.router.url
  customerList: any[] = [];
  alertRecieveType: string = 'SMS';
  mobileNumber: string; emailid: string; notification: boolean = false; stoppageCount: any = ''; overSpeedCount: any = '';
  scheduledTime: any; SelectedCustomer: any
  phoneList = []; emailList = []; alertIdList: any[];

  liveAlertList: any;
  submitted: boolean = false;
  showInputFIeld: boolean = false;
  responseMessage: any;
  notificationStatus: string;

  constructor(private listService: ListService,
    private cryptService: CryptService, private router: Router, private alertconfigurationService: AlertConfigurationModelService) {
    this.EncryptPageName();
    this.EncryptPageUrl();
  }

  ngOnInit() {
    this.Customerlist();
    this.AlertTypeDetails();
    var today = new Date();
    this.scheduledTime = today.getHours() + ':' + today.getMinutes();
  }

  EncryptPageName() {
    this.cryptService.encrypt("Live Alert Configuration")
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
      this.customerList = data.entity.list;
    });
  }

  AlertTypeDetails() {
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
    this.alertconfigurationService.alertTypeDetails(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.liveAlertList = data.entity.list;
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
        this.submitted = true;
        $('#emailad').focus();
      }
      else {
        this.submitted = false
        this.emailList.push(this.emailid)
        this.emailid = '';
        $('#emailad').focus();

      }
    }
    else if (this.alertRecieveType == "Notification") {
      this.notification = false
    }
  }

  changenotificationStatus(e) {

    console.log(e.target.value)
    if (e.target.value == true) {
      this.notificationStatus = "YES";

    }
    else {
      this.notificationStatus = "NO";
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

  insertLiveAlert() {

    this.alertIdList = [];
    for (let i = 0; i < this.liveAlertList.length; i++) {
      if ((document.getElementById("checked" + (i + 1)) as HTMLInputElement).checked == true) {
        this.alertIdList.push(this.liveAlertList[i]['param1'])
      }
    }

    if (this.SelectedCustomer == null || this.SelectedCustomer == '' || this.SelectedCustomer == undefined) {
      $('#msg_customerEmpty').html('Please Select Customers').show();
      $('#customers').focus();
      setTimeout(function () { document.getElementById("msg_customerEmpty").style.display = "none"; }, 3000);

    }
    else if (this.phoneList.length == 0) {
      $('#msg_DataEmpty').html('Please Enter Mobile Number').show();
      $('#recievetype').focus();
      setTimeout(function () { document.getElementById("msg_DataEmpty").style.display = "none"; }, 2000);
    }
    else if (this.emailList.length == 0) {
      $('#msg_DataEmpty').html('Please Enter Email').show();
      $('#recievetype').focus();
      setTimeout(function () { document.getElementById("msg_DataEmpty").style.display = "none"; }, 2000);
    }
    else if (this.alertIdList.length == 0) {
      $('#msg_AlertSelect').html('Please Select Alert Type').show();
      setTimeout(function () { document.getElementById("msg_AlertSelect").style.display = "none"; }, 2000);

    }
    else if (this.flagnum1 == 1 && this.overSpeedCount == '') {
      $('#msg_AlertSelect').html('Please Enter Overspeed Count').show();
      setTimeout(function () { document.getElementById("msg_AlertSelect").style.display = "none"; }, 2000);

    }
    else {
      let dataL = {
        param1: '',
        param2: this.SelectedCustomer.param1,
        param3: this.phoneList.toString(),
        param4: this.emailList.toString(),
        param5: this.notification,
        param6: this.alertIdList.toString(),
        param7: 'Live',
        param8: this.scheduledTime,
        param9: this.stoppageCount,
        param10: this.overSpeedCount,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      this.alertconfigurationService.insertalertconfigure(dataL).subscribe((response) => {
        if (response.statuscode == 200) {
          this.responseMessage = "Alert Saved Successfully";
          this.clear();
          $("#insertSuccessModal").modal('show');
         }
        else {
          this.responseMessage = "Error in saving Alert";
          $("#ErrorModal").modal('show');
        }
      })
    }
  }

flagnum1 : number =0;
  changeOverspeed(data)
  {
    // console.log(data);
    // console.log($("#checked"+data));
    if($("#checked"+data).prop("checked") == true){
     this.flagnum1 = 1;
 
      // if (this.overSpeedCount == '') 
      // {
      //      $('#msg_AlertSelect').html('Please Enter Overspeed Count').show();
      //      setTimeout(function () { document.getElementById("msg_AlertSelect").style.display = "none"; }, 2000);
      //    }
  }
  else if($("#checked"+data).prop("checked") == false){
    this.flagnum1 = 0;
 
  }
}

clear()
{
  this.SelectedCustomer.param1 ="";
this.phoneList.length = 0;
this.emailList.length = 0;
this.notification = false;
this.scheduledTime = "";
this.stoppageCount = "";
this.overSpeedCount = "";
this.alertIdList.length = 0;
this.alertIdList = [];
for (let i = 0; i < this.liveAlertList.length; i++) {
(document.getElementById("checked" + (i + 1)) as HTMLInputElement).checked = false;
}}

}
