import { ListService } from './../../../../../list.service';
import { MenuAssignmentService } from './../../services/menu-assignment.service';
import { PostService } from './../../../../../post.service';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuEntry, Role } from './../../models/menu-management';

import { Component, OnInit } from '@angular/core';
declare var $: any;

declare var AddLoader: any;
declare var RemoveLoader: any;


@Component({
  selector: 'app-menu-entry',
  templateUrl: './menu-entry.component.html',
  styleUrls: ['./menu-entry.component.css']
})
export class MenuEntryComponent implements OnInit {
  products = []; product = {}; menuType: string; subMenu: string;
  role = new Role();
  menuentry = new MenuEntry();
  isSubMenu: boolean = false; isMainMenu: boolean = false; isDisabled: boolean = true;
  isEditEntryValid: boolean = false; isSaveEntryValid: boolean = true;
  encryptedpageNameValue: string; encryptedpageUrlValue: string;
  mainMenuList = [];
  pageNumber: number = 1;
  mainMenuListTable = []; subMenuList = [];
  selectRowsTextForMainMenu: any = 10;
  selectRowsTextForSubMenu: any = 10;
  filter: string = '';
  // searchByTextMainMenu: string = '';
  // searchByTextSubMenu: any = '';
  mainMenuCount: number = 0; mainMenuViewcount: number = 0;
  subMenuCount: number = 0; subMenuViewcount: number = 0;

  // menuName: string; menuUrl: string; menuDescription: string;

  pageUrl = this.router.url;
  errorMessage: any;
  MenuName: any;
  menuId: any;

  urlPattern = "^[a-z]\n$";
  constructor(private postService: PostService, private modalService: NgbModal, private cryptService: CryptService, private router: Router, private menuAssignmentService: MenuAssignmentService, private listService: ListService) {

    this.menuentry.menuicon = '';
  }

  ngOnInit() {
    this.EncryptPageName();
    this.EncryptPageUrl();
  }

  // encryption of pagename and page url starts
  // date : 5 -oct -2020
  EncryptPageName() {
    this.cryptService.encrypt("Menu Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;

  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }

  MainMenuList() {
    let dataL = {
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.MainMenuList(dataL).subscribe((response) => {
      this.mainMenuList = response.entity.list
    })
  }

  // date : 5 -oct -2020
  // encryption of pagename and page url ends

  openModal(targetModal, value) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    this.menuentry.menuId = value
  }

  MenuEntry() {
    if (this.menuType == "Main Menu") {
      this.isSubMenu = false;
      this.GetMainMenu();

    }
    else if (this.menuType == "Sub Menu") {
      this.isSubMenu = true;
      this.MainMenuList();
      this.isMainMenu = false;
    }
    this.menuentry.menuName = '';
    this.menuentry.menuId = '';
    this.menuentry.menuUrl = '';
    this.menuentry.menuDescription = '';
    this.menuentry.menuicon = '';

  }
  urlValidator() {
    const urlreg = /^[/][a-z]{0,200}$/;

    if (this.menuentry.menuUrl.match(urlreg)) {
      return true
    }
    else {
      this.menuentry.menuUrl = this.menuentry.menuUrl.substring(0, this.menuentry.menuUrl.length - 1);

      return false
    }
  }

  GetMainMenu() {
    this.isMainMenu = true
    let dataL = {
      // pageNo: this.pageNumber,
      // itemsPerPage: this.selectRowsTextForMainMenu,
      // searchBy: this.filter,
      // searchType: "",
      // totalRecords: "NA",
      // pageID: "1",
      // pageName: this.encryptedpageNameValue,
      // pageURL: this.encryptedpageUrlValue
      param1:"",
      param2:"",
      param3:"",
      searchBy:"",
      searchbyType:"",
      pageNo:"NA",
      itemsPerPage:"NA",
      totalRecords:""
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.menuAssignmentService.GetMainMenu(dataL).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      if (data.statuscode == 200) {
        this.mainMenuListTable = <any[]>(data.entity.responsedatalist);
        this.mainMenuCount = data.entity.count;
        this.mainMenuViewcount = data.entity.viewCount;
      }
    })
  }

  changeCountMainMenu() {
    this.pageNumber = 1;
    this.GetMainMenu();
  }

  searchMainMenu() {
    this.pageNumber = 1;
    this.GetMainMenu();
  }

  getMainMenuIfSubMenu() {
    this.selectRowsTextForMainMenu = 20;
    this.isMainMenu = true
    let dataL = {
      pageNo: "1",
      itemsPerPage: this.selectRowsTextForMainMenu,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.menuAssignmentService.GetMainMenu(dataL).subscribe((data) => {
      if (data.statuscode == 200) {
        this.mainMenuListTable = <any[]>(data.entity.list);
        this.mainMenuCount = data.entity.count;
        this.mainMenuViewcount = data.entity.viewCount;
      }
    })
  }

  GetSubMenu() {
    this.menuentry.menuName = '';
    this.menuentry.menuId = '';
    this.menuentry.menuUrl = '';
    this.menuentry.menuDescription = '';
    this.menuentry.menuicon = '';
    if (this.menuType == null) {
    }
    else if (this.menuType == "Sub Menu" && this.subMenu == null) {
    }
    else {
      this.isMainMenu = true;
      let dataL = {
        // pageNo: this.pageNumber,
        // itemsPerPage: this.selectRowsTextForSubMenu,
        // searchBy: "",
        // searchType: "",
        // totalRecords: "NA",
        // param1: this.subMenu,
        // param2: "0",
        // param3: "0",
        // pageID: "",
        // pageName: this.encryptedpageNameValue,
        // pageURL: this.encryptedpageUrlValue
        param1:this.subMenu,
        param2:"",
        param3:"",
        pageNo:"NA",
        itemsPerPage:"NA",
        searchBy:" ",
        searchType:" ",
        totalRecords:"",
        pageID: "",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }
      this.menuAssignmentService.GetSubMenu(dataL).subscribe((response) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        if (response.statuscode == 200) {
          this.subMenuList = <any[]>(response.entity.responsedatalist);
          this.subMenuList = response.entity.responsedatalist;
          this.subMenuCount = response.entity.count;
          this.subMenuViewcount = response.entity.viewCount;
        }
      })
    }
  }

