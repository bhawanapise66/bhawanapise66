import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ListService } from './../../../../../../list.service';
import { CryptService } from './../../../services/crypt.service';
import { Router } from '@angular/router';
import { NetworkmodelService } from './../../../../../APIService/networkmodel.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
declare var jQuery: any;
declare var $: any;
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

declare var AddLoader:any;
declare var RemoveLoader:any;


@Component({
  selector: 'app-networkentry',
  templateUrl: './networkentry.component.html',
  styleUrls: ['./networkentry.component.css']
})





  export class NetworkentryComponent implements OnInit {
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  pageUrl = this.router.url;
  public loading = false;p: number;   pagecount:number;
  division: any;
  subDivision: string;
  subDivisionDesc: string;

  divisionListArray = [];


  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo:5000,
    height: '200px',
  };
  constructor(private router: Router, private cryptService: CryptService, private listService: ListService, private networkmodelService:NetworkmodelService) {
    this.EncryptPageName(); this.EncryptPageUrl();
   
  }

  ngOnInit() {

    (function ($) {
      $(document).ready(function() {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#Networkentry').focus();
      })
    });
    })(jQuery);

  }

  EncryptPageName() {
    this.cryptService.encrypt("Network Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }


  datafromrespo:string;
  NetworkentryText:string;
  descriptionText:string;
  InsertNetwork(){
  
    var networkname = $("#Networkentry").val();
    var description = $("#descriptionentry").val();
    this.NetworkentryText = networkname.substring(0, 1).toUpperCase() + networkname.substring(1);
    this.descriptionText = description.substring(0, 1).toUpperCase() + description.substring(1);


    var isValid = true;
    if(!networkname && networkname.length <= 0){
      // alert(devicetype);
      isValid = false;
      $('#msg_errordivision').html('Please Enter Network').show();
     $('#Networkentry').focus();
      setTimeout(function(){document.getElementById("msg_errordivision").style.display="none";}, 3000);
    }
    else if(!description && description.length <= 0){
      // alert(devicetype);
      isValid = false;
      $('#msg_errordivision').html('Please Enter Description ').show();
     $('#descriptionentry').focus();
      setTimeout(function(){document.getElementById("msg_errordivision").style.display="none";}, 3000);
    }
    else{
    let dataL = {
      remarks:"NA",
      networkId:"",
      networkName:this.NetworkentryText, 
      networkDescription:this.descriptionText, 
      pageID: "7",
       pageName: this.encryptedpageNameValue,
       pageURL: this.encryptedpageUrlValue
        }
       try{AddLoader()}catch(e){alert(e)}

    this.networkmodelService.InsertNetworkAPI(dataL).subscribe((data)=>{
      try{RemoveLoader()}catch(e){alert(e)}

            this.datafromrespo = data.entity;
           // this.datafromrespostatus = data.statuscode;
            if (data.statuscode == '200')
          {
            $("#successmodelentry").modal('show');
            this.clear();
            this.NetworkDetailAPI();
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
  this.NetworkentryText="";
  this.descriptionText="";
 }

 itemsPerPage:number=10;
 networkDetailsArray:any;
 count: number; viewcount: number;
 NetworkDetailAPI() {

  this.loading = true;

  this.p = 1;
  // this.pagecount = 5;
  //  console.log("p" + this.p);
  this.itemsPerPage=this.pagecount;
  let keydata = {
  
    pageNo: this.p,
    itemsPerPage: this.pagecount,
    searchBy: "",
    searchType: "",
    totalRecords: "NA",
    pageID: "7",
    pageName: this.encryptedpageNameValue,
    pageURL: this.encryptedpageUrlValue
  }
  try{AddLoader()}catch(e){alert(e)}

  this.networkmodelService.NetworkDetailsAPI(keydata).subscribe(
    (data) => {
      try{RemoveLoader()}catch(e){alert(e)}

      let resdatalist = data.entity.list;
    
      let vendorlist = resdatalist;

      this.networkDetailsArray = vendorlist;
      this.count = data.entity.count;
      this.viewcount = data.entity.viewCount;
     
      this.loading = false;
    });
}
}
