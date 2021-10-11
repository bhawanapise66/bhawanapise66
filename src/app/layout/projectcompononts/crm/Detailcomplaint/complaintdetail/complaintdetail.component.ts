import { PdfService } from './../../../services/pdf.service';
import { ExportToExcelService } from './../../../services/export-to-excel.service';
import { CustomercomplaintService } from './../../../../../APIService/customercomplaint.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CryptService } from './../../../services/crypt.service';
import { ListService } from './../../../../../../list.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import * as xlsx from 'xlsx';
declare var jQuery: any;
declare var $: any;
import { Subject } from 'rxjs';
import { CustomermodelService } from 'src/app/APIService/customermodel.service';
declare var jQuery: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
declare var SuccessAlert: any;
declare var errorAlert: any;
@Component({
  selector: 'app-complaintdetail',
  templateUrl: './complaintdetail.component.html',
  styleUrls: ['./complaintdetail.component.css']
})
export class ComplaintdetailComponent implements OnInit {

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;
  key: string = 'name'; reverse: boolean = true;

  public loading = false; p: number; pagecount: number = 10; count: number; viewcount: number;
  SelectPageText: string; PlaceOrderDetails$: Object; remarkText: string; deleteText: string; filter: any="";
  actionupdateText: string; 

  datafromrespo: string;
  private _success = new Subject<string>(); successMessageUpdate: string;
  rowno: number;
  complaintid: string;
  tokenNo: string;
  complaintagainst: string;
  complaint: string;
  vehiclelistid: any;
  emailid: string; action: any;
  mobileno: number; createdat: any; updatedat: any; actiontaken: any; isresolved: any; loginid: any; customerid: any;
  customername: any; customermobileno: any; customeremailid: any; vehiclelistno: any;
  itemsPerPage: number = 10;flag:number=0;




  objLength:number;
 

  setdata(com) {

    this.rowno = com.param1;
    this.tokenNo = com.param2;

    this.complaintid = com.param3;

    this.complaintagainst = com.param4;
    this.complaint = com.param5;
    this.vehiclelistid = com.param6;
    this.emailid = com.param7;
    this.mobileno = com.param8;
    this.createdat = com.param9;
    this.updatedat = com.param10;
    this.action = com.param11;
    this.isresolved = com.param12;
    this.loginid = com.param13;
    this.customerid = com.param14;
    this.customername = com.param15;
    this.customermobileno = com.param16;
    this.customeremailid = com.param17;
    this.duration = com.param18;
    this.checkthevalue(com);
    this.Statuslist();
  }
  duration: any;
  keyboolean: boolean;
  keybooleana: boolean;
  customername14: boolean; customername18: boolean; customer_name14: boolean; customer_name18: boolean;
  mobile14: boolean; mobile18: boolean; mobile_14: boolean; mobile_18: boolean;
  userKey: any;
  constructor( public pdfservice: PdfService, public excelservice: ExportToExcelService, private modalService: NgbModal, private flashMessage: FlashMessagesService, private listService: ListService, private cryptService: CryptService, private router: Router, private complaintService: CustomercomplaintService) {
    this.keyboolean = true;
    this.keybooleana = true;
  
  }

  ngOnInit() {
     // this.userKey= localStorage.getItem('rid');
    this.userKey = sessionStorage.getItem('rid')

    if (this.userKey == '10' || this.userKey == '11' || this.userKey == '16' || this.userKey == '21') {

 this.flag=1;
      
      this.customername14 = true;
      this.mobile14 = true;
      this.customername18 = true;
      this.mobile18 = true;
      this.customer_name14 = true;
      this.mobile_14 = true;
      this.customer_name18 = true;
      this.mobile_18 = true;

    } else {
   
      this.flag=0;
      // this.keyboolean=true;
      this.keybooleana = false;
      this.customername14 = false;
      this.mobile14 = false;
      this.customername18 = false;
      this.mobile18 = false;
      this.customer_name14 = false;
      this.mobile_14 = false;
      this.customer_name18 = false;
      this.mobile_18 = false;
    }
    this.EncryptPageName();
    this.EncryptPageUrl();
    this.ComplaintDetail();
console.log(this.options);
  }

  EncryptPageName() {
    this.cryptService.encrypt("Complaint Detail")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }
  datereport = new Date();
  complaintDetailsArray: [];
   options = [{ param2: "Closed", }, { param2: "Partially Completed", },{ param2: "Working", }];

  redColor: any = 'red !important'; greenColor: any = 'green !important';
 

