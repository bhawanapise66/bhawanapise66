import { Component, OnInit } from '@angular/core';
import { ListService } from './../../../../../list.service';
import { Router } from '@angular/router';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as $ from 'jquery';
import { CryptService } from '../../services/crypt.service';
import { CommanService } from '../../services/comman.service';
import { NewUserCreationModelService } from 'src/app/APIService/new-user-creation-model.service';
import { CustomermodelService } from 'src/app/APIService/customermodel.service';
declare var jQuery: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

declare var SuccessAlert: any;
declare var errorAlert: any;
@Component({
  selector: 'app-userassignvehicle',
  templateUrl: './userassignvehicle.component.html',
  styleUrls: ['./userassignvehicle.component.css']
})
export class UserassignvehicleComponent implements OnInit {
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  pageUrl = this.router.url;
  ListOfCustomer = [];tableshow:any;
  selectedItemsList = []; count: any = 0;
  checkedIDs = [];
  filter: any=""; roleid: any;
  // ListOfdevicetype = [];
  devicetypebulkText = [];
  deleteText; successMessageUpdate;
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  public loading = false;

  constructor(private customerService: CustomermodelService, private modalService: NgbModal, private listService: ListService, private NewusercreationService: NewUserCreationModelService, private cryptService: CryptService, private router: Router, private common: CommanService) {
    this.isMasterSel=false;this.tableshow=false;
    this.EncryptPageName();
    this.EncryptPageUrl();
  }
  userKey1: any; show: any;
  ngOnInit() {
    let userdata = this.common.mainvalue();
    this.roleid = userdata.roleid;
  
    this.CustomerMapping();
    this.checkrole();
    this.CustomerListAPI();
 
  }

  selectCus() {
    this.selectcustomer = this.CustomerentryText.param1;
  }
  flagg: number = 0;
  checkrole() {
    // this.userKey1= localStorage.getItem('rid');
    this.userKey1 = sessionStorage.getItem('rid')

    if (this.userKey1 == '10' || this.userKey1 == '11' || this.userKey1 == '16' || this.userKey1 == '21') {

      this.flagg = 1;
      this.show = true;
      // this.isCustomer = true;


    }
    if (this.userKey1 == '14' || this.userKey1 == '18') {

      this.show = false;
      //  this.isCustomer = false;
      this.selectcustomer = "";
      this.SelectUserListData();
    }
  }
  EncryptPageName() {
    this.cryptService.encrypt("Assign User")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    // console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    // console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }





  changeSelection() {
    // this.fetchSelectedItems()
    // this.demo();
    $("#assignbutton").prop('disabled', false);
    this.tableshow=true;
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.ListOfVehicle.filter((value, index) => {
      return value.isChecked;

    });
  }

  fetchCheckedIDs() {

    this.ListOfVehicle.forEach((value, index) => {
      if (value.isChecked) {
        this.checkedIDs.push(value.param2);
      }
    });

  }

  datavalue: any;
  datasave = [];
  demo() {
    var checkedIDsdemo = [];
    this.datavalue = this.selectedItemsList;
    // console.log( this.datavalue);

    if (this.datavalue.length > 0) {
      $("#assignbutton").prop('disabled', false);

    } else {
      $("#assignbutton").prop('disabled', true);
    }
    for (let i = 0; i < this.datavalue.length; i++) {

      checkedIDsdemo.push(this.selectedItemsList[i].param3);
      //   console.log("Id of value is"+checkedIDsdemo);
      this.datasave = checkedIDsdemo;
      this.savevalue();
    }
  }
  savevalue() {
    console.log(this.datasave);
  }


  DivisionentryText: any;
  selectdivision: string;
  ListOfSubDivision = [];
  RolewiseUserentryText: any;
  selectuserlist: string;

  ListOfDepartment = [];
  CustomerentryText: any;
  selectcustomer: any;
  ListOfUserData: any;
  SelectUserListData() {

    this.assignerrormsg = ""
    // this.selectcustomer = this.CustomerentryText.param1;

    // this.selectsubdivision = this.SubDivisionentryText.param1;
    // console.log(this.stateText.param2);
    let keydata = {
      param1: "42",
      param2: this.selectcustomer,

      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }


    try { AddLoader() } catch (e) { alert(e) }


    this.listService.RoleWiseUserList(keydata).subscribe(
      (data) => {

        try { RemoveLoader() } catch (e) { alert(e) }

        // alert(JSON.stringify(data));
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        //   this.ListOfUserData = data.entity.list; 
        var datares = data.entity.list;
        var data1 = datares;
       
        this.ListOfUserData = data1;
        //  this.resdata =     
        if (data.statuscode == '200') {


        }
        this.loading = false;

      });

  }

  DeviceDetailsClick() {
    this.router.navigate(['./UserCreationDetails']);

  }

  assignerrormsg: any = "";
  searchdataDeviceid() {

    this.assignerrormsg = ""
    var search = $('#searchDataDeviceID').val();
    //this.selectstate = this.stateText.param1;
    // console.log(this.stateText.param2);
    let keydata = {
      param1: "",
      param2: "",
      param5: this.filter.trim(),
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.DeviceAssignDepartmentListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfVehicle = data.entity.list;
        //  this.resdata =     
        this.loading = false;

      });
  }
  userlist: string; ListOfVehicle: any;
  SelectVehiclelist() {
    this.countcheck=0;
    this.assignerrormsg = ""
    // this.selectcustomer = this.CustomerentryText.param1;
    // this.userlist = this.RolewiseUserentryText.param1;
    let keydata = {
      param1: this.selectcustomer,
      groupList: [],
      divisionList: [],
      subDivisionList: [],
      dpartmentList: [],
      param6: this.userlist,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.VehicleListByCustomerAssign(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.ListOfVehicle = data.entity;



        for (let j = 0; j < this.ListOfVehicle.length; j++) {
       
          if (this.ListOfVehicle[j].param4 == "false") {
         
            this.ListOfVehicle[j].isChecked = 'false';
          
          }
          if (this.ListOfVehicle[j].param4 == "true")  {
          
           this.ListOfVehicle[j].isChecked = 'true';
            this.countcheck++;
        }
        if(this.ListOfVehicle.length == this.countcheck)
        {
               this.isMasterSel=true;
        }
        if(this.ListOfVehicle.length != this.countcheck)
        {
               this.isMasterSel=false;
        }


        }
        this.assignerrormsg = ""
        //  this.resdata =     
        this.loading = false;

      });
  }


