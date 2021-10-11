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
  selector: 'app-customersideoverspeedchart',
  templateUrl: './customersideoverspeedchart.component.html',
  styleUrls: ['./customersideoverspeedchart.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class CustomersideoverspeedchartComponent implements OnInit {

  spd:string; 
  
  constructor() { }

  ngOnInit() {
    
  }

  show(){
    this.spd = localStorage.getItem('vehicleid');
  }

}
