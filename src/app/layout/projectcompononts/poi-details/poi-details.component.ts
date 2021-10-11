import { ReportService } from './../services/report.service';
import { Component, OnInit, HostBinding, ElementRef, ViewChild } from '@angular/core';
import { ExportToExcelService } from '../services/export-to-excel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CryptService } from '../services/crypt.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CustomermodelService } from './../../../APIService/customermodel.service';
import { PoiassignService } from '../services/poiassign.service';
import * as $ from 'jquery';
import { PdfService } from '../services/pdf.service';
import { PostService } from './../../../../post.service';

declare var jQuery: any;
declare var $: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
declare var SuccessAlert: any;
declare var errorAlert: any;
declare var mapBuild: any;
declare var SwitchMap: any;

declare var Livetrail: any;
declare var PopupInitialize: any;
declare var SingleMarker: any;

declare var ClearCluster: any;
declare var ClearSingleMarkers: any;
declare var ClearLiveTrail;
declare var ClearAlert;
declare var ClearDirection; declare var DirectionIcon: any; declare var PoiSwitcher: any;
declare var intervalrail: any;

declare var MakePersonClusters: any;

declare var popup: any;
declare var container: any;
declare var content: any;
declare var closer: any;
declare var InitiateSlider: any;
declare var LiveAnimation: any;
declare var ClearAnimation: any;
declare var AnimationHistory: any
declare var AddHistoryPoints: any;
declare var FlyToPointLocation: any;
declare var ClearHistoryAnimation: any;
declare var openFullscreen: any;
declare var CustomFlyTo: any;
declare var PlotCoditionline: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
declare var RouteSwitcherrail: any;



declare var PlotRoute: any;
declare var ClearRoute: any;
declare var PlotRailPoi: any;
declare var ClearRailPoi: any;

declare var AddLoader: any;
declare var RemoveLoader: any;

declare var DivisionClusters: any;
declare var ClearDivisionClusters: any;
declare var SubDivistionClusters: any;
declare var AddSubdivisionCluster: any;
declare var ClearSubdivisionClusters: any;


@Component({
  selector: 'app-poi-details',
  templateUrl: './poi-details.component.html',
  styleUrls: ['./poi-details.component.css']
})
export class PoiDetailsComponent implements OnInit {

  letlongpattern = '^[0-9]+\.[0-9][0-9]$'
  encryptedpageUrlValue: any;
  encryptedpageNameValue: any;
  pageUrl: any = this.router.url;
  pageNumber: any = 1; itemsPerPage: any = 10; filter: any = '';
  totalRecords: any = "NA";
  liveVehiclesData: any;
  totalCount: any;
  viewCount: any;
  valueAlreadyGot: boolean = false;
  location: any;
  liveVehiclesDataPDF: any[] = [];
  excelData: any[];
  tolocationAdd: any;
  address: any[] = [];
  key; reverse;

  customerListArray: any; customerId: any = ''; customerObj: any; poidetails: any; poidetialspdfdata: any; poidetailsexceldata: any;

  poidetailsmaintbl: any; selectcustomerentry: any; selectvehicleentry: any; deviceidspan: string; roleid: string;

  public edited = false; filtersim: any; selectdevicereturn: string; selectcustomerreturn: string;

  stringifiedData: any; parsedJson: any; stringifiedresponse: any; parsedJsonresponse: any;
  stringifiedDataList: any; parsedJsonList: any; datafromrespo: string; deleteText: string; selectdeviceentry: any;

  devdetail$: any; devicedetdata: any = []; globalPDF$: any;
  count: number = 0; nop: number; selectRowsText: string = "10"; list = []; ListOfVehicle = [];
  routenameText: string; routedescriptionText: string; theCheckbox: boolean;
  private _success = new Subject<string>(); staticAlertClosed = false; successMessage: string;
  isMasterSelsummary: boolean; isSelecteddevicesummary: boolean;
  allvehicleData: any; filterVehicles: any = []; deviceData: any;

  startdetails: any;
  liveInterval: any;
  mapflag = 0;

  routeArray: any = [];

  expanded: any = false;

  config = {
    displayKey: "param2", // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: this.count,
    height: '200px',
  };

