import { EntryGuard, EntryGuardWeb } from './shared/guard/auth.guard';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { Http, HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { NgIdleService } from './layout/user-idle-manager/ng-idle.service';

// { TokenInterceptor } from './APIService/intercepter';


@NgModule({
    imports: [
        CommonModule,
        //HttpModule,Http,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
    ],
    declarations: [AppComponent],
    providers: [AuthGuard,EntryGuard,EntryGuardWeb,NgIdleService],
    bootstrap: [AppComponent]
})
export class AppModule {}
