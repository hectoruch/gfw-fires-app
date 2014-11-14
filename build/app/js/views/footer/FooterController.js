/*! Global-Forest-Watch-Fires Fri Nov 14 2014 15:52:50 */
define(["dojo/dom","dojo/Deferred","dijit/registry","modules/HashController","modules/EventsController","views/footer/FooterModel","views/map/MapConfig","main/Config","dojo/_base/array","esri/tasks/query","esri/tasks/QueryTask","esri/request"],function(dom,Deferred,registry,HashController,EventsController,FooterModel,MapConfig,MainConfig,arrayUtil,Query,QueryTask,esriRequest){var o={},initialized=!1,viewId="app-footer";return o.init=function(){var a=this;initialized||(initialized=!0,require(["dojo/text!views/footer/footer.html","views/footer/FooterModel"],function(b,c){dom.byId(viewId).innerHTML=b,c.applyBindings(viewId),a.initShareButton()}))},o.initShareButton=function(){!function(a,b,c){var d,e=a.getElementsByTagName(b)[0];a.getElementById(c)||(d=a.createElement(b),d.id=c,d.src="https://platform.twitter.com/widgets.js",e.parentNode.insertBefore(d,e))}(document,"script","twitter-wjs"),function(a,b,c){var d,e=a.getElementsByTagName(b)[0];a.getElementById(c)||(d=a.createElement(b),d.id=c,d.src="//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.0",e.parentNode.insertBefore(d,e))}(document,"script","facebook-jssdk"),function(){var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://apis.google.com/js/plusone.js";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)}()},o.footerSelect=function(data){var selectedItem=data;eval("EventsController."+selectedItem.eventName+"()")},o.subscribeToAlerts=function(){var a=this;require(["dojo/on","dijit/Dialog","dojo/dom-style","dojo/dom-construct","dijit/form/Select","dojox/validate/web","dojo/text!views/footer/emailAlertForm.html"],function(b,c,d,e,f,g,h){function i(){e.destroy(dom.byId("signUpAlertsForm")),k.intlTelInput("destroy"),l.remove(),m.remove(),j.remove(),n.remove()}var j,k,l,m,n,o=new c({title:"Sign up to receive fire alerts!",style:"width: 550px;height: auto;"}),p=h;o.setContent(p),o.show(),FooterModel.applyBindings("signUpAlertsForm"),k=$("#phoneNumberForAlerts"),k.intlTelInput({validationScript:"./app/libs/isValidNumber.js"}),a.getProvinceValues().then(function(c){FooterModel.get("model").provincesAvailableForAlerts(c),a.getDistrictValues().then(function(c){var e=FooterModel.get("model");e.districtsAvailableForAlerts([]),e.subDistrictsAvailableForAlerts([]);var f=FooterModel.get("provincesAvailableForAlerts"),h=new Array,p={label:"Select All",value:"ALL"};arrayUtil.forEach(f,function(a){h[a.value]=new Array(p)}),arrayUtil.forEach(c,function(a){a.province&&h[a.province].push(a)}),l=b(dom.byId("aoiProvincePicker"),"change",function(a){var b=a.target?a.target.value:a.srcElement.value;e.districtsAvailableForAlerts(h[b]),e.subDistrictsAvailableForAlerts([])}),m=b(dom.byId("aoiDistrictPicker"),"change",function(b){var c;c=b.target?b.target.selectedOptions?b.target.selectedOptions:b.target.value:b.srcElement.value,"NONE"!==c&&a.getSubDistricts(c).then(function(a){e.subDistrictsAvailableForAlerts(a)})}),n=b(dom.byId("aoiSubDistrictPicker"),"change",function(a){var b=!1;a.target.selectedOptions&&(b=a.target.selectedOptions.length>10?!0:!1),"ALL"==a.target.value&&(b=!0),e.showSubDistrictWarning(b?!0:!1)}),j=b(dom.byId("alerts-submit-button"),"click",function(){var b=dom.byId("emailForAlerts").value,c=dom.byId("phoneNumberForAlerts").value,f=!0,h=[];e.errorMessages([]),e.showErrorMessages(!1),"ALL"===dom.byId("aoiSubDistrictPicker").value?arrayUtil.forEach(dom.byId("aoiSubDistrictPicker").options,function(a){"Select All"!==a.innerHTML&&h.push({aoi_id:parseInt(a.value),aoi_name:a.innerHTML})}):arrayUtil.forEach(dom.byId("aoiSubDistrictPicker").options,function(a){a.selected&&h.push({aoi_id:parseInt(a.value),aoi_name:a.innerHTML})}),0===h.length?(d.set("aoiSubDistrictPicker","border","1px solid red"),e.errorMessages.push("You need to select at least one subdistrict."),f=!1):d.set("aoiSubDistrictPicker","border",""),g.isEmailAddress(b)||k.intlTelInput("isValidNumber")?(d.set("phoneNumberForAlerts","border",""),d.set("emailForAlerts","border","")):(f=!1,d.set("emailForAlerts","border","1px solid red"),d.set("phoneNumberForAlerts","border","1px solid red"),e.errorMessages.push("You must at least provide a phone number and/or an email.")),f?(""!==c&&(c=c.replace(/[^\d]/g,""),a.postSubscribeRequest(h,c,"sms").then(function(a){a&&(o.destroy(),i())})),g.isEmailAddress(b)&&a.postSubscribeRequest(h,b,"email").then(function(a){a&&(o.destroy(),i())})):e.showErrorMessages(!0)}),o.on("cancel",i)})})})},o.postSubscribeRequest=function(a,b,c){var d,e=MainConfig.emailSubscribeUrl,f={areas:JSON.stringify(a),msg_addr:b,msg_type:c},g=dom.byId("verifyEmailForAlerts").value,h=new Deferred;return""===g?(dom.byId("alerts-submit-button").innerHTML="Submitting...",d=esriRequest({url:e,content:f,handleAs:"json"},{usePost:!0}),d.then(function(){dom.byId("alerts-submit-button").innerHTML="Submit",alert("You have successfully subscribed, you should start receiving alerts as they come in for your area(s) of interest."),h.resolve(!0)},function(a){dom.byId("alerts-submit-button").innerHTML="Submit",alert("There was an error subcribing at this time. "+a.message),h.resolve(!1)})):h.resolve(!0),h.promise},o.getProvinceValues=function(){var a,b,c=new Deferred,d=new QueryTask(MapConfig.layerForProvinceQuery.url),e=new Query,f=[],g=[];return e.returnGeometry=!1,e.outFields=MapConfig.layerForProvinceQuery.outFields,e.where="1 = 1",d.execute(e,function(d){arrayUtil.forEach(d.features,function(c){b=c.attributes,a=b[MapConfig.layerForProvinceQuery.outFields[0]],-1===arrayUtil.indexOf(g,a)&&(g.push(a),f.push({label:a,value:a}))}),f.sort(function(a,b){return a.label<b.label?-1:a.label>b.label?1:0}),f.unshift({label:"Choose one",value:"NONE",selected:!0}),c.resolve(f)},function(){c.resolve(!1)}),c.promise},o.getDistrictValues=function(){var a,b,c,d=new Deferred,e=new QueryTask(MapConfig.layerForDistrictQuery.url),f=new Query,g=[],h=[];return FooterModel.get("districtsAvailableForAlerts").length>0?d.resolve(!1):(f.returnGeometry=!1,f.outFields=MapConfig.layerForDistrictQuery.outFields,f.where="1 = 1",e.execute(f,function(e){arrayUtil.forEach(e.features,function(d){c=d.attributes,a=c[MapConfig.layerForDistrictQuery.outFields[0]],b=c[MapConfig.layerForDistrictQuery.outFields[1].toUpperCase()],-1===arrayUtil.indexOf(h,a)&&(h.push(a),g.push({label:a,value:a,province:b}))}),g.sort(function(a,b){return a.label<b.label?-1:a.label>b.label?1:0}),g.unshift({label:"Choose one",value:"NONE",selected:!0}),d.resolve(g)},function(){d.resolve(!1)})),d.promise},o.getSubDistricts=function(a){var b,c,d=new Deferred,e=new QueryTask(MapConfig.layerForSubDistrictQuery.url),f=new Query,g=[],h=[];f.returnGeometry=!1,f.outFields=MapConfig.layerForSubDistrictQuery.outFields;var i;if("ALL"===a[0].value)console.log("ALL"),i="1 = 1";else for(var i="DISTRICT = '",j=0;j<a.length;j++)i+=a[j].value,i+=j==a.length-1?"'":"' OR DISTRICT = '";return f.where=i,e.execute(f,function(a){arrayUtil.forEach(a.features,function(a){b=a.attributes,c=b[MapConfig.layerForSubDistrictQuery.outFields[1]],-1===arrayUtil.indexOf(h,c)&&(h.push(c),g.push({label:b[MapConfig.layerForSubDistrictQuery.outFields[0]],value:c}))}),g.sort(function(a,b){return a.label<b.label?-1:a.label>b.label?1:0}),g.unshift({label:"Select All",value:"ALL",selected:!0}),d.resolve(g)},function(){d.resolve(!1)}),d.promise},o});