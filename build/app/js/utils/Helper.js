/*! Global-Forest-Watch-Fires Thu Nov 20 2014 12:06:49 */
define(["dojo/dom","dojo/dom-construct"],function(a,b){return{showLoader:function(c,d){if(a.byId(d)&&b.destroy(d),a.byId(c)){{var e=b.create("div",{id:d,"class":"loadingWheelContainer"},c,"first");b.create("img",{"class":"loadingWheel",src:"app/images/loader.gif"},e,"first")}return!0}return!1},hideLoader:function(c){return a.byId(c)?(b.destroy(c),!0):!1}}});