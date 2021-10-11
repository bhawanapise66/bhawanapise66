import { Paramcls } from './../../../../paramcls';
import { URLConst } from './../../../APIService/urlconst';
import { ForgetPassword } from './../../../login/forget-password/forget-password.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

// var authentcatedCredentials: string;
const URL = new URLConst().URLDemo;
const URLOLD = new URLConst().URLDemoOldApp;
const URLForMenu = new URLConst().URLForMenu;
const AUTHENTICATION = sessionStorage.getItem('lg')
// const AUTHENTICATION = new URLConst().authentication;

const httpOptions = {
  headers: new HttpHeaders({
    'Headerkey': 'Oyt2kdvLa9jb4JTfWH7R38X0ASM6iq6LHVH9M9oukNuPAMxGvSKUCJcZw/b5n6td/GFozePqPeY3MflibnQuWi5b0qKPFje5hZlZZj1JBAGwJPfhWtCw1ble9npVvWUyykz3hudBi15HJPAMsYlkCoAvmlGI4SRY6o75WKQ4ej839pp3SbXoKH5YCa8lDJPnkiFy',
    // 'Headerkey': sessionStorage.getItem('hk'),
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'https://api.indtrack.co.in/vtsindtrackapiv1/',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

  })
};
const httpOptionslogout = {
  headers: new HttpHeaders({
    // 'Headerkey': 'Oyt2kdvLa9jb4JTfWH7R38X0ASM6iq6LHVH9M9oukNuPAMxGvSKUCJcZw/b5n6td/GFozePqPeY3MflibnQuWi5b0qKPFje5hZlZZj1JBAGwJPfhWtCw1ble9npVvWUyykz3hudBi15HJPAMsYlkCoAvmlGI4SRY6o75WKQ4ej839pp3SbXoKH5YCa8lDJPnkiFy',
    'Headerkey': sessionStorage.getItem('hk'),
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'https://api.indtrack.co.in/vtsindtrackapiv1/',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

  })
};

const httpOptionslogin = {
  headers: new HttpHeaders({
    'authentication': AUTHENTICATION,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'https://api.indtrack.co.in/vtsindtrackapiv1/',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  })
};


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  encryptedidpassword: string;

  routeFlag: boolean = false;
  loginData:any;
  key:any;
  
  constructor(private http: HttpClient) { }

  LoginIdCheck(param) {
    const myObjStr = JSON.stringify(param);
    const httpOptions = {
      headers: new HttpHeaders({
        'Headerkey': '',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URL,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

      })
    };
    return this.http.post<any>(URL + 'loginidcheck', myObjStr, httpOptions)
  }

  ForgotPassword(param) {
    const myObjStr = JSON.stringify(param);
    const httpOptions = {
      headers: new HttpHeaders({
        'headerkey': '',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URL,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      })
    };
    return this.http.post<any>(URL + 'forgotpassword', myObjStr, httpOptions)
  }


  SetForgetPassword(param) {
    const myObjStr = JSON.stringify(param);
    const httpOptions = {
      headers: new HttpHeaders({
        'Headerkey': '',
        // 'Headerkey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URL,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      })
    };
    return this.http.post<any>(URL + 'setforgetpassword', myObjStr, httpOptions)
  }
  
  Login(param) {
    const myObjStr = JSON.stringify(param);

    const httpOptionslogin = {
      headers: new HttpHeaders({
        'Authorization': this.encryptedidpassword,
        // 'authentication': this.encryptedidpassword,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'https://api.indtrack.co.in/vtsindtrackapiv1/',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      })
    };

    return this.http.post<any>(URL + 'login', myObjStr, httpOptionslogin)

  }

  getCredentials(param) {
    this.encryptedidpassword = param;
    // authentcatedCredentials = this.encryptedidpassword
  }

  // developer : Dhammadeep dahiwale 
  // date : 19-12-2020
  // menus for sidear
  final_allassignmenu(param, headers) {

    const httpOptions1 = {
      headers: new HttpHeaders({
        // 'Headerkey': 'Oyt2kdvLa9jb4JTfWH7R38X0ASM6iq6LHVH9M9oukNuPAMxGvSKUCJcZw/b5n6td/GFozePqPeY3MflibnQuWi5b0qKPFje5hZlZZj1JBAGwJPfhWtCw1ble9npVvWUyykz3hudBi15HJPAMsYlkCoAvmlGI4SRY6o75WKQ4ej839pp3SbXoKH5YCa8lDJPnkiFy',
        'headerkey': headers,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URLForMenu,
        // 'Access-Control-Allow-Origin': URLForMenu,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

      })
    };

    const myObjStr = JSON.stringify(param);
    return this.http.post<any>(URLForMenu + 'final_allassignmenu', myObjStr, httpOptions1)
    // return this.http.post<any>(URLForMenu + 'final_allassignmenu', myObjStr, httpOptions1)
  }

  final_mainmenu(param, header) {
    const httpOptions2 = {
      headers: new HttpHeaders({
        // 'Headerkey': 'Oyt2kdvLa9jb4JTfWH7R38X0ASM6iq6LHVH9M9oukNuPAMxGvSKUCJcZw/b5n6td/GFozePqPeY3MflibnQuWi5b0qKPFje5hZlZZj1JBAGwJPfhWtCw1ble9npVvWUyykz3hudBi15HJPAMsYlkCoAvmlGI4SRY6o75WKQ4ej839pp3SbXoKH5YCa8lDJPnkiFy',
        'headerkey': header,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URLForMenu,
        // 'Access-Control-Allow-Origin': URLForMenu,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

      })
    };

    const myObjStr = JSON.stringify(param);
    return this.http.post<any>(URLForMenu + 'final_mainmenu', myObjStr, httpOptions2)
    // return this.http.post<any>(URLForMenu + 'final_mainmenu', myObjStr, httpOptions2)
  }


  idleLogout(param) {
    const myObjStr = JSON.stringify(param);
    const httpOptions = {
      headers: new HttpHeaders({
        'Headerkey': this.key,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URL,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      })
    }
    return this.http.post<any>(URL + 'logout', myObjStr, httpOptions)
  }
 manualLogout(param) {
    const myObjStr = JSON.stringify(param);
    const httpOptions = {
      headers: new HttpHeaders({
        'Headerkey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URL,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      })
    }
    return this.http.post<any>(URL + 'logout', myObjStr, httpOptions)
  }

  InsertOtpResetPassword(param) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Headerkey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URL,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      })
    };
    const myObjStr = JSON.stringify(param);
    return this.http.post<any>(URL + 'generateotp', myObjStr, httpOptions)
  }

  setresetpassword(param) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Headerkey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URL,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      })
    };
    const myObjStr = JSON.stringify(param);
    return this.http.post<any>(URL + 'setresetpassword', myObjStr, httpOptions)
  }

  getEncryptKey(param) {
    const myObjStr = JSON.stringify(param);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URL,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

      })
    };
    return this.http.post<any>(URL + 'encryption', myObjStr, httpOptions)
  }

  // developer : Pratiksha Gaurkar
  // date : 05-10-2021
  // api for insert otp code

  InsertOTPCode(param) {
    const myObjStr = JSON.stringify(param);
    const httpOptions = {
      headers: new HttpHeaders({
        'Headerkey': '',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'https://track.indtrack.com/vtsindtrackapiv1/',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

      })
    };
    return this.http.post<any>(URL + 'vendorinsertotpcode', myObjStr, httpOptions)
  }

}