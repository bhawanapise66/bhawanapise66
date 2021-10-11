import { LoginService } from './../../layout/projectcompononts/services/login.service';
import { ForgetPassword } from './../forget-password/forget-password.component';
import { routerTransition } from 'src/app/router.animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  animations: [routerTransition()]

})
export class ChangePasswordComponent implements OnInit {

  changePassword = new ForgetPassword()
  id:string;
  product = {};
  submitted: boolean = false;
  constructor(private ar: ActivatedRoute) { }

  ngOnInit() {
    this.ar.params.subscribe(
      response => {
        this.id = response.entity.param3;
      });
  }

  ChangePassword() {
    this.submitted = true;
  }
}
