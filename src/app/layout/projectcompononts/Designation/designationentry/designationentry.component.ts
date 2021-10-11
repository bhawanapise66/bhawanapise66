import { DesignationmodelService } from './../../../../APIService/designationmodel.service';
import { PlaceodrmodelService } from './../../../../APIService/placeodrmodel.service';
import { CustomermodelService } from './../../../../APIService/customermodel.service';
import { Router } from '@angular/router';
import { ListService } from './../../../../../list.service';

import { Paramcls } from './../../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as $ from 'jquery';
import { CryptService } from '../../services/crypt.service';
declare var jQuery: any;
declare var $: any;
declare var AddLoader:any;
declare var RemoveLoader:any;

@Component({
  selector: 'app-designationentry',
  templateUrl: './designationentry.component.html',
  styleUrls: ['./designationentry.component.css']
})
export class DesignationentryComponent implements OnInit {
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  
  pageUrl = this.router.url;

  public loading = false; p: number;   pagecount:number;
  SelectPageText:string;  Tipsdetails:string;  SelectPagetype$:Object;
  count:number; viewcount:number;
  private _success = new Subject<string>();  successMessage: string; supplierofText:string; remarkText:string;
  datafromrespo:string;DesignationentryText22:string; filter:any;
  DivisionText:string; regaddressText:string; employeeentryText:string; mobilenoentryText:string; officialemailentryText:string; DesignationentryText:string;

  constructor(private modalService: NgbModal,private flashMessage: FlashMessagesService ,private listService:ListService, private cryptService:CryptService,private router:Router, private designationService:DesignationmodelService, private placeodrService:PlaceodrmodelService ) { }

