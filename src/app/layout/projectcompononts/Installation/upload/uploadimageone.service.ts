import { URLConst } from './../../../../APIService/urlconst';
//import { Injectable } from '@angular/core';
//import { HttpClient,} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
/*
Developer 	: Aditya Londhe
Date      	: 9-12-2020
Description : Vehicleinstallation Api Service
Modified By:  
Update date : 
*/

import { Injectable } from '@angular/core';
//import { URLConst } from '../urlconst';

import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

const URLDemoV3='https://track.indtrack.com/vtsweb/';

//const URL = 'http://192.168.0.127:8080/PersonalTrackingAPI/';
//const URL = 'http://localserver:8080/aisangularappapi/';
//const URL = 'https://api.indtrack.co.in/aisangularappapi_v1/';
//const URL = 'http://api.indtrack.co.in/personaltrackingapiangular/';
//const URL = 'https://track.indtrack.com/vtsindtrackapi/';
const URL = new URLConst().URLDemo;
const URl2 = new URLConst().URLDemoV3;
//const URL = 'https://api.indtrack.co.in/myjourneywebadminapi/';
//const headerKey = sessionStorage.getItem('hk');
const httpOptions = {
  headers: new HttpHeaders({
    'HeaderKey': sessionStorage.getItem('hk'),
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'https://track.indtrack.com/vtsindtrackapitest/',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'

  })
};

@Injectable({
  providedIn: 'root'
})
export class UploadimageoneService {

  stringifiedData: any; parsedJson: any; simdata$: any;

  constructor(private http: HttpClient, private router: Router) { }

  InsertVehicleInstallationAPI(param) {
    const myObjStr = JSON.stringify(param);
    //console.log("In service " + param);
    //console.log("In service  2 " + myObjStr);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    //   var headers={
    //     headers: new HttpHeaders({
    //         'Content-Type': 'application/json'
    //     })
    // }
    var requestOptions = new RequestOptions({ method: RequestMethod.Post });

    return this.http.post<any>(URL + 'vehicleinstallation', myObjStr + this.demoone, httpOptions)
  }
  trackerid:any;
  demoone: any;
  data1: string; data2: string; data3: string; data4: string; data5: string;
  data6: string; data7: string; data8: string; data9: string; data10: string;
  data11: string; data12: string; data13: string; data14: string; data15: string;
  data16: string; data17: string; data18: string; data19: string; data20: string;
  data21: string; data22: string; data23: string; data24: string; data25: string;
  data26: string; data27: string; data28: string; data29: string;
  pushFileToStorage(file: File, file2: File, file3: File, param): Observable<HttpEvent<{}>> {
    // this.demoone = JSON.stringify(param);
    this.data1 = param.param1;
    //  this.data1 = this.demoone.param1;
    this.data2 = param.param2;
    this.data3 = param.param3;
    this.data4 = param.param4;
    this.data5 = param.param5;
    this.data6 = param.param6;
    this.data7 = param.param7;
    this.data8 = param.param8;
    this.data9 = param.param9;
    this.data10 = param.param10;
    this.data11 = param.param11;
    this.data12 = param.param12;
    this.data13 = param.param13;
    this.data14 = param.param14;
    this.data15 = param.param15;
    this.data16 = param.param16;
    this.data17 = param.param17;
    this.data18 = param.param18;
    this.data19 = param.param19;
    this.data20 = param.param20;
    this.data21 = param.param21;
    this.data22 = param.param22;
    this.data23 = param.param23;
    this.data24 = param.param24;
    this.data25 = param.param25;
    this.data26 = param.param26;
    this.data27 = param.param27;
    this.data28 = param.param28;
    this.data29 = param.param29;





    const formdata: FormData = new FormData();

    var data1 = sessionStorage.getItem("selectdevicetype");


    //  formdata.append('file', filePath.name);
    //  formdata.append('file-format', filePath.type);
    formdata.append('headerkey', sessionStorage.getItem('hk'));
    //  formdata.append('file1',file);
    //  formdata.append('file2',file2);
    //  formdata.append('file3',file3);
    formdata.append('param1', this.data1);
    formdata.append('param2', this.data2);
    formdata.append('param3', this.data3);
    formdata.append('param4', this.data4);
    formdata.append('param5', this.data5);
    formdata.append('param6', this.data6);
    formdata.append('param7', this.data7);
    formdata.append('param8', this.data8);
    formdata.append('param9', this.data9);
    formdata.append('param10', this.data10);
    formdata.append('param11', this.data11);
    formdata.append('param12', this.data12);
    formdata.append('param13', this.data13);
    formdata.append('param14', this.data14);
    formdata.append('param15', this.data15);
    formdata.append('param16', this.data16);
    formdata.append('param17', this.data17);
    formdata.append('param18', file);
    formdata.append('param19', file2);
    formdata.append('param20', file3);
    formdata.append('param21', this.data21);
    formdata.append('param22', this.data22);
    formdata.append('param23', this.data23);
    formdata.append('param24', this.data24);
    formdata.append('param25', this.data25);
    formdata.append('param26', this.data26);
    formdata.append('param27', this.data27);
    formdata.append('param28', this.data28);
    formdata.append('param29', this.data29);



    //formdata.append('imagetype', 'vehicleRenewal');
    // 'headerkey='+headerKey+'&refid='+data1+ '&imagetype=vehicleRenewal'

    let headersdemo = new Headers();
    this.demoone = formdata;
    headersdemo.append('Content-Type', 'multipart/form-data');
    // headersdemo.append('Content-Type','application/json');
    headersdemo.append('Accept', 'application/json');
    // alert(this.demoone);
    // var headerOptions = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({ headers: headersdemo });
    let req;
    this.http.post(URL + 'vehicleinstallation', formdata).subscribe(
      data => {
        console.log("POST Request is successfull ", data);

        req = data;
        // alert(req);

      },
      error => {

        console.log("Error", error);

      }

    );

    /* const req1 = new HttpRequest('POST', URL + 'uploaddevice', formdata, {
      reportProgress: true
    });
 */
    return this.http.request(req);
    // return this.http.post<any>(URL + 'uploadimage?' + 'headerkey='+headerKey+'&refid='+data1+ '&imagetype=vehicleRenewal',formdata)

    // return this.http.request(req);
  }

