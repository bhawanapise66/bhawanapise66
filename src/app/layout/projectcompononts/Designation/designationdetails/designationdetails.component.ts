import { DesignationmodelService } from './../../../../APIService/designationmodel.service';
import { PlaceodrmodelService } from './../../../../APIService/placeodrmodel.service';
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
import * as $ from 'jquery';
import * as xlsx from 'xlsx'
import { CryptService } from '../../services/crypt.service';
import { PdfService } from '../../services/pdf.service';
import { ExportToExcelService } from '../../services/export-to-excel.service';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-DesignationDetails',
  templateUrl: './designationdetails.component.html',
  styleUrls: ['./designationdetails.component.css']
})
export class DesignationdetailsComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;write_privilege:string;
  public loading = false; p: number; pagecount: number; count: number; viewcount: number;
  SelectPageText: string; PlaceOrderDetails$: Object; remarkText: string; deleteText: string;
  private _success = new Subject<string>(); successMessageUpdate: string;
  datafromrespo: string; datafromrespoupdate: string;
  RemarkupdateText: string;
  key: string = 'name'; reverse: boolean = true;
  filter: any;
  remarkempty: boolean = false; submitted=false;


  DesignationupdateText: string; descriptionupdateText: string; employeeupdateText: string;
  mobilenoupdateText: string; officialemailupdateText: string;

  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService, private postService: PostService,
    private listService: ListService, private cryptService: CryptService, private router: Router,
    private designationService: DesignationmodelService, private placeodrService: PlaceodrmodelService
    , public pdfservice: PdfService, public excelservice: ExportToExcelService) { }

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
            alert("djhf");
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

    this.write_privilege =sessionStorage.getItem('writePrivilege');

    if(this.write_privilege == "false")
    {
   
      $("#editbtn").css("display", "none");
      $("#deletebtn").css("display", "none");
      $("#addnewdes").css("display", "none");
     $('#editbtn').hide();
     $('.material-icons md-18').css("display", "none");
     $('#deletebtn').attr('disabled','disabled');
     $('#addnewdes').attr('disabled','disabled');
    }
    this.EncryptPageName();
    this.EncryptPageUrl();

    this.DesignationDetail(); this.clearfunction();
    //  this._success.subscribe((message) => this.successMessageUpdate = message);    

    //  this._success.pipe(
    //    debounceTime(8000)
    //  ).subscribe(() => this.successMessageUpdate = null);

    /* ------------------------------- Wizards end Ts------------------------------------------------- */
  }

  EncryptPageName() {
    this.cryptService.encrypt("Designation Details")
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
    if(this.write_privilege == "false")
    {
      $('#editbtn').hide();
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
    //  document.getElementById("bankdtls").style.display="none";
    //  document.getElementById("customerdtls").style.display="none";
    if(this.write_privilege == "false")
    {
      $('#editbtn').hide();
    }

  }

  DesignationDetails$: any; excelpdfDetails$: any;
  itemsPerPage: number = 10;
  DesignationDetail() {

    this.loading = true;

    this.p = 1;  
    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.itemsPerPage,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.designationService.DesignationDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        let resdatalist = data.entity.list;
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);

        let vendorlist = resdatalist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
        this.DesignationDetails$ = vendorlist;

        this.DesignationPDFDetail();
      });
  }




  vensaveeditbtn() {
    this.submitted=true;
    var isValid = true;
    var designation = $('#Designationupdate').val();
    var description = $('#Descriptionupdate').val();
    var remark = $('#employeeremarkupdate').val();
    this.DesignationupdateText = this.DesignationupdateText.substring(0, 1).toUpperCase() + this.DesignationupdateText.substring(1);
    this.descriptionupdateText = this.descriptionupdateText.substring(0, 1).toUpperCase() + this.descriptionupdateText.substring(1);
    this.RemarkupdateText = this.RemarkupdateText.substring(0, 1).toUpperCase() + this.RemarkupdateText.substring(1);

    // alert(personname);
    if (!designation && designation.length <= 0) {
      isValid = false;
      $('#msg_error_contact').html('Please Enter Designation Name').show();
      $('#Designationupdate').focus();
      setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

    }
    else
      if (!description && description.length <= 0) {
        isValid = false;
        $('#msg_error_contact').html('Please Enter Description').show();
        $('#Descriptionupdate').focus();
        setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

      }
      else
        if (!remark && remark.length <= 0) {
          isValid = false;
          $('#msg_error_contact').html('Please Enter Remark').show();
          $('#employeeremarkupdate').focus();
          setTimeout(function () { document.getElementById("msg_error_contact").style.display = "none"; }, 3000);

        }
        else {
          let dataL = {
            param1: remark,
            param2: this.designationidupdate,
            param3: this.DesignationupdateText, param4: this.descriptionupdateText, param5: this.employeeupdateText, param6: this.mobilenoupdateText, param7: this.officialemailupdateText,
            param8: "", param9: "",
            // param11:"", param12:"", 

            pageID: "7",
            pageName: this.encryptedpageNameValue,
            pageURL: this.encryptedpageUrlValue
          }
          try { AddLoader() } catch (e) { alert(e) }
          this.designationService.UpdatedesignationEditAPI(dataL).subscribe((data) => {
            try { RemoveLoader() } catch (e) { alert(e) }
            //  alert(data);
            this.datafromrespo = data.entity;


            if (this.datafromrespo == 'Successfully updated.') {
              $("#SuccessModal").modal('show');
              this.DesignationDetail(); this.clearfunction();
            }
            else {
              $("#ErrorModal").modal('show');
            }

          });
          //alert("error in inserting data");
        }
  }

  designationidupdate: string;
  setdata(com) {
    this.backdetailsbtn();
    // alert(com);
    let designationdatadetails = com;
    this.designationidupdate = designationdatadetails.param1;
    this.DesignationupdateText = designationdatadetails.param2;
    this.descriptionupdateText = designationdatadetails.param3;
    this.employeeupdateText = designationdatadetails.param6;
    this.mobilenoupdateText = designationdatadetails.param8;
    this.officialemailupdateText = designationdatadetails.param9;
    // this.DesignationupdateText = designationdatadetails.param17; 
    this.backdetailsbtn();
    // alert(vendordatadetails.param4);
  }

  DesignationDeletefunction() {
    var isValid = true;
    var deleteremark = $('#designationdelremark').val();
    deleteremark = deleteremark.substring(0, 1).toUpperCase() + deleteremark.substring(1);
    // Validate Contact Name
    if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      // $('#msg_error_delete').html('Please Enter Remark').show();
      $('#msg_error_delete').html('Please Enter Remark').show();
      $('#designationdelremark').focus();
      setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        param1: deleteremark,
        param2: this.designationidupdate,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }
      try { AddLoader() } catch (e) { alert(e) }
      this.designationService.DeletedesignationEditAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        //  alert(data);
        this.datafromrespo = data.entity;

        if (this.datafromrespo == 'Successfully deleted.') {
          $("#SuccessModal").modal('show');
          this.deleteText = "";
          this.closemodal();
          this.DesignationDetail(); this.clearfunction();

          //  $('#modeldelete').modal('toggle');
        }
        else {
          $("#ErrorModal").modal('show');
        }
      });
      // alert("error in inserting data");
    }
  }
  closedelete() {
    this.deleteText = "";
  }

  closemodal() {
    // alert("come ");
    this.RemarkupdateText = "";
    $("#SuccessModel").modal('hide');

    $('#modeldelete').modal('hide');
    $('#myModalwizard').modal('hide');

    $('.modal-backdrop.show').css('display', 'none');
    this.clearfunction();
  }

  DesignationMasterpageChanged(event) {
    this.p = event; this.pagecount = $("#selectrow1").val();
    //  console.log("p" + this.p);
    this.itemsPerPage = this.pagecount;
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
    this.designationService.DesignationDetailsAPI(keydata).subscribe(
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
        this.DesignationDetails$ = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }
  Refreshfunction() {
    this.loading = true;
    this.filter = "";this.itemsPerPage=10
    this.p = 1;  
      let keydata = {
      pageNo: this.p,
      itemsPerPage: this.itemsPerPage,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.designationService.DesignationDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        //  alert(JSON.stringify(data));
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        let resdatalist = data.entity.list;
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);

        let vendorlist = resdatalist;
        //  let resdatadev = resdata['list'];
        //  console.log(resdatadev);
        //  console.log(vendorlist);
        this.DesignationDetails$ = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }

  DesignationPDFDetail() {

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
    this.designationService.DesignationDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.excelpdfDetails$ = data.entity.list;
        this.PrepareExcelData(this.excelpdfDetails$);
      });
  }

  createPDF() {
    let pdfTableData;
    let dataArray = []
    for (let i = 0; i < this.DesignationDetails$.length; i++) {
      pdfTableData = {
        "#": i + 1,
        "Designation": this.DesignationDetails$[i]["param2"],
        "Description": this.DesignationDetails$[i]["param3"]
      }
      dataArray.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(dataArray, "Designation Details");

  }

  excelData: any = [];
  PrepareExcelData(data) {
    this.excelData = [];

    for (var i = 0; i < data.length; i++) {
      try {
        var obj = {

          "#": i + 1,
          "Designation": data[i].param2,
          "Description": data[i].param3

        }
      } catch (e) { }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'Designation Details', 'designationdetails');
  }

  SelectRows() {

    this.p = 1;  
    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.designationService.DesignationDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.list;


        let vendorlist = resdatalist;

        this.DesignationDetails$ = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }
  searchdata() {
    this.p = 1;

    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.designationService.DesignationDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.list;


        let vendorlist = resdatalist;

        this.DesignationDetails$ = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }

  sort(key) {

    //  alert(key);

    this.key = key;
    this.reverse = !this.reverse;

  }

  clearfunction() {
    this.DesignationupdateText = ""; this.descriptionupdateText = ""; this.RemarkupdateText = "";
  }

}
