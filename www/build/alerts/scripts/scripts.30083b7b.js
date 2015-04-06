"use strict";var map,stagingSettings={};stagingSettings.firesLayerUrl="http://gis-potico.wri.org/arcgis/rest/services/Fires/FIRMS_ASEAN/MapServer/0",stagingSettings.subdistrictLayerUrl="http://gis-potico.wri.org/arcgis/rest/services/Fires/FIRMS_ASEAN/MapServer",stagingSettings.globalFiresLayerUrl="http://gis-potico.wri.org/arcgis/rest/services/Fires/Global_Fires/MapServer/4",stagingSettings.publicGeometryLayer="https://services.arcgis.com/hBEMHCkbQdfV906F/ArcGIS/rest/services/public_alert_areas_staging/FeatureServer/0",stagingSettings.alertServerHost="http://54.164.126.73";var productionSettings={};productionSettings.firesLayerUrl="http://gis-potico.wri.org/arcgis/rest/services/Fires/FIRMS_ASEAN/MapServer/0",productionSettings.subdistrictLayerUrl="http://gis-potico.wri.org/arcgis/rest/services/Fires/FIRMS_ASEAN/MapServer",productionSettings.globalFiresLayerUrl="http://gis-potico.wri.org/arcgis/rest/services/Fires/Global_Fires/MapServer/4",productionSettings.publicGeometryLayer="https://services.arcgis.com/hBEMHCkbQdfV906F/ArcGIS/rest/services/public_alert_areas/FeatureServer/0",productionSettings.alertServerHost="https://gfw-fires.wri.org";var settings=productionSettings,highlightAreas,firesFeatureLayer,userPolygonFeatureLayer,userPointsFeatureLayer,getUrlVariables=function(){for(var a=window.location.search.substring(1),b=a.split("&"),c={},d=0;d<b.length;d++){var e=b[d].split("=");c[e[0]]=e[1]}if("u"in c){var f=document.getElementById("unsubscribe-button");f.href=settings.alertServerHost+"/users/deactivate/"+c.u,f.style.visibility="visible"}return c},stylePolygons=function(){return{color:"red",weight:1,opacity:.6,fillOpacity:0}},stylePoints=function(a,b){if(a.properties.ACQ_DATE){var c=new Date(a.properties.ACQ_DATE);a.properties.ACQ_DATE=[c.getUTCMonth()+1,c.getUTCDate(),c.getUTCFullYear()].join("/")}var d=L.circleMarker(b,{color:"#FFFFFF",weight:1,opacity:1,fillOpacity:.9,fillColor:"#e4860c"});return d.setRadius(6),d},getUserInfo=function(a){var b=a.u,c=settings.alertServerHost+"/info/"+b+"/query";L.esri.get(c,{},onGetUserInfoComplete),"ids"in a&&zoomToFire(a.ids.split(","))},buildPointsLayer=function(a){var b={};return b.pointToLayer=stylePoints,b.where="OBJECTID IN ({})".replace("{}",getUrlVariables().ids),b.fields=["OBJECTID","LATITUDE","LONGITUDE","BRIGHTNESS","CONFIDENCE","ACQ_DATE","ACQ_TIME"],b.onEachFeature=function(b,c){var d='<span><h4 class="popup-title"><strong>FIRE {{name}}</strong></h4>'.replace("{{name}}",b.properties.OBJECTID);d+='<table class="marker-properties">',$.each(b.properties,function(b,c){"OBJECTID"!==b&&(d+="<tr><td><strong>{{key}}</strong></td><td>{{value}}</td></tr>".replace("{{key}}",a[b]).replace("{{value}}",c))}),d+="</table>",c.bindPopup(d)},L.esri.featureLayer(settings.globalFiresLayerUrl,b)},userAreas={},onGetUserInfoComplete=function(a,b){if("undefined"==typeof a){for(var c=[],d=b.features.length-1;d>=0;d--){var e=b.features[d].attributes;userAreas[e.public_fk]=e,e.public_fk&&c.push(e.public_fk.toString())}var f={};f.style=stylePolygons,f.where="FID IN ({})".replace("{}",c.join(",")),f.outFields="*",userPolygonFeatureLayer=L.esri.featureLayer(settings.publicGeometryLayer,f),userPolygonFeatureLayer.on("load",onUserPolygonLoad),map.addLayer(userPolygonFeatureLayer);var g=new XMLHttpRequest;g.onreadystatechange=function(){if(4==g.readyState&&200==g.status){var a={};JSON.parse(g.response).fields.forEach(function(b){a[b.name]=b.alias}),userPointsFeatureLayer=buildPointsLayer(a),map.addLayer(userPointsFeatureLayer)}},g.open("GET",settings.globalFiresLayerUrl+"/info?f=json",!1),g.send()}},onUserPolygonLoad=function(a){userPolygonFeatureLayer.off("load",onUserPolygonLoad),a.target.metadata(onUserPolygonLoadContinue)},onUserPolygonLoadContinue=function(){var a='<span><h4 class="popup-title"><strong>{area_name}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</strong></h4></span>';userPolygonFeatureLayer.bindPopup(function(b){return $.extend(b.properties,userAreas[b.properties.FID]),L.Util.template(a,b.properties)})},buildMap=function(){map=L.map("map").setView([0,120.68],5),map.addLayer(L.esri.basemapLayer("Imagery"),!0);var a=getUrlVariables();getUserInfo(a)},zoomToFire=function(a,b){var c=function(a,b){if("undefined"==typeof a){var c=L.geoJson(b.features),d=c.getBounds();map.fitBounds(d,{maxZoom:13})}else console.log(a)};if(0!==a.length){var d=settings.globalFiresLayerUrl,e="OBJECTID",f=a.join(","),g="{1} IN ({2})",h=g.replace("{1}",e).replace("{2}",f),i=L.esri.Tasks.query(d);i.where(h),i.run(c,b)}};$(document).ready(buildMap);