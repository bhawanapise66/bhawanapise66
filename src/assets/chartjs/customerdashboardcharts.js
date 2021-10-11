


        function VehicleChart(div,data,colorarray){
                  
            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            // Create chart instance
            var chart = am4core.create(div, am4charts.PieChart);

            // Add and configure Series
            var pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "value";
            pieSeries.dataFields.category = "label";

            // Let's cut a hole in our Pie chart the size of 30% the radius
            chart.innerRadius = am4core.percent(50);

            // Put a thick white border around each Slice
            pieSeries.slices.template.stroke = am4core.color("#fff");
            pieSeries.slices.template.strokeWidth = 2;
            pieSeries.slices.template.strokeOpacity = 1;
            pieSeries.slices.template
              // change the cursor on hover to make it apparent the object can be interacted with
              .cursorOverStyle = [
                {
                  "property": "cursor",
                  "value": "pointer"
                }
              ];

            pieSeries.alignLabels = false;
            pieSeries.labels.template.bent = true;
            pieSeries.labels.template.radius = 3;
            pieSeries.labels.template.padding(0,0,0,0);
            pieSeries.labels.template.text = "{category}";

            var colorSet = new am4core.ColorSet();
            colorSet.list = colorarray.map(function(color) {
              return  am4core.color(color);
            });
            pieSeries.colors = colorSet;

            // Create a base filter effect (as if it's not there) for the hover to return to
            var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
            shadow.opacity = 0;

            // Create hover state
            var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

            // Slightly shift the shadow and make it more prominent on hover
            var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
            hoverShadow.opacity = 0.7;
            hoverShadow.blur = 5;

            // Add a legend

            chart.data = data;
}


      function LiveVehicleChart(div,data){

                
              // Themes begin
              am4core.useTheme(am4themes_animated);
              // Themes end

              // Create chart instance
              var chart = am4core.create(div, am4charts.XYChart3D);
              chart.paddingBottom = 30;
              chart.angle = 35;

              // Add data
              chart.data = data;

              // Create axes
              var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
              categoryAxis.dataFields.category = "label";
              categoryAxis.renderer.grid.template.location = 0;
              categoryAxis.renderer.minGridDistance = 40;
              categoryAxis.renderer.inside = true;
              categoryAxis.renderer.grid.template.disabled = false;

              let labelTemplate = categoryAxis.renderer.labels.template;
              labelTemplate.rotation = -90;
              labelTemplate.horizontalCenter = "left";
              labelTemplate.verticalCenter = "middle";
              labelTemplate.dy = 10; // moves it a bit down;
              labelTemplate.inside = false; // this is done to avoid settings which are not suitable when label is rotated

              var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
              valueAxis.renderer.grid.template.disabled = false;

              // Create series
              var series = chart.series.push(new am4charts.ConeSeries());
              series.dataFields.valueY = "value";
              series.dataFields.categoryX = "label";

              var columnTemplate = series.columns.template;

              columnTemplate.adapter.add("fill", function(fill, target) {
                if(target.dataItem.index==0){
                  return am4core.color("#5abccc");
                }else if(target.dataItem.index==1){
                  return am4core.color("#3d4ecc");
                }else if(target.dataItem.index==2){
                  return am4core.color("#c13aca");
                }else if(target.dataItem.index==3){
                  return am4core.color("#6a905e");
                }
              
              });
              columnTemplate.adapter.add("stroke", function(stroke, target) {
                if(target.dataItem.index==0){
                  return am4core.color("#5abccc");
                }else if(target.dataItem.index==1){
                  return am4core.color("#3d4ecc");
                }else if(target.dataItem.index==2){
                  return am4core.color("#c13aca");
                }else if(target.dataItem.index==3){
                  return am4core.color("#6a905e");
                }
              })
      }