  /* Developer : Aditya Londhe 
     Discription : Update of vehicle installation with file upload
     Update : 
     Date : 2-8-2021*/



  pushFileToStorageupdate(file: File, file2: File, file3: File, param): Observable<HttpEvent<{}>> {
    // this.demoone = JSON.stringify(param);
    this.data1 = param.param1;
    //  this.data1 = this.demoone.param1;
    this.data2 = param.param2;
    this.data3 = param.param3;
    this.data4 = param.param4;
    this.data5 = param.param5;
    this.data6 = param.param6;
    this.data7 = param.param7;
    this.data8 = param.param8;
    this.data9 = param.param9;
    this.data10 = param.param10;
    this.data11 = param.param11;
    this.data12 = param.param12;
    this.data13 = param.param13;
    this.data14 = param.param14;
    this.data15 = param.param15;
    this.data16 = param.param16;
    this.data17 = param.param17;
    this.data18 = param.param18;
    this.data19 = param.param19;
    this.data20 = param.param20;
    this.data21 = param.param21;
    this.data22 = param.param22;
    this.data23 = param.param23;
    this.data24 = param.param24;
    this.data25 = param.param25;
    this.data26 = param.param26;
    this.data27 = param.param27;
    this.data28 = param.param28;
    this.data29 = param.param29;





    const formdata: FormData = new FormData();

    var data1 = sessionStorage.getItem("selectdevicetype");


    //  formdata.append('file', filePath.name);
    //  formdata.append('file-format', filePath.type);
    formdata.append('headerkey', sessionStorage.getItem('hk'));
    //  formdata.append('file1',file);
    //  formdata.append('file2',file2);
    //  formdata.append('file3',file3);
    formdata.append('param1', this.data1);
    formdata.append('param2', this.data2);
    formdata.append('param3', this.data3);
    formdata.append('param4', this.data4);
    formdata.append('param5', this.data5);
    formdata.append('param6', this.data6);
    formdata.append('param7', this.data7);
    formdata.append('param8', this.data8);
    formdata.append('param9', this.data9);
    formdata.append('param10', this.data10);
    formdata.append('param11', this.data11);
    formdata.append('param12', this.data12);
    formdata.append('param13', this.data13);
    formdata.append('param14', this.data14);
    formdata.append('param15', this.data15);
    formdata.append('param16', this.data16);
    formdata.append('param17', this.data17);
    formdata.append('param18', file);
    formdata.append('param19', file2);
    formdata.append('param20', file3);
    formdata.append('param21', this.data21);
    formdata.append('param22', this.data22);
    formdata.append('param23', this.data23);
    formdata.append('param24', this.data24);
    formdata.append('param25', this.data25);
    formdata.append('param26', this.data26);
    formdata.append('param27', this.data27);
    formdata.append('param28', this.data28);
    formdata.append('param29', this.data29);



    //formdata.append('imagetype', 'vehicleRenewal');
    // 'headerkey='+headerKey+'&refid='+data1+ '&imagetype=vehicleRenewal'

    let headersdemo = new Headers();
    this.demoone = formdata;
    headersdemo.append('Content-Type', 'multipart/form-data');
    headersdemo.append('Accept', 'application/json');
    //alert(this.demoone);
    // var headerOptions = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({ headers: headersdemo });
    let req;
    this.http.post(URL + 'updatevehicle', formdata).subscribe(
      data => {
        console.log("POST Request is successfull ", data);

        req = data;
        // alert(req);

      },
      error => {

        console.log("Error", error);

      }

    );

    /* const req1 = new HttpRequest('POST', URL + 'uploaddevice', formdata, {
      reportProgress: true
    });
 */
    return this.http.request(req);
    // return this.http.post<any>(URL + 'uploadimage?' + 'headerkey='+headerKey+'&refid='+data1+ '&imagetype=vehicleRenewal',formdata)

    // return this.http.request(req);
  }





