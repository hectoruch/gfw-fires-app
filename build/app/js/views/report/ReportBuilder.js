/*! Global-Forest-Watch-Fires Tue Dec 16 2014 17:59:14 */
define(["dojo/dom","dojo/ready","dojo/Deferred","dojo/dom-style","dojo/dom-class","dijit/registry","dojo/promise/all","dojo/_base/array","dojo/io-query","esri/map","esri/Color","esri/config","esri/layers/ImageParameters","esri/layers/ArcGISDynamicMapServiceLayer","esri/symbols/SimpleFillSymbol","esri/tasks/AlgorithmicColorRamp","esri/tasks/ClassBreaksDefinition","esri/tasks/GenerateRendererParameters","esri/renderers/UniqueValueRenderer","esri/layers/LayerDrawingOptions","esri/tasks/GenerateRendererTask","esri/tasks/query","esri/tasks/QueryTask","esri/tasks/StatisticDefinition","esri/graphicsUtils","esri/tasks/Date","views/map/MapConfig","views/map/MapModel","esri/request","knockout","libs/geostats","libs/highcharts"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E){var F={zoom:4,basemap:"gray",slider:!1,mapcenter:[120,-1.2],colorramp:[[252,221,209],[226,166,162],[199,111,116],[173,55,69],[147,1,22]],query_results:{},regionmap:{},maps:{},noFeatures:{pulpwoodQuery:"There are no fire alerts in pulpwood concessions in the AOI and time range.",palmoilQuery:"There are no fire alerts in palm oil concessions in the AOI and time range.",loggingQuery:"There are no fire alerts in logging concessions in the AOI and time range.",adminQuery:"There are no fire alerts in the AOI and time range.",subDistrictQuery:"There are no fire alerts for this AOI and time range."},firesLayer:{url:"http://gis-potico.wri.org/arcgis/rest/services/Fires/FIRMS_ASEAN/MapServer",id:"Active_Fires",fire_id:0,defaultLayers:[0],query:{layerId:0,outfields:["*"],fields:[{name:"LATITUDE",label:"LATITUDE"},{name:"LONGITUDE",label:"LONGITDUE"},{name:"BRIGHTNESS",label:"BRIGHTNESS"},{name:"CONFIDENCE",label:"CONFIDENCE"},{name:"ACQ_DATE",label:"ACQUISITION DATE"},{name:"ACQ_TIME",label:"ACQUISITION TIME"}]}},adminBoundary:{mapDiv:"district-fires-map",url:"http://gis-potico.wri.org/arcgis/rest/services/Fires/FIRMS_ASEAN/MapServer",id:"district-bounds",defaultLayers:[6],UniqueValueField:"DISTRICT",regionField:"PROVINCE",layerId:6,where:"fire_count > 0",classBreaksField:"fire_count",classBreaksMethod:"natural-breaks",breakCount:5,fromHex:"#fcddd1",toHex:"#930016",legendId:"legend",queryKey:"adminQuery",loaderId:"distmapload"},subdistrictBoundary:{mapDiv:"subdistrict-fires-map",url:"http://gis-potico.wri.org/arcgis/rest/services/Fires/FIRMS_ASEAN/MapServer",id:"subdistrict-bounds",defaultLayers:[5],UniqueValueField:"SUBDISTRIC",regionField:"DISTRICT",layerId:5,where:"fire_count > 0",classBreaksField:"fire_count",classBreaksMethod:"natural-breaks",breakCount:5,fromHex:"#fcddd1",toHex:"#930016",legendId:"SubDistrict-legend",queryKey:"subDistrictQuery",loaderId:"subdistmapload"},adminQuery:{outFields:["NAME_2","NAME_1","fire_count"],tableId:"district-fires-table",headerField:["DISTRICT","PROVINCE"],UniqueValueField:"DISTRICT",regionField:"PROVINCE",layerId:6,fire_stats:{id:0,outField:"fire_count",onField:"DISTRICT"}},subDistrictQuery:{outFields:["SUBDISTRIC","DISTRICT","fire_count"],tableId:"subdistrict-fires-table",UniqueValueField:"SUBDISTRIC",regionField:"DISTRICT",headerField:["SUBDISTRICT","DISTRICT"],fire_stats:{id:0,outField:"fire_count",onField:"SUBDISTRIC"},layerId:5},pulpwoodQuery:{outFields:["pulpwoodt","fire_count"],tableId:"pulpwood-fires-table",headerField:["NAME"],fire_stats:{id:0,outField:"fire_count",onField:"pulpwoodt"},layerId:5},palmoilQuery:{outFields:["palm_oilt","fire_count"],tableId:"palmoil-fires-table",headerField:["NAME"],fire_stats:{id:0,outField:"fire_count",onField:"palm_oilt"},layerId:5},loggingQuery:{outFields:["loggingt","fire_count"],tableId:"logging-fires-table",headerField:["NAME"],fire_stats:{id:0,outField:"fire_count",onField:"loggingt"},layerId:5},rspoQuery:{outFields:["palm_oil","fire_count"],tableId:"rspo-cert-table",headerField:["NAME"],groupByFieldsForStatistics:["CERT_SCHEM","palm_oil"],fire_stats:{id:0,outField:"fire_count",onField:"palm_oil"},layerId:5},queryUrl:"http://gis-potico.wri.org/arcgis/rest/services/Fires/FIRMS_ASEAN/MapServer",companyConcessionsId:1,confidenceFireId:0,dailyFiresId:8,dailyFiresField:"ACQ_DATE"};return{init:function(){var a=this,c=A.proxies,d=document.location.href,e="/proxy/proxy.ashx";for(var f in c)0===d.indexOf(f)&&(e=c[f]);a.init_report_options(),l.defaults.io.proxyUrl=e,Highcharts.setOptions({chart:{style:{fontFamily:"Arial MT Condensed Light"}}}),b(function(){g([a.buildFiresMap(),a.queryDistrictsFireCount("adminQuery").then(function(){a.buildFireCountMap("adminBoundary","adminQuery")}),a.queryDistrictsFireCount("subDistrictQuery").then(function(){a.buildFireCountMap("subdistrictBoundary","subDistrictQuery")}),a.queryDistrictsFireCount("pulpwoodQuery"),a.queryDistrictsFireCount("palmoilQuery"),a.queryDistrictsFireCount("loggingQuery"),a.queryDistrictsFireCount("rspoQuery"),a.queryForPeatFires(),a.queryForSumatraFires(),a.queryForMoratoriumFires(),a.queryForDailyFireData()]).then(function(){a.get_extent(),a.printReport()})})},init_report_options:function(){var b=this;window.reportOptions||b.read_hash();var c=window.reportOptions.dates;this.startdate=b.date_obj_to_string({year:c.fYear,month:c.fMonth,day:c.fDay}),this.enddate=b.date_obj_to_string({year:c.tYear,month:c.tMonth,day:c.tDay}),this.aoilist=window.reportOptions.aois.join(", "),this.aoitype=window.reportOptions.aoitype,a.byId("fromDate").innerHTML="From: "+b.startdate,a.byId("toDate").innerHTML="To: "+b.enddate,a.byId("aoiList").innerHTML="ON "+b.aoitype.toUpperCase()+"S: "+b.aoilist},read_hash:function(){var a,b=window.location.href,c=2==b.split("#").length&&b.split("#")[1].length>1;a=c?i.queryToObject(b.split("#")[1]):A.defaultState;var d={};a.dates.split("!").map(function(a){var b=a.split("-");d[b[0]]=b[1]}),window.reportOptions={aoitype:a.aoitype},window.reportOptions.aois=a.aois.split("!"),window.reportOptions.dates=d},date_obj_to_string:function(a){var b="";return b+=a.year+"-",b+=a.month+"-",b+=a.day},get_layer_definition:function(){var a=window.reportOptions.aois,b="ACQ_DATE >= date'"+this.startdate+"'",c="ACQ_DATE <= date'"+this.enddate+"'",d=window.reportOptions.aoitype+" in ('";d+=a.join("','"),d+="')";var e=[d,b,c,"BRIGHTNESS >= 330","CONFIDENCE >= 30"].join(" AND ");return e},get_aoi_definition:function(){var a=window.reportOptions.aois,b=window.reportOptions.aoitype+" in ('";return b+=a.join("','"),b+="')"},buildFiresMap:function(){var b,d,e,f=this,g=new c;return e=new j("simple-fires-map",{basemap:F.basemap,zoom:F.zoom,center:F.mapcenter,slider:F.slider}),e.on("update-start",function(){esri.show(a.byId("firesmapload"))}),e.on("update-end",function(){esri.hide(a.byId("firesmapload"))}),F.maps.fires=e,b=new m,b.format="png32",b.layerIds=F.firesLayer.defaultLayers,b.layerOption=m.LAYER_OPTION_SHOW,d=new n(F.firesLayer.url,{imageParameters:b,id:F.firesLayer.id,visible:!0}),d.setLayerDefinitions([f.get_layer_definition()]),e.addLayer(d),d.on("load",function(){g.resolve(!0)}),mp=e,g.promise},buildFireCountMap:function(b,d){function e(){for(var c="<table>",d=0;d<F[b].breakCount;d++){var e=A[d];e&&(c+="<tr><td class='legend-swatch' style='background-color: rgb("+e.color.r+","+e.color.g+","+e.color.b+");'></td>",c+="<td class='legend-label'>"+B[d]+" - "+B[d+1]+"</td></tr>")}c+="</table>",a.byId(r.legendId).innerHTML=c}function f(){e(),l=new t,l.renderer=k,u[r.layerId]=l;var a=[];a[r.layerId]=r.UniqueValueField+" in ('"+x.join("','")+"')",i.setLayerDefinitions(a),i.setLayerDrawingOptions(u),i.on("update-end",function(){q.resolve(!0)})}var g,i,k,l,p,q=new c,r=F[b],u=[],v=F.query_results[d],w=v.map(function(a){return a.attributes.fire_count}).sort(function(a,b){return a-b});sar=w;var x=v.map(function(a){return null!=a.attributes[r.UniqueValueField]?a.attributes[r.UniqueValueField].replace("'","''"):void 0}).filter(function(a){return null!=a?a:void 0}),y=function(a,b,c){var d;E(),setSerie(w),w.length<r.breakCount&&(r.breakCount=w.length-1);var e=r.breakCount;switch(c){case"natural":d=getClassJenks(r.breakCount);break;case"equal":d=getClassEqInterval(r.breakCount);break;case"quantile":d=getClassQuantile(r.breakCount);break;case"stddev":d=getClassStdDeviation(nbClass);break;case"arithmetic":d=getClassArithmeticProgression(nbClass);break;case"geometric":d=getClassGeometricProgression(nbClass);break;default:d=getClassJenks(r.breakCount)}for(var f={},g=0;e>g;g+=1){var i=new o,j=F.colorramp[g];i.setColor({a:255,r:j[0],g:j[1],b:j[2]}),f[g]=i}var k=new o;k.setColor({a:255,r:255,g:255,b:255});var l=new s(k,r.UniqueValueField);return h.forEach(a,function(a){for(var b,c=a.attributes.fire_count,e=0;e<d.length;e++)if(c<d[e+1]){b=f[e];break}l.addValue({value:a.attributes[r.UniqueValueField],symbol:b})}),{r:l,s:f,b:d}},z=y(v,x,"natural"),k=z.r,A=z.s,B=z.b;return p=new j(r.mapDiv,{basemap:F.basemap,zoom:F.zoom,center:F.mapcenter,slider:F.slider}),F.maps[b]=p,g=new m,g.format="png32",g.layerIds=r.defaultLayers,g.layerOption=m.LAYER_OPTION_SHOW,i=new n(r.url,{imageParameters:g,id:r.id,visible:!0}),i.on("load",f),p.addLayer(i),p.on("update-start",function(){esri.show(a.byId(r.loaderId))}),p.on("update-end",function(){esri.hide(a.byId(r.loaderId))}),q.promise},buildOtherFiresMap:function(b){function d(b){var c="<table>";h.forEach(b,function(a){c+="<tr><td class='legend-swatch' style='background-color: rgb("+a.symbol.color.r+","+a.symbol.color.g+","+a.symbol.color.b+");'></td>",c+="<td class='legend-label'>"+a.minValue+" - "+a.maxValue+"</td></tr>"}),c+="</table>",a.byId(z.legendId).innerHTML=c}function e(){v=new u(z.url+"/"+z.layerId),v.execute(i,function(a){d(a.infos),w=new t,w.renderer=a,A[z.layerId]=w,g.setLayerDrawingOptions(A),g.on("update-end",function(){y.resolve(!0)})},function(){y.resolve(!1)})}var f,g,i,l,s,v,w,x,y=new c,z=F[b],A=[];return x=new j(z.mapDiv,{basemap:F.basemap,zoom:F.zoom,center:F.mapcenter,slider:F.slider}),f=new m,f.format="png32",f.layerIds=z.defaultLayers,f.layerOption=m.LAYER_OPTION_SHOW,g=new n(z.url,{imageParameters:f,id:z.id,visible:!0}),s=new q,s.classificationField=z.classBreaksField,s.classificationMethod=z.classBreaksMethod,s.breakCount=z.breakCount,s.baseSymbol=new o,l=new p,l.fromColor=k.fromHex(z.fromHex),l.toColor=k.fromHex(z.toHex),l.algorithm="cie-lab",s.colorRamp=l,i=new r,i.classificationDefinition=s,i.where=z.where,g.on("load",e),x.addLayer(g),x.on("load",function(){x.disableMapNavigation()}),y.promise},getRegion:function(a){var b=F[a],d=new w(F.queryUrl+"/"+b.layerId),e=window.reportOptions.aoitype,f=new c,g=new v,i={},j=this;return g.where=j.get_aoi_definition(),g.returnGeometry=!1,g.outFields=[e,b.UniqueValueField],d.execute(g,function(c){c.features.length>0&&(h.forEach(c.features,function(a){i[a.attributes[b.UniqueValueField]]=a.attributes[e]}),F.regionmap[a]=i,f.resolve(!0))},function(){f.resolve(!1)}),f.promise},queryDistrictsFireCount:function(b){function d(a){var c="<table class='fires-table'><tr>";c+="<th>CONCESSION TYPE</th>",c+="<th>NUMBER OF FIRE ALERTS</th></tr>";var d=0,e=0;h.map(a,function(a){"1"===a.attributes.palm_oil&&(e+=a.attributes.fire_count,"RSPO"===a.attributes.CERT_SCHEM&&(d+=a.attributes.fire_count))});var f=[{attributes:{type:"RSPO CERTIFIED PALM OIL CONCESSIONS",fire_count:d}},{attributes:{type:"ALL PALM OIL CONCESSIONS",fire_count:e}}];c+=m.generateTableRows(f,["type","fire_count"]),c+="</table>";var g=f.length>0?c:'<div class="noFiresTable">'+F.noFeatures[b]+"</div>";return g}function e(a){var c="<table class='fires-table'><tr><th>"+f.headerField[0]+"</th>";f.headerField.length>1?c+="<th>"+window.reportOptions.aoitype.toUpperCase()+"</th>":i=[i[0],i[2]];var d=h.filter(a,function(a){return 0!==a.attributes.fire_count});c+="<th>NUMBER OF FIRE ALERTS</th></tr>",c+=m.generateTableRows(d,i),c+="</table>";var e=d.length>0?c:'<div class="noFiresTable">'+F.noFeatures[b]+"</div>";return e}var f=F[b],g=new w(F.queryUrl+"/"+f.fire_stats.id),i=[f.fire_stats.onField,window.reportOptions.aoitype,f.fire_stats.outField],j=new c,k=new v,l=new x,m=this;return k.where=m.get_layer_definition(),k.returnGeometry=!1,k.outFields=[f.fire_stats.onField],k.orderByFields=["fire_count DESC"],k.groupByFieldsForStatistics=[k.outFields[0]],f.groupByFieldsForStatistics&&(k.groupByFieldsForStatistics=f.groupByFieldsForStatistics),l.onStatisticField=f.fire_stats.onField,l.outStatisticFieldName=f.fire_stats.outField,l.statisticType="count",k.outStatistics=[l],g.execute(k,function(c){F.query_results[b]=c.features,c.features.length>0?(f.UniqueValueField?m.getRegion(b).then(function(){var d=F.regionmap[b];h.forEach(c.features,function(a){a.attributes[window.reportOptions.aoitype]=d[a.attributes[f.UniqueValueField]]}),a.byId(f.tableId).innerHTML=e(c.features.slice(0,10))}):a.byId(f.tableId).innerHTML="rspoQuery"==b?d(c.features):e(c.features.slice(0,10)),j.resolve(!0)):(j.resolve(!1),a.byId("noFiresMsg").innerHTML="No Fire Alerts for this AOI and time frame.")},function(){j.resolve(!1)}),j.promise},queryDistrictsForFires:function(b){function d(a){var b="<table class='fires-table'><tr><th>"+e.headerField[0]+"</th><th>"+e.headerField[1]+"</th><th>NUMBER OF FIRE ALERTS</th></tr>";return b+=j.generateTableRows(a,g),b+="</table>"}var e=F[b],f=new w(F.queryUrl+"/"+e.layerId),g=e.outFields,h=new c,i=new v,j=this;return i.where=j.get_layer_definition(),i.returnGeometry=!1,i.outFields=g,i.orderByFields=["fire_count DESC"],f.execute(i,function(b){b.features.length>0&&(a.byId(e.tableId).innerHTML=d(b.features.slice(0,10)),h.resolve(!0))},function(){h.resolve(!1)}),h.promise},queryCompanyConcessions:function(){function b(b,c,d){var e="<table class='fires-table'><tr><th>NAME</th><th>NUMBER OF FIRE ALERTS</th></tr>",g=e+n.generateTableRows(b,f.slice(0,2))+"</table>",h=e+n.generateTableRows(c,f.slice(0,2))+"</table>",i=e+n.generateTableRows(d,f.slice(0,2))+"</table>",j="There are no fire alerts in pulpwood concessions in the last 7 days.",k="There are no fire alerts in palm oil concessions in the last 7 days.",l="There are no fire alerts in logging concessions in the last 7 days.";a.byId("pulpwood-fires-table").innerHTML=b.length>0?g:'<div class="noFiresTable">'+j+"</div>",a.byId("palmoil-fires-table").innerHTML=c.length>0?h:'<div class="noFiresTable">'+k+"</div>",a.byId("logging-fires-table").innerHTML=d.length>0?i:'<div class="noFiresTable">'+l+"</div>"}var d,e=new w(F.queryUrl+"/"+F.companyConcessionsId),f=["Name","fire_count","TYPE"],g=new c,i=new v,j=new Date,k=[],l=[],m=[],n=this;return j=new Date(j.getFullYear(),j.getMonth(),j.getDate()-7),dateString=j.getFullYear()+"-"+(j.getMonth()+1)+"-"+(j.getDate()-7)+" "+j.getHours()+":"+j.getMinutes()+":"+j.getSeconds(),i.where="fire_count IS NOT NULL",i.returnGeometry=!1,i.outFields=f,i.orderByFields=["fire_count DESC"],e.execute(i,function(a){h.every(a.features,function(a){return d=a.attributes.TYPE,"Oil palm concession"===d&&m.length<10?m.push(a):"Wood fiber plantation"===d&&k.length<10?k.push(a):"Logging concession"===d&&l.length<10&&l.push(a),!(m.length>9&&k.length>9&&l.length>9)}),m=h.filter(m,function(a){return 0!==a.attributes.fire_count}),k=h.filter(k,function(a){return 0!==a.attributes.fire_count}),l=h.filter(l,function(a){return 0!==a.attributes.fire_count}),b(k,m,l),g.resolve(!0)},function(){g.resolve(!1)}),g.promise},queryForPeatFires:function(){var a,b,d,e=new c,f=[],g=this,i=function(c){b=c.features.length,a=0,d=0,h.forEach(c.features,function(b){1===b.attributes.peat?d++:a++}),f.push({color:"rgba(184,0,18,1)",name:"Peat",visible:!0,y:d}),f.push({color:"rgba(17,139,187,1)",name:"Non-peat",visible:!0,y:a}),g.buildPieChart("peat-fires-chart",{data:f,name:"Peat Fires",labelDistance:-25,total:b}),e.resolve(!0)},j=function(){e.resolve(!1)};return g.queryFireData({outFields:["peat"]},i,j),e.promise},queryForMoratoriumFires:function(){function a(a){f=a.features.length,e=0,d=0,h.forEach(a.features,function(a){1===a.attributes.moratorium?e++:d++}),i.push({color:"rgba(184,0,18,1)",name:"In Indicative Moratorium Areas",visible:!0,y:e}),i.push({color:"rgba(17,139,187,1)",name:"Not in Indicative Moratorium Areas",visible:!0,y:d}),j.buildPieChart("moratorium-fires-chart",{data:i,name:"Moratorium Fires",labelDistance:-25,total:f}),g.resolve(!0)}function b(a){g.resolve(!1),console.error(a)}var d,e,f,g=new c,i=[],j=this;return j.queryFireData({outFields:["moratorium"]},a,b),g.promise},queryForSumatraFires:function(){var a,b,d,e,f,g,i,j,k=new c,l=[],m=[],n=this;return g=function(c){j=c.features.length,a=0,b=0,d=0,e=0,f=0,h.forEach(c.features,function(c){1===c.attributes.wdpa?a++:b++,"1"===c.attributes.logging&&f++,"1"===c.attributes.palm_oil&&e++,"1"===c.attributes.pulpwood&&d++}),l.push({color:"rgba(184,0,18,1)",name:"In Protected Areas",visible:!0,y:a}),l.push({color:"rgba(17,139,187,1)",name:"Outside Protected Areas",visible:!0,y:b}),n.buildPieChart("protected-areas-fires-chart",{data:l,name:"Protected Area Fires",labelDistance:-30,total:j}),m.push({color:"rgba(17,139,187,1)",name:"Pulpwood Plantations",visible:!0,y:d}),m.push({color:"rgba(184,0,18,1)",name:"Palm Oil Concessions",visible:!0,y:e}),m.push({color:"rgba(106,0,78,1)",name:"Logging Concessions",visible:!0,y:f}),m.push({color:"rgba(233,153,39,1)",name:"Outside Concessions",visible:!0,y:j-(f+e+d)}),n.buildPieChart("land-use-fires-chart",{data:m,name:"Fires in Concessions",labelDistance:30,total:j}),k.resolve(!0)},i=function(){k.resolve(!1)},n.queryFireData({outFields:["wdpa","pulpwood","palm_oil","logging"]},g,i),k.promise},queryForDailyFireData:function(){var a,b,d=new w(F.queryUrl+"/"+F.firesLayer.fire_id),e=new c,f=new v,g=[],i=[],j=this,k=new x;return f.where=[j.get_aoi_definition(),"BRIGHTNESS >= 330","CONFIDENCE >= 30"].join(" AND "),f.returnGeometry=!1,f.groupByFieldsForStatistics=[F.dailyFiresField],f.orderByFields=["ACQ_DATE ASC"],k.onStatisticField=F.dailyFiresField,k.outStatisticFieldName="Count",k.statisticType="count",f.outStatistics=[k],a=function(a){h.forEach(a.features,function(a){g.push(moment(a.attributes[F.dailyFiresField]).tz("Asia/Jakarta").format("M/D/YYYY")),i.push(a.attributes.Count)}),$("#fire-line-chart").highcharts({chart:{zoomType:"x"},title:{text:null},subtitle:{text:void 0===document.ontouchstart?"Click and drag in the plot area to zoom in":"Pinch the chart to zoom in"},plotOptions:{line:{marker:{enabled:!1}}},xAxis:{categories:g,type:"datetime",minTickInterval:20,minRange:30,labels:{rotation:-45}},yAxis:{min:0,title:{text:null},plotLines:[{value:0,width:1,color:"#a90016"}]},tooltip:{valueSuffix:""},credits:{enabled:!1},legend:{enabled:!1},series:[{name:"Daily Fires",data:i,color:"#f49f2d"}]})},b=function(a){console.dir(a)},d.execute(f,a,b),e.resolve(!0),e.promise},queryFireData:function(a,b,d){var e,f=new w(F.queryUrl+"/"+F.confidenceFireId),g=(new c,new v),h=new Date,i=this;h=new Date(h.getFullYear(),h.getMonth(),h.getDate()-8),e=h.getFullYear()+"-"+(h.getMonth()+1)+"-"+h.getDate()+" "+h.getHours()+":"+h.getMinutes()+":"+h.getSeconds();var j=i.get_layer_definition();g.where=void 0===a.where?j:j+" AND "+a.where,g.returnGeometry=a.returnGeometry||!1,g.outFields=a.outFields||["*"],f.execute(g,b,d)},buildPieChart:function(a,b){$("#"+a).highcharts({chart:{type:"pie"},title:{text:null},yAxis:{title:{text:null}},plotOptions:{pie:{shadow:!1,center:["50%","50%"],showInLegend:!0,dataLabels:{fontSize:"22px"}}},tooltip:{formatter:function(){return Math.round(this.y/b.total*100)+"% ("+this.y+" fires)"}},credits:{enabled:!1},legend:{layout:"vertical"},series:[{name:b.name,data:b.data,size:"80%",innerSize:"50%",dataLabels:{distance:b.labelDistance,color:"black",formatter:function(){return Math.round(this.y/b.total*100)+"%"}}}]})},get_extent:function(){var a,b=new w(F.queryUrl+"/"+F.adminQuery.layerId),d=new c,e=new v,f=(new Date,this);return a=["fires","adminBoundary","subdistrictBoundary"],e.where=f.get_aoi_definition(),e.returnGeometry=!0,e.outFields=["DISTRICT"],callback=function(b){var c=y.graphicsExtent(b.features);h.forEach(a,function(a){var b=F.maps[a];b.setExtent(c,!0)}),d.resolve(!0)},errback=function(a){console.log(a)},b.execute(e,callback,errback),d.promise},generateRSPOtableRows:function(){},generateTableRows:function(a,b){function c(a){return null!==a&&void 0!==a&&!e.test(a)}var d="",e=/^\s+$/;return h.forEach(a,function(a){var e=!0,f="";h.forEach(b,function(b){c(a.attributes[b])?f+="<td>"+(c(a.attributes[b])?a.attributes[b]:" - ")+"</td>":e=!1}),e&&(d+="<tr>",d+=f,d+="</tr>")}),d},printReport:function(){}}});