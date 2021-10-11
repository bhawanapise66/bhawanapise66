import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { VehiclemodelService } from 'src/app/APIService/vehiclemodel.service';
import { ListService } from 'src/list.service';
import { CryptService } from '../../services/crypt.service';
import * as $ from 'jquery';
declare var jQuery: any;
declare var $: any;
declare var AddLoader:any;
declare var RemoveLoader:any;
@Component({
  selector: 'app-vehiclemodelentry',
  templateUrl: './vehiclemodelentry.component.html',
  styleUrls: ['./vehiclemodelentry.component.css']
})
export class VehiclemodelentryComponent implements OnInit {
  modelid:string;

  @ViewChild('epltable',{ static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  timer:any;
  pageUrl = this.router.url;
 successMessageUpdate: string;
  public loading = false; p: number;   pagecount:number =10; count:number; viewcount:number;
  key: string = 'name'; reverse: boolean = true;


  constructor( private modalService: NgbModal,private flashMessage: FlashMessagesService ,private listService:ListService, private cryptService:CryptService,private router:Router, private vehiclemodelService:VehiclemodelService) { }

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
   // limitTo: this.count,
   height: '200px',
  };
  ngOnInit() {
    this.SelectMakelist();
    this. SelectVehicleClasslist();
    this.Yearlist();
    this.clear();

    (function ($) {
      $(document).ready(function() {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#selectmakeentry').focus();
      })
    });
    })(jQuery);

  }
  EncryptPageName() {
    this.cryptService.encrypt("Vehicle Model Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;


  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }

  //  List of Make  changed  by KJ 
  ListOfSelectMake = [];
  selectvalueofmake:string;
  SelectMakelist(){
   
    let keydata = {
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
    }  
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.SelectMakeListAPI(keydata).subscribe(
      (data)  => {
        try { RemoveLoader() } catch (e) { alert(e) }

       this.ListOfSelectMake = data.entity;
       this.loading = false; 
       console.log(this.ListOfSelectMake)
       });
  }
ListOfSelectVehicleClass :any;
 selectvalueofvehicleclass:string;
  SelectVehicleClasslist(){
    let keydata = {
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
    }  
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.VehicleClassListAPI(keydata).subscribe(
 (data)  => {
  try { RemoveLoader() } catch (e) { alert(e) }


      this.ListOfSelectVehicleClass = data.entity;
     
      this.loading = false; 
    });
  }

  ListOfYear = [];

  Yearlist(){
   let keydata = {
       pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
     }  
     try { AddLoader() } catch (e) { alert(e) }

     this.listService.YearListAPI(keydata).subscribe(
       (data)  => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.ListOfYear = data.entity;
       this.loading = false; 
       });
   }
   datafromrespo:string;

   vensavebtn(){
    var isValid = true; 
    var regmake = $('#makedummy1').val();
   
    var regclass = $('#classdummy1').val();
    
    var regmodel = $('#modelnameentry1').val();
 
    var regyear = $('#yeardummy1').val();
  
    var regdescription = $('#descriptionnameentry1').val();
    this.modelText = regmodel.substring(0, 1).toUpperCase() + regmodel.substring(1);
    this.descriptionText = regdescription.substring(0, 1).toUpperCase() + regdescription.substring(1);
   
    if(!regmake && regmake.length <= 0)
    {
      isValid = false;
      $('#msg_errorentry4').html('Please Select Make Name').show();
      $('#selectmakeentry').focus();
      setTimeout(function(){document.getElementById("msg_errorentry4").style.display="none";}, 3000);
    }else
    if(!regclass && regclass.length <= 0)
    {
      isValid = false;
      $('#msg_errorentry4').html('Please Select Class Name').show();
      $('#classnameentry').focus();
      setTimeout(function(){document.getElementById("msg_errorentry4").style.display="none";}, 3000);
    }else
    if(!regmodel && regmodel.length <= 0)
    {
      isValid = false;
      $('#msg_errorentry4').html('Please Enter Model Name').show();
      $('#modelnameentry1').focus();
      setTimeout(function(){document.getElementById("msg_errorentry4").style.display="none";}, 3000);
    }else
    if(!regyear && regyear.length <= 0)
    {
      isValid = false;
      $('#msg_errorentry4').html('Please Select Year').show();
      setTimeout(function(){document.getElementById("msg_errorentry4").style.display="none";}, 3000);    }else
    if(!regdescription && regdescription.length <= 0)
    {
      isValid = false;
      $('#msg_errorentry4').html('Please Enter Description').show();
      $('#descriptionnameentry1').focus();
      setTimeout(function(){document.getElementById("msg_errorentry4").style.display="none";}, 3000);
     
    }
      else{
    let dataL = {
        param1:"",
        param2:"",
        param3:this.selectdummyyear,
        param4:this.selectdummake,
        param5:this.modelText, 
        param6: this.selectdummyclass,
        param7: this.descriptionText,
         pageID: "7",
         pageName: this.encryptedpageNameValue,
         pageURL: this.encryptedpageUrlValue
          }
          try { AddLoader() } catch (e) { alert(e) }

        this.vehiclemodelService.InsertVehicleModelAPI(dataL).subscribe((data)=>{
          try { RemoveLoader() } catch (e) { alert(e) }

          this.datafromrespo = data.entity;
    
          if(data.statuscode == 200)
      {
        $("#successmodelentry").modal('show');
        this.VehicleModelDetail();
        this.clear();
        this.closemodal();
      }
      else
      {
       $("#notifymodelentry").modal('show');
      }
      });
    }
    }

   //All ngModel
   SelectMakeText:any;
 
   modelText:any;
   SelectMgfYearText:any;
   descriptionText:any;

   selectmake:string;
   selectclass:string;
   selectyear:string;


   selectdummake:any;
     selectdummakename:any;
  
     selectdummyclass:any;
     SelectVehicleClassTextname:any;
     SelectVehicleClassText:any;
 
   
     selectdummyyear:any;
     selectmgfyeardummy:string;
     SelectVehicleMakeData()
     {
     this.selectdummake = this.SelectMakeText.param1;
     }
     
     SelectVehicleClass()
     {
     this.selectdummyclass = this.SelectVehicleClassText.param2;
     }
     
     dummymgfyear()
     {
     this.selectdummyyear = this.SelectMgfYearText.param1;
     }
        VehicleModelDetails$:Object;
        itemsPerPage:number=10;

        VehicleModelDetail() {
          this.loading = true; 
          this.itemsPerPage=this.pagecount;

          this.p = 1; let keydata = {
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

           this.vehiclemodelService.VehicleModelDetailsAPI(keydata).subscribe(
           (data)  => {
            try { RemoveLoader() } catch (e) { alert(e) }

              let resdatalist = data.entity.responsedatalist; 
              let modellist = resdatalist;
           
               this.VehicleModelDetails$ = modellist;
               this.count = data.entity.count;
               this.viewcount = data.entity.viewCount;
               this.loading = false; 
            });
        }
        closemodal() {
          $("#successmodel").modal('hide');
          $('#exampleModal').modal('hide');
         $('.modal-backdrop.show').css('display', 'none');
        }
     clear()
     {
       this.SelectMakeText="";
       this.SelectVehicleClassText="";
       this.modelText="";
       this.SelectMgfYearText="";
       this.descriptionText="";
     }   
}
