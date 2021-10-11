import { CryptService } from './../services/crypt.service';
import { ListService } from './../../../../list.service';
import { PostService } from './../../../../post.service';
import { Paramcls } from './../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as $ from 'jquery';
import * as moment from 'moment';
//import { DevicemodelService } from '../../../../devicemodel.service';
import { Router } from '@angular/router';
import { PdfService } from '../services/pdf.service';


//import * as $ from 'jquery';
declare var jQuery: any;

@Component({
  selector: 'app-devicemodel',
  templateUrl: './devicemodel.component.html',
  styleUrls: ['./devicemodel.component.css']
})
export class DevicemodelComponent implements OnInit {

  
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;

  DeviceTypelistText:string; VendorListText:string; Modelcode:string; ModelName:string;  
  CertiAutho:string;
  CertAutho:string; TACcertNo:string;TACcertDate:string; TACcertval:string;  Productiondate:string; COPcertNo:string;COPcertDate:string;COPcertval:string;
  selDocument:string; remarkDevModText:string;

  DeleteDevModText:string; stepno:number; 

  public loading = false; p: number; ListOfDevicetype$:Object;  ListOfDeviceType$:Object; ListOfVendor$:Object; DeviceModeldetails$:Object; ListOfCertAuth$:Object;
  constructor(private modalService: NgbModal,private flashMessage: FlashMessagesService ,private listService:ListService ,
     private cryptService : CryptService ,private router:Router, public pdfservice: PdfService) { }

