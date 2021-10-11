import { ListService } from './../../../../list.service';
import { PdfService } from './../services/pdf.service';
import { ExportToExcelService } from './../services/export-to-excel.service';
import { ReportService } from './../services/report.service';
import { PostService } from './../../../../post.service';
import { Router } from '@angular/router';
import { CryptService } from './../services/crypt.service';
import { Component, OnInit } from '@angular/core';
declare var AddLoader: any;
declare var RemoveLoader: any;
import * as $ from 'jquery'
declare var $: any;

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.css']
})
export class RouteDetailsComponent implements OnInit {

  encryptedpageUrlValue: any;
  encryptedpageNameValue: any;
  pageUrl: any = this.router.url;
  pageNumber: any = 1; itemsPerPage: any = 10; filter: any = '';
  totalRecords: any = "NA";
   totalCount: any;
  viewCount: any;
  valueAlreadyGot: boolean = false;
  location: any;
   excelData: any[];
  tolocationAdd: any;
  address: any[] = [];
  key; reverse;
  customerListArray: any;
  customerId: any = '';
  customerObj: any;
  routedetails: any[];
  routedetailsDataPdf: any;
  routedetailsDataExcel: any;

  config = {
    displayKey: "param2",    // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
    placeholder: 'Select Customer'
  };


  constructor(private cryptService: CryptService, private router: Router, private ps: PostService,
    private rs: ReportService, private excelService: ExportToExcelService, private pdfservice: PdfService,
    private listService: ListService) {
    this.encryptedpageNameValue = this.cryptService.encrypt("Route Details")
    this.encryptedpageUrlValue = this.cryptService.encrypt(this.pageUrl)
  }

  ngOnInit() {


    this.routeDetails();
  }


  customerList = () => {
    let dataL = {
      pageID: "2",
      param7: "All",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    this.listService.CustomerListAPI(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.customerListArray = response.entity.list;
      }
    })
  }

  getCustomerId() {
    this.customerId = this.customerObj.param1;
  }


  routeDetails = () => {
    let dataL = {
      param1: "",   //routeid_ui(Optional)
      param2: "", //Deviceid_ui(Optional)
      param3: "",//(Optional)   
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.ps.RouteDetails(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.routedetails = response.entity.responsedatalist
        this.viewCount = response.entity.viewCount;
        if (this.valueAlreadyGot == false) {
          this.totalCount = response.entity.count;
        }
      }
    })

  }

  routeDetailsPDF = () => {
    let dataL = {
      param1: "",   //routeid_ui(Optional)
      param2: "", //Deviceid_ui(Optional)
      param3: "",//(Optional)   
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.ps.RouteDetails(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.routedetailsDataPdf = response.entity.responsedatalist;
        this.createPDF()
      }
    })

  }
  routeDetailsExcel = () => {
    let dataL = {
      param1: "",   //routeid_ui(Optional)
      param2: "", //Deviceid_ui(Optional)
      param3: "",//(Optional)   
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.ps.RouteDetails(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.routedetailsDataExcel = response.entity.responsedatalist
        this.PrepareExcelData(this.routedetailsDataExcel)
      }
    })

}
PrepareExcelData(data) {
  this.excelData = [];

  for (var i = 0; i < data.length; i++) {
    try {
      var obj = {
        "#": data[i].rowNumber,
        "ROUTE NAME": data[i].param2,
        // "ROUTE TYPE":data[i].param3,
        "DESCRIPTION ": data[i].param3,
        "CREATE DATE": data[i].param5,
        "DEVICE DETAILS": data[i].param11,
        "POI DETAILS": data[i].param10,
      }
    } catch (e) { }
    this.excelData.push(obj);
  }
  this.exportToExcel()
}

exportToExcel() {
  this.excelService.ExportExcel(this.excelData, 'Route Details', 'routedetails');
}

createPDF() {
  let pdfTableData;
  let dataArray = []

  for (let i = 0; i < this.routedetailsDataPdf.length; i++) {
    pdfTableData = {
      "#": this.routedetailsDataPdf[i].rowNumber,
      "ROUTE NAME": this.routedetailsDataPdf[i].param2,
      "ROUTE DESCRIPTION": this.routedetailsDataPdf[i].param3,
       "CREATE DATE": this.routedetailsDataPdf[i].param5,
      "DEVICE DETAILS": this.routedetailsDataPdf[i].param11,
      "POI DETAILS": this.routedetailsDataPdf[i].param10,

    }
    dataArray.push(pdfTableData)
  };
  this.pdfservice.CreatePDFData(dataArray, "Route Details");
}
searchdata() {
  this.valueAlreadyGot = false;
  this.pageNumber = 1;
  this.routeDetails()

}
Refreshfunction() {
  this.valueAlreadyGot = false;
  this.pageNumber = 1;
  this.itemsPerPage = 10;
  this.filter = '';
  this.routeDetails()
}

pageChange(event) {
  this.valueAlreadyGot = true;
  this.pageNumber = event;
  this.routeDetails();
}
changeItemsPerPage() {
  this.valueAlreadyGot = true;
  this.routeDetails();
}

getLocation(data) {
  let dataL = {
    param1: data.param36,    //lattitude
    param2: data.param35,    //longitude
    pageID: "1",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
  }
  AddLoader()
  this.rs.getlocation(dataL).subscribe((response) => {
    RemoveLoader();
    if (response.statuscode == 200) {
      let locaAddr = response.entity.list[0];
      $('#btn' + data.rowNumber).hide(); $('#data' + data.rowNumber).show();
      this.address[data.rowNumber] = locaAddr.param1;
    }
    else {
      console.log(response)
    }
  })
}


}
