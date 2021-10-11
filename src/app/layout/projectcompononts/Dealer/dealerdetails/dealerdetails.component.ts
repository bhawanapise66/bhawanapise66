import { ExportToExcelService } from './../../services/export-to-excel.service';
import { DealermodelService } from './../../../../APIService/dealermodel.service';
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
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';

declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;


@Component({
  selector: 'app-dealerdetails',
  templateUrl: './dealerdetails.component.html',
  styleUrls: ['./dealerdetails.component.css']
})
export class DealerdetailsComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  private _success = new Subject<string>(); successMessageUpdate: string;

  personnoText: string; personaltnoText: string; personemailText: string; Searchvendor: string;
  datafromrespo: string;
  count: string; viewcount: string; checkBox: any; text: any; deleteText: string;

  public loading = false; p: number; pagecount: number;
  nop: number; totrec: number; outorec: number; filter: any; selectRows: string;

  stringifiedData: any; parsedJson: any; stringifiedresponse: any; parsedJsonresponse: any;
  stringifiedDataList: any; parsedJsonList: any;

  stringifiedDatadist: any; parsedJsondist: any; stringifiedresponsedist: any; parsedJsonresponsedist: any;
  stringifiedDataListdist: any; parsedJsonListdist: any;

  stringifiedDatastat: any; parsedJsonstat: any; stringifiedresponsestat: any; parsedJsonresponsestat: any;
  stringifiedDataListstat: any; parsedJsonListstat: any;

  stringifiedDatacit: any; parsedJsoncit: any; stringifiedresponsecit: any; parsedJsonresponsecit: any;
  stringifiedDataListcit: any; parsedJsonListcit: any;
  //selectRowsText:string;
  distlist$: any; statlist$: any; citlist$: any; dealerdetail$: any; dealerdetailPDF$: any; ListOfCity$: Object; ListOfState$: Object;
  key: string = 'name'; reverse: boolean = true; dealerdetdata: any = [];

  // selectdistributorentry:string; dealernameTextentry:string; gstnoTextentry:string; regaddress1Textentry:string;
  // regaddress2Textentry:string; selectstateentry:string; selectcityentry:string; ContactNameTextentry:string;
  // contactNo1Textentry:string; contactNo2Textentry:string; EmailIDTextentry:string; txtdealerid:string;
  deal_id: string; submitted=false;
  distributor_name: string; dealer_name: string; dealer_gst: string; con_name: string; deal_state: any; deal_city: string; reg_add1: string;
  reg_add2: string; con_mobno: string; altmobno: string; con_email: string; loginNameText: string; loginpasswordText: string; remarkText: string;
  // key: string = 'name'; reverse: boolean = true; config: any; p: number;
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  pageUrl = this.router.url;
  excelData: any[];
  excelpdfData$: any;
  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService,
    private vendormodelservice: VendormodelService, private listService: ListService, private dealerService: DealermodelService,
    private cryptService: CryptService, private router: Router, public pdfservice: PdfService, private excelService: ExportToExcelService) { }

  ngOnInit() {

    /* ------------------------------- Wizards start Ts ------------------------------------------------- */

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
          $('#Distributorupdate').focus();
          $('#msg_error').html('').hide();
          // $('#msg_vendorName').html('').hide();
          // $('#msg_shortcode').html('').hide();
          // $('#msg_OfficialNo').html('').hide();
          // $('#msg_Officialemail').html('').hide();
          var isValid = true;
          var distributorname = $('#distributorupdatedummy').val();
          var dealername = $('#dealernameupdateid').val();
          var state = $('#statedummy').val();
          var city = $('#citydummy').val();
          var add = $('#regaddress2id').val();
          var gstnum = (document.getElementById("gstnoidupdate") as HTMLInputElement).value;
          if (distributorname == null) {
            isValid = false;
            $('#msg_error').html('Please Enter Distributor Name').show();
            $('#Distributorupdate').focus();
            setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
          }
          else
            if (!dealername && dealername.length <= 0 || dealername.length <= 2) {
              // validate short code
              isValid = false;
              $('#msg_error').html('Please Enter Dealer Name').show();
              $('#dealernameupdateid').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
            }
            else if (state == null) {
              // validate Official No
              isValid = false;
              $('#msg_error').html('Please Enter State ').show();
              $('#stateupdate').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
            }
            else if (city == null) {
              // validate Official Email
              isValid = false;
              $('#msg_error').html('Please Enter City').show();
              $('#cityupdate').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
            }
            else if (!add && add.length <= 0 || add.length <= 4) {
              isValid = false;
              $('#msg_error').html('Please Enter Address').show();
              $('#regaddress2id').focus();
              setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
            }
            else if (gstnum.length > 0 && gstnum.length != 15) {
              isValid = false
              $('#msg_error').html('Please Enter Valid GST No').show();
              $('#gstnoidupdate').focus();
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
            $('#pername').focus();
            $(".buttonFinish").prop('disabled', false);
            $(".buttonNext").prop('disabled', true);

            isValid = false;
            console.log(gstnum)
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
          var personname = $('#contactnameid').val();
          var contactNo = $('#contactno1id').val();
          var remark = $('#Remark').val();
          //  var regaddress = $('#regaddressnew').val();
          //  var state = $('#state').val();
          //  var city = $('#city').val();
          //  var pinCodeNo = $('#pincodeno').val();
          // Validate Contact Name
          if (!personname && personname.length <= 0) {
            isValid = false;
            $('#msg_error_contact').html('Please Enter Person Name').show();
            $('#contactnameid').focus();
            setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

          }

          else if (!contactNo && contactNo.length <= 0 || contactNo.length <= 9) {
            // validate state
            isValid = false;
            $('#msg_error_contact').html('Please Enter Contact No').show();
            $('#contactno1id').focus();
            setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

          }
          else if (!remark && remark.length <= 0 || remark.length <= 2) {
            // validate state
            isValid = false;
            $('#msg_error_contact').html('Please Enter Remark ').show();
            $('#Remark').focus();
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
          // alert("success");
          return true;
        }
      });
    })(jQuery);
    this.EncryptPageName();
    this.EncryptPageUrl();
    this.DealerDetail();
    this.DealerPdfDetail();
     this.clearfunction();
    this._success.subscribe((message) => this.successMessageUpdate = message);

    this._success.pipe(
      debounceTime(8000)
    ).subscribe(() => this.successMessageUpdate = null);
    // this.VendorDetail();

    /* ------------------------------- Wizards end Ts------------------------------------------------- */
  }
  EncryptPageName() {
    this.cryptService.encrypt("Dealer Master")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }

  editpageform() {
    document.getElementById("backdetailsbtn").style.display = "block";
    document.getElementById("editbtn").style.display = "none";
    document.getElementById("vendordtls").style.display = "none";
    document.getElementById("container").style.display = "block";
    document.getElementById("modelfooter").style.display = "block";
    document.getElementById("uvmd").style.display = "block";
    document.getElementById("vmd").style.display = "none";
    this.CitylistUpdate();
    this.Statelist();
    this.DistributorList();
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

  DealerDetail() {

    this.p = 1; this.pagecount = 10;


    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue

    }
    try { AddLoader() } catch (e) { alert(e) }

    // Distributor Detail Grid BIND LIST    
    this.dealerService.DealerDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        let resdata = data;
        if (resdata['statuscode'] == '200') {

          let resdatadrp = resdata['entity'];
          // Convert to JSON  
          this.stringifiedData = JSON.stringify(resdatadrp);
          // Parse from JSON  
          this.parsedJson = JSON.parse(this.stringifiedData);
          let resdatadev = resdata['list'];

          // Convert to JSON  
          this.stringifiedDataList = JSON.stringify(this.parsedJson.list);
          // Parse from JSON  
          this.parsedJsonList = JSON.parse(this.stringifiedDataList);

          this.dealerdetail$ = this.parsedJsonList;
          this.dealerdetdata = this.parsedJsonList;

          this.nop = this.parsedJson;
          this.count = data.entity.count;
          this.viewcount = data.entity.viewCount;

        }



      });
  }



  distributorreturn: any = '';
  statereturn: any = '';
  cityreturn: any = '';
  setdata(com) {
    // alert(com);
    let vendordatadetails = com;
    this.deal_id = vendordatadetails.param1
    this.distributor_name = vendordatadetails.param18;
    this.dealer_name = vendordatadetails.param2;
    this.dealer_gst = vendordatadetails.param3;
    this.reg_add1 = vendordatadetails.param4;
    this.reg_add2 = vendordatadetails.param5;
    this.deal_city = vendordatadetails.param6;
    this.deal_state = vendordatadetails.param7;
    this.con_name = vendordatadetails.param8;
    this.con_email = vendordatadetails.param9;
    this.con_mobno = vendordatadetails.param10;
    this.altmobno = vendordatadetails.param11;

    // this.distributorreturn = this.check(this.distributor_name);
    this.distributorreturn = com.param1;
    this.statereturn = this.check(this.deal_state);
    this.cityreturn = this.check(this.deal_city);
    this.backdetailsbtn();
    // alert(vendordatadetails.param4);
   
  }
  distributorlist = [];
  DistributorList() {

    let keydatanet = {
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    // Device Model List BIND LIST    
    this.listService.DistributorListAPI(keydatanet).subscribe((datanet) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      let resdatanet = datanet;
      if (resdatanet['status'] == true) {
        this.distributorlist = datanet.entity.list;
        for(let i=0;i<this.distributorlist.length;i++){

          if(this.distributor_name ==this.distributorlist[i].param2){
            this.distributor_name = this.distributorlist[i]
          }
          
        }
      }
    });
  }
  distributorcheck() {
    this.distributorreturn = this.distributor_name["param1"];
  }
  CitylistCheck() {
    this.cityreturn = this.check(this.deal_city);
  }
  ListOfCity = [];
  statelistid: string;
  CitylistUpdate() {
    this.statereturn = this.check(this.deal_state);
    this.statelistid = this.deal_state.param1;

    //alert(state);
    let keydata = {
      param1: this.deal_state.param1,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.SelectCityListAPI(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      let resdatalist = data.entity.list;
      let citylist = resdatalist;
      this.ListOfCity = citylist;
      this.loading = false;

    });
  }
  /*-------------List of City Api ---------------*/

  /*-------------List of State Api ---------------*/
  ListOfState = [];
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
        let resdatalist = data.entity.list;

        let statelist = resdatalist;
        this.ListOfState = statelist;

        this.loading = false;

      });
  }


  dealsaveeditbtn() {
    this.submitted = true;
    if (this.con_name == '' || this.con_name == null || this.con_name.length < 3) {
      $('#msg_error_contact').html('Please Enter Valid Contact name ').show();
      $('#contactnameid').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
    }
    else if (this.con_mobno == '' || this.con_mobno == null || this.con_mobno.length < 10) {
      $('#msg_error_contact').html('Please Enter Valid Contact Number ').show();
      $('#contactno1id').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
    }
    else if (this.altmobno != '' && this.altmobno.length < 10 || this.altmobno.length > 12) {
      $('#msg_error_contact').html('Please Enter Valid Alternate Number ').show();
      $('#contactno2id1').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
    }
    else if (this.con_email != '' &&( this.con_email.includes('@') == false || this.con_email.includes(".") == false)) {
      $('#msg_error_contact').html('Please Enter Valid Email Id ').show();
      $('#emailIdid1').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
    }
    else if (this.remarkText == '' || this.remarkText == null || this.remarkText.length < 10) {
      $('#msg_error_contact').html('Please Enter Remark ').show();
      $('#Remark').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);
    }
    else {


      var distributor = this.getid(this.distributorlist, this.distributor_name);
      var state = this.getid(this.ListOfState, this.deal_state);
      var city = this.getid(this.ListOfCity, this.deal_city);
      this.dealer_name = this.dealer_name.substring(0, 1).toUpperCase() + this.dealer_name.substring(1);
      this.reg_add2 = this.reg_add2.substring(0, 1).toUpperCase() + this.reg_add2.substring(1);
      this.con_name = this.con_name.substring(0, 1).toUpperCase() + this.con_name.substring(1);

      let dataL = {
        param1: this.remarkText,
        param2: this.deal_id,
        param3: this.dealer_name,
        param4: this.dealer_gst,
        param5: this.reg_add2,
        param6: this.reg_add2,
        param7: city,
        param8: state,
        param9: this.con_name,
        param10: this.con_email,
        param11: this.con_mobno,
        param12: this.altmobno,
        param13: "",
        param14: distributor,
        param15: "",
        param16: "",
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }

      this.dealerService.UpdatedealerEditAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        //  alert(data);
        this.datafromrespo = data.entity;

        if (data.statuscode = 200) {
          this.DealerDetail();
          $("#SuccessModal").modal('show');
          this.closemodal(); this.clearfunction();
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

    this.p = 1; this.pagecount = 10;
    //  console.log("p" + this.p);

    let keydata = {
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
    this.dealerService.DealerDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        let resdatalist = data.entity.list;


        let vendorlist = resdatalist;

        this.dealerdetail$ = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

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
    this.dealerService.DealerDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.list;


        let vendorlist = resdatalist;

        this.dealerdetail$ = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }




  DealerPdfDetail() {

    let keydata = {
      pageNo: "",
      itemsPerPage: "",
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue

    }
    try { AddLoader() } catch (e) { alert(e) }

    // Distributor Detail Grid BIND LIST    
    this.dealerService.DealerDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        let resdata = data;
        if (resdata['statuscode'] == '200') {
          this.excelpdfData$ = data.entity.list;
          this.PrepareExcelData(this.excelpdfData$);
        }
      });
  }

  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": data[i]['rowNumber'],
        "Distributor Name": data[i]["param18"],
        "Dealer Name": data[i]["param2"],
        "GST No": data[i]["param3"],
        "Address": data[i]["param4"],
        "Contact Name": data[i]["param8"],
        "Contact No.": data[i]["param10"],
        "EmailID": data[i]["param9"]
      }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
     this.excelService.ExportExcel(this.excelData, "Dealer Details", 'dealerdetails')
  }

  createPDF() {
     let pdfTableData;
    let dataArray = []
    for (let i = 0; i < this.excelpdfData$.length; i++) {
      pdfTableData = {
        "#": i + 1,
        "Distributor Name": this.excelpdfData$[i]["param18"],
        "Dealer Name": this.excelpdfData$[i]["param2"],
        "GST No": this.excelpdfData$[i]["param3"],
        "Address": this.excelpdfData$[i]["param4"],
        "Contact Name": this.excelpdfData$[i]["param8"],
        "Contact No.": this.excelpdfData$[i]["param10"],
        "EmailID": this.excelpdfData$[i]["param9"]
      }
      dataArray.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(dataArray, "Dealer Details");

  }

  selectRowsText: string = '10';
  Refreshfunction() {
    this.filter = "";
    this.selectRowsText = '10';
    this.loading = true;

    this.p = 1; this.pagecount = 10;
    //  console.log("p" + this.p);

    let keydata = {
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
    this.dealerService.DealerDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        let resdatalist = data.entity.list;
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);

        let vendorlist = resdatalist;
        //  let resdatadev = resdata['list'];
        //  console.log(resdatadev);
        //  console.log(vendorlist);
        this.dealerdetail$ = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }

  VendorMasterpageChanged(event) {
    this.p = event; this.pagecount = 10;
    //  console.log("p" + this.p);

    let keydata = {
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
    this.dealerService.DealerDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        let resdatalist = data.entity.list;

        let vendorlist = resdatalist;
        this.dealerdetail$ = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }


  //sorting
  sort(key) {

    //  alert(key);

    this.key = key;
    this.reverse = !this.reverse;

  }

  DealerDeletefunction() {
    var isValid = true;
    var deleteremark = $('#vendelremark').val();
    // Validate Contact Name
    if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      // $('#msg_error_delete').html('Please Enter Remark').show();
      this._success.next('Please Enter Remark.');
      $('#vendelremark').focus();
    }
    else {
      let dataL = {
        param1: deleteremark,
        param2: this.deal_id,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }
      try { AddLoader() } catch (e) { alert(e) }

      this.dealerService.DeleteDealerAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        //  alert(data);
        this.datafromrespo = data.entity;

        if (data.statuscode == 200) {
          $("#SuccessModal").modal('show');
          this.DealerDetail();
          this.closemodal();
        }
        else {
          $("#ErrorModal").modal('show');
        }
        // if (this.datafromrespo == 'Successfully Updated.') {
        //   this.DealerDetail();
        //   $("#SuccessModal").modal('show');

        // }
        // else {
        //   $("#ErrorModal").modal('show');
        // }
      });
      // alert("error in inserting data");
    }
  }
  closemodal() {
    //alert("come ");
    this.deleteText = "";
    $("#successmodel").modal('hide');

    $('#modeldelete').modal('hide');
    $('#myModalwizard').modal('hide');

    $('.modal-backdrop.show').css('display', 'none');
    this.clearfunction();
  }

  check(data) {
    try {
      if (typeof data === 'object') {
        //    console.log("come in object if")
        return data.param1;
      }
      else if (data == '') {
        //    console.log("come in else if ");
      }
      else {
        //      console.log(data.length)
        return data;
      }
    } catch (error) {
      return '';
    }
  }

  getid(data, value) {
    try {
      if (typeof value === 'object') {
        //   console.log("come in object if")
        //   console.log(value.param1 + "  ====  " + value.param2);
        return value.param1;
        // return data.param1;
      }
      else {
        //alert(value)
        //  console.log("come in else")
        var index = data.findIndex(x => x.param2 === value);
        //alert(index)
        return data[index].param1;
      }
    } catch (e) {
      return '';
    }

  }

  clearfunction() {

    this.distributor_name = ""; this.distributorreturn = ""; this.dealer_name = ""; this.dealer_gst = ""; this.deal_state = "";
    this.statereturn = ""; this.deal_city = ""; this.cityreturn = ""; this.reg_add2 = ""; this.con_name = ""; this.con_mobno = "";
    this.con_email = ""; this.remarkText = ""; this.loginNameText = "";

  }
}
