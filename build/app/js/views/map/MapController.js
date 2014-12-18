define(["dojo/on","dojo/dom","dojo/query","dojo/dom-construct","dojo/number","dojo/dom-class","dojo/_base/array","dojo/_base/fx","dojo/promise/all","dojo/Deferred","dojo/dom-style","dojo/dom-geometry","esri/map","esri/config","esri/dijit/HomeButton","esri/geometry/Point","esri/dijit/BasemapGallery","esri/dijit/Basemap","esri/dijit/BasemapLayer","esri/dijit/LocateButton","esri/dijit/Geocoder","esri/dijit/Legend","esri/dijit/Scalebar","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/ArcGISImageServiceLayer","esri/layers/ImageParameters","esri/layers/FeatureLayer","esri/geometry/webMercatorUtils","esri/geometry/Extent","esri/InfoTemplate","esri/graphic","esri/urlUtils","esri/symbols/SimpleFillSymbol","esri/symbols/SimpleLineSymbol","esri/Color","dijit/registry","views/map/MapConfig","views/map/MapModel","views/map/LayerController","views/map/WindyController","views/map/Finder","views/report/ReportOptionsController","utils/DijitFactory","modules/EventsController","esri/request","esri/tasks/query","esri/tasks/QueryTask","esri/tasks/PrintTask","esri/tasks/PrintParameters","esri/tasks/PrintTemplate","views/map/DigitalGlobeTiledLayer","views/map/DigitalGlobeServiceLayer","views/map/BurnScarTiledLayer","modules/HashController","esri/layers/GraphicsLayer","esri/layers/ImageServiceParameters","dijit/Dialog","utils/Helper"],function(e,a,t,r,i,o,n,s,l,d,c,p,y,g,m,u,h,b,f,v,w,L,I,k,D,A,T,S,x,O,C,E,P,H,_,j,M,F,Y,G,B,W,R,N,z,V,U,q,J,Z,Q,K,X,ea,aa,ta,ra,ia){var oa,na={},sa=!1,la={viewId:"mapView",viewName:"map"},da=[],ca=new P(P.STYLE_SOLID,new H(H.STYLE_SOLID,new _("yellow"),5),new _([255,255,0,0]));na.mapExtentPausable,na.init=function(){var e=this;return sa?(na.map.resize(),N.switchToView(la),void na.checkBubble()):(sa=!0,ia.showLoader("app-body","map-blocker"),void require(["dojo/text!views/map/map.html","dojo/ready"],function(t,r){a.byId(la.viewId).innerHTML=t,N.switchToView(la),r(function(){F.applyBindings("map-view"),addthis.init(),e.addConfigurations(),e.createMap(),setTimeout(function(){e.checkBubble()},1e3)})}))},na.centerChange=function(){if(na.map){var a=S.webMercatorToGeographic(na.map.extent),t=i.round(a.getCenter().x,2),r=i.round(a.getCenter().y,2),o=na.map.getLevel(),n=ea.newState,s=parseFloat(n.x)!=t||parseFloat(n.y)!=r||parseInt(n.l)!=o;if(s){na.mapExtentPausable.pause(),e.once(na.map,"extent-change",function(){na.mapExtentPausable.resume()});var l=S.geographicToWebMercator(new u(parseFloat(n.x),parseFloat(n.y)));na.map.centerAndZoom(l,parseInt(n.l))}}},na.addConfigurations=function(){var e=M.proxies,a=document.location.href,t="/proxy/proxy.ashx";for(var r in e)0===a.indexOf(r)&&(t=e[r],g.defaults.io.proxyUrl=e[r]);E.addProxyRule({urlPrefix:"https://services.digitalglobe.com/",proxyUrl:t}),E.addProxyRule({urlPrefix:M.landsat8.prefix,proxyUrl:t}),g.defaults.io.corsEnabledServers.push(M.windData.domain)},na.createMap=function(){var a=this;R.buildDijits(M.reportOptionsDijits),R.buildDijits(M.accordionDijits);var t=ea.newState.x,r=ea.newState.y,o=ea.newState.l;na.map=new y("map",{center:[t,r],zoom:o,basemap:M.mapOptions.basemap,minZoom:M.mapOptions.minZoom,maxZoom:M.mapOptions.maxZoom,sliderPosition:M.mapOptions.sliderPosition}),window.map=na.map,na.map.on("load",function(){$("#firesDateTo").datepicker("option","minDate","+0m -7d"),$("#noaaDateFrom").datepicker("setDate","10/22/2014"),$("#indoDateFrom").datepicker("setDate","1/1/2013"),na.map.graphics.clear(),F.vm.windPicker(),j.byId("fires-map-accordion").resize(),G.setMap(na.map),Y.setMap(na.map),B.setMap(na.map),a.addWidgets(),a.bindEvents(),a.addLayers(),e.once(na.map,"update-end",function(){na.map.centerAt(new u(t,r)).then(function(){setTimeout(function(){na.mapExtentPausable.resume()},1e3)})}),na.map.resize()}),na.mapExtentPausable=e.pausable(na.map,"extent-change",function(e){var a=(e.delta,S.webMercatorToGeographic(e.extent)),t=(e.levelChange,e.lod),r=(e.target,i.round(a.getCenter().x,2)),o=i.round(a.getCenter().y,2);ea.updateHash({x:r,y:o,l:t.level}),"on"==dijit.byId("digital-globe-checkbox").getValue()&&na.updateImageryList()}),na.mapExtentPausable.pause()},na.checkBubble=function(){console.log("checking bubble"),M.digitalGlobe.navigationBool&&(j.byId("digital-globe-checkbox").setValue(!0),j.byId("fires-map-accordion").selectChild(j.byId("imagery-panel")),M.digitalGlobe.navigationBool=!1)},na.updateImageryList=function(){F.vm.digitalGlobeInView.removeAll();var a=na.map.extent,r=na.map.getLayer("Digital_Globe_Bounding_Boxes");da=[];for(var i=dijit.byId("timeSliderDG").thumbIndexes,o=dijit.byId("timeSliderDG").timeStops,s=moment(o[i[0]]).tz("Asia/Jakarta"),l=moment(o[i[1]]).tz("Asia/Jakarta"),d=0;d<r.graphics.length;d++)a.intersects(r.graphics[d].geometry)&&da.push(r.graphics[d]);n.forEach(da,function(e){var a=moment(e.attributes.AcquisitionDate).tz("Asia/Jakarta");if(a>=s&&l>=a){var a=moment(e.attributes.AcquisitionDate).tz("Asia/Jakarta");e.attributes.AcquisitionDate2=e.attributes.AcquisitionDate,e.attributes.AcquisitionDate=a.format("YYYY/MM/DD");var t="<a class='popup-link' data-bucket='"+e.attributes.SensorName+"_id_"+e.attributes.OBJECTID+"'>"+a.format("YYYY/MM/DD")+"</a>",r="<a class='popup-link' data-bucket='"+e.attributes.SensorName+"_id_"+e.attributes.OBJECTID+"'>"+e.attributes.SensorName+"</a>";e.attributes.formattedZoomTo="<a class='popup-link-zoom'>Zoom To</a>",e.attributes.formattedDatePrefix1=t,e.attributes.formattedDatePrefix2=r,F.vm.digitalGlobeInView.push({feature:e,mouseover:!1})}}),$("#imageryWindow > table > tbody > tr").each(function(){var e=this.firstElementChild;e=$(e).html(),e=$(e).attr("data-bucket"),F.vm.selectedImageryRow&&F.vm.selectedImageryRow==e&&$(this).addClass("imageryRowSelected")}),F.vm.digitalGlobeInView.sort(function(e,a){return e.feature.attributes.AcquisitionDate==a.feature.attributes.AcquisitionDate?0:e.feature.attributes.AcquisitionDate>a.feature.attributes.AcquisitionDate?-1:1});var c=0,p=[];t(".imageryTable .popup-link").forEach(function(a,t){p.push(e(a,"click",function(e){var a=e.target?e.target:e.srcElement,r=a.dataset?a.dataset.bucket:a.getAttribute("data-bucket");$("#imageryWindow > table > tbody > tr").each(function(){$(this).removeClass("imageryRowSelected")}),Y.showDigitalGlobeImagery(r),c=t;var i=$(this).parent();$(i).parent().removeClass("imageryRowHover"),F.vm.selectedImageryRow=this.dataset.bucket,$(i).parent().addClass("imageryRowSelected")}))}),$("#imageryWindow > table > tbody > tr").mouseenter(function(){var e=this.firstElementChild;$(this).addClass("imageryRowHover"),e=$(e).html(),e=$(e).attr("data-bucket");for(var a=0;a<da.length;a++){var t=da[a].attributes.SensorName+"_id_"+da[a].attributes.OBJECTID;if(t==e){var r=new P(P.STYLE_SOLID,new H(H.STYLE_SOLID,new _("yellow"),5),new _([255,255,0,0]));oa=new C(da[a].geometry,r),oa.id="highlight",na.map.graphics.add(oa)}}}),$("#imageryWindow > table > tbody > tr").mouseleave(function(){$(this).removeClass("imageryRowHover"),na.map.graphics.remove(na.map.graphics.graphics[na.map.graphics.graphics.length-1])}),p.push(e(t(".popup-link-zoom"),"click",function(){na.map.graphics.remove(na.map.graphics.graphics[na.map.graphics.graphics.length-1]);var e=$(this).parent()[0],a=e.firstElementChild;a=a.firstElementChild,a=$(a).attr("data-bucket");for(var t=0;t<da.length;t++){var r=da[t].attributes.SensorName+"_id_"+da[t].attributes.OBJECTID;r==a&&na.map.setExtent(da[t].geometry.getExtent())}}))};var pa=$(this).parent();return $(pa).parent().removeClass("imageryRowHover"),$(pa).parent().addClass("imageryRowSelected"),na.handleImageryOver=function(e,a){console.log("starting function");var t=a.currentTarget;$(t).addClass("imageryRowHover"),oa=new C(e.geometry,ca),oa.id="highlight",na.map.graphics.add(oa)},na.handleImageryOut=function(e,a){var t=$(a.target).parent();$(t).removeClass("imageryRowHover"),na.map.graphics.remove(na.map.graphics.graphics[na.map.graphics.graphics.length-1])},na.resizeMapPanel=function(e){1==e?($("#control-panel").css("width","2px"),$(".map-container").css("left","2px"),$("#leftPaneToggle").html("+"),$("#latLongHUD").css("left","100px"),$("div.scalebar_bottom-left.esriScalebar").css("left","119px"),$("#map").css("left","2px"),$("#control-panel").css("background-color","#ecc53d"),na.map.resize(),F.vm.toggleMapPane(!1)):($("#control-panel").css("width","320px"),$(".map-container").css("left","320px"),$("#leftPaneToggle").html("-"),$("#map").css("left","320px"),$("#latLongHUD").css("left","0px"),$("div.scalebar_bottom-left.esriScalebar").css("left","19px"),$("#control-panel").css("background-color","transparent"),na.map.resize(),F.vm.toggleMapPane(!0)),$("#leftPaneToggle").hide(),$("#latLongHUD").hide(),$("div.scalebar_bottom-left.esriScalebar").hide(),$("#control-panel > div.report-link-container").hide(),setTimeout(function(){$("#latLongHUD").show(),$("#leftPaneToggle").show(),$("div.scalebar_bottom-left.esriScalebar").show(),$("#control-panel > div.report-link-container").show()},1e3)},na.addWidgets=function(){var t,i,o,n,s,l,d,c=[];t=new I({map:na.map,scalebarUnit:"metric"}),r.create("div",{id:"home-button","class":"home-button"},document.querySelector(".esriSimpleSliderIncrementButton"),"after"),l=new m({map:na.map},"home-button"),l.startup(),i=new b({layers:[new f({url:M.mapOptions.darkGrayCanvas})],id:"darkgray",title:"Dark Gray Canvas",thumbnailUrl:"app/images/darkGreyThumb.jpg"}),console.log(c),d=new h({map:na.map,basemaps:c,showArcGISBasemaps:!0},"basemap-gallery"),d.startup(),n=new v({map:na.map,highlightLocation:!1},"location-widget"),n.startup(),o=new w({map:na.map},"esri-geocoder-widget"),o.startup(),s=new L({map:na.map,layerInfos:[],autoUpdate:!0},"legend"),s.startup();var p=function(){F.get("showBasemapGallery")&&F.set("showBasemapGallery",!1),F.get("showShareContainer")&&F.set("showShareContainer",!1),F.set("showLocatorWidgets",!F.get("showLocatorWidgets"))},y=function(){F.get("showLocatorWidgets")&&F.set("showLocatorWidgets",!1),F.get("showShareContainer")&&F.set("showShareContainer",!1),F.set("showBasemapGallery",!F.get("showBasemapGallery"))},g=function(){F.get("showLocatorWidgets")&&F.set("showLocatorWidgets",!1),F.get("showBasemapGallery")&&F.set("showBasemapGallery",!1),F.set("showShareContainer",!F.get("showShareContainer"))};e(a.byId("locator-widget-button"),"click",p),e(a.byId("basemap-gallery-button"),"click",y),e(a.byId("share-button"),"click",g),this.initTransparency()},na.initTransparency=function(){["forest-transparency-slider","conservation-transparency-slider","land-cover-transparency-slider"].map(function(e){dijit.byId(e).set("value",70)})},na.bindEvents=function(){var i=this;e(a.byId("dms-search"),"change",function(e){var a=e.target?e.target.checked:e.srcElement.checked;a&&(F.set("showDMSInputs",!0),F.set("showLatLongInputs",!1))}),e(a.byId("lat-long-search"),"change",function(e){var a=e.target?e.target.checked:e.srcElement.checked;a&&(F.set("showLatLongInputs",!0),F.set("showDMSInputs",!1))}),e(na.map,"mouse-move",function(e){F.set("currentLatitude",e.mapPoint.getLatitude().toFixed(4)),F.set("currentLongitude",e.mapPoint.getLongitude().toFixed(4))}),e(na.map,"click",function(e){B.selectTomnodFeatures(e)}),e(j.byId("confidence-fires-checkbox"),"change",function(e){Y.updateFiresLayer(!0),e&&i.reportAnalyticsHelper("layer","option","The user toggled the Active Fires only show high confidence fires option on.")}),e(j.byId("twitter-conversations-checkbox"),"change",function(){var e=j.byId("twitter-conversations-checkbox").checked;Y.toggleLayerVisibility(M.tweetLayer.id,e),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Twitter Conversations layer on.")}),e(j.byId("fires-checkbox"),"change",function(){var e=j.byId("fires-checkbox").checked;Y.toggleLayerVisibility(M.firesLayer.id,e),F.vm.showActiveFiresButtons(e),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Active Fires layer on.")}),e(j.byId("air-quality-checkbox"),"change",function(e){Y.toggleLayerVisibility(M.airQualityLayer.id,e),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Air Quality layer on.")}),e(j.byId("tomnod-checkbox"),"change",function(e){Y.toggleLayerVisibility(M.tomnodLayer.id,e),Y.toggleLayerVisibility(M.tomnodLayer.sel_id,e),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Tomnod layer on.")}),e(j.byId("indonesia-fires"),"change",function(e){console.log(e),1==e?$(".confidence-fires-container").css("margin-left","38px"):$(".confidence-fires-container").css("margin-left","46px"),Y.toggleMapServiceLayerVisibility(na.map.getLayer(M.indonesiaLayers.id),M.indonesiaLayers.layerIds.indonesiaFires,e)}),e(j.byId("noaa-fires-18"),"change",function(e){Y.toggleMapServiceLayerVisibility(na.map.getLayer(M.indonesiaLayers.id),M.indonesiaLayers.layerIds.noaa18,e)}),e(j.byId("burned-scars-checkbox"),"change",function(e){Y.toggleLayerVisibility(M.burnScarLayer.id,e),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Burn Scars layer on.")}),e(j.byId("landsat-image-checkbox"),"change",function(){var e=j.byId("landsat-image-checkbox").checked;Y.toggleLayerVisibility(M.landsat8.id,e),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Latest Landsat 8 Imagery layer on.")}),j.byId("windy-layer-checkbox").on("change",function(e){G.toggleWindLayer(e),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Wind direction layer on.")}),j.byId("digital-globe-checkbox").on("change",function(e){Y.toggleDigitalGlobeLayer(e),F.vm.showReportOptionsDigitalGlobe(e),e&&(setTimeout(function(){dijit.byId("digital-globe-footprints-checkbox").set("value","true",!1)},0),i.reportAnalyticsHelper("layer","toggle","The user toggled the Digital Globe - First Look layer on."))}),j.byId("digital-globe-footprints-checkbox").on("change",function(e){Y.toggleDigitalGlobeLayer(e,"footprints")}),j.byId("provinces-checkbox").on("change",function(e){Y.adjustOverlaysLayer(),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Provinces overlay layer on.")}),j.byId("districts-checkbox").on("change",function(e){Y.adjustOverlaysLayer(),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Districts overlay layer on.")}),j.byId("subdistricts-checkbox").on("change",function(e){Y.adjustOverlaysLayer(),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Subdistricts overlay layer on.")}),j.byId("villages-checkbox").on("change",function(e){Y.adjustOverlaysLayer(),e&&i.reportAnalyticsHelper("layer","toggle","The user toggled the Villages overlay layer on.")}),e(a.byId("search-option-go-button"),"click",function(){B.searchAreaByCoordinates(),i.reportAnalyticsHelper("widget","search","The user searched for location by latitude/longitude or Degrees/Minutes/Seconds.")}),e(a.byId("print-button"),"click",function(){i.printMap(),i.reportAnalyticsHelper("widget","print","The user clicked the print widget to print the map.")}),e(a.byId("report-link"),"click",function(){F.vm.showReportOptions(!0),F.vm.reportAOIs().length<1&&W.populate_select(),i.reportAnalyticsHelper("widget","report","The user clicked Get Fires Analysis to generate an report with the latest analysis.")}),e(a.byId("noaa-fires-18"),"click",function(){if("false"==this.getAttribute("aria-checked")){var e=a.byId("indonesia-fires");return"false"==e.getAttribute("aria-checked")&&(na.map.getLayer("IndonesiaFires").visible=!1,console.log("Should disable pop-ups")),void F.vm.showReportOptionsNOAA(!1)}F.vm.showReportOptionsNOAA(!0),W.populate_select()}),e(a.byId("indonesia-fires"),"click",function(){if("false"==this.getAttribute("aria-checked")){var e=a.byId("noaa-fires-18");return"false"==e.getAttribute("aria-checked")&&(na.map.getLayer("IndonesiaFires").visible=!1,console.log("Should disable pop-ups")),void F.vm.showReportOptionsINDO(!1)}F.vm.showReportOptionsINDO(!0),W.populate_select()}),e(a.byId("windy-layer-checkbox"),"click",function(){return"false"==this.getAttribute("aria-checked")?void F.vm.showReportOptionsWIND(!1):(F.vm.showReportOptionsWIND(!0),void W.populate_select())}),e(a.byId("updateNOAA"),"click",function(){var e=F.vm.noaaObservFrom(),a=F.vm.noaaObservTo(),t=$("#noaaDateFrom").datepicker("getDate"),r=$("#noaaDateTo").datepicker("getDate");a=moment(r).add(1,"day"),e=moment(t).tz("Asia/Jakarta").format("M/D/YYYY"),a=moment(a._d).tz("Asia/Jakarta").format("M/D/YYYY");var i=e.replace(/\//g,"-"),o=a.replace(/\//g,"-"),n=Y.getTimeDefinition("Date",i,o);Y.updateDynamicMapServiceLayerDefinition(na.map.getLayer(M.indonesiaLayers.id),M.indonesiaLayers.layerIds.noaa18,n)}),e(a.byId("updateINDO"),"click",function(){var e=F.vm.indoObservFrom(),a=F.vm.indoObservTo(),t=$("#indoDateFrom").datepicker("getDate"),r=$("#indoDateTo").datepicker("getDate");a=moment(r).add(1,"day"),e=moment(t).tz("Asia/Jakarta").format("M/D/YYYY"),a=moment(a._d).tz("Asia/Jakarta").format("M/D/YYYY");var i=e.replace(/\//g,"-"),o=(a.replace(/\//g,"-"),Y.getTimeDefinition("ACQ_DATE",i,a));j.byId("confidence-archive-checkbox").checked&&(o=[o,M.firesLayer.highConfidence].join(" AND ")),Y.updateDynamicMapServiceLayerDefinition(na.map.getLayer(M.indonesiaLayers.id),M.indonesiaLayers.layerIds.indonesiaFires,o)}),e(j.byId("confidence-archive-checkbox"),"change",function(e){console.log("confidence",e);var a=e?M.firesLayer.highConfidence:"",t=na.map.getLayer(M.indonesiaLayers.id),r=M.indonesiaLayers.layerIds.indonesiaFires,i=t.layerDefinitions,o=i[r];if(e)var n=void 0!=o?[o,a].join(" AND "):a;else var n=o.replace(" AND "+M.firesLayer.highConfidence,a).replace(M.firesLayer.highConfidence,a);Y.updateDynamicMapServiceLayerDefinition(na.map.getLayer(M.indonesiaLayers.id),M.indonesiaLayers.layerIds.indonesiaFires,n)}),e(a.byId("updateWIND"),"click",function(){var e=(F.vm.windObserv(),$("#windDate").datepicker("getDate")),a=moment(e).tz("Asia/Jakarta").format("MM/DD/YYYY"),t=F.vm.timeOfDay(),r=a.split("/"),i=r[2].toString()+r[0].toString()+r[1].toString();console.log(i);var o="http://suitability-mapper.s3.amazonaws.com/wind/archive/wind-surface-level-gfs-"+i+t+".1-0.gz.json";G.deactivateWindLayer(),G.activateWindLayer(o)}),e(a.byId("embedShare"),"click",function(){i.showEmbedCode()}),e(a.byId("clear-search-pins"),"click",this.clearSearchPins),e(a.byId("legend-widget-title"),"click",this.toggleLegend),j.byId("forest-transparency-slider").on("change",function(e){Y.setTransparency(M.forestUseLayers.id,e)}),j.byId("land-cover-transparency-slider").on("change",function(e){Y.setTransparency(M.landCoverLayers.id,e)}),j.byId("conservation-transparency-slider").on("change",function(e){Y.setTransparency(M.conservationLayers.id,e)}),t(".active-fires-options").forEach(function(a){e(a,"click",i.toggleFireOption.bind(i))}),t(".esriPopupWrapper").forEach(function(t){r.create("div",{id:"close-icon","class":"close-icon"},t),e(a.byId("close-icon"),"click",function(){na.map.infoWindow.hide()})}),t("#forest-use-panel div.checkbox-container div input").forEach(function(e){o.add(e,"forest-use-layers-option")}),t("#conservation-panel div.checkbox-container div input").forEach(function(e){o.add(e,"conservation-layers-option")}),t("#land-cover-panel div.checkbox-container div input").forEach(function(e){"land-cover-radios"===e.name&&o.add(e,"land-cover-layers-option")}),t("#forest-use-panel div.checkbox-container div input").forEach(function(a){e(a,"change",function(e){Y.updateAdditionalVisibleLayers("forest-use-layers-option",M.forestUseLayers);var a=e.target?e.target:e.srcElement;if(a.checked&&a.labels.length>0){var t=a.labels[0].innerHTML;i.reportAnalyticsHelper("layer","toggle","The user toggled the "+t+" layer on")}})}),t(".conservation-layers-option").forEach(function(a){e(a,"change",function(e){Y.updateAdditionalVisibleLayers("conservation-layers-option",M.conservationLayers);var a=e.target?e.target:e.srcElement;if(a.checked&&a.labels.length>0){var t=a.labels[0].innerHTML;i.reportAnalyticsHelper("layer","toggle","The user toggled the "+t+" layer on")}})}),t(".land-cover-layers-option").forEach(function(a){e(a,"change",function(e){Y.updateLandCoverLayers(e);var a=e.target?e.target:e.srcElement;if(a.checked&&a.labels.length>0){var t=a.labels[0].innerHTML;-1===t.search("None")&&i.reportAnalyticsHelper("layer","toggle","The user toggled the "+t+" layer on")}})}),t("#primary-forests-options input").forEach(function(a){e(a,"change",function(e){Y.updatePrimaryForestsLayer(!0);var a=e.target?e.target:e.srcElement;if(a.checked&&a.labels.length>0){var t=a.labels[0].innerHTML;-1===t.search("Primary")&&(t="Primary Forests "+t),i.reportAnalyticsHelper("layer","toggle","The user toggled the "+t+" layer on")}})})},na.addLayers=function(){var a,t,r,i,o,s,l,d,c,p,y,g,m,u,h,b,f,v,w=this;a=new A,a.format="png32",a.layerIds=M.conservationLayers.defaultLayers,a.layerOption=A.LAYER_OPTION_SHOW,t=new k(M.conservationLayers.url,{imageParameters:a,id:M.conservationLayers.id,visible:!1}),indonesiaParams=new A,indonesiaParams.format="png32",indonesiaParams.layerIds=M.indonesiaLayers.defaultLayers,indonesiaParams.layerOption=A.LAYER_OPTION_SHOW,indonesiaLayer=new k(M.indonesiaLayers.url,{imageParameters:indonesiaParams,id:M.indonesiaLayers.id,visible:!1}),s=new A,s.format="png32",s.layerIds=M.landCoverLayers.defaultLayers,s.layerOption=A.LAYER_OPTION_SHOW,l=new k(M.landCoverLayers.url,{imageParameters:s,id:M.landCoverLayers.id,visible:!1}),c=new A,c.format="png32",c.layerIds=M.forestUseLayers.defaultLayers,c.layerOption=A.LAYER_OPTION_SHOW,p=new k(M.forestUseLayers.url,{imageParameters:c,id:M.forestUseLayers.id,visible:!1}),y=new D(M.treeCoverLayer.url,{id:M.treeCoverLayer.id,visible:!1}),r=new A,r.format="png32",r.layerIds=M.primaryForestsLayer.defaultLayers,r.layerOption=A.LAYER_OPTION_SHOW,i=new k(M.primaryForestsLayer.url,{imageParameters:r,id:M.primaryForestsLayer.id,visible:!1}),h=new D(M.landsat8.url,{id:M.landsat8.id,visible:!1}),v=M.digitalGlobe,o=v.mosaics.map(function(e){return new D(v.imagedir+e+"/ImageServer",{id:e,visible:!1})}),dglyrs=o,g=new k(M.overlaysLayer.url,{id:M.overlaysLayer.id,visible:!1}),d=new k(M.airQualityLayer.url,{id:M.airQualityLayer.id,visible:!1}),tomnodParams=new A,tomnodParams.layerIds=M.tomnodLayer.defaultLayers,tomnodParams.layerOption=A.LAYER_OPTION_SHOW,u=new k(M.tomnodLayer.url,{imageParameters:tomnodParams,id:M.tomnodLayer.id,visible:!1});var L=new O("${name}",B.getTomnodInfoWindow),I=new T(M.tomnodLayer.url+"/"+M.tomnodLayer.defaultLayers[0],{mode:T.MODE_SELECTION,infoTemplate:L,outFields:["*"],id:M.tomnodLayer.sel_id});m=new X(M.burnScarLayer.url,M.burnScarLayer.id),b=new A,b.format="png32",b.layerIds=M.firesLayer.defaultLayers,b.layerOption=A.LAYER_OPTION_SHOW,f=new k(M.firesLayer.url,{imageParameters:b,id:M.firesLayer.id,visible:!1});var S=new O;S.setContent(B.getFireTweetsInfoWindow),tweetLayer=new T(M.tweetLayer.url,{mode:T.MODE_ONDEMAND,id:M.tweetLayer.id,visible:!1,outFields:["*"],infoTemplate:S});var x={layerDefinition:{geometryType:"esriGeometryPolygon",fields:[]},featureSet:null},C=new T(x,{id:M.digitalGlobe.graphicsLayerId,visible:!1});dglyr=C;var E=[h,y,l,i,C].concat(o).concat([t,m,u,p,g,tweetLayer,d,I,indonesiaLayer,f]);e.once(na.map,"layers-add-result",function(e){w.enableLayersFromHash();var a=n.map(e.layers,function(e){return{layer:e.layer}});a=n.filter(a,function(e){var a=e.layer.url?e.layer.url.search("ImageServer")<0:!1,t=!(e.layer.id===I.id);return a&&t}),console.dir(a),ia.hideLoader("map-blocker"),j.byId("legend").refresh(a)}),na.map.addLayers(E),g.on("load",Y.setOverlayLayerOrder),m.on("error",this.layerAddError),h.on("error",this.layerAddError),y.on("error",this.layerAddError),i.on("error",this.layerAddError),t.on("error",this.layerAddError),l.on("error",this.layerAddError),g.on("error",this.layerAddError),p.on("error",this.layerAddError),f.on("error",this.layerAddError),d.on("error",this.layerAddError)},na.layerAddError=function(e){require(["modules/ErrorController"],function(a){a.show(10,"Error adding Layer : <br> "+e.target.url)})},na.toggleFireOption=function(e){var a=e.target?e.target:e.srcElement;t(".selected-fire-option").forEach(function(e){o.remove(e,"selected-fire-option")}),o.add(a,"selected-fire-option"),Y.updateFiresLayer()},na.enableLayersFromHash=function(){function t(){j.byId("fires-checkbox").set("checked",!0),Y.updateLayersInHash("add",M.firesLayer.id,M.firesLayer.id)}function r(t,r){if(void 0!==t&&""!==t)if(void 0===r)p[t]&&(o=p[t].id,j.byId(o)&&(j.byId(o).set("checked",!0),e.emit(a.byId(o),"change",{})));else{n=p[t],s=r.split(",");for(var i=0,l=s.length;l>i;i++)if(o=n[s[i]].id,"[object Array]"===Object.prototype.toString.call(o))for(var d=0,c=o.length;c>d;d++)j.byId(o[d])&&(j.byId(o[d]).set("checked",!0),e.emit(a.byId(o[d]),"change",{}));else j.byId(o)&&(j.byId(o).set("checked",!0),e.emit(a.byId(o),"change",{}))}}var i,o,n,s,l=ea.getHash(),d=l.lyrs,c=d.split(":"),p=M.layersCheckboxes;if(void 0===d)return void t();if(1===c.length&&""===c[0])return void t();for(var y=0,g=c.length;g>y;y++)i=c[y].split("/"),r(i[0],i[1])},na.clearSearchPins=function(){na.map.graphics.clear(),F.set("showClearPinsOption",!1)},na.toggleLegend=function(){var e=a.byId("legend-widget-container"),t=e.offsetHeight-2===280?30:280;s.animateProperty({node:e,properties:{height:t},duration:500}).play(),30===t?o.add("legend-widget-title","legend-closed"):o.remove("legend-widget-title","legend-closed")},na.printMap=function(){var a=document.getElementsByTagName("body")[0];o.add("print-button","loading"),o.add(a,"map-view-print"),j.byId("stackContainer").resize(),j.byId("mapView").resize(),na.map.resize(),e.once(na.map,"resize",function(){setTimeout(function(){window.print(),o.remove("print-button","loading"),o.remove(a,"map-view-print"),j.byId("stackContainer").resize(),na.map.resize()},2e3)})},na.reportAnalyticsHelper=function(e,a,t){ga("A.send","event",e,a,t),ga("B.send","event",e,a,t),ga("C.send","event",e,a,t)},na.showEmbedCode=function(){j.byId("embedCodeShareDialog")&&j.byId("embedCodeShareDialog").destroy();var e,t="<iframe src='"+window.location+"' height='600' width='900'></iframe>",r=new ra({title:"Embed Code",style:"width: 350px",id:"embedCodeShareDialog",content:'Copy the code below to embed in your site. (Ctrl+C on PC and Cmd+C on Mac)<div class=\'dijitDialogPaneActionBar\'><input id="embedInput" type="text" value="'+t+'" autofocus /></div>'});e=function(){r.destroy()},r.show(),a.byId("embedInput").select(),r.on("cancel",function(){e()})},na});