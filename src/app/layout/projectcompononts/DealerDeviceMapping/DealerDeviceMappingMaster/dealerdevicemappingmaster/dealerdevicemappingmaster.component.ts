import { DealerdevicemappingService } from './../../../../../APIService/dealerdevicemapping.service';
import { AssigndevicesubdivisionService } from './../../../../../APIService/assigndevicesubdivision.service';
import { AssigndeviceemployeeService } from './../../../../../APIService/assigndeviceemployee.service';
import { PlaceodrmodelService } from './../../../../../APIService/placeodrmodel.service';
import { DeviceassigndepartmentmodelService } from './../../../../../APIService/deviceassigndepartmentmodel.service';
import { Router } from '@angular/router';
import { CryptService } from './../../../services/crypt.service';
import { ListService } from './../../../../../../list.service';
import { EmployeemodelService } from './../../../../../APIService/employeemodel.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as xlsx from 'xlsx';
declare var jQuery: any;
declare var $: any;
import { Subject } from 'rxjs';
declare var jQuery: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
@Component({
  selector: 'app-dealerdevicemappingmaster',
  templateUrl: './dealerdevicemappingmaster.component.html',
  styleUrls: ['./dealerdevicemappingmaster.component.css']
})
export class DealerdevicemappingmasterComponent implements OnInit {
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  
  pageUrl = this.router.url;

  selectedItemsList = [];
  checkedIDs = [];
 // ListOfdevicetype = [];
  devicetypebulkText = [];
  deleteText:string; successMessageUpdate:string;  datafromrespo:string;
  filter:any;
  public loading = false;
 // config:number; 
  count:number;
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };

  constructor(private modalService: NgbModal,private flashMessage: FlashMessagesService, private employeemodelservice:EmployeemodelService ,private listService:ListService, private cryptService:CryptService,private router:Router, private devicemappingService:DeviceassigndepartmentmodelService, private placeodrService:PlaceodrmodelService
     ,private employeedevicemappingService:AssigndeviceemployeeService,private subdivisiondevicemappingService:DealerdevicemappingService) { 
    this.EncryptPageName();
    this.EncryptPageUrl();
  }
  ngOnInit() {

    (function ($) {
      $(document).ready(function() {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#divisionentry').focus();
      })
    });
    })(jQuery);

    // this.fetchSelectedItems();
    // this.fetchCheckedIDs();
   // this.Employeelist();
    this.DeviceTypelist();
    //mainloader
   