  ListOfStatus: any; res: any = [];
  Statuslist() {
    this.res.length = 0;
    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.ComplaintStatus(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfStatus = data.entity.responsedatalist[0];
        this.res.push(this.ListOfStatus.closed);
        this.res.push(this.ListOfStatus.partiallycompleted);
        this.res.push(this.ListOfStatus.working);
        // console.log(this.res);
        this.loading = false;
      });
  }

  // gotoComplaint() {
  //   this.router.navigate(['helpdesk/complaint']);
  // }
  statusName: any ="";
 

  createPDF() {
    let pdfTableData;
    let dataArray = []
    if (this.userKey == '10' || this.userKey == '11' || this.userKey == '16' || this.userKey == '21') {
      for (let i = 0; i < this.complaintDetailsArray1.length; i++) {
        pdfTableData = {
          "#": this.complaintDetailsArray1[i]["rowNumber"],
          "Token No": this.complaintDetailsArray1[i]["param2"],
          "Complaint Against": this.complaintDetailsArray1[i]["param3"],
          "Customer Name": this.complaintDetailsArray1[i]["param14"],
          "Mobile No.": this.complaintDetailsArray1[i]["param15"],

          "Complaint": this.complaintDetailsArray1[i]["param4"],
       
          "Complaint Date": this.complaintDetailsArray1[i]["param8"],
          "Action Taken": this.complaintDetailsArray1[i]["param10"],
        
          "Duration": this.complaintDetailsArray1[i]["param18"],
          "Status": this.complaintDetailsArray1[i]["param11"],
        }
        dataArray.push(pdfTableData)
      };
    }
    else {
      for (let i = 0; i < this.complaintDetailsArray1.length; i++) {
        pdfTableData = {
          "#": this.complaintDetailsArray1[i]["rowNumber"],
          "Token No": this.complaintDetailsArray1[i]["param2"],
          "Complaint Against": this.complaintDetailsArray1[i]["param3"],
          "Complaint": this.complaintDetailsArray1[i]["param4"],
        
          "Complaint Date": this.complaintDetailsArray1[i]["param8"],
          "Action Taken": this.complaintDetailsArray1[i]["param10"],
        
          "Duration": this.complaintDetailsArray1[i]["param18"],
          "Status": this.complaintDetailsArray1[i]["param11"],
        }
        dataArray.push(pdfTableData)
      };
    }
    this.pdfservice.CreatePDFData(dataArray, "Complaint Details");

  }



  complaintDetailsArray1: any = [];
  count1: number;
  viewcount1: number;
  ComplaintDetail1() {

    this.loading = true;
  let keydata = {
      param1: "",
      pageNo: "",
      itemsPerPage: "",
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    try { AddLoader() } catch (e) { alert(e) }
    this.complaintService.ComplaintDetail(keydata).subscribe(
      (data) => {

        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.responsedatalist;
        let vendorlist = resdatalist;

        this.complaintDetailsArray1 = vendorlist;
        this.PrepareExcelData(this.complaintDetailsArray1);
        this.loading = false;
      });
  }


 

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;

  }
  tokeno: any;
  comid: any;
  checkthevalue(com) {
    this.tokeno = com.param2;
    this.comid = com.param1;

  }

  ComplaintDeletefunction() {

    var isValid = true;
    var deleteremark = $('#complaintdelremark').val();
    this.deleteText = deleteremark.substring(0, 1).toUpperCase() + deleteremark.substring(1);

    // Validate Contact Name
    if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      // $('#msg_error_delete').html('Please Enter Remark').show();
      $('#msg_error_delete').html('Please Enter Remark').show();
      $('#complaintdelremark').focus();
      setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        param1: this.deleteText,
        // param2:this.comid,
        // param3:this.tokeno,
        param2: this.tokeno,          //complaint id
        param3: this.comid,              // id
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }
      //    try { AddLoader() } catch (e) { alert(e) }


      try { AddLoader() } catch (e) { alert(e) }
      this.complaintService.DeleteComplaint(dataL).subscribe((data) => {

        try { RemoveLoader() } catch (e) { alert(e) }
        //      try { RemoveLoader() } catch (e) { alert(e) }

        this.datafromrespo = data.entity;
        var msg = this.datafromrespo;
        // if(this.datafromrespo == 'Successfully Saved.')
        if (data.statuscode == 200) {
          SuccessAlert(msg);
          this.deleteText = "";
          this.ComplaintDetail();
          $('#myModalwizard').modal('hide');
          $('#modeldelete').modal('hide');
          $('.modal-backdrop.show').css('display', 'none');
        }
        else {
          errorAlert(msg);
          this.deleteText = "";
          this.closemodal();
        }
      });

    }
  }
  statusObj:any;
  getStatusId()
  {
   
    this.statusName = this.statusObj.param2;
  
  }
  remarkTextaction: string;
  ComplaintActionfunction() {

    var isValid = true;
    var actionremark = $('#actionupdate').val();
    this.actionupdateText = actionremark.substring(0, 1).toUpperCase() + actionremark.substring(1);
    var remark = $('#Remarkactionupdate').val();

    if (!actionremark && actionremark.length <= 0) {
      isValid = false;
      $('#msg_regaddentry').html('Please Enter Action Description').show();
      $('#actionupdate').focus();
      setTimeout(function () { document.getElementById("msg_regaddentry").style.display = "none"; }, 3000);
    } else
      if (!this.statusName && this.statusName.length <= 0) {

        $('#msg_StatusName').html('Please Select Complaint Status').show();
        $('#statusid').focus();
        setTimeout(function () { document.getElementById("msg_StatusName").style.display = "none"; }, 3000);

      }
      else

        if (!remark && remark.length <= 0) {
          isValid = false;
          $('#msg_errorupdatetype').html('Please Enter Remark').show();
          $('#Remarkactionupdate').focus();
          setTimeout(function () { document.getElementById("msg_errorupdatetype").style.display = "none"; }, 3000);

        }
        else {
          let dataL = {
            param1: this.remarkTextaction,
            // param2:this.comid,
            // param3:this.tokeno,
            param2: this.tokeno,          //complaint id
            param3: this.comid,              // id
            param4: this.actionupdateText,
            param5: this.statusName,
            pageID: "12",
            pageName: this.encryptedpageNameValue,
            pageURL: this.encryptedpageUrlValue

          }
          try { AddLoader() } catch (e) { alert(e) }


          this.complaintService.ActionTakenAPI(dataL).subscribe((data) => {
            try { RemoveLoader() } catch (e) { alert(e) }


            this.datafromrespo = data.entity;
            var msg = this.datafromrespo;
            // if(this.datafromrespo == 'Successfully Saved.')
            if (data.statuscode == 200) {
              SuccessAlert(msg);
              
              this.ngOnInit();
              this.clear();
           
              $('#myModalwizard').modal('hide');
              $('.modal-backdrop.show').css('display', 'none');
            }
            else {
              errorAlert(msg);
            }
          });

        }
  }
  closemodal() {
    this.deleteText = "";
    $('#modeldelete').modal('hide');


  }


  excelData: any = [];
  PrepareExcelData(data) {
    this.excelData = [];

    if (this.userKey == '10' || this.userKey == '11' || this.userKey == '16' || this.userKey == '21') {
      for (var i = 0; i < data.length; i++) {
        try {
          var obj = {

            "#": i + 1,
            "Token No": data[i].param2,
            "Complaint Against": data[i].param3,
            "Customer Name": data[i].param14,
            "Mobile No.": data[i].param15,

            "Complaint": data[i].param4,
            
            "Complaint Date": data[i].param8,
            "Action Taken": data[i].param10,
         
            "Duration": data[i].param18,
            "Status": data[i].param11,


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
            "Token No": data[i].param2,
            "Complaint Against": data[i].param3,
            "Complaint": data[i].param4,
       
            "Complaint Date": data[i].param8,
            "Action Taken": data[i].param10,
      
            "Duration": data[i].param18,
            "Status": data[i].param11,


          }
        } catch (e) { }
        this.excelData.push(obj1);
      }
    }
  }

  exportToExcel() {
    this.ComplaintDetail1();
    // this.PrepareExcelData(this.complaintDetailsArray1);
    this.excelservice.ExportExcel(this.excelData, 'Customer Complaint Details', 'complaintdetails');
  }



  clear() {
    this.actionupdateText = ""; this.remarkTextaction = ""; this.statusName = "";this.statusObj="";this.statusName="";
  }
  config2 = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 100,
    height: '200px',
  };
  ComplaintDetail() {
    
    this.loading = true;
    let keydata = {
     param1: "",
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter.trim(),
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
     try { AddLoader() } catch (e) { alert(e) }
  this.complaintService.ComplaintDetail(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
     let count1 = data.entity.count;
      if(count1 == "0")
      {
        this.complaintDetailsArray = [];
        this.count = 0;
        this.viewcount = 0;
      }else{
        this.complaintDetailsArray = data.entity.responsedatalist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
  this.ComplaintDetail1();
      }
     
    });
 
  }

  searchdata() {
    this.pageNumber = 1;
    this.ComplaintDetail();
  }


  SelectRows() {
    this.pageNumber = 1;
    this.ComplaintDetail();
  }

  Refreshfunction() {
    this.pageNumber = 1;
    this.itemsPerPage = 10;
    this.filter = '';
    this.ComplaintDetail();
  }

  ComplaintpageChanged(event) {
   this.p = event;
this.pageNumber = this.p;
 this.ComplaintDetail();
}
pageNumber:number=0;
}

