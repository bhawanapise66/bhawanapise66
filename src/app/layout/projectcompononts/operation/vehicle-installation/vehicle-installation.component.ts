import { UploadimageoneService } from './../../Installation/upload/uploadimageone.service';
import { Vendor } from './../vendor.model';
import { Installation } from './../installation.model';
import { VehicleinstallationService } from './../../../../APIService/vehicleinstallation.service';
import { Component, OnInit } from '@angular/core';
import { ExportToExcelService } from './../../services/export-to-excel.service';
import { PdfService } from './../../services/pdf.service';
import { Router } from '@angular/router';
import { CryptService } from './../../services/crypt.service';
import { ListService } from 'src/list.service';
import { VendormodelService } from './../../../../APIService/vendormodel.service';
declare var jQuery: any;
declare var $: any;

declare var AddLoader: any;
declare var RemoveLoader: any;

@Component({
  selector: 'app-vehicle-installation',
  templateUrl: './vehicle-installation.component.html',
  styleUrls: ['./vehicle-installation.component.css']
})
export class VehicleInstallationComponent implements OnInit {
  installation = new Installation();
  vendor = new Vendor()
  encryptedpageNameValue: any; encryptedpageUrlValue: any;

  vehicledetails: any;
  vendorlist: any; devicetypelist: any;

  pageNumber: any = 1; itemsPerPage: any = 10; filter: string = ''; VendorDetails$: any[]; totalcount: any; viewcount: any;
  totalrecords = "NA"

  toInsert: boolean = false; showDetails: boolean = false;
  toRenew: boolean = false; toUpdate: boolean = false;

  wizardStep: number = 1
  step: number = 1;
  responseMessage: any;
  submitted = false;

  key: any;
  reverse: boolean;
  VendorDetailsPDF: any;
  excelData: any[];
  pdfData: any;
  vendorObj: any;
  vendorid: string = '';

  // for data binding 
  devicetypeobj: any;
  imeilist: any;
  imeiobj: any;
  emplist: any;
  empobj: any;
  devicetypename: any;
  customeobj: any;
  vehicleclasslist: any;
  customerlist: any;
  uniqueNo: any;
  status: any;
  simNo: any;
  customerobj: any;
  classobj: any;
  makelist: any;
  modellist: any;
  makeobj: any;
  modelobj: any;
  statelist: any;
  stateobj: any;
  rtolist: any;
  rtoobj: any;
  iconlist: any;
  yearlist: any;
  yearobj: any;
  iconobj: any;

  progress: { percentage: number } = { percentage: 0 };


  selectedFilesNew: FileList;
  selectedFiles2New: FileList;
  selectedFiles3New: FileList;
  selectedFiles4New: FileList;
  selectedFiles5New: FileList;

  currentFileUpload: File;
  currentFileUpload2: File;
  currentFileUpload3: File;
  currentFileUpload4: File;
  currentFileUpload5: File;

  respooffile: any;
  respooffile2: any;
  respooffile3: any;
  respooffile4: any;
  respooffile5: any;
  vendorName: any;
  empName: any;
  vehicleClassName: any;

  constructor(private installService: VehicleinstallationService, private listService: ListService, private cryptService: CryptService,
    private router: Router, public pdfservice: PdfService, public excelservice: ExportToExcelService, private uploadService: UploadimageoneService) {

  }

  config = { displayKey: "param2", search: true, limitTo: 99999, height: '200px', };


  ngOnInit() {

    this.vehicleDetails();
    this.vendorList();
    this.getDeviceTypeList();
    this.getImeiList();
    this.Employeelist();
    this.getCustomerlist();
    this.getVehicleClassList();
    this.getMakeList();
    this.getYearList();
    this.getStateList();
    this.geticonList();
  }



  /*-------------List of State Api ---------------*/

  vendorList() {

    let keydata = {
      param1: "device",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.VendorListAPI(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.vendorlist = data.entity;
    })
  }

  getVendorId() {
    this.vendorid = this.vendorObj.param1;
    this.getDeviceTypeList()
  }

  getDeviceTypeList() {
    let dataL = {
      param1: this.vendorid
    }
    AddLoader()
    this.listService.DeviceTypeListAPI(dataL).subscribe((response) => {
      RemoveLoader()
      this.devicetypelist = response.entity.list;
    })
  }

