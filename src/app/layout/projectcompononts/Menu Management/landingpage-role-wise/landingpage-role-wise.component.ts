import { ListService } from './../../../../../list.service';
import { MenuAssignmentService } from './../../services/menu-assignment.service';
import { Role } from './../../models/menu-management';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;



@Component({
  selector: 'app-landingpage-role-wise',
  templateUrl: './landingpage-role-wise.component.html',
  styleUrls: ['./landingpage-role-wise.component.css']
})
export class LandingpageRoleWiseComponent implements OnInit {
  menuRoleList = []; product = {}; menuType: string; subMenu: string;
  filter;
  
  errorMessage: string;
  role = new Role();
  products = [];

  roleLists = []; subMenuList = []; orderNumber: number; menuListforPage = []

  isRoleCompany: boolean = false;
  RoleCompany: string; roleMenuType: string;

  roleSubMenu: string;
  isRoleMenuType: boolean = false;

  isSubMenu: boolean = false; isMainMenu: boolean = true;
  isRoleMainMenu: boolean = false; isRoleSubMenu: boolean = false;

  encryptedpageNameValue: string; encryptedpageUrlValue: string;
  pageUrl = this.router.url

  isDisabled: boolean = true;
  num: any;
  pageNumber: number = 1;
  itemsPerPage: number = 10;
  roleIdEmpty: boolean = false; menuTypeEmpty: boolean = false; mainmenulistempty: boolean = false;

  menuidlp: string; isInvalid: boolean = false;

  constructor(private cryptService: CryptService, private router: Router, private menuAssignmentService: MenuAssignmentService, private listService: ListService) {
    this.EncryptPageName(); this.EncryptPageUrl()
  }

  ngOnInit() {

    let dataL = {
      param1: "",
      param2: "",
      pageID: "6",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.RoleList(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.roleLists = <any[]>(response.entity.list)
    })
  }

  // develoer  : DHammadeep dahiwale
  // date : 24-12-20020
  // encryption of pagename and page url starts
  EncryptPageName() {
    this.cryptService.encrypt("Landing Page Role Wise")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl);
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput;
  }

  GetSubMenu() {
    let dataL = {
      param1: this.role.roleId,
      param2: "0",
      param3: this.roleSubMenu,
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.menuAssignmentService.GetSubMenu(dataL).subscribe((response) => {
      let list = response.entity.list;
      this.subMenuList = list
    })
  }

  GetMainMenu() {
    this.isMainMenu = true
    let dataL = {
      pageNo: "1",
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
  SelectRoleSubmenu() {
    if (this.roleMenuType == "Main Menu") {
      this.isRoleSubMenu = false;
    }
    else {
      this.isRoleSubMenu = true;
      this.GetMainMenu();
      // this.GetSubMenu();
    }
  }

  getmenulandingpagewise() {
    if (this.role.roleId == null || this.role.roleId == '') {
      this.roleIdEmpty = true;

    }
    else if (this.roleMenuType == null || this.roleMenuType == '') {
      this.menuTypeEmpty = true;
    }
    else if (this.isRoleSubMenu == true && this.roleSubMenu == null) {
      this.mainmenulistempty = true;
    }
    else if (this.roleMenuType == "Main Menu") {
      let dataMain = {
        pageNo: this.pageNumber,
        itemsPerPage: 100,
        searchBy: "",
        searchType: "",
        totalRecords: "NA",
        param1: 0,//"mainmenuid",
        param2: this.role.roleId, // "roleid_ui",
        param3: 0,   //"ownersid_ui",
        pageID: "1",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }
      this.menuAssignmentService.getmenulandingpagewise(dataMain).subscribe((response) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        if (response.statuscode == 200) {
          this.isRoleMainMenu = true;
          this.menuListforPage = response.entity.list;
        }
        else {
          $("#errorModal").modal('show');

        }
      })

    }
    else if (this.roleMenuType == "Sub Menu") {
      let dataSubMenu = {
        pageNo: this.pageNumber,
        itemsPerPage: 100,
        searchBy: "",
        searchType: "",
        totalRecords: "NA",
        param1: this.roleSubMenu,//"mainmenuid",
        param2: this.role.roleId,//"roleid_ui",
        param3: 0,  // "ownersid_ui",
        pageID: "1",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }

      this.menuAssignmentService.getmenulandingpagewise(dataSubMenu).subscribe((response) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        if (response.statuscode == 200) {
          this.isRoleMainMenu = true;
          this.menuListforPage = response.entity.list;

        }
        else {
        }
      })
    }

  }

  radioButton(data) {
    this.menuidlp = data.param1;
    this.isInvalid = true;
  }

  assignmenulandingpagewise() {
    let datalp = {
      param1: this.menuidlp,
      param2: this.role.roleId,
      param3: 0,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.menuAssignmentService.assignmenulandingpagewise(datalp).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      if (response.statuscode == 200) {
        this.errorMessage = response.entity;
        $("#updateSuccessModal").modal('show');
      }
      else {
        this.errorMessage = response.entity;
        $("#ErrorModal").modal('show');
      }
    })
  }
}