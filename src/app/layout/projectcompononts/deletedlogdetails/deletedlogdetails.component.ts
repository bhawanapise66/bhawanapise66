
import { DeletedlogdetailsService } from './../../../APIService/deletedlogdetails.service';
import { Router } from '@angular/router';
import { CryptService } from './../services/crypt.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NetworkmodelService } from './../../../APIService/networkmodel.service';
import { PdfService } from './../services/pdf.service';
import { ExportToExcelService } from './../services/export-to-excel.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import * as xlsx from 'xlsx';
declare var jQuery: any;
declare var $: any;
import { Subject } from 'rxjs';
declare var jQuery: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
import * as moment from 'moment';

@Component({
  selector: 'app-deletedlogdetails',
  templateUrl: './deletedlogdetails.component.html',
  styleUrls: ['./deletedlogdetails.component.css']
})
export class DeletedlogdetailsComponent implements OnInit {

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;
  key: string = 'name'; reverse: boolean = true;

  public loading = false; p: number; pagecount: number=10; count: number; viewcount: number;
  SelectPageText: string; PlaceOrderDetails$: Object; remarkText: string; deleteText: string; filter: any;

  DivisionupdateText: string; descriptionupdateText: string; employeeupdateText: string; mobilenoupdateText: string;
  dividionidupdate: string;
  officialemailupdateText: string; DesignationupdateText: string;
  DivisionDetails$: Object
  datafromrespo: string;
  itemsPerPage: number = 10;
  toDate1:any; toDate11:any;fromDate1:any;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
   // limitTo: this.count,
   height: '200px',
  };
  private _success = new Subject<string>(); successMessageUpdate: string;

  constructor(public excelservice: ExportToExcelService, public pdfservice: PdfService, private deletemodelService:DeletedlogdetailsService, 
    private modalService: NgbModal, private flashMessage: FlashMessagesService, private cryptService: CryptService, private router: Router) { 
   this. initialdate();
  }

  ngOnInit() {
    /* ----------------------------------- Wizards start Ts------------------------------------------------- */
    this.count = 0;
    this.viewcount = 0;

    $('.timepicker').timepicki();
    // timepicker ends
    // datepicker starts
    (function ($) {
      $(document).ready(function () {

        /* calander single  picker ends */
        $('.datepicker').daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          minYear: 1901
        }, function (start, end, label) { });

        $('.datepicker').on('show.daterangepicker', function (ev, picker) {
          var thisdp = $('.daterangepicker');
          setTimeout(function () {
            thisdp.addClass('active');
          }, 100);
        });
        $('.datepicker').on('hide.daterangepicker', function (ev, picker) {
          var thisdpc = $('.daterangepicker');
          thisdpc.removeClass('active');

        });
        /* calander single picker ends */

        /* calander picker */
        var start = moment().subtract(29, 'days');
        var end = moment();


        this.initialDate = start;
        this.endDate = end;
        function cb(start, end) {
          // $('#daterangeadminux2 span').html(start.format('MMM D, YY') + ' - ' + end.format('MMM D, YY'));
          $('#daterangeadminux2 span').html(start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        }

        $('#daterangeadminux2').daterangepicker({
          startDate: start,
          endDate: end,
          opens: 'left',
          maxDate: new Date(),
          dateLimit: { months: 1 }
        }, cb);

        // this.initialDate =  $('#daterangeadminux2 span').html(start.format('MMM D, YY')).stringify() ;

        cb(start, end);
        $('#daterangeadminux2').on('show.daterangepicker', function (ev, picker) {
          var thisdp = $('.daterangepicker');
          setTimeout(function () {
            thisdp.addClass('active');
          }, 100);
        });
        var path = 'assets/images/background-part.png';
        $('.daterangepicker').append('<div class="background" style="background-image: url(' + path + '); z-index:-1; height:80px;"><img src="assets/images/background-part.png" alt="" style="display:none"></div>')
      });

    })(jQuery);
    //  datepicker ends
    this.EncryptPageName();
    this.EncryptPageUrl();
    this.DeleteDetail();this.DeleteDetail1();

    //  this._success.subscribe((message) => this.successMessageUpdate = message);    

    //  this._success.pipe(
    //    debounceTime(8000)
    //  ).subscribe(() => this.successMessageUpdate = null);

    /* ------------------------------- Wizards end Ts------------------------------------------------- */
  }

  EncryptPageName() {
    this.cryptService.encrypt("Deleted Log Details")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }

  initialdate()
  {
    this.toDate1 = new Date();
    // this.toDate11 = this.toDate1.getDate() + '-' + (this.toDate1.getMonth()+1) + '-' +  this.toDate1.getFullYear();
    this.toDate11 = this.toDate1.getFullYear() + '-' + (this.toDate1.getMonth()+1) + '-' +  this.toDate1.getDate();
 
    this.toDate1.setDate(this.toDate1.getDate()-1);
     //this.fromDate1=this.fromDate1.setDate(this.fromDate1.getDate()-1);
    this.fromDate1= this.toDate1.getFullYear() + '-' + (this.toDate1.getMonth()+1) + '-' +  this.toDate1.getDate();
   
  }
  // Updated by Kajal
  DeleteDetailsArray: Object;
  DeleteDetailsArray1: any=[];selectDateArray: string[];fromDate: string=""; toDate: string="";
  
  datepickmethod()
  {
        const inputElement = document.getElementById('daterange').innerHTML;
       
        this.selectDateArray = inputElement.split(' to ', 2);
        this.fromDate = this.selectDateArray[0];
        this.toDate = this.selectDateArray[1];
        this.toDate11 =  this.toDate;
        this.fromDate1 = this.fromDate;
        this.DeleteDetail();this.DeleteDetail1();
  }
  
  DeleteDetail() {

    this.loading = true; 
 this.p = 1;
     this.pagecount = 10;
 
    this.itemsPerPage=this.pagecount;
    let keydata = {
      // param1: this.divisiondetail["param1"],
      param3: this.fromDate,
      param4: this.toDate,
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
   try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.deletemodelService.DeleteDetailsAPI(keydata).subscribe(
      (data) => {
       try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.responsedatalist;
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);

        let vendorlist = resdatalist;

        this.DeleteDetailsArray = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
      //  this.DeleteDetail1();

        this.loading = false;
      });  
      


  }
 

  DeleteDetail1() {
   
    this.loading = true;

    //this.pagecount = 5;
  

    let keydata = {
      // param1: this.divisiondetail["param1"],
      param3: this.fromDate1,
      param4: this.toDate11,
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
    // Distributor Detail Grid BIND LIST    
    this.deletemodelService.DeleteDetailsAPI(keydata).subscribe(
      (data) => {
       try { RemoveLoader() } catch (e) { alert(e) }
       if(data.statuscode == '200')
       {
        let resdatalist = data.entity.responsedatalist;
       

        let vendorlist = resdatalist;

        this.DeleteDetailsArray1 = vendorlist;
        this.PrepareExcelData(this.DeleteDetailsArray1);
       }
     
      
        this.loading = false;
      });
  }



// Updated by Kajal
  Refreshfunction() {
    this.loading = true;

    this.p = 1;
    this.filter=""; 
   this.fromDate="",
   this.toDate="",
   this. initialdate();
    this.DeleteDetail();this.DeleteDetail1();
    
  }
 

  createPDF()  {
    this.DeleteDetail1();
    let pdfTableData;
    let dataArray = []
    for (let i = 0; i < this.DeleteDetailsArray1.length; i++) {
       pdfTableData = {
         "#":  this.DeleteDetailsArray1[i]["rowNumber"],
        "Role Name": this.DeleteDetailsArray1[i]["param9"],
        "Master Page Name": this.DeleteDetailsArray1[i]["param3"],
        "Name": this.DeleteDetailsArray1[i]["param8"],

        "Deleted Date": this.DeleteDetailsArray1[i]["param5"],
        "Remark": this.DeleteDetailsArray1[i]["param7"],

        "Values deleted": this.DeleteDetailsArray1[i]["param4"],

      }
      dataArray.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(dataArray,"Deleted Log Details");  
  
  }

  excelData:any=[];
  PrepareExcelData(data) {
    this.excelData = [];

    for (var i = 0; i < data.length; i++) {
      try {
        var obj = {
         "#": i + 1,
          "Role Name": data[i].param9,
          "Master Page Name": data[i].param3,
          "Name": data[i].param8,

          "Deleted Date": data[i].param5,
          "Remark": data[i].param7,

          "Values deleted": data[i].param4,

        }
      } catch (e) { }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
           this.DeleteDetail1();
    this.excelservice.ExportExcel(this.excelData, 'Deleted Log Details', 'deletedlogdetails');

  }

  // Updated by Kajal

  SelectRows() {
    var search = $('#searchData').val();
    var selectrow = $('#select22').val();
  
    this.loading = true;
 
    this.itemsPerPage=selectrow;
    this.p = 1; this.pagecount = selectrow;
   
    let keydata = {
      param3: this.fromDate,
      param4: this.toDate,
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: search,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
   try { AddLoader() } catch (e) { alert(e) }
  this.deletemodelService.DeleteDetailsAPI(keydata).subscribe(
          (data)  => {
       try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.responsedatalist;


        let vendorlist = resdatalist;
        this.DeleteDetailsArray=vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }


  searchdata() {
    var search = $('#searchData').val();
    
    this.loading = true;
    this.itemsPerPage=this.pagecount;
    this.p = 1;
    let keydata = {
       param3: this.fromDate,
      param4: this.toDate,
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: search,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
   try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.deletemodelService.DeleteDetailsAPI(keydata).subscribe(
      (data)  => {
       try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.responsedatalist;


        let vendorlist = resdatalist;

        this.DeleteDetailsArray = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }
               
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;

  }
 



  DeletepageChanged(event) {
    this.p = event;
    var selectrow = $('#select22').val();
    var search = $('#searchData').val();

     this.loading = true;
     this.itemsPerPage=selectrow;
     this.pagecount = selectrow;
  
    let keydata = {
      param3: this.fromDate,
      param4: this.toDate,
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: search,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
   try { AddLoader() } catch (e) { alert(e) }

    // Distributor Detail Grid BIND LIST    
    this.deletemodelService.DeleteDetailsAPI(keydata).subscribe(
      (data)  => {
       try { RemoveLoader() } catch (e) { alert(e) }

        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        let resdatalist = data.entity.responsedatalist;
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);

        let vendorlist = resdatalist;
        //  let resdatadev = resdata['list'];
        //  console.log(resdatadev);
        //  console.log(vendorlist);
        this.DeleteDetailsArray = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }

}
