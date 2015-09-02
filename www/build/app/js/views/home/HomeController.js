define(["dojo/dom","dijit/registry","modules/HashController","modules/EventsController","views/home/HomeModel","dojo/_base/array","views/map/MapConfig"],function(dom,registry,HashController,EventsController,HomeModel,arrayUtil,MapConfig){var o={},initialized=!1,viewName="homeView",viewObj={viewId:"homeView",viewName:"home"},stopAnimation=!1;return o.init=function(){return initialized?(EventsController.switchToView(viewObj),void 0):(require(["dojo/text!views/home/home.html"],function(e){initialized=!0,dom.byId(viewName).innerHTML=e,EventsController.switchToView(viewObj),HomeModel.applyBindings(viewName),EventsController.getPeats(),EventsController.startModeAnim()}),void 0)},o.startModeAnim=function(){console.log("start mode animation"),stopAnimation=!1;var e=1,o=function(e){var o=HomeModel.vm.homeModeOptions(),t=arrayUtil.map(o,function(o,t){return o.display=t===e?!0:!1,o});HomeModel.vm.homeModeOptions([]),HomeModel.vm.homeModeOptions(t)};o(e),require(["dojo/fx","dojo/_base/fx","dojo/query"],function(t,i,n){var r=function(a){var l=n(".modeGroup"),s=l.length,d=t.chain([i.animateProperty({node:l[a],properties:{marginLeft:{start:0,end:-350},opacity:{start:1,end:0}},onEnd:function(){var t;s-1>e?(t=e+1,e++):(t=0,e=0),setTimeout(function(){stopAnimation||(o(t),setTimeout(function(){stopAnimation||r(t)},4e3))},250)},units:"px",duration:500})]);d.play()};r(e)})},o.getPeats=function(){require(["modules/Loader","modules/ErrorController","dojo/promise/all"],function(e,o,t){var i=new Date,n=new Date;n.setDate(i.getDate()-8);var r=n.getFullYear(),a="00"+(n.getMonth()+1).toString();a=a.substr(a.length-2);var l="00"+n.getDate().toString();l=l.substr(l.length-2);var s=r.toString()+"-"+a+"-"+l,d={layer:"http://gis-potico.wri.org/arcgis/rest/services/Fires/FIRMS_ASEAN/MapServer/0",where:"peat = 1 AND ACQ_DATE > date '"+s+" 12:00:00'",type:"executeForCount"},m=e.query(d),u={layer:"http://gis-potico.wri.org/arcgis/rest/services/Fires/FIRMS_ASEAN/MapServer/0",where:"ACQ_DATE > date '"+s+" 12:00:00'",type:"executeForCount"},p=e.query(u);t([m,p]).then(function(e){var o=e[0],t=e[1],i=Math.round(o/t*100),n=HomeModel.vm.homeModeOptions(),r=0,a="";arrayUtil.some(n,function(e,o){var t=e.html.indexOf("Fires occuring in peatland")>-1;return t&&(r=o,a=e.html.replace("Fires occuring in peatland","<p>"+i.toString()+" %</p> Fires occuring in peatland")),t}),n[r].html=a,HomeModel.vm.homeModeOptions(n)})})},o.handleDotClick=function(e){o.stopModeAnim(e)},o.stopModeAnim=function(e){if(console.log(e),stopAnimation=!0,e){var o=e.id,t=HomeModel.vm.homeModeOptions();HomeModel.vm.homeModeOptions([]);{arrayUtil.map(t,function(e,t){return e.display=o==t?!0:!1,HomeModel.vm.homeModeOptions.push(e),e})}}},o.getAnimStatus=function(){return stopAnimation},o.modeSelect=function(data){var selectedMode=data;eval("EventsController."+selectedMode.eventName+"()"),data.html&&data.html.search("latest imagery")>-1&&(console.log(data.html),require(["views/map/LayerController"],function(){MapConfig.digitalGlobe.navigationBool=!0}))},o.isInitialized=function(){return initialized},o});