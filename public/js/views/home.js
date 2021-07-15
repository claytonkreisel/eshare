import Templates from "../Templates.js";
import {fetchAll} from "../provider/ajax/Incidents/fetchAll.js";
import moment from "../vendor/moment.js";

import GroupedIncidents from "../provider/claytonkreisel/GroupedIncidents.js";
// import yourWayForIdling from "../../../provider/you/?";

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

			//Set Dates
			let beginningDate = moment().subtract(11, 'months').startOf('month');
			let endDate = moment().endOf('day');

			//Get and Filter and Sort incidents
			let incidents = fetchAll();
			incidents = incidents.filter((incident) => {
				let incidentDate = new Date(incident.date);
				return (incidentDate <= endDate && incidentDate >= beginningDate) && incident.asset == "alpha";
			});
			incidents.sort(function(a, b){
				const aDate = new Date(a.date);
				const bDate = new Date(b.date);
				if(aDate > bDate){
					return 1;
				} else if(aDate < bDate){
					return -1;
				}
				return 0;
			});

			const speedingGroup = new GroupedIncidents(incidents, 'overspeed');
			const idleGroup = new GroupedIncidents(incidents, 'idle');
			this.set( "speedingMonths", speedingGroup.getIncidentsByMonth() );
			this.set( "idlingMonths", idleGroup.getIncidentsByMonth() );
			this.set( "startCenter", incidents[0].location );
			this.set( "endCenter", incidents[incidents.length - 1].location );
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
