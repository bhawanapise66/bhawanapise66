import { Component, OnInit, PLATFORM_ID } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

declare var $: any
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  modalVisible: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.linechart()
    this.barchart()
    this.bsnlchart()
    this.statisticChart()
    this.multiLineChart()


  }

  linechart() {
    let chart: any
    // LINE CHART STARTS 
    if (this.modalVisible == false) {
      chart = am4core.create("vichart", am4charts.XYChart);
    }
    else if (this.modalVisible == true) {
      chart = am4core.create("vichartmodal", am4charts.XYChart);
    }

    // Add data
    chart.data = generateChartDataline();

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "visits";
    series.dataFields.dateX = "date";
    series.strokeWidth = 2;
    series.minBulletDistance = 10;
    series.tooltipText = "{valueY}";
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.fillOpacity = 0.5;
    series.tooltip.label.padding(12, 12, 12, 12)

    // // Add scrollbar
    // chart.scrollbarX = new am4charts.XYChartScrollbar();
    // chart.scrollbarX.series.push(series);

    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

    function generateChartDataline() {
      let chartData = [];
      let firstDate = new Date();
      firstDate.setDate(firstDate.getDate() - 1000);
      let visits = 1200;
      for (var i = 0; i < 500; i++) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        let newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);

        visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);

        chartData.push({
          date: newDate,
          visits: visits
        });
      }
      return chartData;
    }
    //LINE CHART ENDS
  }
  barchart() {


    let chart: any
    // LINE CHART STARTS 
    if (this.modalVisible == false) {
      chart = am4core.create("airtelchart", am4charts.XYChart);
    }
    else if (this.modalVisible == true) {
      chart = am4core.create("airtelchartmodal", am4charts.XYChart);
    }


    // Add data
    chart.data = [
      { "country": "Members", "visits": 2025 },
      { "country": "Mines", "visits": 1882 },
      { "country": "Corporate", "visits": 1809 },
    ];
    // Create axes

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
      if (target.dataItem && target.dataItem.index && 2 == 2) {
        return dy + 25;
      }
      return dy;
    });

    let barvalueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let barseries = chart.series.push(new am4charts.ColumnSeries());
    barseries.dataFields.valueY = "visits";
    barseries.dataFields.categoryX = "country";
    barseries.name = "Visits";
    barseries.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    barseries.columns.template.fillOpacity = .8;

    let columnTemplate = barseries.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;

    //BAR GRAPH ENDS

  }


  statisticChart() {

    // Create chart instance
    let chart = am4core.create("statistic", am4charts.XYChart);
    chart.paddingRight = 20;

    // Add data
    chart.data = [{ "year": "1950", "value": -0.307 },
    { "year": "1951", "value": -0.168 },
    { "year": "1952", "value": -0.073 },
    { "year": "1953", "value": -0.027 },
    { "year": "1954", "value": -0.251 },
    { "year": "1955", "value": -0.281 },
    { "year": "1956", "value": -0.348 },
    { "year": "1957", "value": -0.074 },
    { "year": "1958", "value": -0.011 },
    { "year": "1959", "value": -0.074 },
    { "year": "1960", "value": -0.124 },
    { "year": "1979", "value": 0.05 },
    ];

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.minGridDistance = 50;
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.startLocation = 0.5;
    categoryAxis.endLocation = 0.5;

    // Create value axis
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.baseValue = 0;

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "year";
    series.strokeWidth = 2;
    series.tensionX = 0.77;

    // bullet is added because we add tooltip to a bullet for it to change color
    let bullet = series.bullets.push(new am4charts.Bullet());
    bullet.tooltipText = "{valueY}";

    bullet.adapter.add("fill", function (fill, target) {
      // if(target.dataItem.valueY < 0){
      //     return am4core.color("#FF0000");
      // }
      return fill;
    })
    let range = valueAxis.createSeriesRange(series);
    range.value = 0;
    range.endValue = -1000;
    range.contents.stroke = am4core.color("#FF0000");
    range.contents.fill = range.contents.stroke;

    // Add scrollbar
    // let scrollbarX = new am4charts.XYChartScrollbar();
    // scrollbarX.series.push(series);
    // chart.scrollbarX = scrollbarX;

    chart.cursor = new am4charts.XYCursor();

  }


  bsnlchart() {
    let chart: any

    if (this.modalVisible == false) {
      chart = am4core.create("bsnlchart", am4charts.XYChart);
    }
    else if (this.modalVisible == true) {
      chart = am4core.create("bsnlchartmodal", am4charts.XYChart);
    }


    chart.padding(40, 40, 40, 40);

    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "network";
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = "network";
    series.dataFields.valueX = "MAU";
    series.tooltipText = "{valueX.value}"
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;

    let labelBullet = series.bullets.push(new am4charts.LabelBullet())
    labelBullet.label.horizontalCenter = "left";
    labelBullet.label.dx = 10;
    labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
    labelBullet.locationX = 1;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    categoryAxis.sortBySeries = series;
    chart.data = [
      { "network": "Members", "MAU": 22552 },
      { "network": "Mines", "MAU": 43000 },
      { "network": "Corporates", "MAU": 30000 },]
  }

  multiLineChart() {

    // Create chart instance
    let chart = am4core.create("multiLine", am4charts.XYChart);

    //

    // Increase contrast by taking evey second color
    chart.colors.step = 2;

    // Add data
    chart.data = generateChartData();

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;

    // Create series
    function createAxisAndSeries(field, name, opposite, bullet) {
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      if (chart.yAxes.indexOf(valueAxis) != 0) {
        // valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
      }

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.dateX = "date";
      series.strokeWidth = 2;
      series.yAxis = valueAxis;
      series.name = name;
      series.tooltipText = "{name}: [bold]{valueY}[/]";
      series.tensionX = 0.8;
      series.showOnInit = true;

      let interfaceColors = new am4core.InterfaceColorSet();

      switch (bullet) {
        case "triangle":
          let bulleta = series.bullets.push(new am4charts.Bullet());
          bulleta.width = 12;
          bulleta.height = 12;
          bulleta.horizontalCenter = "middle";
          bulleta.verticalCenter = "middle";

          let triangle = bulleta.createChild(am4core.Triangle);
          triangle.stroke = interfaceColors.getFor("background");
          triangle.strokeWidth = 2;
          triangle.direction = "top";
          triangle.width = 12;
          triangle.height = 12;
          break;
        case "rectangle":
          let bulletb = series.bullets.push(new am4charts.Bullet());
          bulletb.width = 10;
          bulletb.height = 10;
          bulletb.horizontalCenter = "middle";
          bulletb.verticalCenter = "middle";

          let rectangle = bulletb.createChild(am4core.Rectangle);
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

    createAxisAndSeries("visits", "Visits", false, "circle");
    createAxisAndSeries("views", "Views", true, "triangle");
    createAxisAndSeries("hits", "Hits", true, "rectangle");

    // Add legend
    chart.legend = new am4charts.Legend();

    // Add cursor
    chart.cursor = new am4charts.XYCursor();

    // generate some random data, quite different range
    function generateChartData() {
      let chartData = [];
      let firstDate = new Date();
      firstDate.setDate(firstDate.getDate() - 100);
      firstDate.setHours(0, 0, 0, 0);

      let visits = 1600;
      let hits = 2900;
      let views = 8700;

      for (var i = 0; i < 15; i++) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        let newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);

        visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        hits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
        views += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);

        chartData.push({
          date: newDate,
          visits: visits,
          hits: hits,
          views: views
        });
      }
      return chartData;
    }
  }