  demoonebulk: any;
  databulk1: string; databulk2: string; databulk3: string; databulk4: string; databulkpageID: string; databulkpageName: string; databulkpageURL: string;
  pushBulkExcelFileToStorage(file: File, param): Observable<HttpEvent<{}>> {
    /* --------------
    Developer : Aditya Londhe 
    Changes : Addded Random Value Code of Application ID 
    Dated on: 18-12-2020
    updateed date: 18-12-2020  
    ------------------------- */
    function getRandoms(numPicks) {
      var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      var selections = [];

      // randomly pick one from the array
      for (var i = 0; i < numPicks; i++) {
        var index = Math.floor(Math.random() * nums.length);
        selections.push(nums[index]);
        nums.splice(index, 1);
      }
      return (selections);
    }


    var results = getRandoms(8);
    var output = results.join("");
    console.log("the random value is" + output);



    // this.demoone = JSON.stringify(param);
    this.databulk1 = param.param1;
    //  this.data1 = this.demoone.param1;
    this.databulk2 = param.param2;
    this.databulk3 = param.param3;
    this.databulk4 = param.param18;
    this.databulkpageID = param.pageID;
    this.databulkpageName = param.pageName;
    this.databulkpageURL = param.pageURL;
    const formdata: FormData = new FormData();

    var data1 = sessionStorage.getItem("selectdevicetype");


    //  formdata.append('file', filePath.name);
    //  formdata.append('file-format', filePath.type);


    //  formdata.append('file2',file2);
    //  formdata.append('file3',file3);
    formdata.append('param1', this.databulk1);
    formdata.append('param2', this.databulk2);
    formdata.append('param3', this.databulk3);
    formdata.append('param18', this.databulk4);
    formdata.append('file', file);
    formdata.append('headerkey', sessionStorage.getItem('hk'));
    formdata.append('pageID', this.databulkpageID);
    formdata.append('pageName', this.databulkpageName);
    formdata.append('pageURL', this.databulkpageURL);
    formdata.append('applicationId', output);



    //formdata.append('imagetype', 'vehicleRenewal');
    // 'headerkey='+headerKey+'&refid='+data1+ '&imagetype=vehicleRenewal'

    let headersdemo = new Headers();
    this.demoonebulk = formdata;
    headersdemo.append('Content-Type', 'multipart/form-data');
    headersdemo.append('Accept', 'application/json');
    // alert(this.demoonebulk);
    // var headerOptions = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({ headers: headersdemo });
    let req;
    this.http.post(URL + 'bulkinsertdevice', formdata).subscribe(
      data => {

        console.log("POST Request is successfull ", data);

        req = data;
        // alert(req);

      },
      error => {

        console.log("Error", error);

      }

    );

    /* const req1 = new HttpRequest('POST', URL + 'uploaddevice', formdata, {
      reportProgress: true
    });
 */
    // return this.http.request(req);
    // return this.http.post<any>(URL + 'uploadimage?' + 'headerkey='+headerKey+'&refid='+data1+ '&imagetype=vehicleRenewal',formdata)
    return this.http.post<any>(`${URL}bulkinsertdevice`, formdata)

  }


  /*
  Developer 	: Aditya Londhe
  Date      	: 9-12-2020
  Description : Vehicleinstallation Api Service
  Modified By:  Aditya Londhe.... call single Upload image api then after call form data api
  Update date : 9-2-2021
  */

