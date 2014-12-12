/*! Global-Forest-Watch-Fires Fri Dec 12 2014 09:16:49 */
define(["knockout","dojo/on","dojo/mouse","dojo/dom","dojo/dom-attr","dojo/hash","dojo/query","dojo/cookie","dijit/Dialog","dojo/io-query","dojo/Deferred","dojo/_base/array","dojo/promise/all","dojo/dom-construct","dojo/dom-style","dojo/topic","dijit/registry","dijit/form/CheckBox","dijit/TooltipDialog","dijit/Tooltip","views/map/MapModel","views/map/MapConfig","modules/HashController","esri/layers/LayerDrawingOptions","esri/request","esri/tasks/query","esri/tasks/QueryTask","esri/geometry/webMercatorUtils","esri/layers/MosaicRule","esri/TimeExtent","esri/dijit/TimeSlider","esri/Color","esri/graphic","esri/geometry/Point","esri/geometry/Polygon","esri/symbols/SimpleLineSymbol","esri/symbols/SimpleFillSymbol","esri/symbols/PictureMarkerSymbol","esri/SpatialReference","libs/moment","libs/timezone"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L){"use strict";var M,N=!1;return{setMap:function(a){M=a},refreshLegend:function(){var a,b=M.getLayer(v.landCoverLayers.id),c=b.visibleLayers,d=new esri.layers.LayerDrawingOptions,e=[],f=[29];d.transparency=0,M.getLayer(v.treeCoverLayer.id).visible&&(a=29),l.forEach(f,function(a){c.indexOf(a)>-1&&(c.splice(c.indexOf(a),1),b.setVisibleLayers(c))}),M.getLayer(v.treeCoverLayer.id).visible&&(c.push(a),e[a]=d,b.setVisibleLayers(c),b.setLayerDrawingOptions(e)),q.byId("legend").refresh()},setTransparency:function(a,b){var c=Math.floor(b)/100,d=M.getLayer(a);d&&d.setOpacity(c),"Land_Cover"===a&&(d=M.getLayer(v.treeCoverLayer.id),d&&d.setOpacity(c),d=M.getLayer(v.primaryForestsLayer.id),d&&d.setOpacity(c)),this.refreshLegend()},toggleLayerVisibility:function(a,b,c){var d=M.getLayer(a);d&&(d.visible!==b&&d.setVisibility(b),b?this.updateLayersInHash("add",a,c||a):this.updateLayersInHash("remove",a,a)),this.refreshLegend()},toggleMapServiceLayerVisibility:function(a,b,c){var d,e=a.visibleLayers;c?(a.visible||a.setVisibility(c),e.push(b),d=e):d=l.filter(e,function(a){return a!=b}),a.setVisibleLayers(d)},getTimeDefinition:function(a,b,c){var d=a+">= date'"+b+"'",e=a+" < date'"+c+"'",f=[d,e].join(" AND ");return console.log(f),f},updateDynamicMapServiceLayerDefinition:function(a,b,c){var d=a.layerDefinitions;d[b]=c,a.setLayerDefinitions(d)},updateFiresLayer:function(a){var b,c,e=g(".selected-fire-option")[0],f=d.byId("confidence-fires-checkbox").checked,h=[],i="",j=new Date,k=new Date;switch(e.id){case"fires72":k.setDate(j.getDate()-4),j.setDate(j.getDate()-3);break;case"fires48":k.setDate(j.getDate()-3),j.setDate(j.getDate()-2);break;case"fires24":k.setDate(j.getDate()-2),j.setDate(j.getDate()-1);break;default:i="1 = 1"}if(l.indexOf(["fires72","fires48","fires24"],e.id)>-1){var m=k.getFullYear(),n="00"+(k.getMonth()+1).toString();n=n.substr(n.length-2);var o="00"+k.getDate().toString();o=o.substr(o.length-2);var p="00"+j.getDate().toString();p=p.substring(p.length-2);{var q=k.getHours(),r=k.getMinutes(),s=k.getSeconds(),t=m.toString()+"-"+n+"-"+o+" "+q+":"+r+":"+s;m.toString()+"-"+n+"-"+p+" "+q+":"+r+":"+s}i+="ACQ_DATE > date '"+t+"'"}for(var u=0,w=v.firesLayer.defaultLayers.length;w>u;u++)h[u]=i;c=M.getLayer(v.firesLayer.id),c&&(c.setLayerDefinitions(h),a||this.refreshLegend()),a&&(b=f?[0,1]:[0,1,2,3],c&&c.setVisibleLayers(b),this.refreshLegend())},updateAdditionalVisibleLayers:function(a,b){var c,d=M.getLayer(b.id),e=[],f="";g("."+a).forEach(function(a){a.checked&&(c=b[a.value],c&&e.push(c))}),0===e.length&&e.push(-1),d&&(d.setVisibleLayers(e),d.visible?-1===e[0]?this.toggleLayerVisibility(b.id,!1):(f="/"+e.join(","),this.updateLayersInHash("add",b.id,b.id+f)):(f="/"+e.join(","),this.toggleLayerVisibility(b.id,!0,b.id+f))),this.refreshLegend()},updateLandCoverLayers:function(a){var b=a.target?a.target:a.srcElement;this.updatePeatLandsLayer(b.id),this.updateTreeCoverLayer("tree-cover-density-radio"===b.id),this.updatePrimaryForestsLayer("primary-forests-radio"===b.id)},toggleDigitalGlobeLayer:function(a,b){var c=this,e=(M.getLayer(v.digitalGlobe.id),a?"block":"none");b&&(e="block"),o.set(d.byId("timeSliderPanel"),"display",e),this.getBoundingBoxesForDigitalGlobe().then(function(){if(a&!b&&c.promptAboutDigitalGlobe(),b&&0==a){var d=M.getLayer(v.digitalGlobe.graphicsLayerId);return void d.clear()}c.toggleDigitalGlobeLayerVisibility(v.digitalGlobe.id,a),c.showHelperLayers(v.digitalGlobe.graphicsLayerId,a),c.generateTimeSlider("timeSliderDG","timeSliderPanel",b)})},toggleDigitalGlobeLayerVisibility:function(a,b){if(b)this.updateLayersInHash("add",a,a);else{this.updateLayersInHash("remove",a,a);{v.digitalGlobe.mosaics.map(function(a){var c=M.getLayer(a);!c.visible&&b&&c.setVisibility(b),b||c.setVisibility(b)})}}},showHelperLayers:function(a,b){var c=M.getLayer(a);c&&c.visible!==b&&c.setVisibility(b)},filter_footprints:function(a,b,c){var d=M.getLayer(v.digitalGlobe.graphicsLayerId),e=u.get("model").DigitalGlobeExtents(),f=e.filter(function(d){return d.attributes[a]>=b&&d.attributes[a]<=c});d.clear(),f.map(function(a){d.add(a)})},getBoundingBoxesForDigitalGlobe:function(){var a=new k,b=u.get("model"),c=v.digitalGlobe,d=M.getLayer(v.digitalGlobe.graphicsLayerId),e={},f="",g=[];if(N)a.resolve();else{var h=v.digitalGlobe.mosaics.map(function(a){var h=new A(c.imagedir+a+"/ImageServer"),i=new k,j=new z,m=[];return j.outFields=["OBJECTID","Name","AcquisitionDate"],j.where="Category = 1",j.returnGeometry=!0,h.execute(j,function(a){N=!0,l.forEach(a.features,function(a){a.setSymbol(new K(K.STYLE_SOLID,new J(J.STYLE_SOLID,new F([255,0,0]),2),new F([0,255,0,0]))),a.attributes.Layer="Digital_Globe",f=moment(a.attributes.AcquisitionDate),g.push(f),a.attributes.moment=f,d.add(a),m.push(a),e[a.attributes.Tiles]=B.geographicToWebMercator(a.geometry).getExtent()}),g.length&&b.dgMoments(g.sort(function(a,b){return a-b})),b.DigitalGlobeExtents(b.DigitalGlobeExtents().concat(m)),i.resolve(!0)},function(a){console.error(a),i.resolve(!0)}),i.promise});m(h).then(function(){a.resolve(!0)})}return a.promise},showDigitalGlobeImagery:function(a){var b=a.split("_id_"),c=b[1],d=b[0],e=M.getLayer(v.digitalGlobe.sensorTypes[d]),f=new C;f.method=C.METHOD_LOCKRASTER;v.digitalGlobe.mosaics.map(function(a){var b=M.getLayer(a);b&&b.visible&&b.setVisibility(!1)});e&&!e.visible&&(f.lockRasterIds=[c],e.setMosaicRule(f),e.setVisibility(!0))},getSliderTicLabels:function(a){u.get("model");g(".dijitRuleLabel.dijitRuleLabelH").forEach(function(b,c){var d=moment(a.timeStops[c]).format("MMM YYYY");e.set(b,"title",d),b.innerHTML.length<=0&&(o.set(b,"width","10px"),o.set(b,"height","20px"),o.set(b,"top","-20px"))})},generateTimeTooltips:function(a){var d="#timeSliderDG .dijitSliderImageHandle",f=g(d);g(".dijitRuleMark.dijitRuleMarkH").forEach(function(b,c){e.set(b,"title",moment(a.timeStops[c]).format("MMM YY"))}),f.forEach(function(a,d){e.set(a,"thumbIndex",d);var f=n.toDom("<div id = 'thumbIndex_"+d+"class='TimeTT' thumbIndex="+d+" ></div>");n.place(f,a,"before"),b(a,c.enter,function(){o.set(f,"display","block")}),b(a,c.leave,function(){o.set(f,"display","none")})}),this.getSliderTicLabels(a);var h=new t({connectId:"timeSliderDG",selector:".dijitSliderImageHandle",defaultPosition:"above",showDelay:1,getContent:function(b){var c=a._slider.valueNode,d=e.get(c,"value").split(","),f=e.get(b,"thumbIndex"),g=d[f],h=100/a.timeStops.length,i=parseInt(g/h);return moment(a.timeStops[i]).format("MMM YY")}});return h},generateTimeSlider:function(a,b,c){var e,f=this,g=!0,h=u.get("model"),i="";if(n.create("div",{id:a},d.byId(b)),!q.byId("timeSliderDG")){e=new E({style:"width: 100%;",id:"timeSliderDG"},d.byId(a));var j=new D;e.setThumbCount(2),e.setThumbMovingRate(2e3),e.setLoop(!0),n.destroy(q.byId(e.nextBtn.id).domNode.parentNode),q.byId(e.previousBtn.id).domNode.style["vertical-align"]="text-bottom",q.byId(e.playPauseBtn.id).domNode.style["vertical-align"]="text-bottom",i=h.dgMoments(),j.startTime=new Date(i[0].format("MM/DD/YYYY")),j.endTime=new Date(i[i.length-1].format("MM/DD/YYYY")),f.filter_footprints("moment",i[0],i[1]),e.createTimeStopsByTimeInterval(j,1,"esriTimeUnitsMonths");var k=j.startTime.getUTCFullYear(),l=e.timeStops.map(function(a,b){return 0===b?k:a.getUTCFullYear()!=k?k=a.getUTCFullYear():""});e.setLabels(l),e.startup();{f.generateTimeTooltips(e)}M.setTimeSlider(e),h.timeSlider=e}h.timeSlider.on("time-extent-change",function(a){var b;setTimeout(function(){M.infoWindow.hide(),b=g?[0,h.timeSlider.thumbIndexes[0]]:[h.timeSlider.thumbIndexes[0],h.timeSlider.thumbIndexes[1]];h.timeSlider.timeStops;"true"==dijit.byId("digital-globe-footprints-checkbox").getValue()&&f.filter_footprints("moment",moment(a.startTime),moment(a.endTime)),a!=h.timeEvent&&p.publish("time-extent-changed"),h.timeEvent=a},0)}),c?"true"==dijit.byId("digital-globe-footprints-checkbox").getValue()&&f.filter_footprints("moment",moment(h.timeEvent.startTime),moment(h.timeEvent.endTime)):h.timeSlider.setThumbIndexes([0,h.timeSlider.timeStops.length-1])},promptAboutDigitalGlobe:function(){q.byId("digitalGlobeInstructions")&&q.byId("digitalGlobeInstructions").destroy();var a,c,e,f,g,j=new i({title:"Digital Globe - First Look",style:"width: 350px",id:"digitalGlobeInstructions",content:"<p>To display an image, click on the image in the list or click on the footprint on the map and select the image from the pop-up.</p><p>Filter the image list by date via the timeline or by map extent via panning or zooming.</p><div class='dijitDialogPaneActionBar'><button id='closeDGInstructions'>Ok</button></div><div class='dialogCheckbox'><input type='checkbox' id='remembershowInstructions' /><label for='rememberBasemapDecision'>Don't show me this again.</label></div>"});c=function(){d.byId("remembershowInstructions")&&d.byId("remembershowInstructions").checked&&h("digitalGlobeInstructions","dontShow",{expires:7})},f=function(a){c(),g&&g.destroy(),e&&e.remove(),a&&j.destroy()},a=h("digitalGlobeInstructions"),void 0===a||"dontShow"!==a?(j.show(),g=new r({checked:!1},"remembershowInstructions"),e=b(d.byId("closeDGInstructions"),"click",function(){f(!0)}),j.on("cancel",function(){f(!1)})):f(!0)},updatePeatLandsLayer:function(a){var b=v.landCoverLayers,c=M.getLayer(b.id),d=[],e="";"peat-lands-radio"===a?(d.push(b.peatLands),e="/"+d.join(",")):d.push(-1),c.setVisibleLayers(d),""!==e?this.toggleLayerVisibility(b.id,"tree-cover-density-radio"===a||"peat-lands-radio"===a,b.id+e):this.toggleLayerVisibility(b.id,"tree-cover-density-radio"===a||"peat-lands-radio"===a)},updateTreeCoverLayer:function(a){this.toggleLayerVisibility(v.treeCoverLayer.id,a)},updatePrimaryForestsLayer:function(a){var b=v.primaryForestsLayer.id,c=M.getLayer(b),d="",e=[];u.set("showPrimaryForestOptions",a),g("#primary-forests-options input:checked").forEach(function(a){e.push(a.value)}),0===e.length&&e.push(-1),c&&c.setVisibleLayers(e),d="/"+e.join(","),this.toggleLayerVisibility(b,a,b+d)},addTemporaryGraphicForDigitalGlobe:function(){var a,b,c;b=new H(100.45,2.015),c=new L({angle:0,xoffset:0,yoffset:10,type:"esriPMS",imageData:"iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAADImlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1MzA4NzI3NkQyN0MxMUUwQUU5NUVFMEYwMTY0NzUwNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1MzA4NzI3N0QyN0MxMUUwQUU5NUVFMEYwMTY0NzUwNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjUzMDg3Mjc0RDI3QzExRTBBRTk1RUUwRjAxNjQ3NTA1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjUzMDg3Mjc1RDI3QzExRTBBRTk1RUUwRjAxNjQ3NTA1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQg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",contentType:"image/png",width:24,height:24}),a=new G(b,c,{id:"temp_graphic"}),M.graphics.add(a)},removeDigitalGlobeTemporaryGraphic:function(){l.forEach(M.graphics.graphics,function(a){a.attributes&&"temp_graphic"===a.attributes.id&&M.graphics.remove(a)})},adjustOverlaysLayer:function(){var a=[],b=M.getLayer(v.overlaysLayer.id),c="";g(".overlays-checkboxes .dijitCheckBoxInput").forEach(function(b){switch(b.id){case"provinces-checkbox":b.checked&&a.push(4);break;case"districts-checkbox":b.checked&&a.push(3);break;case"subdistricts-checkbox":b.checked&&a.push(2);break;case"villages-checkbox":b.checked&&a.push(1)}}),0===a.length?(a.push(-1),this.toggleLayerVisibility(v.overlaysLayer.id,!1)):b&&(b.setVisibleLayers(a),c="/"+a.join(","),this.toggleLayerVisibility(v.overlaysLayer.id,!0,v.overlaysLayer.id+c))},setOverlayLayerOrder:function(a){var b=M.getLayer(v.overlaysLayer.id),c=a.target.createDynamicLayerInfosFromLayerInfos();c=c.slice(1),c.reverse(),b.setDynamicLayerInfos(c)},updateLayersInHash:function(a,b,c){var d,e=j.queryToObject(f()),g=e.lyrs,h=g.split(":"),i=h.length,k=0;if("remove"===a){for(k;i>k;k++)h[k].search(b)>-1&&(d=k);void 0!==d&&h.splice(d,1)}else if("add"===a){for(k;i>k;k++)h[k].search(b)>-1&&(d=k);void 0!==d?h.splice(d,1,c):h.push(c)}h=l.filter(h,function(a){return""!==a}),w.updateHash({lyrs:h.join(":")})},updateLegend:function(){}}});