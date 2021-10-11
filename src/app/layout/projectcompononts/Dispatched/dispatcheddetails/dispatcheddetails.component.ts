import { VendormodelService } from './../../../../APIService/vendormodel.service';
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
import { PdfService } from '../../services/pdf.service';
import { ExportToExcelService } from '../../services/export-to-excel.service';
import { DispatchedinstalledService } from '../../services/dispatchedinstalled.service';
import * as moment from 'moment';

//import * as $ from 'jquery';
declare var jQuery: any;
declare var $: any;
declare var AddLoader:any;
declare var RemoveLoader:any;

@Component({
  selector: 'app-dispatcheddetails',
  templateUrl: './dispatcheddetails.component.html',
  styleUrls: ['./dispatcheddetails.component.css']
})
export class DispatcheddetailsComponent implements OnInit {

  @ViewChild('epltable',{ static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  key: string = 'name'; reverse: boolean = true; p: number; 
  
  pageUrl = this.router.url;
  private _success = new Subject<string>();  successMessageUpdate: string; count:number; viewcount:number; 

  uppartynameText:string; upcontactnoText:string; upemailText:string; uppartyaddressText:string; upcourierbyText:string;
  upcourieraddressText:string; upcourierdate:string; uptrackeridText:string; deviceasset: boolean = false; simasset: boolean = false;
  updevicetypeText:any; updevicetypelist:string; upvendorText:any; upvendorlistdata:string; upmodelText:any; 
  upmodellistdummy:string; upnetworkText:any; upnetworklistdummy:string; upremarkText:string; dispatchidspan:string;

  datafromrespo:string; selectRowsText: string = "10"; isSelectedsimsummary:boolean; isSelecteddevicesummary:boolean; 

  deviceIdList: any[]; simIdList: any[]; ListOfDevice = []; ListOfSim = []; ListOfvendor = []; ListOfmodel = []; 
  ListOfdevicetype = []; ListOfnetwork = [];
  
  deleteText:string; 

   public loading = false;  pagecount:number;  stringifiedData: any; parsedJson: any; stringifiedDataList: any; parsedJsonList: any;
   nop :number; totrec:number; outorec:number; filter:any; selectRows:string; Searchvendor:string;
   dispatchedDetails$:any; Detailsexcelpdf$:any; pdfData: any = [];
   
  distributor_id:any;dealer_id:any;customer_type:any;customer_catog:any;customer_name:any;cust_state:any;
  cust_city:any;cust_mobno:any;cust_alt_mobno:any;cust_email:any;successMessage:any;

   config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };

  constructor(private modalService: NgbModal,private flashMessage: FlashMessagesService, private vendormodelservice: VendormodelService,
    private listService:ListService, private cryptService:CryptService,private router:Router, public pdfservice: PdfService
    , public excelservice: ExportToExcelService, private dispatchService: DispatchedinstalledService) { }

  ngOnInit() {

    (function ($) {
      $(document).ready(function () {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#partynameentry').focus();
        })
      });
    })(jQuery);


   (function ($) {
      
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
    $('#daterangeadminux2').on('show.daterangepicker', function (ev, picker) {
      var thisdp = $('.daterangepicker');
      setTimeout(function () {
        thisdp.addClass('active');
      }, 100);
    });
    $('#daterangeadminux2').on('hide.daterangepicker', function (ev, picker) {
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


 })(jQuery);
 
 this.deviceasset = false;
 this.simasset = false;
 this.EncryptPageName();
 this.EncryptPageUrl();
 this.VendorList();  this.DeviceDispatchedDetail();  
 this.DevicetypelList(); this.clearfunction();

  }

 
  /*------------------------------------------ View Next ----------------------------------------------------*/
  editpageform(){
    document.getElementById("backdetailsbtn").style.display="block";
    document.getElementById("editbtn").style.display="none";
    document.getElementById("vendordtls").style.display="none";
    document.getElementById("container").style.display="block";
    document.getElementById("modelfooter").style.display="block";
    document.getElementById("uvmd").style.display="block";
    document.getElementById("vmd").style.display="none";
    
  }

  backdetailsbtn(){
    document.getElementById("uvmd").style.display="none";
    document.getElementById("vmd").style.display="block";
    document.getElementById("backdetailsbtn").style.display="none";
    document.getElementById("editbtn").style.display="block";
    document.getElementById("vendordtls").style.display="block";
    document.getElementById("modelfooter").style.display="none";
    document.getElementById("container").style.display="none";
  }

  EncryptPageName() {
    this.cryptService.encrypt("Dispatched Devices Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;    
  }
  
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput;
  }

  VendorList() {

    let keydata = {
      param1: "Device",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.VendorListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
          this.ListOfvendor = data.entity.list;
 
        this.loading = false;

      });
  }

