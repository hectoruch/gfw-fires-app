/*! Global-Forest-Watch-Fires Mon Dec 01 2014 10:54:58 */
define(["dojo/_base/declare","esri/layers/ArcGISDynamicMapServiceLayer","esri/geometry/webMercatorUtils","esri/SpatialReference","dojo/io-query"],function(a,b,c,d,e){return a("DigitalGlobeServiceLayer",b,{constructor:function(a){this.spatialReference=new d({wkid:4326}),this.loaded=!0,this.featureId="ab489b7b9b49b8974a762ad05c0616fa",this.url=a},getImageUrl:function(a,b,d,f){var g=c.webMercatorToGeographic(a._normalize());if(void 0===g){var h=this._map,i=esri.geometry.Extent.prototype._normalizeX(h.extent.xmax,h.spatialReference._getInfo()).x,j=esri.geometry.Extent.prototype._normalizeX(h.extent.xmin,h.spatialReference._getInfo()).x;g=c.webMercatorToGeographic(new esri.geometry.Extent(j,h.extent.ymin,i,h.extent.ymax,h.spatialReference))}var k={SERVICE:"WMS",REQUEST:"GetMap",VERSION:"1.1.1",LAYERS:"DigitalGlobe:Imagery",STYLES:"default",format:"image/png",TRANSPARENT:!0,HEIGHT:d,WIDTH:b,BGCOLOR:"0xFFFFFF",CONNECTID:"dec7c992-899b-4d85-99b9-8a60a0e6047f",FEATURECOLLECTION:this.featureId,BBOX:g.xmin+","+g.ymin+","+g.xmax+","+g.ymax,SRS:"EPSG:"+this.spatialReference.wkid};f(decodeURIComponent(this.url+"?"+e.objectToQuery(k)))},setFeatureId:function(a){this.featureId=a}})});