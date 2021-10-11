import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CryptService } from './../../services/crypt.service';
import { Router } from '@angular/router';
import { NotificationmodelService } from './../../../../APIService/notificationmodel.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as moment from 'moment';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
@Component({
  selector: 'app-notificationentry',
  templateUrl: './notificationentry.component.html',
  styleUrls: ['./notificationentry.component.css']
})
export class NotificationentryComponent implements OnInit {

  constructor(private modalService: NgbModal,private flashMessage: FlashMessagesService , private cryptService:CryptService,private router:Router, private notificationService:NotificationmodelService) { }
  Startdate: any;
  ngOnInit() {
    (function ($) {
      $(document).ready(function () {

        /* calander single  picker ends */
        $('.datepicker').daterangepicker({
          singleDatePicker: true,
          minDate:new Date(),
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

        /* calander picker */
        var start = moment().subtract(29, 'days');
        var end = moment();

        function cb(start, end) {
          $('#daterangeadminux2 span').html(start.format('YYYY-MM-DD') + 'to' + end.format('YYYY-MM-DD'));
        }

        $('#daterangeadminux2').daterangepicker({
          startDate: start,
          endDate: end,
          opens: 'left',
          maxDate: new Date()
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
   (jQuery);

    this.EncryptPageName();
    this.EncryptPageUrl();
    this.NotificationDetailEntry();
  }

  radioSelectednotification: any = "";
  onItemChange(e) {
    this.radioSelectednotification = e.target.value;
   
  }

  Mobile: boolean = false;
  Web: boolean = false;
  dateuptomodel:string;

  titlemodel: string; messagemodel: string; descriptionmodel: string;
  Clearfield() {
    this.titlemodel = "";
    this.messagemodel = "";
    this.descriptionmodel = "";
    this.radioSelectednotification = "";
    this.Mobile = false;
    this.Web = false;
    this.mobileitem = "";
    this.webitem = "";
    this.dateuptomodel="";
  }

  mobileitem: string = ""; webitem: string = "";notificationfor:string;datafromrespo:string;
  InsertNotification() {
    var isValid = true;
    var titletxt = $('#title_id').val();
    var msgtxt = $('#message_id').val();
    var destxt = $('#description_id').val();
    var datetxt = $('#dateupto').val();
    
 
    if (this.Mobile == true) {
      this.mobileitem = $('#mobile_id').val();
      this.notificationfor=this.mobileitem;
    }
    if (this.Web == true) {
      this.webitem = $('#web_id').val();
      this.notificationfor=this.webitem;
    }
    if (this.Mobile == true && this.Web == true) {
     
      this.notificationfor="Both";
    }


    //title
    if (!titletxt && titletxt.length <= 0) {
      isValid = false;
      $('#msg_errorentry_notification').html('Please Enter Notification Title').show();
      $('#title_id').focus();
      setTimeout(function () { document.getElementById("msg_errorentry_notification").style.display = "none"; }, 3000);
    }else if (datetxt == "") {
      isValid = false;
      $('#msg_errorentry_notification1').html('Please Enter Notification Valid Upto Date').show();
      $('#dateupto').focus();
      setTimeout(function () { document.getElementById("msg_errorentry_notification").style.display = "none"; }, 3000);
    }
    else
      //msg
      if (!msgtxt && msgtxt.length <= 0) {
        isValid = false;
        $('#msg_errorentry_notification').html('Please Enter Notification Message').show();
        $('#message_id').focus();
        setTimeout(function () { document.getElementById("msg_errorentry_notification").style.display = "none"; }, 3000);
      }
      else
        //description
        if (!destxt && destxt.length <= 0) {
          isValid = false;
          $('#msg_errorentry_notification').html('Please Enter Notification Description').show();
          $('#description_id').focus();
          setTimeout(function () { document.getElementById("msg_errorentry_notification").style.display = "none"; }, 3000);
        }
        else
          //status
          if (this.radioSelectednotification == "" && this.radioSelectednotification == "") {
            isValid = false;
            $('#msg_errorentry_notification').html('Please Enter Status Field').show();
            setTimeout(function () { document.getElementById("msg_errorentry_notification").style.display = "none"; }, 3000);
          }
          else
            //notification for
            if (this.mobileitem == "" && this.webitem == "") {
              isValid = false;
              $('#msg_errorentry_notification').html('Please Enter Notification For Field').show();
              setTimeout(function () { document.getElementById("msg_errorentry_notification").style.display = "none"; }, 3000);
            }else
            if (!msgtxt && msgtxt.length <= 0) {
              isValid = false;
              $('#msg_errorentry_notification').html('Please Enter Notification Message').show();
              $('#message_id').focus();
              setTimeout(function () { document.getElementById("msg_errorentry_notification").style.display = "none"; }, 3000);
            }

else{
  this.titlemodel = this.titlemodel.substring(0, 1).toUpperCase() + this.titlemodel.substring(1);
  this.messagemodel = this.messagemodel.substring(0, 1).toUpperCase() +this.messagemodel.substring(1);
  this.descriptionmodel = this.descriptionmodel.substring(0, 1).toUpperCase() + this.descriptionmodel.substring(1);

  let dataL = {
    param1:"",
    param2:"",
    param3:this.titlemodel, param4:this.messagemodel, 
    param5:this.descriptionmodel,
     param6:this.radioSelectednotification,
     param7:this.notificationfor,
param8:datetxt,
    pageID: "7",
     pageName: this.encryptedpageNameValue,
     pageURL: this.encryptedpageUrlValue
      }
      
try { AddLoader() } catch (e) { alert(e) }
  this.notificationService.InsertNotificationAPI(dataL).subscribe((data)=>{
    
try { RemoveLoader() } catch (e) { alert(e) }
  this.datafromrespo = data.entity;

  if(this.datafromrespo == 'Successfully Saved.')
  {
  $("#successmodelentry").modal('show');
  this.closemodal();
  this.Clearfield();
  this.ngOnInit();
  }
  else
  {
   $("#notifymodelentry").modal('show');
  }
  });
}
   
  
  }

  // Startdate:any;
  // function(){
  // $('#date').datepicker('option', 'minDate', new Date(this.Startdate));
  // $('#date').datepicker('option', 'maxDate', new Date(endDate));
  // }



  formatsDateTest: string = 'dd/MM/yyyy';

  dateNow: Date = new Date();
  

  encryptedpageNameValue:string;pageUrl:string;encryptedpageUrlValue:string;
  EncryptPageName() {
    this.cryptService.encrypt("Notification Management")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
   // console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
   // console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }
  closemodal() {
    $("#exampleModal").modal('hide');
    $('#successmodelentry').modal('hide');
    $('.modal-backdrop.show').css('display', 'none');
}


public loading = false; p: number;   pagecount:number=10; count:number; viewcount:number;
notificationDetail$:Object; itemsPerPage:number=10;

NotificationDetailEntry() {
  this.loading = true; 
 this.p = 1; 
 this.itemsPerPage=this.pagecount;
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
 
try { AddLoader() } catch (e) { alert(e) }
  // Distributor Detail Grid BIND LIST    
  this.notificationService.NotificationDetailsAPI(keydata).subscribe(
   (data)  => {
   
try { RemoveLoader() } catch (e) { alert(e) }
     let resdatalist = data.entity.list; 
  let vendorlist = resdatalist;
  
      this.notificationDetail$ = vendorlist;
      this.count = data.entity.count;
      this.viewcount = data.entity.viewCount;
  
      this.loading = false; 
   });
}

}
