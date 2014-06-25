/* global define, alert */
define([
    "dojo/dom",
    "dojo/_base/array",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/geometry/webMercatorUtils",
    "esri/symbols/PictureMarkerSymbol",
    "views/map/MapConfig",
    "views/map/MapModel"
], function(dom, arrayUtils, Graphic, Point, webMercatorUtils, PictureSymbol, MapConfig, MapModel) {
    var _map;
    return {

        setMap: function(map) {
            _map = map;
        },

        searchAreaByCoordinates: function() {
            var values = {},
                latitude, longitude,
                invalidValue = false,
                invalidMessage = "You did not enter a valid value.  Please check that your location values are all filled in and nubmers only.",
                symbol = new PictureSymbol('app/images/RedStickPin.png', 32, 32),
                attributes = {},
                point,
                graphic,
                getValue = function(value) {
                    if (!invalidValue) {
                        invalidValue = isNaN(parseInt(value));
                    }
                    return isNaN(parseInt(value)) ? 0 : parseInt(value);
                },
                nextAvailableId = function() {
                    var value = 0;
                    arrayUtils.forEach(_map.graphics.graphics, function(g) {
                        if (g.attribtues) {
                            if (g.attributes.locatorValue) {
                                value = Math.max(value, parseInt(g.attributes.locatorValue));
                            }
                        }
                    });
                    return value;
                };

            // If the DMS Coords View is present, get the appropriate corrdinates and convert them
            if (MapModel.get('showDMSInputs')) {
                values.dlat = getValue(dom.byId('degreesLatInput').value);
                values.mlat = getValue(dom.byId('minutesLatInput').value);
                values.slat = getValue(dom.byId('secondsLatInput').value);
                values.dlon = getValue(dom.byId('degreesLonInput').value);
                values.mlon = getValue(dom.byId('minutesLonInput').value);
                values.slon = getValue(dom.byId('secondsLonInput').value);
                latitude = values.dlat + (values.mlat / 60) + (values.slat / 3600);
                longitude = values.dlon + (values.mlon / 60) + (values.slon / 3600);
            } else { // Else, get LatLong Coordinates and Zoom to them
                latitude = getValue(dom.byId('latitudeInput').value);
                longitude = getValue(dom.byId('longitudeInput').value);
            }

            if (invalidValue) {
                alert(invalidMessage);
            } else {
                point = webMercatorUtils.geographicToWebMercator(new Point(longitude, latitude));
                attributes.locatorValue = nextAvailableId();
                attributes.id = 'LOCATOR_' + attributes.locatorValue;
                graphic = new Graphic(point, symbol, attributes);
                _map.graphics.add(graphic);
                _map.centerAndZoom(point, 7);
                MapModel.set('showClearPinsOption', true);
            }
        },

        fetchTwitterData: function(evt) {
            var target = evt.target ? evt.target : evt.srcElement;
            if (!target.checked) {
                return;
            }



        },

        mapclick: function(event) {
            var mapconfig = Config.getConfig();
            require(["esri/tasks/IdentifyTask", "esri/tasks/IdentifyParameters"], function(IdentifyTask, IdentifyParameters) {

                var map = _map;
                targetLayer = map.getLayer(mapconfig.additionalPolyLayers.en.id),
                visLayers = [],
                isVisLayers = targetLayer.visibleLayers.indexOf(10) > -1 || map.getLayer(mapconfig.additionalProtectedLayer.en.id).visible || targetLayer.visibleLayers.indexOf(26) > -1 || targetLayer.visibleLayers.indexOf(27) > -1 || targetLayer.visibleLayers.indexOf(28) > -1 || targetLayer.visibleLayers.indexOf(32) > -1,
                visible = targetLayer.visible;

                arrayUtil.forEach(targetLayer.visibleLayers, function(lid) {
                    visLayers.push(lid);
                });

                if (map.getLayer(mapconfig.additionalProtectedLayer.en.id).visible) {
                    visLayers.push(25);
                }

                Array.prototype.move = function(from, to) {
                    this.splice(to, 0, this.splice(from, 1)[0]);
                };
                visLayers.move(visLayers.indexOf(27), 0);

                if (isVisLayers) {

                    var identifyTask = new IdentifyTask(targetLayer.url);

                    identifyParams = new IdentifyParameters();
                    identifyParams.tolerance = 3;
                    identifyParams.returnGeometry = true;
                    identifyParams.layerIds = visLayers;
                    identifyParams.width = map.width;
                    identifyParams.height = map.height;
                    identifyParams.geometry = event.mapPoint;
                    identifyParams.mapExtent = map.extent;
                    identifyTask.execute(identifyParams, function(response) {
                        var node = response[0];
                        if (node) {
                            content = "<div id='closePopup' class='close-icon'></div><table id='infoWindowTable'>";

                            if (node.layerId == 25) {
                                content += "<tr class='infoName'><td colspan='2'>" + node.feature.attributes.NAME + "</td></tr>";
                                content += "<tr><td>Local Name</td><td>" + node.feature.attributes.ORIG_NAME + "</td></tr>";
                                content += "<tr><td>Legal Designation</td><td>" + node.feature.attributes.DESIG_ENG + "</td></tr>";
                                content += "<tr><td>WDPA ID</td><td>" + node.feature.attributes.WDPAID + "</td></tr>";
                            } else if (node.layerId == 27) {
                                content += "<tr class='infoName'><td colspan='2'>" + node.feature.attributes.NAME + "</td></tr>";
                                content += "<tr><td>Concession Type</td><td>" + node.feature.attributes.TYPE + "</td></tr>";
                                content += "<tr><td>Country</td><td>" + node.feature.attributes.Country + "</td></tr>";
                                content += "<tr><td>Group</td><td>" + node.feature.attributes.GROUP_NAME + "</td></tr>";
                                content += "<tr><td>Certification Status</td><td>" + node.feature.attributes.CERT_STAT + "</td></tr>";
                                content += "<tr><td>GIS Calculated Area (ha)</td><td>" + node.feature.attributes.AREA_HA + "</td></tr>";
                                content += "<tr><td>Certificate ID</td><td>" + node.feature.attributes.Certificat + "</td></tr>";
                                content += "<tr><td>Certificate Issue Date</td><td>" + node.feature.attributes.Issued + "</td></tr>";
                                content += "<tr><td>Certificate Expiry Date</td><td>" + node.feature.attributes.Expired + "</td></tr>";
                                content += "<tr><td>Mill name</td><td>" + node.feature.attributes.Mill + "</td></tr>";
                                content += "<tr><td>Mill location</td><td>" + node.feature.attributes.Location + "</td></tr>";
                                content += "<tr><td>Mill capacity (t/hour)</td><td>" + node.feature.attributes.Capacity + "</td></tr>";
                                content += "<tr><td>Certified CPO (mt)</td><td>" + node.feature.attributes.CPO + "</td></tr>";
                                content += "<tr><td>Certified PK (mt)</td><td>" + node.feature.attributes.PK + "</td></tr>";
                                //content += "<tr><td>Certified PKO (mt)</td><td>" + node.feature.attributes.PKO + "</td></tr>";
                                content += "<tr><td>Estate Suppliers</td><td>" + node.feature.attributes.Estate + "</td></tr>";
                                content += "<tr><td>Estate Area (ha)</td><td>" + node.feature.attributes.Estate_1 + "</td></tr>";
                                content += "<tr><td>Outgrower Area (ha)</td><td>" + node.feature.attributes.Outgrowe + "</td></tr>";
                                content += "<tr><td>Scheme Smallholder Area (ha)</td><td>" + node.feature.attributes.SH + "</td></tr>";
                                // content += "<tr><td>NPP Area (ha)</td><td>" + node.feature.attributes.NPP_Area + "</td></tr>";
                                //content += "<tr><td>HCV Area (ha)</td><td>" + node.feature.attributes.HCV_Area + "</td></tr>";
                            } else {
                                content += "<tr class='infoName'><td colspan='2'>" + node.feature.attributes.NAME + "</td></tr>";
                                content += "<tr><td>Concession Type</td><td>" + node.feature.attributes.TYPE + "</td></tr>";
                                content += "<tr><td>Country</td><td>" + node.feature.attributes.Country + "</td></tr>";
                                content += "<tr><td>Group</td><td>" + node.feature.attributes.GROUP_NAME + "</td></tr>";
                                content += "<tr><td>Certification Status</td><td>" + node.feature.attributes.CERT_STAT + "</td></tr>";
                                content += "<tr><td>GIS Calculated Area (ha)</td><td>" + node.feature.attributes.AREA_HA + "</td></tr>";
                            }
                            content += "<tr><td>Source: </td><td>" + (node.feature.attributes.Source || "N/A") + "</td></tr>";
                            content += "</table>";

                            map.infoWindow.setContent(content);
                            map.infoWindow.show(event.mapPoint);
                            on.once(dom.byId("closePopup"), "click", function() {
                                map.infoWindow.hide();
                            });
                        }
                    }, function(errback) {
                        console.dir(errback);
                    });

                }
                // map.infoWindow.show();
            });
        }

    };

});