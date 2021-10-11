import { Paramcls } from './../../../../../paramcls';
import { VehiclemakeService } from './../../../../APIService/vehiclemake.service';
import { CryptService } from './../../services/crypt.service';
import { ExportToExcelService } from './../../services/export-to-excel.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Subject } from 'rxjs';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import * as xlsx from 'xlsx';
import { PdfService } from '../../services/pdf.service';
declare var SuccessAlert: any;
declare var errorAlert: any;
declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-vehiclemakedetail',
  templateUrl: './vehiclemakedetail.component.html',
  styleUrls: ['./vehiclemakedetail.component.css']
})
export class VehiclemakedetailComponent implements OnInit {

  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  encryptedpageNameValue: string;
  encryptedpageUrlValue: string;
  timer: any;
  pageUrl = this.router.url;write_privilege:string;

  private _success = new Subject<string>(); successMessageUpdate: string;
  public loading = false; 
  p: any = 1; 
  pagecount: number = 10; 
  count: number; 
  viewcount: number;
  key: string = 'name'; 
  reverse: boolean = true;
  CustRemarktext: string; 
  filter: string; 
  remarks: string; 
  datafromrespo: string;


  cust_email: string; 
  cust_mobno: string; 
  cust_state: any; cust_city: any; cust_alt_mobno: string;
  reg_makename: string; pin_code: string;  // change by KJ
  customer_id: string;
  itemsPerPage: any = 10;
  // ListOfDistributor$:Object;ListOfDealer$:Object;ListOfState$:Object;ListOfCity$:Object;CustomerDetails$:Object; ListOfCustomerType$:Object;  ListOfCustomerCategory$:Object;


  //NgModel Change by KJ
  VehicleMakeDetails$: Object;
  VehicleMakeDetails1$: any;
  descriptionmakeText: string;
  vehiclemake_name: string;
  vehiclemake_id: string;




  // config = {
  //   displayKey: "param2", // if objects array passed which key to be displayed defaults to description
  //   search: true,
  //   limitTo: this.count,
  //   height: '200px',
  // };
  constructor(public excelservice: ExportToExcelService, private cryptService: CryptService, private router: Router,
    private vehiclemakeService: VehiclemakeService, public pdfservice: PdfService) { }


  ngOnInit() {

    /* ------------------------------- Wizards start Ts------------------------------------------------- */

    this.count = 0;
    this.viewcount = 0;

    this.EncryptPageName();
    this.EncryptPageUrl();

    this.MakeDetail();
    this.clear();
    this.write_privilege =sessionStorage.getItem('writePrivilege');

    if(this.write_privilege == "false")
    {
      $("#editbtn").css("display", "none");
      $("#deletebtn").css("display", "none");
      $("#addnew").css("display", "none");
     $('#editbtn').hide();
     $('.material-icons md-18').css("display", "none");
     $('#deletebtn').attr('disabled','disabled');
     $('#addnew').attr('disabled','disabled');
    }
    /* ------------------------------- Wizards end Ts------------------------------------------------- */

  }






  //Done By KJ
  EncryptPageName() {
    this.cryptService.encrypt("Vehicle Make Management")
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
    document.getElementById("vendordtls").style.display = "none";
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
    document.getElementById("vendordtls").style.display = "block";
    document.getElementById("modelfooter").style.display = "none";
    document.getElementById("container").style.display = "none";
    if(this.write_privilege == "false")
    {
      $('#editbtn').hide();
    }

  }



  //update by KJ
  setdata(com: Paramcls) {
    this.vehiclemake_id = com.param1;
    this.vehiclemake_name = com.param2;
    this.descriptionmakeText = com.param5;
    this.backdetailsbtn();
  }
  clear() {
    this.vehiclemake_name = "";
    this.descriptionmakeText = "";
    this.remarkmakeText = "";
  }

