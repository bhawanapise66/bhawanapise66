import { CustomercomplaintService } from './../../../../../APIService/customercomplaint.service';
import { CryptService } from './../../../services/crypt.service';
import { ListService } from './../../../../../../list.service';
import { Router } from '@angular/router';


import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as $ from 'jquery';
import * as xlsx from 'xlsx'
import { CustomermodelService } from 'src/app/APIService/customermodel.service';
declare var jQuery: any;
declare var $: any;
declare var AddLoader:any;
declare var RemoveLoader:any;
declare var SuccessAlert: any;
declare var errorAlert: any;

@Component({
  selector: 'app-uniquecomplaint',
  templateUrl: './uniquecomplaint.component.html',
  styleUrls: ['./uniquecomplaint.component.css']
})

export class UniquecomplaintComponent implements OnInit 
{
 
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  count:number;
    pageUrl = this.router.url;
  private _success = new Subject<string>();
  successMessage: string;
  public loading = false;
  isMasterSel:boolean;
  isSelected:boolean;
  isChecked1:any;
  userKey1:string;
  buttonHit = false; 

  filter:string="";  key: string = 'name'; reverse: boolean = true;
  constructor(private customerService: CustomermodelService,private modalService: NgbModal,private flashMessage: FlashMessagesService ,private listService:ListService, private cryptService:CryptService,private router:Router,private complaintService:CustomercomplaintService ) 
  {
    this.selectcustomer="";
    this.isMasterSel = false;    
    this.isSelected = true; 
    this.isChecked1 = true;
    this.pagevalue1=10;
  
   // this.getCheckedItemList();
  }
  showcustomer:any;showdetail:any;
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5900,
    height: '200px',
  };
  ngOnInit()
  {
    $('#searchidview').css('display','none');
    $('#hidedeviceno').css('display','none');
    this.complaintveh=false;
    //this.showscroll = false;
$("#rowshowdetail1").hide();


// $("#searchidview").hide();
// $("#hidedeviceno").hide();
// $("#GridTable").hide();






    // this.userKey1= localStorage.getItem('rid');
    this.userKey1 =sessionStorage.getItem('rid')
   
    if(this.userKey1 == '10' || this.userKey1 == '11' || this.userKey1 == '16' || this.userKey1 == '21') 
    {
    this.showcustomer = true;

      $('#customerentry').focus();
     
     
    }
    if(this.userKey1 == '14' || this.userKey1 == '18') 
    { 
      this.showdetail = true;
      this.showcustomer = false;
      //  $("#customerbtn").hide();
   //   alert("SECR");

      //this.getSelectedComplaint1(); 
      this.CustomerV3ListAPIDetail();
   
    }
   
   
    (function ($)
    {
      $(document).ready(function() { 
      //  $("#selectdetail").hide();   
     //   $('#customerentry').focus();
       //  $("#PDFTable").hide();   
        // $("#complaintdetailpage").hide();
        
      });

    

      
    })(jQuery);
      this.EncryptPageName();
      this.EncryptPageUrl();
      this.Customerlist();
      this.fetchCheckedIDs();
    //  this.getdummytable();
      // this.Complaintdetaildummy();
      this._success.subscribe((message) => this.successMessage = message);    
       this._success.pipe(
          debounceTime(8000)
        ).subscribe(() => this.successMessage = null);

        
       
       
}

sort(key){

  // alert(key);
 
  this.key = key;
  this.reverse = !this.reverse;
  
 }
ListOfCustomer= [];
Customerlist(){
 // alert("Lst");
  let keydata = {
    pageID: "7",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
  }  
  try{AddLoader()}catch(e){alert(e)} 
  this.listService.CustomerListAPI(keydata).subscribe(
    (data)  => {
      try{RemoveLoader()}catch(e){alert(e)} 
     this.ListOfCustomer  = data.entity.list; 
     this.loading = false; 
    });
}


customerText:string;
selectcustomer:string;
// selectcustomerdummy()
// {
//      this.selectcustomer=this.customerText["param1"];

// }

EncryptPageName() {
  this.cryptService.encrypt("Complaint Entry")
  this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
 // console.log("encrypted PageName is" + this.encryptedpageNameValue)

}
EncryptPageUrl() {
  this.cryptService.encrypt(this.pageUrl)
  this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
 // console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
}

