import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { crossOrigin } from './../../../../paramcls';

const URL = new crossOrigin().geturl(); const URLNew = new crossOrigin().getnewurl();
const URLDemoV3='https://track.indtrack.com/vtsweb/';

@Injectable({
  providedIn: 'root'
})
export class DispatchedinstalledService {

  constructor(private http: HttpClient) { }

  DeviceDropListAPI(param) {

    const myObjStr = JSON.stringify(param);
  
    var httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URLDemoV3,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  
      })
    };
  
    return this.http.post<any>(URLDemoV3 + 'devicelistforsimassign', myObjStr, httpOptions)
  
  }
  
  SimDropListAPI(param) {
  
    const myObjStr = JSON.stringify(param);
  
    var httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URLDemoV3,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  
      })
    };
  
    return this.http.post<any>(URLDemoV3 + 'simlist', myObjStr, httpOptions)
  
  }   

  InsertDeviceDispatchedAPI(param) {
  
    const myObjStr = JSON.stringify(param);
  
    var httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URLDemoV3,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  
      })
    };
  
    return this.http.post<any>(URLDemoV3 + 'insertdivicedispatch', myObjStr, httpOptions)
  
  }    

  DetailsDeviceDispatchedAPI(param) {
  
    const myObjStr = JSON.stringify(param);
  
    var httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URLDemoV3,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  
      })
    };
  
    return this.http.post<any>(URLDemoV3 + 'devicedispatchdetails', myObjStr, httpOptions)
  
  }

  UpdateDeviceDispatchedAPI(param) {
  
    const myObjStr = JSON.stringify(param);
  
    var httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URLDemoV3,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  
      })
    };
  
    return this.http.post<any>(URLDemoV3 + 'updatedivicedispatch', myObjStr, httpOptions)
  
  } 

  DeleteDeviceDispatchedAPI(param) {
  
    const myObjStr = JSON.stringify(param);
  
    var httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URLDemoV3,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  
      })
    };
  
    return this.http.post<any>(URLDemoV3 + 'deletedivicedispatch', myObjStr, httpOptions)
  
  } 
}
