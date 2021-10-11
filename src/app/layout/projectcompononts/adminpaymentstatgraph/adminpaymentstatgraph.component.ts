
import { Component, OnInit } from '@angular/core';
import { CryptService } from '../services/crypt.service';
import { Router } from '@angular/router';
import { AdmindashboardService } from '../services/admindashboard.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Paramcls } from './../../../../paramcls';

import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_spiritedaway);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-adminpaymentstatgraph',
  templateUrl: './adminpaymentstatgraph.component.html',
  styleUrls: ['./adminpaymentstatgraph.component.css']
})
export class AdminpaymentstatgraphComponent implements OnInit {

  encryptedpageNameValue: string; encryptedpageUrlValue: string; pageUrl = this.router.url;
  stringifiedData: any; parsedJson: any; stringifiedresponse: any; parsedJsonresponse: any;
  stringifiedDataList: any; parsedJsonList: any;

  year:string; income:number = 0; expenses:number = 0; 

  constructor(private http: HttpClient, private router: Router, private cryptService: CryptService,
    private adminService:AdmindashboardService) { }

  ngOnInit() {

    this.paymentstasticsgraph();
  }

  paymentstasticsgraph()
  {
    // Create chart instance
      let chart = am4core.create("paychartdiv", am4charts.XYChart);

      let chartData = [];

        let keydata = {
          pageID:"1",
          pageName:this.encryptedpageNameValue,    
          pageURL:this.encryptedpageUrlValue
      
        }
        
        // Distributor Detail Grid BIND LIST    
        this.adminService.PaymentStatisticCountAPI(keydata).subscribe(
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
                      income: this.parsedJsonList[i]["param3"],       //renual payment
                      expenses: this.parsedJsonList[i]["param2"],       //installed payment
                      year:this.parsedJsonList[i]["param1"]          //years   
                                            
                  });
                  
                  
                } 

                chart.data = chartData;   

 
                chart.colors.list = [
                  am4core.color("#A543B4"),
                  am4core.color("#DDA0DD"),
                  am4core.color("#A543B4"),
                  am4core.color("#DDA0DD"),
                  am4core.color("#A543B4"),
                  am4core.color("#DDA0DD")
                ];
                
                // Create axes
                let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "year";
                categoryAxis.renderer.grid.template.location = 0;
                
                
                let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis.renderer.inside = true;
                valueAxis.renderer.labels.template.disabled = true;
                valueAxis.min = 0;
                
                // Create series
                function createSeries(field, name) {
                  
                  // Set up series
                  let series = chart.series.push(new am4charts.ColumnSeries());
                  series.name = name;
                  series.dataFields.valueY = field;
                  series.dataFields.categoryX = "year";
                  series.sequencedInterpolation = true;
                  
                  // Make it stacked
                  series.stacked = true;
                  
                  // Configure columns
                  series.columns.template.width = am4core.percent(60);
                  series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:13px]{categoryX}: {valueY}";
                  
                  // Add label
                  let labelBullet = series.bullets.push(new am4charts.LabelBullet());
                  labelBullet.label.text = "{valueY}";
                  labelBullet.locationY = 0.5;
                  labelBullet.label.hideOversized = true;
                  
                  return series;
                }
                
                createSeries("expenses", "Installed");
                createSeries("income", "Renewal");
                
                // Legend
                chart.legend = new am4charts.Legend();
                chart.legend.maxWidth = 200;

});



/* // Add data
chart.data = [{
  "year": "2016",
  "expenses": 2.5,
  "income": 2.5
}, {
  "year": "2017",
  "expenses": 3.9,
  "income": 2.7
}, {
  "year": "2018",
  "expenses": 2.8,
  "income": 2.9
}];  */



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
