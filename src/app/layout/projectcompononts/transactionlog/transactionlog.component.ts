import { TranlogserviceService } from './../../../APIService/tranlogservice.service';
import { VendormodelService } from './../../../APIService/vendormodel.service';
import { Router } from '@angular/router';

import { ListService } from './../../../../list.service';
//import { PostService } from './../../../../post.service';

import { Paramcls } from './../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as xlsx from 'xlsx';
import * as $ from 'jquery';
import { CryptService } from '../services/crypt.service';
import { PdfService } from '../services/pdf.service';
import { ExportToExcelService } from '../services/export-to-excel.service';

declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-transactionlog',
  templateUrl: './transactionlog.component.html',
  styleUrls: ['./transactionlog.component.css']
})
export class TransactionlogComponent implements OnInit {

  TranlogDetailsforpdf$: any;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  key: string = 'name'; reverse: boolean = true; p: number;

  pageUrl = this.router.url;
  private _success = new Subject<string>(); successMessageUpdate: string;
  count: number; viewcount: number; viewcountdata:number; supplyidreturn:string;
  filter_by: any; itemsPerPage = 10;

  public loading = false; stringifiedData: any; parsedJson: any; stringifiedDataList: any; parsedJsonList: any;
  nop: number; totrec: number; outorec: number; filter: any = ""; pageNo = 1; Searchvendor: string;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  config2 = {
    displayKey: "filterby", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };

  options = [
    {

      filterby: "Customer",
    },
    {
      filterby: "Network",
    },
    {
      filterby: "Vendor",
    },
    {
      filterby: "Device",
    },
    {
      filterby: "Vehicle",
    },
    {
      filterby: "DeviceType",
    }
  ]
  constructor( private listService: ListService, private cryptService: CryptService, private router: Router, public pdfservice: PdfService
    , public excelservice: ExportToExcelService, private tranlogservice: TranlogserviceService) { }

  ngOnInit() {

    this.count = 0;
    this.viewcount = 0;
    this.viewcountdata = 0;
    this.EncryptPageName();
    this.EncryptPageUrl();

    //this.DeviceTypeList();
  }

  EncryptPageName() {
    this.cryptService.encrypt("Transaction Log Details")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }


  ListOfCustomer = [];
  SelectCustomerText: any;
  selectcustomer: string;

  networklist: any;
  network1list = [];
  network2list = [];

  vendorList = [];

  ListOfDevicelist = [];
  devicetypeText: any;
  devicetype: string;

  ListOfDevicetype = [];

  vehicleList: any;
  filterbydata: any;

