import { ReportService } from './../services/report.service';
import { RoledetailComponent } from './../RoleMaster/roledetail/roledetail.component';
import { CryptService } from './../services/crypt.service';
import { MenuAssignmentService } from './../services/menu-assignment.service';
import { ListService } from 'src/list.service';
import { Role } from './../models/menu-management';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
declare var SuccessAlert: any;
declare var errorAlert: any;

@Component({
  selector: 'app-user-mmanagement',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  products = [];
  product = {}
  menuType: string;
  subMenu: string;

  roleLists = []; roleWiseUserList = [];
  role = new Role();
  userRoleList = []; subMenuList = [];

  userRole: string;
  ownersid: string;
  userMenuType: string;
  userMenu: string;

  isSubMenu: boolean = false;
  isMainMenu: boolean = true;

  isUserMenuType: boolean = false;
  isUserCompany: boolean;
  isUserSubMenu: boolean = false;
  isUserMainMenu: boolean = false;
  roleIdEmpty: boolean = false;
  ownerIdEmpty: boolean = false;
  menuTypeEmpty: boolean = false;

  isDisabled: boolean = true;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  selectRowsText: number = 10;
  menuRoleWiseCount: number;
  isduplicatevalue: boolean = false;

  pageNumber: number = 1;
  inputNumber: number;
  sequence = [];
  requestDataForAssignment: { param1, param2, param3, param4, param5, pageID, pageName, pageURL }[] = [
    // {  "name": "Available", "age":"12"},

  ];
  pageUrl = this.router.url;
  errorMessage: any; isSuccessfullCall = false;
  ownsersObj: any;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };

  constructor(private listService: ListService, private rs: ReportService, private menuAssignmentService: MenuAssignmentService, private router: Router, private cryptService: CryptService) {
    this.EncryptPageName();
    this.EncryptPageUrl();
  }

  ngOnInit() {

    // this.UserList();
    this.role.roleId = 42;
    // this.rs.encrypt(roleid).subscribe((response) => {
    //   if (response.statuscode == 200) {
    //     this.role.roleId = response.entity.param1;
    //     alert(this.role.roleId);
    //     // this.RoleWiseUserList()
    //   }
    // })
    this.RoleWiseUserList()
  }

  // date : 5 -oct -2020
  // encryption of pagename and page url starts
  EncryptPageName() {
    this.cryptService.encrypt("Menu User Wise")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl);
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }


  UserList() {
    let dataL = {
      // param1: sessionStorage.getItem('rid')
      param1: 42
    }
    this.listService.UserList(dataL).subscribe((response) => {
      this.roleWiseUserList = response.entity.list
    })
  }
  // date : 5 -oct -2020
  // encryption of pagename and page url ends
  // RoleList() {
  //   let dataL = {
  //     param1: "",
  //     param2: "",
  //     pageID: "",
  //     pageName: this.encryptedpageNameValue,
  //     pageURL: this.encryptedpageUrlValue
  //   }
  //   this.listService.RoleList(dataL).subscribe((response) => {
  //     this.roleLists = <any[]>(response.entity.list)
  //   })
  // }

  // selectUserRole() {
  //   if (this.role.roleId != null) {
  //     this.isUserCompany = true;
  //     // alert(this.role.roleId)
  //     this.roleIdEmpty = false;
  //     this.RoleWiseUserList()
  //   }
  // }

  selectMenuType() {
    console.log((this.ownsersObj))
    this.isUserMenuType = true;
    this.ownersid = this.ownsersObj.param1;
    // this.role.roleId = this.ownsersObj.param3;
    console.log(this.ownersid);
    console.log(this.role.roleId)

    this.rs.decrypt(this.ownersid).subscribe((response) => {
      this.ownersid = response.entity.param1
    })
  }

  selectUserMenu() {
    if (this.userMenuType == null) {
      // alert("Please Fill User Menu")
    }
    if (this.userMenuType == "Sub Menu") {
      this.isUserMainMenu = false;
      this.isUserSubMenu = true;
      this.GetMainMenu()
      // this.GetSubMenu();
    }
    else {
      this.isUserSubMenu = false;
    }
  }

  GetMenuRoleWise() {

    if (this.ownersid == null) {
      this.ownerIdEmpty = true;
    }
    else if (this.userMenuType == null || this.userMenuType == '') {
      document.getElementById('menutype').innerHTML = "Please Enter Menu Type";
      setTimeout(function () { document.getElementById("menutype").style.display = "none"; }, 3000);
    }
    else if (this.userMenuType == "Main Menu") {

      let dataL = {
        pageNo: "",
        itemsPerPage: '',
        searchBy: "",
        searchType: "",
        totalRecords: "NA",
        param1: "0",
        param2: this.role.roleId,
        param3: this.ownersid,

        param4: "",
        pageID: "1",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }
      this.menuAssignmentService.GetMenuRoleWise(dataL).subscribe((response) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.menuRoleWiseCount = response.entity.count;
        // console.log(this.menuRoleWiseCount);
        this.isUserMainMenu = true;
        this.userRoleList = <any[]>(response.entity.list)
      })
    }
    else if (this.userMenuType == "Sub Menu") {

      if (this.userMenu == null || this.userMenu == '') {
        document.getElementById('submenu').innerHTML = "Please Enter Sub Menu";
        setTimeout(function () { document.getElementById("submenu").style.display = "none"; }, 3000);
      }
      else {


        let dataL = {
          pageNo: "",
          itemsPerPage: "",
          searchBy: "",
          searchType: "",
          totalRecords: "NA",
          param1: this.userMenu,
          param2: this.role.roleId,
          param3: this.ownersid,
          param4: "",
          pageID: "2",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
        }
        try { AddLoader() } catch (e) { alert(e) }

        this.menuAssignmentService.GetMenuRoleWise(dataL).subscribe((response) => {
          try { RemoveLoader() } catch (e) { alert(e) }

          this.menuRoleWiseCount = response.entity.count;
          this.isUserMainMenu = true;
          this.userRoleList = <any[]>(response.entity.list)
        })
      }
    }
  }

  triggerSomeEvent(id, id2) {
    let roleListFinal = [];



    $("#check" + id2).prop('isDisabled', false);
    if ($("#check" + id2).is(':checked')) {
      // alert("check");
      $("#text" + id2).prop('disabled', false);


      let roleListFinal = [];

      for (let i = 0; i <= this.userRoleList.length; i++) {
        let value = (document.getElementById("check" + id2) as HTMLInputElement).checked;   // this.requestDataForAssignment.push({ param1:, param2: string, param3: string, param4: string, param5: string, pageID: string, pageName: string, pageURL: string });
      }


    } else {
      $("#text" + id2).prop('disabled', true);
      let value = (document.getElementById("check" + id2) as HTMLInputElement).checked;   // this.requestDataForAssignment.push({ param1:, param2: string, param3: string, param4: string, param5: string, pageID: string, pageName: string, pageURL: string });
    }
  }

  checkDuplicate(id) {

    let ordernumber = $('#text' + id).val();    // this.sequence.push(ordernumber);
    if (this.sequence.length == 0) {
      this.sequence.push(ordernumber)
    }
    else {
      // alert(ordernumber)

      for (let i = 0; i < this.sequence.length; i++) {
        this.isduplicatevalue = true;
        if (this.sequence.indexOf(ordernumber) == -1) {
          this.isduplicatevalue = false;
          this.sequence.push(ordernumber);
        }
        else {
          this.isduplicatevalue = true;
        }
      }
    }
  }


  RoleWiseUserList() {
    let dataL = {
      param1: this.role.roleId,
      param2: "",
      pageID: "2",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.RoleWiseUserList(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      let list = response.entity.list;
      this.roleWiseUserList = list;
    })
  }

  GetSubMenu() {
    let dataL = {
      param1: "",
      param2: "",
      param3: this.subMenu,
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.menuAssignmentService.GetSubMenu(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        let list = response.entity.list;
        this.subMenuList = list;
      }
    })
  }

  GetMainMenu() {
    this.isMainMenu = true
    let dataL = {
      pageNo: this.pageNumber,
      itemsPerPage: "100",
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.menuAssignmentService.GetMainMenu(dataL).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.products = <any[]>(data.entity.list);
    })
  }

  AssignMenuUserWise(id) {
    let roleListFinal = [];
    for (var i = 0; i < this.userRoleList.length; i++) {
      var checkbox = (document.getElementById("check" + this.userRoleList[i].rowNumber) as HTMLInputElement).checked;
      var newvalue = (document.getElementById("text" + this.userRoleList[i].rowNumber) as HTMLInputElement).innerHTML;
      if (checkbox == true && newvalue == null) {
        alert("Order number should not blank");
        return;
      }
      if (this.userMenuType == "Main Menu") {
        roleListFinal.push({
          param1: (document.getElementById("menuid" + this.userRoleList[i].rowNumber) as HTMLInputElement).innerHTML,
          param2: this.role.roleId,
          param3: (document.getElementById("check" + this.userRoleList[i].rowNumber) as HTMLInputElement).checked,	//status, srno = param1
          param4: (document.getElementById("text" + this.userRoleList[i].rowNumber) as HTMLInputElement).value,	//orderno
          param5: this.ownersid,
        });
      }
      else if (this.userMenuType == "Sub Menu") {
        roleListFinal.push({
          param1: (document.getElementById("menuid" + this.userRoleList[i].rowNumber) as HTMLInputElement).innerHTML,
          param2: this.role.roleId,
          param3: (document.getElementById("check" + this.userRoleList[i].rowNumber) as HTMLInputElement).checked,	//status, srno = param1
          param4: (document.getElementById("text" + this.userRoleList[i].rowNumber) as HTMLInputElement).value,	//orderno
          param5: this.ownersid,
        });
      }
    }
    let dataL = {
      list: roleListFinal,
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.menuAssignmentService.AssignMenuUserWise(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.isSuccessfullCall = true;
      if (response.statuscode == 200 && response.failedToSaveRecords == 0) {
        this.isSuccessfullCall = false;
        SuccessAlert("Data Saved Successfully")
        this.GetMenuRoleWise();
      }
      else {
        this.isSuccessfullCall = false;
        errorAlert("Failed To Save Records")
        this.GetMenuRoleWise();
      }
    })
  }
}

