import { UpdatedlogdetailsService } from '../../../APIService/updatedlogdetails.service';
import { Router } from '@angular/router';
import { CryptService } from '../services/crypt.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { DeletedetailService } from '../../../../APIService/deletedetail.service';
import { PdfService } from '../services/pdf.service';
import { ExportToExcelService } from '../services/export-to-excel.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as xlsx from 'xlsx';
declare var jQuery: any;
declare var $: any;
import { Subject } from 'rxjs';
declare var jQuery: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
import * as moment from 'moment';

@Component({
  selector: 'app-updatedlogdetails',
  templateUrl: './updatedlogdetails.component.html',
  styleUrls: ['./updatedlogdetails.component.css']
})
export class UpdatedlogdetailsComponent implements OnInit {

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  public loading = false; p: number;   pagecount:number=10; count:number; viewcount:number;
  UpdateDetailObject:any=[];
  pageUrl = this.router.url;
  key: string = 'name'; reverse: boolean = true;
  fromDate1:any;toDate1:any;toDate11:any;
  constructor(public excelservice: ExportToExcelService, public pdfservice: PdfService,private updatelogService:UpdatedlogdetailsService, 
    private modalService: NgbModal, private flashMessage: FlashMessagesService, 
    private cryptService: CryptService, private router: Router) {
    this.initialdate();
   }