  remarkmakeText: any;
  editmake() {
    var makeName = $('#regmakename').val();
    var descriptionName = $('#regdescriptionname').val();
    var remark = $('#remarkupdatemake').val();
    this.vehiclemake_name = makeName.substring(0, 1).toUpperCase() + makeName.substring(1);
    this.descriptionmakeText = descriptionName.substring(0, 1).toUpperCase() + descriptionName.substring(1);
    this.remarkmakeText = remark.substring(0, 1).toUpperCase() + remark.substring(1);

    var isValid = true;
    if ((!makeName && makeName.length <= 0) || makeName.length < 3) {
      isValid = false;
      $('#msg_errorupdate').html('Please Enter Vehicle Make Name').show();
      $('#regmakename').focus();
      setTimeout(function () { document.getElementById("msg_errorupdate").style.display = "none"; }, 3000);

    } else if ((!descriptionName && descriptionName.length <= 0) || descriptionName.length < 3) {
      isValid = false;
      $('#msg_errorupdate').html('Please Enter Description').show();
      $('#regdescriptionname').focus();
      setTimeout(function () { document.getElementById("msg_errorupdate").style.display = "none"; }, 3000);

    } else
      if ((!remark && remark.length <= 0) || remark.length < 10) {
        isValid = false;
        $('#msg_errorremark').html('Please Enter Remark').show();
        $('#remarkupdatemake').focus();
        setTimeout(function () { document.getElementById("msg_errorremark").style.display = "none"; }, 3000);
      }
      else {

        let dataL = {
          param1: this.remarkmakeText,
          param2: this.vehiclemake_id,
          param3: this.vehiclemake_name, param4: this.descriptionmakeText,
          pageID: "7",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue
        }

        try { AddLoader() } catch (e) { alert(e) }
        this.vehiclemakeService.UpdateVehicleMakeEditAPI(dataL).subscribe((data) => {

          try { RemoveLoader() } catch (e) { alert(e) }
          this.datafromrespo = data.entity;
          var msg = this.datafromrespo;
          if (data.statuscode == '200') {
            SuccessAlert(msg);
           
            this.clear();
            this.MakeDetail();
            $('#myModalwizard').modal('hide');
            $('.modal-backdrop.show').css('display', 'none');
          }
          else {
            errorAlert(msg);
          }

        });
      }
  }
  MakeDetail() {

    this.loading = true;
    this.pagecount = 10;
    // this.itemsPerPage = 10;
    // this.p = 1;
    let keydata = {
      pageNo: this.p,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
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
        let resdatalist = data.entity.responsedatalist;
        let vendorlist = resdatalist;
        this.VehicleMakeDetails$ = vendorlist;
        this.count = data.entity.count;
        this.viewcount = data.entity.viewCount;
        this.loading = false;
      });
    this.MakeDetail1();
  }

  /*---------------- cunstomer details function end  --------------------*/
  /*---------------Customer search start --------------------------*/

  searchdata() {
   this.p = 1;
   this.MakeDetail();
  }
  








  Refreshfunction() {
    this.loading = true;
    this.filter = "";
    this.p = 1;
    this.ngOnInit();
  }

  /*------------------Search End ---------------------*/

  createPDF()
  {
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
    this.vehiclemakeService.VehicleMakeDetailsAPI(keydata).subscribe((response) => {
      RemoveLoader();
      console.log(response);
      let pdfdata  = response.entity.responsedatalist;

      let pdfTableData;
      let dataArray = []
      for (let i = 0; i < pdfdata.length; i++) {
        pdfTableData = {
          "#": pdfdata[i]["rowNumber"],
          "Vehicle Make Name": pdfdata[i]["param2"],
          "Description": pdfdata[i]["param5"],
          "Creation Date": pdfdata[i]["param3"]
        }
        dataArray.push(pdfTableData)
      };
      this.pdfservice.CreatePDFData(dataArray, "Vehicle Make Details");
    })
  }


  sort(key) {

    // alert(key);

    this.key = key;
    this.reverse = !this.reverse;

  }

  // Done by KJ

  MakeDeletefunction() {
    var isValid = true;
    var deleteremark = $('#makedelremark').val();
    deleteremark = deleteremark.substring(0, 1).toUpperCase() + deleteremark.substring(1);

    if (!deleteremark && deleteremark.length <= 0) {
      isValid = false;
      $('#msg_error_delete').html('Please Enter Remark.').show();
      $('#makedelremark').focus();
    }
    else {
      let dataL = {
        param1: deleteremark,
        param2: this.vehiclemake_id,
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }

      try { AddLoader() } catch (e) { alert(e) }
      this.vehiclemakeService.DeleteV3VehicleMakeAPI(dataL).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.datafromrespo = data.entity;
        var msg = this.datafromrespo;
        if (data.statuscode == '200') {
          SuccessAlert(msg);
          this.MakeDetail();
          $('#modeldelete').modal('hide');
          $('#myModalwizard').modal('hide');
          $('.modal-backdrop.show').css('display', 'none');
        }
        else {
          errorAlert(msg);
        }
      });
    }
  }


  closemodal() {
    this.remarks = "";


    $('#modeldelete').modal('hide');
 
    $('.modal-backdrop.show').css('display', 'none');
  }


  SelectRows() {
    this.p = 1;
    this.MakeDetail();
  }


  MakepageChanged(event) {
    this.p = event;
    this.MakeDetail();
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
      this.vehiclemakeService.VehicleMakeDetailsAPI(keydata).subscribe(
        (data) => {
          try { RemoveLoader() } catch (e) { alert(e) }
          let resdatalist = data.entity.responsedatalist;
          let vendorlist = resdatalist;
          this.VehicleMakeDetails1$ = vendorlist;
          this.PrepareExcelData(this.VehicleMakeDetails1$);
        });
  }

  excelData: any = [];

  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      try {
        var obj = {
          "#": i + 1,
          "Vehicle Make Name": data[i].param2,
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

  // PrepareExcelData(data) {
  //   this.excelData = [];
  //   for (var i = 0; i < data.length; i++) {
  //     try {
  //       var obj = {

  //         "#": i + 1,
  //         "Vehicle Make Name": data[i].param2,
  //         "Description": data[i].param5,
  //         "Creation Date": data[i].param3

  //       }
  //     } catch (e) { }
  //     this.excelData.push(obj);
  //   }
  // }


  MakeDetail1() {

    this.loading = true;
    let keydata = {
      // param1: this.divisiondetail["param1"],
      pageNo: "",
      itemsPerPage: 10,
      searchBy: "",
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    // Distributor Detail Grid BIND LIST    
    this.vehiclemakeService.VehicleMakeDetailsAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        let resdatalist = data.entity.list;
        //  this.resdata = 
        // console.log("wekcome_ "+resdata);

        let vendorlist = resdatalist;

        this.VehicleMakeDetails1$ = data.entity.list;
        this.PrepareExcelData(this.VehicleMakeDetails1$);

        this.loading = false;

      });
  }
}
