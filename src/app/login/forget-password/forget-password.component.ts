import { DeviceDetectorService } from 'ngx-device-detector';
import { CryptService } from './../../layout/projectcompononts/services/crypt.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './../../layout/projectcompononts/services/login.service';
import { routerTransition } from 'src/app/router.animations';
import { Component, OnInit } from '@angular/core';
declare var $: any;


export class ForgetPassword {
  loginId: string;
  captcha: number;
  currentPassword: string;
  newPassword: string;
  cPassword: string;
  otp: string;
  mobile: number;
}


export class DeviceInformation {
  browser: string; browser_version: string; device: string; os: string; os_version: string;
}

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  animations: [routerTransition()]

})
export class ForgetPasswordComponent implements OnInit {
  deviceInformation = new DeviceInformation();


  requestOTPForm: boolean = true;
  resetPasswordForm: boolean = false;
  ifIdValid: boolean = false;

  encryptedOTPValue: string;

  forgetPassword = new ForgetPassword()
  loginCheck = [];
  submitted: boolean = false;
  encryptedLoginName: string;

  code: string;
  inputCode: string

  isCaptchaTrue: boolean = false;
  isLoginIdTrue: boolean = false;
  isLoginIdCheck: boolean = false;
  isCaptchaValid: boolean = false;
  randomNumber: number;
  repsonseMessage: any;
  WrongMobile: boolean = false;
  encryptedPageName: any;
  encryptedPageUrl: any;
  encryptedPageUrlValue: any;
  encryptedPageNameValue: any;
  newPassBlank: boolean = false;
  confPassBlank: boolean = false;
  passnotMatch: boolean = false;
  otpBlank: boolean = false;
  loginMessage: any;

  onGenerateCode(code) {
    this.code = code
  }

  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
  constructor(private loginService: LoginService, private router: Router, private cryptService: CryptService, private deviceService: DeviceDetectorService) {
    this.epicFunction();
    this.EncryptPageName();
    this.EncryptPageUrl();

    this.loginService.routeFlag = false;
  }


  ngOnInit() {
    // this.EncryptOTP()
    this.EncryptLoginName();
    this.changeRandomNumber();

    console.log(this.loginService.loginData)
  }

  EncryptPageName() {
    this.cryptService.encrypt("ForgetPassword");
    this.encryptedPageNameValue = this.cryptService.conversionEncryptOutput;
  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.router.url);
    this.encryptedPageUrlValue = this.cryptService.conversionEncryptOutput;
  }


  EncryptLoginName() {
    this.cryptService.encrypt(this.forgetPassword.loginId);
    this.encryptedLoginName = this.cryptService.conversionEncryptOutput;
  }


  LoginIdCheck() {
    let dataL = {
      accountName: "vehicle tracking",
      param1: this.forgetPassword.loginId,
      param2: "",
      param3: "0:0:0:0:0:0:0:1",
      param4: "Chrome",
      param5: "78.0.3904.97",
      param6: "Linux",
      param7: "7",
      param8: "web",
      param9: "vtsindtrack"
    }
    this.loginService.LoginIdCheck(dataL).subscribe((response) => {
      this.loginCheck = <any[]>(response.entity)
      console.log(this.loginCheck)

      if (this.loginCheck["param1"] == "Success") {

        this.isLoginIdCheck = true;
        this.ForgotPassword();
        this.ifIdValid = true;
      }
      else if (this.loginCheck["param1"] == "Fail") {
        this.isLoginIdCheck = true;

      }
    })
  }

  RequestOTP() {
    if (this.forgetPassword.mobile == null) {
      this.isLoginIdTrue = true;
    }
    else if (this.forgetPassword.captcha == null) {
      this.isCaptchaTrue = true;
    }
    else if (this.forgetPassword.captcha != this.randomNumber) {
      this.isCaptchaValid = true;
      this.changeRandomNumber();
      this.forgetPassword.captcha = null;
    }
    else if (this.forgetPassword.captcha == this.randomNumber) {
      this.ForgotPassword();
    }
  }

  ForgotPassword() {
    let dataL = {
      param1: this.forgetPassword.mobile,
      param2: "",
      param3: this.deviceInformation.browser,
      param4: "Mobile",
      param5: this.loginService.loginData.roleId,
      param6: this.loginService.loginData.ownersId,
      param7: this.deviceInformation.os,  //"OS Name / Device token ",
      param8: this.deviceInformation.os_version, //"OS Version / Firebase Cloud Messaging(fcm) token ",
      param9: "Web",
      param10: "vtsindtrack",
      pageName: this.encryptedPageNameValue,//"page name (encrypted)",
      pageURL: this.encryptedPageUrlValue//"page url (encrypted)"
    }
    this.loginService.ForgotPassword(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.requestOTPForm = false;
        this.resetPasswordForm = true;
      }
      else {
        this.WrongMobile = true;
        this.repsonseMessage = response.entity;
        this.forgetPassword.captcha;
        this.changeRandomNumber();

      }
    })
  }


  checkSetResetPassword() {
    if (this.forgetPassword.otp == null || this.forgetPassword.otp == "") {
      this.otpBlank = true
    }
    else if (this.forgetPassword.newPassword == "" || this.forgetPassword.newPassword == null) {
      this.newPassBlank = true
    }
    else if (this.forgetPassword.cPassword == "" || this.forgetPassword.cPassword == null) {
      this.confPassBlank = true;
    }
    else if (this.forgetPassword.cPassword != this.forgetPassword.newPassword) {
      this.passnotMatch = true;
    }
    else if (this.forgetPassword.cPassword == this.forgetPassword.newPassword) {
      this.SetResetPassword()
    }
  }

  SetResetPassword() {

    let encNewPass = this.cryptService.encrypt(this.forgetPassword.newPassword);
    let encCPass = this.cryptService.encrypt(this.forgetPassword.cPassword);


    let dataL = {
      param1: this.forgetPassword.mobile, //(encrypted)
      param2: encNewPass,// (encrypted)
      param3: encCPass,
      param4: "",
      param5: this.deviceInformation.browser,
      param6: this.loginService.loginData.roleId,
      param7: this.loginService.loginData.ownersId,
      param8: this.forgetPassword.otp, //otp
      param9: "vtsindtrack",
      param10: "web",
      pageID: "23423",
      pageName: this.encryptedPageNameValue,
      pageURL: this.encryptedPageUrlValue
    }

    this.loginService.SetForgetPassword(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.loginMessage = response.entity;
        alert(this.loginMessage + "\n login again to continue")
        this.router.navigate(['/login'])
      }
      else {
        this.loginMessage = response.entity;
      }
    })
  }


  changeRandomNumber() {
    this.randomNumber = (Math.floor(100000 + Math.random() * 900000));
  }


  epicFunction() {
    this.deviceInformation.browser = this.deviceService.getDeviceInfo().browser;
    this.deviceInformation.browser_version = this.deviceService.getDeviceInfo().browser_version;
    this.deviceInformation.device = this.deviceService.getDeviceInfo().device;
    this.deviceInformation.os = this.deviceService.getDeviceInfo().os;
    this.deviceInformation.os_version = this.deviceService.getDeviceInfo().os_version;
  }

  gotoBack() {
    this.router.navigate(["/login"])
  }
}
