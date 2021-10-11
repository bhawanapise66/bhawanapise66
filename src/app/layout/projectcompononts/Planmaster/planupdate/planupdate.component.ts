import { PlanmasterService } from './../../../../APIService/planmaster.service';
import { Router } from '@angular/router';
//import { DevicemodelService } from './../../../../../devicemodel.service';
import { ListService } from './../../../../../list.service';
import { PostService } from './../../../../../post.service';
import { Paramcls } from './../../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as xlsx from 'xlsx';
import * as $ from 'jquery';
import { CryptService } from './../../services/crypt.service';

import { PdfService } from '../../services/pdf.service';
import { ExportToExcelService } from './../../services/export-to-excel.service';
//import * as $ from 'jquery';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-planupdate',
  templateUrl: './planupdate.component.html',
  styleUrls: ['./planupdate.component.css']
})
export class PlanupdateComponent implements OnInit {
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string; filter: string; 
  timer: any;
  pageUrl = this.router.url; key: string = 'name'; reverse: boolean = true;
  public loading = false; p: number; pagecount: number; count: number; viewcount: number; remarkup:string;  deleteText:string; 

  selectRowsText: string = "10";  PlanDetails$:Object;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };

  constructor(private modalService: NgbModal,private excelservice: ExportToExcelService, private flashMessage: FlashMessagesService, private listService: ListService,
    private cryptService: CryptService, private router: Router, public pdfservice: PdfService, private excelService: ExportToExcelService, private planService: PlanmasterService) { }

    ngOnInit() {
      /* ------------------------------- Wizards start Ts------------------------------------------------- */
      (function ($) {
        $(document).ready(function () {
          $('#myModalwizard').on('shown.bs.modal', function () {
            $('#distrbutorname').focus();
          })
        });
      })(jQuery);
  
      this.count = 0;
      this.viewcount = 0;
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
            } else if (validateStep2(index, steps) == false) {
              isStepValid = false;
            } else if (validateStep3(index, steps) == false) {
              isStepValid = false;
            } else if (validateStep4(index, steps) == false) {
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
            // var Distname = $('#distrbutorname').val();
            var planname = $('#plannameupdate').val();
            // var DealerName = $('#dealername').val();
            var plandiscription = $('#plandiscriptionupdate').val();
            // alert("sdjb"+distributorname);
            // var customertype = $('#customertype').val();
            var amount = $('#amountupdate').val();
  
            // var companyname = $('#companyname').val();
            var networkupdate = $('#networkupdatedummy').val();
  
            var vendorupdate = $('#vendorupdatedummy').val();
  
            //Validate Vendor Name
            if (planname.length <= 0) {
              isValid = false;
              //alert(""+Distname);
              $('#msg_error').html('Please Select Plan Name').show();
              $('#plannameupdate').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
  
  
            } else if (plandiscription.length <= 0) {
              // validate short code
              isValid = false;
              $('#msg_error').html('Please Select Plan Discription').show();
              $('#plandiscriptionupdate').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
  
            } else if (amount.length <= 0) {
              // validate Official No
              isValid = false;
              $('#msg_error').html('Please Select Amount').show();
              $('#amountupdate').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
  
            } else if (networkupdate == null) {
              // validate Official Email
              isValid = false;
              $('#msg_error').html('Please Select Network').show();
              $('#Network1identry').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
  
            }  else if (vendorupdate == null) {
              // validate Official Email
              isValid = false;
              $('#msg_error').html('Please Select Vendor').show();
              $('#vendorentrydemo').focus();
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
  
              setClasses(index, steps);
              $(".buttonFinish").prop('disabled', false);
              $(".buttonNext").prop('disabled', true);
              $('#pername').focus();
              isValid = false;
            }
            return isValid;
          }
  
  
          function validateStep2(index, steps) {
            $('#pername').focus();
  
           
            $('#msg_error_contact').html('').hide();
            var isValid = true;
           
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
          function validateStep4(index, steps) {
            // alert("success");
            return true;
          }
        });
      })(jQuery);
      this.EncryptPageName();
      this.EncryptPageUrl();
  
      this.PlanDetail();// this.clearfunction();
  
      /* ------------------------------- Wizards end Ts------------------------------------------------- */
    }
    EncryptPageName() {
      this.cryptService.encrypt("Customer Details")
      this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
  
    }
    EncryptPageUrl() {
      this.cryptService.encrypt(this.pageUrl)
      this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    }

    editpageform() {

      // if (this.selectcustcatogreturn == "organization") {
      //   this.selectcustcatogreturn1 = "ezIfxL4tox2A8vxy2Q8BrQ==";
      //   $('#starsymbolname').show();
      // } else {
      //   $('#starsymbolname').hide();
      // }
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
      this.NetworkList();
      this.VendorList();;
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
    PlanDetail() {

      this.loading = true;
  
      this.p = 1; this.pagecount = 10;
      //  console.log("p" + this.p);
  
      let keydata = {
        param1:"",
        param2:"",
        //pageNo: this.p,
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
      this.planService.DetailsPlanmasterAPI(keydata).subscribe(
        (data) => {
          try { RemoveLoader() } catch (e) { alert(e) }
  
          let resdatalist = data.entity.responsedatalist;

          this.PlanDetails$ = resdatalist;
          this.count = data.entity.count;
          this.viewcount = data.entity.viewCount;
          this.VehicleDetailpdfexl();
  
        });
    }

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
      this.planService.DetailsPlanmasterAPI(keydata).subscribe(
        (data) => {
         
         // this.count = data.entity.count;
         // this.viewcount = data.entity.viewCount;
          this.VehicleInstalDetailsPDF_EXCEL$ = data.entity.responsedatalist;
          this.PrepareExcelData(this.VehicleInstalDetailsPDF_EXCEL$);
  
        });
    }

    excelData: any = [];
  PrepareExcelData(datav) {
    this.excelData = [];

    for (var i = 0; i < datav.length; i++) {
      try {
        var obj = {

          "#": i + 1,
          "Plan Name": datav[i].param2,
          "Plan Discription": datav[i].param3,
          "Amount": datav[i].param4,
          "Data In MB": datav[i].param5,
          "SMS Count": datav[i].param6,
          "Validity in Days ": datav[i].param7 ,
          "Status": datav[i].param8,
          "Vendor ": datav[i].param12,
          "Network": datav[i].param10,
         
       
       
        }
      } catch (e) { }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    //this.searchfilterforpdf(); 
    this.excelservice.ExportExcel(this.excelData, 'Plan Master Details', 'planmaster');
  }
    VehicleInstalDetailsPDF_EXCEL$:any[];
    planid:string; plan_nameup:string; plandiscriptionup:string;planamountdataup:string;plandatainmbup:string;plansmscountup:string;validityplanup
    planstatusup:string;plannetworknameup:string;plannetworkid:string; planvendorid:string;planvendornameup:string; networkTextUpdate:string; networkreturnTextUpdate:string;
    
    createPDF() {
      let pdfTableData;
      let dataArray = []
      for (let i = 0; i < this.VehicleInstalDetailsPDF_EXCEL$.length; i++) {
        pdfTableData = {
          "#": i + 1,
       
          "Plan Name": this.VehicleInstalDetailsPDF_EXCEL$[i]["param2"],
          "Plan Discription": this.VehicleInstalDetailsPDF_EXCEL$[i]["param3"],
          "Amount": this.VehicleInstalDetailsPDF_EXCEL$[i]["param4"],
          "Data In MB": this.VehicleInstalDetailsPDF_EXCEL$[i]["param5"],
  
          "SMS Count": this.VehicleInstalDetailsPDF_EXCEL$[i]["param6"],
  
          "Validity In Days": this.VehicleInstalDetailsPDF_EXCEL$[i]["param7"] ,
          "Status": this.VehicleInstalDetailsPDF_EXCEL$[i]["param8"],
          "Vendor": this.VehicleInstalDetailsPDF_EXCEL$[i]["param12"],
          "Network": this.VehicleInstalDetailsPDF_EXCEL$[i]["param10"],
          
        }
        dataArray.push(pdfTableData)
      };
      this.pdfservice.CreatePDFData(dataArray, "Plan Master Details");
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
       // pageNo: this.p,
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
      this.planService.DetailsPlanmasterAPI(keydata).subscribe(
        (data) => {
          try { RemoveLoader() } catch (e) { alert(e) }
  
          let resdatalist = data.entity.responsedatalist;

          this.PlanDetails$ = resdatalist;
          this.count = data.entity.count;
          this.viewcount = data.entity.viewCount;
        });
    }

    searchdata() {
      var search = $('#searchData').val();
      this.loading = true;
  
      this.p = 1; this.pagecount = 10;
      //  console.log("p" + this.p);
  
      let keydata = {
        param1:"",
        param2:"",
       // pageNo: this.p,
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
      this.planService.DetailsPlanmasterAPI(keydata).subscribe(
        (data) => {
          try { RemoveLoader() } catch (e) { alert(e) }
  
          let resdatalist = data.entity.responsedatalist;

          this.PlanDetails$ = resdatalist;
          this.count = data.entity.count;
          this.viewcount = data.entity.viewCount;
          this.VehicleDetailpdfexl();
        });
    }


    Refreshfunction() {
      this.selectRowsText = "10";
      this.loading = true;
  
      this.p = 1; this.pagecount = 10;
      //  console.log("p" + this.p);
  
      let keydata = {
        param1:"",
        param2:"",
     //   pageNo: this.p,
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
      this.planService.DetailsPlanmasterAPI(keydata).subscribe(
        (data) => {
          try { RemoveLoader() } catch (e) { alert(e) }
  
          let resdatalist = data.entity.responsedatalist;

          this.PlanDetails$ = resdatalist;
          this.count = data.entity.count;
          this.viewcount = data.entity.viewCount;
  
          this.loading = false;
        });
    }
    
    setdata(com) {
      // alert(com);
     // this.backdetailsbtnperson();
  
     // var devicetype = this.getid(this.ListOfDevicetype, this.devicetypeTextupdate);
      
      let plandatadetails = com;
      this.planid = plandatadetails.param1;
      this.plan_nameup = plandatadetails.param2;
      this.plandiscriptionup = plandatadetails.param3;
      this.planamountdataup = plandatadetails.param4;
      this.plandatainmbup = plandatadetails.param5;
      this.plansmscountup = plandatadetails.param6;
      this.validityplanup  = plandatadetails.param7;
      this.planstatusup = plandatadetails.param8;
      this.plannetworknameup = plandatadetails.param10;
      this.plannetworkid = plandatadetails.param9;
      this.planvendorid = plandatadetails.param11;
      this.planvendornameup = plandatadetails.param12;

      //  this.bank_acc = vendordatadetails.param21;
  
       this.networkTextUpdate = this.plannetworknameup;
       this.VendorTextUpdate = this.planvendornameup;   // to checkinstall by 
     
       this.networkreturnTextUpdate = this.check(this.networkTextUpdate);
       this.VendorreturnUpdate = this.check(this.VendorTextUpdate);
    }
    VendorTextUpdate:string; VendorreturnUpdate:string;   network1list:Object;


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
          //  console.log(data.entity)
          // console.log("wekcome_ "+data);
          this.network1list = data.entity.list;
          
          // this.ListOfState = statelist;
  
          this.loading = false;
  
        });
    }

    ListOfvendor:Object;
    VendorList() {
  
      let keydata = {
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

    datafromrespo: string;
    vensaveeditbtn(){

      var vendorup = this.getid(this.ListOfvendor, this.VendorTextUpdate);
      var networkup = this.getid(this.network1list, this.networkTextUpdate);
      var planname = $('#plannameupdate').val();
      var plandiscription = $('#plandiscriptionupdate').val();
      // alert("sdjb"+distributorname);
      var amount = $('#amountupdate').val();

      var dataindb = $('#datainmbupdate').val();
    var smscount = $('#smscountupdate').val();
    var validity = $('#validityupdate').val();
    var status = $("input[type='radio'][name='statusup']:checked").val();
    var remark = $("#remarkupdte").val();
    var isValid = true;

    if (!dataindb && dataindb.length <= 0) {
      isValid = false;
      //alert(""+Distname);
      $('#msg_error_contact').html('Please Enter Data In MB').show();
      $('#datainmbentry').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

    }
    else if(!smscount && smscount.length <= 0) {
      isValid = false;
      //alert(""+Distname);
      $('#msg_error_contact').html('Please Enter SMS Count').show();
      $('#smscountentry').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

    }
    else if(!validity && validity.length <= 0) {
      isValid = false;
      //alert(""+Distname);
      $('#msg_error_contact').html('Please Enter Validity').show();
      $('#validityentry').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

    }
    else if(!remark && remark.length <= 0){
      isValid = false;
      //alert(""+Distname);
      $('#msg_error_contact').html('Please Enter Remark').show();
      $('#remarkupdte').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
    }
    else {
let dataL = {
        remarks: remark,
        planid: this.planid,
        planname: planname, plandescription: plandiscription, planammount: amount, plandatainmb: dataindb,
        plansmscount: smscount, planvalidityindays: validity, planiscalling: status, plannetworkid:networkup,
        planvendorid: vendorup, planmark: "", 
        // pageID: "7",
        // pageName: this.encryptedpageNameValue,
        // pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }
      this.planService.UpdatePlanmasterAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        //  alert(data);
        this.datafromrespo = data.entity;

        if (this.datafromrespo == 'Successfully updated.') {
          $("#SuccessModal").modal('show');
          //this.closemodal();
          //this.clearfunction();
        }
        else {
          $("#ErrorModal").modal('show');
        }
    });
    }
    }

    PlanDeletefunction() {
      var isValid = true;
      var deleteremark = $('#plandelremark').val();
      // Validate Contact Name
      if (!deleteremark && deleteremark.length <= 0) {
        isValid = false;
        // $('#msg_error_delete').html('Please Enter Remark').show();
        $('#msg_error_delete').html('Please Enter Remark').show();
        $('#plandelremark').focus();
        setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);
      }
      else {
        let dataL = {
          param1: deleteremark,
          param2: this.planid,
          pageID: "7",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
  
        }
        try { AddLoader() } catch (e) { alert(e) }
  
        this.planService.DeletePlanmasterAPI(dataL).subscribe((data) => {
          try { RemoveLoader() } catch (e) { alert(e) }
  
          //  alert(data);
          this.datafromrespo = data.entity;
  
          if (this.datafromrespo == 'Successfully Deleted.') {
            $("#SuccessModal").modal('show');
            this.PlanDetail();
            this.closemodal();
          }
          else {
            $("#ErrorModal").modal('show');
          }
        });
      }
    }

    PlanpageChanged(event) {

      var selectrow = $('#selectrow1').val();
      this.p = event; this.pagecount = 10;
      //  console.log("p" + this.p);
  
      let keydata = {
        pageNo: this.p,
        itemsPerPage: selectrow,
        searchBy: "",
        searchType: "",
        totalRecords: "NA",
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }
  
      // Distributor Detail Grid BIND LIST    
      this.planService.DetailsPlanmasterAPI(keydata).subscribe(
        (data) => {
          try { RemoveLoader() } catch (e) { alert(e) }
  
          let resdatalist = data.entity.responsedatalist;

          this.PlanDetails$ = resdatalist;
          this.count = data.entity.count;
          this.viewcount = data.entity.viewCount;
  
          this.loading = false;
        });
    }
    selectnet1(){
    }
    selectvendorList(){

    }
    sort(key) {

      // alert(key);
  
      this.key = key;
      this.reverse = !this.reverse;
  
    }

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

     closemodal(){
      //alert("come ");
      $("#SuccessModel").modal('hide');
  
      $('#modeldelete').modal('hide');
      $('#myModalwizard').modal('hide');
      $('#myModalPersonaltracker').modal('hide');
  
      $('.modal-backdrop.show').css('display', 'none');
      //this.clearfunction();
    }
}