  filterbchangey() {
    this.filterbydata = this.filter_by.filterby;
    if (this.filterbydata == 'Customer') {
      document.getElementById("custname").style.display = "block";
      document.getElementById("basnet1").style.display = "none";
      document.getElementById("vendor").style.display = "none";
      document.getElementById("device").style.display = "none";
      document.getElementById("devicetype").style.display = "none";
      // this.selectstate = this.SelectStateText.param1;
      let keydata = {
        // param1: this.selectstate,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }
      this.listService.CustomerListAPI(keydata).subscribe(
        (data) => {
          try { RemoveLoader() } catch (e) { alert(e) }
          //  alert(JSON.stringify(data));
          //  console.log(data.entity)
          // console.log("wekcome_ "+data);
          this.ListOfCustomer = data.entity.list;
          // this.ListOfState = statelist;

          this.loading = false;

        });

    }
    else if (this.filterbydata == 'Network') {
      document.getElementById("basnet1").style.display = "block";
      document.getElementById("custname").style.display = "none";
      document.getElementById("vendor").style.display = "none";
      document.getElementById("device").style.display = "none";
      document.getElementById("devicetype").style.display = "none";
      document.getElementById("vehicle").style.display = "none";
      let keydata = {
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }
      this.listService.NetworkListAPI(keydata).subscribe(
        (data) => {
          try { RemoveLoader() } catch (e) { alert(e) }
          //  console.log(data.entity)
          // console.log("wekcome_ "+data);
          this.network1list = data.entity.list;
          this.network2list = data.entity.list;
          // this.ListOfState = statelist;

          this.loading = false;

        });

    }
    else if (this.filterbydata == 'Vendor') {
      document.getElementById("basnet1").style.display = "none";
      document.getElementById("custname").style.display = "none";
      document.getElementById("vendor").style.display = "block";
      document.getElementById("device").style.display = "none";
      document.getElementById("devicetype").style.display = "none";
      document.getElementById("vehicle").style.display = "none";
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
    else if (this.filterbydata == 'Device') {
      document.getElementById("basnet1").style.display = "none";
      document.getElementById("custname").style.display = "none";
      document.getElementById("vendor").style.display = "none";
      document.getElementById("device").style.display = "block";
      document.getElementById("devicetype").style.display = "none";
      document.getElementById("vehicle").style.display = "none";

      let keydata = {

        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      this.listService.DeviceList_vehicle(keydata).subscribe(
        (data) => {

          let resdatalist = data.entity.list;


          let statelist = resdatalist;

          this.ListOfDevicelist = statelist;

          this.loading = false;

        });

    }

    else if (this.filterbydata == 'DeviceType') {
      document.getElementById("basnet1").style.display = "none";
      document.getElementById("custname").style.display = "none";
      document.getElementById("vendor").style.display = "none";
      document.getElementById("device").style.display = "none";
      document.getElementById("devicetype").style.display = "block";
      document.getElementById("vehicle").style.display = "none";



      let keydata = {
        param1: "",
        param2: "",
        param7: "All",
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      this.listService.DeviceTypeListAPI(keydata).subscribe(
        (data) => {
          //  alert(JSON.stringify(data));
          //  console.log(data.entity)
          // console.log("wekcome_ "+data);
          this.ListOfDevicetype = data.entity.list;
          //  this.resdata = 
          // console.log("wekcome_ "+resdata);



          this.loading = false;

        });


    }

    else if (this.filterbydata == 'Vehicle') {

      document.getElementById("basnet1").style.display = "none";
      document.getElementById("custname").style.display = "none";
      document.getElementById("vendor").style.display = "none";
      document.getElementById("device").style.display = "none";
      document.getElementById("devicetype").style.display = "none";
      document.getElementById("vehicle").style.display = "block";
      let dataL = {
        param1: "",
        param2: "",
        param7: "All",
        pageID: "",
        "pageName": this.encryptedpageNameValue,
        "pageURL": this.encryptedpageUrlValue
      }
      this.listService.VehicleList(dataL).subscribe((response) => {
        if (response.statuscode == 200) {
          this.vehicleList = response.entity.list;
        }
      })

    }

    //alert(data);
  }
  TranlogDetails$: any[];
  searchfilter() {

    let keydata = {
      param1: "",
      param2: this.vehicleselect,
      param3: this.customerselect,
      param4: this.devicetypeselect,
      param5: this.networkselect,
      param6: this.vendorselect,
      param7: this.deviceselect,
      pageNo: this.pageNo,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: this.filterbydata,
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.tranlogservice.TransactionLogAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.TranlogDetails$ = data.entity.responsedatalist;
        ;
        this.count = data.entity.count;
        this.viewcountdata = data.entity.viewCount;

        this.loading = false;
        this.searchfilterforpdf();

      });

  }

  searchfilterforpdf() {



    //this.p = 1; this.pagecount = 10;
    //  console.log("p" + this.p);

    let keydata = {
      param1: "",
      param2: this.vehicleselect,
      param3: this.customerselect,
      param4: this.devicetypeselect,
      param5: this.networkselect,
      param6: this.vendorselect,
      param7: this.deviceselect,
      pageNo: "",
      itemsPerPage: "",
      searchBy: "",
      searchType: this.filterbydata,
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.tranlogservice.TransactionLogAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.TranlogDetailsforpdf$ = data.entity.responsedatalist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
        this.PrepareExcelData(this.TranlogDetailsforpdf$);
      });

  }

  customerObj: any; selectnetwork1_Text: any; vendorObj: any; devicelistText: any; dev_type: any; vehicle_list: any;
  customerselect: any; networkselect: any; vendorselect: any; deviceselect: any; devicetypeselect: any; vehicleselect: any;
  customerchangeValue() {
    this.customerselect = this.customerObj.param1;
    this.networkselect = "";
    this.vendorselect = "";
    this.deviceselect = "";
    this.devicetypeselect = "";
    this.vehicleselect = "";
  }
  networkchangeValue() {
    this.networkselect = this.selectnetwork1_Text.param1;
    this.customerselect = "";
    this.vendorselect = "";
    this.deviceselect = "";
    this.devicetypeselect = "";
    this.vehicleselect = "";
  }
  vendorchangeValue() {
    this.vendorselect = this.vendorObj.param1;
    this.customerselect = "";
    this.networkselect = "";
    this.deviceselect = "";
    this.devicetypeselect = "";
    this.vehicleselect = "";

  }
  devicechangeValue() {
    this.deviceselect = this.devicelistText.param1;
    this.customerselect = "";
    this.networkselect = "";
    this.vendorselect = "";
    this.devicetypeselect = "";
    this.vehicleselect = "";
  }
  devicetypechangevalue() {
    this.devicetypeselect = this.dev_type.param1;
    this.customerselect = "";
    this.networkselect = "";
    this.vendorselect = "";
    this.deviceselect = "";
    this.vehicleselect = "";
  }
  vehiclechangevalue() {
    this.vehicleselect = this.vehicle_list.param1;
    this.customerselect = "";
    this.networkselect = "";
    this.vendorselect = "";
    this.devicetypeselect = "";
    this.deviceselect = "";
  }


  createPDF() {
    let pdfTableData;
    let dataArray = []
    for (let i = 0; i < this.TranlogDetailsforpdf$.length; i++) {
      pdfTableData = {
        "#": i + 1,
        "Device Type": this.TranlogDetailsforpdf$[i]["param13"],
        "Device IMEI": this.TranlogDetailsforpdf$[i]["param4"],
        "Device Serialno": this.TranlogDetailsforpdf$[i]["param5"],
        "Sim no/ICCID no": this.TranlogDetailsforpdf$[i]["param6"],
        "Mobile1/Mobile2": this.TranlogDetailsforpdf$[i]["param7"] / this.TranlogDetailsforpdf$[i]["param8"],
        "Network1/Network2": this.TranlogDetailsforpdf$[i]["param9"],
        "Vehicle No": this.TranlogDetailsforpdf$[i]["param19"],
        "Vehicle ChassisNo": this.TranlogDetailsforpdf$[i]["param20"],
        "Vehicle Type": this.TranlogDetailsforpdf$[i]["param22"],
        "Customer Type": this.TranlogDetailsforpdf$[i]["param27"],
        "Customer Mobile": this.TranlogDetailsforpdf$[i]["param28"],
        "Device Entry Date": this.TranlogDetailsforpdf$[i]["param30"],
        "Sim Assign Date": this.TranlogDetailsforpdf$[i]["param31"],
        "Installation Date": this.TranlogDetailsforpdf$[i]["param21"],
        "Vehicle Assign Date": this.TranlogDetailsforpdf$[i]["param17"],
        "Renewal Date": this.TranlogDetailsforpdf$[i]["param32"],
        "Status": this.TranlogDetailsforpdf$[i]["param15"]
      }
      dataArray.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(dataArray, "Transaction Log Details");
  }



  excelData: any = [];
  PrepareExcelData(datav) {
    this.excelData = [];

    for (var i = 0; i < datav.length; i++) {
      try {
        var obj = {

          "#": i + 1,
          "Device Type": datav[i].param13,
          "Device IMEI": datav[i].param4,
          "Device Serialno": datav[i].param5,
          "Sim no/ICCID no": datav[i].param6,
          "Mobile1/Mobile2": datav[i].param7 / datav[i].param8,
          "Network1/Network2": datav[i].param9,
          "Vehicle No": datav[i].param19,
          "Vehicle ChassisNo": datav[i].param20,
          "Vehicle Type": datav[i].param22,
          "Customer Name": datav[i].param27,
          "Customer Mobile": datav[i].param28,
          "Device Entry Date":  datav[i].param30,
          "Sim Assign Date":  datav[i].param31,
          "Installation Date": datav[i].param21,
          "Vehicle Assign Date": datav[i].param17,
          "Renewal Date": datav[i].param32,
          "Status": datav[i].param15

        }
      } catch (e) { }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    //this.searchfilterforpdf(); 
    this.excelservice.ExportExcel(this.excelData, 'Transaction Log Details', 'transactionlog');
  }


  SelectRows() {
    this.searchfilter();
  }

  pageChanged(event) {
    this.pageNo = event;
    this.searchfilter();
  }
  searchdata() {
    this.pageNo = 1;
    this.searchfilter();
  }
  Refreshfunction() {
    this.pageNo = 1;
    this.filter = "";
    this.itemsPerPage = 10;
    this.searchfilter();
  }
  sort(key){

    this.key = key;
    this.reverse = !this.reverse;
    
  }
}
