import { ExportToExcelService } from './../../services/export-to-excel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { Component, OnInit } from '@angular/core';
import { PageandtipsService } from '../../services/pageandtips.service';
import { PdfService } from '../../services/pdf.service';
import * as $ from 'jquery';

declare var jQuery: any;
declare var $: any;


export class PageEntry {
  pageId: string;
  pageName: string;
  pageUrl: string;
  pageDescription: string;
  remark: string
}


@Component({
  selector: 'app-page-master',
  templateUrl: './page-master.component.html',
  styleUrls: ['./page-master.component.css']
})
export class PageMasterComponent implements OnInit {
  pEntry = new PageEntry();
  pageDetails = [];
  pageNumber: number = 1; itemsPerPage: number = 10; totalcount: number = 0;
  viewCount: number;


  isPageNameEmpty: boolean = false;
  isPageUrlEmpty: boolean = false;
  isPageDescEmpty: boolean = false;
  toEdit: boolean = false;

  encryptedpageNameValue: string; encryptedpageUrlValue: string;
  filter: any;
  pageUrl = this.router.url;
  errorMessage: any;
  pageDetailsForPDF: any;
  excelData: any[];
  constructor(private cryptService: CryptService, private router: Router, private pageService: PageandtipsService,
    private modalService: NgbModal, public pdfservice: PdfService, private excelservice: ExportToExcelService) {
    this.EncryptPageName();
    this.EncryptPageUrl();

  }

