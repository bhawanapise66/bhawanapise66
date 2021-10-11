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
declare var AddLoader:any;
declare var RemoveLoader:any;

@Component({
  selector: 'app-device-mappingentry',
  templateUrl: './device-mappingentry.component.html',
  styleUrls: ['./device-mappingentry.component.css']
})
export class DeviceMappingentryComponent implements OnInit {
  
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  
  pageUrl = this.router.url;

  selectedItemsList = [];
  checkedIDs = [];
  filter:any;
 // ListOfdevicetype = [];
  devicetypebulkText = [];
  deleteText:string; successMessageUpdate:string;  datafromrespo:string;
  public loading = false;
 // config:number; 
  count:number;

  checkboxesDataList = [
    {
      id: 'C001',
      label: 'Photography',
      isChecked: true
    },
    {
      id: 'C002',
      label: 'Writing',
      isChecked: true
    },
    {
      id: 'C003',
      label: 'Painting',
      isChecked: true
    },
    {
      id: 'C004',
      label: 'Knitting',
      isChecked: false
    },
    {
      id: 'C004',
      label: 'Dancing',
      isChecked: false
    },
    {
      id: 'C005',
      label: 'Gardening',
      isChecked: true
    },
    {
      id: 'C006',
      label: 'Drawing',
      isChecked: true
    },
    {
      id: 'C007',
      label: 'Gyming',
      isChecked: false
    },
    {
      id: 'C008',
      label: 'Cooking',
      isChecked: true
    },
    {
      id: 'C009',
      label: 'Scrapbooking',
      isChecked: false
    },
    {
      id: 'C010',
      label: 'Origami',
      isChecked: false
    }
  ]

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };

  constructor(private modalService: NgbModal,private flashMessage: FlashMessagesService, private employeemodelservice:EmployeemodelService ,private listService:ListService, private cryptService:CryptService,private router:Router, private devicemappingService:DeviceassigndepartmentmodelService , private placeodrService:PlaceodrmodelService ) { 
    this.EncryptPageName();
    this.EncryptPageUrl();
  }

  ngOnInit() {

    
    $('#divisionentry').focus();
    

    this.fetchSelectedItems();
    this.fetchCheckedIDs();
    this.Divisionlist();
    this.DeviceTypelist();
    this.clearfunction();

    

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
    console.log(this.datasave);
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

  SelectDepartmentData()
{
 this.selectdepartment = this.DepartmententryText.param1;
 //alert(this.selectdepartment);
} 
//  ListOfDepartment = [];
//   DepartmententryText:any;
//   selectdepartment: string;
//   Departmentlist(){
//     //this.selectstate = this.stateText.param1;
//    // console.log(this.stateText.param2);
//      let keydata = {
//        param1:"",
//        param2:"",
//        pageID: "7",
//         pageName: this.encryptedpageNameValue,
//         pageURL: this.encryptedpageUrlValue
//      }  

     
//      try{AddLoader()}catch(e){alert(e)}


//      this.listService.SelectDepartmentListAPI(keydata).subscribe(
//        (data)  => {

//         try{RemoveLoader()}catch(e){alert(e)}

//         // alert(JSON.stringify(data));
//        //  console.log(data.entity)
//         // console.log("wekcome_ "+data);
//         this.ListOfDepartment = data.entity.list; 
//        //  this.resdata =     
//          this.loading = false; 
        
//        });
//    }

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


  DeviceMapping(){
    var divi = $("#divisiondummy").val();
    var subdivi = $("#subdivisiondummy").val();
    alert(this.datasave.length);
    var departmentdata = $('#departmentdummy').val();
   
    var isValid = true;
    if(!divi && divi.length <= 0){
      // alert(devicetype);
      isValid = false;
      $('#msg_vendorName1').html('Please Enter Division').show();
      $('#divisionentry').focus();
      setTimeout(function(){document.getElementById("msg_vendorName1").style.display="none";}, 3000);
    }
    else
    if(!subdivi && subdivi.length <= 0){
      // alert(devicetype);
      isValid = false;
      $('#msg_vendorName2').html('Please Enter Sub Division').show();
      $('#subdivisionentry').focus();
      setTimeout(function(){document.getElementById("msg_vendorName2").style.display="none";}, 3000);
    }
  else
     if(!departmentdata && departmentdata.length <= 0){
      // alert(devicetype);
      isValid = false;
      $('#msg_vendorName3').html('Please Enter Department').show();
      $('#devicetypebulkentry').focus();
      setTimeout(function(){document.getElementById("msg_vendorName3").style.display="none";}, 3000);
    }
    else
    if(this.datasave.length == 0)
    {
      $('#msg_vendorName4').html('Please Select Device').show();
      setTimeout(function(){document.getElementById("msg_vendorName4").style.display="none";}, 3000);

    }
    else{
      let dataL = {
         pageID: "7",
         pageName: this.encryptedpageNameValue,
         pageURL: this.encryptedpageUrlValue,
        param1:"",
        param2:this.selectdepartment,
        deviceList:this.datasave, 
    
          }

          try{AddLoader()}catch(e){alert(e)}

      this.devicemappingService.InsertDeviceDepartmentMappingAPI(dataL).subscribe((data)=>{
         
        try{RemoveLoader()}catch(e){alert(e)}

        this.datafromrespo = data.entity;
      
       if(data.entity == '200')
       {
       $("#successmodelentry11").modal('show')
       this.clearfunction();
       }
       else
       {
        $("#notifymodelentry11").modal('show');
       }
      });
    }
  }
  ListOfDivision = [];
  DivisionentryText:any;
  selectdivision:string;
  Divisionlist(){
    //this.selectstate = this.stateText.param1;
   //console.log(this.stateText.param2);
     let keydata = {
       param1:"",
       param2:"",
       pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
     }  
     try{AddLoader()}catch(e){alert(e)} 

     this.listService.SelectDivisionListAPI(keydata).subscribe(
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
     SelectDivisionData(){
      this.selectdivision = this.DivisionentryText.param1;
     // console.log(this.stateText.param2);
       let keydata = {
         param1:this.selectdivision,
     
         pageID: "7",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
       }  
       try{AddLoader()}catch(e){alert(e)} 
  
       this.listService.SelectSubDivisionListAPI(keydata).subscribe(
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

     ListOfDepartment = [];
     DepartmententryText:any;
     selectdepartment: string;
     SelectSubDivisionData(){
      this.selectdivision = this.DivisionentryText.param1;

       this.selectsubdivision = this.SubDivisionentryText.param1;
     
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

  DeviceDetailsClick(){
    this.router.navigate(['./DevicedeptDetails']);
  }

  searchdataDeviceid(){

    var search = $('#searchDataDeviceID').val();
    //this.selectstate = this.stateText.param1;
    // console.log(this.stateText.param2);
    let keydata = {
      param1:"",
      param2:"",
      param5:search,
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

  clearfunction(){
    this.DivisionentryText=""; this.SubDivisionentryText=""; this.DepartmententryText=""; this.selectdepartment="";
  }

}