  config2 = {
    displayKey: "param12",
    // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };
  updatevisible: boolean = false;


  constructor(private cryptService: CryptService, private router: Router, private devreqService: CustomermodelService
    , public excelservice: ExportToExcelService, public pdfservice: PdfService, private reportservice: ReportService,
    private ps: PostService, private pois: PoiassignService) {

    this.EncryptPageName(); this.EncryptPageUrl(); this.isSelecteddevicesummary = true; this.theCheckbox = true;
    this.isMasterSelsummary = false;
  }

  ngOnInit() {
    this.POIdetailsMainTable(); $("#tabhome125").show(); $("#tabhome225").hide(); $("#btnpoidetails").hide();
    $("#btnpoitype").show(); $('#customerentry2').focus(); $('#routnm').show(); $('#routdesc').show(); this.Customerlist();
  }

  // poi entry
  poiName: string = ''; poiType: string = ''; poiIcon: string = ''; poilocation: string = ''; poiRange: string = ''; latt: string = ''; longi: string = '';

  insertpoi() {
    if (this.poiName == '') {
      $("#msg_poi").html('Please Enter POI Name').show();
      $("#name").focus();
      setTimeout(function () { document.getElementById("msg_poi").style.display = "none"; }, 3000);
    }
    else if (this.poiType == '') {
      $("#msg_poi").html('Please Enter POI Type').show();
      $("#type").focus();
      setTimeout(function () { document.getElementById("msg_poi").style.display = "none"; }, 3000);
    }
    else if (this.poiRange == '') {
      $("#msg_poi").html('Please Enter POI Range').show();
      $("#range").focus();
      setTimeout(function () { document.getElementById("msg_poi").style.display = "none"; }, 3000);
    }
    else if (this.latt == '') {
      $("#msg_poi").html('Please Enter POI Latttitude').show();
      $("#lat").focus();
      setTimeout(function () { document.getElementById("msg_poi").style.display = "none"; }, 3000);
    }
    else if (this.longi == '') {
      $("#msg_poi").html('Please Enter POI Longitude').show();
      $("#long").focus();
      setTimeout(function () { document.getElementById("msg_poi").style.display = "none"; }, 3000);

    }

    else {
      let locationReq = {
        param1: this.longi,
        param2: this.latt,
      }
      AddLoader()
      this.reportservice.getlocation(locationReq).subscribe((response) => {
        RemoveLoader()
        if (response.statuscode == 200) {

          this.poilocation = response.entity.list[0].param1

          this.poiEntry()
        }
      })
    }



  }
  refreshdata(){
    this.poiId = '';this.poiName='';this.poiRange ='';this.latt='';
    this.longi='';this.poilocation='';this.poiType='';
  }

  poiEntry() {
    if (this.updatevisible == false) { this.poiId = '0' }
    let dataL = {
      "poiId": this.poiId,
      "poiName": this.poiName,
      "poiType": this.poiType,
      "poiIcon": "NA",
      "location": this.poilocation,
      "range": this.poiRange,
      "latitude": this.latt,
      "longitude": this.longi
    }
    AddLoader()
    if (this.updatevisible == false) {
      this.ps.insertpoiv1(dataL).subscribe((response) => {
        RemoveLoader()()
        if (response.statuscode == 200) {
          $('#exampleModal').modal('hide');
          $('.modal-backdrop').css('display', 'none');
          this.poiId = ''; this.poiName = ''; this.poiRange = ''; this.poiType = ''; this.latt = ''; this.longi = '';
          this.poilocation = ''

          SuccessAlert(response.entity);


          this.POIdetailsMainTable()
        }
        else {
          errorAlert(response.entity)
        }
      })
    }
    else {
      this.ps.updatepoiv1(dataL).subscribe((response) => {
        RemoveLoader()
        if (response.statuscode == 200) {
          $('#exampleModal').modal('hide');
          $('.modal-backdrop').css('display', 'none');
          this.poiId = ''; this.poiName = ''; this.poiRange = ''; this.poiType = ''; this.latt = ''; this.longi = '';
          this.poilocation = ''

          SuccessAlert(response.entity)
          this.POIdetailsMainTable()

        }
        else {
          errorAlert(response.entity)
        }
      })
    }
    this.updatevisible = false;

    // $('#exampleModal').modal('hide');
    // $('.modal-backdrop').css('display', 'none');

  }



  // poi entry
  // poi update
  poiId: string = '';
  setData(data) {
    this.poiId = data.param1;
    this.poiName = data.param2;
    this.poiType = data.param3;
    this.latt = data.param6;
    this.longi = data.param7;
    this.address = data.param5;
    this.poiRange = data.param8;
    this.updatevisible = true
    $("#exampleModal").modal('show')
  }
  deleteData(data) {
    this.poiId = data.param1;
  }

  remark: string = '';
  deletePOI() {
    if (this.remark == '') {
      $("#delete").html('Please Enter Remark').show();
      $("#deleteremark").focus();
      setTimeout(function () { document.getElementById("delete").style.display = "none"; }, 3000);

    }
    else {
      let dataL = {
        "param1": this.poiId,
        "param2": this.remark,
      }
      AddLoader()
      this.ps.deletepoiv1(dataL).subscribe((response) => {
        RemoveLoader()
        $('#deleteModal').modal('hide');
        $('.modal-backdrop').css('display', 'none');
        if (response.statuscode == 200) {
          SuccessAlert(response.entity)
        }
        else {
          errorAlert(response.entity)
        }
      })
    }
    this.remark = ''; this.poiId = '';
  }

  // poi update

  ShowPOIDetails() {
    $("#tabhome125").show(); $("#tabhome225").hide(); $("#btnpoidetails").hide(); $("#btnpoitype").show();
  }

  ShowPOIAssign() {
    $("#tabhome125").hide(); $("#tabhome225").show(); $("#btnpoidetails").show(); $("#btnpoitype").hide();

    if (this.mapflag == 0) {


      setTimeout(() => {


        var latlong = [78.9629, 20.5937];

        mapBuild('map', latlong);
        container = document.getElementById("popup");
        content = document.getElementById("popup-content");
        closer = document.getElementById("popup-closer");
        PopupInitialize()
        SwitchMap("3");



        this.mapflag = 1
      }, 2000);


    }
  }

  POIdetailsMainTable = () => {
    if (this.valueAlreadyGot == true) {
      this.totalRecords = this.totalCount
    }
    else {
      this.totalRecords = "NA"
    }
    let dataL = {
      param1: "",//"poiid_ui(Optional)",
      param2: "",//"Deviceid_ui(Optional)",
      param3: "",//"vehicleid_ui(Optional)",
      param4: "",//"routeid(optional)
      "pageNo": this.pageNumber,
      "itemsPerPage": this.itemsPerPage,
      "searchBy": this.filter,
      "searchType": "",
      "totalRecords": this.totalRecords,
      "pageID": "",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }

    try { AddLoader() } catch (e) { alert(e) }
    this.ps.GetPoiDetails(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      if (response.statuscode == 200) {
        this.poidetailsmaintbl = response.entity.list;
        this.viewCount = response.entity.viewCount;
        if (this.valueAlreadyGot == false) {
          this.totalCount = response.entity.count;
        }
      }
    })
  }

