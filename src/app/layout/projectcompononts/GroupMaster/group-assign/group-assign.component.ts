import { Component, OnInit } from '@angular/core';
import { ExportToExcelService } from '../../services/export-to-excel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FlashMessagesService } from 'angular2-flash-messages';
import { CryptService } from '../../services/crypt.service';
import { Router } from '@angular/router';
import { Paramcls } from '../../../../../paramcls';
import { HttpClient } from '@angular/common/http';



import * as $ from 'jquery';
import { ThemeService } from 'ng2-charts';
import { PdfService } from '../../services/pdf.service';
import { CustomermodelService } from 'src/app/APIService/customermodel.service';
import { ListService } from 'src/list.service';
import { GroupcreationService } from 'src/app/APIService/groupcreation.service';

declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;


@Component({
  selector: 'app-group-assign',
  templateUrl: './group-assign.component.html',
  styleUrls: ['./group-assign.component.css']
})
export class GroupAssignComponent implements OnInit {
  ListOfCustomer: any;
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 20000,
    height: '200px',
  };

  ListOfGroup: any; show: any; isCustomer:any;
  selectcustomerlist: any;
  constructor(private groupservice: GroupcreationService,private modalService: NgbModal, private flashMessage: FlashMessagesService, private cryptService: CryptService, private router: Router, private customerService: CustomermodelService
    , private lists: ListService, public excelservice: ExportToExcelService, public pdfservice: PdfService) {
      this.isMasterSel = false;
     }
     userKey1:any;custrole: any;
  ngOnInit() {
    $('#btnyellow').show();
  
       // this.userKey1= localStorage.getItem('rid');
       this.userKey1 =sessionStorage.getItem('rid')
   
       if(this.userKey1 == '10' || this.userKey1 == '11' || this.userKey1 == '16' || this.userKey1 == '21') 
       {
    
      
          this.show = true;
         // this.isCustomer = true;
         
        
       }
       if(this.userKey1 == '14' || this.userKey1 == '18') 
       { 
       
          this.show = false;
        //  this.isCustomer = false;
          this.sel_Cust = 0;
          this.ClickCustomerChange();
       }
    $('#tableid').hide();
  
    this.Customerlist();
    this.EncryptPageName();
    this.EncryptPageUrl();

  }


  EncryptPageName() {
    this.cryptService.encrypt("Vehicle Assign To Customer")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }

  selectcustomerentry: any; selectvehicleentry: any; deviceidspan: string; roleid: string;
  encryptedpageNameValue: string; encryptedpageUrlValue: string; pageUrl = this.router.url;
  public edited = false;



  //this code is used to get custumer list

  Customerlist() {
    try {
      let keydata = {
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }
      this.customerService.CustomerListAPI(keydata).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfCustomer = data.entity.list;
      
      });
    } catch (e) { }

  }

  ListOfCustomerVehicleobj: any; selectcustomergroup: any; grpList = [];grpCust:any=[];
  CustVehiclelist() {
    var grp = this.selectcustomergroup.param1;
    this.grpList.push(grp);

    try {
      let keydata = {
        param1: this.sel_Cust,
       // groupList: this.grpList,
        groupList:[],
        divisionList: [],
        subDivisionList: [],
        dpartmentList: [],
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
  
      try { AddLoader() } catch (e) { alert(e) }
      this.lists.Customer_VehicleList(keydata).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
      
        this.ListOfCustomerVehicleobj= data.entity;
     //   console.log(this.ListOfCustomerVehicleobj.length)
        //this.ListOfCustomerVehicleobj = this.grpCust;
      });
    } catch (e) { }
    $('#tableid').show();
    $("#btncloudassign").css("display", "block")
  
    
  }


  //this code is used to get group list
  sel_Cust:any;
  selectCus()
  {
     this.sel_Cust = this.selectcustomerlist.param1;
  }
  ClickCustomerChange() {

    try {
      let keydata = {
        param1: this.sel_Cust,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }
      this.lists.grouplist(keydata).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfGroup = data.entity;
      
      });
    } catch (e) { }
  }


  item1: any; isMasterSel: boolean;
  checkUncheckAll() {
    try {

      for (var j = 0; j < this.ListOfCustomerVehicleobj.length; j++) {
       this.item1 = this.ListOfCustomerVehicleobj[j];
      this.item1.isChecked = this.isMasterSel;
      }

    } catch (e) { }
  }

  clear() {
    this.selectcustomerlist = "";
    this.selectcustomergroup = "";
    this.datasave = [];
 
  }
  filter:any;
  changeSelection() {

    this.fetchSelectedItems()
    this.demo();
    $("#assignbutton").prop('disabled', false);

  }

  selectedItemsList = [];
  fetchSelectedItems() {
 
    this.selectedItemsList = this.ListOfCustomerVehicleobj.filter((value: any, index: number) => {
      return value.isChecked;
    });
  }

  datavalue: any;
  datasave = [];
  demo() {

    var checkedIDsdemo = [];
    this.datavalue = this.selectedItemsList;

    for (let i = 0; i < this.datavalue.length; i++) {
      checkedIDsdemo.push(this.selectedItemsList[i].param1);
     // console.log("Id of value is" + checkedIDsdemo);
      this.datasave = checkedIDsdemo;
      this.savevalue();
    }
  }

  savevalue() {
  //  console.log(this.datasave);
  }


  datafromrespo:any;
  vehicleAssignToGroup(){
      let dataL = {
         pageID: "7",
         pageName: this.encryptedpageNameValue,
         pageURL: this.encryptedpageUrlValue,
         param1:"",
         param2:this.selectcustomergroup.param1,
         vehiclelist:this.datasave, 
     }
       try{AddLoader()}catch(e){alert(e)}
       this.groupservice.VehicleAssignToGroup(dataL).subscribe((data)=>{
       try{RemoveLoader()}catch(e){alert(e)}
       this.datafromrespo = data.entity;
      
       if(data.statuscode == '200')
       {
       $("#SuccessModalid").modal('show');
       this.checkUncheckAll();
       this.clear();
       $('#tableid').hide();
       $("#btncloudassign").css("display", "none")
 
        }
       else
       {
        $("#ErrorModalid").modal('show');
       }
      });
    
  }


  checkUncheckAll1() {

    
    $("#assignbutton").prop('disabled', false);
    try{

    for (var j = 0; j < this.ListOfCustomerVehicleobj.length; j++)
     {
      this.item1=this.ListOfCustomerVehicleobj[j];
      this.item1.isChecked = this.isMasterSel;
    }
      this.getCheckedItemList();
    
   
  }catch(e){}
  }
  checkedCategoryList:any;
  getCheckedItemList(){
     this.checkedCategoryList = [];
   
    for (var i = 0; i < this.ListOfCustomerVehicleobj.length; i++)
    {
      this.item1=this.ListOfCustomerVehicleobj[i];
      if(this.item1.isChecked)
      {
       this.checkedCategoryList.push(this.item1.param1);
       this.datasave = this.checkedCategoryList;
      }
     }
  //   this.checkedCategoryList = JSON.stringify(this.checkedCategoryList);
    // console.log(this.checkedCategoryList);
    this.datasave = this.checkedCategoryList;
    this.savevalue();
   
  }


}






