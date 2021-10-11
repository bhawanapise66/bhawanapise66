import { CustomerdashboardService } from './../services/customerdashboard.service';

import { Component, OnInit } from '@angular/core';


import { HttpClient } from '@angular/common/http';
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
  selector: 'app-customerdashboardoverspeed',
  templateUrl: './customerdashboardoverspeed.component.html',
  styleUrls: ['./customerdashboardoverspeed.component.css']
})
export class CustomerdashboardoverspeedComponent implements OnInit {

  getsessionpagesummary:any; listvehaboveseven$:Object; summary$ = [];
  stringifiedData: any;  stringifiedresponse: any; parsedJsonresponse: any;
  stringifiedDataList: any; parsedJsonList: any; parsedJson: any;
  encryptedpageNameValue: string; encryptedpageUrlValue: string; pageUrl = this.router.url;
  var_maxspeed: number;

 constructor(private http: HttpClient, private custService:CustomerdashboardService, private router: Router) { }

  ngOnInit() {
    this.var_maxspeed = 0;

    // Themes end
    
    // create chart
    let chart = am4core.create("chartDiv", am4charts.GaugeChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
    
    chart.innerRadius = -25;
   
    let axis = chart.xAxes.push(new am4charts.ValueAxis() as any);
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
    axis.renderer.grid.template.strokeOpacity = 0.3;
    
    let colorSet = new am4core.ColorSet();
    
    let range0 = axis.axisRanges.create();
    range0.value = 0;
    range0.endValue = 50;
    range0.axisFill.fillOpacity = 1;
    range0.axisFill.fill = colorSet.getIndex(0);
    range0.axisFill.zIndex = - 1;
    
    let range1 = axis.axisRanges.create();
    range1.value = 50;
    range1.endValue = 80;
    range1.axisFill.fillOpacity = 1;
    range1.axisFill.fill = colorSet.getIndex(2);
    range1.axisFill.zIndex = -1;
    
    let range2 = axis.axisRanges.create();
    range2.value = 80;
    range2.endValue = 100;
    range2.axisFill.fillOpacity = 1;
    range2.axisFill.fill = colorSet.getIndex(4);
    range2.axisFill.zIndex = -1;
    
    let hand = chart.hands.push(new am4charts.ClockHand());
    hand.showValue(this.var_maxspeed, 1000, am4core.ease.cubicOut);
   


    
    let aboveseventyData = []; 

    let keydata = {
      pageNo:"",
      itemsPerPage:"",    
      searchBy: "", 
      searchType:"",
      totalRecords:"NA",
      pageID: "7",
      pageName: this.encryptedpageNameValue,
      pageURL: this.encryptedpageUrlValue
    }
  
  //  try{AddLoader()}catch(e){}          
    try{this.custService.GetVehicleDetailsformap(keydata).subscribe(
      (data)  => {
      
      // Below code for all checkbox select.
      let resdata = data;    
    //  try{RemoveLoader()}catch(e){}  
      let resdatadrp = resdata['entity'];   
          // Convert to JSON  
      this.stringifiedData = JSON.stringify(resdatadrp);           
      // Parse from JSON  
      this.parsedJson = JSON.parse(this.stringifiedData);   
      let resdatadev = resdata['list'];        
       // Convert to JSON  
       this.stringifiedDataList = JSON.stringify(this.parsedJson.list);           
       // Parse from JSON  
       this.summary$ = JSON.parse(this.stringifiedDataList);     
       this.var_maxspeed = 0; 
       if(this.summary$.length > 0)
       {
          for(let i = 0; i < this.summary$.length; i++)
          {            
            if(this.summary$[i]["param37"] > 30)
            {
              aboveseventyData.push({
                param12:this.summary$[i]["param12"],
                param37:this.summary$[i]["param37"]

              });            
            }
            if(parseInt(this.summary$[i]["param37"]) > this.var_maxspeed)
            {
                this.var_maxspeed = parseInt(this.summary$[i]["param37"]);                
            }
          }
             
          hand.showValue(this.var_maxspeed, 1000, am4core.ease.cubicOut);
     }   
          this.listvehaboveseven$ = aboveseventyData;  
          
    })
  }
  catch(ex){}
  }
}