  poiDetailsPDF = () => {
    if (this.liveVehiclesDataPDF.length == 0) {
      let dataL = {
        param1: "",//"poiid_ui(Optional)",
        param2: "",//"Deviceid_ui(Optional)",
        param3: "",//"vehicleid_ui(Optional)",
        param4: "",//"routeid(optional)
        "pageNo": "this.pageNumber",
        "itemsPerPage": "",
        "searchBy": this.filter,
        "searchType": "",
        "totalRecords": this.totalRecords,
        "pageID": "",
        "pageName": this.encryptedpageNameValue,
        "pageURL": this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }
      this.ps.GetPoiDetails(dataL).subscribe((response) => {
        if (response.statuscode == 200) {
          this.poidetialspdfdata = response.entity.list;
          try { RemoveLoader() } catch (e) { alert(e) }
          this.createPDF();
        }
      })
    }
    else {
      this.createPDF();
    }
  }

  poiDetailsExcel = () => {
    if (this.liveVehiclesDataPDF.length == 0) {
      let dataL = {
        param1: "",//"poiid_ui(Optional)",
        param2: "",//"Deviceid_ui(Optional)",
        param3: "",//"vehicleid_ui(Optional)",
        param4: "",//"routeid(optional)
        "pageNo": "",
        "itemsPerPage": "",
        "searchBy": this.filter,
        "searchType": "",
        "totalRecords": this.totalRecords,
        "pageID": "",
        "pageName": this.encryptedpageNameValue,
        "pageURL": this.encryptedpageUrlValue
      }

      try { AddLoader() } catch (e) { alert(e) }
      this.ps.GetPoiDetails(dataL).subscribe((response) => {
        try { RemoveLoader() } catch (e) { alert(e) }

        if (response.statuscode == 200) {
          this.poidetailsexceldata = response.entity.list;

          this.PrepareExcelData(this.poidetailsexceldata)

        }
      })
    }
    else {
      this.PrepareExcelData(this.poidetailsexceldata)
    }
  }

