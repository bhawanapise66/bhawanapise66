import { DivisionmodelService } from './../../../../APIService/divisionmodel.service';
import { PlaceodrmodelService } from './../../../../APIService/placeodrmodel.service';
import { Router } from '@angular/router';
//import { DevicemodelService } from './../../../../../devicemodel.service';
import { ListService } from './../../../../../list.service';
import { PostService } from './../../../../../post.service';
import { Paramcls } from './../../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit , ElementRef, ViewChild } from '@angular/core';
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
declare var AddLoader:any;
declare var RemoveLoader:any;


@Component({
  selector: 'app-divisiondetails',
  templateUrl: './divisiondetails.component.html',
  styleUrls: ['./divisiondetails.component.css']
})
export class DivisiondetailsComponent implements OnInit {
  @ViewChild('epltable',{ static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  
  pageUrl = this.router.url;
  key: string = 'name'; reverse: boolean = true; 

  public loading = false; p: number;   pagecount:number; count:number; viewcount:number;
  SelectPageText:string;  PlaceOrderDetails$:Object;  remarkText:string; deleteText:string;filter:any;

  DivisionupdateText:string; descriptionupdateText:string; employeeupdateText:string; mobilenoupdateText:string; 
  dividionidupdate:string; 
  officialemailupdateText:string;  DesignationupdateText:string;
  DivisionDetails$:any; excelpdfDetails1:any=[];
  datafromrespo:string; submitted= false;

  private _success = new Subject<string>();  successMessageUpdate: string;
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo:20000,
    height: '200px',
  };
  constructor(private modalService: NgbModal,private flashMessage: FlashMessagesService , private postService:PostService,
    private listService:ListService, private cryptService:CryptService,private router:Router ,
    private divisionService:DivisionmodelService, private placeodrService:PlaceodrmodelService , public pdfservice: PdfService
    , public excelservice: ExportToExcelService) { }
    userKey:any;customername144:boolean;customername188:boolean;flag1:number;
  ngOnInit()  {
    /* ----------------------------------- Wizards start Ts------------------------------------------------- */
    this.count = 0;
    this.viewcount = 0;

    (function ($) {
      $(document).ready(function() {
        $('#vendorName').focus();
        $(".buttonFinish").prop('disabled', false);
        $(".buttonNext").prop('disabled', false);
        $("#step-14").show();
        $("#step-15").hide();
        $("#step-16").hide();
        $("#step-17").hide();
        function setClasses(index, steps) {
          if (index < 0 || index > steps) return;
          if(index == 0) {
            $(".buttonPrevious").prop('disabled', true);
          } else {
            $(".buttonPrevious").prop('disabled', false);
          }
          if(index == steps) {
            $(".buttonPreviousNext").text('done');
          } else {
            $(".buttonPreviousNext").text('next');
          }
          $(".step-wizard ul li").each(function() {
            $(this).removeClass();
          });
          $(".step-wizard ul li:lt(" + index + ")").each(function() {
            $(this).addClass("done");
          });
          $(".step-wizard ul li:eq(" + index + ")").addClass("active")
          var p = index * (100 / steps);
          $("#prog").width(p + '%');
        }
        $(".step-wizard ul button").click(function() {
          var step = $(this).find("div.step")[0].innerText; 
          var steps = $(".step-wizard ul li").length; 
          validateAllSteps(step- 1 , steps);
        });
        $("#prev").click(function(){
          var step = $(".step-wizard ul li.active div.step")[0].innerText;
          var steps = $(".step-wizard ul li").length; 
          setClasses(step - 2, steps - 1);
          displayreviousSection(step - 1);   
        });
        $("#next").click(function(){
          if ($(this).text() == 'done') {
           // alert("submit the form?!?")
          } else {
            var step ;
            try {
              step = $(".step-wizard ul li.active div.step")[0].innerText; 
            } catch (error) {
              step = $(".step-wizard ul li div.step")[0].innerText; 
            }
            
            var steps = $(".step-wizard ul li").length;   
            validateAllSteps(step , steps- 1);   
            //setClasses(step, steps - 1);
          }
        });
        
        // initial state setup
       setClasses(0, $(".step-wizard ul li").length);
       
        function displayreviousSection(index){
          
        $(".buttonNext").prop('disabled', false);
          switch(index) {
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
    
        function validateAllSteps(index, steps){
          var isStepValid = true;
          
                    
          if(validateStep1(index, steps) == false){
            isStepValid = false;       
          }else
          if(validateStep2(index, steps) == false){
            isStepValid = false;       
          }else
          if(validateStep3(index, steps) == false){
            isStepValid = false;        
          }else
           if(validateStep4(index, steps) == false){
            isStepValid = false;        
          }
          return isStepValid;
       }
    
       function validateStep1(index, steps){
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
         if(!noofdevice && noofdevice.length <= 0){
           isValid = false;
           $('#msg_error').html('Please Enter Device No').show();
           $('#noofdevice').focus();
         }else 
         if(!mobno && mobno.length <= 0){
          // validate short code
           isValid = false;
           $('#msg_error').html('Please Enter Mobile No').show(); 
           $('#Mobno').focus();        
         }else if(!Remark && Remark.length <= 0 ){
          // validate Official No
          isValid = false;
          $('#msg_error').html('Please Enter Remark').show(); 
          $('#Remark').focus();        
        }
        
        if(isValid && index==1 ){  
          
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
       
         $(".buttonFinish").prop('disabled', false);
         $('#pername').focus();
         isValid = false;   
        }
         return isValid;
      }
    
    
      function validateStep2(index, steps){
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
         if(!personname && personname.length <= 0){
          isValid = false;
          $('#msg_pername').html('Please Enter Contact Number').show();
          $('#pername').focus();
        }else
         if(!contactNo && contactNo.length <= 0){
           isValid = false;
           $('#msg_contactNo').html('Please Enter Contact Number').show();
           $('#contactNo').focus();
         }else
         if(!alternateNo && alternateNo.length <= 0){
          // validate Alternate Number
           isValid = false;
           $('#msg_alternateNo').html('Please Enter Alternate Number').show(); 
           $('#alternateNo').focus();        
         }
         else
         if(!regaddress && regaddress.length <= 0){
          // validate Alternate Number
           isValid = false;
           $('#msg_regadd').html('Please Enter Reg Address').show(); 
           $('#regaddressnew').focus();        
         }
         else if(state.length <= 0 && state == 'choose'){ 
          // validate state
           isValid = false;
           $('#msg_State').html('Please Enter State').show();     
           $('#state').focus();   
    
         }else if(!city && city.length <= 0 && city == 'choose' ){
          // validate city
          isValid = false;
          $('#msg_city').html('Please Enter City').show(); 
          $('#city').focus();        
        }else
        if(!pinCodeNo && pinCodeNo.length <= 0){
         // validate Alternate Number
          isValid = false;
          $('#msg_pincode').html('Please Enter Valid Pincode No.').show(); 
          $('#alternateNo').focus();        
        }
    
        if(isValid && index==2){  
         
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
    
    
      function validateStep3(index, steps){
             
        $('#accountNo').focus();
         var isValid = true;    
         var accountNo = $('#accountNo').val();
         $('#msg_accountNo').html('').hide();
         // Validate Account No
         if(!accountNo && accountNo.length <= 0){
           isValid = false;
           $('#msg_accountNo').html('Please Enter Account Number').show();
           $('#accountNo').focus();
         }
        if(isValid && index==3){  
         
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
      function validateStep4(index, steps){  
       // alert("success");
        return true;
      }
      });
    })(jQuery);

    this.userKey =sessionStorage.getItem('rid');
    this.write_privilege =sessionStorage.getItem('writePrivilege');
   if(this.write_privilege == "false")
   {
    $("#editbtn").css("display", "none");
    $("#deletebtn").css("display", "none");
    $("#addnew").css("display", "none");
    $('#editbtn').attr('disabled','disabled');
    $('#deletebtn').attr('disabled','disabled');
    $('#addnew').attr('disabled','disabled');
    $('.material-icons md-18').css("display", "none");
   }
    
    if(this.userKey == '10' || this.userKey == '11' || this.userKey == '16'|| this.userKey == '21') 
     {
      
          this.flag1=1;
       this.customername144=true;
       this.customername188=true;
       $("#updatecustid").show();
       $("#viewidcust").show();

       

 
     }else{
       this.flag1=0;
   
       this.customername144=false;
       this.customername188=false;
       $("#updatecustid").hide();
       $("#viewidcust").hide();

     }
    this.EncryptPageName();
    this.EncryptPageUrl();

    this.DivisionDetail(); this.clearfunction();
  //  this._success.subscribe((message) => this.successMessageUpdate = message);    
      
  //  this._success.pipe(
  //    debounceTime(8000)
  //  ).subscribe(() => this.successMessageUpdate = null);
 
/* ------------------------------- Wizards end Ts------------------------------------------------- */
  }
  write_privilege:string;
  EncryptPageName() {
    this.cryptService.encrypt("Division Details")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
  //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }
  editpageform(){
    this.customerList();
    document.getElementById("backdetailsbtn").style.display="block";
    document.getElementById("editbtn").style.display="none";
   // document.getElementById("customerdtls").style.display="none";
   // document.getElementById("bankdtls").style.display="none";
    document.getElementById("vendordtls").style.display="none";
  //  document.getElementById("rev2btn").style.display="none";
  //  document.getElementById("revbtn").style.display="none";
  //  document.getElementById("nextviewbtn").style.display="none";
  //  document.getElementById("next2viewbtn").style.display="none";
    document.getElementById("container").style.display="block";
    document.getElementById("modelfooter").style.display="block";
    document.getElementById("uvmd").style.display="block";
    document.getElementById("vmd").style.display="none";
   // this.Citylist();
   if(this.write_privilege == "false")
   {
    $("#editbtn").css("display", "none");
   }
  }
  backdetailsbtn(){
    document.getElementById("uvmd").style.display="none";
    document.getElementById("vmd").style.display="block";
    document.getElementById("backdetailsbtn").style.display="none";
    document.getElementById("editbtn").style.display="block";
   // document.getElementById("customerdtls").style.display="block";
   // document.getElementById("bankdtls").style.display="block";
    document.getElementById("vendordtls").style.display="block";
    document.getElementById("modelfooter").style.display="none";
  //  document.getElementById("rev2btn").style.display="none";
  //  document.getElementById("revbtn").style.display="none";
  //  document.getElementById("nextviewbtn").style.display="block";
  //  document.getElementById("next2viewbtn").style.display="none";
    document.getElementById("container").style.display="none";
  //  document.getElementById("bankdtls").style.display="none";
  //  document.getElementById("customerdtls").style.display="none";
  if(this.write_privilege == "false")
   {
    $("#editbtn").css("display", "none");
   }
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
  vensaveeditbtn(){
  //  alert("2");
  this.submitted= true;
//alert(this.customerupdateTextid);
      var divisionname = $("#Divisionupdate").val();
      var description = $("#Descriptionupdate").val();
      // this.DivisionupdateText = divisionname.substring(0, 1).toUpperCase() + divisionname.updateText.substring(1);
      // this.descriptionupdateText = description.substring(0, 1).toUpperCase() + description.substring(1);
       var isValid = true;
      if(this.flag1==1 && this.customerupdateTextname.length <= 0){
        isValid = false;
       // alert("1");
        $('#msg_errorentrycust').html('Please Select Customer').show();
       $('#customerupdateid').focus();
        setTimeout(function(){document.getElementById("msg_errorentrycust").style.display="none";}, 3000);
      
      }else
      if(!divisionname && divisionname.length <= 0){
      //  alert("2");
        isValid = false;
        $('#msg_errorentrycust').html('Please Enter Division').show();
       $('#Divisionupdate').focus();
        setTimeout(function(){document.getElementById("msg_errorentrycust").style.display="none";}, 3000);
      }
      else if(!description && description.length <= 0){
     //   alert("3");

        // alert(devicetype);
        isValid = false;
        $('#msg_errorentrycust').html('Please Enter Description ').show();
       $('#Descriptionupdate').focus();
        setTimeout(function(){document.getElementById("msg_errorentrycust").style.display="none";}, 3000);
      }
    else {
      let dataL = {
        remark:"",
        divisionId:this.dividionidupdate,
        divisionName:this.DivisionupdateText,
        divisionCode:"",
        divisionDescription:this.descriptionupdateText,
        personName:this.employeeupdateText,
        personMobileNo:this.mobilenoupdateText, 
        personEmailId:this.officialemailupdateText, 
        personAddress:"",
        personPincode:"",
        loginName:"", 
        loginPassword:"",
        customerId:this.customerupdateTextid, 
        
         pageID: "7",
         pageName: this.encryptedpageNameValue,
         pageURL: this.encryptedpageUrlValue
          }
          try{AddLoader()}catch(e){alert(e)} 

    this.divisionService.UpdatedivisionAPI(dataL).subscribe((data)=>{
      try{RemoveLoader()}catch(e){alert(e)} 

  //  alert(data);
    this.datafromrespo = data.entity;
    
    if(data.statuscode == '200')
    {
      this.DivisionDetail(); this.clearfunction();
    $("#SuccessModal").modal('show');
    this.closemodal();
    }
    else
    {
     $("#ErrorModal").modal('show');
    }
    
    });
    //alert("error in inserting data");
    }
  }
  customerupdate:string;

  SelectcustomerDataupdate()
  {
    this.customerupdateTextid=this.customerupdateTextname["param1"];
   // alert(this.customerupdateTextid);
    this.customerupdate=this.customerupdateTextname["param2"];
  }
  DivisionDetail() {
       
    this.loading = true; 
        
    this.p = 1; this.pagecount = 10;
  //  console.log("p" + this.p);
    this.itemsPerPage=this.pagecount;
    let keydata = {
      pageNo:this.p,
      itemsPerPage:this.pagecount,    
      searchBy: "", 
      searchType:"",
      totalRecords:"NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try{AddLoader()}catch(e){alert(e)} 

     // Distributor Detail Grid BIND LIST    
     this.divisionService.DivisionDetailsAPI(keydata).subscribe(
      (data)  => {
        try{RemoveLoader()}catch(e){alert(e)} 

      //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        let resdatalist = data.entity.responsedatalist; 
       //  this.resdata = 
       // console.log("wekcome_ "+resdata);
 
         let vendorlist = resdatalist;
         this.count = data.entity.count;
         this.viewcount = data.entity.viewCount;
         this.DivisionDetails$ = vendorlist;
       
         this.DivisionPDFDetail(); 
      });
}



setdata(com ){
  // alert(com);
   let divisiondatadetails = com;
   this.dividionidupdate = divisiondatadetails.param1;
   this.DivisionupdateText = divisiondatadetails.param2;
   this.descriptionupdateText =  divisiondatadetails.param4;
   this.employeeupdateText = divisiondatadetails.param7;
   this.mobilenoupdateText = divisiondatadetails.param8;
   this.officialemailupdateText = divisiondatadetails.param9;
   this.customerupdateTextname = divisiondatadetails.param12; 
   this.customerupdateTextid = divisiondatadetails.param13; 
   this.customerupdate=this.customerupdateTextname;
  this.backdetailsbtn();
 
 
  // alert(vendordatadetails.param4);
 }
 customerupdateTextid:string;customerupdateTextname:string;
 Refreshfunction(){
  this.loading = true; 
     this.filter="";   
  this.p = 1; this.pagecount = 10;
//  console.log("p" + this.p);
this.itemsPerPage=this.pagecount;
  let keydata = {
    pageNo:this.p,
    itemsPerPage:this.pagecount,    
    searchBy: "", 
    searchType:"",
    totalRecords:"NA",
    pageID: "7",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
  }
  try{AddLoader()}catch(e){alert(e)} 
   // Distributor Detail Grid BIND LIST    
   this.divisionService.DivisionDetailsAPI(keydata).subscribe(
    (data)  => {
      try{RemoveLoader()}catch(e){alert(e)} 
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
       this.DivisionDetails$ = vendorlist;
       this.count = data.entity.count;
       this.viewcount = data.entity.viewCount;
     
       this.loading = false; 
    });
 }

 DivisionPDFDetail(){
  this.loading = true;
  this.p = 1; 
  let keydata = {
    pageNo:"",
    itemsPerPage:"",    
    searchBy: "", 
    searchType:"",
    totalRecords:"NA",
    pageID: "7",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
  }
   try { AddLoader() } catch (e) { alert(e) }
  
   this.divisionService.DivisionDetailsAPI(keydata).subscribe(
      (data)  => {

      try { RemoveLoader() } catch (e) { alert(e) }
  
            var exceldata = data.entity.responsedatalist;
    this.PrepareExcelData(exceldata);
    this.excelpdfDetails1=exceldata;
        // this.count = data.entity.count;
        // this.viewcount = data.entity.viewCount;
       
        this.loading = false;
      });
 } 
  
createPDF() {
  let pdfTableData;
    let dataArray = []
    if(this.flag1 == 1)
    {
      for (let i = 0; i < this.excelpdfDetails1.length; i++) {
        pdfTableData = {
         "#": i + 1,
         "Customer Name": this.excelpdfDetails1[i]["param12"],
         "Division Name": this.excelpdfDetails1[i]["param2"],
         "Description": this.excelpdfDetails1[i]["param4"]
       }
       dataArray.push(pdfTableData)
     };
    }
    else{
      for (let i = 0; i < this.excelpdfDetails1.length; i++) {
        pdfTableData = {
              "#": i + 1,
         "Division Name": this.excelpdfDetails1[i]["param2"],
         "Description": this.excelpdfDetails1[i]["param4"]
       }
       dataArray.push(pdfTableData)
     };
    }
   
    this.pdfservice.CreatePDFData(dataArray,"Division Details");  

 }


 excelData:any=[];
 PrepareExcelData(data) {
   this.excelData = [];
if(this.flag1 == 1)
{
  for (var i = 0; i < data.length; i++) {
    //try {
      var obj = {

        "#": i + 1,
        "Customer Name": data[i].para12,
        "Division Name": data[i].param2,
 
        "Description": data[i].param4,

      }
   // } catch (e) { }
    this.excelData.push(obj);
  //  console.log("String concat:"+obj)

  }
}else
{
  for (var i = 0; i < data.length; i++) {
    // try {
      var obj1 = {

        "#": i + 1,
        "Division Name": data[i].param2,
        "Description": data[i].param4,

      }
    // } catch (e) { }
    this.excelData.push(obj1);
    
  }
}
  
 }


 exportToExcel() {
  this.DivisionPDFDetail();
  //console.log(this.excelData[0]);
  this.excelservice.ExportExcel(this.excelData,'Division Details','divisiondetails');
} 


 
  SelectRows(){
  
    var search = $('#searchData').val();
    var selectrow = $('#selectrow1').val();
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
    try{AddLoader()}catch(e){alert(e)} 
     // Distributor Detail Grid BIND LIST    
     this.divisionService.DivisionDetailsAPI(keydata).subscribe(
      (data)  => {
        try{RemoveLoader()}catch(e){alert(e)} 
        let resdatalist = data.entity.responsedatalist; 
     
  
         let vendorlist = resdatalist;
       
         this.DivisionDetails$ = vendorlist;
         this.count = data.entity.count;
         this.viewcount = data.entity.viewCount;
       
         this.loading = false; 
      });
  }
  itemsPerPage:number=5;
  searchdata(){
    var search = $('#searchData').val();
    this.loading = true; 
          
    this.p = 1; this.pagecount = 10;
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
    try{AddLoader()}catch(e){alert(e)} 
     // Distributor Detail Grid BIND LIST    
     this.divisionService.DivisionDetailsAPI(keydata).subscribe(
      (data)  => {
        try{RemoveLoader()}catch(e){alert(e)} 
        let resdatalist = data.entity.responsedatalist; 
     
  
         let vendorlist = resdatalist;
       
         this.DivisionDetails$ = vendorlist;
         this.count = data.entity.count;
         this.viewcount = data.entity.viewCount;
       
         this.loading = false; 
      });
  }
 
  sort(key){

    //  alert(key);
 
     this.key = key;
     this.reverse = !this.reverse;
     
   }
   DivisionDeletefunction(){
    var isValid = true; 

    var deleteremark = $('#divisiondelremark').val();
    deleteremark = deleteremark.substring(0, 1).toUpperCase() + deleteremark.substring(1);
    // Validate Contact Name
    if(!deleteremark && deleteremark.length <= 0){
     isValid = false;
    // $('#msg_error_delete').html('Please Enter Remark').show();
    $('#msg_error_delete').html('Please Enter Remark').show();
       $('#divisiondelremark').focus();
        setTimeout(function(){document.getElementById("msg_error_delete").style.display="none";}, 3000);
   }
   else
   { 
    let dataL = {
      param1:deleteremark,
      param2:this.dividionidupdate,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
     
        }
        try{AddLoader()}catch(e){alert(e)} 

    this.divisionService.DeleteDivisionAPI(dataL).subscribe((data)=>{
      try{RemoveLoader()}catch(e){alert(e)} 

    //  alert(data);
    this.datafromrespo = data.entity;
      
    if(data.statuscode == '200')
    {
    $("#SuccessModal").modal('show');
    this.deleteText="";
    this.DivisionDetail();
    this.closemodal();
    }
    else
    {
     $("#ErrorModal").modal('show');
    }
    });
   // alert("error in inserting data");
  }
  }

  closemodal(){
    //alert("come ");
    $("#successmodel").modal('hide');

    $('#modeldelete').modal('hide');
    $('#myModalwizard').modal('hide');

    $('.modal-backdrop.show').css('display', 'none');
    this.clearfunction();
  }
  cleardelete()
  {
    this.deleteText="";
  }
 
  DivisionMasterpageChanged(event){
    this.p = event; this.pagecount = $("#selectrow1").val();
    //  console.log("p" + this.p);
       this.itemsPerPage=this.pagecount;
      let keydata = {
        pageNo:this.p,
        itemsPerPage:this.pagecount,    
        searchBy: "", 
        searchType:"",
        totalRecords:"NA",
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try{AddLoader()}catch(e){alert(e)} 

       // Distributor Detail Grid BIND LIST    
       this.divisionService.DivisionDetailsAPI(keydata).subscribe(
        (data)  => {
          try{RemoveLoader()}catch(e){alert(e)} 

        //  console.log(data.entity)
          // console.log("wekcome_ "+data);
          let resdatalist = data.entity.responsedatalist; 
         //  this.resdata = 
         // console.log("wekcome_ "+resdata);
    
           let vendorlist = resdatalist;
         //  let resdatadev = resdata['list'];
         //  console.log(resdatadev);
         //  console.log(vendorlist);
           this.DivisionDetails$ = vendorlist;
           this.count = data.entity.count;
           this.viewcount = data.entity.viewCount;
         
           this.loading = false; 
        });
     }

  clearfunction(){

    this.DivisionupdateText=""; this.descriptionupdateText="";

  }

}