  ngOnInit() {

    (function ($) {
      $(document).ready(function () {
        $('#myModalwizard').on('shown.bs.modal', function () {
          $('#devicetype').focus();
        })
      });
    })(jQuery);
    /* ------------------------------- Wizards start Ts------------------------------------------------- */

    (function ($) {
      $(document).ready(function() {
        $('#devicetype').focus();
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
            // case 3:                         
            //       $("#step-14").hide();
            //       $("#step-15").hide();
            //       $("#step-16").show();
            //       $("#step-17").hide();
            //  break;
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
          }
          return isStepValid;
       }
    
       function validateStep1(index, steps){
        $('#devicetype').focus();
        
        $('#msg_devicetype').html('').hide();
        $('#msg_vendorlist').html('').hide();
        $('#msg_modelcode').html('').hide();
        $('#msg_modelname').html('').hide();
         var isValid = true; 
         var Devicetype = $('#devicetype').val();
         var Vendorlist = $('#vendorlist').val();
         var modelCode = $('#modelcode').val();
         var ModelName = $('#modelname').val();
         var officialno = $('#officialNo').val();
         var officialemail = $('#officialEmail').val();
         // Validate device type
         if(!Devicetype && Devicetype==null ){
          
           isValid = false;
           $('#msg_devicetype').html('Please Enter Device Type').show();
           $('#devicetype').focus();
         }else 
         if(!Vendorlist && Vendorlist==null){
          // validate vendor list
           isValid = false;
           $('#msg_vendorlist').html('Please Enter Vendor List').show(); 
           $('#vendorlist').focus();        
         }else if(!modelCode && modelCode.length <= 0 ||  modelCode.length < 2){
          // validate model code 
         // alert(modelCode);
           isValid = false;
           $('#msg_modelcode').html('Please Enter Model Code').show();     
           $('#modelcode').focus();    
         }else if(!ModelName && ModelName.length <= 0 || ModelName.length < 2 ){
          // validate GST No
          isValid = false;
          $('#msg_modelname').html('Please Enter Model Name').show(); 
          $('#modelname').focus();        
        }
        
        if(isValid && index==1 ){  
          
          $('#msg_devicetype').html('').hide();
          $('#msg_vendorlist').html('').hide();
          $('#msg_modelcode').html('').hide();
          $('#msg_modelname').html('').hide();
          $("#step-14").hide()
          $("#step-15").show();
          $("#step-16").hide();
          $("#step-17").hide();
           
         setClasses(index, steps);
         $('#CertAutho').focus();
         $(".buttonFinish").prop('disabled', false);
         $(".buttonNext").prop('disabled', true);
         isValid = false;   
        }
         return isValid;
      }
    
    
      function validateStep2(index, steps){
         $('#devmodremark').focus();
         $('#msg_devmodremark').html('').hide();
        // $('#msg_taccertNo').html('').hide();
        // $('#msg_State').html('').hide();
        // $('#msg_city').html('').hide();
         var isValid = true; 
          var devmodremark = $('#devmodremark').val();
        //  var TaccertNo = $('#taccertno').val();
        //  var alternateNo = $('#alternateNo').val();
        //  var regaddress = $('#regaddressnew').val();
        //  var state = $('#state').val();
        //  var city = $('#city').val();
        //  var pinCodeNo = $('#pincodeno').val();
        // Validate remark Name
          if(!devmodremark && devmodremark.length <= 0){
           isValid = false;
           $('#msg_devmodremark').html('Please Enter Remark').show();
           $('#devmodremark').focus();
         }
        //  if(!TaccertNo && TaccertNo.length <= 0){
        //    isValid = false;
        //    $('#msg_taccertNo').html('Please Enter Contact Number').show();
        //    $('#taccertno').focus();
        //  }else
        //  if(!alternateNo && alternateNo.length <= 0){
        //   // validate Alternate Number
        //    isValid = false;
        //    $('#msg_alternateNo').html('Please Enter Alternate Number').show(); 
        //    $('#alternateNo').focus();        
        //  }
        //  else
        //  if(!regaddress && regaddress.length <= 0){
        //   // validate Alternate Number
        //    isValid = false;
        //    $('#msg_regadd').html('Please Enter Reg Address').show(); 
        //    $('#regaddressnew').focus();        
        //  }
        //  else if(state.length <= 0 && state == 'choose'){ 
        //   // validate state
        //    isValid = false;
        //    $('#msg_State').html('Please Enter State').show();     
        //    $('#state').focus();   
    
        //  }else if(!city && city.length <= 0 && city == 'choose' ){
        //   // validate city
        //   isValid = false;
        //   $('#msg_city').html('Please Enter City').show(); 
        //   $('#city').focus();        
        // }else
        // if(!pinCodeNo && pinCodeNo.length <= 0){
        //  // validate Alternate Number
        //   isValid = false;
        //   $('#msg_pincode').html('Please Enter Valid Pincode No.').show(); 
        //   $('#alternateNo').focus();        
        // }
    
        if(isValid && index==2){  
         
           $('#msg_devmodremark').html('').hide();
        //    $('#msg_taccertNo').html('').hide();
        //    $('#msg_state').html('').hide();
        // $('#msg_city').html('').hide();
        $("#step-15").hide();
        $("#step-14").hide()
        $("#step-17").show();
        $("#step-18").hide();
        $('#accountNo').focus();
         
        $(".buttonFinish").prop('disabled', false);
        $(".buttonNext").prop('disabled', true);
          setClasses(index, steps);
         isValid = false;   
        }
    
         return isValid;
      }
    
    
      // function validateStep3(index, steps){
             
      //   $('#seldocument').focus();
      //    var isValid = true;    
      //    var seldoc = $('#seldocument').val();
      //    $('#msg_seldocment').html('').hide();
      //    // Validate Account No
      //    if(!seldoc && seldoc.length <= 0){
      //      isValid = false;
      //      $('#msg_seldocment').html('Please Choose Document File').show();
      //      $('#seldocument').focus();
      //    }
      //   if(isValid && index==3){  
         
      //     $('#msg_seldocment').html('').hide();
      //     $("#step-14").hide();
      //    $("#step-15").hide();
      //    $("#step-16").hide();
      //    $("#step-17").show();
          
      //     setClasses(index, steps); 
      //     $(".buttonNext").prop('disabled', true);
      //     $(".buttonFinish").prop('disabled', false);
      //    isValid = false;   
      //   }
      //    return isValid;
      // }
      function validateStep3(index, steps){  
       // alert("success");
        return true;
      }




      $(window).on('load', function() {
        $("#my-dropzone").dropzone({
            url: "../file-upload",
            addRemoveLinks: "dictRemoveFile"
        });
  
        $('.datepicker').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            drops: 'down',
            minYear: 1901
        }, function(start, end, label) {});
  
        $('.datepicker').on('show.daterangepicker', function(ev, picker) {
            var thisdp = $('.daterangepicker');
            setTimeout(function() {
                thisdp.addClass('active');
            }, 100);
        });
        $('.datepicker').on('hide.daterangepicker', function(ev, picker) {
            var thisdpc = $('.daterangepicker');
            thisdpc.removeClass('active');
  
        });
        var path = '../assets/img/background-part.png';
        if ($('.daterangepicker .background').length == 0) {
            $('.daterangepicker').append('<div class="background" style="background-image: url(' + path + '); z-index:-1; height:80px;"><img src="../assets/img/background-part.png" alt="" style="display:none"></div>');
        }
    });

      });
    })(jQuery);

    //this.VendorDetail();

  //   $(window).on('load', function() {
  //     $("#my-dropzone").dropzone({
  //         url: "../file-upload",
  //         addRemoveLinks: "dictRemoveFile"
  //     });

  //     $('#datepicker').daterangepicker({
  //         singleDatePicker: true,
  //         showDropdowns: true,
  //         drops: 'up',
  //         minYear: 1901
  //     }, function(start, end, label) {});

  //     $('#datepicker').on('show.daterangepicker', function(ev, picker) {
  //         var thisdp = $('.daterangepicker');
  //         setTimeout(function() {
  //             thisdp.addClass('active');
  //         }, 100);
  //     });
  //     $('#datepicker').on('hide.daterangepicker', function(ev, picker) {
  //         var thisdpc = $('.daterangepicker');
  //         thisdpc.removeClass('active');

  //     });
  //     var path = '../assets/img/background-part.png';
  //     if ($('.daterangepicker .background').length == 0) {
  //         $('.daterangepicker').append('<div class="background" style="background-image: url(' + path + '); z-index:-1; height:80px;"><img src="../assets/img/background-part.png" alt="" style="display:none"></div>');
  //     }
  // });
 