  Refreshfunction() {

    this.filter ="" ;
    this.SelectVehiclelist();
  }
  SetRole() {
    this.userlist = this.RolewiseUserentryText.param1;
  }
  newArray:any=[];neweditArr:any=[]; 
  VehicleMapping() {
    this.newArray = this.ListOfVehicle;
    this.neweditArr = [];

    for (let i = 0; i < this.newArray.length; i++) {
    //  console.log($('#abc' + i).is(":checked"));
      if ($('#abc' + i).is(":checked") == true) {
        this.neweditArr.push(this.newArray[i]["param3"]);
      }
    }
    if (this.flagg == 1 && (this.selectcustomer == '' || this.selectcustomer == null || this.selectcustomer.length <= 0)) {
      $('#msg_vendorName2').html('Please Select Employee').show();
      $('#customerentry').focus();
      setTimeout(function () { document.getElementById("msg_vendorName2").style.display = "none"; }, 3000);
    }
    else
      if (this.userlist == '' || this.userlist == null || this.userlist.length <= 0) {
        $('#msg_vendorName1').html('Please Select Employee').show();
        $('#roleuserentry').focus();
        setTimeout(function () { document.getElementById("msg_vendorName1").style.display = "none"; }, 3000);
      }
      else
        if (this.neweditArr.length < 1) {
          this.assignerrormsg = "Select vehicle for assign";
          $('#msg_errorentryid').html('Select vehicle for assign').show();
          setTimeout(function () { document.getElementById("msg_errorentryid").style.display = "none"; }, 3000);

        }
        else {
          let keydata = {
            customerId: this.selectcustomer,
            userId: this.userlist,
            vehicleList: this.neweditArr,
            remarks: "OK",
            pageID: "7",
            pageName: this.encryptedpageNameValue,
            pageURL: this.encryptedpageUrlValue
          }
          try { AddLoader() } catch (e) { alert(e) }

          this.NewusercreationService.VehicleAssigntoUserAPI(keydata).subscribe(
            (data) => {

              try { RemoveLoader() } catch (e) { alert(e) }

              if (data.statuscode == '200') {
                console.log(this.neweditArr.length)
                SuccessAlert(data.entity);
                if(this.flagg == 1)
                {
                  this.CustomerentryText = ""; this.selectcustomer = ""; this.RolewiseUserentryText = ""; this.neweditArr.length = 0;this.userlist="";

                }
                this.SelectVehiclelist();
              } else {
                errorAlert(data.entity);
              }

              //  this.resdata =     
              this.loading = false;

            }
          );
          this.filter="";
        }
  }


  CustomerDetailobj: any = [];
  CustomerMapping() {

    let keydata = {
      param1: "",
      itemsPerPage: "",
      searchBy: "",
      searchType: "",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue

    }
    try { AddLoader() } catch (e) { alert(e) }

    this.customerService.CustomerDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.CustomerDetailobj = data.entity.list;
        //  this.resdata =     
        this.loading = false;
      
      });
  }
  // clearfunction(){
  //   this.DivisionentryText=""; this.SubDivisionentryText=""; this.DepartmententryText=""; this.selectdepartment="";
  // }

  ListOfCustomerobj: object;

  CustomerListAPI() {

    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue,
      totalRecords: "NA",


    }
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.CustomerV3ListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfCustomer = data.entity;
    
        //  this.resdata =     
        this.loading = false;

      });
  }


  checkUncheckAllnew()
  {
    if($("#list_id").prop("checked") == true)
    {
      for(let i=0; i< this.ListOfVehicle.length;i++)
      {
       
        this.ListOfVehicle[i].isChecked = 'true';
      }
    }
    if($("#list_id").prop("checked") == false)
    {
      for(let i=0; i< this.ListOfVehicle.length;i++)
      {
      //  $("#abc"+i).prop("checked", false);
      this.ListOfVehicle[i].isChecked = 'false';
      }
    }
   

  }


  checkUnchecknew()
  {
    // var checkedItems = this.ListOfVehicle.filter(":checked").length;
    var n = $('#checktable input:checked').length;
    if(this.ListOfVehicle.length == n)
    {
      this.isMasterSel=true;
    }
    else{
      this.isMasterSel=false;
    }
 
  }
countcheck:number=0;dumflag:number=0;
  // checkUnchecknew(dataobj)
  // {
  // console.log(dataobj);
      
  //       if (dataobj.isChecked == 'false')
  //       {
  //         this.isMasterSel=false;
  //         this.dumflag=1;
         
  //       }
       
    
  //   if(this.dumflag == 1)
  //   {
  //     this.isMasterSel=false;
  //   }
  //  if(this.dumflag == 0){
  //     console.log("click4");
  //     this.isMasterSel = true;
  //   }
  // }
  isMasterSel: boolean;
}


