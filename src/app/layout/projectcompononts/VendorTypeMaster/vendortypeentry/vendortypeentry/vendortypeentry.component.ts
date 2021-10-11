import { VendortypeService } from './../../../../../APIService/vendortype.service';
import { ListService } from 'src/list.service';
import { CryptService } from './../../../services/crypt.service';
import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
declare var jQuery: any;
declare var $: any;
declare var SuccessAlert: any;
declare var errorAlert: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
@Component({
  selector: 'app-vendortypeentry',
  templateUrl: './vendortypeentry.component.html',
  styleUrls: ['./vendortypeentry.component.css']
})
export class VendortypeentryComponent implements OnInit {

  @Output()
  showDetails = new EventEmitter()
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  pageUrl = this.router.url;
  public loading = false; p: number; pagecount: number;
  division: any;
  subDivision: string;
  subDivisionDesc: string;

  divisionListArray = [];


  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };
  constructor(private router: Router, private cryptService: CryptService, private listService: ListService, private vendortypemodelService: VendortypeService) {
    this.EncryptPageName(); this.EncryptPageUrl();

  }

  ngOnInit() {

    (function ($) {
      $(document).ready(function () {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#vendortypeid').focus();
        })
      });
    })(jQuery);

  }

  EncryptPageName() {
    this.cryptService.encrypt("Vendor Type Entry")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    //  console.log("encrypted PageName is" + this.encryptedpageNameValue)

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    //  console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }


  datafromrespo: string;
  Vendortypeentry: string;
  vendortypedescription: string;
  InsertVendorType() {

    var vendortypename = $("#vendortypeid").val();
    var description = $("#descvendortypeid").val();
    this.Vendortypeentry = vendortypename.substring(0, 1).toUpperCase() + vendortypename.substring(1);
    this.vendortypedescription = description.substring(0, 1).toUpperCase() + description.substring(1);


    var isValid = true;
    if (!vendortypename && vendortypename.length <= 0) {
      // alert(devicetype);
      isValid = false;
      $('#msg_errordivision').html('Please Enter Vendor Type').show();
      $('#vendortypeid').focus();
      setTimeout(function () { document.getElementById("msg_errordivision").style.display = "none"; }, 3000);
    }
    else if (!description && description.length <= 0) {
      // alert(devicetype);
      isValid = false;
      $('#msg_errordivision').html('Please Enter Description ').show();
      $('#descvendortypeid').focus();
      setTimeout(function () { document.getElementById("msg_errordivision").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        remarks: "NA",
        vendortypeId: 0,
        vendortypeName: this.Vendortypeentry,
        vendortypeDescription: this.vendortypedescription,
        vendortypeRemark: "",
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }

      this.vendortypemodelService.InsertVendortypeAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.datafromrespo = data.entity;
        var msg = this.datafromrespo;
        if (data.statuscode == '200') {
       
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
    this.Vendortypeentry = "";
    this.vendortypedescription = "";
  }

  itemsPerPage: number = 10;
  VendorTypeDetails: any;
  count: number; viewcount: number;
  
}

