/*! Global-Forest-Watch-Fires Fri Nov 14 2014 15:52:50 */
define(["dojo/on","dojo/dom","dojo/dom-class","dojo/query","dijit/registry","modules/HashController","modules/EventsController","views/data/DataModel","dojo/_base/array"],function(a,b,c,d,e,f,g,h,i){var j={},k=!1,l="dataView",m=[],n={viewId:l,viewName:"data"};return j.init=function(){return k?void g.switchToView(n):(k=!0,void require(["dojo/text!views/data/data.html"],function(a){b.byId(l).innerHTML=a,g.switchToView(n),h.applyBindings(l)}))},j.toggleDataNavList=function(a){var b=a.htmlContent,c=h.getVM(),d=c.leftLinks(),e=this;c.leftLinks([]),i.forEach(d,function(b){b.selected=b==a?!0:!1}),c.leftLinks(d),e.reportAnalyticsHelper("view","content","The user viewed the "+e.toTitleCase(a.name)+" content on the Data page."),require(["dojo/text!views/data/templates/"+b+".htm"],function(b){c.htmlContent(b),"FOREST USE"===a.name?e.bindEvents():e.disconnectEvents()})},j.bindEvents=function(){var c=this;m.push(a(b.byId("woodFiberDropdown"),"click",function(){c.toggleSelect("woodFiberDropdown")})),m.push(a(b.byId("oilPalmDropdown"),"click",function(){c.toggleSelect("oilPalmDropdown")})),m.push(a(b.byId("loggingDropdown"),"click",function(){c.toggleSelect("loggingDropdown")})),d(".source_download_links a").forEach(function(b){m.push(a(b,"click",c.showDownloadOptions))})},j.disconnectEvents=function(){i.forEach(m,function(a){a.remove()})},j.showDownloadOptions=function(a){var e=a.target?a.target:a.srcElement,f=e.dataset?e.dataset.slug:e.getAttribute("data-slug"),g=e.dataset?e.dataset.container+"Title":e.getAttribute("data-container")+"Title";d(".source_dropdown .active").forEach(function(a){c.contains(a,"source_dropdown_menu")||c.remove(a,"active")}),c.add(f,"active"),b.byId(g).innerHTML=e.innerHTML},j.toggleSelect=function(a){c.contains(a+"Menu","active")?(d(".source_dropdown .active").forEach(function(a){c.remove(a,"active")}),b.byId(a+"Title").innerHTML="Select a country"):c.add(a+"Menu","active")},j.toTitleCase=function(a){return a.replace(/\w*/g,function(a){return a.charAt(0).toUpperCase()+a.substr(1).toLowerCase()})},j.reportAnalyticsHelper=function(a,b,c){ga("A.send","event",a,b,c),ga("B.send","event",a,b,c)},j});