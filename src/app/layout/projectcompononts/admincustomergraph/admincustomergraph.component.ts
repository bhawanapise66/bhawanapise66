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
  selector: 'app-admincustomergraph',
  templateUrl: './admincustomergraph.component.html',
  styleUrls: ['./admincustomergraph.component.css']
})
export class AdmincustomergraphComponent implements OnInit {

  encryptedpageNameValue: string; encryptedpageUrlValue: string; pageUrl = this.router.url;
  stringifiedData: any; parsedJson: any; stringifiedresponse: any; parsedJsonresponse: any;
  stringifiedDataList: any; parsedJsonList: any;

  months:any; members:any; mines:any; corporate:any; chart: any; 

  constructor(private http: HttpClient, private router: Router, private cryptService: CryptService,
    private adminService:AdmindashboardService) { }

  ngOnInit() {
     
    // Create chart instance
    this.chart = am4core.create("chartdiv", am4charts.XYChart);
    // Increase contrast by taking evey second color
    this.chart.colors.step = 2;

    let chartData = [];

        let keydata = {
          pageNo:"",
          itemsPerPage:"",    
          searchBy: "", 
          searchType:"",
          totalRecords:"NA",
          pageID:"1",
          pageName:this.encryptedpageNameValue,    
          pageURL:this.encryptedpageUrlValue
      
        }
        
        // Distributor Detail Grid BIND LIST    
        this.adminService.AdminDashboardCustomerDetailsViewsAPI(keydata).subscribe(
          (data)  => {
            
            let resdata = data;    
            
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
              
              for (let j = 0; j < data.entity.responsedatalist.length; j++)
                {
                 chartData.push({
                      months: this.parsedJsonList[j]["param1"],       //month
                      members: this.parsedJsonList[j]["param2"],      //member
                      mines: this.parsedJsonList[j]["param3"],       //mines
                      corporate: this.parsedJsonList[j]["param4"]    //corporate
                  });
                  
                }

                this.chart.data = chartData;

              
// Create category axis
let categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "months";
categoryAxis.renderer.opposite = true;

// Create value axis
let valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.inversed = true;
valueAxis.title.text = "Customer Count";
valueAxis.renderer.minLabelPosition = 0.01;

// Create series
let series1 = this.chart.series.push(new am4charts.LineSeries());
series1.dataFields.valueY = "members";
series1.dataFields.categoryX = "months";
series1.name = "Members";
series1.bullets.push(new am4charts.CircleBullet());
series1.tooltipText = "Customer Count by {name} in {categoryX}: {valueY}";
series1.legendSettings.valueText = "{valueY}";
series1.visible  = false;

let series2 = this.chart.series.push(new am4charts.LineSeries());
series2.dataFields.valueY = "mines";
series2.dataFields.categoryX = "months";
series2.name = 'Mines';
series2.bullets.push(new am4charts.CircleBullet());
series2.tooltipText = "Customer Count by {name} in {categoryX}: {valueY}";
series2.legendSettings.valueText = "{valueY}";

let series3 = this.chart.series.push(new am4charts.LineSeries());
series3.dataFields.valueY = "corporate";
series3.dataFields.categoryX = "months";
series3.name = 'Corporate';
series3.bullets.push(new am4charts.CircleBullet());
series3.tooltipText = "Customer Count by {name} in {categoryX}: {valueY}";
series3.legendSettings.valueText = "{valueY}";

// Add chart cursor
this.chart.cursor = new am4charts.XYCursor();
this.chart.cursor.behavior = "zoomY";


let hs1 = series1.segments.template.states.create("hover")
hs1.properties.strokeWidth = 5;
series1.segments.template.strokeWidth = 1;

let hs2 = series2.segments.template.states.create("hover")
hs2.properties.strokeWidth = 5;
series2.segments.template.strokeWidth = 1;

let hs3 = series3.segments.template.states.create("hover")
hs3.properties.strokeWidth = 5;
series3.segments.template.strokeWidth = 1;

// Add legend
this.chart.legend = new am4charts.Legend();
          
          });

         
  // Add data
  
/* chart.data = [{
  "year": "1930",
  "members": 1,
  "mines": 5,
  "corporate": 3
}, {
  "year": "1934",
  "members": 1,
  "mines": 2,
  "corporate": 6
}, {
  "year": "1938",
  "members": 2,
  "mines": 3,
  "corporate": 1
}, {
  "year": "1950",
  "members": 3,
  "germany": 4,
  "corporate": 1
}, {
  "year": "1954",
  "members": 5,
  "mines": 1,
  "corporate": 2
}, {
  "year": "1958",
  "members": 3,
  "mines": 2,
  "corporate": 1
}, {
  "year": "1962",
  "members": 1,
  "mines": 2,
  "corporate": 3
}, {
  "year": "1966",
  "members": 2,
  "germany": 1,
  "corporate": 5
}, {
  "year": "1970",
  "members": 3,
  "mines": 5,
  "corporate": 2
}, {
  "year": "1974",
  "members": 4,
  "mines": 3,
  "corporate": 6
}, {
  "year": "1978",
  "members": 1,
  "mines": 2,
  "corporate": 4
}]; */


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
