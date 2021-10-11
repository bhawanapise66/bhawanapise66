import { Router } from '@angular/router';
import { CryptService } from './../../../services/crypt.service';
import { ListService } from 'src/list.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { GroupcreationService } from 'src/app/APIService/groupcreation.service';
declare var jQuery: any;
declare var $: any;

declare var AddLoader:any;
declare var RemoveLoader:any;

@Component({
  selector: 'app-groupcreationentry',
  templateUrl: './groupcreationentry.component.html',
  styleUrls: ['./groupcreationentry.component.css']
})
export class GroupcreationentryComponent implements OnInit {
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  pageUrl = this.router.url;
  public loading = false;p: number;   pagecount:number;datafromrespo:any;
  
userKey:any;flag1:number=0;
  constructor(private groupservice: GroupcreationService, private router: Router, private cryptService: CryptService,private listService: ListService) 
  {
    this.EncryptPageName();
    this.EncryptPageUrl();
   }
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo:5000,
    height: '200px',
  };
  ngOnInit() {
    this.userKey =sessionStorage.getItem('rid');
    if(this.userKey == '10' || this.userKey == '11' || this.userKey == '16'|| this.userKey == '21') 
 {
    this.flag1=1;
    $('#divisioncustentry').show();
   
 }
 else{
   this.flag1=0;
   $('#divisioncustentry').hide();
 
 }
    this.customerList();
  
  }

  EncryptPageName() {
    this.cryptService.encrypt("Group Entry")
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
     if (response.statuscode == 200) {
       this.customerListArray = response.entity.list;
     }
   })
 }

 vensavebtn(){

  var groupname = $("#Groupnameid").val();
  var description = $("#groupdescpeid").val();
  var customerentryidentry = $("#customerentryid").val();
  var groupcode = $("#groupcodeid").val();
  this.groupentry = groupname.substring(0, 1).toUpperCase() + groupname.substring(1);
  this.groupentrydescription = description.substring(0, 1).toUpperCase() + description.substring(1);

  
  // this.DivisionentryText = this.DivisionentryText.substring(0, 1).toUpperCase() + this.DivisionentryText.substring(1);
  // this.descriptionText = this.descriptionText.substring(0, 1).toUpperCase() + this.descriptionText.substring(1);
  
  var isValid = true;
  if(this.flag1==1 && customerentryidentry == "")   
  {
    
      isValid = false;
     $('#msg_errorgroup').html('Please Select Customer').show();
     $('#customerentry_id').focus();
      setTimeout(function(){document.getElementById("msg_errorgroup").style.display="none";}, 3000);
    
  }
 
  else
  if(!groupname && groupname.length <= 0){
    isValid = false;
    $('#msg_errorgroup').html('Please Enter Group Name').show();
   $('#Groupnameid').focus();
    setTimeout(function(){document.getElementById("msg_errorgroup").style.display="none";}, 3000);
  }
  else
  if(!groupcode && groupcode.length <= 0){
    isValid = false;
    $('#msg_errorgroup').html('Please Enter Group Code').show();
   $('#groupcodeid').focus();
    setTimeout(function(){document.getElementById("msg_errorgroup").style.display="none";}, 3000);
  }
  else if(!description && description.length <= 0){
    isValid = false;
    $('#msg_errorgroup').html('Please Enter Description ').show();
    $('#groupdescpeid').focus();
    setTimeout(function(){document.getElementById("msg_errorgroup").style.display="none";}, 3000);
  }
  else{
 
  let dataL = {
    
    remark:"",
    groupid:0,
    groupname:this.groupentry,
    groupcode:this.groupcodeText,
    groupdescription:this.groupentrydescription,
    customerid:this.dummucust, 
     pageID: "7",
     pageName: this.encryptedpageNameValue,
     pageURL: this.encryptedpageUrlValue
      }
      try{AddLoader()}catch(e){alert(e)}

  this.groupservice.InsertGroupCreationAPI(dataL).subscribe((data)=>{
 
  try{RemoveLoader()}catch(e){alert(e)}

    this.datafromrespo = data.entity;
  
   if(data.statuscode == '200')
   {
   $("#successmodal").modal('show'); this.clearfunction();this.closemodal();
   }
   else
   {
    $("#errormodal").modal('show');
   }
  });

}
}

customerentry:string;customerentryid:string;groupcodeText:number;
SelectcustomerData()
{
this.customerentryid=this.customerentry["param1"];
this.dummucust=this.customerentryid;
}
dummucust:any=0;groupentry:any;groupentrydescription:any;

clearfunction()
{
  this.groupentry="";this.groupentrydescription="";this.customerentry="";this.customerentryid="";
}

closemodal()
{
    $("#exampleModal").modal('hide'); 
    $('.modal-backdrop.show').css('display', 'none');
    this.clearfunction();
}
}
