
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdmindashrlyService } from '../services/admindashrly.service';
import { PostService } from '../../../../post.service';
import { CryptService } from '../services/crypt.service';
import { Router } from '@angular/router';
import { Paramcls } from './../../../../paramcls';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_spiritedaway);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-admindashrlystackedgraph',
  templateUrl: './admindashrlystackedgraph.component.html',
  styleUrls: ['./admindashrlystackedgraph.component.css']
})
export class AdmindashrlystackedgraphComponent implements OnInit {

  nop :number; totrec:number; outorec:number; filter:any; selectRowsText:any; pagecount:number;
    p: number;stringifiedData: any; parsedJson: any; stringifiedresponse: any; parsedJsonresponse: any;
    stringifiedDataList: any; parsedJsonList: any;
    encryptedpageNameValue: string; encryptedpageUrlValue: string; pageUrl = this.router.url;


  constructor( private http: HttpClient, private admindashrlyService:AdmindashrlyService, 
    private router: Router, private cryptService: CryptService, private postService: PostService) { }

  ngOnInit() {
    
    this.StackedChart();

  }


  StackedChart(){
    try{
    
      let chart = am4core.create("stackedchartdiv", am4charts.XYChart);

      let chartData = []; 

      let keydata = {
        pageID:"1",
        pageName:this.encryptedpageNameValue,    
        pageURL:this.encryptedpageUrlValue

      }

      const newLocal = this.admindashrlyService;
        // Device Detail Grid BIND LIST    
        newLocal.AdminDashboardRlyCountAPI(keydata).subscribe(
          (data)  => {
    
          let resdata = data;    
          
          let resdatadrp = resdata['entity'];   
              // Convert to JSON  
          this.stringifiedData = JSON.stringify(resdatadrp);           
          // Parse from JSON  
          this.parsedJson = JSON.parse(this.stringifiedData);   
          let resdatadev = resdata['list'];  
          
           // Convert to JSON  
           this.stringifiedDataList = JSON.stringify(this.parsedJson.list);           
           // Parse from JSON  
           this.parsedJsonList = JSON.parse(this.stringifiedDataList);
                          
            for (let i = 0; i < this.parsedJsonList.length; i++ )
            {
              chartData.push({
                param2: this.parsedJsonList[i]["param2"],
                param3: this.parsedJsonList[i]["param3"],
                param4: this.parsedJsonList[i]["param4"],
                param5: this.parsedJsonList[i]["param5"]
              
              });
            }
      
    // Add data
    chart.data = chartData; 
      // Add data
     /*  chart.data = [{
        "year": "NORTH",
        "income": 23.5,
        "expenses": 18.1
      },{
        "year": "SOUTH",
        "income": 26.2,
        "expenses": 22.8
      },{
        "year": "EAST",
        "income": 30.1,
        "expenses": 23.9
      },{
        "year": "CENTRAL",
        "income": 29.5,
        "expenses": 25.1
      }]; */
      
      // Create axes
      let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "param2";
      categoryAxis.numberFormatter.numberFormat = "#";
      categoryAxis.renderer.inversed = true;
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.cellStartLocation = 0.1;
      categoryAxis.renderer.cellEndLocation = 0.9;
      
      let  valueAxis = chart.xAxes.push(new am4charts.ValueAxis()); 
      valueAxis.renderer.opposite = true;
      
      // Create series
      function createSeries(field, name) {
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueX = field;
        series.dataFields.categoryY = "param2";
        series.name = name;
        series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
        series.columns.template.height = am4core.percent(100);
        series.sequencedInterpolation = true;
      
        let valueLabel = series.bullets.push(new am4charts.LabelBullet());
        valueLabel.label.text = "{valueX}";
        valueLabel.label.horizontalCenter = "left";
        valueLabel.label.dx = 10;
        valueLabel.label.hideOversized = false;
        valueLabel.label.truncate = false;
      
        let categoryLabel = series.bullets.push(new am4charts.LabelBullet());
        categoryLabel.label.text = "{name}";
        categoryLabel.label.horizontalCenter = "right";
        categoryLabel.label.dx = -10;
        categoryLabel.label.fill = am4core.color("#fff");
        categoryLabel.label.hideOversized = false;
        categoryLabel.label.truncate = false;
      }
      
      createSeries("param4", "Working");
      createSeries("param5", "Non-Working");
    });

    }catch(e){}
    
    }

    EncryptPageName() {
      this.cryptService.encrypt("Railway Admin Dashboard Stacked Graph")
      this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
     
    }
    EncryptPageUrl() {
      this.cryptService.encrypt(this.pageUrl)
      this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
      
    }
}
