import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
// import { RecaptchaModule } from 'ng-recaptcha';
import { CaptchaModule } from 'ng-captcha';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { AutoFocusDirective } from './auto-focus.directive';
import { WebloginComponent } from './weblogin/weblogin.component';
import { HelpCenterComponent } from './help-center/help-center.component';


@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        LoginRoutingModule,
        FormsModule, CaptchaModule, DeviceDetectorModule],
    declarations: [LoginComponent, ForgetPasswordComponent, ChangePasswordComponent, AutoFocusDirective,WebloginComponent, HelpCenterComponent]
})
export class LoginModule { }
