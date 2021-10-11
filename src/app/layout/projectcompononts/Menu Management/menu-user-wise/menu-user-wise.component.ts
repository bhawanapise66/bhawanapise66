import { ListService } from './../../../../../list.service';
import { PostService } from './../../../../../post.service';
import { CryptService } from './../../services/crypt.service';
import { Router } from '@angular/router';

import { Role } from './../../models/menu-management';
import { Component, OnInit } from '@angular/core';
import { MenuAssignmentService } from '../../services/menu-assignment.service';

import * as $ from 'jquery';
declare var jQuery: any;
declare var $: any;

declare var AddLoader: any;
declare var RemoveLoader: any;


@Component({
  selector: 'app-menu-user-wise',
  templateUrl: './menu-user-wise.component.html',
  styleUrls: ['./menu-user-wise.component.css']
})
export class MenuUserWiseComponent implements OnInit {
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


  constructor(private listService: ListService, private menuAssignmentService: MenuAssignmentService, private router: Router, private cryptService: CryptService) {
    // this.myForm = this.fb.group({
    //   rows: this.fb.array([])
    // }, [this.formValidator.bind(this)]);
    // this.patchValues();
  }

  ngOnInit() {
    this.EncryptPageName();
    this.EncryptPageUrl();
    this.RoleList();
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

  // date : 5 -oct -2020
  // encryption of pagename and page url ends
  RoleList() {
    let dataL = {
      param1: "",
      param2: "",
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.RoleList(dataL).subscribe((response) => {
      this.roleLists = <any[]>(response.entity.list)
    })
  }

  selectUserRole() {
    if (this.role.roleId != null) {
      this.isUserCompany = true;
      // alert(this.role.roleId)
      this.roleIdEmpty = false;
      this.RoleWiseUserList()
    }
  }

  selectMenuType() {
    this.isUserMenuType = true;
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
    if (this.role.roleId == null) {
      this.roleIdEmpty = true;
    }
    else if (this.ownersid == null) {
      this.ownerIdEmpty = true;
    }
    else if (this.userMenuType == null) {
      this.menuTypeEmpty = true;
    }
    else if (this.userMenuType == "Main Menu") {
      let dataL = {
        pageNo: this.pageNumber,
        itemsPerPage: '50',
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
      let dataL = {
        pageNo: "1",
        itemsPerPage: 50,
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
    // alert(this.sequence)
    // console.log("length:" + " " + this.sequence.length)
    if (this.sequence.length == 0) {
      // console.log(ordernumber)
      this.sequence.push(ordernumber)
      // alert(this.sequence)
      // console.log(this.sequence)
    }
    else {
      // alert(ordernumber)

      for (let i = 0; i < this.sequence.length; i++) {
        this.isduplicatevalue = true;
        if (this.sequence.indexOf(ordernumber) == -1) {
          this.isduplicatevalue = false;
          this.sequence.push(ordernumber);
          // console.log(this.isduplicatevalue)
        }
        else {
          // alert('duplicate value')
          this.isduplicatevalue = true;
        }
        // console.log(this.sequence)
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
        // alert("main menu");
        roleListFinal.push({
          param1: (document.getElementById("menuid" + this.userRoleList[i].rowNumber) as HTMLInputElement).innerHTML,
          param2: this.role.roleId,
          param3: (document.getElementById("check" + this.userRoleList[i].rowNumber) as HTMLInputElement).checked,	//status, srno = param1
          param4: (document.getElementById("text" + this.userRoleList[i].rowNumber) as HTMLInputElement).value,	//orderno
          param5: this.ownersid,
        });

      }
      else if (this.userMenuType == "Sub Menu") {
        // alert(this.userMenu)
        roleListFinal.push({
          param1: (document.getElementById("menuid" + this.userRoleList[i].rowNumber) as HTMLInputElement).innerHTML,
          param2: this.role.roleId,
          param3: (document.getElementById("check" + this.userRoleList[i].rowNumber) as HTMLInputElement).checked,	//status, srno = param1
          param4: (document.getElementById("text" + this.userRoleList[i].rowNumber) as HTMLInputElement).value,	//orderno
          param5: this.ownersid,
        });

      }
    }
    //  console.log(roleListFinal)
    let dataL = {
      list: roleListFinal,
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

try{AddLoader()}catch(e){alert(e)}

    this.menuAssignmentService.AssignMenuUserWise(dataL).subscribe((response) => {
      try{RemoveLoader()}catch(e){alert(e)}

      this.isSuccessfullCall = true;

      if (response.statuscode == 200) {
        this.isSuccessfullCall = false;
        this.errorMessage = response.entity;
        $("#updateSuccessModal").modal('show');
        this.GetMenuRoleWise();
      }
      else {
        this.isSuccessfullCall = false;
        this.errorMessage = response.entity;
        $("#ErrorModal").modal('show');
        this.GetMenuRoleWise();
      }
     })
  }
}

