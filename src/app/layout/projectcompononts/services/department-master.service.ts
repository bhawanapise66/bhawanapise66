import { URLConst } from './../../../APIService/urlconst';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { map, catchError, tap } from 'rxjs/operators';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Observable, of } from 'rxjs';

const URL = new URLConst().URLDemo;const URL3 = new URLConst().URLDemoV3;

const headerKey = sessionStorage.getItem('hk');

// const httpOptions = {
//   headers: new HttpHeaders({
//     'HeaderKey': headerKey,
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     'Access-Control-Allow-Origin': 'http://track.indtrack.com/vtsindtrackapitest/',
//     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
//     'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
//   })
// };




@Injectable({
  providedIn: 'root'
})
export class DepartmentMasterService {

  constructor(private http: HttpClient) { }


  DepartmentDetails(param) {
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
    return this.http.post<any>(URL3 + 'departmentdetails', myObjStr, httpOptions)

  }

  InsertDepartment(param) {
    const myObjStr = JSON.stringify(param);
    // console.log("In service " + param);
    // console.log("In service  2 " + myObjStr);
    // var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    // var requestOptions = new RequestOptions({ method: RequestMethod.Post });
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
    return this.http.post<any>(URL3 + 'insertdepartment', myObjStr, httpOptions)
  }

  UpdateDepartment(param) {
    const myObjStr = JSON.stringify(param);
    // console.log("In service " + param);
    // console.log("In service  2 " + myObjStr);
    // var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    // var requestOptions = new RequestOptions({ method: RequestMethod.Post });
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
    return this.http.post<any>(URL3 + 'updatedepartment', myObjStr, httpOptions)
  }

  DeleteDepartment(param) {
    const myObjStr = JSON.stringify(param);
    // console.log("In service " + param);
    // console.log("In service  2 " + myObjStr);
    // var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    // var requestOptions = new RequestOptions({ method: RequestMethod.Post });
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
    return this.http.post<any>(URL3 + 'deletedepartment', myObjStr, httpOptions)
  }

  DesignationDetails(param) {
    const myObjStr = JSON.stringify(param);
    // console.log("In service " + param);
    // console.log("In service  2 " + myObjStr);
    // var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    // var requestOptions = new RequestOptions({ method: RequestMethod.Post });
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

  divisionList(param){
    const myObjStr = JSON.stringify(param);
    // console.log("In service " + param);
    // console.log("In service  2 " + myObjStr);
    // var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    // var requestOptions = new RequestOptions({ method: RequestMethod.Post });
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
    return this.http.post<any>(URL + 'customerdivisionlist', myObjStr, httpOptions)
  }

  SubDivisionListApi(param){
    const myObjStr = JSON.stringify(param);
    // console.log("In service " + param);
    // console.log("In service  2 " + myObjStr);
    // var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    // var requestOptions = new RequestOptions({ method: RequestMethod.Post });
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
    return this.http.post<any>(URL + 'customersubdivisionlist', myObjStr, httpOptions)
  }
}
