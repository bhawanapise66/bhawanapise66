/*
Developer 	: Aditya Londhe
Date      	: 
Description : Device Module Api Service
Modified By:   04-12-2020
Update date :   04-12-2020
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
 //   'HeaderKey': headerKey,
    'HeaderKey': 'NyVmDLBRLeunbbv2iupDg0JVT13xJGRmyT34RPAMmAJEYo98FJUqeDraKRVmCCAsyrZIrQHXxIu7f/7Jn0jHpHTDt5lNealBPqGvhF7CUzJR4PAMvZ9bZLtHjAr8HHykh4w1rmgWoM6cPW26TTQ18H/A8FNie9cxzhpAtMlw4xLH3Z5VYRmGVvj2GR5Gf7u5RzZwPAM4WCnVSro5xPAM5QfNQIsdaGLDbWgjr9g89dsKZePKqfQ=',

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
export class DesignationmodelService {

  constructor(private http: HttpClient) { }

   InsertDesignationAPI(param){
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
   
    return this.http.post<any>(URL + 'insertdesignation', myObjStr, httpOptions) 
   }
   DesignationDetailsAPI(param){
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
  return this.http.post<any>(URL + 'designationdetails', myObjStr, httpOptions) 
 }
 UpdatedesignationEditAPI(param){
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
   
    return this.http.post<any>(URL + 'updatedesignation', myObjStr, httpOptions) 
   }

   DeletedesignationEditAPI(param){
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
   
    return this.http.post<any>(URL + 'deletedesignation', myObjStr, httpOptions) 
   }
}
