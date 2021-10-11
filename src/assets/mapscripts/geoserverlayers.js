
var polygons = [];
var routes = [];
var pois = [];
var customPolygons = [];
var railwayRoutes = [];
var railpoiLayer = [];

function AddRoutes() {
    try {
        // =========== esil 

        var route = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/wms',
                type: 'base',
                params: {
                    'LAYERS': 'India:ESIL_ROUTE',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //				 tileGrid: tileGrid
            })
        })


        map.addLayer(route);
        routes.push(route)


    } catch (e) { }


    //========= 300
    try {
        route = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/wms',
                type: 'base',
                params: {
                    'LAYERS': 'India:NEW_TADOBA_COM_BDY_new_core',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //				 tileGrid: tileGrid
            })
        })
        map.addLayer(route);

        routes.push(route);


        route = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/wms',
                type: 'base',
                params: {
                    'LAYERS': 'India:PF_AREA_CORE_TATR',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //				 tileGrid: tileGrid
            })
        })
        map.addLayer(route);

        routes.push(route);


        route = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/India/wms',
                type: 'base',
                params: {
                    'LAYERS': 'India:TATR_TOURISTROAD',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //				 tileGrid: tileGrid
            }),
            opacity: 0.6
        })
        map.addLayer(route);

        routes.push(route);


    } catch (e) { }
}

