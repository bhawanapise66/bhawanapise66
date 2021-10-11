import { URLConst } from './../../../APIService/urlconst';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const URLV3 = new URLConst().URLDemoV3;


@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http:HttpClient) { }

  insertDriver(param) {
    const myObjStr = JSON.stringify(param);

    var httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URLV3,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

      })
    };
    return this.http.post<any>(URLV3 + 'insertdriver', myObjStr, httpOptions)

  }

  updateDriver(param) {
    const myObjStr = JSON.stringify(param);

    var httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URLV3,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      })
    };
    return this.http.post<any>(URLV3 + 'updatedriver', myObjStr, httpOptions)

  }

  deleteDriver(param) {
    const myObjStr = JSON.stringify(param);

    var httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URLV3,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

      })
    };
    return this.http.post<any>(URLV3 + 'deletedriver', myObjStr, httpOptions)

  }

  driverDetails(param) {
    const myObjStr = JSON.stringify(param);

    var httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URLV3,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

      })
    };
    return this.http.post<any>(URLV3 + 'driverdetails', myObjStr, httpOptions)

  }

  AssignVehicle(param){
    const myObjStr = JSON.stringify(param);
    var httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URLV3,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      })
    };
    return this.http.post<any>(URLV3 + 'assignvehicletodriver', myObjStr, httpOptions)
  }
}
