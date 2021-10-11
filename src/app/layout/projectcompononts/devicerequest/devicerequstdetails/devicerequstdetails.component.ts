import { ListService } from './../../../../../list.service';
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

import { DevicerequestService } from '../../services/devicerequest.service';

import * as $ from 'jquery';
import * as moment from 'moment';
import { ThemeService } from 'ng2-charts';
import { PdfService } from '../../services/pdf.service';

//import * as $ from 'jquery';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
declare var SuccessAlert: any;
declare var errorAlert: any;
@Component({
  selector: 'app-devicerequstdetails',
  templateUrl: './devicerequstdetails.component.html',
  styleUrls: ['./devicerequstdetails.component.css']
})
export class DevicerequstdetailsComponent implements OnInit {
  isCustomer: boolean;
  selectcustomerentry: any; selectdevicetypeentry: any; deviceqtyTextentry: string;
  deviceidspan: string; selectrequesttypeentry: any; selectrequesttypereturn: string; roleid: string;
  encryptedpageNameValue: string; encryptedpageUrlValue: string; pageUrl = this.router.url;
  public edited = false;

  stringifiedData: any; parsedJson: any; stringifiedresponse: any; parsedJsonresponse: any;
  stringifiedDataList: any; parsedJsonList: any; datafromrespo: string; deleteText: string;

  devicereqdetail: any; devicedetdata: any = []; globalPDF$: any;
  key: string = 'name'; reverse: boolean = true; count: number;
  pageNumber: number = 1; itemsPerPage: number = 10; nop: number; totalCount: number; viewCount: number; filter: any;
  selectRowsText: string = "10"; excelData: any = []; list = [];

