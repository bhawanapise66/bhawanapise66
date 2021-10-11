
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
//import { DevicemodelService } from '../../../../devicemodel.service';
import { Router } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-devicemodel-new',
  templateUrl: './devicemodel-new.component.html',
  styleUrls: ['./devicemodel-new.component.css']
})
export class DevicemodelNewComponent implements OnInit {

  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;
  DeviceTypelistText:string; VendorListText:string; Modelcode:string; ModelName:string;  
  CertiAutho:string;
  CertAutho:string; TACcertNo:string;TACcertDate:string; TACcertval:string;  Productiondate:string; COPcertNo:string;COPcertDate:string;COPcertval:string;
  selDocument:string; remarkDevModText:string;
  stepno:number;
  public loading = false; p: number;  ListOfDeviceType$:Object; ListOfVendor$:Object; DeviceModeldetails$:Object; ListOfCertAuth$:Object; ListOfDevicetype$:Object;
  
  constructor(private listService:ListService , private cryptService : CryptService ,private router:Router) { }

  ngOnInit() {
        
    (function ($) {
      $(document).ready(function() {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#devicetypeentry').focus();
      })
    });
    })(jQuery);

      (function ($) {
        $(document).ready(function() {
          $('#vendorName').focus();
          $(".buttonFinish").prop('disabled', true);
          $("#step-14").show();
          $("#step-15").hide();
          $("#step-16").hide();
          $("#step-17").hide();
          $("#step-14").show();
          $("#stepentry-15").hide();
          $("#stepentry-16").hide();
          $("#stepentry-17").hide();
          // function setClasses(index, steps) {
          //   if (index < 0 || index > steps) return;
          //   if(index == 0) {
          //     $(".buttonPrevious").prop('disabled', true);
          //   } else {
          //     $(".buttonPrevious").prop('disabled', false);
          //   }
          //   if(index == steps) {
          //     $(".buttonPreviousNext").text('done');
          //   } else {
          //     $(".buttonPreviousNext").text('next');
          //   }
          //   $(".step-wizard ul li").each(function() {
          //     $(this).removeClass();
          //   });
          //   $(".step-wizard ul li:lt(" + index + ")").each(function() {
          //     $(this).addClass("done");
          //   });
          //   $(".step-wizard ul li:eq(" + index + ")").addClass("active")
          //   var p = index * (100 / steps);
          //   $("#prog").width(p + '%');
          // }
          // $(".step-wizard ul button").click(function() {
          //   var step = $(this).find("div.step")[0].innerText; 
          //   var steps = $(".step-wizard ul li").length; 
          //   validateAllSteps(step- 1 , steps);
          // });
          // $("#prev").click(function(){
          //   var step = $(".step-wizard ul li.active div.step")[0].innerText;
          //   var steps = $(".step-wizard ul li").length; 
          //   setClasses(step - 2, steps - 1);
          //   displayreviousSection(step - 1);   
          // });
          // $("#next").click(function(){
          //   if ($(this).text() == 'done') {
          //     alert("submit the form?!?")
          //   } else {
          //     var step ;
          //     try {
          //       step = $(".step-wizard ul li.active div.step")[0].innerText; 
          //     } catch (error) {
          //       step = $(".step-wizard ul li div.step")[0].innerText; 
          //     }
              
          //     var steps = $(".step-wizard ul li").length;   
          //     validateAllSteps(step , steps- 1);   
          //     //setClasses(step, steps - 1);
          //   }
          // });
          
         // initial state setup
        //  setClasses(0, $(".step-wizard ul li").length);
         
        //   function displayreviousSection(index){
            
        //   $(".buttonNext").prop('disabled', false);
        //     switch(index) {
        //       case 0:                    
        //               $("#step-14").show();
        //               $("#step-15").hide();
        //               $("#step-16").hide();
        //               $("#step-17").hide();
        //         break;
        //       case 1:     
        //               $("#step-14").show();
        //               $("#step-15").hide();
        //               $("#step-16").hide();
        //               $("#step-17").hide();
        //         break;
        //       case 2:                         
        //             $("#step-14").hide();
        //             $("#step-15").show();
        //             $("#step-16").hide();
        //             $("#step-17").hide();
        //         break;
        //       case 3:                         
        //             $("#step-14").hide();
        //             $("#step-15").hide();
        //             $("#step-16").show();
        //             $("#step-17").hide();
        //         break;
        //       default:                
        //           $("#step-14").show();
        //           $("#step-15").hide();
        //           $("#step-16").hide();
        //           $("#step-17").hide();
        //     }
        //   }
  
        //   function validateAllSteps(index, steps){
        //     var isStepValid = true;
            
                      
        //     if(validateStep1(index, steps) == false){
        //       isStepValid = false;       
        //     }else
        //     if(validateStep2(index, steps) == false){
        //       isStepValid = false;       
        //     }else
        //     if(validateStep3(index, steps) == false){
        //       isStepValid = false;        
        //     }else
        //      if(validateStep4(index, steps) == false){
        //       isStepValid = false;        
        //     }
        //     return isStepValid;
        //  }
  
        //  function validateStep1(index, steps){
        //   $('#vendorName').focus();
          
        //   $('#msg_vendorName').html('').hide();
        //   $('#msg_shortcode').html('').hide();
        //   $('#msg_CINNo').html('').hide();
        //   $('#msg_GSTNo').html('').hide();
        //    var isValid = true; 
        //    var vendorname = $('#vendorName').val();
        //    var shortcode = $('#shortCode').val();
        //    var cin = $('#CINNo').val();
        //    var gstno = $('#GSTNo').val();
        //    // Validate Vendor Name
        //    if(!vendorname && vendorname.length <= 0){
        //      isValid = false;
        //      $('#msg_vendorName').html('Please Enter Vendor Name').show();
        //      $('#vendorName').focus();
        //    }else
        //    if(!shortcode && shortcode.length <= 0){
        //     // validate short code
        //      isValid = false;
        //      $('#msg_shortcode').html('Please Enter Short Code').show(); 
        //      $('#shortCode').focus();        
        //    }else if(cin.length <= 0){
        //     // validate cin no
        //      isValid = false;
        //      $('#msg_CINNo').html('Please Enter CIN No').show();     
        //      $('#CINNo').focus();    
        //    }else if(!gstno && gstno.length <= 0 ){
        //     // validate GST No
        //     isValid = false;
        //     $('#msg_GSTNo').html('Please Enter GST No').show(); 
        //     $('#GSTNo').focus();        
        //   }
          
        //   if(isValid && index==1 ){  
            
        //     $('#msg_vendorName').html('').hide();
        //     $('#msg_shortcode').html('').hide();
        //     $('#msg_CINNo').html('').hide();
        //     $('#msg_GSTNo').html('').hide();
        //     $("#step-14").hide()
        //     $("#step-15").show();
        //     $("#step-16").hide();
        //     $("#step-17").hide();
             
        //    setClasses(index, steps);
        //    $('#contactNo').focus();
        //    isValid = false;   
        //   }
        //    return isValid;
        // }
  
  
        // function validateStep2(index, steps){
        //   $('#contactNo').focus();
        //   $('#msg_contactNo').html('').hide();
        //   $('#msg_alternateNo').html('').hide();
        //   $('#msg_State').html('').hide();
        //   $('#msg_city').html('').hide();
        //    var isValid = true; 
        //    var contactNo = $('#contactNo').val();
        //    var alternateNo = $('#alternateNo').val();
        //    var state = $('#state').val();
        //    var city = $('#city').val();
        //    // Validate Contact Name
        //    if(!contactNo && contactNo.length <= 0){
        //      isValid = false;
        //      $('#msg_contactNo').html('Please Enter Contact Number').show();
        //      $('#contactNo').focus();
        //    }else
        //    if(!alternateNo && alternateNo.length <= 0){
        //     // validate Alternate Number
        //      isValid = false;
        //      $('#msg_alternateNo').html('Please Enter Alternate Number').show(); 
        //      $('#alternateNo').focus();        
        //    }else if(state.length <= 0){
        //     // validate state
        //      isValid = false;
        //      $('#msg_State').html('Please Enter State').show();     
        //      $('#state').focus();    
        //    }else if(!city && city.length <= 0 ){
        //     // validate city
        //     isValid = false;
        //     $('#msg_city').html('Please Enter City').show(); 
        //     $('#city').focus();        
        //   }
  
        //   if(isValid && index==2){  
           
        //     $('#msg_contactNo').html('').hide();
        //      $('#msg_alternateNo').html('').hide();
        //      $('#msg_state').html('').hide();
        //   $('#msg_city').html('').hide();
        //   $("#step-15").hide();
        //   $("#step-14").hide()
        //   $("#step-16").show();
        //   $("#step-17").hide();
        //   $('#accountNo').focus();
           
        //   $(".buttonFinish").prop('disabled', false);
        //   $(".buttonNext").prop('disabled', true);
        //     setClasses(index, steps);
        //    isValid = false;   
        //   }
  
        //    return isValid;
        // }
  
  
        // function validateStep3(index, steps){
               
        //   $('#accountNo').focus();
        //    var isValid = true;    
        //    var accountNo = $('#accountNo').val();
        //    $('#msg_accountNo').html('').hide();
        //    // Validate Account No
        //    if(!accountNo && accountNo.length <= 0){
        //      isValid = false;
        //      $('#msg_accountNo').html('Please Enter Account Number').show();
        //      $('#accountNo').focus();
        //    }
        //   if(isValid && index==3){  
           
        //     $('#msg_contactNo').html('').hide();
        //     $("#step-14").hide();
        //    $("#step-15").hide();
        //    $("#step-16").hide();
        //    $("#step-17").show();
            
        //     setClasses(index, steps); 
        //     $(".buttonNext").prop('disabled', true);
        //    isValid = false;   
        //   }
        //    return isValid;
        // }
        // function validateStep4(index, steps){  
        //   alert("success")
        //   return true;
        // }
  
        // /* ---------------------------------------------------------------------------------------------------------------------- */
  
        // function validateStep1entry(index, steps){
        //   $('#vendorNameentry').focus();
          
        //   $('#msg_vendorNameentry').html('').hide();
        //   $('#msg_shortcodeentry').html('').hide();
        //   $('#msg_CINNoentry').html('').hide();
        //   $('#msg_GSTNoentry').html('').hide();
        //   $('#msg_Officialemailentry').html('').hide();
        //   $('#msg_officenoentry').html('').hide();
        //    var isValid = true; 
        //    var vendorname = $('#vendorNameentry').val();
        //    var shortcode = $('#shortCodeentry').val();
        //    var cin = $('#CINNoentry').val();
        //    var gstno = $('#GSTNoentry').val();
        //    var officialNo = $('#officialNoentry').val();
        //    var ofcemailId = $('#officialEmailentry').val();
  
        //    // Validate Vendor Name
        //    if(!vendorname && vendorname.length <= 0){
        //      isValid = false;
        //      $('#msg_vendorNameentry').html('Please Enter Vendor Name').show();
        //      $('#vendorNameentry').focus();
        //    }else
        //    if(!shortcode && shortcode.length <= 0){
        //     // validate short code
        //      isValid = false;
        //      $('#msg_shortcodeentry').html('Please Enter Short Code').show(); 
        //      $('#shortCodeentry').focus();        
        //    }else if(cin.length <= 0){
        //     // validate cin no
        //      isValid = false;
        //      $('#msg_CINNoentry').html('Please Enter CIN No').show();     
        //      $('#CINNoentry').focus();    
        //    }else if(!gstno && gstno.length <= 0 ){
        //     // validate GST No
        //     isValid = false;
        //     $('#msg_GSTNoentry').html('Please Enter GST No').show(); 
        //     $('#GSTNoentry').focus();        
        //   }else if(!officialNo && officialNo.length <= 0 ){
        //     // validate GST No
        //     isValid = false;
        //     $('#msg_officenoentry').html('Please Enter Office No').show(); 
        //     $('#officialNoentry').focus();        
        //   }else if(!officialNo && officialNo.length <= 0 ){
        //     // validate GST No
        //     isValid = false;
        //     $('#msg_officenoentry').html('Please Enter Office No').show(); 
        //     $('#officialNoentry').focus();        
        //   }
          
        //   if(isValid && index==1 ){  
            
        //     $('#msg_vendorNameentry').html('').hide();
        //     $('#msg_shortcodeentry').html('').hide();
        //     $('#msg_CINNoentry').html('').hide();
        //     $('#msg_GSTNoentry').html('').hide();
        //     $('#msg_Officialemailentry').html('').hide();
        //     $('#msg_officenoentry').html('').hide();
        //     $("#stepentry-14").hide()
        //     $("#stepentry-15").show();
        //     $("#stepentry-16").hide();
        //     $("#stepentry-17").hide();
             
        //    setClasses(index, steps);
        //    $('#contactNoentry').focus();
        //    isValid = false;   
        //   }
        //    return isValid;
        // }
  
  
        // function validateStep2entry(index, steps){
        //   $('#contactNoentry').focus();
        //   $('#msg_contactNoentry').html('').hide();
        //   $('#msg_alternateNoentry').html('').hide();
        //   $('#msg_Stateentry').html('').hide();
        //   $('#msg_cityentry').html('').hide();
        //    var isValid = true; 
        //    var contactNo = $('#contactNoentry').val();
        //    var alternateNo = $('#alternateNoentry').val();
        //    var state = $('#stateentry').val();
        //    var city = $('#cityentry').val();
        //    // Validate Contact Name
        //    if(!contactNo && contactNo.length <= 0){
        //      isValid = false;
        //      $('#msg_contactNoentry').html('Please Enter Contact Number').show();
        //      $('#contactNoentry').focus();
        //    }else
        //    if(!alternateNo && alternateNo.length <= 0){
        //     // validate Alternate Number
        //      isValid = false;
        //      $('#msg_alternateNoentry').html('Please Enter Alternate Number').show(); 
        //      $('#alternateNoentry').focus();        
        //    }else if(state.length <= 0){
        //     // validate state
        //      isValid = false;
        //      $('#msg_Stateentry').html('Please Enter State').show();     
        //      $('#stateentry').focus();    
        //    }else if(!city && city.length <= 0 ){
        //     // validate city
        //     isValid = false;
        //     $('#msg_cityentry').html('Please Enter City').show(); 
        //     $('#cityentry').focus();        
        //   }
  
        //   if(isValid && index==2){  
           
        //     $('#msg_contactNoentry').html('').hide();
        //      $('#msg_alternateNoentry').html('').hide();
        //      $('#msg_state').html('').hide();
        //   $('#msg_city').html('').hide();
        //   $("#step-15").hide();
        //   $("#step-14").hide()
        //   $("#step-16").show();
        //   $("#step-17").hide();
        //   $('#accountNo').focus();
           
        //   $(".buttonFinish").prop('disabled', false);
        //   $(".buttonNext").prop('disabled', true);
        //     setClasses(index, steps);
        //    isValid = false;   
        //   }
  
        //    return isValid;
        // }
  
  
  
  
  
  
        $('#vendorNameentry').focus();
        $(".buttonFinish").prop('disabled', true);
        $("#stepentryentry-14").show();
        $("#stepentryentry-15").hide();
        $("#stepentryentry-16").hide();
        $("#stepentryentry-17").hide();
        function setClassesentry(index, steps) {
          if (index < 0 || index > steps) return;
          if(index == 0) {
            $("#preventry").prop('disabled', true);
          } else {
            $("#preventry").prop('disabled', false);
          }
          if(index == steps) {
            $("#nextentry").text('done');
          } else {
            $("#nextentry").text();
          }
          $(".step-wizardentry ul li").each(function() {
            $(this).removeClass();
          });
          $(".step-wizardentry ul li:lt(" + index + ")").each(function() {
            $(this).addClass("done");
          });
          $(".step-wizardentry ul li:eq(" + index + ")").addClass("active")
          var p = index * (100 / steps);
          $("#progentry").width(p + '%');
        }
        $(".step-wizardentry ul button").click(function() {
          var step = $(this).find("div.step")[0].innerText; 
          var steps = $(".step-wizardentry ul li").length; 
          validateAllStepsentry(step- 1 , steps);
        });
        $("#preventry").click(function(){
          var step = $(".step-wizardentry ul li.active div.step")[0].innerText;
          var steps = $(".step-wizardentry ul li").length; 
          setClassesentry(step - 2, steps - 1);
          displayreviousSectionentry(step - 1);   
        });
        $("#nextentry").click(function(){
          if ($(this).text() == 'done') {
           // alert("submit the form?!?")
          } else {
            var step ;
            try {
              step = $(".step-wizardentry ul li.active div.step")[0].innerText; 
            } catch (error) {
              step = $(".step-wizardentry ul li div.step")[0].innerText; 
            }
            
            var steps = $(".step-wizardentry ul li").length;   
            validateAllStepsentry(step , steps- 1);   
            //setClassesentry(step, steps - 1);
          }
        });
        
        // initial state setup
       setClassesentry(0, $(".step-wizardentry ul li").length);
       
        function displayreviousSectionentry(index){
          
        $("#nextentry").prop('disabled', false);
          switch(index) {
            case 0:                    
                    $("#stepentry-14").show();
                    $("#stepentry-15").hide();
                    $("#stepentry-16").hide();
                    $("#stepentry-17").hide();
              break;
            case 1:     
                    $("#stepentry-14").show();
                    $("#stepentry-15").hide();
                    $("#stepentry-16").hide();
                    $("#stepentry-17").hide();
              break;
            case 2:                         
                  $("#stepentry-14").hide();
                  $("#stepentry-15").show();
                  $("#stepentry-16").hide();
                  $("#stepentry-17").hide();
              break;
            // case 3:                         
            //       $("#stepentry-14").hide();
            //       $("#stepentry-15").hide();
            //       $("#stepentry-16").show();
            //       $("#stepentry-17").hide();
            //   break;
            default:                
                $("#stepentry-14").show();
                $("#stepentry-15").hide();
                $("#stepentry-16").hide();
                $("#stepentry-17").hide();
          }
        }
  
        function validateAllStepsentry(index, steps){
          var isStepValid = true;
          
                    
          if(validateentryStep1(index, steps) == false){
            isStepValid = false;       
          }else
          if(validateentryStep2(index, steps) == false){
            isStepValid = false;       
          }else
          if(validateentryStep3(index, steps) == false){
            isStepValid = false;        
           }
           //else
          //  if(validateentryStep4(index, steps) == false){
          //   isStepValid = false;        
          // }
          return isStepValid;
       }
  
       function validateentryStep1(index, steps){
        $('#devicetypeentry').focus();
        
        $('#msg_devicetypeentry').html('').hide();
        $('#msg_vendorlistentry').html('').hide();
        $('#msg_modelcodeentry').html('').hide();
        $('#msg_modelnameentry').html('').hide();
      
         var isValid = true; 
         var devicetype = $('#devicetypeentry').val();
         var vendorlist = $('#vendorlistentry').val();
         var modelcode = $('#modelcodeentry').val();
         var modelname = $('#modelnameentry').val();  
         var tacertno = $('#taccertnoaa').val();
       
         // Validate devicetype
         if(!devicetype && devicetype==null){
           isValid = false;
           $('#msg_devicetypeentry').html('Please Enter Device Type. ').show();
           $('#devicetypeentry').focus();
         }else
         if(!vendorlist  && vendorlist==null){
          // validate vendorlist
           isValid = false;
           $('#msg_vendorlistentry').html('Please Enter Vendor List.').show(); 
           $('#vendorlistentry').focus();        
         }else if(!modelcode && modelcode.length <= 0 || modelcode.length < 2){
          // validate  model code
           isValid = false;
           $('#msg_modelcodeentry').html('Please Enter Model Code.').show();     
           $('#modelcodeentry').focus();    
         }else if(!modelname && modelname.length <= 0 || modelname.length <= 2 ){
          // validate model name
          isValid = false;
          $('#msg_modelnameentry').html('Please Enter Model Name.').show(); 
          $('#modelnameentry').focus();        
        }  
       /*  else if ((tacertno.length < 3) && (tacertno != null && tacertno != '')){
          // validate model name
          isValid = false;
          $('#msg_modelnameentry').html('Please Enter Model Name.').show(); 
          $('#modelnameentry').focus();        
        } */
        
        if(isValid && index==1 ){  
          
          $('#msg_devicetypeentry').html('').hide();
          $('#msg_vendorlistentry').html('').hide();
          $('#msg_modelcodeentry').html('').hide();
          $('#msg_modelnameentry').html('').hide();
       
          $("#stepentry-14").hide()
          $("#stepentry-15").show();
          $("#stepentry-16").hide();
          $("#stepentry-17").hide();
           
         setClassesentry(index, steps);
         $('#CertAutho').focus();
         $(".buttonFinish").prop('disabled', false);
         $(".buttonNext").prop('disabled', true);
         isValid = false;   
        }
         return isValid;
      }
  
  
      function validateentryStep2(index, steps){
        $('#devmodremark').focus();
         $('#msg_devmodremark').html('').hide();
        // $('#msg_contactNoentry').html('').hide();
        // $('#msg_alternateNoentry').html('').hide();
        // $('#msg_Stateentry').html('').hide();
        // $('#msg_cityentry').html('').hide();
        // $('#msg_regaddentry').html('').hide();
        var isValid = true; 
        var devmodremark = $('#devmodremark').val();
        //  var contactNo = $('#contactNoentry').val();
        //  var alternateNo = $('#alternateNoentry').val();
        //  var state = $('#stateentry').val();
        //  var city = $('#cityentry').val();
        //  var regadd = $('#regaddressentry').val();
         // Validate Contact Name
         if(!devmodremark && devmodremark.length <= 0){
          isValid = false;
          $('#msg_devmodremark').html('Please Enter Remark').show();
          $('#devmodremark').focus();
        }
        //  if(!contactNo && contactNo.length <= 0){
        //    isValid = false;
        //    $('#msg_contactNoentry').html('Please Enter Contact Number').show();
        //    $('#contactNoentry').focus();
        //  }else
        //  if(!alternateNo && alternateNo.length <= 0){
        //   // validate Alternate Number
        //    isValid = false;
        //    $('#msg_alternateNoentry').html('Please Enter Alternate Number').show(); 
        //    $('#alternateNoentry').focus();        
        //  }else if(state.length <= 0){
        //   // validate state
        //    isValid = false;
        //    $('#msg_Stateentry').html('Please Enter State').show();     
        //    $('#stateentry').focus();    
        //  }else if(!city && city.length <= 0 ){
        //   // validate city
        //   isValid = false;
        //   $('#msg_cityentry').html('Please Enter City').show(); 
        //   $('#cityentry').focus();        
        // }else if(!regadd && regadd.length <= 0 ){
        //   // validate city
        //   isValid = false;
        //   $('#msg_cityentry').html('Please Enter City').show(); 
        //   $('#regaddressentry').focus();        
        // }
  
        if(isValid && index==2){  
         
          $('#msg_devmodremark').html('').hide();
          // $('#msg_contactNoentry').html('').hide();
          //  $('#msg_alternateNoentry').html('').hide();
          //  $('#msg_stateentry').html('').hide();
          //  $('#msg_cityentry').html('').hide();
          //  $('#msg_regaddentry').html('').hide();
        $("#stepentry-15").hide();
        $("#stepentry-14").hide()
        $("#stepentry-17").show();
        $("#stepentry-18").hide();
        $('#accountNoentry').focus();
         
        $(".buttonFinish").prop('disabled', false);
        $(".buttonNext").prop('disabled', true);
          setClassesentry(index, steps);
         isValid = false;   
        }
  
         return isValid;
      }
  
  
     // function validateentryStep3(index, steps){
             
       // $('#accountNoentry').focus();
       //  var isValid = true;    
        //  var accountNo = $('#accountNoentry').val();
        //  $('#msg_accountNoentry').html('').hide();
         // Validate Account No
        //  if(!accountNo && accountNo.length <= 0){
        //    isValid = false;
        //    $('#msg_accountNoentry').html('Please Enter Account Number').show();
        //    $('#accountNoentry').focus();
        //  }
        //if(isValid && index==3){  
         
        //  $('#msg_accountNoentry').html('').hide();
        //  $("#stepentry-14").hide();
        // $("#stepentry-15").hide();
        // $("#stepentry-16").hide();
        // $("#stepentry-17").show();
          
      //     setClassesentry(index, steps); 
      //     $("#nextentry").prop('disabled', true);
      //    isValid = false;   
      //   }
      //    return isValid;
      // }
      function validateentryStep3(index, steps){  
       // alert("success")
        return true;
      }      
  
        });
  
  
  
        
      })(jQuery);
      this.EncryptPageName();
      this.EncryptPageUrl();

      
      //this.Vendorlist();
      this.DeviceTypeList();
      this.CertificateAuthlist();
      this.stepno = 3;
  }
  EncryptPageName() {
    this.cryptService.encrypt("Device Model New")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
   // console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
   // console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }
   /* ------------------- Device Type Api -------------------*/
   CertificateAuthlist(){
  
    let keydata = {
    
      pageID: "8",
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

        let vendorlist = resdatalist;
      //  let resdatadev = resdata['list'];
      //  console.log(resdatadev);
       // console.log(statelist); 
        this.ListOfVendor$ = vendorlist;
      
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

        let devicelist = resdatalist;
      //  let resdatadev = resdata['list'];
      //  console.log(resdatadev);
       // console.log(certlist);
        this.ListOfDevicetype$ = devicelist;
      
        this.loading = false; 
       
      });
  }
  /* -----------------------Device Model Save api -----------------*/
 

  /* -----------------------Device Model Save api End -----------------*/

  DeviceNormOnchange(){
    var devnorm = $('#devicetypeentry').val();
    if(devnorm == "basic")
    {

       // alert("sdsf"+devnorm);
        this.stepno = 2;
        document.getElementById("stepentry-15").style.display="none";
      //  document.getElementById("step2").style.display="none";
        $("#step2").prop('disabled', true);
        $(".buttonFinish").prop('disabled', false);
        $(".buttonNext").prop('disabled', true);
    }else if(devnorm == "AIS140")
    {
       // alert("sadhsb"+devnorm);
        this.stepno = 3;
        document.getElementById("stepentry-15").style.display="none";
        document.getElementById("step2").style.display="block";
        $(".buttonFinish").prop('disabled', true);
        $(".buttonNext").prop('disabled', false);
    }
  }


}
