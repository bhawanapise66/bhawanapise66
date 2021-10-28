import { MenuAssignmentService } from './../layout/projectcompononts/services/menu-assignment.service';


import { URLConst } from './../APIService/urlconst';
import { ListService } from './../../list.service';
import { CryptService } from './../layout/projectcompononts/services/crypt.service';
import { LoginService } from './../layout/projectcompononts/services/login.service';
import { HttpClient } from '@angular/common/http';
import { routerTransition } from 'src/app/router.animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { DeviceDetectorService } from 'ngx-device-detector';
// import { routerTransition } from '../router.animations';
declare var $: any;
import * as moment from 'moment';
import * as $ from 'jquery'





const URL = new URLConst().URLDemo;


//import * as $ from 'jquery';
declare var jQuery: any;


export interface FormModel {
    captcha?: string;
}

export class LoginCredentias {
    loginId: string; password: string; captcha: string; checkNumber: string; headerKey: string;
    vendorname : string; contactpersonname:string;contactno:string;otp:string; newpassword :  string ; confirmpassword : string;
}

export class DeviceInformation {
    browser: string; browser_version: string; device: string; os: string; os_version: string;
}
export class Menus {
    mainMenus = []; AllMenus = [];
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    // for autofocus directive
    t = false;
    // for autofocus directive

    

    randomNumber; messageVisible: boolean = false;


    public formModel: FormModel = {};
    urlConst = new URLConst();
    // deviceInfo = null;
    loginCheck = [];

    otp

    deviceInformation = new DeviceInformation();
    encryptedpageNameValue; encryptedpageUrlValue; pageUrl = this.router.url;
    encryptedLoginCredentalValue;
    customerList = []; vehicleList = [];
    warningMessage: any;
    wrongCaptcha: boolean = false;

    // , private deviceService: DeviceDetectorService
    constructor(private menuService: MenuAssignmentService, public router: Router, private loginService: LoginService,
        private listService: ListService, private cryptService: CryptService) {
        this.epicFunction();
    }
    public resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    viewLoginIdPage: boolean = true;
    viewPasswordPage: boolean = false
    accountype: string = "";

    loginCredentials = new LoginCredentias();

    menuItems = new Menus();
    isTextFieldType: boolean;
    code: string;

    isCaptchaTrue: boolean = false; isLoginIdTrue: boolean = false; isCaptchaEmpty: boolean = false; isPasswordEmpty: boolean = false;

    buttonHit = false; signInbuttonHit = false;

    headerKey: string = ''; loginName: string; currentDate; roleId: any;
    allAssignedMenus = []; allMainMenus = [];
    landingPageUrl: string;

    ngOnInit() {

  

        this.changeRandomNumber();

        $(".blockSymbolforName").on("keypress keyup blur",function(e){
            $(this).val($(this).val().replace(/[^a-zA-Z ].+/, ""));
            var k;
            document.all ? k = e.keyCode : k = e.which;
            return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k==46 || k == 32);
        })

        $(".allownumericwithoutdecimal").on("keypress keyup blur",function (e) {    
            $(this).val($(this).val().replace(/[^0-9].+/, ""));
            var k;
            document.all ? k = e.keyCode : k = e.which;
            return ((k > 47 && k < 58));
        });

        const marginTops: any = document.querySelector('.footer').clientHeight;
        (document.querySelector('.content') as HTMLElement).style.marginBottom = '-' + marginTops + 'px';

        const headerhegiht: any = document.querySelector('.header').clientHeight;
        const loginheight: any = window.innerHeight - marginTops - 60 - headerhegiht;

        (document.querySelector('.login-row-height') as HTMLElement).style.minHeight = loginheight + 'px';

