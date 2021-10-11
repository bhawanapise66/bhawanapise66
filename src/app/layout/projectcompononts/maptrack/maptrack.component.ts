import { Component, OnInit, NgZone } from '@angular/core';
import { PostService } from './../../../../post.service';

import '../../../../assets/timepicker/wickedpicker.js';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Router } from '@angular/router';
import { CryptService } from './../services/crypt.service';
declare var PopupInitialize: any;
declare var mapBuild: any;
declare var CreateGeofence: any;
declare var map: any;
declare var view: any;
declare var $: any;
declare var Gauge: any;
declare var PlotCompleteHistory: any;
declare var AddLoader: any;
declare var RemoveLoader: any;
import * as moment from 'moment';
import { VariableAst } from '@angular/compiler';
import { createOptional } from '@angular/compiler/src/core';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
declare var $: any;
declare var Highcharts: any;
declare var Livetrail;
declare var StartEndPoint: any;
declare var MakeClusters: any;
declare var SingleMarker: any;
declare var ClearSingleMarkers: any;
declare var PoiplotFunction: any;
declare var PoiCreate: any;
declare var DirectionIcon: any;
declare var ClearHistory: any;
declare var ClearLiveTrail: any;
declare var ClearCluster: any;
declare var ClearAlert: any;
declare var ClearPoi: any;
declare var SwitchMap: any;
declare var AddPolygons: any;
declare var AddRoutes: any;
declare var AddGeoserverPoi: any;
declare var SwitchGeoPoi: any;

declare var ClearDirection: any;
//import * as $ from 'jquery';
declare var jQuery: any;
declare var AnimationLine: any;
declare var CustomFlyTo: any;

declare var PoiSwitcher: any;
declare var Removeinsertpopup: any;

declare var PolygonSwitcher: any;
declare var RouteSwitcher: any;

declare var popup: any;
declare var container: any;
declare var content: any;
declare var closer: any;

declare var apiurl: any;
declare var pageurl: any;
declare var pageId: any;
declare var headerkey: any;
declare var pagename: any;
declare var GetPolygonDetails: any;
declare var poiFlag: any;
declare var routeFlag: any;
declare var polygonFlag: any;

declare var ClearPolygonDraw: any;
declare var ClearAnimation: any;

declare var ClearHistoryInterval: any;

declare var ResumeAnimation: any;

declare var ClearHistoryInterval: any;
declare var ClearHistoryAnimation1: any;
declare var RestartAnimation: any;
declare var GetIcon: any;

declare var GetDirectionIcon:any




@Component({
  selector: 'app-maptrack',
  templateUrl: './maptrack.component.html',
  styleUrls: ['./maptrack.component.css']
})

export class MaptrackComponent implements OnInit {
  pageUrl = this.router.url;
  encryptedpageNameValue: string; encryptedpageUrlValue: string;

  constructor(private postService: PostService, private ngZone: NgZone, private cryptService: CryptService, private router: Router) { }

  vehicleFiltertype: any;

  selectedVehicledata: any;
  totalVehicles: any;
  idleVehiciles: any;
  stopVehicles: any
  runningVehicles: any;
  emergencyVehicles: any;
  nonpollingVehicles: any;
  vehicleDetails: any;
  singleVehicleDetails: any = {};
  searchedKeyword: string;
  locationData: any;
  poiDetails: any;
  preupdateName: any;
  liveInterval: any;


  config = {
    displayKey: "param12",
    // if objects array passed which key to be displayed defaults to description
    search: true,
    limitTo: 5000,
    height: '200px',
  };
  emergencyCount = 0;
  harshbreakCount = 0;
  harshAccCount = 0;
  overspeedCount = 0;
  geofenceinCount = 0;
  geofenceoutCount = 0;
  stopageCount = 0;
  ignitiononCount = 0;
  ignitionoffCount = 0;
  routeDeviationstartCount = 0;
  routeDeviationendCount = 0;
  bettaryLowCount = 0;
  tamperCount = 0;
  tripstartCount = 0;
  tripendCount = 0;


  allvehicleData: any = [];

  historyvehicleno: any;

  historytrackspeed: any = 5;


