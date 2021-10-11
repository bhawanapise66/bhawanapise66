
/*
Developer 	: Aditya Londhe
Date      	: 
Description : Customer Module Api Service
Modified By:   13-11-2020
Update date :   13-11-2020
*/

import { Injectable } from '@angular/core';
//import { URLConstant } from './urlconstant';
import { URLConst } from './urlconst';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';


const URL = new URLConst().URLDemo;
const headerKey = new URLConst().headerKey;
const URLDemoV3 = 'https://track.indtrack.com/vtsweb/';    //    add this line kanchan

const URLV3 = new URLConst().URLDemoV3; //    add this line kanchan

const httpOptions = {
  headers: new HttpHeaders({
    // 'Headerkey': 'Oyt2kdvLa9jb4JTfWH7R38X0ASM6iq6LHVH9M9oukNuPAMxGvSKUCJcZw/b5n6td/GFozePqPeY3MflibnQuWi5b0qKPFje5hZlZZj1JBAGwJPfhWtCw1ble9npVvWUyykz3hudBi15HJPAMsYlkCoAvmlGI4SRY6o75WKQ4ej839pp3SbXoKH5YCa8lDJPnkiFy',
    'HeaderKey': headerKey,

    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'https://track.indtrack.com/vtsindtrackapitest/',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

  })
};

@Injectable({
  providedIn: 'root'
})
export class CustomermodelService {

  constructor(private http: HttpClient) { }

  DeleteCustomerAPI(param) {
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

    return this.http.post<any>(URL + 'deletecustomer', myObjStr, httpOptions)
  }

  UpdatecustomerEditAPI(param) {
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

    return this.http.post<any>(URL + 'updatecustomer', myObjStr, httpOptions)
  }
  CustomerDetailsAPI(param) {
    //alert('hi');
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

    return this.http.post<any>(URLDemoV3 + 'customerdetails', myObjStr, httpOptions)
  }
  InsertcustomerAPI(param) {
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

    return this.http.post<any>(URL + 'insertcustomer', myObjStr, httpOptions)
  }
  DeleteVendorAPI(param) {
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

    return this.http.post<any>(URL + 'deletecustomer', myObjStr, httpOptions)
  }

  VehicleListAPI(param) {
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

    return this.http.post<any>(URL + 'vehiclelist', myObjStr, httpOptions)
  }

  CustomerListAPI(param) {

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    //var headers = new HttpHeaders({ 'Headerkey':sessionStorage.getItem("headerKey") });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post });
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

    return this.http.post<any>(URL + 'customerlist', myObjStr, httpOptions)

  }

  AssignVehicleToCustomerAPI(param) {

    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    //var headers = new HttpHeaders({ 'Headerkey':sessionStorage.getItem("headerKey") });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post });
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

    return this.http.post<any>(URLDemoV3 + 'assignvehicletocustomer', myObjStr, httpOptions)

  }



  CustomerV3ListAPI(param) {
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
    return this.http.post<any>(URLV3 + 'customerlist', myObjStr, httpOptions)
  }

  VehicleListAPI_V3(param){
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
   
    return this.http.post<any>(URLV3 + 'vahiclelistforcustomerassign', myObjStr, httpOptions) 
   }
  




}