  getDeviceTypeId() {
    this.installation.deviceTypeId = this.devicetypeobj.param1;
    this.devicetypename = this.devicetypeobj.param2;
    this.getImeiList()
  }

  getImeiList() {
    let dataL = {
      param1: "",
      param2: this.installation.deviceTypeId,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    AddLoader()
    this.listService.DeviceList_vehicle(dataL).subscribe((response) => {
      RemoveLoader()
      this.imeilist = response.entity.list;
    })
  }
  getImeiNumber() {
    this.installation.deviceId = this.imeiobj.param1;
    this.installation.deviceimeino = this.imeiobj.param2;
    this.uniqueNo = this.imeiobj.param3;
    this.status = this.imeiobj.param5;
    this.simNo = this.imeiobj.param4
    this.Employeelist()
  }

  Employeelist() {
    let keydata = {
      param1: "",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.CompanyEmpList(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.emplist = data.entity.list;
      });
  }


  getEmpId() {
    this.installation.installedBy = this.empobj.param1;
    this.empName = this.empobj.param2
  }

  getCustomerlist() {
    let keydata = {
      param1: "",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.CustomerListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.customerlist = data.entity.list;
      });
  }


  getCustomerId() {
    console.log(this.customerobj)
    this.installation.customerId = this.customerobj.param1;
    this.getVehicleClassList()
  }


