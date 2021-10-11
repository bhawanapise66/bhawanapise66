import { URLConst } from './../../../APIService/urlconst';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { crossOrigin } from './../../../../paramcls';

const URL = new crossOrigin().geturl(); 
const headerKey = sessionStorage.getItem('hk');
const URLV3 = new URLConst().URLDemoV3;
@Injectable({
  providedIn: 'root'
})
export class DevicerequestService {

  constructor(private http: HttpClient) { }

  DeviceRequestInsertAPI(param){
    
    var headerOptions = new Headers({'Content-Type':'application/json'});
    //var headers = new HttpHeaders({ 'Headerkey':sessionStorage.getItem("headerKey") });
    var requestOptions = new RequestOptions({method : RequestMethod.Post});  
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
   
    return this.http.post<any>(URL + 'insertdevicerequest', myObjStr, httpOptions) 
       
   }      

   DeviceRequestDeleteAPI(param){
    
    var headerOptions = new Headers({'Content-Type':'application/json'});
    //var headers = new HttpHeaders({ 'Headerkey':sessionStorage.getItem("headerKey") });
    var requestOptions = new RequestOptions({method : RequestMethod.Post});  
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
   
    return this.http.post<any>(URL + 'deletedevicerequest', myObjStr, httpOptions) 
       
   }

   DeviceRequestUpdateAPI(param){
    
    var headerOptions = new Headers({'Content-Type':'application/json'});
    //var headers = new HttpHeaders({ 'Headerkey':sessionStorage.getItem("headerKey") });
    var requestOptions = new RequestOptions({method : RequestMethod.Post});  
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
   
    return this.http.post<any>(URL + 'updatedevicerequest', myObjStr, httpOptions) 
       
   }

   DeviceRequestDetailsAPI(param){
    
    var headerOptions = new Headers({'Content-Type':'application/json'});
    //var headers = new HttpHeaders({ 'Headerkey':sessionStorage.getItem("headerKey") });
    var requestOptions = new RequestOptions({method : RequestMethod.Post});  
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
   
    return this.http.post<any>(URL + 'devicerequestdetails', myObjStr, httpOptions) 
       
   }

   DeviceTypeListAPI(param){
    
    var headerOptions = new Headers({'Content-Type':'application/json'});
    //var headers = new HttpHeaders({ 'Headerkey':sessionStorage.getItem("headerKey") });
    var requestOptions = new RequestOptions({method : RequestMethod.Post});  
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
   
    return this.http.post<any>(URL + 'devicetypelist', myObjStr, httpOptions) 
       
   }

   CustomerListAPI(param){
    
    var headerOptions = new Headers({'Content-Type':'application/json'});
    //var headers = new HttpHeaders({ 'Headerkey':sessionStorage.getItem("headerKey") });
    var requestOptions = new RequestOptions({method : RequestMethod.Post});  
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

    ApproveDeviceReq(param){
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
   
    return this.http.post<any>(URLV3 + 'approveddevicerequest', myObjStr, httpOptions) 
  
   }
}
