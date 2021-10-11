import { DistributordevicemappingService } from './../../../../../APIService/distributordevicemapping.service';
import { AssigndeviceemployeeService } from './../../../../../APIService/assigndeviceemployee.service';
import { PlaceodrmodelService } from './../../../../../APIService/placeodrmodel.service';
import { DeviceassigndepartmentmodelService } from './../../../../../APIService/deviceassigndepartmentmodel.service';
import { CryptService } from './../../../services/crypt.service';
import { ListService } from 'src/list.service';
import { EmployeemodelService } from './../../../../../APIService/employeemodel.service';
//import { EmployeeassigndepartmentService } from './../../../../APIService/employeeassigndepartment.service';

import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as $ from 'jquery';

declare var jQuery: any;
declare var $: any;
declare var AddLoader:any;
declare var RemoveLoader:any;

@Component({
  selector: 'app-distributordevicemappingmaster',
  templateUrl: './distributordevicemappingmaster.component.html',
  styleUrls: ['./distributordevicemappingmaster.component.css']
})
export class DistributordevicemappingmasterComponent implements OnInit {
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
    limitTo: 50000,
    height: '200px',
  };

  constructor(private modalService: NgbModal,private flashMessage: FlashMessagesService, private employeemodelservice:EmployeemodelService ,private listService:ListService, private cryptService:CryptService,private router:Router, private devicemappingService:DeviceassigndepartmentmodelService, private placeodrService:PlaceodrmodelService ,private employeedevicemappingService:DistributordevicemappingService) { 

    this.EncryptPageName();
    this.EncryptPageUrl();
  }

  ngOnInit(){
    this.fetchSelectedItems();
    this.fetchCheckedIDs();
    this.Divisionlist();
    this.DeviceTypelist();
    //mainloader
   

    

    $(document).ready(function() {
      var numitems =  $("#myList li").length;
       
      $("ul#myList").css("column-count",numitems/2);
  });
    //this.demo();
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
    // for (let i=0;i<this.selectedItemsList.length;i++){
    //   this.checkedIDsdemo.push(this.checkboxesDataList[i].id);  
    //    console.log("Id of value is"+this.checkedIDsdemo);
    // }
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

  SelectEmployeeData()
{
 this.selectemployee = this.EmployeeentryText.param1;
 //alert(this.selectdepartment);
} 
ListOfEmployee = [];
 EmployeeentryText:any;
 selectemployee: string;
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
        this.ListOfEmployee = data.entity.list; 
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
        pageID: "7",
         pageName: this.encryptedpageNameValue,
         pageURL: this.encryptedpageUrlValue
      }  
      try{AddLoader()}catch(e){alert(e)} 

      this.listService.DeviceAssignDistributorListAPI(keydata).subscribe(
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

  EmployeeMapping(){
    var departmentdata = $('#employeedummy').val();
    var isValid = true;
  
     if(!departmentdata && departmentdata.length <= 0){
      // alert(devicetype);
      isValid = false;
      $('#msg_errorentry').html('Please Enter Division').show();
      $('#employeedummy').focus();
      setTimeout(function(){document.getElementById("msg_errorentry").style.display="none";}, 3000);
    }
    else{
      let dataL = {
         pageID: "7",
         pageName: this.encryptedpageNameValue,
         pageURL: this.encryptedpageUrlValue,
        param1:"",
        param3:this.selectemployee,
        deviceList:this.datasave, 
    
          }

          try{AddLoader()}catch(e){alert(e)}

      this.employeedevicemappingService.Assigndevicetodistributor(dataL).subscribe((data)=>{
      //Assigndevicetodivision(dataL).subscribe((data)=>{
         
        try{RemoveLoader()}catch(e){alert(e)}

        this.datafromrespo = data.entity;
      
       if(data.statuscode == "200")
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
  DeviceDetailsClick(){
    this.router.navigate(['./distributordevicemappingdetail']);
  }


// Developer 	: Aditya Londhe
// Date      	: 4-1-2020
// Description : Device Division Mapping
// Modified By:  Aditya Londhe 
// Description : Added Search Box to search device Id 
// Update date : 8-1-2020

  searchdataDeviceid(){
 //this.selectstate = this.stateText.param1;
    // console.log(this.stateText.param2);
    var search = $('#searchDataDeviceID').val();

    let keydata = {
      param1:"",
      param2:"",
      param5:search,
      pageID: "7",
       pageName: this.encryptedpageNameValue,
       pageURL: this.encryptedpageUrlValue
    }  
    try{AddLoader()}catch(e){alert(e)} 

    this.listService.DeviceAssignDistributorListAPI(keydata).subscribe(
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
  closemodal(){
    //alert("come ");
   $("#SuccessModel").modal('hide');

   $('#modeldelete').modal('hide');
   $('#myModalwizard').modal('hide');

   $('.modal-backdrop.show').css('display', 'none');

 }
}
  