function AddPolygons() {
    // ========== esil	 
    try {
        //layer-6
        var polygon = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/wms',
                type: 'base',
                params: {
                    'LAYERS': 'India:ESIL_GEOFENCE',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //				 tileGrid: tileGrid
            })
        })


        map.addLayer(polygon);
        polygons.push(polygon)

        polygon = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/India/wms',
                type: 'base',
                params: {
                    'LAYERS': 'India:Bokaro-2',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //				 tileGrid: tileGrid
            }),
            opacity: 0.6
        })
        map.addLayer(polygon);

        polygons.push(polygon)


        polygon = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/India/wms',
                type: 'base',
                params: {
                    'LAYERS': 'India:BokaroLayout',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //				 tileGrid: tileGrid
            }),
            opacity: 0.6
        })

        map.addLayer(polygon);

        polygons.push(polygon)



        polygon = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/wms',
                type: 'base',
                params: {
                    'LAYERS': 'India:NEW_ROUND',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //			 tileGrid: tileGrid
            })
        })

        map.addLayer(polygon);

        polygons.push(polygon)


        polygon = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/wms',
                type: 'base',
                params: {
                    'LAYERS': 'India:bokaronew-polygon',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //				 tileGrid: tileGrid
            })
        });

        map.addLayer(polygon);

        polygons.push(polygon)

    } catch (e) { }


    //============1028
    try {



        polygon = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/cite/wms',
                type: 'base',
                params: {
                    'LAYERS': 'cite:Birla_Cement_Flayash',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //				 tileGrid: tileGrid
            })
        })
        map.addLayer(polygon);

        polygons.push(polygon)



    } catch (e) { }


    //================300
    try {

        polygon = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/wms',
                type: 'base',
                params: {
                    'LAYERS': 'India:DIVISION_BDY',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //				 tileGrid: tileGrid
            })
        })
        map.addLayer(polygon);

        polygons.push(polygon)


        polygon = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/wms',
                type: 'base',
                params: {
                    'LAYERS': 'India:TADOBA_BDY_core_new',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //				 tileGrid: tileGrid
            })
        })

        map.addLayer(polygon);

        polygons.push(polygon);


        polygon = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/wms',
                type: 'base',
                params: {
                    'LAYERS': 'India:RANGE_BDY',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //				 tileGrid: tileGrid
            })
        })
        map.addLayer(polygon);

        polygons.push(polygon);


        polygon = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/wms',
                type: 'base',
                params: {
                    'LAYERS': 'India:ROUND_BDY',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //				 tileGrid: tileGrid
            })
        })

        map.addLayer(polygon);

        polygons.push(polygon);


        polygon = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/wms',
                type: 'base',
                params: {
                    'LAYERS': 'India:BEAT_BDY',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //				 tileGrid: tileGrid
            })
        })
        map.addLayer(polygon);

        polygons.push(polygon);


        polygon = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/wms',
                type: 'base',
                params: {
                    'LAYERS': 'India:COMPTT_BDY',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //				 tileGrid: tileGrid
            })
        })
        map.addLayer(polygon);

        polygons.push(polygon);

        polygon = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/wms',
                type: 'base',
                params: {
                    'LAYERS': 'India:NEW_RANGE_core_new',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //				 tileGrid: tileGrid
            })
        })
        map.addLayer(polygon);

        polygons.push(polygon);


        polygon = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/wms',
                type: 'base',
                params: {
                    'LAYERS': 'India:NEW_ROUND',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //				 tileGrid: tileGrid
            })
        })
        map.addLayer(polygon);

        polygons.push(polygon);


        polygon = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/wms',
                type: 'base',
                params: {
                    'LAYERS': 'India:NEW_BEAT1',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //				 tileGrid: tileGrid
            })
        })
        map.addLayer(polygon);

        polygons.push(polygon);













        polygon = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/India/wms',
                type: 'base',
                params: {
                    'LAYERS': 'India:Bokaro-2',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //				 tileGrid: tileGrid
            }),
            opacity: 0.6
        })
        map.addLayer(polygon);

        polygons.push(polygon);
        polygon = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/India/wms',
                type: 'base',
                params: {
                    'LAYERS': 'India:BokaroLayout',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //				 tileGrid: tileGrid
            }),
            opacity: 0.6
        })
        map.addLayer(polygon);

        polygons.push(polygon);
    } catch (e) { }


    //========301

    try {


        polygon = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/India/wms',
                type: 'base',
                params: {
                    'LAYERS': 'India:Beat_Bdy_bhamragarh',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //				 tileGrid: tileGrid
            }),
            opacity: 0.6
        })
        map.addLayer(polygon);

        polygons.push(polygon);




        polygon = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/India/wms',
                type: 'base',
                params: {
                    'LAYERS': 'India:Comptt_Bdy_new',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //				 tileGrid: tileGrid
            }),
            opacity: 0.6
        })
        map.addLayer(polygon);

        polygons.push(polygon);


        polygon = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/India/wms',
                type: 'base',
                params: {
                    'LAYERS': 'India:Range_Bdy_new',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //				 tileGrid: tileGrid
            }),
            opacity: 0.6
        })
        map.addLayer(polygon);

        polygons.push(polygon);


        polygon = new ol.layer.Tile({
            extent: [-20037508, -20037508, 20037508, 20037508],
            source: new ol.source.TileWMS({
                url: 'http://209.51.202.250:8082/geoserver/India/wms',
                type: 'base',
                params: {
                    'LAYERS': 'India:Round_Bdy_new',
                    'TILED': true,
                    'CRS': 'EPSG:4326'
                },
                serverType: 'geoserver'
                //				 tileGrid: tileGrid
            }),
            opacity: 0.6
        })

        map.addLayer(polygon);

        polygons.push(polygon);

    } catch (e) { }

}

