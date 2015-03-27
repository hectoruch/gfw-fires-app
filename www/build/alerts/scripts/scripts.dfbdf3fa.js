"use strict";var map,stagingSettings={};stagingSettings.firesLayerUrl="http://gis-potico.wri.org/arcgis/rest/services/Fires/FIRMS_ASEAN/MapServer/0",stagingSettings.subdistrictLayerUrl="http://gis-potico.wri.org/arcgis/rest/services/Fires/FIRMS_ASEAN/MapServer",stagingSettings.globalFiresLayerUrl="http://gis-potico.wri.org/arcgis/rest/services/Fires/Global_Fires/MapServer/4",stagingSettings.publicGeometryLayer="https://services.arcgis.com/hBEMHCkbQdfV906F/ArcGIS/rest/services/public_alert_areas_staging/FeatureServer/0",stagingSettings.alertServerHost="http://54.164.126.73";var productionSettings={};productionSettings.firesLayerUrl="http://gis-potico.wri.org/arcgis/rest/services/Fires/FIRMS_ASEAN/MapServer/0",productionSettings.subdistrictLayerUrl="http://gis-potico.wri.org/arcgis/rest/services/Fires/FIRMS_ASEAN/MapServer",productionSettings.globalFiresLayerUrl="http://gis-potico.wri.org/arcgis/rest/services/Fires/Global_Fires/MapServer/4",productionSettings.publicGeometryLayer="https://services.arcgis.com/hBEMHCkbQdfV906F/ArcGIS/rest/services/public_alert_areas/FeatureServer/0",productionSettings.alertServerHost="http://gfw-fires.wri.org";var settings=productionSettings,highlightAreas,firesFeatureLayer,userPolygonFeatureLayer,dateWhereClause,mapMode,GFW_FIRES="gfwfires",COMMODITIES="commodities",getUrlVariables=function(){for(var a=window.location.search.substring(1),b=a.split("&"),c={},d=0;d<b.length;d++){var e=b[d].split("=");c[e[0]]=e[1]}if("u"in c){var f=document.getElementById("unsubscribe-button");f.href=settings.alertServerHost+"/users/deactivate/"+c.u,f.style.visibility="visible"}return c},customFirePointsToLayer=function(a,b){if(a.properties.ACQ_DATE){var c=new Date(a.properties.ACQ_DATE);a.properties.ACQ_DATE=[c.getUTCMonth()+1,c.getUTCDate(),c.getUTCFullYear()].join("/")}var d=L.circleMarker(b,{color:"#FFFFFF",weight:1,opacity:1,fillOpacity:.9,fillColor:"#e4860c"});return d.setRadius(6),d},firesToLayer=function(a,b){var c;if(a.properties.peat=1===a.properties.peat?"Yes":"No",a.properties.ACQ_DATE){var d=new Date(a.properties.ACQ_DATE);a.properties.ACQ_DATE=[d.getUTCMonth()+1,d.getUTCDate(),d.getUTCFullYear()].join("/")}return"y"===a.properties.HIGH_CONF?(c=L.circleMarker(b,{color:"#FFFFFF",weight:1,opacity:1,fillOpacity:.9,fillColor:"#e4860c"}),c.setRadius(6),c):(c=L.circleMarker(b,{color:"#FFFFFF",weight:1,opacity:1,fillOpacity:.9,fillColor:"#ffb62a"}),c.setRadius(6),c)},stylePolygons=function(){return{color:"red",weight:1,opacity:.6,fillOpacity:0}},continueFireLoad=function(a,b){var c=["LATITUDE","LONGITDUE","BRIGHTNESS","ACQUISITION DATE","ACQUISITION TIME","CONFIDENCE","PEAT (Yes or No)"],d='<span><h4 class="popup-title"><strong>FIRE {OBJECTID}</strong> ({SUBDISTRIC})</h4>';d+='<table class="marker-properties">';for(var e,f=b.fields.length-1;f>=0;f--)e=b.fields[f],c.indexOf(e.alias)>-1&&(d+="<tr><td><strong>{{key}}</strong></td><td>{{{value}}}</td></tr>".replace("{{key}}",e.alias).replace("{{value}}",e.name));d+="</table>",firesFeatureLayer.bindPopup(function(a){return L.Util.template(d,a.properties)}),console.log("about to zoom"),zoomToFire(highlightAreas)},firesOnLoad=function(a){firesFeatureLayer.off("load",firesOnLoad),a.target.metadata(continueFireLoad)},buildAreasMap=function(a){highlightAreas=a.areas.split(",");var b;b=highlightAreas&&highlightAreas.length?"ID_KEC IN ('{}')".replace("{}",highlightAreas.join("','")):"1=1",dateWhereClause&&(b+=" AND "+dateWhereClause,console.log(b));var c={};c.where=b,c.pointToLayer=firesToLayer,firesFeatureLayer=L.esri.featureLayer(settings.firesLayerUrl,c),map.addLayer(firesFeatureLayer),zoomToFire(highlightAreas);var d=L.esri.dynamicMapLayer(settings.subdistrictLayerUrl,{opacity:.75,layers:[6],useCors:!0,position:"back",minZoom:8});map.addLayer(d),firesFeatureLayer.on("load",firesOnLoad)},buildCustomPolygonMap=function(a){var b=a.u,c=settings.alertServerHost+"/info/"+b+"/query";L.esri.get(c,{},onGetUserInfoComplete),"ids"in a&&zoomToFire(a.ids.split(","))},userAreas={},onGetUserInfoComplete=function(a,b){if("undefined"==typeof a){for(var c=[],d=b.features.length-1;d>=0;d--){var e=b.features[d].attributes;userAreas[e.public_fk]=e,e.public_fk&&c.push(e.public_fk.toString())}var f={};f.style=stylePolygons,f.where="FID IN ({})".replace("{}",c.join(",")),f.outFields="*",userPolygonFeatureLayer=L.esri.featureLayer(settings.publicGeometryLayer,f),map.addLayer(userPolygonFeatureLayer),userPolygonFeatureLayer.on("load",onUserPolygonLoad)}},onUserPolygonLoad=function(a){userPolygonFeatureLayer.off("load",onUserPolygonLoad),a.target.metadata(onUserPolygonLoadContinue)},onUserPolygonLoadContinue=function(){userPolygonFeatureLayer.eachFeature(getGlobalFires);var a='<span><h4 class="popup-title"><strong>{area_name}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</strong></h4></span>';userPolygonFeatureLayer.bindPopup(function(b){return $.extend(b.properties,userAreas[b.properties.FID]),L.Util.template(a,b.properties)}),getGlobalFires(userPolygonFeatureLayer)},buildMap=function(){map=L.map("map").setView([0,120.68],5),map.addLayer(L.esri.basemapLayer("Imagery"),!0);var a=getUrlVariables();"d"in a&&(dateWhereClause=unescape(a.d).indexOf(":")>-1?unescape(a.d):"ACQ_DATE = "+unescape(a.d)),"areas"in a?(mapMode=GFW_FIRES,buildAreasMap(a)):"u"in a&&(mapMode=COMMODITIES,buildCustomPolygonMap(a))},getGlobalFires=function(a){var b={};b.returnGeometry=!0,b.spatialRel="esriSpatialRelIntersects",b.geometryType="esriGeometryPolygon",b.outSR=4326,b.inSR=4326,b.outFields=["LATITUDE","LONGITUDE","BRIGHTNESS","ACQ_DATE","BRIGHTNESS","OBJECTID"].join(","),dateWhereClause&&(b.where=dateWhereClause),a.feature&&(b.geometry=L.esri.Util.geojsonToArcGIS(a.feature.geometry,"FID"),L.esri.post(settings.globalFiresLayerUrl+"/query",b,onGetGlobalFiresComplete))},onGetGlobalFiresComplete=function(a,b){if("undefined"==typeof a){var c=L.esri.Util.responseToFeatureCollection(b),d=b.fieldAliases,e={};if(e.pointToLayer=customFirePointsToLayer,e.onEachFeature=function(a,b){var c='<span><h4 class="popup-title"><strong>FIRE {{name}}</strong></h4>'.replace("{{name}}",a.properties.OBJECTID);c+='<table class="marker-properties">',$.each(a.properties,function(a,b){"OBJECTID"!==a&&(c+="<tr><td><strong>{{key}}</strong></td><td>{{value}}</td></tr>".replace("{{key}}",d[a]).replace("{{value}}",b))}),c+="</table>",b.bindPopup(c)},c.features.length>0){var f=L.geoJson(c,e);map.addLayer(f)}}else console.log(a)},zoomToFire=function(a,b){var c=function(a,b){if("undefined"==typeof a){var c=L.geoJson(b.features),d=c.getBounds();map.fitBounds(d,{maxZoom:13})}else console.log(a)};if(0!==a.length){var d=mapMode===COMMODITIES?settings.globalFiresLayerUrl:settings.firesLayerUrl,e=mapMode===COMMODITIES?"OBJECTID":"ID_KEC",f=a.join(mapMode===COMMODITIES?",":"','"),g=mapMode===COMMODITIES?"{1} IN ({2})":"{1} IN ('{2}')",h=g.replace("{1}",e).replace("{2}",f);dateWhereClause&&console.log(h),console.log(h);var i=L.esri.Tasks.query(d);i.where(h),i.run(c,b)}};$(document).ready(buildMap);