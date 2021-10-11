import { Component, NgZone, OnInit } from '@angular/core';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { CustomerdashboardService } from '../services/customerdashboard.service';
import { CryptService } from '../services/crypt.service';
import { PostService } from 'src/post.service';
import { NullAstVisitor } from '@angular/compiler';
import { ExportToExcelService } from '../services/export-to-excel.service';
declare var $: any;
declare var mapBuild: any;
declare var SwitchMap: any;

declare var map: any;
declare var RemoveLoader: any;

declare var AddLoader: any;
declare var container: any;
declare var content: any;
declare var closer: any;
declare var PopupInitialize: any;

declare var StartEndPoint: any;

declare var Livetrail: any;
declare var PopupInitialize: any;
declare var MakeClusters: any;
declare var SingleMarker: any;
declare var ClearCluster: any;
declare var ClearSingleMarkers;
declare var ClearLiveTrail;
declare var ClearAlert;
declare var ClearDirection; declare var DirectionIcon: any; declare var PoiSwitcher: any;

declare var GeoserverFilter: any;


declare var GetIcon: any;
declare var Gauge: any;
declare var Donut: any;
declare var container: any;
declare var content: any;
declare var closer: any;
declare var PlotCompleteHistory: any;


declare var VehicleChart: any;
declare var LiveVehicleChart: any;

declare var ClearPolygonDraw: any;
declare var ClearAnimation: any;

declare var ClearHistoryInterval: any;

declare var ResumeAnimation: any;

declare var ClearHistoryInterval: any;
declare var ClearHistoryAnimation1: any;
declare var RestartAnimation: any;
declare var GetIcon: any;
declare var CustomFlyTo: any;
declare var AnimationLine: any;
declare var ClearHistory: any;

declare var GetDirectionIcon: any;




@Component({
  selector: 'app-apsacdashboard',
  templateUrl: './apsacdashboard.component.html',
  styleUrls: ['./apsacdashboard.component.css']
})



export class ApsacdashboardComponent implements OnInit {

  constructor(private ngZone: NgZone, private custService: CustomerdashboardService, public excelservice: ExportToExcelService, private postService: PostService, private cryptService: CryptService) { }

  filterVehicles: any = [];
  totalrecords: any = 0;
  allvehiclesdata: any = [];
  filtersummary: any;
  encryptedpageNameValue: any;
  encryptedpageUrlValue: any;
  liveInterval: any;
  pageUrl: any;
  roleid: any;
  historyvehicleno: any;
  historytrackspeed: any = 5;
  exportroutedata: any = [];

  list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  ngOnInit() {

    this.EncryptPageName()
    this.EncryptPageUrl()

    // this.Getcompanywisecounts();


    this.dashboardCounts();

    window['angularComponentReferencelive'] = { component: this, zone: this.ngZone, loadAngularFunction: (inputdata) => this.gridlivetrack(inputdata), };
    window['angularComponentReferencehistory'] = { component: this, zone: this.ngZone, loadAngularFunction: (inputdata) => this.Historymodal(inputdata), };

    // this.map.buildMap();
    // this.map.HistoryAnimation("");


    setTimeout(() => {
      let latlong = [78.9629, 20.5937];

      new mapBuild('map', latlong)

      container = document.getElementById("popup");
      content = document.getElementById("popup-content");
      closer = document.getElementById("popup-closer");

      PopupInitialize();

      SwitchMap("3");

    //  this.AllVehiclesData();
      this.GetRoutedetails();


    }, 2000);

  

  }


  Expenddiv() {
    $("#mainContainer").toggleClass("expendDiv");
    map.updateSize();
  }









  gridlivetrack(inputdata) {
    try { this.ActiveDetails('mapview'); } catch (e) { }
    try { this.SingleTrail(inputdata); } catch (e) { }

  }


  preswitchid = "3"
  MapSwitch(layerindex) {
    try {
      if (this.preswitchid != "") {
        $("#switch" + this.preswitchid).removeClass("activeSwitchOption effect8");
      }
      this.preswitchid = layerindex;
    } catch (e) { }
    $("#switch" + layerindex).addClass("activeSwitchOption effect8");

    try { SwitchMap(layerindex) } catch (e) { }
  }



  vendorwisecounts:any;
  districtwisecounts:any=[];
  othercounts:any;

