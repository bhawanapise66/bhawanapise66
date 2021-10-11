import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdmindashrlyService } from '../services/admindashrly.service';
import { PostService } from '../../../../post.service';
import { CryptService } from '../services/crypt.service';
import { Router } from '@angular/router';
import { Paramcls } from './../../../../paramcls';

import '../../../../assets/mapscripts/mapview.js'
import '../../../../assets/mapscripts/maphistory'
import '../../../../assets/mapscripts/mapclusters.js'

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_spiritedaway);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {

  p: number; totrectype: number; outorectype: number; selectRowsTexttype: any;
  stringifiedData: any; parsedJson: any; stringifiedresponse: any; parsedJsonresponse: any;
  stringifiedDataList: any; parsedJsonList: any;
  encryptedpageNameValue: string; encryptedpageUrlValue: string; pageUrl = this.router.url;

  constructor(private http: HttpClient, private admindashrlyService: AdmindashrlyService,
    private router: Router,
    private cryptService: CryptService, private postService: PostService) { }

  ngOnInit() {

    this.PieChartBind();
  }

  PieChartBind() {
    alert("come in to ");

    try {
      let chart = am4core.create("piechart", am4charts.PieChart3D);

      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      chart.legend = new am4charts.Legend();

      chart.data = [
        {
          country: "Lithuania",
          litres: 501.9
        },
        {
          country: "Czech Republic",
          litres: 301.9
        },
        {
          country: "Ireland",
          litres: 201.1
        },
        {
          country: "Germany",
          litres: 165.8
        },
        {
          country: "Australia",
          litres: 139.9
        },
        {
          country: "Austria",
          litres: 128.3
        },
        {
          country: "UK",
          litres: 99
        },
        {
          country: "Belgium",
          litres: 60
        },
        {
          country: "The Netherlands",
          litres: 50
        }
      ];

      let series = chart.series.push(new am4charts.PieSeries3D());
      series.dataFields.value = "litres";
      series.dataFields.category = "country";

    } catch (e) { }
  }
}
