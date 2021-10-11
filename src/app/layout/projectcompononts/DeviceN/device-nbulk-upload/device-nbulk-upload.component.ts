import { UploadimageoneService } from './../../Installation/upload/uploadimageone.service';
//import { UploadimageoneService } from './../../upload/uploadimageone.service';
import { HttpResponse, HttpEventType, HttpRequest  } from '@angular/common/http';
import { VehicleinstallationService } from './../../../../APIService/vehicleinstallation.service';
import { Router } from '@angular/router';
import { ListService } from './../../../../../list.service';
//import { PostService } from './../../../../../post.service';
import { Paramcls } from './../../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input , ElementRef, ViewChild} from '@angular/core';
//import { Component, OnInit ,  } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as moment from 'moment';
import * as $ from 'jquery';
import { CryptService } from '../../services/crypt.service';

import * as xlsx from 'xlsx';

declare var jQuery: any;
declare var $: any;
declare var AddLoader:any;
declare var RemoveLoader:any;

@Component({
  selector: 'app-device-nbulk-upload',
  templateUrl: './device-nbulk-upload.component.html',
  styleUrls: ['./device-nbulk-upload.component.css']
})
export class DeviceNbulkUploadComponent implements OnInit {
  @ViewChild('epltable',{ static: false }) epltable: ElementRef;
  encryptedpageNameValue: string; encryptedpageUrlValue: string;  key: string = 'name'; reverse: boolean = true; p: number;  pagecount:number;  
  filter:any; selectRows:string; Searchvendor:string; selectRowsText:string; deleteText:string; successMessageUpdate:string; 
  datafromrespo:string; count:number; viewcount:number; vendorlistdata:string; courieraddressText:string; devdetail$: any;

  DeviceDetails$:Object; networklistdata:string; personmobileNo:string; courierfromText:string;
  networkObj: any; simTypeObj: any; fallBackNetObj: any; courierbyText:any; trackeridText:string; vendorText:any;
  couriernameText:string; courierdate:string; CourierReceivedate:string; receivedbydummy:string; receivedbyText:string;
  responseMessage: any;   networkList: any[]; ListOfvendor = []; selectmakebulkdummy:string; devicetypeiddummy:string;
  selectmodelbulkText:any; modeliddummy:string; ListOfModeofDelivery = []; ListOfmodel = [];

  pageUrl = this.router.url; public loading = false;  

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
 
  selectedFiles: FileList; currentFileUpload: File; progress: { percentage: number } = { percentage: 0 };

