import { SubDivisionService } from './../../../../APIService/sub-division.service';
import { ListService } from './../../../../../list.service';
import { CryptService } from './../../services/crypt.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as $ from 'jquery';

declare var jQuery: any;
declare var $: any;
declare var AddLoader:any;
declare var RemoveLoader:any;

@Component({
  selector: 'app-sub-division-entry',
  templateUrl: './sub-division-entry.component.html',
  styleUrls: ['./sub-division-entry.component.css']
})

export class SubDivisionEntryComponent implements OnInit {
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  pageUrl = this.router.url;
  public loading = false;p: number;   pagecount:number;
  division: any;
  subDivision: string;
  subDivisionDesc: string;

  divisionListArray = [];userKey:any;

  itemsPerPage:number=10;
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo:5000,
    height: '200px',
  };
  constructor( private router: Router, private cryptService: CryptService, private listService: ListService, private subDivService: SubDivisionService) {
    this.EncryptPageName(); this.EncryptPageUrl();
    this.divisionList();this.customerList();
  }

  ngOnInit() {
    this.userKey =sessionStorage.getItem('rid');
    if(this.userKey == '10' || this.userKey == '11' || this.userKey == '16'|| this.userKey == '21') 
 {
    this.flag1=1;
    $("#subentry").show();
    $("#customerentry_id").focus();
   
 }
 else{
   this.flag1=0;
   $("#subentry").hide();
   $("#divisionidcode").focus();
 
 }
    (function ($) {
      $(document).ready(function() {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#divisionid').focus();
      })
    });
    })(jQuery);
 
  }


  divisionList() {
    let dataL = {
      pageNo: "1",
      itemsPerPage: "1000",
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    
try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectDivisionListAPI(dataL).subscribe((response) => {
      
try { RemoveLoader() } catch (e) { alert(e) }
      if (response.statuscode == 200) {
        this.divisionListArray = response.entity.list;
      }
    })
  }
  datafromrespo:string;
  divisionts_id:any;
  divisionts_name:any;
  subdivisionts_id:any;
  subdivisionts_name:any;
  subdivisionts_description:any;
  subdivits:string;flag1:number=0;
  InsertSubDivision() {
   
        this.divisionts_id = this.division["param1"];
    //  this.divisionts_name = this.division["param2"];
    //  this.subdivisionts_id = this.subDivision["param1"];
    //  this.subdivisionts_name = this.subDivision["param2"];
    //  this.subdivisionts_description = this.subDivision["param4"];
    //  alert(this.customerentryid);
    //  alert(this.customerentryid.length);
    var divisiondata = $('#divisiondummy').val();
    var subdivisiondata1 = $('#subdivitxt_id').val();
    var descriptiondata3 = $('#descriptionentry5').val();
  //  var customerentryidentry = $("#customerentryid").val();
    var customerentryidentry = $("#customerentryidsub").val();
   //// alert(customerentryidentry);
     this.subDivision = subdivisiondata1.substring(0, 1).toUpperCase() + subdivisiondata1.substring(1);
    this.subDivisionDesc = descriptiondata3.substring(0, 1).toUpperCase() + descriptiondata3.substring(1);
  
    var isValid = true;

    if(this.flag1==1 && (!customerentryidentry && customerentryidentry.length <= 0))
    {
      
        isValid = false;
      //  alert("btn click 2");
        $('#msg_errorentry3').html('Please Select Customer').show();
       $('#customerentry_id').focus();
        setTimeout(function(){document.getElementById("msg_errorentry3").style.display="none";}, 3000);
      
    }
   
    else
   if(divisiondata == ""){
   
      isValid = false;
      $('#msg_errorentry3').html('Please Enter Division').show();
      $('#divisionidcode').focus();
     setTimeout(function(){document.getElementById("msg_errorentry3").style.display="none";}, 3000);
    }
   else if(!subdivisiondata1 && subdivisiondata1.length <= 0) {
 
       isValid = false;
       $('#msg_errorentry3').html('Please Enter Subdivision').show();
       $('#subdivitxt_id').focus();
   setTimeout(function(){document.getElementById("msg_errorentry3").style.display="none";}, 3000);
     }
    else
     if (!descriptiondata3 && descriptiondata3.length <= 0){
      
    
       isValid = false;
       $('#msg_errorentry3').html('Please Enter Description').show();
     
       $('#descriptionentry5').focus();
    
      setTimeout(function(){document.getElementById("msg_errorentry3").style.display="none";}, 3000);
     }
   
    else{
if(this.flag1 == 0){
  this.customerentryid='0';
}
    let dataL = {
      remark:"",
      subDivisionId:0,
      subDivisionName:this.subDivision,
      subDivisionCode:"",
      subDivisionDescription:this.subDivisionDesc,
      divisionId:this.selectdumdivision,
      loginName:"",
      loginPassword:"",
      customerId:this.customerentryid,
      
      pageID: "12",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.subDivService.InsertSubDivision(dataL).subscribe((data)=>{
      try { RemoveLoader() } catch (e) { alert(e) }
            this.datafromrespo = data.entity;
          
           if(data.statuscode == 200)
            {
            $("#successmodelentry").modal('show');
           
            this.SubDivisionDetail3();
            this.clear();
            this.closemodal();
            }
            else
            {
             $("#notifymodelentry").modal('show');
            }
    });}

   
  }
        
  closemodal() {
    $("#exampleModal").modal('hide');
  
    $('.modal-backdrop.show').css('display', 'none');
}    
    
   clear()
   {
    this.division="";
    this.subDivision="";
    this.subDivisionDesc="";
    this.customerentry="";this.customerentryid="";
   }   

  // checkoption(){
  //   console.log(this.division)
  // }
 
  selectdumdivision:string;
  SelectSubDivisionData()
  {

    this.selectdumdivision = this.division.param1;
  }


  departmentDetailsArray: Object;
  count:number;viewcount:number;
  SubDivisionDetail3() {

    this.loading = true;

    this.p = 1; this.pagecount = 10;
    this.itemsPerPage=this.pagecount;
    //  console.log("p" + this.p);

    let keydata = {
      // param1: this.divisiondetail["param1"],
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.subDivService.SubDivisionDetails(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.list;
        let vendorlist = resdatalist;

        this.departmentDetailsArray = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
       
      //  console.log(this.count);
        this.loading = false;
      });
  }

  
  EncryptPageName() {
    this.cryptService.encrypt("Sub Division Details")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }

  customerListArray:any=[];
  customerList() {
   let dataL = {
     pageNo: "1",
     itemsPerPage: "1000",
     searchBy: "",
     searchType: "",
     totalRecords: "NA",
     pageID: "1",
     pageName: this.encryptedpageNameValue,
     pageURL: this.encryptedpageUrlValue
   }
   
try { AddLoader() } catch (e) { alert(e) }
   this.listService.CustomerListAPI(dataL).subscribe((response) => {
     
try { RemoveLoader() } catch (e) { alert(e) }
     if (response.statuscode == '200') {
       this.customerListArray = response.entity.list;
     }
   })
 }

 customerentry:string;customerentryid:string;
 SelectcustomerData()
 {
this.customerentryid=this.customerentry["param1"];
 }
}
