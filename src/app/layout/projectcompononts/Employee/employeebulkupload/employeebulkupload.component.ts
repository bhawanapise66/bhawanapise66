import { UploadimageoneService } from './../../Installation/upload/uploadimageone.service';
//import { UploadimageoneService } from './../../upload/uploadimageone.service';
import { HttpResponse, HttpEventType, HttpRequest  } from '@angular/common/http';
import { VehicleinstallationService } from './../../../../APIService/vehicleinstallation.service';
import { Router } from '@angular/router';
import { ListService } from './../../../../../list.service';
//import { PostService } from './../../../../../post.service';
import { Paramcls } from './../../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as $ from 'jquery';
import { CryptService } from '../../services/crypt.service';

declare var jQuery: any;
declare var $: any;
declare var AddLoader:any;
declare var RemoveLoader:any;

@Component({
  selector: 'app-employeebulkupload',
  templateUrl: './employeebulkupload.component.html',
  styleUrls: ['./employeebulkupload.component.css']
})
export class EmployeebulkuploadComponent implements OnInit {
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  key: string = 'name'; reverse: boolean = true; p: number;  pagecount:number;  
  filter:any; selectRows:string; Searchvendor:string; selectRowsText:string;
  deleteText:string; successMessageUpdate:string; datafromrespo:string;
  count:number; viewcount:number;

  pageUrl = this.router.url;
  public loading = false;  
  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  constructor(private modalService: NgbModal,private flashMessage: FlashMessagesService ,  private uploadService: UploadimageoneService , private listService:ListService, private cryptService:CryptService, private router:Router) { 
    this.EncryptPageName();
    this.EncryptPageUrl();
  }
  
  
  departmentbulkText:any;
  selectdepartmentbulk:string;
  upload() {
  
    this.selectdepartmentbulk = this.departmentbulkText.param1;
  
    let dataL = {
     
      param1:this.selectdepartmentbulk,  
    
       pageID: "7",
       pageName: this.encryptedpageNameValue,
       pageURL: this.encryptedpageUrlValue
        }

        alert("enc"+this.encryptedpageNameValue);

   // localStorage.setItem("selectdevicetype", this.selectdevicetype);
    this.progress.percentage = 0;
 
    this.currentFileUpload = this.selectedFiles.item(0);
   
    try{AddLoader()}catch(e){alert(e)}
    this.uploadService.EmployeeBulkExcelFileToStorage(this.currentFileUpload,dataL).subscribe(event => {
       
      // if (event.type === HttpEventType.UploadProgress) {
      //   this.progress.percentage = Math.round(100 * event.loaded / event.total);
      //   // alert("helloooooo");
      // } else if (event instanceof HttpResponse) {
      //   console.log('File is completely uploaded!');
      //   // alert("hiiiiii");
      // }
        if(event['status'] == true){
        //  alert("high ");
        try{RemoveLoader()}catch(e){alert(e)}
          this.respoofbulk = event['entity'];
         console.log("the return data is "+JSON.stringify(this.respoofbulk));
        }
        else{
          alert("ldata is not f");
        }
    });
 
    this.selectedFiles = undefined;
  }
  
  respoofbulk:any;
  ngOnInit() {
    this.count = 0;
    this.viewcount = 0;
    this.Departmentlist();
   
  }
  EncryptPageName() {
    this.cryptService.encrypt("Employee Bulk Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
  //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }
  EmployeedetailsClick(){
    this.router.navigate(['./employeedetails']);
}

ListOfDepartment = [];
Departmentlist(){
 
  let keydata = {
    param1:"",
    param2:"",
    pageID: "7",
     pageName: this.encryptedpageNameValue,
     pageURL: this.encryptedpageUrlValue
  }  
  try{AddLoader()}catch(e){alert(e)}
  this.listService.SelectDepartmentListAPI(keydata).subscribe(
    (data)  => {
      try{RemoveLoader()}catch(e){alert(e)}
     this.ListOfDepartment = data.entity.list;
      // this.ListOfState = statelist;
    
      this.loading = false; 
     
    });
}
selectFile(event){
  
}
Refreshfunction(){

}
createPDF(){

}
SelectRows(){

}
searchdata(){

}
exportToExcel(){
  
}
sort(key){

  //  alert(key);

   this.key = key;
   this.reverse = !this.reverse;
   
 }
 EmployeeMasterpageChanged($event){
   
 }
 VendorDeletefunction(){

 }
  
}
