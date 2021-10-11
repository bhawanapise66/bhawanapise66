import { UploadimageoneService } from '../Installation/upload/uploadimageone.service';
//import { UploadimageoneService } from './../../upload/uploadimageone.service';
import { HttpResponse, HttpEventType, HttpRequest  } from '@angular/common/http';
import { SimservicemasterService } from '../services/simservicemaster.service';
import { Router } from '@angular/router';
import { ListService } from './../../../../list.service';
//import { PostService } from './../../../../../post.service';
import { Paramcls } from '../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input , ElementRef, ViewChild} from '@angular/core';
//import { Component, OnInit ,  } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as moment from 'moment';
import * as $ from 'jquery';
import { CryptService } from '../services/crypt.service';
import { SimEntry } from '../simmaster/simmaster.component';
import * as xlsx from 'xlsx';

declare var jQuery: any;
declare var $: any;
declare var AddLoader:any;
declare var RemoveLoader:any;

@Component({
  selector: 'app-simbulkentry',
  templateUrl: './simbulkentry.component.html',
  styleUrls: ['./simbulkentry.component.css']
})
export class SimbulkentryComponent implements OnInit {

  sim = new SimEntry();
  @ViewChild('epltable',{ static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  key: string = 'name'; reverse: boolean = true; p: number;  pagecount:number;  
  filter:any; selectRows:string; Searchvendor:string; selectRowsText:string;
  deleteText:string; successMessageUpdate:string; datafromrespo:string;
  count:number; viewcount:number; bulkdetails:any;

  simTypeList: any[]; networkList: any[]; ListOfvendor = [];  private _success = new Subject<string>(); 

  networkObj: any; simTypeObj: any; fallBackNetObj: any; courierbyText:any; trackeridText:string; vendorText:any;
  couriernameText:string; courierdate:string; CourierReceivedate:string; receivedbydummy:string; receivedbyText:string;
  responseMessage: any;  vendorlistdata:string; courieraddressText:string; devdetail$: any;

  DeviceDetails$:Object; networklistdata:string; personmobileNo:string; courierfromText:string;
  
  pageUrl = this.router.url;
  public loading = false;  
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };

  config2 = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  options = [
    {param2: "Courier",},{param2: "By Hand",}
  ]
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  stringifiedData: any; parsedJson: any; stringifiedresponse: any; parsedJsonresponse: any;
  stringifiedDataList: any; parsedJsonList: any; simdetail$:Object; globalPDF$:any;
  nop: number; totrec: number; outorec: number; 

  constructor(private modalService: NgbModal,private flashMessage: FlashMessagesService,private listService: ListService,
     private uploadService: UploadimageoneService, private cryptService:CryptService, private router:Router,
     private devreqService: SimservicemasterService) { }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  
  getsimType() {
    this.sim.simTypeId = this.simTypeObj.param1;
    this.sim.simTypeName = this.simTypeObj.param2;
  }


  snet:string; ven:string;
  Receivedupload() {
  
   
      var filechoose = $('#filechoose').val(); 
      this.vendorlistdata = this.vendorText.param1;
      this.receivedbydummy = this.courierbyText.param2;
      this.snet = this.networkObj.param1;
      this.ven = this.vendorText.param1;
      var receivedby = $('#receivedbynameentry').val();

      var couriernm = $('#couriernameentry').val();
      var cournmid = $('#couriernameentry').val();
      var trackerid = $('#trackeridentry').val(); 
      
    
      if (!this.ven && this.ven == null) {
        $('#msg_error').html('Please Select Vendor.').show();
        $('#vendorentrydemo').focus();
        setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
      }
     
      else if (!this.receivedbydummy && this.receivedbydummy == null) {
        $('#msg_error').html('Please Select Courier By.').show();
        $('#courierbyid').focus();
        setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
      }
    else if (!this.receivedbyText && this.receivedbyText == null) {
      $('#msg_error').html('Please Enter Received By Name.').show();
      $('#receivedbynameentry').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
    }  
   
    else if(filechoose == '' || filechoose == null)   
    {
      $('#msg_error').html('Please Select Upload Excel File.').show();
      $('#simnetwork').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3500);
    }  
  else{

      var courdtid = $('#courierdateid').val();
      var courrecedtid = $('#courierreceivedateid').val(); 
      var recefrm = $('#receivedfromentry').val();   
      var permobno = $('#personmobilenumber').val();
     
      let datacourier ={

        remarks:"ok",
        simid:"",
        networkid1:this.sim.networkid,
        uploadedby:"Application",
        simtypeid:this.sim.simTypeId,
        deliverytype:this.receivedbydummy,
        couriername:"",
        dispatchdatetime:"",
        recivedatetime:courrecedtid,
        personename:receivedby,
        personemobileno:permobno,
        trackerid:"",
        vendorId:this.vendorlistdata,
        simfrom:recefrm
      }

    this.progress.percentage = 0;
 
    this.currentFileUpload = this.selectedFiles.item(0);
    try { AddLoader() } catch (e) { alert(e) }
    this.uploadService.ByHandSIMpushFileToStorage(this.currentFileUpload,datacourier).subscribe(event => {
      try { RemoveLoader() } catch (e) { alert(e) }
      if(event['status'] == true){
        this.respoofbulk = event['entity'];
        this.resptotalrecord = event['totalRecords'];
        this.respsaverecord = event['sucessCount'];
        this.respfailedrecord = event['failedCount'];
        this.clearfunction();
        document.getElementById("uploadtbldiv").style.display = "block";
        }
        else{
         
        }
    });

    this.selectedFiles = undefined;
  }
  
}

