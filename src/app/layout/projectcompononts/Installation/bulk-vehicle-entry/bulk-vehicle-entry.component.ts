import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { UploadimageoneService } from './../upload/uploadimageone.service';
import { VehicleinstallationService } from './../../../../APIService/vehicleinstallation.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import * as xlsx from 'xlsx';



@Component({
  selector: 'app-bulk-vehicle-entry',
  templateUrl: './bulk-vehicle-entry.component.html',
  styleUrls: ['./bulk-vehicle-entry.component.css']
})
export class BulkVehicleEntryComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  pageUrl = this.router.url;
  //  dhammadeep dahiwale
  //  1-12-2020
  //  fileupload variables
  key;reverse;filter;remark;itemsPerPage;totalcount;pageNumber;successMessageUpdate;datafromrespo;

  filename: string;
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  pageId=3;
  pageName;
  pageURL;
  applicationId= 24341645;

  installationTable: any;
  constructor(private uploadimageService: UploadimageoneService, private cryptService: CryptService, private router: Router, private vehicleInstallationService: VehicleinstallationService) {
    this.EncryptPageName();
    this.EncryptPageUrl();
  }

  ngOnInit() {
  }
  EncryptPageName() {
    this.cryptService.encrypt("Bulk Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }

  // developer dhammadeep dahiwale 
  // 1-12-2020
  // file upoad

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.vehicleInstallationService.pushFileToStorage(this.currentFileUpload, this.pageId, this.encryptedpageNameValue, this.encryptedpageUrlValue,this.applicationId).subscribe((response) => {
      // alert('inside service');

      if (response['status'] == true) {
        this.installationTable = response['entity'];
      }
      // if (response['status'] == true) {
      //   this.installationTable = response['entity'];
      // }
      // if (response instanceof HttpResponse) {
      //   console.log('file uploaded successfully');
      //   this.installationTable
      // }
      // else {
      //   alert('service failed')
      // }

    })
    this.selectedFiles = undefined;
  }
  searchdata(){

  }
  Refreshfunction(){

  }

  exportToExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
  }

  createPDF() {
    // this.CompletedtripReportDetailPDF();
    var sTable = document.getElementById('PDFTable').innerHTML;
    // console.log("Stable ++++"+sTable);
    var style = "<style>";
    style = style + "table {width: 100%;font: 17px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";

    // CREATE A WINDOW OBJECT.
    var win = window.open('', '', 'height=700,width=700');

    win.document.write('<html><head>');
    win.document.write('<title>Completed Trip Details</title>');   // <title> FOR PDF HEADER.
    win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');

    win.document.close(); 	// CLOSE THE CURRENT WINDOW.

    win.print();    // PRINT THE CONTENTS.

  }

}