  ngOnInit() {


    (function ($) {
      $(document).ready(function () {

        /* calander picker */
        var start = moment().subtract(29, 'days');
        var end = moment();

        this.initialDate = start;
        this.endDate = end;
        function cb(start, end) {
          // $('#daterangeadminux2 span').html(start.format('MMM D, YY') + ' - ' + end.format('MMM D, YY'));
          $('#daterangeadminux2 span').html(start.format('YYYY/MM/DD') + ' - ' + end.format('YYYY/MM/DD'));
        }

        $('#daterangeadminux2').daterangepicker({
          startDate: start, endDate: end,
          opens: 'left'
        }, cb);

        // this.initialDate =  $('#daterangeadminux2 span').html(start.format('MMM D, YY')).stringify() ;

        cb(start, end);
        $('#daterangeadminux2').on('show.daterangepicker', function (ev, picker) {
          var thisdp = $('.daterangepicker');
          setTimeout(function () {
            thisdp.addClass('active');
          }, 100);
        });
        var path = '../assets/images/background-part.png';
        $('.daterangepicker').append('<div class="background" style="background-image: url(' + path + '); z-index:-1; height:80px;"><img src="../assets/images/background-part.png" alt="" style="display:none"></div>')
      });

    })(jQuery);

    /* calander single  picker ends */
    $('.datepicker').daterangepicker({
      singleDatePicker: true,
      locale: {
        format: 'YYYY-MM-DD'
      },
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


    // try{this.Speedometer1();}catch(e){alert("exception Come"+e)}    //this.Speedometer2()


    window['angularComponentReferencelive'] = { component: this, zone: this.ngZone, loadAngularFunction: (inputdata) => this.SingleTrail(inputdata), };
    window['angularComponentReferencehistory'] = { component: this, zone: this.ngZone, loadAngularFunction: (inputdata) => this.Historymodal(inputdata), };

    // ====== Encryptions

    this.EncryptPageName();
    this.EncryptPageUrl();

    apiurl = "https://track.indtrack.com/vtsindtrackapiv1/";
    pageurl = this.encryptedpageUrlValue;
    pageId = "1";
    headerkey = sessionStorage.getItem("hk");
    pagename = this.encryptedpageNameValue;




    // map counts funciton call

    this.MapCounts();






    //=============== 


    /* calander single picker ends */



    //timepicker ====


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

    //====
    //  const dom: any = document.querySelector('body');
    //  dom.classList.remove('sidemenu-open');
    //  if (window.innerWidth <= 992) {
    //     dom.classList.remove('sidemenu-open');
    //  } else {  alert(window.innerWidth)
    //    dom.classList.add('sidemenu-open');
    //    dom.classList.remove('sidemenu-open');
    //  }

    //===== BuildMap







    setTimeout(() => {
      // this.GetPoidetails() 

      let center = [79.0882, 21.1458]
      new mapBuild('mainmap', center)
      // InitiateSlider();      


      container = document.getElementById("popup");
      content = document.getElementById("popup-content");
      closer = document.getElementById("popup-closer");
      PopupInitialize();

      SwitchMap("3");
      GetPolygonDetails();
      try { this.GetVehcileDetails(1, "All") } catch (e) { }

    }, 2000);

    var data = {
      "poiinserurl": "https://track.indtrack.com/vtsindtrackapiv1/insertpoi",
      "poidetailsurl": "https://track.indtrack.com/vtsindtrackapiv1/poidetails",
      "pageID": "1",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }

    // PoiCreate(container,content,closer,data)
    //  try { AddPolygons() } catch (e) { }
    //  try { AddRoutes() } catch (e) { }
    //  try { AddGeoserverPoi() } catch (e) { }





  }



  //======= History Vehicles   

  HistoryPlot(data) {

    $("#speedometer").hide();
    $("#alertDiv").show();

    //======= History track

    // ======== End Point
    var index = data.length - 1;
    var details = {
      data: {
        "type": "historyend",
        "title": this.singleVehicleDetails.param12,
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
        "title": this.singleVehicleDetails.param12,
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


    try { AnimationLine(data); } catch (e) { }

    //======================= 


  }




  //==============Map Counts

  MapCounts() {

    // ======== map Counts api
    let data = {
      "pageID": "1",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }

    try {
      this.postService.GetMapcounts(data).subscribe((data) => {
        console.log(data);
        this.totalVehicles = data.entity.list[0].param1;
        this.runningVehicles = data.entity.list[0].param2
        this.idleVehiciles = data.entity.list[0].param3
        this.stopVehicles = data.entity.list[0].param4
        this.nonpollingVehicles = data.entity.list[0].param5
        this.emergencyVehicles = data.entity.list[0].param6

        // console.log(data);
        // alert(JSON.stringify(data))
        // alert(JSON.stringify(data))
        // alert(JSON.stringify(data.statuscode));
      })

    } catch (e) { }


  }

  // Vehicle List Filter 
  GetVehcileDetails(pageno: any, type: any) {

    this.ClearAllmapdata();
    document.getElementById("historytrackoption").style.display = "none";



    // ======== map Counts api
    let data = {
      "pageNo": "",
      "itemsPerPage": "",
      "searchBy": "",
      "searchType": type,
      "totalRecords": "NA",

      "pageID": "1",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue
    }

    try {
      this.postService.GetVehicleDetailsformap(data).subscribe((data) => {
        console.log(data);
        this.vehicleDetails = data.entity.list;
        try { MakeClusters(this.vehicleDetails) } catch (e) { }
        $("#speedometer").hide();
        $("#harshaccDiv").hide();
        $("#harshbreakDiv").hide();
        $("#emergencyDiv").hide();
        $("#overspeedDiv").hide();

        // console.log(data);
        // alert(JSON.stringify(data))
        // alert(JSON.stringify(data))
        // alert(JSON.stringify(data.statuscode));
      })

    } catch (e) { }


  }



  //=====  Design Validations

  ShowSummary(data) {

    document.getElementById("showdiv").style.transform = "rotateY(180deg)"

    this.singleVehicleDetails = data;

  }

  ShowGrid() {

    document.getElementById("showdiv").style.transform = "rotateY(0deg)"
    try {
      document.getElementById('locationDiv').style.display = 'none';
      document.getElementById('getlocationLink').style.display = 'block';

    } catch (e) { }

  }


  Slider() {
    if ($("#sliderButton").hasClass("fa-angle-double-left")) {
      document.getElementById('mainDiv').style.marginLeft = "-535px";
      $("#sliderButton").removeClass("fa-angle-double-left")
      $("#sliderButton").addClass("fa-angle-double-right")
    } else {
      document.getElementById('mainDiv').style.marginLeft = "0px";
      $("#sliderButton").removeClass("fa-angle-double-right")
      $("#sliderButton").addClass("fa-angle-double-left")
    }

  }


  PoiSlider() {
    if (document.getElementById("poiContainerdiv").style.marginLeft == "0%") {
      document.getElementById("poiContainerdiv").style.marginLeft = "-31.5%"  //-31.5%
    } else {
      document.getElementById("poiContainerdiv").style.marginLeft = "0%"
    }

  }


  //=============== Encrypt Funcitons

  EncryptPageName() {
    this.cryptService.encrypt("Map Track")
    this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    console.log("encrypted PageName is" + this.encryptedpageNameValue)


  }
  EncryptPageUrl() {
    this.cryptService.encrypt(this.pageUrl)
    this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    console.log("encrypted psgeUrl is " + this.encryptedpageUrlValue)
  }


  Speedometer() {
    //======== high chart codes
    var gaugeOptions = {
      chart: {
        type: 'solidgauge',
        size: '80%',
        backgroundColor: 'transparent',
        height: 120,
        marginTop: -25
      },

      title: null,

      pane: {

        size: '80%',
        startAngle: -90,
        endAngle: 90,
        background: {
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc'

        }
      },

      exporting: {
        enabled: false
      },

      tooltip: {
        enabled: false
      },

      // the value axis
      yAxis: {
        stops: [
          [0.1, '#55BF3B'], // green
          [0.5, '#DDDF0D'], // yellow
          [0.9, '#DF5353'] // red
        ],
        lineWidth: 1,
        tickWidth: 1,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
          y: -70
        },
        labels: {
          y: 16
        }
      },

      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true
          }
        }
      }
    };

    // The speed gauge
    var chartSpeed = Highcharts.chart('container-speed', Highcharts.merge(gaugeOptions, {
      backgroundColor: '#FCFFC5',

      yAxis: {
        min: 0,
        max: 200,
        title: {
          text: 'Speed'
        }
      },

      credits: {
        enabled: false
      },

      series: [{
        name: 'Speed',
        data: [80],
        dataLabels: {
          format:
            '<div style="text-align:center">' +
            '<span style="font-size:25px">{y}</span><br/>' +
            '<span style="font-size:12px;opacity:0.4">km/h</span>' +
            '</div>'
        },
        tooltip: {
          valueSuffix: ' km/h'
        }
      }]

    })
    );



    // Bring life to the dials
    setInterval(function () {
      // Speed
      var point,
        newVal,
        inc;


      if (chartSpeed) {
        point = chartSpeed.series[0].points[0];
        inc = Math.round((Math.random() - 0.5) * 100);
        newVal = point.y + inc;

        if (newVal < 0 || newVal > 200) {
          newVal = point.y - inc;
        }

        point.update(newVal);
      }

    }, 2000);


  }


