import moment from "../vendor/moment.js";
import Ractive from "../vendor/ractive.js";

import BarChart from "./BarChart.js";

var IdlingBarChartComponent = Ractive.extend( {
	"template": '<bar-chart title="{{ title }}" data="{{ data }}" labels="{{ labels }}" />',
	data(){
		return {
			"months": [],
			"title": "# of Idling Incidents"
		};
	},
	"computed": {
		labels(){
			var months = this.get( "months" );

			return months.map( ( month ) => moment( month.date ).format( "MMM" ) );
		},
		data(){
			var months = this.get( "months" );

			return months.map( ( month ) => month.incidents.length );
		}
	},
	"components": {
		"bar-chart": BarChart
	}
} );

export default IdlingBarChartComponent;
