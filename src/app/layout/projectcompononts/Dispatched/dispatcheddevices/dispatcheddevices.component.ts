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
import * as moment from 'moment';
import * as $ from 'jquery';
import { CryptService } from '../../services/crypt.service';
import { DispatchedinstalledService } from '../../services/dispatchedinstalled.service';


declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-dispatcheddevices',
  templateUrl: './dispatcheddevices.component.html',
  styleUrls: ['./dispatcheddevices.component.css']
})
export class DispatcheddevicesComponent implements OnInit {

  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;

  count: number; viewcount: number;
  public loading = false; p: number; pagecount: number; CustRemarktext: string; datafromrespo: string;

  partynameText:string; contactnoText:string; emailText:string; partyaddressText:string; courierbyText:string;
  courieraddressText:string; trackeridText:string; deviceText:any; simText:any; networkText:any;
  
  modelText: any; devicetypeText: any; modellist: string = ""; devicetypelist: string; networklistdummy:string;
  devicelist:string; simnolist:string; deviceasset: boolean = false; simasset: boolean = false; courierdate:string;

  deviceIdList: any[]; simIdList: any[]; ListOfDevice = []; ListOfSim = []; ListOfvendor = []; ListOfmodel = []; ListOfdevicetype = []; ListOfnetwork = [];
  
