import { VehicleclassService } from './../../../../APIService/vehicleclass.service';
import { ListService } from 'src/list.service';
import { CryptService } from './../../services/crypt.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import * as xlsx from 'xlsx';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
declare var SuccessAlert: any;
declare var errorAlert: any;
@Component({
  selector: 'app-vehicleclassentry',
  templateUrl: './vehicleclassentry.component.html',
  styleUrls: ['./vehicleclassentry.component.css']
})


export class VehicleclassentryComponent implements OnInit {

  @Output()
  showDetails = new EventEmitter();

  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;

  pageUrl = this.router.url;

  count: number; viewcount: number;
  public loading = false; p: number; pagecount: number;
  CustRemarktext: string;

  datafromrespo: string; countnumber: number


  classnameText: string;
  descriptionText: string;

  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService, private listService: ListService, private cryptService: CryptService, private router: Router, private vehicleclassService: VehicleclassService) { }


  inputmake: string;
  inputdescription: string;
  ngOnInit() {

    this.EncryptPageName();
    this.EncryptPageUrl();
    this.clear();

  }

  EncryptPageName() {
    this.cryptService.encrypt("Vehicle Class ")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    // console.lcloseog("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }

  insertVechicleClass() {

    if (this.classnameText.length < 3) {
      $('#msg_vehicleclass1').html('Please Enter Vehicle Class').show();
      $('#classnameentry').focus();
      setTimeout(function () { document.getElementById("msg_vehicleclass1").style.display = "none"; }, 3000);

    } else if (this.descriptionText.length < 5) {
      $('#msg_vehicleclass1').html('Please Enter Description').show();
      $('#descriptionnameentry').focus();
      setTimeout(function () { document.getElementById("msg_vehicleclass1").style.display = "none"; }, 3000);

    } else {
      let dataL = {
        remarks: "test remark",
        vehicleclassid: "na",
        vehicleclassname: this.classnameText,
        vehicleclassdescription: this.descriptionText,
      }

      try { AddLoader() } catch (e) { alert(e) }
      this.vehicleclassService.InsertVehicleClassAPI(dataL).subscribe((data) => {

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
    this.classnameText = "";
    this.descriptionText = "";
  }
}
