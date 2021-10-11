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
  selector: 'app-live-vehicles',
  templateUrl: './live-vehicles.component.html',
  styleUrls: ['./live-vehicles.component.css']
})
export class LiveVehiclesComponent implements OnInit {
  encryptedpageUrlValue: any;
  encryptedpageNameValue: any;
  pageUrl: any = this.router.url;
  pageNumber: any = 1; itemsPerPage: any = 10; filter: any = '';
  totalRecords: any = "NA";
  liveVehiclesData: any;
  totalCount: any;
  viewCount: any;
  valueAlreadyGot: boolean = false;
  location: any;
  liveVehiclesDataPDF: any;
  excelData: any[];
  tolocationAdd: any;
  address: any[];
  key;reverse;

  constructor(private cryptService: CryptService, private router: Router, private ps: PostService,
    private rs: ReportService, private excelService: ExportToExcelService, private pdfservice: PdfService) {
    this.encryptedpageNameValue = this.cryptService.encrypt("Live Vehicles")
    this.encryptedpageUrlValue = this.cryptService.encrypt(this.pageUrl)

  }

  ngOnInit() {
    this.LiveVehicles()
  }
  LiveVehicles = () => {
    if (this.valueAlreadyGot == true) {
      this.totalRecords = this.totalCount
    }
    else {
      this.totalRecords = "NA"
    }
    let dataL = {
      "param1": "",
      "pageNo": this.pageNumber,
      "itemsPerPage": this.itemsPerPage,
      "searchBy": this.filter,
      "searchType": "",
      "totalRecords": this.totalRecords,
      "pageID": "Page ID",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }

    try { AddLoader() } catch (e) { alert(e) }
    this.ps.GetVehicleDetailsformap(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      if (response.statuscode == 200) {
        this.liveVehiclesData = response.entity.list;
        this.viewCount = response.entity.viewCount;
        if (this.valueAlreadyGot == false) {
          this.totalCount = response.entity.count;
          this.LiveVehiclesPDF();
        }
      }
    })
  }

  LiveVehiclesPDF = () => {

    let dataL = {
      "param1": "",
      "pageNo": "",
      "itemsPerPage": "",
      "searchBy": "",
      "searchType": "",
      "totalRecords": "NA",
      "pageID": "Page ID",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }

    try { AddLoader() } catch (e) { alert(e) }
    this.ps.GetVehicleDetailsformap(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      if (response.statuscode == 200) {
        this.liveVehiclesDataPDF = response.entity.list;
        this.PrepareExcelData(this.liveVehiclesDataPDF)
      }
    })
  }

  PrepareExcelData(data) {
    this.excelData = [];

    for (var i = 0; i < data.length; i++) {
      try {
        var obj = {
          "#": data[i].rowNumber,
          "CUSTOMER NAME": data[i].param22,
          "VEHICLE NUMBER": data[i].param12,
          "DEVICE TYPE": data[i].param65,
          "VENDOR NAME": data[i].param8,
          "IMEI NUMBER": data[i].param3,
          "MOBILE NUMBER 1": data[i].param67,
          "MOBILE NUMBER 2": data[i].param68,
          "NETWORK 1": data[i].param69,
          "NETWORK 2": data[i].param70,
          "POLLING TIME": data[i].param32,
          "SPEED": data[i].param37,
          "IGNITION": data[i].param42,
          "PORT NUMBER": data[i].param66,
          "STATUS": data[i].param47
        }
      } catch (e) { }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    this.excelService.ExportExcel(this.excelData, 'Live Vehicle', 'livevehicle');
  }

  createPDF() {
    let pdfTableData;
    let dataArray = []
    for (let i = 0; i < this.liveVehiclesDataPDF.length; i++) {
      pdfTableData = {
        "#": this.liveVehiclesDataPDF[i].rowNumber,
        "CUSTOMER NAME": this.liveVehiclesDataPDF[i]["param22"],
        "VEHICLE NUMBER": this.liveVehiclesDataPDF[i]["param12"],
        "DEVICE TYPE": this.liveVehiclesDataPDF[i]["param65"],
        "VENDOR NAME": this.liveVehiclesDataPDF[i]["param8"],
        "IMEI NUMBER": this.liveVehiclesDataPDF[i]["param3"],
        "MOBILE NUMBER 1": this.liveVehiclesDataPDF[i]["param67"],
        "MOBILE NUMBER 2": this.liveVehiclesDataPDF[i]["param68"],
        "NETWORK 1": this.liveVehiclesDataPDF[i]["param69"],
        "NETWORK 2": this.liveVehiclesDataPDF[i]["param70"],
        "POLLING TIME": this.liveVehiclesDataPDF[i]["param32"],
        "SPEED": this.liveVehiclesDataPDF[i]["param37"],
        "IGNITION": this.liveVehiclesDataPDF[i]["param42"],
        "PORT NUMBER": this.liveVehiclesDataPDF[i]["param66"],
        "STATUS": this.liveVehiclesDataPDF[i]["param47"],
      }
      dataArray.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(dataArray, "Division Details");

  }
  searchdata() {
    this.valueAlreadyGot = false;
    this.pageNumber = 1;
    this.LiveVehicles()

  }
  Refreshfunction() {
    this.valueAlreadyGot = false;
    this.pageNumber = 1;
    this.itemsPerPage = 10;
    this.filter = '';
    this.LiveVehicles()
  }

  pageChange(event) {
    this.valueAlreadyGot = true;
    this.pageNumber = event;
    this.LiveVehicles();
  }
  changeIemsPerPage() {
    this.valueAlreadyGot = true;
    this.LiveVehicles();
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
  showRawData(data) {

  }
}