  changeCountSubMenu() {
    this.pageNumber = 1;
    this.GetSubMenu();
  }
  SearchSubMenu() {
    this.pageNumber = 1;
    this.GetSubMenu();
  }

  InsertMainMenu() {
    let dataL = {
      // param1: "",
      // param2: this.menuentry.menuName,
      // param3: this.menuentry.menuDescription,
      // param4: this.menuentry.menuUrl,
      // param5: "0",
      // param6: this.menuentry.menuicon,
      // pageID: "1",
      // pageName: this.encryptedpageNameValue,
      // pageURL: this.encryptedpageUrlValue
      menuid: "0",
      menuname: this.menuentry.menuName,
      menudescription:  this.menuentry.menuDescription,
      menuurl:  this.menuentry.menuUrl,
      menuicon: this.menuentry.menuicon,
      roleid: "0"
    }
    this.menuAssignmentService.InsertMainMenu(dataL).subscribe((data) => {
      if (data.statuscode == 200) {
        this.errorMessage = data.entity
        this.GetMainMenu();
        $("#menuSuccessModal").modal('show');
      }
      else {
        this.errorMessage = data.entity
        this.GetMainMenu();
        $("#menuErrorModal").modal('show');
      }
      this.menuentry.menuicon = ''
    })
  }

  UpdateMenu() {
    let dataL = {
      // param1: this.menuentry.menuId,
      // param2: this.menuentry.menuName,
      // param3: this.menuentry.menuDescription,
      // param4: this.menuentry.menuUrl,
      // param5: this.menuentry.menuicon,
      // pageID: "",
      // pageName: this.encryptedpageNameValue,
      // pageURL: this.encryptedpageUrlValue
      menuid: this.menuentry.menuId,
      menuname: this.menuentry.menuName,
      menudescription: this.menuentry.menuDescription,
      menuurl: this.menuentry.menuUrl,
      menuicon: this.menuentry.menuicon,
      roleid:"",
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.menuAssignmentService.UpdateMenu(dataL).subscribe((data) => {
      if (data.statuscode == 200) {
        this.errorMessage = data.entity;
        // this.GetMainMenu();
        this.isSaveEntryValid = true;
        this.isEditEntryValid = false;

        $("#menuSuccessModal").modal('show');

      }
      else {
        this.errorMessage = data.entity
        // this.GetMainMenu();
        $("#menuErrorModal").modal('show');
      }
    })
    this.menuentry.menuicon = ''

  }
  getData(data) {
    this.MenuName = data.param2;
    this.menuId = data.param1;
  }

  DeleteMenu(menuId) {

    let dataL = {
      param1: menuId,
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.menuAssignmentService.DeleteMenu(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.errorMessage = response.entity
        if (this.menuType == "Main Menu") {
          this.GetMainMenu();
        }
        else if (this.menuType == "Sub Menu") {
          this.GetSubMenu();
        }
        $("#menuDeleteSuccessModal").modal('show');

      }
      else {
        this.errorMessage = response.entity
        $("#menuErrorModal").modal('show');
      }
    })
  }

  InsertSubMenu() {
    let dataL = {
      // param1: this.subMenu,
      // param2: this.menuentry.menuName,
      // param3: this.menuentry.menuDescription,
      // param4: this.menuentry.menuUrl,
      // param5: this.menuentry.menuicon,
      // pageID: "",
      // pageName: this.encryptedpageNameValue,
      // pageURL: this.encryptedpageUrlValue

      mainmenuid: this.subMenu,
      submenuname: this.menuentry.menuName,
      submenudescription: this.menuentry.menuDescription,
      submenuurl: this.menuentry.menuUrl,
      menuicon: this.menuentry.menuicon
    }
    this.menuAssignmentService.InsertSubMenu(dataL).subscribe((response) => {
      if (response.status == true && response.statuscode == 200) {
        this.errorMessage = response.entity
        this.GetSubMenu();
        this.ngOnInit();
        $("#menuSuccessModal").modal('show');

      }
      else {
        this.errorMessage = response.entity
        $("#menuErrorModal").modal('show');
      }
      this.menuentry.menuicon = ''
    })

  }

  EditEntry(data) {
    document.getElementById('menuName').focus()
    this.isEditEntryValid = true;
    this.isSaveEntryValid = false;
    this.menuentry.menuId = data.param1;
    this.menuentry.menuName = data.param2;
    this.menuentry.menuDescription = data.param3;
    this.menuentry.menuUrl = data.param4;
    if (data.param9 == null) {
      this.menuentry.menuicon = ''
    } else {
      this.menuentry.menuicon = data.param9;

    }

  }


  MainMenuPageChange(event) {
    this.pageNumber = event;
    this.GetMainMenu();

  }

  SubMenuPageChange(event) {
    this.pageNumber = event;
    this.selectRowsTextForSubMenu;
    this.GetSubMenu()

  }
  refresh() {
    if (this.menuType == "Main Menu") {
      this.GetMainMenu()
    }
    else {
      this.GetSubMenu()
    }
  }

}
