/*! Global-Forest-Watch-Fires Fri Dec 12 2014 09:16:49 */
!function(a,b){"use strict";function c(){a.dojoConfig=g;for(var b=0,c=e.length;c>b;b++)i(e[b]);for(var f=0,j=d.length;j>f;f++)h(d[f])}var d=["http://js.arcgis.com/3.9/","http://code.jquery.com/jquery-1.11.0.min.js"],e=["http://js.arcgis.com/3.9/js/esri/css/esri.css","../../../css/report.css"],f=location.pathname.replace(/app\/js\/views\/report.*/,"")+"app",g={parseOnLoad:!1,isDebug:!1,textPluginHeaders:{"X-Requested-With":null},async:!0,packages:[{name:"libs",location:f+"/libs"},{name:"main",location:f+"/js/main"},{name:"modules",location:f+"/js/modules"},{name:"views",location:f+"/js/views"},{name:"utils",location:f+"/js/utils"}],aliases:[["knockout","libs/knockout-3.1.0"],["dom-style","dojo/dom-style"],["dom-class","dojo/dom-class"],["topic","dojo/topic"],["dom","dojo/dom"],["on","dojo/on"]],deps:["views/report/ReportBuilder","dojo/domReady!"],callback:function(a){a.init(),h("http://code.highcharts.com/modules/exporting.js")}},h=function(a,c){var d=b.createElement("script");d.setAttribute("src",a);for(var e in c)c.hasOwnProperty(e)&&d.setAttribute(e,c[e]);b.getElementsByTagName("body")[0].appendChild(d)},i=function(a){var c=b.createElement("link");c.setAttribute("rel","stylesheet"),c.setAttribute("type","text/css"),c.setAttribute("href",a),b.getElementsByTagName("head")[0].appendChild(c)};a.requestAnimationFrame=function(){return a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame||a.oRequestAnimationFrame||a.msRequestAnimationFrame}(),a.requestAnimationFrame?a.requestAnimationFrame(c):"loaded"===b.readyState?c():a.onload=c}(window,document);