  private _success = new Subject<string>(); staticAlertClosed = false; successMessage: string;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };

  config2 = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };

  options = [{ param2: "Urgent", }, { param2: "Normal", }];
  requestId: string; userKey: any;
  devicetypeApproval: any;
  quantityApproval: any;
  maximum: any;
  vendorlist: any;
  vendorid: string = null;
  approvalModel: any;
  devicelistforApproval: any[];
  selectedDeviceList: any[] = [];
  formValid: boolean = false;

  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService, private cryptService: CryptService, private router: Router, private devreqService: DevicerequestService
    , public excelservice: ExportToExcelService, public pdfservice: PdfService, private listservice: ListService) {

    this.EncryptPageName(); this.EncryptPageUrl();
  }
  flagg: number = 0;
  ngOnInit() {
    this.userKey = sessionStorage.getItem('rid')
    if (this.userKey == '10' || this.userKey == '11' || this.userKey == '16' || this.userKey == '21') {
      this.isCustomer = false; this.Customerlist(); this.flagg = 1;
    }
    if (this.userKey == '14' || this.userKey == '18') {
      this.isCustomer = true;
      this.selectcustomerreturn = 0;
    }

    try {
      $('#customerentry2').focus();


      this.list = [{ id: 1, display: 'Urgent' }, { id: 2, display: 'Normal' }];

      this.DeviceTypelist();
      this.DeviceRequestDetail();
      this.dataPDFexport();


      $('#alertmsg').hide(); $('#saveentry').show(); $('#updateentry').hide();

      setTimeout(() => this.staticAlertClosed = true, 20000);

      this._success.subscribe((message) => this.successMessage = message);

      this._success.pipe(
        debounceTime(8000)
      ).subscribe(() => this.successMessage = null);



    } catch (e) { }

  }


  EncryptPageName() {
    this.encryptedpageNameValue = this.cryptService.encrypt("Device Request Entry")
  }
  EncryptPageUrl() {
    this.encryptedpageUrlValue = this.cryptService.encrypt(this.pageUrl)
  }

  // data display from this list
  dataPDFexport() {

    this.globalPDF$ = null;

    let keydata = {
      pageNo: "",
      itemsPerPage: "",
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try {
      this.devreqService.DeviceRequestDetailsAPI(keydata).subscribe((data) => {
        this.globalPDF$ = data.entity.list;
        this.PrepareExcelData(this.globalPDF$);
      })

    } catch (e) { }

  }
  DeviceRequestDetail() {
    let keydata = {
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.devreqService.DeviceRequestDetailsAPI(keydata).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      if (response.responseEntityCount == '0') {

        this.devicereqdetail = []; this.viewCount = 0; this.totalCount = 0;
      }
      else {
        this.devicereqdetail = response.entity.list;
        this.viewCount = response.entity.viewCount;
        this.totalCount = response.entity.count;
      }


    });
  }

  searchdata() {
    this.pageNumber = 1;
    this.DeviceRequestDetail();
  }


  RefreshDeviceDetail() {
    this.itemsPerPage = 10;
    this.filter = ''
    this.pageNumber = 1;
    this.clearfunction();
    this.DeviceRequestDetail();
  }

  RowsBindChanged() {
    this.pageNumber = 1;
    this.DeviceRequestDetail();
  }

  pageChanged(event) {
    this.pageNumber = event;
    this.DeviceRequestDetail();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  createPDF() {
    let pdfTableData;
    let dataArray = []
    if (this.flagg == 1) {
      for (let i = 0; i < this.globalPDF$.length; i++) {
        pdfTableData = {
          "#": i + 1,
          "Customer Name": this.globalPDF$[i]["param14"],
          "Device Type": this.globalPDF$[i]["param2"],
          "Quantity": this.globalPDF$[i]["param3"],
          "Request Type": this.globalPDF$[i]["param4"],
          "Request Date": this.globalPDF$[i]["param10"],
          "Request Status": this.globalPDF$[i]["param9"]
        }
        dataArray.push(pdfTableData)
      };
    }
    else {
      for (let i = 0; i < this.globalPDF$.length; i++) {
        pdfTableData = {
          "#": i + 1,
          "Device Type": this.globalPDF$[i]["param2"],
          "Quantity": this.globalPDF$[i]["param3"],
          "Request Type": this.globalPDF$[i]["param4"],
          "Request Date": this.globalPDF$[i]["param10"],
          "Request Status": this.globalPDF$[i]["param9"]
        }
        dataArray.push(pdfTableData)
      };
    }

    this.pdfservice.CreatePDFData(dataArray, "Device Request Details");
  }

  // data display purpose till here



  // data entry edit and delet from here

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

  ListOfDeviceType = []; devicetype: string;
  DeviceTypelist() {

    try {
      let keydata = {
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }

      //try{AddLoader()}catch(e){alert(e)}
      this.devreqService.DeviceTypeListAPI(keydata).subscribe(
        (data) => {
          //try{RemoveLoader()}catch(e){alert(e)}
          this.ListOfDeviceType = data.entity.list;

        });
    } catch (e) { }
  }


  getCustomerId() {
    this.selectcustomerreturn = this.selectcustomerentry.param1;
  }

  selectdevicetypedummy() {
    // this.selectdevicetypereturn = this.check(this.selectdevicetypeentry);
    this.selectdevicetypereturn = this.selectdevicetypeentry.param1;
    this.devicetypeupdate = this.selectdevicetypereturn.param2;
  }

  getReqTypeId() {
    this.reqtyp = this.selectrequesttypeentry.param2;
  }
  reqtyp: string;

  getidreq() {
    try { this.reqtypupdate = this.selectrequesttypeentry.param2; }
    catch (e) { }

  }


  ADDRecord() {

    if (this.isCustomer == true) {

      // // Validate Section
      // if (this.selectcustomerentry == '') {
      //   this._success.next(`Please Select Section.`);
      //   $('#alertmsg').show(); $('#customerentry').focus();
      //   return false;
      // }
      // else if (this.selectdevicetypeentry == '') {
      //   this._success.next(`Please Select Device Type.`);
      //   $('#devicetypeentry').focus(); $('#alertmsg').show();
      //   return false;
      // }
      // else if (this.deviceqtyTextentry == '') {
      //   this._success.next(`Please Enter Device Quantity.`);
      //   $('#deviceqtyidentry').focus(); $('#alertmsg').show();
      //   return false;
      // }
      // else if (this.selectrequesttypeentry == '') {
      //   this._success.next(`Please Select Device Type.`);
      //   $('#requesttypeentry').focus(); $('#alertmsg').show();
      //   return false;
      if (this.selectdevicetypereturn == '' || this.selectdevicetypereturn == null) {
        $("#err_devicetype1").css("display", "block");
        $('#err_devicetype1').html('Please Select Device Type');
        $('#devicetypeentry').focus();
        setTimeout(function () { document.getElementById("err_devicetype1").style.display = "none"; }, 3000);
      }
      else if (this.deviceqtyTextentry == null || this.deviceqtyTextentry == '') {
        $("#err_quantity1").css("display", "block");
        $('#err_quantity1').html('Please Enter Quantity');
        $('#deviceqtyidentry').focus();
        setTimeout(function () { document.getElementById("err_quantity1").style.display = "none"; }, 3000);
      }
      else if (this.reqtyp == null || this.reqtyp == '') {
        $("#err_reqtype1").css("display", "block");
        $('#err_reqtype1').html('Please Enter Quantity');
        $('#requesttypeentry').focus();
        setTimeout(function () { document.getElementById("err_reqtype1").style.display = "none"; }, 3000);
      }
      else {

        $('#saveentry').show(); $('#updateentry').hide();
        //selectcustomerentry:string; selectdevicetypeentry:string; deviceqtyTextentry
        // this.selectcustomer = this.selectcustomerentry.param1;
        // this.devicetype = this.selectdevicetypeentry.param1;
        // this.reqtyp = this.selectrequesttypeentry.param2;

        try {

          let dataL = {

            param1: "ok",         //remark
            param2: this.selectdevicetypereturn,                            //devicetypeid
            param3: this.deviceqtyTextentry,         //device quantity
            param4: this.reqtyp,           //request type
            param5: "0",           //customer id
            pageID: "3",
            pageName: this.encryptedpageNameValue,
            pageURL: this.encryptedpageUrlValue

          }
          try { AddLoader() } catch (e) { }
          this.devreqService.DeviceRequestInsertAPI(dataL).subscribe((data) => {
            try { RemoveLoader() } catch (e) { }
            this.datafromrespo = data.entity;
            var msg = this.datafromrespo;
            if (data.statuscode == 200) {
              SuccessAlert(msg);

              this.clearfunction();
              this.DeviceRequestDetail();

            }
            else {
              errorAlert(msg);

              //    $("#ErrorModal").modal('show');
              //  this.clearfunction();
            }

            // if (this.datafromrespo == 'Successfully Saved.') {
            //   $("#SuccessModal").modal('show');
            //   this.clearfunction();
            // }
            // else {
            //   $("#ErrorModal").modal('show');

            // }



          }, err => {

          });

        } catch (e) { }
      }
    }


    else if (this.isCustomer == false) {

      // Validate Section
      // if (this.selectdevicetypeentry == '') {
      //   this._success.next(`Please Select Device Type.`);
      //   $('#devicetypeentry').focus();
      //    $('#alertmsg').show();
      //   return false;
      // }
      // else if (this.deviceqtyTextentry == '') {
      //   this._success.next(`Please Enter Device Quantity.`);
      //   $('#deviceqtyidentry').focus(); $('#alertmsg').show();
      //   return false;
      // }
      // else if (this.selectrequesttypeentry == '') {
      //   this._success.next(`Please Select Device Type.`);
      //   $('#requesttypeentry').focus(); $('#alertmsg').show();
      //   return false;
      // }

      if (this.flagg == 1 && (this.selectcustomerreturn == '' || this.selectcustomerreturn == null)) {
        $("#err_customer1").css("display", "block");

        $('#err_customer1').html('Please Select Customer');
        $('#customerentry2').focus();
        setTimeout(function () { document.getElementById("err_customer1").style.display = "none"; }, 3000);
      }
      else if (this.selectdevicetypereturn == '' || this.selectdevicetypereturn == null) {
        $("#err_devicetype1").css("display", "block");

        $('#err_devicetype1').html('Please Select Device Type');
        $('#devicetypeentry').focus();
        setTimeout(function () { document.getElementById("err_devicetype1").style.display = "none"; }, 3000);
      }
      else if (this.deviceqtyTextentry == null || this.deviceqtyTextentry == '') {
        $("#err_quantity1").css("display", "block");

        $('#err_quantity1').html('Please Enter Quantity');
        $('#deviceqtyidentry').focus();
        setTimeout(function () { document.getElementById("err_quantity1").style.display = "none"; }, 3000);
      }
      else if (this.reqtyp == null || this.reqtyp == '') {
        $("#err_reqtype1").css("display", "block");

        $('#err_reqtype1').html('Please Enter Quantity');
        $('#requesttypeentry').focus();
        setTimeout(function () { document.getElementById("err_reqtype1").style.display = "none"; }, 3000);
      }
      else {

        $('#saveentry').show(); $('#updateentry').hide();
        //selectcustomerentry:string; selectdevicetypeentry:string; deviceqtyTextentry
        //this.selectcustomer = this.selectcustomerentry.param1;  
        this.devicetype = this.selectdevicetypeentry.param1;
        this.reqtyp = this.selectrequesttypeentry.param2;
        try {

          let dataL = {
            param1: "ok",         //remark
            param2: this.devicetype,     //devicetypeid
            param3: this.deviceqtyTextentry,         //device quantity
            param4: this.reqtyp,           //request type
            param5: this.selectcustomerreturn,           //customer id
            pageID: "3",
            pageName: this.encryptedpageNameValue,
            pageURL: this.encryptedpageUrlValue

          }
          try { AddLoader() } catch (e) { }
          this.devreqService.DeviceRequestInsertAPI(dataL).subscribe((data) => {
            try { RemoveLoader() } catch (e) { }
            this.datafromrespo = data.entity;
            var msg = this.datafromrespo;
            if (data.statuscode == 200) {
              SuccessAlert(msg); this.clearfunction();
              this.DeviceRequestDetail();

            }
            else {
              errorAlert(msg);
              this.DeviceRequestDetail();
            }

          }, err => {

          });

        } catch (e) { }
      }
    }
  }
  sectionindex: any;

  Updatedata(devmang: Paramcls) {
    console.log(devmang)
    // console.log(devmang)
    // try {

    //   if (this.isCustomer == true) {
    //     $('#saveentry').hide(); $('#updateentry').show();

    //     this.deviceidspan = devmang.param1;
    //     this.selectdevicetypeentry = devmang.param2;
    //     this.deviceqtyTextentry = devmang.param3;
    //     this.selectrequesttypeentry = devmang.param4;
    //     //  this.selectcustomerentry = devmang.param14
    //     //  this.selectcustomerreturn = devmang.param14;
    //     this.selectdevicetypereturn = this.check(this.selectdevicetypeentry);
    //     // this.selectcustomerreturn = this.check(this.selectcustomerentry);
    //     this.reqtypupdate = this.selectrequesttypeentry;

    //   }
    //   else {
    $('#saveentry').hide(); $('#updateentry').show();
    //     this.selectcustomerentry = devmang.param14
    //     this.selectcustomerreturn = devmang.param14;

    //     this.deviceidspan = devmang.param1;
    //     this.selectdevicetypeentry = devmang.param2;
    //     this.deviceqtyTextentry = devmang.param3;
    //     this.selectrequesttypeentry = devmang.param4;

    //     this.selectdevicetypereturn = this.check(this.selectdevicetypeentry);

    //   }
    // } catch (e) { }
    this.requestId = devmang.param1;
    this.selectdevicetypeentry = devmang.param2;
    this.selectdevicetypereturn = devmang.param15;
    this.deviceqtyTextentry = devmang.param3;
    this.reqtyp = devmang.param4;
    this.selectcustomerreturn = devmang.param7;
    this.selectcustomerentry = devmang.param14;
    this.selectrequesttypeentry = devmang.param4;
  }

  reqtypupdate: any; reqesttypeupdate: any;
  UpdateRecord() {

    // if (this.userKey == "14" || this.userKey == "18")
    if (this.isCustomer == true) {
      $('#saveentry').hide(); $('#updateentry').show();
      $('#deviceqtyidentry').focus();
      if (this.selectdevicetypeentry == '') {
        // this._success.next(`Please Select Device Type.`);
        $('#err_devicetype1').html('Please Select Device Type.').show();
        $('#devicetypeentry').focus();
        setTimeout(function () { document.getElementById("err_devicetype1").style.display = "none"; }, 3000);

      }
      else {
        $('#deviceqtyidentry').focus();
        if (this.deviceqtyTextentry == '') {
          // this._success.next(`Please Enter Device Quantity.`);
          // $('#deviceqtyidentry').focus(); $('#alertmsg').show();
          // return false;
          $('#err_quantity1').html('Please Select Device Quantity').show();
          $('#deviceqtyidentry').focus();
          setTimeout(function () { document.getElementById("err_quantity1").style.display = "none"; }, 3000);

        }
        else if (this.selectrequesttypeentry == '') {
          // this._success.next(`Please Select Device Type.`);
          // $('#requesttypeentry').focus(); $('#alertmsg').show();
          // return false;
          $('#err_reqtype1').html('Please Select Device Type').show();
          $('#requesttypeentry').focus();
          setTimeout(function () { document.getElementById("err_reqtype1").style.display = "none"; }, 3000);

        }
        else {

          try {

            let dataL = {
              param1: "Remark",
              'param2': this.selectdevicetypereturn,//'devicetypeid(encrypted)', 
              param3: this.deviceqtyTextentry,
              param4: this.reqtyp,// 'requesttype', 
              param5: "0",
              param6: this.requestId,// 'requestid(encrypted)',
              pageID: "3",
              pageName: this.encryptedpageNameValue,
              pageURL: this.encryptedpageUrlValue

            }

            this.devreqService.DeviceRequestUpdateAPI(dataL).subscribe((data) => {
              let resdata = data;
              this.datafromrespo = data.entity;
              var msg = this.datafromrespo;
              if (data.statuscode == 200) {
                SuccessAlert(msg); this.clearfunction();

                this.DeviceRequestDetail();
                $('#saveentry').show(); $('#updateentry').hide();


              }
              else {
                errorAlert(msg);
                //  $("#ErrorModal").modal('show');
              }
              // if (this.datafromrespo == 'Successfully saved.') {
              //   $("#SuccessModal").modal('show'); this.DeviceRequestDetail(); this.clearfunction();
              // }
              // else {
              //   $("#ErrorModal").modal('show');
              // }


            }, err => {

            });

          } catch (e) { }
        }
      }
    }
    // else {
    else if (this.isCustomer == false) {
      var devtype = this.getid(this.ListOfDeviceType, this.selectdevicetypeentry);
      var customer = this.getid(this.ListOfCustomer, this.selectcustomerentry);

      $('#saveentry').hide(); $('#updateentry').show();
      $('#deviceqtyidentry').focus();
      // Validate Section
      if (this.selectcustomerentry == '') {
        // this._success.next(`Please Select Customer.`);
        // $('#alertmsg').show(); $('#customerentry').focus();
        // return false;
        $('#err_customer1').html('Please Select Customer.').show();
        $('#customerentry2').focus();
        setTimeout(function () { document.getElementById("err_customer1").style.display = "none"; }, 3000);

      }
      else
        //  if (this.selectdevicetypeentry == '') {
        //   this._success.next(`Please Select Device Type.`);
        //   $('#devicetypeentry').focus(); $('#alertmsg').show();
        //   return false;
        // }
        // else if (this.deviceqtyTextentry == '') {
        //   this._success.next(`Please Enter Device Quantity.`);
        //   $('#deviceqtyidentry').focus(); $('#alertmsg').show();
        //   return false;
        // }
        // else if (this.selectrequesttypeentry == '') {
        //   this._success.next(`Please Select Device Type.`);
        //   $('#requesttypeentry').focus(); $('#alertmsg').show();
        //   return false;
        // }
        if (this.selectdevicetypeentry == '') {
          $('#err_devicetype1').html('Please Select Device Type.').show();
          $('#devicetypeentry').focus();
          setTimeout(function () { document.getElementById("err_devicetype1").style.display = "none"; }, 3000);

        }
        else if (this.deviceqtyTextentry == '') {
          $('#err_quantity1').html('Please Select Device Quantity').show();
          $('#deviceqtyidentry').focus();
          setTimeout(function () { document.getElementById("err_quantity1").style.display = "none"; }, 3000);

        }
        else if (this.selectrequesttypeentry == '') {
          $('#err_reqtype1').html('Please Select Device Type').show();
          $('#requesttypeentry').focus();
          setTimeout(function () { document.getElementById("err_reqtype1").style.display = "none"; }, 3000);

        }
        else {
          try {

            let dataL = {
              'param1': 'remark',
              'param2': this.selectdevicetypereturn,//'devicetypeid(encrypted)', 
              'param3': this.deviceqtyTextentry,// 'device Quantity',
              'param4': this.reqtyp,// 'requesttype', 
              'param5': this.selectcustomerreturn,//'customerid(input)(encrypted)', 
              'param6': this.requestId,// 'requestid(encrypted)',
              'pageID': '345',// 'page id',
              'pageName': this.encryptedpageNameValue,
              'pageURL': this.encryptedpageUrlValue
            }

            this.devreqService.DeviceRequestUpdateAPI(dataL).subscribe((data) => {
              this.datafromrespo = data.entity;
              var msg = this.datafromrespo;

              if (data.statuscode == 200) {
                SuccessAlert(msg); this.clearfunction();
                //    $("#SuccessModal").modal('show');
                this.DeviceRequestDetail();
                $('#alertmsg').hide(); $('#saveentry').show(); $('#updateentry').hide();



              }
              else {
                errorAlert(msg);
                // $("#ErrorModal").modal('show');
              }


            }, err => {

            });

          } catch (e) { }
        }
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


  dataexportexcel() {

    let keydata = {
      pageNo: "",
      itemsPerPage: "",
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    //  try{AddLoader()}catch(e){}         
    try {
      this.devreqService.DeviceRequestDetailsAPI(keydata).subscribe((data) => {
        // Below code for all checkbox select.
        let resdata = data;
        //  try{RemoveLoader()}catch(e){}  
        let resdatadrp = resdata['entity'];
        // Convert to JSON  
        this.stringifiedData = JSON.stringify(resdatadrp);
        // Parse from JSON  
        this.parsedJson = JSON.parse(this.stringifiedData);
        let resdatadev = resdata['list'];
        // Convert to JSON  
        this.stringifiedDataList = JSON.stringify(this.parsedJson.list);
        // Parse from JSON  
        this.devicedetdata = JSON.parse(this.stringifiedDataList);
        //this.PrepareExcelData(this.devicedetdata);
      })

    } catch (e) { }

  }

  PrepareExcelData(data) {
    this.excelData = [];
    if (this.flagg == 1) {
      for (var i = 0; i < data.length; i++) {
        try {
          var obj = {

            "#": i + 1,
            "Customer Name": data[i].param14,
            "Device Type": data[i].param2,
            "Quantity": data[i].param3,
            "Request Type": data[i].param4,
            "Request Date": data[i].param10,
            "Request Status": data[i].param9,
          }
        } catch (e) { }
        this.excelData.push(obj);
      }
    }
    else {
      for (var i = 0; i < data.length; i++) {
        try {
          var obj1 = {

            "#": i + 1,
            "Device Type": data[i].param2,
            "Quantity": data[i].param3,
            "Request Type": data[i].param4,
            "Request Date": data[i].param10,
            "Request Status": data[i].param9,
          }
        } catch (e) { }
        this.excelData.push(obj1);
      }
    }

  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'DeviceRequestDetails', 'DeviceRequestDetails');
  }

  clearfunction() {
    this.selectrequesttypeentry = "";
    this.selectdevicetypeentry = "";
    this.selectcustomerreturn = "";
    this.deviceqtyTextentry = ""; this.selectcustomerentry = "";
    this.selectdevicetypeentry = ""; this.deviceqtyTextentry = ""; this.selectrequesttypeentry = "";
    this.selectcustomerentry = ""; this.selectcustomerreturn = "";
    ; this.reqtyp = ""; this.selectdevicetypereturn = ""; this.devicetypeupdate = "";
  }

  Deletefunction() {
    var isValid = true;
    var deleteremark = $('#deleteremark').val();
    // Validate Contact Name
    if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      // $('#msg_error_delete').html('Please Enter Remark').show();
      $('#msg_error_delete').html('Please Enter Remark').show();
      $('#deleteremark').focus();
      setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        param1: this.deleteText,
        param2: this.deviceidspan,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }
      try { AddLoader() } catch (e) { alert(e) }

      this.devreqService.DeviceRequestDeleteAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.datafromrespo = data.entity;
        var msg = this.datafromrespo;
        if (data.statuscode == 200) {
          // $("#SuccessModal").modal('show');
          $("#modeldelete").modal('hide');
          $('.modal-backdrop.show').css('display', 'none');
          SuccessAlert(msg);
          this.deleteText = "";
          this.DeviceRequestDetail();



          $('.modal-backdrop.show').css('display', 'none');

        }
        else {
          //   $("#ErrorModal").modal('show');
          this.deleteText = "";
          $("#modeldelete").modal('hide');
          $('.modal-backdrop.show').css('display', 'none');
          errorAlert(msg);
        }
      });

    }
  }

  closemodal() {

    this.deleteText = "";
    $('#modeldelete').modal('hide');


  }

  DeleteModal(devmang: Paramcls) {
    try {

      this.deviceidspan = devmang.param1;

    } catch (e) { }

  }

  selectdevicetypereturn: any = ''; devicetypeupdate: any;
  selectcustomerreturn: any = ''; customerupdate: any;

  // getCustomerId() {
  //   this.selectcustomerreturn = this.check(this.selectcustomerentry);
  //   this.customerupdate = this.selectcustomerreturn.param2;
  // }



  setforApproval(data: any) {
    this.selectedDeviceList = [];
    this.vendorid = null;
    this.approvalModel = data
    this.devicetypeApproval = data.param2;
    this.quantityApproval = data.param3;
    this.vendorList(data);
  }

  vendorList(data) {
    let dataL = {
      param1: "Device",
      // param2: approvalModel.param15
    }
    AddLoader()
    this.listservice.VendorListAPI(dataL).subscribe((response) => {
      RemoveLoader()
      this.vendorlist = response.entity
    })
  }

  DeviceList() {
    let dataL = {
      "param1": this.vendorid,//  "devicekaeid(input)",
      "param2": this.approvalModel.param15,// "devicetypeid(input)",
      "param3": "",// "devicemodelid(input)",
      "param4": "",// "vehicleid(input)",
    }
    AddLoader()
    this.listservice.DeviceList_vehicle_forupdate(dataL).subscribe((response) => {
      RemoveLoader()
      this.devicelistforApproval = response.entity.list;
    })
  }


  ApproveRequest() {
    if (this.vendorid==null || this.selectedDeviceList.length == 0 || this.selectedDeviceList==[]) {
      this.formValid = false
    }
    else {
      let dataL = {
        "param1": "remark",
        "param2": this.approvalModel.param1,
        "param3": this.quantityApproval,
        "deviceList": this.selectedDeviceList,
        "param5":'',// "customerid(input)"
      }
      this.devreqService.ApproveDeviceReq(dataL).subscribe((response) => {
        if (response.statuscode == 200) {
          SuccessAlert(response.entity);
        }
        else {
          errorAlert(response.entity)
        }
      })
    }
  }
}