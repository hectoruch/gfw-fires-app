/*! Global-Forest-Watch-Fires Tue Jul 22 2014 14:53:11 */
define(["dojo/dom","dijit/registry","modules/HashController","dojo/_base/array","dojo/dom-construct","dojo/dom-class","dojo/aspect","dojo/on"],function(a,b,c,d,e,f,g,h){var i={},j=!1,k="app-header";return i.init=function(){var b=this;j||(j=!0,require(["dojo/text!views/header/header.html","views/header/HeaderModel"],function(c,d){a.byId(k).innerHTML=c,d.applyBindings(k),h(a.byId("logo"),"click",function(){var a={domId:"homeView",html:"Home",selected:!0,viewId:"homeView",viewName:"home"};b.clickNavLink(a)}),function(a,b){var c=a.createElement(b),d=a.getElementsByTagName(b)[0];c.type="text/javascript",c.async=!0,c.src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit",d.parentNode.insertBefore(c,d)}(document,"script")}))},i.dataLoaded=function(){},i.clickNavLink=function(a){var b=a;if(b.url)return void window.open(b.url,"_blank");var d={v:b.viewName};c.updateHash(d)},i.switchToView=function(a){require(["dijit/registry","views/header/HeaderModel","views/home/HomeController","modules/EventsController"],function(b,c){console.log(a);var g=c.vm.navigationLinks();c.vm.navigationLinks([]);var h=d.map(g,function(b){return b.selected=a.viewId.toLowerCase()===b.domId.toLowerCase()?!0:!1,b});c.vm.navigationLinks(h);var i="mapView homeView blogView dataView aboutView";switch(f.remove("app-body",i),f.add("app-body",a.viewId),f.remove("app-header",i),f.add("app-header",a.viewId),a.viewId){case"homeView":setTimeout(function(){e.place("footerMovableWrapper","footerShareContainer")},1e3);break;default:e.place("footerMovableWrapper",a.viewId)}b.byId("stackContainer").selectChild(a.viewId),b.byId("stackContainer").resize()})},i});