function AddGeoserverPoi() {

    var poi = new ol.layer.Tile({
        extent: [-20037508, -20037508, 20037508, 20037508],
        source: new ol.source.TileWMS({
            url: 'http://209.51.202.250:8082/geoserver/wms',
            type: 'base',
            params: {
                'LAYERS': 'India:Artificial_NEW_BUFFER',
                'TILED': true,
                'CRS': 'EPSG:4326'
            },
            serverType: 'geoserver'
            //				 tileGrid: tileGrid
        })
    })
    map.addLayer(poi);

    pois.push(poi);



    poi = new ol.layer.Tile({
        extent: [-20037508, -20037508, 20037508, 20037508],
        source: new ol.source.TileWMS({
            url: 'http://209.51.202.250:8082/geoserver/wms',
            type: 'base',
            params: {
                'LAYERS': 'India:Artificial_CORE_new_2015',
                'TILED': true,
                'CRS': 'EPSG:4326'
            },
            serverType: 'geoserver'
            //				 tileGrid: tileGrid
        })
    })
    map.addLayer(poi);

    pois.push(poi);



    poi = new ol.layer.Tile({
        extent: [-20037508, -20037508, 20037508, 20037508],
        source: new ol.source.TileWMS({
            url: 'http://209.51.202.250:8082/geoserver/wms',
            type: 'base',
            params: {
                'LAYERS': 'India:Natural_CORE_new_2015',
                'TILED': true,
                'CRS': 'EPSG:4326'
            },
            serverType: 'geoserver'
            //				 tileGrid: tileGrid
        })
    })
    map.addLayer(poi);

    pois.push(poi);



    poi = new ol.layer.Tile({
        extent: [-20037508, -20037508, 20037508, 20037508],
        source: new ol.source.TileWMS({
            url: 'http://209.51.202.250:8082/geoserver/wms',
            type: 'base',
            params: {
                'LAYERS': 'India:Natural_NEW_BUFFER',
                'TILED': true,
                'CRS': 'EPSG:4326'
            },
            serverType: 'geoserver'
            //				 tileGrid: tileGrid
        })
    })
    map.addLayer(poi);

    pois.push(poi);



    poi = new ol.layer.Tile({
        extent: [-20037508, -20037508, 20037508, 20037508],
        source: new ol.source.TileWMS({
            url: 'http://209.51.202.250:8082/geoserver/wms',
            type: 'base',
            params: {
                'LAYERS': 'India:Protection_Hut_Buffer',
                'TILED': true,
                'CRS': 'EPSG:4326'
            },
            serverType: 'geoserver'
            //				 tileGrid: tileGrid
        })
    })
    map.addLayer(poi);

    pois.push(poi);



    poi = new ol.layer.Tile({
        extent: [-20037508, -20037508, 20037508, 20037508],
        source: new ol.source.TileWMS({
            url: 'http://209.51.202.250:8082/geoserver/wms',
            type: 'base',
            params: {
                'LAYERS': 'India:Protection_Hut_Core',
                'TILED': true,
                'CRS': 'EPSG:4326'
            },
            serverType: 'geoserver'
            //				 tileGrid: tileGrid
        })
    })
    map.addLayer(poi);

    pois.push(poi);



    polygon = new ol.layer.Tile({
        extent: [-20037508, -20037508, 20037508, 20037508],
        source: new ol.source.TileWMS({
            url: 'http://209.51.202.250:8082/geoserver/wms',
            type: 'base',
            params: {
                'LAYERS': 'India:TOURIST_ENTRY_GATE_BUFFER_NEW1',
                'TILED': true,
                'CRS': 'EPSG:4326'
            },
            serverType: 'geoserver'
            //				 tileGrid: tileGrid
        })
    })
    map.addLayer(poi);

    pois.push(poi);



    polygon = new ol.layer.Tile({
        extent: [-20037508, -20037508, 20037508, 20037508],
        source: new ol.source.TileWMS({
            url: 'http://209.51.202.250:8082/geoserver/wms',
            type: 'base',
            params: {
                'LAYERS': 'India:TOURIST_ENTRY_GATE_CORE_NEW',
                'TILED': true,
                'CRS': 'EPSG:4326'
            },
            serverType: 'geoserver'
            //				 tileGrid: tileGrid
        })
    })
    map.addLayer(poi);

    pois.push(poi);



}


