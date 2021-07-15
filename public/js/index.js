import Ractive from "./vendor/ractive.js";

import HomeView from "./views/home.js";

Ractive.DEBUG = false;
Ractive( Object.assign(
	{},
	HomeView,
	{
		"target": "body"
	}
) );