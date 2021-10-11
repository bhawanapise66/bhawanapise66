import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UploadimageoneService } from '../../Installation/upload/uploadimageone.service';
import { CryptService } from '../../services/crypt.service';

declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-iconentry',
  templateUrl: './iconentry.component.html',
  styleUrls: ['./iconentry.component.css']
})
export class IconentryComponent implements OnInit {

  constructor(private router: Router, private cryptService: CryptService,private uploadService: UploadimageoneService) { }
  selectedFilesNew: FileList;
  selectedFiles2New: FileList;
  selectedFiles3New: FileList;
  selectedFiles4New: FileList;
  currentFileUpload: File;
  currentFileUpload2: File;
  currentFileUpload3: File;
  currentFileUpload4: File;
  progress: { percentage: number } = { percentage: 0 };

  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;  datafromrespo:any;
  pageUrl = this.router.url;
  public loading = false;p: number;   pagecount:number;
  respooffile: any;

  ngOnInit() {
    function readURL(input) {

      if (input.files && input.files[0]) {
        var reader = new FileReader();
  
        reader.onload = function (e) {
          // console.log(e.target.result);
          //  let obj : any = e.target.result;
          let obj: any = (e.target as any).result;
          //  console.log(obj);
          $('#blah').attr('src', obj);
  
        }
  
  
        reader.readAsDataURL(input.files[0]);
      }
    }

    function readURL2(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          console.log(e.target);
          //  let obj : any = e.target.result;
          let obj: any = (e.target as any).result;
          $('#blah2').attr('src', obj);

        }


        reader.readAsDataURL(input.files[0]);
      }
    }

    function readURL3(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          console.log(e.target);
          //  let obj : any = e.target.result;
          let obj: any = (e.target as any).result;
          $('#blah3').attr('src', obj);

        }


        reader.readAsDataURL(input.files[0]);
      }
    }

    function readURL4(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          console.log(e.target);
          //  let obj : any = e.target.result;
          let obj: any = (e.target as any).result;
          $('#blah4').attr('src', obj);

        }


        reader.readAsDataURL(input.files[0]);
      }
    }
    
  $("#imgInp").change(function () {
    readURL(this);
  });
  $("#imgInp2").change(function () {
    readURL2(this);
  });
  $("#imgInp3").change(function () {
    readURL3(this);
  });
  $("#imgInp4").change(function () {
    readURL4(this);
  });

  this.EncryptPageName();
  this.EncryptPageUrl();
  }

  EncryptPageName() {
    this.cryptService.encrypt("Network Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }

  selectFile(event) {
    document.getElementById("defaultimg").style.display="none";
    document.getElementById("blah").style.display="block";
    this.selectedFilesNew = event.target.files;
    //this.InsertVehicleIcon();
  }
  selectFile2(event) {
    document.getElementById("defaultimg2").style.display="none";
    document.getElementById("blah2").style.display="block";
    this.selectedFiles2New = event.target.files;
   // this.addressidentityupload();
  }

  selectFile3(event) {
    document.getElementById("defaultimg3").style.display="none";
    document.getElementById("blah3").style.display="block";
    this.selectedFiles3New = event.target.files;
   // this.rcidentityupload();
  }

  selectFile4(event) {
    document.getElementById("defaultimg4").style.display="none";
    document.getElementById("blah4").style.display="block";
    this.selectedFiles4New = event.target.files;
  //  this.rcidentityupload();
  }

  IconentryText:any;IcondescriptionText:any;
  InsertVehicleIcon() {
    let icondata = {
      param1: this.IconentryText, param2: this.IcondescriptionText
    }

   // localStorage.setItem("selectdevicetype", this.selectdevicetype);
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFilesNew.item(0);
    this.currentFileUpload2 = this.selectedFiles2New.item(0);
    this.currentFileUpload3 = this.selectedFiles3New.item(0);
    this.currentFileUpload4 = this.selectedFiles4New.item(0);
    //console.log("aaaaaaaaaaaaaaaaaaaa"+this.currentFileUpload);
   this.uploadService.Vehicle_icon(this.currentFileUpload,this.currentFileUpload2,this.currentFileUpload3,this.currentFileUpload4, icondata).subscribe(event => {
      

      if (event['statuscode'] == "200") {
        //  alert("high ");
        try { RemoveLoader() } catch (e) { alert(e) }
        this.respooffile = event['entity'];
        console.log("the return data of file upload 1 "+JSON.stringify(this.respooffile));
      }
      else {
        //alert("ldata is not f");
      }
   });

    this.selectedFilesNew = undefined;
  }



  
 clear()
 {
  this.IconentryText="";
  this.IcondescriptionText="";
 }


}
