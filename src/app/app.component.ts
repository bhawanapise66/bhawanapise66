import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgIdleService } from './layout/user-idle-manager/ng-idle.service';
declare var jQuery: any;
declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private router:Router , private idleService:NgIdleService) {}
   

    ngOnInit() {
        (function ($) {
            $(document).ready(function(){
                // $.cookie("sidebarsize", 'sidebar-icon', {
                //     expires: 7
                // });
                // $('body').addClass('sidebar-icon');
                // $('body').removeClass('sidebar-compact');
          })(jQuery); 
          });

          
        
    }

 

}
