import { URLConst } from './../../../APIService/urlconst';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { crossOrigin } from './../../../../paramcls';

const URL = new crossOrigin().geturl(); 
const headerKey = sessionStorage.getItem('hk');

@Injectable({
  providedIn: 'root'
})
export class RailwaydevicemanagementService {

  constructor(private http: HttpClient) { }

  DeviceManagementInsertAPI(param){
    
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
   
    return this.http.post<any>(URL + 'shortvehicleentry', myObjStr, httpOptions) 
       
   }

   DepartmentORSectionListAPI(param){
    
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
   
    return this.http.post<any>(URL + 'customerdepartmentlist', myObjStr, httpOptions) 
       
   }  

   NetworkListAPI(param){
    
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
   
    return this.http.post<any>(URL + 'networklist', myObjStr, httpOptions) 
       
   }   

   DeviceStatusListAPI(param){
    
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
   
    return this.http.post<any>(URL + 'devicestatus', myObjStr, httpOptions) 
       
   }    

   AssignToListAPI(param){
    
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
   
    return this.http.post<any>(URL + 'vehicleclasslist', myObjStr, httpOptions) 
       
   }

   GetBindTable(param){
    //track.indtrack.com/vtsindtrackapitest
       console.log("In service " + param);
       
        var headerOptions = new Headers({ 'Content-Type': 'application/json' });
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
        return this.http.post<any>(URL + 'shortlivevehicledetails', myObjStr, httpOptions)
    
      }     
      
      DeviceManagementUpdateAPI(param){
        //track.indtrack.com/vtsindtrackapitest
           console.log("In service " + param);
           
            var headerOptions = new Headers({ 'Content-Type': 'application/json' });
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
            return this.http.post<any>(URL + 'updateshortvehicleentry', myObjStr, httpOptions)
        
          }     

          DeviceManagementDeleteAPI(param){
            //track.indtrack.com/vtsindtrackapitest
               console.log("In service " + param);
               
                var headerOptions = new Headers({ 'Content-Type': 'application/json' });
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
                return this.http.post<any>(URL + 'deletevehicle', myObjStr, httpOptions)
            
              } 
}
