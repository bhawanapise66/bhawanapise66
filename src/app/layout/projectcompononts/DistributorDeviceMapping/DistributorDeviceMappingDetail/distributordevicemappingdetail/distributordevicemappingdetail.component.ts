import { PdfService } from './../../../services/pdf.service';
import { ExportToExcelService } from './../../../services/export-to-excel.service';
import { DistributordevicemappingService } from './../../../../../APIService/distributordevicemapping.service';
import { CryptService } from './../../../services/crypt.service';
import { ListService } from './../../../../../../list.service';
import { PostService } from './../../../../../../post.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';
import * as xlsx from 'xlsx'
declare var jQuery: any;
declare var $: any;
declare var AddLoader:any;
declare var RemoveLoader:any;
@Component({
  selector: 'app-distributordevicemappingdetail',
  templateUrl: './distributordevicemappingdetail.component.html',
  styleUrls: ['./distributordevicemappingdetail.component.css']
})
export class DistributordevicemappingdetailComponent implements OnInit {

  @ViewChild('epltable',{ static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  key: string = 'name'; reverse: boolean = true;   
  filter:string;
  selectRowsText:string="10";
  public loading = false; p: number;   pagecount:number; count:number; viewcount:number; 
  remarkText:string;  mobilenoText:string; noOfdeviceText:string; deleteText:string; DeviceMappingDetails$:Object; EmployeeMappingDetails$:Object;

  noof_device:string; cust_name:string; mobile_no:string; remark_:string; odr_no:string; datafromrespo:string;
  PlaceOrderDetails$:Object; orderid:string;
  RemarkupdateText:string;
  
  pageUrl = this.router.url;
  private _success = new Subject<string>();  successMessageUpdate: string;

 // count:number;
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };
  constructor(public excelservice: ExportToExcelService, public pdfservice: PdfService,private modalService: NgbModal,private flashMessage: FlashMessagesService , private postService:PostService,private listService:ListService,private cryptService:CryptService,private router:Router,private distributordevicemapping:DistributordevicemappingService) { }

  ngOnInit() {
 
   

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
        // alert("djhf");
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
    this.EncryptPageName();
    this.EncryptPageUrl();

    this.DeviceMappingDetail();
   // this._success.subscribe((message) => this.successMessageUpdate = message);    
      
 
/* ------------------------------- Wizards end Ts------------------------------------------------- */
  }

  EncryptPageName() {
    this.cryptService.encrypt("Distributor Device Mapping Details")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
  //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
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
    this.Distributorlist();
    this.DeviceTypelist();
    
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
  }


  DeviceMappingDetail() {
       
    this.loading = true; 
        
    this.p = 1; this.pagecount = 10;
  //  console.log("p" + this.p);
    
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
     this.distributordevicemapping.DistributorDeviceMappingDetailsAPI(keydata).subscribe(
     //DivisionDeviceDetailsAPI(keydata).subscribe(
      (data)  => {
        try{RemoveLoader()}catch(e){alert(e)} 

        let resdatalist = data.entity.list; 
       //  this.resdata = 
       // console.log("wekcome_ "+resdata);
 
         let devicelist = resdatalist;
     
         this.EmployeeMappingDetails$ = devicelist;
         this.count = data.entity.count;
         this.viewcount = data.entity.viewCount;
        // console.log(this.count);
         this.loading = false; 
      });
      this.DeviceMappingDetail1();
}

EmployeeMappingDetails1$:any=[];
DeviceMappingDetail1() {
       
  this.loading = true; 
      
  this.p = 1; 
//  console.log("p" + this.p);
  
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
  try{AddLoader()}catch(e){alert(e)} 

   // Distributor Detail Grid BIND LIST    
   this.distributordevicemapping.DistributorDeviceMappingDetailsAPI(keydata).subscribe(
   //DivisionDeviceDetailsAPI(keydata).subscribe(
    (data)  => {
      try{RemoveLoader()}catch(e){alert(e)} 

      let resdatalist = data.entity.list; 
     //  this.resdata = 
     // console.log("wekcome_ "+resdata);

       let devicelist = resdatalist;
   
       this.EmployeeMappingDetails1$ = devicelist;
       this.PrepareExcelData(this.EmployeeMappingDetails1$);
      // console.log(this.count);
       this.loading = false; 
    });
}
createPDF()  {
  let pdfTableData;
  let dataArray = []
  for (let i = 0; i < this.EmployeeMappingDetails1$.length; i++) {
     pdfTableData = {
       "#":  this.EmployeeMappingDetails1$[i]["rowNumber"],
      "Distributor": this.EmployeeMappingDetails1$[i]["param60"],
      "Device Unique No": this.EmployeeMappingDetails1$[i]["param5"],
      "Device IMEI No":  this.EmployeeMappingDetails1$[i]["param4"],
      "Assign Date": this.EmployeeMappingDetails1$[i]["param61"],
      "Mobile NO": this.EmployeeMappingDetails1$[i]["param7"], 
      "Network":  this.EmployeeMappingDetails1$[i]["param9"],
      "ICCID/Sim No": this.EmployeeMappingDetails1$[i]["param6"],
      "Status": this.EmployeeMappingDetails1$[i]["param29"],
    }
    dataArray.push(pdfTableData)
  };
  this.pdfservice.CreatePDFData(dataArray,"Distributor Device Mapping Details");  

}

excelData:any=[];
PrepareExcelData(data) {
  this.excelData = [];

  for (var i = 0; i < data.length; i++) {
    try {
      var obj = {
       "#": i + 1,
        "Distributor Name": data[i].param60,
        "Device Unique No": data[i].param5,
        "Device IMEI No": data[i].param4,
        "Assign Date": data[i].param61,
        "Mobile NO": data[i].param7,
        "Network": data[i].param9,
        "ICCID/Sim No": data[i].param6,
        "Status": data[i].param29
      }
    } catch (e) { }
    this.excelData.push(obj);
  }
}

exportToExcel() {
         this.DeviceMappingDetail1();
  this.excelservice.ExportExcel(this.excelData, 'Distributor Device Mapping Details', 'distributordevicemappingdetails');

}
ListOfDepartment = [];
DepartmententryText:any;
selectdepartment: string;

DistributorList(){
  //this.selectstate = this.stateText.param1;
 // console.log(this.stateText.param2);
   let keydata = {
     param1:"",
     param2:"",
     pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
   }  

   
   try{AddLoader()}catch(e){alert(e)} 


   this.listService.DistributorListAPI(keydata).subscribe(
     (data)  => {

       try{RemoveLoader()}catch(e){alert(e)}

      // alert(JSON.stringify(data));
     //  console.log(data.entity)
      // console.log("wekcome_ "+data);
      this.ListOfDepartment = data.entity.list; 
     //  this.resdata =     
       this.loading = false; 
      
     });
 }

/*---------------- cunstomer details function end  --------------------*/
/*---------------Customer search start --------------------------*/

searchdata(){
  var search = $('#searchData').val();
  this.loading = true; 
        
  this.p = 1; 
//  console.log("p" + this.p);
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
  try{AddLoader()}catch(e){alert(e)} 

   // Distributor Detail Grid BIND LIST    
   this.distributordevicemapping.DistributorDeviceMappingDetailsAPI(keydata).subscribe(
   //DivisionDeviceDetailsAPI(keydata).subscribe(
    (data)  => {
      try{RemoveLoader()}catch(e){alert(e)} 

      let resdatalist = data.entity.list; 
   

       let vendorlist = resdatalist;
     
       this.EmployeeMappingDetails$ = vendorlist;
       this.count = data.entity.count;
       this.viewcount = data.entity.viewCount;
       this.loading = false; 
    });
}

/*------------------Search End ---------------------*/
deviceid:string; deviceimei:string; deviceunique:string;  divisionname:string; customermobile:string;  customerpincode:string;
designation:string; department:string;Employeeid:string; distributorname:string;Divisionid:string;distributorid :string;
mno1:string;mno2:string;network1:string;network2:string;
setdata(com){
  // alert(com);
   let empdatadetails = com;
   this.deviceid = empdatadetails.param1;
   this.distributorid = empdatadetails.param59;
   this.distributorname = empdatadetails.param60;
   this.deviceimei = empdatadetails.param4;
   this.deviceunique = empdatadetails.param5;

   this.mno1 = empdatadetails.param7;
   this.mno2 = empdatadetails.param8;
   this.network1 = empdatadetails.param9;
   this.network2 = empdatadetails.param10;
}





 Refreshfunction() {
  this.loading = true;

  this.p = 1;
  this.filter=""; 
  this.DeviceMappingDetail();
}
itemsPerPage:number=10;
 SelectRows(){
  
  var search = $('#searchData').val();
  var selectrow = $('#selectrow1').val();
  this.loading = true; 
       // alert("selectrow "+ selectrow);
       this.itemsPerPage=selectrow;
  this.p = 1; this.pagecount = selectrow;
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
   this.distributordevicemapping.DistributorDeviceMappingDetailsAPI(keydata).subscribe(
    (data)  => {
      try{RemoveLoader()}catch(e){alert(e)} 

      let resdatalist = data.entity.list; 
   

       let vendorlist = resdatalist;
     
       this.EmployeeMappingDetails$ = vendorlist;
       this.count = data.entity.count;
       this.viewcount = data.entity.viewCount;
     
       this.loading = false; 
    });
}





 sort(key){
this.key = key;
   this.reverse = !this.reverse;
   
 }

 DistributordevicemappingpageChanged(event){

this.p = event;
var selectrow = $('#selectrow1').val();
var search = $('#searchData').val();

 this.loading = true;
 this.itemsPerPage=selectrow;
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
  try{AddLoader()}catch(e){alert(e)} 

   // Distributor Detail Grid BIND LIST    
   this.distributordevicemapping.DistributorDeviceMappingDetailsAPI(keydata).subscribe(
    (data)  => {
      try{RemoveLoader()}catch(e){alert(e)} 

      let resdatalist = data.entity.list; 
    let vendorlist = resdatalist;
     
       this.EmployeeMappingDetails$ = vendorlist;
       this.count = data.entity.count;
       this.viewcount = data.entity.viewCount;
       
       this.loading = false; 
    });
 }
 
 EmployeeUnassignfunction(){
  // alert("skdnjsajd");
  var isValid = true; 
  var deleteremark = $('#empdelremark').val();
  // Validate Contact Name
  if(!deleteremark && deleteremark.length <= 0){
   isValid = false;
  // $('#msg_error_delete').html('Please Enter Remark').show();
  $('#msg_error_delete').html('Please Enter Remark').show();
  $('#empdelremark').focus();
   setTimeout(function(){document.getElementById("msg_error_delete").style.display="none";}, 3000);
 }
 else
 { 
  let dataL = {
    param1:this.deleteText,
    deviceList:this.deviceid,
    param3:this.deviceid,
    pageID: "7",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
      }
      try{AddLoader()}catch(e){alert(e)} 

  this.distributordevicemapping.DistributorUnassignDeviceDetailsAPI(dataL).subscribe((data)=>{
    try{RemoveLoader()}catch(e){alert(e)} 

  //  alert(dataL); 
  //  alert(data);
  this.datafromrespo = data.entity;
      
  if(data.statuscode == "200")
  {
  $("#SuccessModal").modal('show');
  this.DeviceMappingDetail();
  this.closemodal();
  }
  else
  {
   $("#ErrorModal").modal('show');
  }
  });
 }
 }
 ListOfDistributorUpdate = [];
 Distributorlist(){
  //this.selectstate = this.stateText.param1;
 // console.log(this.stateText.param2);
   let keydata = {
     param1:"",
     param2:"",
     pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
   }  
   try{AddLoader()}catch(e){alert(e)} 

   this.listService.DistributorListAPI(keydata).subscribe(
     (data)  => {

      try{RemoveLoader()}catch(e){alert(e)}

      // alert(JSON.stringify(data));
     //  console.log(data.entity)
      // console.log("wekcome_ "+data);
      this.ListOfDistributorUpdate = data.entity.list; 
     //  this.resdata =     
       this.loading = false; 
      
     });
 }

 ListOfDevicetype = [];
 DeviceTypelist(){
   //this.selectstate = this.stateText.param1;
  // console.log(this.stateText.param2);
    let keydata = {
      param1:"",
      param2:"",
      pageID: "7",
       pageName: this.encryptedpageNameValue,
       pageURL: this.encryptedpageUrlValue
    }  
    try{AddLoader()}catch(e){alert(e)} 

    this.listService.DeviceAssignDivisionListAPI(keydata).subscribe(
      (data)  => {
        try{RemoveLoader()}catch(e){alert(e)} 

       // alert(JSON.stringify(data));
      //  console.log(data.entity)
       // console.log("wekcome_ "+data);
       this.ListOfDevicetype = data.entity.list; 
      //  this.resdata =     
        this.loading = false; 
       
      });
  }
  
  DeviceEntry(){
    this.router.navigate(['./distributordevicemapping']);

  }
  closemodal(){
    //alert("come ");
   $("#SuccessModel").modal('hide');

   $('#modeldelete').modal('hide');
   $('#myModalwizard').modal('hide');

   $('.modal-backdrop.show').css('display', 'none');

 }
 DeviceTypeUpdateText:any;
 selectdeviceid:string;
 SelectDeviceType(){
   this.selectdeviceid = this.DeviceTypeUpdateText.param1;
 }
 DivisionupdateText:any;
 selectdivision:string;
 SelectDivisionData(){
  this.selectdivision = this.DivisionupdateText.param1;
}
 divisioneditsve(){
 // var divisiondata = $('#divisiondummy').val();
  var devicedata = $('#deviceiddummy').val();
  var remark = $('#divisionremarkupdate').val();
  var isValid = true;

  // if(!divisiondata && divisiondata.length <= 0){
  //   // alert(devicetype);
  //   isValid = false;
  //   $('#msg_errorupdate').html('Please Enter Division').show();
  //   $('#divisionentry').focus();
  //   setTimeout(function(){document.getElementById("msg_errorupdate").style.display="none";}, 3000);
  // }
  if(!devicedata && devicedata.length <= 0){
    isValid = false;
    $('#msg_errorupdate').html('Please Enter Device id').show();
    $('#devicetypeentry').focus();
    setTimeout(function(){document.getElementById("msg_errorupdate").style.display="none";}, 3000);
  }
  else if(!remark && remark.length <= 0){
    isValid = false;
    $('#msg_errorupdate').html('Please Enter Remark').show();
    $('#divisionremarkupdate').focus();
    setTimeout(function(){document.getElementById("msg_errorupdate").style.display="none";}, 3000);
  }
  else{
    let dataL = {
       pageID: "7",
       pageName: this.encryptedpageNameValue,
       pageURL: this.encryptedpageUrlValue,
      param1:this.RemarkupdateText,
      param2:this.Divisionid,
      param3:this.deviceid,
      param4: this.selectdeviceid,
     // deviceList:this.datasave, 
  
        }

        try{AddLoader()}catch(e){alert(e)}
         this.distributordevicemapping. Assigndevicetodistributor(dataL).subscribe((data)=>{
       
      try{RemoveLoader()}catch(e){alert(e)}

      this.datafromrespo = data.entity;
      
      if(data.statuscode == "200")
     {
     $("#SuccessModal").modal('show');
     this.DeviceMappingDetail();
     }
     else
     {
      $("#ErrorModal").modal('show');
     }
    });
  }
 }
}

