/* global define */
define({

	proxyUrl: "http://rmb/proxy/proxy.php",
	stagingProxyUrl: 'http://staging.blueraster.com/proxy/proxy.php',

	mapOptions: {
		darkGrayCanvas: "http://tiles4.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Dark_Gray_Base_Beta/MapServer",
		basemap: "gray",
		initalZoom: 5,
		center: [115, 0],
		sliderPosition: 'top-right'
	},

	firesLayer: {
		url: "http://gis-potico.wri.org/arcgis/rest/services/Fires/Global_Fires/MapServer",
    id: "Active_Fires",
    defaultLayers: [0,1,2,3],
    query: {
      layerId: 0,
      outfields: ["*"],
      fields: [{
        'name': 'LATITUDE',
        'label': 'LATITUDE'
      }, {
        'name': 'LONGITUDE',
        'label': 'LONGITDUE'
      }, {
        'name': 'BRIGHTNESS',
        'label': 'BRIGHTNESS'
      }, {
        'name': 'CONFIDENCE',
        'label': 'CONFIDENCE'
      }, {
        'name': 'ACQ_DATE',
        'label': 'ACQUISITION DATE'
      }, {
        'name': 'ACQ_TIME',
        'label': 'ACQUISITION TIME'
      }]
    }
	},

	forestUseLayers: {
		url: 'http://gis-potico.wri.org/arcgis/rest/services/CommoditiesAnalyzer/moremaps2_EN/MapServer',
		id: 'Forest_Use',
		defaultLayers: [-1], // Show none by default
		oilPalm: 32, // These map to the value of an input in the UI, so oilPalm is the value of a checkbox
		woodFiber: 28, // These map to the value of an input in the UI, so oilPalm is the value of a checkbox
		logging: 10 // These map to the value of an input in the UI, so oilPalm is the value of a checkbox
	},

	conservationLayers: {
		url: 'http://gis-potico.wri.org/arcgis/rest/services/CommoditiesAnalyzer/moremaps2_EN/MapServer',
		id: 'Conservation',
		defaultLayers: [-1], // Show none by default
		protectedAreas: 25 // These map to the value of an input in the UI, so oilPalm is the value of a checkbox
	},

	landCoverLayers: {
		url: 'http://gis-potico.wri.org/arcgis/rest/services/CommoditiesAnalyzer/moremaps2_EN/MapServer',
		id: 'Land_Cover',
		defaultLayers: [-1], // Show none by default
		peatLands: 1, // These map to the value of an input in the UI, so oilPalm is the value of a checkbox
		landCover: 19 // These map to the value of an input in the UI, so oilPalm is the value of a checkbox
	},

	treeCoverLayer: {
		url: "http://50.18.182.188:6080/arcgis/rest/services/TreeCover2000/ImageServer",
		id: "Tree_Cover_Density"
	},

	landsat8: {
		prefix: "http://landsat.arcgis.com/arcgis/rest/services/",
		url: "http://landsat.arcgis.com/arcgis/rest/services/Landsat8_PanSharpened/ImageServer",
		id: "LandSat_8"
	},	

	text: {
		locatorContainerHeader: "Locator",
		locatorSearchLabel: "Or, go to an area",
		dmsSearch: "Degrees/Minutes/Seconds",
		latLongSearch: "Latitude/Longitude",
		degreesLabel: "Degrees",
		minutesLabel: "Minutes",
		secondsLabel: "Seconds",
		latitudeLabel: "Latitude",
		longitudeLabel: "Longitude",
		searchOptionGoButton: "GO",
		clearSearchPins: "Clear Pins",
		legend: "Legend",
		firesCheckbox: "Active Fires",
		firesSubLabel: "(past 7 days and archive, 1km, global, NASA)",
		confidenceFiresCheckbox: "Only show high confidence fires.",
		firesWeek: "Past Week",
		fires72: "Past 72 hours",
		fires48: "Past 48 hours",
		fires24: "Past 24 hours",
		none: "None",
		oilPalmCheckbox: "Oil Palm concessions",
		woodFiberCheckbox: "Wood Fiber plantations",
		loggingCheckbox: "Logging concessions",
		protectedAreasCheckbox: "Protected Areas",
		peatLandsRadio: "Peat Lands",
		treeCoverDensityRadio: "Tree cover density",
		southeastLandCoverRadio: "Land Cover - Southeast Asia",
		peatLandsSubLabel: "(year 2002, Indonesia)",
		treeCoverDensitySubLabel: "(year 2000, 30m, global)",
		southeastLandCoverSubLabel: "(year 2005, Indonesia, Malaysia, Papua New Guinea)",
		forestUseCheckboxSubLabelSelect: "(varies, select countries)",
		conservationCheckboxSubLabelGlobal: "(varies, global)",
		airQuality: "Air Quality (Coming Soon)",
		windDirection: "Wind Direction (Coming Soon)",
		digitalGlobeCheckbox: "Digital Globe - First Look (Coming Soon)",
		landsatImageCheckbox: "Landsat 8 Pan-sharpened",
		landsatImageSubLabel: "(updated daily, 30m, global)",
		twitterConversationsCheckbox: "Twitter Conversations",
		transparencySliderLabel: "Adjust Layer Transparency:",
		getReportLink: "Get Fires Analysis"
	},

	accordionDijits: [
		{
			"id": "fires-map-accordion",
			"type": "accordion",
			"props":{
				"class":"fires-map-accordion"
			},
			"children": [
				{"id": "fires-panel","props": {"title": "Fires"}},
				{"id": "forest-use-panel","props": {"title": "Forest Use"}},
				{"id": "conservation-panel","props": {"title": "Conservation"}},
				{"id": "land-cover-panel","props": {"title": "Land Cover"}},
				{"id": "air-quality-panel","props": {"title": "Air Quality"}},
				{"id": "imagery-panel","props": {"title": "Imagery"}},
				{"id": "social-media-panel","props": {"title": "Social Media"}}
			]
		},
		{
			"id":"forest-transparency-slider",
			"type": "horizontal-slider",
			"props": {
				"value": 100,
				"minimum": 0,
				"maximum": 100,
				"intermediateChanges": false
			}
		},
		{
			"id":"conservation-transparency-slider",
			"type": "horizontal-slider",
			"props": {
				"value": 100,
				"minimum": 0,
				"maximum": 100,
				"intermediateChanges": false
			}
		},
		{
			"id":"land-cover-transparency-slider",
			"type": "horizontal-slider",
			"props": {
				"value": 100,
				"minimum": 0,
				"maximum": 100,
				"intermediateChanges": false
			}
		}
	]

});