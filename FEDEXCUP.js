
const request = require('node-fetch');
const flags = require('./flags.js');


//TODO: Add comments

module.exports = {

    url: "https://www.pgatour.com/fedexcup/official-standings.html",
    rapidUrl: 'https://golf-leaderboard-data.p.rapidapi.com/tour-rankings/2/2024',

    async getFedExCupData(maxPlayers, rapidAPIKey, callback){
		var rapidKey = rapidAPIKey;
		console.log("FEDEX MMM-PGA retrieving FedEx Cup Standings");

        const response = await fetch(this.rapidUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': rapidKey,
                'X-RapidAPI-Host': 'golf-leaderboard-data.p.rapidapi.com'
            }
        })
		
		const data = await response.json();

        var fcRanking = {
            pointsHeading: "Total Points",
            rankings: []
        };
        var payload = data;
	try {
	        if (payload.results.rankings.length > 1) {
	            for (var i = 0; i < payload.results.rankings.length; i++) {
					flagName = payload.results.rankings[i].player_name.replace(/\s/g, '');
					var lstposition = payload.results.rankings[i].position + payload.results.rankings[i].movement
	                fcRanking.rankings.push({
	                    "name": payload.results.rankings[i].player_name,
	                    "curPosition": payload.results.rankings[i].position,
	                    "lwPosition": lstposition,
	                    "points": payload.results.rankings[i].points,
	                    "flagUrl": flags.getFlagURL(flagName)
	                });
	                if (i == maxPlayers)
	                    break;
	            }
	        } 
	} catch (error) {
		console.log("ERROR: Unable to display FEDEX Cup rankings" + payload);
	}
        callback(fcRanking);
    }

};
