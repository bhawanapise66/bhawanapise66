
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_spiritedaway);
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-logindashboard',
  templateUrl: './logindashboard.component.html',
  styleUrls: ['./logindashboard.component.css'],
  animations: [routerTransition()]
})
export class LogindashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {

   
    this.donughtchartType = 'doughnut';


//=======================chart 2




//=================chart 3


this.TodaySessionGraph();
this.LoginCreatedChart();
this.TopSessionChart();

  }


  TodaySessionGraph(){


// Themes end

let chart = am4core.create("chart3", am4charts.XYChart);
 // Add data
 chart.data = [{
   "year": "6:00",
   "income": 23.5,
   "expenses": 18.1
 },{
   "year": "7:00",
   "income": 26.2,
   "expenses": 22.8
 },{
   "year": "8:00",
   "income": 30.1,
   "expenses": 23.9
 },{
   "year": "9:00",
   "income": 29.5,
   "expenses": 25.1
 },{
   "year": "10:00",
   "income": 24.6,
   "expenses": 25
 }];
 
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
 
 createSeries("income", "Open");
 createSeries("expenses", "Close");
 
  }


  LoginCreatedChart(){
    
   
// Themes end

let chart = am4core.create("chart1", am4charts.PieChart);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

//chart.legend = new am4charts.Legend();

chart.data = [
  {
    country: "Jan",
    litres: 6
  },
  {
    country: "Fab",
    litres: 4
  },
  {
    country: "March",
    litres: 3
  },
  {
    country: "Apr",
    litres: 2
  },
  {
    country: "May",
    litres: 1
  },
  {
    country: "Jun",
    litres: 3
  },
  {
    country: "Jul",
    litres: 1
  },
  {
    country: "Aug",
    litres: 0
  },
  {
    country: "Sep",
    litres: 0
  },
  {
    country: "Oct",
    litres: 0
  }
 
];

let series = chart.series.push(new am4charts.PieSeries());
series.dataFields.value = "litres";
series.dataFields.category = "country";
series.ticks.template.disabled = true;
series.alignLabels = false;
series.labels.template.text = "{value}";
series.labels.template.fill = am4core.color("white");

series.labels.template.radius = am4core.percent(-40);
let mycolor="white";
chart.legend = new am4charts.Legend();
chart.legend.align = "left";
chart.legend.position = "left";
chart.legend.maxWidth = undefined;
chart.legend.fontSize=9;
chart.legend.maxHeight = 200;
chart.legend.scrollable = true;
chart.legend.labels.template.text = "white";//am4core.color("white")"";
//alert(chart.legend.labels.template.text = "[{color}]{name}[/]")
chart.legend.labels.template.text = " [{color}]{name}[/]";

//chart.legend.labels.template.text = "Series: [bold {white}]{name}[/]";

let markerTemplate = chart.legend.markers.template;
markerTemplate.width = 15;
markerTemplate.height = 15;



  }


  TopSessionChart(){
    
/* Chart code */
// Themes begin
// Themes end
let chart = am4core.create("chart2", am4charts.XYChart);

let data = [];

chart.data = [{
  "year": "5:00",
  "income": 23.5,
  "lineColor": chart.colors.next()
}, {
  "year": "6:00",
  "income": 26.2,
}, {
  "year": "7:00",
  "income": 30.1,
}, {
  "year": "8:00",
  "income": 20.5,
}, {
  "year": "9:00",
  "income": 30.6,
  "lineColor": chart.colors.next()
}, {
  "year": "10:00",
  "income": 34.1,
}, {
  "year": "11:00",
  "income": 34.1,
}, {
  "year": "12:00",
  "income": 34.1,
  "lineColor": chart.colors.next()
}, {
  "year": "1:00",
  "income": 34.1,
}, {
  "year": "2:00",
  "income": 34.1,
}, {
  "year": "3:00",
  "income": 34.1,
}];

let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.ticks.template.disabled = true;
categoryAxis.renderer.line.opacity = 0;
categoryAxis.renderer.grid.template.disabled = true;
categoryAxis.renderer.minGridDistance = 40;
categoryAxis.dataFields.category = "year";
categoryAxis.startLocation = 0.4;
categoryAxis.endLocation = 0.6;


let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.tooltip.disabled = true;
valueAxis.renderer.line.opacity = 0;
valueAxis.renderer.ticks.template.disabled = true;
valueAxis.min = 0;

let lineSeries = chart.series.push(new am4charts.LineSeries());
lineSeries.dataFields.categoryX = "year";
lineSeries.dataFields.valueY = "income";
lineSeries.tooltipText = "UserName: {valueY.value}";
lineSeries.fillOpacity = 0.5;
lineSeries.strokeWidth = 3;
lineSeries.propertyFields.stroke = "lineColor";
lineSeries.propertyFields.fill = "lineColor";

let bullet = lineSeries.bullets.push(new am4charts.CircleBullet());
bullet.circle.radius = 6;
bullet.circle.fill = am4core.color("#fff");
bullet.circle.strokeWidth = 3;

chart.cursor = new am4charts.XYCursor();
chart.cursor.behavior = "panX";
chart.cursor.lineX.opacity = 0;
chart.cursor.lineY.opacity = 0;

chart.scrollbarX = new am4core.Scrollbar();
chart.scrollbarX.parent = chart.bottomAxesContainer;
// Create chart instance
/* let chart2 = am4core.create("chart2", am4charts.XYChart3D);
chart2.paddingBottom = 30;
chart2.angle = 35;

// Add data
chart2.data = [{
  "country": "Sheetal Sahare",
  "visits": 5.60
}, {
  "country": "Vishal Sharma",
  "visits": 3.2
}, {
  "country": "Maha Mines",
  "visits": 1
}, {
  "country": "Gateway Tech",
  "visits": 3
}, {
  "country": "Mahindra Mortors",
  "visits": 6
}, {
  "country": "TilakTech",
  "visits": 12
}, {
  "country": "Vishal Am.",
  "visits": 0.30
}, {
  "country": "Indtrack",
  "visits": 2.31
}, {
  "country": "InfoTech",
  "visits": 3
}, {
  "country": "Ford Services",
  "visits": 2
}];

// Create axes
let categoryAxis = chart2.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "country";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 20;
categoryAxis.renderer.inside = true;
categoryAxis.renderer.grid.template.stroke = am4core.color("#A0CA92");
categoryAxis.renderer.labels.template.fill = am4core.color("#A0CA92");


let labelTemplate = categoryAxis.renderer.labels.template;
labelTemplate.rotation = -90;
labelTemplate.horizontalCenter = "left";
labelTemplate.verticalCenter = "middle";
labelTemplate.dy = 10; // moves it a bit down;
labelTemplate.inside = false; // this is done to avoid settings which are not suitable when label is rotated
labelTemplate.fill = am4core.color("#000");

let valueAxis = chart2.yAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.grid.template.stroke = am4core.color("#A0CA92");
valueAxis.renderer.labels.template.fill = am4core.color("#A0CA92");

// Create series
let series2 = chart2.series.push(new am4charts.ConeSeries());
series2.dataFields.valueY = "visits";
series2.dataFields.categoryX = "country";

let columnTemplate = series2.columns.template;
columnTemplate.adapter.add("fill", function(fill, target) {
  return chart2.colors.getIndex(target.dataItem.index);
})

columnTemplate.adapter.add("stroke", function(stroke, target) {
  return chart2.colors.getIndex(target.dataItem.index);
})
 */


  }


   // donughtchart chart
   public donughtchartOptions: any = {
    elements: {
        arc: {
            borderWidth: 0
        }
    },
    cutoutPercentage: 70,
    responsive: true,
    aspectRatio: '1',
    legend: {
        display: false
    },
    title: {
        display: false,
        text: 'Chart.js Doughnut Chart'
    },
    animation: {
        animateScale: true,
        animateRotate: true
    }
};
public donughtchartLabels: string[] = ['Red', 'Orange', 'Yellow', 'Green', 'Blue'];
public donughtchartType: string;
public donughtchartLegend: boolean;


  public donughtchartData: any[] = [
      {
          data: [30, 20, 35, 15],
          backgroundColor: ['rgba(240, 240, 240, 0.5)', '#5B92FF', '#1FC96E', '#F85778'],
          label: 'Dataset 1'
      }
  ];
}

