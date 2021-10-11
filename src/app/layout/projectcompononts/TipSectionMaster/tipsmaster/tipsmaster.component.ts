import { PlaceodrmodelService } from './../../../../APIService/placeodrmodel.service';
import { Router } from '@angular/router';
//import { DevicemodelService } from './../../../../../devicemodel.service';
import { ListService } from './../../../../../list.service';
import { PostService } from './../../../../../post.service';
import { Paramcls } from './../../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit , ElementRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as $ from 'jquery';
import * as xlsx from 'xlsx'
import { CryptService } from '../../services/crypt.service';

declare var jQuery: any;


@Component({
  selector: 'app-tipsmaster',
  templateUrl: './tipsmaster.component.html',
  styleUrls: ['./tipsmaster.component.css']
})
export class TipsmasterComponent implements OnInit {
  @ViewChild('epltable',{ static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  
  pageUrl = this.router.url;
  public loading = false; p: number;   pagecount:number; count:number; viewcount:number;
  SelectPageText:string;  PlaceOrderDetails$:Object;  remarkText:string; deleteText:string;
  private _success = new Subject<string>();  successMessageUpdate: string;

  constructor( private modalService: NgbModal,private flashMessage: FlashMessagesService , private postService:PostService,private listService:ListService, private cryptService:CryptService,private router:Router, private placeodrService:PlaceodrmodelService ) { }
  write_privilege:string;

  ngOnInit() {

    /* ----------------------------------- Wizards start Ts------------------------------------------------- */
    this.write_privilege =sessionStorage.getItem('writePrivilege');

    if(this.write_privilege == "false")
    {
      $("#editbtn").css("display", "none");
      $("#deletebtn").css("display", "none");
      $("#addnewtip").css("display", "none");
     $('#editbtn').hide();
     $('.material-icons md-18').css("display", "none");
     $('#deletebtn').attr('disabled','disabled');
     $('#addnewtip').attr('disabled','disabled');
    }

    (function ($) {
      $(document).ready(function() {
        $('#vendorName').focus();
        $(".buttonFinish").prop('disabled', false);
        $(".buttonNext").prop('disabled', false);
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
       // $('#msg_vendorName').html('').hide();
       // $('#msg_shortcode').html('').hide();
      //  $('#msg_OfficialNo').html('').hide();
      //  $('#msg_Officialemail').html('').hide();
         var isValid = true; 
         var noofdevice = $('#noofdevice').val();
         var mobno = $('#Mobno').val();
        
         var Remark = $('#Remark').val();
         var officialemail = $('#officialEmail').val();
         // Validate Vendor Name
         if(!noofdevice && noofdevice.length <= 0){
           isValid = false;
           $('#msg_error').html('Please Enter Device No').show();
           $('#noofdevice').focus();
         }else 
         if(!mobno && mobno.length <= 0){
          // validate short code
           isValid = false;
           $('#msg_error').html('Please Enter Mobile No').show(); 
           $('#Mobno').focus();        
         }else if(!Remark && Remark.length <= 0 ){
          // validate Official No
          isValid = false;
          $('#msg_error').html('Please Enter Remark').show(); 
          $('#Remark').focus();        
        }
        
        if(isValid && index==1 ){  
          
          // $('#msg_vendorName').html('').hide();
          // $('#msg_shortcode').html('').hide();
          // $('#msg_OfficialNo').html('').hide();
          // $('#msg_Officialemail').html('').hide();
          $('#msg_error').html('').hide();
          // $("#step-14").hide()
          // $("#step-15").show();
          // $("#step-16").hide();
          // $("#step-17").hide();
           
         setClasses(index, steps);
         alert("djhf");
         $(".buttonFinish").prop('disabled', false);
         $('#pername').focus();
         isValid = false;   
        }
         return isValid;
      }
    
    
      function validateStep2(index, steps){
        $('#pername').focus();
        $('#msg_contactNo').html('').hide();
        $('#msg_alternateNo').html('').hide();
        $('#msg_State').html('').hide();
        $('#msg_city').html('').hide();
         var isValid = true; 
         var personname = $('#pername').val();
         var contactNo = $('#contactNo').val();
         var alternateNo = $('#alternateNo').val();
         var regaddress = $('#regaddressnew').val();
         var state = $('#state').val();
         var city = $('#city').val();
         var pinCodeNo = $('#pincodeno').val();
         // Validate Contact Name
         if(!personname && personname.length <= 0){
          isValid = false;
          $('#msg_pername').html('Please Enter Contact Number').show();
          $('#pername').focus();
        }else
         if(!contactNo && contactNo.length <= 0){
           isValid = false;
           $('#msg_contactNo').html('Please Enter Contact Number').show();
           $('#contactNo').focus();
         }else
         if(!alternateNo && alternateNo.length <= 0){
          // validate Alternate Number
           isValid = false;
           $('#msg_alternateNo').html('Please Enter Alternate Number').show(); 
           $('#alternateNo').focus();        
         }
         else
         if(!regaddress && regaddress.length <= 0){
          // validate Alternate Number
           isValid = false;
           $('#msg_regadd').html('Please Enter Reg Address').show(); 
           $('#regaddressnew').focus();        
         }
         else if(state.length <= 0 && state == 'choose'){ 
          // validate state
           isValid = false;
           $('#msg_State').html('Please Enter State').show();     
           $('#state').focus();   
    
         }else if(!city && city.length <= 0 && city == 'choose' ){
          // validate city
          isValid = false;
          $('#msg_city').html('Please Enter City').show(); 
          $('#city').focus();        
        }else
        if(!pinCodeNo && pinCodeNo.length <= 0){
         // validate Alternate Number
          isValid = false;
          $('#msg_pincode').html('Please Enter Valid Pincode No.').show(); 
          $('#alternateNo').focus();        
        }
    
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
      function validateStep4(index, steps){  
       // alert("success");
        return true;
      }
      });
    })(jQuery);
    this.EncryptPageName();
    this.EncryptPageUrl();

   // this.PlaceOrderDetail();
   this._success.subscribe((message) => this.successMessageUpdate = message);    
      
   this._success.pipe(
     debounceTime(8000)
   ).subscribe(() => this.successMessageUpdate = null);
 
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
   // this.Citylist();
   if(this.write_privilege == "false")
   {
     $('#editbtn').hide();
   }  
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
  if(this.write_privilege == "false")
  {
    $('#editbtn').hide();
  }
  }
  vensaveeditbtn(){
    var selectpageup = $('#selectpageuup').val();
    var tipupdate = $('#Tipupdate').val();
    var isValid = true;   
    // alert("sja"+selectpage);
    // alert("aaaa"+tipentry);
    if(selectpageup == null)
    {
      isValid = false;
    //  $('#msg_errorentry').html('Please Enter Select Page ').show();
      this._success.next('Please Enter Select page.'); 
      $('#selectpageuup').focus();
    }
    else if(!tipupdate && tipupdate.length <= 0){
      isValid = false;
   //   $('#msg_errorentry').html('Please Enter Tip ').show();
   this._success.next('Please Enter Tip'); 
      $('#Tipupdate').focus();
    }
  }
  Refreshfunction(){

  }
  createPDF(){

  }
  SelectRows(){

  }
  searchdata(){

  }
  exportToExcel(){
    
  }

}
