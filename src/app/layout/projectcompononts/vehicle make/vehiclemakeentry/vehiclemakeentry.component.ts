import { VehiclemakeService } from './../../../../APIService/vehiclemake.service';
import { CryptService } from './../../services/crypt.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
declare var SuccessAlert: any;
declare var errorAlert: any;
import * as $ from 'jquery';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
@Component({
  selector: 'app-vehiclemakeentry',
  templateUrl: './vehiclemakeentry.component.html',
  styleUrls: ['./vehiclemakeentry.component.css']
})
export class VehiclemakeentryComponent implements OnInit {
  @Output()
  showDetails = new EventEmitter();


  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;

  count: number; 
  viewcount: number;
  public loading = false; 
  p: number; 
  pagecount: number;
  CustRemarktext: string;

  datafromrespo: string; 
  countnumber: number


  makenameText: string;
  descriptionText: string;

  constructor(private cryptService: CryptService, private router: Router, private vehiclemakeService: VehiclemakeService) { }


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
    if ((!makeName && makeName.length <= 0) || makeName.length < 3) {
      isValid = false;
      $('#msg_errorentry3').html('Please Enter Make Name').show();
      $('#makenameentry').focus();
      setTimeout(function () { document.getElementById("msg_errorentry3").style.display = "none"; }, 3000);

    } else if ((!descriptionName && descriptionName.length <= 0) || descriptionName.length < 5) {
      isValid = false;
      $('#msg_errorentry3').html('Please Enter Description').show();
      $('#descriptionnameentry').focus();
      setTimeout(function () { document.getElementById("msg_errorentry3").style.display = "none"; }, 3000);

    } else {
      let dataL = {
        remarks: "na",
        vehicleMakeId: "",
        vehicleMakeName: this.makenameText, 
        vehicleMakeDescription: this.descriptionText,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }

      try { AddLoader() } catch (e) { alert(e) }
      this.vehiclemakeService.InsertVehicleMakeAPI(dataL).subscribe((data) => {

        try { RemoveLoader() } catch (e) { alert(e) }
        this.datafromrespo = data.entity;
        var msg = this.datafromrespo;
        if (data.statuscode == 200) {
          SuccessAlert(msg);
          
          this.clear();
          this.closemodal();
          this.showDetails.emit()
        }
        else {
          errorAlert(msg);
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



}
