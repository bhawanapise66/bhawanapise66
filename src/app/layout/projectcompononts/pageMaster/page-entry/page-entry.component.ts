import { ExportToExcelService } from './../../services/export-to-excel.service';
import { PdfService } from './../../services/pdf.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PageandtipsService } from './../../services/pageandtips.service';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
declare var SuccessAlert: any;
declare var errorAlert: any;

export class PageEntry {
  pageId: string;
  pageName: string;
  pageUrl: string;
  pageDescription: string;
  remark: string
}

@Component({
  selector: 'app-page-entry',
  templateUrl: './page-entry.component.html',
  styleUrls: ['./page-entry.component.css']
})
export class PageEntryComponent implements OnInit {

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

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    // limitTo: this.count,
    height: '200px',
  };

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
  // insert pages  



  urlValidator(data) {
    const urlreg = /^[/][a-z]{0,200}$/;

    if (this.pEntry.pageUrl.match(urlreg)) {
      return true
    }
    else {
      this.pEntry.pageUrl = this.pEntry.pageUrl.substring(0, this.pEntry.pageUrl.length - 1);

      return false
    }
  }


  insertPageEntry() {
    this.toEdit = false;
    if (this.pEntry.pageName == null || this.pEntry.pageName == '') {
      this.isPageNameEmpty = true;
      $("#pname").focus()
    }
    else if (this.pEntry.pageUrl == null || this.pEntry.pageUrl == '') {
      this.isPageUrlEmpty = true;
      $("#purl").focus()
    }
    else if (this.pEntry.pageDescription == null || this.pEntry.pageDescription == '') {
      this.isPageDescEmpty = true;
      $("#pdesc").focus()
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
      AddLoader();
      this.pageService.FormEntryofPage(dataL).subscribe((response) => {
        RemoveLoader();
        if (response.statuscode == 200) {
          this.errorMessage = response.entity;
          $("#insertPageSuccessModal").modal('show');
          this.pEntry.pageName = ''; this.pEntry.pageUrl = ''; this.pEntry.pageDescription = '';
        }
        else {
          this.errorMessage = response.entity
          $("#insertpageErrorModal").modal('show');
        }
        $("#exampleModal1").modal('hide');
        $('.modal-backdrop.show').css('display', 'none');
      })
    }
  }
  refreshForm() {
    this.toEdit = false;
    this.pEntry.pageName = ''; this.pEntry.pageUrl = ''; this.pEntry.pageDescription = ''; this.pEntry.remark = ''
  }



}
