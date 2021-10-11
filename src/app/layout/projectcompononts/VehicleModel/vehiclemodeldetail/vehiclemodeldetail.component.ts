import { ExportToExcelService } from './../../services/export-to-excel.service';
import { PdfService } from './../../services/pdf.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { VehiclemodelService } from 'src/app/APIService/vehiclemodel.service';
import { ListService } from 'src/list.service';
import { Paramcls } from 'src/paramcls';
import { CryptService } from '../../services/crypt.service';

import * as xlsx from 'xlsx';
import * as $ from 'jquery';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
@Component({
  selector: 'app-vehiclemodeldetail',
  templateUrl: './vehiclemodeldetail.component.html',
  styleUrls: ['./vehiclemodeldetail.component.css']
})
export class VehiclemodeldetailComponent implements OnInit {
  constructor(public excelservice: ExportToExcelService, public pdfservice: PdfService, private modalService: NgbModal, private flashMessage: FlashMessagesService, private listService: ListService, private cryptService: CryptService, private router: Router, private vehiclemodelService: VehiclemodelService) {
    this.SelectMakelist();
  }
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  timer: any;
  pageUrl = this.router.url;
  successMessageUpdate: string;
  public loading = false; p: number; pagecount: number = 10; count: number; viewcount: number;
  key: string = 'name'; reverse: boolean = true;
  filter:any;
  itemsPerPage: number = 10;