  PrepareExcelData(data) {
    this.excelData = [];

    for (var i = 0; i < data.length; i++) {
      try {
        var obj = {
          "#": data[i].rowNumber,
          "POI NAME": data[i]["param2"],
          "POI TYPE": data[i]["param3"],
          "POI LOCATION": data[i]["param5"],
          "LATTITUDE": data[i]["param6"],
          "LONGITUDE": data[i]["param7"],
          "POI RANGE": data[i]["param8"],
          "CREATE DATE": data[i]["param9"],
        }
      } catch (e) { }
      this.excelData.push(obj);
    }
    this.exportToExcel()
  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'POI Details', 'poidetials');
  }

  createPDF() {
    let pdfTableData;
    let dataArray = []

    for (let i = 0; i < this.poidetialspdfdata.length; i++) {
      pdfTableData = {
        "#": this.poidetialspdfdata[i].rowNumber,
        "POI NAME": this.poidetialspdfdata[i]["param2"],
        "POI TYPE": this.poidetialspdfdata[i]["param3"],
        "POI LOCATION": this.poidetialspdfdata[i]["param5"],
        "LATTITUDE": this.poidetialspdfdata[i]["param6"],
        "LONGITUDE": this.poidetialspdfdata[i]["param7"],
        "POI RANGE": this.poidetialspdfdata[i]["param8"],
        "CREATE DATE": this.poidetialspdfdata[i]["param9"],
      }
      dataArray.push(pdfTableData)
    };
    this.pdfservice.CreatePDFData(dataArray, "POI Details");
  }
  searchdata() {
    this.valueAlreadyGot = false;
    this.pageNumber = 1;
    this.POIdetailsMainTable()
  }
  Refreshfunction() {
    this.valueAlreadyGot = false;
    this.pageNumber = 1;
    this.itemsPerPage = 10;
    this.filter = '';
    this.POIdetailsMainTable()
  }

  pageChange(event) {
    this.valueAlreadyGot = true;
    this.pageNumber = event;
    this.POIdetailsMainTable()
  }
  changeIemsPerPage() {
    this.valueAlreadyGot = true;
    this.POIdetailsMainTable()
  }



  // Assign Page Coding Start

  preid: any = "";
  myFunction(id) {
    var popup = document.getElementById(id + "popup");
    // $(event.target).css('background-color','red')
    //console.log(event)
    //    $(event.target).classList.toggle("show");
    try {
      var preid = document.getElementById(this.preid + "popup")
      preid.classList.toggle("show");

    } catch (e) { }
    popup.classList.toggle("show");
    this.preid = id;
    //this.GetSubdivisionCounts(id)
  }

  EncryptPageName() {
    this.encryptedpageNameValue = this.cryptService.encrypt("Vehicle Assign To Customer")
  }
  EncryptPageUrl() {
    this.encryptedpageUrlValue = this.cryptService.encrypt(this.pageUrl)
  }

  ListOfCustomer = []; selectcustomer: string; selectcustomrobj: any;
  Customerlist() {
    try {
      let keydata = {
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue
      }
      try { AddLoader() } catch (e) { alert(e) }
      this.devreqService.CustomerListAPI(keydata).subscribe((data) => {
        try { RemoveLoader() } catch (e) { alert(e) }
        this.ListOfCustomer = data.entity.list;
      });
    } catch (e) { }
  }

  Vehiclelist() {

    try {

      this.selectcustomerreturn = this.selectcustomerentry.param1;

      let keydata = {
        param1: this.selectcustomerreturn,
        groupList: [],
        divisionList: [],
        subDivisionList: [],
        dpartmentList: [],
        pageID: "7",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }

      try { AddLoader() } catch (e) { alert(e) }
      this.pois.VehicleListAPI(keydata).subscribe(
        (data) => {
          try { RemoveLoader() } catch (e) { alert(e) }
          this.ListOfVehicle = data.entity;

        });
    } catch (e) { }
  }

  checkpoiData = []; vehicleidmap: string;
  POIdetails = () => {

    this.selectcustomerreturn = this.selectcustomerentry.param1;
    this.selectdevicereturn = this.selectdeviceentry.param1;
    this.vehicleidmap = this.selectdeviceentry.param3;

    // Vehicle Plot

    try { this.PlotSelectedSingleVehicle(this.vehicleidmap) } catch (e) { }

    // End Vehicle Plot

    if (this.valueAlreadyGot == true) {
      this.totalRecords = this.totalCount
    }
    else {
      this.totalRecords = "NA"
    }
    let dataL = {
      param1: "",//"poiid_ui(Optional)",
      param2: "",//"Deviceid_ui(Optional)",
      param3: this.selectdevicereturn,//"vehicleid_ui(Optional)",
      param4: "",//"routeid(optional)
      param5: this.selectcustomerreturn,
      pageNo: "",
      itemsPerPage: "",
      searchBy: this.filter,
      searchType: "",
      totalRecords: this.totalRecords,
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    try { AddLoader() } catch (e) { alert(e) }
    this.ps.GetPoiDetailsForRouteCreation(dataL).subscribe((response) => {
      try { RemoveLoader() } catch (e) { alert(e) }

      if (response.statuscode == 200) {
        this.poidetails = response.entity;
        for (var i = 0; i < this.poidetails.length; i++) {
          if (this.poidetails[i]["param10"] == "checked") {
            var objpoi = {
              "param1": this.poidetails[i]["param1"],
              "param2": this.poidetails[i]["param2"],
              "param10": this.poidetails[i]["param10"],
              "rowNumber": this.poidetails[i]["rowNumber"]
            }
            this.checkpoiData.push(objpoi);
          }
        }

        this.viewCount = response.entity.viewCount;
        if (this.valueAlreadyGot == false) {
          this.totalCount = response.entity.count;
        }
      }
    });


  }

  checkdata: string = "true";
  toggleEditable(event) {
    if (event.target.checked) {
      $('#routnm').show(); $('#routdesc').show();

      this.checkdata = "true";

    }
    else {
      this.checkdata = "false";

      $('#routnm').hide(); $('#routdesc').hide();
    }
  }

  uncheckListFinal = []; plotchecklist = [];
  changeCheck(event, id2) {
    $("#ordertext" + id2).prop('isDisabled', false);

    if ($("#checkbox" + id2).is(':checked')) {
      $("#ordertext" + id2).prop('disabled', false);

      for (var i = 0; i < this.poidetails.length; i++) {

        if ((this.poidetails[i].isSelecteddevicesummary)) {
          let removeIndex = this.plotchecklist.findIndex(itm => itm.rowNumber === this.poidetails[i].rowNumber);
          if (removeIndex == -1) {
            this.plotchecklist.push(this.poidetails[i]);
          }

        }


      }

      try { this.PlotSelectedPOI(this.plotchecklist) } catch (e) { }

    }
    else {
      $("#ordertext" + id2).prop('disabled', true);

      let removeIndex = this.plotchecklist.findIndex(itm => itm.rowNumber === id2);

      this.plotchecklist.splice(removeIndex, 1);

      //ClearSingleMarkers();
      this.PlotSelectedPOI(this.plotchecklist);

      for (var j = 0; j < this.checkpoiData.length; j++) {
        if (this.checkpoiData[j]["param10"] == "not checked") {
          this.uncheckListFinal.push({
            "rowno": this.checkpoiData[j].rowNumber,
            poiid: this.poidetails[j]["param1"],	//status, srno = param1
            orderno: (document.getElementById("ordertext" + this.checkpoiData[j].rowNumber) as HTMLInputElement).value	//orderno

          });
        }
      }

    }
  }

  checkUncheckAll() {
    try {
      // try{AddLoader()}catch(e){} 

      for (var i = 0; i < this.plotchecklist.length; i++) {
        this.plotchecklist[i].isSelecteddevicesummary = this.isMasterSelsummary;
      }

      //ClearSingleMarkers();
      this.PlotSelectedPOI(this.poidetails);

    } catch (e) { }
  }

  checkdataTable: string = "true";
  toggleEditableTable(sr) {
    (document.getElementById("checkbox" + this.poidetails[i].rowNumber) as HTMLInputElement).disabled = false;
    for (var i = 0; i < this.poidetails.length; i++) {
      var checkboxchk = (document.getElementById("checkbox" + this.poidetails[i].rowNumber) as HTMLInputElement).checked;
      var ordervaluechk = (document.getElementById("ordertext" + this.poidetails[i].rowNumber) as HTMLInputElement).innerHTML;

    }
  }

  GetVehiclecolor(data) {
    var vehiclecolor;
    if (data == "Running") {
      vehiclecolor = "green";
    } else if (data == "Idle") {
      vehiclecolor = "yellow";
    } else if (data = "Stop") {
      vehiclecolor = "red";
    } else {
      vehiclecolor = "blue";
    }


    return vehiclecolor;

  }

  GetIcon(data) {

    var icon = "";
    var vehiclecolor = this.GetVehiclecolor(data.param47);


    if (data.param29 == "Maxi Cab") {
      icon = "assets/mapimages/vehiclesicon/taxi/icon-0.png"
    } else if (data.param29 == "School Bus") {
      // icon="'assets/mapimages/mapicons/canter/canter-0.png";
      icon = "assets/mapimages/vehiclesicon/bus/" + vehiclecolor + "/icon-0.png";
    } else if (data.param29 == "Tanker") {
      icon = "assets/mapimages/vehiclesicon/tanker/" + vehiclecolor + "/icon-0.png";

    } else if (data.param29 == "Taxi") {
      icon = "assets/mapimages/vehiclesicon/taxi/icon-0.png"
    } else if (data.param29 == "Truck") {
      icon = "assets/mapimages/vehiclesicon/truck/" + vehiclecolor + "/icon-0.png";

    } else if (data.param29 == "KM" || data.param29 == "PT" || data.param29 == "Trailer") {
      icon = "assets/mapimages/personicons/personiconblack.png";
    } else if (data.param29 == "Dumper/Tipper") {
      icon = "assets/mapimages/vehiclesicon/truck/" + vehiclecolor + "/icon-0.png";
    } else if (data.param29 == "Mini motaryodha") {
      icon = "assets/mapimages/vehiclesicon/jeep/" + vehiclecolor + "/icon-0.png";

    } else {
      icon = "assets/mapimages/vehiclesicon/jeep/" + vehiclecolor + "/icon-0.png";

    }
    return icon;
  }

  PlotSelectedSingleVehicle(vehicleno) {

    try { ClearLiveTrail(); } catch (e) { }

    let service = this.ps;
    let prevData: any = "";

    let data = {
      "pageNo": "1",
      "itemsPerPage": "10",
      "searchBy": vehicleno,
      "searchType": "",
      "totalRecords": "NA",
      "pageID": "1",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    try {
      this.ps.GetSingleLiveVehicle(data).subscribe((data) => {
        if (data.entity.list.length > 0) {
          try { ClearLiveTrail(); } catch (e) { }

          try {
            var liveData = data.entity.list[0];
            var details = {
              data: {
                "type": "live",
                "title": vehicleno,
                "Ignition": liveData.param42,
                "GPS Status": liveData.param39,
                "Speed": liveData.param37,


              }
            }
            var latlong = [];
            latlong.push(Number(liveData.param36));
            latlong.push(Number(liveData.param35));

            var icon = this.GetIcon(liveData);
            var type = 0
            Livetrail(latlong, details, icon, type); // ye call karo on change per vehicle plot krne k liye and 

            data = {
              "pageNo": "1",
              "itemsPerPage": "10",
              "searchBy": vehicleno,
              "searchType": "",
              "totalRecords": "NA",
              "pageID": "1",
              "pageName": this.encryptedpageNameValue,
              "pageURL": this.encryptedpageUrlValue
            }
            try {
              service.GetSingleLiveVehicle(data).subscribe((data) => {
                if (data.entity.list.length > 0) {


                  try {
                    var liveData = data.entity.list[0];
                    var details = {
                      data: {
                        "type": "live",
                        "title": vehicleno,
                        "Ignition": liveData.param42,
                        "GPS Status": liveData.param39,
                        "Speed": liveData.param37


                      }
                    }
                    var latlong = [];
                    latlong.push(Number(liveData.param36));
                    latlong.push(Number(liveData.param35));

                    var icon = this.GetIcon(liveData);
                    var type = 1;
                    Livetrail(latlong, details, icon, type);
                    if (prevData != '') {
                      var details = {
                        data: {
                          "type": "live",
                          "title": vehicleno,
                          "Ignition": prevData.param42,
                          "GPS Status": prevData.param39,
                          "Speed": prevData.param37


                        }
                      }
                      var latlong = [];
                      latlong.push(Number(prevData.param36));
                      latlong.push(Number(prevData.param35));
                      //DirectionIcon  latlong,details,icon
                      icon = "assets/mapimages/directionarrow/arrow-" + prevData.param49
                      DirectionIcon(latlong, details, icon)
                    }
                    prevData = liveData;
                  } catch (e) { }

                }

              })

            } catch (e) { }

            //}, 10000);

          } catch (e) { }

        } else {
          alert("No Data Found")
        }








      })

    } catch (e) { }

  }

  /* PlotSelectedSingleVehicle(vehicleno){
    this.ClearAllData();
    alert(vehicleno);
    let requestdata={
      "pageNo":"1",
      "itemsPerPage":"10",
      "searchBy":vehicleno,
      "searchType":"",
      "totalRecords":"NA",
      "pageID":"1",
      "pageName":this.encryptedpageNameValue,
      "pageURL":this.encryptedpageUrlValue
    }
  
        var prelat="";
        var prelog="";
        
       this.ps.GetSingleLiveVehicle(requestdata).subscribe((data) => {
          if(data.entity.list.length>0){
            try{
              var liveData=data.entity.list[0];
  
    try{
      var details={
        data:{
          "type":"live",
         "title":liveData.param12,
      
      //  "Key/Trolley Man":liveData.param22,
        "Updated At":liveData.param32,
      
        "GPS Status":liveData.param39,
        "Status":liveData.param31,
        "Speed":liveData.param37,
       
    }
  }
     }catch(e){}
              
              var latlong=[];
              latlong.push(Number(liveData.param36));
              latlong.push(Number(liveData.param35));
      
              var icon="";
      
              icon="assets/mapimages/personicons/personiconblue.png" ; //   Stop
         
             var alert={}    ;
         
            try{ SingleMarker(latlong,details,alert,icon);}catch(e){} 
         
      
          }catch(e){}
      
          }else{
          
          }
  
     })
  
    } */

  // ========= Plot Selected Vehicles  
  PlotSelectedPOI(data) {
    // try{AddLoader()}catch(e){}
    try { ClearSingleMarkers(); } catch (e) { }

    for (var i = 0; i < data.length; i++) {
      var latlon = [];
      latlon.push(data[i].param7);  //long
      latlon.push(data[i].param6); //lat


      try {
        var details = {
          data: {
            "type": "live",
            "title": data[i].param5,

            //  "Key/Trolley Man":data[i].param22,
            //"Updated At":data[i].param32,

            //"GPS Status":data[i].param39,
            //"Status":data[i].param31,
            //"Speed":data[i].param37

          }
        }
      } catch (e) { }

      var icon = "";

      icon = "assets/mapimages/mapstyleicon/railsignal.png"; //   Stop

      var alert = {};

      try { SingleMarker(latlon, details, alert, icon); } catch (e) { }

      // try{RemoveLoader()}catch(e){} 
    }

  }

  ClearAllData() {


    try { this.ClearmapData(); } catch (e) { }
    try { clearInterval(this.liveInterval); } catch (e) { }
    try { clearInterval(intervalrail); } catch (e) { }
    ClearSingleMarkers();
    ClearLiveTrail();
    ClearAlert();
    ClearDirection();
  }

  ClearmapData() {

    try { ClearCluster(); } catch (e) { }
    try { clearInterval(this.liveInterval); } catch (e) { }
    try { clearInterval(intervalrail); } catch (e) { }
    try { ClearRoute(); } catch (e) { }
    try { ClearRailPoi(); } catch (e) { }
    try { ClearAnimation(); } catch (e) { }
    try { ClearDirection(); } catch (e) { }
    try { ClearSingleMarkers(); } catch (e) { }
    try { ClearAlert(); } catch (e) { }
    try { clearInterval(this.liveInterval); } catch (e) { }

  }

  getCustomerId() {
    this.selectcustomerreturn = this.selectcustomerentry.param1;
  }

  selectvehicledummy() {
    this.selectdevicereturn = this.selectdeviceentry.param1;
  }

  customergetid: string; vehicleIdList: any[]; checkListFinal = [];
  ADDRecord() {

    this.selectcustomerreturn = this.selectcustomerentry.param1;
    this.selectdevicereturn = this.selectdeviceentry.param1;

    if (this.selectcustomerentry == '' || this.selectcustomerentry == null) {
      $('#err_place').html('Please Select Customer.');
      $('#selectcustomerentry').focus();
      setTimeout(function () { document.getElementById("err_place").style.display = "none"; }, 3000);
    }
    else if (this.selectdeviceentry == null || this.selectdeviceentry == '') {
      $('#err_place').html('Please Select Vehicle');
      $('#deviceentry2').focus();
      setTimeout(function () { document.getElementById("err_place").style.display = "none"; }, 3000);
    }
    else {

      $('#saveentry').show(); $('#updateentry').hide();

      try {



        for (var i = 0; i < this.poidetails.length; i++) {
          var checkboxv = (document.getElementById("checkbox" + this.poidetails[i].rowNumber) as HTMLInputElement).checked;
          var ordervalue = (document.getElementById("ordertext" + this.poidetails[i].rowNumber) as HTMLInputElement).innerHTML;

          if (checkboxv == true) {
            this.checkListFinal.push({
              "rowno": this.poidetails[i].rowNumber,
              "poiid": this.poidetails[i]["param1"],	//status, srno = param1
              "orderno": (document.getElementById("ordertext" + this.poidetails[i].rowNumber) as HTMLInputElement).value	//orderno
            });
          }
          else {

          }

        }
        let dataL = {

          routeid: "0",
          routename: this.routenameText,
          routedescription: this.routedescriptionText,
          customerid: this.selectcustomerreturn,
          vehicleid: this.selectdevicereturn,
          checkedPOI: this.checkListFinal,
          uncheckedPOI: this.uncheckListFinal,
          pageID: "1",
          pageName: this.encryptedpageNameValue,
          pageURL: this.encryptedpageUrlValue

        }
        try { AddLoader() } catch (e) { }
        this.pois.POIAssignAPI(dataL).subscribe((data) => {
          try { RemoveLoader() } catch (e) { }
          if (data.statuscode == 200) {
            this.datafromrespo = data.entity;
            $("#SuccessModal").modal('show');
            this.clearfunction();
          }
          else {
            this.datafromrespo = data.entity;
            $("#ErrorModal").modal('show');
            this.clearfunction();
          }

        }, err => {

        });

      } catch (e) { }
    }

  }

  check(data) {
    try {
      if (typeof data === 'object') {
        //console.log("come in object if")
        return data.param1;
      }
      else if (data == '') {
        //console.log("come in Else if")
      }
      else {
        //console.log(data.length)

        return data;
      }
    } catch (e) {
      return '';
    }
  }

  getid(data, value) {
    try {
      if (typeof value === 'object') {
        // console.log("come in object if")
        // console.log( value.param1 +"  ====  "+ value.param2);
        return value.param1;
        // return data.param1;
      }
      else {
        //alert(value)
        //console.log("come in else")
        var index = data.findIndex(x => x.param2 === value);
        //alert(index)
        return data[index].param1;
      }
    } catch (e) {
      return '';
    }

  }

  clearfunction() {
    try {

      this.isSelecteddevicesummary = false;
      this.selectcustomerentry = "";

    } catch (e) { }
  }

  closemodal() {

    $("#successmodel").modal('hide');
    $('#modeldelete').modal('hide');
    $('#myModalwizard').modal('hide');

    $('.modal-backdrop.show').css('display', 'none');

  }

  OpenCollapse() {
    $("#collapseButton").hide();

    $('#collapseExample').collapse('show');
  }

  CloseCollapse() {

    $('#collapseExample').collapse('hide');
    $("#collapseButton").show();
  }


  // mapopenfun(index) {
  //   if (this.mapflag == 0) {


  //     setTimeout(() => {


  //       var latlong = [78.9629, 20.5937];

  //       mapBuild('map', latlong);
  //       container = document.getElementById("popup");
  //       content = document.getElementById("popup-content");
  //       closer = document.getElementById("popup-closer");
  //       PopupInitialize()
  //       SwitchMap("3");



  //       this.mapflag = 1
  //     }, 2000);


  //   }

  // }





}