  ngOnInit() {
    this.count = 0;
    this.viewcount = 0;

    $('.timepicker').timepicki();
    // timepicker ends
    // datepicker starts
    (function ($) {
      $(document).ready(function () {
9
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
    this.EncryptPageName();
    this.EncryptPageUrl();
    this.UpdateDetail();   
    this.UpdateDetail1();     
  }
  //Done By KJ
  EncryptPageName() {
    this.cryptService.encrypt("Updated log detail")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
  //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }

  // Done By KJ
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }
  
  UpdateDetail1() {
  
this.loading = true; 

  
    let keydata = {
      param3: this.fromDate1,
      param4: this.toDate11,
      pageNo:"",
      itemsPerPage:"",    
      searchBy: "", 
      searchType:"",
      totalRecords:"NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    
     // Distributor Detail Grid BIND LIST  
     
try { AddLoader() } catch (e) { alert(e) }  
     this.updatelogService.UpdateDetailsAPI(keydata).subscribe(
      (data)  => {
      
try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.responsedatalist; 
       //  this.resdata = 
       // console.log("wekcome_ "+resdata);
 
         let vendorlist = resdatalist;
     
         this.UpdateDetailObjectarray = vendorlist;
     
         this.PrepareExcelData(this.UpdateDetailObjectarray);
     
         this.loading = false; 
      });
}
selectDateArray: string[];fromDate: string=""; toDate: string="";UpdateDetailObjectarray:any=[];

initialdate()
  {
    this.toDate1 = new Date();
    // this.toDate11 = this.toDate1.getDate() + '-' + (this.toDate1.getMonth()+1) + '-' +  this.toDate1.getFullYear();
    this.toDate11 = this.toDate1.getFullYear() + '-' + (this.toDate1.getMonth()+1) + '-' +  this.toDate1.getDate();
 
    this.toDate1.setDate(this.toDate1.getDate()-1);
     //this.fromDate1=this.fromDate1.setDate(this.fromDate1.getDate()-1);
    this.fromDate1= this.toDate1.getFullYear() + '-' + (this.toDate1.getMonth()+1) + '-' +  this.toDate1.getDate();
   
  }
Dateselect()
{
  const inputElement = document.getElementById('daterange').innerHTML;
  //alert(""+inputElement);
      this.selectDateArray = inputElement.split(' to ', 2);
      this.fromDate = this.selectDateArray[0];
      this.toDate = this.selectDateArray[1];
      this.fromDate1= this.fromDate;
      this.toDate11= this.toDate;
      this.UpdateDetail();this.UpdateDetail1();
}
UpdateDetail() {
   
this.loading = true; 
 // console.log(this.fromDate);    console.log(this.toDate);
this.p = 1;
this.pagecount = 10;
//  console.log("p" + this.p);
// var selectrow = $('#selectrow9').val();
this.itemsPerPage=this.pagecount;
//this.pagecount = this.itemsPerPage;

let keydata = {
  param3: this.fromDate,
  param4: this.toDate,
  pageNo:this.p,
  itemsPerPage:this.pagecount,    
  searchBy: "", 
  searchType:"",
  totalRecords:"NA",
  pageID: "7",
  pageName: this.encryptedpageNameValue,
  pageURL: this.encryptedpageUrlValue
}

 // Distributor Detail Grid BIND LIST   
 
try { AddLoader() } catch (e) { alert(e) } 
 this.updatelogService.UpdateDetailsAPI(keydata).subscribe(
  (data)  => {
  
try { RemoveLoader() } catch (e) { alert(e) }
    let resdatalist = data.entity.responsedatalist; 
   //  this.resdata = 
   // console.log("wekcome_ "+resdata);

     let vendorlist = resdatalist;
 
     this.UpdateDetailObject = vendorlist;
     this.count = data.entity.count;
     this.viewcount = data.entity.viewCount;
     //this.UpdateDetail1();
  //   console.log(this.count);
     this.loading = false; 
  });
  
}
filter:any;
searchdata(){
var search = $('#searchData').val();
this.loading = true; 
    
this.p = 1; 
//this.pagecount = 5;
//  console.log("p" + this.p);

let keydata = {
  param3: this.fromDate,
  param4: this.toDate,
pageNo:this.p,
itemsPerPage:this.pagecount,    
searchBy: search, 
searchType:"",
totalRecords:"NA",
pageID: "7",
pageName: this.encryptedpageNameValue,
pageURL: this.encryptedpageUrlValue
}

try { AddLoader() } catch (e) { alert(e) }
// Distributor Detail Grid BIND LIST    
this.updatelogService.UpdateDetailsAPI(keydata).subscribe(
(data)  => {

try { RemoveLoader() } catch (e) { alert(e) }
  let resdatalist = data.entity.responsedatalist; 


   let vendorlist = resdatalist;
 
   this.UpdateDetailObject = vendorlist;
   this.count = data.entity.count;
   this.viewcount = data.entity.viewCount;
   this.loading = false; 
});
}
itemsPerPage:number=10;
SelectRows(){

var search = $('#searchData').val();
var selectrow = $('#selectrow19').val();
//alert(selectrow);
this.loading = true; 
this.itemsPerPage=selectrow;
this.pagecount = this.itemsPerPage;

this.p = 1; 



let keydata = {
  param3: this.fromDate,
  param4: this.toDate,
pageNo:this.p,
itemsPerPage:this.pagecount,    
searchBy: search, 
searchType:"",
totalRecords:"NA",
pageID: "7",
pageName: this.encryptedpageNameValue,
pageURL: this.encryptedpageUrlValue
}

try { AddLoader() } catch (e) { alert(e) }
// Distributor Detail Grid BIND LIST    
this.updatelogService.UpdateDetailsAPI(keydata).subscribe(
(data)  => {

try { RemoveLoader() } catch (e) { alert(e) }
  let resdatalist = data.entity.responsedatalist; 


   let vendorlist = resdatalist;
 
   this.UpdateDetailObject = vendorlist;
   this.count = data.entity.count;
   this.viewcount = data.entity.viewCount;
 
   this.loading = false; 
});
}

Refreshfunction(){
this.loading = true; 
this.filter="";       
this.p = 1; 
this.fromDate = "";
this.toDate = "";
this.initialdate();

this.UpdateDetail();
}

/*------------------Search End ---------------------*/


createPDF()  {
  this.UpdateDetail1();
let pdfTableData;
let dataArray = []

for (let i = 0; i < this.UpdateDetailObjectarray.length; i++) {
  pdfTableData = {
    "#":  this.UpdateDetailObjectarray[i]["rowNumber"],
   "Role Name": this.UpdateDetailObjectarray[i]["param9"],
   "Master Page Name": this.UpdateDetailObjectarray[i]["param3"],
   "Name": this.UpdateDetailObjectarray[i]["param8"],

   "Updated Date": this.UpdateDetailObjectarray[i]["param5"],
   "Remark": this.UpdateDetailObjectarray[i]["param7"],

   "Values updated": this.UpdateDetailObjectarray[i]["param4"],

 }
dataArray.push(pdfTableData)
};
this.pdfservice.CreatePDFData(dataArray,"Updated Log Details");  

}

UpdatepageChanged(event){
this.p = event;
var search = $('#searchData').val();
var selectrow= $("#selectrow19").val();
this.itemsPerPage=selectrow;
this.pagecount = this.itemsPerPage;

let keydata = {
  param3: this.fromDate,
  param4: this.toDate,
pageNo:this.p,
itemsPerPage:this.pagecount,
searchBy: search, 
searchType:"",
totalRecords:"NA",
pageID: "7",
pageName: this.encryptedpageNameValue,
pageURL: this.encryptedpageUrlValue
}

try { AddLoader() } catch (e) { alert(e) }
// Distributor Detail Grid BIND LIST    
this.updatelogService.UpdateDetailsAPI(keydata).subscribe(
(data)  => {

try { RemoveLoader() } catch (e) { alert(e) }
//  console.log(data.entity)
  // console.log("wekcome_ "+data);
  let resdatalist = data.entity.responsedatalist; 
 //  this.resdata = 
 // console.log("wekcome_ "+resdata);

   let vendorlist = resdatalist;
 
   this.UpdateDetailObject = vendorlist;
   this.count = data.entity.count;
   this.viewcount = data.entity.viewCount;
   
   this.loading = false; 
});
}
sort(key){
this.key = key;
this.reverse = !this.reverse;

}

  excelData:any=[];
  PrepareExcelData(data){
   this.excelData=[];
   
   for (var i = 0; i < data.length; i++) {
    try {
      var obj = {
       "#": i + 1,
        "Role Name": data[i].param9,
        "Master Page Name": data[i].param3,
        "Name": data[i].param8,

        "Updated Date": data[i].param5,
        "Remark": data[i].param7,

        "Values updated": data[i].param4,

      }
    } catch (e) { }
    this.excelData.push(obj);
  }
  } 
  
  exportToExcel() {
    this.UpdateDetail1();
   this.excelservice.ExportExcel(this.excelData,'Updated Log Details','updatedlogdetails');
  } 


}
