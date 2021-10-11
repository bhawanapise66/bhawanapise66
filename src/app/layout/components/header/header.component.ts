import { ReportService } from './../../projectcompononts/services/report.service';
import { LoginService } from './../../projectcompononts/services/login.service';
import { CryptService } from './../../projectcompononts/services/crypt.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event, NavigationStart, NavigationError } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertConfigurationModelService } from 'src/app/APIService/alert-configuration-model.service';
import { HeadermapService } from '../../../../assets/../mapservices/headermap.service'

declare var $: any;
import * as $ from 'jquery'

declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
    logoVisible: boolean;
    WelcomeName: string;
    encryptedpageNameValue: any;
    encryptedpageUrlValue: any;
    dateTime: any;
    pageUrl = this.router.url;

    todayNumber: number = Date.now();
    todayDate: Date = new Date();
    todayString: string = new Date().toDateString();
    todayISOString: string = new Date().toISOString();
    alertBellArray: any; alertsCount: any = 0;

    alertObj: any; alertTable: any; alertdesecCount: any; alertdescName: any;
    locaAddress: any = [];
    lati: any; longi: any;

    oldpassword: string; newpassword: string; cnewpassword: string; otp: string;
    showDetails: boolean = false;
    alertViewCount: any;
    pageNumber: any = 1; itemsPerPage: any = 5; key; filter = ""; reverse;
    alertId: any;


    responseMessage: any;
    notificationData: any = " ";
    landingPage: string;

    constructor(private translate: TranslateService, public router: Router, private headermapservice: HeadermapService, private cryptService: CryptService, private loginService: LoginService, private alertService: AlertConfigurationModelService, private reportService: ReportService) {
        this.landingPage = sessionStorage.getItem('lp')

        // this.router.events.subscribe(val => { });
        this.WelcomeName = sessionStorage.getItem('weln');
        this.dateTime = new Date();

        this.EncryptPageName(); this.EncryptPageUrl();

        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                // Hide loading indicator
                this.bellAlertCount();
            }
        });
    }

    ngOnInit() {

        $('#menutoggle').on('click', function () {
            $.cookie("sidebarsize", 'sidebar-icon', {
                expires: 7
            });
            $('body').addClass('sidebar-normal');
            $('body').removeClass('sidebar-compact');
            $('.sidebar').find('.dropdown').removeClass('show').find('.dropdown-toggle').next().hide();

        });

        this.notificationDetails();
    }

    EncryptPageName() {
        this.cryptService.encrypt("header");
        this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
    }

    EncryptPageUrl() {
        this.cryptService.encrypt(this.pageUrl);
        this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    }


    toggleSidebar() {
        const dom: any = document.querySelector('body');
        event.stopPropagation();
        dom.classList.toggle('sidemenu-open');
        // this.logoVisible = !this.logoVisible;
        // alert(this.logoVisible);
        // if (this.logoVisible == true) {
        //     $('body').addClass('sidebar-icon');
        //     $('body').removeClass('sidebar-compact');
        // }
        // else {
        //     $('body').removeClass('sidebar-icon');
        //     $('body').removeClass('sidebar-compact');
        // }
    }

    toggleMenus() {
        let s = document.getElementById("navbarDropdown5").getAttribute("aria-expanded");
        if (s == "false") {
            s = "true";
            $(".dropdown-menu-right").addClass("show");
            // alert(document.getElementById("navbaritems").innerHTML)
        }
        else {
            s = "true";
            $(".dropdown-menu-right").removeClass("show");
        }
    }
    changeLang(language: string) {
        this.translate.use(language);
    }

    logout() {
        let dataL = {
            pageID: "1",
            param2: 'manual logout',
            pageName: this.encryptedpageNameValue,
            pageURL: this.encryptedpageUrlValue
        }
        this.loginService.manualLogout(dataL).subscribe((response) => {
            sessionStorage.clear();
            this.router.navigate(['/login']);
        })
    }

    toggleAlert() {
        let s = document.getElementById("navbarDropdown3").getAttribute("aria-expanded");
        if (s == "true") {
            s = "false";
            $(".dropdown-menu-right").removeClass("show");
            $("#listitem1").removeClass("show");
        }
        else if (s == "false") {
            s = "true";
            $(".dropdown-menu-right").addClass("show");
            $("#listitem1").addClass("show");
        }
    }


    // alert functionality starts
    bellAlertCount() {
        let dataL = {
            pageNo: "1",
            itemsPerPage: "100",
            searchBy: "",
            searchType: "",
            totalRecords: "NA",
            param1: "",
            param2: "",
            param3: "",
            pageID: "56789",
            pageName: this.encryptedpageNameValue,
            pageURL: this.encryptedpageUrlValue
        }
        this.alertService.bellAlertCountApi(dataL).subscribe((response) => {
            if (response.statuscode == 200) {
                if (response.responseEntityCount == "1") {
                    this.alertBellArray = response.entity.list;
                    this.alertsCount = response.entity.count;
                }
                else {
                    this.alertsCount = 0;
                }

            }
            else {
            }
        })
    }
    alerttype: any;

    getAlertDetailsParam(data) {
        // for (let i = 0; i >= data.count; i++) {
        //     document.getElementById("afterapi" + i).style.display = "none";
        // }
        this.alerttype = data.param2
        this.alertId = data.param1;
        this.locaAddress = [];
        this.LiveAlertOnBellDetails();
    }


    LiveAlertOnBellDetails() {
        try { AddLoader() } catch (err) { }
        $("#AlertModalId").modal("show");
        try { $(".modal-backdrop").css("display", "none"); }
        catch (err) { alert(err) }

        let InputForAlert = {
            pageNo: this.pageNumber,
            itemsPerPage: this.itemsPerPage,
            searchBy: this.filter,
            searchType: "",
            totalRecords: "NA",
            param1: this.alertId,
            param2: "",
            param3: "",
            pageID: "1",
            pageName: this.encryptedpageNameValue,
            pageURL: this.encryptedpageUrlValue
        }

        this.alertService.LiveAlertsOnBell_Details(InputForAlert).subscribe((response) => {
            try { RemoveLoader() } catch (err) { }
            if (response.statuscode == 200) {

                this.showDetails = true;
                this.alertTable = response.entity.list;
                this.alertdescName = response.entity.list[0].param7;
                this.alertdesecCount = response.entity.count;
                this.alertViewCount = response.entity.viewCount;
            }
            else {
                this.responseMessage = response.entity
                $("#FailedModal").modal('show');
            }
        })
    }


    changePageNumber(event) {
        this.pageNumber = event;
        this.LiveAlertOnBellDetails();

    }

    Refreshfunction() {
        this.pageNumber = 1; this.itemsPerPage = 5;
        this.LiveAlertOnBellDetails()
    }

    viewLocation(data, type) {
        let dataL = {
            "param1": data.param6,
            "param2": data.param5,
            "pageID": "1",
            "pageName": this.encryptedpageNameValue,
            "pageURL": this.encryptedpageUrlValue
        }
        this.reportService.getlocation(dataL).subscribe((response) => {
            if (response.statuscode == 200) {
                $('#afterapi' + data.rowNumber + type).show();
                $('#beforeapi' + data.rowNumber + type).hide();
                let addArray = response.entity.list[0];
                this.locaAddress[data.rowNumber] = addArray.param1;
            }
        })
    }




    createPDF() { }
    exportToExcel() { }
    searchdata() {
        this.LiveAlertOnBellDetails()
    }
    // alert functionality ends


    // change Password starts

    generateOTP() {
        if (this.oldpassword == null || this.oldpassword == "") {
            $('#oldPasswordError').html('Please Enter Old Password').show();
            $('#currentPassWord').focus();
            setTimeout(function () { document.getElementById("oldPasswordError").style.display = "none"; }, 3000);
        }
        else {


            let encyptedOldPassword = this.cryptService.encrypt(this.oldpassword)
            let otpReqData = {
                "param1": "",   //remark
                "param2": encyptedOldPassword,
                "param10": "web",
                "pageID": "3443",
                "pageName": this.encryptedpageNameValue,
                "pageURL": this.encryptedpageUrlValue
            }
            this.loginService.InsertOtpResetPassword(otpReqData).subscribe((response) => {
                if (response.statuscode == 200) {
                    this.responseMessage = response.entity.param2;
                    $("#otpSendModal").modal("show");
                    $(".modal-backdrop").css("display", "none");
                }
                else {
                    this.responseMessage = response.entity;
                    $("#FailedModal").modal("show");
                    $(".modal-backdrop").css("display", "none");
                    this.oldpassword = "",
                        $('#currentPassWord').focus();
                }
            })
        }
    }

    openChangePasswordModal() {
        $("#ChangePasswordModal").modal("show");
        $(".modal-backdrop").css("display", "none");
        $('#currentPassWord').focus();

    }

    changepassword() {
        if (this.oldpassword == null || this.oldpassword == "") {
            $('#passError').html('Please Enter Old Password').show();
            $('#currentPassWord').focus();
            setTimeout(function () { document.getElementById("passError").style.display = "none"; }, 3000);
        }
        else if (this.otp == null || this.otp == "") {
            $('#otpError').html('Please Enter OTP').show();
            $('#otpfield').focus();
            setTimeout(function () { document.getElementById("otpError").style.display = "none"; }, 3000);
        }

        else if (this.newpassword == null || this.newpassword == "") {
            $('#npassError').html('Please Enter New Password').show();
            $('#newPassWord').focus();
            setTimeout(function () { document.getElementById("npassError").style.display = "none"; }, 3000);
        }
        else if (this.cnewpassword == null || this.cnewpassword == "") {
            $('#cnpassError').html('Please Re Enter New Password').show();
            $('#cnewPassWord').focus();
            setTimeout(function () { document.getElementById("cnpassError").style.display = "none"; }, 3000);
        }
        else if (this.newpassword != this.cnewpassword) {
            $('#npassError').html('the new Password and confirm Password did not matched').show();
            $('#cnewPassWord').focus();
            setTimeout(function () { document.getElementById("npassError").style.display = "none"; }, 3000);
        }
        else {
            this.otpVerificationV2();
        }
    }

    otpVerificationV2() {

        this.cryptService.encrypt(this.otp);
        const encyptedOTP = this.cryptService.conversionEncryptOutput;

        this.cryptService.encrypt(this.newpassword);
        const encyptedNewPassword = this.cryptService.conversionEncryptOutput;

        this.cryptService.encrypt(this.oldpassword);
        const encyptedOldPassword = this.cryptService.conversionEncryptOutput;

        let dataL = {
            "param1": "",
            "param2": "0",
            "param3": encyptedOTP,
            "param4": encyptedNewPassword,
            "param5": encyptedOldPassword,
            pageID: "345",
            pageName: this.encryptedpageNameValue,
            pageURL: this.encryptedpageUrlValue
        }
        this.loginService.setresetpassword(dataL).subscribe((response) => {
            if (response.statuscode == 200) {
                this.responseMessage = response.entity;
                $("#otpSendModal").modal("show");
            }
            else {
                this.responseMessage = response.entity;
                $("#FailedModal").modal("show");
            }
        })

    }

    clearForm() {
        this.oldpassword = '';
        this.newpassword = '';
        this.cnewpassword = '';
        this.otp = ''
    }
    // change password ends


    notificationDetails() {
        let dataL = {
            pageNo: "",
            itemsPerPage: "",
            searchBy: "",
            searchType: "",
            totalRecords: "NA",
            pageID: "1",
            pageName: "TFMfTkgvxN3nV2bbCgLybA==",
            pageURL: "wSuXkvoMhYGaR5BrMfhU4A==",
            param1: "active",
            param2: "web"
        }
        this.alertService.NotificationDetails(dataL).subscribe((response) => {
            if (response.statuscode == 200) {
                let responseData = response.entity.list;
                if (response.responseEntityCount == 1) {
                    this.notificationData = ''
                }
                else {
                    this.notificationData = "Welcome " + this.WelcomeName;
                }
                for (let i = 0; i < responseData.length; i++) {
                    // console.log(responseData[i].param2 + " :" + responseData[i].param3);
                    let dataDesc = responseData[i].param2 + " : " + responseData[i].param3
                    this.notificationData = this.notificationData + " " + dataDesc;
                }
            }
            else {
            }
        })

    }

    maploadflag = 0;
    OpenMap(data) {
        document.getElementById("headermap").style.height = screen.height - 220 + "px"
        $('#headermapmodal').modal('show');

        if (this.maploadflag == 0) {

            //==============map functionality

            //===== BuildMap
            let center = [79.0882, 21.1458]
            this.headermapservice.createmap('headermap', center);
            this.headermapservice.createpopup('headerpopup', 'headerpopup-content', 'popupcloser')
            this.headermapservice.Switchmap("3");
            this.maploadflag = 1;

            this.headermapservice.Plotdata(data)
        } else {
            this.headermapservice.Plotdata(data)
        }
    }


    MapSwitch(type) { }
    CloseCollapse() { }
}
