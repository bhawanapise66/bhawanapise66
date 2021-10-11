import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { crossOrigin } from './../../../../paramcls';

const URL = new crossOrigin().geturl(); const URLNew = new crossOrigin().getnewurl();
const URLDemoV3='https://track.indtrack.com/vtsweb/';


@Injectable({
  providedIn: 'root'
})
export class PoiassignService {

  constructor(private http: HttpClient) { }

  POIAssignAPI(param){
    
    const myObjStr = JSON.stringify(param);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Headerkey':sessionStorage.getItem('hk'),
        'Content-Type':  'application/json',
        'Accept': 'application/json',    
        'Access-Control-Allow-Origin': URLDemoV3,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
        
      })
    };  
    return this.http.post<any>(URLDemoV3 + 'assignpoitovehiclewithroute', myObjStr, httpOptions) 
       
   }   

   VehicleListAPI(param){
    
    const myObjStr = JSON.stringify(param);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Headerkey':sessionStorage.getItem('hk'),
        'Content-Type':  'application/json',
        'Accept': 'application/json',    
        'Access-Control-Allow-Origin': URLDemoV3,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
        
      })
    };  
    return this.http.post<any>(URLDemoV3 + 'customervehiclelistv1', myObjStr, httpOptions) 
       
   } 
}