  Vehicle_cust_idpushFile(file: File, param): Observable<HttpEvent<{}>> {
    this.data1 = param.param1;
    //  this.data1 = this.demoone.param1;
    this.data2 = param.param2;
    const formdata: FormData = new FormData();

    var data1 = sessionStorage.getItem("selectdevicetype");


    //  formdata.append('file', filePath.name);
    //  formdata.append('file-format', filePath.type);
    formdata.append('headerkey', sessionStorage.getItem('hk'));
    formdata.append('param3', file);
    formdata.append('param1', param.param1);
    formdata.append('param2', param.param2);
    //  formdata.append('param1',"");
    // formdata.append('param2',"");
    //formdata.append('refid', data1);
    //formdata.append('imagetype', 'vehicleRenewal');
    // 'headerkey='+headerKey+'&refid='+data1+ '&imagetype=vehicleRenewal'
    console.log('in service : param1 = ' + param.param1 + " param2 = " + param.param2)
    let headersdemo = new Headers();

    headersdemo.append('Content-Type', 'multipart/form-data');
    headersdemo.append('Accept', 'application/json');
    // var headerOptions = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({ headers: headersdemo });
    let req;
    // this.http.post(URL + 'uploadfile', formdata).subscribe(
    //   data => {
    //     console.log("POST Request is successfull ", data);

    //     req = data;

    //   },
    //   error => {

    //     console.log("Error", error);

    //   }

    // );

    /* const req1 = new HttpRequest('POST', URL + 'uploaddevice', formdata, {
      reportProgress: true
    });
 */
    return this.http.post<any>(`${URL}uploadfile`, formdata)

    // return this.http.post<any>(URL + 'uploadimage?' + 'headerkey='+headerKey+'&refid='+data1+ '&imagetype=vehicleRenewal',formdata)

    // return this.http.request(req);
  }


  pushFileToStorage2(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    var data1 = sessionStorage.getItem("selectdevicetype");


    //  formdata.append('file', filePath.name);
    //  formdata.append('file-format', filePath.type);
    formdata.append('headerkey', sessionStorage.getItem('hk'));
    formdata.append('file1', file);
    formdata.append('param1', "");
    formdata.append('param2', "");
    //formdata.append('refid', data1);
    //formdata.append('imagetype', 'vehicleRenewal');
    // 'headerkey='+headerKey+'&refid='+data1+ '&imagetype=vehicleRenewal'

    let headersdemo = new Headers();

    headersdemo.append('Content-Type', 'multipart/form-data');
    headersdemo.append('Accept', 'application/json');
    // var headerOptions = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({ headers: headersdemo });
    let req;
    this.http.post(URL + 'vehicleinstallation2', formdata).subscribe(
      data => {
        console.log("POST Request is successfull ", data);

        req = data;
        //  alert(req);

      },
      error => {

        console.log("Error", error);

      }

    );

    /* const req1 = new HttpRequest('POST', URL + 'uploaddevice', formdata, {
      reportProgress: true
    });
 */
    return this.http.request(req);
    // return this.http.post<any>(URL + 'uploadimage?' + 'headerkey='+headerKey+'&refid='+data1+ '&imagetype=vehicleRenewal',formdata)

    // return this.http.request(req);
  }

  pushFileToStorage3(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    var data1 = sessionStorage.getItem("selectdevicetype");


    //  formdata.append('file', filePath.name);
    //  formdata.append('file-format', filePath.type);
    formdata.append('headerkey', sessionStorage.getItem('hk'));
    formdata.append('file1', file);
    formdata.append('param1', "");
    formdata.append('param2', "");
    //formdata.append('refid', data1);
    //formdata.append('imagetype', 'vehicleRenewal');
    // 'headerkey='+headerKey+'&refid='+data1+ '&imagetype=vehicleRenewal'

    let headersdemo = new Headers();

    headersdemo.append('Content-Type', 'multipart/form-data');
    headersdemo.append('Accept', 'application/json');
    // var headerOptions = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({ headers: headersdemo });
    let req;
    this.http.post(URL + 'vehicleinstallation2', formdata).subscribe(
      data => {
        console.log("POST Request is successfull ", data);

        req = data;
        // alert(req);
        // if (data['statusType'] == 'OK') 
        // {  

        //   let resdatadrp = req['entity'];           
        //      // Convert to JSON  
        //   this.stringifiedDatadrp = JSON.stringify(resdatadrp);           
        //   // Parse from JSON  
        //   this.parsedJsondrp = JSON.parse(this.stringifiedDatadrp);
        //   let resdatadev = req['data'];  
        //   // Convert to JSON  
        //   this.devicestringifyData = JSON.stringify(this.parsedJsondrp.data);           
        //   // Parse from JSON  
        //   this.deviceparsedJson = JSON.parse(this.devicestringifyData);
        //   //this.devmupload$=this.deviceparsedJson;
        //  // alert(this.deviceparsedJson[0]["deviceSerialNo"]);
        //   sessionStorage.setItem("deviceparsedJson", this.deviceparsedJson);
        // }
      },
      error => {

        console.log("Error", error);

      }

    );

    /* const req1 = new HttpRequest('POST', URL + 'uploaddevice', formdata, {
      reportProgress: true
    });
 */
    return this.http.request(req);
    // return this.http.post<any>(URL + 'uploadimage?' + 'headerkey='+headerKey+'&refid='+data1+ '&imagetype=vehicleRenewal',formdata)

    // return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get('/getallfiles');
  }





