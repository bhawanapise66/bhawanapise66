import { ExportToExcelService } from './../../services/export-to-excel.service';
import { PageEntry } from './../page-master/page-master.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { PageandtipsService } from './../../services/pageandtips.service';
import { CryptService } from './../../services/crypt.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as xlsx from 'xlsx'
import { PdfService } from '../../services/pdf.service';

declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;




export class TipsEntry {
  tipId: string;
  page: string;
  tip: string;
  tips: any = [];
  remarks: string;
}

@Component({
  selector: 'app-tips-entry',
  templateUrl: './tips-entry.component.html',
  styleUrls: ['./tips-entry.component.css']
})
export class TipsEntryComponent implements OnInit {
  tipEntry = new TipsEntry();
  pEntry = new PageEntry();
  pageNumber: number = 1; itemsPerPage: number = 10;
  encryptedpageNameValue: string; encryptedpageUrlValue: string; remarkText: any;

  pageList = [];

  pageNametoShow;
  filter = ''; totalcount;
  tips = <any>[];
  tipdetailsgrid = [];
  isPageEmpty: boolean = false; isTipEmpty: boolean = false;
  tableEmpty: boolean = false;
  toEdit: boolean = false;
  pageUrl = this.router.url;
  viewcount: any;
  errorMessage: any; write_privilege: string;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5900,
    height: '200px',
    placeholder: 'Select Page'
  };
  tipObj: any;
  totalrecord: any = 'NA';
  tipdetailsgridForPdf: any;
  excelData: any[];
  pageObj: any;
  pageName: any;
  pageId: any = '';
  constructor(private cryptService: CryptService, private tipsService: PageandtipsService, private router: Router,
    private modalService: NgbModal, public pdfservice: PdfService, private excelservice: ExportToExcelService) {
    this.EncryptPageName();
    this.EncryptPageUrl();
  }
  keybooleana1: boolean = true; keybooleana2: boolean = true;
  ngOnInit() {

    this.tipEntry.page = ''; this.tipEntry.remarks = ''; this.tipEntry.tip = ''; this.tipEntry.tipId = ''; this.tipEntry.tips = '';

    this.tipsdetails();
    this.getpagedetails();
    this.write_privilege = sessionStorage.getItem('writePrivilege');

    if (this.write_privilege == "false") {
      $("#edit1").css("display", "none");
      $("#deletebtn").css("display", "none");
      $("#addnew").css("display", "none");
      $('#edit1').hide();
      $('.material-icons md-18').css("display", "none");
      $('#deletebtn').attr('disabled', 'disabled');
      $('#addnew').attr('disabled', 'disabled');
      this.keybooleana1 = false;
      this.keybooleana2 = false;
    }
  }

  // encryption of pagename and page url starts
  // date : 5 -oct -2020
  EncryptPageName() {
    this.cryptService.encrypt("Tips Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;

  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }
  // encryption of pagename and page url ends

  getPageId() {
    this.tipEntry.page = this.pageName.param1;
  }

  getpagedetails() {
    let datareq = {
      param1: 'Tip Entry',
      param2: '/tipmaster',
      pageNo: this.pageNumber,
      itemsPerPage: '',
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.tipsService.FormDetailsofPage(datareq).subscribe((response) => {
      this.pageList = response.entity.list;
    })
  }

  getePageIdforUpdate() {
    this.tipEntry.page = this.pageName.param1;
  }
  getPageName() {
    this.pageNametoShow = (document.getElementById('pageName') as HTMLInputElement).innerHTML
  }


  pushTip() {
    // if (this.pageObj == null || this.page && this.toEdit == false) {
    //   $("#pageEmpty").html('Please Select Page').show();
    //   setTimeout(function () { document.getElementById("pageEmpty").style.display = "none"; }, 3000);
    // }
    // else if (this.toEdit == true && this.pageName == null) {
    //   $("#pageEmpty").html('Please Select Page').show();
    //   setTimeout(function () { document.getElementById("pageEmpty").style.display = "none"; }, 3000);

    // }
    // else {
    this.tips.push({ description: this.tipEntry.tip });
    if (this.tips == null) {
      this.tableEmpty = false
    }
    else {
      this.tableEmpty = true
      this.tipEntry.tip = '';

    }
    // }


  }


  tipsdetails() {
    let detailreqparam = {
      param1: this.pageId,
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: this.totalrecord,
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    AddLoader()
    this.tipsService.tipsdetails(detailreqparam).subscribe((response) => {

      RemoveLoader()
      if (response.statuscode == 200 && response.responseEntityCount == '1') {
        this.tipdetailsgrid = response.entity.list;
        this.totalcount = response.entity.count;
        this.viewcount = response.entity.viewCount;
      }
      else {
        this.errorMessage = response.entity;
        $("#Error").modal('show');
        this.totalcount = 0;
        this.viewcount = 0;
      }
    })
  }

  getSelectedTip() {
    this.pageId = this.tipObj.param1;
    this.tipsdetails()
    // let detailreqparam = {
    //   pageNo: this.pageNumber,
    //   itemsPerPage: this.itemsPerPage,
    //   searchBy: searchbyText,
    //   searchType: "",
    //   totalRecords: "NA",
    //   pageID: "1",
    //   pageName: this.encryptedpageNameValue,
    //   pageURL: this.encryptedpageUrlValue
    // }
    // AddLoader()
    // this.tipsService.tipsdetails(detailreqparam).subscribe((response) => {
    //   RemoveLoader()
    //   if (response.statuscode == 200 && response.responseEntityCount =="1")  {
    //     this.tipdetailsgrid = response.entity.list;
    //     this.totalcount = response.entity.count;
    //     this.viewcount = response.entity.viewCount;
    //   }
    //   else {
    //     this.errorMessage = response.entity;
    //     $("#Error").modal('show');
    //    }
    // })
  }


  searchdata() {
    this.pageNumber = 1;
    this.tipsdetails();
  }

  Refreshfunction() {
    this.itemsPerPage = 10;
    this.pageNumber = 1;
    this.filter = '';
    this.tipObj = null;
    this.pageId = '';
    this.tipsdetails();
  }
  changeItemsPerPage() {
    this.pageNumber = 1;
    this.tipsdetails();
  }
  insertTip() {
    let tipsdesc = this.tips
    let insertreqparam = {
      param1: "",
      param2: "",
      paramJStrArray1: tipsdesc,
      param3: this.tipEntry.page,
      pageID: "45",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.tipsService.InsertTip(insertreqparam).subscribe((response) => {
      if (response.statuscode == 200) {
        if (response.entity == "Successfully Saved.") {
          this.errorMessage = response.entity;
          $("#insertSuccess").modal('show');
          this.refreshForm();
          this.ngOnInit();
        }
        else {
          this.errorMessage = response.entity
          $("#Error").modal('show');
        }
      }
      else {
        this.errorMessage = response.entity;
        $("#Error").modal('show');
      }
    })
  }


  // update exisitng pages 
  EditEntry(data) {
    // document.getElementById("remarkupdate").style.display="block";
    // document.getElementById("remarkmsg").style.display="block";
    this.tipEntry.page = data.param2;
    this.tipEntry.tip = data.param3;
    this.tipEntry.tipId = data.param1;
    this.toEdit = true;
    this.pageObj = this.check(data.param9);;
    // this.tips.push({ description: data.param3 });

  }

  refreshForm() {
    this.toEdit = false;
    this.tips = [];
    this.tipEntry.page = '';
    this.tipEntry.page = ''; this.tipEntry.remarks = ''; this.tipEntry.tip = ''; this.tipEntry.tipId = ''; this.tipEntry.tips = '';

  }

  updateTips() {
    if (this.pageObj == null) {
      this.isPageEmpty = true
    }
    else if (this.remarkText == null || this.remarkText == '') {
      $("#remarkupdate").focus();
      $('#remarkmsg').html('Please Enter Remark').show();
      setTimeout(function () { document.getElementById("remarkmsg").style.display = "none"; }, 3000);


    }
    else {
      let updateReqParam = {
        param1: "remark",
        param2: this.tipEntry.tipId,
        param3: this.tipEntry.page,
        paramJStrArray1: this.tips,
        pageID: "2",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      AddLoader()
      this.tipsService.updatetips(updateReqParam).subscribe((response) => {
        RemoveLoader()
        if (response.statuscode == 200) {
          $("#exampleModal").modal('hide');
          $('.modal-backdrop.show').css('display', 'none');
          this.errorMessage = response.entity;
          $("#insertSuccess").modal('show');
          this.ngOnInit();
        }
        else {
          this.errorMessage = response.entity;
          $("#Error").modal('show');
          this.ngOnInit();
        }
        this.tips.length = 0
      })
    }
  }



  check(data) {
    try {
      if (typeof data === 'object') {
        console.log("come in object if")
        return data.param1;
      }
      else if (data == '') {
        console.log("come in Else if")
      }
      else {
        console.log(data.length)
        return data;
      }
    } catch (e) {
      return '';
    }
  }

  getid(data, value) {
    try {
      if (typeof value === 'object') {
        console.log("come in object if")
        console.log(value.param1 + "  ====  " + value.param2);
        return value.param1;
        // return data.param1;
      }
      else {
        //alert(value)
        console.log("come in else")
        var index = data.findIndex(x => x.param2 === value);
        //alert(index)
        return data[index].param1;
      }
    } catch (e) {
      return '';
    }

  }

  openModal(targetModal, value) {

    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    })

  }

  deleteTip(data) {
    let deleteReqParam = {
      param1: this.tipEntry.remarks,
      param2: data,
      pageID: '2',
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.tipsService.deletetips(deleteReqParam).subscribe((response) => {
      $("#exampleModal").modal('hide');

      if (response.statuscode == 200) {
        this.errorMessage = "Tip Deleted SucessFully";
        $("#insertSuccess").modal('show');
        this.tipsdetails();
        this.ngOnInit();
      }
      else {
        this.errorMessage = "Error In Deleting Tip";
        $("#Error").modal('show');
        this.tipsdetails();
        this.ngOnInit();
      }
    })
  }


  pageChanged(event) {
    this.pageNumber = event;
    this.tipsdetails();
  }



  createPDF() {
    let detailreqparam = {
      param1: this.pageId,
      pageNo: "",
      itemsPerPage: "",
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    AddLoader()
    this.tipsService.tipsdetails(detailreqparam).subscribe((response) => {
      RemoveLoader()
      let pdfdata = response.entity.list;
      this.preparePdfData(pdfdata)
    })
  }
  preparePdfData(data) {
    let pdfTableData;
    let dataArray = []
    for (let i = 0; i < data.length; i++) {
      pdfTableData = {
        "#": data[i]["rowNumber"],
        "PAGE NAME": data[i]["param9"],
        "RECORD DATE": data[i]["param4"],
        "TIPS": data[i]["param3"]
      }
      dataArray.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(dataArray, "Tips Details");
  }


  createExcel() {
    let detailreqparam = {
      param1: this.pageId,
      pageNo: "",
      itemsPerPage: "",
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    AddLoader()
    this.tipsService.tipsdetails(detailreqparam).subscribe((response) => {
      RemoveLoader()
      this.tipdetailsgridForPdf = response.entity.list;
      this.PrepareExcelData(this.tipdetailsgridForPdf);
    })
  }
  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i].rowNumber,
        "PAGE NAME": data[i].param9,
        "RECORD DATE": data[i].param4,
        "TIPS": data[i].param3,
      }
      this.excelData.push(obj);
    }
    this.excelservice.ExportExcel(this.excelData, 'TIPS', 'tips');
  }

}