  //====================POI Functionality


  //========== POI Change Functionality


  ChangePoi(poidetails) {

    $("#updatePoilist").change(function () {
      if ($("#updatePoilist").val() != "") {
        var index = poidetails.findIndex(x => x.param1 === $("#updatePoilist").val());
        $("#updatepoiName").val(poidetails[index].param2);
        $("#updatepoiType").val(poidetails[index].param3);
        $("#updatepoiRange").val(poidetails[index].param8);
        $("#updatepoiLat").val(poidetails[index].param6);
        $("#updatepoiLon").val(poidetails[index].param7);
      }



      //deletepoiList

    });


    $("#deletepoiList").change(function () {
      if ($("#deletepoiList").val() != "") {
        var index = poidetails.findIndex(x => x.param1 === $("#deletepoiList").val());
        $("#deletepoiName").val(poidetails[index].param2);
        $("#deletepoiType").val(poidetails[index].param3);
        $("#deletepoiRange").val(poidetails[index].param8);
        $("#deletepoiLat").val(poidetails[index].param6);
        $("#deletepoiLon").val(poidetails[index].param7);
      }



      //deletepoiList

    });

  }

  oldoptiondetails: any = "createPoidiv";
  PoiOptions(id, tableid) {

    if ($("#" + id).prop("checked")) {

      try {
        document.getElementById(this.oldoptiondetails).style.display = "none";
        //  $("#"+this.oldoptiondetails).hide()
      } catch (e) { }
      try {
        document.getElementById(tableid).style.display = "block";
        ///  $("#"+tableid).show()
      } catch (e) { }

    }
    this.oldoptiondetails = tableid



  }


