!function(e,t){"use strict";function o(){e.dojoConfig=i;for(var t=0,o=a.length;o>t;t++)m(a[t]);for(var n=0,c=s.length;c>n;n++)r(s[n])}var s=["http://js.arcgis.com/3.9/","http://code.jquery.com/jquery-1.11.0.min.js"],a=["http://js.arcgis.com/3.9/js/esri/css/esri.css","../../../css/report.css"],n=location.pathname.replace(/app\/js\/views\/report.*/,"")+"app",i={parseOnLoad:!1,isDebug:!1,textPluginHeaders:{"X-Requested-With":null},async:!0,packages:[{name:"libs",location:n+"/libs"},{name:"main",location:n+"/js/main"},{name:"modules",location:n+"/js/modules"},{name:"views",location:n+"/js/views"},{name:"utils",location:n+"/js/utils"}],aliases:[["knockout","libs/knockout-3.1.0"],["dom-style","dojo/dom-style"],["dom-class","dojo/dom-class"],["topic","dojo/topic"],["dom","dojo/dom"],["on","dojo/on"]],deps:["views/report/ReportBuilder","dojo/domReady!"],callback:function(e){e.init()}},r=function(e,o){var s=t.createElement("script");s.setAttribute("src",e);for(var a in o)o.hasOwnProperty(a)&&s.setAttribute(a,o[a]);t.getElementsByTagName("body")[0].appendChild(s)},m=function(e){var o=t.createElement("link");o.setAttribute("rel","stylesheet"),o.setAttribute("type","text/css"),o.setAttribute("href",e),t.getElementsByTagName("body")[0].appendChild(o)};e.requestAnimationFrame=function(){return e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame}(),e.requestAnimationFrame?e.requestAnimationFrame(o):"loaded"===t.readyState?o():e.onload=o}(window,document);