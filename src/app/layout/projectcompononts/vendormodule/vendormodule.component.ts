import { VendormodelService } from './../../../APIService/vendormodel.service';
import { Router } from '@angular/router';

import { ListService } from './../../../../list.service';
//import { PostService } from './../../../../post.service';

import { Paramcls } from './../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as xlsx from 'xlsx';
// import * as $ from 'jquery';
import { CryptService } from '../services/crypt.service';
import { PdfService } from '../services/pdf.service';
import { ExportToExcelService } from '../services/export-to-excel.service';
import { SimservicemasterService } from '../services/simservicemaster.service';

//import * as $ from 'jquery';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;


@Component({
  selector: 'app-vendormodule',
  templateUrl: './vendormodule.component.html',
  styleUrls: ['./vendormodule.component.css']
})
export class VendormoduleComponent implements OnInit {

  @Output()
  showDetails = new EventEmitter();


  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  key: string = 'name'; reverse: boolean = true;

  pageUrl = this.router.url;
  private _success = new Subject<string>(); successMessageUpdate: string;
  totalcount: number; viewcount: number;
  officialemailText: string;
  vendorCheckApproved:any;
  vendorCheckNotApproved:any;
  approveremarkText:any="";

  datafromrespo: string;

  AreaText: string; landmarkText: string; remarkText: string;
  selectRowsText: string = "10";


  accountnoText: string; banknmText: string; branchnmText: string; ifscText: string;
  vendordatadetails: Object;

  vendor_id: string; ven_name: string; short_code: string; vendor_cin: string; vendor_gst: string;
  off_no: string; off_email: string; con_name: string; con_email: string; con_mobno: string;
  reg_add: string; pin_code: string; bank_acc: string;
  bank_name: string; bank_ifsc: string; bank_add: string; device_typeid: any;

  deleteText: string; ListOfCity$: Object; ListOfState$: Object; resdatalist = []; ListOfState = []; ListOfCity = [];

  public loading = false; pagecount: number; stringifiedData: any; parsedJson: any; stringifiedDataList: any; parsedJsonList: any;
  nop: number; totrec: number; outorec: number; filter: any; selectRows: string; Searchvendor: string;
  VendorDetails$: any; Detailsexcelpdf$: any; pdfData: any = [];
  count: any = 9999;


  pageNumber = 1;
  itemsPerPage = 10
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  vendorTypeList: any[];
  vendorTypeIdedit: any;
  vendortypeObjEdit: any;
  submitted: boolean = false;
  devicetypetouched: boolean = false;
  devicetypename: any;
  indexNumber: number;
  supplyListedit: any;

  constructor(private vendormodelservice: VendormodelService, private listService: ListService, private cryptService: CryptService, private router: Router, public pdfservice: PdfService
    , public excelservice: ExportToExcelService, private simService: SimservicemasterService) {
    this.EncryptPageName();
    this.EncryptPageUrl();
  }

