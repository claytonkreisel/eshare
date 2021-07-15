# Front End Interview Project

## To get started

```sh
npm install
npm run dev
```

This will launch a dev server and open the page in your default browser.

Open `public/js/views/home.js` in your editor of choice.

You will create new files in `provider` to load and transform the data that needs to be passed to the `set` calls.

## Your Goals

### 1. Provide data to show the starting location

The location object on the the earliest incident:

- with asset `alpha`
- in the last year

### 2. Provide data to show the ending location today for Asset "alpha" on the map

The location object on the the last incident:

- with asset `alpha`
- in the last year

### 3. Provide data to populate the speeding chart

Incidents:

- with type `overspeed`
- with asset `alpha`
- in the last year

Grouped by month.

### 4. Provide data to populate the idling chart 

Incidents:

- with type `idle`
- with asset `alpha`
- in the last year

Grouped by month.

## "Last year"

The definition of "last year" is the range of time starting on first second of the first day of the month found by (today - 11 months), ending at the end of today.

For example: if today is April 6th, 2017 and it is 5PM, "the last year" is everything from 00:00:00 on May 1st, 2016 to April 6th, 2017 at 11:59:59 PM.

## "Grouped by month"

The charts expect to be passed an array of 12 objects with two properties:

- `date`: a string containing an [ISO date](https://en.wikipedia.org/wiki/ISO_8601) string with the correct year+month
- `incidents`: an array containing all the relevant incident objects

## Other things to know

- the data source is the `fetchAll` function exported from `js/provider/ajax/Incidents/fetchAll.js`
	- it is synchronous, and returns an array of incident objects
- to import moment, import the file `js/vendor/moment.js`

Incident objects look like this:

```json
{
	"asset": "alpha",
	"type": "idle",
	"date": "2019-07-23T15:32:05-05:00",
	"location": {
		"latitude": -25.60311,
		"longitude": -80.94247
	}
}
```

## Stretch goals

- Refactor the chart-related functions so that `type` and `asset` can be passed in dynamically instead of being hardcoded
- Refactor to remove any other duplicate code as appropriate