  //=========getpoidetails
  GetPoidetails() {
    let data = {
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
      this.postService.GetPoiDetails(data).subscribe((data) => {
        if (data.entity != "NO RECORD FOUND") {

          this.poiDetails = data.entity.list;
          try { this.PlotPoi(this.poiDetails) } catch (e) { }
        } else if (data.entity == "NO RECORD FOUND") {
          try { ClearPoi(); } catch (e) { }
          this.poiDetails = "";
        }



      })

    } catch (e) { }
  }

  PlotPoi(data) {
    try { ClearPoi(); } catch (e) { }
    for (let i = 0; i < data.length; i++) {
      var latlong = [];
      latlong.push(Number(data[i].param7));
      latlong.push(Number(data[i].param6));
      var details = {
        data: {
          "type": "poi",
          "title": "POI Details",
          "Name": data[i].param2,
          "Range": data[i].param8,
          "Type": data[i].param3,
          "Location": data[i].param5
        }
      }
      var icon = "assets/mapimages/markers/poinewmarker.png";
      try {
        PoiplotFunction(latlong, details, icon)
      } catch (e) { }
    }


  }


  //=== insertpoi


  InsertPoi() {
    var lat = $("#insertPoilat").val();
    var lon = $("#insertPoilon").val();
    var location = "";
    try {
      this.postService.GetLocationService(lat, lon).subscribe((data) => {

        try { location = data.display_name; } catch (e) {
          location = $("#insertPoiname").val()
        }


        let requestData = {
          "param1": "",
          "param2": $("#insertPoiname").val(),
          "param3": $("#insertPoitype").val(),
          "param4": "",
          "param5": location,
          "param6": $("#insertPoirange").val(),
          "param7": $("#insertPoilat").val(),
          "param8": $("#insertPoilon").val(),
          "pageID": "1",
          "pageName": this.encryptedpageNameValue,
          "pageURL": this.encryptedpageUrlValue

        }

        try {
          this.postService.InsertPoi(requestData).subscribe((data) => {
            if (data.entity == "Successfully saved.") {
              alert(data.entity);
              this.GetPoidetails()
            } else {
              alert(data.entity);
            }


          })
        } catch (e) { }

      })

    } catch (e) { }



  }

  //======updatepoi
  Updatepoi() {

    var lat = $("#updatepoiLat").val();
    var lon = $("#updatepoiLon").val();
    var location = "";
    try {
      this.postService.GetLocationService(lat, lon).subscribe((data) => {

        try { location = data.display_name; } catch (e) {
          location = $("#updatepoiName").val()
        }


        var requestData = {
          "param1": $("#updatePoilist").val(),
          "param2": $("#updatepoiName").val(),
          "param3": $("#updatepoiType").val(),
          "param4": "",
          "param5": location,
          "param6": $("#updatepoiRange").val(),
          "param7": $("#updatepoiLat").val(),
          "param8": $("#updatepoiLon").val(),
          "pageID": "1",
          "pageName": this.encryptedpageNameValue,
          "pageURL": this.encryptedpageUrlValue

        }

        try {
          this.postService.UpdatePoi(requestData).subscribe((data) => {
            if (data.entity == "Successfully updated.") {
              alert(data.entity);
              this.GetPoidetails()

            } else {
              alert(data.entity);
            }

          })
        } catch (e) { }

      })

    } catch (e) { }


  }


  //==================================== Delete POI

  DeletePoi() {

    let data = {
      "param1": $("#deletepoiList").val(),

      "pageID": "1",
      "pageName": this.encryptedpageNameValue,
      "pageURL": this.encryptedpageUrlValue

    }


    try {
      this.postService.DeletePoi(data).subscribe((data) => {
        if (data.entity == "Successfully deleted.") {
          alert(data.entity);
          this.GetPoidetails()

        } else {
          alert(data.entity);
        }

      })
    } catch (e) { }

  }


  //==================================