  Courierupload() {
     
     var filechoose = $('#filechoose').val(); 
     this.vendorlistdata = this.vendorText.param1;
     this.receivedbydummy = this.courierbyText.param2;
     
     this.ven = this.vendorText.param1;
     var receivedby = $('#receivedbynameentry').val();

     var couriernm = $('#couriernameentry').val();
     var cournmid = $('#courierfromentry').val();
     var trackerid = $('#trackeridentry').val();    
          
     if (!this.ven && this.ven == null) {
       $('#msg_error').html('Please Select Vendor.').show();
       $('#vendorentrydemo').focus();
       setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
     }
     else if (!this.receivedbydummy && this.receivedbydummy == null) {
     $('#msg_error').html('Please Select Courier By.').show();
     $('#courierbyid').focus();
     setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
   }
   else if (!receivedby && receivedby == null) {
     $('#msg_error').html('Please Enter Received By Name.').show();
     $('#receivedbynameentry').focus();
     setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
   }     
   else if (couriernm=='' && couriernm == null) {
     $('#msg_error').html('Please Enter Courier From.').show();
     $('#couriernameentry').focus();
     setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
   }
   else if (trackerid=='' && trackerid == null) {
     $('#msg_error').html('Please Enter Tracker ID.').show();
     $('#trackeridentry').focus();
     setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
   }
   else if(filechoose == '' || filechoose == null)   
    {
      $('#msg_error').html('Please Select Upload Excel File.').show();
      $('#simnetwork').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3500);
    }
  
