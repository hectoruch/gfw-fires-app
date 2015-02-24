define(["dojo/on","dojo/dom","esri/tasks/query","esri/tasks/QueryTask","views/map/MapConfig","views/map/MapModel","dojo/_base/array"],function(on,dom,Query,QueryTask,MapConfig,MapModel,arrayUtil){var o={};return o.queryDistinct=function(e,t,r){var a=new Query;a.returnGeometry=!1,a.where="1=1",a.outFields=[t],a.returnDistinctValues=!0;var o=new QueryTask(e);o.execute(a,r)},o.populatecallback=function(){},o.init_time_selects=function(){var e=new Date,t=new Date;t.setDate(e.getDate()-7);for(var r=new Date(2013,1,1),a=[],o=r.getFullYear();o<=e.getFullYear();o++)a.push(o)},o.bind_events=function(){var e;on(dom.byId("report-island-radio"),"change",function(){var e=MapModel.vm.islands();MapModel.vm.reportAOIs([]),arrayUtil.forEach(e,function(e){MapModel.vm.reportAOIs.push(e)}),MapModel.vm.selectedAOIs(["Sumatra"])}),on(dom.byId("report-province-radio"),"change",function(){var e=MapModel.vm.provinces();MapModel.vm.reportAOIs([]),arrayUtil.forEach(e,function(e){MapModel.vm.reportAOIs.push(e)}),MapModel.vm.selectedAOIs(["Riau"])}),on(dom.byId("report-launch"),"click",function(){dom.byId("report-province-radio").checked?e="PROVINCE":dom.byId("report-island-radio").checked&&(e="ISLAND");var t=$("#firesDateFrom").datepicker("getDate"),r=("0"+(t.getMonth()+1).toString()).substr(-2)+"/"+("0"+t.getDate().toString()).substr(-2)+"/"+t.getFullYear().toString(),a=$("#firesDateTo").datepicker("getDate"),s=("0"+(a.getMonth()+1).toString()).substr(-2)+"/"+("0"+a.getDate().toString()).substr(-2)+"/"+a.getFullYear().toString(),n=r.split("/"),i=s.split("/"),u={};u.fYear=Number(n[2]),u.fMonth=Number(n[0]),u.fDay=Number(n[1]),u.tYear=Number(i[2]),u.tMonth=Number(i[0]),u.tDay=Number(i[1]);var p=o.report_data_to_hash(e,u,MapModel.vm.selectedAOIs),l=window.open("./app/js/views/report/report.html"+p,"Report","");l.report=!0,l.reportOptions={dates:u,aois:MapModel.vm.selectedAOIs(),aoitype:e}})},o.report_data_to_hash=function(e,t,r){var a,o,s="#",n=[];for(var i in t)t.hasOwnProperty(i)&&n.push([i,t[i]].join("-"));return a="dates="+n.join("!"),o="aois="+r().join("!"),s+=["aoitype="+e,a,o].join("&"),console.log("HASH STING",s),s},o.populate_select=function(){var e=this,t=MapConfig.firesLayer;e.bind_events(),selaois=MapModel.vm.selectedAOIs;var r=function(e){var t=[];arrayUtil.forEach(e.features,function(e){""!=e.attributes.ISLAND&&t.push(e.attributes.ISLAND)}),MapModel.vm.islands(t.sort()),MapModel.vm.reportAOIs(t),MapModel.vm.selectedAOIs(["Sumatra","Kalimantan","Lesser Sunda","Maluku","Papua","Sulawesi","Java"])},a=function(e){var t=[];arrayUtil.forEach(e.features,function(e){""!=e.attributes.PROVINCE&&t.push(e.attributes.PROVINCE)}),MapModel.vm.provinces(t.sort())},o="http://gis-potico.wri.org/arcgis/rest/services/Fires/FIRMS_ASEAN/MapServer/7";e.queryDistinct(o+"?returnDistinctValues=true",t.report_fields.islands,r),e.queryDistinct(o+"?returnDistinctValues=true",t.report_fields.provinces,a)},o.query=function(props){var layer=props.layer,where=props.where||"1=1",returnGeometry=props.returnGeometry||!1,outFields=props.outFields||["*"],type=props.type||"execute",queryTask=new QueryTask(layer),query=new Query;query.where=where,query.returnGeometry=returnGeometry,query.outFields=outFields,query.getCount;var deferred=eval("queryTask."+type+"(query)");return deferred},o.reportFromBuble=function(){var e="ISLAND",t=new Date,r=("0"+(t.getMonth()+1).toString()).substr(-2)+"/"+("0"+t.getDate().toString()).substr(-2)+"/"+t.getFullYear().toString(),a=new Date((new Date).setDate((new Date).getDate()-7)),s=("0"+(a.getMonth()+1).toString()).substr(-2)+"/"+("0"+a.getDate().toString()).substr(-2)+"/"+a.getFullYear().toString(),n=s.split("/"),i=r.split("/"),u={};u.fYear=Number(n[2]),u.fMonth=Number(n[0]),u.fDay=Number(n[1]),u.tYear=Number(i[2]),u.tMonth=Number(i[0]),u.tDay=Number(i[1]),MapModel.vm.selectedAOIs(["Sumatra","Kalimantan","Lesser Sunda","Maluku","Papua","Sulawesi","Java"]);{var p=o.report_data_to_hash(e,u,MapModel.vm.selectedAOIs);window.open("./app/js/views/report/report.html"+p,"Report","")}},o});