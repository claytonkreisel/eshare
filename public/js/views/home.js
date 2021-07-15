import Templates from "../Templates.js";

// import yourWayForSpeeding from "../../../provider/you/?";
// import yourWayForIdling from "../../../provider/you/?";
// import yourWayForStart from "../../../provider/you/?";
// import yourWayForEnd from "../../../provider/you/?";

import SpeedingBarChartComponent from "../components/SpeedingBarChart.js";
import IdlingBarChartComponent from "../components/IdlingBarChart.js";
import MapComponent from "../components/LeafletMap.js";

var HomeView = {
	"template": Templates.getView( "home" ),
	data(){
		return {
			"speedingMonths": [],
			"idlingMonths": [],
			"startCenter": {
				"latitude": 0,
				"longitude": 0
			},
			"endCenter": {
				"latitude": 0,
				"longitude": 0
			}
		};
	},
	"components": {
		"map": MapComponent,
		"speeding-bar-chart": SpeedingBarChartComponent,
		"idling-bar-chart": IdlingBarChartComponent
	},

	"on": {
		init(){
			// this.set( "speedingMonths", /* your way of fetching months of speeding incidents */ );
			// this.set( "idlingMonths", /* your way of fetching months of idling incidents */ );
			// this.set( "startCenter", /* your way of fetching the start location for an asset */ );
			// this.set( "endCenter", /* your way of fetching the end location for an asset */ );
		},
		complete(){
			setTimeout( () => {
				this
					.findAllComponents( "map" )
					.forEach( ( map ) => map.redraw() );
			}, 0 );
		}
	}
};

export default HomeView;