  dashboardCounts() {
    let companywisereq = {
      "pageID": "1",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }

    try {
      try { AddLoader() } catch (e) { }

      this.postService.GetdashboardCompanywisecounts(companywisereq).subscribe((data) => {
        try { RemoveLoader() } catch (e) { }
        this.vendorwisecounts=data.entity;
       })

    } catch (e) {  RemoveLoader()}


    let districtwisecountreq = {
      "pageID": "1",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }

    try {
      try { AddLoader() } catch (e) { }

      this.postService.GetdashboardDistrictwisecounts(districtwisecountreq).subscribe((data) => {
        try { RemoveLoader() } catch (e) { }
        this.districtwisecounts=data.entity;
        var resData:any=[];
        for(var i=0;i<this.districtwisecounts.length;i++){
          var obj={
            
              "alert": this.districtwisecounts[i].districtname,
              "count": Number(this.districtwisecounts[i].etpcount)
            
          }
          resData.push(obj)

        }
        this.AlertsChart(resData)

       })

    } catch (e) {  RemoveLoader()}



    let counts = {
      "pageID": "1",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }

    try {
      try { AddLoader() } catch (e) { }

      this.postService.GetDashboardotherCounts(counts).subscribe((data) => {
        try { RemoveLoader() } catch (e) { }
        this.othercounts=data.entity;

       var gpschartdata= [
          {
            "label": "GPS",
            "value": Number(this.othercounts.param6)
          },
          {
            "label": "Non GPS",
            "value": Number(this.othercounts.param7)
          }
        ]
        this.VehicleChart(gpschartdata);

        var batterychart=[{
          "category": "Main Power",
    
          "negative2": -Number(this.othercounts.param9),
          "positive1": Number(this.othercounts.param8),
    
        }, {
          "category": "On Battery",
    
          "negative2": -Number(this.othercounts.param11),
          "positive1": Number(this.othercounts.param10),
        }, {
          "category": "Battery Disconnected",
    
          "negative2": -Number(this.othercounts.param13),
          "positive1": Number(this.othercounts.param12),
        }];


        this.Headercharts(batterychart)


        $(function () {
          try {
    
    
    
          } catch (e) { }
          var setInvisible = function (elem) {
            elem.css('visibility', 'hidden');
          };
          var setVisible = function (elem) {
            elem.css('visibility', 'visible');
          };
    
          var elem = $("#elem");
          var items = elem.children();
    
          // Inserting Buttons
          elem.prepend('<div id="right-button" style="visibility: hidden;"><a><i  class="fa fa-chevron-left"></i></a></div>');
          elem.append('  <div id="left-button"><a><i class="fa fa-chevron-right"></i></a></div>');
    
          // Inserting Inner
          items.wrapAll('<div id="inner" />');
    
          // Inserting Outer
          elem.find('#inner').wrap('<div id="outer" />');
    
          var outer = $('#outer');
    
          var updateUI = function () {
            var maxWidth = outer.outerWidth(true);
            var actualWidth = 0;
            $.each($('#inner >'), function (i, item) {
              actualWidth += $(item).outerWidth(true);
            });
    
            if (actualWidth <= maxWidth) {
              setVisible($('#left-button'));
            }
          };
          updateUI();
    
    
    
          $('#right-button').click(function () {
            var leftPos = outer.scrollLeft();
            outer.animate({
              scrollLeft: leftPos - 100
            }, 800, function () {
              if ($('#outer').scrollLeft() <= 0) {
                setInvisible($('#right-button'));
              }
            });
          });
    
          $('#left-button').click(function () {
            setVisible($('#right-button'));
            var leftPos = outer.scrollLeft();
            outer.animate({
              scrollLeft: leftPos + 300
            }, 800);
          });
    
          $(window).resize(function () {
            updateUI();
          });
        });

       })

    } catch (e) {  RemoveLoader()}

  }




