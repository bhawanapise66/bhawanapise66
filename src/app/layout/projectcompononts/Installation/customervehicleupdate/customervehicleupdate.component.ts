import { VendormodelService } from './../../../../APIService/vendormodel.service';
import { Router } from '@angular/router';

import { ListService } from './../../../../../list.service';
//import { PostService } from './../../../../post.service';

import { Paramcls } from './../../../../../paramcls';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as xlsx from 'xlsx';
import * as $ from 'jquery';
import { CryptService } from '../../services/crypt.service';
import { PdfService } from '../../services/pdf.service';
import { ExportToExcelService } from '../../services/export-to-excel.service';
import { CustomervehicleService } from '../../services/customervehicle.service';
import * as moment from 'moment';

declare var jQuery: any; declare var $: any; declare var AddLoader: any; declare var RemoveLoader: any;
declare var SuccessAlert: any; declare var errorAlert: any;

@Component({
  selector: 'app-customervehicleupdate',
  templateUrl: './customervehicleupdate.component.html',
  styleUrls: ['./customervehicleupdate.component.css']
})

export class CustomervehicleupdateComponent implements OnInit {

  @ViewChild('epltable', { static: false }) epltable: ElementRef; encryptedpageNameValue: string; encryptedpageUrlValue: string;
  key: string = 'name'; reverse: boolean = true; p: number; datafromrespo: string;

  pageUrl = this.router.url;
  private _success = new Subject<string>(); successMessage: string; count: number; viewcount: number;

  public loading = false; pagecount: number; stringifiedData: any; parsedJson: any; stringifiedDataList: any; parsedJsonList: any;
  nop: number; totrec: number; outorec: number; filter: string = ''; selectRows: string; Searchvendor: string;
  VehiclecustDetails$: any; Detailsexcelpdf$: any; pdfData: any = []; ListOfVehicleIcon: any = [];

  excelData: any[]; excelpdfData$: any; pageNumber: any = 1; itemsPerPage: any = 10; totalcount: any; devicetypeNameUpdate: any;