 else {

   var courdtid = $('#courierdateid').val();
   var courrecedtid = $('#courierreceivedateid').val();     
   var courfrom = $('#courierfromentry').val();
  
   let datacourier ={

     remarks:"ok",
     simid:"",
     networkid1:this.sim.networkid,
     uploadedby:"Application",
     simtypeid:this.sim.simTypeId,
     deliverytype:this.receivedbydummy,
     couriername:cournmid,
     dispatchdatetime:"",
     recivedatetime:courrecedtid,
     personename:receivedby,
     personemobileno:"",
     vehicleregno:"",
     trackerid:trackerid,
     vendorId:this.vendorlistdata,
     simfrom:courfrom
   }

   this.progress.percentage = 0;

   this.currentFileUpload = this.selectedFiles.item(0);
   try { AddLoader() } catch (e) { alert(e) }
   this.uploadService.CourierSIMpushFileToStorage(this.currentFileUpload,datacourier).subscribe(event => {
    try { RemoveLoader() } catch (e) { alert(e) }
     if(event['status'] == true){

         this.datafromrespo = event['message'];

         if (event['statuscode'] == 200) {
           $("#SuccessModalEntry").modal('show');
           this.respoofbulk = event['entity'];
           this.resptotalrecord = event['totalRecords'];
           this.respsaverecord = event['sucessCount'];
           this.respfailedrecord = event['failedCount'];
           this.clearfunction();
           document.getElementById("uploadtbldiv").style.display = "block";
         }
         else {
           $("#ErrorModalEntry").modal('show');
         }
         
        
       }
       else{
        
       }
   });

   this.selectedFiles = undefined;

 }
 
}

  respoofbulk:any; resptotalrecord:any; respsaverecord:any; respfailedrecord:any;
  ngOnInit() {
   try{
    (function ($) {
      $(document).ready(function () {

        /* calander picker */
        var start = moment().subtract(29, 'days');
        var end = moment();

        function cb(start, end) {
          $('#daterangeadminux2 span').html(start.format('D MMM, YY') + ' - ' + end.format('D MMM, YY'));
        }

        $('#daterangeadminux2').daterangepicker({
          startDate: start,
          endDate: end,
          opens: 'left'
        }, cb);

        cb(start, end);
        $('#daterangeadminux2').on('show.daterangepicker', function (ev, picker) {
          var thisdp = $('.daterangepicker');
          setTimeout(function () {
            thisdp.addClass('active');
          }, 100);
        });
        $('#daterangeadminux2').on('hide.daterangepicker', function (ev, picker) {
          var thisdpc = $('.daterangepicker');
          thisdpc.removeClass('active');

        });
        var path = '../assets/img/background-part.png';
        $('.daterangepicker2').append('<div class="background" style="background-image: url(' + path + '); z-index:-1; height:00px;"><img src="../assets/img/background-part.png" alt="" style="display:none"></div>')
        /* calander picker ends */

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





      });

    })(jQuery);

    (function ($) {
      $(document).ready(function () {

        /* calander picker */
        var start = moment().subtract(29, 'days');
        var end = moment();

        function cb(start, end) {
          $('#daterangeadminux2 span').html(start.format('D MMM, YY') + ' - ' + end.format('D MMM, YY'));
        }

        $('#daterangeadminux2').daterangepicker({
          startDate: start,
          endDate: end,
          opens: 'left'
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

        this.count = 0;
        this.viewcount = 0;

         
        document.getElementById("courierbtndiv").style.display = "none";
        document.getElementById("receivedbtndiv").style.display = "none";

        document.getElementById("recbydiv").style.display = "none";
        document.getElementById("courierinfodiv").style.display = "none";
        document.getElementById("recdate").style.display = "block";
        document.getElementById("permobno").style.display = "none";
        document.getElementById("recfrm").style.display = "none";
        document.getElementById("uploadtbldiv").style.display = "none";

        this.EncryptPageName(); this.EncryptPageUrl(); this.NetworkList(); this.SimTypeListFun(); this.NetworkList(); this.VendorList();
        
  }
  catch(e){}
  }

  NetworkList() {
    let dataL = {
      pageID: "2",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.NetworkListAPI(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      this.networkList = response.entity.list;
    })
  }

  SimTypeListFun() {
    let dataL = {
      "pageID": "dd4",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.SimType(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      this.simTypeList = response.entity;
      this.simTypeObj = this.simTypeList[0];
      this.sim.simTypeId = this.simTypeObj.param1;
      this.sim.simTypeName = this.simTypeObj.param2;
     })
  }

  getNetwork() {
    this.sim.networkid = this.networkObj.param1;
    //this.sim.networkname = this.networkObj.param2
  }

  CourierbyChangeList(){

    this.receivedbydummy = this.courierbyText.param2;

    var courierby = $('#courierbyid').val(); 

    if(this.receivedbydummy == "Courier")
    {
   
        document.getElementById("recbydiv").style.display = "none";
        document.getElementById("recdate").style.display = "block";
        document.getElementById("courierinfodiv").style.display = "block";
        document.getElementById("permobno").style.display = "none";
        document.getElementById("recfrm").style.display = "none";
        document.getElementById("courierbtndiv").style.display = "block";
        document.getElementById("receivedbtndiv").style.display = "none";
    }
    else if(this.receivedbydummy == "By Hand")
    {
      //$('#courierinfodiv').hide(); $('#recbydiv').show(); 
      document.getElementById("courierinfodiv").style.display = "none";
      document.getElementById("recbydiv").style.display = "block";
      document.getElementById("recdate").style.display = "block";
      document.getElementById("permobno").style.display = "block";
      document.getElementById("recfrm").style.display = "block";
      document.getElementById("courierbtndiv").style.display = "none";
      document.getElementById("receivedbtndiv").style.display = "block";
    } 
  }

  VendorList() {

    let keydata = {
      param1: "Sim",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.VendorListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
          this.ListOfvendor = data.entity;
       });
  }

 SimdetailsClick(){
    this.router.navigate(['./simmaster']);
}

  sort(key) {

    this.key = key;
    this.reverse = !this.reverse;

  } 
 
 createPDF() {
   // this.SOSReportDetailPDF();
    var sTable = document.getElementById('PDFTable').innerHTML;
   
    var style = "<style>";
    style = style + "table {width: 100%;font: 17px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";
  
    // CREATE A WINDOW OBJECT.
    var win = window.open('', '', 'height=700,width=700');
  
    win.document.write('<html><head>');
    win.document.write('<title>SIM Upload Details</title>');   // <title> FOR PDF HEADER.
    win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');
  
    win.document.close(); 	// CLOSE THE CURRENT WINDOW.
  
    win.print();    // PRINT THE CONTENTS.
   }
 
 dataexportexcel() {
     
   const ws: xlsx.WorkSheet =   
   xlsx.utils.table_to_sheet(this.epltable.nativeElement);
   const wb: xlsx.WorkBook = xlsx.utils.book_new();
   xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
   xlsx.writeFile(wb, 'simuploaddetails.xlsx');
 
 }

 clearfunction(){

  this.networkObj=''; this.vendorText=''; this.vendorlistdata=''; this.courierbyText=''; this.CourierReceivedate='';
  this.receivedbyText=''; this.personmobileNo=''; this.courierfromText=''; this.couriernameText=''; this.courierfromText='';
  this.trackeridText='';
 }

  EncryptPageName() {
    this.cryptService.encrypt("Sim Bulk Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
  //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }



}
