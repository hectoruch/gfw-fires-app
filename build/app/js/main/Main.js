/*! Global-Forest-Watch-Fires Fri Dec 12 2014 09:16:49 */
define(["on","dom","topic","dom-class","dojo/query","dojo/_base/array","esri/config","main/Config","dojox/mobile/parser","dijit/layout/StackContainer","dijit/layout/ContentPane"],function(a,b,c,d,e,f,g,h,i){var j={};return j.init=function(){i.parse(),g.defaults.io.corsEnabledServers.push("www.wri.org"),g.defaults.io.corsEnabledServers.push(h.emailSubscribeUrl),require(["modules/ErrorController","modules/HashController","modules/BlockController"],function(a,b){b.init(),a.init()})},j});