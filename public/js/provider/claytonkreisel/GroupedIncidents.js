import moment from "../../vendor/moment.js";

export default class GroupedIncidents {

    //Construct the object with an array of incident objects
    constructor(incidents, type){
        this.incidents = incidents;
        this.type = type;
        this.filterIncidents();
    }

    //Filter Incidents
    filterIncidents(){
        this.incidents = this.incidents.filter(incident => incident.type == this.type);
    }

    //Get Incidents
    getIncidents(){
        return this.incidents;
    }

    //Get Incidents by Month
    getIncidentsByMonth(){
        let months = [];
        this.incidents.forEach(function(incident){
            const incidentDate = moment(incident.date);
            const key = incidentDate.format('MMMY');
            if(!(key in months)){
                months[key] = {
                    "date": incidentDate.startOf("month").toISOString(),
                    'incidents': []
                }
            }
            months[key].incidents.push(incident);
        });
        months.sort(function(a, b){
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);
            if(aDate > bDate){
                return 1;
            } else if(aDate < bDate){
                return -1;
            }
            return 0;
        });
        let cleanMonths = [];
        for (var k in months) {
            var value = months[k];
            cleanMonths.push(months[k]);
        }
        return cleanMonths;
    }

} 