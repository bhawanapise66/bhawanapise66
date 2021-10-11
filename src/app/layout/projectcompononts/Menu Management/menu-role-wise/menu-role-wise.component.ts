import { ListService } from './../../../../../list.service';
import { PostService } from './../../../../../post.service';
import { Router } from '@angular/router';

import { CryptService } from './../../services/crypt.service';
import { Role } from './../../models/menu-management';

import { MenuAssignmentService } from './../../services/menu-assignment.service';
import { Component, OnInit } from '@angular/core';
declare var $: any;

declare var jQuery: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-menu-role-wise',
  templateUrl: './menu-role-wise.component.html',
  styleUrls: ['./menu-role-wise.component.css']
})
export class MenuRoleWiseComponent implements OnInit {
  menuRoleList = []; product = {}; menuType: string; subMenu: string;
  errorMessage: string;
  role = new Role();
  products = [];

  roleLists = [];
  subMenuList = [];

  isRoleCompany: boolean = false; RoleCompany: string; roleMenuType: string;
  roleSubMenu: string; isRoleMenuType: boolean = false;

  isSubMenu: boolean = false;
  isMainMenu: boolean = true;
  isRoleMainMenu: boolean = false;
  isRoleSubMenu: boolean = false;
  roleIdEmpty: boolean = false; menuTypeEmpty: boolean = false;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  pageUrl = this.router.url

  isDisabled: boolean = true;
  num: any;
  pageNumber: number = 1;
  itemsPerPage: number = 10;

  sequence = [];
  isduplicatevalue: boolean = false;
  isSuccessfullCall = false;
  totalRecords: any;
  DuplicateErrorText: any;
  validStatus: string = "invalid";

  constructor(private menuAssignmentService: MenuAssignmentService, private postService: PostService, private listService: ListService, private cryptService: CryptService, private router: Router) {

  }

  ngOnInit() {
    this.EncryptPageName();
    this.EncryptPageUrl();

    let dataL = {
      param1: "",
      param2: "",
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.RoleList(dataL).subscribe((response) => {
      this.roleLists = <any[]>(response.entity)
    })
  }

  // date : 5 -oct -2020
  // encryption of pagename and page url starts
  EncryptPageName() {
    this.cryptService.encrypt("Menu Role Wise")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl);
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput;
  }

  // date : 5 -oct -2020
  // encryption of pagename and page url ends


  selectRoleType() {
    this.isRoleCompany = true
  }

  SelectRoleSubmenu() {
    if (this.roleMenuType == "Main Menu") {
      this.isRoleSubMenu = false;
    }
    else {
      this.isRoleSubMenu = true;
      this.GetMainMenu();
    }
  }

  triggerSomeEvent(id, id2) {
    $("#check" + id2).prop('isDisabled', false);

    if ($("#check" + id2).is(':checked')) {
      // alert("check");

      $("#text" + id2).prop('disabled', false);
    } else {
      // alert("not check")
      $("#text" + id2).prop('disabled', true);
    }

  }


  checkDuplicate(id) {
    let ordernumber = $('#text' + id).val();    // this.sequence.push(ordernumber);
    // console.log("length:" + " " + this.sequence.length)
    if (this.sequence.length == 0) {
      // console.log(ordernumber)
      this.sequence.push(ordernumber)
    }
    else {
      let AcceptUnique = this.sequence.findIndex(x => x == ordernumber);
      if (AcceptUnique == -1) {
        this.isduplicatevalue = false;
        this.sequence.push(ordernumber);
        //  console.log(this.sequence)
      }
      else {
        this.isduplicatevalue = true;
        // console.log(this.sequence)
      }
      // console.log(this.sequence)



    }

    // console.log(this.isduplicatevalue)
  }


  checkPosition(data) {
    let numberInInoutFIeld = $("#text" + data).val();
    this.num = numberInInoutFIeld;
  }

  IsCheck(data) {
    let $scope: any;

    $scope.checkrepeate = function checkrepeate(data) {
      if ((document.getElementById("selectcheck" + data.param1) as HTMLInputElement).checked == false) {
        alert("Please select checkbox");
      } else {
        data.param7 = "true";
        var newvalue = (document.getElementById("selectorder" + data.param1) as HTMLInputElement).value;
        var oldvalue = data.param6;
        if (newvalue == "" || newvalue == null) {
          alert("Order number should not blank");
          ((document.getElementById("selectorder" + data.param1) as HTMLInputElement).value) = oldvalue
          // (document.getElementById("selectorder"+data.param1) as HTMLElement).value =oldvalue;
          return;
        }
        var checkin = $scope.roleListOR.includes(oldvalue);

        if (checkin) {
          var checkin1 = $scope.roleListOR.includes((document.getElementById("selectorder" + data.param1) as HTMLInputElement).value);
          if (checkin1) {
            if ((document.getElementById("selectorder" + data.param1) as HTMLInputElement).value != data.menuorder) {
              alert("Order number should not same");
              (document.getElementById("selectorder" + data.param1) as HTMLInputElement).value = oldvalue;
              return;
            }
          } else {
            $scope.roleListOR.splice($scope.roleListOR.indexOf(oldvalue), 1);
            $scope.max = Math.max.apply(Math, $scope.roleListOR);
            $scope.roleListOR.push(newvalue);
          }
        }
        else {
          $scope.roleListOR.push(newvalue);
        }
      }
      (document.getElementById("butt") as HTMLInputElement).disabled = false;
    }
  }

