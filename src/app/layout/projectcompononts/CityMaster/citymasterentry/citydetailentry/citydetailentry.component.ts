import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ListService } from './../../../../../../list.service';
import { CryptService } from './../../../services/crypt.service';
import { Router } from '@angular/router';
import { CitymodelService } from './../../../../../APIService/citymodel.service';
import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core'; declare var AddLoader: any;
declare var RemoveLoader: any;
declare var jQuery: any;
declare var $: any;
declare var SuccessAlert: any;
declare var errorAlert: any;
@Component({
  selector: 'app-citydetailentry',
  templateUrl: './citydetailentry.component.html',
  styleUrls: ['./citydetailentry.component.css']
})
export class CitydetailentryComponent implements OnInit {
  @Output()
  showDetails = new EventEmitter();
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  datafromrespo: string;
  pageUrl = this.router.url;

  count: number; viewcount: number;
  public loading = false; p: number; pagecount: number;
  CityRemarktext: string;


  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };


  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService, private listService: ListService, private cryptService: CryptService, private router: Router, private citymodelService: CitymodelService) { }


  ngOnInit() {



    $("#step-14").show();


    this.Statelist();
    this.EncryptPageName();
    this.EncryptPageUrl();
  }


  EncryptPageName() {
    this.cryptService.encrypt("City Master Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    // console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    // console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }

  ListOfState$: Object;
  ListOfState = [];
  statecode: any;
  stateid: any;
  Statelist() {

    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectStateListAPI(keydata).subscribe(
      (data) => {

        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfState = data.entity.list;
        this.loading = false;

      });
  }


  stateText: any;
  statecode1: string;
  stateid1: string;
  ListOfDistrict = [];
  Districtlist() {


    this.statecode1 = this.cust_state["param3"];
    this.stateid1 = this.cust_state["param1"];

    let keydata = {
      param1: this.statecode1,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }


    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectDistrictListAPI(keydata).subscribe(
      (data) => {

        try { RemoveLoader() } catch (e) { alert(e) }
        //  console.log(data.entity)
        // console.log("wekcome_ "+data);
        this.ListOfDistrict = data.entity.list;
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);

        //   let citylist = resdatalist;
        // //  let resdatadev = resdata['list'];
        // //  console.log(resdatadev);
        // //  console.log(citylist);
        //   this.ListOfCity$ = citylist;




        this.loading = false;

      });
  }
  selectstate: any;
  // selectdistrict:any;
  cust_state: string;    // change
  district: string;
  cust_district: any;
  selectdistname: string;
  state_txt: string;
  district_txt1: string;
  citynameentry_txt: string;
  pincodeno_txt: string;
  cityremark_txt: string;
  pin_code: any;

  citynameText: string;
  selectdistrictname: string;
  vensavebtn() {

    this.selectstate = this.cust_state["param1"];

    var isValid = true;


    var stateiddummy = $('#dummystateid').val();
    var districtiddummy = $('#dummydistrictid').val();
    var citydummyid = $('#citynameentryid').val();
    var pincodedummyid = $('#pincodenoid').val();
    this.citynameText = citydummyid.substring(0, 1).toUpperCase() + citydummyid.substring(1);

    if (!stateiddummy && stateiddummy.length <= 0) {
      isValid = false;
      $('#msg_errorentry_city').html('Please Select State').show();
      setTimeout(function () { document.getElementById("msg_errorentry_city").style.display = "none"; }, 3000);
    }
    else if (!districtiddummy && districtiddummy.length <= 0) {
      isValid = false;
      $('#msg_errorentry_city').html('Please Select District').show();
      setTimeout(function () { document.getElementById("msg_errorentry_city").style.display = "none"; }, 3000);
    }
    else if (!citydummyid && citydummyid.length <= 0) {

      isValid = false;
      $('#msg_errorentry_city').html('Please Enter City Name').show();
      $('#citynameentryid').focus();
      setTimeout(function () { document.getElementById("msg_errorentry_city").style.display = "none"; }, 3000);
    }
    else if (!pincodedummyid && pincodedummyid.length <= 0) {

      isValid = false;
      $('#msg_errorentry_city').html('Please Enter Pincode').show();
      $('#pincodenoid').focus();
      setTimeout(function () { document.getElementById("msg_errorentry_city").style.display = "none"; }, 3000);
    }

    else {

      let dataL = {

        param1: "",
        param2: "",
        param3: this.citynameText,
        param4: this.selectstate,
        // param5:this.cust_district
        param5: this.selectdistname1,
        param6: this.citynameText,
        param7: this.pin_code,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }

      try { AddLoader() } catch (e) { alert(e) }
      this.citymodelService.InsertCityAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.datafromrespo = data.entity;
        var msg = this.datafromrespo;

        if (data.statuscode == '200') {
          SuccessAlert(msg);
          this.clear();
          this.ngOnInit();
          this.closemodal();
          this.showDetails.emit()
        }
        else {
          errorAlert(msg);

        }
      });
    }
  }
  selectdistname1: any;
  selectdist() {
    this.selectdistname = this.cust_district.param1;  //param1

    this.selectdistname1 = this.cust_district.param2;
  }

  closemodal() {
    $("#exampleModal").modal('hide');
    $('.modal-backdrop.show').css('display', 'none');
  }
  clear() {
    this.cust_state = "";
    this.cust_district = "";
    this.citynameText = "";
    this.pin_code = "";
    this.CityRemarktext = "";
  }



}