  ngOnInit() {
    //  Added Count , ViewCount = 0 ............Date : 2-12-2020 Developer: Aditya Londhe
    /* ------------------------------- Wizards start Ts------------------------------------------------- */

    (function ($) {
      $(document).ready(function () {
        $('#vendorName').focus();
        $("#prev").prop('disabled', false);
        $("#next").prop('disabled', true);
        $("#save").prop('disabled', false);

        $("#step-14").show();
        $("#step-15").hide();
        $("#step-16").hide();
        $("#step-17").hide();
        function setClasses(index, steps) {

          if (index < 0 || index > steps) return;
          if (index == 0) {
            $("#prev").prop('disabled', true);
          } else {
            $("#prev").prop('disabled', false);
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
          $("#next").prop('disabled', false);
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
          } else if (validateStep2(index, steps) == false) {
            isStepValid = false;
          } else if (validateStep3(index, steps) == false) {
            isStepValid = false;
          }
          return isStepValid;
        }

        function validateStep1(index, steps) {
          $('#vendorName').focus();
          $('#msg_error').html('').hide();
          var isValid = true;
          var vendortype = $('#vendortypeid2').val();
          var vendorname = $('#vendorNameup').val();
          var shortcode = $('#shortCodeup').val();
          var gstno = $('#GSTNoup').val();
          var ofcNo = $('#officialNoup').val();
          var cincNo = $('#CINNoup').val();
          var altNo = $('#alternateNoup').val();
          var ofcemail = $('#officialEmailup').val();
          var atposition = ofcemail.indexOf("@");
          var dotposition = ofcemail.lastIndexOf(".");
          var devicetype = $('#devicetypedummyupdate').val();
          // Validate Vendor Name
          // if (vendortype == null || vendortype == '') {
          //   isValid = false;
          //   $('#msg_error').html('Please Select Vendor Type.').show();
          //   $('#vendortypeedit').focus();
          //   setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);

          // }
          // else if (devicetype.length == 0) {
          //   isValid = false;
          //   $('#msg_error').html('Please Enter Supply Off.').show();
          //   $('#devicetypedummyupdate').focus();
          //   setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);

          // }
          if (!vendorname && vendorname.length <= 0 || vendorname.length < 3) {
            isValid = false;
            $('#msg_error').html('Please Enter Vendor Name.').show();
            $('#vendorNameup').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);

          } else
            if (!shortcode && shortcode.length <= 0 || shortcode.length < 4) {
              // validate short code
              isValid = false;
              $('#msg_error').html('Please Enter Short Code.').show();
              $('#shortCodeup').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);

            }
            else if ((cincNo.length < 21) && (cincNo != null && cincNo != '')) {
              // validate short code
              isValid = false;
              $('#msg_error').html('Please Enter CIN Number.').show();
              $('#CINNoup').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);

            }
            else if (!gstno && gstno.length <= 0 || gstno.length < 15) {
              // validate short code
              isValid = false;
              $('#msg_error').html('Please Enter GST No.').show();
              $('#GSTNoup').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
            }
            else if (ofcNo != '') {
              if (ofcNo.length != 10 && ofcNo.length != 13) {
                // validate GST No
                isValid = false;
                $('#msg_error').html('Please Enter Official No.').show();
                $('#officialNoup').focus();
                setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
              }
            }

            else if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= ofcemail.length) {
              // validate GST No
              isValid = false;
              $('#msg_error').html('Please Enter Valid Email.').show();
              $('#officialEmailup').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);

            }


          if (isValid && index == 1) {

            $('#msg_error').html('').hide();
            $("#step-14").hide()
            $("#step-15").show();
            $("#step-16").hide();
            $("#step-17").hide();

            $("#save").prop('disabled', true);
            $("#next").prop('disabled', false);
            $("#prev").prop('disabled', true);

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
          var persnname = $('#pernameup').val();
          var phoneno = $("#alternateNoup").val();
          var state = $('#statedummyupdateco').val();
          var city = $('#citydummyupdateco').val();
          var regadd = $('#regaddressnewup').val();
          var pincode = $('#pincodenoup').val();
          var are = $('#areaup').val();
          var land = $('#landmarkup').val();


          // Validate Contact Name
          if (!persnname && persnname.length <= 0 || persnname.length < 3) {
            isValid = false;
            $('#msg_error_contact').html('Please Enter Person Name.').show();
            $('#pernameup').focus();
            setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

          }
          else if (phoneno.length != 10 && phoneno.length != 13) {
            isValid = false;
            $('#msg_error_contact').html('Please Enter Phone No.').show();
            $('#alternateNoup').focus();
            setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
          } else if (!state && state.length <= 0) {
            // validate state
            isValid = false;
            $('#msg_error_contact').html('Please Select State.').show();
            $('#stateupdate').focus();
            setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

          } else if (!city && city.length <= 0) {
            // validate city
            isValid = false;
            $('#msg_error_contact').html('Please Select City.').show();
            $('#cityupdate').focus();
            setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

          }
          else if ((are.length < 5) && (are != null && are != '')) {
            // validate city
            isValid = false;
            $('#msg_error_contact').html('Please Enter Area.').show();
            $('#areaup').focus();
            setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

          }
          else if ((land.length < 5) && (land != null && land != '')) {
            // validate city
            isValid = false;
            $('#msg_error_contact').html('Please Enter Landmark.').show();
            $('#landmarkup').focus();
            setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

          }
          else if (!regadd && regadd.length <= 0 || regadd.length < 5) {
            // validate city
            isValid = false;
            $('#msg_error_contact').html('Please Enter Registration Address ').show();
            $('#regaddressnewup').focus();
            setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

          }
          else
            if ((pincode.length < 5) && (pincode != null && pincode != '')) {
              // validate Alternate Number
              isValid = false;
              $('#msg_error_contact').html('Please Enter Pincode No.').show();
              $('#pincodenoup').focus();
              setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
            }
          if (isValid && index == 2) {

            $('#msg_error_contact').html('').hide();

            $("#step-15").hide();
            $("#step-14").hide()
            $("#step-16").show();
            $("#step-17").hide();
            $('#accountNo').focus();

            $("#save").prop('disabled', false);
            $("#next").prop('disabled', true);
            $("#prev").prop('disabled', false);

            setClasses(index, steps);
            isValid = false;
          }

          return isValid;
        }

        function validateStep3(index, steps) {

          $('#accountNoentry').focus();
          var isValid = true;

          var accno = $('#accountNoup').val();
          var bname = $('#bnknamup').val();
          var brnchnm = $('#branchnmup').val();
          var ifsc = $('#ifsccodeup').val();

          // Validate Contact Name
          if ((accno.length < 11) && (accno != null && accno != '')) {
            isValid = false;
            $('#msg_error_update').html('Please Enter Account No.').show();
            $('#accountNoup').focus();
            setTimeout(function () { document.getElementById("msg_error_update").style.display = "none"; }, 3000);

          } else if ((bname.length < 3) && (bname != null && bname != '')) {
            // validate state
            isValid = false;
            $('#msg_error_update').html('Please Enter Bank Name.').show();
            $('#bnknamup').focus();
            setTimeout(function () { document.getElementById("msg_error_update").style.display = "none"; }, 3000);

          } else if ((brnchnm.length < 3) && (brnchnm != null && brnchnm != '')) {
            // validate city
            isValid = false;
            $('#msg_error_update').html('Please Enter Branch Name.').show();
            $('#branchnmup').focus();
            setTimeout(function () { document.getElementById("msg_error_update").style.display = "none"; }, 3000);
          }
          else if ((ifsc.length < 3) && (ifsc != null && ifsc != '')) {
            // validate city
            isValid = false;
            $('#msg_error_update').html('Please Enter Branch Name.').show();
            $('#ifsccodeup').focus();
            setTimeout(function () { document.getElementById("msg_error_update").style.display = "none"; }, 3000);
          }
          if (isValid && index == 3) {

            $('#msg_contactNo').html('').hide();
            $("#step-14").hide();
            $("#step-15").hide();
            $("#step-16").show();

            $("#next").prop('disabled', true);
            $("#save").prop('disabled', false);
            $("#prev").prop('disabled', false);
            setClasses(index, steps);
            isValid = false;
          }
          return isValid;
        }

      });
    })(jQuery);


    this.VendorDetail();
    this.Statelist();
    this._success.subscribe((message) => this.successMessageUpdate = message);

    this._success.pipe(
      debounceTime(8000)
    ).subscribe(() => this.successMessageUpdate = null);

    /* ------------------------------- Wizards end Ts------------------------------------------------- */
  }


  /*------------------------------------------ View Next ----------------------------------------------------*/
  EncryptPageName() {
    this.cryptService.encrypt("Vendor Details")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }

  vendortypelist() {
    let dataL = {
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.VendorTypeList(dataL).subscribe((response) => {
      this.vendorTypeList = response.entity;
    })
  }

  getVendorTypeid() {
    this.vendorTypeIdedit = this.vendortypeObjEdit.param1;

    let dataL = {
      param1: this.vendorTypeIdedit,
      param2: "",
    }
    this.listService.SupplyOfList(dataL).subscribe((response) => {
      this.supplyListedit = response.entity;
    })

    this.device_typeid = '';
    this.selectdevicetypereturn.length = 0;

  }

  editpageform() {
    document.getElementById("backdetailsbtn").style.display = "block";
    document.getElementById("editbtn").style.display = "none";
    document.getElementById("vendordtls").style.display = "none";
    document.getElementById("container").style.display = "block";
    document.getElementById("modelfooter").style.display = "block";
    document.getElementById("uvmd").style.display = "block";
    document.getElementById("vmd").style.display = "none";
    this.vendortypelist();
    this.Statelist();
    this.CitylistUpdate();
    // this.indexNumber = 0;
    $("#step-14").show();
    $("#step-15").hide();
    $("#step-16").hide();
    $("#step-17").hide();
    $("#next").prop('disabled', false);
    $("#prev").prop('disabled', true);
    $("#save").prop('disabled', true);
  }


  backdetailsbtn() {
    document.getElementById("uvmd").style.display = "none";
    document.getElementById("vmd").style.display = "block";
    document.getElementById("backdetailsbtn").style.display = "none";
    document.getElementById("editbtn").style.display = "block";
    document.getElementById("vendordtls").style.display = "block";
    document.getElementById("modelfooter").style.display = "none";
    document.getElementById("container").style.display = "none";
  }


  ven_city_update: any;
  ven_state_update: any;

  updatevendor() {
    var remark = $("#Remarkvenupdate").val();
    var isValid = true;


    if (!remark && remark.length <= 0) {
      isValid = false;
      this._success.next('Please Enter Remark.');
      $('#Remarkvenupdate').focus();
    }

    else {
      // if (this.devicetypetouched == true) {
      this.selectdevicetypereturn = []
      // for (let i = 0; i < this.device_typeid.length; i++) {
      //   this.selectdevicetypereturn.push(this.device_typeid[i].param1)
      // }

      let dataL = {
        remarks: this.remarkText,
        vendorid: this.vendor_id,
        vendorcode: this.short_code,
        vendorname: this.ven_name,
        vendorshortcode: this.short_code,
        vendorregaddress1: this.reg_add,
        vendorregaddress2: "",
        vendorcity: this.selectcityreturn,
        vendorstate: this.selectstatereturn,
        vendorcin: this.vendor_cin,
        vendorgst: this.vendor_gst,
        vendorpan: "",
        vendorcitypincode: this.pin_code,
        vendorofficialemailid: this.off_email,
        vendorlandlineno: this.off_no,
        vendorcontactperson: this.con_name,
        vendorcontpersemailid: "",
        vendorbankifsc1: this.ifscText,
        vendorbankaddress1: "",
        vendorcontactmobile: this.con_mobno,
        vendorstatusflag: "",
        loginname: "",
        loginpasswd: "",
        vendorbankaccountno1: this.accountnoText,
        vendorbankname1: this.banknmText,
        vendorbankcityname1: "",
        vendorbankaccountno2: "",
        vendorbankname2: "",
        vendorbankifsc2: "",
        vendorbankaddress2: "",
        vendorbankcityname2: "",
        vendortypeid: this.vendorTypeIdedit,
        vendorbankbranchname1: this.branchnmText,
        vendorbankbranchname2: "",
        vendorlandmark: this.landmarkText,
        vendorarea: this.AreaText,
        devicetypeid: this.selectdevicetypereturn

      }
      try { AddLoader() } catch (e) { alert(e) }
      this.vendormodelservice.UpdateVendorAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.datafromrespo = data.entity;
        if (data.statuscode == 200) {
          $("#SuccessModal").modal('show');
          $('#myModalwizard').modal('hide');
          this.clearfunction();
          this.VendorDetail();
        }
        else {
          $("#ErrorModal").modal('show');
        }

      });
      // }
    }
  }
  /*-------------List of City Api ---------------*/
  // stateText:any;
  cityTextUpdate: any; selectstateupdate: string;
  getStateId() {
    this.selectstatereturn = this.ven_state_update.param1;
    this.ven_city_update = null; this.selectcityreturn = ''
    this.CitylistUpdate();
  }
  CitylistUpdate() {
    this.submitted = true
    let keydata = {
      searchBy: this.selectstatereturn,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectCityListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfCity = data.entity;
        //  this.resdata =     
        this.loading = false;

      });
  }
  stateTextUpdate: any;
  Statelist() {
    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectStateListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        // alert(data.entity)
        var resdata = data.entity;
         this.ListOfStateList = resdata; 
        // this.ListOfState = statelist;

        this.loading = false;

      });
  }
  ListOfStateList:object=[];
  /*-------------List of State Api ---------------*/
  VendorDetail() {
    let keydata = {
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.simService.VendorDetailsAPI(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      if (data.statuscode == 200) {

        this.VendorDetails$ = data.entity.responsedatalist;
        this.totalcount = data.entity.count;
        this.viewcount = data.entity.viewCount;

      }
    });
  }

  searchdata() {
    this.pageNumber = 1;
    this.VendorDetail();
  }

  changeItemsPerPage() {
    this.pageNumber = 1;
    this.VendorDetail();
  }
  Refreshfunction() {
    this.pageNumber = 1;
    this.itemsPerPage = 10;
    this.filter = '';
    this.VendorDetail();
  }

  changePageNumber(event) {
    this.pageNumber = event;
    this.VendorDetail();
  }

  VendorDeletefunction() {
    var isValid = true;
    var deleteremark = $('#vendelremark').val();
    deleteremark = deleteremark.substring(0, 1).toUpperCase() + deleteremark.substring(1);
    if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      this._success.next('Please Enter Remark.');
      $('#vendelremark').focus();
    }
    else {
      let dataL = {
        param1: deleteremark,
        param2: this.vendor_id,
      }
      try { AddLoader() } catch (e) { alert(e) }
      this.vendormodelservice.DeleteVendorAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.datafromrespo = data.entity;

        if (data.statuscode == 200) {
          $("#myModalwizard").modal('hide');
          $("#SuccessModal").modal('show');
          this.VendorDetail();
          this.closemodal();
        }
        else {
          $("#ErrorModal").modal('show');
        }
      });
      // alert("error in inserting data");
    }
  }
  selectstatereturn: string; selectcityreturn: string; selectdevicetypereturn: any[];
  
  setdata(com) {

    this.vendortypeObjEdit = com.param36;
    this.vendorTypeIdedit = com.param35
    this.vendor_id = com.param1;
    this.ven_name = com.param3;
    this.short_code = com.param4;
    this.vendor_cin = com.param9;
    this.vendor_gst = com.param10;
    this.off_no = com.param14;
    this.off_email = com.param13;
    this.con_name = com.param15;
    this.con_mobno = com.param17;
    this.ven_state_update = com.param8;
    this.ven_city_update = com.param7;
    this.reg_add = com.param5;
    this.pin_code = com.param12;
    this.bank_acc = com.param21;
    this.bank_name = com.param22;
    this.bank_ifsc = com.param23;
    this.bank_add = com.param24;
    //let devicetype = com.param34.replace("[", "").replace("]", "").split(","); 
    // this.selectdevicetypereturn = com.param33;
    this.selectdevicetypereturn = com.arrdata1;
    this.selectstatereturn = com.param32;
    this.selectcityreturn = com.param31
    this.landmarkText = com.param37;
    this.AreaText = com.param38;
    this.devicetypename = com.param34


    if (this.vendor_cin == "0") { this.vendor_cin = '' }
    if (this.off_no == "0") { this.off_no = '' }

    let anyData = JSON.parse(com.param34)


    let keydata = {
      param1: "",
      param2: "",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.DeviceTypeListAPI(keydata).subscribe((data) => {
      this.supplyListedit = data.entity;
      for (let i = 0; i < this.supplyListedit.length; i++) {
        for (let j = 0; j < anyData.length; j++) {
          if (anyData[j] == this.supplyListedit[i]["param2"])
            this.device_typeid[j] = this.supplyListedit[i]
        }
      }
    });

    this.backdetailsbtn();
    // this.vendortypelist()
  }

  exportToPDF() {

    var search = $('#searchData').val();

    let keydata = {
      pageNo: "",
      itemsPerPage: "",
      searchBy: search,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    //this.simService.VendorDetailsAPI(keydata).subscribe((data) => {  
    this.vendormodelservice.VendorDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.VendorDetails$ = data.entity.responsedatalist;
        this.PreparePDFData(this.VendorDetails$);

      });
  }

  PreparePDFData(data) {
    let pdfTableData;
    for (let i = 0; i < data.length; i++) {
      pdfTableData = {
        "#": i + 1,
        "Vendor Name": data[i].param3,
        "vendor Type": data[i].param36,
        "Email Id": data[i].param13,
        "Mobile No.": data[i].param17,
        "State": data[i].param8,
        "City": data[i].param7,
        "Address": data[i].param6,
        "Person Name": data[i].param15,
      }
      this.pdfData.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(this.pdfData, "Vendor Details");

  }

  excelData: any = [];
  PrepareExcelData(data) {
    this.excelData = [];

    for (var i = 0; i < data.length; i++) {
      try {
        var obj = {
          "#": i + 1,
          "Vendor Name": data[i].param3,
          "vendor Type": data[i].param36,
          "Email Id": data[i].param13,
          "Mobile No.": data[i].param17,
          "State": data[i].param8,
          "City": data[i].param7,
          "Address": data[i].param6,
          "GST": data[i].param15,
        }
      } catch (e) { }
      this.excelData.push(obj);
    }
    this.excelservice.ExportExcel(this.excelData, 'Vendor Details', 'vendordetails');

  }

  exportToExcel() {
    let keydata = {
      pageNo: "",
      itemsPerPage: "",
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.vendormodelservice.VendorDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.Detailsexcelpdf$ = data.entity.responsedatalist;
        this.PrepareExcelData(this.Detailsexcelpdf$);
      });
  }

  //sorting
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  ListOfDevicetype = [];
  DeviceTypeList() {
    let keydata = {
      param1: "",
      param2: "",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.DeviceTypeListAPI(keydata).subscribe(
      (data) => {
        this.ListOfDevicetype = data.entity.list;
        this.loading = false;
      });
  }
  // supplyoff() {
  //   // this.devicetypetouched = true;
  //   this.selectdevicetypereturn = this.device_typeid["param1"];
  // }

  closemodal() {
    this.deleteText = "";
    $("#successmodel").modal('hide');

    $('#modeldelete').modal('hide');

    $('.modal-backdrop.show').css('display', 'none');
    this.clearfunction();
  }

  clearfunction() {
    this.ven_name = "";
    this.short_code = "";
    this.vendor_cin = "";
    this.vendor_gst = "";
    this.off_no = "";
    this.officialemailText = "";
    this.device_typeid = [];
    this.selectdevicetypereturn = [];
    this.con_name = "";
    this.ven_state_update = "";
    this.selectstatereturn = "";
    this.ven_city_update = "";
    this.selectcityreturn = "";
    this.AreaText = "";
    this.landmarkText = "";
    this.reg_add = "";
    this.pin_code = "";
    this.accountnoText = "";
    this.banknmText = "";
    this.branchnmText = "";
    this.ifscText = "";
    this.remarkText = "";
  }

  approveVendor(){
    alert("approve vendor")
  }

}
