import { AssigndeviceemployeeService } from './../../../../APIService/assigndeviceemployee.service';
//import { EmployeeassigndepartmentService } from './../../../../APIService/employeeassigndepartment.service';
import { DeviceassigndepartmentmodelService } from './../../../../APIService/deviceassigndepartmentmodel.service';
import { EmployeemodelService } from './../../../../APIService/employeemodel.service';
import { PlaceodrmodelService } from './../../../../APIService/placeodrmodel.service';
import { CustomermodelService } from './../../../../APIService/customermodel.service';
import { Router } from '@angular/router';
import { ListService } from './../../../../../list.service';

import { Paramcls } from './../../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as $ from 'jquery';
import { CryptService } from '../../services/crypt.service';
declare var jQuery: any;
declare var $: any;
declare var AddLoader:any;
declare var RemoveLoader:any;

@Component({
  selector: 'app-employeemappentry',
  templateUrl: './employeemappentry.component.html',
  styleUrls: ['./employeemappentry.component.css']
})
export class EmployeemappentryComponent implements OnInit {
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  
  pageUrl = this.router.url;

  selectedItemsList = [];
  checkedIDs = [];userKey1:any;
 // ListOfdevicetype = [];
  devicetypebulkText = [];
  deleteText:string; successMessageUpdate:string;  datafromrespo:string;
  public loading = false;
 // config:number; 
  count:number;
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };

  constructor(private modalService: NgbModal,private flashMessage: FlashMessagesService, private employeemodelservice:EmployeemodelService ,private listService:ListService, private cryptService:CryptService,private router:Router, private devicemappingService:DeviceassigndepartmentmodelService, private placeodrService:PlaceodrmodelService ,private employeedevicemappingService:AssigndeviceemployeeService) { 
    this.EncryptPageName();
    this.EncryptPageUrl();
  }

  flag1:number=0;
  ngOnInit() {
    // this.fetchSelectedItems();
    // this.fetchCheckedIDs();
   // this.Employeelist();
    this.DeviceTypelist();
    //this.Customerlist();
    //mainloader
    this.userKey1 = sessionStorage.getItem('rid');
    if (this.userKey1 == '10' || this.userKey1 == '11' || this.userKey1 == '16' || this.userKey1 == '21') {
      this.flag1 = 1;
      this.Customerlist();
      $("#customerentry").show();
      //  $("#label3").show();
      //  $("#label4").show(); 
      $('#customerentry').focus();
     
      $("#custlist").css("display", "block");
    }
    if (this.userKey1 == '14' || this.userKey1 == '18') {
      this.flag1 = 0;
      $("#customerentry").hide();
      this.Divisionlist();
      //  $("#label3").hide();
      //  $("#label4").hide();
      $('#divisionentry').focus();
      $("#custlist").css("display", "none");
   
    }
    

    $(document).ready(function() {
      var numitems =  $("#myList li").length;
       
      $("ul#myList").css("column-count",numitems/2);
  });
  this.checkroleid()
  }
  checkid:string;
  checkroleid(){
     this.checkid = localStorage.getItem('rid');
    if(this.checkid == '18'){
    
      this.Divisionlist();
     // this.SubDivisionlist();
      //this.Employeelist();
      //this.Departmentlist();
      
    }
    else if(this.checkid == '25'){
      // alert("role id is 25");
    }
  }
  EncryptPageName() {
    this.cryptService.encrypt("Employee Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
   // console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
   // console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }
  

  ListOfCustomer = [];
  Customerlist() {

    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.CustomerListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfCustomer = data.entity.list;
        this.loading = false;
      });
  }
   ListOfDevicetype = [];
   DeviceTypeText:any;
   selectdevicetype = [];
   DeviceTypelist(){
     //this.selectstate = this.stateText.param1;
    // console.log(this.stateText.param2);
      let keydata = {
        param1:"",
        param2:"",
        param3:"",
        param4:"",
        pageID: "7",
         pageName: this.encryptedpageNameValue,
         pageURL: this.encryptedpageUrlValue
      }  
      try{AddLoader()}catch(e){alert(e)} 

      this.listService.DeviceAssignEmployeeListAPI(keydata).subscribe(
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
      var cid = $("#customerentryid").val();
   
      var divisiondata = $('#divisiondummy').val();
      var subdivision = $('#subdivisiondummy').val();
      var departmentdata =  $('#departmentdummy').val();
      var employeedata = $('#employeedummy').val();
      var devicetype = $('#devicetypedummy').val();
      var isValid = true;
      
    
      if(this.flag1 == 1 && (!cid && cid.length <= 0))
      {
     
        isValid = false;
        $('#msg_vendorName1').html('Please Select Customer').show();
        $('#customerentry').focus();
        setTimeout(function(){document.getElementById("msg_vendorName1").style.display="none";}, 3000);
      }
      else
       if(!divisiondata && divisiondata.length <= 0){
      
        isValid = false;
        $('#msg_vendorName2').html('Please Select Division').show();
        $('#divisionentry').focus();
        setTimeout(function(){document.getElementById("msg_vendorName2").style.display="none";}, 3000);
      } 
      else if(!subdivision && subdivision.length <= 0){
        
        isValid = false;
        $('#msg_vendorName3').html('Please Select Sub Division').show();
        $('#subdivisionentry').focus();
        setTimeout(function(){document.getElementById("msg_vendorName3").style.display="none";}, 3000);
      }
      else if(!departmentdata && departmentdata.length <= 0){
    
        isValid = false;
        $('#msg_vendorName4').html('Please Select Department').show();
        $('#departmententry').focus();
        setTimeout(function(){document.getElementById("msg_vendorName4").style.display="none";}, 3000);
      }
      else if(!employeedata && employeedata.length <= 0){
  
        isValid = false;
        $('#msg_vendorName5').html('Please Select Employee').show();
        $('#employeeentry').focus();
        setTimeout(function(){document.getElementById("msg_vendorName5").style.display="none";}, 3000);
      }
      else if(!devicetype && devicetype.length <= 0){
     
        isValid = false;
        $('#msg_vendorName6').html('Please Select Device Type').show();
        $('#devicetypeentry').focus();
        setTimeout(function(){document.getElementById("msg_vendorName6").style.display="none";}, 3000);
      }
      else{
        let dataL = {
           pageID: "7",
           pageName: this.encryptedpageNameValue,
           pageURL: this.encryptedpageUrlValue,
          param1:"",
          param2:this.selectemployee,
          deviceList:[this.selectdevicetype], 
      
            }
  
            try{AddLoader()}catch(e){alert(e)}
  
        this.employeedevicemappingService.AssigndevicetoEmployee(dataL).subscribe((data)=>{
           
          try{RemoveLoader()}catch(e){alert(e)}
  
          this.datafromrespo = data.entity;
        
         if(this.datafromrespo == 'Successfully Saved.')
         {
         $("#SuccessModalEntry").modal('show');
         }
         else
         {
          $("#ErrorModalEntry").modal('show');
         }
        });
      }
    }

    ListOfDivision = [];
    DivisionentryText:any;
    selectdivision:string;custid:any;customerText:any;customerentryid:any;
    CustId() {
      this.custid = this.customerText.param1;
   
      this.customerentryid=this.custid;
      this.DivisionentryText = "";
      this.SubDivisionentryText = "";
      this.selectdivision = "";
      this.selectsubdivision = "";
      this.DepartmententryText = "";
      this.EmployeeentryText = "";
      this.DeviceTypeText = "";
      this.selectdepartment = "";this.selectemployee = "";;
    }

    diviArr: any = [];
    Divisionlist() {
 
      this.SubDivisionentryText = "";
      this.selectsubdivision = "";
      this.diviArr.length = 0;
      let keydata = {
        param1: this.custid,
        groupList: this.diviArr,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }
  
      this.listService.SelectV3DivisionListAPI(keydata).subscribe(
        (data) => {
  
          try { RemoveLoader() } catch (e) { alert(e) }
          this.ListOfDivision = data.entity;
          this.loading = false;
  
        });
    }



    ListOfSubDivision = [];
     SubDivisionentryText:any;
     selectsubdivision:string;


     selectdivisionval: string = ""; grpList: any = []; diviList: any = [];

     //subdivision list
     SelectDivisionData() {
     
       this.selectdivision = this.DivisionentryText.param1;
       this.grpList.length = 0;
       this.diviList.push(this.selectdivision);
   
       let keydata = {
         param1: this.custid,
         groupList: this.grpList,
         divisionList: this.diviList,
         pageID: "7",
         pageName: this.encryptedpageNameValue,
         pageURL: this.encryptedpageUrlValue
       }
       try { AddLoader() } catch (e) { alert(e) }
   
       this.listService.SelectV1SubDivisionListAPI(keydata).subscribe(
         (data) => {
   
           try { RemoveLoader() } catch (e) { alert(e) }
   
           // alert(JSON.stringify(data));
           //  console.log(data.entity)
           // console.log("wekcome_ "+data);
           this.ListOfSubDivision = data.entity;
           //  this.resdata =     
           this.loading = false;
   
         });
     }

     ListOfDepartment = [];
     DepartmententryText:any;
     selectdepartment: string;
     SelectSubDivisionData(){
       this.selectsubdivision = this.SubDivisionentryText.param1;
      // console.log(this.stateText.param2);
        let keydata = {
         
          param1:this.selectdivision,
          param2:this.selectsubdivision,
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
      ListOfEmployee = [];
 EmployeeentryText:any;
 selectemployee: string;
 SelectDepartmentData(){
    this.selectdepartment = this.DepartmententryText.param1;
   // console.log(this.stateText.param2);
     let keydata = {
     
       param1:this.selectdivision,
       param2:this.selectsubdivision,
       param3:this.selectdepartment,
     
       pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
     }  
     try{AddLoader()}catch(e){alert(e)} 

     this.listService.SelectEmployeeCustomerListAPI(keydata).subscribe(
       (data)  => {

        try{RemoveLoader()}catch(e){alert(e)}

        // alert(JSON.stringify(data));
       //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfEmployee = data.entity.list; 
       //  this.resdata =     
         this.loading = false; 
        
       });
   }

    
  SelectEmployeeData()
  {
   this.selectemployee = this.EmployeeentryText.param1;
   //alert(this.selectdepartment);
  } 
  SelectDeviceType(){
    this.selectdevicetype = this.DeviceTypeText.param1;
  }
    DeviceDetailsClick(){
      this.router.navigate(['./EMPLOYEEmappingdetails']);
    }
}
