import { PdfService } from './../../services/pdf.service';

 import { ExportToExcelService } from './../../services/export-to-excel.service';
import { PlaceodrmodelService } from './../../../../APIService/placeodrmodel.service';
import { SubDivisionService } from './../../../../APIService/sub-division.service';
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

declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-sub-division-details',
  templateUrl: './sub-division-details.component.html',
  styleUrls: ['./sub-division-details.component.css']
})
export class SubDivisionDetailsComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;
  key: string = 'name'; reverse: boolean = true;

  public loading = false; p: number; pagecount: number=10; count: number; viewcount: number;
  SelectPageText: string; PlaceOrderDetails$: Object; remarkText: string; deleteText: string; filter: any;

  DivisionupdateText: string; descriptionupdateText: string; employeeupdateText: string; mobilenoupdateText: string;
  dividionidupdate: string;
  officialemailupdateText: string; DesignationupdateText: string;
  DivisionDetails$: Object
  datafromrespo: string; submitted=false;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
   // limitTo: this.count,
   height: '200px',
  };
  private _success = new Subject<string>(); successMessageUpdate: string;

  constructor(public pdfservice: PdfService,private modalService: NgbModal, private flashMessage: FlashMessagesService, private postService: PostService, private listService: ListService, private cryptService: CryptService, private router: Router, private subDivService: SubDivisionService
   ,public excelservice: ExportToExcelService)

   {}
  ngOnInit() {
    // (function ($) {
    //   $(document).ready(function () {
    //     $('#myModalwizard').on('shown.bs.modal', function () {
    //       $('#remarkId').focus();
    //     })
    //   });
    // })(jQuery);
    

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
        $("#dummyoption").hide();
        
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

    this.userKey =sessionStorage.getItem('rid')
    this.write_privilege =sessionStorage.getItem('writePrivilege');
    if(this.write_privilege == "false")
    {
      $("#editbtn").css("display", "none");
      $("#deletebtn").css("display", "none");
      $("#addnewsub").css("display", "none");
     $('#editbtn').hide();
     $('.material-icons md-18').css("display", "none");
     $('#deletebtn').attr('disabled','disabled');
     $('#addnewsub').attr('disabled','disabled');
    }
    if(this.userKey == '10' || this.userKey == '11' || this.userKey == '16'|| this.userKey == '21') 
     {
      $('#customerupdatesub_id').focus();
          this.flag1=1;
       this.customername114=true;
       this.customername118=true;
       $("#subdivisioncustentry").show();    
          $("#subidupdate").show();

       
 
     }else{
      $('#remarkId').focus();
       this.flag1=0;
   
       this.customername114=false;
       this.customername118=false;
       $("#subdivisioncustentry").hide();
       $("#subidupdate").hide();
     }
    this.EncryptPageName();
    this.EncryptPageUrl();
    this.divisionList();
    this.SubDivisionDetail();
    //  this._success.subscribe((message) => this.successMessageUpdate = message);    

    //  this._success.pipe(
    //    debounceTime(8000)
    //  ).subscribe(() => this.successMessageUpdate = null);

    /* ------------------------------- Wizards end Ts------------------------------------------------- */
  }
  userKey:any;customername114:boolean;customername118:boolean;write_privilege:string;
  EncryptPageName() {
    this.cryptService.encrypt("Sub Division Details")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }
  editpageform() {
    this.customerList();
  
    this.remarktxt="";
   // alert("click");
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
 //   console.log("KJ Value : "+this.divisiondetail);
    // console.log(this.selectdumdivision);
    // console.log(this.selectdumdivision);
    // console.log();
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
    if(this.write_privilege == "false")
    {
      $('#editbtn').hide();
    }

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
  // Updated by Kajal
  divisionListArray = [];
  divisiontxt_id: any;
  subdivision_id: any;
  divisionList() {

    let dataL = {
      pageNo: "1",
      itemsPerPage: "1000",
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectDivisionListAPI(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      if (response.statuscode == 200) {
        this.divisionListArray = response.entity.list;
      }
    })
  }

  // Updated by Kajal
  selectdumdivision: string;
  divisiondetail: string;
  selectdivisionupdate:string;
  selectdivisionreturn:any='';
  selectsectionupdate:any;

  SelectDivisionData() 
  {
 
    this.divisiontxt_id=this.divisiondetail["param1"];
    
    this.selectdivisionreturn = this.check(this.divisiondetail);

    this.selectsectionupdate = this.divisiondetail["param2"];
  }

  customerListArray:any=[];
  customerList() {
   let dataL = {
     pageNo: "1",
     itemsPerPage: "1000",
     searchBy: "",
     searchType: "",
     totalRecords: "NA",
     pageID: "1",
     pageName: this.encryptedpageNameValue,
     pageURL: this.encryptedpageUrlValue
   }
   
try { AddLoader() } catch (e) { alert(e) }
   this.listService.CustomerListAPI(dataL).subscribe((response) => {
     
try { RemoveLoader() } catch (e) { alert(e) }
     if (response.statuscode == 200) {
       this.customerListArray = response.entity.list;
     }
   })
 }
  getid(data,value){
    try {
    //  alert("datttaaaa"+value);
      if(typeof value === 'object'){
    //    console.log("come in object if")
    //    console.log( value.param1 +"  ====  "+ value.param2);
        return value.param1;
       // return data.param1;
      } 
      else{
        //alert(value)
     //   console.log("come in else")
        var index=data.findIndex(x => x.param2 === value);
        //alert(index)
        return data[index].param1;
      }
    } catch (e) {
      return '';
    }
   
  }
  
  divisionts_id:string;
  // Updated by Kajal
  vensaveeditbtn() {
    this.submitted=true;

    // this.divisionts_id = this.divisiondetail["param1"];
   // console.log("division id : "+this.divisionts_id);
    var division = this.getid(this.divisionListArray,this.divisiondetail);
    // var division = this.getid(this.ListOfDivision,this.Division_Text);
    //  alert("diiiiiiii"+division);
     var divitxt=$("#division").val();
    // alert("diiiiiiii"+divitxt);
    //  this.divisionts_name = this.division["param2"];
    //  this.subdivisionts_id = this.subDivision["param1"];
    //  this.subdivisionts_name = this.subDivision["param2"];
    //  this.subdivisionts_description = this.subDivision["param4"];
    var remardata = $("#remarkId").val();
    var divisiondata = $('#divisiondummy1').val();
    var subdivisiondata = $('#subdivi_id').val();
    var descriptiondata = $('#descriptionentry1').val();
    this.remarktxt = remardata.substring(0, 1).toUpperCase() + remardata.substring(1);
    this.subDivision = subdivisiondata.substring(0, 1).toUpperCase() + subdivisiondata.substring(1);
    this.subDivisionDesc = descriptiondata.substring(0, 1).toUpperCase() + descriptiondata.substring(1);

    var isValid = true;
    if(this.flag1==1 && this.customerupdateid.length <= 0){
      isValid = false;
     // alert("1");
      $('#msg_errorentry4').html('Please Select Customer').show();
     $('#customerupdatesub_id').focus();
      setTimeout(function(){document.getElementById("msg_errorentry4").style.display="none";}, 3000);
    
    }else
    if (!remardata && remardata.length <= 0) {

      isValid = false;
      $('#msg_errorentry4').html('Please Enter Remark').show();
      $('#remarkId').focus();
      setTimeout(function () { document.getElementById("msg_errorentry4").style.display = "none"; }, 3000);
    }
    else
      if (!divisiondata && divisiondata.length <= 0) {

        isValid = false;
        $('#msg_errorentry4').html('Please Enter Division').show();
        $('#divisionid').focus();
           setTimeout(function () { document.getElementById("msg_errorentry4").style.display = "none"; }, 3000);
      }
      else
        if (!subdivisiondata && subdivisiondata.length <= 0) {


          isValid = false;
          $('#msg_errorentry4').html('Please Enter Subdivision').show();
          $('#subdivi_id').focus();
          setTimeout(function () { document.getElementById("msg_errorentry4").style.display = "none"; }, 3000);
        }
        else if (!descriptiondata && descriptiondata.length <= 0) {

          isValid = false;
          $('#msg_errorentry4').html('Please Enter Description').show();
          $('#descriptionentry1').focus();
          setTimeout(function () { document.getElementById("msg_errorentry4").style.display = "none"; }, 3000);
        }

        else {

       //alert( this.subDivisionDesc);
          let dataL = {
            // param1: this.remarktxt,
            // param2: this.subdivision_id,
            // param3: this.subDivision,
            // param4: "",
            // param5: this.subDivisionDesc,
            // param6: division,
            remark:this.remarktxt,
subDivisionId:this.subdivision_id,
subDivisionName:this.subDivision,
subDivisionCode:"",
subDivisionDescription:this.subDivisionDesc,
divisionId:this.divisiontxt_id,
// loginName:"",
// loginPassword:"",
customerId:this.customerupdateid,
            pageID: "7",
            pageName: this.encryptedpageNameValue,
            pageURL: this.encryptedpageUrlValue
          }
         try { AddLoader() } catch (e) { alert(e) }
          this.subDivService.UpdateSubDivision(dataL).subscribe((data) => {
           try { RemoveLoader() } catch (e) { alert(e) }


      this.datafromrespo = data.entity;
    
      if(data.statuscode == '200'){
             
              
             
              $("#SuccessModal").modal('show');
              this.clear();
              this.SubDivisionDetail();
              this.closemodal();

            }

            else {
              $("#ErrorModal").modal('show');
            }
          });
        }

  }


  // Updated by Kajal
  departmentDetailsArray: Object;
  itemsPerPage:number=10;
  SubDivisionDetail() {

    this.loading = true;

    this.p = 1;
    this.itemsPerPage=this.pagecount;
  
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
    this.subDivService.SubDivisionDetails(keydata).subscribe(
      (data) => {
       try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.responsedatalist;
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);

        let vendorlist = resdatalist;

        this.departmentDetailsArray = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
      
      //  console.log(this.count);
        this.loading = false;
      });
      this.SubDivisionDetail1();
  }

