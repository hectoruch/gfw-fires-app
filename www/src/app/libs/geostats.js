(function(k){"object"===typeof exports?module.exports=k():"function"===typeof define&&define.amd?define(k):geostats=k()})(function(){var k=function(e){return"number"===typeof e&&parseFloat(e)==parseInt(e,10)&&!isNaN(e)};Array.prototype.indexOf||(Array.prototype.indexOf=function(e,a){if(void 0===this||null===this)throw new TypeError('"this" is null or not defined');var b=this.length>>>0;a=+a||0;Infinity===Math.abs(a)&&(a=0);0>a&&(a+=b,0>a&&(a=0));for(;a<b;a++)if(this[a]===e)return a;return-1});return function(e){this.objectId=
"";this.legendSeparator=this.separator=" - ";this.method="";this.precision=0;this.precisionflag="auto";this.roundlength=2;this.debug=this.is_uniqueValues=!1;this.bounds=[];this.ranges=[];this.inner_ranges=null;this.colors=[];this.counter=[];this.stat_cov=this.stat_stddev=this.stat_variance=this.stat_pop=this.stat_min=this.stat_max=this.stat_sum=this.stat_median=this.stat_mean=this.stat_sorted=null;this.log=function(a){!0==this.debug&&console.log(this.objectID+"(object id) :: "+a)};this.setBounds=
function(a){this.log("Setting bounds ("+a.length+") : "+a.join());this.bounds=[];this.bounds=a};this.setSerie=function(a){this.log("Setting serie ("+a.length+") : "+a.join());this.serie=[];this.serie=a;this.setPrecision()};this.setColors=function(a){this.log("Setting color ramp ("+a.length+") : "+a.join());this.colors=a};this.doCount=function(){if(!this._nodata()){var a=this.sorted();this.counter=[];for(i=0;i<this.bounds.length-1;i++)this.counter[i]=0;for(j=0;j<a.length;j++){var b=this.getClass(a[j]);
this.counter[b]++}}};this.setPrecision=function(a){"undefined"!==typeof a&&(this.precisionflag="manual",this.precision=a);if("auto"==this.precisionflag)for(a=0;a<this.serie.length;a++){var b=isNaN(this.serie[a]+"")||-1==(this.serie[a]+"").toString().indexOf(".")?0:(this.serie[a]+"").split(".")[1].length;b>this.precision&&(this.precision=b)}this.log("Calling setPrecision(). Mode : "+this.precisionflag+" - Decimals : "+this.precision);this.serie=this.decimalFormat(this.serie)};this.decimalFormat=function(a){for(var b=
[],c=0;c<a.length;c++){var d=a[c];!isNaN(parseFloat(d))&&isFinite(d)?b[c]=parseFloat(a[c].toFixed(this.precision)):b[c]=a[c]}return b};this.setRanges=function(){this.ranges=[];for(i=0;i<this.bounds.length-1;i++)this.ranges[i]=this.bounds[i]+this.separator+this.bounds[i+1]};this.min=function(){if(!this._nodata())return this.stat_min=Math.min.apply(null,this.serie)};this.max=function(){return this.stat_max=Math.max.apply(null,this.serie)};this.sum=function(){if(!this._nodata()){if(null==this.stat_sum)for(i=
this.stat_sum=0;i<this.pop();i++)this.stat_sum+=parseFloat(this.serie[i]);return this.stat_sum}};this.pop=function(){if(!this._nodata())return null==this.stat_pop&&(this.stat_pop=this.serie.length),this.stat_pop};this.mean=function(){if(!this._nodata())return null==this.stat_mean&&(this.stat_mean=parseFloat(this.sum()/this.pop())),this.stat_mean};this.median=function(){if(!this._nodata()){if(null==this.stat_median){this.stat_median=0;var a=this.sorted();this.stat_median=a.length%2?parseFloat(a[Math.ceil(a.length/
2)-1]):(parseFloat(a[a.length/2-1])+parseFloat(a[a.length/2]))/2}return this.stat_median}};this.variance=function(){round="undefined"===typeof round?!0:!1;if(!this._nodata()){if(null==this.stat_variance){for(var a=0,b=0;b<this.pop();b++)a+=Math.pow(this.serie[b]-this.mean(),2);this.stat_variance=a/this.pop();!0==round&&(this.stat_variance=Math.round(this.stat_variance*Math.pow(10,this.roundlength))/Math.pow(10,this.roundlength))}return this.stat_variance}};this.stddev=function(a){a="undefined"===
typeof a?!0:!1;if(!this._nodata())return null==this.stat_stddev&&(this.stat_stddev=Math.sqrt(this.variance()),!0==a&&(this.stat_stddev=Math.round(this.stat_stddev*Math.pow(10,this.roundlength))/Math.pow(10,this.roundlength))),this.stat_stddev};this.cov=function(a){a="undefined"===typeof a?!0:!1;if(!this._nodata())return null==this.stat_cov&&(this.stat_cov=this.stddev()/this.mean(),!0==a&&(this.stat_cov=Math.round(this.stat_cov*Math.pow(10,this.roundlength))/Math.pow(10,this.roundlength))),this.stat_cov};
this._nodata=function(){return 0==this.serie.length?(alert("Error. You should first enter a serie!"),1):0};this._hasNegativeValue=function(){for(i=0;i<this.serie.length;i++)if(0>this.serie[i])return!0;return!1};this._hasZeroValue=function(){for(i=0;i<this.serie.length;i++)if(0===parseFloat(this.serie[i]))return!0;return!1};this.sorted=function(){null==this.stat_sorted&&(this.stat_sorted=!1==this.is_uniqueValues?this.serie.sort(function(a,b){return a-b}):this.serie.sort(function(a,b){var c=a.toString().toLowerCase(),
d=b.toString().toLowerCase();return c<d?-1:c>d?1:0}));return this.stat_sorted};this.info=function(){if(!this._nodata()){var a;a=""+("Population : "+this.pop()+" - [Min : "+this.min()+" | Max : "+this.max()+"]\n");a+="Mean : "+this.mean()+" - Median : "+this.median()+"\n";return a+="Variance : "+this.variance()+" - Standard deviation : "+this.stddev()+" - Coefficient of variation : "+this.cov()+"\n"}};this.setClassManually=function(a){if(!this._nodata())if(a[0]!==this.min()||a[a.length-1]!==this.max()){a=
alert;var b="Given bounds may not be correct! please check your input.\nMin value : "+this.min()+" / Max value : "+this.max();a(b)}else return this.setBounds(a),this.setRanges(),this.method="manual classification ("+(a.length-1)+" classes)",this.bounds};this.getClassEqInterval=function(a){if(!this._nodata()){var b=this.max(),c=[],d=this.min(),f=(b-this.min())/a;for(i=0;i<=a;i++)c[i]=d,d+=f;c[a]=b;this.setBounds(c);this.setRanges();this.method="eq. intervals ("+a+" classes)";return this.bounds}};this.getQuantiles=
function(a){for(var b=this.sorted(),c=[],d=this.pop()/a,f=1;f<a;f++){var h=Math.round(f*d+.49);c.push(b[h-1])}return c};this.getClassQuantile=function(a){if(!this._nodata()){var b=this.sorted(),c=this.getQuantiles(a);c.unshift(b[0]);c[b.length-1]!==b[b.length-1]&&c.push(b[b.length-1]);this.setBounds(c);this.setRanges();this.method="quantile ("+a+" classes)";return this.bounds}};this.getClassStdDeviation=function(a){if(!this._nodata()){this.max();this.min();var b=[];if(1==a%2){var c=Math.floor(a/2),
d=c+1;b[c]=this.mean()-this.stddev()/2;b[d]=this.mean()+this.stddev()/2;i=c-1}else d=a/2,b[d]=this.mean(),i=d-1;for(;0<i;i--)c=b[i+1]-this.stddev(),b[i]=c;for(i=d+1;i<a;i++)c=b[i-1]+this.stddev(),b[i]=c;b[0]=this.min();b[a]=this.max();this.setBounds(b);this.setRanges();this.method="std deviation ("+a+" classes)";return this.bounds}};this.getClassGeometricProgression=function(a){if(!this._nodata())if(this._hasNegativeValue()||this._hasZeroValue())alert("geometric progression can't be applied with a serie containing negative or zero values.");
else{var b=[],c=this.min(),d=this.max(),d=Math.log(d)/Math.LN10,c=Math.log(c)/Math.LN10,d=(d-c)/a;for(i=0;i<a;i++)b[i]=0==i?c:b[i-1]+d;b=b.map(function(a){return Math.pow(10,a)});b.push(this.max());this.setBounds(b);this.setRanges();this.method="geometric progression ("+a+" classes)";return this.bounds}};this.getClassArithmeticProgression=function(a){if(!this._nodata()){var b=0;for(i=1;i<=a;i++)b+=i;var c=[],d=this.min(),b=(this.max()-d)/b;for(i=0;i<=a;i++)c[i]=0==i?d:c[i-1]+i*b;this.setBounds(c);
this.setRanges();this.method="arithmetic progression ("+a+" classes)";return this.bounds}};this.getClassJenks=function(a){if(!this._nodata()){dataList=this.sorted();for(var b=[],c=0,d=dataList.length+1;c<d;c++){for(var f=[],h=0,e=a+1;h<e;h++)f.push(0);b.push(f)}c=[];d=0;for(f=dataList.length+1;d<f;d++){for(var h=[],e=0,k=a+1;e<k;e++)h.push(0);c.push(h)}d=1;for(f=a+1;d<f;d++){b[0][d]=1;c[0][d]=0;for(var g=1,h=dataList.length+1;g<h;g++)c[g][d]=Infinity;g=0}d=2;for(f=dataList.length+1;d<f;d++){for(var k=
e=h=0,m=1,q=d+1;m<q;m++){var n=d-m+1,g=parseFloat(dataList[n-1]),e=e+g*g,h=h+g,k=k+1,g=e-h*h/k,p=n-1;if(0!=p)for(var l=2,r=a+1;l<r;l++)c[d][l]>=g+c[p][l-1]&&(b[d][l]=n,c[d][l]=g+c[p][l-1])}b[d][1]=1;c[d][1]=g}g=dataList.length;c=[];d=0;for(f=a+1;d<f;d++)c.push(0);c[a]=parseFloat(dataList[dataList.length-1]);c[0]=parseFloat(dataList[0]);for(d=a;2<=d;)f=parseInt(b[g][d]-2),c[d-1]=dataList[f],g=parseInt(b[g][d]-1),d-=1;c[0]==c[1]&&(c[0]=0);this.setBounds(c);this.setRanges();this.method="Jenks ("+a+" classes)";
return this.bounds}};this.getClassUniqueValues=function(){if(!this._nodata()){this.is_uniqueValues=!0;var a=this.sorted(),b=[];for(i=0;i<this.pop();i++)-1===b.indexOf(a[i])&&b.push(a[i]);this.bounds=b;this.method="unique values";return b}};this.getClass=function(a){for(i=0;i<this.bounds.length;i++)if(!0==this.is_uniqueValues){if(a==this.bounds[i])return i}else if(parseFloat(a)<=this.bounds[i+1])return i;return"Unable to get value's class."};this.getRanges=function(){return this.ranges};this.getRangeNum=
function(a){var b,c;for(c=0;c<this.ranges.length;c++)if(b=this.ranges[c].split(/ - /),a<=parseFloat(b[1]))return c};this.getInnerRanges=function(){if(null!=this.inner_ranges)return this.inner_ranges;var a=[],b=this.sorted(),c=1;for(i=0;i<b.length;i++){if(0==i)var d=b[i];parseFloat(b[i])>parseFloat(this.bounds[c])&&(a[c-1]=""+d+this.separator+b[i-1],d=b[i],c++);if(c==this.bounds.length-1)return a[c-1]=""+d+this.separator+b[b.length-1],this.inner_ranges=a}};this.getSortedlist=function(){return this.sorted().join(", ")};
this.getHtmlLegend=function(a,b,c,d,f){var e="";this.doCount();ccolors=null!=a?a:this.colors;lg=null!=b?b:"Legend";getcounter=null!=c?!0:!1;fn=null!=d?d:function(a){return a};null==f&&(f="default");if("discontinuous"==f&&(this.getInnerRanges(),-1!==this.counter.indexOf(0))){alert("Geostats cannot apply 'discontinuous' mode to the getHtmlLegend() method because some classes are not populated.\nPlease switch to 'default' or 'distinct' modes. Exit!");return}if(ccolors.length<this.ranges.length)alert("The number of colors should fit the number of ranges. Exit!");
else{a='<div class="geostats-legend"><div class="geostats-legend-title">'+lg+"</div>";if(!1==this.is_uniqueValues)for(i=0;i<this.ranges.length;i++)!0===getcounter&&(e=' <span class="geostats-legend-counter">('+this.counter[i]+")</span>"),c=this.ranges[i].split(this.separator),b=parseFloat(c[0]).toFixed(this.precision),c=parseFloat(c[1]).toFixed(this.precision),"distinct"==f&&0!=i&&(k(b)?b=parseInt(b)+1:(b=parseFloat(b)+1/Math.pow(10,this.precision),b=parseFloat(b).toFixed(this.precision))),"discontinuous"==
f&&(c=this.inner_ranges[i].split(this.separator),b=parseFloat(c[0]).toFixed(this.precision),c=parseFloat(c[1]).toFixed(this.precision)),b=fn(b)+this.legendSeparator+fn(c),a+='<div><div class="geostats-legend-block" style="background-color:'+ccolors[i]+'"></div> '+b+e+"</div>";else for(i=0;i<this.bounds.length;i++)!0===getcounter&&(e=' <span class="geostats-legend-counter">('+this.counter[i]+")</span>"),b=fn(this.bounds[i]),a+='<div><div class="geostats-legend-block" style="background-color:'+ccolors[i]+
'"></div> '+b+e+"</div>";return a+"</div>"}};this.objectID=(new Date).getUTCMilliseconds();this.log("Creating new geostats object");"undefined"!==typeof e&&0<e.length?(this.serie=e,this.setPrecision(),this.log("Setting serie ("+e.length+") : "+e.join())):this.serie=[];this.getJenks=this.getClassJenks;this.getGeometricProgression=this.getClassGeometricProgression;this.getEqInterval=this.getClassEqInterval;this.getQuantile=this.getClassQuantile;this.getStdDeviation=this.getClassStdDeviation;this.getUniqueValues=
this.getClassUniqueValues;this.getArithmeticProgression=this.getClassArithmeticProgression}});