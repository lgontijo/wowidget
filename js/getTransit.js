// Stores all of the destinations in one global array 
let destinations = [];

setTimeout(getBartTimes, 3000);
fire();

// Calls the Bart API and returns all of the eta's and whatnot based on the destination entered by the user
function getBartTimes(bart_station = "POWL"){
	const bart_url = `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${bart_station}&key=${bart_api_key}&json=y`;

	$.get(bart_url, function(data){
		destinations = data.root.station["0"].etd;
	});

};