// Updated by Kajal
  division: string;
  subDivision: string;
  subDivisionDesc: string;
  remarktxt: string;
  divisionid: any;
  division_description: any;
  subdivision_name: any;
  subdivision_code: any;
  customerupdateid:any;customerentryname:any;customerentrysub:any;
  divisiontxt_name: any;
  setdata(com: Paramcls) {
    //  this.devicemap_id = com.param1;
    this.subdivision_id = com.param1;            //
    this.subDivision = com.param2;
    this.subdivision_code = com.param3;
    this.subDivisionDesc = com.param4;
    this.divisiontxt_id = com.param7;
    this.divisiondetail = com.param8;
    this.customerupdateid = com.param10;
    this.customerentryname = com.param9;
    this.customerentrysub=this.customerentryname;
    this.selectdivisionreturn = this.check(this.divisiondetail);
    this.remarktxt="";
this.backdetailsbtn();
  }

  SelectcustomerData()
  {
    this.customerupdateid=this.customerentrysub["param1"];
   // alert(this.customerupdateid);
    this.customerentryname=this.customerentrysub["param2"];
  }
   clear()
   {
     this.remarktxt="";
     this.divisiondetail="";
     this.subDivision="";
     this.subDivisionDesc="";}

  check(data){
    try {
      if(typeof data === 'object'){
      //  console.log("come in object if")
        return data.param1;
      }
      else if(data == ''){
   //     console.log("come in Else if")
      }
      else {
  //      console.log(data.length)

        return data;
      }
    } catch (e) {
      return '';
    }
 }

