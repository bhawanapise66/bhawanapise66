import { ReportService } from './../services/report.service';
import { Router } from '@angular/router';
import { CryptService } from './../services/crypt.service';
import { AlertConfigurationModelService } from './../../../APIService/alert-configuration-model.service';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;


export class flashModel {
  permission: string='';
  name: string='';
  mobile: string='';
  reason: string='';
  action: string='';
}

@Component({
  selector: 'app-flast-alert',
  templateUrl: './flast-alert.component.html',
  styleUrls: ['./flast-alert.component.css']
})
export class FlastAlertComponent implements OnInit {
  submitted = false;
  flashAlert = new flashModel();
  encryptedpageNameValue: any; encryptedpageUrlValue: any;
  pageUrl = this.router.url
  alertTable: any;
  alertdescName: any;
  alertdesecCount: any; alertViewCount: any; showDetails: boolean;
  responseMessage: any;

  formSubmitted = false;
  alertDetails: any; alertdesc: any; alertName: any; vehicleNo: any; from: any; duration: any; location: any;
  time: any;
  constructor(private alertService: AlertConfigurationModelService, private cryptService: CryptService, private router: Router, private reportService: ReportService) {
    this.EncryptPageName();
    this.EncryptPageUrl();
  }

  ngOnInit() {
    // this.FlashAlertDetails();
    //  this.time = setInterval(() => { this.FlashAlertDetails(); }, 10000);

  }


  EncryptPageName() {
    this.cryptService.encrypt("flast alert");
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl);
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }


  FlashAlertDetails() {

    let InputForAlert = {
      pageNo: "1",
      itemsPerPage: "1",
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      param1: "",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    if (document.getElementById("FlastAlertModal").style.display == "block") {

    }
    else {
      this.alertService.FlashAlertDetails(InputForAlert).subscribe((response) => {
        if (response.statuscode == 200) {
          if (response.responseEntityCount == "1") {
            this.showDetails = true;
            this.alertdesc = response.entity.list[0];
            this.alertName = this.alertdesc.param7;
            this.vehicleNo = this.alertdesc.param8;
            this.from = this.alertdesc.param4;
            this.duration = this.alertdesc.param21;
            this.viewLocation(this.alertdesc);

            this.alertdesecCount = response.entity.count;
            if (this.alertdesecCount == 1) {
              $("#FlastAlertModal").modal('show');

              this.flashAlert.permission = '';
              this.flashAlert.name = '';
              this.flashAlert.mobile = '';
              this.flashAlert.reason = '';
              this.flashAlert.action = '';
            }
            else { }
          }
          else { }
        }
        else {

        }
      })
    }

  }

  viewLocation(data) {
    let dataL = {
      param1: data.param6,
      param2: data.param5,
      "pageID": "1",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.reportService.getlocation(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        let locationArray = response.entity.list[0];

        this.location = locationArray.param1;
      }
    })
  }

  SubmitAlertForm() {
    if (this.flashAlert.action == '' || this.flashAlert.mobile == '' || this.flashAlert.name == '' || this.flashAlert.permission == '' || this.flashAlert.reason == '') {
      this.submitted = true;
    }
    else {
      this.submitted = false;
      this.formSubmitted = true
      this.InsertAlertResoled();
    }

  }

  InsertAlertResoled() {
    let dataL = {
      param1: "",//"remarks",
      param2: this.alertdesc.param1,//"alertid",
      param3: this.alertdesc.param3,//"imeino",
      param4: this.alertdesc.param5,//"latitude",
      param5: this.alertdesc.param6,//"longitude",
      param6: this.alertdesc.param4,//"alerttime",
      param7: this.flashAlert.action,//"actiontaken",
      param8: this.flashAlert.reason,//"reason",
      param9: this.flashAlert.mobile,//"mobilenumber",
      param10: this.alertdesc.param15,// "vehicleid",
      param11: this.flashAlert.name,//"name",
      param12: this.flashAlert.permission
    }
    this.alertService.InsertAlertResolved(dataL).subscribe((response) => {
      this.formSubmitted = false;
      if (response.statuscode == 200) {
        $("#FlastAlertModal").modal("hide");
        $("#AlertSuccessModal").modal("show");

        // console.log(response);
      }
      else {
        $("#AlertErrorModal").modal("show");

        // console.log(response)
      }
    })
  }
}