  employeedatabulk1: string; employeedatabulkpageID: string; employeedatabulkpageName: string; employeedatabulkpageURL: string;
  EmployeeBulkExcelFileToStorage(file: File, param): Observable<HttpEvent<{}>> {
    /* --------------
    Developer : Aditya Londhe 
    Changes : Addded Random Value Code of Application ID 
    Dated on: 18-12-2020
    updateed date: 18-12-2020  
    ------------------------- */
    function getRandoms(numPicks) {
      var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      var selections = [];

      // randomly pick one from the array
      for (var i = 0; i < numPicks; i++) {
        var index = Math.floor(Math.random() * nums.length);
        selections.push(nums[index]);
        nums.splice(index, 1);
      }
      return (selections);
    }


    var results = getRandoms(8);
    var output = results.join("");
    console.log("the random value is" + output);



    // this.demoone = JSON.stringify(param);
    this.employeedatabulk1 = param.param1;
    //  this.data1 = this.demoone.param1;

    this.employeedatabulkpageID = param.pageID;
    this.employeedatabulkpageName = param.pageName;
    this.employeedatabulkpageURL = param.pageURL;
    const formdata: FormData = new FormData();

    // var data1 = sessionStorage.getItem("selectdevicetype");


    //  formdata.append('file', filePath.name);
    //  formdata.append('file-format', filePath.type);


    //  formdata.append('file2',file2);
    //  formdata.append('file3',file3);
    formdata.append('param1', this.employeedatabulk1);

    formdata.append('file', file);
    formdata.append('headerkey', sessionStorage.getItem('hk'));
    formdata.append('pageID', this.employeedatabulkpageID);
    formdata.append('pageName', this.employeedatabulkpageName);
    formdata.append('pageURL', this.employeedatabulkpageURL);
    formdata.append('applicationId', output);



    //formdata.append('imagetype', 'vehicleRenewal');
    // 'headerkey='+headerKey+'&refid='+data1+ '&imagetype=vehicleRenewal'

    let headersdemo = new Headers();
    this.demoonebulk = formdata;
    headersdemo.append('Content-Type', 'multipart/form-data');
    headersdemo.append('Accept', 'application/json');
    // alert(this.demoonebulk);
    // var headerOptions = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({ headers: headersdemo });
    let req;
    this.http.post(URL + 'bulkinsertemployee', formdata).subscribe(
      data => {

        console.log("POST Request is successfull ", data);

        req = data;
        // alert(req);

      },
      error => {

        console.log("Error", error);

      }

    );

    /* const req1 = new HttpRequest('POST', URL + 'uploaddevice', formdata, {
      reportProgress: true
    });
 */
    // return this.http.request(req);
    // return this.http.post<any>(URL + 'uploadimage?' + 'headerkey='+headerKey+'&refid='+data1+ '&imagetype=vehicleRenewal',formdata)
    return this.http.post<any>(`${URL}bulkinsertemployee`, formdata)

  }