this.Divisionlist();
    

    $(document).ready(function() {
      var numitems =  $("#myList li").length;
       
      $("ul#myList").css("column-count",numitems/2);
  });
    this.checkroleid()
    //this.demo();
  }
  checkid:string;
  checkroleid(){
     this.checkid = sessionStorage.getItem('rid');
    if(this.checkid == '18' || this.checkid == '14'){
    
      this.Divisionlist();
     // this.SubDivisionlist();
      // this.Employeelist();
      // this.Departmentlist();
      document.getElementById('divisionlist').style.display="block";
      document.getElementById('subdivisionlist').style.display="block";
    }
    else if(this.checkid == '25'){
     // alert("role id is 25"); 
     document.getElementById('divisionlist').style.display="none";
      document.getElementById('subdivisionlist').style.display="block";  
    }
  }
  changeSelection() {
    this.fetchSelectedItems()
    this.demo();
    $("#assignbutton").prop('disabled', false);

    
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.ListOfDevicetype.filter((value, index) => {
      return value.isChecked;
     
    });
  }
    
  fetchCheckedIDs() {
 
    this.ListOfDevicetype.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.param2);
      }
    });
    
  } 
  
  datavalue:any;
  datasave = [];
  demo(){
    var checkedIDsdemo = [];
    this.datavalue = this.selectedItemsList;
   // console.log( this.datavalue);
    for (let i=0;i<this.datavalue.length;i++){
        checkedIDsdemo.push(this.selectedItemsList[i].param1);  
      //   console.log("Id of value is"+checkedIDsdemo);
      this.datasave = checkedIDsdemo;
      this.savevalue();
      }
  }
  savevalue(){
  //  console.log(this.datasave);
  } 
  EncryptPageName() {
    this.cryptService.encrypt("Dealer Device Mapping Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
   // console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
   // console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }
  // ListOfEmployee = [];
  // EmployeeentryText:any;
  // selectemployee: string;
  //  Employeelist(){
  //    //this.selectstate = this.stateText.param1;
  //   // console.log(this.stateText.param2);
  //     let keydata = {
  //       param1:"",
  //       param2:"",
  //       pageID: "7",
  //        pageName: this.encryptedpageNameValue,
  //        pageURL: this.encryptedpageUrlValue
  //     }  
  //     try{AddLoader()}catch(e){alert(e)} 
 
  //     this.listService.SelectEmployeeCustomerListAPI(keydata).subscribe(
  //       (data)  => {
 
  //        try{RemoveLoader()}catch(e){alert(e)}
 
  //        // alert(JSON.stringify(data));
  //       //  console.log(data.entity)
  //        // console.log("wekcome_ "+data);
  //        this.ListOfEmployee = data.entity.list; 
  //       //  this.resdata =     
  //         this.loading = false; 
         
  //       });
  //   }
    ListOfDivision = [];
    DivisionentryText:any;
    selectdivision:string;
    Divisionlist(){
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
          this.ListOfDivision = data.entity.list; 
         //  this.resdata =     
           this.loading = false; 
          
         });
     }

     ListOfSubDivision = [];
     SubDivisionentryText:any;
     selectsubdivision:string;
    // SubDivisionlist(){
    //   //this.selectstate = this.stateText.param1;
    //  // console.log(this.stateText.param2);
      
    //  }

    //  ListOfDepartment = [];
    //  DepartmententryText:any;
    //  selectdepartment: string;
    //  Departmentlist(){
    //    //this.selectstate = this.stateText.param1;
    //   // console.log(this.stateText.param2);
    //     let keydata = {
    //       param1:"",
    //       param2:"",
    //       pageID: "7",
    //        pageName: this.encryptedpageNameValue,
    //        pageURL: this.encryptedpageUrlValue
    //     }  
   
        
    //     try{AddLoader()}catch(e){alert(e)}
   
   
    //     this.listService.SelectDepartmentListAPI(keydata).subscribe(
    //       (data)  => {
   
    //        try{RemoveLoader()}catch(e){alert(e)}
   
    //        // alert(JSON.stringify(data));
    //       //  console.log(data.entity)
    //        // console.log("wekcome_ "+data);
    //        this.ListOfDepartment = data.entity.list; 
    //       //  this.resdata =     
    //         this.loading = false; 
           
    //       });
    //   }

    ListOfDevicetype = [];
    DeviceTypeText:any;
    selectdevicetype = [];
    DeviceTypelist(){
      //this.selectstate = this.stateText.param1;
     // console.log(this.stateText.param2);
       let keydata = {
         param1:"",
        
          pageID: "7",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
       }  
       try{AddLoader()}catch(e){alert(e)} 
 
       this.listService.DeviceDealerListAPI(keydata).subscribe(
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
     EmployeeMapping(){
       var divisiondata = $('#divisiondummy').val();
       var subdivision = $('#subdivisiondummy').val();
      // var devicetype = $('#devicetypedummy').val();
       var isValid = true;
     
        if(!divisiondata && divisiondata.length <= 0){
         // alert(devicetype);
         isValid = false;
         $('#msg_errorentry').html('Please Enter Division').show();
         $('#employeeentry').focus();
         setTimeout(function(){document.getElementById("msg_errorentry").style.display="none";}, 3000);
       } 
       else if(!subdivision && subdivision.length <= 0){
        isValid = false;
        $('#msg_errorentry').html('Please Enter Sub Division').show();
        $('#employeeentry').focus();
        setTimeout(function(){document.getElementById("msg_errorentry").style.display="none";}, 3000);
      }
      //  else if(!devicetype && devicetype.length <= 0){
      //    isValid = false;
      //    $('#msg_errorentry').html('Please Enter Device Type').show();
      //    $('#employeeentry').focus();
      //    setTimeout(function(){document.getElementById("msg_errorentry").style.display="none";}, 3000);
      //  }
       else{
         let dataL = {
            pageID: "7",
            pageName: this.encryptedpageNameValue,
            pageURL: this.encryptedpageUrlValue,
           param1:"",
          // param2:this.selectdivision,
           param3:this.selectsubdivision,
           deviceList:this.datasave, 
       
             }
   
             try{AddLoader()}catch(e){alert(e)}
   
         this.subdivisiondevicemappingService.Assigndevicetodealer(dataL).subscribe((data)=>{
            
           try{RemoveLoader()}catch(e){alert(e)}
   
           this.datafromrespo = data.entity;
         
          if(data.statuscode == '200')
          {
          $("#SuccessModalEntry").modal('show');
          this.DivisionentryText="";     
        this.SubDivisionentryText="";  
      this.filter="";   }
          else
          {
           $("#ErrorModalEntry").modal('show');
          }
         });
       }
     }
 
     selectdivisionval:string;
     SelectDivisionData()
   {
    this.selectdivision = this.DivisionentryText.param1;
    
    //alert(this.selectdivision);
    let keydata = {
      param1:this.selectdivision,
      pageID: "7",
       pageName: this.encryptedpageNameValue,
       pageURL: this.encryptedpageUrlValue
    }  
    try{AddLoader()}catch(e){alert(e)} 

    this.listService.DealerListAPI(keydata).subscribe(
      (data)  => {

       try{RemoveLoader()}catch(e){alert(e)}

       // alert(JSON.stringify(data));
      //  console.log(data.entity)
       // console.log("wekcome_ "+data);
       this.ListOfSubDivision = data.entity.list; 
      //  this.resdata =     
        this.loading = false; 
       
      });
   } 
   SelectSubDivisionData(){
    this.selectsubdivision = this.SubDivisionentryText.param1;
   }
   SelectDeviceType(){
     this.selectdevicetype = this.DeviceTypeText.param1;
   }
     DeviceDetailsClick(){
       this.router.navigate(['./dealerdevicemappingdetail']);
     }

     searchdataDeviceid(){
      var search = $('#searchDataDeviceID').val();
       //this.selectstate = this.stateText.param1;
     // console.log(this.stateText.param2);
     let keydata = {
      param1:"",
      param5: search,
       pageID: "7",
       pageName: this.encryptedpageNameValue,
       pageURL: this.encryptedpageUrlValue
    }  
    try{AddLoader()}catch(e){alert(e)} 

    this.listService.DeviceDealerListAPI(keydata).subscribe(
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

}