  ngOnInit() {

    (function ($) {
      $(document).ready(function() {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#Designationnewentry').focus();
      })
    });
    })(jQuery);

    (function ($) {
      $(document).ready(function() {
        $('#Designationnewentry').focus();
        $(".buttonFinish").prop('disabled', false);
        $(".buttonNext").prop('disabled', false);
        $("#step-14").show();
        $("#step-15").hide();
        $("#step-16").hide();
        $("#step-17").hide();
        $("#step-14").show();
        $("#stepentry-15").hide();
        $("#stepentry-16").hide();
        $("#stepentry-17").hide();
        






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
          $("#nextentry").text();
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
          case 3:                         
                $("#stepentry-14").hide();
                $("#stepentry-15").hide();
                $("#stepentry-16").show();
                $("#stepentry-17").hide();
            break;
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
        }else
         if(validateentryStep4(index, steps) == false){
          isStepValid = false;        
        }
        return isStepValid;
     }

     function validateentryStep1(index, steps){
      $('#distrbutorname').focus();
       $('#msg_errorentry').html('').hide();
      // $('#msg_vendorName').html('').hide();
      // $('#msg_shortcode').html('').hide();
      // $('#msg_OfficialNo').html('').hide();
      // $('#msg_Officialemail').html('').hide();
       var isValid = true; 
       var Distname = $('#distrbutornameentry').val();
       var DealerName = $('#dealernameentry').val();
      // alert("sdjb"+distributorname);
       var customertype = $('#customertypeentry').val();
       var companyname = $('#companynameentry').val();
       //Validate Vendor Name
       
      
      if(isValid && index==1 ){  
        
        // $('#msg_vendorName').html('').hide();
        // $('#msg_shortcode').html('').hide();
        // $('#msg_OfficialNo').html('').hide();
        // $('#msg_Officialemail').html('').hide();
        $('#msg_errorentry').html('').hide();
        $("#stepentry-14").hide()
        $("#stepentry-15").show();
        $("#stepentry-16").hide();
        $("#stepentry-17").hide();
         
       setClassesentry(index, steps);
       $(".buttonFinish").prop('disabled', false);
       $(".buttonNext").prop('disabled', true);
       $('#pername').focus();
       isValid = false;   
      }
       return isValid;
    }


    function validateentryStep2(index, steps){
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
      $("#stepentry-15").hide();
      $("#stepentry-14").hide()
      $("#stepentry-16").show();
      $("#stepentry-17").hide();
      $('#accountNo').focus();
       
      $(".buttonFinish").prop('disabled', false);
      $(".buttonNext").prop('disabled', true);
        setClassesentry(index, steps);
       isValid = false;   
      }
  
       return isValid;
    }


    function validateentryStep3(index, steps){
           
      $('#accountNoentry').focus();
       var isValid = true;    
       var accountNo = $('#accountNoentry').val();
       $('#msg_accountNoentry').html('').hide();
       // Validate Account No
       if(!accountNo && accountNo.length <= 0){
         isValid = false;
         $('#msg_accountNoentry').html('Please Enter Account Number').show();
         $('#accountNoentry').focus();
       }
      if(isValid && index==3){  
       
        $('#msg_accountNoentry').html('').hide();
        $("#stepentry-14").hide();
       $("#stepentry-15").hide();
       $("#stepentry-16").hide();
       $("#stepentry-17").show();
        
        setClassesentry(index, steps); 
        $("#nextentry").prop('disabled', true);
       isValid = false;   
      }
       return isValid;
    }
    function validateentryStep4(index, steps){  
     // alert("success")
      return true;
    }      

      });



      
    })(jQuery);
   
    this.clearfunction();
    this.EncryptPageName();
    this.EncryptPageUrl();
    //this.Distributorlist();
    //this.Dealerlist();
    this._success.subscribe((message) => this.successMessage = message);    
      
      this._success.pipe(
        debounceTime(8000)
      ).subscribe(() => this.successMessage = null);
  }

  EncryptPageName() {
    this.cryptService.encrypt("Designation Enytry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
   // console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
   // console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }
  DescriptionentryText:string; employeeNameentry:string;
  vensavebtn(){
    var Designation = $('#Designationnewentry').val();
    var description = $('#DescriptionEntry').val();
    this.DesignationentryText = this.DesignationentryText.substring(0, 1).toUpperCase() + this.DesignationentryText.substring(1);
    this.DescriptionentryText = this.DescriptionentryText.substring(0, 1).toUpperCase() + this.DescriptionentryText.substring(1);
    var isValid = true;
    //$('#msg_accountNo').html('').hide();
    // Validate Account No
    if(!Designation && Designation.length <= 0){
      isValid = false;
      $('#msg_errorentry').html('Please Enter Designation').show();
      $('#Designationnewentry').focus();
      setTimeout(function(){document.getElementById("msg_errorentry").style.display="none";}, 3000);
    }
    else if(!description && description.length <= 0){
      isValid = false;
      $('#msg_errorentry').html('Please Enter Description').show();
      $('#DescriptionEntry').focus();
      setTimeout(function(){document.getElementById("msg_errorentry").style.display="none";}, 3000);
    }
    
   else{
      let dataL = {
        param1:"",
        param2:"",
        param3:this.DesignationentryText, param4:this.DescriptionentryText, 
        param5:this.employeeentryText, param6:this.mobilenoentryText, param7:this.officialemailentryText, param8:"", param9:"",
        //  param11:"", param12:"", 
        
         pageID: "7",
         pageName: this.encryptedpageNameValue,
         pageURL: this.encryptedpageUrlValue
          }
          try{AddLoader()}catch(e){alert(e)} 
      this.designationService.InsertDesignationAPI(dataL).subscribe((data)=>{
        try{RemoveLoader()}catch(e){alert(e)} 
      //  alert(data);
        this.datafromrespo = data.entity;
       // alert(this.datafromrespo);

       if(this.datafromrespo == 'Successfully Saved.')
       {
        // alert(this.datafromrespo);
       $("#SuccessModalEntry").modal('show');
       $("#exampleModal").modal('show');
         
       $('.modal-backdrop.show').css('display', 'none');
      this.clearfunction();
       }
       else
       {
        $("#ErrorModalEntry").modal('show');
       }
      });
     // alert("error in inserting data");
  
    }
  }

  DesignationDetails$:Object;
  DesignationDetail() {
       
    this.loading = true; 
        
    this.p = 1; this.pagecount = 5;
  //  console.log("p" + this.p);
    
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
     this.designationService.DesignationDetailsAPI(keydata).subscribe(
      (data)  => {
        try{RemoveLoader()}catch(e){alert(e)} 
      //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        let resdatalist = data.entity.list; 
       //  this.resdata = 
       // console.log("wekcome_ "+resdata);
 
         let vendorlist = resdatalist;
         this.count = data.entity.count;
         this.viewcount = data.entity.viewCount;
         this.DesignationDetails$ = vendorlist;
       
         this.loading = false; 
      });
}

desidetailsentry(){
  this.DesignationDetail();
}

clearfunction(){
  this.DesignationentryText="";
  this.DescriptionentryText="";
}

}
