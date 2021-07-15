import moment from "moment";
import Chance from "chance";

function shuffle( array ){
	var currentIndex = array.length;
	var temporaryValue;
	var randomIndex;

	while( currentIndex != 0 ){
		randomIndex = Math.floor( Math.random() * currentIndex );
		currentIndex -= 1;

		temporaryValue = array[ currentIndex ];
		array[ currentIndex ] = array[ randomIndex ];
		array[ randomIndex ] = temporaryValue;
	}

	return array;
}

function getNumberBetween( min, max ){
	return Math.floor( Math.random() * ( max - min + 1 ) + min );
}

function getMonthWithCapInYear( now, yearCap ){
	var min = 0; // jan
	var max = 11; // dec

	if( now.year() == yearCap ){
		max = now.month();
	}

	return getNumberBetween( min, max );
}

function getDayWithCapInMonth( now, month, year ){
	var min = 1;
	var max = moment().month( month ).daysInMonth();

	if( now.year() == year && now.month() == month ){
		max = now.date();
	}

	return getNumberBetween( min, max );
}

function randomIso(){
	var maxDate = moment();
	var minDate = moment().subtract( { "years": 2 } ).startOf( "year" );

	return moment( getNumberBetween( minDate.valueOf(), maxDate.valueOf() ) ).format();
}

function getIncidentsForAsset( count, assetName ){
	var chance = new Chance();
	var incidents = [];

	for( let i = 0; i < count; i++ ){
		incidents.push( {
			"asset": assetName,
			"type": chance.weighted( [ "idle", "overspeed", "ignitionOff", "impact" ], [ 0.4, 0.4, 0.15, 0.05 ] ),
			"date": randomIso(),
			"location": {
				"latitude": chance.latitude(),
				"longitude": chance.longitude()
			}
		} );
	}

	return incidents;
}

export function fetchAll(){
	var incidents = [];
	var now = moment();

	incidents = incidents.concat( getIncidentsForAsset( 240, "alpha" ) );
	incidents = incidents.concat( getIncidentsForAsset( 120, "beta" ) );
	incidents = incidents.concat( getIncidentsForAsset( 120, "gamma" ) );
	incidents = incidents.concat( getIncidentsForAsset( 120, "delta" ) );

	incidents.unshift( {
		"asset": "alpha",
		"type": "ignitionOff",
		"date": moment( now ).subtract( { "years": 1 } ).add( { "months": 1 } ).startOf( "month" ).format(),
		"location": {
			"latitude": 27.174114499581144,
			"longitude": 78.04209244255617
		}
	} );

	incidents.push( {
		"asset": "alpha",
		"type": "ignitionOff",
		"date": moment( now ).endOf( "day" ).format(),
		"location": {
			"latitude": 41.88267927704204,
			"longitude": -87.62326356772975
		}
	} );

	return shuffle( incidents );
}
