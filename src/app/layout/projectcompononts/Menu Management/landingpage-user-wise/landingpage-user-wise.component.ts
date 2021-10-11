import { CryptService } from './../../services/crypt.service';
import { Router } from '@angular/router';
import { MenuAssignmentService } from './../../services/menu-assignment.service';
import { ListService } from './../../../../../list.service';
import { Role } from './../../models/menu-management';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-landingpage-user-wise',
  templateUrl: './landingpage-user-wise.component.html',
  styleUrls: ['./landingpage-user-wise.component.css']
})
export class LandingpageUserWiseComponent implements OnInit {
  products = [];
  product = {}
  menuType: string;
  subMenu: string;

  roleLists = [];
  roleWiseUserList = [];
  role = new Role();
  userRoleList = [];  subMenuList = [];
  menuListForPage = [];

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
  errorMessage: any;
  menuidlp: string;
  isInvalid: boolean = false;

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

  // date :25-12-2020
  // encryption of pagename and page url starts
  EncryptPageName() {
    this.cryptService.encrypt("Landing Page User Wise")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl);
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }

  // date :15-12-2020
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

      this, this.roleLists = response.entity.list;

      
      
    })
  }

  selectUserRole() {
    if (this.role.roleId != null) {
      this.isUserCompany = true;
       this.roleIdEmpty = false;
      this.RoleWiseUserList()
    }
  }

  selectMenuType() {
    this.isUserMenuType = true;
  }

  selectUserMenu() {
    if (this.userMenuType == null) {
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
        pageNo: "1",
        itemsPerPage: this.selectRowsText,
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
      this.menuAssignmentService.GetMenuRoleWise(dataL).subscribe((response) => {
        this.menuRoleWiseCount = response.entity.count;

        this.isUserMainMenu = true;
        this.userRoleList = <any[]>(response.entity.list)
      })
    }
    else if (this.userMenuType == "Sub Menu") {
      let dataL = {
        pageNo: "1",
        itemsPerPage: this.selectRowsText,
        searchBy: "",
        searchType: "",
        totalRecords: "NA",
        param1: this.userMenu,
        param2: this.ownersid,
        param3: this.role.roleId,
        param4: "",
        pageID: "2",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      this.menuAssignmentService.GetMenuRoleWise(dataL).subscribe((response) => {
        this.menuRoleWiseCount = response.entity.count;

        this.isUserMainMenu = true;
        this.userRoleList = <any[]>(response.entity.list)
      })
    }




  }

  RoleWiseUserList() {
    let dataL = {
      param1: this.role.roleId,
      param2: "",
      pageID: " ",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try{AddLoader()} catch(e){alert(e)}
    this.listService.RoleWiseUserList(dataL).subscribe((response) => {
      try{RemoveLoader()} catch(e){alert(e)}

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
    this.menuAssignmentService.GetMainMenu(dataL).subscribe((data) => {

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
          param1: (document.getElementById("menuid" + this.userRoleList[i].rowNumber) as HTMLInputElement),
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
    this.menuAssignmentService.AssignMenuUserWise(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.errorMessage = response.entity
        $("#updateSuccessModal").modal('show');
      }
      else {
        this.errorMessage = response.entity
        $("#ErrorModal").modal('show');

      }

    })
  }


  getmenuloadingpagewise() {
    if (this.role.roleId == null || this.role.roleId == '') {
      this.roleIdEmpty = true
    }
    else if (this.ownersid == null || this.ownersid == '') {
      this.ownerIdEmpty = true;
    }
    else if (this.userMenuType == null || this.userMenuType == '') {
      this.menuTypeEmpty = true;
    }
    else {
      let reqlp = {
        pageNo: this.pageNumber,
        itemsPerPage: 100,
        searchBy: "",
        searchType: "",
        totalRecords: "NA",
        param1: this.userMenu,      //mainmenuId
        param2: this.role.roleId,      //roleid
        param3: this.ownersid,      //ownersid
        pageID: "1",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      this.menuAssignmentService.getmenulandingpagewise(reqlp).subscribe((response) => {
        if (response.statuscode == 200) {
          this.isUserMainMenu = true;
          this.menuListForPage = response.entity.list;

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
      param3: this.ownersid,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try{AddLoader()}   catch(e){alert(e)}
    this.menuAssignmentService.assignmenulandingpagewise(datalp).subscribe((response) => {
      try{RemoveLoader()}   catch(e){alert(e)}

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
