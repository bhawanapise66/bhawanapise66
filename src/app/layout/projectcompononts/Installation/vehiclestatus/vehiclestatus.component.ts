import { string } from '@amcharts/amcharts4/core';
import { VehicleinstallationService } from './../../../../APIService/vehicleinstallation.service';
import { VendormodelService } from './../../../../APIService/vendormodel.service';
import { Router } from '@angular/router';

import { ListService } from './../../../../../list.service';
//import { PostService } from './../../../../post.service';

import { Paramcls } from './../../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as xlsx from 'xlsx';
import * as $ from 'jquery';
import { CryptService } from '../../services/crypt.service';

//import * as $ from 'jquery';
declare var jQuery: any;
declare var $: any;
declare var AddLoader:any;
declare var RemoveLoader:any;

@Component({
  selector: 'app-vehiclestatus',
  templateUrl: './vehiclestatus.component.html',
  styleUrls: ['./vehiclestatus.component.css']
})
export class VehiclestatusComponent implements OnInit {
  @ViewChild('epltable',{ static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  key: string = 'name'; reverse: boolean = true; p: number; 
  
  pageUrl = this.router.url;
  private _success = new Subject<string>();  successMessageUpdate: string;
  count:number; viewcount:number;
  vendornewText:string; shortcodeText:string;cinnoText:string; gstText:string;officialnoText:string;officialemailText:string; supplierofText:string;
 
   personnameText:string;personnoText:string;personaltnoText:string;personemailText:string;cityText:string;regaddressText:string;pincodeText:string;
   datafromrespo:string; TranslogDetails$:Object;

   AreaText:string; landmarkText:string; remarkText:string;
   selectRowsText: string = "10";
  

   customarname:string;customarmobile:string;customaremail:string;

   deleteText:string;     ListOfCity$:Object; ListOfState$:Object;  resdatalist=[]; ListOfState = []; ListOfCity = [];

   public loading = false;  pagecount:number;  stringifiedData: any; parsedJson: any; stringifiedDataList: any; parsedJsonList: any;
   nop :number; totrec:number; outorec:number; filter:any; selectRows:string; Searchvendor:string;
   VendorDetails$:Object; VehicleDetails$:Object;

   config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };

  constructor(private modalService: NgbModal,private flashMessage: FlashMessagesService , private vehicleinstallationservice:VehicleinstallationService, private vendormodelservice: VendormodelService,private listService:ListService, private cryptService:CryptService,private router:Router) { }

  ngOnInit() {
    this.EncryptPageName();
    this.EncryptPageUrl();
  }
  EncryptPageName() {
    this.cryptService.encrypt("Vehicle Details")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }
  searchdataIMEI(){
   
    var search = $('#searchData').val();  
    //this.loading = true; 
          
    this.p = 1; this.pagecount = 10;
  //  console.log("p" + this.p);
    
    let keydata = {
      pageNo:this.p,
      itemsPerPage:this.pagecount,    
      searchBy:search, 
      searchType:"",
      totalRecords:"NA",
      pageID: "7",
      param1:search,
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try{AddLoader()}catch(e){alert(e)} 
   
     this.vehicleinstallationservice.VehicleStatusDetails(keydata).subscribe(
      (data)  => {
        try{RemoveLoader()}catch(e){alert(e)} 
        let resdatalist = data.entity.list; 
     
  
         let vendorlist = resdatalist;
       
         this.VehicleDetails$ = vendorlist;
         this.count = data.entity.count;
         this.viewcount = data.entity.viewCount;

         this.vehicleid = data.entity.list[0].param1;
         this.customarname = data.entity.list[0].param25;
         this.customarmobile = data.entity.list[0].param26;
         this.customaremail = data.entity.list[0].param27;
         this.deviceimeino = data.entity.list[0].param3;
         this.deviceiccidno = data.entity.list[0].param5;
         this.deviceuniqueno = data.entity.list[0].param4;
         this.vehicleno = data.entity.list[0].param10;
         this.chassisno = data.entity.list[0].param11;
         this.engineno = data.entity.list[0].param12;
         this.vehicleregno = data.entity.list[0].param22;
         this.vehicletype = data.entity.list[0].param18;
         this.activated = data.entity.list[0].param23;
         this.make = data.entity.list[0].param37;
         this.model = data.entity.list[0].param38;
         this.rtoname = data.entity.list[0].param17;
         this.devicetype = data.entity.list[0].param46;
         this.installdate = data.entity.list[0].param40;
         this.poolingstatus = data.entity.list[0].param42;
         this.activationdate = data.entity.list[0].param47;
         this.validity = data.entity.list[0].param43;
         this.paymenttype = data.entity.list[0].param45;

         this.eventlogsearch();
          //console.log(this.customarname);
        // this.loading = false; 
      });
  }
  sort(key){

    //  alert(key);
 
     this.key = key;
     this.reverse = !this.reverse;
     
   }
  eventlogsearch(){
    var search = $('#searchData').val(); 
    this.p = 1; this.pagecount = 10;
    //  console.log("p" + this.p);
      
      let keydata = {
        param1:"",
        param2:this.vehicleid,

        searchBy:search,
        searchType:"",
        totalRecords:"NA",
        pageID:"7",
         pageNo:this.p,
         itemsPerPage:this.pagecount,    
        
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      

      }
      try{AddLoader()}catch(e){alert(e)} 
     
       this.vehicleinstallationservice.VehicleStatusTranslogDetails(keydata).subscribe(
        (data)  => {
          try{RemoveLoader()}catch(e){alert(e)} 
          let resdatalist = data.entity.responsedatalist; 
       
    
           let dataactual = resdatalist;
          // alert(dataactual);
           this.TranslogDetails$ = dataactual;
          // alert("TranslogDetails"+JSON.stringify(this.TranslogDetails$));
           this.count = data.entity.count;
          // this.viewcount = data.entity.viewCount;
          // this.vehicleid = data.entity.list[0].param1;

        });
  }
  vehicleid:string; deviceimeino:string;  deviceiccidno:string;  deviceuniqueno:string; engineno:string;  vehicleno:string; chassisno:string; vehicleregno:string;
  vehicletype:string; activated:string;  make:string;  model:string;  rtoname:string; devicetype:string; installdate:string; poolingstatus:string;
  activationdate:string; validity:string; paymenttype:string; 
}
