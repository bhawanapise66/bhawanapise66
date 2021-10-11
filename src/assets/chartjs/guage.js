

var hand;
function SideGuage(target){
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  
  // create chart
var chart = am4core.create(target, am4charts.GaugeChart);
chart.innerRadius = -15;

var axis = chart.xAxes.push(new am4charts.ValueAxis());
axis.min = 0;
axis.max = 100;
axis.strictMinMax = true;

var colorSet = new am4core.ColorSet();

var gradient = new am4core.LinearGradient();
gradient.stops.push({color:am4core.color("red")})
gradient.stops.push({color:am4core.color("yellow")})
gradient.stops.push({color:am4core.color("green")})

axis.renderer.line.stroke = gradient;
axis.renderer.line.strokeWidth = 15;
axis.renderer.line.strokeOpacity = 1;

axis.renderer.grid.template.disabled = true;

hand = chart.hands.push(new am4charts.ClockHand());
hand.radius = am4core.percent(97);




}

function SetSideGauge(data){
 var intdata=Number(data)
 try{ hand.showValue(intdata, 1000, am4core.ease.cubicOut);}catch(e){alert(e)}
}

var hand;
function railwayGuage(target){
  am4core.useTheme(am4themes_animated);
  // Themes end
  
  
  // create chart
var chart = am4core.create(target, am4charts.GaugeChart);
chart.innerRadius = -15;

var axis = chart.xAxes.push(new am4charts.ValueAxis());
axis.min = 0;
axis.max = 100;
axis.strictMinMax = true;

var colorSet = new am4core.ColorSet();

var gradient = new am4core.LinearGradient();
gradient.stops.push({color:am4core.color("red")})
gradient.stops.push({color:am4core.color("yellow")})
gradient.stops.push({color:am4core.color("green")})

axis.renderer.line.stroke = gradient;
axis.renderer.line.strokeWidth = 15;
axis.renderer.line.strokeOpacity = 1;

axis.renderer.grid.template.disabled = true;

hand = chart.hands.push(new am4charts.ClockHand());
hand.radius = am4core.percent(97);




} 

function SetrailwayGauge(data){
 var intdata=Number(data)
 try{ hand.showValue(intdata, 1000, am4core.ease.cubicOut);}catch(e){alert(e)}
}


function Gaugemeter(){
    try{
    let chartMin = 0;
  let chartMax = 100;
  
  let data = {
    score: 52.7,
    gradingData: [   
      {
        title: "Developing",
        color: "#30FA51",
        lowScore: 0,
        highScore: 20
      },
      {
        title: "Developing",
        color: "#CDF32F",
        lowScore: 20,
        highScore: 40
      },
      {
        title: "Maturing",
        color: "#CDF32F",
        lowScore: 40,
        highScore: 60
      },
      {
        title: "Sustainable",
        color: "#FBD204",
        lowScore: 60,
        highScore: 80
      },
      {
        title: "High Performing",
        color: "#F90808",
        lowScore: 80,
        highScore: 100
      }
    ]
  };
  
  /**
  Grading Lookup
   */
  function lookUpGrade(lookupScore, grades) {
    // Only change code below this line
    for (var i = 0; i < grades.length; i++) {
      if (
        grades[i].lowScore < lookupScore &&
        grades[i].highScore >= lookupScore
      ) {
        return grades[i];
      }
    }
    return null;
  }
  
  // create chart
  let chart = am4core.create("chartdiv", am4charts.GaugeChart);
  chart.hiddenState.properties.opacity = 0;
  chart.fontSize = 11;
  chart.innerRadius = am4core.percent(80);
  chart.resizable = true;
  
  /**
   * Normal axis
   */
  var axis = chart.xAxes.push(new am4charts.ValueAxis());
  //let axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
  axis.min = chartMin;
  axis.max = chartMax;
  axis.strictMinMax = true;
  axis.renderer.radius = am4core.percent(80);
  axis.renderer.inside = false;
  axis.renderer.line.strokeOpacity = 0.1;
  axis.renderer.ticks.template.disabled = false;
  axis.renderer.ticks.template.strokeOpacity = 1;
  axis.renderer.ticks.template.strokeWidth = 0.5;
  axis.renderer.ticks.template.length = 5;
  axis.renderer.grid.template.disabled = true;
  axis.renderer.labels.template.radius = am4core.percent(15);
  axis.renderer.labels.template.fontSize = "0.9em";
  
  /**
   * Axis for ranges
   */
  var axis2 = chart.xAxes.push(new am4charts.ValueAxis());
  //let axis2 = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
  axis2.min = chartMin;
  axis2.max = chartMax;
  axis2.strictMinMax = true;
  axis2.renderer.labels.template.disabled = true;
  axis2.renderer.ticks.template.disabled = true;
  axis2.renderer.grid.template.disabled = false;
  axis2.renderer.grid.template.opacity = 0.5;
  axis2.renderer.labels.template.bent = true;
  axis2.renderer.labels.template.fill = am4core.color("#000");
  axis2.renderer.labels.template.fontWeight = "bold";
  axis2.renderer.labels.template.fillOpacity = 0.3;
  /**
  Ranges
  */
  for (let grading of data.gradingData) {
    let range = axis2.axisRanges.create();
    range.axisFill.fill = am4core.color(grading.color);
    range.axisFill.fillOpacity = 0.8;
    range.axisFill.zIndex = -1;
    range.value = grading.lowScore > chartMin ? grading.lowScore : chartMin;
    range.endValue = grading.highScore < chartMax ? grading.highScore : chartMax;
    range.grid.strokeOpacity = 0;
   // range.stroke = am4core.color(grading.color).lighten(-0.1);
    range.label.inside = false;
   // range.label.text = grading.title.toUpperCase();
    range.label.inside = false;
    range.label.location = 0.5;
    range.label.inside = true;
   // range.label.radius = am4core.percent(10);
    range.label.paddingBottom = -5; // ~half font size
    range.label.fontSize = "12px";
  }
  
  let matchingGrade = lookUpGrade(data.score, data.gradingData);
  
  /**
   * Label 1
   */
  
  let label = chart.radarContainer.createChild(am4core.Label);
  label.isMeasured = false;
  label.fontSize = "12px";
  label.x = am4core.percent(50);
  label.paddingBottom =0;
  label.horizontalCenter = "middle";
  label.verticalCenter = "bottom";
  //label.dataItem = data;
  label.text = data.score.toFixed(1);
  
  let hand = chart.hands.push(new am4charts.ClockHand());
  hand.axis = axis2;
  hand.innerRadius = am4core.percent(30);
  hand.startWidth = 8;
  hand.pin.disabled = true;
  hand.value = data.score;
  hand.fill = am4core.color("#444");
  hand.stroke = am4core.color("#000");
  
  hand.events.on("positionchanged", function(){
    label.text = axis2.positionToValue(hand.currentPosition).toFixed(0);
    let value2 = axis.positionToValue(hand.currentPosition);
    let matchingGrade = lookUpGrade(axis.positionToValue(hand.currentPosition), data.gradingData);
     
    label.fill = am4core.color(matchingGrade.color);
  })
  
  setInterval(function() {
      let value = chartMin + Math.random() * (chartMax - chartMin);
      value.toFixed(0)
      hand.showValue(value, 1000, am4core.ease.cubicOut);
  }, 2000);
  
  }catch(e){}
    }