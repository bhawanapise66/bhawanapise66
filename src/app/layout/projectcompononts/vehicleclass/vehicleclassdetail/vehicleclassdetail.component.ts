import { Paramcls } from 'src/paramcls';
import { VehicleclassService } from './../../../../APIService/vehicleclass.service';
import { CryptService } from './../../services/crypt.service';
import { ListService } from 'src/list.service';
import { ExportToExcelService } from './../../services/export-to-excel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import * as xlsx from 'xlsx';
import { PdfService } from '../../services/pdf.service';
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
declare var SuccessAlert: any;
declare var errorAlert: any;
@Component({
  selector: 'app-vehicleclassdetail',
  templateUrl: './vehicleclassdetail.component.html',
  styleUrls: ['./vehicleclassdetail.component.css']
})


export class VehicleclassdetailComponent implements OnInit {

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  timer: any;
  pageUrl = this.router.url;
  successMessageUpdate: string;
  public loading = false; 
  pageNumber: any = 1; 
  itemsPerPage: any = 10; 
  count: any; viewcount: any;
  key: string = 'name'; 
  reverse: boolean = true;
  filter: string = ''; 
  deleteText1: string; 
  datafromrespo: string;
  write_privilege:string;
  //NgModel Change by KJ
  VehicleClassDetails$: Object;
  VehicleClassDetails1$: [];
  descriptionclassText: string;
  vehicleclass_name: string;
  vehicleclass_id: string;

  constructor(public pdfservice: PdfService, public excelservice: ExportToExcelService, private modalService: NgbModal, private flashMessage: FlashMessagesService, private listService: ListService, private cryptService: CryptService, private router: Router, private vehicleclassService: VehicleclassService) { }


  ngOnInit() {

    this.write_privilege =sessionStorage.getItem('writePrivilege');

    if(this.write_privilege == "false")
    {
      $("#editbtn").css("display", "none");
      $("#deletebtn").css("display", "none");
      $("#addnewclass").css("display", "none");
     $('#editbtn').hide();
     $('.material-icons md-18').css("display", "none");
     $('#deletebtn').attr('disabled','disabled');
     $('#addnewclass').attr('disabled','disabled');
    }
    this.EncryptPageName();
    this.EncryptPageUrl();
    this.ClassDetail();
  }

  //Done By KJ
  EncryptPageName() {
    this.cryptService.encrypt("Vehicle Class")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
  }

