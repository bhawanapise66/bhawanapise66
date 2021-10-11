import { Vendor } from './../vendor.model';
import { ExportToExcelService } from './../../services/export-to-excel.service';
import { PdfService } from './../../services/pdf.service';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { ListService } from 'src/list.service';
import { VendormodelService } from './../../../../APIService/vendormodel.service';
import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
declare var $: any;

declare var AddLoader: any;
declare var RemoveLoader: any;


@Component({
  selector: 'app-vendorv1',
  templateUrl: './vendorv1.component.html',
  styleUrls: ['./vendorv1.component.css']
})
export class Vendorv1Component implements OnInit {

  vendor = new Vendor()
  encryptedpageNameValue: any; encryptedpageUrlValue: any;
  vendorTypeList: any; vendorTypeIdedit: any; vendortypeObjEdit: any; supplyListedit: any;
  pageNumber: any = 1; itemsPerPage: any = 10; filter: string = ''; VendorDetails$: any[];
  totalcount: any; viewcount: any;

  toInsert: boolean = false; showDetails: boolean = false;
  vendortypeObj: any;

  wizardStep: number = 1
  step: number = 1;
  supplyOf: object;
  supplyList: any;
  stateList: any[]; cityList: any[]; deviceTypeList: any[];
  stateObj: any; cityObj: any; DeviceTypeObjArr: any[]
  responseMessage: any;
  vendorTypeName: any;
  submitted = false;
  cityName: any;
  stateName: any;
  devicetypename: any;
  key: any;
  reverse: boolean;
  VendorDetailsPDF: any;
  excelData: any[];
  pdfData: any;
  constructor(private vendormodelservice: VendormodelService, private listService: ListService, private cryptService: CryptService,
    private router: Router, public pdfservice: PdfService, public excelservice: ExportToExcelService) { }

  config = { displayKey: "param2", search: true, limitTo: 99999, height: '200px', };


  ngOnInit() {



    this.vendor.devicetypeid = [];
    this.vendor.vendorcontpersemailid = "info@gmail.com";

    this.VendorDetail();
    this.vendortypeListFn();
    this.stateListFn()
  }


  vendortypeListFn() {
    let dataL = {
      pageID: "",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.listService.VendorTypeList(dataL).subscribe((response) => {
      this.vendorTypeList = response.entity;
    })
  }

  getVendorTypeId() {
    this.vendor.vendortypeid = this.vendortypeObj.param1;
    this.vendor.devicetypeid = [];
    this.DeviceTypeObjArr = []
    this.deviceTypeListFn();
  }

  deviceTypeListFn() {
    let dataL = {
      param1: this.vendor.vendortypeid,
      param2: "",
    }
    AddLoader()
    this.listService.SupplyOfList(dataL).subscribe((response) => {
      RemoveLoader()
      this.deviceTypeList = response.entity;
    })
  }

  getDeviceTypeIds() {
    this.vendor.devicetypeid = [];
    this.DeviceTypeObjArr.forEach(element => { this.vendor.devicetypeid.push(element.param1) });
  }

  /*-------------List of State Api ---------------*/

  stateListFn() {
    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectStateListAPI(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.stateList = data.entity.list;
    });
  }

  getStateId() {
    this.vendor.vendorstate = this.stateObj.param1;

    this.cityListFn()
  }

  cityListFn() {
    let keydata = {
      param1: this.vendor.vendorstate,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.SelectCityListAPI(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.cityList = data.entity.list;
    });
  }

