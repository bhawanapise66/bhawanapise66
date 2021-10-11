import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DevicemasterService } from '../../services/devicemaster.service';
import { KModulelistbindingService } from '../../services/kmodulelistbinding.service';
import { CryptService } from '../../services/crypt.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.css']
})
export class DeviceDetailsComponent implements OnInit {

  encryptedpageNameValue: string; encryptedpageUrlValue: string; pageUrl = this.router.url;

  stringifiedData: any; parsedJson: any; stringifiedresponse: any; parsedJsonresponse: any;
  stringifiedDataList: any; parsedJsonList: any;

  stringifiedDataven: any; parsedJsonven: any; stringifiedresponseven: any; parsedJsonresponseven: any;
  stringifiedDataListven: any; parsedJsonListven: any;

  stringifiedDatamod: any; parsedJsonmod: any; stringifiedresponsemod: any; parsedJsonresponsemod: any;
  stringifiedDataListmod: any; parsedJsonListmod: any;

  stringifiedDatanet: any; parsedJsonnet: any; stringifiedresponsenet: any; parsedJsonresponsenet: any;
  stringifiedDataListnet: any; parsedJsonListnet: any;

  stringifiedDatadevtyp: any; parsedJsondevtyp: any; stringifiedresponsedevtyp: any; parsedJsonresponsedevtyp: any;
  stringifiedDataListdevtyp: any; parsedJsonListdevtyp: any; deleteText:string;

  devdetail$: any; devicedetdata: any = [];
  key: string = 'name'; reverse: boolean = true; config: any;
  p: number = 1; pagecount: number = 5 ; nop: number; totrec: number; outorec: number; filter: any; selectRowsText: string;

  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService,
    private postService: DevicemasterService, private listService: KModulelistbindingService,
    private cryptService: CryptService, private router: Router) { }

  ngOnInit() {

    this.DeviceDetail();


  }

  //sorting
  sort(key) {

    this.key = key;
    this.reverse = !this.reverse;

  }



  DeviceDetail() {

    // console.log("p" + this.p);

    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.pagecount,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue

    }

    // Distributor Detail Grid BIND LIST    
    this.postService.DeviceDetailsAPI(keydata).subscribe(
      (data) => {

        let resdata = data;
        if (resdata['statuscode'] == '200') {

          let resdatadrp = resdata['entity'];
          // Convert to JSON  
          this.stringifiedData = JSON.stringify(resdatadrp);
          // Parse from JSON  
          this.parsedJson = JSON.parse(this.stringifiedData);
          let resdatadev = resdata['list'];

          // Convert to JSON  
          this.stringifiedDataList = JSON.stringify(this.parsedJson.list);
          // Parse from JSON  
          this.parsedJsonList = JSON.parse(this.stringifiedDataList);

          this.devdetail$ = this.parsedJsonList;
          this.devicedetdata = this.parsedJsonList;

          this.nop = this.parsedJson;
          this.totrec = this.parsedJson["count"];
          this.outorec = this.parsedJson["viewCount"];

        }



      });
  }

  pageChanged(event) {

    if (this.selectRowsText == null) {

      this.p = event; this.pagecount = 2;

      // alert(this.pagecountdev);
      let keydata = {
        pageNo: this.p,
        itemsPerPage: this.pagecount,
        searchBy: "",
        searchType: "",
        totalRecords: "NA",
        pageID: "1",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }

      // Distributor Detail Grid BIND LIST    
      this.postService.DeviceDetailsAPI(keydata).subscribe(
        (data) => {

          let resdata = data;
          if (resdata['statuscode'] == '200') {

            let resdatadrp = resdata['entity'];
            // Convert to JSON  
            this.stringifiedData = JSON.stringify(resdatadrp);
            // Parse from JSON  
            this.parsedJson = JSON.parse(this.stringifiedData);
            let resdatadev = resdata['list'];

            // Convert to JSON  
            this.stringifiedDataList = JSON.stringify(this.parsedJson.list);
            // Parse from JSON  
            this.parsedJsonList = JSON.parse(this.stringifiedDataList);

            this.devdetail$ = this.parsedJsonList;
            this.devicedetdata = this.parsedJsonList;

            this.nop = this.parsedJson;
            this.totrec = this.parsedJson["count"];
            this.outorec = this.parsedJson["viewCount"];

          }



        });
    }
    else {

      this.p = event; this.pagecount = parseInt(this.selectRowsText);

      // alert(this.pagecountdev);
      let keydata = {
        param1: localStorage.getItem("loginid"),
        param2: "",
        param3: event,
        param4: this.pagecount
      }

      // Device Detail Grid BIND LIST    
      // Distributor Detail Grid BIND LIST    
      this.postService.DeviceDetailsAPI(keydata).subscribe(
        (data) => {

          let resdata = data;
          if (resdata['statuscode'] == '200') {

            let resdatadrp = resdata['entity'];
            // Convert to JSON  
            this.stringifiedData = JSON.stringify(resdatadrp);
            // Parse from JSON  
            this.parsedJson = JSON.parse(this.stringifiedData);
            let resdatadev = resdata['list'];

            // Convert to JSON  
            this.stringifiedDataList = JSON.stringify(this.parsedJson.list);
            // Parse from JSON  
            this.parsedJsonList = JSON.parse(this.stringifiedDataList);

            this.devdetail$ = this.parsedJsonList;
            this.devicedetdata = this.parsedJsonList;

            this.nop = this.parsedJson;
            this.totrec = this.parsedJson["count"];
            this.outorec = this.parsedJson["viewCount"];

          }



        });
    }
  }

  newEntryform() {
    //document.getElementById("devicenew").style.display="block";
    //document.getElementById("devicebulk").style.display="none";

  }

  BulkEntryform() {
    //document.getElementById("devicenew").style.display="none";
    //document.getElementById("devicebulk").style.display="block";

  }

  EncryptPageName() {
    this.cryptService.encrypt("Device Device")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
  //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }
  DeviceExcelDetail(){}

}
