var menuItems = {
  "":{title:"GPS POI Log"},
  " ":{value:"No Fix"},
  "Tree" : ()=>addItem("Tree"),
<<<<<<< HEAD
  "Plant" : ()=>addItem("Plant"),
  "Bus Stop" : ()=>addItem("Bus Stop"),
  "Viewpoint" : ()=>addItem("Viewpoint"),
  "Dinking Water" : ()=>addItem("Water"),
  "P.O.I." : ()=>addItem("POI N/D")
=======
  "Gate" : ()=>addItem("Gate"),
  "Flower" : ()=>addItem("Flower"),
  "Plant" : ()=>addItem("Plant"),
  "Bus Stop" : ()=>addItem("Bus Stop"),
  "Pub" : ()=>addItem("Pub")
>>>>>>> upstream/master
};

var menu = E.showMenu(menuItems);
var gps = { fix : 0};
var gpsCount = 0;
var file = require("Storage").open("gpspoilog.csv","a");

function setStatus(msg) {
  menuItems[" "].value = msg;
  menu.draw();
}

Bangle.on('GPS',function(g) {
  gps = g;
  gpsCount++;
  var msg;
  if (g.fix) {
    msg = g.satellites + " Satellites";
  } else {
    msg = "No Fix";
  }
  setStatus(msg+" "+"-\\|/"[gpsCount&3]);
});


function addItem(name) {
  if (!gps.fix) {
    setStatus("Ignored - no fix");
    return; // don't do anything as no fix
  }
  // The fields we want to put in out CSV file
  var csv = [
    0|getTime(), // Time to the nearest second
    gps.lat,
    gps.lon,
    gps.alt,
    name
  ];
  // Write data here
  file.write(csv.join(",")+"\n");
  setStatus("Written");
}


Bangle.loadWidgets();
Bangle.drawWidgets();
Bangle.setGPSPower(1);



function getData(callback) {
  var f = require("Storage").open("gpspoilog.csv","r");
  var l = f.readLine();
  while (l!==undefined) {
    callback(l);
    l = f.readLine();
  }
}
