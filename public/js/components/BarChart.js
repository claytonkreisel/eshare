import Ractive from "../vendor/ractive.js";
import Chart from "../vendor/chartjs.js";

import Templates from "../Templates.js";

var colors = [
	"rgba(255, 99, 132, 0.2)",
	"rgba(54, 162, 235, 0.2)",
	"rgba(255, 206, 86, 0.2)",
	"rgba(75, 192, 192, 0.2)",
	"rgba(153, 102, 255, 0.2)",
	"rgba(255, 159, 64, 0.2)"
];
var lastBarColor;
var BarChartComponent;

function getBarColor(){
	var color = colors[ Math.floor( Math.random() * colors.length ) ];

	if( color == lastBarColor ){
		color = getBarColor();
	}

	lastBarColor = color;

	return color;
}

function getBorderColor( barColor ){
	return barColor.replace( "0.2", "1" );
}

BarChartComponent = Ractive.extend( {
	"template": Templates.getComponent( "BarChart" ),
	data(){
		return {
			"title": "",
			"labels": [],
			"data": []
		};
	},

	"on": {
		render(){
			var barColors = [];
			var borderColors = [];

			for( let i = 0; i < 12; i++ ){
				let color = getBarColor();

				barColors.push( color );
				borderColors.push( getBorderColor( color ) );
			}

			this.chart = new Chart( this.find( "canvas" ), {
				"type": "bar",
				"data": {
					"labels": this.get( "labels" ),
					"datasets": [ {
						"data": this.get( "data" ),
						"backgroundColor": barColors,
						"borderColor": borderColors,
						"borderWidth": 1
					} ]
				},
				"options": {
					"legend": {
						"display": false
					},
					"title": {
						"display": true,
						"text": this.get( "title" )
					},
					"scales": {
						"yAxes": [ {
							"ticks": {
								"beginAtZero": true
							}
						} ]
					}
				}
			} );
		}
	},
	"observe": {
		"data labels": {
			handler(){
				this.redraw();
			}
		}
	},

	redraw(){
		var chart = this.chart;

		if( chart ){
			chart.data.datasets[ 0 ].data = this.get( "data" );
			chart.update();
		}
	}
} );

export default BarChartComponent;