  // Done By KJ
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }


  // Done by KJ
  editpageform() {
    document.getElementById("backdetailsbtn").style.display = "block";
    document.getElementById("editbtn").style.display = "none";
    document.getElementById("classdtls").style.display = "none";
    document.getElementById("container").style.display = "block";
    document.getElementById("modelfooter").style.display = "block";
    document.getElementById("uvmd").style.display = "block";
    document.getElementById("vmd").style.display = "none";
    if(this.write_privilege == "false")
    {
      $('#editbtn').hide();
    }
  }

  // Done by KJ
  backdetailsbtn() {
    document.getElementById("uvmd").style.display = "none";
    document.getElementById("vmd").style.display = "block";
    document.getElementById("backdetailsbtn").style.display = "none";
    document.getElementById("editbtn").style.display = "block";
    document.getElementById("classdtls").style.display = "block";
    document.getElementById("modelfooter").style.display = "none";
    document.getElementById("container").style.display = "none";
    if(this.write_privilege == "false")
    {
      $('#editbtn').hide();
    }
  }

  creationdate: any;

  //update by KJ         Ngmodel
  setdata(com: Paramcls) {
    this.vehicleclass_id = com.param1;
    this.vehicleclass_name = com.param2;
    this.descriptionclassText = com.param5;
    this.creationdate = com.param3;
    this.backdetailsbtn();
  }
  clear() {
    this.vehicleclass_name = "";
    this.descriptionclassText = ""; this.remarkclassText = "";
  }

  remarkclassText: any;
  editvehicleclass() {
    var className = $('#regclassname').val();
    var descriptionName = $('#regdescriptionname').val();
    var remark = $('#remarkupdateclass').val();
    this.vehicleclass_name = className.substring(0, 1).toUpperCase() + className.substring(1);
    this.descriptionclassText = descriptionName.substring(0, 1).toUpperCase() + descriptionName.substring(1);
    this.remarkclassText = remark.substring(0, 1).toUpperCase() + remark.substring(1);
    var isValid = true;
    if ((!className && className.length <= 0) || className.length < 3) {
      isValid = false;
      $('#msg_vehicleclass').html('Please Enter Class Name').show();
      $('#regclassname').focus();
      setTimeout(function () { document.getElementById("msg_vehicleclass").style.display = "none"; }, 3000);

    }
    else if ((!descriptionName && descriptionName.length <= 0) || descriptionName.length < 5) {
      isValid = false;
      $('#msg_vehicleclass').html('Please Enter Description').show();
      $('#regdescriptionname').focus();
      setTimeout(function () { document.getElementById("msg_vehicleclass").style.display = "none"; }, 3000);

    }
    else if ((!remark && remark.length <= 0) || remark.length < 5) {
      isValid = false;
      $('#msg_errorremark').html('Please Enter Remark').show();
      $('#remarkupdateclass').focus();
      setTimeout(function () { document.getElementById("msg_errorremark").style.display = "none"; }, 3000);
    }
    else {

      let dataL = {
        param4: this.descriptionclassText,
        param2: this.vehicleclass_id,
        param3: this.vehicleclass_name,
        param1: this.remarkclassText,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }

      try { AddLoader() } catch (e) { alert(e) }
      this.vehicleclassService.UpdateVehicleClassEditAPI(dataL).subscribe((data) => {

        try { RemoveLoader() } catch (e) { alert(e) }
        this.datafromrespo = data.entity;
        var msg = this.datafromrespo;
        if (data.statuscode == 200) {
          SuccessAlert(msg);
          this.clear();
          this.ClassDetail();
          $('#myModalwizard').modal('hide');
          $('.modal-backdrop.show').css('display', 'none');
      
        }
        else {
          errorAlert(msg);
        }

      });
    }
  }

















  ClassDetail() {
    let keydata = {
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.vehicleclassService.VehicleClassDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.VehicleClassDetails$ = data.entity.responsedatalist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
       
      });
    // this.ClassDetail1();
  }

  /*---------------- cunstomer details function end  --------------------*/
  /*---------------Customer search start --------------------------*/

  SelectRows()
  {
    this.pageNumber = 1;
    this.ClassDetail()
  }

  searchdata()
  {
    this.pageNumber = 1;
    this.ClassDetail()
  }

  ClasspageChanged(event) {
    this.pageNumber = event;
    this.ClassDetail()
  }

  Refreshfunction() {
    this.loading = true; 
    this.filter = ""; 
    this.pageNumber = 1; 
    this.itemsPerPage = 10;
    this.ClassDetail();
  }

  /*------------------Search End ---------------------*/


  createPDF() {
    let keydata = {
      pageNo: "",
      itemsPerPage: "",
      searchBy: this.filter,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    AddLoader()
    this.vehicleclassService.VehicleClassDetailsAPI(keydata).subscribe((response) => {
      RemoveLoader()
      let pdfdata = response.entity.responsedatalist;

      let pdfTableData;
      let dataArray = []
      for (let i = 0; i < pdfdata.length; i++) {
        pdfTableData = {
          "#": pdfdata[i]["rowNumber"],
          "Vehicle Class Name": pdfdata[i]["param2"],
          "Description": pdfdata[i]["param5"],
          "Creation Date": pdfdata[i]["param3"],
        }
        dataArray.push(pdfTableData)
      };
      this.pdfservice.CreatePDFData(dataArray, "Vehicle Class Details");
    })
  }

  
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;

  }


  deleteText9: any;
  ClassDeletefunction() {
    var isValid = true;
    var deleteremark = $('#classdelremark').val();
    deleteremark = deleteremark.substring(0, 1).toUpperCase() + deleteremark.substring(1);

    if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      $('#msg_error_delete').html('Please Enter Remark.').show();
      $('#classdelremark').focus();
      setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);

    }
    else {
      let dataL = {
        param1: deleteremark,
        param2: this.vehicleclass_id,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }

      try { AddLoader() } catch (e) { alert(e) }
      this.vehicleclassService.DeleteVehicleClassAPI(dataL).subscribe((data) => {

        try { RemoveLoader() } catch (e) { alert(e) }

        this.datafromrespo = data.entity;
        var msg = this.datafromrespo;
        if (data.statuscode == 200) {
          SuccessAlert(msg);
          $('#myModalwizard').modal('hide');
          $('#modeldelete').modal('hide');
          $('.modal-backdrop.show').css('display', 'none');
          this.ClassDetail();
          
        }
        else {
          errorAlert(msg);

        }
      });

    }
  }


  createExcel() {
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
      this.vehicleclassService.VehicleClassDetailsAPI(keydata).subscribe(
        (data) => {
          try { RemoveLoader() } catch (e) { alert(e) }
          let resdatalist = data.entity.responsedatalist;
          let vendorlist = resdatalist;
          this.VehicleClassDetails1$ = vendorlist;
          this.PrepareExcelData(this.VehicleClassDetails1$);
        });
  }
  excelData: any = [];
  
  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      try {
        var obj = {
          "#": i + 1,
          "Vehicle Class Name": data[i].param2,
          "Description": data[i].param5,
          "Creation Date": data[i].param3,
        }
      } catch (e) { }
      this.excelData.push(obj);
    }
    this.exportToExcel()
  }

  exportToExcel() {
     this.excelservice.ExportExcel(this.excelData, 'Vehicle Class Details', 'vehicleclassdetails');
  }

  closemodal() {
    this.deleteText9 = "";

   
  
    $('#modeldelete').modal('hide');
 
    $('.modal-backdrop.show').css('display', 'none');
  }


}