searchcustomer:string;
searchdata(){
//  alert("btn click");
  //  this.searchcustomer = $('#customerdummy').val();
  this.searchcustomer=this.customerText["param2"];
 //  alert(this.searchcustomer);
}

tipdetailsgrid:[];
viewcount:any;
totalcount:any;
p: number = 1;
 pagecount: number =10;
myEpoch:number;
usermno:number;
useremailid:any;
stringifiedData:any;
cust_name:any="";showscroll:any;
CustId()
{
   this.cust_name = this.customerText["param2"];
   this.selectcustomer = this.customerText["param1"];
   this.showdetail=true;
   this.CustomerV3ListAPIDetail();
 
}
getSelectedComplaint() {

  let searchbyText =  this.selectcustomer;
  let detailreqparam = {
    param1:searchbyText,
    pageNo: this.p,
    itemsPerPage: "",
    searchBy:this.filter.trim(),
    searchType: "",
    totalRecords: "NA",
    pageID: "1",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
  }
  
try { AddLoader() } catch (e) { alert(e) }
  this.complaintService.VehicleComplaintDetail(detailreqparam).subscribe((response) => {
    
try { RemoveLoader() } catch (e) { alert(e) }

let count1 = response.entity.count;
      if(count1 == '0')
      {
        this.tipdetailsgrid = [];
        this.count = 0;
        this.viewcount = 0;
      }else{
        this.tipdetailsgrid = response.entity.list;
        this.count = response.entity.count;
        this.viewcount = response.entity.viewCount;
 }

  });
  //  $("#GridTable").hide();
  $("#complaintdetailpage").show();
}





pagevalue1:number;showrow:any;




complaintagainstxt:string;
complaintmodelid:any;

selectedEntry:any;
radioSelected:any="";tablePrivilege: any = false;
onItemChange(e) {
    // this.selectedEntry = value;
  //  alert(e.target.value);
    this.selectedEntry=e.target.value;
    this.radioSelected=this.selectedEntry;
    var s1=this.radioSelected;
    var s2="Vehicle";
    var s3="Payment";
    this.tablePrivilege="true";

    if(s1==s2 || s1==s3){
      $('#searchidview').css('display','block');
      $('#hidedeviceno').css('display','block');
    
      document.getElementById("msg_errorentry4").style.display="block";
      this.getSelectedComplaint();
      this.buttonHit = false;
      this.complaintveh=true;

    
     
      // $("#hidedeviceno").show();
      // $("#searchidview").show();
   
      document.getElementById("msg_errorentry4").style.display="none";
     }
      else{
        $('#searchidview').css('display','none');
        $('#hidedeviceno').css('display','none');
        
     
       // this.complaintveh=false;
 //   this.HideTable();
        }
}
complaintveh:any;

HideTable()
{
  this.complaintveh=false;
  $('#searchidview').css('display','none');
  
  // $("#hidedeviceno").hide();
  //$("#searchidview").hide();
  this.tablePrivilege="false";
  //  $("#list_id").prop("checked", false);
 // this.changeSelection();
  this.buttonHit = true;
}

officialemailentryText:any;
complaintModel:any;
datafromrespo:string;

