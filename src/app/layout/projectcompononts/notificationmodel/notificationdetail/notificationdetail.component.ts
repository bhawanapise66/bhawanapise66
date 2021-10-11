import { ExportToExcelService } from './../../services/export-to-excel.service';
import { PdfService } from './../../services/pdf.service';
import { CryptService } from './../../services/crypt.service';
import { NotificationmodelService } from './../../../../APIService/notificationmodel.service';
import { Paramcls } from './../../../../../paramcls';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import * as moment from 'moment';
import * as xlsx from 'xlsx';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-notificationdetail',
  templateUrl: './notificationdetail.component.html',
  styleUrls: ['./notificationdetail.component.css']
})
export class NotificationdetailComponent implements OnInit {
 
  @ViewChild('epltable',{ static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  timer:any;
  pageUrl = this.router.url;
  private _success = new Subject<string>();  successMessageUpdate: string;
  public loading = false; p: number;   pagecount:number=10; count:number; viewcount:number;
  key: string = 'name'; reverse: boolean = true;
  CustRemarktext:string; filter:string; notificationdeleteText:string; datafromrespo:string;


  cust_email:string; cust_mobno:string; cust_state:any; cust_city:any; cust_alt_mobno:string; 
   reg_makename:string; pin_code:string;  // change by KJ
  customer_id:string;

  // ListOfDistributor$:Object;ListOfDealer$:Object;ListOfState$:Object;ListOfCity$:Object;CustomerDetails$:Object; ListOfCustomerType$:Object;  ListOfCustomerCategory$:Object;


  //NgModel Change by KJ
  

   

  
  // config = {
  //   displayKey: "param2", // if objects array passed which key to be displayed defaults to description
  //   search: true,
  //   limitTo: this.count,
  //   height: '200px',
  // };
  constructor(public excelservice: ExportToExcelService, public pdfservice: PdfService,private modalService: NgbModal,private flashMessage: FlashMessagesService ,private cryptService:CryptService,private router:Router, private notificationService:NotificationmodelService) { }

  ngOnInit(){
    /* ------------------------------- Wizards start Ts------------------------------------------------- */

    this.count = 0;
    this.viewcount = 0;
   
    (function ($) {
      $(document).ready(function () {

        /* calander single  picker ends */
        $('.datepicker').daterangepicker({
          singleDatePicker: true,
          minDate:new Date(),
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

        function cb(start, end) {
          $('#daterangeadminux2 span').html(start.format('YYYY-MM-DD') + 'to' + end.format('YYYY-MM-DD'));
        }

        $('#daterangeadminux2').daterangepicker({
          startDate: start,
          endDate: end,
          opens: 'left',
          maxDate: new Date()
        }, cb);

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
   (jQuery);
    this.EncryptPageName();
    this.EncryptPageUrl();
    this.NotificationDetail();
 
/* ------------------------------- Wizards end Ts------------------------------------------------- */
  }






  //Done By KJ
  EncryptPageName() {
    this.cryptService.encrypt("Notification Detail Management")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
  //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }

  // Done By KJ
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }

 
  // Done by KJ
  editpageform(){
    document.getElementById("backdetailsbtn").style.display="block";
    document.getElementById("editbtn").style.display="none";
    // document.getElementById("customerdtls").style.display="none";
    // document.getElementById("bankdtls").style.display="none";
    document.getElementById("vendordtls").style.display="none";
  //  document.getElementById("rev2btn").style.display="none";
  //  document.getElementById("revbtn").style.display="none";
  //  document.getElementById("nextviewbtn").style.display="none";
  //  document.getElementById("next2viewbtn").style.display="none";
    document.getElementById("container").style.display="block";
    document.getElementById("modelfooter").style.display="block";
    document.getElementById("uvmd").style.display="block";
    document.getElementById("vmd").style.display="none";
 
  }

  // Done by KJ
  backdetailsbtn(){
    document.getElementById("uvmd").style.display="none";
    document.getElementById("vmd").style.display="block";
    document.getElementById("backdetailsbtn").style.display="none";
    document.getElementById("editbtn").style.display="block";
    // document.getElementById("customerdtls").style.display="block";
    // document.getElementById("bankdtls").style.display="block";
    document.getElementById("vendordtls").style.display="block";
    document.getElementById("modelfooter").style.display="none";
  //  document.getElementById("rev2btn").style.display="none";
  //  document.getElementById("revbtn").style.display="none";
  //  document.getElementById("nextviewbtn").style.display="block";
  //  document.getElementById("next2viewbtn").style.display="none";
    document.getElementById("container").style.display="none";
  //  document.getElementById("bankdtls").style.display="none";
  //  document.getElementById("customerdtls").style.display="none";
  }

  notificationDetail$:Object;
  
 
  notification_id:string;
  notification_title1:string;
  notification_msg1:string;
  notification_desc1:string;
  notificationStatus1:string;
  notificationFor1:string;  
  Validity:string;
 
  Mobile1: boolean = false;
  Web1: boolean = false;
setdata(com:Paramcls){
  this.notification_id=com.param1;
 this.notification_title1=com.param2;
 this.notification_msg1=com.param3;
  this.notification_desc1=com.param4;
 this.notificationStatus1=com.param5;
 this.notificationFor1=com.param6;  
  this.Validity=com.param7;
  if(this.notificationFor1 == "Both")
  {
     this.Mobile1=true;
     this.Web1=true;
  }
  if(this.notificationFor1 == "Mobile")
  {
    this.Mobile1=true;
    this.Web1=false;
  }
  if(this.notificationFor1 == "Web")
  {
    this.Web1=true;
    this.Mobile1=false;
  }
 this.backdetailsbtn();
}  
itemsPerPage:number=10;


radioSelectednotification: any = "";
onItemChange(e) {
  this.notificationStatus1 = e.target.value;
 
}

vensaveeditbtn3(){

  var isValid = true;
  var titletxtid = $('#title_id1').val();

  var msgtxtid = $('#message_id1').val();

  var destxtid = $('#description_id1').val();

  var datetxtid = $('#datevalid').val();

  if (this.Mobile1 == true) {
    
    this.notificationFor1= $('#mobile_id').val();}
  if (this.Web1 == true) {
  
    this.notificationFor1=$('#web_id').val();
  }
  if (this.Mobile1 == true && this.Web1 == true) {
   
    this.notificationFor1="Both";
  }


 
  if (!titletxtid && titletxtid.length <= 0) {
    isValid = false;
    $('#msg_errorentry_notification1').html('Please Enter Notification Title').show();
    $('#title_id1').focus();
    setTimeout(function () { document.getElementById("msg_errorentry_notification1").style.display = "none"; }, 3000);
  }else if (datetxtid == "") {
          
    isValid = false;
    $('#msg_errorentry_notification1').html('Please Enter Notification Valid Upto Date').show();
    $('#datevalid').focus();
    setTimeout(function () { document.getElementById("msg_errorentry_notification1").style.display = "none"; }, 3000);
  }
  else
  
    if (!msgtxtid && msgtxtid.length <= 0) {
   
      isValid = false;
      $('#msg_errorentry_notification1').html('Please Enter Notification Message').show();
      $('#message_id1').focus();
      setTimeout(function () { document.getElementById("msg_errorentry_notification1").style.display = "none"; }, 3000);
    }
    else
    
      if (!destxtid && destxtid.length <= 0) {
     
        isValid = false;
        $('#msg_errorentry_notification1').html('Please Enter Notification Description').show();
        $('#description_id1').focus();
        setTimeout(function () { document.getElementById("msg_errorentry_notification1").style.display = "none"; }, 3000);
      }
      else
        
        if (this.notificationStatus1 == "") {
       
          isValid = false;
          $('#msg_errorentry_notification1').html('Please Enter Status Field').show();
          setTimeout(function () { document.getElementById("msg_errorentry_notification1").style.display = "none"; }, 3000);
        }
        else
        
          if (this.Mobile1 != true && this.Web1 != true) {
        
            isValid = false;
            $('#msg_errorentry_notification1').html('Please Enter Notification For Field').show();
            setTimeout(function () { document.getElementById("msg_errorentry_notification1").style.display = "none"; }, 3000);
          }
    else{
      this.notification_title1 = this.notification_title1.substring(0, 1).toUpperCase() + this.notification_title1.substring(1);
      this.notification_msg1 = this.notification_msg1.substring(0, 1).toUpperCase() + this.notification_msg1.substring(1);
      this.notification_desc1 = this.notification_desc1.substring(0, 1).toUpperCase() + this.notification_desc1.substring(1);

    let dataL = {
      param1:"",
      param2:this.notification_id,  
      param3:this.notification_title1,
      param4:this.notification_msg1, 
      param5:this.notification_desc1,
      param6:this.notificationStatus1,
      param7:this.notificationFor1,
      param8:datetxtid,
      pageID: "7",
       pageName: this.encryptedpageNameValue,
       pageURL: this.encryptedpageUrlValue
        }
        try{AddLoader()}catch(e){alert(e)}

    this.notificationService.UpdateNotificationEditAPI(dataL).subscribe((data)=>{
      try{RemoveLoader()}catch(e){alert(e)}

       
      this.datafromrespo = data.entity;
      this.datastatuscode = data.statuscode;
        
      if(this.datastatuscode == '200')
        {
            $("#successmodel").modal('show');
          
            this.ngOnInit();
            this.closemodal();
           // $("#myModalwizard").modal('hide');

        }
        else
        {
           $("#notifymodel").modal('show');
        }
        
    });
       
 }   

      
      
      }












  

 

  NotificationDetail() {
     this.loading = true; 
    this.p = 1; 
    this.pagecount=10;
    this.itemsPerPage=this.pagecount;

   let keydata = {
      pageNo:this.p,
      itemsPerPage:this.pagecount,    
      searchBy: "", 
      searchType:"",
      totalRecords:"NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try{AddLoader()}catch(e){alert(e)}

     // Distributor Detail Grid BIND LIST    
     this.notificationService.NotificationDetailsAPI(keydata).subscribe(
      (data)  => {
        try{RemoveLoader()}catch(e){alert(e)}

        let resdatalist = data.entity.list; 
     let vendorlist = resdatalist;
     
         this.notificationDetail$ = vendorlist;
         this.count = data.entity.count;
         this.viewcount = data.entity.viewCount;
     
         this.loading = false; 
      });
      this.NotificationDetail1();

}

notificationDetail1$:any;

NotificationDetail1() {
  this.loading = true; 
 this.p = 1; 
let keydata = {
   pageNo:this.p,
   itemsPerPage:"",    
   searchBy: "", 
   searchType:"",
   totalRecords:"NA",
   pageID: "7",
   pageName: this.encryptedpageNameValue,
   pageURL: this.encryptedpageUrlValue
 }
 try{AddLoader()}catch(e){alert(e)}

  // Distributor Detail Grid BIND LIST    
  this.notificationService.NotificationDetailsAPI(keydata).subscribe(
   (data)  => {
    try{RemoveLoader()}catch(e){alert(e)}

     let resdatalist = data.entity.list; 
  let vendorlist = resdatalist;
  
      this.notificationDetail1$ = vendorlist;
    this.PrepareExcelData( this.notificationDetail1$);
      this.loading = false; 
   });
}

/*---------------- cunstomer details function end  --------------------*/
/*---------------Customer search start --------------------------*/

searchdata(){
  var search = $('#searchData').val();
  this.loading = true; 
        
  this.p = 1; 
  //this.pagecount = 5;

  this.itemsPerPage=this.pagecount;

  let keydata = {
    pageNo:this.p,
    itemsPerPage:this.pagecount,    
    searchBy: search, 
    searchType:"",
    totalRecords:"NA",
    pageID: "7",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
  }
  
   // Distributor Detail Grid BIND LIST    
   try{AddLoader()}catch(e){alert(e)}

   this.notificationService.NotificationDetailsAPI(keydata).subscribe(
    (data)  => {
      try{RemoveLoader()}catch(e){alert(e)}

      let resdatalist = data.entity.list; 
  

       let vendorlist = resdatalist;
     
       this.notificationDetail$ = vendorlist;
       this.count = data.entity.count;
       this.viewcount = data.entity.viewCount;
       this.loading = false; 
    });
}



SelectRows(){
  
  var search = $('#searchData').val();
  var selectrow = $('#selectrow32').val();
 
  this.loading = true; 
     
  this.p = 1;
   this.pagecount =selectrow;
   this.itemsPerPage=this.pagecount;

  
  let keydata = {
    pageNo:this.p,
    itemsPerPage:selectrow,    
    searchBy: search, 
    searchType:"",
    totalRecords:"NA",
    pageID: "7",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
  }
  
   // Distributor Detail Grid BIND LIST
   try{AddLoader()}catch(e){alert(e)}
    
   this.notificationService.NotificationDetailsAPI(keydata).subscribe(
    (data)  => {
      try{RemoveLoader()}catch(e){alert(e)}

      let resdatalist = data.entity.list; 
   

       let vendorlist = resdatalist;
     
       this.notificationDetail$ = vendorlist;
       this.count = data.entity.count;
       this.viewcount = data.entity.viewCount;
     
       this.loading = false; 
    });
}


 

Refreshfunction(){
  this.loading = true; 
        
  this.p = 1; 
  this.filter="";
 this.ngOnInit();
 }

/*------------------Search End ---------------------*/

 createPDF()  {
  let pdfTableData;
  let dataArray = []
  for (let i = 0; i < this.notificationDetail1$.length; i++) {
     pdfTableData = {
       "#":  this.notificationDetail1$[i]["rowNumber"],
      "Title": this.notificationDetail1$[i]["param2"],
      "Message": this.notificationDetail1$[i]["param3"],
      "Description": this.notificationDetail1$[i]["param4"],
      "Status": this.notificationDetail1$[i]["param5"],
      "For": this.notificationDetail1$[i]["param6"],
      "Valid Upto": this.notificationDetail1$[i]["param7"]
    }
    dataArray.push(pdfTableData)
  };
  this.pdfservice.CreatePDFData(dataArray,"Notification Details");  

}
excelData:any=[];
  PrepareExcelData(data) {
    this.excelData = [];

    for (var i = 0; i < data.length; i++) {
      try {
        var obj = {

          "#": i + 1,
          "Title": data[i].param2,
          "Message": data[i].param3,
          "Description": data[i].param4,
          "Status": data[i].param5,
         "For": data[i].param6,
          "Valid Upto": data[i].param7,
         
        }
      } catch (e) { }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    this.NotificationDetail1();
    // this.PrepareExcelData(this.notificationDetail1$);
    this.excelservice.ExportExcel(this.excelData, 'Notification Details', 'notificationdetails');

  }
 NotificationpageChanged(event){
  
  var selectrow = $('#selectrow32').val();
  this.p = event;
   this.pagecount =selectrow;
   this.itemsPerPage=this.pagecount;

   let keydata = {
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
   try{AddLoader()}catch(e){alert(e)}
   
   this.notificationService.NotificationDetailsAPI(keydata).subscribe(
    (data)  => {
 
      try{RemoveLoader()}catch(e){alert(e)}


      let resdatalist = data.entity.list; 
   

       let vendorlist = resdatalist;
     
       this.notificationDetail$ = vendorlist;
       this.count = data.entity.count;
       this.viewcount = data.entity.viewCount;
       
       this.loading = false; 
    });
 }
 sort(key){
 this.key = key;
 this.reverse = !this.reverse;
 
}


datastatuscode:string;
NotificationDeletefunction(){
  var isValid = true; 
  var deleteremark = $('#notificationdelremark').val();
  deleteremark = deleteremark.substring(0, 1).toUpperCase() + deleteremark.substring(1);

  if(!deleteremark && deleteremark.length <= 0){
   isValid = false;
   $('#msg_error_notifydelete').html('Please Enter Remark').show();
  //  this._success.next('Please Enter Remark.'); 
   $('#notificationdelremark').focus();
 }
 else
 { 
  let dataL = {
    param1:deleteremark,
    param2:this.notification_id,
    pageID: "7",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
   
      }
      try{AddLoader()}catch(e){alert(e)}

      this.notificationService.DeleteNotificationAPI(dataL).subscribe((data)=>{
        try{RemoveLoader()}catch(e){alert(e)}

        this.datafromrespo = data.entity;
  this.datastatuscode = data.statuscode;
    
  if(this.datastatuscode == '200')
  {
  $("#successmodel").modal('show');
  this.closemodal();
  
  this.ngOnInit();
  }
  else
  {
   $("#notifymodel").modal('show');
  }
  });
}
}


closemodal() {
  this.notificationdeleteText="";
  $("#successmodel").modal('hide');

  $('#modeldelete').modal('hide');
  $('#myModalwizard').modal('hide');

  $('.modal-backdrop.show').css('display', 'none');

}

}