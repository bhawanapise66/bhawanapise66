import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { crossOrigin } from './../../../../paramcls';

const URL = new crossOrigin().geturl(); const URLNew = new crossOrigin().getnewurl();

@Injectable({
  providedIn: 'root'
})
export class DealerdashboardService {

  constructor(private http: HttpClient) { }

  DealerDashboardCountAPI(param){
    
    const myObjStr = JSON.stringify(param);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Headerkey':sessionStorage.getItem('hk'),
        'Content-Type':  'application/json',
        'Accept': 'application/json',    
        'Access-Control-Allow-Origin': URLNew,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
        
      })
    };  
    return this.http.post<any>(URLNew + 'dealerdashboardcount', myObjStr, httpOptions) 
       
   } 
}
