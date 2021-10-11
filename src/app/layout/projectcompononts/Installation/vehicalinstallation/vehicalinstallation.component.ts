import { PdfService } from './../../services/pdf.service';
import { ExportToExcelService } from './../../services/export-to-excel.service';
import { UploadimageoneService } from './../upload/uploadimageone.service';
import { VehicleinstallationService } from './../../../../APIService/vehicleinstallation.service';
import { CustomermodelService } from './../../../../APIService/customermodel.service';
import { Router } from '@angular/router';

import { ListService } from './../../../../../list.service';


import { HttpResponse, HttpEventType, HttpRequest } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';


import * as xlsx from 'xlsx';
import * as $ from 'jquery';
import * as moment from 'moment';
import { CryptService } from './../../services/crypt.service';

import { DevicemodelService } from '../../../../APIService/devicemodel.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

declare var jQuery: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

declare var QRious:any;


//declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-vehicalinstallation',
  templateUrl: './vehicalinstallation.component.html',
  styleUrls: ['./vehicalinstallation.component.css']
})
export class VehicalinstallationComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;
  public loading = false; p: number; pagecount: any; count: number=0; viewcount: number;

  selectRowsText: string = "10"; key: string = 'name'; reverse: boolean = true;
  datafromrespo: string;
  filter: any; deleteText: string;

  IMEIText: string; vehicleclass: string; vehicleclassText: string; SelectMakeText: string; SelectModelText: string; MgfYearText: string; StateText: string; RTOText: string; CustomerNameText: string;
  VehiclenoText: string; ChassisNoText: string; EngineNoText: string;
  CustIdentityText: string; AddProofText: string; RCText: string; InvoiceText: string; Panictext: string; DeviceInstText: string;

  deleteremarkText: string;

  VehicleInstalDetails$: any[]; ListOfDevicetype$: Object; ListOfVendor$: Object;
  //renewal
  // renewal
  pmtDate: any; pmtMethod: string; pmtValidity: any; pmtBank: string = ''; pmtRefId: string = ''; pmtEmp: string = ''; pmtAmt: number; pmtRemark: any;

  vendorText:any;vendorlistdata:any;remarkText:any;selectvendorList:any;dummyvehicleicon:any;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };

  selectedFiles: FileList;
  selectedFiles2: FileList;
  selectedFiles3: FileList;
  currentFileUpload: File;
  currentFileUpload2: File;
  currentFileUpload3: File;
  progress: { percentage: number } = { percentage: 0 };


  PersonNameUpdateText: any
  vehiclenewold: any;
  constructor(private modalService: NgbModal,private excelservice: ExportToExcelService,private pdfservice:PdfService,  private flashMessage: FlashMessagesService, private uploadService: UploadimageoneService, private vehicleinstallationservice: VehicleinstallationService, private listService: ListService, private cryptService: CryptService, private router: Router, private devicemodelService: DevicemodelService) { }
  selectmgfyear: string; selectmgfyearupdate: string;

  selectFileupdate(event) {
    document.getElementById("defaultimgupdate").style.display="none";
    document.getElementById("blahupdate").style.display="block";
    this.selectedFiles = event.target.files;
    this.cust_updateidentityupload();
  }

  selectFile2update(event) {
    document.getElementById("defaultimg2update").style.display="none";
    document.getElementById("blah2update").style.display="block";
    this.selectedFiles2 = event.target.files;
    this.address_updateidentityupload();
  }

  selectFile3update(event) {
    document.getElementById("defaultimg3update").style.display="none";
    document.getElementById("blah3update").style.display="block";
    this.selectedFiles3 = event.target.files;
    this.rc_updateidentityupload();
  }
  mobilizeupdate:any; fulecheckupdate:any;
  devicetypeupdatedummy: string; acstatusupdate:any; installationDateupdate:any;
  updatebutton() {
    this.installationDateupdate = (document.getElementById('dateinputupdate') as HTMLInputElement).value;
    this.mobilizeupdate = $("input[type='radio'][name='mobilizeupdate']:checked").val();
    this.fulecheckupdate = $("input[type='radio'][name='fulecheckupdate']:checked").val();
    this.acstatusupdate = $("input[type='radio'][name='acstatusupdate']:checked").val();
    this.devicetypeupdatedummy = $("#devicetypeupdatedummy").val();
    if (this.devicetypeupdatedummy == 'Personal Tracker App' || this.devicetypeupdatedummy == 'Basic' || this.devicetypeupdatedummy == 'Smart Tracker') {
       //alert("basic personaltacker");
      var makeid = this.getid(this.ListOfSelectMake, this.SelectMakeTextupdate);
      var modelid = this.getid(this.ListOfSelectModel, this.SelectModelTextupdate);
      var vehicleclass = this.getid(this.ListOfVehicleclass, this.vehicleclassTextupdate);
      var statecode = this.getid(this.ListOfState, this.SelectStateText);
      var rtocode = this.getid(this.ListOfRTO, this.SelectRTOTextupdate);
      var customarid = this.getid(this.ListOfCustomer, this.SelectCustomerText);
      var devicetype = this.getid(this.ListOfDevicetype, this.devicetypeTextupdate);
      var deviceimei = this.getid(this.ListOfDeviceRawData, this.devicetypeIMEITextUpdate);
      var installedby = this.getid(this.ListOfEmployee, this.SelectInstallbyTextUpdate);
      var vehicleicon = this.getid(this.ListOfVehicleIcon,this.SelectVehicleIconTextUpdate);
      var vendorid = this.getid(this.ListOfvendorup,this.vendorTextUpdate);
    
      let dataL = {
        param1: "",
        param2: "",
        param3: makeid,
        param4: modelid,
        param5: vehicleclass, param6: this.VehiclenoText, param7: this.select_chassisno, param8: this.select_engineno, param9: this.selectyearreturn, param10: statecode,
        param11: rtocode, param12: this.vehicleclass, param13: customarid, param14: "", param15: devicetype, param16: deviceimei, param17: "Application", param18: "",
        param19: "", param20: "", param21: this.CustIdentityText, param22: this.AddProofText, param23: this.RCText, param24: this.InvoiceText, param25: this.Panictext,
         param26: this.installationDateupdate, param27: devicetype, param28: installedby, param29: "",
        param30: this.mobilizeupdate,    param31: this.fulecheckupdate,    param32:this.acstatusupdate, param33:vehicleicon, param34:vendorid,
        //file1:this.currentFileUpload, file2:this.currentFileUpload2, file3:this.currentFileUpload3, 
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }

      this.vehicleinstallationservice.UpdateVehicleInstallationAPI(dataL).subscribe((data) => {
        //  alert(dataL);
        //  alert(data);
        try { RemoveLoader() } catch (e) { alert(e) }

        this.datafromrespo = data.entity;

        if (this.datafromrespo == 'Successfully Saved.') {
          $("#SuccessModalEntry").modal('show');
        }
        else {
          $("#ErrorModalEntry").modal('show');
        }
      });
    }
    else if (this.devicetypeupdatedummy == 'AIS-140') {
      // alert("AIS-140");
      var makeid = this.getid(this.ListOfSelectMake, this.SelectMakeTextupdate);
      var modelid = this.getid(this.ListOfSelectModel, this.SelectModelTextupdate);
      var vehicleclass = this.getid(this.ListOfVehicleclass, this.vehicleclassTextupdate);
      var statecode = this.getidforstatecode(this.ListOfState, this.SelectStateText);
     // var statecode = this.getid(this.ListOfState, this.SelectStateText);
     
      var rtocodeais = this.getidrtocode(this.ListOfRTO, this.SelectRTOTextupdate);
      var customarid = this.getid(this.ListOfCustomer, this.SelectCustomerText);
      var devicetype = this.getid(this.ListOfDevicetype, this.devicetypeTextupdate);
      var deviceimei = this.getid(this.ListOfDeviceRawData, this.devicetypeIMEITextUpdate);
      var installedbyais = this.getid(this.ListOfEmployee, this.SelectInstallbyTextUpdate);

      var deviceimei = this.getid(this.ListOfDeviceRawDataupdate, this.devicetypeIMEITextUpdate);
      var deviceimeidata = this.getidforimeino(this.ListOfDeviceRawDataupdate, this.devicetypeIMEITextUpdate);
 
      var vehicleicon = this.getid(this.ListOfVehicleIcon,this.SelectVehicleIconTextUpdate);
      var vendorid = this.getid(this.ListOfvendorup,this.vendorTextUpdate);
      alert("rtocode"+rtocodeais);
      let dataL = {
        param1: "",
        param2: this.vehicleidnew,
        param3: makeid, param4: modelid, param5: vehicleclass, param6: this.VehiclenoText, param7: this.select_chassisno, param8: this.select_engineno, param9: this.selectyearreturn, param10: statecode,
        param11: rtocodeais, param12: "New", param13: customarid, param14: "",param15: deviceimei, param16: deviceimeidata, param17: "Application", param18: this.respooffileupdate,
        param19: this.respooffile2update, param20: this.respooffile3update, param21: this.CustIdentityText, param22: this.AddProofText, param23: this.RCText, param24: this.InvoiceText, param25: this.Panictext, 
        param26: this.installationDateupdate, param27: devicetype, param28: installedbyais, param29: "",
        param30: this.mobilizeupdate,    param31: this.fulecheckupdate,    param32:this.acstatusupdate, param33:vehicleicon,param34:vendorid,
        //file1:this.currentFileUpload, file2:this.currentFileUpload2, file3:this.currentFileUpload3, 
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }

      this.vehicleinstallationservice.UpdateVehicleInstallationAPI(dataL).subscribe((data) => {
        //  alert(dataL);
        //  alert(data);
        try { RemoveLoader() } catch (e) { alert(e) }

        this.datafromrespo = data.entity;

        if (this.datafromrespo == 'Successfully updated.') {
          $("#SuccessModal").modal('show');
        }
        else {
          $("#ErrorModal").modal('show');
        }
      });

     
    }

    else if (this.devicetypeupdatedummy == 'Personal Tracker') {
      // alert("personal tracker");
       var makeid = this.getid(this.ListOfSelectMake, this.SelectMakeTextupdate);
       var modelid = this.getid(this.ListOfSelectModel, this.SelectModelTextupdate);
       var vehicleclass = this.getid(this.ListOfVehicleclass, this.vehicleclassTextupdate);
       var statecode = this.getidforstatecode(this.ListOfState, this.SelectStateText);
       var rtocode = this.getid(this.ListOfRTO, this.SelectRTOTextupdate);
       var customarid = this.getid(this.ListOfCustomer, this.SelectCustomerText);
       var devicetype = this.getid(this.ListOfDevicetype, this.devicetypeTextupdate);
      // this.devicetypeid = devicetype;
       
       var deviceimei = this.getid(this.ListOfDeviceRawDataupdate, this.devicetypeIMEITextUpdate);
       var deviceimeidata = this.getidforimeino(this.ListOfDeviceRawDataupdate, this.devicetypeIMEITextUpdate);
       var installedby = this.getid(this.ListOfEmployee, this.SelectInstallbyTextUpdate);
       var vehicleicon = this.getid(this.ListOfVehicleIcon,this.SelectVehicleIconTextUpdate);
       var vendorid = this.getid(this.ListOfvendorup,this.vendorTextUpdate);
       
       // alert("vehicleicon"+vehicleicon);
      
       let dataL = {
         param1: "",
         param2: this.vehicleidnew,
         param3: "0", param4: "0", param5: vehicleclass, param6: this.VehiclenoText, param7: this.VehiclenoText, param8: this.VehiclenoText, param9: this.selectyearreturn, param10: statecode,
         param11: rtocode, param12: "", param13: customarid, param14: "", param16: deviceimeidata, param15: deviceimei, param17: "Application", param18: "",
         param19: "", param20: "", param21: this.CustIdentityText, param22: this.AddProofText, param23: this.RCText, param24: this.InvoiceText, param25: this.Panictext, param26: "", param27: devicetype, param28: installedby, param29: "",
         param33:vehicleicon,param34:vendorid,
        
       }
       try { AddLoader() } catch (e) { alert(e) }

      this.vehicleinstallationservice.UpdateVehicleInstallationAPI(dataL).subscribe((data) => {
       
        try { RemoveLoader() } catch (e) { alert(e) }

        this.datafromrespo = data.entity;
       
        if (this.datafromrespo == 'Successfully updated.') {
        
          $("#SuccessModal").modal('show');
        }
        else {
          $("#ErrorModal").modal('show');
        }
      });
 
 
       this.selectedFiles = undefined;
     }

  }
  devicetypeid:any; respooffileupdate: any;
  respooffile2update: any;
  respooffile3update: any;
  cust_updateidentityupload() {
    let vehicledata = {
      param1: this.VehiclenoText, param2: this.ChassisNoText
    }
    localStorage.setItem("selectdevicetype", this.selectdevicetype);
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    // console.log("aaaaaaaaaaaaaaaaaaaa"+this.currentFileUpload);
    this.uploadService.Vehicle_cust_idpushFile(this.currentFileUpload, vehicledata).subscribe(event => {
      if (event['statuscode'] == "200") {
        //  alert("high ");
        try { RemoveLoader() } catch (e) { alert(e) }
        this.respooffileupdate = event['entity'];
        console.log("the return data of file upload 1 "+JSON.stringify(this.respooffileupdate));
      }
      else {
        alert("ldata is not f");
      }
    });

    this.selectedFiles = undefined;
  }
  address_updateidentityupload() {
    let vehicledata = {
      param1: this.VehiclenoText, param2: this.ChassisNoText
    }
    localStorage.setItem("selectdevicetype", this.selectdevicetype);
    this.progress.percentage = 0;

    this.currentFileUpload2 = this.selectedFiles2.item(0);
    // console.log("aaaaaaaaaaaaaaaaaaaa"+this.currentFileUpload);
    this.uploadService.Vehicle_cust_idpushFile(this.currentFileUpload2, vehicledata).subscribe(event => {
      if (event['statuscode'] == "200") {
        //  alert("high ");
        try { RemoveLoader() } catch (e) { alert(e) }
        this.respooffile2update = event['entity'];
        console.log("the return data of file upload 1 "+JSON.stringify(this.respooffile2update));
      }
      else {
        alert("ldata is not f");
      }
    });

    this.selectedFiles2 = undefined;
  }
  rc_updateidentityupload() {
    let vehicledata = {
      param1: this.VehiclenoText, param2: this.ChassisNoText
    }
    localStorage.setItem("selectdevicetype", this.selectdevicetype);
    this.progress.percentage = 0;

    this.currentFileUpload3 = this.selectedFiles3.item(0);
    // console.log("aaaaaaaaaaaaaaaaaaaa"+this.currentFileUpload);
    this.uploadService.Vehicle_cust_idpushFile(this.currentFileUpload3, vehicledata).subscribe(event => {
      if (event['statuscode'] == "200") {
        //  alert("high ");
        try { RemoveLoader() } catch (e) { alert(e) }
        this.respooffile3update = event['entity'];
        console.log("the return data of file upload 1 "+JSON.stringify(this.respooffile3update));
      }
      else {
        alert("ldata is not f");
      }
    });

    this.selectedFiles3 = undefined;
  }
  switcher: boolean = true;

  getSwitcherValue() {
    // console.log("onoffswitch:", this.switcher);
    if (this.switcher == true) {
      // alert("block"+this.switcher);
      this.checkblock = 'Block';
      //alert(this.checkblock);
    }
    else if (this.switcher == false) {
      //alert("Unblock"+this.switcher);
      this.checkblock = 'Unblock';
      //alert(this.checkblock);
    }
  }

  ngOnInit() {
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
            // alert("submit the form?!?")
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
              }

          return isStepValid;
        }

        function validateStep1(index, steps) {
          $('#distrbutorname').focus();
          $('#msg_error').html('').hide();
          // $('#msg_vendorName').html('').hide();
          // $('#msg_shortcode').html('').hide();
          // $('#msg_OfficialNo').html('').hide();
          // $('#msg_Officialemail').html('').hide();
          var isValid = true;
          var devtype = $('#devicetypeupdatedummy').val();
          var imeino = $('#deviceimeiupdatedummy').val();
          // alert("sdjb"+distributorname);
         



          //Validate Vendor Name
          if (!devtype && devtype.length <= 0) {
            isValid = false;
            $('#msg_error').html('Please Enter Device Type').show();
            $('#devicetypeupdate').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
          }
          else if (!imeino && imeino.length <= 0) {
            // validate Official No
            isValid = false;
            $('#msg_error').html('Please Enter IMEI Code').show();
            $('#devicetypeIMEIupdate').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
          }

          



          if (isValid && index == 1) {

            // $('#msg_vendorName').html('').hide();
            // $('#msg_shortcode').html('').hide();
            // $('#msg_OfficialNo').html('').hide();
            // $('#msg_Officialemail').html('').hide();
            $('#msg_error').html('').hide();
            $("#step-14").hide()
            $("#step-15").show();
            $("#step-16").hide();
            $("#step-17").hide();
            var vehicleclass = $('#vehicleclassupdatedummy').val();
            var selectmake = $('#selectmakeupdatedummy').val();
            var selectmodel = $('#modelselectdummyupdate').val();
  
            var selectmgfyear = $('#selectmgfyeardumyupd').val();
            var selectstate = $('#stateupdatedummy').val();
            var selectrto = $('#statertoupdatedummy').val();
  
            var selectcust = $('#customernameupdatedummy').val();
            var vehicleno = $('#vehiclenoupdate').val();
            var chassisno = $('#chassisnoupdate').val();
            var engineno = $('#enginenoupdate').val();

             if (!selectcust && selectcust.length <= 0) {
              // validate Official No
              isValid = false;
              $('#msg_error').html('Please Enter Customer Name').show();
              $('#statecustomerupdate').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
            }
            else if (!vehicleno && vehicleno.length <= 0) {
              // validate Official No
              isValid = false;
              $('#msg_error').html('Please Enter Vehicle No').show();
              $('#vehiclenoupdate').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
            }
            else if (chassisno && chassisno.length <= 0) {
              // validate Official No
              isValid = false;
              $('#msg_error').html('Please Enter Chassis No').show();
              $('#chassisnoupdtae').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
            }
            else if (!engineno && engineno.length <= 0) {
              // validate Official No
              isValid = false;
              $('#msg_error').html('Please Enter Engine NO').show();
              $('#enginenoupdate').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
            }
            else if (!vehicleclass && vehicleclass.length <= 0) {
              // validate Official No
              isValid = false;
              $('#msg_error').html('Please Enter Vehicle Type').show();
              $('#vehicleclassupdate').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
            }
            else if (!selectmake && selectmake.length <= 0) {
              // validate Official No
              isValid = false;
              $('#msg_error').html('Please Enter Select Make').show();
              $('#selectmakeupdate').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
            }
            else if (!selectmodel && selectmodel.length <= 0) {
              // validate Official No
              isValid = false;
              $('#msg_error').html('Please Enter Select Model').show();
              $('#selectmodelupdate').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
            }
            else if (!selectmgfyear && selectmgfyear.length <= 0) {
              // validate Official No
              isValid = false;
              $('#msg_error').html('Please Enter Mgf Year').show();
              $('#selectmgfyearupdate').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
            }
            else if (!selectstate && selectstate.length <= 0) {
              // validate Official No
              isValid = false;
              $('#msg_error').html('Please Enter State').show();
              $('#selectstateupdate').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
            }
            else if (!selectrto && selectrto.length <= 0) {
              // validate Official No
              isValid = false;
              $('#msg_error').html('Please Enter RTO').show();
              $('#devicetypeIMEIupdate').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
            }
           
          

            setClasses(index, steps);
            $(".buttonFinish").prop('disabled', false);
            $(".buttonNext").prop('disabled', false);
            $('#pername').focus();
            isValid = false;
          }
          return isValid;
        }


        function validateStep2(index, steps) {
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


          if (isValid && index == 2) {

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


        function validateStep3(index, steps) {

          $('#accountNo').focus();
          var isValid = true;
          var accountNo = $('#accountNo').val();
          $('#msg_accountNo').html('').hide();
          // Validate Account No
          if (!accountNo && accountNo.length <= 0) {
            isValid = false;
            $('#msg_accountNo').html('Please Enter Account Number').show();
            $('#accountNo').focus();
          }
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
        $(window).on('load', function () {
          $("#my-dropzone").dropzone({
            url: "../file-upload",
            addRemoveLinks: "dictRemoveFile"
          });

          $('.datepicker').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true,
            drops: 'down',
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
          var path = '../assets/img/background-part.png';
          if ($('.daterangepicker .background').length == 0) {
            $('.daterangepicker').append('<div class="background" style="background-image: url(' + path + '); z-index:-1; height:80px;"><img src="../assets/img/background-part.png" alt="" style="display:none"></div>');
          }
        });

      });
    })(jQuery);
    (function ($) {
      $(document).ready(function () {

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
        var path = 'assets/images/background-part.png';
        $('.daterangepicker').append('<div class="background" style="background-image: url(' + path + '); z-index:-1; height:80px;"><img src="assets/images/background-part.png" alt="" style="display:none"></div>')
      });
    })
      (jQuery);
    this.EncryptPageName();
    this.EncryptPageUrl();
    this.VehicleDetail();
   
    //   this.DeviceModelDetail();
    function readURLupdate(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          // console.log(e.target.result);
          //  let obj : any = e.target.result;
          let obj: any = (e.target as any).result;
          //  console.log(obj);
          $('#blahupdate').attr('src', obj);

        }


        reader.readAsDataURL(input.files[0]);
      }
    }
    function readURL2update(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          //  console.log(e.target);
          //  let obj : any = e.target.result;
          let obj: any = (e.target as any).result;
          $('#blah2update').attr('src', obj);

        }


        reader.readAsDataURL(input.files[0]);
      }
    }
    function readURL3update(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          //  console.log(e.target);
          //  let obj : any = e.target.result;
          let obj: any = (e.target as any).result;
          $('#blah3update').attr('src', obj);

        }


        reader.readAsDataURL(input.files[0]);
      }
    }


    $("#imgInpupdate").change(function () {
      readURLupdate(this);
    });

    $("#imgInp2update").change(function () {
      readURL2update(this);
    });
    $("#imgInp3update").change(function () {
      readURL3update(this);
    });
    /* ------------------------------- Wizards end Ts------------------------------------------------- */
  }
  EncryptPageName() {
    this.cryptService.encrypt("Vehicle Details")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }
  // encryptedvehicleidValue:string;
  // EncryptvehicleidUrl() {
  //    this.encryptedvehicleidValue = this.cryptService.encryptforvehicleid(this.vehicleid)

  //    //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  // }
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
    document.getElementById("downloadPDFbtnais").style.display = "none";
    document.getElementById("renewbtnais").style.display = "none";
    this.DeviceTypelist();
    this.updatedevicevehicle();
    //this.updatedevicetype();
    this.VehicleClasselist();
    this.SelectMakelist();
    this.Yearlist();
    this.Statelist();
     this.vendorlist();
    this.SelectModellistfetch();
    this.RTOlistfetch();
    this.Customerlist();
    this.Employeelist();
    if(this.mobilize == 'NO'){
      
      $("input[type='radio'][id='mobilizeno_update']").prop('checked', true);
    }
    else {
      
      $("input[type='radio'][id='mobilizeyes_update']").prop('checked', true);;
    }

    if(this.fuelstatus  == 'NO'){
     
      $("input[type='radio'][id='fuelno_update']").prop('checked', true);
    }
    else{
      
      $("input[type='radio'][id='fuelyes_update']").prop('checked', true);;
    }

    if(this.acstatus == 'NO'){
      
      $("input[type='radio'][id='acstatusno_update']").prop('checked', true);
    }
    else{
      $("input[type='radio'][id='acstatusyes_update']").prop('checked', true);;
    }

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
    document.getElementById("renewalais").style.display = "none";
    document.getElementById("downloadPDFbtnais").style.display = "block";
    document.getElementById("renewbtnais").style.display = "block";
    document.getElementById("renew").style.display = "none";
    document.getElementById("vehicleRecSecais").style.display = "none";
    document.getElementById("vReceipt").style.display = "none";
    document.getElementById("vReceiptais").style.display = "none";

    
    
    //  document.getElementById("bankdtls").style.display="none";
    //  document.getElementById("customerdtls").style.display="none";
  }

  editpageformper() {
    //alert("dhsadh");
    document.getElementById("backdetailsbtnper").style.display = "block";
    document.getElementById("editbtnper").style.display = "none";
    // document.getElementById("customerdtls").style.display="none";
    // document.getElementById("bankdtls").style.display="none";
    document.getElementById("vendordtlsper").style.display = "none";
    //  document.getElementById("rev2btn").style.display="none";
    //  document.getElementById("revbtn").style.display="none";
    //  document.getElementById("nextviewbtn").style.display="none";
    //  document.getElementById("next2viewbtn").style.display="none";
    document.getElementById("containerper").style.display = "block";
    document.getElementById("modelfooterper").style.display = "block";
    document.getElementById("uvmdper").style.display = "block";
    document.getElementById("vmdper").style.display = "none";
    this.DeviceTypelist();
    this.updatedevicevehicle();
    this.VehicleClasselist();
    this.SelectMakelist();
    this.Yearlist();
    this.Statelist();
    this.vendorlist();
    // this.Yearlist();
    this.Customerlist();
    this.VehicleIconlist();
    this.Employeelist();
  }
  backdetailsbtnperson() {
    //alert("dsahdu");
  //  alert("dsahdu");
  
  document.getElementById("uvmdper").style.display = "none";
  document.getElementById("vmdper").style.display = "block";
  document.getElementById("backdetailsbtnper").style.display = "none";
  document.getElementById("editbtnper").style.display = "block";
 
  // document.getElementById("customerdtls").style.display="block";
  // document.getElementById("bankdtls").style.display="block";
  document.getElementById("vendordtlsper").style.display = "block";
  document.getElementById("modelfooterper").style.display = "none";
  document.getElementById("renewal").style.display = "none";
 // document.getElementById("renewper").style.display = "none";
  document.getElementById("downloadPDFbtn").style.display = "block";
  //  document.getElementById("nextviewbtn").style.display="block";
  //  document.getElementById("next2viewbtn").style.display="none";
  //    document.getElementById("uvmdper").style.display = "none";
  document.getElementById("renewper").style.display = "none";
  document.getElementById("renewbtnper").style.display = "block";
  document.getElementById("vReceipt").style.display = "none";
 // document.getElementById("vrec").style.display = "none";
  document.getElementById("vehicleRecSec").style.display = "none";
  
  document.getElementById("containerper").style.display = "none";

  }

  VehicleDetail() {
    this.loading = true;
    this.p = 1; this.pagecount = 10;
    //  console.log("p" + this.p);

    let keydata = {
      param1:"",
      param2:"",
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    // Distributor Detail Grid BIND LIST    
    this.vehicleinstallationservice.VehicleInstallationDetails(keydata).subscribe(
      (data) => {
       
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
        this.VehicleInstalDetails$ = data.entity.responsedatalist;

        this.loading = false;
       
      });
  }
 
  VehicleInstalDetailsPDF_EXCEL$:any[];
  vehicleid: string; device_type: string; deviceimeino: string; vehicle_class: string; select_make: string; select_model: string; mgf_year: string;
  select_state: string; select_rto: string; select_custname: string; select_chassisno: string; select_engineno: string; RC_img: any; idproof_img: any; address_img: any;
  rc_text: string; idproof_text: string; address_text: string; panicno_text: string; invoiceno_text: string; vehicleidnew:string; installby:string; installbyid:string;
   mobilize:string; fuelstatus:string; acstatus:string; select_makeid:any; select_statecode:any; vehicleicon:string; vendorTextUpdate:any;
  
   selectedDevicePdfData :any;
   setdata(com) {
     console.log(com)
     this.selectedDevicePdfData = com;
    // alert(com);
    this.backdetailsbtnperson();

    var devicetype = this.getid(this.ListOfDevicetype, this.devicetypeTextupdate);
    
    let vendordatadetails = com;
    this.VehiclenoText = vendordatadetails.param10;
    this.vehicleid = vendordatadetails.param1;
    this.vehicleidnew = vendordatadetails.param9;
    this.device_type = vendordatadetails.param46;
    this.deviceimeino = vendordatadetails.param3;
    this.vehiclenewold = vendordatadetails.param18;
    this.vehicle_class = vendordatadetails.param39;
    this.select_make = vendordatadetails.param37;
    this.select_model = vendordatadetails.param38;
    this.select_makeid = vendordatadetails.param34;
    this.mgf_year = vendordatadetails.param15;
    this.select_state = vendordatadetails.param41;
    this.select_rto = vendordatadetails.param17;
    this.select_statecode = vendordatadetails.param16;
    this.select_custname = vendordatadetails.param25;
    this.select_chassisno = vendordatadetails.param11;
    this.select_engineno = vendordatadetails.param12;
    this.customermobileno = vendordatadetails.param26;

    this.RCText = vendordatadetails.param19;
    this.CustIdentityText = vendordatadetails.param61;
    this.AddProofText = vendordatadetails.param60;
    this.Panictext = vendordatadetails.param21;
    this.InvoiceText = vendordatadetails.param20;


    this.RC_img = vendordatadetails.param50;
    this.idproof_img = vendordatadetails.param48;
    this.address_img = vendordatadetails.param49;
    this.installby = vendordatadetails.param52;
    this.installbyid = vendordatadetails.param51;
    this.mobilize = vendordatadetails.param53;
    this.fuelstatus = vendordatadetails.param54;
    this.acstatus = vendordatadetails.param55;
    this.vehicleicon = vendordatadetails.param58;
    this.vendorname = vendordatadetails.param6;
    //  this.bank_acc = vendordatadetails.param21;
    
    this.vendorTextUpdate = this.vendorname;
    this.devicetypeIMEITextUpdate = this.deviceimeino;

    
    this.SelectInstallbyTextUpdate = this.installby;   // to checkinstall by 
    this.devicetypeTextupdate = this.device_type;
    this.vehicleclassTextupdate = this.vehicle_class;
    this.SelectMakeTextupdate = this.select_make;
    this.SelectModelTextupdate = this.select_model;
    this.SelectMgfYearTextupdate = this.mgf_year;
    this.SelectStateText = this.select_state;
    this.SelectRTOTextupdate = this.select_rto;
    this.SelectCustomerText = this.select_custname;
    this.SelectVehicleIconTextUpdate = this.vehicleicon;
    this.vendorlistdata = this.check(this.vendorTextUpdate);
    this.deviceimeino2 = this.check(this.devicetypeIMEITextUpdate);
    this.devicetypereturn = this.check(this.devicetypeTextupdate);
    this.vehicleclassreturn = this.check(this.vehicleclassTextupdate);
    this.selectmakereturn = this.check(this.SelectMakeTextupdate);
    this.selectmodelreturn = this.check(this.SelectModelTextupdate);
    this.selectyearreturn = this.check(this.SelectMgfYearTextupdate);
    this.selectstatereturn = this.check(this.SelectStateText);
    this.selectrtoreturn = this.check(this.SelectRTOTextupdate);
    this.selectcustnamereturn = this.check(this.SelectCustomerText);
    this.selectinstallbyreturn = this.check(this.SelectInstallbyTextUpdate);
    this.selectvehicleiconreturn = this.check(this.SelectVehicleIconTextUpdate);
    this.RTOlist();
  }
  
  ListOfDevicetype = []; devicetypeidreturn:any;
  customermobileno:string; SelectInstallbyTextUpdate:any; selectinstallbyreturn:string; selectvehicleiconreturn:string; SelectVehicleIconTextUpdate:any;
  DeviceTypelist() {

    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.DeviceTypeListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        //  alert(JSON.stringify(data));
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfDevicetype = data.entity.list;
        // this.ListOfState = statelist;

        this.loading = false;

      });
  }
  Employeelist() {
    // this.selectstate = this.SelectStateText.param1;
    let keydata = {
      param1: "",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.CompanyEmpList(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        //  alert(JSON.stringify(data));
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfEmployee = data.entity.list;
        // this.ListOfState = statelist;

        this.loading = false;

      });
  }
  // webkitURL:string;
  ListOfEmployee:any;

  devicetypeIMEITextUpdate: any;
  selectdeviceIMEINo: string;

  ListOfDeviceRawData = [];
  devicetypeTextupdate: any;
  selectdevicetype: string;
  selectdevicetypeid: string;

  selectVehicle: any;
  vehicleclassTextupdate: any;
  //SelectCustomerText:any;
  // SelectMgfYearText:any;

  /* ------------------------------------------------------------------------------------------------------ */
  selectdevicetypedummy: string;
  selectdeviceIMEINodummyupdate: string;
  vehicleclassdummyupdate: string;
  selectmodeldummyupdate: string;
  selectmgfyeardummyupdate: string;
  selectcustname: string;
  DeviceTypeIMEIlist() {
    this.devicetypereturn = this.check(this.devicetypeTextupdate);
    this.selectdevicetypedummy = this.devicetypeTextupdate.param2;
    
    if (this.selectdevicetypedummy == 'AIS-140') {
      $(".buttonFinish").prop('disabled', true);
    }    
    else
    {
      $(".buttonFinish").prop('disabled', false);      
    }

    this.selectdevicetype = this.devicetypeTextupdate.param1;
    let keydata = {
      param1: "",
      param2: this.selectdevicetype,
      param4: this.vehicleid,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.DeviceList_vehicle_forupdate(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        //  alert(JSON.stringify(data));devicelist_Assign_vehicle
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfDeviceRawData = data.entity.list;
        // this.ListOfState = statelist;

        this.loading = false;

      });

  }
  ListOfDeviceRawDataupdate = [];
  updatedevicevehicle() {
    // this.selectdevicetype = this.devicetypeTextupdate.param1;
   
    let keydata = {
      param1: "",
      param2: this.devicetypereturn,
      param3: "",
      param4: this.vehicleidnew,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.DeviceList_vehicle_forupdate(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        //  alert(JSON.stringify(data));devicelist_Assign_vehicle
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfDeviceRawDataupdate = data.entity.list;
        // this.ListOfState = statelist;

        this.loading = false;

      });

  }


  updatedevicetype() {
    // this.selectdevicetype = this.devicetypeTextupdate.param1;
    let keydata = {
      param1: "",
      param2: "",
      param3: "",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.DeviceList_vehicle(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        //  alert(JSON.stringify(data));devicelist_Assign_vehicle
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfDeviceRawData = data.entity.list;
        // this.ListOfState = statelist;

        this.loading = false;

      });

  }

  ListOfVehicleclass = [];
  //vehicleclassText:any;
  selectvehicleclass: string;
  VehicleClasselist() {

    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.VehicleClassListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        //  alert(JSON.stringify(data));
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfVehicleclass = data.entity.list;
        // this.ListOfState = statelist;

        this.loading = false;

      });
  }

  ListOfSelectModel = [];
  // SelectModelText:any;
  SelectModelTextupdate: any;
  SelectMakeTextupdate: any
  selectmodelid: string;
  dummyselectmake: string;
  selectvalueofmake: string;
  ListOfSelectMake = [];

  SelectMakelist() {

    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectMakeListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        //  alert(JSON.stringify(data));
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfSelectMake = data.entity.list;
        // this.ListOfState = statelist;
        //  console.log(this.ListOfSelectMake);

        this.loading = false;

      });
  }

  vendorlist() {

    let keydata = {
      param1: "",
      param2:"",
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
  ListOfvendorup:Object;
  SelectModellistfetch() {
    //this.selectmakereturn = this.check(this.SelectMakeTextupdate);
    // this.dummyselectmake = this.SelectMakeTextupdate.param2;
    //this.select_modelid = this.SelectMakeTextupdate.param1;
    
    //alert("select_modelid-- "+this.select_modelid);
    let keydata = {
      param1: this.select_makeid,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectModelListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        //  alert(JSON.stringify(data));
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfSelectModel = data.entity.list;
        //   console.log(this.ListOfSelectModel);
        // this.ListOfState = statelist;

        this.loading = false;

      });
  }

  SelectModellist() {
    this.selectmakereturn = this.check(this.SelectMakeTextupdate);
    this.dummyselectmake = this.SelectMakeTextupdate.param2;
    this.select_make = this.SelectMakeTextupdate.param1;
    
    //alert("select_modelid-- "+this.select_modelid);
    let keydata = {
      param1: this.select_make,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectModelListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        //  alert(JSON.stringify(data));
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfSelectModel = data.entity.list;
        //   console.log(this.ListOfSelectModel);
        // this.ListOfState = statelist;

        this.loading = false;

      });
  }

  ListOfYear = [];
  SelectMgfYearTextupdate: any;
  Yearlist() {

    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.YearListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        //  alert(JSON.stringify(data));
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfYear = data.entity.list;
        // console.log(this.ListOfYear);
        // this.ListOfState = statelist;

        this.loading = false;

      });
  }

  ListOfState = [];
  SelectStateText: any;
  selectstate: string;
  Statelist() {
    // this.selectstate = this.SelectStateText.param1;
    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectStateListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        //  alert(JSON.stringify(data));
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfState = data.entity.list;
        // this.ListOfState = statelist;

        this.loading = false;

      });
  }

  ListOfRTO = [];
  SelectRTOTextupdate: any;
  selectrto: string;
  selectcitydummy: string;
  RTOlist() {
    this.selectstatereturn = this.check(this.SelectStateText);
   // alert("select_statecode"+this.select_statecode);
    this.selectcitydummy = this.SelectStateText.param2;
    this.select_state = this.SelectStateText.param1;
    
    let keydata = {
      param1: this.select_state,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectStateRTOListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        //  alert(JSON.stringify(data));
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfRTO = data.entity.list;
        // this.ListOfState = statelist;

        this.loading = false;

      });
  }

  RTOlistfetch() {
    //this.selectstatereturn = this.check(this.SelectStateText);
   // alert("select_statecode"+this.select_statecode);
    //this.selectcitydummy = this.SelectStateText.param2;
    //this.select_statecode = this.SelectStateText.param1;
    
    
    let keydata = {
      param1: this.select_statecode,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectStateRTOListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        //  alert(JSON.stringify(data));
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfRTO = data.entity.list;
        // this.ListOfState = statelist;

        this.loading = false;

      });
  }
  ListOfCustomer = [];
  SelectCustomerText: any;
  selectcustomer: string;
  Customerlist() {
    // this.selectstate = this.SelectStateText.param1;
    let keydata = {
      param1: this.selectstate,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.CustomerListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        //  alert(JSON.stringify(data));
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfCustomer = data.entity.list;
        // this.ListOfState = statelist;

        this.loading = false;

      });
  }
  devicetypereturn: any = "";
  deviceimeino2: any = "";
  vehicleclassreturn: any = "";
  selectmakereturn: any = "";
  selectmodelreturn: any = "";
  selectyearreturn: any = "";
  selectstatereturn: any = "";
  selectrtoreturn: any = "";
  selectcustnamereturn: any = ""

  DummyIMEIlist() {

    this.deviceimeino2 = this.check(this.devicetypeIMEITextUpdate)
    $('#deviceimeiupdatedummy').val(this.selectdeviceIMEINodummyupdate);
  }
  dummyvehicleclass() {
    this.vehicleclassreturn = this.check(this.vehicleclassTextupdate);
  }
  dumyselectmodel() {
    this.selectmodelreturn = this.check(this.SelectModelTextupdate)
    // this.selectmodeldummyupdate = this.SelectModelTextupdate.param2;
    // alert(this.selectmodeldummy);
  }
  dummymgfyear() {
    this.selectyearreturn = this.check(this.SelectMgfYearTextupdate);
    this.selectmgfyeardummyupdate = this.SelectMgfYearTextupdate.param2;
  }
  dummyrto() {
    this.selectrtoreturn = this.check(this.SelectRTOTextupdate);
  }
  dummycustomername() {
    this.selectcustnamereturn = this.check(this.SelectCustomerText);
  }
  dummyinstallby(){
    this.selectinstallby2 = this.ListOfEmployee.param2;
  }
  
  selectinstallby2:string;
  InstallavehiclepageChanged(event) {
    this.p = event; this.pagecount = this.selectRowsText;
    //  console.log("p" + this.p);

    let keydata = {
      param1:"",
      param2:"",
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    // Distributor Detail Grid BIND LIST    
    this.vehicleinstallationservice.VehicleInstallationDetails(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
       
        
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
        this.VehicleInstalDetails$ = data.entity.responsedatalist;
        this.loading = false;
      });
  }

  VehicleIconlist() {
   
     let keydata = {
     
      pageNo: 1,
      itemsPerPage: this.pagecount,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.VehicleIconList(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        //  alert(JSON.stringify(data));
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfVehicleIcon = data.entity.responsedatalist;
        // this.ListOfState = statelist;

        this.loading = false;

      });
  }
  // webkitURL:string;
  ListOfVehicleIcon:any;

  check(data) {
    try {
      if (typeof data === 'object') {
        //  console.log("come in object if")
        return data.param2;

      } else if (data == '') {
        //  console.log("come in else if ")
        return data;


      } else {
        //  console.log(data.length)

        return data;
      }
    } catch (e) {
      return '';
    }



  }  
  checkforid(data) {
    try {
      if (typeof data === 'object') {
        //  console.log("come in object if")
        return data.param1;

      } else if (data == '') {
        //  console.log("come in else if ")
        return data;


      } else {
        //  console.log(data.length)

        return data;
      }
    } catch (e) {
      return '';
    }



  }


  searchdata() {
    var search = $('#searchData').val();
    this.loading = true;

    this.p = 1; this.pagecount = 10;
    //  console.log("p" + this.p);

    let keydata = {
      param1:"",
      param2:"",
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: search,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.vehicleinstallationservice.VehicleInstallationDetails(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
       
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
        this.VehicleInstalDetails$ = data.entity.responsedatalist;
        this.loading = false;
 
      });
  }

  SelectRows() {

    var search = $('#searchData').val();
    var selectrow = $('#selectrow1').val();
    this.loading = true;
    // alert("selectrow "+ selectrow);
    this.p = 1; this.pagecount = selectrow;
    //  console.log("p" + this.p);

    let keydata = {
      param1:"",
      param2:"",
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: search,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.vehicleinstallationservice.VehicleInstallationDetails(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
       
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
        this.VehicleInstalDetails$ = data.entity.responsedatalist;
        this.loading = false;
      });
  }





 




  Refreshfunction() {
    this.selectRowsText = "10";
    this.loading = true;
this.filter=''
    this.p = 1; this.pagecount = 10;
    //  console.log("p" + this.p);

    let keydata = {
      param1:"",
      param2:"",
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.vehicleinstallationservice.VehicleInstallationDetails(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        //  alert(JSON.stringify(data));
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        let resdatalist = data.entity.responsedatalist;
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);

       // let vendorlist = resdatalist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
        this.VehicleInstalDetails$ = resdatalist;

        this.loading = false;
      });
  }
  getid(data, value) {
   //  alert(JSON.stringify(data));
    try {
      if (typeof value === 'object') {
        //  alert(value)
        // console.log("come in object if")
         console.log( value.param1 +"  ====  "+ value.param2);
        return value.param1;
        // return data.param1;
      }
      else {
        // alert(JSON.stringify(data));

        //  alert("value"+value+"value");
        // console.log("come in else")
        var index = data.findIndex(x => x.param2 === value);
        // alert("indexxx");
        return data[index].param1;
      }
    } catch (e) {
      return '';
    }

  }
  getidrtocode(data, value) {
     // alert(JSON.stringify(data));
     try {
       if (typeof value === 'object') {
           alert(value)
         // console.log("come in object if")
          console.log( value.param1 +"  ====  "+ value.param2);
         return value.param1;
         // return data.param1;
       }
       else {
         // alert(JSON.stringify(data));
          console.log("data"+JSON.stringify(data));
          // alert("value"+value+"value");
          console.log("come in else");
         var index = data.findIndex(x => x.param2 === value);
          alert("indexxx"+data[index]);
        //  alert("indexxx"+data[index].param1);
         return data[index].param1;
       }
     } catch (e) {
       return '';
     }
 
   }
  getidforstatecode(data, value) {
    // alert(JSON.stringify(data));
    try {
      if (typeof value === 'object') {
         // alert(value)
        // console.log("come in object if")
        // console.log( value.param1 +"  ====  "+ value.param2);
        return value.param3;
        // return data.param1;
      }
      else {
        // alert(JSON.stringify(data));

        //  alert("value"+value+"value");
        // console.log("come in else")
        var index = data.findIndex(x => x.param2 === value);
        // alert("indexxx");
        return data[index].param3;
      }
    } catch (e) {
      return '';
    }

  }

  getidforimeino(data, value) {
    // alert(JSON.stringify(data));
    try {
      if (typeof value === 'object') {
        //  alert(value)
        // console.log("come in object if")
        // console.log( value.param1 +"  ====  "+ value.param2);
        return value.param2;
        // return data.param1;
      }
      else {
        // alert(JSON.stringify(data));

        //  alert("value"+value+"value");
        // console.log("come in else")
        var index = data.findIndex(x => x.param2 === value);
        // alert("indexxx");
        return data[index].param2;
      }
    } catch (e) {
      return '';
    }

  }

  sort(key) {

    //  alert(key);

    this.key = key;
    this.reverse = !this.reverse;

  }
  VendorDeletefunction() {
    var isValid = true;
    var deleteremark = $('#vendelremark').val();
    // Validate Contact Name
    if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      // $('#msg_error_delete').html('Please Enter Remark').show();
      $('#msg_error_delete').html('Please Enter Remark').show();
      $('#vendelremark').focus();
      setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        param1: deleteremark,
        param2: this.vehicleid,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }
      try { AddLoader() } catch (e) { alert(e) }

      this.vehicleinstallationservice.DeleteVehiceInstallationAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        //  alert(data);
        this.datafromrespo = data.entity;

        if (this.datafromrespo == 'Successfully Deleted.') {
          $("#SuccessModal").modal('show');
          this.VehicleDetail();
          this.closemodal();
        }
        else {
          $("#ErrorModal").modal('show');
        }
      });
    }
  }
  checkblock: string = '';
  VehicleBlockfunction() {
    var isValid = true;
    var Reason = $("#selectreason").val();
    // alert(Reason);
    var deleteremarkblk = $('#venbloremark').val();
    // Validate Contact Name
    if (!deleteremarkblk && deleteremarkblk.length <= 0) {
      isValid = false;
      // $('#msg_error_delete').html('Please Enter Remark').show();
      $('#msg_error_block').html('Please Enter Remark').show();
      $('#venbloremark').focus();
      setTimeout(function () { document.getElementById("msg_error_block").style.display = "none"; }, 3000);
    }
    else {
      //alert(this.checkblock);
      let dataL = {
        param1: deleteremarkblk,
        param2: this.vehicleid,
        param3: this.checkblock,
        param4: Reason,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }
      try { AddLoader() } catch (e) { alert(e) }

      this.vehicleinstallationservice.BlockVehiceInstallationAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        //  alert(data);
        this.datafromrespo = data.entity;

        if (this.datafromrespo == 'Successfully Blocked.') {
          $("#SuccessModal").modal('show');
          this.VehicleDetail();
          this.closemodal();
        }
        else {
          $("#ErrorModal").modal('show');
        }
      });
      // alert("error in inserting data");
    }
  }

  

  nextperstrackbtn() {
    $('#step-15per').show();
    $('#step-14per').hide();
    
    $(".buttonPrevious").prop('disabled', false);
    $(".buttonNextper").prop('disabled', true);
   // $(".buttonPrevious").hide();
    $(".buttonNextper").hide(); 
    $('#nextnew').show();
  //  $('#perbackbuttonnew').show();
  }
  previousbtn() {
    $('#step-15per').hide();
    $('#step-14per').show();
    $(".buttonPrevious").prop('disabled', true);
    $(".buttonNextper").prop('disabled', false);
    $('#nextnew').hide();
    $(".buttonNextper").show(); 
  }
  nextperstrackbtnnew(){
    $('#step-15per').hide();
    $('#step-14per').hide();
    $('#step-16per').show();
    $('.buttonNextpernew').prop('disabled',true);
    $('#perbackbuttonnew').show();
    $(".buttonPrevious").hide(); 

  }
  previousbtnnew(){
    $('#step-15per').show();
    $('#step-14per').hide();
    $('#step-16per').hide();
    $('.buttonNextpernew').prop('disabled',false);
    $(".buttonPrevious").show(); 
    $('#perbackbuttonnew').hide();
    $('#nextnew').show();

  }
  updatepersonaltrack() {

    var makeid = this.getid(this.ListOfSelectMake, this.SelectMakeTextupdate);
    var modelid = this.getid(this.ListOfSelectModel, this.SelectModelTextupdate);
    var vehicleclass = this.getid(this.ListOfVehicleclass, this.vehicleclassTextupdate);
    var statecode = this.getid(this.ListOfState, this.SelectStateText);
    var rtocode = this.getid(this.ListOfRTO, this.SelectRTOTextupdate);
    var customarid = this.getid(this.ListOfCustomer, this.SelectCustomerText);
    var devicetype = this.getid(this.ListOfDevicetype, this.devicetypeTextupdate);
    var deviceimei = this.getid(this.ListOfDeviceRawData, this.devicetypeIMEITextUpdate);

    let dataL = {
      param1: "",
      param2: "",
      param3: "0",
      param4: "0",
      param5: "",
      param6: this.VehiclenoText,
      param7: this.select_chassisno,
      param8: this.select_engineno, param9: this.selectyearreturn, param10: statecode,
      param11: rtocode, param12: this.vehicleclass, param13: customarid, param14: "", param15: devicetype, param16: deviceimei, param17: "Application", param18: "",
      param19: "", param20: "", param21: this.CustIdentityText, param22: this.AddProofText, param23: this.RCText, param24: this.InvoiceText, param25: this.Panictext, param26: "", param27: "", param28: "", param29: "",
      //file1:this.currentFileUpload, file2:this.currentFileUpload2, file3:this.currentFileUpload3, 
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.vehicleinstallationservice.UpdateVehicleInstallationAPI(dataL).subscribe((data) => {
      //  alert(dataL);
      //  alert(data);
      try { RemoveLoader() } catch (e) { alert(e) }

      this.datafromrespo = data.entity;

      if (this.datafromrespo == 'Successfully Saved.') {
        $("#SuccessModalEntry").modal('show');
      }
      else {
        $("#ErrorModalEntry").modal('show');
      }
    });
  }

  closemodal(){
    //alert("come ");
    $("#SuccessModel").modal('hide');

    $('#modeldelete').modal('hide');
    $('#myModalwizard').modal('hide');
    $('#myModalPersonaltracker').modal('hide');

    $('.modal-backdrop.show').css('display', 'none');
    //this.clearfunction();
  }


  
//   //This function is used to Show vehicle Reciept --By Ayaz Syed 25-05-21
registrationDate :any;
cutomerMobileNumber:any;
vendorname:any;
ShowVehicleReceipt() {
  
  this.VehiclenoText =this.selectedDevicePdfData.param10;
  this.cutomerMobileNumber =this.selectedDevicePdfData.param26;

  this.vendorname = this.selectedDevicePdfData.param6;
  this.registrationDate = this.selectedDevicePdfData.param13;
  this.vehicleid = this.selectedDevicePdfData.param1;
  this.device_type = this.selectedDevicePdfData.param46;
  this.deviceimeino = this.selectedDevicePdfData.param3;
  this.vehiclenewold = this.selectedDevicePdfData.param18;
  this.vehicle_class = this.selectedDevicePdfData.param39;
  this.select_make = this.selectedDevicePdfData.param37;
  this.select_model = this.selectedDevicePdfData.param38;
  this.mgf_year = this.selectedDevicePdfData.param15;
  this.select_state = this.selectedDevicePdfData.param41;
  this.select_rto = this.selectedDevicePdfData.aram17;
  this.select_custname = this.selectedDevicePdfData.param25;
  this.select_chassisno = this.selectedDevicePdfData.param11;
  this.select_engineno = this.selectedDevicePdfData.param12;

  this.CustIdentityText = this.selectedDevicePdfData.param51;
  this.AddProofText = this.selectedDevicePdfData.param52;
  this.InvoiceText = this.selectedDevicePdfData.param20;

  

//this code is use to make qr code value table


var qrTableData  = "Owner Name :"  +this.select_custname +"\n";
qrTableData = qrTableData + "Phone Number : "  +this.cutomerMobileNumber +"\n"
qrTableData = qrTableData + "Address : "  +this.AddProofText +"\n"
qrTableData = qrTableData + "Registration Number : "  +this.VehiclenoText +"\n"
qrTableData = qrTableData + "Registration Date : "  +this.registrationDate +"\n"
qrTableData = qrTableData + "Chasis Number : "  +this.select_chassisno +"\n"

 qrTableData = qrTableData + "Engine Number : "  +this.select_engineno +"\n"
 qrTableData = qrTableData + "Vehicle Make : "  +this.select_make +"\n"
 qrTableData = qrTableData + "Vehicle Model : "  +this.select_model +"\n"

 qrTableData = qrTableData + "Engine Number : "  +this.select_engineno +"\n"
 qrTableData = qrTableData + "Vehicle Make : "  +this.select_make +"\n"
 qrTableData = qrTableData + "Vehicle Category : "  +this.vehicle_class +"\n"
 qrTableData = qrTableData + "Installed By  : "  +this.vendorname; 



 var qr :any;
function generateQRCode() {
              qr = new QRious({
              element: document.getElementById('qr-code'),
              size: 100,
              value: qrTableData
          });
      }
      generateQRCode() ;

 // let qrdiv=document.getElementById("qrcode-2");
         
  // generateQRCode(qrdiv, qrTableData ) 
//end

  document.getElementById("vehicleRecSec").style.display = "block";
  document.getElementById("backdetailsbtnper").style.display = "block";
  document.getElementById("downloadPDFbtn").style.display = "none";
  document.getElementById("editbtnper").style.display = "none";
  document.getElementById("vendordtlsper").style.display = "none";  
  document.getElementById("containerper").style.display = "none";
  document.getElementById("modelfooterper").style.display = "none";
  document.getElementById("uvmdper").style.display = "none";
  document.getElementById("vmdper").style.display = "none";
  document.getElementById("renewbtnper").style.display = "none";
  document.getElementById("vReceipt").style.display = "block";
  
 
}

// same function is generated for geberated receipt  

ShowVehicleReceiptais() {
 // alert("demoooo");
  this.VehiclenoText =this.selectedDevicePdfData.param10;
  this.cutomerMobileNumber =this.selectedDevicePdfData.param26;

  this.vendorname = this.selectedDevicePdfData.param6;
  this.registrationDate = this.selectedDevicePdfData.param13;
  this.vehicleid = this.selectedDevicePdfData.param1;
  this.device_type = this.selectedDevicePdfData.param46;
  this.deviceimeino = this.selectedDevicePdfData.param3;
  this.vehiclenewold = this.selectedDevicePdfData.param18;
  this.vehicle_class = this.selectedDevicePdfData.param39;
  this.select_make = this.selectedDevicePdfData.param37;
  this.select_model = this.selectedDevicePdfData.param38;
  this.mgf_year = this.selectedDevicePdfData.param15;
  this.select_state = this.selectedDevicePdfData.param41;
  this.select_rto = this.selectedDevicePdfData.aram17;
  this.select_custname = this.selectedDevicePdfData.param25;
  this.select_chassisno = this.selectedDevicePdfData.param11;
  this.select_engineno = this.selectedDevicePdfData.param12;

  this.CustIdentityText = this.selectedDevicePdfData.param51;
  this.AddProofText = this.selectedDevicePdfData.param52;
  this.InvoiceText = this.selectedDevicePdfData.param20;

  

//this code is use to make qr code value table


var qrTableDataais140  = "Owner Name :"  +this.select_custname +"\n";
qrTableDataais140 = qrTableDataais140 + "Phone Number : "  +this.cutomerMobileNumber +"\n"
qrTableDataais140 = qrTableDataais140 + "Address : "  +this.AddProofText +"\n"
qrTableDataais140 = qrTableDataais140 + "Registration Number : "  +this.VehiclenoText +"\n"
qrTableDataais140 = qrTableDataais140 + "Registration Date : "  +this.registrationDate +"\n"
qrTableDataais140 = qrTableDataais140 + "Chasis Number : "  +this.select_chassisno +"\n"

qrTableDataais140 = qrTableDataais140 + "Engine Number : "  +this.select_engineno +"\n"
qrTableDataais140 = qrTableDataais140 + "Vehicle Make : "  +this.select_make +"\n"
qrTableDataais140 = qrTableDataais140 + "Vehicle Model : "  +this.select_model +"\n"

qrTableDataais140 = qrTableDataais140 + "Engine Number : "  +this.select_engineno +"\n"
qrTableDataais140 = qrTableDataais140 + "Vehicle Make : "  +this.select_make +"\n"
qrTableDataais140 = qrTableDataais140 + "Vehicle Category : "  +this.vehicle_class +"\n"
qrTableDataais140 = qrTableDataais140 + "Installed By  : "  +this.vendorname; 

 // let qrdivais=document.getElementById("qrcode-2ais");
         
 // generateQRCode(qrdivais, qrTableDataais140 ) 
//end
  document.getElementById("vehicleRecSecais").style.display = "block";
  document.getElementById("backdetailsbtn").style.display = "block";
  document.getElementById("downloadPDFbtnais").style.display = "none";
  document.getElementById("editbtn").style.display = "none";
  document.getElementById("vendordtls").style.display = "none";  
  document.getElementById("container").style.display = "none";
  document.getElementById("modelfooterper").style.display = "none";
  document.getElementById("uvmd").style.display = "none";
  document.getElementById("vmd").style.display = "none";
  document.getElementById("renewbtnais").style.display = "none";
  document.getElementById("vReceiptais").style.display = "block";
  
  

}



generateReceiptPrint() {

  var sTable = document.getElementById('genPDF').innerHTML;
  var style = "<style>";
  style = style + "table {width: 100%;font: 17px Calibri;}";
  style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
  style = style + "padding: 2px 3px;text-align: center;}";
  style = style + "</style>";

  // CREATE A WINDOW OBJECT.
  var win = window.open('', '', 'height=700,width=700');

  win.document.write('<html><head>');
  win.document.write('<title>Receipt</title>');   // <title> FOR PDF HEADER.
  win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
  win.document.write('</head>');
  win.document.write('<body>');
  win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
  win.document.write('</body></html>');

  win.document.close(); 	// CLOSE THE CURRENT WINDOW.

  win.print();    // PRINT THE CONTENTS.
  win.close();

  

}



//this function is declare for generate pdf by Ayaz Syed 
htmltoPDF()
{
    // parentdiv is the html element which has to be converted to PDF
 html2canvas(document.querySelector("#parentdiv")).then(canvas => {

      var pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);

      var imgData  = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData,0,0,canvas.width, canvas.height);
      pdf.save('receipt.pdf');

  });
  
}


