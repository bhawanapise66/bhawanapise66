
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

@Component({
  selector: 'app-distributorassignment',
  templateUrl: './distributorassignment.component.html',
  styleUrls: ['./distributorassignment.component.css']
})
export class DistributorassignmentComponent implements OnInit {
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  
  pageUrl = this.router.url;

  public loading = false; p: number;   pagecount:number; count:number;

  distibutorText:string; 

  ListOfDistributor$:Object; ListOfDevicetype$:Object; ListOfDevicelist$:Object;
 
  noOfdeviceentryText:string; mobilenoentryText:string; remarkText:string;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };

  constructor(private modalService: NgbModal,private flashMessage: FlashMessagesService ,private listService:ListService, private cryptService:CryptService,private router:Router, private customerService:CustomermodelService, private placeodrService:PlaceodrmodelService ) { }


  ngOnInit() {
    
    (function ($) {
      $(document).ready(function() {
        $('#vendorName').focus();
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
   // this.Statelist();
    this.EncryptPageName();
    this.EncryptPageUrl();
    this.Distributorlist();
    this.Devicetypelist();
    this.Devicelist()
    //this.Dealerlist();
  }
  EncryptPageName() {
    this.cryptService.encrypt("Distributor Assignment")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
   // console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
   // console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }
  ListOfDistributor = [];
  Distributorlist(){
  
    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }  
    this.listService.DistributorListAPI(keydata).subscribe(
      (data)  => {
      
       let resdatalist = data.entity.list; 
      

        let statelist = resdatalist;
      
        this.ListOfDistributor = statelist;
      
        this.loading = false; 
       
      });
  }
  ListOfDevicetype = [];
  Devicetypelist(){
  
    let keydata = {
      param1 : "",
      param2 : "",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }  
    this.listService.DeviceTypeListAPI(keydata).subscribe(
      (data)  => {
      
       let resdatalist = data.entity.list; 
      

        let statelist = resdatalist;
      
        this.ListOfDevicetype = statelist;
      
        this.loading = false; 
       
      });
  }
  ListOfDevicelist = [];
  devicetypeText : any;
  devicetype:string;
  Devicelist(){
    this.devicetype = this.devicetypeText.param1;
    let keydata = {
      param1 : this.devicetype,
    
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }  
    this.listService.DeviceListAPI(keydata).subscribe(
      (data)  => {
      
       let resdatalist = data.entity.list; 
      

        let statelist = resdatalist;
      
        this.ListOfDevicelist = statelist;
      
        this.loading = false; 
       
      });
  }

  devicelistText:any;
  vensavebtn(){
    var DevicelisttypeArray=[];

    for (let i=0;i<this.devicelistText.length;i++) {
      DevicelisttypeArray.push(this.devicelistText[i].param2)
     console.log(("  id  ==== "+this.devicelistText[i].param2));
   }

   console.log(JSON.stringify(" id array  ========== "+DevicelisttypeArray));
  //  this.selectdevicetype = this.DeviceTypeTextentry.param1;
  //  this.selectvendorname = this.VendorNameTextentry.param1;
  //  this.selectcertautho = this.CertiAuthoentry.param1;

  //  let dataL = {
  //    param1:this.remarkDevModTextentry,
  //    param2:"",
  //    param3:this.Modelcodeentry, param4:this.ModelNameentry, param5:this.selectcertautho, param6:this.TACcertNoentry, param7:this.TACcertDateentry, param8:this.TACcertvalentry, param9:"11-10-2020", param10:this.COPcertNoentry,
  //     param11:this.COPcertDateentry, param12:this.COPcertvalentry,param13:"", param15:this.selectdevicetype, param14:this.selectvendorname, 
  //     pageID: "7",
  //     pageName: this.encryptedpageNameValue,
  //     pageURL: this.encryptedpageUrlValue
  //      }
  //  this.devicemodelService.InsertdevicemodelAPI(dataL).subscribe((data)=>{
  //  //  alert(dataL);
  //  //  alert(data);
  //  this.datafromrespo = data.entity;
  //   //alert(this.datafromrespo);
  //    if(this.datafromrespo == 'Successfully Saved.')
  //    {
  //    $("#successmodelentry").modal('show');
  //    }
  //    else
  //    {
  //     $("#notifymodelentry").modal('show');
  //    }
   
  //  });

  }
 
}
