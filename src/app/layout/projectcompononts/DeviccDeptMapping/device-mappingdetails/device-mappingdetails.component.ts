import { DeviceassigndepartmentmodelService } from './../../../../APIService/deviceassigndepartmentmodel.service';
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
  selector: 'app-device-mappingdetails',
  templateUrl: './device-mappingdetails.component.html',
  styleUrls: ['./device-mappingdetails.component.css']
})
export class DeviceMappingdetailsComponent implements OnInit {
  @ViewChild('epltable',{ static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  key: string = 'name'; reverse: boolean = true;  
  filter:string;
  selectRowsText:string="10";
  public loading = false; p: number;   pagecount:number; count:number; viewcount:number; 
  remarkText:string;  mobilenoText:string; noOfdeviceText:string; deleteText:string; DeviceMappingDetails$:Object;

  noof_device:string; cust_name:string; mobile_no:string; remark_:string; odr_no:string; datafromrespo:string;
  PlaceOrderDetails$:Object; orderid:string; submitted=false;

  deviceid:string; deviceimei:string; deviceunique:string;  customername:string; customermobile:string;  customerpincode:string;
  designation:string; department:string; itemsPerPage=10;
  RemarkupdateText:string;
  
  pageUrl = this.router.url;
  private _success = new Subject<string>();  successMessageUpdate: string;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  constructor(public excelservice: ExportToExcelService,public pdfservice: PdfService,private modalService: NgbModal,private flashMessage: FlashMessagesService , private postService:PostService,private listService:ListService, private devicemappingService:DeviceassigndepartmentmodelService , private cryptService:CryptService,private router:Router, private placeodrService:PlaceodrmodelService ) { }

  ngOnInit() {
    /* ----------------------------------- Wizards start Ts------------------------------------------------- */

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
         alert("djhf");
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
    this.clearfunction();
    this.DeviceMappingDetail();
   // this._success.subscribe((message) => this.successMessageUpdate = message);    
      
 
/* ------------------------------- Wizards end Ts------------------------------------------------- */
  }

  EncryptPageName() {
    this.cryptService.encrypt("Order Details")
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
      // alert("hello");
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
     this.devicemappingService.DeviceDepartmentMappingDetailsAPI(keydata).subscribe(
      (data)  => {
        try{RemoveLoader()}catch(e){alert(e)} 

      
        let resdatalist = data.entity.list; 
       //  this.resdata = 
       // console.log("wekcome_ "+resdata);
 
         let devicelist = resdatalist;
     
         this.DeviceMappingDetails$ = devicelist;
         this.count = data.entity.count;
         this.viewcount = data.entity.viewCount;
        // console.log(this.count);
         this.loading = false; 
      });
      this.DeviceMappingDetail1();
}

DeviceMappingDetail1() {
  // alert("hello");
this.loading = true; 
    
this.p = 1; this.pagecount = 10;
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
 this.devicemappingService.DeviceDepartmentMappingDetailsAPI(keydata).subscribe(
  (data)  => {
    try{RemoveLoader()}catch(e){alert(e)} 

  
    let resdatalist = data.entity.list; 
   //  this.resdata = 
   // console.log("wekcome_ "+resdata);

     let devicelist = resdatalist;
 
     this.DeviceMappingDetailall = devicelist;
     this.PrepareExcelData(this.DeviceMappingDetailall)
    // console.log(this.count);
     this.loading = false; 
  });
}


createPDF()  {
  let pdfTableData;
  let dataArray = []
  for (let i = 0; i < this.DeviceMappingDetailall.length; i++) {
     pdfTableData = {
       "#":  this.DeviceMappingDetailall[i]["rowNumber"],
      "Department Name": this.DeviceMappingDetailall[i]["param6"],
      "Device Unique No.": this.DeviceMappingDetailall[i]["param16"],
      "Device IMEI No.": this.DeviceMappingDetailall[i]["param15"],
      "Assign Date": this.DeviceMappingDetailall[i]["param4"],
      "Division Name": this.DeviceMappingDetailall[i]["param18"],
    }
    dataArray.push(pdfTableData)
  };
  this.pdfservice.CreatePDFData(dataArray,"Department Device Details");  

}

excelData:any=[];
PrepareExcelData(data) {
  this.excelData = [];

  for (var i = 0; i < data.length; i++) {
    try {
      var obj = {
       "#": i + 1,
        
      "Department Name":data[i]["param6"],
      "Device Unique No.": data[i]["param16"],
      "Device IMEI No.": data[i]["param15"],
      "Assign Date": data[i]["param4"],
      "Division Name": data[i]["param18"],
      }

    } catch (e) { }
    this.excelData.push(obj);
  }
}

exportToExcel() {
        this.DeviceMappingDetail1();
  this.excelservice.ExportExcel(this.excelData, 'Department Device Details', 'departmentdevicedetails');

}
ListOfDepartment = [];DeviceMappingDetailall:any=[];
DepartmententryText:any;
selectdepartment: string;
Departmentlist(){
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

 

   this.listService.SelectDepartmentListAPI(keydata).subscribe(
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
        
  this.p = 1; this.pagecount = 10;
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
   this.devicemappingService.DeviceDepartmentMappingDetailsAPI(keydata).subscribe(
    (data)  => {
     
      try{RemoveLoader()}catch(e){alert(e)} 

      let resdatalist = data.entity.list; 
   

       let vendorlist = resdatalist;
     
       this.DeviceMappingDetails$ = vendorlist;
       this.count = data.entity.count;
       this.viewcount = data.entity.viewCount;
       this.loading = false; 
    });
}

/*------------------Search End ---------------------*/
devicedepartmentid:string;
setdata(com){
  // alert(com);
  this.backdetailsbtn();
   let devicedatadetails = com;
   this.devicedepartmentid = devicedatadetails.param2;
   this.deviceid =  devicedatadetails.param3;
   this.deviceimei = devicedatadetails.param15;
   this.deviceunique = devicedatadetails.param16;
   this.customername = devicedatadetails.param10;
   this.customermobile = devicedatadetails.param11;
   this.customerpincode = devicedatadetails.param12;
   this.designation = devicedatadetails.param14;
   this.department = devicedatadetails.param7;



  // this.odr_no = orderdatadetails.param1; 
}





Refreshfunction(){
  this.selectRowsText = "10";
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
   this.devicemappingService.DeviceDepartmentMappingDetailsAPI(keydata).subscribe(
    (data)  => {
      try{RemoveLoader()}catch(e){alert(e)} 

    //  alert(JSON.stringify(data));
    //  console.log(data.entity)
      // console.log("wekcome_ "+data);
      let resdatalist = data.entity.list; 
     //  this.resdata = 
     // console.log("wekcome_ "+resdata);

       let vendorlist = resdatalist;
       this.DeviceMappingDetails$ = vendorlist;
       this.count = data.entity.count;
       this.viewcount = data.entity.viewCount;
     
       this.loading = false; 
    });
 }


 SelectRows(){
  
  var search = $('#searchData').val();
  var selectrow = $('#selectrow1').val();
  this.loading = true; 
       // alert("selectrow "+ selectrow);
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
   this.devicemappingService.DeviceDepartmentMappingDetailsAPI(keydata).subscribe(
    (data)  => {
      try{RemoveLoader()}catch(e){alert(e)} 

      let resdatalist = data.entity.list; 
   

       let vendorlist = resdatalist;
     
       this.DeviceMappingDetails$ = vendorlist;
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

 PlaceOrderpageChanged(event){
  
  this.p = event; this.pagecount = $("#selectrow1").val();
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
   this.devicemappingService.DeviceDepartmentMappingDetailsAPI(keydata).subscribe(
    (data)  => {
      try{RemoveLoader()}catch(e){alert(e)} 

    //  alert(JSON.stringify(data));
    //  console.log(data.entity)
      // console.log("wekcome_ "+data);
      let resdatalist = data.entity.list; 
     //  this.resdata = 
     // console.log("wekcome_ "+resdata);

       let vendorlist = resdatalist;
     
       this.DeviceMappingDetails$ = vendorlist;
       this.count = data.entity.count;
       this.viewcount = data.entity.viewCount;
       
       this.loading = false; 
    });
 }

 DeviceUnassignfunction(){
  // alert("skdnjsajd");
  var isValid = true; 
  var deleteremark = $('#devdelremark').val();
  // Validate Contact Name
  if(!deleteremark && deleteremark.length <= 0){
   isValid = false;
  // $('#msg_error_delete').html('Please Enter Remark').show();
  $('#msg_error_delete').html('Please Enter Remark').show();
  $('#devdelremark').focus();
   setTimeout(function(){document.getElementById("msg_error_delete").style.display="none";}, 3000);
 }
 else
 { 
  let dataL = {
    param1:deleteremark,
    param2:this.devicedepartmentid,
    param3:this.deviceid,
    pageID: "7",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
      }

      try{AddLoader()}catch(e){alert(e)} 

  this.devicemappingService.DeleteDeviceDepartmentMappingAPI(dataL).subscribe((data)=>{
    try{RemoveLoader()}catch(e){alert(e)} 

  //  alert(dataL);
  //  alert(data);
  this.datafromrespo = data.entity;
    
  if(this.datafromrespo == 'Successfully unassign.')
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
  
  DeviceEntry(){
    this.router.navigate(['./DevicedeptMapping']);

  }
  closemodal(){
   // alert("come ");
   $("#SuccessModel").modal('hide');

   $('#modeldelete').modal('hide');
   $('#myModalwizard').modal('hide');

   $('.modal-backdrop.show').css('display', 'none');
   this.clearfunction();

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

      this.listService.DeviceAssignDepartmentListAPI(keydata).subscribe(
        (data)  => {
          try{RemoveLoader()}catch(e){alert(e)}

        //  console.log(data.entity)
         // console.log("wekcome_ "+data);
         this.ListOfDevicetype = data.entity.list; 
        //  this.resdata =     
          this.loading = false; 
         
        });
    }

    DeviceTypeUpdateText:any;
    selectdeviceid:string;
    SelectDeviceType(){
      this.selectdeviceid = this.DeviceTypeUpdateText.param1;
    }

    Departmenteditsve(){
      //  alert("hello");
      this.submitted = true;
       // var divisiondata = $('#divisiondummy').val();
        var devicedata = $('#deviceiddummy').val();
        var remark = $('#departmentremarkupdate').val();
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
          $('#devicetypeupdate').focus();
          setTimeout(function(){document.getElementById("msg_errorupdate").style.display="none";}, 3000);
        }
        else if(!remark && remark.length <= 0){
          isValid = false;
          $('#msg_errorupdate').html('Please Enter Remark').show();
          $('#departmentremarkupdate').focus();
          setTimeout(function(){document.getElementById("msg_errorupdate").style.display="none";}, 3000);
        }
        else{
          let dataL = {
             pageID: "7",
             pageName: this.encryptedpageNameValue,
             pageURL: this.encryptedpageUrlValue,
            param1:this.RemarkupdateText,
            param2:this.devicedepartmentid,
            param3:this.deviceid,
            param4: this.selectdeviceid,
           // deviceList:this.datasave, 
        
              }
      
              try{AddLoader()}catch(e){alert(e)}
      
          this.devicemappingService.Changedevicetodepartment(dataL).subscribe((data)=>{
             
            try{RemoveLoader()}catch(e){alert(e)}
      
            this.datafromrespo = data.entity;
          
           if(this.datafromrespo == 'Successfully assign.')
           {
           $("#SuccessModal").modal('show');
           this.DeviceMappingDetail(); this.clearfunction();
           }
           else
           {
            $("#ErrorModal").modal('show');
           }
          });
        }
       }

       clearfunction(){

        this.department=""; this.DeviceTypeUpdateText=""; this.RemarkupdateText=""; this.selectdeviceid="";

       }
}
