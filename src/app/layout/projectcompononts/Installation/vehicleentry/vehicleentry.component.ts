import { UploadimageoneService } from './../upload/uploadimageone.service';
import { HttpResponse, HttpEventType, HttpRequest } from '@angular/common/http';
import { VehicleinstallationService } from './../../../../APIService/vehicleinstallation.service';
import { Router } from '@angular/router';
import { ListService } from './../../../../../list.service';
//import { PostService } from './../../../../../post.service';
import { Paramcls } from './../../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as $ from 'jquery';
import { CryptService } from '../../services/crypt.service';
import * as moment from 'moment';

declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
const headerKey = sessionStorage.getItem('hk');

@Component({
  selector: 'app-vehicleentry',
  templateUrl: './vehicleentry.component.html',
  styleUrls: ['./vehicleentry.component.css']
})
export class VehicleentryComponent implements OnInit {
  idOption: string = 'Identity';
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;
  vehicleclassdummy: any

  IMEIText: string; vehicleclass: string; VehicleclassText: string; MgfYearText: string;
  StateText: string; RTOText: string; CustomerNameText: string; VehiclenoText: string; ChassisNoText: string; EngineNoText: string = '';
  CustIdentityText: string = ''; AddProofText: string = ''; RCText: string = ''; InvoiceText: string = ''; Panictext: string = ''; DeviceInstText: string;
  datafromrespo: string; persontypeText: any; vehicletype: string;

