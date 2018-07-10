let destinationA1;
let minutesA1;
let minutesA2;

let destinationB2;
let minutesB1;
let minutesB2;

let destinationC3;
let minutesC1;
let minutesC2;

let destinationD4;
let minutesD1;
let minutesD2;

setTimeout(delayTransit, 3000);
fire();
function delayTransit(){
const bart = "https://api.bart.gov/api/etd.aspx?cmd=etd&orig=POWL&key=" + bart_api_key + "&json=y";
$.get(bart, function(data){
  destinationA1 = (data.root.station["0"].etd["0"].destination);
  minutesA1 = (data.root.station["0"].etd["0"].estimate["0"].minutes);
  minutesA2 = (data.root.station["0"].etd["0"].estimate[1].minutes);

  destinationB2 = (data.root.station["0"].etd[1].destination);
  minutesB1 = (data.root.station["0"].etd[1].estimate["0"].minutes);
  minutesB2 = (data.root.station["0"].etd[1].estimate[1].minutes);

  destinationC3 = (data.root.station["0"].etd[2].destination);
  minutesC1 = (data.root.station["0"].etd[2].estimate["0"].minutes);
  minutesC2 = (data.root.station["0"].etd[2].estimate[1].minutes);

  destinationD4 = (data.root.station["0"].etd[3].destination);
  minutesD1 = (data.root.station["0"].etd[3].estimate["0"].minutes);
  minutesD2 = (data.root.station["0"].etd[3].estimate[1].minutes);

});
};