  VendorDetail() {
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
    this.vendormodelservice.VendorDetailsAPI(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      if (data.statuscode == 200) {

        this.VendorDetails$ = data.entity.responsedatalist;
        this.totalcount = data.entity.count;
        this.viewcount = data.entity.viewCount;
      }
    });
  }

  searchdata() {
    this.pageNumber = 1;
    this.VendorDetail();
  }

  changeItemsPerPage() {
    this.pageNumber = 1;
    this.VendorDetail();
  }

  Refreshfunction() {
    this.pageNumber = 1;
    this.itemsPerPage = 10;
    this.filter = '';
    this.VendorDetail();
  }

  changePageNumber(event) {
    this.pageNumber = event;
    this.VendorDetail();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }


  editEntries() {
    this.showDetails = false;
    this.step = 1
  }

  backdetailsbtn() {
    this.showDetails = true
  }

  stepWizard() {

  }



  nextStep() {
    switch (this.step) {
      case 1:
        // validate step 1
        if (this.vendortypeObj.length == 0) {
          $('#msg_errorentry').html('Please Select Vendor Type.').show();
          $('#selectvendortype').focus();
          setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
        }
        else if (this.vendor.devicetypeid.length == 0) {
          $('#msg_errorentry').html('Please Select Supply Of.').show();
          $('#supplytypeentry').focus();
          setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
        }
        else if (this.vendor.vendorname == null || this.vendor.vendorname == '') {
          $('#msg_errorentry').html('Please Enter Vendor Name.').show();
          $('#vendorNameentry').focus();
          setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
        }
        else if (this.vendor.vendorshortcode == null || this.vendor.vendorshortcode == '') {
          $('#msg_errorentry').html('Please Enter Short Code .').show();
          $('#shortCodeentry').focus();
          setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
        }
        else if (this.vendor.vendorgst == null || this.vendor.vendorgst == '') {
          $('#msg_errorentry').html('Please Enter GST Number .').show();
          $('#GSTNoentry').focus();
          setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
        }
        else if ((this.vendor.vendorcin != null && this.vendor.vendorcin != '') && this.vendor.vendorcin.length != 21) {
          $('#msg_errorentry').html('Please Enter Valid CIN Number .').show();
          $('#CINNoentry').focus();
          setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
        }
        else if ((this.vendor.vendorlandlineno != null && this.vendor.vendorlandlineno != '') && this.vendor.vendorlandlineno.length != 10 && this.vendor.vendorlandlineno.length != 13) {
          $('#msg_errorentry').html('Please Enter Valid Official Number .').show();
          $('#officialNoentry').focus();
          setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
        }
        else if ((this.vendor.vendorofficialemailid == null || this.vendor.vendorofficialemailid == '' || this.vendor.vendorofficialemailid.includes('@') == false || this.vendor.vendorofficialemailid.includes('.') == false)) {
          $('#msg_errorentry').html('Please Enter Valid Email Address .').show();
          $('#officialEmailentry').focus();
          setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
        }
        // after jumping on step 2
        else {
          this.step2();
          this.nextStepStyle()

          this.step = this.step + 1;
          $('#pernameentry').focus();
        }
        break;
      case 2:
        if (this.vendor.vendorcontactperson == null || this.vendor.vendorcontactperson == '') {
          $('#msg_error_contactentry').html('Please Enter Contact Person Name .').show();
          $('#pernameentry').focus();
          setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
        }
        else if (this.vendor.vendorcontactmobile == null || this.vendor.vendorcontactmobile == '') {
          $('#msg_error_contactentry').html('Please Enter Contact Person Mobile Number .').show();
          $('#alternateNoentry').focus();
          setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
        }
        else if (this.vendor.vendorstate == null || this.vendor.vendorstate == '') {
          $('#msg_error_contactentry').html('Please Select State .').show();
          $('#stateentry').focus();
          setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
        }
        else if (this.vendor.vendorcity == null || this.vendor.vendorcity == '') {
          $('#msg_error_contactentry').html('Please Select City .').show();
          $('#cityentry').focus();
          setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
        }
        else if ((this.vendor.vendorarea != null && this.vendor.vendorarea != '') && this.vendor.vendorarea.length < 5) {
          $('#msg_error_contactentry').html('Please Enter Area .').show();
          $('#areaid').focus();
          setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
        }
        else if ((this.vendor.vendorlandmark != null && this.vendor.vendorlandmark != '') && this.vendor.vendorlandmark.length < 5) {
          $('#msg_error_contactentry').html('Please Enter valid Landmark .').show();
          $('#landmarkid').focus();
          setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
        }
        else if (this.vendor.vendorregaddress1 == null || this.vendor.vendorregaddress1 == '') {
          $('#msg_error_contactentry').html('Please Enter Address .').show();
          $('#regaddressentry').focus();
          setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
        }
        else if (this.vendor.vendorcitypincode == null || this.vendor.vendorcitypincode == '') {
          $('#msg_error_contactentry').html('Please Enter Pincode .').show();
          $('#pincodenoid').focus();
          setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
        }
        // after jumping on step 3 
        else {
          this.step3();
          this.nextStepStyle();

          this.step = this.step + 1;

        }
        break;
    }
  }

  prevStep() {
    switch (this.step) {
      case 2:

        this.step1();
        this.step = this.step - 1;
        this.prevStepStyle()
        break;
      case 3:
        // after jumping on step 2
        this.step2();
        this.step = this.step - 1;
        this.prevStepStyle()
        break;
    }
  }

  step1() {
    document.getElementById('step-11').style.display = 'block';
    document.getElementById('step-12').style.display = 'none';
    document.getElementById('step-13').style.display = 'none';
    (document.getElementById('prev') as HTMLInputElement).disabled = true;
    (document.getElementById('next') as HTMLInputElement).disabled = false;
    (document.getElementById('save') as HTMLInputElement).disabled = true;
  }

  step2() {
    document.getElementById('step-11').style.display = 'none';
    document.getElementById('step-12').style.display = 'block';
    document.getElementById('step-13').style.display = 'none';
    (document.getElementById('prev') as HTMLInputElement).disabled = false;
    (document.getElementById('next') as HTMLInputElement).disabled = false;
    (document.getElementById('save') as HTMLInputElement).disabled = true;
  }

  step3() {
    document.getElementById('step-11').style.display = 'none';
    document.getElementById('step-12').style.display = 'none';
    document.getElementById('step-13').style.display = 'block';
    (document.getElementById('prev') as HTMLInputElement).disabled = false;
    (document.getElementById('next') as HTMLInputElement).disabled = true;
    (document.getElementById('save') as HTMLInputElement).disabled = false;

    // $('#step2li').addClass('done').removeClass('active');
    // $('#step3li').addClass('active') ;
    // $('#prog').css('width','100%') 
  }


  // style for progress bar starts
  // for next step starta
  nextStepStyle() {
    $(".step-wizard ul li:lt(" + (this.step) + ")").each(function () {
      $(this).addClass("done"); $(this).removeClass('active');
    });
    $(".step-wizard ul li:eq(" + (this.step) + ")").addClass("active")
    const p = (this.step) * 100 / 2
    $("#prog").width(p + '%');
  }
  // for next step ends

  // for previous step starts
  prevStepStyle() {

    $(".step-wizard ul li:eq(" + (this.step) + ")").each(function () {
      $(this).removeClass('active');
    });
    $(".step-wizard ul li:eq(" + (this.step - 1) + ")").each(function () {
      $(this).removeClass('done'); $(this).addClass('active');
    });
    var a = this.step - 1;
    $(".step-wizard ul li:lt(" + (a) + ")").each(function () {
      $(this).addClass("done");
    });

    $(".step-wizard ul li:eq(" + (this.step) + ")").addClass("")
    const p = (this.step - 1) * 100 / 2
    $("#prog").width(p + '%');
  }
  //  for previous step ends
  //  style for progress bar ends

  // function for insert and update
  insertVendor() {
    this.submitted = true

    if (this.vendor.vendorbankaccountno1 != null && this.vendor.vendorbankaccountno1 != '' && this.vendor.vendorbankaccountno1.length <= 11) {
      $('#msg_error_bankentry').html('Please Enter Account Number.').show();
      $('#selectvendortype').focus();
      setTimeout(function () { document.getElementById("msg_error_bankentry").style.display = "none"; }, 3000);

    }
    else if (this.vendor.vendorbankname1 != null && this.vendor.vendorbankname1 != '' && this.vendor.vendorbankname1.length <= 3) {
      $('#msg_error_bankentry').html('Please Enter Account Number.').show();
      $('#selectvendortype').focus();
      setTimeout(function () { document.getElementById("msg_error_bankentry").style.display = "none"; }, 3000);

    }
    else if (this.vendor.vendorbankbranchname1 != null && this.vendor.vendorbankbranchname1 != '' && this.vendor.vendorbankbranchname1.length >= 11 && this.vendor.vendorbankbranchname1.length <= 17) {
      $('#msg_error_bankentry').html('Please Enter Account Number.').show();
      $('#selectvendortype').focus();
      setTimeout(function () { document.getElementById("msg_error_bankentry").style.display = "none"; }, 3000);

    }
    else if (this.vendor.vendorbankifsc1 != null && this.vendor.vendorbankifsc1 != '' && this.vendor.vendorbankifsc1.length <= 11) {
      $('#msg_error_bankentry').html('Please Enter Account Number.').show();
      $('#selectvendortype').focus();
      setTimeout(function () { document.getElementById("msg_error_bankentry").style.display = "none"; }, 3000);

    }

    else if (this.toInsert == false && (this.vendor.remarks == null || this.vendor.remarks == '')) {
      $('#Remarkvenupdate').focus();
    }
    else {
      AddLoader()

      if (this.toInsert == true) {
        this.vendormodelservice.InsertVendorAPI(this.vendor).subscribe((response) => {
          RemoveLoader()
          this.responseMessage = response.entity;
          if (response.statuscode == 200) {
            $("#SuccessModal").modal('show');
            this.step = 1;
          }
          else {
            $("#ErrorModal").modal('show');
          }
        })
      }
      else if (this.toInsert == false) {
        this.vendormodelservice.UpdateVendorAPI(this.vendor).subscribe((response) => {
          RemoveLoader()
          this.responseMessage = response.entity;
          if (response.statuscode == 200) {
            $("#SuccessModal").modal('show');
            this.step = 1;
          }
          else {
            $("#ErrorModal").modal('show');
          }
        })
      }

    }
  }
  // function for insert and update ends


  setdata(item) {

    this.toInsert = false; this.showDetails = true;

    this.vendor.vendorid = item.param1;
    this.vendor.vendorname = item.param3;
    this.vendor.vendorshortcode = item.param4;
    this.vendor.vendorregaddress1 = item.param5;
    this.vendor.vendorregaddress2 = item.param6;

    this.cityName = item.param7;
    this.stateName = item.param8;
    if (item.param9 == "0") { this.vendor.vendorcin = '' } else { this.vendor.vendorcin = item.param9 }
    this.vendor.vendorgst = item.param10;
    this.vendor.vendorpan = item.param11;
    this.vendor.vendorcitypincode = item.param12;
    this.vendor.vendorofficialemailid = item.param13;
    if (item.param14 == '0') { this.vendor.vendorlandlineno = '' } else { this.vendor.vendorlandlineno = item.param14 }
    this.vendor.vendorcontactperson = item.param15;
    this.vendor.vendorcontpersemailid = item.param16;
    this.vendor.vendorcontactmobile = item.param17;
    this.vendor.vendorstatusflag = item.param18;
    this.vendor.vendorbankaccountno1 = item.param21;
    this.vendor.vendorbankname1 = item.param22;
    this.vendor.vendorbankifsc1 = item.param23;;
    this.vendor.vendorbankaddress1 = item.param24;
    this.vendor.vendorbankcityname1 = item.param25;
    this.vendor.vendorbankaccountno2 = item.param26;
    this.vendor.vendorbankname2 = item.param27;
    this.vendor.vendorbankifsc2 = item.param28;
    this.vendor.vendorbankaddress2 = item.param29;
    this.vendor.vendorbankcityname2 = item.param30;
    this.vendor.vendorcity = item.param31;
    this.vendor.vendorstate = item.param32;
    this.vendor.vendortypeid = item.param35;
    this.vendorTypeName = item.param36;
    this.vendor.vendorlandmark = item.param37;
    this.vendor.vendorarea = item.param38;
    this.vendor.devicetypeid = item.arrdata1;
    this.devicetypename = JSON.parse(item.param34)

    if (item.param14 == '0') { this.vendor.vendorlandlineno = '' }

    for (let i = 0; i < this.vendorTypeList.length; i++) {
      if (this.vendorTypeName == this.vendorTypeList[i].param2) {
        this.vendortypeObj = this.vendorTypeList[i]
      }
    }
    //   }

    // })
    // vendor type ends
    let dataL = {
      param1: this.vendor.vendortypeid,
      param2: "",
    }
    this.listService.SupplyOfList(dataL).subscribe((response) => {
      if (response.statuscode == 200) {
        this.deviceTypeList = response.entity;
        for (let i = 0; i < this.deviceTypeList.length; i++) {
          for (let j = 0; j < this.devicetypename.length; j++) {
            if (this.devicetypename[j] == this.deviceTypeList[i]['param2']) {
              this.DeviceTypeObjArr.push(this.deviceTypeList[i])
            }

          }
        }

      }
    })

    // supply of starts

    //supply of ends

    //  state starts
    for (let i = 0; i < this.stateList.length; i++) {
      if (this.vendor.vendorstate == this.stateList[i].param1) {
        this.stateObj = this.stateList[i]
      }
    }
    // state ends


    // city starts
    let keydata = {
      param1: this.vendor.vendorstate,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectCityListAPI(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.cityList = data.entity.list;
      for (let i = 0; i < this.cityList.length; i++) {
        if (this.vendor.vendorcity == this.cityList[i].param1) {
          this.cityObj = this.cityList[i]
        }
      }
    })
    // city ends






  }

  enableButton() {
    if (this.toInsert == false) {
      (document.getElementById('save') as HTMLInputElement).disabled = false
    }
  }

  deleteVendor() {

    if (this.vendor.remarks == '') {
      $('#msg_error_delete').html('Please Enter Remark.').show();
      $('#deleteremark').focus();
      setTimeout(function () { document.getElementById("msg_error_delete").style.display = "none"; }, 3000);
    }

    else {
      let dataL = {
        "param1": this.vendor.remarks,
        "param2": this.vendor.vendorid
      }
      $("#modeldelete").modal('hide');
      AddLoader()
      this.vendormodelservice.DeleteVendorAPI(dataL).subscribe((response) => {
        RemoveLoader()
        this.responseMessage = response.entity;
        if (response.statuscode == 200) {
          $("#SuccessModal").modal('show');
        }
        else {
          $("#ErrorModal").modal('show');
        }
      })
    }
  }

  closemodal() {
    this.VendorDetail();
    $("#myModalwizard").modal('hide');
    $('.modal-backdrop.show').css('display', 'none');
    this.vendor = new Vendor();
    this.DeviceTypeObjArr = [];
    this.stateObj = null;
    this.cityObj = null
    this.vendortypeObj = null;
    this.step1()
  }


  exportToPDF() {
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
    this.vendormodelservice.VendorDetailsAPI(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      if (data.statuscode == 200) {

        this.VendorDetailsPDF = data.entity.responsedatalist;
        this.PreparePDFData(this.VendorDetailsPDF)
      }
    });
  }

  exportToExcel() {
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
    this.vendormodelservice.VendorDetailsAPI(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      if (data.statuscode == 200) {

        this.VendorDetailsPDF = data.entity.responsedatalist;
        this.PrepareExcelData(this.VendorDetailsPDF)
      }
    });
  }

  PreparePDFData(data) {
    let pdfTableData;
    for (let i = 0; i < data.length; i++) {
      pdfTableData = {
        "#": i + 1,
        "vendor Type": data[i].param36,
        "Vendor Name": data[i].param3,
        "Email Id": data[i].param13,
        "GST": data[i].param10,
        "Mobile No.": data[i].param17,
        "State": data[i].param8,
        "City": data[i].param7,
        "Address": data[i].param6
      }
      this.pdfData.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(this.pdfData, "Vendor Details");

  }

  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      try {
        var obj = {
          "#": i + 1,
          "vendor Type": data[i].param36,
          "Vendor Name": data[i].param3,
          "Email Id": data[i].param13,
          "GST": data[i].param10,
          "Mobile No.": data[i].param17,
          "State": data[i].param8,
          "City": data[i].param7,
          "Address": data[i].param6
        }
      } catch (e) { }
      this.excelData.push(obj);
    }
    this.excelservice.ExportExcel(this.excelData, 'Vendor Details', 'vendordetails');

  }

}

