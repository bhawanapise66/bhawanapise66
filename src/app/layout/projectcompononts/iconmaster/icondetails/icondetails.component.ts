import { Component, OnInit } from '@angular/core';
import { CryptService } from '../../services/crypt.service';
import { Router } from '@angular/router';
import { VehicleinstallationService } from './../../../../APIService/vehicleinstallation.service';
import { UploadimageoneService } from '../../Installation/upload/uploadimageone.service';


declare var jQuery: any;
declare var $: any;
declare var jQuery: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
@Component({
  selector: 'app-icondetails',
  templateUrl: './icondetails.component.html',
  styleUrls: ['./icondetails.component.css']
})
export class IcondetailsComponent implements OnInit {

  constructor(private cryptService: CryptService, private router: Router,private vehicleinstallationservice: VehicleinstallationService,private uploadService: UploadimageoneService) { }
  encryptedpageNameValue:string;
  encryptedpageUrlValue:string;  successMessageUpdate: string;
  pageUrl = this.router.url;
  key: string = 'name'; reverse: boolean = true;
  public loading = false; p: number; pagecount: number=10; count: number; viewcount: number;
  itemsPerPage: number = 10;


  selectedFilesup: FileList;
  selectedFiles2up: FileList;
  selectedFiles3up: FileList;
  selectedFiles4up: FileList;
  currentFileUploadup: File;
  currentFileUpload2up: File;
  currentFileUpload3up: File;
  currentFileUpload4up: File;
  progress: { percentage: number } = { percentage: 0 };

  checkrunning:boolean = false;
  checkstop:boolean = false;
  checkidle:boolean = false;
  checknonpolling:boolean = false;

  

  
  // Developer 	: Aditya Londhe
  // Date      	: 17-7-2021
  // Description :  this code is use to select file and show selected image. 
  // Modified By:  
  // Update date : 

  selectFileupdate(event) {
    document.getElementById("defaultimgupdate").style.display="none";
    document.getElementById("blahupdate").style.display="block";
    this.selectedFilesup = event.target.files;
    this.checkrunning = true;
    this.running_icon_upload();
  }

  selectFile2update(event) {
    document.getElementById("defaultimg2update").style.display="none";
    document.getElementById("blah2update").style.display="block";
    this.selectedFiles2up = event.target.files;
    this.checkstop = true;
  }

  selectFile3update(event) {
    document.getElementById("defaultimg3update").style.display="none";
    document.getElementById("blah3update").style.display="block";
    this.selectedFiles3up = event.target.files;
    this.checkidle = true;
  //  this.rc_updateidentityupload();
  }

  selectFile4update(event) {
    document.getElementById("defaultimg4update").style.display="none";
    document.getElementById("blah4update").style.display="block";
    this.selectedFiles4up = event.target.files;
    this.checknonpolling = true;
  //  this.rc_updateidentityupload();
  }

  ngOnInit() {
    this.EncryptPageName();
    this.EncryptPageUrl();
    this.IconDetail();



     // Developer 	: Aditya Londhe
  // Date      	: 17-7-2021
  // Description :  this code is use to select file and show selected image at bottom of image select. 
  // Modified By:  
  // Update date :

    function readURLupdate(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          // console.log(e.target.result);
          //  let obj : any = e.target.result;
          let obj: any = (e.target as any).result;
          //  console.log(obj);
          $('#blahupdate').attr('src', obj);
          
          
        }


        reader.readAsDataURL(input.files[0]);
      }
    }
    function readURL2update(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          //  console.log(e.target);
          //  let obj : any = e.target.result;
          let obj: any = (e.target as any).result;
          $('#blah2update').attr('src', obj);

        }


        reader.readAsDataURL(input.files[0]);
      }
    }
    function readURL3update(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          //  console.log(e.target);
          //  let obj : any = e.target.result;
          let obj: any = (e.target as any).result;
          $('#blah3update').attr('src', obj);

        }


        reader.readAsDataURL(input.files[0]);
      }
    }
    function readURL4update(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          //  console.log(e.target);
          //  let obj : any = e.target.result;
          let obj: any = (e.target as any).result;
          $('#blah4update').attr('src', obj);

        }


        reader.readAsDataURL(input.files[0]);
      }
    }


    $("#imgInpupdate").change(function () {
      readURLupdate(this);
    });

    $("#imgInp2update").change(function () {
      readURL2update(this);
    });
    $("#imgInp3update").change(function () {
      readURL3update(this);
    });
    $("#imgInp4update").change(function () {
      readURL4update(this);
    });
  }

  EncryptPageName() {
    this.cryptService.encrypt("Network Details")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }

  editpageform() {
    document.getElementById("backdetailsbtn").style.display = "block";
    document.getElementById("editbtn").style.display = "none";
    document.getElementById("vendordtls").style.display = "none";
    document.getElementById("container").style.display = "block";
    document.getElementById("modelfooter").style.display = "block";
    document.getElementById("uvmd").style.display = "block";
    document.getElementById("vmd").style.display = "none";
    // this.Citylist();

  }
  backdetailsbtn() {
    document.getElementById("uvmd").style.display = "none";
    document.getElementById("vmd").style.display = "block";
    document.getElementById("backdetailsbtn").style.display = "none";
    document.getElementById("editbtn").style.display = "block";
    document.getElementById("vendordtls").style.display = "block";
    document.getElementById("modelfooter").style.display = "none";
    document.getElementById("container").style.display = "none";
  }
  iconid:string;iconname:string;icondescription:string;
  running:any;stop:any;idle:any;non_polling:any; showiconpath:any;
  actualrunnpath:any; actualstoppath:any; actualidlepath:any; actualnonpollpath:any;
  setdata(com) {
    //  this.devicemap_id = com.param1;
    this.iconid = com.param1;            //
    this.iconname = com.param2;
    this.icondescription = com.param4;
    this.running = com.param5;
    this.stop = com.param6;
    this.idle = com.param7;
    this.non_polling = com.param8;
    this.showiconpath = com.param11;

    let runningpath = this.running;
    let mainimg1 = runningpath.split("/");
    let file1 = mainimg1[mainimg1.length - 1];
    this.actualrunnpath = this.showiconpath+""+file1;

    let stoppath = this.stop;
    let mainimg2 = stoppath.split("/");
    let file2 = mainimg2[mainimg2.length - 1];
    this.actualstoppath = this.showiconpath+""+file2;
    
    let idlepath = this.idle;
    let mainimg3 = idlepath.split("/");
    let file3 = mainimg3[mainimg3.length - 1];
    this.actualidlepath = this.showiconpath+""+file3;

    let nonpollingpath = this.non_polling;
    let mainimg4 = nonpollingpath.split("/");
    let file4 = mainimg4[mainimg4.length - 1];
    this.actualnonpollpath = this.showiconpath+""+file4;
  

    this.backdetailsbtn();
  }


  // Updated by Kajal
  SelectRows() {
    var search = $('#searchData').val();
    var selectrow = $('#selectronet').val();
     this.loading = true;
     this.itemsPerPage=selectrow;
    this.p = 1; this.pagecount = selectrow;
   
    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: search,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
   try { AddLoader() } catch (e) { alert(e) }
  this.vehicleinstallationservice.VehicleIconDetailsAPI(keydata).subscribe(
          (data)  => {
       try { RemoveLoader() } catch (e) { alert(e) }
       this.IconDetails = data.entity.responsedatalist;

        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }
  filter: any;
  Refreshfunction() {
    this.loading = true;

    this.p = 1;
    this.filter=""; 
    this.IconDetail();
  }

  searchdata() {
    var search = $('#searchData').val();
    
    this.loading = true;
    this.itemsPerPage=this.pagecount;
    this.p = 1;
    // this.pagecount = 5;


    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: search,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
   try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.vehicleinstallationservice.VehicleIconDetailsAPI(keydata).subscribe(
      (data)  => {
       try { RemoveLoader() } catch (e) { alert(e) }
       this.IconDetails = data.entity.responsedatalist;

        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;

        this.loading = false;
      });
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;

  }
  deleteText:any;
  IconDeletefunction() {
    var isValid = true;
    var deleteremark = $('#networkdelremark').val();
    this.deleteText = deleteremark.substring(0, 1).toUpperCase() + deleteremark.substring(1);

    // Validate Contact Name
    if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      // $('#msg_error_delete').html('Please Enter Remark').show();
      $('#msg_error_delete').html('Please Enter Remark').show();
      $('#networkdelremark').focus();
      setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        param1:this.deleteText,
        param2:this.iconid,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }
     try { AddLoader() } catch (e) { alert(e) }

     
    this.vehicleinstallationservice.VehicleIconDeleteAPI(dataL).subscribe((data)=>{
       try { RemoveLoader() } catch (e) { alert(e) }

        //  alert(data);
        this.datafromrespo = data.entity;

        if (this.datafromrespo == 'Successfully Deleted.') {
          $("#SuccessModal").modal('show');
          this.Refreshfunction();
         
          this.closemodal();
        }
        else {
          $("#ErrorModal").modal('show');
        }
      });
      // alert("error in inserting data");
    }
  }
  datafromrespo:any;
  IconDetails:Object;
  IconDetail() {

    this.loading = true;

    this.p = 1;
     this.pagecount = 10;
    //  console.log("p" + this.p);
    this.itemsPerPage=this.pagecount;
    let keydata = {
      // param1: this.divisiondetail["param1"],
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
   try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.vehicleinstallationservice.VehicleIconDetailsAPI(keydata).subscribe(
      (data) => {
       try { RemoveLoader() } catch (e) { alert(e) }
        this.IconDetails = data.entity.responsedatalist;
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);
        //this.networkDetailsArray = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
       
        this.loading = false;
      });  
       // this.NetworkDetail1();


  }
  remarkiconText:any;
  clear()
  {
   this.iconname="";
   this.icondescription="";
   this.remarkiconText="";
  }
  closemodal() {
    //alert("come ");
    this.deleteText="";
    this.clear();
    $("#successmodel").modal('hide');

    $('#modeldelete').modal('hide');
    $('#myModalwizard').modal('hide');

    $('.modal-backdrop.show').css('display', 'none');

  }
  respooffilerunningupdate:any;      Filepathrunning:any;
  running_icon_upload() {
    let vehicleicon = {
    //  param1: "Running"
    }
   // localStorage.setItem("selectdevicetype", this.selectdevicetype);
    this.progress.percentage = 0;

    this.currentFileUploadup = this.selectedFilesup.item(0);
    this.uploadService.Vehicle_icon_update(this.currentFileUploadup).subscribe(event => {
      if (event['exception'] == "") {
       
          this.Filepathrunning = event['filePath'];
          this.running = this.Filepathrunning;
          //  alert("running"+this.running);
        try { RemoveLoader() } catch (e) { alert(e) }
        this.respooffilerunningupdate = event['data'];
        console.log("the return data of file upload 1 "+JSON.stringify(this.respooffilerunningupdate));
      }
      else {
        alert("ldata is not f");
      }
    
    });
   
   
    this.currentFileUploadup = undefined;
  }
  respooffilestopupdate:any;     Filepathstop:any;
  stop_icon_upload() {
    let vehicleicon = {
    //  param1: "stop"
    }
   // localStorage.setItem("selectdevicetype", this.selectdevicetype);
    this.progress.percentage = 0;

    this.currentFileUpload2up = this.selectedFiles2up.item(0);
    // console.log("aaaaaaaaaaaaaaaaaaaa"+this.currentFileUpload);
    this.uploadService.Vehicle_icon_update(this.currentFileUpload2up).subscribe(event => {
      if (event['exception'] == "") {
       
        this.Filepathstop = event['filePath'];
    
      try { RemoveLoader() } catch (e) { alert(e) }
      this.respooffilerunningupdate = event['data'];
      console.log("the return data of file upload 1 "+JSON.stringify(this.respooffilerunningupdate));
    }
      else {
        alert("ldata is not f");
      }
    });
      this.stop = this.Filepathstop;
    this.currentFileUpload2up = undefined;
  }

  respooffileidleupdate:any;  Filepathidle:any;
  idle_icon_upload() {
    let vehicleicon = {
    //  param1: "Idle"
    }
   // localStorage.setItem("selectdevicetype", this.selectdevicetype);
    this.progress.percentage = 0;

    this.currentFileUpload3up = this.selectedFiles3up.item(0);
    // console.log("aaaaaaaaaaaaaaaaaaaa"+this.currentFileUpload);
    this.uploadService.Vehicle_icon_update(this.currentFileUpload3up).subscribe(event => {
      if (event['exception'] == "") {
       
        this.Filepathidle = event['filePath'];
    
      try { RemoveLoader() } catch (e) { alert(e) }
      this.respooffilerunningupdate = event['data'];
      console.log("the return data of file upload 1 "+JSON.stringify(this.respooffilerunningupdate));
    }
      else {
        alert("ldata is not f");
      }
    });
    this.idle = this.Filepathidle;
    this.currentFileUpload3up = undefined;
  }
 
  
  

  respooffilenonpollingupdate:any;     Filepathnonpolling:any;
  nonpolling_icon_upload() {
    let vehicleicon = {
    //  param1: "Non Polling"
    }
   // localStorage.setItem("selectdevicetype", this.selectdevicetype);
    this.progress.percentage = 0;

    this.currentFileUpload4up = this.selectedFilesup.item(0);
    // console.log("aaaaaaaaaaaaaaaaaaaa"+this.currentFileUpload);
    this.uploadService.Vehicle_icon_update(this.currentFileUpload4up).subscribe(event => {
      if (event['exception'] == "") {
       
        this.Filepathnonpolling = event['filePath'];
    
      try { RemoveLoader() } catch (e) { alert(e) }
      this.respooffilerunningupdate = event['data'];
      console.log("the return data of file upload 1 "+JSON.stringify(this.respooffilerunningupdate));
    }
      else {
        alert("ldata is not f");
      }
    });
    this.non_polling = this.Filepathnonpolling;
    this.currentFileUpload4up = undefined;
  }



  respooffile:any;
  editIcon(){

    var iconname = $("#icon_name").val();
    var icondescription = $("#descriptionupdate").val();
  
    var isValid = true;

    if (!iconname && iconname.length <= 0) {
       
      isValid = false;
      $('#msg_errorentry2').html('Please Enter Icon Name').show();
      $('#icon_name').focus();
      setTimeout(function () { document.getElementById("msg_errorentry2").style.display = "none"; }, 3000);
    }

    else if (!icondescription && icondescription.length <= 0) {
       
      isValid = false;
      $('#msg_errorentry2').html('Please Enter Icon Name').show();
      $('#icon_name').focus();
      setTimeout(function () { document.getElementById("msg_errorentry2").style.display = "none"; }, 3000);
    }

    else {
      let icondata = {
        remarks: "",
        vehicleiconid: this.iconid,
        vehicleiconname:this.iconname, 
        vehicleicondescription: this.icondescription,
        filepath_running: this.running, 
        filepath_stop: this.stop,
        filepath_idle: this.idle, 
        filepath_nonpolling: this.non_polling,
       
      }
     
      try { AddLoader() } catch (e) { alert(e) }
      this.vehicleinstallationservice.VehicleIconUpdateAPI(icondata).subscribe((data) => {
       try { RemoveLoader() } catch (e) { alert(e) }

        this.datafromrespo = data.entity;

        
         if (data.statuscode == '200'){
        
          $("#SuccessModal").modal('show');
          this.Refreshfunction();
         this.closemodal();

        }

        else {
          $("#ErrorModal").modal('show');
        }
      });
    }
   // alert("dattta"+this.selectedFilesup.item(0));
   // localStorage.setItem("selectdevicetype", this.selectdevicetype);
   
    // if(this.checkrunning == true){
    //   this.currentFileUploadup = this.selectedFilesup.item(0);
    // }
    // if(this.checkstop == true){
    //   this.currentFileUpload2up = this.selectedFiles2up.item(0);

    // }
    // if(this.checkidle == true){
    //   this.currentFileUpload3up = this.selectedFiles3up.item(0);

    // }
    // if(this.checknonpolling == true){
    //   this.currentFileUpload4up = this.selectedFiles4up.item(0);
    // }
    
  // this.uploadService.Vehicle_icon_update(this.currentFileUploadup,this.currentFileUpload2up,this.currentFileUpload3up,this.currentFileUpload4up, icondata).subscribe(event => {
      

   
  }


  IconpageChanged(event) {
    this.p = event;
    var selectrow = $('#selectronet').val();
    var search = $('#searchData').val();

     this.loading = true;
     this.itemsPerPage=selectrow;
     this.pagecount = selectrow;
  
    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: search,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
   try { AddLoader() } catch (e) { alert(e) }

    // Distributor Detail Grid BIND LIST    
    this.vehicleinstallationservice.VehicleIconDetailsAPI(keydata).subscribe(
      (data) => {
       try { RemoveLoader() } catch (e) { alert(e) }
        this.IconDetails = data.entity.responsedatalist;
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);
        //this.networkDetailsArray = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
       
        this.loading = false;
      });  
  }
  
   
  
}
