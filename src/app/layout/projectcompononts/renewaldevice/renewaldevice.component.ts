import { Router } from '@angular/router';
//import { DevicemodelService } from './../../../../devicemodel.service';
import { ListService } from './../../../../list.service';
import { PostService } from './../../../../post.service';
import { Paramcls } from './../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as moment from 'moment';
import * as $ from 'jquery';
import { CryptService } from '../services/crypt.service';
import { RenewalmodelService } from '../../../APIService/renewalmodel.service';

declare var jQuery: any;

@Component({
  selector: 'app-renewaldevice',
  templateUrl: './renewaldevice.component.html',
  styleUrls: ['./renewaldevice.component.css']
})
export class RenewaldeviceComponent implements OnInit {

  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  key: string = 'name'; reverse: boolean = true; 
  filter:string;

  pageUrl = this.router.url;
 
  noof_device:string; cust_name:string; mobile_no:string; remark_:string;
  deleteremarkText:string; Amountsum:number
  ListOfDevicetype: any = [];
  viewcount:string; count:string; amountText:string; remarkeditText:string; ReceiptUpload:string;
  public loading = false; p: number;   pagecount:number;  distibutorText:string;
  RenewalDetails$:Object;
  datafromrespo:string;

  PaymentTypeText:string; pmtModeText:string; refnoText:string; towhomnameText:string; amountpaidText:number;
  
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };

  constructor(private modalService: NgbModal,private flashMessage: FlashMessagesService ,private renewalmodelservice:RenewalmodelService , private postService:PostService,private listService:ListService, private cryptService:CryptService,private router:Router) { }


  ngOnInit() {

    
    //  Added Count , ViewCount = 0 ............Date : 2-12-2020 Developer: Aditya Londhe
    //this.count = 0;
   // this.viewcount = 0;
    /* ------------------------------- Wizards start Ts------------------------------------------------- */

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
      $('#daterangeadminux2').on('show.daterangepicker', function(ev, picker) {
          var thisdp = $('.daterangepicker');
          setTimeout(function() {
              thisdp.addClass('active');
          }, 100);
      });
      $('#daterangeadminux2').on('hide.daterangepicker', function(ev, picker) {
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
      /* calander single picker ends */

  

   

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
            var path = '../assets/images/background-part.png';
            $('.daterangepicker').append('<div class="background" style="background-image: url(' + path + '); z-index:-1; height:80px;"><img src="../assets/images/background-part.png" alt="" style="display:none"></div>')
      });  
    })

    

    (jQuery);
    this.EncryptPageName();
    this.EncryptPageUrl();
    this.VehicleRenewalDetail();
    this.VehicleNoList();
 
