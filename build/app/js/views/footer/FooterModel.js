/*! Global-Forest-Watch-Fires Tue Jul 22 2014 14:53:11 */
define(["knockout","main/Config","dojo/dom","modules/HashController","modules/EventsController"],function(a,b,c,d,e){var f={};f.vm={};var g=f.vm;return g.footerModeOptions=a.observableArray(b.footerModeOptions),g.appState=a.observable({}),g.footerSelect=function(a){e.footerSelect(a)},f.applyBindings=function(b){a.applyBindings(g,c.byId(b))},f});