import { ExportToExcelService } from './../../../services/export-to-excel.service';
import { PdfService } from './../../../services/pdf.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListService } from './../../../../../../list.service';
import { CryptService } from './../../../services/crypt.service';
import { CitymodelService } from './../../../../../APIService/citymodel.service';
import { Paramcls } from './../../../../../../paramcls';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as xlsx from 'xlsx';
import * as $ from 'jquery';
declare var SuccessAlert: any;
declare var errorAlert: any;
//import * as $ from 'jquery';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
@Component({
  selector: 'app-citymasterdetail',
  templateUrl: './citymasterdetail.component.html',
  styleUrls: ['./citymasterdetail.component.css']
})
export class CitymasterdetailComponent implements OnInit {
  @ViewChild('epltable',{ static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;write_privilege:string;
  timer:any;
  pageUrl = this.router.url;
  private _success = new Subject<string>();  successMessageUpdate: string;
  public loading = false; p: number;   pagecount:number=10; count:number; viewcount:number;
  key: string = 'name'; reverse: boolean = true;
  filter:string; deleteTextmodal:string; datafromrespo:string;

  CityDetails$:Object;  // city detail api
  CityDetails1$:[];
  city_id:string;
  city_name:any;
  citystate_id:any;
  pin_code:string;

  cust_email:string; cust_mobno:string; cust_state:any; cust_city:any; cust_alt_mobno:string;  reg_add:string; 


  ListOfDistributor$:Object;ListOfDealer$:Object;ListOfState$:Object;ListOfCity$:Object; ListOfCustomerType$:Object;  ListOfCustomerCategory$:Object;

  custtypeText:string; custcategoryText:string;   company_name:string;
   

  distibutorText:string; dealerText:string; Customertype:string; compnameText:string; 

  ListOfState = []; ListOfCity = [];  ListOfDistributor = []; ListOfDealer = [];  ListOfCustomerCategory = []; ListOfCustomerType =[];


  personnameText:string;personnoText:string;personaltnoText:string;personemailText:string;cityText:string;AreaText:string; landmarkText:string; regaddressText:string;pincodeText:string;
  itemsPerPage:number=10;
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 2000,
    height: '200px',
  };
  constructor(public excelservice: ExportToExcelService,public pdfservice: PdfService,private modalService: NgbModal,private flashMessage: FlashMessagesService ,private listService:ListService, private cryptService:CryptService,private router:Router, private citymodelService :CitymodelService) { }


  ngOnInit(){

    /* ------------------------------- Wizards start Ts------------------------------------------------- */

    this.count = 0;
    this.viewcount = 0;
 
    this.write_privilege =sessionStorage.getItem('writePrivilege');

    if(this.write_privilege == "false")
    {
      $("#editbtn").css("display", "none");
      $("#deletebtn").css("display", "none");
      $("#addnewcity").css("display", "none");
     $('#editbtn').hide();
     $('.material-icons md-18').css("display", "none");
     $('#deletebtn').attr('disabled','disabled');
     $('#addnewcity').attr('disabled','disabled');
    }
    this.EncryptPageName();
    this.EncryptPageUrl();

    this.CityDetail();
    
    this.Statelist();
    this.clear();
 
/* ------------------------------- Wizards end Ts------------------------------------------------- */
  }
  EncryptPageName() {
    this.cryptService.encrypt("City Master Details")
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

    // this.Citylist();
    
     this.Statelist();
     this.Districtlist();
     if(this.write_privilege == "false")
     {
       $('#editbtn').hide();
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
    $('#editbtn').hide();
  }
  }

 
  

 

   /*-------------List of State Api ---------------*/  
   customer_name:string;
   

   selectdistributot:string;
  // distibutorText:any;
  //  dealer_name:any;
   selectdealer:string;
  // dealer_name:any;
   customer_type:any;
   selectcustomertype:string;
  //  citynameText:any;
   cust_catagory:any;
   selectcustomercatagory:string;
  // custcategoryText:any;
   selectstate:string;
   selectcity:string;remarkTextcity:any;

   editCity(){
  
    var isValid = true; 
    var state_txt = $('#state').val();
    var remark = $('#Remarkvenupdate').val();
    var state_idtxt = $('#dummynameentrytxtidstate').val();
    var citynameentry_txt = $('#citynameentry').val();
    var pincodeno_txt = $('#pincodeno').val();
 
    this.city_namedemo = citynameentry_txt.substring(0, 1).toUpperCase() + citynameentry_txt.substring(1);
    this.remarkTextcity = remark.substring(0, 1).toUpperCase() + remark.substring(1);
    if(!state_idtxt && state_idtxt.length <= 0){
      isValid = false;
       $('#msg_errorentry_citymodel').html('Please Select State').show(); 
       
       setTimeout(function(){document.getElementById("msg_errorentry_citymodel").style.display="none";}, 3000);      
     }else
     if(!this.cust_district && this.cust_district.length <= 0){
      isValid = false;
       $('#msg_errorentry_citymodel').html('Please Select District').show(); 
       $('#dummynameentrytxtiddistrict').focus();  
       setTimeout(function(){document.getElementById("msg_errorentry_citymodel").style.display="none";}, 3000);      
     }else
     if(!citynameentry_txt && citynameentry_txt.length <= 0){
      isValid = false;
       $('#msg_errorentry_citymodel').html('Please Enter City Name').show(); 
       $('#citynameentry').focus();  
       setTimeout(function(){document.getElementById("msg_errorentry_citymodel").style.display="none";}, 3000);      
     }else
    if(!pincodeno_txt && pincodeno_txt.length <= 0){
     isValid = false;
      $('#msg_errorentry_citymodel').html('Please Enter Pincode No.').show(); 
      $('#pincodeno_txt').focus();  
      setTimeout(function(){document.getElementById("msg_errorentry_citymodel").style.display="none";}, 3000);      
    }else 
    if(!remark && remark.length <= 0){
     isValid = false;
     $('#msg_errorupdatetype').html('Please Enter Remark').show();
     $('#Remarkvenupdate').focus();
     setTimeout(function () { document.getElementById("msg_errorupdatetype").style.display = "none"; }, 3000);
  
   }
    else{
      let dataL = {
        param1:this.remarkTextcity,
        param2:this.city_id,
        param3:this.city_namedemo,
        param4:this.citystate_id,
        param5:this.cust_district,
        param6:this.city_namedemo,
        param7:this.pin_code,
         pageID: "7",
         pageName: this.encryptedpageNameValue,
         pageURL: this.encryptedpageUrlValue
          }
          try { AddLoader() } catch (e) { alert(e) }
      this.citymodelService.UpdateCityEditAPI(dataL).subscribe((data)=>{
        try { RemoveLoader() } catch (e) { alert(e) }
      this.datafromrespo = data.entity;
      var msg = this.datafromrespo;
      if(data.statuscode == '200')
      {
        SuccessAlert(msg);
        this.cust_state1="";
        this.Refreshfunction();
        this.closemodal();
       
        }
     
      else
      {
        errorAlert(msg);
      }
      });
    }
  }

 
  clear()
  {
    this.remarkTextcity="";
    this.cust_state="";
    this.cust_district="";
    this.city_namedemo="";
    this.pin_code="";

    this.filter="";
    this.cust_state1="";
    this.cust_district1="";

  } 

  // customer details function 

  CityDetail() {
       
    this.loading = true; 
        
    this.p = 1; this.pagecount=10;
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
    try { AddLoader() } catch (e) { alert(e) }
     this.citymodelService.CityDetailsAPI(keydata).subscribe(
      (data)  => {
        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.list; 
      let vendorlist = resdatalist;
     
         this.CityDetails$ = vendorlist;
         this.count = data.entity.count;
         this.viewcount = data.entity.viewCount;
        this.loading = false; 
      });
      this.CityDetail1();

}

CityDetail1() {
       
  this.loading = true; 
      
  // this.p = 1; 
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
   this.citymodelService.CityDetailsAPI(keydata).subscribe(
    (data)  => {
      try { RemoveLoader() } catch (e) { alert(e) }
      let resdatalist = data.entity.list; 
    let vendorlist = resdatalist;
   
       this.CityDetails1$ = vendorlist;
       this.PrepareExcelData(this.CityDetails1$);
      this.loading = false; 
    });
}

excelData:any=[];
  PrepareExcelData(data) {
    this.excelData = [];

    for (var i = 0; i < data.length; i++) {
      try {
        var obj = {

          "#": i + 1,
       
          "State": this.CityDetails1$[i]["param9"],
          "District": this.CityDetails1$[i]["param4"],
          "City": this.CityDetails1$[i]["param5"],
          "Pin code": this.CityDetails1$[i]["param10"]

        }
      } catch (e) { }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    this.CityDetail1();
    this.excelservice.ExportExcel(this.excelData, 'City Details', 'citydetails');

  }


/*---------------- cunstomer details function end  --------------------*/
/*---------------Customer search start --------------------------*/

searchdata(){
  var search = $('#searchData').val();
  this.cust_state1="";
  this.loading = true; 
        
  this.p = 1; 
  //this.pagecount = 5;
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
  
   // Distributor Detail Grid BIND LIST   
   try { AddLoader() } catch (e) { alert(e) } 
   this.citymodelService.CityDetailsAPI(keydata).subscribe(
    (data)  => {
      try { RemoveLoader() } catch (e) { alert(e) }
      let resdatalist = data.entity.list; 
   

       let vendorlist = resdatalist;
     
       this.CityDetails$ = vendorlist;
       this.count = data.entity.count;
       this.viewcount = data.entity.viewCount;
       this.loading = false; 
    });
}




SelectRows(){
  
  var search = $('#searchData').val();
  var selectrow = $('#selectrow14').val();
  var statedistrict=this.cust_state1["param1"];
  this.loading = true; 
 
  this.p = 1;
   this.pagecount = selectrow;
//  console.log("p" + this.p);
this.itemsPerPage=this.pagecount;
  let keydata = {
    param1:"",
    param2:statedistrict,
    pageNo:this.p,
    itemsPerPage: this.pagecount,    
    searchBy: search, 
    searchType:"",
    totalRecords:"NA",
    pageID: "7",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
  }
  
   // Distributor Detail Grid BIND LIST 
   try { AddLoader() } catch (e) { alert(e) }   
   this.citymodelService.CityDetailsAPI(keydata).subscribe(
    (data)  => {
      try { RemoveLoader() } catch (e) { alert(e) }
      let resdatalist = data.entity.list; 
   

       let vendorlist = resdatalist;
     
       this.CityDetails$ = vendorlist;
       this.count = data.entity.count;
       this.viewcount = data.entity.viewCount;
     
       this.loading = false; 
    });
}
city_namedemo:any;
cust_tehsil:any;
state_idtxt:string;
state_setcode:string;
setdata(com:Paramcls){
   this.city_id = com.param1;
   this.city_namedemo = com.param2; 
   this.citystate_id = com.param3; //citystateid
   this.cust_district = com.param4; //districtname
   this.cust_tehsil =com.param5;
 
   this.state_idtxt =com.param8;  //stateid
   this.cust_state = com.param9;  //statename
   this.pin_code = com.param10;  //pincode
this.state_setcode = com.param11;

   this.Districtlist();
this.backdetailsbtn();
  
}   
Refreshfunction(){
  this.loading = true; 
  this.filter="";
  this.cust_state1="";
 this.CityDetail();
 }

/*------------------Search End ---------------------*/


 createPDF()  {
 

  let pdfTableData;
  let dataArray = []
  for (let i = 0; i < this.CityDetails1$.length; i++) {
     pdfTableData = {
       "#":  this.CityDetails1$[i]["rowNumber"],
      "State": this.CityDetails1$[i]["param9"],
      "District": this.CityDetails1$[i]["param4"],
      "City": this.CityDetails1$[i]["param5"],
      "Pin code": this.CityDetails1$[i]["param10"]
    }
    dataArray.push(pdfTableData)
  };
   this.pdfservice.CreatePDFData(dataArray,"City Details");  
  

}



deleteclear()
{
  this.deleteTextmodal="";
  $('#modeldelete').modal('hide');
  $('.modal-backdrop.show').css('display', 'none');
}
 closemodal() {
   this.clear();
 
  $('#modeldelete').modal('hide');
  $('#myModalwizard').modal('hide');
  $('.modal-backdrop.show').css('display', 'none');
}
 CitypageChanged(event){
  var search = $('#searchData').val();
  var statedistrict=this.cust_state1["param1"];

    var selectrow = $('#selectrow14').val();
    this.p = event; 
    this.pagecount = selectrow;
    this.itemsPerPage=this.pagecount;

  let keydata = {
    param1:"",
param2:statedistrict,
      
    // param1:this.statevariable,
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
   this.citymodelService.CityDetailsAPI(keydata).subscribe(
    (data)  => {
      try { RemoveLoader() } catch (e) { alert(e) }
    //  console.log(data.entity)
      // console.log("wekcome_ "+data);
      let resdatalist = data.entity.list; 
     //  this.resdata = 
     // console.log("wekcome_ "+resdata);

       let vendorlist = resdatalist;
     
       this.CityDetails$ = vendorlist;
       this.count = data.entity.count;
       this.viewcount = data.entity.viewCount;
       
       this.loading = false; 
    });
 }
 sort(key){
 this.key = key;
 this.reverse = !this.reverse;
 
}
CityDeletefunction(){
  var isValid = true; 
  var deleteremark = $('#citydelremark').val();
  deleteremark = deleteremark.substring(0, 1).toUpperCase() + deleteremark.substring(1);
  // Validate Contact Name
  if(!deleteremark && deleteremark.length <= 0){
   isValid = false;
   $('#msg_error_delete').html('Please Enter Remark').show();
  //  this._success.next('Please Enter Remark.'); 
   $('#citydelremark').focus();
   setTimeout(function(){document.getElementById("msg_error_delete").style.display="none";}, 3000);
 }
 else
 { 
  let dataL = {
    param1:deleteremark,
    param2:this.city_id,
    pageID: "7",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
   
      }
      try { AddLoader() } catch (e) { alert(e) }
  this.citymodelService.DeleteCityAPI(dataL).subscribe((data)=>{
    try { RemoveLoader() } catch (e) { alert(e) }
 this.datafromrespo = data.entity;
 var msg = this.datafromrespo;
  if(data.statuscode == '200')
  {
    SuccessAlert(msg);
  this.cust_state1="";
  this.deleteTextmodal="";
  this.Refreshfunction();
  this.closemodal();

  }
  else
  {
    errorAlert(msg);
  }
  });
 
}
}



selectdistname1: string;
cust_district:any;
selectdist(){
  this.selectdistname1 = this.cust_district.param1;
 
}

ListOfDistrict=[];
statecode1:string;
Districtlist(){
//  this.statecode1 = this.cust_state1["param3"];
// var codestate = this.cust_state.param3;

  let keydata = {
      param1: this.state_setcode,
      pageID: "7",
       pageName: this.encryptedpageNameValue,
       pageURL: this.encryptedpageUrlValue
    }  
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectDistrictListAPI(keydata).subscribe(
      (data)  => {
        try { RemoveLoader() } catch (e) { alert(e) }
       this.ListOfDistrict = data.entity.list; 
      //  this.resdata = 
      // console.log("wekcome_ "+resdata);

      //   let citylist = resdatalist;
      // //  let resdatadev = resdata['list'];
      // //  console.log(resdatadev);
      // //  console.log(citylist);
      //   this.ListOfCity$ = citylist;
      
           
     
    
        this.loading = false; 
       
      });
  }

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
this.ListOfState =data.entity.list;
  this.loading = false; 
       
      });
  }
 