InsertComplaint() {

  var myDate = new Date(); // Your timezone!

   var myEpoch1 = myDate.getTime()/1000.0;
   var myEpoch2=myEpoch1.toFixed()
  //  console.log(myEpoch2);
   this.complaintmodelid= myEpoch2;
  var mobilenotxt = $('#mnoentry').val();
  var emailidtxt = $('#Emailentry').val();
  var atposition = emailidtxt.indexOf("@");
  var dotposition = emailidtxt.lastIndexOf(".");

  var complaintagainsttxt=this.selectedEntry;
  var complainttextentry=$('#complaintentry1').val();
  this.complaintModel = complainttextentry.substring(0, 1).toUpperCase() + complainttextentry.substring(1);
 var isValid = true;

  if ( !((!($('#Vehicleid1').prop('checked')))  || (!($('#Applicationid1').prop('checked'))) || (!($('#Paymentid1').prop('checked'))) || (!($('#Serviceid1').prop('checked'))) || (!($('#Otherid1').prop('checked')))      )       )
 {

  isValid = false;
  $('#msg_errorentry5').html('Complaint Against required').show();
  setTimeout(function(){document.getElementById("msg_errorentry5").style.display="none";}, 3000);

 }

else
      if(!mobilenotxt && mobilenotxt.length <= 0){
    
       isValid = false;
       $('#msg_errorentry5').html('Please Enter Contact Number').show();
       $('#mnoentry').focus();
       setTimeout(function(){document.getElementById("msg_errorentry5").style.display="none";}, 3000);
 }
 else if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= emailidtxt.length)
 {
  isValid = false;
  $('#msg_errorentry5').html('Please Enter Valid Email id.').show();
  $('#Emailentry').focus();
  setTimeout(function(){document.getElementById("msg_errorentry5").style.display="none";}, 3000);

 }
 else if(this.radioSelected == "")
 {
  isValid = false;
  $('#msg_errorentry5').html('Please Select Complaint Against').show();
  setTimeout(function(){document.getElementById("msg_errorentry5").style.display="none";}, 3000);

 }
       else
       if(!complainttextentry && complainttextentry.length <= 0) {
  
           isValid = false;
           $('#msg_errorentry5').html('Please Enter Complaint').show();
           $('#complaintentry1').focus();
           setTimeout(function(){document.getElementById("msg_errorentry5").style.display="none";}, 3000);
        }
  //      else
  //      if(this.radioSelected == "Vehicle") {
  //         isValid = false;
  //         $('#msg_errorentry4').html('Please Enter Complaint').show();
  //         $('#complaintentry1').focus();
  //         setTimeout(function(){document.getElementById("msg_errorentry4").style.display="none";}, 3000);
  // }
  
  
  else
    if((this.radioSelected == "Vehicle" || this.radioSelected == "Payment") && (this.datasave.length==0) )
    {

      isValid = false;
      $('#msg_errorentry5').html('Please check vehicle from the table').show();

      setTimeout(function(){document.getElementById("msg_errorentry5").style.display="none";}, 3000);
    }
    else{
  
      let dataL = {
        remark: "",
        complaintid: this.complaintmodelid,
        complaintagainst: this.radioSelected,
        complaint: this.complaintModel,
        vehiclelist: this.datasave,                                //vehiclelist 
  emailid: this.officialemailentryText,
  mobileno: this.usermno,
  customerid: this.selectcustomer,
  pageID: "12",
  pageName: this.encryptedpageNameValue,
  pageURL: this.encryptedpageUrlValue
          }
         try{AddLoader()}catch(e){alert(e)}
         
         this.complaintService.InsertComplaint(dataL).subscribe((data)=>{
        try{RemoveLoader()}catch(e){alert(e)}
  
              this.datafromrespo = data.entity;
              var msg = this.datafromrespo;
              if (data.statuscode == 200)
              {
                SuccessAlert(msg);
                  this.clear();
                  this.ngOnInit();
                
              }
              else
              {
                errorAlert(msg);
              }
      });}
  
     
  
  }

changeSelection() {
  // alert("checked" + vid);
  this.fetchSelectedItems()
   this.demo();
  
}

selectedItemsList = [];
fetchSelectedItems() {
 // alert("fetchselected item");
  this.selectedItemsList = this.tipdetailsgrid.filter((value:any, index:number) => {
  //   alert(this.selectedItemsList);
    return value.isChecked;
  });
}