  ngOnInit() {

    (function ($) {
      $(document).ready(function () {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#pname').focus();
        })
      });
    })(jQuery);
    this.getpagedetails();

    this.getpagePDFdetails();

  }



  // encryption of pagename and page url starts
  // date : 5 -oct -2020
  EncryptPageName() {
    this.cryptService.encrypt("Page Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;

  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }
  // encryption of pagename and page url ends

  // list of pages 
  // developer : dhammadeep dahiwale 
  // date : 12-16-2020
  getpagedetails() {
    let datareq = {
      param1: 'Page Entry',
      param2: '/pagemaster',
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.pageService.FormDetailsofPage(datareq).subscribe((response) => {
      if (response.statuscode == 200) {
        this.pageDetails = response.entity.list;
        this.viewCount = response.entity.viewCount;
        this.totalcount = response.entity.count;
      }
    })
  }


  getpagePDFdetails() {
    let datareq = {
      param1: 'Page Entry',
      param2: '/pagemaster',
      pageNo: "",
      itemsPerPage: "",
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.pageService.FormDetailsofPage(datareq).subscribe((response) => {
      if (response.statuscode == 200) {
        this.pageDetailsForPDF = response.entity.list;
        this.PrepareExcelData(this.pageDetailsForPDF);

      }
    })
  }

  Refreshfunction() {
    this.pageNumber = 1; this.itemsPerPage = 10;
    this.filter = ''
    this.getpagedetails()
  }

  searchdata(){
    this.pageNumber = 1;
    this.getpagedetails();
  }

  changeItemsPerPage(){
    this.pageNumber = 1;
    this.getpagedetails();
  }
  // insert pages  
  insertPageEntry() {
    this.toEdit = false;
    if (this.pEntry.pageName == null || this.pEntry.pageName == '') {
      this.isPageNameEmpty = true;
    }
    else if (this.pEntry.pageUrl == null || this.pEntry.pageUrl == '') {
      this.isPageUrlEmpty = true;
    }
    else if (this.pEntry.pageDescription == null || this.pEntry.pageDescription == '') {
      this.isPageDescEmpty = true;
    }
    else {
      let dataL = {
        param1: "",
        param2: "",
        param3: this.pEntry.pageName,
        param4: this.pEntry.pageUrl,
        param5: this.pEntry.pageDescription,
        pageID: "2",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      this.pageService.FormEntryofPage(dataL).subscribe((response) => {
        if (response.statuscode == 200) {
          if (response.entity == "Successfully Saved.") {
            $("#exampleModal").modal('hide');
            $('.modal-backdrop.show').css('display', 'none');
            this.errorMessage = response.entity;
            $("#insertSuccessModal").modal('show');
            this.pEntry.pageName = ''; this.pEntry.pageUrl = ''; this.pEntry.pageDescription = '';
            this.getpagedetails()
          }
          else {
            this.errorMessage = response.entity
            $("#ErrorModal").modal('show');
            this.getpagedetails()
          }
        }
        else {
          this.errorMessage = response.entity;
          $("#ErrorModal").modal('show');
        }
      })
    }
  }


  // update exisitng pages 
  EditPageEntry(data) {
    this.pEntry.pageId = data.param1;
    this.pEntry.pageName = data.param2;
    this.pEntry.pageUrl = data.param3;
    this.pEntry.pageDescription = data.param4;
    this.pEntry.remark = '';
    this.toEdit = true;
  }

  updatePageEntry() {
    let editreqparams = {
      param1: this.pEntry.remark,
      param2: this.pEntry.pageId,
      param3: this.pEntry.pageName,
      param4: this.pEntry.pageUrl,
      param5: this.pEntry.pageDescription,
      pageID: "3",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.pageService.UpdateFormEntryofPage(editreqparams).subscribe((response) => {
      if (response.statuscode == 200) {
        $("#exampleModal").modal('hide');
        $('.modal-backdrop.show').css('display', 'none');

        this.errorMessage = response.entity;
        $("#updateSuccessModal").modal('show');
        this.getpagedetails();

      }
      else {
        this.errorMessage = response.entity;
        $("#ErrorModal").modal('show');
      }

    })
  }

  refreshForm() {
    this.toEdit = false;
    this.pEntry.pageName = ''; this.pEntry.pageUrl = ''; this.pEntry.pageDescription = ''; this.pEntry.remark = ''

  }
  openModal(targetModal, value) {
    // this.modalService.open(targetModal, {
    //   centered: true,
    //   backdrop: 'static'
    // });
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    })

  }
  // delte exisiting entry
  DeletePageEntry(data) {
    let deleteReqParam = {
      param1: this.pEntry.remark,
      param2: data,
      pageID: "2",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    console.log(this.pEntry.remark)
    if (this.pEntry.remark == null || this.pEntry.remark == "") {
      $('#invalidRemark').html('Please Enter Remark').show();
      $('#remarkField').focus();

      setTimeout(function () { document.getElementById("invalidRemark").style.display = "none"; }, 3000);
    }
    else {
      this.pageService.DeleteFormEntryofPage(deleteReqParam).subscribe((response) => {
        if (response.statuscode = 200) {
          if (response.statuscode == 200) {
            this.errorMessage = response.entity;
            $("#updateSuccessModal").modal('show');
            $('.modal-backdrop.show').css('display', 'none');

            this.getpagedetails();
          }
          else {
            this.errorMessage = response.entity;
            $("#ErrorModal").modal('show');
            $('.modal-backdrop.show').css('display', 'none');

          }
        }
      })
    }

  }

  pageChanged(event) {
    this.pageNumber = event;
    this.getpagedetails();
  }


  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "PAGE NAME": data[i].param2,
        "PAGE URL ": data[i].param3,
        "PAGE DESCTIPTION": data[i].param4,
      }
      this.excelData.push(obj);
    }
  }

  createPDF() {
    let pdfTableData;
    let dataArray = []
    for (let i = 0; i < this.pageDetailsForPDF.length; i++) {
      pdfTableData = {
        "#": i + 1,
        "Page Name": this.pageDetailsForPDF[i]["param2"],
        "Page Url": this.pageDetailsForPDF[i]["param3"],
        "Page Description": this.pageDetailsForPDF[i]["param4"]
      }
      dataArray.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(dataArray, "Page Entry");

  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'PAGE DETAILS', 'pagedetails');
  }
}