  DevicetypelList() {

    let keydata = {
      param1:"sim assign to device",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.DeviceTypeListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        
        this.ListOfdevicetype = data.entity.list;
        
        this.loading = false;

      });
  }
  
  DeviceModelList() {
    this.upvendorlistdata = this.upvendorText.param1;
    this.updevicetypelist = this.updevicetypeText.param1;
    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue,
      param1: this.upvendorlistdata,
      param2: this.updevicetypelist
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.DeviceModelListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfmodel = data.entity.list;
        
      });
  } 

  DeviceList() {

    this.upvendorlistdata = this.upvendorText.param1;
    this.updevicetypelist = this.updevicetypeText.param1;
    this.upmodellistdummy = this.upmodelText.param1;

    let keydata = {
      param1:this.upvendorlistdata,
      param2:this.updevicetypelist,
      param3:this.upmodellistdummy,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    try { AddLoader() } catch (e) { alert(e) }
    this.dispatchService.DeviceDropListAPI(keydata).subscribe(
      (data) => {
         try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfDevice = data.entity;
         this.loading = false;

      });
  }

  NetworkList() {
    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.NetworkListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfnetwork = data.entity.list;
        
        this.loading = false;

      });
  }

  SimList() {
    this.upmodellistdummy = this.upmodelText.param1;     
  }

   vendorbind(){
     this.upvendorlistdata = this.upvendorText.param1;
   }
   
  step2validation() {
    this.upmodellistdummy = this.upmodelText.param1; 
    this.upvendorlistdata = this.upvendorText.param1;
    this.updevicetypelist = this.updevicetypeText.param1;

    let keydata = {
      param1:this.upvendorlistdata,
      param2:this.updevicetypelist,
      param3:this.upvendorlistdata,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
           
        this.dispatchService.DeviceDropListAPI(keydata).subscribe(
          (data) => {
             try { RemoveLoader() } catch (e) { alert(e) }
            this.ListOfDevice = data.entity;
             
          });
  }

  selectnet1() {
    this.upnetworklistdummy = this.check(this.upnetworkText);

  }

  networkchange(){
    this.upvendorlistdata = this.upmodelText.param1; 
    this.upvendorlistdata = this.upvendorText.param1;
    this.updevicetypelist = this.updevicetypeText.param1;
    this.upnetworklistdummy = this.upnetworkText.param1;

    let keydata = {
      param1:this.upvendorlistdata,
      param2:this.updevicetypelist,
      param3:this.upvendorlistdata,
      param4:this.upnetworklistdummy,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
console.log(keydata);
    try { AddLoader() } catch (e) { alert(e) }
    this.dispatchService.SimDropListAPI(keydata).subscribe(
        (data) => {
           try { RemoveLoader() } catch (e) { alert(e) }
          this.ListOfSim = data.entity;
           this.loading = false;
  
        });
  }

  devicecheckdata: string = "false"; simcheckdata: string = "false"; checkboxvalue: any;
  
  getcheckitemlistsim(){

    this.simIdList = [];
    for (let i = 0; i < this.ListOfSim.length; i++) {
      
      if (this.ListOfSim[i].isSelectedsimsummary) {
        
        this.simIdList.push(this.ListOfSim[i]['param1']);
      }
    }
  }

  getcheckitemlistdevice(){

    this.deviceIdList = [];
    for (let j = 0; j < this.ListOfDevice.length; j++) {
      
      if (this.ListOfDevice[j].isSelecteddevicesummary) {
        
        this.deviceIdList.push(this.ListOfDevice[j]['param1']);
      }
    }
  }

  update() {
   
    if (this.deviceasset == true && this.simasset == false) {
      var isValid = true;
      
      var partname = $('#uppartynameentry').val();
      var contno = $('#upcontactNoentry').val();

      var emailid = $('#upemailidentry').val();
      var atposition=emailid.indexOf("@");  
      var dotposition=emailid.lastIndexOf(".");           
      var partyaddress = $('#uppartyaddressnewentry').val();

      var courierby = $('#upcourierbyentry').val();
      var courieraddress = $('#upcourieraddressid').val();

      var emailid = $('#upemailidentry').val();
      var atposition=emailid.indexOf("@");  
      var dotposition=emailid.lastIndexOf("."); 
      
      var trackerid = $('#trackeridentry').val();

      //Validate Party Name
      if (!partname && partname.length <= 0) {
        isValid = false;
        $('#msg_errorentry').html('Please Enter Party Name.').show();
        $('#partynameentry').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

      }
      else if (!contno && contno.length <= 0) {
        // validate short code
        isValid = false;
        $('#msg_errorentry').html('Please Enter Contact No.').show();
        $('#contactNoentry').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      else if((atposition<1 || dotposition<atposition+2 || dotposition+2>=emailid.length) && (emailid != null && emailid != ''))
      {
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Valid Email.').show(); 
        $('#officialEmailentry').focus(); 
        setTimeout(function(){document.getElementById("msg_errorentry").style.display="none";}, 3000);
      }   
      else if (!partyaddress && partyaddress.length <= 0) {
        // validate Official No
        isValid = false;
        $('#msg_errorentry').html('Please Enter Address.').show();
        $('#partyaddressnewentry').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

      }  
      //Validate Party Name
      else if ((courierby.length < 3) && (courierby != null && courierby != '')) {
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Courier By.').show();
        $('#courierbyentry').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

      }
      else if ((courieraddress.length < 5) && (courieraddress != null && courieraddress != '')) {
        // validate short code
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Courier Address.').show();
        $('#courieraddressid').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else if((atposition<1 || dotposition<atposition+2 || dotposition+2>=emailid.length) && (emailid != null && emailid != ''))
      {
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Valid Email.').show(); 
        $('#officialEmailentry').focus(); 
        setTimeout(function(){document.getElementById("msg_error_contactentry").style.display="none";}, 3000);
      }   
      else if ((trackerid.length < 6) && (trackerid != null && trackerid != '')) {
        // validate Official No
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Tracker ID.').show();
        $('#trackeridentry').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

      }    //courierdate
      else {  

        var devicetypeid = this.getid(this.ListOfdevicetype, this.updevicetypeText);
        var vendoridval = this.getid(this.ListOfvendor, this.upvendorText);
        var modelid = this.getid(this.ListOfmodel, this.upmodelText);

        this.upvendorlistdata = this.upvendorText.param1;
        this.updevicetypelist = this.updevicetypeText.param1;
        this.upmodellistdummy = this.upmodelText.param1;

        this.checkboxvalue = this.devicecheckdata;

        let dataL = {  

          remarks: this.upremarkText,
          dispatchId: this.dispatchidspan,
          partyName: this.uppartynameText, partyMobileNo: this.upcontactnoText, partyAddress: this.uppartyaddressText, 
          partyEmailId: this.upemailText, courierTrackerId: this.uptrackeridText, courierDate: this.upcourierdate, 
          courierReceivedDate:"", creatorLoginId:0, dispatchStatus:1, courierName: this.upcourierbyText, 
          devicelist:this.deviceIdList, simlist:this.simIdList, assetype:this.checkboxvalue,
          pageID: "7",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
        }
        try { AddLoader() } catch (e) { alert(e) }
        this.dispatchService.UpdateDeviceDispatchedAPI(dataL).subscribe((data) => {
          try { RemoveLoader() } catch (e) { alert(e) }
         
          this.datafromrespo = data.entity;

          if (data.statuscode == '200') {
            $("#SuccessModalEntry").modal('show');
            this.closemodal();
            this.clearfunction();
          }
          else {
            $("#ErrorModalEntry").modal('show');
          }
      });
    }
  }
    else if (this.deviceasset == false && this.simasset == true) {

      var isValid = true;
      
      var partname = $('#uppartynameentry').val();
      var contno = $('#upcontactNoentry').val();

      var emailid = $('#upemailidentry').val();
      var atposition=emailid.indexOf("@");  
      var dotposition=emailid.lastIndexOf(".");           
      var partyaddress = $('#uppartyaddressnewentry').val();

      var courierby = $('#upcourierbyentry').val();
      var courieraddress = $('#upcourieraddressid').val();

      var emailid = $('#upemailidentry').val();
      var atposition=emailid.indexOf("@");  
      var dotposition=emailid.lastIndexOf("."); 
      
      var trackerid = $('#trackeridentry').val();

      //Validate Party Name
      if (!partname && partname.length <= 0) {
        isValid = false;
        $('#msg_errorentry').html('Please Enter Party Name.').show();
        $('#partynameentry').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

      }
      else if (!contno && contno.length <= 0) {
        // validate short code
        isValid = false;
        $('#msg_errorentry').html('Please Enter Contact No.').show();
        $('#contactNoentry').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      else if((atposition<1 || dotposition<atposition+2 || dotposition+2>=emailid.length) && (emailid != null && emailid != ''))
      {
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Valid Email.').show(); 
        $('#officialEmailentry').focus(); 
        setTimeout(function(){document.getElementById("msg_errorentry").style.display="none";}, 3000);
      }   
      else if (!partyaddress && partyaddress.length <= 0) {
        // validate Official No
        isValid = false;
        $('#msg_errorentry').html('Please Enter Address.').show();
        $('#partyaddressnewentry').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

      }  
      //Validate Party Name
      else if ((courierby.length < 3) && (courierby != null && courierby != '')) {
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Courier By.').show();
        $('#courierbyentry').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

      }
      else if ((courieraddress.length < 5) && (courieraddress != null && courieraddress != '')) {
        // validate short code
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Courier Address.').show();
        $('#courieraddressid').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else if((atposition<1 || dotposition<atposition+2 || dotposition+2>=emailid.length) && (emailid != null && emailid != ''))
      {
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Valid Email.').show(); 
        $('#officialEmailentry').focus(); 
        setTimeout(function(){document.getElementById("msg_error_contactentry").style.display="none";}, 3000);
      }   
      else if ((trackerid.length < 6) && (trackerid != null && trackerid != '')) {
        // validate Official No
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Tracker ID.').show();
        $('#trackeridentry').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

      }    //courierdate
      else {  
       
        this.checkboxvalue = this.devicecheckdata;

        let dataL = {  

          remarks: this.upremarkText,
          dispatchId: this.dispatchidspan,
          partyName: this.uppartynameText, partyMobileNo: this.upcontactnoText, partyAddress: this.uppartyaddressText, 
          partyEmailId: this.upemailText, courierTrackerId: this.uptrackeridText, courierDate: this.upcourierdate, 
          courierReceivedDate:"", creatorLoginId:0, dispatchStatus:1, courierName: this.upcourierbyText, 
          devicelist:this.deviceIdList, simlist:this.simIdList, assetype:this.checkboxvalue,
          pageID: "7",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
        }
        try { AddLoader() } catch (e) { alert(e) }
        this.dispatchService.UpdateDeviceDispatchedAPI(dataL).subscribe((data) => {
          try { RemoveLoader() } catch (e) { alert(e) }
          //  alert(data);
          this.datafromrespo = data.entity;

          if (data.statuscode == '200') {
            $("#SuccessModalEntry").modal('show');
            this.closemodal();
            this.clearfunction();
          }
          else {
            $("#ErrorModalEntry").modal('show');
          }
      });
    }

      
      
    }
    else if (this.deviceasset == true && this.simasset == true) {

      var isValid = true;
      
      var partname = $('#uppartynameentry').val();
      var contno = $('#upcontactNoentry').val();

      var emailid = $('#upemailidentry').val();
      var atposition=emailid.indexOf("@");  
      var dotposition=emailid.lastIndexOf(".");           
      var partyaddress = $('#uppartyaddressnewentry').val();

      var courierby = $('#upcourierbyentry').val();
      var courieraddress = $('#upcourieraddressid').val();

      var emailid = $('#upemailidentry').val();
      var atposition=emailid.indexOf("@");  
      var dotposition=emailid.lastIndexOf("."); 
      
      var trackerid = $('#trackeridentry').val();

      //Validate Party Name
      if (!partname && partname.length <= 0) {
        isValid = false;
        $('#msg_errorentry').html('Please Enter Party Name.').show();
        $('#partynameentry').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

      }
      else if (!contno && contno.length <= 0) {
        // validate short code
        isValid = false;
        $('#msg_errorentry').html('Please Enter Contact No.').show();
        $('#contactNoentry').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
      }
      else if((atposition<1 || dotposition<atposition+2 || dotposition+2>=emailid.length) && (emailid != null && emailid != ''))
      {
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Valid Email.').show(); 
        $('#officialEmailentry').focus(); 
        setTimeout(function(){document.getElementById("msg_errorentry").style.display="none";}, 3000);
      }   
      else if (!partyaddress && partyaddress.length <= 0) {
        // validate Official No
        isValid = false;
        $('#msg_errorentry').html('Please Enter Address.').show();
        $('#partyaddressnewentry').focus();
        setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

      }  
      //Validate Party Name
      else if ((courierby.length < 3) && (courierby != null && courierby != '')) {
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Courier By.').show();
        $('#courierbyentry').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

      }
      else if ((courieraddress.length < 5) && (courieraddress != null && courieraddress != '')) {
        // validate short code
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Courier Address.').show();
        $('#courieraddressid').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
      }
      else if((atposition<1 || dotposition<atposition+2 || dotposition+2>=emailid.length) && (emailid != null && emailid != ''))
      {
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Valid Email.').show(); 
        $('#officialEmailentry').focus(); 
        setTimeout(function(){document.getElementById("msg_error_contactentry").style.display="none";}, 3000);
      }   
      else if ((trackerid.length < 6) && (trackerid != null && trackerid != '')) {
        // validate Official No
        isValid = false;
        $('#msg_error_contactentry').html('Please Enter Tracker ID.').show();
        $('#trackeridentry').focus();
        setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

      }   
      else {  

        var devicetypeid = this.getid(this.ListOfdevicetype, this.updevicetypeText);
        var vendoridval = this.getid(this.ListOfvendor, this.upvendorText);
        var modelid = this.getid(this.ListOfmodel, this.upmodelText);
        var networkid = this.getid(this.ListOfnetwork, this.upnetworkText);

        this.upvendorlistdata = this.upvendorText.param1;
        this.updevicetypelist = this.updevicetypeText.param1;
        this.upmodellistdummy = this.upmodelText.param1;

        this.checkboxvalue = "both";

        let dataL = {  

          remarks: this.upremarkText,
          dispatchId: this.dispatchidspan,
          partyName: this.uppartynameText, partyMobileNo: this.upcontactnoText, partyAddress: this.uppartyaddressText, 
          partyEmailId: this.upemailText, courierTrackerId: this.uptrackeridText, courierDate: this.upcourierdate, 
          courierReceivedDate:"", creatorLoginId:0, dispatchStatus:1, courierName: this.upcourierbyText, 
          devicelist:this.deviceIdList, simlist:this.simIdList, assetype:this.checkboxvalue,
          pageID: "7",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
        }
        try { AddLoader() } catch (e) { alert(e) }
        this.dispatchService.UpdateDeviceDispatchedAPI(dataL).subscribe((data) => {
          try { RemoveLoader() } catch (e) { alert(e) }
          
          this.datafromrespo = data.entity;

          if (data.statuscode == '200') {
            $("#SuccessModalEntry").modal('show');
            this.closemodal();
            this.clearfunction();
          }
          else {
            $("#ErrorModalEntry").modal('show');
          }
      });
    }

     

    }
}

DeleteModal(devmang: Paramcls) {
  try {

    this.dispatchidspan = devmang.param1;

  } catch (e) { }

}
 
Delfunction2()
{

}

Deletefunction(devmang: Paramcls){
  var isValid = true; 
  var deleteremark = $('#dispatchdelremark').val();
  deleteremark = deleteremark.substring(0, 1).toUpperCase() + deleteremark.substring(1);
  // Validate Contact Name
  if(!deleteremark && deleteremark.length <= 0){
   isValid = false;
    this._success.next('Please Enter Remark.'); 
   $('#dispatchdelremark').focus();
 }
 else
 { 
  
  let dataL = {
    param1:deleteremark,
    param2:this.dispatchidspan,
    pageID: "7",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
   
      }
      try{AddLoader()}catch(e){alert(e)} 
  this.dispatchService.DeleteDeviceDispatchedAPI(dataL).subscribe((data)=>{
    try{RemoveLoader()}catch(e){alert(e)} 
  
  this.datafromrespo = data.entity;
    
  if(this.datafromrespo == 'Successfully deleted.')
  {
  $("#SuccessModal").modal('show');
  this.DeviceDispatchedDetail();
  this.closemodal();
  }
  else
  {
   $("#ErrorModal").modal('show');
  }
  });
 
}
}

setdata(com: Paramcls){
 
  let vendordatadetails = com;
  this.dispatchidspan = vendordatadetails.param1;
  this.uppartynameText = vendordatadetails.param2;
  this.upcontactnoText =  vendordatadetails.param3;
  this.upemailText = vendordatadetails.param5;
  this.uppartyaddressText = vendordatadetails.param4;
  this.upcourierbyText = vendordatadetails.param6;
  this.upcourieraddressText = vendordatadetails.param17; 
  this.upcourierdate = vendordatadetails.param8;
  this.uptrackeridText = vendordatadetails.param7;
  this.updevicetypeText = vendordatadetails.param13;
  this.upvendorText = vendordatadetails.param13;
  this.upmodelText = vendordatadetails.param13;
  this.upnetworkText = vendordatadetails.param13;
  
  this.updevicetypelist = this.check(this.updevicetypeText);
  this.upvendorlistdata = this.check(this.upvendorText);
  this.upmodellistdummy = this.check(this.upmodelText);
  this.upnetworklistdummy = this.check(this.upnetworkText);

 this.backdetailsbtn();
}

  /*-------------List of State Api ---------------*/  
  DeviceDispatchedDetail() {
       
    this.p = 1; this.pagecount = 10;

    
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
     this.dispatchService.DetailsDeviceDispatchedAPI(keydata).subscribe(
      (data)  => {
        try{RemoveLoader()}catch(e){alert(e)} 
      
        let resdatalist = data.entity.responsedatalist; 
     
 
         let vendorlist = resdatalist;
         this.count = data.entity.count;
         this.viewcount = data.entity.viewCount;
         this.dispatchedDetails$ = vendorlist;
       
        
      });
}


searchdata(){
  var search = $('#searchData').val();
    
  this.p = 1; this.pagecount = 10;

  
  let keydata = {
    pageNo:this.p,
    itemsPerPage:this.pagecount,    
    searchBy: search, 
    searchType:"",
    totalRecords:"NA",
    pageID: "7",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
  }
  try{AddLoader()}catch(e){alert(e)} 
   // Distributor Detail Grid BIND LIST    
   this.dispatchService.DetailsDeviceDispatchedAPI(keydata).subscribe(
    (data)  => {
      try{RemoveLoader()}catch(e){alert(e)} 
      let resdatalist = data.entity.responsedatalist; 
   

       let vendorlist = resdatalist;
     
       this.dispatchedDetails$ = vendorlist;
       this.count = data.entity.count;
       this.viewcount = data.entity.viewCount;
     
       this.loading = false; 
    });
}

SelectRows(){
  
  var search = $('#searchData').val();
  var selectrow = $('#selectrow1').val();
  
  this.p = 1; this.pagecount = selectrow;

  
  let keydata = {
    pageNo:this.p,
    itemsPerPage:this.pagecount,    
    searchBy: search, 
    searchType:"",
    totalRecords:"NA",
    pageID: "7",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
  }
  try{AddLoader()}catch(e){alert(e)} 
   // Distributor Detail Grid BIND LIST    
   this.dispatchService.DetailsDeviceDispatchedAPI(keydata).subscribe(
    (data)  => {
      try{RemoveLoader()}catch(e){alert(e)} 
      let resdatalist = data.entity.responsedatalist; 
   

       let vendorlist = resdatalist;
     
       this.dispatchedDetails$ = vendorlist;
       this.count = data.entity.count;
       this.viewcount = data.entity.viewCount;
     
       this.loading = false; 
    });
}


 DispatchedPDFDetail() {
       
  
  let keydata = {
    pageNo:"",
    itemsPerPage:"",    
    searchBy: "", 
    searchType:"",
    totalRecords:"NA",
    pageID: "7",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
  }
  try{AddLoader()}catch(e){alert(e)} 
   // Distributor Detail Grid BIND LIST    
   this.dispatchService.DetailsDeviceDispatchedAPI(keydata).subscribe(
    (data)  => {
      try{RemoveLoader()}catch(e){alert(e)} 
    
       this.Detailsexcelpdf$ = data.entity.responsedatalist;
       this.PrepareExcelData(this.Detailsexcelpdf$);
    });
}

exportToPDF() {

  let keydata = {
    pageNo: "",
    itemsPerPage: "",
    searchBy: this.filter,
    searchType: "",
    totalRecords: "NA",
    pageID: "7",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
  }
  try { AddLoader() } catch (e) { alert(e) }
  // Distributor Detail Grid BIND LIST    
  this.dispatchService.DetailsDeviceDispatchedAPI(keydata).subscribe(
    (data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      
      this.PreparePDFData(data.entity.responsedatalist);

      this.pdfservice.CreatePDFData(this.pdfData, "Vendor Details");
    });
}

PreparePDFData(data) {
  let pdfTableData;
  for (let i = 0; i < data.length; i++) {
    pdfTableData = {
      "#": i + 1,
      "Vendor Name": data[i].param3,
      "Email Id": data[i].param13,
      "GST": data[i].param10,
      "Mobile No.": data[i].param17,
      "State": data[i].param8,
      "City": data[i].param7,
      "Address": data[i].param6
    }
    this.pdfData.push(pdfTableData)
  };
}

 excelData:any=[];
  PrepareExcelData(data) {
    this.excelData = [];

    for (var i = 0; i < data.length; i++) {
      try {
        var obj = {

          "#": i + 1,
          "Vendor Name": data[i].param3,
          "Email Id": data[i].param13,
          "GST": data[i].param10,
          "Mobile No.": data[i].param17,
          "State": data[i].param8,
          "City": data[i].param7,
          "Address": data[i].param6

        }
      } catch (e) { }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    this.DispatchedPDFDetail(); 
    this.excelservice.ExportExcel(this.excelData, 'Device Dispatched Details', 'devicedispatcheddetails');
  }

 Refreshfunction(){
   this.filter = ''
  this.selectRowsText = "10";
  this.loading = true; 
        
  this.p = 1; this.pagecount = 10;

  
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
   this.dispatchService.DetailsDeviceDispatchedAPI(keydata).subscribe(
    (data)  => {
      try{RemoveLoader()}catch(e){alert(e)} 
     let resdatalist = data.entity.responsedatalist; 


       let vendorlist = resdatalist;
      this.dispatchedDetails$ = vendorlist;
       this.count = data.entity.count;
       this.viewcount = data.entity.viewCount;
     
       this.loading = false; 
    });
 }

 VendorMasterpageChanged(event){
  this.p = event; this.pagecount = $("#selectrow1").val();

    
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
     this.dispatchService.DetailsDeviceDispatchedAPI(keydata).subscribe(
      (data)  => {
        try{RemoveLoader()}catch(e){alert(e)} 

        let resdatalist = data.entity.responsedatalist; 
      
         let vendorlist = resdatalist;
      
         this.dispatchedDetails$ = vendorlist;
         this.count = data.entity.count;
         this.viewcount = data.entity.viewCount;
       
         this.loading = false; 
      });
   }
 

      //sorting
      sort(key){
    
        this.key = key;
        this.reverse = !this.reverse;
        
      }

      check(data) {
        try {
          if (typeof data === 'object') {
            return data.param1;
          }
          else if (data == '') {
          
          }
          else {
          
            return data;
          }
        } catch (e) {
          return '';
        }
      }
    
      getid(data, value) {
        try {
          if (typeof value === 'object') {
        
            return value.param1;
            
          }
          else {
            
            var index = data.findIndex(x => x.param2 === value);
            
            return data[index].param1;
          }
        } catch (e) {
          return '';
        }
    
      }
      closemodal(){
       
        this.deleteText="";
        $("#successmodel").modal('hide');
    
        $('#modeldelete').modal('hide');
        $('#myModalwizard').modal('hide');
    
        $('.modal-backdrop.show').css('display', 'none');
        this.clearfunction();
      }

      clearfunction(){
        this.upnetworkText = "";
        this.uppartyaddressText = "";
        this.uppartynameText = "";
        this.upremarkText = "";
        this.uptrackeridText = "";
        this.upvendorText = "";
        this.upmodelText = "";
        this.upemailText = "";
        this.updevicetypeText = "";
        this.upcourierdate = "";
        this.upcourierbyText = "";
        this.upcourieraddressText = "";
        this.upcontactnoText = "";
      }

          
      DeviceTypeChange()
      {

      }

      pageChanged(event){

      }

      vensaveeditbtn(){

      }

}