/*! Global-Forest-Watch-Fires Tue Dec 16 2014 17:59:14 */
define(["knockout","main/Config","dojo/dom","modules/EventsController"],function(a,b,c,d){var e={};e.vm={};var f=e.vm;return f.headerTitle=a.observable(b.headerTitle),f.headerDesc=a.observable(b.headerDesc),f.navigationLinks=a.observableArray(b.navigationLinks),f.appState=a.observable({}),f.clickNavLink=function(a){d.clickNavLink(a)},e.applyBindings=function(b){a.applyBindings(f,c.byId(b))},e});