  isSelectedsimsummary:boolean; isSelecteddevicesummary:boolean; 
  filter:any;filtersim:any;validationmsg:any;
  distributor_id:any;dealer_id:any;customer_type:any;customer_catog:any;customer_name:any;cust_state:any;
  cust_city:any;cust_mobno:any;cust_alt_mobno:any;cust_email:any;successMessage:any;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };

  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService, private listService: ListService,
     private cryptService: CryptService, private router: Router, private customerService: CustomermodelService,
     private dispatchService: DispatchedinstalledService) {
       
      this.isSelectedsimsummary = false; this.isSelecteddevicesummary = false; 
    
      
    }
    
  ngOnInit() {

    $('#simtbl').hide(); $('#devicetbl').hide(); $('#devicetypediv').hide();$('#vendordiv').hide();
      $('#devicemodeldiv').hide(); $('#networkdiv').hide(); $('#saveentry').hide();

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
    this.VendorList();    
    this.DevicetypelList(); this.clearfunction();
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
      param1: "Sim",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.VendorListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
          this.ListOfvendor = data.entity;
 
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
    this.vendorlistdata = this.vendorText.param1;
    this.devicetypelist = this.devicetypeText.param1;
    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue,
      param1: this.vendorlistdata,
      param2: this.devicetypelist
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.DeviceModelListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        
        this.ListOfmodel = data.entity.list;

        this.loading = false;

      });
  } 

  DeviceList() {

    this.vendorlistdata = this.vendorText.param1;
    this.devicetypelist = this.devicetypeText.param1;
    this.modellist = this.modelText.param1;

    let keydata = {
      param1:this.vendorlistdata,
      param2:this.devicetypelist,
      param3:this.modellist,
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
    this.modellist = this.modelText.param1;     
  }

  vendorText:any; vendorlistdata:string; modellistdummy:string;
   vendorbind(){
     this.vendorlistdata = this.vendorText.param1;
   }
   
   devicebind(){
    this.devicelist = this.deviceText.param1;
  }  

  simbind(){
    this.simnolist = this.simText.param1;
  }

  step2validation() {
    this.modellist = this.modelText.param1; 
    this.vendorlistdata = this.vendorText.param1;
    this.devicetypelist = this.devicetypeText.param1;

    let keydata = {
      param1:this.vendorlistdata,
      param2:this.devicetypelist,
      param3:this.modellist,
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

  networkchange(){
   // this.modellist = this.modelText.param1; 
   this.modellist = "";
     this.vendorlistdata = this.vendorText.param1;
    this.devicetypelist = this.devicetypeText.param1;
    this.networklistdummy = this.networkText.param1;

    let keydata = {
      param1:this.vendorlistdata,
      param2:this.devicetypelist,
      param3:this.modellist,
      param4:this.networklistdummy,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    try { AddLoader() } catch (e) { alert(e) }
    this.dispatchService.SimDropListAPI(keydata).subscribe(
        (data) => {
           try { RemoveLoader() } catch (e) { alert(e) }
          this.ListOfSim = data.entity;
           this.loading = false;
  
        });
  }

  devicecheckdata: string = "false"; simcheckdata: string = "false"; checkboxvalue: any;
  devicetoggleEditable(event) {
    if (event.target.checked) {
      // alert("check");
      this.devicecheckdata = "true";
      
      $('#devicetbl').show(); $('#devicetypediv').show();$('#vendordiv').show();$('#devicemodeldiv').show(); $('#saveentry').show();
      
    }
    else {
      this.devicecheckdata = "false";
      
      $('#devicetbl').hide(); $('#devicetypediv').hide();$('#vendordiv').hide();$('#devicemodeldiv').hide(); $('#saveentry').hide();
      
    } 
  }

  simtoggleEditable(event) {
    if (event.target.checked) {
      this.simcheckdata = "true";
      
      $('#simtbl').show(); $('#devicetypediv').show();$('#vendordiv').show();$('#devicemodeldiv').show(); $('#networkdiv').show(); $('#saveentry').show();
      this.NetworkList(); this.SimList(); 
    }
    else {
      this.simcheckdata = "false";
     
      $('#simtbl').hide(); $('#devicetypediv').hide();$('#vendordiv').hide();$('#devicemodeldiv').hide(); $('#networkdiv').hide(); $('#saveentry').hide();
      
    }
  }

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
 
  submit(){
        
    var partname = $('#partynameentry').val();
    var contno = $('#contactNoentry').val();

    var emailid = $('#emailidentry').val();
    var atposition=emailid.indexOf("@");  
    var dotposition=emailid.lastIndexOf(".");           
    var partyaddress = $('#partyaddressnewentry').val();

    this.vendorlistdata = this.vendorText.param1;
    this.devicetypelist = this.devicetypeText.param1;
    this.modellist = this.modelText.param1;
    this.devicelist = this.deviceText.param1;
    this.simnolist = this.simText.param1;
   
    var isValid = true;
    var courierby = $('#courierbyentry').val();
    var courieraddress = $('#courieraddressid').val();

    var emailid = $('#emailidentry').val();
    var atposition=emailid.indexOf("@");  
    var dotposition=emailid.lastIndexOf("."); 
    
    var trackerid = $('#trackeridentry').val();

    //Validate Party Name
    if (!partname && partname.length <= 0) {
      isValid = false;
      $('#msg_error_contactentry').html('Please Enter Party Name.').show();
      $('#partynameentry').focus();
      setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);

    }
    else if (!contno && contno.length <= 0) {
      // validate short code
      isValid = false;
      $('#msg_error_contactentry').html('Please Enter Contact No.').show();
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
      $('#msg_error_contactentry').html('Please Enter Address.').show();
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
      
       if(this.deviceasset == true && this.simasset == true)
        {
          this.checkboxvalue = "both"; 
        }
         if(this.deviceasset == true && this.simasset == false)
        {
          this.checkboxvalue = this.devicecheckdata;
        }
        if(this.deviceasset == false && this.simasset == true)
        {
          this.checkboxvalue = this.simcheckdata;
        }  

        let dataL = {  

          remarks: "ok",
          dispatchId: "",
          partyName: this.partynameText, partyMobileNo: this.contactnoText, partyAddress: this.partyaddressText, 
          partyEmailId: this.emailText, courierTrackerId: this.trackeridText, courierDate: this.courierdate, 
          courierReceivedDate:"", creatorLoginId:0, dispatchStatus:1, courierName: this.courierbyText, 
          devicelist:this.deviceIdList, simlist:this.simIdList, assetype:this.checkboxvalue,
          pageID: "7",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
        }
        try { AddLoader() } catch (e) { alert(e) }
        this.dispatchService.InsertDeviceDispatchedAPI(dataL).subscribe((data) => {
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
   
  
  closemodal() {
    $("#exampleModal").modal('hide');
    $('.modal-backdrop.show').css('display', 'none'); this.clearfunction();
}  
  
  clearfunction() {
    this.partynameText=""; this.contactnoText=""; this.emailText=""; this.partyaddressText=""; this.courierbyText="";
    this.courieraddressText=""; this.trackeridText=""; this.deviceText=""; this.simText="";
    this.deviceasset = false; this.simasset = false; this.isSelectedsimsummary = false; this.isSelecteddevicesummary = false; 
    $('#simtbl').hide(); $('#devicetbl').hide(); $('#devicetypediv').hide();$('#vendordiv').hide();
      $('#devicemodeldiv').hide(); $('#networkdiv').hide(); $('#saveentry').hide();
  }

  DeviceTypeChange()
  {

  }

  pageChanged(event){

  }

  vensaveeditbtn(){

  }

  Deletefunction(){
    
  }
}