  SingleTrail(vehicleno) {
    document.getElementById("historytrackoption").style.display = "none";

    this.ClearAllmapdata();
    ClearSingleMarkers();
    let service = this.postService
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
      this.postService.GetSingleLiveVehicle(data).subscribe((data) => {
        if (data.entity.list.length > 0) {
          this.ClearAllmapdata();
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



              }
            }
            var latlong = [];
            latlong.push(Number(liveData.param36));
            latlong.push(Number(liveData.param35));

            var icon = this.GetIcon(liveData);
            var type = 0
            Livetrail(latlong, details, icon, type);

            try { this.PlotLiveAlerts(liveData) } catch (e) { }
            this.liveInterval = setInterval(function () {

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
                          "title": liveData.param12,
                          "Updated At": liveData.param32,
                          "VehicleStatus": liveData.param47,
                          "Speed": liveData.param37 + " km/hr",
                          "Ignition": liveData.param42,
                          "GPS Status": liveData.param39,
                          "Direction": liveData.param46,
                          "direction": liveData.param40,
                          "Vehicle Type": liveData.param29,


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
                            "title": liveData.param12,
                            "Updated At": liveData.param32,
                            "VehicleStatus": liveData.param47,
                            "Speed": liveData.param37 + " km/hr",
                            "Ignition": liveData.param42,
                            "GPS Status": liveData.param39,
                            "Direction": liveData.param46,
                            "direction": liveData.param40,
                            "Vehicle Type": liveData.param29,



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
          alert("No Data Found")
        }








      })

    } catch (e) { }

  }



  HistoryFunction(data) {

    this.ClearAllmapdata()

    let requestData = {

      "param1": data,
      "param2": $("#fromDate").val(),
      "param3": $("#toDate").val(),
      "param4": $("#fromTime").val(),
      "param5": $("#toTime").val(),
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

   try{ AddLoader()}catch(e){}

    try {
      this.postService.GetHistoryLogs(requestData).subscribe((data) => {
        $("#historymodal").modal("hide");
        try{ RemoveLoader()}catch(e){}


        if (data.entity == "NO RECORD FOUND") {
          alert(data.entity);
          this.ClearAllmapdata()

        } else if (data.entity.list.length > 0) {
          this.ClearAllmapdata()
          let historyData = data.entity.list;
          try {


            $("#playbutton").css('display', 'block');
            $("#pausebutton").css('display', 'block');
            document.getElementById("historytrackoption").style.display = "flex";

          } catch (e) { }
          try { this.HistoryPlot(historyData) } catch (e) { };

          try { this.PlotHistoryAlerts(historyData) } catch (e) { };
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



  GetLocation(data) {
    var lat = data.param35;
    var lon = data.param36;
    try {
      this.postService.GetLocationService(lat, lon).subscribe((data) => {
        console.log(data.display_name);
        this.locationData = data.display_name;
        try {
          document.getElementById('getlocationLink').style.display = 'none';
          document.getElementById('locationDiv').style.display = 'block';
        } catch (e) { }
      })

    } catch (e) { }


  }



  Speedometer2() {

    let chartMin = 0;
    let chartMax = 100;



    let data = {
      score: 52.7,
      gradingData: [


        {
          title: "Developing",
          color: "#52b362",
          lowScore: 0,
          highScore: 20
        },
        {
          title: "Developing",
          color: "#b2c564",
          lowScore: 20,
          highScore: 40
        },
        {
          title: "Maturing",
          color: "#b2c564",
          lowScore: 40,
          highScore: 60
        },
        {
          title: "Sustainable",
          color: "#e8d057",
          lowScore: 60,
          highScore: 80
        },
        {
          title: "High Performing",
          color: "#f70000",
          lowScore: 80,
          highScore: 100
        }
      ]
    };

    /**
    Grading Lookup
     */
    function lookUpGrade(lookupScore, grades) {
      // Only change code below this line
      for (var i = 0; i < grades.length; i++) {
        if (
          grades[i].lowScore < lookupScore &&
          grades[i].highScore >= lookupScore
        ) {
          return grades[i];
        }
      }
      return null;
    }

    // create chart
    let chart = am4core.create("chartdiv", am4charts.GaugeChart);
    chart.hiddenState.properties.opacity = 0;
    chart.fontSize = 11;
    chart.innerRadius = am4core.percent(80);
    chart.resizable = true;

    /**
     * Normal axis
     */

    let axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    axis.min = chartMin;
    axis.max = chartMax;
    axis.strictMinMax = true;
    axis.renderer.radius = am4core.percent(80);
    axis.renderer.inside = false;
    axis.renderer.line.strokeOpacity = 0.1;
    axis.renderer.ticks.template.disabled = false;
    axis.renderer.ticks.template.strokeOpacity = 1;
    axis.renderer.ticks.template.strokeWidth = 0.5;
    axis.renderer.ticks.template.length = 5;
    axis.renderer.grid.template.disabled = true;
    axis.renderer.labels.template.radius = am4core.percent(15);
    axis.renderer.labels.template.fontSize = "0.9em";

    /**
     * Axis for ranges
     */

    let axis2 = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    axis2.min = chartMin;
    axis2.max = chartMax;
    axis2.strictMinMax = true;
    axis2.renderer.labels.template.disabled = true;
    axis2.renderer.ticks.template.disabled = true;
    axis2.renderer.grid.template.disabled = false;
    axis2.renderer.grid.template.opacity = 0.5;
    axis2.renderer.labels.template.bent = true;
    axis2.renderer.labels.template.fill = am4core.color("#000");
    axis2.renderer.labels.template.fontWeight = "bold";
    axis2.renderer.labels.template.fillOpacity = 0.3;



    /**
    Ranges
    */

    for (let grading of data.gradingData) {
      let range = axis2.axisRanges.create();
      range.axisFill.fill = am4core.color(grading.color);
      range.axisFill.fillOpacity = 0.8;
      range.axisFill.zIndex = -1;
      range.value = grading.lowScore > chartMin ? grading.lowScore : chartMin;
      range.endValue = grading.highScore < chartMax ? grading.highScore : chartMax;
      range.grid.strokeOpacity = 0;
      // range.stroke = am4core.color(grading.color).lighten(-0.1);
      range.label.inside = false;
      // range.label.text = grading.title.toUpperCase();
      range.label.inside = false;
      range.label.location = 0.5;
      range.label.inside = true;
      // range.label.radius = am4core.percent(10);
      range.label.paddingBottom = -5; // ~half font size
      range.label.fontSize = "12px";
    }

    let matchingGrade = lookUpGrade(data.score, data.gradingData);

    /**
     * Label 1
     */

    let label = chart.radarContainer.createChild(am4core.Label);
    label.isMeasured = false;
    label.fontSize = "12px";
    label.x = am4core.percent(50);
    label.paddingBottom = 0;
    label.horizontalCenter = "middle";
    label.verticalCenter = "bottom";
    //label.dataItem = data;
    label.text = data.score.toFixed(1);
    //label.text = "{score}";
    //label.fill = am4core.color("#0000");

    /**
     * Label 2
     */


    /**
     * Hand
     */

    let hand = chart.hands.push(new am4charts.ClockHand());
    hand.axis = axis2;
    hand.innerRadius = am4core.percent(30);
    hand.startWidth = 8;
    hand.pin.disabled = true;
    hand.value = data.score;
    hand.fill = am4core.color("#444");
    hand.stroke = am4core.color("#000");

    hand.events.on("positionchanged", function () {
      label.text = axis2.positionToValue(hand.currentPosition).toFixed(0);
      let value2 = axis.positionToValue(hand.currentPosition);
      let matchingGrade = lookUpGrade(axis.positionToValue(hand.currentPosition), data.gradingData);

      // label.fill = am4core.color(matchingGrade.color);
    })


  }



  ClearAllmapdata() {

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




    this.emergencyCount = 0;
    this.harshbreakCount = 0;
    this.harshAccCount = 0;
    this.overspeedCount = 0;

    this.stopageCount = 0;
    this.ignitiononCount = 0;
    this.ignitionoffCount = 0;
    this.routeDeviationstartCount = 0;
    this.routeDeviationendCount = 0;
    this.bettaryLowCount = 0;
    this.tamperCount = 0;
    this.tripstartCount = 0;
    this.tripendCount = 0;


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



  CloseCollapse() {

    $("#mapswitcher").collapse('hide');
    $("#collapseButton").show();
  }

  OpenCollapse() {
    $("#collapseButton").hide();
    $("#mapswitcher").collapse('show');

  }

  PlotLiveAlerts(data) {
    for (var i = 0; i < data.length; i++) {
      var latlon = [];
      latlon.push(Number(data[i].param36))
      latlon.push(Number(data[i].param35))


      // "type":"live",
      // "title":vehicleno,
      // "Ignition":liveData.param42,
      // "GPS Status":liveData.param39,
      // "Speed":liveData.param37,
      // "alertname":liveData.param32,


    }

  }


  PlotHistoryAlerts(data) {
    this.emergencyCount = 0;
    this.harshbreakCount = 0;
    this.harshAccCount = 0;
    this.overspeedCount = 0;

    this.stopageCount = 0;
    this.ignitiononCount = 0;
    this.ignitionoffCount = 0;
    this.routeDeviationstartCount = 0;
    this.routeDeviationendCount = 0;
    this.bettaryLowCount = 0;
    this.tamperCount = 0;
    this.tripstartCount = 0;
    this.tripendCount = 0;

    for (var i = 0; i < data.length; i++) {
      var latlon = [];
      latlon.push(Number(data[i].param4))
      latlon.push(Number(data[i].param3))

      if (data[i].param11 == '1') {
        this.emergencyCount++;
        var icon = "assets/mapimages/alertsicon/emergency.png";
        var detailsData = {
          data: {
            "type": "alert",
            "title": this.singleVehicleDetails.param12,
            "Alert ": "Emergency Alert",
            "Date/Time ": data[i].param2,
          }
        }
      } else if (data[i].param11 == '2') {
        this.overspeedCount++
        var icon = "assets/mapimages/alertsicon/overspeed.png";
        var detailsData = {
          data: {
            "type": "alert",
            "title": this.singleVehicleDetails.param12,
            "Alert ": "Overspeed Alert",
            "Date/Time ": data[i].param2,
          }
        }

      } else if (data[i].param11 == '3') {
        this.harshbreakCount++

        var icon = "assets/mapimages/alertsicon/overspeed.png";
        var detailsData = {
          data: {
            "type": "alert",
            "title": this.singleVehicleDetails.param12,
            "Alert ": "HarshBreak Alert",
            "Date/Time ": data[i].param2,
          }
        }
      } else if (data[i].param11 == '4') {

        this.harshAccCount++;
        var icon = "assets/mapimages/alertsicon/overspeed.png";
        var detailsData = {
          data: {
            "type": "alert",
            "title": this.singleVehicleDetails.param12,
            "Alert ": "HarshAcceleration Alert",
            "Date/Time ": data[i].param2,
          }
        }
      } else if (data[i].param11 == '5') {

        this.geofenceinCount++
        var icon = "assets/mapimages/alertsicon/overspeed.png";
        var detailsData = {
          data: {
            "type": "alert",
            "title": this.singleVehicleDetails.param12,
            "Alert ": "GeofenceIn Alert",
            "Date/Time ": data[i].param2,
          }
        }
      } else if (data[i].param11 == '6') {
        this.geofenceoutCount++

        var icon = "assets/mapimages/alertsicon/overspeed.png";
        var detailsData = {
          data: {
            "type": "alert",
            "title": this.singleVehicleDetails.param12,
            "Alert ": "GeofenceOut Alert",
            "Date/Time ": data[i].param2,
          }
        }
      } else if (data[i].param11 == '7') {

        this.stopageCount++;

        var icon = "assets/mapimages/alertsicon/overspeed.png";
        var detailsData = {
          data: {
            "type": "alert",
            "title": this.singleVehicleDetails.param12,
            "Alert ": "Stopage Alert",
            "Date/Time ": data[i].param2,
          }
        }
      } else if (data[i].param11 == '8') {
        this.ignitiononCount++;

        var icon = "assets/mapimages/alertsicon/overspeed.png";
        var detailsData = {
          data: {
            "type": "alert",
            "title": this.singleVehicleDetails.param12,
            "Alert ": "IgnitionON Alert",
            "Date/Time ": data[i].param2,
          }
        }
      } else if (data[i].param11 == '9') {
        this.ignitionoffCount++
        var icon = "assets/mapimages/alertsicon/overspeed.png";
        var detailsData = {
          data: {
            "type": "alert",
            "title": this.singleVehicleDetails.param12,
            "Alert ": "IgnitionOFF Alert",
            "Date/Time ": data[i].param2,
          }
        }
      } else if (data[i].param11 == '10') {
        this.routeDeviationstartCount++
        var icon = "assets/mapimages/alertsicon/overspeed.png";
        var detailsData = {
          data: {
            "type": "alert",
            "title": this.singleVehicleDetails.param12,
            "Alert ": "RouteDevitionStart Alert",
            "Date/Time ": data[i].param2,
          }
        }
      } else if (data[i].param11 == '11') {
        this.routeDeviationendCount++

        var icon = "assets/mapimages/alertsicon/overspeed.png";
        var detailsData = {
          data: {
            "type": "alert",
            "title": this.singleVehicleDetails.param12,
            "Alert ": "RouteDevitionEnd Alert",
            "Date/Time ": data[i].param2,
          }
        }
      } else if (data[i].param11 == '12') {
        this.bettaryLowCount++

        var icon = "assets/mapimages/alertsicon/overspeed.png";
        var detailsData = {
          data: {
            "type": "alert",
            "title": this.singleVehicleDetails.param12,
            "Alert ": "BettaryLow Alert",
            "Date/Time ": data[i].param2,
          }
        }
      } else if (data[i].param11 == '13') {
        this.tamperCount++

        var icon = "assets/mapimages/alertsicon/overspeed.png";
        var detailsData = {
          data: {
            "type": "alert",
            "title": this.singleVehicleDetails.param12,
            "Alert ": "Tamper Alert",
            "Date/Time ": data[i].param2,
          }
        }
      } else if (data[i].param11 == '14') {
        this.tripstartCount++

        var icon = "assets/mapimages/alertsicon/overspeed.png";
        var detailsData = {
          data: {
            "type": "alert",
            "title": this.singleVehicleDetails.param12,
            "Alert ": "TripStart Alert",
            "Date/Time ": data[i].param2,
          }
        }
      } else if (data[i].param11 == '15') {
        this.tripendCount++
        var icon = "assets/mapimages/alertsicon/overspeed.png";
        var detailsData = {
          data: {
            "type": "alert",
            "title": this.singleVehicleDetails.param12,
            "Alert ": "TripEnd Alert",
            "Date/Time ": data[i].param2,
          }
        }
      }

    }

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


  SwitchPoi() {

    if ($("#poiSwitch").hasClass("iconDiv activeSwitchOption effect8")) {

      $("#poiSwitch").removeClass(" activeSwitchOption effect8");
      try { PoiSwitcher(false); } catch (e) { }
      SwitchGeoPoi(false);
    } else {
      $("#poiSwitch").addClass("activeSwitchOption effect8")
      try { PoiSwitcher(true); } catch (e) { }
      SwitchGeoPoi(true);
    }


  }


  SwitchPolygon() {
    if ($("#polygonSwitch").hasClass("iconDiv activeSwitchOption effect8")) {

      $("#polygonSwitch").removeClass("activeSwitchOption effect8");
      PolygonSwitcher(false);
    } else {
      $("#polygonSwitch").addClass("activeSwitchOption effect8")
      PolygonSwitcher(true);
    }

  }

  SwitcherRoute() {
    if ($("#routeSwitch").hasClass("iconDiv activeSwitchOption effect8")) {

      $("#routeSwitch").removeClass("activeSwitchOption effect8");
      RouteSwitcher(false);
    } else {
      $("#routeSwitch").addClass("activeSwitchOption effect8")
      RouteSwitcher(true);
    }
  }



  creationstatus = "";
  CreatePolygon() {

    poiFlag = 0;
    routeFlag = 0;
    polygonFlag = 1;

    poiFlag = 1;
    routeFlag = 0;
    polygonFlag = 0;
    $("#routeCreate").removeClass("activeSwitchOption");
    $("#poiCreate").removeClass("activeSwitchOption");
    $("#polygonCreate").addClass("activeSwitchOption");
    Removeinsertpopup();
    try { CreateGeofence("Polygon") } catch (e) { }
    this.creationstatus = "Polygon Creation Enabled"
  }


  CreatePoi() {
    poiFlag = 1;
    routeFlag = 0;
    polygonFlag = 0;
    $("#polygonCreate").removeClass("activeSwitchOption");
    $("#routeCreate").removeClass("activeSwitchOption");
    $("#poiCreate").addClass("activeSwitchOption");
    Removeinsertpopup();
    ClearPolygonDraw()
    PoiCreate();
    this.creationstatus = "Poi Creation Enabled"

  }

  CreateRoute() {
    poiFlag = 0;
    routeFlag = 0;
    polygonFlag = 0;
    Removeinsertpopup();
    $("#polygonCreate").removeClass("activeSwitchOption");
    $("#poiCreate").removeClass("activeSwitchOption");
    $("#routeCreate").addClass("activeSwitchOption");
    ClearPolygonDraw()
    this.creationstatus = "Route Creation Enabled"

  }


  Speedometer1() {

    var opts = {
      angle: -0.2, // The span of the gauge arc
      lineWidth: 0.2, // The line thickness
      radiusScale: 1, // Relative radius
      pointer: {
        length: 0.6, // // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: '#000000' // Fill color
      },


      limitMax: false,     // If false, max value increases automatically if value > maxValue
      limitMin: false,     // If true, the min value of the gauge will be fixed
      percentColors: [[0.0, "#FF4B57"], [0.40, "#EBEB3A"], [0.48, "#5ACF40"], [0.481, '#FFF'], [0.52, "#EBEB3A"], [0.60, "#FF4B57"]],

      strokeColor: '#E0E0E0',  // to see which ones work best for you
      generateGradient: true,
      highDpiSupport: true,     // High resolution support


      renderTicks: {
        divisions: 2,
        divWidth: 0.1,
        divLength: 0.7,
        divColor: '#333333',
        subDivisions: 3,
        subLength: 0.5,
        subWidth: 0.6,
        subColor: '#666666'
      }
    };
    var target = document.getElementById('foo');
    var gauge = new Gauge(target).setOptions(opts);
    gauge.maxValue = 110;
    gauge.animationSpeed = 1;
    var s = 5;
    var v = 0;
    gauge.set(80);

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



  ViewVehicle() {


    try { this.ClearAllmapdata(); } catch (e) { }
    try {
      var latlong = [];
      latlong.push(Number(this.selectedVehicledata.param36))
      latlong.push(Number(this.selectedVehicledata.param35))
      CustomFlyTo(latlong);
      var details = {
        data: {


          "type": "live",
          "title": this.selectedVehicledata.param12,
          "Updated At": this.selectedVehicledata.param32,
          "VehicleStatus": this.selectedVehicledata.param47,
          "Speed": this.selectedVehicledata.param37 + " km/hr",
          "Ignition": this.selectedVehicledata.param42,
          "GPS Status": this.selectedVehicledata.param39,
          "Direction": this.selectedVehicledata.param46,
          "direction": this.selectedVehicledata.param40,
          "Vehicle Type": this.selectedVehicledata.param29,

          "maptrack": this.selectedVehicledata.param11


        }


      }

      var icon = "";
      var status = this.selectedVehicledata.param47;

      if (status == 'Non Polling') {
        icon = "assets/mapimages/personicons/personiconred.png"
      } else if (status == 'Idle') {

        icon = "assets/mapimages/personicons/personiconyellow.png"
      } else if (status == 'Working') {

        icon = "assets/mapimages/personicons/personicongreen.png"
      } else if (status == 'Stop') {
        icon = "assets/mapimages/personicons/personiconred.png"
      } else {
        icon = "assets/mapimages/personicons/personiconblack.png"
      }

      icon = this.GetIcon(details);
      SingleMarker(latlong, details, "", icon);
    } catch (e) { }
  }



  Historymodal(vehicleno) {

    this.historyvehicleno = vehicleno;

    $("#historymodal").modal("show")
  }



 
  StopHistory() {
    try { ClearHistoryAnimation1() } catch (e) { }
    //document.g

    $("#playbutton").css('pausebutton', 'none');
    $("#pausebutton").css('display', 'none');

    try { PlotCompleteHistory() } catch (e) { }


  }


  
  ChangeHistoryspeed() {

    try { ClearHistoryInterval() } catch (e) { }
    try { ResumeAnimation(this.historytrackspeed) } catch (e) { }


  }

}