import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CryptService } from './../services/crypt.service';
import { MenuAssignmentService } from './../services/menu-assignment.service';
import { routerTransition } from 'src/app/router.animations';
import { Component, OnInit } from '@angular/core';
 
declare var $: any;

declare var jQuery: any;

declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
    selector: 'menu-management',
    templateUrl: 'menu-management.component.html',
    styleUrls: ['menu-management.component.css'],
    animations: [routerTransition()]

})

export class MenuManagementComponent implements OnInit {
    isAdmin: boolean; loginRoleId: any;


    constructor(private fb: FormBuilder, private menuAssignmentService: MenuAssignmentService, private cryptService: CryptService, private router: Router) {

        this.loginRoleId = sessionStorage.getItem('rid');
        // console.log(this.loginRoleId)
        if (this.loginRoleId == 10 || this.loginRoleId == 11) {
            this.isAdmin = true;
        }
        else {
            this.isAdmin = false;
        }
    }

    ngOnInit() {

    }
   

}
