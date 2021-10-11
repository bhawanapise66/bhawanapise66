import { ExportToExcelService } from './../../services/export-to-excel.service';
import { DevicemasterService } from './../../../../APIService/devicemaster.service';
import { DevicemodelService } from './../../../../APIService/devicemodel.service';
//import { VendormodelService } from './../../../APIService/vendormodel.service';
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

//import * as $ from 'jquery';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-device-sim-mapping',
  templateUrl: './device-sim-mapping.component.html',
  styleUrls: ['./device-sim-mapping.component.css']
})
export class DeviceSimMappingComponent implements OnInit {

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  key: string = 'name'; reverse: boolean = true; p: number; pagecount: number;
  filter: any; selectRows: string; Searchvendor: string; selectRowsText: string = "10";

  DeviceDetailsobj: any;

  pageUrl = this.router.url;
  public loading = false;
  deleteText: string; datafromrespo: string; remarkText:any;
  resdatalist = []; ListOfDeviceup = []; ListOfSimup = []; ListOfvendorup = []; ListOfmodelup = []; ListOfdevicetypeup = [];
  modelTextup: any; devicetypeTextup: any; modellistup: string; devicetypelistup: string; vendorlistdataup = [];
  devicelistup: string; simnolistup: string; deviceTextup: any; simnodrpTextup: any; submitted=false;

  private _success = new Subject<string>(); successMessageUpdate: string;
  count: number; viewcount: number; deleteText9: any;


  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  excelData: any[];
  excelpdfData$: any;

  constructor(public excelservice: ExportToExcelService,
    private deviceDetails: DevicemasterService, private listService: ListService, private cryptService: CryptService,
    private router: Router, public pdfservice: PdfService) { }

