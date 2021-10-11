import { Observable } from 'rxjs';
/*
Developer 	: Aditya Londhe
Date      	: 9-12-2020
Description : Vehicleinstallation Api Service
Modified By:  
Update date : 
*/

import { Injectable } from '@angular/core';
import { URLConst } from './urlconst';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';


const URL = new URLConst().URLDemo;
const URL2 = new URLConst().URLDemoV3;
const headerKey = new URLConst().headerKey;
//const URL = 'https://api.indtrack.co.in/myjourneywebadminapi/';

const httpOptions = {
  headers: new HttpHeaders({
    // 'Headerkey': 'Oyt2kdvLa9jb4JTfWH7R38X0ASM6iq6LHVH9M9oukNuPAMxGvSKUCJcZw/b5n6td/GFozePqPeY3MflibnQuWi5b0qKPFje5hZlZZj1JBAGwJPfhWtCw1ble9npVvWUyykz3hudBi15HJPAMsYlkCoAvmlGI4SRY6o75WKQ4ej839pp3SbXoKH5YCa8lDJPnkiFy',
    // 'HeaderKey':'Oyt2kdvLa9jb4JTfWH7R38X0ASM6iq6LHVH9M9oukNuPAMxGvSKUCJcZw/b5n6td/GFozePqPeY3MflibnQuWi5b0qKPFje5hZlZZj1JBAGwJPfhWtCw1ble9npVvWUyykro4P4pGNDFzqi46jszvRZoXe/Ql5jQFL3/czH8ybtsanyAYl29qvFM34olHGIfvPAM',
    // 'HeaderKey':'5muvwIK4JvH5FBvKekfg8JzxOnRYQx6VugoZ4O4bxBzLqJxWZXEBm9P/j9zRbtMjKIfoQUfq4K6mNl6fxD19NxvtcPAMTOxxsIGwH2RvwVeCdkKvGriQI1X6qr5XC2AB1DIa0WKDBB7B/HjZdPcsKqJbUtKzdidF8DKP8dSQPAMeh7Rnu/TIKjH8MSYSvmgZ4paS',
    'headerkey': headerKey,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': URL,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

  })
};

@Injectable({
  providedIn: 'root'
})
export class VehicleinstallationService {

  constructor(private http: HttpClient) { }

  InsertVehicleInstallationAPI(param) {
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

    return this.http.post<any>(URL + 'vehicleinstallation', myObjStr, httpOptions)
  }

  UpdateVehicleInstallationAPI(param) {
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

    return this.http.post<any>(URL + 'updatevehicle', myObjStr, httpOptions)
  }

  VehicleInstallationDetails(param) {
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

    return this.http.post<any>(URL + 'vehicledetails', myObjStr, httpOptions)
  }

  pushFileToStorage(file: File, pageId, PageName, PageUrl, applicationid):
    Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();


    // formdata.append('file', file.name);
    // formdata.append('file-format',file.type);
    formdata.append('file', file);
    formdata.append('headerkey', headerKey);
    formdata.append('pageID', pageId);
    formdata.append('pageName', PageName);
    formdata.append('pageUrl', PageUrl);
    formdata.append('applicationId', applicationid);


    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'multipart/form-data');


    // var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    let req;
    this.http.post(URL + 'bulkinsertvehicle', formdata).subscribe(
      data => {
        console.log(formdata)
        console.log("POST Request is successfull", data);
        // req = data; alert(JSON.stringify(req));
      },
      error => {
        console.log("Error", error);
      });
    // return this.http.request(req);

    return this.http.post<any>(`${URL}bulkinsertvehicle`, formdata)
  }

  DeleteVehiceInstallationAPI(param) {
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

    return this.http.post<any>(URL + 'deletevehicle', myObjStr, httpOptions)
  }

  BlockVehiceInstallationAPI(param) {
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

    return this.http.post<any>(URL + 'blockunblockvehicle', myObjStr, httpOptions)
  }

  VehicleStatusDetails(param) {
    const myObjStr = JSON.stringify(param);
    var httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URL,
        'Access-Control-Allow-Methods': 'GET, POST,  PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

      })
    };

    return this.http.post<any>(URL + 'vehicledetails', myObjStr, httpOptions)
  }

  VehicleStatusTranslogDetails(param) {
    const myObjStr = JSON.stringify(param);
    var httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URL2,
        'Access-Control-Allow-Methods': 'GET, POST,  PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

      })
    };

    return this.http.post<any>(URL2 + 'devicevehicletranslog', myObjStr, httpOptions)
  }
  vehicleRenewal(param) {
    const myObjStr = JSON.stringify(param);
    var httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URL2,
        'Access-Control-Allow-Methods': 'GET, POST,  PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

      })
    };

    return this.http.post<any>(URL2 + 'renewalvehicle', myObjStr, httpOptions)
  }

  VehicleIconDetailsAPI(param) {

    const myObjStr = JSON.stringify(param);
    var httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URL2,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      })
    };
    return this.http.post<any>(URL2 + 'vehicleicondetails', myObjStr, httpOptions)
  }

  VehicleIconDeleteAPI(param) {
    const myObjStr = JSON.stringify(param);
    var httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URL2,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      })
    };
    return this.http.post<any>(URL2 + 'deletevehicleicon', myObjStr, httpOptions)
  }


  VehicleIconUpdateAPI(param) {

    const myObjStr = JSON.stringify(param);
    var httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URL2,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      })
    };
    return this.http.post<any>(URL2 + 'updatevehicleicon', myObjStr, httpOptions)
  }



  //  new installation apis
  InsertVehicleInstallationAPIV3(param) {
    const myObjStr = JSON.stringify(param);
    var httpOptions = {
      headers: new HttpHeaders({
        'HeaderKey': sessionStorage.getItem('hk'),
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': URL2,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

      })
    };

    return this.http.post<any>(URL2 + 'vehicleinstallation', myObjStr, httpOptions)
  }



}
