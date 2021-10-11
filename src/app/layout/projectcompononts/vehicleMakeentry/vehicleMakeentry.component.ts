import { VehiclemakeService } from './../../../APIService/vehiclemake.service';
import { CryptService } from './../services/crypt.service';
import { ListService } from './../../../../list.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
@Component({
  selector: 'app-vehicleMakeentry',
  templateUrl: './vehicleMakeentry.component.html',
  styleUrls: ['./vehicleMakeentry.component.css']
})
export class VehicleMakeentryComponent implements OnInit {


  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;

  count: number; viewcount: number;
  public loading = false; p: number; pagecount: number;
  CustRemarktext: string;

  datafromrespo: string; countnumber: number


  makenameText: string;
  descriptionText: string;

  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService, private listService: ListService, private cryptService: CryptService, private router: Router, private vehiclemakeService: VehiclemakeService) { }


  inputmake: string;
  inputdescription: string;
  ngOnInit() {

    (function ($) {
      $(document).ready(function () {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#makenameentry').focus();
        })
      });
    })(jQuery);

    function validateentryStep11(index, steps) { }

    this.EncryptPageName();
    this.EncryptPageUrl();
    // this.fieldbtn1();



  }

  EncryptPageName() {
    this.cryptService.encrypt("Vehicle Make Management")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    // console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    // console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }



  vensavebtn1() {
    var makeName = $('#makenameentry').val();
    var descriptionName = $('#descriptionnameentry').val();
    this.makenameText = makeName.substring(0, 1).toUpperCase() + makeName.substring(1);
    this.descriptionText = descriptionName.substring(0, 1).toUpperCase() + descriptionName.substring(1);
    var isValid = true;
    if (!makeName && makeName.length <= 0) {
      isValid = false;
      $('#msg_errorentry3').html('Please Enter Make Name').show();
      $('#makenameentry').focus();
      setTimeout(function () { document.getElementById("msg_errorentry3").style.display = "none"; }, 3000);

    } else if (!descriptionName && descriptionName.length <= 0) {
      isValid = false;
      $('#msg_errorentry3').html('Please Enter Description').show();
      $('#descriptionnameentry').focus();
      setTimeout(function () { document.getElementById("msg_errorentry3").style.display = "none"; }, 3000);

    } else {
      let dataL = {
        // remarks:"",
        // vehicleMakeId:"",
        // vehicleMakeName:this.makenameText, vehicleMakeDescription:this.descriptionText, 
        param1: "",
        param2: "",
        param3: this.makenameText, param4: this.descriptionText,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }

      try { AddLoader() } catch (e) { alert(e) }
      this.vehiclemakeService.InsertVehicleMakeAPI(dataL).subscribe((data) => {

        try { RemoveLoader() } catch (e) { alert(e) }
        this.datafromrespo = data.entity;

        if (data.statuscode == 200) {
          $("#successmodelentry").modal('show');
          this.clear();
          this.VehicleMakeDetail();
          this.closemodal();
        }
        else {
          $("#errormodelentry").modal('show');
        }
      });
    }




  }



  closemodal() {
    $("#exampleModal").modal('hide');
    $('.modal-backdrop.show').css('display', 'none');
  }

  clear() {
    this.makenameText = "";
    this.descriptionText = "";
  }

  VehicleMakeDetails$: Object;
  itemsPerPage: number = 10;
  VehicleMakeDetail() {

    this.loading = true;

    this.p = 1;
    this.itemsPerPage = this.pagecount;
    let keydata = {
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
    this.vehiclemakeService.VehicleMakeDetailsAPI(keydata).subscribe(
      (data) => {

        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.list;
        // console.log("wekcome_ "+resdata);
        let vendorlist = resdatalist;
        this.VehicleMakeDetails$ = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
        //  console.log(this.count);
        this.loading = false;
      });
  }

}
