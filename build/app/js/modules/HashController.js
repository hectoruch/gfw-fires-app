define(["dojo/hash","dojo/topic","dojo/_base/lang","dojo/io-query","main/Config","dojo/_base/array"],function(e,o,t,i,a,n){var r={};return r.oldState={v:""},r.newState={v:""},r.init=function(){var e,t=this,l=window.location.href,u=2==l.split("#").length&&l.split("#")[1].length>1;if(e=u?i.queryToObject(l.split("#")[1]):a.defaultState,u){var s=e.v&&n.indexOf(a.validViews,e.v)>-1;s?e.dirty?delete e.dirty:e.dirty="true":e=a.defaultState}o.subscribe("/dojo/hashchange",function(e){var o=i.queryToObject(e),a=r.oldState;t.handleHashChange(o,a)}),t.updateHash(e),require(["views/header/HeaderController"],function(e){e.init()}),require(["views/footer/FooterController"],function(e){e.init()})},r.handleHashChange=function(e,o){console.log(e),console.log(o);var t=this,i=o.v!=e.v;i&&t.changeView(e.v,o.v)},r.updateHash=function(o){var a=t.clone(r.newState);t.mixin(a,o),require(["views/header/HeaderModel","views/footer/FooterModel"],function(e,o){e.vm.appState(a),o.vm.appState(a),e.vm.showFullHeader("home"==a.v?!0:!1)});var n=i.objectToQuery(a);console.log(n),e(n)},r.changeView=function(e){var o={v:e};switch(console.log(e),e){case"home":require(["views/home/HomeController"],function(e){e.init(o)});break;case"map":require(["views/map/MapController"],function(e){e.init(o)});break;case"blog":require(["views/blog/BlogController"],function(e){e.init(o)});break;case"about":require(["views/about/AboutController"],function(e){e.init(o)});break;case"data":require(["views/data/dataController"],function(e){e.init(o)})}},r});