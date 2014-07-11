define(["knockout","main/Config","views/map/MapConfig","dojo/dom"],function(e,b,a,t){var o={};o.vm={};var r=o.vm;return r.appState=e.observable({}),r.locatorContainerHeader=e.observable(a.text.locatorContainerHeader),r.locatorSearchLabel=e.observable(a.text.locatorSearchLabel),r.dmsSearch=e.observable(a.text.dmsSearch),r.latLongSearch=e.observable(a.text.latLongSearch),r.degreesLabel=e.observable(a.text.degreesLabel),r.minutesLabel=e.observable(a.text.minutesLabel),r.secondsLabel=e.observable(a.text.secondsLabel),r.latitudeLabel=e.observable(a.text.latitudeLabel),r.longitudeLabel=e.observable(a.text.longitudeLabel),r.searchOptionGoButton=e.observable(a.text.searchOptionGoButton),r.clearSearchPins=e.observable(a.text.clearSearchPins),r.legend=e.observable(a.text.legend),r.firesCheckbox=e.observable(a.text.firesCheckbox),r.noaaFiresCheckbox=e.observable(a.text.noaaFiresCheckbox),r.firesSubLabel=e.observable(a.text.firesSubLabel),r.confidenceFiresCheckbox=e.observable(a.text.confidenceFiresCheckbox),r.firesWeek=e.observable(a.text.firesWeek),r.fires72=e.observable(a.text.fires72),r.fires48=e.observable(a.text.fires48),r.fires24=e.observable(a.text.fires24),r.none=e.observable(a.text.none),r.oilPalmCheckbox=e.observable(a.text.oilPalmCheckbox),r.woodFiberCheckbox=e.observable(a.text.woodFiberCheckbox),r.loggingCheckbox=e.observable(a.text.loggingCheckbox),r.protectedAreasCheckbox=e.observable(a.text.protectedAreasCheckbox),r.peatLandsRadio=e.observable(a.text.peatLandsRadio),r.treeCoverDensityRadio=e.observable(a.text.treeCoverDensityRadio),r.primaryForestsRadio=e.observable(a.text.primaryForestsRadio),r.southeastLandCoverRadio=e.observable(a.text.southeastLandCoverRadio),r.peatLandsSubLabel=e.observable(a.text.peatLandsSubLabel),r.treeCoverDensitySubLabel=e.observable(a.text.treeCoverDensitySubLabel),r.southeastLandCoverSubLabel=e.observable(a.text.southeastLandCoverSubLabel),r.forestUseCheckboxSubLabelSelect=e.observable(a.text.forestUseCheckboxSubLabelSelect),r.primaryForestsSubLabel=e.observable(a.text.primaryForestsSubLabel),r.conservationCheckboxSubLabelGlobal=e.observable(a.text.conservationCheckboxSubLabelGlobal),r.airQuality=e.observable(a.text.airQuality),r.digitalGlobeCheckbox=e.observable(a.text.digitalGlobeCheckbox),r.landsatImageCheckbox=e.observable(a.text.landsatImageCheckbox),r.landsatImageSubLabel=e.observable(a.text.landsatImageSubLabel),r.twitterConversationsCheckbox=e.observable(a.text.twitterConversationsCheckbox),r.transparencySliderLabel=e.observable(a.text.transparencySliderLabel),r.getReportLink=e.observable(a.text.getReportLink),r.windyLayerCheckbox=e.observable(a.text.windyLayerCheckbox),r.windySubLabelAdvice=e.observable(a.text.windySubLabelAdvice),r.windySubLabel=e.observable(a.text.windySubLabel),r.provincesCheckbox=e.observable(a.text.provincesCheckbox),r.districtsCheckbox=e.observable(a.text.districtsCheckbox),r.subDistrictsCheckbox=e.observable(a.text.subDistrictsCheckbox),r.villagesCheckbox=e.observable(a.text.villagesCheckbox),r.pf2000Radio=e.observable(a.text.pf2000Radio),r.pf2005Radio=e.observable(a.text.pf2005Radio),r.pf2010Radio=e.observable(a.text.pf2010Radio),r.pf2012Radio=e.observable(a.text.pf2012Radio),r.showBasemapGallery=e.observable(!1),r.showShareContainer=e.observable(!1),r.showLocatorWidgets=e.observable(!1),r.showPrimaryForestOptions=e.observable(!1),r.showWindLegend=e.observable(!1),r.showLatLongInputs=e.observable(!1),r.showDMSInputs=e.observable(!0),r.showClearPinsOption=e.observable(!1),r.currentLatitude=e.observable(0),r.currentLongitude=e.observable(0),o.applyBindings=function(b){e.applyBindings(r,t.byId(b))},o.get=function(e){return"model"===e?o.vm:o.vm[e]()},o.set=function(e,b){o.vm[e](b)},o});