  AllVehiclesData() {
    let service = this.custService;

    let keydata = {
   //   param1:"0",
      pageNo: "",
      itemsPerPage: "",
      searchBy: this.filtersummary,
      searchType: "",
      totalRecords: "NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }

    service.GetVehicleDetailsformap(keydata).subscribe((data) => {

      this.allvehiclesdata = data.entity.list;
      // this.globalclickdetails$ = this.allvehiclesdata;
      this.CreateTable(this.allvehiclesdata);
      this.PrepareExcelData(this.allvehiclesdata);
      // this.OverSpeedVehiclesSearch(this.allvehiclesdata);
    });
  }




  excelData: any = [];
  PrepareExcelData(data) {
    this.excelData = [];
    if (this.roleid == "10" || this.roleid == "11" || this.roleid == "16" || this.roleid == "16") {

      for (var i = 0; i < data.length; i++) {
        try {


          let obj: any = {
            "#": i + 1,
            "Customer Name": data[i].param22,
            "Vehicle No": data[i].param12,
            "Device Type": data[i].param65,
            "IMEI No.": data[i].param3,
            "Updated On .": data[i].param32,
            "Speed.": data[i].param37,
            "Ignition": data[i].param42,
            "GPS Status": data[i].param39,
            "Direction": data[i].param46,
            "Latitude": data[i].param36,
            "Longitude": data[i].param36
          }
          this.excelData.push(obj);

        } catch (e) { }
      }
    } else {
      for (var i = 0; i < data.length; i++) {
        try {


          let obj = {
            "#": i + 1,
            "Vehicle No": data[i].param12,
            "Device Type": data[i].param65,
            "IMEI No.": data[i].param5,
            "Updated On .": data[i].param32,
            "Speed.": data[i].param37,
            "Ignition": data[i].param42,
            "GPS Status": data[i].param39,
            "Direction": data[i].param46,
            "Latitude": data[i].param36,
            "Longitude": data[i].param36
          }
          this.excelData.push(obj);

        } catch (e) { }
      }
    }



  }

  exportToExcel() {
    this.excelservice.ExportExcel(this.excelData, 'Vehicle Details', 'Vehicle Details');
  }


  ActiveDetails(id) {
    if (id == 'mapview') {
      document.getElementById('mapview').style.display = 'none';
      document.getElementById('gridview').style.display = 'inline-block';
      document.getElementById("frontmap").style.zIndex = "1";

      document.getElementById('innercontainer').style.transform = "rotateY(180deg)";
    } else {

      document.getElementById("frontmap").style.zIndex = "0";

      document.getElementById('gridview').style.display = 'none';

      document.getElementById('mapview').style.display = 'inline-block';

      document.getElementById('innercontainer').style.transform = "rotateY(0deg)";

    }

  }

  CreateTable(data) {

    try { this.ClearAllData(); } catch (e) { }
    try { this.PlotClusterVehicles(data); } catch (e) { }
    try { document.getElementById("historytrackoption").style.display = "none"; } catch (e) { }
    this.totalrecords = data.length;

    var tablecontainer = "<div>"
    var table = '<table id="vehicleTable" class="table table-hover table-striped customertable" style=" width: 100%; " >' +
      ' <thead >' +
      '<tr class="customertableheader">' +
      '<th >#</th>' +

      '<th id="customerth">Customer </th>' +
      '<th >Vehicle No</th>' +
      '<th >Device Type</th>' +
      '<th >IMEI No.</th>' +
      '<th >Updated At </th>' +
      '<th >Speed</th>' +
      '<th >Ignition </th>' +
      '<th >Direction </th>' +

      '<th >GPS Status</th>' +
      '<th >Location</th>' +
      '<th >Track</th>' +
      '</tr>' +
      ' <tbody >';

    for (var i = 0; i < data.length; i++) {
      let rowno = i + 1;
      table = table + ' <tr><td class="grdcontent">' + rowno + '</td>' +
        '<td class="grdcontent customertdclass" id="customertd' + i + '">' + data[i].param22 + '</td > ' +
        '<td class="grdcontent" data-html="true" data-toggle="popover" data-trigger="focus"  title="  Chassis No. : ' + data[i].param13 + ' \n Engine No. : ' + data[i].param14 + '\n Vehicle Type : ' + data[i].param19 + '\n Vehicle Model : ' + data[i].param25 + ' " data-content="<div><b>Example popover</b> - content</div>" >' + '<span style="font-weight:bolder;font-size:11px;color:darkblue">' + data[i].param12 + '</span>' + '</td > ' +
        '<td class="grdcontent" >' + data[i].param65 + '</td>' +
        '<td class="grdcontent" data-html="true" data-toggle="popover" data-trigger="focus"  title="  Device Vendor. : ' + data[i].param8 + '\n ICCID No. : ' + data[i].param5 + '\n Primary Network : ' + data[i].param69 + '\n MSISD No. : ' + data[i].param67 + '\n Fallback No. : ' + data[i].param70 + '\n MSISD No. 2 : ' + data[i].param68 + ' " data-content="<div><b>Example popover</b> - content</div>" >' + '<span style="font-weight:bolder;font-size:11px;color:darkblue">' + data[i].param3 + '</span>' + '</td > ';
      if (data[i].param32 == null) { table = table + '<td class="grdcontent" > NA </td>'; }
      else { table = table + '<td class="grdcontent" >' + data[i].param32 + '</td>'; }

      if (data[i].param37 == null) { table = table + '<td class="grdcontent" > NA </td>'; }
      else { table = table + '<td class="grdcontent" >' + data[i].param37 + '</td>'; }
      table = table + '<td class="grdcontent" >' + data[i].param42 + '</td>' +
        '<td class="grdcontent" >' + data[i].param46 + '</td>';
      // '<td class="grdcontent" >' + data[i].param39 + '</td>' ;

      // for fallback network and and sim 2 
      // if (data[i].param68 == '' || data[i].param70 == '') {
      //   table = table + '<td class="grdcontent" > NA </td>';
      // }
      // else {
      //   table = table + '<td class="grdcontent" >' + data[i].param70 + '<br>' + ' ' + data[i].param68 + '</td>';
      // }
      // '<td class="grdcontent">' + data[i].param32 + "<br>" + data[i].param37 + '</td>'

      // if (data[i].param42 == 'ON') {
      // if (data[i].param32 == null && data.param37 == null) {
      //   table = table + '<td class="grdcontent" > NA </td>';
      // }
      // else {
      //   table = table + '<td style=" background-color: #aff381;; color: rgb(4 122 13);font-size:10px">' + data[i].param32 + '<br>' + data[i].param37 + ' km/h  </td>';
      // }
      // } else {
      //   table = table + '<td style="background-color: rgb(241, 141, 137);color: rgb(91 7 4); ">' + data[i].param32 + '<br>' + data[i].param37 + '</td>';
      // }
      // table = table + '<td class="grdcontent">' + data[i].param42 + '<br>' + data[i].param46 + '</td>';

      if (data[i].param39 == 'Valid') {
        table = table + '<td class="grdcontent" style="background-color: #9aeb8c; color: rgb(106 64 1);">' + data[i].param39 + '</div></td>'
      } else {
        table = table + '<td class="grdcontent" style="background-color: #fcc491; color: rgb(106 64 1);">' + data[i].param39 + '</div></td>'

      }


      if (data[i].param35 == null || data[i].param36 == null) {
        table = table + '<td class="grdcontent" style=" font-size: 11px;  text-align: center;">' +
          '<div   title="Location Show Of Selected Record."  style=" cursor: pointer; font-size:10px;color:rgb(14, 4, 156); font-weight: bold;" id="view' + i + '"> NA </div>';

      }
      else {
        table = table + '<td class="grdcontent" style=" font-size: 11px;  text-align: center;">' +
          '<div   title="Location Show Of Selected Record."  style=" cursor: pointer; font-size:10px;color:rgb(14, 4, 156); font-weight: bold;" id="view' + i + '">' + data[i].param35 + '<br>' + data[i].param36 + '</div>';

      }


      table = table + '</td>';
      // '<td>---</td>' +


      var trackfuction = 'livetrackfunction("' + data[i].param11 + '")';
      if (data[i].param36 == null || data[i].param35 == null || data[i].param36 == "" || data[i].param35 == "" || data[i].param36 == "NA" || data[i].param35 == "NA") {
        table = table + "<td><a title='No Data found' style='cursor'><i style='font-size: 20px;color: #02a502;cursor: not-allowed;' class='fa fa-map-marker'></i></a></td>";


      } else {
        table = table + "<td><a onclick='" + trackfuction + "'><i style='font-size: 20px;color: #02a502;cursor:pointer' class='fa fa-map-marker'></i></a></td>";

      }
    }
    tablecontainer = table + '</tr></tbody></table></div>'
    document.getElementById('tablediv').innerHTML = tablecontainer;

    if (this.roleid == "10" || this.roleid == "11" || this.roleid == "16" || this.roleid == "16") {
      for (var i = 0; i < data.length; i++) {
        $("#customerth").css("display", "block");
        $("#customertd" + i).css("display", "block");
      }




    } else {
      for (var i = 0; i < data.length; i++) {
        $("#customerth").css("display", "none");
        $("#customertd" + i).css("display", "none");
      }


    }
  }



  //======= Clear All Markers 

  ClearAllData() {
    try { ClearCluster() } catch (e) {//
    }


    try { clearInterval(this.liveInterval) } catch (e) { }
    try { clearInterval(this.liveInterval) } catch (e) { }
    try { ClearSingleMarkers() } catch (e) { }
    try { ClearHistory() } catch (e) { }
    try { ClearLiveTrail() } catch (e) { }
    try { ClearCluster() } catch (e) { }
    try { ClearAlert() } catch (e) { }
    try { ClearDirection() } catch (e) { }
    try { ClearAnimation() } catch (e) { }
    try { ClearHistoryInterval() } catch (e) { }
    try { ClearHistoryAnimation1() } catch (e) { }

    try { clearInterval(this.liveInterval) } catch (e) { }
    ClearSingleMarkers()
    ClearLiveTrail()
    ClearAlert()
    ClearDirection()
  }



  SingleTrail(vehicleno) {
    ClearSingleMarkers();
    let service = this.postService
    let prevData: any = "";

    let data = {
      pageNo: "1",
      itemsPerPage: "10",
      searchBy: vehicleno,
      searchType: "",
      totalRecords: "NA",
      pageID: "1",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
    try {
      this.postService.GetSingleLiveVehicle(data).subscribe((data) => {
        if (data.entity.list.length > 0) {
          this.ClearAllData();
          $("#speedometer").show();
          $("#alertDiv").show();


          try {
            var liveData = data.entity.list[0];
            var details = {
              data: {

                "type": "live",
                "title": liveData.param12,
                "Updated At": liveData.param32,
                "VehicleStatus": liveData.param47,
                "Speed": liveData.param37 + " km/hr",
                "Ignition": liveData.param42,
                "GPS Status": liveData.param39,
                "Direction": liveData.param46,
                "direction": liveData.param40,
                "Vehicle Type": liveData.param29,
                //   "historytrack"

                // "maptrack": liveData.param11




              }
            }
            var latlong = [];
            latlong.push(Number(liveData.param36));
            latlong.push(Number(liveData.param35));

            try { var icon = GetIcon(details.data) } catch (e) { console.log(e) }
            var type = 0
            Livetrail(latlong, details, icon, type);

            try { this.PlotLiveAlerts(liveData) } catch (e) { }
            this.liveInterval = setInterval(function () {

              data = {
                pageNo: "1",
                itemsPerPage: "10",
                searchBy: vehicleno,
                searchType: "",
                totalRecords: "NA",
                pageID: "1",
                pageName: this.encryptedpageNameValue,
                pageURL: this.encryptedpageUrlValue
              }
              try {
                service.GetSingleLiveVehicle(data).subscribe((data) => {
                  if (data.entity.list.length > 0) {


                    try {
                      var liveData = data.entity.list[0];
                      var details = {
                        data: {

                          "type": "live",
                          "title": liveData.param12,
                          "Updated At": liveData.param32,
                          "VehicleStatus": liveData.param47,
                          "Speed": liveData.param37 + " km/hr",
                          "Ignition": liveData.param42,
                          "GPS Status": liveData.param39,
                          "Direction": liveData.param46,
                          "direction": liveData.param40,
                          "Vehicle Type": liveData.param29,

                          // "maptrack": liveData.param11


                        }
                      }
                      var latlong = [];
                      latlong.push(Number(liveData.param36));
                      latlong.push(Number(liveData.param35));

                      try { var icon = GetIcon(details.data) } catch (e) { console.log(e) }
                      var type = 1;
                      Livetrail(latlong, details, icon, type);
                      if (prevData != '') {
                        var details = {
                          data: {

                            "type": "live",
                            "title": liveData.param12,
                            "Updated At": liveData.param32,
                            "VehicleStatus": liveData.param47,
                            "Speed": liveData.param37 + " km/hr",
                            "Ignition": liveData.param42,
                            "GPS Status": liveData.param39,
                            "Direction": liveData.param46,
                            "direction": liveData.param40,
                            "Vehicle Type": liveData.param29,

                            // "maptrack": liveData.param11


                          }
                        }
                        var latlong = [];
                        latlong.push(Number(prevData.param36));
                        latlong.push(Number(prevData.param35));
                        //DirectionIcon  latlong,details,icon
                        try { icon = GetDirectionIcon(details.data) } catch (e) { console.log(e) }
                        DirectionIcon(latlong, details, icon)
                      }
                      prevData = liveData;
                    } catch (e) { }

                  }

                })

              } catch (e) { }

            }, 10000);

          } catch (e) { }

        } else {
          //alert("No Data Found")
        }

      })

    } catch (e) { }

  }



  PlotClusterVehicles(data) {
    //alert("data   "+data[0].param12)
    try {
      //alert(data)
      MakeClusters(data)
    } catch (e) {//
    }



  }


  PlotLiveAlerts(data) {
    for (var i = 0; i < data.length; i++) {
      var latlon = [];
      latlon.push(Number(data[i].param36))
      latlon.push(Number(data[i].param35))

    }

  }


  /**
 * 
 * Developer : Tafseer Khan
 * Date : 17-08-2021
 * Functionality: Function for vehicle chart ,input as json data
 * 
 * 
 * 
 */
  VehicleChart(data) {



    am4core.useTheme(am4themes_animated);
    am4core.addLicense("ch-custom-attribute")

    // Themes end

    // Create chart instance
    let chart = am4core.create("gpschart", am4charts.XYChart3D);
    chart.paddingBottom = 30;
    chart.angle = 35;
    //  chart.addlicense("ch-")
    // Add data
    chart.data =data

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "label";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.renderer.inside = true;
    categoryAxis.renderer.grid.template.disabled = false;

    let labelTemplate = categoryAxis.renderer.labels.template;
    labelTemplate.rotation = -90;
    labelTemplate.horizontalCenter = "left";
    labelTemplate.verticalCenter = "middle";
    labelTemplate.dy = 10; // moves it a bit down;
    labelTemplate.inside = false; // this is done to avoid settings which are not suitable when label is rotated

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.disabled = false;

    // Create series
    var series = chart.series.push(new am4charts.ConeSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "label";

    var columnTemplate = series.columns.template;

    columnTemplate.adapter.add("fill", function (fill, target) {
      if (target.dataItem.index == 0) {
        return am4core.color("#5abccc");
      } else if (target.dataItem.index == 1) {
        return am4core.color("#3d4ecc");
      } else if (target.dataItem.index == 2) {
        return am4core.color("#c13aca");
      } else if (target.dataItem.index == 3) {
        return am4core.color("#6a905e");
      }

    });
    columnTemplate.adapter.add("stroke", function (stroke, target) {
      if (target.dataItem.index == 0) {
        return am4core.color("#5abccc");
      } else if (target.dataItem.index == 1) {
        return am4core.color("#3d4ecc");
      } else if (target.dataItem.index == 2) {
        return am4core.color("#c13aca");
      } else if (target.dataItem.index == 3) {
        return am4core.color("#6a905e");
      }
    })


  }


  AlertsChart(data) {
    am4core.useTheme(am4themes_animated);

    am4core.addLicense("ch-custom-attribute")

    // Themes end

    // Create chart instance
    let chart = am4core.create("etpchart", am4charts.XYChart);


    chart.data = data;


    // Create axes
    let yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    yAxis.dataFields.category = "alert";
    yAxis.renderer.grid.template.location = 0;
    yAxis.renderer.labels.template.fontSize = 10;
    yAxis.renderer.minGridDistance = 10;

    let xAxis = chart.xAxes.push(new am4charts.ValueAxis());
    xAxis.renderer.minGridDistance = 40;
    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueX = "count";
    series.dataFields.categoryY = "alert";
    series.columns.template.tooltipText = "{categoryY}: [bold]{valueX}[/]";
    series.columns.template.strokeWidth = 0;
    series.columns.template.height = 10;

    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(0);

      // if (target.dataItem.categories.categoryY == "Emergency") {
      //   let alertchartcolor: any = "#ff4141"//[0]
      //   return alertchartcolor;

      // } else if (target.dataItem.categories.categoryY == "Overspeed") {

      //   let alertchartcolor: any = "#ffb457"//[0]
      //   return alertchartcolor;

      // } else if (target.dataItem.categories.categoryY == "Harsh Break") {
      //   let alertchartcolor: any = "#11c8c8"//[0]
      //   return alertchartcolor;


      // } else if (target.dataItem.categories.categoryY == "Harsh Acceleration") {

      //   let alertchartcolor: any = "#e9ff72"//[0]
      //   return alertchartcolor;

      // } else if (target.dataItem.categories.categoryY == "Geofence In") {




      //   let alertchartcolor: any = "#6166ff"//[0]
      //   return alertchartcolor;


      // } else if (target.dataItem.categories.categoryY == "Geofence Out") {

      //   let alertchartcolor: any = "#dd23bd"//[0]
      //   return alertchartcolor;

      // } else if (target.dataItem.categories.categoryY == "Route Deviation") {

      //   let alertchartcolor: any = "#91fffa"//[0]
      //   return alertchartcolor;
      // } else if (target.dataItem.categories.categoryY == "On Route") {

      //   let alertchartcolor: any = "#be7e6f"//[0]
      //   return alertchartcolor;

      // } else {

      //   return chart.colors.getIndex(0);

      // }


      return fill;
    });

    let axisBreaks = {};
    let legendData = [];

    // Add ranges
    let legend = new am4charts.Legend();
    legend.position = "bottom";
    legend.scrollable = true;
    legend.valign = "top";
    legend.reverseOrder = true;

    chart.legend = legend;
    legend.data = legendData;

    legend.itemContainers.template.events.on("toggled", function (event: any) {
      let name = event.target.dataItem.dataContext.name;

    })



    // addRange("Central", "Texas", "North Dakota", chart.colors.getIndex(0));


    chart.cursor = new am4charts.XYCursor();



  }



  /**
  * 
  * Developer : Tafseer Khan
  * Date : 13-08-2021
  * Functionality : Function for all alerts chart 
  * 
  * mainpowerchart
  */


  Headercharts(data) {


    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart: any = am4core.create("bettarystatuschart", am4charts.XYChart);
    chart.paddingBottom = 0;
    // Title


    // Add data
    chart.data = data;


    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;


    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.axisFills.template.disabled = false;
    categoryAxis.renderer.axisFills.template.fillOpacity = 0.05;


    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = -100;
    valueAxis.max = 100;
    valueAxis.renderer.minGridDistance = 50;
    valueAxis.renderer.ticks.template.length = 5;
    valueAxis.renderer.ticks.template.disabled = false;
    valueAxis.renderer.ticks.template.strokeOpacity = 0.4;
    valueAxis.renderer.labels.template.adapter.add("text", function (text) {
      return text + "%";
    })

    // Legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";
    chart.legend.fontSize = 10;

    chart.legend.textAlign = "start";
    // chart.legend.labels.template.text = "[{color}]{text}[/]";





    // Use only absolute numbers
    chart.numberFormatter.numberFormat = "#.#s";

    // Create series
    function createSeries(field, name, color) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = field;
      series.dataFields.categoryY = "category";
      series.stacked = true;
      series.name = name;

      series.stroke = color;
      series.fill = color;
      series.columns.template.height = 10;
      series.columns.template.tooltipText = "{categoryY}: [bold]{valueX}[/]";



      let label = series.bullets.push(new am4charts.LabelBullet);
      label.label.text = "{valueX}%";
      label.label.fill = am4core.color("#fff");
      label.label.strokeWidth = 0;
      label.label.truncate = false;
      label.label.hideOversized = true;
      label.locationX = 0.5;
      return series;
    }

    let interfaceColors = new am4core.InterfaceColorSet();
    let positiveColor = interfaceColors.getFor("positive");
    let negativeColor = interfaceColors.getFor("negative");

    createSeries("negative2", "Non Polling", negativeColor.lighten(0.5));
    createSeries("positive1", "Polling", positiveColor.lighten(0.5));

    chart.legend.events.on("layoutvalidated", function (event) {
      chart.legend.itemContainers.each((container: any) => {
        if (container.dataItem.dataContext.name == "Never") {
          container.toBack();
        }
      })
    })

  }




