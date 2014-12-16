/*! Global-Forest-Watch-Fires Tue Dec 16 2014 17:59:14 */
!function(a){"object"==typeof exports?module.exports=a():"function"==typeof define&&define.amd?define(a):geostats=a()}(function(){var a=function(a){return"number"==typeof a&&parseFloat(a)==parseInt(a,10)&&!isNaN(a)};return Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){if(void 0===this||null===this)throw new TypeError('"this" is null or not defined');var c=this.length>>>0;for(b=+b||0,1/0===Math.abs(b)&&(b=0),0>b&&(b+=c,0>b&&(b=0));c>b;b++)if(this[b]===a)return b;return-1}),function(b){this.objectId="",this.legendSeparator=this.separator=" - ",this.method="",this.precision=0,this.precisionflag="auto",this.roundlength=2,this.debug=this.is_uniqueValues=!1,this.bounds=[],this.ranges=[],this.inner_ranges=null,this.colors=[],this.counter=[],this.stat_cov=this.stat_stddev=this.stat_variance=this.stat_pop=this.stat_min=this.stat_max=this.stat_sum=this.stat_median=this.stat_mean=this.stat_sorted=null,this.log=function(a){1==this.debug&&console.log(this.objectID+"(object id) :: "+a)},this.setBounds=function(a){this.log("Setting bounds ("+a.length+") : "+a.join()),this.bounds=[],this.bounds=a},this.setSerie=function(a){this.log("Setting serie ("+a.length+") : "+a.join()),this.serie=[],this.serie=a,this.setPrecision()},this.setColors=function(a){this.log("Setting color ramp ("+a.length+") : "+a.join()),this.colors=a},this.doCount=function(){if(!this._nodata()){var a=this.sorted();for(this.counter=[],i=0;i<this.bounds.length-1;i++)this.counter[i]=0;for(j=0;j<a.length;j++){var b=this.getClass(a[j]);this.counter[b]++}}},this.setPrecision=function(a){if("undefined"!=typeof a&&(this.precisionflag="manual",this.precision=a),"auto"==this.precisionflag)for(a=0;a<this.serie.length;a++){var b=isNaN(this.serie[a]+"")||-1==(this.serie[a]+"").toString().indexOf(".")?0:(this.serie[a]+"").split(".")[1].length;b>this.precision&&(this.precision=b)}this.log("Calling setPrecision(). Mode : "+this.precisionflag+" - Decimals : "+this.precision),this.serie=this.decimalFormat(this.serie)},this.decimalFormat=function(a){for(var b=[],c=0;c<a.length;c++){var d=a[c];b[c]=!isNaN(parseFloat(d))&&isFinite(d)?parseFloat(a[c].toFixed(this.precision)):a[c]}return b},this.setRanges=function(){for(this.ranges=[],i=0;i<this.bounds.length-1;i++)this.ranges[i]=this.bounds[i]+this.separator+this.bounds[i+1]},this.min=function(){return this._nodata()?void 0:this.stat_min=Math.min.apply(null,this.serie)},this.max=function(){return this.stat_max=Math.max.apply(null,this.serie)},this.sum=function(){if(!this._nodata()){if(null==this.stat_sum)for(i=this.stat_sum=0;i<this.pop();i++)this.stat_sum+=parseFloat(this.serie[i]);return this.stat_sum}},this.pop=function(){return this._nodata()?void 0:(null==this.stat_pop&&(this.stat_pop=this.serie.length),this.stat_pop)},this.mean=function(){return this._nodata()?void 0:(null==this.stat_mean&&(this.stat_mean=parseFloat(this.sum()/this.pop())),this.stat_mean)},this.median=function(){if(!this._nodata()){if(null==this.stat_median){this.stat_median=0;var a=this.sorted();this.stat_median=a.length%2?parseFloat(a[Math.ceil(a.length/2)-1]):(parseFloat(a[a.length/2-1])+parseFloat(a[a.length/2]))/2}return this.stat_median}},this.variance=function(){if(round="undefined"==typeof round?!0:!1,!this._nodata()){if(null==this.stat_variance){for(var a=0,b=0;b<this.pop();b++)a+=Math.pow(this.serie[b]-this.mean(),2);this.stat_variance=a/this.pop(),1==round&&(this.stat_variance=Math.round(this.stat_variance*Math.pow(10,this.roundlength))/Math.pow(10,this.roundlength))}return this.stat_variance}},this.stddev=function(a){return a="undefined"==typeof a?!0:!1,this._nodata()?void 0:(null==this.stat_stddev&&(this.stat_stddev=Math.sqrt(this.variance()),1==a&&(this.stat_stddev=Math.round(this.stat_stddev*Math.pow(10,this.roundlength))/Math.pow(10,this.roundlength))),this.stat_stddev)},this.cov=function(a){return a="undefined"==typeof a?!0:!1,this._nodata()?void 0:(null==this.stat_cov&&(this.stat_cov=this.stddev()/this.mean(),1==a&&(this.stat_cov=Math.round(this.stat_cov*Math.pow(10,this.roundlength))/Math.pow(10,this.roundlength))),this.stat_cov)},this._nodata=function(){return 0==this.serie.length?(alert("Error. You should first enter a serie!"),1):0},this._hasNegativeValue=function(){for(i=0;i<this.serie.length;i++)if(0>this.serie[i])return!0;return!1},this._hasZeroValue=function(){for(i=0;i<this.serie.length;i++)if(0===parseFloat(this.serie[i]))return!0;return!1},this.sorted=function(){return null==this.stat_sorted&&(this.stat_sorted=this.serie.sort(0==this.is_uniqueValues?function(a,b){return a-b}:function(a,b){var c=a.toString().toLowerCase(),d=b.toString().toLowerCase();return d>c?-1:c>d?1:0})),this.stat_sorted},this.info=function(){if(!this._nodata()){var a;return a=""+("Population : "+this.pop()+" - [Min : "+this.min()+" | Max : "+this.max()+"]\n"),a+="Mean : "+this.mean()+" - Median : "+this.median()+"\n",a+="Variance : "+this.variance()+" - Standard deviation : "+this.stddev()+" - Coefficient of variation : "+this.cov()+"\n"}},this.setClassManually=function(a){if(!this._nodata()){if(a[0]===this.min()&&a[a.length-1]===this.max())return this.setBounds(a),this.setRanges(),this.method="manual classification ("+(a.length-1)+" classes)",this.bounds;a=alert;var b="Given bounds may not be correct! please check your input.\nMin value : "+this.min()+" / Max value : "+this.max();a(b)}},this.getClassEqInterval=function(a){if(!this._nodata()){var b=this.max(),c=[],d=this.min(),e=(b-this.min())/a;for(i=0;a>=i;i++)c[i]=d,d+=e;return c[a]=b,this.setBounds(c),this.setRanges(),this.method="eq. intervals ("+a+" classes)",this.bounds}},this.getQuantiles=function(a){for(var b=this.sorted(),c=[],d=this.pop()/a,e=1;a>e;e++){var f=Math.round(e*d+.49);c.push(b[f-1])}return c},this.getClassQuantile=function(a){if(!this._nodata()){var b=this.sorted(),c=this.getQuantiles(a);return c.unshift(b[0]),c[b.length-1]!==b[b.length-1]&&c.push(b[b.length-1]),this.setBounds(c),this.setRanges(),this.method="quantile ("+a+" classes)",this.bounds}},this.getClassStdDeviation=function(a){if(!this._nodata()){this.max(),this.min();var b=[];if(1==a%2){var c=Math.floor(a/2),d=c+1;b[c]=this.mean()-this.stddev()/2,b[d]=this.mean()+this.stddev()/2,i=c-1}else d=a/2,b[d]=this.mean(),i=d-1;for(;i>0;i--)c=b[i+1]-this.stddev(),b[i]=c;for(i=d+1;a>i;i++)c=b[i-1]+this.stddev(),b[i]=c;return b[0]=this.min(),b[a]=this.max(),this.setBounds(b),this.setRanges(),this.method="std deviation ("+a+" classes)",this.bounds}},this.getClassGeometricProgression=function(a){if(!this._nodata()){if(!this._hasNegativeValue()&&!this._hasZeroValue()){var b=[],c=this.min(),d=this.max(),d=Math.log(d)/Math.LN10,c=Math.log(c)/Math.LN10,d=(d-c)/a;for(i=0;a>i;i++)b[i]=0==i?c:b[i-1]+d;return b=b.map(function(a){return Math.pow(10,a)}),b.push(this.max()),this.setBounds(b),this.setRanges(),this.method="geometric progression ("+a+" classes)",this.bounds}alert("geometric progression can't be applied with a serie containing negative or zero values.")}},this.getClassArithmeticProgression=function(a){if(!this._nodata()){var b=0;for(i=1;a>=i;i++)b+=i;var c=[],d=this.min(),b=(this.max()-d)/b;for(i=0;a>=i;i++)c[i]=0==i?d:c[i-1]+i*b;return this.setBounds(c),this.setRanges(),this.method="arithmetic progression ("+a+" classes)",this.bounds}},this.getClassJenks=function(a){if(!this._nodata()){dataList=this.sorted();for(var b=[],c=0,d=dataList.length+1;d>c;c++){for(var e=[],f=0,g=a+1;g>f;f++)e.push(0);b.push(e)}for(c=[],d=0,e=dataList.length+1;e>d;d++){for(var f=[],g=0,h=a+1;h>g;g++)f.push(0);c.push(f)}for(d=1,e=a+1;e>d;d++){b[0][d]=1,c[0][d]=0;for(var i=1,f=dataList.length+1;f>i;i++)c[i][d]=1/0;i=0}for(d=2,e=dataList.length+1;e>d;d++){for(var h=g=f=0,j=1,k=d+1;k>j;j++){var l=d-j+1,i=parseFloat(dataList[l-1]),g=g+i*i,f=f+i,h=h+1,i=g-f*f/h,m=l-1;if(0!=m)for(var n=2,o=a+1;o>n;n++)c[d][n]>=i+c[m][n-1]&&(b[d][n]=l,c[d][n]=i+c[m][n-1])}b[d][1]=1,c[d][1]=i}for(i=dataList.length,c=[],d=0,e=a+1;e>d;d++)c.push(0);for(c[a]=parseFloat(dataList[dataList.length-1]),c[0]=parseFloat(dataList[0]),d=a;d>=2;)e=parseInt(b[i][d]-2),c[d-1]=dataList[e],i=parseInt(b[i][d]-1),d-=1;return c[0]==c[1]&&(c[0]=0),this.setBounds(c),this.setRanges(),this.method="Jenks ("+a+" classes)",this.bounds}},this.getClassUniqueValues=function(){if(!this._nodata()){this.is_uniqueValues=!0;var a=this.sorted(),b=[];for(i=0;i<this.pop();i++)-1===b.indexOf(a[i])&&b.push(a[i]);return this.bounds=b,this.method="unique values",b}},this.getClass=function(a){for(i=0;i<this.bounds.length;i++)if(1==this.is_uniqueValues){if(a==this.bounds[i])return i}else if(parseFloat(a)<=this.bounds[i+1])return i;return"Unable to get value's class."},this.getRanges=function(){return this.ranges},this.getRangeNum=function(a){var b,c;for(c=0;c<this.ranges.length;c++)if(b=this.ranges[c].split(/ - /),a<=parseFloat(b[1]))return c},this.getInnerRanges=function(){if(null!=this.inner_ranges)return this.inner_ranges;var a=[],b=this.sorted(),c=1;for(i=0;i<b.length;i++){if(0==i)var d=b[i];if(parseFloat(b[i])>parseFloat(this.bounds[c])&&(a[c-1]=""+d+this.separator+b[i-1],d=b[i],c++),c==this.bounds.length-1)return a[c-1]=""+d+this.separator+b[b.length-1],this.inner_ranges=a}},this.getSortedlist=function(){return this.sorted().join(", ")},this.getHtmlLegend=function(b,c,d,e,f){var g="";if(this.doCount(),ccolors=null!=b?b:this.colors,lg=null!=c?c:"Legend",getcounter=null!=d?!0:!1,fn=null!=e?e:function(a){return a},null==f&&(f="default"),"discontinuous"==f&&(this.getInnerRanges(),-1!==this.counter.indexOf(0)))return void alert("Geostats cannot apply 'discontinuous' mode to the getHtmlLegend() method because some classes are not populated.\nPlease switch to 'default' or 'distinct' modes. Exit!");if(!(ccolors.length<this.ranges.length)){if(b='<div class="geostats-legend"><div class="geostats-legend-title">'+lg+"</div>",0==this.is_uniqueValues)for(i=0;i<this.ranges.length;i++)!0===getcounter&&(g=' <span class="geostats-legend-counter">('+this.counter[i]+")</span>"),d=this.ranges[i].split(this.separator),c=parseFloat(d[0]).toFixed(this.precision),d=parseFloat(d[1]).toFixed(this.precision),"distinct"==f&&0!=i&&(a(c)?c=parseInt(c)+1:(c=parseFloat(c)+1/Math.pow(10,this.precision),c=parseFloat(c).toFixed(this.precision))),"discontinuous"==f&&(d=this.inner_ranges[i].split(this.separator),c=parseFloat(d[0]).toFixed(this.precision),d=parseFloat(d[1]).toFixed(this.precision)),c=fn(c)+this.legendSeparator+fn(d),b+='<div><div class="geostats-legend-block" style="background-color:'+ccolors[i]+'"></div> '+c+g+"</div>";else for(i=0;i<this.bounds.length;i++)!0===getcounter&&(g=' <span class="geostats-legend-counter">('+this.counter[i]+")</span>"),c=fn(this.bounds[i]),b+='<div><div class="geostats-legend-block" style="background-color:'+ccolors[i]+'"></div> '+c+g+"</div>";return b+"</div>"}alert("The number of colors should fit the number of ranges. Exit!")},this.objectID=(new Date).getUTCMilliseconds(),this.log("Creating new geostats object"),"undefined"!=typeof b&&0<b.length?(this.serie=b,this.setPrecision(),this.log("Setting serie ("+b.length+") : "+b.join())):this.serie=[],this.getJenks=this.getClassJenks,this.getGeometricProgression=this.getClassGeometricProgression,this.getEqInterval=this.getClassEqInterval,this.getQuantile=this.getClassQuantile,this.getStdDeviation=this.getClassStdDeviation,this.getUniqueValues=this.getClassUniqueValues,this.getArithmeticProgression=this.getClassArithmeticProgression}});