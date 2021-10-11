import { Component, OnInit } from '@angular/core';
import { CryptService } from '../services/crypt.service';
import { Router } from '@angular/router';
import { AdmindashboardService } from '../services/admindashboard.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Paramcls } from './../../../../paramcls';

/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_spiritedaway);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-admindevicestatics',
  templateUrl: './admindevicestatics.component.html',
  styleUrls: ['./admindevicestatics.component.css']
})
export class AdmindevicestaticsComponent implements OnInit {
  encryptedpageNameValue: string; encryptedpageUrlValue: string; pageUrl = this.router.url;
  stringifiedData: any; parsedJson: any; stringifiedresponse: any; parsedJsonresponse: any;
  stringifiedDataList: any; parsedJsonList: any;

  year:string; income:number = 0; expenses:number = 0; 

   constructor(private http: HttpClient, private router: Router, private cryptService: CryptService,
    private adminService:AdmindashboardService) { }

  ngOnInit() {

    this.totdevicesgraph();
  }

  totdevicesgraph(){
    // Create chart instance
let chart = am4core.create("devstaticschartdiv", am4charts.XYChart);

// Add data
/* chart.data = [{
 "year": 2005,
 "income": 23.5,
 "expenses": 18.1
},{
 "year": 2006,
 "income": 26.2,
 "expenses": 22.8
},{
 "year": 2007,
 "income": 30.1,
 "expenses": 23.9
},{
 "year": 2008,
 "income": 29.5,
 "expenses": 25.1
},{
 "year": 2009,
 "income": 24.6,
 "expenses": 25
}]; */

let chartData = [];

        let keydata = {
          pageID:"1",
          pageName:this.encryptedpageNameValue,    
          pageURL:this.encryptedpageUrlValue
      
        }
        
        // Distributor Detail Grid BIND LIST    
        this.adminService.DeviceStatisticCountAPI(keydata).subscribe(
          (data)  => {
          
            // Below code for all checkbox select.
            let resdata = data;    
            //  try{RemoveLoader()}catch(e){}  
              let resdatadrp = resdata['entity'];   
                  // Convert to JSON  
              this.stringifiedData = JSON.stringify(resdatadrp);           
              // Parse from JSON  
              this.parsedJson = JSON.parse(this.stringifiedData);   
              let resdatadev = resdata['responsedatalist'];        
              // Convert to JSON  
              this.stringifiedDataList = JSON.stringify(this.parsedJson.responsedatalist);
                // Parse from JSON  
              this.parsedJsonList = JSON.parse(this.stringifiedDataList);   
               
             
              for (let i = 0; i < data.entity.responsedatalist.length; i++ )
                {
                  
                    chartData.push({
                      income: this.parsedJsonList[i]["param1"],       //polling
                      expenses: this.parsedJsonList[i]["param2"],       //nonpolling
                      year:this.parsedJsonList[i]["param3"]          //years   
                                            
                  });
                  
                  
                }

                // Add data
  chart.data = chartData;   

  chart.colors.list = [
    am4core.color("#298A08"),
    am4core.color("#DF0101"),
    am4core.color("#298A08"),
    am4core.color("#DF0101"),
    am4core.color("#298A08"),
    am4core.color("#DF0101")
  ];

  // Create axes
  let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "year";
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
   series.dataFields.categoryY = "year";
   series.name = name;
   series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
   series.columns.template.height = am4core.percent(130);
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
  
  
  createSeries("income", "Polling");
  createSeries("expenses", "Non-Polling");
          
          });


  

 }

 EncryptPageName() {
  this.cryptService.encrypt("Admin Customer Graph")
  this.encryptedpageNameValue = this.cryptService.conversionEncryptOutput;
 
}
EncryptPageUrl() {
  this.cryptService.encrypt(this.pageUrl)
  this.encryptedpageUrlValue = this.cryptService.conversionEncryptOutput
  
}
}
