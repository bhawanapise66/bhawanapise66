import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { crossOrigin } from './../../../../paramcls';

const URL = new crossOrigin().geturl(); const URLNew = new crossOrigin().getnewurl();
const URLDemoV3='https://track.indtrack.com/vtsweb/';

@Injectable({
  providedIn: 'root'
})
export class AdmindashboardService {

  constructor(private http: HttpClient) { }

  AdminDashboardCountAPI(param){
    
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
    return this.http.post<any>(URLNew + 'admindashboardcount', myObjStr, httpOptions) 
       
   } 

   AdminDashboardCustomerDetailsViewsAPI(param){
    
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
    return this.http.post<any>(URLDemoV3 + 'monthlycustomercategorydevicecount', myObjStr, httpOptions) 
       
   } 

   GetVehicleDetailsformap(param){
    //track.indtrack.com/vtsindtrackapitest
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
        return this.http.post<any>(URL + 'livevehicles', myObjStr, httpOptions)
    
      }

      GetLocationFind(param){
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
            return this.http.post<any>(URL + 'getlocation', myObjStr, httpOptions)
        
          }

          DispatchedInstalledCountAPI(param){
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
                    'Access-Control-Allow-Origin': URLDemoV3,
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
            
                  })
                };
                return this.http.post<any>(URLDemoV3 + 'installeddistatchedcount', myObjStr, httpOptions)
            
              }  

              DeviceStatisticCountAPI(param){
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
                        'Access-Control-Allow-Origin': URLNew,
                        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
                
                      })
                    };
                    return this.http.post<any>(URLNew + 'devicesstrategybarchartcount', myObjStr, httpOptions)
                
                  }         

                  PaymentStatisticCountAPI(param){
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
                            'Access-Control-Allow-Origin': URLNew,
                            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
                    
                          })
                        };
                        return this.http.post<any>(URLNew + 'paymentstratiescount', myObjStr, httpOptions)
                    
                      }
   
}
