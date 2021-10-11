import { Injectable } from '@angular/core';
//import { URLConstant } from './urlconstant';
import { URLConst } from './urlconst';
import { HttpClient,HttpHeaders,HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';


 
 const URL = new URLConst().URLDemo;
 const URL3 = new URLConst().URLDemoV3;
const headerKey = sessionStorage.getItem('hk');

@Injectable({
  providedIn: 'root'
})
export class NetworkmodelService {

  constructor(private http: HttpClient) { }

  UpdateNetworkEditAPI(param){
    const myObjStr = JSON.stringify(param);
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Headerkey': 'Oyt2kdvLa9jb4JTfWH7R38X0ASM6iq6LHVH9M9oukNuPAMxGvSKUCJcZw/b5n6td/GFozePqPeY3MflibnQuWi5b0qKPFje5hZlZZj1JBAGwJPfhWtCw1ble9npVvWUyykz3hudBi15HJPAMsYlkCoAvmlGI4SRY6o75WKQ4ej839pp3SbXoKH5YCa8lDJPnkiFy',
        'HeaderKey': sessionStorage.getItem('hk'),
    
        'Content-Type':  'application/json',
        'Accept': 'application/json',    
        'Access-Control-Allow-Origin': 'https://track.indtrack.com/vtsindtrackapitest/',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
        
      })
    };
    return this.http.post<any>(URL3 + 'updatenetwork', myObjStr, httpOptions) 
   }
   NetworkDetailsAPI(param){
    //alert('hi');
  const myObjStr = JSON.stringify(param);
  const httpOptions = {
    headers: new HttpHeaders({
      // 'Headerkey': 'Oyt2kdvLa9jb4JTfWH7R38X0ASM6iq6LHVH9M9oukNuPAMxGvSKUCJcZw/b5n6td/GFozePqPeY3MflibnQuWi5b0qKPFje5hZlZZj1JBAGwJPfhWtCw1ble9npVvWUyykz3hudBi15HJPAMsYlkCoAvmlGI4SRY6o75WKQ4ej839pp3SbXoKH5YCa8lDJPnkiFy',
      'HeaderKey': sessionStorage.getItem('hk'),
  
      'Content-Type':  'application/json',
      'Accept': 'application/json',    
      'Access-Control-Allow-Origin': 'https://track.indtrack.com/vtsindtrackapitest/',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      
    })
  };
  return this.http.post<any>(URL + 'networkdetails', myObjStr, httpOptions) 
 }
 InsertNetworkAPI(param){
  const myObjStr = JSON.stringify(param);
  const httpOptions = {
    headers: new HttpHeaders({
      // 'Headerkey': 'Oyt2kdvLa9jb4JTfWH7R38X0ASM6iq6LHVH9M9oukNuPAMxGvSKUCJcZw/b5n6td/GFozePqPeY3MflibnQuWi5b0qKPFje5hZlZZj1JBAGwJPfhWtCw1ble9npVvWUyykz3hudBi15HJPAMsYlkCoAvmlGI4SRY6o75WKQ4ej839pp3SbXoKH5YCa8lDJPnkiFy',
      'HeaderKey': sessionStorage.getItem('hk'),
  
      'Content-Type':  'application/json',
      'Accept': 'application/json',    
      'Access-Control-Allow-Origin': 'https://track.indtrack.com/vtsindtrackapitest/',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      
    })
  };
 
  return this.http.post<any>(URL3 + 'insertnetwork', myObjStr, httpOptions) 
 }
 DeleteNetworkAPI(param){
  const myObjStr = JSON.stringify(param);
  const httpOptions = {
    headers: new HttpHeaders({
      // 'Headerkey': 'Oyt2kdvLa9jb4JTfWH7R38X0ASM6iq6LHVH9M9oukNuPAMxGvSKUCJcZw/b5n6td/GFozePqPeY3MflibnQuWi5b0qKPFje5hZlZZj1JBAGwJPfhWtCw1ble9npVvWUyykz3hudBi15HJPAMsYlkCoAvmlGI4SRY6o75WKQ4ej839pp3SbXoKH5YCa8lDJPnkiFy',
      'HeaderKey': sessionStorage.getItem('hk'),
  
      'Content-Type':  'application/json',
      'Accept': 'application/json',    
      'Access-Control-Allow-Origin': 'https://track.indtrack.com/vtsindtrackapitest/',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      
    })
  };
 
  return this.http.post<any>(URL3 + 'deletenetwork', myObjStr, httpOptions) 
 }
 
}

