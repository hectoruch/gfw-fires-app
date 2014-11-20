/*! Global-Forest-Watch-Fires Thu Nov 20 2014 12:06:49 */
define([],function(){var a={defaultState:{v:"home",x:115,y:0,l:5,lyrs:"Active_Fires"},validViews:["home","blog","map","about","data"],emailSubscribeUrl:"http://54.164.126.73/subscribe",navigationLinks:[{html:"Home",viewName:"home",domId:"homeView",selected:!0},{html:"Map",viewName:"map",domId:"mapView",selected:!1},{html:"Fires Blog",viewName:"blog",domId:"blogView",selected:!1},{html:"Data",viewName:"data",domId:"dataView",selected:!1},{html:"About",viewName:"about",domId:"aboutView",selected:!1},{html:"GFW",url:"http://www.globalforestwatch.org",viewName:"link",domId:"link",selected:!1}],headerTitle:"A partnership convened by the World Resources Institute",headerDesc:"Track forest fires and haze in the ASEAN region",homeModeOptions:[{html:"Fires occuring in peatland <br> in the last 7 days",eventName:"goToMap",display:!1},{html:"<span>View the latest analysis</span>",eventName:"goToAnalysis",display:!0},{html:"<span>View the latest imagery</span>",eventName:"goToMap",display:!1},{html:"<span>Explore the map</span>",eventName:"goToMap",display:!1},{html:"<span class='more-text'>Sign up for SMS and email fire alerts</span>",eventName:"subscribeToAlerts",display:!1},{html:"<span class='most-text'>Tag illegal fires in Indonesia with Tomnod crowdsourcing</span>",eventName:"goToTomnod",display:!1}],footerModeOptions:[{title:"Receive Fire Alerts",desc:"Sign up to receive email or SMS fire alerts in your area of interest.",action:"Sign up now",eventName:"subscribeToAlerts",css:"receiveAlerts",url:!1},{title:"Analyze Forest Fires",desc:"View the latest data on fire locations and air quality and do you own analysis",action:"Start Analyzing",eventName:"goToMap",css:"analysisAlerts",url:!1},{title:"Join The Conversation",desc:"Tweet, tweet, tweet!",action:"Tweet Now",eventName:"goToTweet",css:"submitStory",url:"https://twitter.com/search?q=MelawanAsap%20OR%20Indonesiafires&src=typd",target:"_blank"}],dataLinks:[{name:"FIRES",htmlContent:"dataFires",selected:!0},{name:"FOREST USE",htmlContent:"dataForestUse",selected:!1},{name:"CONSERVATION",htmlContent:"dataConservation",selected:!1},{name:"LAND COVER",htmlContent:"dataLandCover",selected:!1},{name:"Air Quality",htmlContent:"dataAirQuality",selected:!1},{name:"Imagery",htmlContent:"dataImagery",selected:!1}],dataHeaderDescription:"Data sources Global Forest Watch hosts a wealth of data relating to forests. Some data have been developed by WRI or by GFW partner organizations. Other data are in the public domain and have been developed by governments, NGOs, and companies. The data vary in accuracy, resolution, frequency of update, and geographic coverage. The summaries below include links to further information such as methods and technical documents. Full download of the data sets is available for most sources.",aboutLinks:[{name:"ABOUT GFW FIRES",htmlContent:"aboutGfwFires",selected:!0},{name:"Forest fires and their impact",htmlContent:"foreFireAndTheirImpact",selected:!1},{name:"PARTNERS",htmlContent:"aboutPartners",selected:!1}]};return a});