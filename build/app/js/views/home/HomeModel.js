define(["knockout","main/Config","dojo/dom","modules/HashController","modules/EventsController"],function(o,e,n,t,d){var i={};i.vm={};var l=i.vm;return l.appState=o.observable({}),l.homeModeOptions=o.observableArray(e.homeModeOptions),l.modeSelect=function(o){d.modeSelect(o)},i.applyBindings=function(e){o.applyBindings(l,n.byId(e))},i});