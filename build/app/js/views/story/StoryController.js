define(["dojo/dom","dojo/dom-construct","dojo/on","dojo/dom","dojo/dom-style","dojox/validate/web","dijit/registry","modules/HashController","modules/EventsController","views/story/StoryModel","views/story/StoryConfig","dojo/_base/array","esri/map","esri/toolbars/edit","esri/dijit/BasemapGallery","esri/toolbars/draw","esri/graphic","esri/Color","esri/symbols/SimpleMarkerSymbol","esri/symbols/PictureMarkerSymbol","dijit/layout/ContentPane","dijit/TitlePane","esri/layers/FeatureLayer","esri/InfoTemplate","esri/geometry/webMercatorUtils","dojo/parser"],function(e,t,o,e,r,a,i,s,n,l,c,d,m,u,p,v,y,g,f,b,h,D,T,w,I,S){var M={},E=!1,j="storyView",L={viewId:j,viewName:"story"};return M.init=function(){return E?(console.log(L),n.switchToView(L),void 0):(E=!0,require(["dojo/text!views/story/story.html"],function(t){e.byId(j).innerHTML=t,S.parse(e.byId("storyInnerContainer")).then(function(){M.createMap(),n.switchToView(L),l.applyBindings(j)})}),void 0)},M.createMap=function(){M.map=new m("storiesMap",{zoom:4,basemap:"satellite",minZoom:3,maxZoom:18,center:[115,0]});var e=new p({showArcGISBasemaps:!0,map:M.map},"basemapGallery");e.startup(),dojo.connect(e,"onError",function(e){console.log(e)});var r=M.map.on("load",function(){r.remove(),M.initToolbar();var e=new T(l.vm.storiesURL+l.vm.stagingToken,{id:"storiesLayer",outFields:["*"]});e.setVisibility(!1);var a=function(){console.log(l.vm.attachSuccess)},i=function(){console.log(l.vm.attachFailure)};e.on("edits-complete",function(o){if(l.vm.inputFilesSelector().length>1)for(var r=$(".uploadInput"),s=o.adds[0].objectId,n=document.login,c=l.vm.inputFilesSelector().length-1;c>0;c--)e.addAttachment(s,n,a,i),t.destroy(r[c-1]);e.refresh()}),o.once(M.map,"update-end",function(){M.map.addLayer(e)})})},M.initToolbar=function(){tb=new v(M.map),tb.on("draw-end",M.addGraphic),o(e.byId("storiesMap"),"mouseover",function(){tool="point",tb.activate(tool)})},M.addGraphic=function(t){M.map.graphics.clear();var o=new b({angle:0,xoffset:0,yoffset:10,type:"esriPMS",url:c.markerJSONUrl,imageData:c.markerJSONImageData,contentType:"image/png",width:24,height:24});tb.deactivate(),M.map.enableMapNavigation();var r=new y(t.geometry,o),a=l.vm.storyTitleData();a||(a=e.byId("storyTitleInput").placeholder),M.map.graphics.add(r),l.vm.pointGeom(r);{var i=r.getDojoShape(),s=new dojox.gfx.Moveable(i);dojo.connect(s,"onMoveStop",function(){var e=i.getTransform(),t=r.geometry,o=M.map.toMap(M.map.toScreen(t).offset(e.dx,e.dy));i.setTransform(null);{var a=I.xyToLngLat(o.x,o.y);a[0].toFixed(3),a[1].toFixed(3)}r.setGeometry(o),l.vm.pointGeom(r),console.log(l.vm.pointGeom())})}},M.initEditing=function(){var e=M.map.getLayersVisibleAtScale(),t=e[1],o=new u(M.map);o.on("deactivate",function(e){e.info.isModified&&t.applyEdits(null,[e.graphic],null)})},M.handleFileChange=function(e,t){var o=(t.currentTarget.files[0].name,t.currentTarget);$(o).css("opacity","0");l.vm.mediaListData();l.vm.inputFilesSelector.push({display:!0,name:t.currentTarget.files[0].name})},M.handleAttachmentRemove=function(e,o){for(var r=0,a=$(".uploadInput"),i=0;i<a.length;i++)a[i].files.length>0&&o.currentTarget.firstChild.data===a[i].files[0].name&&(t.destroy(a[i]),r=i,console.log("destroyed"));var a=$(".uploadInput");l.vm.inputFilesSelector.remove(l.vm.inputFilesSelector()[r]),0==r&&o.target.remove()},M.handleUpload=function(){if(honeyPotValue=e.byId("verifyEmailForStory").value)return console.log("honeyPot!"),void 0;var o=l.vm.pointGeom(),r=l.vm.storyEmailData(),i=l.vm.storyTitleData(),s=l.vm.storyVideoData(),n=!0;if(!o)return alert(l.vm.noMapPoint),void 0;if(a.isEmailAddress(r)&&!s||a.isEmailAddress(r)&&a.isUrl(s)?($("#storyEmailInput").css("border-color","#c0c0c0"),$("#requiredEmail").css("color","#464052"),$("#storyVideoInput").css("border-color","#c0c0c0"),$(".storyHeader").css("color","#464052")):(n=!1,a.isEmailAddress(r)?($("#storyEmailInput").css("border-color","#c0c0c0"),$("#requiredEmail").css("color","#464052")):($("#storyEmailInput").css("border-color","red"),$("#requiredEmail").css("color","red")),!a.isUrl(s)&&s?($("#storyVideoInput").css("border-color","red"),$("#videoHeader").css("color","red")):($("#storyVideoInput").css("border-color","#c0c0c0"),$(".storyHeader").css("color","#464052"))),!n)return alert(l.vm.formInvalidText),void 0;if(!l.vm.storyTitleData())return $("#storyTitleInput").css("border-color","red"),$("#requiredTitle").css("color","red"),alert(l.vm.stopSubmissionText),void 0;$("#storyTitleInput").css("border-color","#c0c0c0"),$("#requiredTitle").css("color","#464052"),o.attributes={},l.vm.storyLocationData()&&(o.attributes.Location=l.vm.storyLocationData());var c=$("#storyDateInput").datepicker("getDate"),d=c.getDate(),m=c.getMonth()+1,u=c.getFullYear(),p=m+"/"+d+"/"+u;l.vm.storyDetailsData()&&(o.attributes.Details=l.vm.storyDetailsData()),s&&(o.attributes.Video=s),l.vm.storyNameData()&&(o.attributes.Name=l.vm.storyNameData()),o.attributes.Date=p,o.attributes.Title=i,o.attributes.Email=r,o.attributes.Publish="Y";var v=M.map.getLayer("storiesLayer"),y=function(){alert(l.vm.submitSuccess),l.vm.storyTitleData(null),l.vm.pointGeom(null),l.vm.storyLocationData(null),l.vm.dateObserv(null),l.vm.storyDetailsData(null),l.vm.storyVideoData(null),l.vm.storyMediaData(null),l.vm.storyNameData(null),l.vm.storyEmailData(null),e.byId("storyForm").reset();for(var o=$(".uploadInput"),r=$(".uploadList"),a=0;a<o.length;a++)a<o.length-1&&(t.destroy(o[a]),t.destroy(r[a]));require(["views/map/MapConfig","modules/EventsController"],function(e,t){e.storiesBool=!0,t.goToMap()})},g=function(){alert(l.vm.submitFailure)};v.applyEdits([o],null,null,y,g)},M.toggleBasemapGallery=function(){l.set("showBasemapGallery",!l.get("showBasemapGallery"))},M.toTitleCase=function(e){return e.replace(/\w*/g,function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()})},M.reportAnalyticsHelper=function(e,t,o){ga("A.send","event",e,t,o),ga("B.send","event",e,t,o),ga("C.send","event",e,t,o)},M});