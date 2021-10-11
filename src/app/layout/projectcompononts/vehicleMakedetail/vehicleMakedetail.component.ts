import { ExportToExcelService } from './../services/export-to-excel.service';
import { Paramcls } from './../../../../paramcls';
import { VehiclemakeService } from './../../../APIService/vehiclemake.service';
import { Router } from '@angular/router';
import { CryptService } from './../services/crypt.service';
import { ListService } from './../../../../list.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import * as xlsx from 'xlsx';
import { PdfService } from '../services/pdf.service';

declare var jQuery: any;
declare var $: any;
declare var AddLoader:any;
declare var RemoveLoader:any;

@Component({
  selector: 'app-vehicleMakedetail',
  templateUrl: './vehicleMakedetail.component.html',
  styleUrls: ['./vehicleMakedetail.component.css']
})
export class VehicleMakedetailComponent implements OnInit {
 
  @ViewChild('epltable',{ static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;write_privilege:string;
  timer:any;
  pageUrl = this.router.url;
  private _success = new Subject<string>();  successMessageUpdate: string;
  public loading = false; p: number;   pagecount: number = 10; count:number; viewcount:number;
  key: string = 'name'; reverse: boolean = true;
  CustRemarktext:string; filter:string; deleteText9:string; datafromrespo:string;


  cust_email:string; cust_mobno:string; cust_state:any; cust_city:any; cust_alt_mobno:string; 
   reg_makename:string; pin_code:string;  // change by KJ
  customer_id:string;
  itemsPerPage:number=10;
  // ListOfDistributor$:Object;ListOfDealer$:Object;ListOfState$:Object;ListOfCity$:Object;CustomerDetails$:Object; ListOfCustomerType$:Object;  ListOfCustomerCategory$:Object;


  //NgModel Change by KJ
  VehicleMakeDetails$:Object;
  VehicleMakeDetails1$:any;
  descriptionmakeText:string;   
  vehiclemake_name:string;
  vehiclemake_id:string;

   

  
  // config = {
  //   displayKey: "param2", // if objects array passed which key to be displayed defaults to description
  //   search: true,
  //   limitTo: this.count,
  //   height: '200px',
  // };
  constructor(public excelservice: ExportToExcelService, private modalService: NgbModal,
    private flashMessage: FlashMessagesService ,private listService:ListService, 
    private cryptService:CryptService,private router:Router, 
    private vehiclemakeService:VehiclemakeService,public pdfservice: PdfService) { }


  ngOnInit(){

    /* ------------------------------- Wizards start Ts------------------------------------------------- */

    this.count = 0;
    this.viewcount = 0;

    (function ($) {
      $(document).ready(function() {
        $('#vendorName').focus();
        $(".buttonFinish").prop('disabled', false);
        $("#step-14").show();
        $("#step-15").hide();
        $("#step-16").hide();
        $("#step-17").hide();
        function setClasses(index, steps) {
          if (index < 0 || index > steps) return;
          if(index == 0) {
            $(".buttonPrevious").prop('disabled', true);
          } else {
            $(".buttonPrevious").prop('disabled', false);
          }
          if(index == steps) {
            $(".buttonPreviousNext").text('done');
          } else {
            $(".buttonPreviousNext").text('next');
          }
          $(".step-wizard ul li").each(function() {
            $(this).removeClass();
          });
          $(".step-wizard ul li:lt(" + index + ")").each(function() {
            $(this).addClass("done");
          });
          $(".step-wizard ul li:eq(" + index + ")").addClass("active")
          var p = index * (100 / steps);
          $("#prog").width(p + '%');
        }
        $(".step-wizard ul button").click(function() {
          var step = $(this).find("div.step")[0].innerText; 
          var steps = $(".step-wizard ul li").length; 
          validateAllSteps(step- 1 , steps);
        });
        $("#prev").click(function(){
          var step = $(".step-wizard ul li.active div.step")[0].innerText;
          var steps = $(".step-wizard ul li").length; 
          setClasses(step - 2, steps - 1);
          displayreviousSection(step - 1);   
        });
        $("#next").click(function(){
          if ($(this).text() == 'done') {
           // alert("submit the form?!?")
          } else {
            var step ;
            try {
              step = $(".step-wizard ul li.active div.step")[0].innerText; 
            } catch (error) {
              step = $(".step-wizard ul li div.step")[0].innerText; 
            }
            
            var steps = $(".step-wizard ul li").length;   
            validateAllSteps(step , steps- 1);   
            //setClasses(step, steps - 1);
          }
        });
        
        // initial state setup
       setClasses(0, $(".step-wizard ul li").length);
       
        function displayreviousSection(index){
          
        $(".buttonNext").prop('disabled', false);
          switch(index) {
            case 0:                    
                    $("#step-14").show();
                    $("#step-15").hide();
                    $("#step-16").hide();
                    $("#step-17").hide();
              break;
            case 1:     
                    $("#step-14").show();
                    $("#step-15").hide();
                    $("#step-16").hide();
                    $("#step-17").hide();
              break;
            case 2:                         
                  $("#step-14").hide();
                  $("#step-15").show();
                  $("#step-16").hide();
                  $("#step-17").hide();
              break;
            case 3:                         
                  $("#step-14").hide();
                  $("#step-15").hide();
                  $("#step-16").show();
                  $("#step-17").hide();
              break;
            default:                
                $("#step-14").show();
                $("#step-15").hide();
                $("#step-16").hide();
                $("#step-17").hide();
          }
        }
    
        function validateAllSteps(index, steps){
          var isStepValid = true;
          
                    
          
          if(validateStep2(index, steps) == false){
            isStepValid = false;       
          }else
        
          return isStepValid;
       }
    
      
    
    // currently working KJ
      function validateStep2(index, steps){
    

        $('#msg_vehiclemake').html('').hide();
         var isValid = true; 
              
         var regmake = $('#regmakename').val();        // value from html makename by KJ
         var regdescription = $('#regdescriptionname').val();                     // value from html descriptionname by KJ
        
         // Validate Contact Name
         if(!regmake && regmake.length <= 0){
          isValid = false;
          $('#msg_vehiclemake').html('Please Enter Vehicle Make Name').show();
          $('#regmakename').focus();
        }else
         if(!regdescription && regdescription.length <= 0){
           isValid = false;
           $('#msg_vehiclemake').html('Please Enter Description').show();
           $('#regdescriptionname').focus();
         }
        
       
    
        if(isValid && index==2){  
         
          $('#msg_makeid').html('').hide();
          $('#msg_remarkid').html('').hide();
        $("#step-15").hide();
        $("#step-14").hide()
        $("#step-16").show();
        $("#step-17").hide();
        $('#accountNo').focus();
         
        $(".buttonFinish").prop('disabled', false);
        // $(".buttonNext").prop('disabled', true);
          setClasses(index, steps);
         isValid = false;   
        }
    
         return isValid;
      }
    
    
    
      });
    })(jQuery);

    this.write_privilege =sessionStorage.getItem('writePrivilege');

    if(this.write_privilege == "false")
    {
      $("#editbtn").css("display","none");
      $("#deletebtn").css("display","none");
      $("#addnewmake").css("display","none");
     $('#editbtn').hide();
     $('.material-icons md-18').css("display","none");
     $('#deletebtn').attr('disabled','disabled');
     $('#addnewmake').attr('disabled','disabled');
    }

    this.EncryptPageName();
    this.EncryptPageUrl();

    this.MakeDetail();
    this.clear();
 
/* ------------------------------- Wizards end Ts------------------------------------------------- */
 
}






  //Done By KJ
  EncryptPageName() {
    this.cryptService.encrypt("Vehicle Make Management")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
  //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }

  // Done By KJ
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }

 
  // Done by KJ
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
    if(this.write_privilege == "false")
    {
      $('#editbtn').hide();
    }

  }

  // Done by KJ
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

 

//update by KJ
setdata(com:Paramcls){
   this.vehiclemake_id = com.param1;
  this.vehiclemake_name = com.param2;
  this.descriptionmakeText = com.param5;
this.backdetailsbtn();
}  
clear()
{
  this.vehiclemake_name = "";
  this.descriptionmakeText = ""; 
  this.remarkmakeText = "";
}

remarkmakeText:any;
editmake(){
   var makeName = $('#regmakename').val();
   var descriptionName = $('#regdescriptionname').val();
   var remark = $('#remarkupdatemake').val();
   this.vehiclemake_name = makeName.substring(0, 1).toUpperCase() + makeName.substring(1);
   this.descriptionmakeText = descriptionName.substring(0, 1).toUpperCase() + descriptionName.substring(1);
   this.remarkmakeText = remark.substring(0, 1).toUpperCase() + remark.substring(1);

   var isValid = true; 
   if(!makeName && makeName.length <= 0)
   {
     isValid = false;
    $('#msg_errorupdate').html('Please Enter Vehicle Make Name').show();
     $('#regmakename').focus();
     setTimeout(function () { document.getElementById("msg_errorupdate").style.display = "none"; }, 3000);
  
   }else 
    if(!descriptionName && descriptionName.length <= 0){
     isValid = false;
     $('#msg_errorupdate').html('Please Enter Description').show();
     $('#regdescriptionname').focus();
     setTimeout(function () { document.getElementById("msg_errorupdate").style.display = "none"; }, 3000);
  
   }else
   if (!remark && remark.length <= 0){
     isValid = false;
     $('#msg_errorremark').html('Please Enter Remark').show();
     $('#remarkupdatemake').focus();
     setTimeout(function(){document.getElementById("msg_errorremark").style.display="none";}, 3000);
   }
     else{

    let dataL = {
      // remarks:"",
      // vehicleMakeId:this.vehiclemake_id,
      // vehicleMakeName:this.vehiclemake_name, vehicleMakeDescription:this.descriptionmakeText,
      param1:this.remarkmakeText,
      param2:this.vehiclemake_id,
      param3:this.vehiclemake_name, param4:this.descriptionmakeText, 
      pageID: "7",
       pageName: this.encryptedpageNameValue,
       pageURL: this.encryptedpageUrlValue
        }
        
try { AddLoader() } catch (e) { alert(e) }
    this.vehiclemakeService.UpdateVehicleMakeEditAPI(dataL).subscribe((data)=>{
   
try { RemoveLoader() } catch (e) { alert(e) }
       this.datafromrespo = data.entity;
    
       if(data.statuscode == '200')
        {
          this.vehiclemake_name="";
          this.descriptionmakeText="";
            $("#SuccessModal").modal('show');
           
            this.Refreshfunction();

            this.closemodal(); 
        }
        else
        {
          $("#ErrorModal").modal('show');
        }
        
    });
        }
       }













  

 
   
  MakeDetail() {
       
    this.loading = true; 
    this.pagecount=10;   
    this.itemsPerPage=this.pagecount;   
    this.p = 1; 
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
    this.vehiclemakeService.VehicleMakeDetailsAPI(keydata).subscribe(
      (data)  => {
  
try { RemoveLoader() } catch (e) { alert(e) }    
        let resdatalist = data.entity.list; 
       // console.log("wekcome_ "+resdata);
       let vendorlist = resdatalist;
         this.VehicleMakeDetails$ = vendorlist;
         this.count = data.entity.count;
         this.viewcount = data.entity.viewCount;
       //  console.log(this.count);
         this.loading = false; 
      });
      this.MakeDetail1();
}

/*---------------- cunstomer details function end  --------------------*/
/*---------------Customer search start --------------------------*/

searchdata(){
  var search = $('#searchData').val();
  this.loading = true; 
  this.p = 1; 
  this.itemsPerPage=this.pagecount;
  //this.pagecount = 10;
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
  
try { AddLoader() } catch (e) { alert(e) }
   // Distributor Detail Grid BIND LIST    
   this.vehiclemakeService.VehicleMakeDetailsAPI(keydata).subscribe(
    (data)  => {
   
try { RemoveLoader() } catch (e) { alert(e) } 
      let resdatalist = data.entity.list; 
   

       let vendorlist = resdatalist;
     
       this.VehicleMakeDetails$ = vendorlist;
       this.count = data.entity.count;
       this.viewcount = data.entity.viewCount;
       this.loading = false; 
    });
}





 

Refreshfunction(){
  this.loading = true; 
    this.filter="";    
  this.p = 1; 
this.ngOnInit();
 }

/*------------------Search End ---------------------*/


createPDF()  {
  
  let pdfTableData;
  let dataArray = []
  for (let i = 0; i < this.VehicleMakeDetails1$.length; i++) {
     pdfTableData = {
       "#":  this.VehicleMakeDetails1$[i]["rowNumber"],
      "Vehicle Make Name": this.VehicleMakeDetails1$[i]["param2"],
      "Description": this.VehicleMakeDetails1$[i]["param5"],
    "Creation Date":this.VehicleMakeDetails1$[i]["param3"]
    }
    dataArray.push(pdfTableData)
  };
  this.pdfservice.CreatePDFData(dataArray,"Vehicle Make Details");  

}


 sort(key){

 // alert(key);

 this.key = key;
 this.reverse = !this.reverse;
 
}

// Done by KJ

MakeDeletefunction(){
  var isValid = true; 
  var deleteremark = $('#makedelremark').val();
  deleteremark = deleteremark.substring(0, 1).toUpperCase() + deleteremark.substring(1);

  if(!deleteremark && deleteremark.length <= 0){
   isValid = false;
   $('#msg_error_delete').html('Please Enter Remark.').show();
   $('#makedelremark').focus();
 }
 else
 { 
  let dataL = {
    param1:deleteremark,
    param2:this.vehiclemake_id,
    pageID: "7",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
   
      }
      
try { AddLoader() } catch (e) { alert(e) }
      this.vehiclemakeService.DeleteVehicleMakeAPI(dataL).subscribe((data)=>{
        
try { RemoveLoader() } catch (e) { alert(e) }
  //  alert(dataL);
  //  alert(data);
 
  this.datafromrespo = data.entity;
    
  if(data.statuscode == '200') {
    $("#SuccessModal").modal('show');
    
 this.Refreshfunction();

    this.closemodal();
  }
  else {
    $("#ErrorModal").modal('show');
  }
  });
 // alert("error in inserting data");
}
}


closemodal() {
  this.deleteText9="";
  this.clear();
  $("#successmodel").modal('hide');
  $('#modeldelete').modal('hide');
  $('#myModalwizard').modal('hide');
  $('.modal-backdrop.show').css('display', 'none');
}


SelectRows(){
  
  var search = $('#searchData').val();
  var selectrow = $('#selectrow2').val();

 // alert(selectrow)
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
  this.vehiclemakeService.VehicleMakeDetailsAPI(keydata).subscribe(
    (data)  => {  
  
      try{RemoveLoader()}catch(e){alert(e)} 

      let resdatalist = data.entity.list; 
      let vendorlist = resdatalist;
       this.VehicleMakeDetails$ = vendorlist;
       this.count = data.entity.count;
       this.viewcount = data.entity.viewCount;
     
       this.loading = false; 
    });
}


MakepageChanged(event){
  
  this.p = event;
  var p1= $("#selectrow2").val();
  var search = $('#searchData').val();
 // alert(p1);
   this.pagecount = p1;
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
  try{AddLoader()}catch(e){alert(e)} 

   // Distributor Detail Grid BIND LIST    
   this.vehiclemakeService.VehicleMakeDetailsAPI(keydata).subscribe(
    (data)  => {  
      try{RemoveLoader()}catch(e){alert(e)} 

    //  alert(JSON.stringify(data));
    //  console.log(data.entity)
      // console.log("wekcome_ "+data);
      let resdatalist = data.entity.list; 
     //  this.resdata = 
     // console.log("wekcome_ "+resdata);

       let vendorlist = resdatalist;
     
       this.VehicleMakeDetails$ = vendorlist;
       this.count = data.entity.count;
       this.viewcount = data.entity.viewCount;
       
       this.loading = false; 
    });
 }



 exportToExcel() {
   this.MakeDetail1();
  this.excelservice.ExportExcel(this.excelData,'Vehicle Make Details','vehiclemakedetails');
}

excelData:any=[];
PrepareExcelData(data){
 this.excelData=[];
 for(var i=0;i<data.length;i++){
   try{var obj={
     
     "#":i+1,
      "Vehicle Make Name":data[i].param2,
      "Description":data[i].param5,
      "Creation Date":data[i].param3

     }}catch(e){}
   this.excelData.push(obj);
 }
} 


MakeDetail1() {

  this.loading = true;
let keydata = {
    // param1: this.divisiondetail["param1"],
    pageNo: "",
    itemsPerPage: "",
    searchBy: "",
    searchType: "",
    totalRecords: "NA",
    pageID: "7",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
  }
 try { AddLoader() } catch (e) { alert(e) }
  // Distributor Detail Grid BIND LIST    
  this.vehiclemakeService.VehicleMakeDetailsAPI(keydata).subscribe(
    (data)  => {
     try { RemoveLoader() } catch (e) { alert(e) }
      let resdatalist = data.entity.list;
      //  this.resdata = 
      // console.log("wekcome_ "+resdata);

      let vendorlist = resdatalist;

      this.VehicleMakeDetails1$ = data.entity.list;
      this.PrepareExcelData(this.VehicleMakeDetails1$);
      
      this.loading = false;

    });
}
}