  ngOnInit() {
    this.EncryptPageName();
    this.EncryptPageUrl();

    this.SelectVehicleClasslist();
    this.Yearlist();
    this.VehicleModelDetail();
    this.deleteText9 = "";
    this.write_privilege = sessionStorage.getItem('writePrivilege');

    if (this.write_privilege == "false") {
      $("#editbtn").css("display", "none");
      $("#deletebtn").css("display", "none");
      $("#addnewmodel").css("display", "none");
      $('#editbtn').hide();
      $('.material-icons md-18').css("display", "none");
      $('#deletebtn').attr('disabled', 'disabled');
      $('#addnewmodel').attr('disabled', 'disabled');
    }

  }
  write_privilege: string;
  vehiclemodel_id: any;
  modelText: string;
  SelectMgfYearText: string;
  makeid: string;
  SelectMakeTextmodel: string;
  SelectMakeText: string;
  classid: string;
  SelectVehicleClassText: string;
  descriptionText: string;
  setdata(com: Paramcls) {
    if (com.param3 == '0') { com.param3 = '' }
    this.vehiclemodel_id = com.param1;   //modelid
    this.modelText = com.param2;             //modelname
    this.SelectMgfYearText = com.param3;     //year                  yearname=this.SelectMgfYearText["param2"]
    this.makeid = com.param4;          //makeid                       makeid=this.SelectMakeText.["param1"]
    this.SelectMakeText = com.param5;    //makename                      makename=this.SelectMakeText.["param2"]
    this.classid = com.param7;               //classid               classid=this.SelectVehicleClassText["param1"]
    this.SelectVehicleClassText = com.param8;  //classname              classname=this.SelectVehicleClassText["param2"]
    this.descriptionText = com.param9;
    this.yearname = this.SelectMgfYearText;
    this.backdetailsbtn();
  }
  remarkroleText: any;
  clear() {
    this.remarkmodelText = "";
    this.SelectMakeText = "";
    this.SelectVehicleClassText = "";
    this.modelText = "";
    this.SelectMgfYearText = "";
    this.descriptionText = "";
    this.remarkroleText = "";
  }

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    // limitTo: this.count,
    height: '200px',
  };

  EncryptPageName() {
    this.cryptService.encrypt("Vehicle Model Detail")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;


  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }
  VehicleModelDetails$: Object;
  VehicleModelDetail() {
    this.loading = true; 
    this.pagecount=10;   
    // this.itemsPerPage=this.pagecount;   
    // this.p = 1;
     let keydata = {
      pageNo: this.p,
      itemsPerPage:this.itemsPerPage, 
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    try { AddLoader() } catch (e) { alert(e) }
    this.vehiclemodelService.VehicleModelDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.responsedatalist;
        let modellist = resdatalist;
        this.VehicleModelDetails$ = modellist;




        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
        this.loading = false;
        
      });
    this.VehicleModelDetail1();
  }


  VehicleModelDetails1$: any;
  VehicleModelDetail1() {
    this.loading = true;
    let keydata = {
      pageNo: "",
      itemsPerPage: "",
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    try { AddLoader() } catch (e) { alert(e) }
    this.vehiclemodelService.VehicleModelDetailsAPI(keydata).subscribe(
      (data) => {

        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.responsedatalist;
        let modellist = resdatalist;

        this.VehicleModelDetails1$ = modellist;

        this.PrepareExcelData(this.VehicleModelDetails1$);
        this.loading = false;
      });
  }

  excelData: any = [];
  PrepareExcelData(data) {
    this.excelData = [];

    for (var i = 0; i < data.length; i++) {
      try {
        var obj = {

          "#": i + 1,
          "Vehicle Make": data[i].param5,
          "Vehicle Class": data[i].param8,
          "Vehicle Model": data[i].param2,
          "Year": data[i].param3,
          "Description": data[i].param9,
          "Creation Date": data[i].param6,

        }
      } catch (e) { }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    this.VehicleModelDetail1();

    this.excelservice.ExportExcel(this.excelData, 'Vehicle Model Details', 'vehiclemodeldetails');

  }


  Refreshfunction() {
    this.loading = true;
    this.filter = "";
    this.ngOnInit();
  }

  createPDF() {

    let pdfTableData;
    let dataArray = []
    for (let i = 0; i < this.VehicleModelDetails1$.length; i++) {
      pdfTableData = {
        "#": this.VehicleModelDetails1$[i]["rowNumber"],
        "Vehicle Make": this.VehicleModelDetails1$[i]["param5"],
        "Vehicle Class": this.VehicleModelDetails1$[i]["param8"],
        "Vehicle Model": this.VehicleModelDetails1$[i]["param2"],
        "Year": this.VehicleModelDetails1$[i]["param3"],
        "Description": this.VehicleModelDetails1$[i]["param9"],
        "Creation Date": this.VehicleModelDetails1$[i]["param6"],
      }
      dataArray.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(dataArray, "Vehicle Model Details");

  }

  searchdata() {
    this.p = 1;
    this.VehicleModelDetail();
  }

  SelectRows() {
    this.p = 1;
    this.VehicleModelDetail();
  }

  MakepageChanged(event) {
   
    this.p = event;
    this.VehicleModelDetail();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;

  }
  ListOfMake = [];
  selectvalueofmake: string;
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
        this.ListOfMake = data.entity;

        this.loading = false;
      });
  }
  ListOfSelectVehicleClass = [];
  selectvalueofvehicleclass: string;
  SelectVehicleClasslist() {
    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    try { AddLoader() } catch (e) { alert(e) }
    this.listService.VehicleClassListAPI(keydata).subscribe(
      (data) => {

        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfSelectVehicleClass = data.entity;
        this.loading = false;
      });
  }

  ListOfYear = [];

  Yearlist() {
    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    try { AddLoader() } catch (e) { alert(e) }
    this.listService.YearListAPI(keydata).subscribe(
      (data) => {

        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfYear = data.entity;
        this.loading = false;
      });
  }


  makename: any;
  SelectVehicleMakeData() {
    // console.log(this.SelectMakeText["param1"]);
    this.makeid = this.SelectMakeText["param1"];
    this.makename = this.SelectMakeText["param2"];
    this.SelectMakeText = this.makename;

  }
  selectdummyclass: any;
  classname: any;
  SelectVehicleClass() {
    this.classid = this.SelectVehicleClassText["param1"];
    this.classname = this.SelectVehicleClassText["param2"];
    this.SelectVehicleClassText = this.classname;
  }

  selectdummyyear: any;
  yearname: string;
  dummymgfyear() {
    // this.selectdummyyear=this.SelectMgfYearText["param1"];
    this.yearname = this.SelectMgfYearText["param2"];
    this.SelectMgfYearText = this.yearname;
  }
  datafromrespo: string;
  selectyear: string; remarkmodelText: any;
  editModel() {
    var isValid = true;
    var regmake = $('#makedummy').val();
    var regclass = $('#classdummy').val();
    var regmodel = $('#modelnameentry').val();
    var regyear = $('#yeardummy').val();
    var regdescription = $('#descriptionnameentry').val();
    var remark = $('#remarkupdatemodel').val();
    this.modelText = regmodel.substring(0, 1).toUpperCase() + regmodel.substring(1);
    this.descriptionText = regdescription.substring(0, 1).toUpperCase() + regdescription.substring(1);
    this.remarkmodelText = remark.substring(0, 1).toUpperCase() + remark.substring(1);

    if (!regmake && regmake.length <= 0) {
      isValid = false;
      $('#msg_errorentry3').html('Please Select Make Name').show();
      setTimeout(function () { document.getElementById("msg_errorentry3").style.display = "none"; }, 3000);
    }
    else if (!regclass && regclass.length <= 0) {
      isValid = false;
      $('#msg_errorentry3').html('Please Select Class Name').show();
      setTimeout(function () { document.getElementById("msg_errorentry3").style.display = "none"; }, 3000);
    }
    else if (!regmodel && regmodel.length <= 0) {
      isValid = false;
      $('#msg_errorentry3').html('Please Enter Model Name').show();
      $('#modelnameentry').focus();
      setTimeout(function () { document.getElementById("msg_errorentry3").style.display = "none"; }, 3000);
    }
    else if (!regyear && regyear.length <= 0) {
      isValid = false;
      $('#msg_errorentry3').html('Please Select Year').show();
      setTimeout(function () { document.getElementById("msg_errorentry3").style.display = "none"; }, 3000);
    }
    else if (!regdescription && regdescription.length <= 0) {
      isValid = false;
      $('#msg_errorentry3').html('Please Enter Description').show();
      $('#descriptionnameentry').focus();
      setTimeout(function () { document.getElementById("msg_errorentry3").style.display = "none"; }, 3000);

    }
    else if (!remark && remark.length <= 0) {
      isValid = false;
      $('#msg_errorremark').html('Please Enter Remark').show();
      $('#remarkupdatemodel').focus();
      setTimeout(function () { document.getElementById("msg_errorremark").style.display = "none"; }, 3000);
    }
    else {
      let dataL = {
        remarks: this.remarkmodelText,
        vehicleModelId: this.vehiclemodel_id,
        year: this.yearname,
        makeId: this.makeid,
        modelName: this.modelText,
        classId: this.classid,
        modelDescription: this.descriptionText,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      console.log(dataL);

      try { AddLoader() } catch (e) { alert(e) }
      this.vehiclemodelService.UpdateVehicleModelAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }



        this.datafromrespo = data.entity;

        if (data.statuscode == 200) {
          this.modelText = "";
          $("#SuccessModal").modal('show');
          this.Refreshfunction();
          this.closemodal();
        }
        else {
          $("#ErrorModal").modal('show');
        }

      });
    }



  }

  closemodal() {
    this.deleteText9 = "";
    this.clear();
    $("#SuccessModal").modal('hide');
    $('#modeldelete').modal('hide');
    $('#myModalwizard').modal('hide');
    $('.modal-backdrop.show').css('display', 'none');
  }
  deleteText9: string;
  ModelDeletefunction() {
    var isValid = true;
    var deleteremark = $('#modeldelremark').val();
    deleteremark = deleteremark.substring(0, 1).toUpperCase() + deleteremark.substring(1);

    if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      $('#msg_error_delete').html('Please Enter Remark.').show();
      $('#modeldelremark').focus();
      setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);

    }
    else {
      let dataL = {
        param1: deleteremark,
        param2: this.vehiclemodel_id,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }
      try { AddLoader() } catch (e) { alert(e) }

      this.vehiclemodelService.DeleteVehicleModelAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        this.datafromrespo = data.entity;

        if (data.statuscode == 200) {
          $("#SuccessModal").modal('show');
          this.Refreshfunction();
          this.closemodal();
        }
        else {
          $("#ErrorModal").modal('show');
        }
      });

    }
  }

  editpageform() {
    document.getElementById("backdetailsbtn").style.display = "block";
    document.getElementById("editbtn").style.display = "none";
    // document.getElementById("customerdtls").style.display="none";
    // document.getElementById("bankdtls").style.display="none";
    document.getElementById("vendordtls").style.display = "none";
    //  document.getElementById("rev2btn").style.display="none";
    //  document.getElementById("revbtn").style.display="none";
    //  document.getElementById("nextviewbtn").style.display="none";
    //  document.getElementById("next2viewbtn").style.display="none";
    document.getElementById("container").style.display = "block";
    document.getElementById("modelfooter").style.display = "block";
    document.getElementById("uvmd").style.display = "block";
    document.getElementById("vmd").style.display = "none";
    if (this.write_privilege == "false") {
      $('#editbtn').hide();
    }
  }

  backdetailsbtn() {
    document.getElementById("uvmd").style.display = "none";
    document.getElementById("vmd").style.display = "block";
    document.getElementById("backdetailsbtn").style.display = "none";
    document.getElementById("editbtn").style.display = "block";
    // document.getElementById("customerdtls").style.display="block";
    // document.getElementById("bankdtls").style.display="block";
    document.getElementById("vendordtls").style.display = "block";
    document.getElementById("modelfooter").style.display = "none";
    //  document.getElementById("rev2btn").style.display="none";
    //  document.getElementById("revbtn").style.display="none";
    //  document.getElementById("nextviewbtn").style.display="block";
    //  document.getElementById("next2viewbtn").style.display="none";
    document.getElementById("container").style.display = "none";
    //  document.getElementById("bankdtls").style.display="none";
    //  document.getElementById("customerdtls").style.display="none";
    if (this.write_privilege == "false") {
      $('#editbtn').hide();
    }
  }
}
