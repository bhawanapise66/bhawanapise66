import { HelpCenterComponent } from './help-center/help-center.component';
import { AuthGuard, EntryGuard, EntryGuardWeb } from './../shared/guard/auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './login.component';
import { WebloginComponent } from './weblogin/weblogin.component';

const routes: Routes = [

    { path: '', component: LoginComponent },
    { path: 'weblogin/:data/:hk', component: WebloginComponent, canActivate: [EntryGuardWeb] },
    { path: 'forgot_password', component: ForgetPasswordComponent, canActivate: [EntryGuard] },
    { path: 'change_password', component: ChangePasswordComponent },
    { path: 'help', component: HelpCenterComponent },

   
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }
