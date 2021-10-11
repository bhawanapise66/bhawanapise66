import { Router } from '@angular/router';
import { CryptService } from './../../../services/crypt.service';
import { ListService } from 'src/list.service';
import { DevicetypeService } from './../../../../../APIService/devicetype.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
declare var jQuery: any;
declare var $: any;
declare var AddLoader:any;
declare var RemoveLoader:any;
declare var SuccessAlert: any;
declare var errorAlert: any;
@Component({
  selector: 'app-devicetypeentry',
  templateUrl: './devicetypeentry.component.html',
  styleUrls: ['./devicetypeentry.component.css']
})
export class DevicetypeentryComponent implements OnInit {
  @Output()
  showDetails = new EventEmitter();
  


  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  pageUrl = this.router.url;
  public loading = false;p: number;   pagecount:number;
  division: any;
  subDivision: string;
  subDivisionDesc: string;

  divisionListArray = [];


  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo:5000,
    height: '200px',
  };
  constructor(private router: Router
    , private cryptService: CryptService, private listService: ListService,private devicetypemodelService :DevicetypeService) {
    this.EncryptPageName(); this.EncryptPageUrl();
   
  }

  ngOnInit() {

    (function ($) {
      $(document).ready(function() {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#devicetypeid').focus();
      })
    });
    })(jQuery);

  }

  EncryptPageName() {
    this.cryptService.encrypt("Device Type Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }


  datafromrespo:string;
  Devicetypeentry:string;
  devicetypedescription:string;
  DeviceVendorType(){
  
    var vendortypename = $("#devicetypeid").val();
    var description = $("#descdevicetypeid").val();
    this.Devicetypeentry = vendortypename.substring(0, 1).toUpperCase() + vendortypename.substring(1);
    this.devicetypedescription = description.substring(0, 1).toUpperCase() + description.substring(1);


    var isValid = true;
    if(!vendortypename && vendortypename.length <= 0){
      // alert(devicetype);
      isValid = false;
      $('#msg_errordivision').html('Please Enter Device Type').show();
     $('#devicetypeid').focus();
      setTimeout(function(){document.getElementById("msg_errordivision").style.display="none";}, 3000);
    }
    else if(!description && description.length <= 0){
      // alert(devicetype);
      isValid = false;
      $('#msg_errordivision').html('Please Enter Description ').show();
     $('#descdevicetypeid').focus();
      setTimeout(function(){document.getElementById("msg_errordivision").style.display="none";}, 3000);
    }
    else{
    let dataL = {
      remarks:'',
      deviceTypeId:0,
      deviceType:this.Devicetypeentry, 
      deviceDescription:this.devicetypedescription, 
      pageID: "7",
       pageName: this.encryptedpageNameValue,
       pageURL: this.encryptedpageUrlValue
        }
       try{AddLoader()}catch(e){alert(e)}
       
    this.devicetypemodelService.InsertDevicetypeAPI(dataL).subscribe((data)=>{
      try{RemoveLoader()}catch(e){alert(e)}

            this.datafromrespo = data.entity;
            var msg = this.datafromrespo;
           // this.datafromrespostatus = data.statuscode;
            if (data.statuscode == '200')
          {
            SuccessAlert(msg);
            this.clear();
            this.closemodal();
            this.showDetails.emit()
            }
            else
            {
              errorAlert(msg);
            }
    });}

   
 
  }
        
      
    
  closemodal() {
    $("#exampleModal").modal('hide');
  
    $('.modal-backdrop.show').css('display', 'none');
}     

 clear()
 {
  this.Devicetypeentry="";
  this.devicetypedescription="";
 }

 itemsPerPage:number=10;
 VendorTypeDetails:any;
 count: number; viewcount: number;

}

