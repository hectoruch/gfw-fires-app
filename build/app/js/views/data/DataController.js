/*! Global-Forest-Watch-Fires Tue Jul 22 2014 14:53:11 */
define(["dojo/dom","dijit/registry","modules/HashController","modules/EventsController","views/data/DataModel","dojo/_base/array"],function(a,b,c,d,e,f){var g={},h=!1,i="dataView",j={viewId:i,viewName:"data"};return g.init=function(){return h?void d.switchToView(j):(h=!0,void require(["dojo/text!views/data/data.html"],function(b){a.byId(i).innerHTML=b,d.switchToView(j),e.applyBindings(i)}))},g.toggleDataNavList=function(a){var b=a.htmlContent,c=e.getVM(),d=c.leftLinks();c.leftLinks([]),f.forEach(d,function(b){b.selected=b==a?!0:!1}),c.leftLinks(d),require(["dojo/text!views/data/templates/"+b+".htm"],function(a){c.htmlContent(a)})},g});