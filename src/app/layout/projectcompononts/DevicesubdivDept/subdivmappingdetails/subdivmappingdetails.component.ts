import { AssigndevicesubdivisionService } from './../../../../APIService/assigndevicesubdivision.service';
import { AssigndeviceemployeeService } from './../../../../APIService/assigndeviceemployee.service';
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
import { ExportToExcelService } from '../../services/export-to-excel.service';
import { PdfService } from '../../services/pdf.service';
declare var jQuery: any;
declare var $: any;
declare var AddLoader:any;
declare var RemoveLoader:any;

@Component({
  selector: 'app-subdivmappingdetails',
  templateUrl: './subdivmappingdetails.component.html',
  styleUrls: ['./subdivmappingdetails.component.css']
})
export class SubdivmappingdetailsComponent implements OnInit {
  @ViewChild('epltable',{ static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  key: string = 'name'; reverse: boolean = true;   
  filter:string;
  selectRowsText:string = "10";
  public loading = false; p: number;   pagecount:number; count:number; viewcount:number; 
  remarkText:string;  mobilenoText:string; noOfdeviceText:string; deleteText:string; DeviceMappingDetails$:Object; EmployeeMappingDetails$:Object;

  noof_device:string; cust_name:string; mobile_no:string; remark_:string; odr_no:string; datafromrespo:string;
  PlaceOrderDetails$:Object; orderid:string; RemarkupdateText:string; itemsPerPage=10; submitted=false;
  
  pageUrl = this.router.url;
  private _success = new Subject<string>();  successMessageUpdate: string;
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  constructor(public pdfservice: PdfService,public excelservice: ExportToExcelService,private modalService: NgbModal,private flashMessage: FlashMessagesService , private postService:PostService,private listService:ListService, private devicemappingService:DeviceassigndepartmentmodelService , private cryptService:CryptService,private router:Router, private placeodrService:PlaceodrmodelService ,private employeedevicemappingService:AssigndeviceemployeeService,private subdivisiondevicemappingService:AssigndevicesubdivisionService) { }

  ngOnInit() {
    this.EncryptPageName();
    this.EncryptPageUrl();

    this.DeviceMappingDetail();
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
       this.filter="";
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
     this.subdivisiondevicemappingService.SubDivisionDeviceDetailsAPI(keydata).subscribe(
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
       
  this.loading = true; 
  
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
   this.subdivisiondevicemappingService.SubDivisionDeviceDetailsAPI(keydata).subscribe(
    (data)  => {
      try{RemoveLoader()}catch(e){alert(e)} 

      let resdatalist = data.entity.list; 
     //  this.resdata = 
     // console.log("wekcome_ "+resdata);

       let devicelist = resdatalist;
   
       this.DeviceMappingDetailsarr = devicelist;
  
       this.loading = false; 
    });
    this.PrepareExcelData(this.DeviceMappingDetailsarr);
}

DeviceMappingDetailsarr :any=[];
ListOfDepartment = [];
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
   this.subdivisiondevicemappingService.SubDivisionDeviceDetailsAPI(keydata).subscribe(
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
deviceid:string; deviceimei:string; deviceunique:string;  customername:string; customermobile:string;  customerpincode:string;
designation:string; department:string;Employeeid:string; division:string; subdivision:string; subdivisionid:string;
setdata(com){
  // alert(com);
  this.backdetailsbtn();
   let empdatadetails = com;
   this.subdivisionid = empdatadetails.param2;
   this.deviceid =  empdatadetails.param3;
   this.deviceimei = empdatadetails.param10;
   this.deviceunique = empdatadetails.param11;
   this.customername = empdatadetails.param9;
  // this.customermobile = empdatadetails.param7;
  //  this.customerpincode = empdatadetails.param12;
   this.subdivision = empdatadetails.param6;
   this.division = empdatadetails.param13;
  //  this.department = empdatadetails.param7;
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
   this.subdivisiondevicemappingService.SubDivisionDeviceDetailsAPI(keydata).subscribe(
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
   this.subdivisiondevicemappingService.SubDivisionDeviceDetailsAPI(keydata).subscribe(
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
  var search = $("#searchData").val();
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
   this.subdivisiondevicemappingService.SubDivisionDeviceDetailsAPI(keydata).subscribe(
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

 EmployeeUnassignfunction(){
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
    param2:this.Employeeid,
    param3:this.deviceid,
    pageID: "7",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
      }
      try{AddLoader()}catch(e){alert(e)} 

  this.employeedevicemappingService.EmployeeUnassignDeviceDetailsAPI(dataL).subscribe((data)=>{
    try{RemoveLoader()}catch(e){alert(e)} 

  //  alert(dataL); 
  //  alert(data);
  this.datafromrespo = data.entity;
    
  if(data.statuscode == '200')
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
    this.router.navigate(['./Subdivisionmappingentry']);

  }

  clear()
  {
    this.deleteText = "";
    this.RemarkupdateText = "";
    this.filter="";
  }
  closemodal(){
    this.filter="";
    //  alert("come ");
     $("#SuccessModel").modal('hide');
 
     $('#modeldelete').modal('hide');
     $('#myModalwizard').modal('hide');
 
     $('.modal-backdrop.show').css('display', 'none');

   }
   DeviceUnassignfunction(){
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
      param2:this.subdivisionid,
      param3:this.deviceid,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
        }
  
        try{AddLoader()}catch(e){alert(e)} 
  
    this.subdivisiondevicemappingService.UnassignSubDivisionDeviceUpdateAPI(dataL).subscribe((data)=>{
      try{RemoveLoader()}catch(e){alert(e)} 
  
    //  alert(dataL);
    //  alert(data);
    this.datafromrespo = data.entity;
      
    if(data.statuscode == '200')
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
     this.submitted = true;

    //  alert("hello");
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
        $('#msg_errorupdate1').html('Please Enter Remark').show();
        $('#departmentremarkupdate').focus();
        setTimeout(function(){document.getElementById("msg_errorupdate1").style.display="none";}, 3000);
      }
      else{
        let dataL = {
           pageID: "7",
           pageName: this.encryptedpageNameValue,
           pageURL: this.encryptedpageUrlValue,
          param1:this.RemarkupdateText,
          param2:this.subdivisionid,
          param3:this.deviceid,
          param4: this.selectdeviceid,
         // deviceList:this.datasave, 
      
            }
    
            try{AddLoader()}catch(e){alert(e)}
    
        this.subdivisiondevicemappingService.SubDivisionDeviceUpdateAPI(dataL).subscribe((data)=>{
           
          try{RemoveLoader()}catch(e){alert(e)}
    
          this.datafromrespo = data.entity;
        
         if(data.statuscode == '200')
         {
         $("#SuccessModal").modal('show');
         this.DeviceMappingDetail();
         this.RemarkupdateText="";
         }
         else
         {
          $("#ErrorModal").modal('show');
         }
        });
      }
     }


     createPDF()  {
      let pdfTableData;
      let dataArray = []
      for (let i = 0; i < this.DeviceMappingDetailsarr.length; i++) {
         pdfTableData = {
           "#":  this.DeviceMappingDetailsarr[i]["rowNumber"],
          "Sub-Division Name": this.DeviceMappingDetailsarr[i]["param6"],
          "Device Unique No.": this.DeviceMappingDetailsarr[i]["param11"],
               "Device IMEI No.": this.DeviceMappingDetailsarr[i]["param10"],
          "Assign Date": this.DeviceMappingDetailsarr[i]["param4"],
       "Division Name": this.DeviceMappingDetailsarr[i]["param18"],
      
        }
        dataArray.push(pdfTableData)
      };
      this.pdfservice.CreatePDFData(dataArray,"Sub Division Device Details");  
    
    }
  
    excelData:any=[];
    PrepareExcelData(data) {
      this.excelData = [];
  
      for (var i = 0; i < data.length; i++) {
        try {
          var obj = {
           "#": i + 1,
            "Sub-Division Name": data[i].param6,
            "Device Unique No.": data[i].param11,
            "Device IMEI No.": data[i].param10,
            "Assign Date": data[i].param4,
            "Division Name": data[i].param18,
          }
        } catch (e) { }
        this.excelData.push(obj);
      }
    }
  
    exportToExcel() {
             this.DeviceMappingDetail1();
      this.excelservice.ExportExcel(this.excelData, 'Sub Division Device Details', 'subdivisiondevicedetails');
  
    }
}
