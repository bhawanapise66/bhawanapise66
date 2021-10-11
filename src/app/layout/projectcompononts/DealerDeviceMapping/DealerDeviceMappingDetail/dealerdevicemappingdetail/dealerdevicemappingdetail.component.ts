import { ExportToExcelService } from './../../../services/export-to-excel.service';
import { PdfService } from './../../../services/pdf.service';
import { DistributordevicemappingService } from './../../../../../APIService/distributordevicemapping.service';
import { DealerdevicemappingService } from './../../../../../APIService/dealerdevicemapping.service';
import { AssigndevicesubdivisionService } from './../../../../../APIService/assigndevicesubdivision.service';
import { AssigndeviceemployeeService } from './../../../../../APIService/assigndeviceemployee.service';
import { PlaceodrmodelService } from './../../../../../APIService/placeodrmodel.service';
import { Router } from '@angular/router';
import { CryptService } from './../../../services/crypt.service';
import { DeviceassigndepartmentmodelService } from './../../../../../APIService/deviceassigndepartmentmodel.service';
import { ListService } from './../../../../../../list.service';
import { PostService } from './../../../../../../post.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as $ from 'jquery';
import * as xlsx from 'xlsx'
declare var jQuery: any;
declare var $: any;
declare var AddLoader:any;
declare var RemoveLoader:any;
@Component({
  selector: 'app-dealerdevicemappingdetail',
  templateUrl: './dealerdevicemappingdetail.component.html',
  styleUrls: ['./dealerdevicemappingdetail.component.css']
})
export class DealerdevicemappingdetailComponent implements OnInit {
  @ViewChild('epltable',{ static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  key: string = 'name'; reverse: boolean = true;   
  filter:string;
  selectRowsText:string = "10";
  public loading = false; p: number;   pagecount:number; count:number; viewcount:number; 
  remarkText:string;  mobilenoText:string; noOfdeviceText:string; deleteText:string; DeviceMappingDetails$:Object; EmployeeMappingDetails$:Object;

  noof_device:string; cust_name:string; mobile_no:string; remark_:string; odr_no:string; datafromrespo:string;
  PlaceOrderDetails$:Object; orderid:string; RemarkupdateText:string;
  
  pageUrl = this.router.url;
  private _success = new Subject<string>();  successMessageUpdate: string;
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };
  constructor(public excelservice: ExportToExcelService, public pdfservice: PdfService,private modalService: NgbModal,private flashMessage: FlashMessagesService , private postService:PostService,private listService:ListService, private devicemappingService:DeviceassigndepartmentmodelService , private cryptService:CryptService,private router:Router, private placeodrService:PlaceodrmodelService ,private employeedevicemappingService:AssigndeviceemployeeService,private subdivisiondevicemappingService:DealerdevicemappingService,private distributordevicemapping:DistributordevicemappingService) { }

  ngOnInit() {
    this.EncryptPageName();
    this.EncryptPageUrl();

    this.DeviceMappingDetail();
  }

  EncryptPageName() {
    this.cryptService.encrypt("Dealer Device mapping Details")
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
  itemsPerPage: number = 10;
  DeviceMappingDetail() {
       
    this.loading = true; 
        
    this.p = 1; this.pagecount = 10;
    this.itemsPerPage=this.pagecount;
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

ListOfDepartment = [];
DepartmententryText:any;
selectdepartment: string;
Departmentlist(){
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

      this.ListOfDepartment = data.entity.list; 
      
       this.loading = false; 
      
     });
 }

/*---------------- cunstomer details function end  --------------------*/
/*---------------Customer search start --------------------------*/

searchdata(){
  var search = $('#searchData').val();
  this.loading = true; 
        
  this.p = 1;
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
   this.distributordevicemapping.DistributorDeviceMappingDetailsAPI(keydata).subscribe(
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
distributorid:string;distributorname:string;dealername:string;dealerid:string;mno1:string;mno2:string;network1:string;network2:string;
setdata(com){
  let empdatadetails = com;
  this.deviceid = empdatadetails.param1;
  this.distributorid = empdatadetails.param59;
  this.distributorname = empdatadetails.param60;
  this.deviceimei = empdatadetails.param4;
  this.deviceunique = empdatadetails.param5;
  this.dealerid = empdatadetails.param45;
  this.dealername = empdatadetails.param12;
  this.mno1 = empdatadetails.param7;
  this.mno2 = empdatadetails.param8;
  this.network1 = empdatadetails.param9;
  this.network2 = empdatadetails.param10;
}




Refreshfunction(){
  this.selectRowsText = "10";
  this.loading = true; 
        this.filter = "";
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
   this.distributordevicemapping.DistributorDeviceMappingDetailsAPI(keydata).subscribe(
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

createPDF()  {
  let pdfTableData;
  let dataArray = []
  for (let i = 0; i < this.DeviceMappingDetails1$.length; i++) {
     pdfTableData = {
       "#":  this.DeviceMappingDetails1$[i]["rowNumber"],
       "Dealer": this.DeviceMappingDetails1$[i]["param12"],
      "Distributor": this.DeviceMappingDetails1$[i]["param60"],
     
      "Device Unique No": this.DeviceMappingDetails1$[i]["param5"],
      "Device IMEI No":  this.DeviceMappingDetails1$[i]["param4"],
      "Assign Date": this.DeviceMappingDetails1$[i]["param62"],
      "Mobile NO": this.DeviceMappingDetails1$[i]["param7"], 
      "Network":  this.DeviceMappingDetails1$[i]["param9"],
      "ICCID/Sim No": this.DeviceMappingDetails1$[i]["param6"],
      "Status": this.DeviceMappingDetails1$[i]["param29"],
    }
    dataArray.push(pdfTableData)
  };
  this.pdfservice.CreatePDFData(dataArray,"Dealer Device Mapping Details");  

}

excelData:any=[];
PrepareExcelData(data) {
  this.excelData = [];

  for (var i = 0; i < data.length; i++) {
    try {
      var obj = {
       "#": i + 1,
       "Dealer Name": data[i].param12,
        "Distributor Name": data[i].param60,
        
        "Device Unique No": data[i].param5,
        "Device IMEI No": data[i].param4,
        "Assign Date": data[i].param62,
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
  this.excelservice.ExportExcel(this.excelData, 'Dealer Device Mapping Details', 'dealerdevicemappingdetails');

}

 sort(key){

  //  alert(key);   

   this.key = key;
   this.reverse = !this.reverse;
   
 }

 dealerdevicemappingpageChanged(event){

  this.p = event;
  var selectrow = $('#selectrow1').val();
  var search = $('#searchData').val();

   this.loading = true;
   this.itemsPerPage=selectrow;
   this.pagecount = selectrow;
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

 
  
 

  
  DeviceEntry(){
    this.router.navigate(['./dealerdevicemapping']);

  }

  closemodal(){
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
    // alert(this.deviceid);
    let dataL = {
      param1:deleteremark,
      param2:this.deviceid,
      param3:this.dealerid,
     
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
        }
  
        try{AddLoader()}catch(e){alert(e)} 
        this.subdivisiondevicemappingService.DealerUnassignDeviceDetailsAPI(dataL).subscribe((data)=>{
   // this.subdivisiondevicemappingService.UnassignSubDivisionDeviceUpdateAPI(dataL).subscribe((data)=>{
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
      this.listService.DeviceDealerListAPI(keydata).subscribe(
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
      (data)  => {
        try{RemoveLoader()}catch(e){alert(e)} 

        let resdatalist = data.entity.list; 
       //  this.resdata = 
       // console.log("wekcome_ "+resdata);
  
         let devicelist = resdatalist;
     
         this.DeviceMappingDetails1$ = devicelist;
         this.PrepareExcelData(this.DeviceMappingDetails1$);
         this.loading = false; 
      });
}
DeviceMappingDetails1$:any=[];
}