  EncryptPageName() {
    this.cryptService.encrypt("customerdashboard")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput
  }

  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl);
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  }


  Geoserverfilter(id) {

    if ($('#' + id).is(':checked')) {
      GeoserverFilter(true, id);
    } else {
      GeoserverFilter(false, id);
    }
  }


  SliderFunction() {
    if ($("#slidearrow").hasClass("fa-arrow-circle-left")) {
      document.getElementById("leftmenus").style.left = "-285px";


      $("#slidearrow").removeClass("fa-arrow-circle-left")
      $("#slidearrow").addClass("fa-arrow-circle-right")

    } else {


      document.getElementById("leftmenus").style.left = "0px";

      $("#slidearrow").removeClass("fa-arrow-circle-right")
      $("#slidearrow").addClass("fa-arrow-circle-left")
    }
  }




  GetRoutedetails() {




    let requestData = {


      "param1": "",
      "param2": "",
      "param3": "",
      "itemsPerPage": "NA",
      "searchBy": "",
      "searchType": "",
      "totalRecords": "sNA",
      "pageID": "1",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue



    }

    try {
      try { AddLoader() } catch (e) { }

      this.postService.GetRoutesDetails(requestData).subscribe((data) => {
        try { RemoveLoader() } catch (e) { }


      })

    } catch (e) { }

  }


 



  /**
   *History Functionality
   * 
   * 
   */

  /**
   * Function for histrory tracking 
   * @param vehicledetails  vehicle all details
   */
  Historymodal(vehicledetails) {
    this.HistoryFunction(vehicledetails)
  }


  /**
   * Calling History Api
   * @param data 
   * 
   * 
   */

  HistoryFunction(data) {

    this.ClearAllData()

    let requestData = {

      "param1": data.vehicleid,
      "param2": data.fromdate,
      "param3": data.todate,
      "param4": data.fromtime,
      "param5": data.totime,
      "param6": "",
      "pageNo": "",
      "itemsPerPage": "",
      "searchBy": "",
      "searchType": "",
      "totalRecords": "NA",
      "pageID": "1",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue

    }

    try {
      this.ClearAllData()
      try { AddLoader() } catch (e) { }

      this.postService.GetHistoryLogs(requestData).subscribe((data) => {
        try { RemoveLoader() } catch (e) { }

        if (data.entity == "NO RECORD FOUND") {
          alert(data.entity);
          this.ClearAllData()

        } else if (data.entity.list.length > 0) {
          this.ClearAllData()
          let historyData = data.entity.list;
          try {
            $("#playbutton").css('display', 'block');
            $("#pausebutton").css('display', 'block');

            document.getElementById("historytrackoption").style.display = "block";
          } catch (e) { }
          try { this.HistoryPlot(historyData) } catch (e) { };

          for (var i = 0; i < historyData.length; i++) {
            let temparray = [];
            temparray.push(Number(historyData[i].param4))
            temparray.push(Number(historyData[i].param3))
            this.exportroutedata.push(temparray)
          }



          // try { this.PlotHistoryAlerts(historyData) } catch (e) { };
        }
        // this.locationData=data.display_name;
        // try{
        //   document.getElementById('getlocationLink').style.display='none';
        //   document.getElementById('locationDiv').style.display='block';
        // }catch(e){}


      })

    } catch (e) { }

    // GetHistoryLogs
  }


  /**
   * History plot functionality
   * 
   * @param data 
   * 
   */

  HistoryPlot(data) {

    //   $("#speedometer").hide();
    //  $("#alertDiv").show();

    //======= History track

    // ======== End Point
    var index = data.length - 1;
    var details = {
      data: {
        "type": "historyend",
        //   "title": this.singleVehicleDetails.param12,
        "Ignition": data[index].param14,
        "Gps Status": data[index].param15,
        "Date/Time": data[index].param2
      }
    }
    var latlon = [];
    latlon.push(Number(data[index].param4));
    latlon.push(Number(data[index].param3));
    var icon = "assets/mapimages/markers/endpoint2.png"
    try { StartEndPoint(details, icon, latlon) } catch (e) { }


    //=========== Start Point

    details = {
      data: {
        "type": "historystart",
        //  "title": this.singleVehicleDetails.param12,
        "Ignition": data[0].param14,
        "Gps Status": data[0].param15,
        "Date/Time": data[0].param2
      }
    }
    latlon = [];
    latlon.push(Number(data[0].param4));
    latlon.push(Number(data[0].param3));
    icon = "assets/mapimages/markers/startpoint2.png"
    try { StartEndPoint(details, icon, latlon) } catch (e) { }

    CustomFlyTo(latlon);


    try { AnimationLine(data, this.historytrackspeed); } catch (e) { }

    //======================= 


  }



  PauseHistory() {
    try { ClearHistoryInterval() } catch (e) { }


  }

  ResumeAnimation() {
    try { ResumeAnimation(this.historytrackspeed) } catch (e) { }
  }

  RestartAnimation() {
    try { ClearHistoryInterval() } catch (e) { }
    try { ClearHistoryAnimation1() } catch (e) { }
    $("#playbutton").css('display', 'block');
    $("#pausebutton").css('display', 'block');




    RestartAnimation(this.historytrackspeed)


  }


  StopHistory() {
    try { ClearHistoryAnimation1() } catch (e) { }
    //document.g

    $("#playbutton").css('display', 'none');
    $("#pausebutton").css('display', 'none');

    try { PlotCompleteHistory() } catch (e) { }


  }


  ChangeHistoryspeed() {

    try { ClearHistoryInterval() } catch (e) { }
    try { ResumeAnimation(this.historytrackspeed) } catch (e) { }


  }

  exportroutename: any;

  Savehistoryroute() {



    var routedata: any = {
      "type": "LineString",
      "coordinates": this.exportroutedata

    }


    routedata = JSON.stringify(routedata)
    let requestData = {
      "param1": "",
      "param2": this.exportroutename,
      "param3": "route",
      "param4": routedata,
      "param5": "true",
      "param6": "2E8B57",
      "param7": "",
      "param8": "",
      "pageID": "1",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue

    }

    try {
      try { AddLoader() } catch (e) { }

      this.postService.InsertRoute(requestData).subscribe((data) => {
        try { RemoveLoader() } catch (e) { }


      })

    } catch (e) { }
  }




}