  constructor(private modalService: NgbModal,private flashMessage: FlashMessagesService ,  private uploadService: UploadimageoneService , private listService:ListService, private cryptService:CryptService, private router:Router) { }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  devicetypebulkText:any; selectdevicetype:string; selectmake:string; selectmodelbulk:string; ven:string;
  Receivedupload() {
   
      var isValid = true; 
   
      var filechoose = $('#filechoose').val(); 
      this.vendorlistdata = this.vendorText.param1;
      this.receivedbydummy = this.courierbyText.param2;
     
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
     
      this.receivedbydummy = this.courierbyText.param1;
      this.devicetypeiddummy = this.devicetypebulkText.param1;
      this.modeliddummy = this.selectmodelbulkText.param1;

      let datacourier ={

          "remarks": "ok",
          "devicemakeid": this.vendorlistdata,
          "devicemodelid": this.modeliddummy,         
          "devicetype": this.devicetypeiddummy,
          "receiveddate_invoicedate_deliverydate": courrecedtid,
          "courierfrom": recefrm,
          "modeofdelivery": this.receivedbydummy,
          "personName":this.receivedbyText,
          "personMobileNo":this.personmobileNo,
          "companyEmployeeid":"0",
          "pageName": this.encryptedpageNameValue,
          "pageURL": this.encryptedpageUrlValue
      } 
      
    this.progress.percentage = 0; 
 
    this.currentFileUpload = this.selectedFiles.item(0);
   
    this.uploadService.pushReceivedDeviceBulkExcelFileToStorage(this.currentFileUpload,datacourier).subscribe(event => {
      
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
   
     var isValid = true; 
  
     var filechoose = $('#filechoose').val(); 
     this.vendorlistdata = this.vendorText.param1;
     this.receivedbydummy = this.courierbyText.param2;
     this.ven = this.vendorText.param1;
     var receivedby = $('#receivedbynameentry').val();

     var couriernm = $('#couriernameentry').val();
     var cournmid = $('#couriernameentry').val();
     var trackerid = $('#trackeridentry').val(); 
     var courierfrom = $('#courierfromentry').val(); 
        
     if (!this.ven && this.ven == null) {
       $('#msg_error').html('Please Select Vendor.').show();
       $('#vendorentrydemo').focus();
       setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
     }
    
     else if (!this.receivedbydummy && this.receivedbydummy == null) {
       $('#msg_error').html('Please Select Mode Of Delivery.').show();
       $('#courierbyid').focus();
       setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
     }
    else if (!this.receivedbyText && this.receivedbyText == null) {
      $('#msg_error').html('Please Enter Received By Name.').show();
      $('#receivedbynameentry').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
    }  
    else if (!couriernm && couriernm == null) {
      $('#msg_error').html('Please Enter Courier Name.').show();
      $('#couriernameentry').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
    } 
    else if (!trackerid && trackerid == null) {
      $('#msg_error').html('Please Enter Tracker ID.').show();
      $('#trackeridentry').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
    }
    else if (!courierfrom && courierfrom == null) {
      $('#msg_error').html('Please Enter Courier From.').show();
      $('#courierfromentry').focus();
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
     var courierfrm = $('#courierfromentry').val();   
     var permobno = $('#personmobilenumber').val();

    
     this.receivedbydummy = this.courierbyText.param1;
     this.devicetypeiddummy = this.devicetypebulkText.param1;
     this.modeliddummy = this.selectmodelbulkText.param1;

     let datacourier ={
         "remarks": "ok",
         "devicemakeid": this.vendorlistdata,
         "devicemodelid": this.modeliddummy,     
         "couriername":this.couriernameText,    
         "devicetype": this.devicetypeiddummy,
         "receiveddate_invoicedate_deliverydate": courrecedtid,
         "courierfrom": courierfrm,
         "trackerid": this.trackeridText,
         "modeofdelivery": this.receivedbydummy,
         "personName":this.receivedbyText,
         "personMobileNo":this.personmobileNo,
         "companyEmployeeid":"0",
         "pageName": this.encryptedpageNameValue,
         "pageURL": this.encryptedpageUrlValue
     } 
     
   this.progress.percentage = 0; 

   this.currentFileUpload = this.selectedFiles.item(0);
  
   this.uploadService.pushCourierDeviceBulkExcelFileToStorage(this.currentFileUpload,datacourier).subscribe(event => {
     
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

  respoofbulk:any; resptotalrecord:any; respsaverecord:any; respfailedrecord:any;
  ngOnInit() {
    
        this.count = 0; this.viewcount = 0;
        /* ------------------------------- Wizards start Ts------------------------------------------------- */
    
        (function ($) {
          $(document).ready(function() {
            $('#vendorName').focus();
            $(".buttonFinish").prop('disabled', true);
            $("#step-14").show();
            $("#step-15").hide();
            $("#step-16").hide();
            $("#step-17").hide();
            function setClasses(index, steps) {
              if (index < 0 || index > steps) return;
              if(index == 0) {
                $(".buttonPrevious").prop('disabled', true);
              } else {
                $(".buttonPrevious").prop('disabled', false);
              }
              if(index == steps) {
                $(".buttonPreviousNext").text('done');
              } else {
                $(".buttonPreviousNext").text('next');
              }
              $(".step-wizard ul li").each(function() {
                $(this).removeClass();
              });
              $(".step-wizard ul li:lt(" + index + ")").each(function() {
                $(this).addClass("done");
              });
              $(".step-wizard ul li:eq(" + index + ")").addClass("active")
              var p = index * (100 / steps);
              $("#prog").width(p + '%');
            }
            $(".step-wizard ul button").click(function() {
              var step = $(this).find("div.step")[0].innerText; 
              var steps = $(".step-wizard ul li").length; 
              validateAllSteps(step- 1 , steps);
            });
            $("#prev").click(function(){
              var step = $(".step-wizard ul li.active div.step")[0].innerText;
              var steps = $(".step-wizard ul li").length; 
              setClasses(step - 2, steps - 1);
              displayreviousSection(step - 1);   
            });
            $("#next").click(function(){
              if ($(this).text() == 'done') {
               // alert("submit the form?!?")
              } else {
                var step ;
                try {
                  step = $(".step-wizard ul li.active div.step")[0].innerText; 
                } catch (error) {
                  step = $(".step-wizard ul li div.step")[0].innerText; 
                }
                
                var steps = $(".step-wizard ul li").length;   
                validateAllSteps(step , steps- 1);   
                //setClasses(step, steps - 1);
              }
            });
            
            // initial state setup
           setClasses(0, $(".step-wizard ul li").length);
           
            function displayreviousSection(index){
              
            $(".buttonNext").prop('disabled', false);
              switch(index) {
                case 0:                    
                        $("#step-14").show();
                        $("#step-15").hide();
                        $("#step-16").hide();
                        $("#step-17").hide();
                  break;
                case 1:     
                        $("#step-14").show();
                        $("#step-15").hide();
                        $("#step-16").hide();
                        $("#step-17").hide();
                  break;
                case 2:                         
                      $("#step-14").hide();
                      $("#step-15").show();
                      $("#step-16").hide();
                      $("#step-17").hide();
                  break;
                case 3:                         
                      $("#step-14").hide();
                      $("#step-15").hide();
                      $("#step-16").show();
                      $("#step-17").hide();
                  break;
                default:                
                    $("#step-14").show();
                    $("#step-15").hide();
                    $("#step-16").hide();
                    $("#step-17").hide();
              }
            }
        
            function validateAllSteps(index, steps){
              var isStepValid = true;
              
                        
              if(validateStep1(index, steps) == false){
                isStepValid = false;       
              }else
              if(validateStep2(index, steps) == false){
                isStepValid = false;       
              }else
              if(validateStep3(index, steps) == false){
                isStepValid = false;        
              }else
               if(validateStep4(index, steps) == false){
                isStepValid = false;        
              }
              return isStepValid;
           }
        
           function validateStep1(index, steps){
            $('#vendorName').focus();
            $('#msg_error').html('').hide();
            
             var isValid = true; 
             var modeofdelivery = $('#modeofdeliveryupdate').val();
             var vendorlist = $('#vendorentryupdate').val();
             var modellist = $('#modellistupd').val();
            
             // Validate Vendor Name
             if(!modeofdelivery && modeofdelivery.length <= 0){
              isValid = false;
              $('#msg_error').html('Please Enter Mode Of Delivery').show();
              $('#modeofdelivery').focus();
              setTimeout(function(){document.getElementById("msg_error").style.display="none";}, 3000);
              }
             else  if(!vendorlist && vendorlist.length <= 0){
                isValid = false;
                $('#msg_error').html('Please Enter Vendor Name').show();
                $('#vendor').focus();
              setTimeout(function(){document.getElementById("msg_error").style.display="none";}, 3000);
             // alert("error");
             }
             else   
             if(!modellist && modellist.length <= 0){
              // validate short code
               isValid = false;
               $('#msg_error').html('Please Enter Device Model').show(); 
               $('#model').focus();    
               setTimeout(function(){document.getElementById("msg_error").style.display="none";}, 3000);    
             }
            
            if(isValid && index==1 ){  
              
              $('#msg_error').html('').hide();
              $("#step-14").hide()
              $("#step-15").show();
              $("#step-16").hide();
              $("#step-17").hide();
               
             setClasses(index, steps);
             $('#pername').focus();
             isValid = false;   
            }
             return isValid;
          }
        
        
          function validateStep2(index, steps){
            $('#pername').focus();
            $('#msg_error_contact').html('').hide();
            
            var isValid = true; 
            var devicetype = $('#devicetypeupdatedummy').val();
            var IMEIno = $('#IMEINoupdate').val();
            var deviceserialno = $('#deviceserialupdate').val();
            var checkdata = $('#checkboxdata').val();
             // Validate Contact Name
             if(!devicetype && devicetype.length <= 0){
              
              isValid = false;
              $('#msg_error_contact').html('Please Enter Device Type').show();
              $('#devicetypeupdate').focus();
              setTimeout(function(){document.getElementById("msg_error_contact").style.display="none";}, 3000);
            }
            else if(!IMEIno && IMEIno.length <= 0){
              // validate city
           
              isValid = false;
              $('#msg_error_contact').html('Please Enter IMEI No. ').show(); 
              $('#IMEINoupdate').focus();     
              setTimeout(function(){document.getElementById("msg_error_contact").style.display="none";}, 3000);
         
             }
            else
            if(!deviceserialno && deviceserialno.length <= 0){
             // validate Alternate Number
              isValid = false;
              $('#msg_error_contact').html('Please Enter Device Serial No.').show(); 
              $('#deviceserialupdate').focus(); 
              setTimeout(function(){document.getElementById("msg_error_contact").style.display="none";}, 3000);
             
            }
        
            if(isValid && index==2){  
             
              $('#msg_error_contact').html('').hide();
            
            $("#step-15").hide();
            $("#step-14").hide()
            $("#step-16").show();
            $("#step-17").hide();
            $('#accountNo').focus();
             
            $(".buttonFinish").prop('disabled', false);
            $(".buttonNext").prop('disabled', true);
              setClasses(index, steps);
             isValid = false;   
            }
        
             return isValid;
          }
        
        
          function validateStep3(index, steps){
                 
            $('#accountNo').focus();
             var isValid = true;    
           
            if(isValid && index==3){  
             
              $('#msg_contactNo').html('').hide();
              $("#step-14").hide();
              $("#step-15").hide();
              $("#step-16").hide();
              $("#step-17").show();
              
              setClasses(index, steps); 
              $(".buttonNext").prop('disabled', true);
              $(".buttonFinish").prop('disabled', false);
             isValid = false;   
            }
             return isValid;
          }
          function validateStep4(index, steps){  
           // alert("success");
            return true;
          }



          /* calander picker */
        var start = moment().subtract(29, 'days');
        var end = moment();

        function cb(start, end) {
          $('#daterangeadminux2 span').html(start.format('MMM D, YY') + ' - ' + end.format('MMM D, YY'));
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
              $('#daterangeadminux2 span').html(start.format('MMM D, YY') + ' - ' + end.format('MMM D, YY'));
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

        this.EncryptPageName();
        this.EncryptPageUrl();
        this.VendorList(); this.ModeOfDeliveryList(); this.clearfunction();  
               
        document.getElementById("uploadtbldiv").style.display = "none";
        document.getElementById("recbydiv").style.display = "none";
        document.getElementById("courierinfodiv").style.display = "none";
        document.getElementById("recdate").style.display = "block";
        document.getElementById("permobno").style.display = "none";
        document.getElementById("recfrm").style.display = "none";       
        document.getElementById("courierbtndiv").style.display = "none";
        document.getElementById("receivedbybtndiv").style.display = "none";

    /* ------------------------------- Wizards end Ts------------------------------------------------- */
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
            document.getElementById("receivedbybtndiv").style.display = "none";
        }
        else if(this.receivedbydummy == "Hand To Hand")
        {
          document.getElementById("courierinfodiv").style.display = "none";
          document.getElementById("recbydiv").style.display = "block";
          document.getElementById("recdate").style.display = "block";
          document.getElementById("permobno").style.display = "block";
          document.getElementById("recfrm").style.display = "block";
          
          document.getElementById("courierbtndiv").style.display = "none";
          document.getElementById("receivedbybtndiv").style.display = "block";
        } 
      }
    
    
      ModeOfDeliveryList() {

        let keydata = {
          pageID: "7",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
        }
        try { AddLoader() } catch (e) { alert(e) }
        this.listService.DeliveryModeListAPI(keydata).subscribe(
          (data) => {
            try { RemoveLoader() } catch (e) { alert(e) }
            this.ListOfModeofDelivery = data.entity;
            this.loading = false;
    
          });
      }

      VendorList() {
    
        let keydata = {
          param1: "Device",
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
    
      DevicetypeListBind() {
        this.vendorlistdata = this.vendorText.param1;
        let keydata = {
          param1: this.vendorlistdata,
          pageID: "7",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
        }
        try { AddLoader() } catch (e) { alert(e) }
        this.listService.DeviceTypeListAPI(keydata).subscribe((data) => {
          try { RemoveLoader() } catch (e) { alert(e) }
          this.ListOfdevicetype = data.entity.list;
        });
      }
    
      DeviceModelList() {
        this.vendorlistdata = this.vendorText.param1;
        this.devicetypeiddummy = this.devicetypebulkText.param1;
        let keydata = {
          pageID: "7",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue,
          param1: this.vendorlistdata,
          param2: this.devicetypeiddummy
        }
        try { AddLoader() } catch (e) { alert(e) }
        this.listService.DeviceModelListAPI(keydata).subscribe(
          (data) => {
            try { RemoveLoader() } catch (e) { alert(e) }
            this.ListOfmodel = data.entity.list;
    
            this.loading = false;
    
          });
      }
     
     
      EncryptPageName() {
        this.cryptService.encrypt("Device Bulk Entry")
        this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
      //  console.log("encrypted PageName is" + this.encryptedpageNameValue)
    
      }

      EncryptPageUrl() {
        this.cryptService.encrypt(this.pageUrl)
        this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
      
      }

      DevicedetailsClick(){
        this.router.navigate(['./devicemaster']);
    }

    ListOfdevicetype = [];
  DevicetypelList(){
  
    let keydata = {
      pageID: "7",
       pageName: this.encryptedpageNameValue,
       pageURL: this.encryptedpageUrlValue
    }  
    try{AddLoader()}catch(e){alert(e)} 
    this.listService.DeviceTypeListAPI(keydata).subscribe(
      (data)  => {
        try{RemoveLoader()}catch(e){alert(e)} 
     
        this.ListOfdevicetype = data.entity.list;
              
      });
  }

  ListOfMake = [];

  SelectMakelList(){
  
    let keydata = {
      param1: "Device",
      pageID: "7",
       pageName: this.encryptedpageNameValue,
       pageURL: this.encryptedpageUrlValue
    }  
    try{AddLoader()}catch(e){alert(e)} 
    this.listService.VendorListAPI(keydata).subscribe(
      (data)  => {
        try{RemoveLoader()}catch(e){alert(e)} 
     
        this.ListOfMake = data.entity;
              
      });
  }

  ListOfModel = []; selectmakebulkText:any; selectmakebulk:string;

  SelectModellList(){

   this.selectmakebulk = this.selectmakebulkText.param1;
  
    let keydata = {
      param1:this.selectmakebulk,
      pageID: "7",
       pageName: this.encryptedpageNameValue,
       pageURL: this.encryptedpageUrlValue
    }  
    try{AddLoader()}catch(e){alert(e)} 
    this.listService.DeviceModelListAPI(keydata).subscribe(
      (data)  => {
        try{RemoveLoader()}catch(e){alert(e)} 
     
        this.ListOfModel = data.entity.list;
       
      });
  }

  Refreshfunction(){

  }
  
  exportToExcel() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'Devicebulkupload.xlsx');
   }
  
   createPDF() {
    
    var sTable = document.getElementById('PDFTable').innerHTML;
   
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
  sort(key){

    //  alert(key);
 
     this.key = key;
     this.reverse = !this.reverse;
     
   }
  
  VendorDeletefunction(){
    
  }
  searchdata(){

  }
  setdata(com){

  }

  devicetypeid:string;
  devicetypech(){
    this.devicetypeid = this.devicetypebulkText.param1;
  }
  modelid:string;
  selectmodelch(){
    this.modelid =  this.selectmodelbulkText.param1;
  }

  clearfunction(){
    this.selectmakebulkText=''; this.selectmakebulkdummy=''; this.devicetypebulkText=''; this.devicetypeiddummy='';
    this.selectmodelbulkText=''; this.modeliddummy=''; 
  }

}
