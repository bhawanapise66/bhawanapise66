
import { Router } from '@angular/router';

import { ListService } from './../../../../../list.service';
//import { PostService } from './../../../../post.service';

import { Paramcls } from './../../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as xlsx from 'xlsx';
import * as $ from 'jquery';
import { CryptService } from '../../services/crypt.service';
//import * as $ from 'jquery';
declare var jQuery: any;

@Component({
  selector: 'app-blockvehicle',
  templateUrl: './blockvehicle.component.html',
  styleUrls: ['./blockvehicle.component.css']
})
export class BlockvehicleComponent implements OnInit {
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

   
  pageUrl = this.router.url;
  filter:string;
  
  selectRowsText:string; count:number; viewcount:number;
  vendornewText:string; shortcodeText:string;cinnoText:string; gstText:string;officialnoText:string;officialemailText:string; supplierofText:string;
 
  personnameText:string;personnoText:string;personaltnoText:string;personemailText:string;stateText:string;cityText:string;regaddressText:string;pincodeText:string;
 
  AreaText:string; landmarkText:string; remarkText:string;

  accountnoText:string;banknmText:string;branchnmText:string;ifscText:string;paymntText:string;
  vendordatadetails:Object;   

  vendor_id:string; ven_name:string; short_code:string; vendor_cin:string; vendor_gst:string;
  off_no:string; off_email:string; con_name:string; con_email:string; con_mobno:string;
  ven_state:string; ven_city:string; reg_add:string; pin_code:string; bank_acc:string;
  bank_name:string; bank_ifsc:string; bank_add:string;

  deleteText:string;     ListOfCity$:Object; ListOfState$:Object;  resdatalist=[]

  public loading = false;  pagecount:number;  stringifiedData: any; parsedJson: any; stringifiedDataList: any; parsedJsonList: any;
  nop :number; totrec:number; outorec:number; selectRows:string; Searchvendor:string; 
  VendorDetails$:Object;
  key: string = 'name'; reverse: boolean = true; config: any; p: number;

  constructor(private modalService: NgbModal,private flashMessage: FlashMessagesService ,private listService:ListService, private cryptService:CryptService,private router:Router) { }

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
        // $('#msg_OfficialNo').html('').hide();
        // $('#msg_Officialemail').html('').hide();
         var isValid = true; 
         var vendorname = $('#vendorName').val();
         var shortcode = $('#shortCode').val();
        