datavalue:any;
  datasave = [];
  demo(){

    var checkedIDsdemo = [];
    this.datavalue = this.selectedItemsList;
 
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
  checkedIDs = [];
  fetchCheckedIDs() {
 
    this.tipdetailsgrid.forEach((value:any, index:number) => {
      if (value.isChecked) {
        this.checkedIDs.push(value["param2"]);
      }
    });
    // for (let i=0;i<this.selectedItemsList.length;i++){
    //   this.checkedIDsdemo.push(this.checkboxesDataList[i].id);  
    //    console.log("Id of value is"+this.checkedIDsdemo);
    // }
  } 



  getSelectedComplaint1() {
    // let searchbyText = this.customerText["param1"];
    let detailreqparam = {
      // param1:searchbyText,
      param1:"",
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy:"",
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    
try { AddLoader() } catch (e) { alert(e) }
    this.complaintService.VehicleComplaintDetail(detailreqparam).subscribe((response) => {
     
try { RemoveLoader() } catch (e) { alert(e) }
      this.tipdetailsgrid = response.entity.list;
  
    // console.log("2D data"+this.tipdetailsgrid);
    // this.stringifiedData = JSON.stringify(this.tipdetailsgrid);  
  // console.log("With Stringify :" , this.stringifiedData);  
  // this.stringifiedData = JSON.stringify(response.entity.list[0]);  
  // console.log("With Stringify1 :" , this.stringifiedData); 
  // console.log("Mobile no. :uuuuuuuuuu"  +response.entity.list[0].param23); 
 // let usermno1 = response.entity.list[0].param23
 // this.usermno =usermno1;
      this.totalcount = response.entity.count;
      this.viewcount = response.entity.viewCount;
      // let usermno1 = this.tipdetailsgrid;
      // this.useremailid = this.tipdetailsgrid[0].
    });
    // $("#PDFTable").show();
    this.complaintveh = true;
    $("#complaintdetailpage").show();
  }


  
  


   item1:any;
   checkUncheckAll() {
    try{

    for (var j = 0; j < this.tipdetailsgrid.length; j++)
     {
      // this.tipdetailsgrid[j].isChecked1 = this.isMasterSel;
      this.item1=this.tipdetailsgrid[j];
      //     this.categoryList[i].isSelected = this.isMasterSel;
      this.item1.isChecked = this.isMasterSel;
    }
      this.getCheckedItemList();
    
   
  }catch(e){}
  }
  checkedCategoryList:any;
  getCheckedItemList(){
     this.checkedCategoryList = [];
   
    for (var i = 0; i < this.tipdetailsgrid.length; i++)
    {
      this.item1=this.tipdetailsgrid[i];
      if(this.item1.isChecked)
      {
       this.checkedCategoryList.push(this.item1.param1);
       this.datasave = this.checkedCategoryList;
      }
     }
     this.checkedCategoryList = JSON.stringify(this.checkedCategoryList);
    // console.log(this.checkedCategoryList);
    this.datasave = this.checkedCategoryList;
   
  }

  tipdetailsgrid1:[];
  totalcount1:number;
  viewcount1:number;
  getdummytable() {
    let searchbyText = this.customerText["param1"];
    let detailreqparam = {
      param1:searchbyText,
      pageNo:"",
      itemsPerPage:"",
      searchBy:this.filter.trim(),
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    
try { AddLoader() } catch (e) { alert(e) }
    this.complaintService.VehicleComplaintDetail(detailreqparam).subscribe((response) => {
     
try { RemoveLoader() } catch (e) { alert(e) }
      this.tipdetailsgrid1 = response.entity.list;
  this.totalcount1 = response.entity.count;
      this.viewcount1 = response.entity.viewCount;
     
    });
 
  }

  
  gotoComplaintDetail() {
    this.router.navigate(['helpdesk']);
  }

  clear()
  {
    this.customerText="",
    this.selectcustomer="",
    this.complaintmodelid="";
    this.usermno=null;
    this.officialemailentryText="";
    this.complaintModel="";
    this.radioSelected="";
}
clear1()
  {

    this.selectcustomer="",
    this.complaintmodelid="";
    this.usermno=null;
    this.officialemailentryText="";
    this.complaintModel="";
    this.radioSelected="";
}
CustObj:any=[];
CustomerV3ListAPIDetail() {
  this.loading = true;
  let keydata = {
    pageNo: "",
    itemsPerPage: "",
    searchBy: this.cust_name,
    searchType: "",
    totalRecords: "NA",
    pageID: "7",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
  }
  try { AddLoader() } catch (e) { alert(e) }
  this.customerService.CustomerDetailsAPI(keydata).subscribe(
    (data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      let resdatalist = data.entity.responsedatalist[0];
      let vendorlist = resdatalist;
      this.CustObj = vendorlist;
    });
    this.usermno = this.CustObj[0].param4;
    this.officialemailentryText = this.CustObj[0].param5;
    console.log(this.CustObj);
}
}