renewalForm() {
  document.getElementById("vendordtlsper").style.display = "none";
  document.getElementById("renewal").style.display = "block";
  document.getElementById("backdetailsbtnper").style.display = "block";
  document.getElementById("containerper").style.display = "none";
  document.getElementById("renewper").style.display = "block";
  document.getElementById("vmdper").style.display = "none";
  document.getElementById("renewbtnper").style.display = "none";
  document.getElementById("editbtnper").style.display = "none";
  document.getElementById("deletebtn").style.display = "none";
  document.getElementById("downloadPDFbtn").style.display = "none";

  this.Employeelist();
}
// ---------------- this  code is for Renewal of ais140 by aditya  ]----------------------------------
renewalFormAis() {
  document.getElementById("vendordtls").style.display = "none";
  document.getElementById("renewalais").style.display = "block";
  document.getElementById("backdetailsbtn").style.display = "block";
  document.getElementById("container").style.display = "none";
  document.getElementById("renew").style.display = "block";
  document.getElementById("vmd").style.display = "none";
  document.getElementById("renewbtnais").style.display = "none";
  document.getElementById("editbtn").style.display = "none";
  document.getElementById("deletebtn").style.display = "none";
  document.getElementById("downloadPDFbtnais").style.display = "none";

  this.Employeelist();
}
empObj:any;
getEmpId() {
  this.pmtEmp = this.empObj.param1;
}
renewal() {

  this.pmtDate = $("#paymentDate").val();
  if (this.pmtMethod == null || this.pmtMethod == '') {
    $('#invalidRenew').html('Please Select Payment Method').show();
    $("#pmtvalidity").focus();
    setTimeout(function () { document.getElementById("invalidRenew").style.display = "none"; }, 3000);
  }
  else if (this.pmtValidity == null || this.pmtValidity == '') {
    $('#invalidRenew').html('Please Select Validity').show();
    $("#pmtvalidity").focus();
    setTimeout(function () { document.getElementById("invalidRenew").style.display = "none"; }, 3000);
  }
  else if (this.pmtMethod == "Online" && (this.pmtBank == null || this.pmtBank == '')) {
    $('#invalidRenew').html('Please Enter Bank Name').show();
    $("#pmtbankname").focus();
    setTimeout(function () { document.getElementById("invalidRenew").style.display = "none"; }, 3000);
  }
  else if (this.pmtMethod == "Online" && (this.pmtRefId == null || this.pmtRefId == '')) {
    $('#invalidRenew').html('Please Enter Refrence Id').show();
    $("#refid").focus();
    setTimeout(function () { document.getElementById("invalidRenew").style.display = "none"; }, 3000);
  }
  else if (this.pmtMethod == "Cash" && (this.pmtEmp == null || this.pmtEmp == '')) {
    $('#invalidRenew').html('Please Enter employee Name').show();
    $("#pmtempname").focus();
    setTimeout(function () { document.getElementById("invalidRenew").style.display = "none"; }, 3000);
  }
  else if (this.pmtAmt == null) {
    $('#invalidRenew').html('Please Enter Amount').show();
    $("#pmtamount").focus();
    setTimeout(function () { document.getElementById("invalidRenew").style.display = "none"; }, 3000);
  }
  else if (this.pmtRemark == null || this.pmtRemark == '') {
    $('#invalidRenew').html('Please Enter Remark').show();
    $("#pmtremark").focus();
    setTimeout(function () { document.getElementById("invalidRenew").style.display = "none"; }, 3000);
  }
  else {
    let dataL = {
      "param1": this.pmtRemark,
      "param2": this.vehicleid,//"vehicleid",
      "param3": this.pmtMethod.toLowerCase(),//"paymenttype --> cash/online",
      "param4": this.pmtDate,// "paymentdate",
      "param5": this.pmtValidity,//"validityinmonths",
      "param6": this.pmtRefId,//"referenceid",
      "param7": this.pmtBank,//"bankname",
      "param8": this.pmtEmp,// "employeeid",
      "param9": this.pmtAmt,//"amount"
    }
    this.vehicleinstallationservice.vehicleRenewal(dataL).subscribe((response) => {
      this.datafromrespo = response.entity
      if (response.statuscode == 200) {
        $("#SuccessModal").modal('show');
      }
      else {
        $("#ErrorModal").modal('show');
      }
    })
  }
}



