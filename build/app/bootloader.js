!function(s,t){"use strict";var e="dev",c="0.1.0",o="http://js.arcgis.com/3.10/",n={dev:[{src:"http://js.arcgis.com/3.10/js/esri/css/esri.css",cdn:!0},{src:"app/css/app.css",cdn:!1},{src:"app/css/contentPages.css",cdn:!1},{src:"app/css/responsive.css",cdn:!1},{src:"http://js.arcgis.com/3.8/js/dojo/dijit/themes/tundra/tundra.css",cdn:!0}],pro:[{src:"http://js.arcgis.com/3.10/js/esri/css/esri.css",cdn:!0},{src:"app/css/app.css",cdn:!1},{src:"app/css/contentPages.css",cdn:!1},{src:"app/css/responsive.css",cdn:!1},{src:"http://js.arcgis.com/3.8/js/dojo/dijit/themes/tundra/tundra.css",cdn:!0}]},a=location.pathname.replace(/\/[^/]+$/,"")+"app",i={parseOnLoad:!1,isDebug:!1,textPluginHeaders:{"X-Requested-With":null},async:!0,cacheBust:"v="+c,packages:[{name:"libs",location:a+"/libs"},{name:"main",location:a+"/js/main"},{name:"modules",location:a+"/js/modules"},{name:"views",location:a+"/js/views"},{name:"utils",location:a+"/js/utils"}],aliases:[["knockout","libs/knockout-3.1.0"],["dom-style","dojo/dom-style"],["dom-class","dojo/dom-class"],["topic","dojo/topic"],["dom","dojo/dom"],["on","dojo/on"]],deps:["main/Main","dojo/domReady!"],callback:function(s){s.init()}},r=function(s,e){var c=t.createElement("script");c.setAttribute("src",s);for(var o in e)e.hasOwnProperty(o)&&c.setAttribute(o,e[o]);t.getElementsByTagName("body")[0].appendChild(c)},d=function(s,e){var o=t.createElement("link"),n=e?s:s+"?v="+c;o.setAttribute("rel","stylesheet"),o.setAttribute("type","text/css"),o.setAttribute("href",n),t.getElementsByTagName("body")[0].appendChild(o)};s.dojoConfig=i,r(o);for(var p=n[e],l=0,m=p.length;m>l;l++)d(p[l].src,p[l].cdn)}(window,document);