// Updated by Kajal
  Refreshfunction() {
    this.loading = true;
this.filter="";
    this.p = 1; 
    this.pagecount = 10;
    //  console.log("p" + this.p);
    this.itemsPerPage=this.pagecount;
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
   this.subDivService.SubDivisionDetails(keydata).subscribe(
    (data)  => {
      try { RemoveLoader() } catch (e) { alert(e) }
        //  alert(JSON.stringify(data));
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        let resdatalist = data.entity.responsedatalist;
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);

        let vendorlist = resdatalist;
        //  let resdatadev = resdata['list'];
        //  console.log(resdatadev);
        //  console.log(vendorlist);
        this.departmentDetailsArray  = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
1      });
  }
  
  createPDF()  {
    let pdfTableData;
    let dataArray = [];
    
if(this.flag1 == 1){
  for (let i = 0; i < this.departmentDetailsArray1.length; i++) {
    pdfTableData = {
      "#":  this.departmentDetailsArray1[i]["rowNumber"],
      "Customer Name": this.departmentDetailsArray1[i]["param9"],
      "Division": this.departmentDetailsArray1[i]["param8"],
     "Sub Division": this.departmentDetailsArray1[i]["param2"],
     
     "Description": this.departmentDetailsArray1[i]["param4"],
   }
   dataArray.push(pdfTableData)
 };
}else{
  for (let i = 0; i < this.departmentDetailsArray1.length; i++) {
    pdfTableData = {
      "#":  this.departmentDetailsArray1[i]["rowNumber"],
      "Division": this.departmentDetailsArray1[i]["param8"],
     "Sub Division": this.departmentDetailsArray1[i]["param2"],
    
     "Description": this.departmentDetailsArray1[i]["param4"],
   }
   dataArray.push(pdfTableData)
 };
}

   
    this.pdfservice.CreatePDFData(dataArray,"Sub Division Details");  
  
  }
  SelectRows(){
  
    var search = $('#searchData').val();
    var selectrow = $('#selectrow3').val();
   // alert(selectrow)
    this.loading = true; 
         // alert("selectrow "+ selectrow);
    this.p = 1; this.pagecount = selectrow;
    this.itemsPerPage=this.pagecount;
  //  console.log("p" + this.p);
    
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

   // Distributor Detail Grid BIND LIST  
   try { AddLoader() } catch (e) { alert(e) }  
   this.subDivService.SubDivisionDetails
   (keydata).subscribe(
    (data)  => {
      try { RemoveLoader() } catch (e) { alert(e) }
      let resdatalist = data.entity.responsedatalist; 
   

       let vendorlist = resdatalist;
     
       this.departmentDetailsArray=vendorlist;
              this.count = data.entity.count;
       this.viewcount = data.entity.viewCount;
     
       this.loading = false; 
    });
}


  searchdata() {
    var search = $('#searchData').val();
    this.loading = true;

    this.p = 1; 
    //this.pagecount = 10;
    //  console.log("p" + this.p);
    this.itemsPerPage=this.pagecount;
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
    this.subDivService.SubDivisionDetails(keydata).subscribe(
      (data)  => {
       try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.responsedatalist;


        let vendorlist = resdatalist;

        this.departmentDetailsArray = vendorlist;
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
  SubDivisionDeletefunction() {
    var isValid = true;
    var deleteremark = $('#subdivisiondelremark').val();
    this.deleteText = deleteremark.substring(0, 1).toUpperCase() + deleteremark.substring(1);

    // Validate Contact Name
    if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      // $('#msg_error_delete').html('Please Enter Remark').show();
      $('#msg_error_delete').html('Please Enter Remark').show();
      $('#subdivisiondelremark').focus();
      setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        param1:this.deleteText,
        param2:this.subdivision_id,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }
     try { AddLoader() } catch (e) { alert(e) }
this.subDivService.DeleteSubDivision(dataL).subscribe((data)=>{
       try { RemoveLoader() } catch (e) { alert(e) }


  this.datafromrespo = data.entity;
    
  if(data.statuscode == '200') {
          $("#SuccessModal").modal('show');
          
          this.SubDivisionDetail();
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
    this.deleteText="";
    $("#successmodel").modal('hide');
    $('#modeldelete').modal('hide');
    $('#myModalwizard').modal('hide');
    $('.modal-backdrop.show').css('display', 'none');
}

 dummyviewcount:number;
  SubDivisionpageChanged(event) {
    this.p = event;
  var p1= $("#selectrow3").val();
  var search = $('#searchData').val();

 // alert(p1);
 
   this.pagecount = p1;
   this.itemsPerPage=this.pagecount;
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
    try { AddLoader() } catch (e) { alert(e) }
 this.subDivService.SubDivisionDetails(keydata).subscribe(
      (data)  => {
        try { RemoveLoader() } catch (e) { alert(e) }

        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        let resdatalist = data.entity.responsedatalist;
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);

        let vendorlist = resdatalist;
        //  let resdatadev = resdata['list'];
        //  console.log(resdatadev);
        //  console.log(vendorlist);
        this.departmentDetailsArray = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
        $("#dummyoption").show();
        // var viewcountdummy =this.viewcount;
        // if(viewcountdummy==5 || viewcountdummy==10 || viewcountdummy==20 || viewcountdummy==50)
        // {

        // }
        // else{
        //   this.dummyviewcount=viewcountdummy;
        //   $("#dummyoption").show();
        // }

        this.loading = false;
      });
  }

  departmentDetailsArray1: any;
  count1:number;
  viewcount1:number;
  SubDivisionDetail1() {
 this.loading = true;
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
    this.subDivService.SubDivisionDetails(keydata).subscribe(
      (data) => {
    try { RemoveLoader() } catch (e) { alert(e) }
       this.departmentDetailsArray1 = data.entity.responsedatalist;
       this.PrepareExcelData(this.departmentDetailsArray1);
       this.loading = false;

      });
  }


  excelData:any=[];
   PrepareExcelData(data){
    this.excelData=[];
    
if(this.flag1 == 1)
{
  for(var i=0;i<data.length;i++){
    try{var obj={
      
      "#":i+1,
      "Customer Name":data[i].param9,
      "Division":data[i].param8,
       "Sub Division":data[i].param2,
      
       "Description":data[i].param4,
      
         
     }}catch(e){}
    this.excelData.push(obj);
  }
}else{
  for(var i=0;i<data.length;i++){
    try{var obj1={
      
      "#":i+1,
      "Division":data[i].param8,
       "Sub Division":data[i].param2,
      
       "Description":data[i].param4,
      
         
     }}catch(e){}
    this.excelData.push(obj1);
  }
}
  
  } 
  flag1:number;
   exportToExcel() {
    this.SubDivisionDetail1();
    this.excelservice.ExportExcel(this.excelData,'Sub Division Details','subdivisiondetails');
  } 
}
