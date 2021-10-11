import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { URLConst } from 'src/app/APIService/urlconst';
import { LoginService } from 'src/app/layout/projectcompononts/services/login.service';
import { routerTransition } from 'src/app/router.animations';
import { ListService } from 'src/list.service';
import { CryptService } from '../../../app/layout/projectcompononts/services/crypt.service';
import * as CryptoJS from 'crypto-js'

@Component({
  selector: 'app-weblogin',
  templateUrl: './weblogin.component.html',
  styleUrls: ['./weblogin.component.css'],
  animations: [routerTransition()]

})

export class WebloginComponent implements OnInit {

  constructor( private router: Router,  private loginService: LoginService,private listService: ListService, private cryptService:CryptService,private activatedRoute: ActivatedRoute) { }

  headerKey:any;
  loginName:any;
  roleId:any;
  landingPageUrl:any;
  urlConst = new URLConst();
  encryptedpageNameValue:any;
  encryptedpageUrlValue:any;
  customerList:any;
  allMainMenus:any;
  
  mainMenus = []; AllMenus = [];

  allAssignedMenus:any;
  pageUrl = this.router.url;

  ngOnInit() {


    let data=this.activatedRoute.snapshot.params.data;
    data=this.replaceAll(data,"nmk","/");
    data=this.replaceAll(data,"equal","==");

    var  logindata=this.decryptData(data);
    var logindatasplited = logindata.split("#"); 

    console.log(logindata)
    let headerkey=this.activatedRoute.snapshot.params.hk;
    headerkey=this.replaceAll(headerkey,"nmk","/")
    //var loginsplited = data.split(" ", 3); 

      this.Login(logindatasplited,headerkey)

  }


   replaceAll(string, search, replace) {
    return string.split(search).join(replace);
  }
  
 // weln#ln#rid#loginid#ownersid#key#browserid#landingPageUrl

 
  Login(data,hk){
    this.headerKey =hk;
    let welcomeName = data[0];
    this.loginName = data[1];
    let loginroleid = data[2];
    this.roleId = data[2];
    let loginId = data[3];
    let ownersid =data[4];
    let key = hk;
    this.landingPageUrl =data[6];

    this.final_mainmenu();
    let browserid = data[5];
    sessionStorage.setItem('hk', this.headerKey);
    this.loginService.loginData = {
      "roleId":data[2],
      "ownersId":data[4]
  }

    this.urlConst.headerKey = sessionStorage.getItem('hk');
    sessionStorage.setItem('ln', this.loginName);
    sessionStorage.setItem('weln', welcomeName);
    sessionStorage.setItem('rid', loginroleid);
    this.onLoggedin();
    this.getCustomerList();  }


  onLoggedin() {
    sessionStorage.setItem('isLoggedin', 'true');

}

getCustomerList() {
  let roleId = sessionStorage.getItem('rid');
  if (roleId == '10') {
      let customerReq = {
          pageID: "1",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
      }
      this.listService.CustomerListAPI(customerReq).subscribe((response) => {
          if (response.statuscode == 200) {
              this.customerList = response.entity.list;
              sessionStorage.setItem('cl', JSON.stringify(this.customerList))
          }
      });
  }
  else {

  }

}

final_allassignmenu() {
  let reqParam = {
      pageNo: "1",
      itemsPerPage: 100,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      param1: "",
      param2: "",
      pageID: "1",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
  }
  this.loginService.final_allassignmenu(reqParam, this.headerKey).subscribe((response) => {
      if (response.statuscode == 200) {
          this.allAssignedMenus = response.entity.list;

          let AllMenus = JSON.stringify(this.allAssignedMenus)
          this.AllMenus = response.entity.list;
          sessionStorage.setItem('am', JSON.stringify(this.allAssignedMenus));
          if (this.landingPageUrl=="null") {
              this.RoutingAfterLogin();
              // console.log(' url is null')
             
              
              this.router.navigate(['/admindash']);
          }
          else {

              // console.log(' url is not null')
              //this.landingPageUrl
              this.router.navigate([this.landingPageUrl]);
          }
          

      }
  })
}

  final_mainmenu() {
    let dataL = {
        pageNo: "1",
        itemsPerPage: "100",
        searchBy: "",
        searchType: "",
        totalRecords: "NA",
        param1: "",
        param2: "",
        pageID: "1",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
    }
    // this.http.post(URL + 'final_mainmenu',dataL,HttpHeaders)
    this.loginService.final_mainmenu(dataL, this.headerKey).subscribe((response) => {
        if (response.statuscode == 200) {
            this.allMainMenus = response.entity.list;
            this.mainMenus = response.entity.list;
            let MainMenus = JSON.stringify(this.allAssignedMenus)
            // console.log(MainMenus)
            sessionStorage.setItem('mm', JSON.stringify(this.allMainMenus));
            this.final_allassignmenu();

        }
    })
}

RoutingAfterLogin() {
    if (this.roleId == 10 || this.roleId == 11) {
        sessionStorage.setItem('lp', '/admindash')
        this.router.navigate([sessionStorage.getItem('lp')])
    }
    else if (this.roleId == 14 || this.roleId == 18) {
        sessionStorage.setItem('lp', '/customerdashboard')
        this.router.navigate([sessionStorage.getItem('lp')])
    }
    else if (this.roleId == 24) {
        sessionStorage.setItem('lp', '/Railwaydashboard')
        this.router.navigate([sessionStorage.getItem('lp')])
    }
    else {
        sessionStorage.setItem('lp', '/customerdashboard')
        this.router.navigate([sessionStorage.getItem('lp')])
    }
}


EncryptPageName() {
  this.cryptService.encrypt("login")
  this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
}

EncryptPageUrl() {
  this.cryptService.encrypt(this.pageUrl);
  this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
}

encryptSecretKey:any="indtrackweb";



encryptData(data) {

  try {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
  } catch (e) {
    console.log(e);
  }
}


decryptData(data) {

  try {
    const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
    if (bytes.toString()) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return data;
  } catch (e) {
    console.log(e);
  }
}

}