function PlotPolygon(coord, name, color) {
    //coord,name,color

    var styles = [

        new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#8a8b94',
                width: 3,
            }),
            fill: new ol.style.Fill({
                color: '#484e906b',
            }),
        }),
        new ol.style.Style({
            image: new ol.style.Circle({
                radius: 1,
                fill: new ol.style.Fill({
                    color: 'orange',
                }),
            }),
            geometry: function (feature) {
                // return the coordinates of the first ring of the polygon
                var coordinates = feature.getGeometry().getCoordinates()[0];
                return new ol.geom.MultiPoint(coordinates);
            },
        })];

    var geojsonObject = {
        'type': 'FeatureCollection',
        'crs': {
            'type': 'name',
            'properties': {
                'name': 'EPSG:3857',
                'data': 'slfjsdjflk'
            },
        },
        'features': [
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [coord]
                },
            }],
    };

    // console.log("geoson Features  "+JSON.stringify(geojsonObject.features[0]))
    var customfeature = new ol.format.GeoJSON().readFeatures(geojsonObject)

    // customfeature.setProperties("dsfhjosdhjf");
    var source = new ol.source.Vector({
        features: customfeature,
    });

    var custompolygonLayer = new ol.layer.Vector({
        source: source,
        opacity: 0.5,
        style: styles,
    });

    try { map.addLayer(custompolygonLayer) } catch (e) { }

    customPolygons.push(custompolygonLayer);

}









function PlotRoute(latlon) {


    // ======= Single Line  ====

    var lineString = new ol.geom.LineString(latlon);
    lineString.transform('EPSG:4326', 'EPSG:3857');
    var feature = new ol.Feature({
        geometry: lineString
    });

    var coordi = feature.getGeometry().getCoordinates()
    //     try{ FlyTo(coordi[0], function() {})}catch(e){}

    var lineStyle = new ol.style.Style({
        fill: new ol.style.Fill({
            color: [203, 194, 185, 1]
        }),
        stroke: new ol.style.Stroke({
            color: '#635e57',
            width: 1,
            lineCap: 'round'
        }),
    });


    var feature2 = new ol.Feature({
        geometry: lineString
    });
    //					     



    function scribbleStyle(feature, resolution) {
        var a = feature.get('angle') || Math.random() * Math.PI;
        feature.set('angle', a)

        // Calculate step according to resolution
        var maxres = 100;
        //   var res=resolution/150
        //    console.log(res)
        var step = Math.max(8 * maxres, 8 * resolution);
        var width;
        if (resolution > 5) {
            width = Math.max(1, maxres / resolution);
        } else {
            width = 18
        }
        // cache scribble geom in the feature to prevent calculating
        var scribble = feature._scribble;

        return [
            new ol.style.Style({
                stroke: new ol.style.Stroke({
                    width: .5,
                    color: [255, 255, 0, 0.2]
                })
            }),
            new ol.style.Style({
                stroke: new ol.style.Stroke({
                    width: width,
                    color: [255, 255, 0, 0.2]//'#ffff007d'//'rgba(23,28,28,0.59])'//'#635e57'//
                }),
                geometry: lineString
            })
        ];
    };

    feature2.setStyle(scribbleStyle)
    // feature2.setStyle(function(feature, resolution) {
    //     lineStyle2./Math.pow(resolution, 1/3));
    //     return liveStyle;
    // });



    // feature.setStyle(lineStyle);





    var routeSource = new ol.source.Vector({
        features: [feature2]

    });


    var routeLayer = new ol.layer.Vector({
        source: routeSource
    });



    //========= Dashline  =====

    map.addLayer(routeLayer);
    //routeLayer.setOpacity(0.3)

    railwayRoutes.push(routeLayer)
}





function PlotRailPoi(icon, latlon, details) {


    //try{ FlyTo(myCoord, function() {})}catch{}

    var liveFeature = new ol.Feature({

        geometry: new ol.geom.Point(ol.proj.transform(
            latlon, 'EPSG:4326', 'EPSG:3857')),

    });




    // Points
    var liveStyle = function pointStyleFunction(feature, resolution) {
        return new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 20],
                scale: 1 / Math.pow(resolution, 1 / 3),
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                src: icon
            }),
            text: createTextStyle(feature, resolution),
        });
    }
    liveFeature.setProperties(details)










    liveFeature.setStyle(liveStyle);




    vectorrailpoisource = new ol.source.Vector({
        //features: iconFeaturesAll
    });
    vectorrailpoisource.addFeature(liveFeature);


    vectorrailpoilayer = new ol.layer.Vector({
        source: vectorrailpoisource
    });

    map.addLayer(vectorrailpoilayer);

    railpoiLayer.push(vectorrailpoilayer)


}