  ngOnInit() {

    (function ($) {
      $(document).ready(function () {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#vendorup').focus();
        })
      });
    })(jQuery);

    this.count = 0;
    this.viewcount = 0;
    /* ------------------------------- Wizards start Ts------------------------------------------------- */

    (function ($) {
      $(document).ready(function () {
        $('#vendorName').focus();
        $(".buttonFinish").prop('disabled', true);
        $("#step-14").show();
        $("#step-15").hide();
        $("#step-16").hide();
        $("#step-17").hide();
        function setClasses(index, steps) {
          if (index < 0 || index > steps) return;
          if (index == 0) {
            $(".buttonPrevious").prop('disabled', true);
          } else {
            $(".buttonPrevious").prop('disabled', false);
          }
          if (index == steps) {
            $(".buttonPreviousNext").text('done');
          } else {
            $(".buttonPreviousNext").text('next');
          }
          $(".step-wizard ul li").each(function () {
            $(this).removeClass();
          });
          $(".step-wizard ul li:lt(" + index + ")").each(function () {
            $(this).addClass("done");
          });
          $(".step-wizard ul li:eq(" + index + ")").addClass("active")
          var p = index * (100 / steps);
          $("#prog").width(p + '%');
        }
        $(".step-wizard ul button").click(function () {
          var step = $(this).find("div.step")[0].innerText;
          var steps = $(".step-wizard ul li").length;
          validateAllSteps(step - 1, steps);
        });
        $("#prev").click(function () {
          var step = $(".step-wizard ul li.active div.step")[0].innerText;
          var steps = $(".step-wizard ul li").length;
          setClasses(step - 2, steps - 1);
          displayreviousSection(step - 1);
        });
        $("#next").click(function () {
          if ($(this).text() == 'done') {
         
          } else {
            var step;
            try {
              step = $(".step-wizard ul li.active div.step")[0].innerText;
            } catch (error) {
              step = $(".step-wizard ul li div.step")[0].innerText;
            }

            var steps = $(".step-wizard ul li").length;
            validateAllSteps(step, steps - 1);
            //setClasses(step, steps - 1);
          }
        });

        // initial state setup
        setClasses(0, $(".step-wizard ul li").length);

        function displayreviousSection(index) {

          $(".buttonNext").prop('disabled', false);
          switch (index) {
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

        function validateAllSteps(index, steps) {
          var isStepValid = true;


          if (validateStep1(index, steps) == false) {
            isStepValid = false;
          } else
            if (validateStep2(index, steps) == false) {
              isStepValid = false;
            } else
              if (validateStep3(index, steps) == false) {
                isStepValid = false;
              } else
                if (validateStep4(index, steps) == false) {
                  isStepValid = false;
                }
          return isStepValid;
        }

        function validateStep1(index, steps) {
          $('#vendorName').focus();
          $('#msg_error').html('').hide();

          var isValid = true;

          if (isValid && index == 1) {

            $('#msg_error').html('').hide();
            $("#step-14").hide()
            $("#step-15").show();
            $("#step-16").hide();
            $("#step-17").hide();

            $(".buttonFinish").prop('disabled', false);
            $("#next").prop('disabled', true);
            setClasses(index, steps);
            $('#pername').focus();
            isValid = false;
          }
          return isValid;
        }


        function validateStep2(index, steps) {
          $('#pername').focus();
          $('#msg_error_contact').html('').hide();
          // $('#msg_alternateNo').html('').hide();
          // $('#msg_State').html('').hide();
          // $('#msg_city').html('').hide();
          var isValid = true;
          var devicetype = $('#devicetypeupdatedummy').val();
          var IMEIno = $('#IMEINoupdate').val();
          var deviceserialno = $('#deviceserialupdate').val();
          var checkdata = $('#checkboxdata').val();
          // Validate Contact Name
          if (!devicetype && devicetype.length <= 0) {
        
            isValid = false;
            $('#msg_error_contact').html('Please Enter Device Type').show();
            $('#devicetypeupdate').focus();
            setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
          }
          else if (!IMEIno && IMEIno.length <= 0 || IMEIno.length < 15) {
          
            isValid = false;
            $('#msg_error_contact').html('Please Enter IMEI No. ').show();
            $('#IMEINoupdate').focus();
            setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

          }
          else
            if (!deviceserialno && deviceserialno.length <= 0 || deviceserialno.length < 19) {
              // validate Alternate Number
              isValid = false;
              $('#msg_error_contact').html('Please Enter Device Serial No.').show();
              $('#deviceserialupdate').focus();
              setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

            }

          if (isValid && index == 2) {

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


        function validateStep3(index, steps) {

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
          if (isValid && index == 3) {

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
        function validateStep4(index, steps) {
      
          return true;
        }
      });
    })(jQuery);
    this.EncryptPageName();
    this.EncryptPageUrl();
    this.DeviceDetail();
    this.NetworkList();

    this.clearfunction();

    this._success.subscribe((message) => this.successMessageUpdate = message);

    this._success.pipe(
      debounceTime(8000)
    ).subscribe(() => this.successMessageUpdate = null);

    /* ------------------------------- Wizards end Ts------------------------------------------------- */
  }


  /*------------------------------------------ View Next ----------------------------------------------------*/
  EncryptPageName() {
    this.cryptService.encrypt("Device Assign To Sim Details")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
 

  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
 
  }

  editpageform() {
    document.getElementById("backdetailsbtn").style.display = "block";
    document.getElementById("editbtn").style.display = "none";
    // document.getElementById("customerdtls").style.display="none";
    // document.getElementById("bankdtls").style.display="none";
    document.getElementById("vendordtls").style.display = "none";
    //  document.getElementById("rev2btn").style.display="none";
    //  document.getElementById("revbtn").style.display="none";
    //  document.getElementById("nextviewbtn").style.display="none";
    //  document.getElementById("next2viewbtn").style.display="none";
    document.getElementById("container").style.display = "block";
    document.getElementById("modelfooter").style.display = "block";
    document.getElementById("uvmd").style.display = "block";
    document.getElementById("vmd").style.display = "none";
    this.VendorList();
    this.DeviceModelList();
    this.DevicetypelList();
    this.DeviceSimList();

  }

  backdetailsbtn() {
    document.getElementById("uvmd").style.display = "none";
    document.getElementById("vmd").style.display = "block";
    document.getElementById("backdetailsbtn").style.display = "none";
    document.getElementById("editbtn").style.display = "block";
    // document.getElementById("customerdtls").style.display="block";
    // document.getElementById("bankdtls").style.display="block";
    document.getElementById("vendordtls").style.display = "block";
    document.getElementById("modelfooter").style.display = "none";
    //  document.getElementById("rev2btn").style.display="none";
    //  document.getElementById("revbtn").style.display="none";
    //  document.getElementById("nextviewbtn").style.display="block";
    //  document.getElementById("next2viewbtn").style.display="none";
    document.getElementById("container").style.display = "none";
    //  document.getElementById("bankdtls").style.display="none";
    //  document.getElementById("customerdtls").style.display="none";
  }

  DeviceDetail() {

    // var search = $('#searchData').val();
    this.p = 1; this.pagecount = 10;


    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: "",
      searchType: "sim assign to device",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.deviceDetails.DeviceDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        let resdatalist = data.entity.responsedatalist;
      
        let devicelist = resdatalist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
        this.DeviceDetailsobj = devicelist;
        this.DeviceDetail1();
        // this.DeviceDetail1()
        //this.DevicePDFDetail();
      });
  }

  VendorList() {

    let keydata = {
      param1: "device",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.VendorListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfvendorup = data.entity;

      });
      
  }

  vendorlistdataup1: string; vendorTextup: any; devicetypelistup1: string;

  DeviceModelList() {
    // this.vendorlistdataup1 = this.vendorTextup.param1;
    // this.devicetypelistup1 = this.devicetypeTextup.param2;
    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue,
      param1: this.vendorlistdataup,
      param2: this.devicelistupdummy
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.DeviceModelListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
       
        this.ListOfmodelup = data.entity.list;
        // this.ListOfState = statelist;

        this.loading = false;

      });
  }

  DevicetypelList() {

    let keydata = {
      param1: "sim assign to device",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.DeviceTypeListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.ListOfdevicetypeup = data.entity.list;

        this.loading = false;

      });
  }

  DeviceTypeChangeup() {

    this.DeviceSimList();
  }

  DeviceSimList() {

    // this.vendorlistdataup = this.vendorTextup.param1;
    // this.devicetypelistup = this.devicetypeTextup.param1;
    // this.modellistup = this.modelTextup.param1;

    let keydata = {
     // param1: this.vendorlistdataup,                              //vendorlistdataup,              devicemakeid
      param1:this.simid,
      param2: this.devicelistupdummy,                             //devicetypelistup,           devicetypeid
      param3: this.devicemodellistup,                                                 //modellistup,             devicemodelid
      param4: this.networkid,
      param6:"for unassign",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    try { AddLoader() } catch (e) { alert(e) }
    this.deviceDetails.DeviceDropListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfDeviceup = data.entity;
        this.loading = false;

      });
      try { AddLoader() } catch (e) { alert(e) }
    this.deviceDetails.SimDropListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfSimup = data.entity;
        this.loading = false;

      });
  }

  vendorbind() {
    this.vendorlistdataup = this.vendorTextup.param1;

  }

  devicelistupdummy: any;
  DeviceTypeListup() {
    //   this.modellistup = this.devicetypeTextup.param1;
    this.devicelistupdummy = this.devicetypeTextup.param1;
  }
  devicemodellistup: any;
  DeviceModelup() {
    this.devicemodellistup = this.modelTextup.param1;
   
  }
  /*  
    devicebind(){
     this.devicelistup = this.deviceTextup.param1;
   }  */
  simnodrpText: any; newsimid:any;
  simbind() {
   // alert("datttag ")
  // alert(this.simid);
    this.newsimid = this.simnodrpTextup.param1;
  //  alert("change new sim id--"+this.newsimid);

    // if(this.simid == this.newsimid){
    //   alert("data is match");
    // }
    // else if(this.simid != this.newsimid){
    //   alert("data is not match");
    // }
  //  this.simid = this.simnodrpText.param1;
  }

  devicebind() {
    this.device_id = this.deviceTextup.param1;
  }

  step2validation() {
    this.modellistup = this.modelTextup.param1;
  }

  device_id: string; devicemakeid: string; simid: string;
  networkname: any; networkid: any;mno:any;
  setdata(com) {
   
    let vendordatadetails = com;
    this.device_id = vendordatadetails.param1;
    this.devicemakeid = vendordatadetails.param2;
    this.vendorTextup = vendordatadetails.param11;
    this.devicemodellistup = vendordatadetails.param3;
    this.vendorlistdataup = vendordatadetails.param37;                        //vendorid
    this.modelTextup = vendordatadetails.param14;
    this.devicetypeTextup = vendordatadetails.param52;                         //devicetypename
    this.devicelistupdummy = vendordatadetails.param53;                         //devicetypeid
    this.deviceTextup = vendordatadetails.param4;      //imeino.
    this.simnodrpTextup = vendordatadetails.param6;
    this.simid = vendordatadetails.param58;
    this.networkname = vendordatadetails.param9;
    this.mno = vendordatadetails.param7;
    this.networkid = this.getid(this.ListOfNetwork, this.networkname);
    //  this.vendorlistdataup = this.check(this.vendorTextup);
    this.modellistup = this.check(this.modelTextup);
    // this.devicetypelistup = this.check(this.devicetypeTextup);
    this.devicelistup = this.check(this.deviceTextup);
    this.simnolistup = this.check(this.simnodrpTextup);
    this.backdetailsbtn();
    // this.vendorlistdataup = this.vendorTextup.param1;
    // this.devicetypelistup = this.devicetypeTextup.param1;
    // this.modellistup = this.modelTextup.param1;

    // let keydata = {
    //   param1: this.vendorlistdataup,
    //   param2: this.devicetypelistup,
    //   param3: this.modellistup,
    //   pageID: "7",
    //   pageName: this.encryptedpageNameValue,
    //   pageURL: this.encryptedpageUrlValue
    // }

    // try { AddLoader() } catch (e) { alert(e) }
    // this.deviceDetails.DeviceDropListAPI(keydata).subscribe(
    //   (data) => {
    //     try { RemoveLoader() } catch (e) { alert(e) }
    //     this.ListOfDeviceup = data.entity;

    //   });

    // this.deviceDetails.SimDropListAPI(keydata).subscribe(
    //   (data) => {
    //     try { RemoveLoader() } catch (e) { alert(e) }
    //     this.ListOfSimup = data.entity;

    //   });
  }

  // devicestep1validation
  deviceeditbtn() {
    this.submitted = true;
    var isValid = true;

    // var vendoridval = this.getid(this.ListOfvendorup, this.vendorTextup);
    // var modelid = this.getid(this.ListOfmodelup, this.modelTextup); 
    // var devicetypeidval = this.getid(this.ListOfdevicetypeup, this.devicetypeTextup);
    // var deviidd = this.getid(this.ListOfDeviceup, this.deviceTextup);
    var netid = this.networkid;


    var vendorID = $('#vendorupdummy').val();

    var modID = $('#devicemodellistupid').val();
   
    var devicetype = $('#devicetypedummyup').val();

    var devID = $('#devicelistdummy').val();

    var SIM_ID = $('#simnolistdummy').val();
  
    var networkid = $('#networkdummTextid').val();
  
    if (!vendorID && vendorID.length <= 0) {
    
      isValid = false;

      $('#msg_error').html('Please Select Vendor.').show();
      $('#vendorentrydemoup').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
    }
    else if (!modID && modID.length <= 0) {
 

      isValid = false;
      $('#msg_error').html('Please Select Device Model. ').show();
      $('#modelentryup').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
    }
    else if (!devicetype && devicetype.length <= 0) {
      // validate Alternate Number

      isValid = false;
      $('#msg_error').html('Please Select Device Type.').show();
      $('#devicetypeentryup').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);

    }
    else if (!devID && devID.length <= 0) {
      // validate Alternate Number

      isValid = false;
      $('#msg_error').html('Please Select Device.').show();
      $('#deviceentryidup').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);

    } else if (!networkid && networkid.length <= 0) {
      // validate Alternate Number

      isValid = false;
      $('#msg_error').html('Please Select Network.').show();
      $('#networkdummTextid').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);

    }
    else if (!SIM_ID && SIM_ID.length <= 0) {
      // validate Alternate Number

      isValid = false;
      $('#msg_error').html('Please Select Sim.').show();
      $('#simnodrpentryup').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);

    }
    else {


      let dataL = {
     
        // remarks: "Ok",
        // deviceId: this.device_id,
        // simId: this.simid,
        remarks: "Ok",
        deviceid: this.device_id,
        oldsimid: this.simid,
        newsimid: this.newsimid,
        reason:"No Reason "
        // pageID: "7",
        // pageName: this.encryptedpageNameValue,
        // pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }
      this.deviceDetails.SimUnAssignToDeviceAPI(dataL).subscribe((data) => {
        this.clearfunction();
        try { RemoveLoader() } catch (e) { alert(e) }

        this.datafromrespo = data.entity;

        if (data.statuscode == '200') {
          $("#SuccessModal").modal('show');
          this.closemodal();
          this.clearfunction(); this.DeviceDetail();
        }
        else {
          $("#ErrorModal").modal('show');
        }

      });

    }

  }

  searchdata() {
    var search = $('#searchData').val();
    this.loading = true;

    var selectrow = $('#selectrow1').val();
    this.p = 1; this.pagecount = selectrow;


    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: search,
      searchType: "sim assign to device",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.deviceDetails.DeviceDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.responsedatalist;


        let vendorlist = resdatalist;

        this.DeviceDetailsobj = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }

  SelectRows() {

    var search = $('#searchData').val();
    var selectrow = $('#selectrow1').val();
    this.loading = true;
 
    this.p = 1; this.pagecount = selectrow;


    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: search,
      searchType: "sim assign to device",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.deviceDetails.DeviceDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.responsedatalist;


        let vendorlist = resdatalist;

        this.DeviceDetailsobj = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }





  Refreshfunction() {
    //$('#searchData').val("");
    // this.selectRowsText = "10";
    //var getvalue = $('#searchData').val();

    this.loading = true;
    this.filter = "";

    this.p = 1; this.pagecount = 10;
  

    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: "",
      searchType: "sim assign to device",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.deviceDetails.DeviceDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
       
        let resdatalist2 = data.entity.responsedatalist;
     
        try {
          let vendorlist2 = resdatalist2;
       
          this.DeviceDetailsobj = vendorlist2;
          this.count = data.entity.count;
          this.viewcount = data.entity.viewCount;
        } catch (e) { alert("Refresh Alert:- " + e) }

        this.loading = false;
      });
      this.DeviceDetail1();
  }

  SimMasterpageChanged(event) {
    var search = $('#searchData').val();
    var selectrow = $('#selectrow1').val();
    this.p = event; this.pagecount = selectrow;
    

    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: search,
      searchType: "sim assign to device",
      totalRecords: "" + this.count,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.deviceDetails.DeviceDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
       
        let resdatalist = data.entity.responsedatalist;
     

        let vendorlist = resdatalist;
     
        this.DeviceDetailsobj = vendorlist;
     
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }

  //sorting
  sort(key) {
  this.key = key;
    this.reverse = !this.reverse;

  }


  check(data) {
    try {
      if (typeof data === 'object') {
       // console.log("come in object if");
        return data.param1;
      }
      else if (data == '') {
      //  console.log("come in else if ");
      }
      else {
     //   console.log(data.length);
        return data;
      }
    } catch (e) {
      return '';
    }
  }

  getid(data, value) {

    try {
      if (typeof value === 'object') {
      
      //  console.log("come in object if")
     //   console.log(value.param1 + "  ====  " + value.param2);
        return value.param1;
        // return data.param1;
      }
      else {
   
     //   console.log("come in else")
        var index = data.findIndex(x => x.param2 === value);
      
        return data[index].param1;
      }
    } catch (e) {
      return '';
    }

  }

  closemodal() {
  
    $("#SuccessModel").modal('hide');

    $('#modeldelete').modal('hide');
    $('#myModalwizard').modal('hide');

    $('.modal-backdrop.show').css('display', 'none');
    this.clearfunction();
  }

  clearfunction() {


    this.deleteText9 = "";

  }

  SimAssignDeletefunction() {
    var isValid = true;
    var deleteremark = $('#groupdelremark').val();
    deleteremark = deleteremark.substring(0, 1).toUpperCase() + deleteremark.substring(1);

    if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      $('#msg_error_delete').html('Please Enter Remark.').show();
      $('#groupdelremark').focus();
      setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);

    }
    else {
      let dataL = {
        remarks: deleteremark,
        deviceId: this.device_id,
        simId: this.simid,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }

      try { AddLoader() } catch (e) { alert(e) }
      this.deviceDetails.SimUnAssignToDeviceAPI(dataL).subscribe((data) => {

        try { RemoveLoader() } catch (e) { alert(e) }

        this.datafromrespo = data.entity;

        if (data.statuscode == 200) {
          $("#SuccessModal").modal('show');

          this.DeviceDetail();

          this.closemodal();
        }
        else {
          $("#ErrorModal").modal('show');
        }
      });

    }
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

        this.ListOfNetwork = data.entity.list;

        this.loading = false;

      });
  }

  ListOfNetwork: any = [];
  networkupdatebind() {
    this.networkid = this.networkname.param1;
  }


  createPDF() {

    let pdfTableData;
    let dataArray = []
    for (let i = 0; i < this.DeviceDetailsobj1.length; i++) {
      pdfTableData = {
        "#": this.DeviceDetailsobj1[i]["rowNumber"],
        "Device Type": this.DeviceDetailsobj1[i]["param52"],
        "Vendor": this.DeviceDetailsobj1[i]["param11"],
        "Model": this.DeviceDetailsobj1[i]["param14"],
        "IMEI No.": this.DeviceDetailsobj1[i]["param4"],
        "Device Serial No": this.DeviceDetailsobj1[i]["param5"],
        "ICCID /SIM No": this.DeviceDetailsobj1[i]["param6"],
        "Network": this.DeviceDetailsobj1[i]["param9"],
        "Mobile No.": this.DeviceDetailsobj1[i]["param7"],
        "Assigned Date": this.DeviceDetailsobj1[i]["param65"],
        "Status": this.DeviceDetailsobj1[i]["param41"],
      }
      dataArray.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(dataArray, "Device Sim Mapping Details");

  }
  exportToExcel() {
    this.DeviceDetail1();
    this.excelservice.ExportExcel(this.excelData, 'Device Sim Mapping Details', 'devicesimmappingdetails');
  }


  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      try {
        var obj = {

          "#": i + 1,
          "Device Type": data[i].param52,
          "Vendor": data[i].param11,
          "Model": data[i].param14,
          "IMEI No.": data[i].param4,
          "Device Serial No": data[i].param5,
          "ICCID /SIM No": data[i].param6,
          "Network": data[i].param9,
          "Mobile No.": data[i].param7,
          "Assigned Date": data[i].param65,
          "Status": data[i].param41,
        }
      } catch (e) { }
      this.excelData.push(obj);
    }
  }
  DeviceDetailsobj1: any = [];

  DeviceDetail1() {

    this.loading = true;

    let keydata = {
      // param1: this.divisiondetail["param1"],
      pageNo: "",
      itemsPerPage: "",
      searchBy: "",
      searchType: "sim assign to device",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.deviceDetails.DeviceDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.responsedatalist;
    

        let devicelist = resdatalist;

        this.DeviceDetailsobj1 = devicelist;
        this.PrepareExcelData(this.DeviceDetailsobj1);

        this.loading = false;

      });
  }
}
