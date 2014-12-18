define(["dojo/on","dojo/dom","dojo/cookie","dojo/Deferred","dijit/Dialog","dijit/form/CheckBox","dijit/registry","esri/request","utils/Helper","utils/RasterLayer","views/map/MapModel","modules/ErrorController","views/map/LayerController","dojo/_base/array","libs/windy"],function(e,a,t,o,n,i,r,s,d,c,l,p,m,h){var u,y,g,b,w,v,f={dataUrl:"http://suitability-mapper.s3.amazonaws.com/wind/wind-surface-level-gfs-1.0.gz.json",id:"Wind_Direction",opacity:.85,mapLoaderId:"map_loader",mapLoaderContainer:"map-container"};return{setMap:function(e){u=e},toggleWindLayer:function(e){void 0===y&&(y=this.supportsCanvas(),y===!1&&(r.byId("windy-layer-checkbox").set("checked",!1),r.byId("windy-layer-checkbox").set("disabled",!0),p.show(10,"This browser does not support this feature. Visit <a target='_blank' href='http://www.caniuse.com/#search=canvas'>caniuse.com</a> for supported browsers."))),e?(this.activateWindLayer(),m.updateLayersInHash("add",f.id,f.id)):(this.deactivateWindLayer(),m.updateLayersInHash("remove",f.id,f.id))},activateWindLayer:function(e){function a(){b=new c(null,{opacity:f.opacity,id:f.id}),u.addLayer(b),g=[],g.push(u.on("extent-change",t.redraw)),g.push(u.on("zoom-start",t.redraw)),g.push(u.on("pan-start",t.redraw)),w=new Windy({canvas:b._element,data:v}),t.redraw(),t.toggleLegend(!0)}var t=this;return e?void this.promptAboutBasemap().then(function(){t.fetchDataForWindLayer(e).then(a)}):void(v?(console.log("just promptinggg then creating"),this.promptAboutBasemap().then(a)):(console.log("fetching data then creating"),this.promptAboutBasemap().then(function(){t.fetchDataForWindLayer().then(a)})))},promptAboutBasemap:function(){r.byId("windLayerBasemapDialog")&&r.byId("windLayerBasemapDialog").destroy();var s,d,c,l,p,m,u,y,g=new n({title:"Would you like to change basemaps?",style:"width: 350px",id:"windLayerBasemapDialog",content:"This layer is best visualized with the Dark Gray Canvas basemap.  Would you like to switch to it now.<div class='dijitDialogPaneActionBar'><button id='acceptBasemapChange'>Yes</button><button id='denyBasemapChange'>No</button></div><div class='dialogCheckbox'><input type='checkbox' id='rememberBasemapDecision' /><label for='rememberBasemapDecision'>Remember my decision</label></div>"}),b=new o,w="dark gray canvas";l=function(e){a.byId("rememberBasemapDecision")&&a.byId("rememberBasemapDecision").checked&&e&&t("windBasemapDecision",e,{expires:7})},d=function(e){y&&y.destroy(),p&&p.remove(),m&&m.remove(),e&&g.destroy()},u=function(e){e&&l("dontChange"),d(e),b.resolve()},s=function(){var e;h.some(r.byId("basemap-gallery").basemaps,function(a){var t=a.title.toLowerCase()===w;return e=a,t}),l("changeBasemap"),d(!0),b.resolve();var a=r.byId("basemap-gallery").getSelected();a?a.title.toLowerCase()!=w&&r.byId("basemap-gallery").select(e.id):r.byId("basemap-gallery").select(e.id)},c=t("windBasemapDecision");var v;return v=r.byId("basemap-gallery").getSelected()?r.byId("basemap-gallery").getSelected():"topo",void 0!==c||"topo"!==v&&v.title.toLowerCase()==w?"changeBasemap"===c?s():u(!1):(g.show(),y=new i({checked:!1},"rememberBasemapDecision"),p=e(a.byId("acceptBasemapChange"),"click",s),m=e(a.byId("denyBasemapChange"),"click",function(){u(!0)}),g.on("cancel",function(){u(!1)})),b.promise},deactivateWindLayer:function(){var e=u.getLayer(f.id);if(e){u.removeLayer(e),b=void 0,w=void 0;for(var a=g.length-1;a>=0;a--)g[a].remove()}this.toggleLegend(!1)},fetchDataForWindLayer:function(e){d.showLoader(f.mapLoaderContainer,f.mapLoaderId),e&&(f.dataUrl=e),console.log(f.dataUrl);var a=new o,t=new s({url:f.dataUrl,content:{},handleAs:"json"});return t.then(function(e){v=e,a.resolve(!0),d.hideLoader(f.mapLoaderId)},function(e){console.error(e),a.resolve(!1),d.hideLoader(f.mapLoaderId)}),a.promise},redraw:function(){if(b){b._element.height=u.height,b._element.width=u.width,w.stop();var e=u.geographicExtent;setTimeout(function(){w.start([[0,0],[u.width,u.height]],u.width,u.height,[[e.xmin,e.ymin],[e.xmax,e.ymax]])},500)}},toggleLegend:function(e){e?l.set("showWindLegend",!0):l.set("showWindLegend",!1)},supportsCanvas:function(){return!!document.createElement("canvas").getContext}}});