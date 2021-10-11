import { ExportToExcelService } from './../../../services/export-to-excel.service';
import { PdfService } from './../../../services/pdf.service';
import { Paramcls } from './../../../../../../paramcls';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { DistrictmodelService } from './../../../../../APIService/districtmodel.service';

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { CryptService } from './../../../services/crypt.service';
import { ListService } from './../../../../../../list.service';
import { debounceTime } from 'rxjs/operators';
import * as xlsx from 'xlsx';
import * as $ from 'jquery';



declare var jQuery: any;
declare var $: any;

declare var AddLoader: any;
declare var RemoveLoader: any;
declare var SuccessAlert: any;
declare var errorAlert: any;
@Component({
  selector: 'app-districtdetails',
  templateUrl: './districtdetails.component.html',
  styleUrls: ['./districtdetails.component.css']
})


export class DistrictdetailsComponent implements OnInit {
  @ViewChild('epltable',{ static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  timer:any;
  pageUrl = this.router.url;
  private _success = new Subject<string>();  successMessageUpdate: string;
  public loading = false; p: number;   pagecount:number=10; count:number; viewcount:number;
  key: string = 'name'; reverse: boolean = true;
  CustRemarktext:string; filter:string; deleteText:string; datafromrespo:string;


  cust_email:string; cust_mobno:string; cust_state:any; cust_city:any; cust_alt_mobno:string;  reg_add:string; pin_code:string;
  
  //DISTRICT
  district_id:string;
  itemsPerPage: number = 10;
  ListOfDistributor$:Object;ListOfDealer$:Object;ListOfState$:Object;ListOfCity$:Object;
  DistrictDetails$:Object; ListOfCustomerType$:Object;  ListOfCustomerCategory$:Object;
  DistrictDetails1$:any;write_privilege:string;

  custtypeText:string; custcategoryText:string;   company_name:string;
   

  distibutorText:string; dealerText:string; Customertype:string; compnameText:string; 

  ListOfState = []; ListOfCity = [];  ListOfDistributor = []; ListOfDealer = [];  ListOfCustomerCategory = []; ListOfCustomerType =[];


  personnameText:string;personnoText:string;personaltnoText:string;personemailText:string;cityText:string;AreaText:string; landmarkText:string; regaddressText:string;pincodeText:string;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 2000,
    height: '200px',
  };
  constructor(public pdfservice: PdfService,private modalService: NgbModal,private flashMessage: FlashMessagesService ,private listService:ListService, private cryptService:CryptService,private router:Router, public districtmodelService:DistrictmodelService,public excelservice: ExportToExcelService) { }


  ngOnInit(){

    /* ------------------------------- Wizards start Ts------------------------------------------------- */

    this.count = 0;
    this.viewcount = 0;
    (function ($) {
      $(document).ready(function() {
        $('#stateentry').focus();
        $(".buttonFinish").prop('disabled', false);
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
        $('#distrbutorname').focus();
         $('#msg_error').html('').hide();
        // $('#msg_vendorName').html('').hide();
        // $('#msg_shortcode').html('').hide();
        // $('#msg_OfficialNo').html('').hide();
        // $('#msg_Officialemail').html('').hide();
         var isValid = true; 
         var Distname = $('#distrbutorname').val();
         var DealerName = $('#dealername').val();
  
         var customertype = $('#customertype').val();
         var companyname = $('#companyname').val();
         var customercatagory = $('#customercategory').val();
         //Validate Vendor Name
         if(Distname == null){
           isValid = false;
        
           $('#msg_error').html('Please Enter Distributor Name').show();
           $('#distrbutorname').focus();
         }else 
         if(DealerName == null){
          // validate short code
           isValid = false;
           $('#msg_error').html('Please Enter Dealer Name').show(); 
           $('#dealername').focus();        
         }else if( customertype == null){
          // validate Official No
          isValid = false;
          $('#msg_error').html('Please Enter Customer Type').show(); 
          $('#customertype').focus();        
        }else if(customercatagory == null){
          // validate Official Email
          isValid = false;
          $('#msg_error').html('Please Enter Customer Catagory').show(); 
          $('#customercategory').focus();        
        }else if(!companyname && companyname.length <= 0){
          // validate Official Email
          isValid = false;
          $('#msg_error').html('Please Enter Company Name').show(); 
          $('#companyname').focus();        
        }
        
        if(isValid && index==1 ){  
          
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
    
    
      function validateStep2(index, steps){
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
         if(!personname && personname.length <= 0){
          isValid = false;
          $('#msg_error_contact').html('Please Enter Person Name').show();
          $('#pername').focus();
        }else
         if(!contactNo && contactNo.length <= 0){
           isValid = false;
           $('#msg_error_contact').html('Please Enter Contact Number').show();
           $('#contactNo').focus();
         }
        
         else if(state == null){ 
          // validate state
           isValid = false;
           $('#msg_error_contact').html('Please Enter State').show();     
           $('#state').focus();   
    
         }else if(city == null){
          // validate city
          isValid = false;
          $('#msg_error_contact').html('Please Enter City').show(); 
          $('#city').focus();        
        }
        else
        if(!regaddress && regaddress.length <= 0){
         // validate Alternate Number
          isValid = false;
          $('#msg_error_contact').html('Please Enter Reg Address').show(); 
          $('#regaddressnew').focus();        
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
    
        return true;
      }
      });
    })(jQuery);

    this.write_privilege =sessionStorage.getItem('writePrivilege');

    if(this.write_privilege == "false")
    {
      $("#editbtn").css("display", "none");
      $("#deletebtn").css("display", "none");
      $("#addnewdistrict").css("display", "none");
     $('#editbtn').hide();
     $('.material-icons md-18').css("display", "none");
     $('#deletebtn').attr('disabled','disabled');
     $('#addnewdistrict').attr('disabled','disabled');
    }
    this.searchstate="";
    this.Statelist();
    this.DistrictDetail();
    this.EncryptPageName();
    this.EncryptPageUrl();
   

 
/* ------------------------------- Wizards end Ts------------------------------------------------- */
  }
  EncryptPageName() {
    this.cryptService.encrypt("District Details")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;


  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
 
  }

 
  
  editpageform(){
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
     this.Statelist();
     if(this.write_privilege == "false")
     {
       $('#editbtn').hide();
     }
 
  }
 

 
  
 
   /*-------------List of City Api ---------------*/  

   /*-------------List of State Api ---------------*/ 
   
   Statelist(){
  
    let keydata = {
      pageID: "7",
       pageName: this.encryptedpageNameValue,
       pageURL: this.encryptedpageUrlValue
    }  
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectStateListAPI(keydata).subscribe(
      (data)  => {
        try { RemoveLoader() } catch (e) { alert(e) }
       
       this.ListOfState = data.entity.list; 
     
        this.loading = false; 
       
      });
  }

   /*-------------List of State Api ---------------*/  
   customer_name:string;
   distributor_name:any;

   selectdistributot:string;
  // distibutorText:any;
   dealer_name:any;
   selectdealer:string;
  // dealer_name:any;
   customer_type:any;
   selectcustomertype:string;

   cust_catagory:any;
   selectcustomercatagory:string;
  // custcategoryText:any;


  selectstateTextt:string;
   stateText:string;
   districtnameText:string;
   statecode1:any;
   districtiddemo:any;
   selectstateTexttname:any;
   descriptionText:any;remarkdistrictText:any;
  vensaveeditbutton(){
  
    var state = this.getid(this.ListOfState, this.stateText);
 

    var DistrictName = $('#namedistrict1').val();
    var remark = $('#remarkupdatedistrict').val();
    this.districtnameText = DistrictName.substring(0, 1).toUpperCase() + DistrictName.substring(1);
    this.remarkdistrictText = remark.substring(0, 1).toUpperCase() + remark.substring(1);
    
//     var stateidmodal = $('#stateentry').val();
//  alert(stateidmodal);
             
 
   

    var isValid = true; 
   

    if(this.dummynameText== 'undefined' || (!this.dummynameText && this.dummynameText.length <= 0)) {
     
      isValid = false;
      $('#msg_errorentry23').html('Please Select State').show();
      $('#stateentry').focus();
  setTimeout(function(){document.getElementById("msg_errorentry23").style.display="none";}, 3000);
    }
    else
    if(!DistrictName && DistrictName.length <= 0){
  
      isValid = false;
      $('#msg_errorentry23').html('Please Enter District Name').show();
      $('#namedistrict1').focus();
     setTimeout(function(){document.getElementById("msg_errorentry23").style.display="none";}, 3000);
    }
    else
    if (!remark && remark.length <= 0){
              isValid = false;
              $('#msg_errorremark').html('Please Enter Remark').show();
              $('#remarkupdatedistrict').focus();
              setTimeout(function(){document.getElementById("msg_errorremark").style.display="none";}, 3000);
            }
   
    else
    {

      let dataL = {
         param1:this.remarkdistrictText,
         param2: this.district_id,
         param3:this.districtnameText,
         param4:state,  //stateid
         param5:"India",
         param6:"",
         param7:this.stateCode2,       //statecode       
         param8:"",
         param9:"",
         pageID: "7",
         pageName: this.encryptedpageNameValue,
         pageURL: this.encryptedpageUrlValue
          }
          try { AddLoader() } catch (e) { alert(e) }
      this.districtmodelService.UpdateDistrictEditAPI(dataL).subscribe((data)=>{
        try { RemoveLoader() } catch (e) { alert(e) }
      this.datafromrespo = data.entity;
      var msg = this.datafromrespo;
    if(data.statuscode == '200')
    {
      SuccessAlert(msg);
    this.remarkdistrictText="";
    this.clear();
    this.callStateDetail();
    $('#myModalwizard').modal('hide');
    $('.modal-backdrop.show').css('display', 'none');
    }
    else
    {
      errorAlert(msg);
    }
    
    });
    }
  }


  // customer details function 

  DistrictDetail() {
 
   this.loading = true; 
    this.p = 1;
    this.pagecount=10;
    this.itemsPerPage=this.pagecount;
  let keydata = {
      param1:"",
      pageNo:this.p,
      itemsPerPage:this.pagecount,    
      searchBy: "", 
      searchType:"",
      totalRecords:"NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
     // Distributor Detail Grid BIND LIST    
     this.districtmodelService.DistrictDetailsAPI(keydata).subscribe(
      (data)  => {
        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.list; 
       let vendorlist = resdatalist;
     
         this.DistrictDetails$ = vendorlist;
         this.count = data.entity.count;
         this.viewcount = data.entity.viewCount;
      
         this.loading = false; 
      });
      this.DistrictDetail1(); 
}



DistrictDetail1() {
  this.loading = true; 
   this.p = 1;
 let keydata = {
     param1:"",
     pageNo:this.p,
     itemsPerPage:"",    
     searchBy: "", 
     searchType:"",
     totalRecords:"NA",
     pageID: "7",
     pageName: this.encryptedpageNameValue,
     pageURL: this.encryptedpageUrlValue
   }
   try { AddLoader() } catch (e) { alert(e) }
   this.districtmodelService.DistrictDetailsAPI(keydata).subscribe(
     (data)  => {
      try { RemoveLoader() } catch (e) { alert(e) }
       let resdatalist = data.entity.list; 
      let vendorlist = resdatalist;
    
        this.DistrictDetails1$ = vendorlist;
        this.PrepareExcelData(this.DistrictDetails1$);
        this.loading = false; 
     });
}

/*---------------- cunstomer details function end  --------------------*/
/*---------------Customer search start --------------------------*/

searchdata(){
  this.searchstate="";
  var search = $('#searchData').val();
  this.loading = true; 
        
  this.p = 1; 
 
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
  
   // Distributor Detail Grid BIND LIST    
   try { AddLoader() } catch (e) { alert(e) }
   this.districtmodelService.DistrictDetailsAPI(keydata).subscribe(
    (data)  => {
      try { RemoveLoader() } catch (e) { alert(e) }
      let resdatalist = data.entity.list; 
   

       let vendorlist = resdatalist;
     
       this.DistrictDetails$ = vendorlist;
       this.count = data.entity.count;
       this.viewcount = data.entity.viewCount;
       this.loading = false; 
    });
}



SelectRows(){
  var search = $('#searchData').val();
  var selectrow = $('#selectrow2').val();

  var search1=this.searchstate["param1"];
  this.loading = true; 
     
  this.p = 1;
   this.pagecount =selectrow;
   this.itemsPerPage=this.pagecount;

  let keydata = {
    param1:search1,
    pageNo:this.p,
    itemsPerPage:selectrow,    
    searchBy: search, 
    searchType:"",
    totalRecords:"NA",
    pageID: "7",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
  }
  
   // Distributor Detail Grid BIND LIST    
   try { AddLoader() } catch (e) { alert(e) }
   this.districtmodelService.DistrictDetailsAPI(keydata).subscribe(
    (data)  => {
      try { RemoveLoader() } catch (e) { alert(e) }
      let resdatalist = data.entity.list; 
   

       let vendorlist = resdatalist;
     
       this.DistrictDetails$ = vendorlist;
       this.count = data.entity.count;
       this.viewcount = data.entity.viewCount;
     
       this.loading = false; 
    });
}

diststateId:any;
stateCode2:any;
country:any;
state_nametxt:any;
districtcode:any;
setdata(com:Paramcls){
   this.district_id = com.param1;
   this.districtnameText = com.param2;          //hingna
   this.districtcode=com.param3;                //18   district code
   this.country = com.param4;                    //India
   this.stateCode2 = com.param5;                      //MH  statecode
 
   this.stateText = com.param9;       //maharashtra
   this.state_nametxt=this.stateText;
    this.dummynameText= this.check(this.stateText);

 this.backdetailsbtn();

} 
check(data) {
  try {
    if (typeof data === 'object') {
   //   console.log("come in object if")
      return data.param1;
    }
    else if (data == '') {
   //   console.log("come in Else if")
    }
    else {
    //  console.log(data.length)

      return data;
    }
  } catch (e) {
    return '';
  }
}

getid(data, value) {
  try {
    if (typeof value === 'object') {
     // console.log("come in object if")
    //  console.log(value.param1 + "  ====  " + value.param2);
      return value.param1;
      // return data.param1;
    }
    else {
  
    //  console.log("come in else")
      var index = data.findIndex(x => x.param2 === value);
     
      return data[index].param1;
    }
  } catch (e) {
    return '';
  }

}



Refreshfunction(){
  this.loading = true; 
  this.filter="";
  this.searchstate="";
  this.ngOnInit();
 }

/*------------------Search End ---------------------*/

 createPDF()  {

  let pdfTableData;
  let dataArray = []
  for (let i = 0; i < this.DistrictDetails1$.length; i++) {
     pdfTableData = {
       "#":  this.DistrictDetails1$[i]["rowNumber"],
      "State": this.DistrictDetails1$[i]["param9"],
      "District": this.DistrictDetails1$[i]["param2"],
      
    }
    dataArray.push(pdfTableData)
  };
  this.pdfservice.CreatePDFData(dataArray,"District Details");  

}


excelData:any=[];
  PrepareExcelData(data) {
    this.excelData = [];

    for (var i = 0; i < data.length; i++) {
      try {
        var obj = {

          "#": i + 1,
          "State": data[i]["param9"],
          "District": data[i]["param2"],

        }
      } catch (e) { }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    this.DistrictDetail1(); 
    this.excelservice.ExportExcel(this.excelData, 'District Details', 'districtdetails');

  }


DistrictpageChanged(event){
  var search1=this.searchstate["param1"];
  var search = $('#searchData').val();

  var selectrow = $('#selectrow2').val();
  this.p = event;
   this.pagecount =selectrow;
   this.itemsPerPage=this.pagecount;


 
let keydata = {
  param1:search1,
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
   this.districtmodelService.DistrictDetailsAPI(keydata).subscribe(
    (data)  => {
      try { RemoveLoader() } catch (e) { alert(e) }
    //  console.log(data.entity)
      // console.log("wekcome_ "+data);
      let resdatalist = data.entity.list; 
     //  this.resdata = 
     // console.log("wekcome_ "+resdata);

       let vendorlist = resdatalist;
     
       this.DistrictDetails$ = vendorlist;
       this.count = data.entity.count;
       this.viewcount = data.entity.viewCount;
       
       this.loading = false; 
    });
 }
 sort(key){
 this.key = key;
 this.reverse = !this.reverse;
 
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

DistrictDeletefunction(){
  var isValid = true; 
  var deleteremark = $('#districtdelremark').val();
  this.deleteText = deleteremark.substring(0, 1).toUpperCase() + deleteremark.substring(1);

  // Validate Contact Name
  if(!deleteremark && deleteremark.length <= 0){
   isValid = false;
   $('#msg_error_delete').html('Please Enter Remark').show();
   $('#districtdelremark').focus();
   setTimeout(function(){document.getElementById("msg_error_delete").style.display="none";}, 3000);
 }
 else
 { 
  let dataL = {
    param1:deleteremark,
    param2:this.district_id,
    pageID: "7",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
   
      }
      try { AddLoader() } catch (e) { alert(e) }
  this.districtmodelService.DeleteDistrictAPI(dataL).subscribe((data)=>{
    try { RemoveLoader() } catch (e) { alert(e) }
 this.datafromrespo = data.entity;
 var msg = this.datafromrespo;
  if(data.statuscode == '200')
  {
    SuccessAlert(msg);
  this.deleteText="";
  this.Refreshfunction();
  
  $('#modeldelete').modal('hide');
  $('#myModalwizard').modal('hide');
  $('.modal-backdrop.show').css('display', 'none');
  }
  else
  {
    errorAlert(msg);
  }
  });

}
}


selectstate:any;
statechange()
{
this.selectstate = this.statedemo;
this.loading = true; 
   
this.p = 1; 
let keydata = {
 param1: this.selectstate,
 pageNo:this.p,
 itemsPerPage:this.pagecount,    
 searchBy: "", 
 searchType:"",
 totalRecords:"NA",
 pageID: "7",
 pageName: this.encryptedpageNameValue,
 pageURL: this.encryptedpageUrlValue
}

try { AddLoader() } catch (e) { alert(e) }
// Distributor Detail Grid BIND LIST    
this.districtmodelService.DistrictDetailsAPI(keydata).subscribe(
 (data)  => {
  try { RemoveLoader() } catch (e) { alert(e) }
   let resdatalist = data.entity.list; 
  //  this.resdata = 


    let vendorlist = resdatalist;

    this.DistrictDetails$ = vendorlist;
    // this.count = data.entity.count;
    // this.viewcount = data.entity.viewCount;

    this.loading = false; 
 });
}


stateText1:any;
selectstatedemo:any;
statedemo:any;
searchstate:any;



DistrictDetaildropdown()
{

  
  var search   = this.searchstate["param1"];

  this.filter="";

   
    this.loading = true; 
          
    this.p = 1; 
   let keydata = {
     param1:search,
      pageNo:this.p,
      itemsPerPage:this.pagecount,    
      searchBy: "", 
      searchType:"",
      totalRecords:"NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    
     // Distributor Detail Grid BIND LIST   
     try { AddLoader() } catch (e) { alert(e) } 
     this.districtmodelService.DistrictDetailsAPI(keydata).subscribe(
      (data)  => {
        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.list; 
        let resdatacount =data.responseEntityCount;
  if(resdatacount == '0')
  {
    this.DistrictDetails$ =[];
    this.count=0;
    this.viewcount=0;
  }
  else
       {  let vendorlist = resdatalist;
       
         this.DistrictDetails$ = vendorlist;
        
         this.count = data.entity.count;
         this.viewcount = data.entity.viewCount;
       }
         this.loading = false; 
      });

  
}


closemodal() {
  this.deleteText="";

  $('#modeldelete').modal('hide');
  $('.modal-backdrop.show').css('display', 'none');
 
}

dummynameText:string;
statenamedummy:string;
selectdummystate()
{
  this.dummynameText=this.stateText["param1"];

this.stateCode2=this.stateText["param3"];

this.state_nametxt=this.stateText["param2"];
this.stateText=this.state_nametxt;

}


callStateDetail()
{
 if(this.searchstate == 'undefined') 
 {
   this.ngOnInit();
 }
 else{
   this.DistrictDetaildropdown();
 }
}

clear()
{
  this.stateText=""; this.dummynameText="";this.districtnameText="";this.remarkdistrictText="";

}
}