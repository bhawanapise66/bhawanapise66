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


 const URL = new URLConst().URLDemo;
 const URLOLD = new URLConst().URLDemoOldApp;
 const headerKey = new URLConst().headerKey;
//  const URLDemoV3='https://track.indtrack.com/vtsweb/';

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
export class DevicemasterService {

  constructor(private http: HttpClient) { }


   InsertDeviceAPI(param){
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
   
    return this.http.post<any>(URL + 'insertdevice', myObjStr, httpOptions) 
   }
   UpdateDeviceAPI(param){
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
   
    return this.http.post<any>(URL + 'updatedevice', myObjStr, httpOptions) 
   }
   DeviceDetailsAPI(param){
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
 
  return this.http.post<any>(URL + 'devicedetails', myObjStr, httpOptions) 
 }
 
 DeleteDeviceAPI(param){
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
 
  return this.http.post<any>(URL + 'deletedevice', myObjStr, httpOptions) 
 }

 DeviceDropListAPI(param) {

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

  return this.http.post<any>(URL + 'devicelistforsimassign', myObjStr, httpOptions)

}

SimDropListAPI(param) {

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

  return this.http.post<any>(URL + 'simlistforsimassign', myObjStr, httpOptions)

}  

SimAssignToDeviceAPI(param) {

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

  return this.http.post<any>(URL + 'assignsimtodevice', myObjStr, httpOptions)

}

SimUnAssignToDeviceAPI(param) {

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

  return this.http.post<any>(URL + 'unassignsimtodevice', myObjStr, httpOptions)    //changedevicetosim

}
}
