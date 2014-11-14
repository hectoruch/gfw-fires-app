/*! Global-Forest-Watch-Fires Fri Nov 14 2014 15:52:50 */
define(["dojo/on","dojo/dom","esri/tasks/query","esri/tasks/QueryTask","views/map/MapConfig","views/map/MapModel","dojo/_base/array"],function(on,dom,Query,QueryTask,MapConfig,MapModel,arrayUtil){var o={};return o.queryDistinct=function(a,b,c){var d=new Query;d.returnGeometry=!1,d.where="1=1",d.outFields=[b],d.returnDistinctValues=!0;var e=new QueryTask(a);e.execute(d,c)},o.populatecallback=function(){},o.init_time_selects=function(){var a=new Date,b=new Date;b.setDate(a.getDate()-7);for(var c=new Date(2013,1,1),d=[],e=c.getFullYear();e<=a.getFullYear();e++)d.push(e);MapModel.vm.reportDateControl.fromYear(d),MapModel.vm.reportDateControl.dateVals().fYear(b.getFullYear()),MapModel.vm.reportDateControl.dateVals().fMonth(b.getMonth()+1),MapModel.vm.reportDateControl.dateVals().fDay(b.getUTCDate()),MapModel.vm.reportDateControl.dateVals().tYear(a.getFullYear()),MapModel.vm.reportDateControl.dateVals().tMonth(a.getMonth()+1),MapModel.vm.reportDateControl.dateVals().tDay(a.getUTCDate()),MapModel.vm.noaaDateControl.fromYear(2014),MapModel.vm.noaaDateControl.dateVals().fYear(2014),MapModel.vm.noaaDateControl.dateVals().fMonth(10),MapModel.vm.noaaDateControl.dateVals().fDay(12),MapModel.vm.noaaDateControl.dateVals().tYear(a.getFullYear()),MapModel.vm.noaaDateControl.dateVals().tMonth(a.getMonth()+1),MapModel.vm.noaaDateControl.dateVals().tDay(a.getUTCDate()),MapModel.vm.indoDateControl.fromYear(d),MapModel.vm.indoDateControl.dateVals().fYear(b.getFullYear()),MapModel.vm.indoDateControl.dateVals().fMonth(b.getMonth()+1),MapModel.vm.indoDateControl.dateVals().fDay(b.getUTCDate()),MapModel.vm.indoDateControl.dateVals().tYear(b.getFullYear()),MapModel.vm.indoDateControl.dateVals().tMonth(b.getMonth()+1),MapModel.vm.indoDateControl.dateVals().tDay(b.getUTCDate()),MapModel.vm.windDateControl.fromYear(d),MapModel.vm.windDateControl.dateVals().fYear(a.getFullYear()),MapModel.vm.windDateControl.dateVals().fMonth(a.getMonth()+1),MapModel.vm.windDateControl.dateVals().fDay(a.getUTCDate()),MapModel.vm.windDateControl.dateVals().tYear(a.getFullYear()),MapModel.vm.windDateControl.dateVals().tMonth(a.getMonth()+1),MapModel.vm.windDateControl.dateVals().tDay(a.getUTCDate())},o.bind_events=function(){var a;on(dom.byId("report-island-radio"),"change",function(){var a=MapModel.vm.islands();MapModel.vm.reportAOIs([]),arrayUtil.forEach(a,function(a){MapModel.vm.reportAOIs.push(a)}),MapModel.vm.selectedAOIs(["Sumatra"])}),on(dom.byId("report-province-radio"),"change",function(){var a=MapModel.vm.provinces();MapModel.vm.reportAOIs([]),arrayUtil.forEach(a,function(a){MapModel.vm.reportAOIs.push(a)}),MapModel.vm.selectedAOIs(["Riau"])}),on(dom.byId("report-launch"),"click",function(){var b=MapModel.vm.reportDateControl.dateVals();console.log("dates launch",b);var c={};for(var d in b)b.hasOwnProperty(d)&&(c[d]=b[d]());dom.byId("report-province-radio").checked?a="PROVINCE":dom.byId("report-island-radio").checked&&(a="ISLAND");var e=o.report_data_to_hash(a,b,MapModel.vm.selectedAOIs),f=window.open("./app/js/views/report/report.html"+e,"Report","");f.report=!0,f.reportOptions={dates:c,aois:MapModel.vm.selectedAOIs(),aoitype:a}})},o.report_data_to_hash=function(a,b,c){var d,e,f="#",g=[];for(var h in b)b.hasOwnProperty(h)&&g.push([h,b[h]()].join("-"));return d="dates="+g.join("!"),e="aois="+c().join("!"),f+=["aoitype="+a,d,e].join("&"),console.log("HASH STING",f),f},o.populate_select=function(){var a=this,b=MapConfig.firesLayer;a.init_time_selects(),a.bind_events(),selaois=MapModel.vm.selectedAOIs;var c=function(a){var b=[];arrayUtil.forEach(a.features,function(a){""!=a.attributes.ISLAND&&b.push(a.attributes.ISLAND)}),MapModel.vm.islands(b.sort()),MapModel.vm.reportAOIs(b),MapModel.vm.selectedAOIs(["Sumatra"])},d=function(a){var b=[];arrayUtil.forEach(a.features,function(a){""!=a.attributes.PROVINCE&&b.push(a.attributes.PROVINCE)}),MapModel.vm.provinces(b.sort())},e="http://gis-potico.wri.org/arcgis/rest/services/Fires/FIRMS_ASEAN/MapServer/7";a.queryDistinct(e+"?returnDistinctValues=true",b.report_fields.islands,c),a.queryDistinct(e+"?returnDistinctValues=true",b.report_fields.provinces,d)},o.query=function(props){var layer=props.layer,where=props.where||"1=1",returnGeometry=props.returnGeometry||!1,outFields=props.outFields||["*"],type=props.type||"execute",queryTask=new QueryTask(layer),query=new Query;query.where=where,query.returnGeometry=returnGeometry,query.outFields=outFields,query.getCount;var deferred=eval("queryTask."+type+"(query)");return deferred},o});