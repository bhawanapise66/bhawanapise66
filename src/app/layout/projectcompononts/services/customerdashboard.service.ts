import { URLConst } from './../../../APIService/urlconst';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams, HttpErrorResponse} from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { crossOrigin } from './../../../../paramcls';
//const URL = 'https://track.indtrack.com/vtsindtrackapi/';

const URL = new crossOrigin().geturl(); 

const vtsweburl='https://track.indtrack.com/vtsweb/'

const headerKey = new URLConst().headerKey;
const httpOptions = {

    headers: new HttpHeaders({
      'Headerkey':headerKey,
      'Content-Type':  'application/json',
      'Accept': 'application/json',    
      'Access-Control-Allow-Origin': URL,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
      
    })
  };

@Injectable({
  providedIn: 'root'
})
export class CustomerdashboardService {

  constructor(private http: HttpClient) { }


  

  Emergencygraphcount(param){
    
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
    return this.http.post<any>(vtsweburl + 'emergencyhourlycount', myObjStr, httpOptions) 
       
   }     

   
  EmergencyDetails(param){
    
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
    return this.http.post<any>(URL + 'emergencydetails', myObjStr, httpOptions) 
       
   }     


  CustDashboardCountAPI(param){
    
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
    return this.http.post<any>(URL + 'customerdashboard', myObjStr, httpOptions) 
       
   }     

   DeviceTypeCountAPI(param){
    
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
    return this.http.post<any>(URL + 'devicetypewisecount', myObjStr, httpOptions) 
       
   }   

   DistanceCountAPI(param){
    
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
    return this.http.post<any>(URL + 'distancecount', myObjStr, httpOptions) 
       
   }   

   DashboardAlertCountAPI(param){
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
    return this.http.post<any>(URL + 'customerdashalertcount', myObjStr, httpOptions) 
       
   }

   OverSpeedAPI(param){
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
    return this.http.post<any>(URL + 'overspeedstatus', myObjStr, httpOptions) 
       
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

          LastSevenDaysDistance(param){
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
                return this.http.post<any>(URL + 'last7daysdistancecount', myObjStr, httpOptions)
            
              } 

      
}