VehicleInstalDetails_EXCEL$:any[];


VehicleDetailpdfexl() {
    this.loading = true;
    var search = $('#searchData').val();
    this.p = 1; this.pagecount = 10;
    //  console.log("p" + this.p);

    let keydata = {
      param1:"",
      param2:"",
      pageNo: "",
      itemsPerPage: "",
      searchBy: search,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    // Distributor Detail Grid BIND LIST    
    this.vehicleinstallationservice.VehicleInstallationDetails(keydata).subscribe(
      (data) => {
       
       // this.count = data.entity.count;
       // this.viewcount = data.entity.viewCount;
        this.VehicleInstalDetailsPDF_EXCEL$ = data.entity.responsedatalist;
        this.createPDF();

      });
  }


  createPDF() {
    let pdfTableData;
    let dataArray = []
    for (let i = 0; i < this.VehicleInstalDetailsPDF_EXCEL$.length; i++) {
      pdfTableData = {
        "#": i + 1,
     
        "Customer Name": this.VehicleInstalDetailsPDF_EXCEL$[i]["param25"],
        "Customer Mobile": this.VehicleInstalDetailsPDF_EXCEL$[i]["param26"],
        "Vehicle No": this.VehicleInstalDetailsPDF_EXCEL$[i]["param10"],
        "Chasis No": this.VehicleInstalDetailsPDF_EXCEL$[i]["param11"],

        "Engine No": this.VehicleInstalDetailsPDF_EXCEL$[i]["param12"],

        "RTO Name": this.VehicleInstalDetailsPDF_EXCEL$[i]["param17"] ,
        "Make Name": this.VehicleInstalDetailsPDF_EXCEL$[i]["param37"],
        "Model Name": this.VehicleInstalDetailsPDF_EXCEL$[i]["param38"],
        "Vehicle Class": this.VehicleInstalDetailsPDF_EXCEL$[i]["param39"],
        "Vehicle IMEI No": this.VehicleInstalDetailsPDF_EXCEL$[i]["param3"],
        "Installation Date": this.VehicleInstalDetailsPDF_EXCEL$[i]["param41"],

        "Device Type": this.VehicleInstalDetailsPDF_EXCEL$[i]["param46"],
        "Mgf Year": this.VehicleInstalDetailsPDF_EXCEL$[i]["param15"],
        "RC No": this.VehicleInstalDetailsPDF_EXCEL$[i]["param19"],
        "Customer ID": this.VehicleInstalDetailsPDF_EXCEL$[i]["param51"],
        "Address Proof": this.VehicleInstalDetailsPDF_EXCEL$[i]["param52"],
        "Panic No": this.VehicleInstalDetailsPDF_EXCEL$[i]["param21"],
        "Invoice No": this.VehicleInstalDetailsPDF_EXCEL$[i]["param20"],
        "Mobilize":this.VehicleInstalDetailsPDF_EXCEL$[i]["param53"],
        "Fuel Check":this.VehicleInstalDetailsPDF_EXCEL$[i]["param54"],
        "AC Status":this.VehicleInstalDetailsPDF_EXCEL$[i]["param55"],


       
      }
      dataArray.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(dataArray, "Vehicle Installation Details");
  }



  VehicleDetailExcel() {
    this.loading = true;
    var search = $('#searchData').val();
    this.p = 1; this.pagecount = 10;
    //  console.log("p" + this.p);

    let keydata = {
      param1:"",
      param2:"",
      pageNo: "",
      itemsPerPage: "",
      searchBy: search,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    // Distributor Detail Grid BIND LIST    
    this.vehicleinstallationservice.VehicleInstallationDetails(keydata).subscribe(
      (data) => {
       
       // this.count = data.entity.count;
       // this.viewcount = data.entity.viewCount;
        this.VehicleInstalDetails_EXCEL$ = data.entity.responsedatalist;
        this.PrepareExcelData(this.VehicleInstalDetails_EXCEL$);

      });
  }




 excelData: any = [];
  PrepareExcelData(datav) {
    this.excelData = [];

    for (var i = 0; i < datav.length; i++) {
      try {
        var obj = {

          "#": i + 1,
          "Customer Name": datav[i].param25,
          "Customer Mobile": datav[i].param26,
          "Vehicle No": datav[i].param10,
          "Chasis No": datav[i].param11,
          "Engine No": datav[i].param12,
          "RTO Name": datav[i].param17 ,
          "Make Name": datav[i].param37,
          "Model Name": datav[i].param38,
          "Vehicle Class": datav[i].param39,
          "Vehicle IMEI No": datav[i].param3,
          "Installation Date": datav[i].param41,

          "Device Type": datav[i].param46,
          "Mgf Year": datav[i].param15,
       
        "RC No": datav[i].param19,
        "Customer ID": datav[i].param51,
        "Address Proof": datav[i].param52,
        "Panic No": datav[i].param21,
        "Invoice No": datav[i].param20,
        "Mobilize": datav[i].param53,
        "Fuel Check": datav[i].param54,
        "AC Status": datav[i].param55,
        }
      } catch (e) { }
      this.excelData.push(obj);
    }
    this.exportToExcel();
  }



  exportToExcel() {
    //this.searchfilterforpdf(); 
    this.excelservice.ExportExcel(this.excelData, 'Vehicle Installation Details', 'vehicleinstallation');
  }
}
