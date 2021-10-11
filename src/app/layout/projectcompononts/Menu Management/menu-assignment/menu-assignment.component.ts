import { Component, OnInit } from '@angular/core';
declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-menu-assignment',
  templateUrl: './menu-assignment.component.html',
  styleUrls: ['./menu-assignment.component.css']
})
export class MenuAssignmentComponent implements OnInit {
  assignmentOption: string;
  isLandingPageVisible: boolean = false; isMenuPageVisible: boolean = false;
  RoleforMenu; Roleforlandingpage
  isMenuRoleWise: boolean = false; isMenuUserWise: boolean=false;;
  isPageRoleWise: boolean = false; isPageUserWise: boolean = false;
  menuSelected: boolean = false;
  landingPageSelected: boolean = false;

  ngOnInit() {

  }

  getAssignment() {
    if (this.assignmentOption == "Landing Page") {
      this.menuSelected = false;
      this.landingPageSelected = true;
      this.isMenuRoleWise = false;
      this.isMenuUserWise = false;
      this.isPageRoleWise = false;
      this.isPageUserWise = false;
      this.Roleforlandingpage = null
    }
    else if (this.assignmentOption == "Menu") {
      this.landingPageSelected = false;
      this.menuSelected = true;
      this.isMenuRoleWise = false;
      this.isMenuUserWise = false;
      this.isPageRoleWise = false;
      this.isPageUserWise = false
      this.RoleforMenu = null
    }
  }


  selectForMenuAssignment() {
    if (this.RoleforMenu == "Role") {
      this.isMenuRoleWise = true;
      this.isMenuUserWise = false;
      this.isPageRoleWise = false;
      this.isPageUserWise = false;
    }
    else if (this.RoleforMenu == "User") {
      this.isMenuUserWise = true;
      this.isMenuRoleWise = false;
      this.isPageRoleWise = false;
      this.isPageUserWise = false;
    }
  }

  selectForLandingPage() {''
    if (this.Roleforlandingpage == "Role") {
      this.isPageRoleWise = true;
      this.isPageUserWise = false;
      this.isMenuRoleWise = false;
      this.isMenuUserWise = false;
    }
    else if (this.Roleforlandingpage == "User") {
      this.isPageRoleWise = false;
      this.isPageUserWise = true;
      this.isMenuRoleWise = false;
      this.isMenuUserWise = false;
    }
  }



}