  ListOfDevicetype$: Object; ListOfVendor$: Object;
  public loading = false; p: number; count: number;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };

  config2 = {
    displayKey: "name", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  options = [{ name: "Male", },
  { name: "Female", },
  { name: "Delivery Person", },
  { name: "Distributor", },]

  selectedFilesNew: FileList;
  selectedFiles2New: FileList;
  selectedFiles3New: FileList;
  selectedFiles4New: FileList;
  selectedFiles5New: FileList;

  currentFileUpload: File;
  currentFileUpload2: File;
  currentFileUpload3: File;
  currentFileUpload4: File;
  currentFileUpload5: File;

  progress: { percentage: number } = { percentage: 0 };
  vehiclenewold: any;
  installationDate: any;
  errorMessage: string;
  simNo: any;
  uniqueNo: any;
  status: any;
  idfilePath: any;
  addressproffFilepath: any;
  addressproffName: any = "Address Proof No."
  deviceImageFilePath: any;
  vehicleImagefilePath: any;


  constructor(private modalService: NgbModal, private vehicleinstallationservice: VehicleinstallationService,
    private flashMessage: FlashMessagesService, private listService: ListService, private cryptService: CryptService,
    private router: Router, private uploadService: UploadimageoneService) { }

  selectFile(event) {
    document.getElementById("defaultimg").style.display = "none";
    document.getElementById("blah").style.display = "block";
    this.selectedFilesNew = event.target.files;
    this.customeridentityupload();
  }

  selectFile2(event) {
    document.getElementById("defaultimg2").style.display = "none";
    document.getElementById("blah2").style.display = "block";
    this.selectedFiles2New = event.target.files;
    this.addressidentityupload();
  }

  selectFile3(event) {
    document.getElementById("defaultimg3").style.display = "none";
    document.getElementById("blah3").style.display = "block";
    this.selectedFiles3New = event.target.files;
    this.rcidentityupload();
  }

  selectFile4(event) {
    document.getElementById("defaultimg4").style.display = "none";
    document.getElementById("blah4").style.display = "block";
    this.selectedFiles4New = event.target.files;
    this.deviceUpload();
  }

  selectFile5(event) {
    document.getElementById("defaultimg5").style.display = "none";
    document.getElementById("blah5").style.display = "block";
    this.selectedFiles5New = event.target.files;
    this.vehicleUpload();
  }
  SelectMgfYearText: any;
  selectmgfyear: string;


  getRTOId() {
    this.selectrto = this.SelectRTOText.param1;
  }
  mobilize: any; fulecheck: any; acstatus: any; vendordummyentry: any; selectvendorlist: any;
  uploadnew() {

    this.installationDate = (document.getElementById('dateinputentry') as HTMLInputElement).value;
    this.mobilize = $("input[type='radio'][name='mobilize']:checked").val();
    this.fulecheck = $("input[type='radio'][name='fulecheck']:checked").val();
    this.acstatus = $("input[type='radio'][name='acstatus']:checked").val();
    this.selectdevicetypedummy = this.devicetypeText.param2;

    if (this.selectdevicetypedummy == 'Personal Tracker App' || this.selectdevicetypedummy == 'Basic' || this.selectdevicetypedummy == 'Smart Tracker') {


      this.selectvalueofmake = this.SelectMakeText.param1;
      this.selectmodelid = this.SelectModelText.param1;
      this.selectvehicleclass = this.vehicleclassText.param1;
      this.selectmgfyear = this.SelectMgfYearText.param1;
      this.selectrto = this.SelectRTOText.param1;
      this.selectcustomer = this.SelectCustomerText.param1;
      this.selectinstallby = this.SelectInstallbyText.param1;
      this.selectdevicetype = this.devicetypeText.param1;
      this.selectstatecode = this.SelectStateText.param3;
      this.selectvehicleicon = this.SelectVehicleIconText.param1;
      this.selectvendorlist = this.vendorText.param1;
      this.selectdeviceIMEINo = this.devicetypeIMEIText.param1;
      this.selectdeviceIMEINodata = this.devicetypeIMEIText.param2;

      let dataL = {
        param1: "", param2: "",
        param3: this.selectvalueofmake,
        param4: this.selectmodelid,
        param5: this.selectvehicleclass,
        param6: this.VehiclenoText,
        param7: this.ChassisNoText,
        param8: this.EngineNoText,
        param9: this.selectmgfyear,
        param10: this.selectstatecode,
        param11: this.selectrto,
        param12: this.vehicletype,     //new/existing
        param13: this.selectcustomer,
        param14: "",
        param15: this.selectdeviceIMEINo,
        param16: this.selectdeviceIMEINodata,
        param17: "Application",
        param18: this.CustIdentityText,
        param19: this.AddProofText,
        param20: this.respooffile3,  // rc image path
        param21: "",
        param22: "",
        param23: this.RCText,
        param24: this.InvoiceText,
        param25: this.Panictext,
        param26: this.installationDate,
        param27: this.devicetypeid,
        param28: this.selectinstallby,
        param29: "",
        param30: this.mobilize,
        param31: this.fulecheck,
        param32: this.acstatus,
        param33: this.selectvehicleicon,
        param34: this.idOption,    // id proof name like adhar card/pan card
        param35: this.respooffile, //identity filepath,
        param36: this.addressproffName,//address proof name : eg: licance /electricity nill
        param37: this.respooffile2, //address filepath
        param38: this.respooffile4, //device image file path
        param39: this.respooffile5, //vehicle image file path 


        //file1:this.currentFileUpload, file2:this.currentFileUpload2, file3:this.currentFileUpload3, 
        // headerkey: headerKey,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }

      this.vehicleinstallationservice.InsertVehicleInstallationAPI(dataL).subscribe((data) => {
        //  alert(dataL);
        //  alert(data);
        try { RemoveLoader() } catch (e) { alert(e) }

        this.datafromrespo = data.entity;

        if (this.datafromrespo == 'Successfully saved.') {
          $("#SuccessModalEntry").modal('show');
        }
        else {
          $("#ErrorModalEntry").modal('show');
        }
      });

    }
    else if (this.selectdevicetypedummy == 'AIS-140') {

      //alert("AIS-140");
      // var mobilize = $("input[type='radio'][name='mobilize']:checked").val();
      // var fulecheck = $("input[type='radio'][name='fulecheck']:checked").val();
      // var acstatus = $("input[type='radio'][name='acstatus']:checked").val();

      this.selectvalueofmake = this.SelectMakeText.param1;
      this.selectmodelid = this.SelectModelText.param1;
      this.selectvehicleclass = this.vehicleclassText.param1;
      this.selectmgfyear = this.SelectMgfYearText.param1;
      this.selectrto = this.SelectRTOText.param1;
      this.selectcustomer = this.SelectCustomerText.param1;
      this.selectinstallby = this.SelectInstallbyText.param1;
      this.selectdevicetype = this.devicetypeText.param1;
      this.selectdeviceIMEINo = this.devicetypeIMEIText.param1;
      this.selectstatecode = this.SelectStateText.param3;
      this.selectdeviceIMEINodata = this.devicetypeIMEIText.param2;
      this.selectvehicleicon = this.SelectVehicleIconText.param1;
      this.selectvendorlist = this.vendorText.param1;

      let dataL = {
        param1: "",
        param2: "",
        param3: this.selectvalueofmake,
        param4: this.selectmodelid,
        param5: this.selectvehicleclass,
        param6: this.VehiclenoText,
        param7: this.ChassisNoText,
        param8: this.EngineNoText,
        param9: this.selectmgfyear,
        param10: this.selectstatecode,
        param11: this.selectrto,
        param12: this.vehicletype,
        param13: this.selectcustomer,
        param14: "",
        param15: this.selectdeviceIMEINo,
        param16: this.selectdeviceIMEINodata,
        param17: "Application",
        param18: this.CustIdentityText,
        param19: this.AddProofText,
        param20: this.respooffile3,
        param21: "",
        param22: "",
        param23: this.RCText,
        param24: this.InvoiceText,
        param25: this.Panictext,
        param26: this.installationDate,
        param27: this.devicetypeid,
        param28: this.selectinstallby,
        param29: "",
        param30: this.mobilize,
        param31: this.fulecheck,
        param32: this.acstatus,
        param33: this.selectvehicleicon,
        param34: this.idOption,    // id proof name like adhar card/pan card
        param35: this.respooffile, //identity filepath,
        param36: this.addressproffName,//address proof name : eg: licance /electricity nill
        param37: this.respooffile2, //address filepath
        param38: this.respooffile4, //device image file path
        param39: this.respooffile5, //vehicle image file path 

        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }

      localStorage.setItem("selectdevicetype", this.selectdevicetype);
      this.progress.percentage = 0;
      this.vehicleinstallationservice.InsertVehicleInstallationAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.datafromrespo = data.entity;
        if (this.datafromrespo == 'Successfully saved.') {
          $("#SuccessModalEntry").modal('show');
        }
        else {
          $("#ErrorModalEntry").modal('show');
        }
      });

      //this.selectedFilesNew = undefined;
    }
    else if (this.selectdevicetypedummy == 'Personal Tracker') {
      this.selectdevicetype = this.devicetypeText.param1;
      this.selectdeviceIMEINo = this.devicetypeIMEIText.param1;
      this.selectdeviceIMEINodata = this.devicetypeIMEIText.param2;
      this.selectpersontype = this.persontypeText.param1;
      var data = $('#dateofbirth').val();
      this.selectrto = this.SelectRTOText.param1;
      this.selectcustomer = this.SelectCustomerText.param1;
      this.selectinstallby = this.SelectInstallbyText.param1;
      this.devicetypeid = this.devicetypeText.param1;
      this.selectstatecode = this.SelectStateText.param3;
      this.selectvehicleicon = this.SelectVehicleIconText.param1;
      this.selectvendorlist = this.vendorText.param1;



      //alert(data);
      let dataL = {
        param1: "",
        param2: "",
        param3: "0",
        param4: "0",
        param5: this.selectpersontype,
        param6: this.PersonNameText,
        param7: this.PersonNameText,
        param8: this.PersonNameText,
        param9: "0",
        param10: this.selectstatecode,
        param11: this.selectrto,
        param12: this.vehicletype, //new /old
        param13: this.selectcustomer,
        param14: "",
        param15: this.selectdeviceIMEINo,
        param16: this.selectdeviceIMEINodata,
        param17: "Application",
        param18: this.respooffile,
        param19: this.respooffile2,
        param20: this.respooffile3,
        param21: this.CustIdentityText,
        param22: this.AddProofText,
        param23: this.RCText,
        param24: this.InvoiceText,
        param25: this.Panictext,
        param26: this.installationDate,
        param27: this.selectdevicetype,
        param28: this.selectinstallby,
        param29: data,
        param33: this.selectvehicleicon,
        param34: this.selectvendorlist,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }

      this.vehicleinstallationservice.InsertVehicleInstallationAPI(dataL).subscribe((data) => {
        //  alert(dataL);
        //  alert(data);
        try { RemoveLoader() } catch (e) { alert(e) }

        this.datafromrespo = data.entity;

        if (this.datafromrespo == 'Successfully saved.') {
          $("#SuccessModalEntry").modal('show');
        }
        else {
          $("#ErrorModalEntry").modal('show');
        }
      });
    }

  }

  devicetypeid: string; selectdeviceIMEINodata: string; selectstatecode: string;
  selectpersontype: string; Dateofbirth: any; PersonNameText: string;
  respooffile: any;
  respooffile2: any;
  respooffile3: any;
  respooffile4: any;
  respooffile5: any;



  customeridentityupload() {
    let vehicledata = {
      param1: this.VehiclenoText + "_Id",
      param2: this.ChassisNoText + "_Id"
    }

    localStorage.setItem("selectdevicetype", this.selectdevicetype);
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFilesNew.item(0);
    console.log("aaaaaaaaaaaaaaaaaaaa" + this.currentFileUpload);
    this.uploadService.Vehicle_cust_idpushFile(this.currentFileUpload, vehicledata).subscribe(event => {


      if (event['statuscode'] == "200") {
        //  alert("high ");
        try { RemoveLoader() } catch (e) { alert(e) }
        this.respooffile = event['entity'];
        console.log("the return data of file upload 1 " + JSON.stringify(this.respooffile));
      }
      else {
        alert("ldata is not f");
      }
    });

    this.selectedFilesNew = undefined;
  }

  addressidentityupload() {
    let vehicledata = {
      param1: this.VehiclenoText + "_Address",
      param2: this.ChassisNoText + "_Address"
    }
    localStorage.setItem("selectdevicetype", this.selectdevicetype);
    this.progress.percentage = 0;

    this.currentFileUpload2 = this.selectedFiles2New.item(0);
    console.log("aaaaaaaaaaaaaaaaaaaa" + this.currentFileUpload2);
    this.uploadService.Vehicle_cust_idpushFile(this.currentFileUpload2, vehicledata).subscribe(event => {
      // if (event.type === HttpEventType.UploadProgress) {
      //   this.progress.percentage = Math.round(100 * event.loaded / event.total);
      // } else if (event instanceof HttpResponse) {
      //   console.log('File is completely uploaded!');
      // }
      if (event['statuscode'] == "200") {
        //  alert("high ");
        try { RemoveLoader() } catch (e) { alert(e) }
        this.respooffile2 = event['entity'];
        console.log("the return data of file upload 2" + JSON.stringify(this.respooffile2));
      }
      else {
        alert("ldata is not f");
      }
    });

    this.selectedFiles2New = undefined;
  }

  rcidentityupload() {
    let vehicledata = {
      param1: this.VehiclenoText + "RC",
      param2: this.ChassisNoText + "RC"
    }
    localStorage.setItem("selectdevicetype", this.selectdevicetype);
    this.progress.percentage = 0;

    this.currentFileUpload3 = this.selectedFiles3New.item(0);
    console.log("aaaaaaaaaaaaaaaaaaaa" + this.currentFileUpload3);
    this.uploadService.Vehicle_cust_idpushFile(this.currentFileUpload3, vehicledata).subscribe(event => {
      // if (event.type === HttpEventType.UploadProgress) {
      //   this.progress.percentage = Math.round(100 * event.loaded / event.total);
      // } else if (event instanceof HttpResponse) {
      //   console.log('File is completely uploaded!');
      // }
      if (event['statuscode'] == "200") {
        //  alert("high ");
        try { RemoveLoader() } catch (e) { alert(e) }
        this.respooffile3 = event['entity'];
        console.log("the return data of file upload 3" + JSON.stringify(this.respooffile3));
      }
      else {
        alert("ldata is not f");
      }
    });

    this.selectedFiles3New = undefined;
  }

  deviceUpload() {
    let vehicledata = {
      param1: this.VehiclenoText + "Device",
      param2: this.ChassisNoText + "Device"
    }
    localStorage.setItem("selectdevicetype", this.selectdevicetype);
    this.progress.percentage = 0;

    this.currentFileUpload4 = this.selectedFiles4New.item(0);
    console.log("aaaaaaaaaaaaaaaaaaaa" + this.currentFileUpload4);
    this.uploadService.Vehicle_cust_idpushFile(this.currentFileUpload4, vehicledata).subscribe(event => {
      // if (event.type === HttpEventType.UploadProgress) {
      //   this.progress.percentage = Math.round(100 * event.loaded / event.total);
      // } else if (event instanceof HttpResponse) {
      //   console.log('File is completely uploaded!');
      // }
      if (event['statuscode'] == "200") {
        //  alert("high ");
        try { RemoveLoader() } catch (e) { alert(e) }
        this.respooffile4 = event['entity'];
        console.log("the return data of file upload 4" + JSON.stringify(this.respooffile4));
      }
      else {
        alert("ldata is not f");
      }
    });

    this.selectedFiles4New = undefined;
  }

  vehicleUpload() {
    let vehicledata = {
      param1: this.VehiclenoText + "_Vehicle",
      param2: this.ChassisNoText + "_Vehicle"
    }
    localStorage.setItem("selectdevicetype", this.selectdevicetype);
    this.progress.percentage = 0;

    this.currentFileUpload5 = this.selectedFiles5New.item(0);
    console.log("aaaaaaaaaaaaaaaaaaaa" + this.currentFileUpload5);
    this.uploadService.Vehicle_cust_idpushFile(this.currentFileUpload5, vehicledata).subscribe(event => {
      // if (event.type === HttpEventType.UploadProgress) {
      //   this.progress.percentage = Math.round(100 * event.loaded / event.total);
      // } else if (event instanceof HttpResponse) {
      //   console.log('File is completely uploaded!');
      // }
      if (event['statuscode'] == "200") {
        //  alert("high ");
        try { RemoveLoader() } catch (e) { alert(e) }
        this.respooffile5 = event['entity'];
        console.log("the return data of file upload 5" + JSON.stringify(this.respooffile5));
      }
      else {
        alert("ldata is not f");
      }
    });

    this.selectedFiles5New = undefined;
  }


  ngOnInit() {


    (function ($) {
      $(document).ready(function () {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#vendorentrydemoup').focus();
        })
      });
    })(jQuery);
    (function ($) {
      $(document).ready(function () {
        $('#vendorentrydemoup').focus();
        $(".buttonFinish").prop('disabled', true);
        $("#stepentry-15").hide();
        $("#stepentry-16").hide();
        $("#stepentry-17").hide();

        $('#vendorentrydemoup').focus();
        $(".buttonFinish").prop('disabled', true);
        $("#stepentryentry-14").show();
        $("#stepentryentry-15").hide();
        $("#stepentryentry-16").hide();
        $("#stepentryentry-17").hide();
        function setClassesentry(index, steps) {
          if (index < 0 || index > steps) return;
          if (index == 0) {
            $("#preventry").prop('disabled', true);
          } else {
            $("#preventry").prop('disabled', false);
          }
          if (index == steps) {
            $("#nextentry").text();
          } else {
            $("#nextentry").text();
          }
          $(".step-wizardentry ul li").each(function () {
            $(this).removeClass();
          });
          $(".step-wizardentry ul li:lt(" + index + ")").each(function () {
            $(this).addClass("done");
          });
          $(".step-wizardentry ul li:eq(" + index + ")").addClass("active")
          var p = index * (100 / steps);
          $("#progentry").width(p + '%');
        }
        $(".step-wizardentry ul button").click(function () {
          var step = $(this).find("div.step")[0].innerText;
          var steps = $(".step-wizardentry ul li").length;
          validateAllStepsentry(step - 1, steps);
        });
        $("#preventry").click(function () {
          var step = $(".step-wizardentry ul li.active div.step")[0].innerText;
          var steps = $(".step-wizardentry ul li").length;
          setClassesentry(step - 2, steps - 1);
          displayreviousSectionentry(step - 1);
        });
        $("#nextentry").click(function () {
          if ($(this).text() == 'done') {
            // alert("submit the form?!?")
          } else {
            var step;
            try {
              step = $(".step-wizardentry ul li.active div.step")[0].innerText;
            } catch (error) {
              step = $(".step-wizardentry ul li div.step")[0].innerText;
            }

            var steps = $(".step-wizardentry ul li").length;
            validateAllStepsentry(step, steps - 1);
            //setClassesentry(step, steps - 1);
          }
        });

        // initial state setup
        setClassesentry(0, $(".step-wizardentry ul li").length);

        function displayreviousSectionentry(index) {

          $("#nextentry").prop('disabled', false);
          switch (index) {
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

        function validateAllStepsentry(index, steps) {
          var isStepValid = true;


          if (validateentryStep1(index, steps) == false) {
            isStepValid = false;
          } else if (validateentryStep2(index, steps) == false) {
            isStepValid = false;
          } else if (validateentryStep3(index, steps) == false) {
            isStepValid = false;
          } else if (validateentryStep4(index, steps) == false) {
            isStepValid = false;
          }
          return isStepValid;
        }

        function validateentryStep1(index, steps) {
          $('#devicetypeentry').focus();
          $('#msg_errorentry').html('').hide();
          var isValid = true;
          var vendor = $('#vendordummyentry').val();
          var devicetype = $('#devicetypeentrydummy').val();
          var deviceimei = $('#deviceimeientrydummy').val();
          var persontype = $('#persontypeentrydummy').val();
          // alert("sdjb"+distributorname);
          var vehicletype = $('#vehicletypeentry').val();
          var vehicleclass = $('#vehicleclassentrydummy').val();
          var selectmake = $('#selectmakeentrydummy').val();
          var selectmodel = $('#modelselectdummy').val();
          var staterto = $('#selectrto').val();
          var mgfyear = $('#selectmgfyeardumy').val();
          var stateselect = $('#statedummy').val();
          var customername = $('#customernamedummy').val();
          var installby = $('#installbydummyentry').val();
          var vehicleicon = $('#vehicleiconentry').val();
          var vehino = $('#vehiclenoentry').val();
          var chassis = $('#chassisnoentry').val();
          var engineno = $('#engineno1').val();

          var dateofbirth = $('#date').val();
          var personname = $('#personentry').val();
          // alert(dateofbirth);
          if (!vendor && vendor.length <= 0) {
            isValid = false;
            $('#msg_errorentry').html('Please Select Vendor.').show();
            $('#vendorentrydemoup').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          else if (!devicetype && devicetype.length <= 0) {
            isValid = false;
            $('#msg_errorentry').html('Please Select Device Type.').show();
            $('#devicetypeentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          else if (!deviceimei && deviceimei.length <= 0) {
            // validate short code
            isValid = false;
            $('#msg_errorentry').html('Please Select Device IMEI No.').show();
            $('#devicetypeIMEIentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          else if (installby == null || installby == '') {
            isValid = false;
            $('#msg_errorentry').html('Please Select Install By.').show();
            $('#installbyentry').focus();
            setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          }
          else if (devicetype == 'Personal Tracker') {
            if (personname == null || personname == '') {
              isValid = false;
              $('#msg_errorentry').html('Please Enter Person Name.').show();
              $('#personentry').focus();
              setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
            }
          }
          // else if(personname==null || personname== ''){
          //   isValid = false;
          //   $('#msg_errorentry').html('Please Select Person Name.').show();
          //   $('#personentry').focus();
          //   setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
          // }

          if (isValid && index == 1) {

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
            $(".buttonNext").prop('disabled', false);
            //$('#pername').focus();
            isValid = false;
          }
          return isValid;
        }


        function validateentryStep2(index, steps) {
          $('#pername').focus();

          // $('#msg_contactNo').html('').hide();
          // $('#msg_alternateNo').html('').hide();
          // $('#msg_State').html('').hide();
          // $('#msg_city').html('').hide();
          $('#msg_error_contactentry').html('').hide();
          var isValid = true;
          var dateinput = $('#dateinputentry').val();
          var vendor = $('#vendordummyentry').val();
          var devicetype = $('#devicetypeentrydummy').val();
          var deviceimei = $('#deviceimeientrydummy').val();
          var persontype = $('#persontypeentrydummy').val();
          // alert("sdjb"+distributorname);
          var vehicletype = $('#vehicletypeentry').val();

          var vehicleclass = $('#vehicleclassentrydummy').val();
          var selectmake = $('#selectmakeentrydummy').val();
          var selectmodel = $('#modelselectdummy').val();
          var staterto = $('#selectrto').val();
          var mgfyear = $('#selectmgfyeardumy').val();
          var stateselect = $('#statedummy').val();
          var customername = $('#customernamedummy').val();
          var installby = $('#installbydummyentry').val();
          var vehicleicon = $('#vehicleiconentry').val();
          var vehino = $('#vehiclenoentry').val();
          var chassis = $('#chassisnoentry').val();
          var engineno = $('#engineno1').val();

          var dateofbirth = $('#date').val();
          var personname = $('#personentry').val();
          // Validate Contact Name

          if (devicetype == 'AIS-140' || devicetype == 'Basic' || devicetype == 'Personal Tracker App' || devicetype == 'Smart Tracker') {



            if (!customername && customername.length <= 0) {
              isValid = false;
              $('#msg_error_contactentry').html('Please Select Customer Name.').show();
              $('#statecustomerentry').focus();
              setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
            }
            else if (!vehino && vehino.length <= 0 || vehino.length < 7) {
              isValid = false;
              $('#msg_error_contactentry').html('Please Enter Valid Vehicle no').show();
              $('#vehiclenoentry').focus();
              setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
            }
            else if ((!chassis && chassis.length <= 0) || chassis.length < 7 || chassis.length > 17) {
              isValid = false;
              $('#msg_error_contactentry').html('Please Enter Valid Chassis no').show();
              $('#chassisnoentry').focus();
              setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
            }
            else if (!engineno && engineno.length <= 0 || engineno.length < 5) {
              isValid = false;
              $('#msg_error_contactentry').html('Please Enter Valid Engine no').show();
              $('#engineno1').focus();
              setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
            }
            else if (vehicletype == null || vehicletype == '') {
              isValid = false;
              $('#msg_error_contactentry').html('Please Select Vehicle Type.').show();
              $('#vehicletypeentry').focus();
              setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
            } else if (vehicleclass == null || vehicleclass == '') {
              console.log($('#vehicleclassentrydummy').val())
              isValid = false;
              $('#msg_error_contactentry').html('Please Select Vehicle Class.').show();
              $('#vehicleclassentry').focus();
              setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);

            } else if (!selectmake && selectmake.length <= 0) {
              // validate Official No
              isValid = false;
              $('#msg_error_contactentry').html('Please Select Make.').show();
              $('#selectmakeentry').focus();
              setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
            }
            else if (!selectmodel && selectmodel.length <= 0) {
              // validate Official Email
              isValid = false;
              $('#msg_error_contactentry').html('Please Select Model.').show();
              $('#selectmodelentry').focus();
              setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
            }
            else if (!mgfyear && mgfyear.length <= 0) {
              isValid = false;
              $('#msg_error_contactentry').html('Please Select Mgf Year.').show();
              $('#selectmgfyear').focus();
              setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
            }
            else if (!stateselect && stateselect.length <= 0) {
              isValid = false;
              $('#msg_error_contactentry').html('Please Select State.').show();
              $('#selectstateentry').focus();
              setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
            }
            else if (staterto == null || staterto == '') {
              // console.log(staterto)
              isValid = false;
              $('#msg_error_contactentry').html('Please Select RTO.').show();
              $('#statertoentry').focus();
              setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
            }



          }
          else if (devicetype == 'Personal Tracker') {
            // if (!deviceimei && deviceimei.length <= 0) {
            //   // validate short code
            //   isValid = false;
            //   $('#msg_errorentry').html('Please Select Device IMEI No.').show();
            //   $('#devicetypeIMEIentry').focus();
            //   setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
            // }
            //  if(vehicletype==null ||vehicletype ==''){
            //   isValid = false;
            //   $('#msg_errorentry').html('Please Select Vehicle Type.').show();
            //   $('#vehicletypeentry').focus();
            //   setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
            // }
            if (!customername && customername.length <= 0) {
              isValid = false;
              $('#msg_error_contactentry').html('Please Select Customer Name.').show();
              $('#statecustomerentry').focus();
              setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
            }
            else if (!persontype && persontype.length <= 0) {
              isValid = false;
              $('#msg_error_contactentry').html('Please Select Person Type.').show();
              $('#persontype').focus();
              setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
            }
            else if (!stateselect && stateselect.length <= 0) {
              isValid = false;
              $('#msg_error_contactentry').html('Please Select State.').show();
              $('#selectstateentry').focus();
              setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
            }
            else if (staterto == null || staterto == '') {
              // console.log(staterto)
              isValid = false;
              $('#msg_error_contactentry').html('Please Select RTO.').show();
              $('#statertoentry').focus();
              setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
            }

            else if (!installby && installby.length <= 0) {
              isValid = false;
              $('#msg_error_contactentry').html('Please Select Install By.').show();
              $('#installbyentry').focus();
              setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
            }


          }




          if (isValid && index == 2) {

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


        function validateentryStep3(index, steps) {

          $('#accountNoentry').focus();
          var isValid = true;
          var accountNo = $('#accountNoentry').val();
          $('#msg_accountNoentry').html('').hide();
          // Validate Account No
          if (!accountNo && accountNo.length <= 0) {
            isValid = false;
            $('#msg_accountNoentry').html('Please Enter Account Number').show();
            $('#accountNoentry').focus();
          }
          if (isValid && index == 3) {

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
        function validateentryStep4(index, steps) {
          // alert("success")
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
        var path = 'assets/img/background-part.png';
        $('.daterangepicker2').append('<div class="background" style="background-image: url(' + path + '); z-index:-1; height:00px;"><img src="../assets/img/background-part.png" alt="" style="display:none"></div>')
        /* calander picker ends */

        /* calander single  picker ends */
        $('.datepicker').daterangepicker({
          singleDatePicker: true,
          showDropdowns: true,
          minYear: 1901,
          maxDate: new Date()
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
      });

    })(jQuery);

    // this.Statelist();
    this.EncryptPageName();
    this.EncryptPageUrl();
    this.DeviceTypelist();
    //this.VehicleClasslist();
    this.SelectMakelist();
    this.Statelist();
    this.Yearlist();
    this.Customerlist();
    this.Employeelist();
    this.VehicleIconlist();
    this.vendorlist();



    function readURL(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          // console.log(e.target.result);
          //  let obj : any = e.target.result;
          let obj: any = (e.target as any).result;
          //  console.log(obj);
          $('#blah').attr('src', obj);

        }


        reader.readAsDataURL(input.files[0]);
      }
    }
    function readURL2(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          console.log(e.target);
          //  let obj : any = e.target.result;
          let obj: any = (e.target as any).result;
          $('#blah2').attr('src', obj);

        }


        reader.readAsDataURL(input.files[0]);
      }
    }
    function readURL3(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          console.log(e.target);
          //  let obj : any = e.target.result;
          let obj: any = (e.target as any).result;
          $('#blah3').attr('src', obj);

        }


        reader.readAsDataURL(input.files[0]);
      }
    }
    function readURL4(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          console.log(e.target);
          //  let obj : any = e.target.result;
          let obj: any = (e.target as any).result;
          $('#blah4').attr('src', obj);

        }


        reader.readAsDataURL(input.files[0]);
      }
    }
    function readURL5(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          console.log(e.target);
          //  let obj : any = e.target.result;
          let obj: any = (e.target as any).result;
          $('#blah5').attr('src', obj);

        }


        reader.readAsDataURL(input.files[0]);
      }
    }


    $("#imgInp").change(function () {
      readURL(this);
    });

    $("#imgInp2").change(function () {
      readURL2(this);
    });
    $("#imgInp3").change(function () {
      readURL3(this);
    });
    $("#imgInp4").change(function () {
      readURL4(this);
    });
    $("#imgInp5").change(function () {
      readURL5(this);
    });

  }



  EncryptPageName() {
    this.cryptService.encrypt("Vehicle Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }


  ListOfDevicetype = [];

  DeviceTypelist() {

    let keydata = {
      param1: this.vendorlistdata,
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
        this.ListOfDevicetype = data.entity;
        // this.ListOfState = statelist;

        this.loading = false;

      });
  }
  pagecount = 10;
  VehicleIconlist() {

    // this.selectstate = this.SelectStateText.param1;
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
  ListOfVehicleIcon: any;

  devicetypeIMEIText: any;
  selectdeviceIMEINo: string;

  ListOfDeviceRawData = [];
  devicetypeText: any;
  selectdevicetype: string;
  selectVehicle: any;
  vehicleclassText: any;
  SelectInstallbyText: any;

  /* ------------------------------------------------------------------------------------------------------ */
  selectdevicetypedummy: string;
  selectdeviceIMEINodummy: string = '';
  dummyvehicleClass: string;
  selectmodeldummy: string;
  selectmgfyeardummy: string;
  selectcustname: string;
  persontypedummy: string;
  selectinstallby: string;
  DummyIMEIlist() {
    this.selectdeviceIMEINodummy = this.devicetypeIMEIText.param2;
    this.simNo = this.devicetypeIMEIText.param4;
    this.uniqueNo = this.devicetypeIMEIText.param3;
    this.status = this.devicetypeIMEIText.param5;

  }
  dummyvehicleclass() {
    this.vehicleclassdummy = this.vehicleclassText.param1;
  }
  dummypersontype() {
    this.persontypedummy = this.persontypeText.param1;
  }
  dumyselectmodel() {
    this.selectmodeldummy = this.SelectModelText.param2;
    // alert(this.selectmodeldummy);
  }
  dummymgfyear() {
    this.selectmgfyeardummy = this.SelectMgfYearText.param2;
  }
  dummycustomername() {
    this.selectcustname = this.SelectCustomerText.param2;
  }
  dummyinstallby() {
    this.selectinstallby = this.SelectInstallbyText.param2;

  }
  dummyvehicleicon() {
    this.selectvehicleicon = this.SelectVehicleIconText.param2;
  }
  selectvendorList() {
    this.vendorlistdata = this.vendorText.param1;
    console.log("id:"+this.vendorlistdata);
    this.devicetypeText = null; this.selectdevicetypedummy = null; this.devicetypeIMEIText = null; this.selectdeviceIMEINodummy = null;
    this.SelectInstallbyText = null; this.selectinstallby = null;
  }

  selectvehicleicon: string; SelectVehicleIconText: any; vendorText: any; vendorlistdata: string;

 
  DeviceTypeIMEIlistent() {
    this.devicetypeid = this.devicetypeIMEIText.param1
    this.selectdevicetypedummy = this.devicetypeText.param2;
    this.VehicleClasslist();
    this.IMEIlist();
    if (this.selectdevicetypedummy == "Basic" || this.selectdevicetypedummy == "Smart Tracker") {
      alert("hii1");
      // alert(this.selectdevicetypedummy)

      document.getElementById("persontype").style.display = "none";
      document.getElementById("date").style.display = "none";
      document.getElementById("personname").style.display = "none";

      document.getElementById("vehicleno").style.display = "block";
      document.getElementById("chassisno").style.display = "block";
      document.getElementById("engineno").style.display = "block";
      document.getElementById("vehicleclass").style.display = "block";
      document.getElementById("selectmake").style.display = "block";
      document.getElementById("selectmodel").style.display = "block";
      document.getElementById("mgfyear").style.display = "block";



      document.getElementById("customeridentitystar").style.display = "none";
      document.getElementById("addressproofstar").style.display = "none";
      document.getElementById("rcstar").style.display = "none";
      //  document.getElementById("vehicleoldnew").style.display = "block";
      document.getElementById("Mobilize_entry").style.display = "block";
      document.getElementById("fulecheck_entry").style.display = "block";
      document.getElementById("acstatus_entry").style.display = "block";

      $(".buttonFinish").prop('disabled', true);
      this.selectdevicetype = this.devicetypeText.param1;
// this.IMEIlist();
    }
    else if (this.selectdevicetypedummy == "AIS-140") {
      alert("hii2");
      document.getElementById("persontype").style.display = "none";
      document.getElementById("date").style.display = "none";
      document.getElementById("personname").style.display = "none";

      document.getElementById("vehicleno").style.display = "block";
      document.getElementById("chassisno").style.display = "block";
      document.getElementById("engineno").style.display = "block";
      document.getElementById("vehicleclass").style.display = "block";
      document.getElementById("selectmake").style.display = "block";
      document.getElementById("selectmodel").style.display = "block";
      document.getElementById("mgfyear").style.display = "block";

      document.getElementById("customeridentitystar").style.display = "inline-block";
      document.getElementById("addressproofstar").style.display = "inline-block";
      document.getElementById("rcstar").style.display = "block";
      document.getElementById("Mobilize_entry").style.display = "block";
      document.getElementById("fulecheck_entry").style.display = "block";
      document.getElementById("acstatus_entry").style.display = "block";

      $(".buttonFinish").prop('disabled', true);
      this.selectdevicetype = this.devicetypeText.param1;
      //this.IMEIlist();
    }
    else if (this.selectdevicetypedummy == "Personal Tracker") {
      alert("hii3");
      //alert("Personal Tracker");
      document.getElementById("persontype").style.display = "block";
      document.getElementById("date").style.display = "block";
      document.getElementById("personname").style.display = "block";
      document.getElementById("vehicleno").style.display = "none";
      document.getElementById("chassisno").style.display = "none";
      document.getElementById("engineno").style.display = "none";
      document.getElementById("vehicleclass").style.display = "none";
      document.getElementById("selectmake").style.display = "none";
      document.getElementById("selectmodel").style.display = "none";
      document.getElementById("mgfyear").style.display = "none";

      document.getElementById("customeridentitystar").style.display = "none";
      document.getElementById("addressproofstar").style.display = "none";
      document.getElementById("rcstar").style.display = "none";
      // document.getElementById("vehicleoldnew").style.display = "none";
      document.getElementById("Mobilize_entry").style.display = "none";
      document.getElementById("fulecheck_entry").style.display = "none";
      document.getElementById("acstatus_entry").style.display = "none";
      this.selectdevicetype = this.devicetypeText.param1;
//this.IMEIlist();
    }
    this.IMEIlist();

  }
  IMEIlist() {
    alert("hello");
        let keydata = {
           param1: "",
           param2: this.selectdevicetypedummy,
           param3:"",
    
           param4:"",
           pageID: "7",
           pageName: this.encryptedpageNameValue,
           pageURL: this.encryptedpageUrlValue
         }
       try { AddLoader() } catch (e) { alert(e) }
       this.listService.DeviceList_vehicle(keydata).subscribe(
         (data) => {
           try { RemoveLoader() } catch (e) { alert(e) }
          //   alert(JSON.stringify(data));
          //   console.log(data.entity)
          //  console.log("wekcome_ "+data);
          this.ListOfDeviceRawData = data.entity.list;
        
    
           this.loading = false;
    
         });
     }
  ListOfVehicleclass = [];
  selectvehicleclass: string;


  VehicleClasslist() {

    let keydata = {
      param1: this.selectdevicetypedummy,
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
  ListOfSelectMake = [];
  SelectMakeText: any;
  selectvalueofmake: string;


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
  ListOfSelectModel = [];
  SelectModelText: any;
  selectmodelid: string;
  dummyselectmake: string;


  SelectModellist() {
    this.dummyselectmake = this.SelectMakeText.param2;
    this.selectvalueofmake = this.SelectMakeText.param1;
    let keydata = {
      param1: this.selectvalueofmake,
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
        this.ListOfYear = data.entity.list;
        this.ListOfYear.forEach(element => {
          if (element.param2.includes(new Date().getFullYear()) == true) {
            this.SelectMgfYearText = element;
            this.selectmgfyeardummy = this.SelectMgfYearText.param2;

          }
        });
        this.loading = false;

      });
  }
  ListOfState = [];
  SelectStateText: any;
  selectstate: string;

  ListOfvendorup: Object;

  vendorlist() {

    let keydata = {
      param1: "device",
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
  SelectRTOText: any;
  selectrto: string;
  selectcitydummy: string;


  RTOlist() {
    this.selectcitydummy = this.SelectStateText.param2;
    this.selectstate = this.SelectStateText.param1;
    let keydata = {
      param1: this.selectstate,
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
  ListOfEmployee: any;
  vehsavebtndemo() {

  }


  closemodal() {
    $("#ErrorModalEntry").modal('hide');
    $("#SuccessModalEntry").modal('hide');

    //$('#modeldelete').modal('hide');
    $('#exampleModal').modal('hide');
    $('#myModalPersonaltracker').modal('hide');

    $('.modal-backdrop.show').css('display', 'none');
  }
}
