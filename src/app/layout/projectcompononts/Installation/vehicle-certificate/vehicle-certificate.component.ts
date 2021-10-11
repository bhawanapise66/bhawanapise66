import { CustomermodelService } from './../../../../APIService/customermodel.service';
import { Router } from '@angular/router';

import { ListService } from './../../../../../list.service';
import { PostService } from './../../../../../post.service';
import { Paramcls } from './../../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as xlsx from 'xlsx';
import * as $ from 'jquery';
import * as moment from 'moment';
import { CryptService } from './../../services/crypt.service';
//import { DevicemodelService } from '../../../../APIService/devicemodel.service';
import { DevicemodelService } from '../../../../APIService/devicemodel.service';

declare var jQuery: any;
@Component({
  selector: 'app-vehicle-certificate',
  templateUrl: './vehicle-certificate.component.html',
  styleUrls: ['./vehicle-certificate.component.css']
})
export class VehicleCertificateComponent implements OnInit {
  
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;
  VehicleInstalDetails$:Object;  PlaceOrderDetails$:Object;

  deleteremarkText:string;
  public loading = false; p: number;   pagecount:number; count:number; viewcount:number;

  constructor(private modalService: NgbModal,private flashMessage: FlashMessagesService ,private listService:ListService,private cryptService:CryptService,private router:Router, private devicemodelService:DevicemodelService) { }

  ngOnInit() {
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
          }
          
          return isStepValid;
       }
    
       function validateStep1(index, steps){
        $('#distrbutorname').focus();
         $('#msg_error').html('').hide();
        // $('#msg_vendorName').html('').hide();
        // $('#msg_shortcode').html('').hide();
        // $('#msg_OfficialNo').html('').hide();
        // $('#msg_Officialemail').html('').hide();
         var isValid = true; 
         var devtype = $('#devicetype').val();
         var VendorName = $('#vendorname').val();
        // alert("sdjb"+distributorname);
         var modelcode = $('#modelcode').val();
         var modelname = $('#modelname').val();
         var customercatagory = $('#customercategory').val();
         //Validate Vendor Name
        //  if(devtype == null){
        //    isValid = false;
        //   //alert(""+Distname);
        //    $('#msg_error').html('Please Enter Device Type').show();
        //    $('#devicetype').focus();
        //  }else 
        //  if(VendorName == null){
        //   // validate short code
        //    isValid = false;
        //    $('#msg_error').html('Please Enter Vendor Name').show(); 
        //    $('#vendorname').focus();        
        //  }else if( !modelcode && modelcode.length <= 0){
        //   // validate Official No
        //   isValid = false;
        //   $('#msg_error').html('Please Enter Model Code').show(); 
        //   $('#modelcode').focus();        
        // }else if(!modelname && modelname.length <= 0){
        //   // validate Official Email
        //   isValid = false;
        //   $('#msg_error').html('Please Enter Model Name').show(); 
        //   $('#modelname').focus();        
        // }
        
        if(isValid && index==1 ){  
          
          // $('#msg_vendorName').html('').hide();
          // $('#msg_shortcode').html('').hide();
          // $('#msg_OfficialNo').html('').hide();
          // $('#msg_Officialemail').html('').hide();
          $('#msg_error').html('').hide();
          $("#step-14").hide()
          $("#step-15").show();
          $("#step-16").hide();
          $("#step-17").hide();
           
         setClasses(index, steps);
         $(".buttonFinish").prop('disabled', false);
         $(".buttonNext").prop('disabled', true);
         $('#pername').focus();
         isValid = false;   
        }
         return isValid;
      }
    
    
      function validateStep2(index, steps){
        $('#pername').focus();

        // $('#msg_contactNo').html('').hide();
        // $('#msg_alternateNo').html('').hide();
        // $('#msg_State').html('').hide();
        // $('#msg_city').html('').hide();
        $('#msg_error_contact').html('').hide();
         var isValid = true; 
         var personname = $('#pername').val();
         var contactNo = $('#contactNo').val();
         var alternateNo = $('#alternateNo').val();
         var regaddress = $('#regaddressnew').val();
         var state = $('#state').val();
         var city = $('#city').val();
         var pinCodeNo = $('#pincodeno').val();
         // Validate Contact Name
        
    
        if(isValid && index==2){  
         
          $('#msg_contactNo').html('').hide();
          $('#msg_alternateNo').html('').hide();
          $('#msg_state').html('').hide();
        $('#msg_city').html('').hide();
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
         var accountNo = $('#accountNo').val();
         $('#msg_accountNo').html('').hide();
         // Validate Account No
         if(!accountNo && accountNo.length <= 0){
           isValid = false;
           $('#msg_accountNo').html('Please Enter Account Number').show();
           $('#accountNo').focus();
         }
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
            var path = 'assets/images/background-part.png';
            $('.daterangepicker').append('<div class="background" style="background-image: url(' + path + '); z-index:-1; height:80px;"><img src="assets/images/background-part.png" alt="" style="display:none"></div>')
      });  
    })
    (jQuery);
    this.EncryptPageName();
    this.EncryptPageUrl();

 //   this.DeviceModelDetail();
 
/* ------------------------------- Wizards end Ts------------------------------------------------- */
  }
  EncryptPageName() {
    this.cryptService.encrypt("Menu Management")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
  //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }

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
  //  this.Distributorlist();
  //  this.Dealerlist();
   // this.Citylist();
  // this.CustomerTypeList();
    // this.DeviceTypeList();
    // this.Vendorlist();
    // this.CertificateAuthlist();
  }
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
}
