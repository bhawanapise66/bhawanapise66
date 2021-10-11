
import { Component, OnInit, Injectable } from '@angular/core';


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
  selector: 'app-railwaydashspeedo',
  templateUrl: './railwaydashspeedo.component.html',
  styleUrls: ['./railwaydashspeedo.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class RailwaydashspeedoComponent implements OnInit {

  spd:string; 

  constructor() { }

  ngOnInit() {

   
     // create chart
     let chart = am4core.create("chartdiv", am4charts.GaugeChart);
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
     
     // using chart.setTimeout method as the timeout will be disposed together with a chart
     //chart.setTimeout(randomValue, 2000);
     
  
  }

  show(){
    this.spd = localStorage.getItem('vehicleid');
  }

}