/* ------------------------------- Wizards end Ts------------------------------------------------- */
  }
  EncryptPageName() {
    this.cryptService.encrypt("Renewal Device")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
  //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }
  multiSelect:any;

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
    document.getElementById("deletebtn").style.display="block";
   // this.Citylist();
    
  }
  backdetailsbtn(){
    document.getElementById("deletebtn").style.display="block";
    document.getElementById("uvmd").style.display="none";
    document.getElementById("vmd").style.display="block";
    document.getElementById("backdetailsbtn").style.display="none";
    document.getElementById("editbtn").style.display="block";
  //  document.getElementById("customerdtls").style.display="block";
  //  document.getElementById("bankdtls").style.display="block";
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

  VehicleNoList(){
  
    let keydata = {
      param1:"",
      param2:"",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }  
    this.listService.VehicleNoListAPI(keydata).subscribe(
      (data)  => {
      //  alert(JSON.stringify(data));
      //  console.log(data.entity)
       // console.log("wekcome_ "+data);
       //let resdatalist = data.entity.list; 

       // let certlist = resdatalist;
      //  let resdatadev = resdata['list'];
      //  console.log(resdatadev);
       // console.log(certlist);
        this.ListOfDevicetype = data.entity.list;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
        this.loading = false; 
        
      });
  }
  pymnt(){
    var pmttype = $('#paymenttype').val();
    if(pmttype == "online")
    {
      //alert("aaaaa");
      document.getElementById("paymentmode").style.display="block";
      document.getElementById("referenceno").style.display="block";
      document.getElementById("transactiondate").style.display="block";
      document.getElementById("receipt").style.display="block";
      document.getElementById("paymentmodeoffline").style.display="none";
      document.getElementById("chequeno").style.display="none";
      document.getElementById("towhom").style.display="none";
     // document.getElementById("amountoffline").style.display="none";
    
    }
    else
    {
     // alert("bbbbbbbbb");
     document.getElementById("paymentmodeoffline").style.display="block";
      document.getElementById("chequeno").style.display="block";
      document.getElementById("towhom").style.display="block";
     // document.getElementById("amountoffline").style.display="block";
      document.getElementById("paymentmode").style.display="none";
      document.getElementById("referenceno").style.display="none";
      document.getElementById("transactiondate").style.display="none";
      document.getElementById("receipt").style.display="none";
    }
  }

  pymntmode(){
    var pmtmode = $('#pmntmodeofflone').val();
    //alert(pmtmode);
    if(pmtmode == "cash")
    {
    document.getElementById("dateoffline").style.display="block";
    document.getElementById("chequeno").style.display="none";
    }
  }


  RenewalDevicepageChanged(event){
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
      
       // Distributor Detail Grid BIND LIST    
      // this.vendormodelservice.VendorDetailsAPI(keydata).subscribe(
      //  (data)  => {
        //  alert(JSON.stringify(data));
        //  console.log(data.entity)
          // console.log("wekcome_ "+data);
       //   let resdatalist = data.entity.list; 
         //  this.resdata = 
         // console.log("wekcome_ "+resdata);
    
        //   let vendorlist = resdatalist;
         //  let resdatadev = resdata['list'];
         //  console.log(resdatadev);
         //  console.log(vendorlist);
         //  this.VendorDetails$ = vendorlist;
         
         //  this.loading = false; 
       // });
     }

   //sorting
   sort(key){

    //  alert(key);
 
     this.key = key;
     this.reverse = !this.reverse;
     
   }
    TotalAmount:any;
    totalvehicleno:any;
   VehicleAmount(){
   var typeidArray=[];
   var AmountArray=[];

     
     // console.log(" data of select === "+JSON.stringify(this.multiSelect))
      for (let i=0;i<this.multiSelect.length;i++) {
         typeidArray.push(this.multiSelect[i].param2)
        console.log(("  id  ==== "+this.multiSelect[i].param2));
      }
  
      console.log(JSON.stringify(" id array  ========== "+typeidArray));
      
      for (let i=0;i<this.multiSelect.length;i++) {
        AmountArray.push(Number(this.multiSelect[i].param3))
       // console.log(("  id  ==== "+this.multiSelect[i].param3));
      }
       // console.log("000"+AmountArray);
     console.log(JSON.stringify(" id Amount  ========== "+AmountArray));
        this.Amountsum = AmountArray.reduce(function(a, b){
        return a + b;
    }, 0);
    // let sum: number = 0;
    // this.multiSelect.forEach(a => sum += a.param3);
    // console.log(sum);
      // this.TotalAmount = Amountsum;
       this.totalvehicleno = typeidArray;
      console.log("total Amount is"+this.Amountsum);
      console.log("total Vehicle id"+this.totalvehicleno);
   }



   saveeditbtn(){
    var cin = $("#CINNoentry").val();
    let dataL = {
      param1:"",
      param2:this.totalvehicleno,
      param3:this.Amountsum, param4:this.PaymentTypeText, param5:this.pmtModeText, param6:this.refnoText, param7:this.ReceiptUpload, param8:this.towhomnameText, param9:"", param10:"",
       param11:this.amountpaidText, 
       pageID: "7",
       pageName: this.encryptedpageNameValue,
       pageURL: this.encryptedpageUrlValue
        }
    this.renewalmodelservice.InsertrenewalAPI(dataL).subscribe((data)=>{
    //  alert(dataL);
    //  alert(data);
      this.datafromrespo = data.entity;
    
     if(this.datafromrespo == 'Successfully Saved.')
     {
     $("#successmodel").modal('show');
     }
     else
     {
      $("#notifymodel").modal('show');
     }
    });
   // alert("error in inserting data");

  }

  VehicleRenewalDetail() {
       
    this.loading = true; 
        
    this.p = 1; this.pagecount = 5;
  //  console.log("p" + this.p);
    
    let keydata = {
      pageNo:this.p,
      itemsPerPage:this.pagecount,    
      searchBy: "", 
      searchType:"FORRENEWAL",
      totalRecords:"NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    
     // Distributor Detail Grid BIND LIST    
     this.renewalmodelservice.RenewalDetailsAPI(keydata).subscribe(
      (data)  => {
      //  alert(JSON.stringify(data));
      //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        let resdatalist = data.entity.list; 
       //  this.resdata = 
       // console.log("wekcome_ "+resdata);
 
         let vendorlist = resdatalist;
         this.count = data.entity.count;
         this.viewcount = data.entity.viewCount;
         this.RenewalDetails$ = vendorlist;
       
         this.loading = false; 
      });
}

}
