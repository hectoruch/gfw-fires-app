/*! Global-Forest-Watch-Fires Mon Dec 01 2014 10:54:58 */
define(["dojo/on","dojo/dom","dojo/query","dojo/dom-construct","dojo/number","dojo/dom-class","dojo/_base/array","dojo/_base/fx","esri/map","esri/config","esri/dijit/HomeButton","esri/geometry/Point","esri/dijit/BasemapGallery","esri/dijit/Basemap","esri/dijit/BasemapLayer","esri/dijit/LocateButton","esri/dijit/Geocoder","esri/dijit/Legend","esri/dijit/Scalebar","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/ArcGISImageServiceLayer","esri/layers/ImageParameters","esri/layers/FeatureLayer","esri/geometry/webMercatorUtils","esri/geometry/Extent","esri/InfoTemplate","esri/graphic","esri/urlUtils","dijit/registry","views/map/MapConfig","views/map/MapModel","views/map/LayerController","views/map/WindyController","views/map/Finder","views/report/ReportOptionsController","utils/DijitFactory","modules/EventsController","esri/request","esri/tasks/PrintTask","esri/tasks/PrintParameters","esri/tasks/PrintTemplate","views/map/DigitalGlobeTiledLayer","views/map/DigitalGlobeServiceLayer","views/map/BurnScarTiledLayer","modules/HashController","esri/layers/GraphicsLayer","esri/layers/ImageServiceParameters","dijit/Dialog"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V){var W={},X=!1,Y={viewId:"mapView",viewName:"map"};return W.mapExtentPausable,W.init=function(){var a=this;return X?(W.map.resize(),void K.switchToView(Y)):(X=!0,void require(["dojo/text!views/map/map.html","dojo/ready"],function(c,d){b.byId(Y.viewId).innerHTML=c,K.switchToView(Y),d(function(){E.applyBindings("map-view"),addthis.init(),a.addConfigurations(),a.createMap()})}))},W.centerChange=function(){if(W.map){var b=x.webMercatorToGeographic(W.map.extent),c=e.round(b.getCenter().x,2),d=e.round(b.getCenter().y,2),f=W.map.getLevel(),g=S.newState,h=parseFloat(g.x)!=c||parseFloat(g.y)!=d||parseInt(g.l)!=f;if(h){W.mapExtentPausable.pause(),a.once(W.map,"extent-change",function(){W.mapExtentPausable.resume()});var i=x.geographicToWebMercator(new l(parseFloat(g.x),parseFloat(g.y)));W.map.centerAndZoom(i,parseInt(g.l))}}},W.addConfigurations=function(){var a=D.proxies,b=document.location.href,c="/proxy/proxy.ashx";for(var d in a)0===b.indexOf(d)&&(c=a[d],j.defaults.io.proxyUrl=a[d]);B.addProxyRule({urlPrefix:"https://services.digitalglobe.com/",proxyUrl:c}),B.addProxyRule({urlPrefix:D.landsat8.prefix,proxyUrl:c}),j.defaults.io.corsEnabledServers.push(D.windData.domain)},W.createMap=function(){var b=this;J.buildDijits(D.reportOptionsDijits),J.buildDijits(D.accordionDijits);var c=S.newState.x,d=S.newState.y,f=S.newState.l;W.map=new i("map",{center:[c,d],zoom:f,basemap:D.mapOptions.basemap,minZoom:D.mapOptions.minZoom,maxZoom:D.mapOptions.maxZoom,sliderPosition:D.mapOptions.sliderPosition}),W.map.on("load",function(){$("#firesDateFrom").datepicker("setDate","6/1/2014"),$("#noaaDateFrom").datepicker("setDate","10/22/2014"),$("#indoDateFrom").datepicker("setDate","1/1/2013"),W.map.graphics.clear(),E.vm.windPicker(),C.byId("fires-map-accordion").resize(),G.setMap(W.map),F.setMap(W.map),H.setMap(W.map),b.addWidgets(),b.bindEvents(),b.addLayers(),a.once(W.map,"update-end",function(){W.map.centerAt(new l(c,d)).then(function(){setTimeout(function(){W.mapExtentPausable.resume()},1e3)})}),W.map.resize()}),W.mapExtentPausable=a.pausable(W.map,"extent-change",function(a){var b=(a.delta,x.webMercatorToGeographic(a.extent)),c=(a.levelChange,a.lod),d=(a.target,e.round(b.getCenter().x,2)),f=e.round(b.getCenter().y,2);S.updateHash({x:d,y:f,l:c.level})}),W.mapExtentPausable.pause()},W.addWidgets=function(){var c,e,f,g,h,i,j,l=[];c=new s({map:W.map,scalebarUnit:"metric"}),d.create("div",{id:"home-button","class":"home-button"},document.querySelector(".esriSimpleSliderIncrementButton"),"after"),i=new k({map:W.map},"home-button"),i.startup(),e=new n({layers:[new o({url:D.mapOptions.darkGrayCanvas})],id:"darkgray",title:"Dark Gray Canvas",thumbnailUrl:"app/images/darkGreyThumb.jpg"}),l.push(e),j=new m({map:W.map,basemaps:l,showArcGISBasemaps:!0},"basemap-gallery"),j.startup(),g=new p({map:W.map,highlightLocation:!1},"location-widget"),g.startup(),f=new q({map:W.map},"esri-geocoder-widget"),f.startup(),h=new r({map:W.map,layerInfos:[],autoUpdate:!0},"legend"),h.startup();var t=function(){E.get("showBasemapGallery")&&E.set("showBasemapGallery",!1),E.get("showShareContainer")&&E.set("showShareContainer",!1),E.set("showLocatorWidgets",!E.get("showLocatorWidgets"))},u=function(){E.get("showLocatorWidgets")&&E.set("showLocatorWidgets",!1),E.get("showShareContainer")&&E.set("showShareContainer",!1),E.set("showBasemapGallery",!E.get("showBasemapGallery"))},v=function(){E.get("showLocatorWidgets")&&E.set("showLocatorWidgets",!1),E.get("showBasemapGallery")&&E.set("showBasemapGallery",!1),E.set("showShareContainer",!E.get("showShareContainer"))};a(b.byId("locator-widget-button"),"click",t),a(b.byId("basemap-gallery-button"),"click",u),a(b.byId("share-button"),"click",v),this.initTransparency()},W.initTransparency=function(){["forest-transparency-slider","conservation-transparency-slider","land-cover-transparency-slider"].map(function(a){dijit.byId(a).set("value",70)})},W.bindEvents=function(){var e=this;a(b.byId("dms-search"),"change",function(a){var b=a.target?a.target.checked:a.srcElement.checked;b&&(E.set("showDMSInputs",!0),E.set("showLatLongInputs",!1))}),a(b.byId("lat-long-search"),"change",function(a){var b=a.target?a.target.checked:a.srcElement.checked;b&&(E.set("showLatLongInputs",!0),E.set("showDMSInputs",!1))}),a(W.map,"mouse-move",function(a){E.set("currentLatitude",a.mapPoint.getLatitude().toFixed(4)),E.set("currentLongitude",a.mapPoint.getLongitude().toFixed(4))}),a(W.map,"click",function(a){H.selectTomnodFeatures(a)}),a(C.byId("confidence-fires-checkbox"),"change",function(a){F.updateFiresLayer(!0),a&&e.reportAnalyticsHelper("layer","option","The user toggled the Active Fires only show high confidence fires option on.")}),a(C.byId("twitter-conversations-checkbox"),"change",function(){var a=C.byId("twitter-conversations-checkbox").checked;F.toggleLayerVisibility(D.tweetLayer.id,a),a&&e.reportAnalyticsHelper("layer","toggle","The user toggled the Twitter Conversations layer on.")}),a(C.byId("fires-checkbox"),"change",function(){var a=C.byId("fires-checkbox").checked;F.toggleLayerVisibility(D.firesLayer.id,a),a&&e.reportAnalyticsHelper("layer","toggle","The user toggled the Active Fires layer on.")}),a(C.byId("air-quality-checkbox"),"change",function(a){F.toggleLayerVisibility(D.airQualityLayer.id,a),a&&e.reportAnalyticsHelper("layer","toggle","The user toggled the Air Quality layer on.")}),a(C.byId("tomnod-checkbox"),"change",function(a){F.toggleLayerVisibility(D.tomnodLayer.id,a),F.toggleLayerVisibility(D.tomnodLayer.sel_id,a),a&&e.reportAnalyticsHelper("layer","toggle","The user toggled the Tomnod layer on.")}),a(C.byId("indonesia-fires"),"change",function(a){F.toggleMapServiceLayerVisibility(W.map.getLayer(D.indonesiaLayers.id),D.indonesiaLayers.layerIds.indonesiaFires,a)}),a(C.byId("noaa-fires-18"),"change",function(a){F.toggleMapServiceLayerVisibility(W.map.getLayer(D.indonesiaLayers.id),D.indonesiaLayers.layerIds.noaa18,a)}),a(C.byId("burned-scars-checkbox"),"change",function(a){F.toggleLayerVisibility(D.burnScarLayer.id,a),a&&e.reportAnalyticsHelper("layer","toggle","The user toggled the Burn Scars layer on.")}),a(C.byId("landsat-image-checkbox"),"change",function(){var a=C.byId("landsat-image-checkbox").checked;F.toggleLayerVisibility(D.landsat8.id,a),a&&e.reportAnalyticsHelper("layer","toggle","The user toggled the Latest Landsat 8 Imagery layer on.")}),C.byId("windy-layer-checkbox").on("change",function(a){G.toggleWindLayer(a),a&&e.reportAnalyticsHelper("layer","toggle","The user toggled the Wind direction layer on.")}),C.byId("digital-globe-checkbox").on("change",function(a){F.toggleDigitalGlobeLayer(a),a&&e.reportAnalyticsHelper("layer","toggle","The user toggled the Digital Globe - First Look layer on.")}),C.byId("provinces-checkbox").on("change",function(a){F.adjustOverlaysLayer(),a&&e.reportAnalyticsHelper("layer","toggle","The user toggled the Provinces overlay layer on.")}),C.byId("districts-checkbox").on("change",function(a){F.adjustOverlaysLayer(),a&&e.reportAnalyticsHelper("layer","toggle","The user toggled the Districts overlay layer on.")}),C.byId("subdistricts-checkbox").on("change",function(a){F.adjustOverlaysLayer(),a&&e.reportAnalyticsHelper("layer","toggle","The user toggled the Subdistricts overlay layer on.")}),C.byId("villages-checkbox").on("change",function(a){F.adjustOverlaysLayer(),a&&e.reportAnalyticsHelper("layer","toggle","The user toggled the Villages overlay layer on.")}),a(b.byId("search-option-go-button"),"click",function(){H.searchAreaByCoordinates(),e.reportAnalyticsHelper("widget","search","The user searched for location by latitude/longitude or Degrees/Minutes/Seconds.")}),a(b.byId("print-button"),"click",function(){e.printMap(),e.reportAnalyticsHelper("widget","print","The user clicked the print widget to print the map.")}),a(b.byId("report-link"),"click",function(){E.vm.showReportOptions(!0),E.vm.reportAOIs().length<1&&I.populate_select(),e.reportAnalyticsHelper("widget","report","The user clicked Get Fires Analysis to generate an report with the latest analysis.")}),a(b.byId("noaa-fires-18"),"click",function(){if("false"==this.getAttribute("aria-checked")){var a=b.byId("indonesia-fires");return"false"==a.getAttribute("aria-checked")&&(W.map.getLayer("IndonesiaFires").visible=!1,console.log("Should disable pop-ups")),void E.vm.showReportOptionsNOAA(!1)}E.vm.showReportOptionsNOAA(!0),I.populate_select()}),a(b.byId("indonesia-fires"),"click",function(){if("false"==this.getAttribute("aria-checked")){var a=b.byId("noaa-fires-18");return"false"==a.getAttribute("aria-checked")&&(W.map.getLayer("IndonesiaFires").visible=!1,console.log("Should disable pop-ups")),void E.vm.showReportOptionsINDO(!1)}E.vm.showReportOptionsINDO(!0),I.populate_select()}),a(b.byId("windy-layer-checkbox"),"click",function(){return"false"==this.getAttribute("aria-checked")?void E.vm.showReportOptionsWIND(!1):(E.vm.showReportOptionsWIND(!0),void I.populate_select())}),a(b.byId("updateNOAA"),"click",function(){var a=E.vm.noaaObservFrom(),b=E.vm.noaaObservTo();b=moment(b).add(1,"day"),a=moment(a).tz("Asia/Jakarta").format("M/D/YYYY"),b=moment(b._d).tz("Asia/Jakarta").format("M/D/YYYY");var c=a.replace(/\//g,"-"),d=b.replace(/\//g,"-"),e=F.getTimeDefinition("Date",c,d);F.updateDynamicMapServiceLayerDefinition(W.map.getLayer(D.indonesiaLayers.id),D.indonesiaLayers.layerIds.noaa18,e)}),a(b.byId("updateINDO"),"click",function(){var a=E.vm.indoObservFrom(),b=E.vm.indoObservTo();b=moment(b).add(1,"day"),a=moment(a).tz("Asia/Jakarta").format("M/D/YYYY"),b=moment(b._d).tz("Asia/Jakarta").format("M/D/YYYY");var c=a.replace(/\//g,"-"),d=(b.replace(/\//g,"-"),F.getTimeDefinition("ACQ_DATE",c,b));F.updateDynamicMapServiceLayerDefinition(W.map.getLayer(D.indonesiaLayers.id),D.indonesiaLayers.layerIds.indonesiaFires,d)}),a(b.byId("updateWIND"),"click",function(){var a=E.vm.windObserv(),b=E.vm.timeOfDay(),c=a.split("/"),d=c[2].toString()+c[0].toString()+c[1].toString();console.log(d);var e="http://suitability-mapper.s3.amazonaws.com/wind/archive/wind-surface-level-gfs-"+d+b+".1-0.gz.json";G.deactivateWindLayer(),G.activateWindLayer(e)}),a(b.byId("embedShare"),"click",function(){e.showEmbedCode()}),a(b.byId("clear-search-pins"),"click",this.clearSearchPins),a(b.byId("legend-widget-title"),"click",this.toggleLegend),C.byId("forest-transparency-slider").on("change",function(a){F.setTransparency(D.forestUseLayers.id,a)}),C.byId("land-cover-transparency-slider").on("change",function(a){F.setTransparency(D.landCoverLayers.id,a)}),C.byId("conservation-transparency-slider").on("change",function(a){F.setTransparency(D.conservationLayers.id,a)}),c(".active-fires-options").forEach(function(b){a(b,"click",e.toggleFireOption.bind(e))}),c(".esriPopupWrapper").forEach(function(c){d.create("div",{id:"close-icon","class":"close-icon"},c),a(b.byId("close-icon"),"click",function(){W.map.infoWindow.hide()})}),c("#forest-use-panel div.checkbox-container div input").forEach(function(a){f.add(a,"forest-use-layers-option")}),c("#conservation-panel div.checkbox-container div input").forEach(function(a){f.add(a,"conservation-layers-option")}),c("#land-cover-panel div.checkbox-container div input").forEach(function(a){"land-cover-radios"===a.name&&f.add(a,"land-cover-layers-option")}),c("#forest-use-panel div.checkbox-container div input").forEach(function(b){a(b,"change",function(a){F.updateAdditionalVisibleLayers("forest-use-layers-option",D.forestUseLayers);var b=a.target?a.target:a.srcElement;if(b.checked&&b.labels.length>0){var c=b.labels[0].innerHTML;e.reportAnalyticsHelper("layer","toggle","The user toggled the "+c+" layer on")}})}),c(".conservation-layers-option").forEach(function(b){a(b,"change",function(a){F.updateAdditionalVisibleLayers("conservation-layers-option",D.conservationLayers);var b=a.target?a.target:a.srcElement;if(b.checked&&b.labels.length>0){var c=b.labels[0].innerHTML;e.reportAnalyticsHelper("layer","toggle","The user toggled the "+c+" layer on")}})}),c(".land-cover-layers-option").forEach(function(b){a(b,"change",function(a){F.updateLandCoverLayers(a);var b=a.target?a.target:a.srcElement;if(b.checked&&b.labels.length>0){var c=b.labels[0].innerHTML;-1===c.search("None")&&e.reportAnalyticsHelper("layer","toggle","The user toggled the "+c+" layer on")}})}),c("#primary-forests-options input").forEach(function(b){a(b,"change",function(a){F.updatePrimaryForestsLayer(!0);var b=a.target?a.target:a.srcElement;if(b.checked&&b.labels.length>0){var c=b.labels[0].innerHTML;-1===c.search("Primary")&&(c="Primary Forests "+c),e.reportAnalyticsHelper("layer","toggle","The user toggled the "+c+" layer on")}})})},W.addLayers=function(){var b,c,d,e,f,h,i,j,k,l,m,n,o,p,q,r,s,x,y=this;b=new v,b.format="png32",b.layerIds=D.conservationLayers.defaultLayers,b.layerOption=v.LAYER_OPTION_SHOW,c=new t(D.conservationLayers.url,{imageParameters:b,id:D.conservationLayers.id,visible:!1}),indonesiaParams=new v,indonesiaParams.format="png32",indonesiaParams.layerIds=D.indonesiaLayers.defaultLayers,indonesiaParams.layerOption=v.LAYER_OPTION_SHOW,indonesiaLayer=new t(D.indonesiaLayers.url,{imageParameters:indonesiaParams,id:D.indonesiaLayers.id,visible:!1}),h=new v,h.format="png32",h.layerIds=D.landCoverLayers.defaultLayers,h.layerOption=v.LAYER_OPTION_SHOW,i=new t(D.landCoverLayers.url,{imageParameters:h,id:D.landCoverLayers.id,visible:!1}),k=new v,k.format="png32",k.layerIds=D.forestUseLayers.defaultLayers,k.layerOption=v.LAYER_OPTION_SHOW,l=new t(D.forestUseLayers.url,{imageParameters:k,id:D.forestUseLayers.id,visible:!1}),m=new u(D.treeCoverLayer.url,{id:D.treeCoverLayer.id,visible:!1}),d=new v,d.format="png32",d.layerIds=D.primaryForestsLayer.defaultLayers,d.layerOption=v.LAYER_OPTION_SHOW,e=new t(D.primaryForestsLayer.url,{imageParameters:d,id:D.primaryForestsLayer.id,visible:!1}),q=new u(D.landsat8.url,{id:D.landsat8.id,visible:!1}),x=D.digitalGlobe,f=x.mosaics.map(function(a){return new u(x.imagedir+a+"/ImageServer",{id:a,visible:!1})}),dglyrs=f,n=new t(D.overlaysLayer.url,{id:D.overlaysLayer.id,visible:!1}),j=new t(D.airQualityLayer.url,{id:D.airQualityLayer.id,visible:!1}),tomnodParams=new v,tomnodParams.layerIds=D.tomnodLayer.defaultLayers,tomnodParams.layerOption=v.LAYER_OPTION_SHOW,p=new t(D.tomnodLayer.url,{imageParameters:tomnodParams,id:D.tomnodLayer.id,visible:!1});var A=new z("${name}",H.getTomnodInfoWindow),B=new w(D.tomnodLayer.url+"/"+D.tomnodLayer.defaultLayers[0],{mode:w.MODE_SELECTION,infoTemplate:A,outFields:["*"],id:D.tomnodLayer.sel_id});o=new R(D.burnScarLayer.url,D.burnScarLayer.id),r=new v,r.format="png32",r.layerIds=D.firesLayer.defaultLayers,r.layerOption=v.LAYER_OPTION_SHOW,s=new t(D.firesLayer.url,{imageParameters:r,id:D.firesLayer.id,visible:!1});var E=new z;E.setContent(H.getFireTweetsInfoWindow),tweetLayer=new w(D.tweetLayer.url,{mode:w.MODE_ONDEMAND,id:D.tweetLayer.id,visible:!1,outFields:["*"],infoTemplate:E});var G={layerDefinition:{geometryType:"esriGeometryPolygon",fields:[]},featureSet:null},I=new w(G,{id:D.digitalGlobe.graphicsLayerId,visible:!1});dglyr=I;var J=[q,m,i,e,I].concat(f).concat([c,o,p,l,n,tweetLayer,j,B,indonesiaLayer,s]);a.once(W.map,"layers-add-result",function(a){y.enableLayersFromHash();var b=g.map(a.layers,function(a){return{layer:a.layer}});b=g.filter(b,function(a){var b=a.layer.url?a.layer.url.search("ImageServer")<0:!1,c=!(a.layer.id===B.id);return b&&c}),console.dir(b),C.byId("legend").refresh(b)}),W.map.addLayers(J),n.on("load",F.setOverlayLayerOrder),o.on("error",this.layerAddError),q.on("error",this.layerAddError),m.on("error",this.layerAddError),e.on("error",this.layerAddError),c.on("error",this.layerAddError),i.on("error",this.layerAddError),n.on("error",this.layerAddError),l.on("error",this.layerAddError),s.on("error",this.layerAddError),j.on("error",this.layerAddError)},W.layerAddError=function(a){require(["modules/ErrorController"],function(b){b.show(10,"Error adding Layer : <br> "+a.target.url)})},W.toggleFireOption=function(a){var b=a.target?a.target:a.srcElement;c(".selected-fire-option").forEach(function(a){f.remove(a,"selected-fire-option")}),f.add(b,"selected-fire-option"),F.updateFiresLayer()},W.enableLayersFromHash=function(){function c(){C.byId("fires-checkbox").set("checked",!0),F.updateLayersInHash("add",D.firesLayer.id,D.firesLayer.id)}function d(c,d){if(void 0!==c&&""!==c)if(void 0===d)l[c]&&(f=l[c].id,C.byId(f)&&(C.byId(f).set("checked",!0),a.emit(b.byId(f),"change",{})));else{g=l[c],h=d.split(",");for(var e=0,i=h.length;i>e;e++)if(f=g[h[e]].id,"[object Array]"===Object.prototype.toString.call(f))for(var j=0,k=f.length;k>j;j++)C.byId(f[j])&&(C.byId(f[j]).set("checked",!0),a.emit(b.byId(f[j]),"change",{}));else C.byId(f)&&(C.byId(f).set("checked",!0),a.emit(b.byId(f),"change",{}))}}var e,f,g,h,i=S.getHash(),j=i.lyrs,k=j.split(":"),l=D.layersCheckboxes;if(void 0===j)return void c();if(1===k.length&&""===k[0])return void c();for(var m=0,n=k.length;n>m;m++)e=k[m].split("/"),d(e[0],e[1])},W.clearSearchPins=function(){W.map.graphics.clear(),E.set("showClearPinsOption",!1)},W.toggleLegend=function(){var a=b.byId("legend-widget-container"),c=a.offsetHeight-2===280?30:280;h.animateProperty({node:a,properties:{height:c},duration:500}).play(),30===c?f.add("legend-widget-title","legend-closed"):f.remove("legend-widget-title","legend-closed")},W.printMap=function(){var b=document.getElementsByTagName("body")[0];f.add("print-button","loading"),f.add(b,"map-view-print"),C.byId("stackContainer").resize(),C.byId("mapView").resize(),W.map.resize(),a.once(W.map,"resize",function(){setTimeout(function(){window.print(),f.remove("print-button","loading"),f.remove(b,"map-view-print"),C.byId("stackContainer").resize(),W.map.resize()},2e3)})},W.reportAnalyticsHelper=function(a,b,c){ga("A.send","event",a,b,c),ga("B.send","event",a,b,c)},W.showEmbedCode=function(){C.byId("embedCodeShareDialog")&&C.byId("embedCodeShareDialog").destroy();var a,c="<iframe src='"+window.location+"' height='600' width='900'></iframe>",d=new V({title:"Embed Code",style:"width: 350px",id:"embedCodeShareDialog",content:'Copy the code below to embed in your site. (Ctrl+C on PC and Cmd+C on Mac)<div class=\'dijitDialogPaneActionBar\'><input id="embedInput" type="text" value="'+c+'" autofocus /></div>'});a=function(){d.destroy()},d.show(),b.byId("embedInput").select(),d.on("cancel",function(){a()})},W});