         var officialno = $('#officialNo').val();
         var officialemail = $('#officialEmail').val();
         // Validate Vendor Name
         if(!vendorname && vendorname.length <= 0){
           isValid = false;
           $('#msg_error').html('Please Enter Vendor Name').show();
           $('#vendorName').focus();
         }else 
         if(!shortcode && shortcode.length <= 0){
          // validate short code
           isValid = false;
           $('#msg_error').html('Please Enter Short Code').show(); 
           $('#shortCode').focus();        
         }else if(!officialno && officialno.length <= 0 ){
          // validate Official No
          isValid = false;
          $('#msg_error').html('Please Enter Official No').show(); 
          $('#officialNo').focus();        
        }else if(!officialemail && officialemail.length <= 0 ){
          // validate Official Email
          isValid = false;
          $('#msg_error').html('Please Enter Official Email').show(); 
          $('#officialEmail').focus();        
        }
        
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
         $('#pername').focus();
         isValid = false;   
        }
         return isValid;
      }
    
    
      function validateStep2(index, steps){
        $('#pername').focus();
        $('#msg_error_contact').html('').hide();
        // $('#msg_alternateNo').html('').hide();
        // $('#msg_State').html('').hide();
        // $('#msg_city').html('').hide();
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
          $('#msg_error_contact').html('Please Enter Person Name').show();
          $('#pername').focus();
        }
        
         else if(state == null){ 
          // validate state
           isValid = false;
           $('#msg_error_contact').html('Please Enter State').show();     
           $('#state').focus();   
    
         }else if(city == null ){
          // validate city
          isValid = false;
          $('#msg_error_contact').html('Please Enter City').show(); 
          $('#city').focus();        
        } else
        if(!regaddress && regaddress.length <= 0){
         // validate Alternate Number
          isValid = false;
          $('#msg_error_contact').html('Please Enter Reg Address').show(); 
          $('#regaddressnew').focus();        
        }else
        if(!pinCodeNo && pinCodeNo.length <= 0){
         // validate Alternate Number
          isValid = false;
          $('#msg_error_contact').html('Please Enter Valid Pincode No.').show(); 
          $('#alternateNo').focus();        
        }
    
        if(isValid && index==2){  
         
          $('#msg_error_contact').html('').hide();
        //    $('#msg_alternateNo').html('').hide();
        //    $('#msg_state').html('').hide();
        // $('#msg_city').html('').hide();
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
        //  var accountNo = $('#accountNo').val();
        //  $('#msg_accountNo').html('').hide();
        //  // Validate Account No
        //  if(!accountNo && accountNo.length <= 0){
        //    isValid = false;
        //    $('#msg_accountNo').html('Please Enter Account Number').show();
        //    $('#accountNo').focus();
        //  }
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

   // this.VendorDetail();
 
/* ------------------------------- Wizards end Ts------------------------------------------------- */
  }
  EncryptPageName() {
    this.cryptService.encrypt("Block Vehicle Details")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
  //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }

  selectblock(){
    var selblock = $("#selectblock").val();
   // alert(""+selblock);
   if(selblock=='login')
   {
     document.getElementById("maincontainer").style.display="block";
     document.getElementById("maincontainer2").style.display="none";
   }
   else if(selblock == 'vehicle')
   {
    document.getElementById("maincontainer2").style.display="block";
    document.getElementById("maincontainer").style.display="none";
   }
  }
  searchdata(){
  //   var search = $('#searchData').val();
  //   this.loading = true; 
          
  //   this.p = 1; this.pagecount = 5;
  // //  console.log("p" + this.p);
    
  //   let keydata = {
  //     pageNo:this.p,
  //     itemsPerPage:this.pagecount,    
  //     searchBy: search, 
  //     searchType:"",
  //     totalRecords:"NA",
  //     pageID: "7",
  //     pageName: this.encryptedpageNameValue,
  //     pageURL: this.encryptedpageUrlValue
  //   }
    
  //    // Distributor Detail Grid BIND LIST    
  //    this.vendormodelservice.VendorDetailsAPI(keydata).subscribe(
  //     (data)  => {
      
  //       let resdatalist = data.entity.list; 
     
  
  //        let vendorlist = resdatalist;
       
  //        this.VendorDetails$ = vendorlist;
  //        this.count = data.entity.count;
  //        this.viewcount = data.entity.viewCount;
       
  //        this.loading = false; 
  //     });
  }
  
  SelectRows(){
    
  //   var search = $('#searchData').val();
  //   var selectrow = $('#selectrow').val();
  //   this.loading = true; 
  //        // alert("selectrow "+ selectrow);
  //   this.p = 1; this.pagecount = selectrow;
  // //  console.log("p" + this.p);
    
  //   let keydata = {
  //     pageNo:this.p,
  //     itemsPerPage:this.pagecount,    
  //     searchBy: search, 
  //     searchType:"",
  //     totalRecords:"NA",
  //     pageID: "7",
  //     pageName: this.encryptedpageNameValue,
  //     pageURL: this.encryptedpageUrlValue
  //   }
    
  //    // Distributor Detail Grid BIND LIST    
  //    this.vendormodelservice.VendorDetailsAPI(keydata).subscribe(
  //     (data)  => {
      
  //       let resdatalist = data.entity.list; 
     
  
  //        let vendorlist = resdatalist;
       
  //        this.VendorDetails$ = vendorlist;
  //        this.count = data.entity.count;
  //        this.viewcount = data.entity.viewCount;
       
  //        this.loading = false; 
  //     });
  }
  
  
  exportToExcel() {
    // const ws: xlsx.WorkSheet =   
    // xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    // const wb: xlsx.WorkBook = xlsx.utils.book_new();
    // xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    // xlsx.writeFile(wb, 'epltable.xlsx');
   }
  
   createPDF() {
    // this.CompletedtripReportDetailPDF();
    var sTable = document.getElementById('PDFTable').innerHTML;
    // console.log("Stable ++++"+sTable);
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
  
  
  
  
   Refreshfunction(){
  //   this.loading = true; 
          
  //   this.p = 1; this.pagecount = 6;
  // //  console.log("p" + this.p);
    
  //   let keydata = {
  //     pageNo:this.p,
  //     itemsPerPage:this.pagecount,    
  //     searchBy: "", 
  //     searchType:"",
  //     totalRecords:"NA",
  //     pageID: "7",
  //     pageName: this.encryptedpageNameValue,
  //     pageURL: this.encryptedpageUrlValue
  //   }
    
  //    // Distributor Detail Grid BIND LIST    
  //    this.vendormodelservice.VendorDetailsAPI(keydata).subscribe(
  //     (data)  => {
  //     //  alert(JSON.stringify(data));
  //     //  console.log(data.entity)
  //       // console.log("wekcome_ "+data);
  //       let resdatalist = data.entity.list; 
  //      //  this.resdata = 
  //      // console.log("wekcome_ "+resdata);
  
  //        let vendorlist = resdatalist;
  //      //  let resdatadev = resdata['list'];
  //      //  console.log(resdatadev);
  //      //  console.log(vendorlist);
  //        this.VendorDetails$ = vendorlist;
  //        this.count = data.entity.count;
  //        this.viewcount = data.entity.viewCount;
       
  //        this.loading = false; 
  //     });
   }
  
   VendorMasterpageChanged(event){
    // this.p = event; this.pagecount = 5;
    // //  console.log("p" + this.p);
      
    //   let keydata = {
    //     pageNo:this.p,
    //     itemsPerPage:this.pagecount,    
    //     searchBy: "", 
    //     searchType:"",
    //     totalRecords:"NA",
    //     pageID: "7",
    //     pageName: this.encryptedpageNameValue,
    //     pageURL: this.encryptedpageUrlValue
    //   }
      
    //    // Distributor Detail Grid BIND LIST    
    //    this.vendormodelservice.VendorDetailsAPI(keydata).subscribe(
    //     (data)  => {
    //     //  alert(JSON.stringify(data));
    //     //  console.log(data.entity)
    //       // console.log("wekcome_ "+data);
    //       let resdatalist = data.entity.list; 
    //      //  this.resdata = 
    //      // console.log("wekcome_ "+resdata);
    
    //        let vendorlist = resdatalist;
    //      //  let resdatadev = resdata['list'];
    //      //  console.log(resdatadev);
    //      //  console.log(vendorlist);
    //        this.VendorDetails$ = vendorlist;
    //        this.count = data.entity.count;
    //        this.viewcount = data.entity.viewCount;
         
    //        this.loading = false; 
    //     });
     }
   
  
        //sorting
        sort(key){
  
         //  alert(key);
      
          this.key = key;
          this.reverse = !this.reverse;
          
        }
        Citylist(){

        }
        vensaveeditbtn(){

        }
        VendorDeletefunction(){

        }
        
}
