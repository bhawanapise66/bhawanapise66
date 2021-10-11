/*
Developer 	: Aditya Londhe
Date      	: 
Description : Dealer Module Api Service
Modified By:   13-11-2020
Update date :   27-11-2020
*/

import { Injectable } from '@angular/core';
import { URLConst } from './urlconst';
import { HttpClient,HttpHeaders,HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';


//const URL = 'http://192.168.0.127:8080/PersonalTrackingAPI/';
//const URL = 'http://localserver:8080/aisangularappapi/';
//const URL = 'https://api.indtrack.co.in/aisangularappapi_v1/';
//const URL = 'http://api.indtrack.co.in/personaltrackingapiangular/';

 const URL = new URLConst().URLDemo;
 const headerKey = new URLConst().headerKey;

 //const URL = 'https://track.indtrack.com/vtsindtrackapitest/';
//const URL = 'https://api.indtrack.co.in/myjourneywebadminapi/';
// console.log(URL);
const httpOptions = {
  headers: new HttpHeaders({
    // 'Headerkey': 'Oyt2kdvLa9jb4JTfWH7R38X0ASM6iq6LHVH9M9oukNuPAMxGvSKUCJcZw/b5n6td/GFozePqPeY3MflibnQuWi5b0qKPFje5hZlZZj1JBAGwJPfhWtCw1ble9npVvWUyykz3hudBi15HJPAMsYlkCoAvmlGI4SRY6o75WKQ4ej839pp3SbXoKH5YCa8lDJPnkiFy',
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
export class DealermodelService {

  constructor(private http: HttpClient) { }

  UpdatedealerEditAPI(param){
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
   
    return this.http.post<any>(URL + 'updatedealer', myObjStr, httpOptions) 
   }
   InsertdealerEditAPI(param){
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
   
    return this.http.post<any>(URL + 'insertdealer', myObjStr, httpOptions) 
   }
   DealerDetailsAPI(param){
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
 
  return this.http.post<any>(URL + 'dealerdetails', myObjStr, httpOptions) 
 }
 DeleteDealerAPI(param){
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
 
  return this.http.post<any>(URL + 'deletedealer', myObjStr, httpOptions) 
 }

}
