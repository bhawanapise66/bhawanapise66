import { RequestOptions, RequestMethod } from '@angular/http';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URLConst } from './../../../APIService/urlconst';
import { Injectable } from '@angular/core';



const URL = new URLConst().URLDemo;



@Injectable({
  providedIn: 'root'
})
export class PageandtipsService {

  constructor(private http: HttpClient) { }


  FormEntryofPage(param) {
    const myObjStr = JSON.stringify(param);
    const httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://track.indtrack.com/vtsindtrackapitest/',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      })
    }; return this.http.post<any>(URL + 'formentry', myObjStr, httpOptions)
  }

  FormDetailsofPage(param) {
    const myObjStr = JSON.stringify(param);
    const httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://track.indtrack.com/vtsindtrackapitest/',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      })
    }; return this.http.post<any>(URL + 'formdetails', myObjStr, httpOptions)
  }

  UpdateFormEntryofPage(param) {
    const myObjStr = JSON.stringify(param);
    const httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://track.indtrack.com/vtsindtrackapitest/',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      })
    }; return this.http.post<any>(URL + 'updateformentry', myObjStr, httpOptions)
  }

  DeleteFormEntryofPage(param) {
    const myObjStr = JSON.stringify(param);
    const httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://track.indtrack.com/vtsindtrackapitest/',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      })
    }; return this.http.post<any>(URL + 'deleteformentry', myObjStr, httpOptions)
  }

  InsertTip(param) {
    const myObjStr = JSON.stringify(param);
    const httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://track.indtrack.com/vtsindtrackapitest/',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      })
    }; var requestOptions = new RequestOptions({ method: RequestMethod.Post });
    return this.http.post<any>(URL + 'inserttips', myObjStr, httpOptions)
  }

  updatetips(param) {
    const myObjStr = JSON.stringify(param);
    const httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://track.indtrack.com/vtsindtrackapitest/',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      })
    }; return this.http.post<any>(URL + 'updatetips', myObjStr, httpOptions)
  }

  deletetips(param) {
    const myObjStr = JSON.stringify(param);
    const httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://track.indtrack.com/vtsindtrackapitest/',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      })
    }; return this.http.post<any>(URL + 'deletetips', myObjStr, httpOptions)
  }

  tipsdetails(param) {
    const myObjStr = JSON.stringify(param);
    const httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://track.indtrack.com/vtsindtrackapitest/',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      })
    }; return this.http.post<any>(URL + 'tipsdetails', myObjStr, httpOptions)
  }
}
