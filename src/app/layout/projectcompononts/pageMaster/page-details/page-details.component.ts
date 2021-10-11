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


export class PageEntry {
  pageId: string;
  pageName: string;
  pageUrl: string;
  pageDescription: string;
  remark: string
}

@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.component.html',
  styleUrls: ['./page-details.component.css']
})
export class PageDetailsComponent implements OnInit {

  pEntry = new PageEntry();
  pageDetails = [];
  pageNumber: any = 1; itemsPerPage: any = 10; totalcount: any = 0;
  viewCount: number=0;
  count:number=0;
  pagecount: any = 0;

  isPageNameEmpty: boolean = false;
  isPageUrlEmpty: boolean = false;
  isPageDescEmpty: boolean = false;
  toEdit: boolean = false;

  encryptedpageNameValue: string; encryptedpageUrlValue: string;
  filter: any = '';
  pageUrl = this.router.url;
  datafromrespo: any;
  pageDetailsForPDF: any;
  excelData: any[];
  pageName: any;
  pageDesc: any;
  pageUrltoedit: any;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    // limitTo: this.count,
    height: '200px',
  };
  deleteremark: any;
  key: any;
  reverse: boolean;
  constructor(private cryptService: CryptService, private router: Router, private pageService: PageandtipsService,
    public pdfservice: PdfService, private excelservice: ExportToExcelService) {
    this.EncryptPageName();
    this.EncryptPageUrl();

  }
  write_privilege: string;
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
    this.write_privilege = sessionStorage.getItem('writePrivilege');

    if (this.write_privilege == "false") {
      $("#editbtn").css("display", "none");
      $("#deletebtn").css("display", "none");
      $("#addnewpage").css("display", "none");
      $('#editbtn').hide();
      $('.material-icons md-18').css("display", "none");
      $('#deletebtn').attr('disabled', 'disabled');
      $('#addnewpage').attr('disabled', 'disabled');
    }
  }



  // encryption of pagename and page url starts
  // date : 5 -oct -2020
  EncryptPageName() {
    this.cryptService.encrypt("Page Details")
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
    AddLoader()
    this.pageService.FormDetailsofPage(datareq).subscribe((response) => {
      RemoveLoader();
      if (response.statuscode == 200) {
        this.pageDetails = response.entity.list;
        this.viewCount = response.entity.viewCount;
        this.totalcount = response.entity.count;
        this.pagecount = response.entity.count;
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
  searchdata() {
    this.pageNumber = 1;
    this.getpagedetails();
    this.getpagePDFdetails();
  }

  Refreshfunction() {
    this.pageNumber = 1; this.itemsPerPage = 10;
    this.filter = ''
    this.getpagedetails()
  }
  changeItemsPerPage() {
    this.pageNumber = 1;
    this.getpagedetails();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }


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


  setdata(data) {
    this.pEntry.pageId = data.param1;
    this.pEntry.pageName = data.param2;
    this.pEntry.pageUrl = data.param3;
    this.pEntry.pageDescription = data.param4;
    this.backdetailsbtn()
  }
  editpageform() {
    // alert("click");
    document.getElementById("backdetailsbtn").style.display = "block";
    document.getElementById("editbtn").style.display = "none";
    // document.getElementById("customerdtls").style.display="none";
    // document.getElementById("bankdtls").style.display="none";
    document.getElementById("vendordtls").style.display = "none";
    //  document.getElementById("rev2btn").style.display="none";
    //  document.getElementById("revbtn").style.display="none";
    //  document.getElementById("nextviewbtn").style.display="none";
    //  document.getElementById("next2viewbtn").style.display="none";
    document.getElementById("container").style.display = "block";
    document.getElementById("modelfooter").style.display = "block";
    document.getElementById("uvmd").style.display = "block";
    document.getElementById("vmd").style.display = "none";
    // this.Citylist();
    //   console.log("KJ Value : "+this.divisiondetail);
    // console.log(this.selectdumdivision);
    // console.log(this.selectdumdivision);
    // console.log();
    if (this.write_privilege == "false") {
      $('#editbtn').hide();
    }

  }
  backdetailsbtn() {
    document.getElementById("uvmd").style.display = "none";
    document.getElementById("vmd").style.display = "block";
    document.getElementById("backdetailsbtn").style.display = "none";
    document.getElementById("editbtn").style.display = "block";
    // document.getElementById("customerdtls").style.display="block";
    // document.getElementById("bankdtls").style.display="block";
    document.getElementById("vendordtls").style.display = "block";
    document.getElementById("modelfooter").style.display = "none";
    //  document.getElementById("rev2btn").style.display="none";
    //  document.getElementById("revbtn").style.display="none";
    //  document.getElementById("nextviewbtn").style.display="block";
    //  document.getElementById("next2viewbtn").style.display="none";
    document.getElementById("container").style.display = "none";
    //  document.getElementById("bankdtls").style.display="none";
    //  document.getElementById("customerdtls").style.display="none";
    if (this.write_privilege == "false") {
      $('#editbtn').hide();
    }
  }


  // update exisitng pages 
  EditPageEntry(data) {
    this.pEntry.pageId = data.param1;
    this.pEntry.pageName = data.param2;
    this.pEntry.pageUrl = data.param3;
    this.pEntry.pageDescription = data.param4;
    this.pEntry.remark = "";
    this.toEdit = true;
  }

  updatePageEntry() {
    var isValid = true;
    // var remark = $('#remarkId').val();
    // this.pEntry.remark = remark.substring(0, 1).toUpperCase() + remark.substring(1);

    if (this.pEntry.pageName == null || this.pEntry.pageName == '') {
      $('#msg_errorentry4').html('Please Enter Page Name').show();
      $('#pageNameid').focus();
      setTimeout(function () { document.getElementById("msg_errorentry4").style.display = "none"; }, 3000);
    }
    else if (this.pEntry.pageUrl == null || this.pEntry.pageUrl == '') {
      $('#msg_errorentry4').html('Please Enter Page Url').show();
      $('#pageurlId').focus();
      setTimeout(function () { document.getElementById("msg_errorentry4").style.display = "none"; }, 3000);
    }
    else if (this.pEntry.pageDescription == null || this.pEntry.pageDescription == '') {
      $('#msg_errorentry4').html('Please Enter Page description').show();
      $('#descriptionid').focus();
      setTimeout(function () { document.getElementById("msg_errorentry4").style.display = "none"; }, 3000);
    }
    else if (this.pEntry.remark == null || this.pEntry.remark == '') {
      $('#msg_errorremark').html('Please Enter Remark').show();
      $('#remarkId').focus();
      setTimeout(function () { document.getElementById("msg_errorremark").style.display = "none"; }, 3000);
    } else {
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
      AddLoader()
      this.pageService.UpdateFormEntryofPage(editreqparams).subscribe((response) => {
        RemoveLoader()
        this.datafromrespo = response.entity;
        if (response.statuscode == 200) {

          $("#myModalwizard").modal('hide');
          $('.modal-backdrop.show').css('display', 'none');
          $("#updateSuccessModal").modal('show');
          this.refreshForm();
          this.getpagedetails();
        }
        else {
          $("#ErrorModal").modal('show');
        }

      })
    }
  }

  clear() {
    this.deleteremark = "";
  }
  refreshForm() {
    this.toEdit = false;
    this.pEntry.pageName = ''; this.pEntry.pageUrl = ''; this.pEntry.pageDescription = ''; this.pEntry.remark = "";

  }

  // delte exisiting entry
  DeletePageEntry() {
    let deleteReqParam = {
      param1: this.deleteremark,
      param2: this.pEntry.pageId,
      pageID: "2",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    if (this.deleteremark == null || this.deleteremark == "") {
      $('#invalidRemark').html('Please Enter Remark').show();
      $('#remarkField').focus();

      setTimeout(function () { document.getElementById("invalidRemark").style.display = "none"; }, 3000);
    }
    else {
      $("#modeldelete").modal('hide');
      AddLoader()
      this.pageService.DeleteFormEntryofPage(deleteReqParam).subscribe((response) => {
        RemoveLoader()
        this.datafromrespo = response.entity;
        if (response.statuscode = 200) {
          $("#updateSuccessModal").modal('show');
          this.getpagedetails(); this.clear();
        }
        else {
          $("#ErrorModal").modal('show');
        }
        $("#myModalwizard").modal('hide');
        $('.modal-backdrop.show').css('display', 'none');
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
