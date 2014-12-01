/*! Global-Forest-Watch-Fires Mon Dec 01 2014 10:54:58 */
var Windy=function(a){var b=1/7e4,c=10,d=40,e=100,f=.8,g=8,h=.75,i=20,j=[0/0,0/0,null],k=(2*Math.PI,Math.pow(10,-5.2),function(a,b,c,d,e,f){var g=1-a,h=1-b,i=g*h,j=a*h,k=g*b,l=a*b,m=c[0]*i+d[0]*j+e[0]*k+f[0]*l,n=c[1]*i+d[1]*j+e[1]*k+f[1]*l;return[m,n,Math.sqrt(m*m+n*n)]}),l=function(a,b){var c=a.data,d=b.data;return{header:a.header,data:function(a){return[c[a],d[a]]},interpolate:k}},m=function(a){var b=null,c=null,d=null;return a.forEach(function(a){switch(a.header.parameterCategory+","+a.header.parameterNumber){case"2,2":b=a;break;case"2,3":c=a;break;default:d=a}}),l(b,c)},n=function(a,b){function c(a,b){var c,e=p(a-f,360)/h,j=(g-b)/i,k=Math.floor(e),l=k+1,m=Math.floor(j),q=m+1;if(c=n[m]){var r=c[k],s=c[l];if(o(r)&&o(s)&&(c=n[q])){var t=c[k],u=c[l];if(o(t)&&o(u))return d.interpolate(e-k,j-m,r,s,t,u)}}return null}var d=m(a),e=d.header,f=e.lo1,g=e.la1,h=e.dx,i=e.dy,j=e.nx,k=e.ny,l=new Date(e.refTime);l.setHours(l.getHours()+e.forecastTime);for(var n=[],q=0,r=Math.floor(j*h)>=360,s=0;k>s;s++){for(var t=[],u=0;j>u;u++,q++)t[u]=d.data(q);r&&t.push(t[0]),n[s]=t}b({date:l,interpolate:c})},o=function(a){return null!==a&&void 0!==a},p=function(a,b){return a-b*Math.floor(a/b)},q=function(){return/android|blackberry|iemobile|ipad|iphone|ipod|opera mini|webos/i.test(navigator.userAgent)},r=function(a,b,c,d,e,f,g,h){var i=g[0]*f,j=g[1]*f,k=s(a,b,c,d,e,h);return g[0]=k[0]*i+k[2]*j,g[1]=k[1]*i+k[3]*j,g},s=function(a,b,c,d,e,f){var g=2*Math.PI,h=Math.pow(10,-5.2),i=0>b?h:-h,j=0>c?h:-h,k=z(c,b+i,f),l=z(c+j,b,f),m=Math.cos(c/360*g);return[(k[0]-d)/i/m,(k[1]-e)/i/m,(l[0]-d)/j,(l[1]-e)/j]},t=function(a,b,c){function d(b,c){var d=a[Math.round(b)];return d&&d[Math.round(c)]||j}d.release=function(){a=[]},d.randomize=function(a){var c,e,f=0;do c=Math.round(Math.floor(Math.random()*b.width)+b.x),e=Math.round(Math.floor(Math.random()*b.height)+b.y);while(null===d(c,e)[2]&&f++<30);return a.x=c,a.y=e,a},c(b,d)},u=function(a,b,c){var d=a[0],e=a[1],f=Math.round(d[0]),g=Math.max(Math.floor(d[1],0),0),h=(Math.min(Math.ceil(e[0],b),b-1),Math.min(Math.ceil(e[1],c),c-1));return{x:f,y:g,xMax:b,yMax:h,width:b,height:c}},v=function(a){return a/180*Math.PI},w=function(a){return a/(Math.PI/180)},x=function(a,b,c){var d=c.east-c.west,e=c.width/w(d)*360/(2*Math.PI),f=e/2*Math.log((1+Math.sin(c.south))/(1-Math.sin(c.south))),g=c.height+f,h=(g-b)/e,i=180/Math.PI*(2*Math.atan(Math.exp(h))-Math.PI/2),j=w(c.west)+a/c.width*w(d);return[j,i]},y=function(a){return Math.log(Math.tan(a/2+Math.PI/4))},z=function(a,b,c){var d=y(c.south),e=y(c.north),f=c.width/(c.east-c.west),g=c.height/(e-d),h=y(v(a)),i=(v(b)-c.west)*f,h=(e-h)*g;return[i,h]},A=function(a,c,d,e){function f(b){for(var e=[],f=c.y;f<=c.yMax;f+=2){var j=x(b,f,d);if(j){var k=j[0],l=j[1];if(isFinite(k)){var m=a.interpolate(k,l);m&&(m=r(g,k,l,b,f,h,m,d),e[f+1]=e[f]=m)}}}i[b+1]=i[b]=e}var g={},h=c.height*b,i=[],j=c.x;!function k(){for(var a=Date.now();j<c.width;)if(f(j),j+=2,Date.now()-a>1e3)return void setTimeout(k,25);t(i,c,e)}()},B=function(b,j){function k(a){return parseInt(n(a).substring(0,2),16)}function l(a){return parseInt(n(a).substring(2,4),16)}function m(a){return parseInt(n(a).substring(4,6),16)}function n(a){return"#"==a.charAt(0)?a.substring(1,7):a}function o(a,b){return result=["rgba("+k("#00ffff")+", "+l("#00ffff")+", "+m("#00ffff")+", 0.5)","rgba("+k("#64f0ff")+", "+l("#64f0ff")+", "+m("#64f0ff")+", 0.5)","rgba("+k("#87e1ff")+", "+l("#87e1ff")+", "+m("#87e1ff")+", 0.5)","rgba("+k("#a0d0ff")+", "+l("#a0d0ff")+", "+m("#a0d0ff")+", 0.5)","rgba("+k("#b5c0ff")+", "+l("#b5c0ff")+", "+m("#b5c0ff")+", 0.5)","rgba("+k("#c6adff")+", "+l("#c6adff")+", "+m("#c6adff")+", 0.5)","rgba("+k("#d49bff")+", "+l("#d49bff")+", "+m("#d49bff")+", 0.5)","rgba("+k("#e185ff")+", "+l("#e185ff")+", "+m("#e185ff")+", 0.5)","rgba("+k("#ec6dff")+", "+l("#ec6dff")+", "+m("#ec6dff")+", 0.5)","rgba("+k("#ff1edb")+", "+l("#ff1edb")+", "+m("#ff1edb")+", 0.5)"],result.indexFor=function(a){return Math.floor(Math.min(a,b)/b*(result.length-1))},result}function p(){t.forEach(function(a){a.length=0}),w.forEach(function(a){a.age>e&&(j.randomize(a).age=0);var b=a.x,c=a.y,d=j(b,c),f=d[2];if(null===f)a.age=e;else{var g=b+d[0],h=c+d[1];null!==j(g,h)[2]?(a.xt=g,a.yt=h,t[s.indexFor(f)].push(a)):(a.x=g,a.y=h)}a.age+=1})}function r(){var a=y.globalCompositeOperation;y.globalCompositeOperation="destination-in",y.fillRect(b.x,b.y,b.width,b.height),y.globalCompositeOperation=a,t.forEach(function(a,b){a.length>0&&(y.beginPath(),y.strokeStyle=s[b],a.forEach(function(a){y.moveTo(a.x,a.y),y.lineTo(a.xt,a.yt),a.x=a.xt,a.y=a.yt}),y.stroke())})}var s=o(c,d),t=s.map(function(){return[]}),u=Math.round(b.width*g);q()&&(u*=h);for(var v="rgba(0, 0, 0, 0.97)",w=[],x=0;u>x;x++)w.push(j.randomize({age:Math.floor(Math.random()*e)+0}));var y=a.canvas.getContext("2d");y.lineWidth=f,y.fillStyle=v,function z(){try{E.timer=setTimeout(function(){requestAnimationFrame(z),p(),r()},1e3/i)}catch(a){console.error(a)}}()},C=function(b,c,d,e){var f={south:v(e[0][1]),north:v(e[1][1]),east:v(e[1][0]),west:v(e[0][0]),width:c,height:d};D(),n(a.data,function(a){A(a,u(b,c,d),f,function(a,b){E.field=b,B(a,b)})})},D=function(){E.field&&E.field.release(),E.timer&&clearTimeout(E.timer)},E={params:a,start:C,stop:D};return E};window.requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,50)}}();