  cust_state1:any;
  statetxtdist:any;
  
  showdata()
  {
    this.selectstatename1 = this.cust_state.param1; 
    let searchbyText =this.cust_state.param1; 
   this.loading = true; 
          
      this.p = 1;
      // this.pagecount = 5;
    //  console.log("p" + this.p);
      
      let keydata = {
        
        param1:searchbyText,
        pageNo: this.p,
        itemsPerPage: this.pagecount,
        searchBy:"",
        searchType: "",
        totalRecords: "NA",
        pageID: "1",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      
       // Distributor Detail Grid BIND LIST    
       try { AddLoader() } catch (e) { alert(e) }
       this.citymodelService.CityDetailsAPI(keydata).subscribe(
        (data)  => {
          try { RemoveLoader() } catch (e) { alert(e) }
          let resdatalist = data.entity.list; 
         //  this.resdata = 
         // console.log("wekcome_ "+resdata);
   
           let vendorlist = resdatalist;
       
           this.CityDetails$ = vendorlist;
           this.count = data.entity.count;
           this.viewcount = data.entity.viewCount;
         
           this.loading = false; 
        });
  }
 
  
   selectstatename1:any;
  // selectdisttxt()
  // {
  //   this.selectstatename1 = this.cust_state.param1;
  //   console.log("District Name :"+ this.selectdistname1);
  //   this.showdata();
  // }
  selectdistrictdummmy:any;
  cust_district1:string;
  statevariable:string="";
  searchdata1()
  {
    this.filter="";
   // this.selectdistrictdummmy=this.cust_district1["param1"];
    var statedistrict=this.cust_state1["param1"];
   // var statedistrictname=this.cust_state1["param2"];
   // console.log("ID:"+statedistrict+"      Name:"+statedistrictname);
    // this.statevariable=statedistrict;
    this.loading = true; 
          
    this.p = 1; 
    this.itemsPerPage=this.pagecount;
   let keydata = {
param1:"",
param2:statedistrict,
      
      pageNo:this.p,
      itemsPerPage:this.pagecount,    
      searchBy:"", 
      searchType:"",
      totalRecords:"NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    
     // Distributor Detail Grid BIND LIST   
     try { AddLoader() } catch (e) { alert(e) } 
     this.citymodelService.CityDetailsAPI(keydata).subscribe(
    (data)  => {
      try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.list; 
        let resdatacount =data.responseEntityCount;
  if(resdatacount == '0')
  {
    this.CityDetails$  =[];
    this.count=0;
    this.viewcount=0;
  }
  else
       {  let vendorlist = resdatalist;
       
         this.CityDetails$  = vendorlist;
        
         this.count = data.entity.count;
         this.viewcount = data.entity.viewCount;
       }
         this.loading = false; 
      });

  }
  

changestate:string;
  Selectstateid()
  {
   this.citystate_id =this.cust_state.param1;
    this.state_setcode =this.cust_state.param3;
    this.cust_district = "";
    this.changedistrict = "";
this.Districtlist();

    

  }
  changedistrict:string;
  selectdistrictid()
  {
  this.changedistrict=this.cust_district["param1"];
  this.cust_district=this.cust_district["param2"];
  }
}