  GetMenuRoleWise() {
    if (this.role.roleId == null || this.role.roleId == '') {
      this.roleIdEmpty = true;
    } else if (this.roleMenuType == null || this.roleMenuType == '') {
      this.menuTypeEmpty = true;
    }
    if (this.roleMenuType == "Main Menu") {
      let dataL = {
        pageNo: this.pageNumber,
        itemsPerPage: "50",
        searchBy: "",
        searchType: "",
        totalRecords: "NA",
        param1: "0",
        param2: this.role.roleId,
        param3: "0",
        param4: "",
        pageID: "2",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }
      this.sequence = [];
      this.menuAssignmentService.GetMenuRoleWise(dataL).subscribe((response) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.isRoleMainMenu = true;
        this.menuRoleList = <any[]>(response.entity.list);
        this.totalRecords = response.entity.count;
        for (let i = 0; i < this.totalRecords; i++) {
          if (this.menuRoleList[i]["param8"] != null) {
            this.sequence.push(this.menuRoleList[i]["param8"]);
          }
        }
        // console.log(this.sequence)
      })
    }
    else if (this.roleMenuType == "Sub Menu") {
      let dataL = {
        pageNo: this.pageNumber,
        itemsPerPage: "50",
        searchBy: "",
        searchType: "",
        totalRecords: "NA",
        param1: this.roleSubMenu,
        param2: this.role.roleId,
        param3: "0",
        param4: "",
        pageID: "1",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      this.sequence = [];
      try { AddLoader() } catch (e) { alert(e) }

      this.menuAssignmentService.GetMenuRoleWise(dataL).subscribe((response) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.isRoleMainMenu = true;
        this.menuRoleList = <any[]>(response.entity.list)
        let totalRecords = response.entity.count;
        for (let i = 0; i < totalRecords; i++) {
          if (this.menuRoleList[i]["param8"] != null) {
            this.sequence.push(this.menuRoleList[i]["param8"]);
          }
        }
      })
    }
  }



  AssignMenuRoleWise() {
    let roleListFinal = [];
    for (var i = 0; i < this.menuRoleList.length; i++) {
      var checkbox = (document.getElementById("check" + this.menuRoleList[i].rowNumber) as HTMLInputElement).checked;
      var newvalue = (document.getElementById("text" + this.menuRoleList[i].rowNumber) as HTMLInputElement).innerHTML;
      if (checkbox == true && newvalue == null) {
        alert("Order number should not blank");
        return;
      }

      roleListFinal.push({
        param1: (document.getElementById("menuid" + this.menuRoleList[i].rowNumber) as HTMLInputElement).innerHTML,
        param2: this.role.roleId,
        param3: (document.getElementById("check" + this.menuRoleList[i].rowNumber) as HTMLInputElement).checked,	//status, srno = param1
        param4: (document.getElementById("text" + this.menuRoleList[i].rowNumber) as HTMLInputElement).value,	//orderno
        param5: "0",
      });
    }

    let getdatafromfinal = [];
    for (let i = 0; i < roleListFinal.length; i++) {
      if (roleListFinal[i].param4 != "") {
        getdatafromfinal.push(roleListFinal[i].param4);
      }
      else { }
    }
    // methods for checking dupliate values

    let counts = {}

    for (let i = 0; i < getdatafromfinal.length; i++) {
      if (counts[getdatafromfinal[i]]) {
        counts[getdatafromfinal[i]] += 1;
      } else {
        counts[getdatafromfinal[i]] = 1;
      }
    }
    for (let prop in counts) {
      if (counts[prop] >= 2) {
        document.getElementById("duplicatevalueMessage").innerHTML = "duplicate values found";
        setTimeout(function () { document.getElementById("duplicatevalueMessage").innerHTML = ""; }, 3000);
        // console.log(prop + " counted: " + counts[prop] + " times.");
        this.validStatus = "invalid";
      }
      else {
        this.validStatus = "valid";
      }
    }


    // console.log(counts)


    // methods for checking duplicate values
    // console.log(getdatafromfinal)
    // console.log("status is " + this.validStatus)

    if (this.validStatus == "invalid") {

    }
    else if (this.validStatus == "valid") {


      let dataL = {
        list: roleListFinal,
        pageID: "1",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }
      this.menuAssignmentService.AssignMenuRoleWise(dataL).subscribe((response) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.isSuccessfullCall = true;

        // console.log(roleListFinal['param1'])
        if (response.statuscode == 200) {
          this.isSuccessfullCall = false;
          this.errorMessage = response.entity;
          $("#updateSuccessModal").modal('show');
          this.sequence = null;
          this.GetMenuRoleWise();
        }
        else {
          this.isSuccessfullCall = false;
          this.errorMessage = response.entity;
          $("#ErrorModal").modal('show');
          this.GetMenuRoleWise()
        }
      })
    }
  }




  GetAllAssignedMenu() {
    let dataL = {
      pageNo: this.pageNumber,                 // pageNo:"page number",
      itemsPerPage: this.itemsPerPage,       // itemsPerPage:"item per page",
      searchBy: "",                          // searchBy:"searchby text",
      searchType: "",                       // searchType:"searchby type",
      totalRecords: "NA",                   // totalRecords:"totalRecords reecived from first api call",
      param1: this.role.roleId,            // param1:"roleid",
      param2: "0",                            // param2:"ownerrsid",
      pageID: "1",                             // pageID:"id",
      pageName: this.encryptedpageNameValue,// pageName:"page name (encrypted)",
      pageURL: this.encryptedpageUrlValue// pageURL:"page url (encrypted)"
    }
    this.menuAssignmentService.GetAllAssignedMenu(dataL).subscribe((response) => {
    })
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
    try { AddLoader() } catch (err) { }
    this.menuAssignmentService.GetMainMenu(dataL).subscribe((data) => {
      try { RemoveLoader() } catch (err) { }

      this.products = <any[]>(data.entity.list);
    })
  }

}