liveupdate(){
  let chart:any;
   chart = am4core.create("liveupdate", am4charts.PieChart);
  chart.data = [ {
    "country": "Lithuania",
    "litres": 501.9
  }, {
    "country": "Czechia",
    "litres": 301.9
  }, {
    "country": "Ireland",
    "litres": 201.1
  }, {
    "country": "Germany",
    "litres": 165.8
  }
  ];
  
  // Add and configure Series
  let pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "litres";
  pieSeries.dataFields.category = "country";
  pieSeries.slices.template.stroke = am4core.color("#fff");
  pieSeries.slices.template.strokeOpacity = 1;
  
  // This creates initial animation
  pieSeries.hiddenState.properties.opacity = 1;
  pieSeries.hiddenState.properties.endAngle = -90;
  pieSeries.hiddenState.properties.startAngle = -90;
  
  chart.hiddenState.properties.radius = am4core.percent(0);
  
}


  openviModal() {
    this.modalVisible = true;
    $("#myviModal").modal('show');
    this.linechart()
  }


  openairtelModal() {
    this.modalVisible = true;
    $("#myairtelModal").modal('show');
    this.barchart()
  }

  openbsnlModal() {
    this.modalVisible = true;
    $("#mybsnlModal").modal('show');
    this.bsnlchart()
  }

}