/* ------------------------------- Date Pivker------------------------------------------------- */
(function ($) {
  $(document).ready(function(){
  
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
        $('#daterangeadminux2').on('show.daterangepicker', function(ev, picker) {
            var thisdp = $('.daterangepicker');
            setTimeout(function() {
                thisdp.addClass('active');
            }, 100);
        });
        var path = '../assets/images/background-part.png';
        $('.daterangepicker').append('<div class="background" style="background-image: url(' + path + '); z-index:-1; height:80px;"><img src="../assets/images/background-part.png" alt="" style="display:none"></div>')
  });  
})
(jQuery);

this.EncryptPageName();
this.EncryptPageUrl();
this.stepno = 3;

  }
  editpageform(){
    document.getElementById("backdetailsbtn").style.display="block";
    document.getElementById("editbtn").style.display="none";
    // document.getElementById("customerdtls").style.display="none";
    // document.getElementById("bankdtls").style.display="none";
    document.getElementById("devicemodeldtls").style.display="none";
    document.getElementById("udm").style.display="block";
    document.getElementById("dmd").style.display="none";
    document.getElementById("modelfooter").style.display="block";
    document.getElementById("container").style.display="block";
    this.DeviceModellist();
    this.Vendorlist();
    this.CertificateAuthlist();
    this.DeviceTypeList();
  }
 
  backdetailsbtn(){

     document.getElementById("backdetailsbtn").style.display="none";
     document.getElementById("editbtn").style.display="block";
    // document.getElementById("customerdtls").style.display="block";
   // document.getElementById("bankdtls").style.display="block";
     document.getElementById("devicemodeldtls").style.display="block";
     document.getElementById("udm").style.display="none";
     document.getElementById("dmd").style.display="block";
    // document.getElementById("revbtn").style.display="none";
    // document.getElementById("nextviewbtn").style.display="block";
    // document.getElementById("next2viewbtn").style.display="none";
    document.getElementById("modelfooter").style.display="none";
    document.getElementById("container").style.display="none";
   // document.getElementById("bankdtls").style.display="none";
  //  document.getElementById("customerdtls").style.display="none";
  }

  EncryptPageName() {
    this.cryptService.encrypt("Device Model")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
   // console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
   // console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }


  DeviceModellist(){
  
    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }  
    this.listService.DeviceTypeListAPI(keydata).subscribe(
      (data)  => {
      //  alert(JSON.stringify(data));
       // console.log(data.entity)
       // console.log("wekcome_ "+data);
       let resdatalist = data.entity.list; 
      //  this.resdata = 
      // console.log("wekcome_ "+resdata);

        let statelist = resdatalist;
      //  let resdatadev = resdata['list'];
      //  console.log(resdatadev);
      //  console.log(statelist);
        this.ListOfDeviceType$ = statelist;
      
        this.loading = false; 
       
      });
  }

  Vendorlist(){
  
    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }  
    this.listService.VendorListAPI(keydata).subscribe(
      (data)  => {
      //  alert(JSON.stringify(data));
       // console.log(data.entity)
       // console.log("wekcome_ "+data);
       let resdatalist = data.entity.list; 
      //  this.resdata = 
      // console.log("wekcome_ "+resdata);

        let statelist = resdatalist;
      //  let resdatadev = resdata['list'];
      //  console.log(resdatadev);
       // console.log(statelist);
        this.ListOfVendor$ = statelist;
      
        this.loading = false; 
       
      });
  }
  /* ------------------- Certificate Api function -------------------*/

  DeviceTypeList(){
  
    let keydata = {
      param1:"",
      param2:"",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }  
    this.listService.DeviceTypeListAPI(keydata).subscribe(
      (data)  => {
      //  alert(JSON.stringify(data));
      //  console.log(data.entity)
       // console.log("wekcome_ "+data);
       let resdatalist = data.entity.list; 
      //  this.resdata = 
      // console.log("wekcome_ "+resdata);

        let certlist = resdatalist;
      //  let resdatadev = resdata['list'];
      //  console.log(resdatadev);
       // console.log(certlist);
        this.ListOfDevicetype$ = certlist;
      
        this.loading = false; 
       
      });
  }

   /* ------------------- Certificate Api function -------------------*/
    /* ------------------- Device Type Api -------------------*/
    CertificateAuthlist(){
  
      let keydata = {
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }  
      this.listService.CertAuthListAPI(keydata).subscribe(
        (data)  => {
        //  alert(JSON.stringify(data));
        //  console.log(data.entity)
         // console.log("wekcome_ "+data);
         let resdatalist = data.entity.list; 
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);
  
          let certlist = resdatalist;
        //  let resdatadev = resdata['list'];
        //  console.log(resdatadev);
         // console.log(certlist);
          this.ListOfCertAuth$ = certlist;
        
          this.loading = false; 
         
        });
    }

     /* ------------------- Device Type Api Function -------------------*/

  /* -------------------- Delete Function -------------------*/

  
   
  //  setdata(com){
  //   // alert(com);
  //    let vendordatadetails = com;
  //    this.device_type =  vendordatadetails.param4;
  //    this.vendor_list = vendordatadetails.param5;
  //    this.model_code = vendordatadetails.param10;
  //    this.model_name = vendordatadetails.param11;
  //    this.prod_date = vendordatadetails.param15; 
  //    this.cert_auth = vendordatadetails.param14;
  //    this.tac_cert_no = vendordatadetails.param16;
  //    this.tac_cert_date = vendordatadetails.param17;
  //    this.tac_cert_val = vendordatadetails.param18;
  //    this.cop_cert_no = vendordatadetails.param9;
  //    this.cop_cert_date = vendordatadetails.param8;
  //    this.cop_cert_val = vendordatadetails.param6;
  
  //    this.pin_code = vendordatadetails.param13;
  //    this.bank_acc = vendordatadetails.param22;
  //    this.bank_name = vendordatadetails.param23;
  //    this.bank_ifsc = vendordatadetails.param24;
  //    this.bank_add = vendordatadetails.param25;
   
   
  //   // alert(vendordatadetails.param4);
  //  }
   
}