  InsertSIMAPI(param) {
    const myObjStr = JSON.stringify(param);
    //console.log("In service " + param);
    //console.log("In service  2 " + myObjStr);
    var headerOptions = new Headers({ 'Content-Type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post });

    return this.http.post<any>(URL + 'bulkinsertsim', myObjStr + this.simdemo, httpOptions)
  }

 

  simdemo:any; networkid:string; receivedbydummy:string; courrecedtid:string; receivedby:string; permobno:string;
  vendorlistdata:string; recefrm:string; cournmid:string; courfrom:string; simtypeid:string;
  
  ByHandSIMpushFileToStorage(file : File,simparam): Observable<HttpEvent<{}>> { 
       
    this.networkid = simparam.networkid1;
    this.vendorlistdata = simparam.vendorId;
    this.receivedbydummy = simparam.deliverytype;
   
    this.courrecedtid = simparam.recivedatetime;
    this.receivedby = simparam.personename;
    this.permobno = simparam.personemobileno;    
    this.recefrm = simparam.simfrom;
    this.simtypeid = simparam.simtypeid;
   
    const formdata: FormData = new FormData();
    
    formdata.append('file', file);
    formdata.append('remarks','Ok');
    formdata.append('simtypeid',this.simtypeid);
    formdata.append('mobilenumber2','');
    formdata.append('networkid2','0');    
    formdata.append('deliverytype',this.receivedbydummy);
    formdata.append('couriername','');
    formdata.append('dispatchdatetime','');
    formdata.append('recivedatetime',this.courrecedtid);
    formdata.append('personename',this.receivedby);
    formdata.append('personemobileno',this.permobno);
    formdata.append('vehicleregno','');
    formdata.append('trackerid','');    
    formdata.append('vendorid',this.vendorlistdata);
    formdata.append('verifyBy','');
    formdata.append('companyEmpId','');
    formdata.append('headerkey', sessionStorage.getItem('hk'));    
    
    let headersdemo = new Headers();
    this.simdemo = formdata;
    //headersdemo.append('Content-Type','multipart/form-data');
    headersdemo.append('Accept','application/json');
   
    let options = new RequestOptions({headers:headersdemo});  
    let req;
    
    this.http.post(URLDemoV3 + 'insertbulksim',formdata).subscribe( 
    data  => {
      
      this.simdata$ = data; 
      
      sessionStorage.setItem('sim', this.simdata$); 
      req = data;
       // alert(req);
        
    },
    error  => {

    console.log("Error", error);

    }

    );

    //return this.http.request(req);
    return this.http.post<any>(`${URLDemoV3}insertbulksim`,formdata)
 
  
  }

  CourierSIMpushFileToStorage(file : File,simparam): Observable<HttpEvent<{}>> { 
       
    this.networkid = simparam.networkid1;
    this.vendorlistdata = simparam.vendorId;
    this.receivedbydummy = simparam.deliverytype;
   
    const formdata: FormData = new FormData();
     
    this.receivedbydummy = simparam.receivedbydummy;
    this.cournmid = simparam.cournmid;
    this.courrecedtid = simparam.courrecedtid;
    this.receivedby = simparam.receivedby;
    this.trackerid = simparam.trackerid;
    this.vendorlistdata = simparam.vendorlistdata;
    this.courfrom = simparam.courfrom;
    this.simtypeid = simparam.simtypeid;
   
    formdata.append('file', file);
    formdata.append('remarks', 'Ok');
    formdata.append('simtypeid', 'simtypeid');
    formdata.append('mobilenumber2', '');
    formdata.append('networkid2', '');
    formdata.append('deliverytype', 'receivedbydummy');
    formdata.append('couriername', 'cournmid');    
    formdata.append('dispatchdatetime', '');
    formdata.append('recivedatetime', 'courrecedtid');
    formdata.append('personename', 'receivedby');
    formdata.append('personemobileno', '');
    formdata.append('vehicleregno', '');
    formdata.append('trackerid', 'trackerid');    
    formdata.append('vendorid', 'vendorlistdata');
    formdata.append('verifyBy', '');
    formdata.append('companyEmpId', '');
    formdata.append('headerkey', sessionStorage.getItem('hk'));
    formdata.append('pageID','1');
    formdata.append('pageName', 'Sim Bulk Entry');
    formdata.append('pageURL',this.router.url);
    formdata.append('applicationId','24341645');
   
    let headersdemo = new Headers();
    this.simdemo = formdata;
    headersdemo.append('Content-Type','multipart/form-data');
    headersdemo.append('Accept','application/json');
   // alert(this.demoone);
   // var headerOptions = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headersdemo});  
    let req;
    this.http.post(URLDemoV3 + 'insertbulksim',formdata).subscribe( 
    data  => {
      
      this.simdata$ = data; 
      
      sessionStorage.setItem('sim', this.simdata$); 
      req = data;
       // alert(req);
        
    },
    error  => {

    console.log("Error", error);

    }

    );

      //return this.http.request(req);
    return this.http.post<any>(`${URLDemoV3}insertbulksim`,formdata)
  
  }

  /* Developer : Aditya Londhe 
     Discription : Update of vehicle installation with file upload
     Update : 
     Date : 2-8-2021*/



  Vehicle_icon(file: File, file2: File, file3: File, file4: File, param): Observable<HttpEvent<{}>> {
    // this.demoone = JSON.stringify(param);
    this.data1 = param.param1;
    this.data2 = param.param2;
    this.data3 = "";
    this.data4 = "";
    // this.data29 = param.param29;

    const formdata: FormData = new FormData();

    var data1 = sessionStorage.getItem("selectdevicetype");


    //  formdata.append('file', filePath.name);
    //  formdata.append('file-format', filePath.type);
    formdata.append('headerkey', sessionStorage.getItem('hk'));
    //  formdata.append('file1',file);
    //  formdata.append('file2',file2);
    //  formdata.append('file3',file3);
    formdata.append('vehicleiconname', this.data1);
    formdata.append('vehicleicondescription', this.data2);
    formdata.append('vehicleiconid', this.data3);
    formdata.append('remarks', this.data4);
    formdata.append('filepath_running', file);
    formdata.append('filepath_stop', file2);
    formdata.append('filepath_idle', file3);
    formdata.append('filepath_nonpolling', file4);

    let headersdemo = new Headers();
    this.demoone = formdata;
    headersdemo.append('Content-Type', 'multipart/form-data');
    headersdemo.append('Accept', 'application/json');

    let options = new RequestOptions({ headers: headersdemo });
    let req;
    this.http.post(URl2 + 'vehicleiconinsert', formdata).subscribe(
      data => {
        console.log("POST Request is successfull ", data);

        req = data;
        // alert(req);

      },
      error => {

        console.log("Error", error);

      }

    );


    return this.http.request(req);

  }

  /* Developer : Aditya Londhe 
     Discription : Update of vehicle installation with file upload
     Update : 
     Date : 2-8-2021*/


  res: any;
  Vehicle_icon_update(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    var data1 = sessionStorage.getItem("selectdevicetype");

    formdata.append('file', file);

    let headersdemo = new Headers();
    this.demoone = formdata;
    headersdemo.append('Content-Type', 'multipart/form-data');
    return this.http.post<any>(`${URl2}vehicleiconupload`, formdata)
  }

   devicemakeid:string;
  devicemodelid: string; devicetype: string; receiveddate_invoicedate_deliverydate: string; courierfrom: string; modeofdelivery: string; 
  personName: string; personMobileNo: string; pageName:string; pageURL:string; pageID:string; 
  pushReceivedDeviceBulkExcelFileToStorage(file: File, param): Observable<HttpEvent<{}>> {
  
    function getRandoms(numPicks) {
      var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      var selections = [];

      // randomly pick one from the array
      for (var i = 0; i < numPicks; i++) {
        var index = Math.floor(Math.random() * nums.length);
        selections.push(nums[index]);
        nums.splice(index, 1);
      }
      return (selections);
    }


    var results = getRandoms(8);
    var output = results.join("");
    console.log("the random value is" + output);

    this.vendorlistdata = param.devicemakeid;
    this.receivedbydummy = param.modeofdelivery;
    this.devicemodelid = param.devicemodelid;
    this.courrecedtid = param.receiveddate_invoicedate_deliverydate;
    this.receivedby = param.personName;
    this.permobno = param.personMobileNo;    
    this.recefrm = param.courierfrom;
    this.devicetype = param.devicetype;
    this.pageID = param.pageID;
    this.pageName = param.pageName;
    this.pageURL = param.pageURL;
    const formdata: FormData = new FormData();

    var data1 = sessionStorage.getItem("selectdevicetype");

    formdata.append('file', file);
    formdata.append('remarks', 'Ok');
    formdata.append('devicemakeid', this.vendorlistdata);
    formdata.append('devicemodelid', this.devicemodelid);
    formdata.append('simid', '');
    formdata.append('noofdevice', '');
    formdata.append('couriername', '');
    formdata.append('invoiceno', '');
    formdata.append('courierfrom', this.recefrm);
    formdata.append('producttype', '');
    formdata.append('issiminsert', '');
    formdata.append('dispatchdatetime', '');
    formdata.append('trackerid', '');
    formdata.append('receivedBy', '');
    formdata.append('personName', this.receivedby);
    formdata.append('personMobileNo', this.permobno);
    formdata.append('companyEmployeeid', '0');
    formdata.append('headerkey', sessionStorage.getItem('hk'));    
    formdata.append('devicetype', this.devicetype);    
    formdata.append('pageID', '1');
    formdata.append('pageName', this.pageName);
    formdata.append('pageURL', this.pageURL);
    formdata.append('applicationId', output);


    //formdata.append('imagetype', 'vehicleRenewal');
    // 'headerkey='+headerKey+'&refid='+data1+ '&imagetype=vehicleRenewal'

    let headersdemo = new Headers();
    this.demoonebulk = formdata;
    //headersdemo.append('Content-Type', 'multipart/form-data');
    headersdemo.append('Accept', 'application/json');
    // alert(this.demoonebulk);
    // var headerOptions = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({ headers: headersdemo });
    let req;
    this.http.post(URLDemoV3 + 'insertbulkdevice', formdata).subscribe(
      data => {

        console.log("POST Request is successfull ", data);

        req = data;
        // alert(req);

      },
      error => {

        console.log("Error", error);

      }

    );

    /* const req1 = new HttpRequest('POST', URL + 'uploaddevice', formdata, {
      reportProgress: true
    });
 */
    // return this.http.request(req);
    // return this.http.post<any>(URL + 'uploadimage?' + 'headerkey='+headerKey+'&refid='+data1+ '&imagetype=vehicleRenewal',formdata)
    return this.http.post<any>(`${URLDemoV3}insertbulkdevice`, formdata)

  }

  couriername: string;  
  pushCourierDeviceBulkExcelFileToStorage(file: File, param): Observable<HttpEvent<{}>> {
  
    function getRandoms(numPicks) {
      var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      var selections = [];

      // randomly pick one from the array
      for (var i = 0; i < numPicks; i++) {
        var index = Math.floor(Math.random() * nums.length);
        selections.push(nums[index]);
        nums.splice(index, 1);
      }
      return (selections);
    }


    var results = getRandoms(8);
    var output = results.join("");
    console.log("the random value is" + output);

    this.vendorlistdata = param.devicemakeid;
    this.receivedbydummy = param.modeofdelivery;
    this.devicemodelid = param.devicemodelid;
    this.courrecedtid = param.receiveddate_invoicedate_deliverydate;
    this.receivedby = param.personName;
    this.permobno = param.personMobileNo;    
    this.recefrm = param.courierfrom;
    this.devicetype = param.devicetype;
    this.couriername = param.couriername;
    this.trackerid = param.trackerid;
    this.pageID = param.pageID;
    this.pageName = param.pageName;
    this.pageURL = param.pageURL;
    const formdata: FormData = new FormData();

    var data1 = sessionStorage.getItem("selectdevicetype");

    formdata.append('file', file);
    formdata.append('devicemakeid', this.vendorlistdata);
    formdata.append('devicemodelid', this.devicemodelid);
    formdata.append('simid', '');
    formdata.append('noofdevice', '');
    formdata.append('couriername', this.couriername);
    formdata.append('invoiceno', '');
    formdata.append('courierfrom', this.recefrm);
    formdata.append('producttype', '');
    formdata.append('issiminsert', '');
    formdata.append('dispatchdatetime', '');
    formdata.append('trackerid', this.trackerid);
    formdata.append('receivedBy', '');
    formdata.append('personName', this.receivedby);
    formdata.append('personMobileNo', this.permobno);
    formdata.append('companyEmployeeid', '0');
    formdata.append('headerkey', sessionStorage.getItem('hk'));    
    formdata.append('devicetype', this.devicetype);    
    formdata.append('pageID', this.pageID);
    formdata.append('pageName', this.pageName);
    formdata.append('pageURL', this.pageURL);
    formdata.append('applicationId', output);


    //formdata.append('imagetype', 'vehicleRenewal');
    // 'headerkey='+headerKey+'&refid='+data1+ '&imagetype=vehicleRenewal'

    let headersdemo = new Headers();
    this.demoonebulk = formdata;
   // headersdemo.append('Content-Type', 'multipart/form-data');
    headersdemo.append('Accept', 'application/json');
    // alert(this.demoonebulk);
    // var headerOptions = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({ headers: headersdemo });
    let req;
    this.http.post(URLDemoV3 + 'insertbulkdevice', formdata).subscribe(
      data => {

        console.log("POST Request is successfull ", data);

        req = data;
        // alert(req);

      },
      error => {

        console.log("Error", error);

      }

    );

    /* const req1 = new HttpRequest('POST', URL + 'uploaddevice', formdata, {
      reportProgress: true
    });
 */
    // return this.http.request(req);
    // return this.http.post<any>(URL + 'uploadimage?' + 'headerkey='+headerKey+'&refid='+data1+ '&imagetype=vehicleRenewal',formdata)
    return this.http.post<any>(`${URLDemoV3}insertbulkdevice`, formdata)

  }

}
