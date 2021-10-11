import { Paramcls } from './../../../../paramcls';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { interval } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomerdashboardService } from '../services/customerdashboard.service';
import { PostService } from '../../../../post.service';
import { CryptService } from '../services/crypt.service';
import { Router } from '@angular/router';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_spiritedaway);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-last7daysdistance',
  templateUrl: './last7daysdistance.component.html',
  styleUrls: ['./last7daysdistance.component.css']
})
export class Last7daysdistanceComponent implements OnInit {

  chart: any; stringifiedData: any; parsedJson: any; stringifiedresponse: any; parsedJsonresponse: any;
  stringifiedDataList: any; parsedJsonList: any; encryptedpageNameValue: string; encryptedpageUrlValue: string; pageUrl = this.router.url;
  gpsdate:string; distance:number = 0; bullet:any;

  constructor(private http: HttpClient, private custService:CustomerdashboardService, private router: Router, private cryptService: CryptService) { }

  ngOnInit() {

      this.LineChart();
  }

  LineChart() {
    
    let chartDatastack = [];

       // Create chart instance
       this.chart = am4core.create("chartdiv", am4charts.XYChart);
      // Increase contrast by taking evey second color
      this.chart.colors.step = 2;
      let dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 50;
      
      let inputsdata;

       inputsdata={
        pageID:"1",
        pageName:this.encryptedpageNameValue,
        pageURL:this.encryptedpageUrlValue
      }
       // DashboardPIEChartAPI Detail Grid BIND LIST    
     this.custService.LastSevenDaysDistance(inputsdata).subscribe(
      (data)  => {
        
        let resdata = data;    
        let resdatadrp = resdata['entity'];   
        this.stringifiedData = JSON.stringify(resdatadrp); 
        // Parse from JSON  
        this.parsedJson = JSON.parse(this.stringifiedData);   
        let resdatadev = resdata['list'];  
  
          //alert(resdata['list'])
           // Convert to JSON  
           this.stringifiedDataList = JSON.stringify(this.parsedJson.list);           
           // Parse from JSON  
           this.parsedJsonList = JSON.parse(this.stringifiedDataList);
           
           for (let j = 0; j < this.parsedJsonList.length; j++ )
            { 
              chartDatastack.push({
                gpsdate:this.parsedJsonList[j]["param2"],
                distance:this.parsedJsonList[j]["param4"]
              }); 
            }
             
              // Add data
              this.chart.data = chartDatastack; 
              // Create axes
              let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
              categoryAxis.dataFields.category = "gpsdate";
              categoryAxis.renderer.grid.template.location = 0;


              let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
              valueAxis.renderer.inside = true;
              valueAxis.renderer.labels.template.disabled = true;
              valueAxis.min = 0;

              this.createAxisAndSeries("distance", "distance", true, "triangle");
             // Add legend
              this.chart.legend = new am4charts.Legend();

              // Add cursor
              this.chart.cursor = new am4charts.XYCursor();
          });
     
  }

  createAxisAndSeries(field, name, opposite, bullet) {
    let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    if(this.chart.yAxes.indexOf(valueAxis) != 0){
      valueAxis.syncWithAxis = this.chart.yAxes.getIndex(0);
    }
    
    let series = this.chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = field;
    series.dataFields.dateX = "gpsdate";
    series.strokeWidth = 2;
    series.yAxis = valueAxis;
    series.name = name;
    series.tooltipText = "{name}: [bold]{valueY}[/]";
    series.tensionX = 0.8;
    series.showOnInit = true;
    
    let interfaceColors = new am4core.InterfaceColorSet();
    
    switch(bullet) {
      case "triangle":
        this.bullet = series.bullets.push(new am4charts.Bullet());
        this.bullet.width = 12;
        this.bullet.height = 12;
        this.bullet.horizontalCenter = "middle";
        this.bullet.verticalCenter = "middle";
        
        let triangle = this.bullet.createChild(am4core.Triangle);
        triangle.stroke = interfaceColors.getFor("background");
        triangle.strokeWidth = 2;
        triangle.direction = "top";
        triangle.width = 12;
        triangle.height = 12;
        break;
      case "rectangle":
        this.bullet = series.bullets.push(new am4charts.Bullet());
        this.bullet.width = 10;
        this.bullet.height = 10;
        this.bullet.horizontalCenter = "middle";
        this.bullet.verticalCenter = "middle";
        
        let rectangle = this.bullet.createChild(am4core.Rectangle);
        rectangle.stroke = interfaceColors.getFor("background");
        rectangle.strokeWidth = 2;
        rectangle.width = 10;
        rectangle.height = 10;
        break;
      default:
        let bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.stroke = interfaceColors.getFor("background");
        bullet.circle.strokeWidth = 2;
        break;
    }
    
    valueAxis.renderer.line.strokeOpacity = 1;
    valueAxis.renderer.line.strokeWidth = 2;
    valueAxis.renderer.line.stroke = series.stroke;
    valueAxis.renderer.labels.template.fill = series.stroke;
    valueAxis.renderer.opposite = opposite;
  }

    EncryptPageName() {
      try{
      this.cryptService.encrypt("Customer Dashboard - Last 7 Days Distance.")
      this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
    }catch(e){}
    }
    
    EncryptPageUrl() {
      try{
      this.cryptService.encrypt(this.pageUrl)
      this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
    }catch(e){}
    }

}
