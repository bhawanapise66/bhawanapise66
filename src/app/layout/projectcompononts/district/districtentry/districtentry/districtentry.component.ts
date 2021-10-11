import { DistrictdetailsComponent } from './../../districtdetails/districtdetails/districtdetails.component';
import { DistrictmodelService } from './../../../../../APIService/districtmodel.service';
import { CryptService } from './../../../services/crypt.service';
import { ListService } from './../../../../../../list.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';import { Router } from '@angular/router';
import * as $ from 'jquery';
declare var SuccessAlert: any;
declare var errorAlert: any;
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
@Component({
  selector: 'app-districtentry',
  templateUrl: './districtentry.component.html',
  styleUrls: ['./districtentry.component.css']
})


export class DistrictentryComponent implements OnInit {
  @Output()
  showDetails = new EventEmitter();
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  
  pageUrl = this.router.url;
  
  count:number; viewcount:number;
  public loading = false; p: number; pagecount:number;
  CustRemarktext:string;
  
  datafromrespo:string;countnumber:number
  
   
  districtnameText:string;
  descriptionText:string;
 
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };
  constructor(private modalService: NgbModal,private flashMessage: FlashMessagesService ,private listService:ListService, private cryptService:CryptService,private router:Router, public districtmodelService:DistrictmodelService) { }


  inputmake:string;
  inputdescription:string;


  ngOnInit() {

    (function ($) {
      $(document).ready(function() {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#stateentry').focus();
      })
    });
    })(jQuery);
        
    (function ($) {
      $(document).ready(function() {
        $('#vendorName').focus();
        $(".buttonFinish").prop('disabled', false);
        $("#step-14").show();
        $("#step-15").hide();
        $("#step-16").hide();
        $("#step-17").hide();
        $("#step-14").show();
        $("#stepentry-15").hide();
        $("#stepentry-16").hide();
        $("#stepentry-17").hide();
        






      $('#vendorNameentry').focus();
      $(".buttonFinish").prop('disabled', false);
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
     
       var customertype = $('#customertypeentry').val();
       var customercatagory = $('#customercategoryentry').val();
       var companyname = $('#companynameentry').val();
       //Validate Vendor Name
       if(Distname == null){
         isValid = false;
 
         $('#msg_errorentry').html('Please Enter Distributor Name').show();
         $('#distrbutorname').focus();
       }else 
       if(DealerName == null){
        // validate short code
         isValid = false;
         $('#msg_errorentry').html('Please Enter Dealer Name').show(); 
         $('#dealername').focus();        
       }else if( customertype == null){
        // validate Official No
        isValid = false;
        $('#msg_errorentry').html('Please Enter Customer Type').show(); 
        $('#customertypeentry').focus();        
      }else if( customercatagory == null){
        // validate Official No
        isValid = false;
        $('#msg_errorentry').html('Please Enter Customer Catagory').show(); 
        $('#customercategoryentry').focus(); 
      }
      else if(!companyname && companyname.length <= 0){
        // validate Official Email
        isValid = false;
        $('#msg_errorentry').html('Please Enter Company Name').show(); 
        $('#companynameentry').focus();        
      }
      
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
      $('#msg_error_contactentry').html('').hide();
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
        $('#msg_error_contactentry').html('Please Enter Person Name').show();
        $('#pername').focus();
      }else
       if(!contactNo && contactNo.length <= 0){
         isValid = false;
         $('#msg_error_contactentry').html('Please Enter Contact Number').show();
         $('#contactNo').focus();
       }
      
       else if(state == null){ 
        // validate state
         isValid = false;
         $('#msg_error_contactentry').html('Please Enter State').show();     
         $('#state').focus();   
  
       }else if(city == null){
        // validate city
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter City').show(); 
        $('#city').focus();        
      }
      else
      if(!regaddress && regaddress.length <= 0){
       // validate Alternate Number
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Reg Address').show(); 
        $('#regaddressnew').focus();        
      }else
      if(!pinCodeNo && pinCodeNo.length <= 0){
       // validate Alternate Number
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Valid Pincode No.').show(); 
        $('#alternateNo').focus();        
      }
  
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
  
      return true;
    }      

      });



      
    })(jQuery);
    this.Statelist();
    this.EncryptPageName();
    this.EncryptPageUrl();
  }



  ListOfState$:Object;
  ListOfState = [];
  statecode:any;
  stateid:any;
  Statelist(){
  
    let keydata = {
      pageID: "7",
       pageName: this.encryptedpageNameValue,
       pageURL: this.encryptedpageUrlValue
    }  
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectStateListAPI(keydata).subscribe(
      (data)  => {
        try { RemoveLoader() } catch (e) { alert(e) }
this.ListOfState =data.entity.list;

        this.loading = false; 
       
      });
  }

  EncryptPageName() {
    this.cryptService.encrypt("District Master Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
 

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  
  }
  stateText:any;
  selectstate:string;
  statecode1:string;
  vensavebtn1(){
 var DistrictName = $('#namedistrictid').val();
  
    var state = $('#dummynameentrytxtid').val();
 
    this.districtnameText = DistrictName.substring(0, 1).toUpperCase() + DistrictName.substring(1);


    var isValid = true; 
   

    if(state== 'undefined' || (!state && state.length <= 0)) {
 
      isValid = false;
      $('#msg_errorentry22').html('Please Select State').show();
    
  setTimeout(function(){document.getElementById("msg_errorentry22").style.display="none";}, 3000);
    }
    else
    if(!DistrictName && DistrictName.length <= 0){
   
      isValid = false;
      $('#msg_errorentry22').html('Please Enter District Name').show();
      $('#namedistrictid').focus();
     setTimeout(function(){document.getElementById("msg_errorentry22").style.display="none";}, 3000);
    }
   
    else
     {
    
      let dataL = {
        param1:"",
        param2:"",
        param3:this.districtnameText,
        param4:this.selectstate, 
        param5:"India",
        param6:"",     //tahsil name
        param7:this.statecode1,
        param8:"",
        param9:"",
        pageID: "7",
         pageName: this.encryptedpageNameValue,
         pageURL: this.encryptedpageUrlValue
          }
          try { AddLoader() } catch (e) { alert(e) }
      this.districtmodelService.InsertDistrictAPI(dataL).subscribe((data)=>{
        try { RemoveLoader() } catch (e) { alert(e) }
      this.datafromrespo = data.entity;
      var msg = this.datafromrespo;
        if(data.statuscode == '200')
      {
        SuccessAlert(msg);
      this.clear();
      this.closemodal();
      this.showDetails.emit()
      }
      else
      {
        errorAlert(msg);

      }
      });
    }
   }


   closemodal() {
    $("#exampleModal").modal('hide');
    $('.modal-backdrop.show').css('display', 'none');
  }  
  dummynameText:any;
  selectdummystate()
  {
    this.selectstate = this.stateText.param1;
    this.statecode1=this.stateText.param3;
    this.dummynameText= this.selectstate;
  }
  itemsPerPage: number = 10;
  DistrictDetails$:any;

 clear()
{
  this.stateText=""; this.dummynameText="";this.districtnameText="";

}
}

 