        const dom: any = document.querySelector('body');
        dom.classList.remove('sidemenu-open');


    }



    EncryptPageName() {
        this.cryptService.encrypt("login")
        this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
    }

    EncryptPageUrl() {
        this.cryptService.encrypt(this.pageUrl);
        this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    }


    EncryptLoginCredentials() {
        $("#date").val(moment().format('YYYYMMDDHHmm'));
        var today = moment().format('YYYYMMDDHHmm');
        this.currentDate = today;
        this.cryptService.encrypt(this.loginCredentials.loginId + ":" + this.loginCredentials.password + ":" + today);
        this.encryptedLoginCredentalValue = this.cryptService.conversionEncryptOutput;
        this.loginService.getCredentials(this.encryptedLoginCredentalValue);
    }

    // for captcha 
    onGenerateCode(code) {
        this.code = code
    }    // for captcha 

    // verifyCaptcha() {
    //     if (this.code === this.loginCredentials.captcha) {
    //         // this.isCaptchaTrue =false
    //         this.LoginIdCheck();
    //         this.buttonHit = true;
    //         return true;
    //     } else {
    //         this.loginCredentials.captcha = undefined;
    //         this.buttonHit = false;
    //         this.isCaptchaEmpty = true;
    //         return false
    //     }
    // }

    LoginIdCheck() {

        document.getElementById("userloading").style.display = "inline-block";
        //console.log("in login")
        let dataL = {
            // accountName: "vehicle tracking",
            // param1: this.loginCredentials.loginId,
            // param2: "",
            // param3: "",
            // param4: this.deviceInformation.browser,
            // param5: this.deviceInformation.browser_version,
            // param6: this.deviceInformation.os,
            // param7: this.deviceInformation.os_version,
            // param8: "web",
            // param9: "vtsindtrack",

            "loginName":this.loginCredentials.loginId,
            "browsername":this.deviceInformation.browser,
            "browserVersion":this.deviceInformation.browser_version,
            "opersatingSys":this.deviceInformation.os,
            "osVersion":this.deviceInformation.os_version,
            "loginBy":"Web",
            "secretId":""
        }
        if (this.loginCredentials.loginId == null) {
            this.isLoginIdTrue = true;
            document.getElementById("userloading").style.display = "none";
        }

        else {
            this.loginService.LoginIdCheck(dataL).subscribe((response) => {
                if (response.statuscode == 200) {
                    this.buttonHit = true;
                    this.loginCheck = <any[]>(response.entity)
                    if (this.loginCheck["param1"] == "Success") {
                        document.getElementById("userloading").style.display = "none";
                        this.viewLoginIdPage = false; this.viewPasswordPage = true;
                        this.buttonHit = false;
                        this.t = true;
                        this.loginCredentials.password = "";

                        document.getElementById('usernameDiv').style.display = 'none';
                        document.getElementById('passwordDiv').style.display = 'block';
                        document.getElementById('backbutton').style.display = 'block';
                        document.getElementById('password').focus();

                        this.loginService.loginData = {
                            "roleId": response.entity.param4,
                            "ownersId": response.entity.param5
                        }
                    }
                    else if (this.loginCheck["param1"] == "Fail") {
                        document.getElementById("userloading").style.display = "none";
                        // this.buttonHit = false; this.messageVisible = true;
                        this.loginmsg="Login Id Does Not Match"
                        document.getElementById("loginId").focus();
                        this.changeRandomNumber();
                    }
                    else {
                        document.getElementById("userloading").style.display = "none";
                        this.buttonHit = false;
                        this.changeRandomNumber();
                    }
                }
                else {
                    // this.buttonHit = false;
                    document.getElementById("userloading").style.display = "none";
                    this.loginmsg="Login Id Does Not Match"
                    document.getElementById("loginId").focus();
                    this.changeRandomNumber();

                }
            })
        }
    }

    submitusername(event) {
        if (event.keyCode === 13) {
            //this.verifyUsername();
            this.NextFunction();
        }
    }

    submitpassword(event) {
        if (event.keyCode === 13) {
            this.Login();
        }
    }

    verifyUsername() {
        if (this.loginCredentials.loginId == null) {
            this.isLoginIdTrue = true;
            this.buttonHit = false;
            document.getElementById("loginid").focus();
        }
        else if (this.loginCredentials.checkNumber == null) {
            this.isCaptchaEmpty = true;
            this.buttonHit = false;
            document.getElementById("randomNumberId").focus();

        }
        else if (this.loginCredentials.checkNumber != null) {
            this.buttonHit = true;
            if (this.loginCredentials.checkNumber != this.randomNumber) {
                this.wrongCaptcha = true;
                this.loginCredentials.checkNumber = "";
                this.buttonHit = false;
                document.getElementById("randomNumberId").focus();
            }
            else if (this.loginCredentials.checkNumber == this.randomNumber) {
                this.LoginIdCheck()
            }




        }
    }



    gotoBack() {
        if (this.viewPasswordPage == true) {
            this.viewPasswordPage = false; this.viewLoginIdPage = true;
            this.messageVisible = false; this.loginCredentials.loginId = ''; this.loginCredentials.checkNumber = '';
            this.changeRandomNumber()
        }
    }
    onLoggedin() {
        sessionStorage.setItem('isLoggedin', 'true');

    }

    showaccount(accountype) {
        this.accountype = accountype;
    }

    // password into text
    togglePasswordFieldType() {
        this.isTextFieldType = !this.isTextFieldType;
    }

    
  vendorentryText: string; shortcodeentryText: string; cinnoentryText: string; gstentryText: string; officialnoentryText: string;
  officialemailentryText: string; supplierofText: string; altnumber: string;
  datafromrespo: string; count: number; validationmsg: string;

  personnameText: string; personnoText: string; personaltnoText: string; personemailText: string; cityText: any; regaddressText: string; pincodeText: string;


  AreaText: string; landmarkText: string;

  accountnoText: string; banknmText: string; branchnmText: string; ifscText: string; paymntText: string;

  ListOfCity$: Object; ListOfState$: Object; resdatalist = []; ListOfState = []; ListOfCity = [];

  public loading = false; p: number;
  
    

    passwordmsg:any

    Login() {
        this.passwordmsg="";
        if (this.loginCredentials.password == null || this.loginCredentials.password.length == 0) {
            // this.isPasswordEmpty = true;
            this.passwordmsg="Enter Password";
            document.getElementById('password').focus();
        }
        else {
            this.passwordmsg="";
            this.EncryptLoginCredentials();
            // this.signInbuttonHit = true;
            document.getElementById("loading").style.display = "inline-block";
            let dataL = {
                // param3: "92.168.42.0",//param3:"0:0:0:0:0:0:0:1",
                // param4: this.deviceInformation.browser,// param4:"Chrome",
                // param5: this.deviceInformation.browser_version,// param5:"78.0.3904.97",
                // param6: this.deviceInformation.os,// param6:"Linux",
                // param7: this.deviceInformation.os_version,// param7:"7",
                // param8: "web",// param8:"web",
                // param9: window.location.href,// param9:"vtsindtrack",
                // param10: this.currentDate// param10:"uioplkjhvbnmzxcv"
                        "browsername":this.deviceInformation.browser,
                        "browserVersion":this.deviceInformation.browser_version,
                        "opersatingSys":this.deviceInformation.os,
                        "osVersion":this.deviceInformation.os_version,
                        "loginBy":"Web",
                        "secretId":""
            }

            this.loginService.Login(dataL).subscribe((response) => {
                if (response.statuscode == 200 && response.entity["param2"] == "Successfully Login.") {
                    // this.headerKey = response.entity.param20;
                    // this.final_mainmenu();
                    this.headerKey = response.entity.sessionKey;
                            this.final_mainmenu();
                    this.loginName = response.entity.param4;
                    let loginId = response.entity.param3;
                    let loginroleid = response.entity.param5;
                    this.roleId = response.entity.param5;
                    let ownersid = response.entity.param6;
                    let welcomeName = response.entity.param7;
                    let key = response.entity.param8;
                    let browserid = response.entity.param9;
                    this.landingPageUrl = response.entity.param14;

                    let privilegewrite = response.entity.param19;
                    sessionStorage.setItem('hk', this.headerKey);

                    this.urlConst.headerKey = sessionStorage.getItem('hk');
                    sessionStorage.setItem('ln', this.loginName);
                    sessionStorage.setItem('weln', welcomeName);
                    sessionStorage.setItem('rid', loginroleid);
                    sessionStorage.setItem('writePrivilege', privilegewrite);
                    this.onLoggedin();
                    this.getCustomerList();
                    // console.log(this.roleId);
                }
                else {
                    this.passwordmsg = "Login Information Does Not Match.";
                    this.warningMessage = response.entity.param2
                    this.signInbuttonHit = false;
                    document.getElementById("loading").style.display = "none";
                }
                return;
            })
        }
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
                this.menuItems.AllMenus = response.entity.list;
                sessionStorage.setItem('am', JSON.stringify(this.allAssignedMenus));
                // console.log(this.landingPageUrl)
                if (this.landingPageUrl == null) {
                    this.RoutingAfterLogin();
                    // console.log(' url is null')
                }
                else {
                    // console.log(' url is not null')
                    this.router.navigate([this.landingPageUrl]);
                }
                // 

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
                this.menuItems.mainMenus = response.entity.list;
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
            this.router.navigate(['/customerdashboard'])
        }
    }




    epicFunction() {
        this.deviceInformation.browser = ""; // this.deviceService.getDeviceInfo().browser;
        this.deviceInformation.browser_version = ""; //this.deviceService.getDeviceInfo().browser_version;
        this.deviceInformation.device = ""; //this.deviceService.getDeviceInfo().device;
        this.deviceInformation.os = ""; //this.deviceService.getDeviceInfo().os;
        this.deviceInformation.os_version = ""; //this.deviceService.getDeviceInfo().os_version;
    }

    changeRandomNumber() {
        this.randomNumber = (Math.floor(100000 + Math.random() * 900000));
    }


    
    FlipLogin() {

    this.loginmsg="";
    this.passwordmsg="";

      document.getElementById('backcard').style.display = 'flex';
      document.getElementById('frontcard').style.display = 'none';
      //document.getElementById("summarytable").style.display = 'block';

      document.getElementById('frontcard').style.transform = "rotateY(180deg)";
      document.getElementById('backcard').style.transform = "rotateY(0deg)";
      //document.getElementById("frontmap").style.zIndex = "1";

    }

    FlipRegistration() {
        this.loginmsg="";
        this.passwordmsg="";
        document.getElementById('backcard').style.display = 'none';
        document.getElementById('frontcard').style.display = 'flex';
        //document.getElementById("summarytable").style.display = 'block';

        document.getElementById('frontcard').style.transform = "rotateY(0deg)";
  
        document.getElementById('backcard').style.transform = "rotateY(180deg)";
        //document.getElementById("frontmap").style.zIndex = "1";
  
      }

      loginmsg:any

      NextFunction(){
        // document.getElementById('usernameDiv').style.display = 'none';
        // document.getElementById('passwordDiv').style.display = 'block';
        // document.getElementById('backbutton').style.display = 'block';
        this.loginmsg="";
        if (this.loginCredentials.loginId == null || this.loginCredentials.loginId == '') {
            // this.isLoginIdTrue = true;
            // this.buttonHit = false;
            document.getElementById("loginId").focus();
            this.loginmsg="Enter Login Id"
        }
        else if (this.loginCredentials.checkNumber == null || this.loginCredentials.checkNumber == '') {
            // this.isCaptchaEmpty = true;
            // this.buttonHit = false;
            document.getElementById("randomNumberId").focus();
            this.loginmsg="Enter Captcha"

        }
        else if (this.loginCredentials.checkNumber != '') {
            this.buttonHit = true;
            if (this.loginCredentials.checkNumber != this.randomNumber) {
                // this.wrongCaptcha = true;
                // this.loginCredentials.checkNumber = "";
                // this.buttonHit = false;
                document.getElementById("randomNumberId").focus();
                this.loginmsg="Invalid Captcha"
            }
            else if (this.loginCredentials.checkNumber == this.randomNumber) {
                this.LoginIdCheck();
                

            }

        }
      }

      SendOTPApi(){
        let dataL = {

            "vendorName":this.loginCredentials.vendorname,
            "contactPersonName":this.loginCredentials.contactpersonname,
            "contactPersonNo":this.loginCredentials.contactno,
            "verifiedBy":"mobileno",
            "otptype":"Registration",
            "otpcount":"0"
        }
       
            this.loginService.InsertOTPCode(dataL).subscribe((response) => {
                if (response.statuscode == 200) {
                   // this.buttonHit = true;
                    this.loginCheck = <any[]>(response.entity)
                    if (this.loginCheck["param1"] == "Success") {
                        this.viewLoginIdPage = false; this.viewPasswordPage = true;
                        this.buttonHit = false;
                        this.t = true;
                        this.loginCredentials.password = "";

                        document.getElementById('usernameDiv').style.display = 'none';
                        document.getElementById('passwordDiv').style.display = 'block';
                        document.getElementById('backbutton').style.display = 'block';

                        this.loginService.loginData = {
                            "roleId": response.entity.param4,
                            "ownersId": response.entity.param5
                        }
                    }
                    else if (this.loginCheck["param1"] == "Fail") {
                        // this.buttonHit = false; this.messageVisible = true;
                        this.loginmsg="Login Id Does Not Match"
                        document.getElementById("loginId").focus();
                        this.changeRandomNumber();
                    }
                    else {
                        this.buttonHit = false;
                        this.changeRandomNumber();
                    }
                }
                else {
                    this.buttonHit = false;

                }
            })
        

      }


      SendOtpFunction(){
     if(this.loginCredentials.vendorname == null || this.loginCredentials.vendorname == ''){
        document.getElementById("vendorname").focus();
     }
     else if(this.loginCredentials.contactpersonname == null || this.loginCredentials.contactpersonname == ''){
        document.getElementById("contactpersonname").focus();
     }
     else if(this.loginCredentials.contactno == null || this.loginCredentials.contactno == ''){
        document.getElementById("contactno").focus();
     }
     else{

        document.getElementById('sendOtpDiv').style.display = 'none';
        document.getElementById('vendorDiv').style.display = 'none' ;
        document.getElementById('resendOtpDiv').style.display = 'flex';
        document.getElementById('submitDiv').style.display = 'flex' ;
     }
      }

      SubmitRegFunction(){
          if(this.loginCredentials.otp == null || this.loginCredentials.otp == ''){
            document.getElementById("otp").focus();
          }
          else{
            this.router.navigate(["/login/registration"])
          }

      }

      KeyUpFun(){
        this.loginmsg="";
        this.passwordmsg="";
      }

      PreviousFunction(){
        document.getElementById('usernameDiv').style.display = 'block';
        document.getElementById('passwordDiv').style.display = 'none';
        document.getElementById('backbutton').style.display = 'none';
      }

      myFunction() {
        setTimeout(function(){ this.KeyUpFun(); }, 2000);
      }

      
}