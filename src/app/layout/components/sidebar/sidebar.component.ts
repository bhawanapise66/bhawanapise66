import { AppComponent } from './../../../app.component';
import { LoginComponent, Menus } from './../../../login/login.component';
import { URLConst } from './../../../APIService/urlconst';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MenuAssignmentService } from './../../projectcompononts/services/menu-assignment.service';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CryptService } from '../../projectcompononts/services/crypt.service';
declare var jQuery: any;
declare var $: any;


import * as $ from 'jquery'


import * as moment from 'moment';

import * as xlsx from 'xlsx';

//import * as $ from 'jquery';
declare var jQuery: any;
const URL = new URLConst().URLDemo;
// const menus = new LoginComponent().URLDemo;
const mainMenu = new Menus().AllMenus;
const AllMenus = new Menus().AllMenus;



const httpOptions = {
  headers: new HttpHeaders({
    // 'Headerkey': 'Oyt2kdvLa9jb4JTfWH7R38X0ASM6iq6LHVH9M9oukNuPAMxGvSKUCJcZw/b5n6td/GFozePqPeY3MflibnQuWi5b0qKPFje5hZlZZj1JBAGwJPfhWtCw1ble9npVvWUyykz3hudBi15HJPAMsYlkCoAvmlGI4SRY6o75WKQ4ej839pp3SbXoKH5YCa8lDJPnkiFy',
    'Headerkey': sessionStorage.getItem('hk'),
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'https://track.indtrack.com/vtsindtrackapitest/',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  })
};

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  showMenu: string;
  submenuorder;
  allAssignedMenus = [];
  allMainMenus = [];
  encryptedpageNameValue: string; encryptedpageUrlValue: string
  pageUrl = this.router.url;

  @Output() collapsedEvent = new EventEmitter<boolean>();
  customerDashboard: any;
  dashboardurl: any;
 
  constructor(private http: HttpClient, private translate: TranslateService, public router: Router, private cryptService: CryptService, private menuService: MenuAssignmentService) {
    // this.final_allassignmenu();
    // this.final_mainmenu();
    this.allMainMenus = JSON.parse(sessionStorage.getItem('mm'));
    this.allAssignedMenus = JSON.parse(sessionStorage.getItem('am'));


    // this.allMainMenus = sessionStorage.getItem('mm')
    this.router.events.subscribe(val => {
      this.EncryptPageName();
      this.EncryptPageUrl();
    });


  }

  ngOnInit() {

    this.allMainMenus = JSON.parse(sessionStorage.getItem('mm'));
    this.allAssignedMenus = JSON.parse(sessionStorage.getItem('am'));

    
    this.customerDashboard = this.allMainMenus[0]
    this.dashboardurl = this.customerDashboard.param4
    // this.final_allassignmenu(); this.final_mainmenu();

    $(function () {
      $(".sidebar").hover(function () {

        // alert("in "+$(".sidebar").css('width'))
        if ($(".sidebar").css('width') == '270px') {
          $("#minilogo").show();
          $("#mainlogo").hide();
        } else {
          $("#mainlogo").show();
          $("#minilogo").hide();
        }
      });

    });
    $('body').addClass('sidebar-icon');

  }

  EncryptPageName() {
    this.cryptService.encrypt("Final Menu")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;

  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }

  eventCalled() {
  }

  addExpandClass(element: any) {
    // alert(element+"   =   "+this.showMenu)
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }


  toggleCollapsed() {
  }

  //  developer dhammadeep dahiwale;
  // date : 11-1-2020;
  getRoute() {
    this.router.navigate([sessionStorage.getItem('lp')])
  }


}
