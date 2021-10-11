import { routerTransition } from 'src/app/router.animations';
import { Component, OnInit, HostBinding, ElementRef, ViewChild,NgZone } from '@angular/core';
import { interval } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdmindashrlyService } from '../services/admindashrly.service';
import { PostService } from '../../../../post.service';
import { CryptService } from '../services/crypt.service';
import { Event, Router, NavigationEnd } from '@angular/router';
import { ExportToExcelService } from '../services/export-to-excel.service';


import * as moment from 'moment';
import * as $ from 'jquery';
declare var jQuery: any;

declare var $: any;
declare var mapBuild: any;
declare var SwitchMap: any;

declare var Livetrail: any;
declare var PopupInitialize: any;
declare var SingleMarker: any;

declare var ClearCluster: any;
declare var ClearSingleMarkers;
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



declare var ClearHistoryAnimation1:any;
declare var AnimationLine:any;
declare var GetDistance:any;
declare var ClearHistoryInterval:any;
declare var ResumeAnimation:any;
declare var RestartAnimation:any;
declare var PlotCompleteHistory:any;
declare var PoiSwitcherrail:any;

declare var SortingTable:any;





@Component({
  selector: 'app-department-dashboard',
  templateUrl: './department-dashboard.component.html',
  styleUrls: ['./department-dashboard.component.css'],
  animations: [routerTransition()]
})
export class DepartmentDashboardComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  //   map  =======
  eastDivision: any = [];
  westDivision: any = [];
  northDivision: any = [];
  southDivision: any = [];
  centralDivision: any = [];
  speednumber: any = 1;
  startdetails: any;

  allvehicleData: any;
  filterVehicles: any = [];
  liveInterval: any;

  routeArray: any = [];

  expanded: any = false;
  excelData: any = []
  //=========================


  config = {
    displayKey: "param12",
    // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };
  totaldeptCount: any; totalworkingcount: any; totalnonworking: any; totalmaintainance: any;
  highdeptbattery: any; meddeptbattery: any; lowdeptbattery: any; nodeptbattery: any;


  constructor(private http: HttpClient, private admindashrlyService: AdmindashrlyService,
    private router: Router,private ngZone: NgZone, 
    private cryptService: CryptService, private postService: PostService, public excelservice: ExportToExcelService,) {
    this.EncryptPageName();
    this.EncryptPageUrl();
  }

  searchedKeyword: string;
  deviceData: any;
  configsection = {
    displayKey: "param2",
    // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };


  nop: number; totrec: number; outorec: number; filter: any; selectRowsText: any; pagecount: number;
  p: number; totrectype: number; outorectype: number; selectRowsTexttype: any;
  stringifiedData: any; parsedJson: any; stringifiedresponse: any; parsedJsonresponse: any;
  stringifiedDataList: any; parsedJsonList: any;
  encryptedpageNameValue: string; encryptedpageUrlValue: string; pageUrl = this.router.url;

  alltotalcount: number = 0; allworkingcount: number = 0; allnonworkingcount: number = 0; sounthtotalcount: number = 0;
  southworkingcount: number = 0; southnonworkingcount: number = 0; southlabel: string; northtoalcount: number = 0;
  northworkingcount: number = 0; northnonworkingcount: number = 0; northlabel: string; easttotalcount: number = 0;
  eastworkingcount: number = 0; eastnonworkingcount = 0; eastlabel: string; centraltotalcount = 0; centralworkingcount = 0;
  centralnonworkingcount = 0; centrallabel: string;
  historytrackspeed:any=5;

  subdivisionlist:any;subdivselect:any;sectioncount:any;sectionselect:any;
  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        try { this.ClearAll(); } catch (e) { }
      }
    })

    this.GetSubdivisionCounts('');
    document.getElementById('tablediv').innerHTML = "";
    window['angularComponentReference'] = { component: this, zone: this.ngZone, loadAngularFunction: (inputdata) => this.gridlivetrack(inputdata), };  

    try{

   
      // (function ($) {
      //   $(document).ready(function () {
    
      //     var start = moment().subtract(29, 'days');
      //     var end = moment();
    
    
      //     this.initialDate = start;
      //     this.endDate = end;
      //     function cb(start, end) {
      //       $('#daterangeadminux2 span').html(start.format('YYYY/MM/DD') + ' - ' + end.format('YYYY/MM/DD'));
      //     }
    
      //     $('#daterangeadminux2').daterangepicker({
      //       startDate: start, endDate: end,
      //       opens: 'left'
      //     }, cb);
    
    
      //     cb(start, end);
      //     $('#daterangeadminux2').on('show.daterangepicker', function (ev, picker) {
      //       var thisdp = $('.daterangepicker');
      //       setTimeout(function () {
      //         thisdp.addClass('active');
      //       }, 100);
      //     });
      //     var path = '../assets/images/background-part.png';
      //     $('.daterangepicker').append('<div class="background" style="background-image: url(' + path + '); z-index:-1; height:80px;"><img src="../assets/images/background-part.png" alt="" style="display:none"></div>')
      //   });
    
      // })(jQuery);
    
      /* calander single  picker ends */
      $('.datepicker').daterangepicker({
        dateFormat: 'dd/mm/yy' ,
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
    
    
     }catch(e){
    alert(e)
     }
    ;

    /* calander single picker ends */


    $(function () {
      $('.timepicker1').wickedpicker('time');
      $('.timepicker2').wickedpicker('time');

      $('.timepicker1').wickedpicker({
        // current time
        now: "00:00",
        // 12- or 24-hour format
        twentyFour: false,
        // CSS classes
        upArrow: 'wickedpicker__controls__control-up',
        downArrow: 'wickedpicker__controls__control-down',
        close: 'wickedpicker__close',
        hoverState: 'hover-state',
        // title
        title: 'From Time'
      });

      $('.timepicker2').wickedpicker({
        // current time
        // 	 			 		 now: today.getHours() + ':' + today.getMinutes(),
        now: "23:59",
        title: 'To Time',
        // 12- or 24-hour format
        // 	 			 		  twentyFour: false,
        // CSS classes
        upArrow: 'wickedpicker__controls__control-up',
        downArrow: 'wickedpicker__controls__control-down',
        close: 'wickedpicker__close',
        hoverState: 'hover-state'
        // title

      });
    });

    this.DepartmentCount();

    this.AdminDashboardRlyCount();

    this.ActiveDetails('gridview');

    try {
      this.GetSubdivisionCounts('All')

    } catch (e) { }

    let latlong = [78.9629, 20.5937];

    setTimeout(() => {
      try {
        new mapBuild('map', latlong);

        try {
          container = document.getElementById("popup");
          content = document.getElementById("popup-content");
          closer = document.getElementById("popup-closer");

          PopupInitialize();
        } catch (e) { }
        SwitchMap("1");
        try{    this.GetAllVehicles(); }catch(e){}


      } catch (e) { }
    }, 2000);
    setTimeout(function () { }, 2000);

    document.addEventListener("fullscreenchange", function () {
      var myheight = screen.height;
      if (document.getElementById('map').style.height == myheight + 'px') {
        document.getElementById('map').style.height = '567px';
        //  document.getElementById('gridfulldiv').style.height='471px';
      }
      //  
    });

  }

  GetDepartmentWiseCount(subdiv){
  


    // ======== map Counts api
    let data={
      
      "param1":"",
      "param2":subdiv,
      "pageID":"1",
      "pageName":this.encryptedpageNameValue,
      "pageURL":this.encryptedpageUrlValue
    }
        
    
    try{this.admindashrlyService.RailwayDepartmentWiseCount(data).subscribe((data) => {
    
      this.sectioncount=data.entity.list;
    })
    
    }catch(e){}
    
    
    }
  EncryptPageName() {
    this.cryptService.encrypt("DeptartmentDashboard")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;

  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }



  DepartmentCount() {
    let dataL = {
      param2: "",
      pageID: "2",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    this.admindashrlyService.RailwayDepartmentWiseCount(dataL).subscribe((response) => {
      let res = response.entity.list[0];

      this.totaldeptCount = res.param3;
      this.totalworkingcount = res.param4;
      this.totalnonworking = res.param5;
      this.totalmaintainance = res.param11;
      this.highdeptbattery = res.param12;
      this.meddeptbattery = res.param13;
      this.lowdeptbattery = res.param14;
      this.nodeptbattery = res.param15;
    })
  }

  AdminDashboardRlyCount() {
    try {

      let service = this.admindashrlyService;

      // intervalrail = setInterval(() => {
      //interval(30000).subscribe(x => {

      let keydata = {
        pageID: "1",
        pageName: this.encryptedpageNameValue,
        pageURL: this.encryptedpageUrlValue

      }

      // Distributor Detail Grid BIND LIST    
      service.AdminDashboardRlyCountAPI(keydata).subscribe(
        (data) => {
          this.devisionData = data.entity.list;
          var total = 0;
          var work = 0;
          var maintance = 0;
          var lowbattery = 0;
          var medium = 0;
          var high = 0;
          var nopower = 0;
          var notwork = 0;
          for (var i = 0; i < this.devisionData.length; i++) {
            total = total + Number(this.devisionData[i].param3);
            work = work + Number(this.devisionData[i].param4);
            notwork = notwork + Number(this.devisionData[i].param5);
            maintance = maintance + Number(this.devisionData[i].param19);
            nopower = nopower + Number(this.devisionData[i].param10);
            medium = medium + Number(this.devisionData[i].param8);
            lowbattery = lowbattery + Number(this.devisionData[i].param9);
            high = high + Number(this.devisionData[i].param7);

            maintance = maintance + Number(this.devisionData[i].param19);

            maintance = maintance + Number(this.devisionData[i].param19);

          }

          this.allwidgetsCount = {
            "total": total,
            "work": work,
            "notwork": notwork,
            "maintance": maintance,
            "nopower": nopower,
            "medium": medium,
            "lowbattery": lowbattery,
            "high": high

          }


        });


      // },120000);

      //clearInterval(intervalrail);

    } catch (e) { }
  }


  //sorting

  key: string = 'name'; reverse: boolean = true; //config: any; 

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }




  //========================   map changes   

  DivisionCheck(id, division) {
    if (document.getElementById(id).style.display == "block") {
      document.getElementById(id).style.display = "none";
      try { ClearDivisionClusters(division) } catch (e) { }
    } else {
      document.getElementById(id).style.display = "block";
      this.PlotDivisionCluster(id, division)
    }



  }


  PlotDivisionCluster(id, division) {
    try { ClearSubdivisionClusters(); } catch (e) { }
    try { ClearCluster() } catch (e) { }


    if (division == 'Central') {
      if (this.centralDivision.length == 0) {
        this.centralDivision = this.allvehicleData.filter(city => city.param53 == division)
        try { DivisionClusters(this.centralDivision, 'yellow', 'central') } catch (e) { }
      } else {
        try { DivisionClusters(this.centralDivision, 'yellow', 'central') } catch (e) { }
      }

    } else if (division == 'East') {
      if (this.eastDivision.length == 0) {
        this.eastDivision = this.allvehicleData.filter(city => city.param53 == division)
        try { DivisionClusters(this.eastDivision, 'blue', 'east') } catch (e) { }

      } else {
        try { DivisionClusters(this.eastDivision, 'blue', 'east') } catch (e) { }

      }

    } else if (division == 'West') {
      if (this.westDivision.length == 0) {
        this.westDivision = this.allvehicleData.filter(city => city.param53 == division)
        try { DivisionClusters(this.westDivision, 'white', 'west') } catch (e) { }
      } else {
        try { DivisionClusters(this.westDivision, 'white', 'west') } catch (e) { }
      }

    } else if (division == 'North') {
      if (this.northDivision.length == 0) {
        this.northDivision = this.allvehicleData.filter(city => city.param53 == division)
        try { DivisionClusters(this.northDivision, 'green', 'north') } catch (e) { }

      } else {
        try { DivisionClusters(this.northDivision, 'green', 'north') } catch (e) { }
      }

    } else if (division == 'South') {
      if (this.southDivision.length == 0) {
        this.southDivision = this.allvehicleData.filter(city => city.param53 == division)
        try { DivisionClusters(this.southDivision, 'orange', 'south') } catch (e) { }
      } else {
        try { DivisionClusters(this.southDivision, 'orange', 'south') } catch (e) { }
      }

    }




  }



  devisionData: any;
  subdevisionData: any;
  allwidgetsData: any;
  allwidgetsCount = {
    "total": 0,
    "work": 0,
    "notwork": 0,
    "maintance": 0,
    "nopower": 0,
    "medium": 0,
    "lowbattery": 0,
    "high": 0

  }

  GetAllVehicles() {



    // ======== map Counts api
    let data = {
      "pageNo": "",
      "itemsPerPage": "",
      "searchBy": "",
      "searchType": 'All',
      "totalRecords": "NA",

      "pageID": "1",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }
    try { AddLoader() } catch (e) { }

    try {
      this.postService.GetVehicleDetailsformap(data).subscribe((data) => {
        try { ClearCluster() } catch (e) { }
        try { RemoveLoader() } catch (e) { }
        try { this.allvehicleData = data.entity.list; } catch (e) { }
        try { this.PrepareExcelData(this.allvehicleData) } catch (e) { }
        this.filterVehicles = this.allvehicleData;
        try { this.CreateTable(this.filterVehicles) } catch (e) { }




      })

    } catch (e) { }

  }

  centralsections: any;
  eastsections: any;
  northsections: any;
  southsections: any;
  GetSubdivisionCounts(id) {
    let data = {
      "param1": id,
      "pageID": "1",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }

    try {
      this.admindashrlyService.AdminDashboardRlysubdivisionCountAPI(data).subscribe((data) => {
        this.subdevisionData = data.entity.list;
        this.centralsections = this.subdevisionData.filter(data => data.param8 == 'Central');
        this.eastsections = this.subdevisionData.filter(data => data.param8 == 'East');
        this.northsections = this.subdevisionData.filter(data => data.param8 == 'North');
        this.southsections = this.subdevisionData.filter(data => data.param8 == 'South');





      })
    } catch (e) { }
  }

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
    this.GetSubdivisionCounts(id)
  }

  sectiondevices: any = [];
  CheckSection(type) {
    this.sectiondevices = [];
    try { this.ClearAll() } catch (e) { }

    //this.sectiondevices=this.allvehicleData;
    if (type == 'Central') {
      for (var i = 0; i < this.centralsections.length; i++) {
        var checkid = this.Splitsectionid(this.centralsections[i].param2);

        if ($("#" + checkid).prop('checked') == true) {
          var data = this.allvehicleData.filter(x => x.param55 === this.centralsections[i].param2);
          this.sectiondevices = this.AddItem(this.sectiondevices, data);
        } else {
          this.sectiondevices = this.RemoveItem(this.sectiondevices, this.centralsections[i].param2)
        }

      }
    } else if (type == 'East') {
      for (var i = 0; i < this.eastsections.length; i++) {
        var checkid = this.Splitsectionid(this.eastsections[i].param2);

        if ($("#" + checkid).prop('checked') == true) {
          var data = this.allvehicleData.filter(x => x.param55 === this.eastsections[i].param2);
          this.sectiondevices = this.AddItem(this.sectiondevices, data);
        } else {
          this.sectiondevices = this.RemoveItem(this.sectiondevices, this.eastsections[i].param2)
        }

      }
    } else if (type == 'North') {
      for (var i = 0; i < this.northsections.length; i++) {
        var checkid = this.Splitsectionid(this.northsections[i].param2);

        if ($("#" + checkid).prop('checked') == true) {
          var data = this.allvehicleData.filter(x => x.param55 === this.northsections[i].param2);
          this.sectiondevices = this.AddItem(this.sectiondevices, data);
        } else {
          this.sectiondevices = this.RemoveItem(this.sectiondevices, this.northsections[i].param2)
        }

      }
    } else if (type == 'South') {
      for (var i = 0; i < this.southsections.length; i++) {
        var checkid = this.Splitsectionid(this.southsections[i].param2);

        if ($("#" + checkid).prop('checked') == true) {
          var data = this.allvehicleData.filter(x => x.param55 === this.southsections[i].param2);
          this.sectiondevices = this.AddItem(this.sectiondevices, data);
        } else {
          this.sectiondevices = this.RemoveItem(this.sectiondevices, this.southsections[i].param2)
        }

      }


    }
    try { MakePersonClusters(this.sectiondevices) } catch (e) { }

  }




  //  Table Collapse   

  expandContent = true;
  DepartmentDetails(data) {
    // return this.subdevisionData.filter(x => x.param === data.name);
    //try{ SubDivistionClusters(this.northDivision,'green',data.param3)}catch(e){}

  }



  ischecked: boolean = true;


  preswitchid="1"
  MapSwitch(layerindex){
    try{
   if(this.preswitchid!=""){  
     $("#switch"+this.preswitchid).removeClass("activeSwitchOption");
     $("#switch"+this.preswitchid).removeClass("effect8");
   }
   this.preswitchid=layerindex
   $("#switch"+layerindex).addClass("activeSwitchOption");
   $("#switch"+layerindex).addClass("effect8");
   try{SwitchMap(layerindex)}catch(e){
     //
  }
  }catch(e){}
     }

 
     OpenCollapse() {
      $("#collapseButton").hide();
  
      $('#collapseExample').collapse('show');
    }
  
    CloseCollapse() {
  
      $('#collapseExample').collapse('hide');
      $("#collapseButton").show();
    }
  

  SwitchPoi() {

    try {
      if ($("#poiSwitch").hasClass("iconDiv activeSwitchOption effect8")) {

        $("#poiSwitch").removeClass(" activeSwitchOption effect8");
        PoiSwitcher(false);
        //SwitchGeoPoi(false);
      } else {
        $("#poiSwitch").addClass("activeSwitchOption effect8")
        PoiSwitcher(true);
        //SwitchGeoPoi(true);
      }
    } catch (e) { }


  }


  SwitchRoute() {

    try {
      if ($("#routeSwitch").hasClass("iconDiv activeSwitchOption effect8")) {

        $("#routeSwitch").removeClass(" activeSwitchOption effect8");
        RouteSwitcherrail(false);
        //SwitchGeoPoi(false);
      } else {
        $("#routeSwitch").addClass("activeSwitchOption effect8")
        RouteSwitcherrail(true);
        //SwitchGeoPoi(true);
      }
    } catch (e) { }

  }


  OpenFullScreen() {
    var elem = document.getElementById('mapcontainer')

    try { openFullscreen(elem) } catch (e) { }
    document.getElementById('map').style.height = screen.height + 'px';
    // try{openFullscreen(elem)}catch(e){}

    // console.log(elem.requestFullscreen)


  }



  //========================= GraphSlider 

  GraphSlider() {
    if ($("#graphSlider").hasClass("sliderActive")) {
      $("#graphSlider").removeClass("sliderActive")
    } else {
      $("#graphSlider").addClass("sliderActive")
    }

  }


  SliderMouseover() {
    $("#graphSlider").addClass("sliderActive")
  }

  centerpreid: any = 'mapsection';
  CentralFilter(id) {
    $("#" + this.centerpreid).removeClass("activeOption")

    if (id == 'mapsection') {
      document.getElementById('gridContainer').style.display = "none"
      document.getElementById('mapcontainer').style.display = "block";
      document.getElementById('mapcontainer').style.width = "100%";
      $("#" + this.centerpreid).removeClass("activeOption");


    } else if (id == 'grid') {
      document.getElementById('mapcontainer').style.display = "none";
      document.getElementById('gridContainer').style.display = "block"

      document.getElementById('gridContainer').style.width = "100%";


    } else if (id == 'split') {
      document.getElementById('mapcontainer').style.display = "block";
      document.getElementById('gridContainer').style.display = "block";

      document.getElementById('gridContainer').style.width = "50%";
      document.getElementById('mapcontainer').style.width = "50%";
    }
    $("#" + id).addClass("activeOption");
    this.centerpreid = id

  }

  percent: any;
  BettaryStatus(current, total) {

    if (current == "0" || total == "0") {
      this.percent = 0;
    } else {
      this.percent = Number(current) / Number(total) * 100;
      this.percent = this.percent.toFixed(0)
    }

    return this.percent + "%";
  }

  subdivisionfilterData: any;

  DivisionsTotalVehicles(type) {
    this.filterVehicles = this.allvehicleData;

    if (type == "All") {
      try { this.CreateTable(this.filterVehicles) } catch (e) { }
    } else {
      this.filterVehicles = this.filterVehicles.filter(data => data.param53 == type);
      try { this.CreateTable(this.filterVehicles) } catch (e) { }

    }


  }
  vehiclesdata: any;
  DivisionsTotalVehiclesfilter(type, subtype) {
    this.filterVehicles = this.allvehicleData;
    if (type == 'All') {
      this.filterVehicles = this.filterVehicles.filter(data => data.param31 == subtype);
    } else {
      this.filterVehicles = this.filterVehicles.filter(data => data.param53 == type && data.param31 == subtype);

    }

    try { this.CreateTable(this.filterVehicles) } catch (e) { }
  }


  DivisionsTotalVehiclesfilterbyBattery(type, subtype) {
    this.filterVehicles = this.allvehicleData;
    if (type == 'All') {
      if (subtype == 'nopower') {
        this.filterVehicles = this.filterVehicles.filter(data => data.param49 == 'No Power');

        try { this.CreateTable(this.filterVehicles) } catch (e) { }
      } else if (subtype == 'low') {
        this.filterVehicles = this.filterVehicles.filter(data => (data.param49 == 'Extremely Low Battery' || data.param49 == 'Low Battery'));

        try { this.CreateTable(this.filterVehicles) } catch (e) { }
      } else if (subtype == 'medium') {
        this.filterVehicles = this.filterVehicles.filter(data => data.param49 == 'Medium');

        try { this.CreateTable(this.filterVehicles) } catch (e) { }
      } else if (subtype == 'high') {
        this.filterVehicles = this.filterVehicles.filter(data => (data.param49 == 'High' || data.param49 == 'Very High'));

        try { this.CreateTable(this.filterVehicles) } catch (e) { }
      }
    } else {
      if (subtype == 'nopower') {
        this.filterVehicles = this.filterVehicles.filter(data => data.param49 == 'No Power');

        try { this.CreateTable(this.filterVehicles) } catch (e) { }
      } else if (subtype == 'low') {
        this.filterVehicles = this.filterVehicles.filter(data => (data.param49 == 'Extremely Low Battery' || data.param49 == 'Low Battery'));

        try { this.CreateTable(this.filterVehicles) } catch (e) { }
      } else if (subtype == 'medium') {
        this.filterVehicles = this.filterVehicles.filter(data => data.param49 == 'Medium');

        try { this.CreateTable(this.filterVehicles) } catch (e) { }
      } else if (subtype == 'high') {
        this.filterVehicles = this.filterVehicles.filter(data => (data.param49 == 'High' || data.param49 == 'Very High'));

        try { this.CreateTable(this.filterVehicles) } catch (e) { }
      }
    }




  }


  
  ActiveDetails(id){
    if(id=='mapview'){
      document.getElementById('mapview').style.display='none';
      document.getElementById('gridview').style.display='block';
      document.getElementById("summarytable").style.display='block';
  
      document.getElementById('innercontainer').style.transform="rotateY(180deg)";
      document.getElementById("frontmap").style.zIndex="1";
    }else{
      document.getElementById('gridview').style.display='none';
      document.getElementById("summarytable").style.display='none';
  
      document.getElementById('mapview').style.display='block';
      document.getElementById('innercontainer').style.transform="rotateY(0deg)";
      document.getElementById("frontmap").style.zIndex="0";
  
    }
    
  }
  
  
  



  //=====  Design Validations

  ShowTripGrid() {
    // $("#gridContainer").hide()
    // $("#filterDiv").hide()
    // $("#detailsContainer").show()
    document.getElementById("tripgridContainer").style.transform = "rotateY(180deg)";

    //this.singleVehicleDetails=data;

  }

  ShowCounts() {
    document.getElementById("tripgridContainer").style.transform = "rotateY(0deg)";

  }


  //=============== Map Functionality 




  diff_hours(dt2, dt1) 
  {
 
   var diff =(dt2.getTime() - dt1.getTime()) / 1000;
   diff /= (60 * 60);
   return Math.abs(Math.round(diff));
   
  }


  monthArray=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  vehicleid:any;
  
  PlotLivetrail(vehicleno){
     
  try{ this.ClearAll()}catch(e){}
  try{ ClearHistoryAnimation1()}catch(e){}
  
  $('#historycheckbox').prop('checked', false);
  
    document.getElementById("historybutton").style.display="flex";
    document.getElementById("historyoption").style.display="none";
    this.HistoryFunction(vehicleno,"0","live");
  
  }
  
  PlotHistorytrail(vehicleno){
  
  try{ this.ClearAll()}catch(e){}
  try{ ClearHistoryAnimation1()}catch(e){}
    this.HistoryDatecheck();
    this.HistoryFunction(vehicleno,"1","history");
   
  
    document.getElementById("historybutton").style.display="none";
    document.getElementById("historyoption").style.display="flex";
  
  }
  
  PlotBoth(vehicleno){
  
    this.HistoryFunction(vehicleno,"0","history");
    document.getElementById("historyoption").style.display="flex";
  
    document.getElementById("historybutton").style.display="flex";
  }
  
  HistoryDatecheck(){
    
  var parsedate=new Date($("#fromDate").val());
  let month:any=parsedate.getMonth()+1;
  let day:any=parsedate.getDate();
  if(month<10){
    month=0+""+month;
  }
  if(day<10){
    day=0+""+day;
  }
  
  var time=$("#fromTime").val().replace(" : ", ":");
  
  var frmdatetime=parsedate.getFullYear()+"-"+month+"-"+day+" "+time;
  var dt1 = new Date(frmdatetime);
  
  
   parsedate=new Date($("#toDate").val());
   month=parsedate.getMonth()+1;
   day=parsedate.getDate();
  if(month<10){
    month=0+""+month;
  }
  if(day<10){
    day=0+""+day;
  }
  
  time=$("#toTime").val().replace(" : ", ":");
  
  
  var todatetime=parsedate.getFullYear()+"-"+month+"-"+day+" "+time;
  
  var dt2 =new Date(todatetime);
  var diff=this.diff_hours(dt1, dt2);
  
  if(diff>24 || diff==0){
    alert("Date should be between 24 hours");
    return;
  }
  }
  HistoryFunction(vehicleno,type,condition){
    try{AddLoader()}catch(e){}
  
  this.vehicleid=vehicleno;
  
  
  
   
   this.routeArray=[];
  
   //this.HistoryService(vehicleno,type)
   
   try{this.GetRouteDetails(vehicleno,type,condition)}catch(e){}
  
   var d=new Date();
   var fromdate=d.getFullYear()+"-"+this.monthArray[d.getMonth()]+"-"+d.getDate();
   //var todate=d.getFullYear()+"-"+this.monthArray[d.getMonth()]+"-"+d.getDate();
  
    let requestData={
  
      
     "param1":vehicleno,
     "param2":fromdate,
     "param3":fromdate,
     "param4":"12:01 AM",
     "param5":"11:59 PM",
     "param6": "",
      "pageNo":"",
     "itemsPerPage":"",
     "searchBy":"",
     "searchType":"",
     "totalRecords":"NA",
     "pageID":"1",
     "pageName":this.encryptedpageNameValue,
     "pageURL":this.encryptedpageUrlValue
  
   }
  
  //}
  
  
  
  }
  
  
  //===== Route  Details 
  
  
    
  GetRouteDetails(vehicleno,type,condition){
    //GetRouteDetails
    
    
    let requestData={
      "param3":vehicleno,
       "pageNo":"",
      "itemsPerPage":"",
      "searchBy":"",
      "searchType":"",
      "totalRecords":"NA",
      "pageID":"1",
      "pageName":this.encryptedpageNameValue,
      "pageURL":this.encryptedpageUrlValue
    
    }
    
    try{ClearRoute()}catch(e){}
    try{ClearRailPoi()}catch(e){}
    
    
    
    
    this.postService.GetRoutesDetails(requestData).subscribe((data) => {
      try{if(data.entity.list.length>0){
        let routeDetails=data.entity.list;
          for(var i=0;i<routeDetails.length;i++){
            let coord=JSON.parse(routeDetails[i].param4);
            coord=coord.coordinates;
          try{ PlotRoute(coord)}catch(e){}
          }
       
        }}catch(e){}
      try{this.HistoryService(vehicleno,type,condition)}catch(e){}
      try{this.PoiService(vehicleno)}catch(e){}
      
    })
    
  
  }   //end route details method
  
  
  
  
  GetVehicleFocus(){
    document.getElementById('summarytable').style.display='block';
  
    try{this.ClearAll()}catch(e){}
   try{ var latlong=[];
    latlong.push(Number(this.deviceData.param36))
    latlong.push(Number(this.deviceData.param35))
    CustomFlyTo(latlong);
    var details={
      data:{
        "type":"cluster",
       "title":this.deviceData.param12,
    
  //    "Key/Trolley Man":this.deviceData.param22,
          "Updated At":this.deviceData.param32,
        
       //   "GPS Status":this.deviceData.param39,
          "Status":this.deviceData.param47,
          "Speed":this.deviceData.param37,
          "Battery Status":this.deviceData.param49,
     //   "Division":this.deviceData.param53,
        "Section":this.deviceData.param59,
      //  "direction":this.deviceData.param40,
     
      }
      }
  
      var icon="";
      var status=this.deviceData.param47;
      
      if(status=='Non Polling'){
        icon="assets/mapimages/personicons/personiconred.png"
      }else if(status=='Idle'){
        
        icon="assets/mapimages/personicons/personiconyellow.png"
      }else if(status=='Working'){
        
        icon="assets/mapimages/personicons/personicongreen.png"
      }else if(status=='Stop'){
        icon="assets/mapimages/personicons/personiconred.png"
      }else{
        icon="assets/mapimages/personicons/personiconblack.png"
      }
  
  
  SingleMarker(latlong,details,"",icon);
  }catch(e){}
  }
  
  
    
  HistoryService(vehicleno,type,condition){
    var requestData={};
    if(condition=="history"){
  
      if(type=='1'){
  
       
        requestData={
   
         "param1":vehicleno,
         "param2":$("#fromDate").val(),
         "param3":$("#toDate").val(),
         "param4":$("#fromTime").val(),
         "param5":$("#toTime").val(),
         "param6": "",
          "pageNo":"",
         "itemsPerPage":"",
         "searchBy":"",
         "searchType":"",
         "totalRecords":"NA",
         "pageID":"1",
         "pageName":this.encryptedpageNameValue,
         "pageURL":this.encryptedpageUrlValue
   
       }
     }else{
  
  
      
       var d=new Date();
       var fromdate=d.getFullYear()+"-"+this.monthArray[d.getMonth()]+"-"+d.getDate();
       //var todate=d.getFullYear()+"-"+this.monthArray[d.getMonth()]+"-"+d.getDate();
     
        requestData={
     
          
         "param1":vehicleno,
         "param2":fromdate,
         "param3":fromdate,
         "param4":"12:01 AM",
         "param5":"11:59 PM",
         "param6": "",
          "pageNo":"",
         "itemsPerPage":"",
         "searchBy":"",
         "searchType":"",
         "totalRecords":"NA",
         "pageID":"1",
         "pageName":this.encryptedpageNameValue,
         "pageURL":this.encryptedpageUrlValue
     
       }
     
     }
     
   
     
   this.postService. GetHistoryLogs(requestData).subscribe((data) => {
     // try{this.Historydetailspanel(vehicleno)}catch(e){}
     try{RemoveLoader()}catch(e){}
     
      if(data.entity=="NO RECORD FOUND"){
       alert(data.entity);
      }else if(data.entity.list.length>0){
       let historyData=data.entity.list;
       AnimationLine(historyData,this.historytrackspeed);
        console.log("come after animate call")
        
      }
     
     
     });
    }else if(condition=="live"){
      if(type=='0'){
        try{RemoveLoader()}catch(e){}
  
        try{this.LiveFunction(vehicleno)}catch(e){}
      }
    }
    
    
  
  }
  
    
  PoiService(vehicleno){
    let requestData={
      "param1":"",
      "param2":"",
  
      "param3":vehicleno,
      "param4":"",
       "pageNo":"",
      "itemsPerPage":"",
      "searchBy":"",
      "searchType":"",
      "totalRecords":"NA",
      "pageID":"1",
      "pageName":this.encryptedpageNameValue,
      "pageURL":this.encryptedpageUrlValue
    
    }
  this.postService.GetRailPoi(requestData).subscribe((data) => {
    if(data.entity.list.length>0){
      
      var routeArray=[];
      let poiDetails=data.entity.list;
      // for(var i=0;i<poiDetails.length;i++){
      //   var latlon=[];
      //   latlon.push(Number(poiDetails[i].param9))
      //   latlon.push(Number(poiDetails[i].param8))
      //   routeArray.push(latlon);
      //  try{ PlotRoute(routeArray)}catch(e){}
      // }
  
      for(var i=0;i<poiDetails.length;i++){
        var latlon=[];
        latlon.push(Number(poiDetails[i].param9))
        latlon.push(Number(poiDetails[i].param8))
        var icon="assets/mapimages/mapstyleicon/railsignal.png";
        var details={
          "data":{
            "title":poiDetails[i].param2,
            "type":"live",
            "Range":poiDetails[i].param10+" KM",
            "Details":poiDetails[i].param2,
           
            "Location":poiDetails[i].param8+" , "+poiDetails[i].param9,
  
          }
        }
       try{ PlotRailPoi(icon,latlon,details)}catch(e){}
      }
  
    }
  })
  
   }
  
  
  
         
   LiveFunction(vehicleno){
    var totaldistance=0
        
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
        
        var date=new Date();
        var start=date.getDate()+"-"+this.monthArray[date.getMonth()]+"-"+date.getFullYear()+" "+"12:00 AM";
        
        var end=date.getDate()+"-"+this.monthArray[date.getMonth()]+"-"+date.getFullYear()+" "+"11:59 AM";
    
        
     
  
  
       this.postService.GetSingleLiveVehicle(requestdata).subscribe((data) => {
          if(data.entity.list.length>0){
          //  this.ClearAllmapdata();
           
      
            try{
              var liveData=data.entity.list[0];
  
             var distancecal=0;
             totaldistance=totaldistance+distancecal
              
  
    try{
      var details={
        data:{
          "type":"live",
         "title":liveData.param12,
      
      //  "Key/Trolley Man":liveData.param22,
        "Updated At":liveData.param32,
      
   //     "GPS Status":liveData.param39,
        "Status":liveData.param31,
        "Speed":liveData.param37,
        "Distance":totaldistance+" km"
        
       
    }
  }
     }catch(e){}
              
              var latlong=[];
              latlong.push(Number(liveData.param36));
              latlong.push(Number(liveData.param35));
      
             try{ LiveAnimation(details,latlong)}catch(e){}
               
       this.liveInterval = setInterval(() => {
              this.postService.GetSingleLiveVehicle(requestdata).subscribe((data) => {
                if(data.entity.list.length>0){
                //  this.ClearAllmapdata();
            //    try{this.Livedetailspanel(vehicleno)}catch(e){}
                           
                  
                    var liveData=data.entity.list[0];
  
                    if(prelat!=liveData.param35 || prelog!=liveData.param36){
                        if(prelat!="" || prelog!=""){
                          try{distancecal=GetDistance(prelat,prelog,liveData.param35,liveData.param36,"K")}catch(e){}
                          totaldistance=totaldistance+distancecal;
  
                        }
                try{
             
                  var details={
                    data:{
                      "type":"live",
                    "title":liveData.param12,
                  
                  //  "Key/Trolley Man":liveData.param22,
                    "Updated At":liveData.param32,
                  
                //    "GPS Status":liveData.param39,what
                    "Status":liveData.param31,
                    "Speed":liveData.param37,
                    "Distance":totaldistance.toFixed(2)+" Km"
                  
                }
              }
  
              var latlong=[];
              latlong.push(Number(liveData.param36));
              latlong.push(Number(liveData.param35));
             try{ LiveAnimation(details,latlong)}catch(e){}
             }catch(e){}
                  
                
                    }
                    
  
                   prelat=liveData.param35;
                   prelog=liveData.param36;
                  }
                   
                 
  
                });
  
             },10000);
  
  
      
          }catch(e){}
      
          }else{
          
          }
  
  
     })
  
  }
  
  
  
  //====== Clear map Data
  
  ClearAll(){
  
    try{ClearSubdivisionClusters()}catch(e){};
    try{ ClearDivisionClusters('All')}catch(e){};
    try{ClearCluster()}catch(e){}
    try{clearInterval(this.liveInterval)}catch(e){}
    try{clearInterval(intervalrail)}catch(e){}
    try{ClearRoute()}catch(e){}
    try{ClearRailPoi()}catch(e){}
    try{ClearAnimation();}catch(e){}
    try{ClearDirection()}catch(e){}
    try{ClearSingleMarkers()}catch(e){}
   try{ClearAlert()}catch(e){} 
   try{clearInterval(this.liveInterval)}catch(e){}
   try{ClearHistoryAnimation1()}catch(e){}
  
  }
  
  
  
  CreateTable(data){
    try{this.ClearAll() }catch(e){}
    try{ MakePersonClusters(data)}catch(e){}
    document.getElementById("historybutton").style.display="none";
    document.getElementById("historyoption").style.display="none";
    
    try{
  
      var tabledetails="<table id='vehicleTable' class='sortable customTable table table-striped '  style=' text-align: left;   margin-top:0px;font-weight: bold; color: black;  font-size: 10px;'><tr style='  background-color: #989cb1;'>"+
      "<th>#</th>"+
      "<th>Division</th>"+
      "<th>Sub Division</th>"+
      "<th>Section / Department</th>"+
      "<th>Device Name</th>"+
      "<th>Last Update Time</th>"+
      "<th>Speed</th>"+
      "<th>Battery Status</th>"+
      "<th>Status</th>"+
     "<th>Location</th>"+
     "<th>Track</th></tr>";
       
       for(var i=0;i<data.length;i++){
        var row=i+1;
    
    
        tabledetails=tabledetails+"<tr>"+
        "<td>"+row+"</td>"+
        "<td>"+data[i].param53 +"</td>"+
        "<td>"+data[i].param55 +"</td>"+
        "<td>"+data[i].param59 +
        "<td>"+data[i].param12+"</td>"+
        "<td>"+data[i].param32+"</td>"+
        "<td>"+data[i].param37+"</td>"
    
       if(data[i].param49=='No Power'){
          tabledetails=tabledetails+"<td style=' width: 80px;   background-color: #cc343452; color: red !important; '> "+data[i].param49+"</td>"
        }else if(data[i].param49=='Low Battery' || data[i].param49=='Very Low Battery'  || data[i].param49=='Extremely Low Battery'){
          
          tabledetails=tabledetails+"<td style=' width: 80px;     background-color: #5d5da26b;  color: blue !important;'>"+ data[i].param49+"</td>"
     
        }else if(data[i].param49=='High' || data[i].param49=='Very High'){
          tabledetails=tabledetails+"<td style='   width: 80px;    background-color: #76da798a; color: green !important;'> "+data[i].param49+"</td>"
     
        }else if(data[i].param49=='Medium'){
          tabledetails=tabledetails+"<td style='     width: 80px;     background-color: #f3ce8c8a; color: orange !important;'>"+ data[i].param49+"</td>"
     
        }else{
          tabledetails=tabledetails+"<td>"+ data[i].param49+"</td>";
     
        }
       
        tabledetails=tabledetails+ "<td>"+data[i].param31+"</td>";
        tabledetails=tabledetails+"<td style='cursor:pointer;'>"
        +"<div id='view"+i+"'  onclick='Getlocation("+'"'+i+'"'+","+'"'+data[i].param35+'"'+","+'"'+data[i].param36+'"'+")'>view location</div>"
        +"<div id='location"+i+"' style='display:none'><div>"
       
        "</td>";
  
        var trackfuction='callAngularFunction("'+data[i].param11+'")';
        tabledetails=tabledetails+"<td><a onclick='"+trackfuction+"'><i style='font-size: 20px;color: #02a502;' class='fa fa-map-marker'></i></a></td>";
    
       }
    
       
    
       tabledetails=tabledetails+'</tr><table>'
       document.getElementById('tablediv').innerHTML=tabledetails;
      
       SortingTable('vehicleTable')
    }catch(e){}
  }
  
  
  
  PauseHistory(){
    try{ ClearHistoryInterval() }catch(e){}
   
  
  }
  
  ResumeAnimation(){
    try{  ResumeAnimation(this.historytrackspeed)}catch(e){}
  }
  
  RestartAnimation(){
    try{ ClearHistoryInterval() }catch(e){}
    try{ ClearHistoryAnimation1() }catch(e){}
  
    
    
    RestartAnimation(this.historytrackspeed)
  
  
  }
  
  
  gridlivetrack(inputdata) {  
    this.ActiveDetails('mapview');
    this.PlotLivetrail(inputdata)
  
  }  
  
  HistoryCheck(vehicleid){
    
    if($("#historycheckbox").prop("checked") == true){
      try{ ClearHistoryAnimation1()}catch(e){}
  
     this.PlotBoth(vehicleid);
  
      }else{
        try{ ClearHistoryAnimation1()}catch(e){}
      }
  }
  
  
  StopHistory(){
    try{ ClearHistoryAnimation1()}catch(e){}
    try{PlotCompleteHistory()}catch(e){}
  
  }
  
  ChangeHistoryspeed(){
  
    try{ ClearHistoryInterval() }catch(e){}
   try{ ResumeAnimation(this.historytrackspeed)}catch(e){}
  
  
  }
  
  
  Switchrailpoi(){
  
    if($("#railpoiswitcher").prop("checked") == true){
      PoiSwitcherrail(true)
  
   
      }else{
        PoiSwitcherrail(false)
      }
    
  }
  
  






  prefilterCollapse: any
  OpenFilter(type) {
    try { $("#" + this.prefilterCollapse).collapse('hide'); } catch (e) { }

    $('#' + type).collapse('show');
    this.prefilterCollapse = type;
  }


  RemoveItem(data, value) {

    for (var i = 0; i < data.length; i++) {

      if (data[i] === value) {

        data.splice(i, 1);
      }

    }
    return data;
  }
  AddItem(data, newData) {
    for (var i = 0; i < newData.length; i++) {
      data.push(newData[i]);
    }
    console.log("come at add   " + data.length)
    return data;
  }




  Splitsectionid(str) {
    var res = str.replace("/", "1");
    return res
  }







  SearchFilterTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchbydata");
    filter = input.value.toUpperCase();
    table = document.getElementById("vehicleTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[4];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
  
  
  




  // ============================  Export Functionality




  PrepareExcelData(data) {
    this.excelData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = {
        "#": i + 1,
        "Division": data[i].param53,
        "Section": data[i].param59,
        "Employee Name": data[i].param12,
        "Last Updated At": data[i].param34,
        "Latitude": data[i].param35,
        "Logitude": data[i].param36,
        "Speed": data[i].param37,
        "Battery Status": data[i].param49,
        "Geofence Name": data[i].param50,
        "Status": data[i].param47,

      }
      this.excelData.push(obj);
    }
  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'Device Details', 'devicedetails');
  }

  distanceTravelledReportPDFDownload() {
    var sTable = document.getElementById('tablediv').innerHTML;
    var style = "<style>";
    style = style + "table {width: 100%;font: 17px Calibri;}";
    style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";

    // CREATE A WINDOW OBJECT.
    var win = window.open('', '', 'height=700,width=700');

    win.document.write('<html><head>');
    win.document.write('<title>Device Report</title>');   // <title> FOR PDF HEADER.
    win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write('</head>');
    win.document.write('<body>');
    win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write('</body></html>');

    win.document.close(); 	// CLOSE THE CURRENT WINDOW.

    win.print();    // PRINT THE CONTENTS.
  }



  AllwidgetsDatafilter(type) {

  }

  SelectSectionFilter(type){
    var data=this.allvehicleData.filter(x => x.param59 ==type);
    try{ this.CreateTable(data)}catch(e){}
  
  }


  // End Class   

}
