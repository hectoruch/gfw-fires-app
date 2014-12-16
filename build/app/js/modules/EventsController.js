/*! Global-Forest-Watch-Fires Tue Dec 16 2014 17:59:14 */
define(["dojo/topic"],function(a){var b={};b.events={startModeAnim:"startModeAnim",stopModeAnim:"stopModeAnim",modeSelect:"modeSelect",getPeats:"getPeats",createUI:"createUI",centerChange:"centerChange",toggleDataNavList:"toggleDataNavList",toggleAboutNavList:"toggleAboutNavList",toggleStoryNavList:"toggleStoryNavList",clickNavLink:"clickNavLink",switchToView:"switchToView",footerSelect:"footerSelect",goToBlog:"goToBlog",subscribeToAlerts:"subscribeToAlerts",goToMap:"goToMap",goToAnalysis:"goToAnalysis",goToTomnod:"goToTomnod",goToStory:"goToStory",goToTweet:"goToTweet",initShareButton:"initShareButton"};var c=function(b){return function(c){a.publish(b,c)}};for(var d in b.events)b[d]=c(d);return a.subscribe("centerChange",function(a){require(["views/map/MapController"],function(b){b.centerChange(a)})}),a.subscribe("time-extent-changed",function(a){require(["views/map/MapController"],function(b){b.updateImageryList(a)})}),a.subscribe("clickNavLink",function(a){require(["views/header/HeaderController"],function(b){b.clickNavLink(a)})}),a.subscribe("switchToView",function(a){require(["views/header/HeaderController"],function(b){b.switchToView(a)})}),a.subscribe("startModeAnim",function(){require(["views/home/HomeController"],function(a){a.startModeAnim()})}),a.subscribe("stopModeAnim",function(){require(["views/home/HomeController"],function(a){a.stopModeAnim()})}),a.subscribe("modeSelect",function(a){require(["views/home/HomeController"],function(b){b.modeSelect(a)})}),a.subscribe("getPeats",function(){require(["views/home/HomeController"],function(a){a.getPeats()})}),a.subscribe("footerSelect",function(a){require(["views/footer/FooterController"],function(b){b.footerSelect(a)})}),a.subscribe("goToBlog",function(){require(["views/header/HeaderController"],function(a){a.clickNavLink({viewName:"blog"})})}),a.subscribe("subscribeToAlerts",function(){require(["views/footer/FooterController"],function(a){a.subscribeToAlerts()})}),a.subscribe("goToTweet",function(a){require(["views/footer/FooterController"],function(b){b.goToTweet(a)})}),a.subscribe("initShareButton",function(){require(["views/footer/FooterController"],function(a){a.initShareButton()})}),a.subscribe("toggleDataNavList",function(a){require(["views/data/DataController"],function(b){b.toggleDataNavList(a)})}),a.subscribe("toggleStoryNavList",function(a){require(["views/story/StoryController"],function(b){b.toggleStoryNavList(a)})}),a.subscribe("toggleAboutNavList",function(a){require(["views/about/AboutController"],function(b){b.toggleAboutNavList(a)})}),a.subscribe("goToMap",function(){require(["views/header/HeaderController"],function(a){a.clickNavLink({viewName:"map"})})}),a.subscribe("goToAnalysis",function(){require(["views/report/ReportOptionsController"],function(a){a.reportFromBuble()})}),a.subscribe("goToTomnod",function(){require(["views/header/HeaderController"],function(a){a.clickNavLink({viewName:"link",url:"http://www.tomnod.com/campaign/indonesiafires012014"})})}),a.subscribe("goToStory",function(){require(["views/header/HeaderController"],function(a){a.clickNavLink({viewName:"story"})})}),b});