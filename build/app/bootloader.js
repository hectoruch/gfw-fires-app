!function(s,e){"use strict";function t(){s.dojoConfig=r,m(a);for(var e=i[c],t=0,n=e.length;n>t;t++)d(e[t].src,e[t].cdn);p("app/images/favicon.ico")}var c="dev",n="0.1.9",a="http://js.arcgis.com/3.12/",i={dev:[{src:"http://js.arcgis.com/3.12/esri/css/esri.css",cdn:!0},{src:"app/css/app.css",cdn:!1},{src:"app/css/contentPages.css",cdn:!1},{src:"app/css/responsive.css",cdn:!1},{src:"app/css/intlTelInput.css",cdn:!1},{src:"app/css/map.css",cdn:!1},{src:"http://js.arcgis.com/3.12/dijit/themes/tundra/tundra.css",cdn:!0}],pro:[{src:"http://js.arcgis.com/3.12/esri/css/esri.css",cdn:!0},{src:"app/css/app.css",cdn:!1},{src:"app/css/contentPages.css",cdn:!1},{src:"app/css/responsive.css",cdn:!1},{src:"app/css/intlTelInput.css",cdn:!1},{src:"app/css/map.css",cdn:!1},{src:"http://js.arcgis.com/3.12/dijit/themes/tundra/tundra.css",cdn:!0}]},o=location.pathname.replace(/\/[^/]+$/,"")+"app",r={parseOnLoad:!1,isDebug:!1,async:!0,cacheBust:"v="+n,packages:[{name:"libs",location:o+"/libs"},{name:"main",location:o+"/js/main"},{name:"modules",location:o+"/js/modules"},{name:"views",location:o+"/js/views"},{name:"utils",location:o+"/js/utils"}],aliases:[["knockout","libs/knockout-3.2.0"],["dom-style","dojo/dom-style"],["dom-class","dojo/dom-class"],["topic","dojo/topic"],["dom","dojo/dom"],["on","dojo/on"],["jquery","http://code.jquery.com/jquery-2.1.1.min.js"]],deps:["main/Main","dojo/domReady!"],callback:function(s){s.init()}},m=function(s,t){var c=e.createElement("script"),n=e.getElementsByTagName("head")[0];c.setAttribute("src",s);for(var a in t)t.hasOwnProperty(a)&&c.setAttribute(a,t[a]);n.appendChild(c)},d=function(s,t){var c=e.createElement("link"),a=t?s:s+"?v="+n,i=e.getElementsByTagName("head")[0];c.setAttribute("rel","stylesheet"),c.setAttribute("type","text/css"),c.setAttribute("href",a),c.media="only x",i.appendChild(c),setTimeout(function(){c.media="all"})},p=function(s){var t=e.createElement("link"),c=e.getElementsByTagName("head")[0];t.setAttribute("rel","shortcut icon"),t.setAttribute("type","image/png"),t.setAttribute("href",s),c.appendChild(t),setTimeout(function(){t.media="all"})};s.requestAnimationFrame=function(){return s.requestAnimationFrame||s.webkitRequestAnimationFrame||s.mozRequestAnimationFrame||s.oRequestAnimationFrame||s.msRequestAnimationFrame}(),s.requestAnimationFrame?s.requestAnimationFrame(t):"loaded"===e.readyState?t():s.onload=t}(window,document);