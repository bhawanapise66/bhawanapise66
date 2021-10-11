import { CryptService } from './../../../services/crypt.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { GroupcreationService } from 'src/app/APIService/groupcreation.service';
import { ListService } from 'src/list.service';
import { PdfService } from '../../../services/pdf.service';
import { ExportToExcelService } from '../../../services/export-to-excel.service';
declare var jQuery: any;
declare var $: any;

declare var AddLoader:any;
declare var RemoveLoader:any;
@Component({
  selector: 'app-groupcreationdetail',
  templateUrl: './groupcreationdetail.component.html',
  styleUrls: ['./groupcreationdetail.component.css']
})
export class GroupcreationdetailComponent implements OnInit {
  userKey:any;customername144:boolean;customername188:boolean;flag1:number;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  pageUrl = this.router.url;
  public loading = false;p: number;   pagecount:number;
  constructor(public pdfservice: PdfService, public excelservice: ExportToExcelService,private listService: ListService,private groupservice: GroupcreationService,private cryptService:CryptService,private router:Router) { }

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo:20000,
    height: '200px',
  };
  ngOnInit(){
    this.userKey =sessionStorage.getItem('rid')
    
    if(this.userKey == '10' || this.userKey == '11' || this.userKey == '16'|| this.userKey == '21') 
     {
      
          this.flag1=1;
       this.customername144=true;
       this.customername188=true;
       $("#updatecustid").show();
       $("#viewidcust").show();

       

 
     }else{
       this.flag1=0;
   
       this.customername144=false;
       this.customername188=false;
       $("#updatecustid").hide();
       $("#viewidcust").hide();

     }
    this.EncryptPageName();
    this.EncryptPageUrl();this.GroupDetail();
  }

  EncryptPageName() {
    this.cryptService.encrypt("Group Details")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;


  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput

  }
  devicenumber:number;groupcodeupdateText:number;
  setdata(com ){

     let groupdatadetails = com;
     this.groupupdateid = groupdatadetails.param1;
     this.groupupdateText = groupdatadetails.param2;
     this.descriptionupdateText =  groupdatadetails.param3;
     this.customerupdateTextname = groupdatadetails.param6; 
     this.customerupdateTextid = groupdatadetails.param7; 
     this.customerupdate=this.customerupdateTextname;
     this.devicenumber=groupdatadetails.param10; 
     this.groupcodeupdateText=groupdatadetails.param11; 
    this.backdetailsbtn();
   
   

   }

   editpageform(){
    this.customerList();
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
  groupupdateText:any;descriptionupdateText:any;groupupdateid:any;datafromrespo:any;
  vensaveeditbtn(){
 
        var groupname = $("#groupupdateidupdate").val();
        var description = $("#Descriptionupdate").val();
        var groupcode = $("#groupupdatecodeupdate").val();
        var remark = $("#Remarkvenupdate").val();

        
       
  this.groupupdateText = groupname.substring(0, 1).toUpperCase() + groupname.substring(1);
  this.descriptionupdateText = description.substring(0, 1).toUpperCase() + description.substring(1);
  this.remarkTextvendortype = remark.substring(0, 1).toUpperCase() + remark.substring(1);

   var isValid = true;
        if(this.flag1==1 && this.customerupdateTextname.length <= 0){
          isValid = false;
          $('#msg_errorentrycust').html('Please Select Customer').show();
          $('#customerupdateid').focus();
          setTimeout(function(){document.getElementById("msg_errorentrycust").style.display="none";}, 3000);
        
        }else
        if(!groupname && groupname.length <= 0){
          isValid = false;
          $('#msg_errorentrycust').html('Please Enter Group Name').show();
          $('#Divisionupdate').focus();
          setTimeout(function(){document.getElementById("msg_errorentrycust").style.display="none";}, 3000);
        }else
        if(!groupcode && groupcode.length <= 0){
          isValid = false;
          $('#msg_errorentrycust').html('Please Enter Group Code').show();
          $('#groupupdatecodeupdate').focus();
          setTimeout(function(){document.getElementById("msg_errorentrycust").style.display="none";}, 3000);
        }
        else if(!description && description.length <= 0){
          isValid = false;
          $('#msg_errorentrycust').html('Please Enter Description ').show();
          $('#Descriptionupdate').focus();
          setTimeout(function(){document.getElementById("msg_errorentrycust").style.display="none";}, 3000);
        }
        else if(!remark && remark.length <= 0){
          isValid = false;
          $('#msg_errorupdatetype').html('Please Enter Remark ').show();
          $('#Remarkvenupdate').focus();
          setTimeout(function(){document.getElementById("msg_errorupdatetype").style.display="none";}, 3000);
        }
      else {
        let dataL = {
          remark:this.remarkTextvendortype,
          groupid:this.groupupdateid,
          groupname:this.groupupdateText,
          groupcode:this.groupcodeupdateText,
          groupdescription:this.descriptionupdateText,
          customerid:this.customerupdateTextid, 
           pageID: "7",
           pageName: this.encryptedpageNameValue,
           pageURL: this.encryptedpageUrlValue
            }
            try{AddLoader()}catch(e){alert(e)} 
  
      this.groupservice.UpdateGroupCreationEditAPI(dataL).subscribe((data)=>{
        try{RemoveLoader()}catch(e){alert(e)} 
  
      this.datafromrespo = data.entity;
      
      if(data.statuscode == '200')
      {
        this.GroupDetail(); this.clearfunction();
      $("#SuccessModal").modal('show');
      this.closemodal();
      }
      else
      {
       $("#ErrorModal").modal('show');
      }
      
      });
   
      }
    }
    customerupdate:string;
  
    SelectcustomerDataupdate()
    {
      this.customerupdateTextid=this.customerupdateTextname["param1"];
     
      this.customerupdate=this.customerupdateTextname["param2"];
    }
    customerupdateTextid:any;customerupdateTextname:any;

    clearfunction()
    {
      this.remarkTextvendortype="",this.customerupdateTextname="";this.customerupdateTextid="";this.groupupdateText="";this.descriptionupdateText="";
      this.remarkTextvendortype="";
    }
    deleteText9:any;
    closemodal() {
      this.deleteText9="";
      this.remarkTextvendortype="";
      $("#SuccessModal").modal('hide');
      $('#modeldelete').modal('hide');
      $('#myModalwizard').modal('hide');
      $('.modal-backdrop.show').css('display', 'none');
    }

    itemsPerPage:number=10;count:number; viewcount:number;GroupDetails:any=[];GroupDetails1:any=[];
    GroupDetail() {
       
      this.loading = true; 
          
      this.p = 1; this.pagecount = 10;
  
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
      try{AddLoader()}catch(e){alert(e)} 
  
       // Distributor Detail Grid BIND LIST    
       this.groupservice.GroupCreationDetailsAPI(keydata).subscribe(
        (data)  => {
          try{RemoveLoader()}catch(e){alert(e)} 
          let resdatalist = data.entity.responsedatalist; 
          let vendorlist = resdatalist;
          this.GroupDetails = vendorlist;
           this.count = data.entity.count;
           this.viewcount = data.entity.viewCount;
      
         
           this.GroupPDFDetail(); 
        });
  }
  GroupPDFDetail() {
       
    this.loading = true; 
        
    this.p = 1; 
 
    let keydata = {
    
      pageNo:"",
      itemsPerPage: "",    
      searchBy: "", 
      searchType:"",
      totalRecords:"NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try{AddLoader()}catch(e){alert(e)} 

     // Distributor Detail Grid BIND LIST    
     this.groupservice.GroupCreationDetailsAPI(keydata).subscribe(
      (data)  => {
        try{RemoveLoader()}catch(e){alert(e)} 
        let resdatalist = data.entity.responsedatalist; 
        let vendorlist = resdatalist;
        this.GroupDetails1 = vendorlist;
        this.PrepareExcelData(this.GroupDetails1);
     
      
      });
  }

   GroupPageChanged(event){
  this.p = event; this.pagecount = $("#selectrow2").val();

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
    try{AddLoader()}catch(e){alert(e)} 

     // Distributor Detail Grid BIND LIST    
     this.groupservice.GroupCreationDetailsAPI(keydata).subscribe(
      (data)  => {
        try{RemoveLoader()}catch(e){alert(e)} 

        let resdatalist = data.entity.responsedatalist; 
     
  
         let vendorlist = resdatalist;
      
         this.GroupDetails = vendorlist;
         this.count = data.entity.count;
         this.viewcount = data.entity.viewCount;
       
         this.loading = false; 
      });
   }

   filter:any;
   Refreshfunction(){
    this.loading = true; 
    this.filter="";       
    this.p = 1; 
    this.GroupDetail();
    }

    searchdata(){
      var search = $('#searchData').val();
      this.loading = true; 
          
      this.p = 1; 
   
      
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
      
      try { AddLoader() } catch (e) { alert(e) }
      // Distributor Detail Grid BIND LIST    
      this.groupservice.GroupCreationDetailsAPI(keydata).subscribe(
      (data)  => {
      
      try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.responsedatalist; 
      
      
         let vendorlist = resdatalist;
       
         this.GroupDetails = vendorlist;
         this.count = data.entity.count;
         this.viewcount = data.entity.viewCount;
         this.loading = false; 
      });
      }

      SelectRows(){
      
      var search = $('#searchData').val();
      var selectrow = $('#selectrow2').val();
   
      this.loading = true; 
      this.itemsPerPage=selectrow;
      this.pagecount = this.itemsPerPage;
      
      this.p = 1; 
      
      
      
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
      
      try { AddLoader() } catch (e) { alert(e) }
      // Distributor Detail Grid BIND LIST    
      this.groupservice.GroupCreationDetailsAPI(keydata).subscribe(
      (data)  => {
      
      try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.responsedatalist; 
      
      
         let vendorlist = resdatalist;
       
         this.GroupDetails = vendorlist;
         this.count = data.entity.count;
         this.viewcount = data.entity.viewCount;
       
         this.loading = false; 
      });
      }
      key: string = 'name'; reverse: boolean = true; 
      sort(key){
         this.key = key;
         this.reverse = !this.reverse;
         
       }
       GroupDeletefunction(){
        var isValid = true; 
    
        var deleteremark = $('#groupdelremark').val();
        deleteremark = deleteremark.substring(0, 1).toUpperCase() + deleteremark.substring(1);
        // Validate Contact Name
        if(!deleteremark && deleteremark.length <= 0){
         isValid = false;
        // $('#msg_error_delete').html('Please Enter Remark').show();
        $('#msg_error_delete').html('Please Enter Remark').show();
           $('#groupdelremark').focus();
            setTimeout(function(){document.getElementById("msg_error_delete").style.display="none";}, 3000);
       }
       else
       { 
        let dataL = {
          param1:deleteremark,
          param2:this.groupupdateid,
          pageID: "7",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
         
            }
            try{AddLoader()}catch(e){alert(e)} 
    
        this.groupservice.DeleteGroupCreationAPI(dataL).subscribe((data)=>{
          try{RemoveLoader()}catch(e){alert(e)} 
    
        this.datafromrespo = data.entity;
          
        if(data.statuscode == '200')
        {
        $("#SuccessModal").modal('show');
        this.GroupDetail();
        this.closemodal();
        }
        else
        {
         $("#ErrorModal").modal('show');
        }
        });

      }
      }



     createPDF() {
      let pdfTableData;
        let dataArray = []
        if(this.flag1 == 1)
        {
          for (let i = 0; i < this.GroupDetails1.length; i++) {
            pdfTableData = {
             "#": i + 1,
             "Customer Name": this.GroupDetails1[i]["param6"],
             "Group Name": this.GroupDetails1[i]["param2"],
             "Group Code": this.GroupDetails1[i]["param11"],
             "Description": this.GroupDetails1[i]["param3"],
             "Creation date": this.GroupDetails1[i]["param4"],
             "No. of devices": this.GroupDetails1[i]["param10"]
           }
           dataArray.push(pdfTableData)
         };
        }
        else{
          for (let i = 0; i < this.GroupDetails1.length; i++) {
            pdfTableData = {
                  "#": i + 1,
                  "Group Name": this.GroupDetails1[i]["param2"],
                  "Group Code": this.GroupDetails1[i]["param11"],
                  "Description": this.GroupDetails1[i]["param3"],
                  "Creation Date": this.GroupDetails1[i]["param4"],
                  "No. Of Devices": this.GroupDetails1[i]["param10"]
           }
           dataArray.push(pdfTableData)
         };
        }
       
        this.pdfservice.CreatePDFData(dataArray,"Group Details");  
    
     }
    
    
     excelData:any=[];
     PrepareExcelData(data) {
       this.excelData = [];
    if(this.flag1 == 1)
    {
      for (var i = 0; i < data.length; i++) {
        //try {
          var obj = {
    
            "#": i + 1,
            "Customer Name": data[i].param6,
            "Group Name": data[i].param2,
            "Group Code": data[i].param11,
            "Description": data[i].param3,
            "Creation Date": data[i].param4,
            "No. Of Devices": data[i].param10
    
          }
       // } catch (e) { }
        this.excelData.push(obj);

    
      }
    }else
    {
      for (var i = 0; i < data.length; i++) {
        // try {
          var obj1 = {
    
            "#": i + 1,
            "Group Name": data[i].param2,
            "Group Code": data[i].param11,
            "Description": data[i].param3,
            "Creation Date": data[i].param4,
            "No. Of Devices": data[i].param10
          }
        // } catch (e) { }
        this.excelData.push(obj1);
        
      }
    }
      
     }

     exportToExcel() {
      this.GroupPDFDetail();
    
      this.excelservice.ExportExcel(this.excelData,'Group Details','groupdetails');
    } 
    remarkTextvendortype:any;  

//this function is call to redirect on assign group componant by Ayaz Syed 

  
GroupAssignClick(){
  this.router.navigate(['./group-assign']);
}
//end

}
