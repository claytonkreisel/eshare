import { map as createMap, control, tileLayer } from "../vendor/leaflet.js";
import Ractive from "../vendor/ractive.js";

import Templates from "../Templates.js";

const MAPBOX_KEY = "pk.eyJ1Ijoicm9ja2VyZXN0IiwiYSI6ImNpenU2aW00NDAwNWozM3BjcHVnc29sNDEifQ.xzldHAo1qqSu3QxzK-uckw";

var LeafletMap;

function getTileUrl( style ){
	return `https://api.mapbox.com/styles/v1/mapbox/${style}/tiles/256/{z}/{x}/{y}?access_token={accessToken}`;
}

LeafletMap = Ractive.extend( {
	"template": Templates.getComponent( "LeafletMap" ),
	data(){
		return {
			"type": "streets",
			"zoom": 1,
			"latitude": 0,
			"longitude": 0
		};
	},
	"computed": {
		version(){
			var versions = {
				"satellite-streets": "10",
				"outdoors": "10",
				"streets": "10",
				"satellite": "9",
				"light": "9",
				"dark": "9",
				"traffic-day": "2",
				"traffic-night": "2"
			};
			var type = this.get( "type" );

			return versions[ type ] || "";
		},
		tile(){
			var type = this.get( "type" );
			var version = this.get( "version" );

			return `${type}-v${version}`;
		}
	},

	"on": {
		render(){
			var tile = this.get( "tile" );
			var mapDiv = this.find( "div.map" );
			var map = createMap( mapDiv, {
				"zoomControl": false,
				"attributionControl": false
			} );
			var roads = tileLayer(
				getTileUrl( tile ),
				{
					"accessToken": MAPBOX_KEY
				}
			);
			var zoomControl = control.zoom();

			zoomControl.addTo( map );
			map.setView( [ 0, 0 ], 1 );
			roads.addTo( map );

			this.map = map;
			this.tileLayer = roads;

			this.recalculateSize();
		}
	},

	getMap(){
		return this.map;
	},
	recalculateSize(){
		if( this.map ){
			setTimeout(
				() => this.map.invalidateSize( true ),
				0
			);
		}
	},
	redraw(){
		var center = {
			"lat": this.get( "latitude" ),
			"lng": this.get( "longitude" )
		};
		var zoom = this.get( "zoom" );
		var tile = this.get( "tile" );
		var map = this.map;

		if( map ){
			this.map.setView(
				center,
				zoom
			);

			this.tileLayer.setUrl( getTileUrl( tile ) );

			this.map.invalidateSize( true );
		}
	}
} );

export default LeafletMap;