  vehicleno_Text: string; EngineNoText: string; ChassisNoText: string; SelectMakeText: any; dummyselectmake: string;
  SelectModelText: any; selectmodeldummy: string; SelectVehicleIconText: any; selectvehicleicondummy: string;
  VehicleNameText: string; RenewaldateText: string; InstallationdateText: string; vehicleclassdummy: string; vehicleclassText: any;
  PurposeUseText: string; Remarkupdate: string; icongreen: any; iconyellow: any; iconblue: any; icongray: any;
  showiconpath: any; actualrunnpathcar: any; actualstoppathcar: any; actualidlepathcar: any; actualnonpollpathcar: any;
  viewiconpath: any; viewrunnpathcar: any; viewstoppathcar: any; viewidlepathcar: any; viewnonpollpathcar: any;
  actualviewpathrun: any; actualviewpathstop: any; actualviewpathidle: any; actualviewpathnon: any;
  cartext: any; trucktext: any; ambulancetext: any; baloontext: any; containertext: any;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };

  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService, private vendormodelservice: VendormodelService,
    private listService: ListService, private cryptService: CryptService, private router: Router, public pdfservice: PdfService
    , public excelservice: ExportToExcelService, private custv: CustomervehicleService) { }

  ngOnInit() {

    (function ($) {
      $(document).ready(function () {
        $('#exampleModal').on('shown.bs.modal', function () {
          $('#partynameentry').focus();
        })
      });
    })(jQuery);


    (function ($) {

      /* calander picker */
      var start = moment().subtract(29, 'days');
      var end = moment();

      function cb(start, end) {
        $('#daterangeadminux2 span').html(start.format('MMM D, YY') + ' - ' + end.format('MMM D, YY'));
      }

      $('#daterangeadminux2').daterangepicker({
        startDate: start,
        endDate: end,
        opens: 'left'
      }, cb);

      cb(start, end);
      $('#daterangeadminux2').on('show.daterangepicker', function (ev, picker) {
        var thisdp = $('.daterangepicker');
        setTimeout(function () {
          thisdp.addClass('active');
        }, 100);
      });
      $('#daterangeadminux2').on('hide.daterangepicker', function (ev, picker) {
        var thisdpc = $('.daterangepicker');
        thisdpc.removeClass('active');

      });
      var path = '../assets/img/background-part.png';
      $('.daterangepicker2').append('<div class="background" style="background-image: url(' + path + '); z-index:-1; height:00px;"><img src="../assets/img/background-part.png" alt="" style="display:none"></div>')
      /* calander picker ends */

      /* calander single  picker ends */
      $('.datepicker').daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 1901
      }, function (start, end, label) { });

      $('.datepicker').on('show.daterangepicker', function (ev, picker) {
        var thisdp = $('.daterangepicker');
        setTimeout(function () {
          thisdp.addClass('active');
        }, 100);
      });
      $('.datepicker').on('hide.daterangepicker', function (ev, picker) {
        var thisdpc = $('.daterangepicker');
        thisdpc.removeClass('active');

      });
      /* calander single picker ends */


    })(jQuery);

    this.EncryptPageName(); this.EncryptPageUrl(); this.CustomerVehicleDetail(); this.SelectMakelist();
    this.VehicleClasslist();

    document.getElementById("vicodiv").style.display = "none"; document.getElementById("carvicodiv").style.display = "none";
  }

  editpageform() {
    document.getElementById("backdetailsbtn").style.display = "block";
    document.getElementById("editbtn").style.display = "none";
    document.getElementById("vendordtls").style.display = "none";
    document.getElementById("container").style.display = "block";
    document.getElementById("modelfooter").style.display = "block";
    document.getElementById("uvmd").style.display = "block";
    document.getElementById("vmd").style.display = "none";

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

  ListOfVehicleclass = []; selectvehicleclass: string;

  dummyvehicleclass() {
    this.vehicleclassdummy = this.vehicleclassText.param1;
  }

  dumyselectmodel() {
    this.selectmodeldummy = this.SelectModelText.param2;
  }

  dummyvehicleicon() {

    document.getElementById("carvicodiv").style.display = "block";

    this.selectvehicleicondummy = this.SelectVehicleIconText.param2;
  }

  carfullpath: any; truckfullpath: any; baloonfullpath: any; containerfullpath: any; ambulancefullpath: any;
  changevehicleicon() {
    document.getElementById("carvicodiv").style.display = "block";

    let keydata = {

      pageNo: 1,
      itemsPerPage: this.pagecount,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue

    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.VehicleIconList(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.ListOfVehicleIcon = data.entity.responsedatalist;

        for (let i = 0; i < this.ListOfVehicleIcon.length; i++) {

          if (this.ListOfVehicleIcon[i]["param2"] == "Car") {
            let pathcar = this.ListOfVehicleIcon[i]["param5"];
            let img1car = pathcar.split("/");
            let filecar = img1car[img1car.length - 1];
            this.showiconpath = this.ListOfVehicleIcon[i]["param11"];
            this.carfullpath = this.showiconpath + "" + filecar;
          }
          else if (this.ListOfVehicleIcon[i]["param2"] == "Truck") {
            let pathtruck = this.ListOfVehicleIcon[i]["param5"];;
            let img1truck = pathtruck.split("/");
            let filetruck = img1truck[img1truck.length - 1];
            this.showiconpath = this.ListOfVehicleIcon[i]["param11"];
            this.truckfullpath = this.showiconpath + "" + filetruck;
          }
          else if (this.ListOfVehicleIcon[i]["param2"] == "ambulance") {
            let pathambulance = this.ListOfVehicleIcon[i]["param5"];;
            let img1ambulance = pathambulance.split("/");
            let fileambulance = img1ambulance[img1ambulance.length - 1];
            this.ambulancefullpath = this.showiconpath + "" + fileambulance;
          }
          else if (this.ListOfVehicleIcon[i]["param2"] == "baloon") {
            let pathbaloon = this.ListOfVehicleIcon[i]["param5"];;
            let img1baloon = pathbaloon.split("/");
            let filebaloon = img1baloon[img1baloon.length - 1];
            this.baloonfullpath = this.showiconpath + "" + filebaloon;
          }
          else if (this.ListOfVehicleIcon[i]["param2"] == "container") {
            let pathcontainer = this.ListOfVehicleIcon[i]["param5"];;
            let img1container = pathcontainer.split("/");
            let filecontainer = img1container[img1container.length - 1];
            this.containerfullpath = this.showiconpath + "" + filecontainer;
          }
        }



      });

  }

  valvehicle: any; vehicleicoid: any;
  OnClickVehicleIcon(data) {
    let dval = data;
    this.valvehicle = dval.param2;
    let keydata = {

      pageNo: 1,
      itemsPerPage: this.pagecount,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue

    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.VehicleIconList(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.ListOfVehicleIcon = data.entity.responsedatalist;


        for (let i = 0; i < this.ListOfVehicleIcon.length; i++) {

          if (this.valvehicle == this.ListOfVehicleIcon[i]["param2"]) {

            let viewpathrun = this.ListOfVehicleIcon[i]["param5"];
            let mainimg1viewrun = viewpathrun.split("/");
            let file1 = mainimg1viewrun[mainimg1viewrun.length - 1];
            this.viewiconpath = this.ListOfVehicleIcon[i]["param11"];
            this.actualviewpathrun = this.viewiconpath + "" + file1;

            let viewpathstop = this.ListOfVehicleIcon[i]["param6"];
            let mainimg1viewstop = viewpathstop.split("/");
            let file2 = mainimg1viewstop[mainimg1viewstop.length - 1];
            this.viewiconpath = this.ListOfVehicleIcon[i]["param11"];
            this.actualviewpathstop = this.viewiconpath + "" + file2;

            let viewpathidle = this.ListOfVehicleIcon[i]["param7"];
            let mainimg1viewidle = viewpathidle.split("/");
            let file3 = mainimg1viewidle[mainimg1viewidle.length - 1];
            this.viewiconpath = this.ListOfVehicleIcon[i]["param11"];
            this.actualviewpathidle = this.viewiconpath + "" + file3;

            let viewpathnon = this.ListOfVehicleIcon[i]["param8"];
            let mainimg1viewnon = viewpathnon.split("/");
            let file4 = mainimg1viewnon[mainimg1viewnon.length - 1];
            this.viewiconpath = this.ListOfVehicleIcon[i]["param11"];
            this.actualviewpathnon = this.viewiconpath + "" + file4;

            this.vehicleiconid = this.ListOfVehicleIcon[i]["param1"];
          }
          else if (this.valvehicle == this.ListOfVehicleIcon[i]["param2"]) {
            let viewpathrun = this.ListOfVehicleIcon[i]["param5"];
            let mainimg1viewrun = viewpathrun.split("/");
            let file1 = mainimg1viewrun[mainimg1viewrun.length - 1];
            this.viewiconpath = this.ListOfVehicleIcon[i]["param11"];
            this.actualviewpathrun = this.viewiconpath + "" + file1;

            let viewpathstop = this.ListOfVehicleIcon[i]["param6"];
            let mainimg1viewstop = viewpathstop.split("/");
            let file2 = mainimg1viewstop[mainimg1viewstop.length - 1];
            this.viewiconpath = this.ListOfVehicleIcon[i]["param11"];
            this.actualviewpathstop = this.viewiconpath + "" + file2;

            let viewpathidle = this.ListOfVehicleIcon[i]["param7"];
            let mainimg1viewidle = viewpathidle.split("/");
            let file3 = mainimg1viewidle[mainimg1viewidle.length - 1];
            this.viewiconpath = this.ListOfVehicleIcon[i]["param11"];
            this.actualviewpathidle = this.viewiconpath + "" + file3;

            let viewpathnon = this.ListOfVehicleIcon[i]["param8"];
            let mainimg1viewnon = viewpathnon.split("/");
            let file4 = mainimg1viewnon[mainimg1viewnon.length - 1];
            this.viewiconpath = this.ListOfVehicleIcon[i]["param11"];
            this.actualviewpathnon = this.viewiconpath + "" + file4;

            this.vehicleiconid = this.ListOfVehicleIcon[i]["param1"];
          }
          else if (this.valvehicle == this.ListOfVehicleIcon[i]["param2"]) {
            let viewpathrun = this.ListOfVehicleIcon[i]["param5"];
            let mainimg1viewrun = viewpathrun.split("/");
            let file1 = mainimg1viewrun[mainimg1viewrun.length - 1];
            this.viewiconpath = this.ListOfVehicleIcon[i]["param11"];
            this.actualviewpathrun = this.viewiconpath + "" + file1;

            let viewpathstop = this.ListOfVehicleIcon[i]["param6"];
            let mainimg1viewstop = viewpathstop.split("/");
            let file2 = mainimg1viewstop[mainimg1viewstop.length - 1];
            this.viewiconpath = this.ListOfVehicleIcon[i]["param11"];
            this.actualviewpathstop = this.viewiconpath + "" + file2;

            let viewpathidle = this.ListOfVehicleIcon[i]["param7"];
            let mainimg1viewidle = viewpathidle.split("/");
            let file3 = mainimg1viewidle[mainimg1viewidle.length - 1];
            this.viewiconpath = this.ListOfVehicleIcon[i]["param11"];
            this.actualviewpathidle = this.viewiconpath + "" + file3;

            let viewpathnon = this.ListOfVehicleIcon[i]["param8"];
            let mainimg1viewnon = viewpathnon.split("/");
            let file4 = mainimg1viewnon[mainimg1viewnon.length - 1];
            this.viewiconpath = this.ListOfVehicleIcon[i]["param11"];
            this.actualviewpathnon = this.viewiconpath + "" + file4;

            this.vehicleiconid = this.ListOfVehicleIcon[i]["param1"];
          }
          else if (this.valvehicle == this.ListOfVehicleIcon[i]["param2"]) {
            let viewpathrun = this.ListOfVehicleIcon[i]["param5"];
            let mainimg1viewrun = viewpathrun.split("/");
            let file1 = mainimg1viewrun[mainimg1viewrun.length - 1];
            this.viewiconpath = this.ListOfVehicleIcon[i]["param11"];
            this.actualviewpathrun = this.viewiconpath + "" + file1;

            let viewpathstop = this.ListOfVehicleIcon[i]["param6"];
            let mainimg1viewstop = viewpathstop.split("/");
            let file2 = mainimg1viewstop[mainimg1viewstop.length - 1];
            this.viewiconpath = this.ListOfVehicleIcon[i]["param11"];
            this.actualviewpathstop = this.viewiconpath + "" + file2;

            let viewpathidle = this.ListOfVehicleIcon[i]["param7"];
            let mainimg1viewidle = viewpathidle.split("/");
            let file3 = mainimg1viewidle[mainimg1viewidle.length - 1];
            this.viewiconpath = this.ListOfVehicleIcon[i]["param11"];
            this.actualviewpathidle = this.viewiconpath + "" + file3;

            let viewpathnon = this.ListOfVehicleIcon[i]["param8"];
            let mainimg1viewnon = viewpathnon.split("/");
            let file4 = mainimg1viewnon[mainimg1viewnon.length - 1];
            this.viewiconpath = this.ListOfVehicleIcon[i]["param11"];
            this.actualviewpathnon = this.viewiconpath + "" + file4;

            this.vehicleiconid = this.ListOfVehicleIcon[i]["param1"];
          }
          else if (this.valvehicle == this.ListOfVehicleIcon[i]["param2"]) {
            let viewpathrun = this.ListOfVehicleIcon[i]["param5"];
            let mainimg1viewrun = viewpathrun.split("/");
            let file1 = mainimg1viewrun[mainimg1viewrun.length - 1];
            this.viewiconpath = this.ListOfVehicleIcon[i]["param11"];
            this.actualviewpathrun = this.viewiconpath + "" + file1;

            let viewpathstop = this.ListOfVehicleIcon[i]["param6"];
            let mainimg1viewstop = viewpathstop.split("/");
            let file2 = mainimg1viewstop[mainimg1viewstop.length - 1];
            this.viewiconpath = this.ListOfVehicleIcon[i]["param11"];
            this.actualviewpathstop = this.viewiconpath + "" + file2;

            let viewpathidle = this.ListOfVehicleIcon[i]["param7"];
            let mainimg1viewidle = viewpathidle.split("/");
            let file3 = mainimg1viewidle[mainimg1viewidle.length - 1];
            this.viewiconpath = this.ListOfVehicleIcon[i]["param11"];
            this.actualviewpathidle = this.viewiconpath + "" + file3;

            let viewpathnon = this.ListOfVehicleIcon[i]["param8"];
            let mainimg1viewnon = viewpathnon.split("/");
            let file4 = mainimg1viewnon[mainimg1viewnon.length - 1];
            this.viewiconpath = this.ListOfVehicleIcon[i]["param11"];
            this.actualviewpathnon = this.viewiconpath + "" + file4;

            this.vehicleiconid = this.ListOfVehicleIcon[i]["param1"];
          }

        }
      });

  }

  VehicleClasslist() {

    let keydata = {
      param1: "",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.VehicleClassListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.ListOfVehicleclass = data.entity.list;

      });
  }

  ListOfSelectMake = []; selectvalueofmake: string;

  SelectMakelist() {

    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectMakeListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.ListOfSelectMake = data.entity.list;

      });
  }

  ListOfSelectModel = []; selectmodelid: string;

  SelectModellist() {
    this.dummyselectmake = this.SelectMakeText.param2;
    this.selectvalueofmake = this.SelectMakeText.param1;

    let keydata = {
      param1: this.selectvalueofmake,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectModelListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.ListOfSelectModel = data.entity.list;

      });
  }

  vehicleidspan: string; vehicleclassidspan: string; vehiclemakeidspan: string; vehiclemodelidspan: string; vehicleiconid: string;
  setdata(custv) {

    let custvdetails = custv;

    this.vehicleidspan = custvdetails.param6;
    this.vehiclemakeidspan = custvdetails.param24;
    this.vehiclemodelidspan = custvdetails.param25;
    this.vehicleclassidspan = custvdetails.param26;
    this.vehicleiconid = custvdetails.param47;
    this.vehicleno_Text = custvdetails.param7;
    this.EngineNoText = custvdetails.param9;
    this.ChassisNoText = custvdetails.param8;
    this.vehicleclassText = custvdetails.param29;
    this.SelectMakeText = custvdetails.param27;
    this.SelectModelText = custvdetails.param28;
    this.SelectVehicleIconText = custvdetails.param49;
    this.VehicleNameText = custvdetails.param45;
    this.PurposeUseText = custvdetails.param46;
    this.SelectVehicleIconText = custvdetails.param49;

    let viewpathrun = custvdetails.param50;
    let mainimg1viewrun = viewpathrun.split("/");
    let file1 = mainimg1viewrun[mainimg1viewrun.length - 1];
    this.viewiconpath = custvdetails.param54;
    this.actualviewpathrun = this.viewiconpath + "" + file1;

    let viewpathstop = custvdetails.param51;
    let mainimg1viewstop = viewpathstop.split("/");
    let file2 = mainimg1viewstop[mainimg1viewstop.length - 1];
    this.viewiconpath = custvdetails.param54;
    this.actualviewpathstop = this.viewiconpath + "" + file2;

    let viewpathidle = custvdetails.param52;
    let mainimg1viewidle = viewpathidle.split("/");
    let file3 = mainimg1viewidle[mainimg1viewidle.length - 1];
    this.viewiconpath = custvdetails.param54;
    this.actualviewpathidle = this.viewiconpath + "" + file3;

    let viewpathnon = custvdetails.param53;
    let mainimg1viewnon = viewpathnon.split("/");
    let file4 = mainimg1viewnon[mainimg1viewnon.length - 1];
    this.viewiconpath = custvdetails.param54;
    this.actualviewpathnon = this.viewiconpath + "" + file4;

    this.selectmodeldummy = this.check(this.SelectModelText);

    this.dummyselectmake = this.SelectMakeText.param2;
    this.selectvalueofmake = this.SelectMakeText.param1;

    let keydata = {
      param1: this.vehiclemakeidspan,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectModelListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.ListOfSelectModel = data.entity.list;

      });

    this.VehicleClasslist();

  }

  CustomerVehicleDetail() {
    // this.filter = this.filter.trim();

    let keydata = {
      param1: "",
      param2: "",
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter.trim(),
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    AddLoader()
    // Distributor Detail Grid BIND LIST    
    this.custv.CustomerVehicleDetailsAPI(keydata).subscribe((data) => {
      RemoveLoader()
      this.count = data.entity.count;
      this.viewcount = data.entity.viewCount;
      this.VehiclecustDetails$ = data.entity.responsedatalist;
    });
  }

  searchdata() {
    this.pageNumber = 1;
    this.CustomerVehicleDetail();
  }

  changePageNumber(event) {
    this.pageNumber = event;
    this.CustomerVehicleDetail();
  }

  SelectRowsChange() {
    this.pageNumber = 1;
    this.CustomerVehicleDetail();
  }


  Refreshfunction() {
    this.itemsPerPage = 10;
    this.pageNumber = 1;
    this.filter = '';
    this.CustomerVehicleDetail()
  }


  PageChange(event) {
    this.p = event;
    this.CustomerVehicleDetail();
  }

  exportToExcel() {

    var search = $('#searchData').val();

    let keydata = {
      param1: "",
      param2: "",
      pageNo: "",
      itemsPerPage: "",
      searchBy: search,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    AddLoader()
    // Distributor Detail Grid BIND LIST    
    this.custv.CustomerVehicleDetailsAPI(keydata).subscribe((data) => {
      RemoveLoader()
      this.excelpdfData$ = data.entity.responsedatalist;
      this.PrepareExcelData(this.excelpdfData$);
    });
  }

  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": i + 1,
        "Vehicle Name.": data[i]["param7"],
        "Vehicle No.": data[i]["param7"],
        "Chasis No.": data[i]["param8"],
        "Engine No.": data[i]["param9"],
        "Make": data[i]["param27"],
        "Model": data[i]["param28"],
        "Status": data[i]["param32"],
        "Installed Date": data[i]["param30"],
        "GPS Renewal On": data[i]["param33"]
      }
      this.excelData.push(obj);
    }
    this.excelservice.ExportExcel(this.excelData, "Customer Vehicle Details", 'customervehicledetails')
  }


  exportToPDF() {

    var search = $('#searchData').val();

    let keydata = {
      param1: "",
      param2: "",
      pageNo: "",
      itemsPerPage: "",
      searchBy: search,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    // Distributor Detail Grid BIND LIST    
    this.custv.CustomerVehicleDetailsAPI(keydata).subscribe(
      (data) => {
 RemoveLoader()
        this.excelpdfData$ = data.entity.responsedatalist;
        this.PreparePDFData(this.excelpdfData$);
        // this.excelservice.ExportExcel(this.excelData, "Customer Vehicle Details", 'customervehicledetails')

      });
  }

  PreparePDFData(data) {
    let pdfTableData;
    let dataArray = []
    for (let i = 0; i < data.length; i++) {
      pdfTableData = {
        "#": i + 1,
        "Vehicle Name.": data[i]["param7"],
        "Vehicle No.": data[i]["param7"],
        "Chasis No.": data[i]["param8"],
        "Engine No.": data[i]["param9"],
        "Make": data[i]["param27"],
        "Model": data[i]["param28"],
        "Status": data[i]["param32"],
        "Installed Date": data[i]["param30"],
        "GPS Renewal On": data[i]["param33"]
      }
      dataArray.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(dataArray, "Customer Vehicle Details");

  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  check(data) {
    try {
      if (typeof data === 'object') {
        return data.param1;
      }
      else if (data == '') {
      }
      else {
        return data;
      }
    } catch (e) {
      return '';
    }
  }

  getid(data, value) {
    try {
      if (typeof value === 'object') {
        return value.param1;
      }
      else {
        var index = data.findIndex(x => x.param2 === value);
        return data[index].param1;
      }
    } catch (e) {
      return '';
    }

  }

  updatecustomervehicle() {

    var isValid = true;

    this.dummyselectmake = this.getid(this.ListOfSelectMake, this.SelectMakeText);
    this.selectmodeldummy = this.getid(this.ListOfSelectModel, this.SelectModelText);
    //this.selectmodeldummy = this.SelectModelText.param1;
    this.vehicleclassdummy = this.getid(this.ListOfVehicleclass, this.vehicleclassText);
    this.selectvehicleicondummy = this.getid(this.ListOfVehicleIcon, this.SelectVehicleIconText);

    // Validate Contact Name
    if (!this.vehicleclassText && this.vehicleclassText.length <= 0) {

      isValid = false;
      $('#msg_error').html('Please Select Vehicle Class.').show();
      $('#vehicleclassentry').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
    }
    else if (!this.SelectMakeText && this.SelectMakeText.length <= 0) {
      // validate city

      isValid = false;
      $('#msg_error').html('Please Select Vehicle Make. ').show();
      $('#selectmakeentry').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
    }
    else if (!this.SelectModelText && this.SelectModelText.length <= 0) {
      // validate city

      isValid = false;
      $('#msg_error').html('Please Select Vehicle Model. ').show();
      $('#selectmodelentry').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
    }
    else if (!this.VehicleNameText && this.VehicleNameText.length <= 0) {
      // validate city

      isValid = false;
      $('#msg_error').html('Please Enter Vehicle Name. ').show();
      $('#vehiclenm').focus();
      setTimeout(function () { document.getElementById("msg_error").style.display = "none"; }, 3000);
    }
    else if (this.Remarkupdate == null || this.Remarkupdate == '' || this.Remarkupdate.length < 10) {
      $("#remarkupdate").focus();
    }
    else {

      /* if(this.cartext != null)
      {
        this.selectvehicleicondummy =this.cartext;
      }    
      else if(this.trucktext != null)
      {
        this.selectvehicleicondummy =this.trucktext;
      }
      else if(this.ambulancetext != null)
      {
        this.selectvehicleicondummy =this.ambulancetext;
      }
      else if(this.baloontext != null)
      {
        this.selectvehicleicondummy =this.baloontext;
      }
      else if(this.containertext != null)
      {
        this.selectvehicleicondummy =this.containertext;
      } */

      let dataL;

      dataL = {
        remarks: this.Remarkupdate,
        vehicleId: this.vehicleidspan,
        vehicleMakeId: this.dummyselectmake,
        vehicleModelId: this.selectmodeldummy,
        vehicleclassid: this.vehicleclassidspan,
        vehicleRegNo: this.vehicleno_Text,
        vehicleChasisNo: this.ChassisNoText,
        vehicleEngineNo: this.EngineNoText,
        vehiclename: this.VehicleNameText,
        purposeofuse: this.PurposeUseText,
        vehicleIconId: this.vehicleiconid
      }

      try { AddLoader() } catch (e) { alert(e) }
      this.custv.CustomerVehicleUpdateAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.datafromrespo = data.entity;

        if (data.statuscode == 200) {
          SuccessAlert(data.entity);
          this.CustomerVehicleDetail(); this.clearfunction();
        }
        else {
          errorAlert(data.entity);
        }


      });
    }

  }

  clearfunction() {
    this.vehicleno_Text = ""; this.EngineNoText = ""; this.ChassisNoText = ""; this.vehicleclassText = "";
    this.vehicleclassdummy = ""; this.SelectMakeText = ""; this.dummyselectmake = ""; this.SelectModelText = "";
    this.selectmodeldummy = ""; this.SelectVehicleIconText = ""; this.selectvehicleicondummy = ""; this.VehicleNameText = "";
    this.PurposeUseText = ""; this.Remarkupdate = "";
    document.getElementById("vicodiv").style.display = "none"; document.getElementById("carvicodiv").style.display = "none";
  }

  EncryptPageName() {
    this.cryptService.encrypt("Customer Vehicle Update")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput;
  }

  closemodal() {
    $('.modal-backdrop.show').css('display', 'none');

    document.getElementById("uvmd").style.display = "none";
    document.getElementById("vmd").style.display = "block";
    document.getElementById("backdetailsbtn").style.display = "none";
    document.getElementById("editbtn").style.display = "block";
    document.getElementById("vendordtls").style.display = "block";
    document.getElementById("modelfooter").style.display = "none";
    document.getElementById("container").style.display = "none";
    document.getElementById("vicodiv").style.display = "none"; $("#vicodiv").hide();
    document.getElementById("carvicodiv").style.display = "none"; $("#carvicodiv").hide();
    this.clearfunction();
  }

  closevehicleiconmodal() {
    $('.modal-backdrop.show').css('display', 'none');

    document.getElementById("uvmd").style.display = "block";
    document.getElementById("vmd").style.display = "none";
    document.getElementById("backdetailsbtn").style.display = "block";
    document.getElementById("editbtn").style.display = "none";
    document.getElementById("vendordtls").style.display = "none";
    document.getElementById("modelfooter").style.display = "block";
    document.getElementById("container").style.display = "block";
    document.getElementById("vicodiv").style.display = "block"; $("#vicodiv").show();
    document.getElementById("carvicodiv").style.display = "block"; $("#carvicodiv").show();

  }

}
