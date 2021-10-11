import { NgIdleService } from './user-idle-manager/ng-idle.service';
import { CryptService } from './projectcompononts/services/crypt.service';
import { LoginService } from './projectcompononts/services/login.service';
import { LayoutService } from './projectcompononts/services/layout.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

import * as FileSaver from 'file-saver';
declare let html2canvas: any;

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    providers: [NgIdleService]

})
export class LayoutComponent implements OnInit {
    collapedSideBar: boolean;
    encryptedpageNameValue: any;
    encryptedpageUrlValue: any;
    pageUrl = this.router.url;
    checktimer: any;
    key: string;
    capturedImage; reasonTextbox:string; txtreason:string; btnsend:string;

    constructor(private router: Router, private idleService: NgIdleService, private loginService: LoginService,
       private cryptService: CryptService, private layoutService: LayoutService) {
        this.EncryptPageName(); this.EncryptPageUrl();
        this.checktimer = this.idleService.check(); 
        $.getScript('https://html2canvas.hertzen.com/dist/html2canvas.js', function () { });
    }
    ngOnInit() {
        document.getElementById("bsend").style.display="none";
        document.getElementById("reason").style.display="none";

        $("#bsend").hide(); $("#txtreason").hide();  
        const dom: any = document.querySelector('body');
        if (window.innerWidth <= 992) {
            dom.classList.remove('sidemenu-open');
        } else {
            dom.classList.add('sidemenu-open');
        }
        const marginTops: any = document.querySelector('.footer').clientHeight;
        (document.querySelector('.content') as HTMLElement).style.paddingBottom = marginTops + 10 + 'px';
        (document.querySelector('.content') as HTMLElement).style.marginBottom = '-' + marginTops + 'px';
        (document.querySelector('.loader') as HTMLElement).style.display = 'none';
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        if (window.innerWidth <= 992) {
            if (dom.classList.contains('sidemenu-open')) {
                dom.classList.remove('sidemenu-open');
            }
        }
    }

    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }

    EncryptPageName() {
        this.cryptService.encrypt("layout page")
        this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
    }


    EncryptPageUrl() {
        this.cryptService.encrypt(this.pageUrl);
        this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    }

    // sessionFunction() {
    //     $('.bd-example-modal-sm').modal('show');
    //     $('.modal-backdrop.show').css('display', 'none');
    // }

    okay() {
        let dataL = {
            pageID: "1",
            param2: 'logout by session timeout',
            pageName: this.encryptedpageNameValue,
            pageURL: this.encryptedpageUrlValue
        }

        this.loginService.key = sessionStorage.getItem('hk');
        this.loginService.idleLogout(dataL).subscribe((response) => {
            if (response.statuscode == 200) {
                sessionStorage.clear()
            }
            else {
                sessionStorage.clear()
            }
        })
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }

    clickme() {

        $("#Reasonentryid").show(); $("#btnsendemail").show();
    
         
      }
      
      downloadimage() {    
    
            $("#bsend").hide();
            document.getElementById("bsend").style.display="none";
            document.getElementById("reason").style.display="none";

        html2canvas(document.querySelector("#capture")).then(canvas => {
    
          this.capturedImage = canvas.toDataURL();
          console.log("canvas.toDataURL() -->" + this.capturedImage);
                  
          canvas.toBlob(function (blob) {
            
            //  just pass blob to something expecting a blob
            
            // Same as canvas.toDataURL(), just longer way to do it.
            var reader = new FileReader();
           
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
              let base64data = reader.result;
              
              //console.log("Base64--> " + base64data);
    
              let link = document.createElement("a");
              link.download = "image.png";
              link.href = URL.createObjectURL(blob);

              link.click();
    
            }
    
          });
    
    
        });
    
        $("#Reasonentryid").hide(); $("#btnsendemail").hide();
      }
    
      sendemail() {    
    
        html2canvas(document.querySelector("#capture")).then(canvas => {
    
          this.capturedImage = canvas.toDataURL();
          console.log("canvas.toDataURL() -->" + this.capturedImage);

          let keydata = {
            param1:this.txtreason,
            param2:"ishantd.baghele@gmail.com",//"tech@indtrack.com",
            param3:this.capturedImage,
            pageID: "7",
            pageName: this.encryptedpageNameValue,
            pageURL: this.encryptedpageUrlValue
          }
        
        //  try{AddLoader()}catch(e){}          
          try{this.layoutService.ScreenShotAPI(keydata).subscribe(
            (data)  => {   
               
            
          })
      
      }catch(e){}
                  
          canvas.toBlob(function (blob) {
            
            //  just pass blob to something expecting a blob
            
            // Same as canvas.toDataURL(), just longer way to do it.
            var reader = new FileReader();
           
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
              let base64data = reader.result;
    
            }
    
          });
    
    
        });
    
        $("#Reasonentryid").hide(); $("#btnsendemail").hide();
      }
      
      openFormscr() {
            $("#bsend").hide();
            document.getElementById("bsend").style.display="none";
            document.getElementById("reason").style.display="none";

            document.getElementById("myForm").style.display = "block";

        html2canvas(document.querySelector("#capture")).then(canvas => {
    
            this.capturedImage = canvas.toDataURL();
            console.log("canvas.toDataURL() -->" + this.capturedImage);
                    
            canvas.toBlob(function (blob) {
            
            //  just pass blob to something expecting a blob
            
            // Same as canvas.toDataURL(), just longer way to do it.
            var reader = new FileReader();
           
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
              let base64data = reader.result;
              
              console.log("Base64--> " + base64data);
             
            }
    
          });
    
    
        }); 
        
      }

      MailSection() {
        $("#bsend").show();
        document.getElementById("bsend").style.display="block";
        document.getElementById("reason").style.display="block";     
    
        }
      
      closeForm() {
        document.getElementById("myForm").style.display = "none";
      }

}
