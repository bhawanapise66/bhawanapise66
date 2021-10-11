import { URLConst } from './../../../APIService/urlconst';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { map, catchError, tap } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Observable, of } from 'rxjs';

const URL = new URLConst().URLDemo;
const URL3 = new URLConst().URLDemoV3;

const headerKey = sessionStorage.getItem('hk');

@Injectable({
  providedIn: 'root'
})
export class CustomervehicleService {

  constructor(private hc: HttpClient) { }

  CustomerVehicleDetailsAPI(param) {
    const myObjStr = JSON.stringify(param);

    var httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URL3,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

      })
    };
    return this.hc.post<any>(URL3 + 'customervehicledetails', myObjStr, httpOptions)
  }    

  CustomerVehicleUpdateAPI(param) {
    const myObjStr = JSON.stringify(param);

    var httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URL3,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

      })
    };
    return this.hc.post<any>(URL3 + 'updatecustomervehicle', myObjStr, httpOptions)
  }
}