  getVehicleClassList() {
    let keydata = {
      param1: this.installation.deviceTypeId,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.VehicleClassListAPI(keydata).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.vehicleclasslist = data.entity.list;
      });
  }

  getClassId() {
    this.installation.vehicleclassid = this.classobj.param1;
  }

  getMakeList() {
    let dataL = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectMakeListAPI(dataL).subscribe(
      (data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.makelist = data.entity.list;
      });
  }

  getMakeId() {
    this.installation.vehicleMakeId = this.makeobj.param1;
    this.getModelList()
  }

  getModelList() {
    let keydata = {
      param1: this.installation.vehicleMakeId,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectModelListAPI(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.modellist = data.entity.list;
    })
  }

  getModelId() {
    this.installation.vehicleModelId = this.modelobj.param1
  }

  getYearList() {
    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.YearListAPI(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.yearlist = data.entity.list;
      this.yearlist.forEach(element => {
        if (element.param2.includes(new Date().getFullYear()) == true) {
          this.yearobj = element;
          this.installation.vehicleMfgYear = this.yearobj.param2;
        }
      });
    });
  }

  getYearId(){
    this.installation.vehicleMfgYear = this.yearobj.param2
  }

  getStateList() {
    let keydata = {
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.listService.SelectStateListAPI(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.statelist = data.entity.list;
    });
  }

  getStateId() {
    this.installation.vehicleStateCode = this.stateobj.param1;
    this.getRTOList()
  }

  getRTOList() {
    let keydata = {
      param1: this.installation.vehicleStateCode,
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }

    this.listService.SelectStateRTOListAPI(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.rtolist = data.entity.list;
    });
  }

  getRTOId() {
    this.installation.vehicleRtoId = this.rtoobj.param1;
  }

  geticonList() {
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
    this.listService.VehicleIconList(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      this.iconlist = data.entity.responsedatalist;
    });
  }

  getIconId() {
    this.installation.vehicleIconId = this.iconobj.param1;
  }



  // for table data
  vehicleDetails() {
    let keydata = {
      param1: "",
      param2: "",
      pageNo: this.pageNumber,
      itemsPerPage: this.itemsPerPage,
      searchBy: this.filter,
      searchType: "",
      totalRecords: this.totalrecords,
      pageID: "dfgd",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { alert(e) }
    this.installService.VehicleInstallationDetails(keydata).subscribe((data) => {
      try { RemoveLoader() } catch (e) { alert(e) }
      if (data.statuscode == 200) {

        this.vehicledetails = data.entity.responsedatalist;
        this.totalcount = data.entity.count;
        this.viewcount = this.vehicledetails.length;
      }
    });
  }

  searchdata() {
    this.pageNumber = 1;
    this.vehicleDetails();
  }

  changeItemsPerPage() {
    this.pageNumber = 1;
    this.vehicleDetails();
  }

  Refreshfunction() {
    this.pageNumber = 1;
    this.itemsPerPage = 10;
    this.filter = '';
    this.vehicleDetails();
  }

  changePageNumber(event) {
    this.pageNumber = event;
    this.vehicleDetails();
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }


  editEntries() {
    this.showDetails = false;
    this.toUpdate = true;
    this.toRenew = false;
    this.showDetails = false
    this.step = 1
  }

  renewalform() {
    this.showDetails = false;
    this.toInsert = false;
    this.toUpdate = false;
    this.toRenew = true;

  }

  backdetailsbtn() {
    this.showDetails = true;
    this.toInsert = false;
    this.toUpdate = false;
    this.toRenew = false;
    this.step = 1;
  }

  stepWizard() {

  }



  nextStep() {
    switch (this.step) {
      case 1:
        // validate step 1
        if (this.vendorid.length == 0) {
          $('#msg_errorentry').html('Please Select Vendor.').show();
          $('#selectvendortype').focus();
          setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
        }
        else if (this.installation.deviceTypeId.length == 0) {
          $('#msg_errorentry').html('Please Select Device Type.').show();
          $('#supplytypeentry').focus();
          setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
        }
        else if (this.installation.deviceimeino.length == 0) {
          $('#msg_errorentry').html('Please Select  MEI Number').show();
          $('#supplytypeentry').focus();
          setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
        }
        else if (this.installation.installedBy.length == 0) {
          $('#msg_errorentry').html('Please Select Installed By.').show();
          $('#supplytypeentry').focus();
          setTimeout(function () { document.getElementById("msg_errorentry").style.display = "none"; }, 3000);
        }
        // after jumping on step 2
        else {
          this.step2();
          this.nextStepStyle()

          this.step = this.step + 1;
          $('#customer').focus();
        }
        break;
      case 2:

        if (this.installation.customerId == null || this.installation.customerId == '') {
          $('#msg_error_contactentry').html('Please Select Customer.').show();
          $('#customer').focus();
          setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
        }
        else if (this.installation.vehicleRegNo == null || this.installation.vehicleRegNo == '') {
          $('#msg_error_contactentry').html('Please Enter Vehicle No.').show();
          $('#vehicleno').focus();
          setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
        }
        else if (this.installation.vehicleChasisNo == null || this.installation.vehicleChasisNo == '') {
          $('#msg_error_contactentry').html('Please Enter Chassis no .').show();
          $('#chassisnumber').focus();
          setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
        }
        else if (this.installation.vehicleEngineNo == null || this.installation.vehicleEngineNo == '') {
          $('#msg_error_contactentry').html('Please Enter Engine No..').show();
          $('#enginenumber').focus();
          setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
        }
        else if (this.installation.vehicleType == null || this.installation.vehicleType == '') {
          $('#msg_error_contactentry').html('Please Select Vehicle Type.').show();
          $('#vehicletype').focus();
          setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
        }
        else if (this.installation.vehicleclassid == null || this.installation.vehicleclassid == '') {
          $('#msg_error_contactentry').html('Please Select Vehicle Class.').show();
          $('#vehicleclass').focus();
          setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
        }
        else if (this.installation.vehicleMakeId == null || this.installation.vehicleMakeId == '') {
          $('#msg_error_contactentry').html('Please Select Vehicle Make .').show();
          $('#vehiclemake').focus();
          setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
        }
        else if (this.installation.vehicleModelId == null || this.installation.vehicleModelId == '') {
          $('#msg_error_contactentry').html('Please Select Vehicle Model.').show();
          $('#vehiclemodel').focus();
          setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
        }
        else if (this.installation.vehicleMfgYear == null || this.installation.vehicleMfgYear == '') {
          $('#msg_error_contactentry').html('Please Select Mfg Year.').show();
          $('#mfgyear').focus();
          setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
        }
        else if (this.installation.vehicleStateCode == null || this.installation.vehicleStateCode == '') {
          $('#msg_error_contactentry').html('Please Select State.').show();
          $('#state').focus();
          setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
        }
        else if (this.installation.vehicleRtoId == null || this.installation.vehicleRtoId == '') {
          $('#msg_error_contactentry').html('Please Select RTO .').show();
          $('#rto').focus();
          setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
        }
        else if (this.installation.vehicleIconId == null || this.installation.vehicleIconId == '') {
          $('#msg_error_contactentry').html('Please Select Icon .').show();
          $('#vehicleicon').focus();
          setTimeout(function () { document.getElementById("msg_error_contactentry").style.display = "none"; }, 3000);
        }
        // after jumping on step 3 
        else {

          this.step3();
          this.nextStepStyle();
          this.step = this.step + 1;

        }
        // this.installation.installedDate = (document.getElementById('installationdate')as HTMLInputElement).value

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

  // for image upload

  customeridentityupload() {
    let vehicledata = {
      param1: this.installation.vehicleRegNo + "_Id",
      param2: this.installation.vehicleChasisNo + "_Id"
    }
    localStorage.setItem("selectdevicetype", this.installation.deviceTypeId);
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFilesNew.item(0);
    this.uploadService.Vehicle_cust_idpushFile(this.currentFileUpload, vehicledata).subscribe(event => {
      if (event['statuscode'] == "200") {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.installation.idproofpath = event['entity'];
        console.log("the return data of file upload 1 " + JSON.stringify(this.installation.idproofpath));
      }
      else {
        alert("ldata is not f");
      }
    });

    this.selectedFilesNew = undefined;
  }

  addressidentityupload() {
    let vehicledata = {
      param1: this.installation.vehicleRegNo + "_Address",
      param2: this.installation.vehicleChasisNo + "_Address"
    }
    localStorage.setItem("selectdevicetype", this.installation.deviceTypeId);
    this.progress.percentage = 0;

    this.currentFileUpload2 = this.selectedFiles2New.item(0);
    this.uploadService.Vehicle_cust_idpushFile(this.currentFileUpload2, vehicledata).subscribe(event => {
      if (event['statuscode'] == "200") {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.installation.addressproofpath = event['entity'];
        console.log("the return data of file upload 2" + JSON.stringify(this.installation.addressproofpath));
      }
      else {
        alert("ldata is not f");
      }
    });

    this.selectedFiles2New = undefined;
  }

  rcidentityupload() {
    let vehicledata = {
      param1: this.installation.vehicleRegNo + "_RC",
      param2: this.installation.vehicleChasisNo + "_RC"
    }
    localStorage.setItem("selectdevicetype", this.installation.deviceTypeId);
    this.progress.percentage = 0;

    this.currentFileUpload3 = this.selectedFiles3New.item(0);
    this.uploadService.Vehicle_cust_idpushFile(this.currentFileUpload3, vehicledata).subscribe(event => {
      if (event['statuscode'] == "200") {
        //  alert("high ");
        try { RemoveLoader() } catch (e) { alert(e) }
        this.installation.rcFile = event['entity'];
        console.log("the return data of file upload 3" + JSON.stringify(this.installation.rcFile));
      }
      else {
        alert("ldata is not f");
      }
    });

    this.selectedFiles3New = undefined;
  }

  deviceUpload() {
    let vehicledata = {
      param1: this.installation.vehicleRegNo + "Device",
      param2: this.installation.vehicleChasisNo + "Device"
    }
    localStorage.setItem("selectdevicetype", this.installation.deviceTypeId);
    this.progress.percentage = 0;

    this.currentFileUpload4 = this.selectedFiles4New.item(0);
    console.log("aaaaaaaaaaaaaaaaaaaa" + this.currentFileUpload4);
    this.uploadService.Vehicle_cust_idpushFile(this.currentFileUpload4, vehicledata).subscribe(event => {
      // if (event.type === HttpEventType.UploadProgress) {
      //   this.progress.percentage = Math.round(100 * event.loaded / event.total);
      // } else if (event instanceof HttpResponse) {
      //   console.log('File is completely uploaded!');
      // }
      if (event['statuscode'] == "200") {
        //  alert("high ");
        try { RemoveLoader() } catch (e) { alert(e) }
        this.installation.devicefilepath = event['entity'];
        console.log("the return data of file upload 4" + JSON.stringify(this.installation.devicefilepath));
      }
      else {
        alert("ldata is not f");
      }
    });

    this.selectedFiles4New = undefined;
  }

  vehicleUpload() {
    let vehicledata = {
      param1: this.installation.vehicleRegNo + "_Vehicle",
      param2: this.installation.vehicleChasisNo + "_Vehicle"
    }
    localStorage.setItem("selectdevicetype", this.installation.deviceTypeId);
    this.progress.percentage = 0;

    this.currentFileUpload5 = this.selectedFiles5New.item(0);
    this.uploadService.Vehicle_cust_idpushFile(this.currentFileUpload5, vehicledata).subscribe(event => {
      if (event['statuscode'] == "200") {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.installation.vehiclefilepath = event['entity'];
        console.log("the return data of file upload 5" + JSON.stringify(this.installation.vehiclefilepath));
      }
      else {
        alert("ldata is not f");
      }
    });

    this.selectedFiles5New = undefined;
  }

  selectFile(event) {
    document.getElementById("defaultimg").style.display = "none";
    document.getElementById("blah").style.display = "block";
    this.selectedFilesNew = event.target.files;
    this.customeridentityupload();
  }

  selectFile2(event) {
    document.getElementById("defaultimg2").style.display = "none";
    document.getElementById("blah2").style.display = "block";
    this.selectedFiles2New = event.target.files;
    this.addressidentityupload();
  }

  selectFile3(event) {
    document.getElementById("defaultimg3").style.display = "none";
    document.getElementById("blah3").style.display = "block";
    this.selectedFiles3New = event.target.files;
    this.rcidentityupload();
  }

  selectFile4(event) {
    document.getElementById("defaultimg4").style.display = "none";
    document.getElementById("blah4").style.display = "block";
    this.selectedFiles4New = event.target.files;
    this.deviceUpload();
  }

  selectFile5(event) {
    document.getElementById("defaultimg5").style.display = "none";
    document.getElementById("blah5").style.display = "block";
    this.selectedFiles5New = event.target.files;
    this.vehicleUpload();
  }
  // function for insert and update
  installvehicle() {
    this.installation.installedDate = (document.getElementById('installationdate') as HTMLInputElement).value;
    this.installation.mobilize = $("input[type='radio'][name='mobilize']:checked").val();
    this.installation.fuel = $("input[type='radio'][name='fulecheck']:checked").val();
    this.installation.ac = $("input[type='radio'][name='acstatus']:checked").val();

    this.submitted = true
    if (this.devicetypename == 'AIS-140' && (this.installation.idproofName == null || this.installation.idproofName == '')) {
      $('#msg_error_image').html('Please Select Id Proof.').show();
      $('#idproofName').focus();
      setTimeout(function () { document.getElementById("msg_error_image").style.display = "none"; }, 3000);
    }
    else if (this.devicetypename == 'AIS-140' && (this.installation.idProof == null || this.installation.idProof == '')) {
      $('#msg_error_image').html('Please Enter Id Proof Number.').show();
      $('#selectvendorcustidentityentrytype').focus();
      setTimeout(function () { document.getElementById("msg_error_image").style.display = "none"; }, 3000);
    }
    else if (this.devicetypename == 'AIS-140' && (this.installation.idproofpath == null || this.installation.idproofpath == '')) {
      $('#msg_error_image').html('Please Upload Id Proof .').show();
      $('#imgInp').focus();
      setTimeout(function () { document.getElementById("msg_error_image").style.display = "none"; }, 3000);
    }
    else if (this.devicetypename == 'AIS-140' && (this.installation.addressroofname == null || this.installation.addressroofname == '')) {
      $('#msg_error_image').html('Please Select Address Proof.').show();
      $('#addressproofname').focus();
      setTimeout(function () { document.getElementById("msg_error_image").style.display = "none"; }, 3000);
    }
    else if (this.devicetypename == 'AIS-140' && (this.installation.addressProof == null || this.installation.addressProof == '')) {
      $('#msg_error_image').html('Please Enter Address Proof Number .').show();
      $('#Addressproof').focus();
      setTimeout(function () { document.getElementById("msg_error_image").style.display = "none"; }, 3000);
    }
    else if (this.devicetypename == 'AIS-140' && (this.installation.addressproofpath == null || this.installation.addressproofpath == '')) {
      $('#msg_error_image').html('Please Upload Address Proof .').show();
      $('#imgInp2').focus();
      setTimeout(function () { document.getElementById("msg_error_image").style.display = "none"; }, 3000);
    }
    else if (this.devicetypename == 'AIS-140' && (this.installation.rcNo == null || this.installation.rcNo == '')) {
      $('#msg_error_image').html('Please Enter RC Number .').show();
      $('#rcentry').focus();
      setTimeout(function () { document.getElementById("msg_error_image").style.display = "none"; }, 3000);
    }
    else if (this.devicetypename == 'AIS-140' && (this.installation.rcFile == null || this.installation.rcFile == '')) {
      $('#msg_error_image').html('Please Upload RC .').show();
      $('#imgInp3').focus();
      setTimeout(function () { document.getElementById("msg_error_image").style.display = "none"; }, 3000);
    }
    else if (this.toInsert == false && (this.installation.remarks == null || this.installation.remarks == '')) {
      $('#Remarkvenupdate').focus();
    }
    else {
      AddLoader()
      if (this.toInsert == true) {
        this.installService.InsertVehicleInstallationAPIV3(this.installation).subscribe((response) => {
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
        this.installService.UpdateVehicleInstallationAPI(this.installation).subscribe((response) => {
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
    console.log(item)

    this.toInsert = false;
    this.toUpdate = false;
    this.toRenew = false;
    this.showDetails = true;


    this.installation.deviceId = item.param1;
    this.vendorid = item.param2;
    this.installation.deviceimeino = item.param3;
    this.uniqueNo = item.param4;
    this.simNo = item.param5;
    this.vendorName = item.param6;
    // this.installation.deviceId = item.param7;
    // this.installation.deviceId = item.param8;
    this.installation.vehicleId = item.param9;
    this.installation.vehicleRegNo = item.param10;
    this.installation.vehicleChasisNo = item.param11;
    this.installation.vehicleEngineNo = item.param12;
    // this.installation. = item.param13;
    // this.installation.deviceId = item.param14;
    // this.installation.deviceId = item.param15;
    // this.installation.deviceId = item.param16;
    // this.installation.deviceId = item.param17;
    this.installation.vehicleType = item.param18;
    // this.installation.deviceId = item.param19;
    // this.installation.deviceId = item.param20;
    // this.installation.deviceId = item.param21;
    // this.installation.deviceId = item.param22;
    // this.installation.deviceId = item.param23;
    this.installation.customerId = item.param24;
    // this.installation.customerName = item.param25;
    // this.installation. = item.param26;
    // this.installation.deviceId = item.param27;
    // this.installation.deviceId = item.param28;
    // this.installation.deviceId = item.param29;
    // this.installation.deviceId = item.param30;
    this.vendorid = item.param31;
    // this.installation.deviceId = item.param32;
    // this.installation.mfgcode = item.param33;
    this.installation.vehicleMakeId = item.param34;
    this.installation.vehicleModelId = item.param35;
    this.installation.vehicleclassid = item.param36;
    // this.installation.deviceId = item.param37;
    // this.installation.deviceId = item.param38;
    // this.vehicleClassName = item.param39;
    this.installation.installedDate = item.param40;
    // this.installation.vehicleStateCode= item.param41;
    // this.installation.deviceId = item.param42;
    // this.installation.deviceId = item.param43;
    this.installation.deviceId = item.param44;
    // this.installation. = item.param45;
    // this.installation.deviceTypeId = item.param46;
    // this.installation = item.param47;
    this.installation.idProof = item.param48;
    this.installation.addressProof = item.param49;
    this.installation.rcNo = item.param50;
    this.installation.installedBy = item.param51;
    this.empName = item.param52;
    this.installation.mobilize = item.param53;
    this.installation.fuel = item.param54;
    this.installation.ac = item.param55;
    this.installation.vehicleRtoId = item.param56;
    this.installation.vehicleIconId = item.param57;
    // this.installation. = item.param58;
    // this.installation.vehicleIconId = item.param59;


    this.getModelList();


    this.vendorlist.forEach(element => { if (this.vendorid == element.param1) { this.vendorObj = element; } });
    this.devicetypelist.forEach(element => { if (item.param46 == element.param2) { this.devicetypeobj = element; this.installation.deviceTypeId = element.param1; this.devicetypename = element.param2 } });
    this.imeilist.forEach(element => { if (item.param3 == element.param2) {
      alert('imei number found')
      this.imeiobj = element; } });
    this.emplist.forEach(element => { if (this.installation.uploadedby == element.param1) { this.empobj = element } });
    this.customerlist.forEach(element => { if (item.param24 == element.param1) { this.customerobj = element } });
    this.vehicleclasslist.forEach(element => { if (item.param36 == element.param1) { this.classobj = element } });
    this.makelist.forEach(element => { if (item.param34 == element.param1) { this.makeobj = element } });
    this.modellist.forEach(element => { if (item.param35 == element.param1) { this.modelobj = element } });

    this.statelist.forEach(element => { if (item.param41 == element.param2) { this.stateobj = element } });
    this.rtolist.forEach(element => { if (item.param17 == element.param2) { this.rtoobj = element } });
    this.iconlist.forEach(element => { if (item.param57 == element.param1) { this.iconobj = element } });


    console.log("model is " + this.modelobj)
    console.log("imei obj is " + this.imeiobj)




    // if (item.param14 == '0') { this.vendor.vendorlandlineno = '' }

    // for (let i = 0; i < this.vendorTypeList.length; i++) {
    //   if (this.vendorTypeName == this.vendorTypeList[i].param2) {
    //     this.vendortypeObj = this.vendorTypeList[i]
    //   }
    // }
    // //   }

    //   // })
    //   // vendor type ends
    //   let dataL = {
    //     param1: this.vendor.vendortypeid,
    //     param2: "",
    //   }
    //   this.listService.SupplyOfList(dataL).subscribe((response) => {
    //     if (response.statuscode == 200) {
    //       this.deviceTypeList = response.entity;
    //       for (let i = 0; i < this.deviceTypeList.length; i++) {
    //         for (let j = 0; j < this.devicetypename.length; j++) {
    //           if (this.devicetypename[j] == this.deviceTypeList[i]['param2']) {
    //             this.DeviceTypeObjArr.push(this.deviceTypeList[i])
    //           }

    //         }
    //       }

    //     }
    //   })

    //   // supply of starts

    //   //supply of ends

    //   //  state starts
    //   for (let i = 0; i < this.stateList.length; i++) {
    //     if (this.vendor.vendorstate == this.stateList[i].param1) {
    //       this.stateObj = this.stateList[i]
    //     }
    //   }
    //   // state ends


    //   // city starts
    //   let keydata = {
    //     param1: this.vendor.vendorstate,
    //     pageID: "7",
    //     pageName: this.encryptedpageNameValue,
    //     pageURL: this.encryptedpageUrlValue
    //   }
    //   try { AddLoader() } catch (e) { alert(e) }
    //   this.listService.SelectCityListAPI(keydata).subscribe((data) => {
    //     try { RemoveLoader() } catch (e) { alert(e) }
    //     this.cityList = data.entity.list;
    //     for (let i = 0; i < this.cityList.length; i++) {
    //       if (this.vendor.vendorcity == this.cityList[i].param1) {
    //         this.cityObj = this.cityList[i]
    //       }
    //     }
    //   })
    //   // city ends






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
      // this.vendormodelservice.DeleteVendorAPI(dataL).subscribe((response) => {
      //   RemoveLoader()
      //   this.responseMessage = response.entity;
      //   if (response.statuscode == 200) {
      //     $("#SuccessModal").modal('show');
      //   }
      //   else {
      //     $("#ErrorModal").modal('show');
      //   }
      // })
    }
  }

  closemodal() {
    this.vehicleDetails();
    $("#myModalwizard").modal('hide');
    $('.modal-backdrop.show').css('display', 'none');
    this.installation = new Installation();
    this.vendorObj = null; this.devicetypeobj = null; this.imeiobj = null; this.empobj = null;
    this.simNo = ''; this.uniqueNo = ''; this.status = '';
    this.customeobj = null; this.classobj = null; this.makeobj=null; this.modelobj = null;this.stateobj=null;this.rtoobj=null;this.iconobj=null;

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
    // this.vendormodelservice.VendorDetailsAPI(keydata).subscribe((data) => {
    //   try { RemoveLoader() } catch (e) { alert(e) }
    //   if (data.statuscode == 200) {

    //     this.VendorDetailsPDF = data.entity.responsedatalist;
    //     this.PreparePDFData(this.VendorDetailsPDF)
    //   }
    // });
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
    // this.vendormodelservice.VendorDetailsAPI(keydata).subscribe((data) => {
    //   try { RemoveLoader() } catch (e) { alert(e) }
    //   if (data.statuscode == 200) {

    //     this.VendorDetailsPDF = data.entity.responsedatalist;
    //     this.PrepareExcelData(this.VendorDetailsPDF)
    //   }
    // });
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
