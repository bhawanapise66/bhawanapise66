import { ExportToExcelService } from './../../../services/export-to-excel.service';
import { PdfService } from './../../../services/pdf.service';
// import { EventUi } from './../../../../../../assets/vendor/full-calendar/core/main.d';
import { Paramcls } from './../../../../../../paramcls';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ListService } from './../../../../../../list.service';
import { CryptService } from './../../../services/crypt.service';
import { Router } from '@angular/router';
import { NetworkmodelService } from './../../../../../APIService/networkmodel.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import * as xlsx from 'xlsx';
declare var jQuery: any;
declare var $: any;
import { Subject } from 'rxjs';
declare var jQuery: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
@Component({
  selector: 'app-networkdetail',
  templateUrl: './networkdetail.component.html',
  styleUrls: ['./networkdetail.component.css']
})
export class NetworkdetailComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;
  key: string = 'name'; reverse: boolean = true;

  public loading = false; p: number; pagecount: number = 10; count: number; viewcount: number;
  SelectPageText: string; PlaceOrderDetails$: Object; remarkText: string; deleteText: string; filter: any;

  DivisionupdateText: string; descriptionupdateText: string; employeeupdateText: string; mobilenoupdateText: string;
  dividionidupdate: string;
  officialemailupdateText: string; DesignationupdateText: string;
  DivisionDetails$: Object
  datafromrespo: string;
  itemsPerPage: number = 10;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    // limitTo: this.count,
    height: '200px',
  };
  private _success = new Subject<string>(); successMessageUpdate: string;

  constructor(public excelservice: ExportToExcelService, public pdfservice: PdfService, private networkmodelService: NetworkmodelService, private modalService: NgbModal, private flashMessage: FlashMessagesService, private listService: ListService, private cryptService: CryptService, private router: Router) { }

  ngOnInit() {
    /* ----------------------------------- Wizards start Ts------------------------------------------------- */
    this.count = 0;
    this.viewcount = 0;

    (function ($) {
      $(document).ready(function () {
        $('#vendorName').focus();
        $(".buttonFinish").prop('disabled', false);
        $(".buttonNext").prop('disabled', false);
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
              } else
                if (validateStep4(index, steps) == false) {
                  isStepValid = false;
                }
          return isStepValid;
        }

        function validateStep1(index, steps) {
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
          if (!noofdevice && noofdevice.length <= 0) {
            isValid = false;
            $('#msg_error').html('Please Enter Device No').show();
            $('#noofdevice').focus();
          } else
            if (!mobno && mobno.length <= 0) {
              // validate short code
              isValid = false;
              $('#msg_error').html('Please Enter Mobile No').show();
              $('#Mobno').focus();
            } else if (!Remark && Remark.length <= 0) {
              // validate Official No
              isValid = false;
              $('#msg_error').html('Please Enter Remark').show();
              $('#Remark').focus();
            }

          if (isValid && index == 1) {

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
            //  alert("djhf");
            $(".buttonFinish").prop('disabled', false);
            $('#pername').focus();
            isValid = false;
          }
          return isValid;
        }


        function validateStep2(index, steps) {
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
          if (!personname && personname.length <= 0) {
            isValid = false;
            $('#msg_pername').html('Please Enter Contact Number').show();
            $('#pername').focus();
          } else
            if (!contactNo && contactNo.length <= 0) {
              isValid = false;
              $('#msg_contactNo').html('Please Enter Contact Number').show();
              $('#contactNo').focus();
            } else
              if (!alternateNo && alternateNo.length <= 0) {
                // validate Alternate Number
                isValid = false;
                $('#msg_alternateNo').html('Please Enter Alternate Number').show();
                $('#alternateNo').focus();
              }
              else
                if (!regaddress && regaddress.length <= 0) {
                  // validate Alternate Number
                  isValid = false;
                  $('#msg_regadd').html('Please Enter Reg Address').show();
                  $('#regaddressnew').focus();
                }
                else if (state.length <= 0 && state == 'choose') {
                  // validate state
                  isValid = false;
                  $('#msg_State').html('Please Enter State').show();
                  $('#state').focus();

                } else if (!city && city.length <= 0 && city == 'choose') {
                  // validate city
                  isValid = false;
                  $('#msg_city').html('Please Enter City').show();
                  $('#city').focus();
                } else
                  if (!pinCodeNo && pinCodeNo.length <= 0) {
                    // validate Alternate Number
                    isValid = false;
                    $('#msg_pincode').html('Please Enter Valid Pincode No.').show();
                    $('#alternateNo').focus();
                  }

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

    this.write_privilege = sessionStorage.getItem('writePrivilege');

    if (this.write_privilege == "false") {
      $("#addnewnet").css("display", "none");
      $("#deletebtn").css("display", "none");
      $("#editbtn").css("display", "none");

    }
    this.EncryptPageName();
    this.EncryptPageUrl();
    this.NetworkDetail();
    //  this._success.subscribe((message) => this.successMessageUpdate = message);    

    //  this._success.pipe(
    //    debounceTime(8000)
    //  ).subscribe(() => this.successMessageUpdate = null);

    /* ------------------------------- Wizards end Ts------------------------------------------------- */
  }

  EncryptPageName() {
    this.cryptService.encrypt("Network Details")
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
    // this.Citylist();

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
    (this.write_privilege == "false")
    {
      //kj    $('#editbtn').hide();
    }
  }
  // Updated by Kajal
  divisionListArray = [];
  divisiontxt_id: any;
  subdivision_id: any;


  // Updated by Kajal
  selectdumdivision: string;
  divisiondetail: string;


  networkid1: string;
  networkid: string;
  Networkmodel: any; remarknetworkText: any;
  // Updated by Kajal
  editNetwork() {


    var networkdata = $("#network_id").val();
    var descriptiondata = $('#descriptionentry1').val();
    var remark = $('#remarkupdatenetwork').val();
    this.Networkmodel = networkdata.substring(0, 1).toUpperCase() + networkdata.substring(1);
    this.subDivisionDesc = descriptiondata.substring(0, 1).toUpperCase() + descriptiondata.substring(1);
    this.remarknetworkText = remark.substring(0, 1).toUpperCase() + remark.substring(1);

    var isValid = true;


    if (!networkdata && networkdata.length <= 0) {

      isValid = false;
      $('#msg_errorentry2').html('Please Enter Network').show();
      $('#network_id').focus();
      setTimeout(function () { document.getElementById("msg_errorentry2").style.display = "none"; }, 3000);
    }

    else if (!descriptiondata && descriptiondata.length <= 0 || descriptiondata.length <5) {

      isValid = false;
      $('#msg_errorentry2').html('Please Enter Description').show();
      $('#descriptionentry1').focus();
      setTimeout(function () { document.getElementById("msg_errorentry2").style.display = "none"; }, 3000);
    } else
      if (!remark && remark.length <= 0) {
        isValid = false;
        $('#msg_errorremark').html('Please Enter Remark').show();
        $('#remarkupdatenetwork').focus();
        setTimeout(function () { document.getElementById("msg_errorremark").style.display = "none"; }, 3000);
      }

      else {

        //alert(this.networkid);
        let dataL = {
          remarks: this.remarknetworkText,
          networkId: this.networkid,
          networkName: this.Networkmodel,
          networkDescription: this.subDivisionDesc,

          // param1: "",
          // param2: this.networkid,
          // param3: this.Networkmodel,
          // param4: this.subDivisionDesc,
          pageID: "7",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
        }
        try { AddLoader() } catch (e) { alert(e) }
        this.networkmodelService.UpdateNetworkEditAPI(dataL).subscribe((data) => {
          try { RemoveLoader() } catch (e) { alert(e) }

          this.datafromrespo = data.entity;


          if (data.statuscode == '200') {

            $("#SuccessModal").modal('show');
            this.Refreshfunction();
            this.closemodal();

          }

          else {
            $("#ErrorModal").modal('show');
          }
        });
      }

  }

  clear() {
    this.Networkmodel = "";
    this.subDivisionDesc = "";
    this.remarknetworkText = "";
  }
  // Updated by Kajal
  networkDetailsArray: Object;
  networkDetailsArray1: any;
  NetworkDetail() {

    this.loading = true;

    this.p = 1;
    this.pagecount = 10;
    //  console.log("p" + this.p);
    this.itemsPerPage = this.pagecount;
    let keydata = {
      // param1: this.divisiondetail["param1"],
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
    this.networkmodelService.NetworkDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.list;
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);

        let vendorlist = resdatalist;

        this.networkDetailsArray = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
    this.NetworkDetail1();


  }

  NetworkDetail1() {

    this.loading = true;

    this.p = 1;
    //this.pagecount = 5;


    let keydata = {
      // param1: this.divisiondetail["param1"],
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
    this.networkmodelService.NetworkDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.list;


        let vendorlist = resdatalist;

        this.networkDetailsArray1 = vendorlist;
        this.PrepareExcelData(this.networkDetailsArray1);

        this.loading = false;
      });
  }

  // Updated by Kajal
  division: string;
  subDivision: string;
  subDivisionDesc: string;
  remark: string;
  divisionid: any;
  division_description: any;
  subdivision_name: any;
  subdivision_code: any;
  // subDivisionDesc:any;
  divisiontxt_name: any;
  setdata(com) {
    //  this.devicemap_id = com.param1;
    this.networkid = com.param1;            //
    this.Networkmodel = com.param2;
    this.subDivisionDesc = com.param3;
    this.backdetailsbtn();
  }


  // Updated by Kajal
  Refreshfunction() {
    this.loading = true;

    this.p = 1;
    this.filter = "";
    this.NetworkDetail();
  }
  write_privilege: string;


  createPDF() {
    let pdfTableData;
    let dataArray = []
    for (let i = 0; i < this.networkDetailsArray1.length; i++) {
      pdfTableData = {
        "#": this.networkDetailsArray1[i]["rowNumber"],
        "Network Name": this.networkDetailsArray1[i]["param2"],
        "Description": this.networkDetailsArray1[i]["param3"],

      }
      dataArray.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(dataArray, "Network Details");

  }

  excelData: any = [];
  PrepareExcelData(data) {
    this.excelData = [];

    for (var i = 0; i < data.length; i++) {
      try {
        var obj = {
          "#": i + 1,
          "Network Name": data[i].param2,
          "Description": data[i].param3,
        }
      } catch (e) { }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    this.NetworkDetail1();
    this.excelservice.ExportExcel(this.excelData, 'Network Details', 'networkdetails');

  }

  // Updated by Kajal
  SelectRows() {
    var search = $('#searchData').val();
    var selectrow = $('#selectronet').val();
    // alert(selectrow);
    this.loading = true;
    // alert("selectrow "+ selectrow);
    this.itemsPerPage = selectrow;
    this.p = 1; this.pagecount = selectrow;

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
    this.networkmodelService.NetworkDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.list;


        let vendorlist = resdatalist;
        this.networkDetailsArray = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }


  searchdata() {
    var search = $('#searchData').val();

    this.loading = true;
    this.itemsPerPage = this.pagecount;
    this.p = 1;
    // this.pagecount = 5;


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
    this.networkmodelService.NetworkDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.list;


        let vendorlist = resdatalist;

        this.networkDetailsArray = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;

  }
  NetworkDeletefunction() {
    var isValid = true;
    var deleteremark = $('#networkdelremark').val();
    this.deleteText = deleteremark.substring(0, 1).toUpperCase() + deleteremark.substring(1);

    // Validate Contact Name
    if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      // $('#msg_error_delete').html('Please Enter Remark').show();
      $('#msg_error_delete').html('Please Enter Remark').show();
      $('#networkdelremark').focus();
      setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        param1: this.deleteText,
        param2: this.networkid,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }
      try { AddLoader() } catch (e) { alert(e) }


      this.networkmodelService.DeleteNetworkAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        //  alert(data);
        this.datafromrespo = data.entity;

        if (this.datafromrespo == 'Successfully Deleted.') {
          $("#SuccessModal").modal('show');
          this.Refreshfunction();

          this.closemodal();
        }
        else {
          $("#ErrorModal").modal('show');
        }
      });
      // alert("error in inserting data");
    }
  }

  closemodal() {
    //alert("come ");
    this.deleteText = "";
    this.clear();
    $("#successmodel").modal('hide');

    $('#modeldelete').modal('hide');
    $('#myModalwizard').modal('hide');

    $('.modal-backdrop.show').css('display', 'none');

  }

  NetworkpageChanged(event) {
    this.p = event;
    var selectrow = $('#selectronet').val();
    var search = $('#searchData').val();

    this.loading = true;
    this.itemsPerPage = selectrow;
    this.pagecount = selectrow;

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
    this.networkmodelService.NetworkDetailsAPI(keydata).subscribe(
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
        this.networkDetailsArray = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }

}
