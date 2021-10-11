/*
Developer 	: Aditya Londhe
Date      	: 
Description : PlaceOrderModel Api Service
Modified By:  13-11-2020
Update date : 17-11-2020
*/

import { Injectable } from '@angular/core';
import { URLConst } from './urlconst';
import { HttpClient,HttpHeaders,HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';


const URL = new URLConst().URLDemo;
const URL3 = new URLConst().URLDemoV3; 
const headerKey = new URLConst().headerKey;
//const URL = 'https://api.indtrack.co.in/myjourneywebadminapi/';

const httpOptions = {
  headers: new HttpHeaders({
    // 'Headerkey': 'Oyt2kdvLa9jb4JTfWH7R38X0ASM6iq6LHVH9M9oukNuPAMxGvSKUCJcZw/b5n6td/GFozePqPeY3MflibnQuWi5b0qKPFje5hZlZZj1JBAGwJPfhWtCw1ble9npVvWUyykz3hudBi15HJPAMsYlkCoAvmlGI4SRY6o75WKQ4ej839pp3SbXoKH5YCa8lDJPnkiFy',
   // 'HeaderKey':'Oyt2kdvLa9jb4JTfWH7R38X0ASM6iq6LHVH9M9oukNuPAMxGvSKUCJcZw/b5n6td/GFozePqPeY3MflibnQuWi5b0qKPFje5hZlZZj1JBAGwJPfhWtCw1ble9npVvWUyykro4P4pGNDFzqi46jszvRZoXe/Ql5jQFL3/czH8ybtsanyAYl29qvFM34olHGIfvPAM',
   // 'HeaderKey':'5muvwIK4JvH5FBvKekfg8JzxOnRYQx6VugoZ4O4bxBzLqJxWZXEBm9P/j9zRbtMjKIfoQUfq4K6mNl6fxD19NxvtcPAMTOxxsIGwH2RvwVeCdkKvGriQI1X6qr5XC2AB1DIa0WKDBB7B/HjZdPcsKqJbUtKzdidF8DKP8dSQPAMeh7Rnu/TIKjH8MSYSvmgZ4paS',
   'HeaderKey': headerKey,
   'Content-Type':  'application/json',
    'Accept': 'application/json',    
    'Access-Control-Allow-Origin': 'https://track.indtrack.com/vtsindtrackapitest/',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    
  })
};
@Injectable({
  providedIn: 'root'
})
export class NewUserCreationModelService {

  constructor(private http: HttpClient) { }

  InsertNewusercreationAPI(param){
    const myObjStr = JSON.stringify(param);
    var httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URL,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

      })
    };
   
    return this.http.post<any>(URL + 'insertuser', myObjStr, httpOptions) 
   }
   UserCreationDetailsAPI(param){
    //alert('hi');
    const myObjStr = JSON.stringify(param);
    var httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URL,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

      })
    };
 
  return this.http.post<any>(URL + 'userdetails', myObjStr, httpOptions) 
 }
 UpdateNewusercreationAPI(param){
  const myObjStr = JSON.stringify(param);
    var httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URL,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

      })
    };
 
  return this.http.post<any>(URL + 'updateuser', myObjStr, httpOptions) 
 }
 DeleteNewusercreationAPI(param){
  const myObjStr = JSON.stringify(param);
    var httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URL,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

      })
    };
 
  return this.http.post<any>(URL + 'deleteuser', myObjStr, httpOptions) 
 }

 VehicleAssigntoUserAPI(param){
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
 
  return this.http.post<any>(URL3 + 'assignvehicletouser', myObjStr, httpOptions) 
 }

 VehicleAssigntoUserDetailAPI(param){
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
 
  return this.http.post<any>(URL3 + 'uservehicledetails', myObjStr, httpOptions) 
 }
}
