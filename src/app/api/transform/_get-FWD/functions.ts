// Temperature normalisation calculations
function calc(normalT: number, asphaltT: number, d: number) {
  const fT = 1 + 0.02 * (normalT - asphaltT);
  return fT * d;
}

// Gets the average value of all Dx (D1, D2, etc). element must be the standard for this project json
function getAvgDx(element: any, x: any) {
  let res = 0;
  let i = 0;
  for (var drop of element.drops) {
    res += drop["D" + x];
    i++;
  }
  return res / i;
}

function parseFWD(fileData) {
  // Find the first drop data
  var strPos = fileData.lastIndexOf("*");
  var dropData = fileData.substring(strPos);
  var stations = [];
  dropData = dropData.replace(/ +/g, " "); // Remove double or triple spaces
  var lines = dropData.split(/\r\n|\n|\r/); // Divide into lines
  var coordPresent = dropData.indexOf("G0000000") !== -1;
  var station = {};
  var startIndex = 1 + (coordPresent ? 1 : 0);

  for (var i = startIndex; i < lines.length; i++) {
    if (lines[i][0] === "S") {
      // If this line is the start of a new station def
      if (i !== startIndex) {
        station.SCI =
          calc(station.surface, station.asphalt, getAvgDx(station, 1)) -
          calc(station.surface, station.asphalt, getAvgDx(station, 2));
        station.BDI =
          calc(station.surface, station.asphalt, getAvgDx(station, 2)) -
          calc(station.surface, station.asphalt, getAvgDx(station, 3));
        station.BCI =
          calc(station.surface, station.asphalt, getAvgDx(station, 3)) -
          calc(station.surface, station.asphalt, getAvgDx(station, 4));
        stations.push(station);
        station = {};
      }
      if (coordPresent) {
        // If we have the coordinate variant
        var linePrev = lines[i - 1].split(" "); // Get the coordinates
        station.lat = linePrev[1];
        station.lon = linePrev[2];
      } else {
        station.lat = null;
        station.lon = null;
      }
      var line0 = lines[i].split(" "); // Get the general version data
      station.station = line0[1];
      station.asphalt = line0[2];
      station.surface = line0[3];
      station.air = line0[4];
      station.drops = [];
    } else if (lines[i].substring(0, 3) === "EOF") {
      // If it's EOF, break
      station.SCI =
        calc(station.surface, station.asphalt, getAvgDx(station, 1)) -
        calc(station.surface, station.asphalt, getAvgDx(station, 2));
      station.BDI =
        calc(station.surface, station.asphalt, getAvgDx(station, 2)) -
        calc(station.surface, station.asphalt, getAvgDx(station, 3));
      station.BCI =
        calc(station.surface, station.asphalt, getAvgDx(station, 3)) -
        calc(station.surface, station.asphalt, getAvgDx(station, 4));
      stations.push(station);
      station = {};
    } else if (lines[i][0] !== "G") {
      // If it's just a regular line
      var lineX = lines[i].split(" ");
      var subElement = {};
      subElement.stress = lineX[1];
      var F_rz = subElement.stress * Math.PI * (0.15 * 0.15);
      subElement.stress = F_rz;
      var y = 1;

      for (var x = 2; x < lineX.length; x++) {
        if (lineX[x] !== "") {
          var di = parseFloat(lineX[x]);
          subElement["D" + y] = (50 / F_rz) * di;
          y++;
        }
      }

      subElement.SCI =
        calc(station.surface, station.asphalt, subElement.D1) -
        calc(station.surface, station.asphalt, subElement.D2);
      subElement.BDI =
        calc(station.surface, station.asphalt, subElement.D2) -
        calc(station.surface, station.asphalt, subElement.D3);
      subElement.BCI =
        calc(station.surface, station.asphalt, subElement.D3) -
        calc(station.surface, station.asphalt, subElement.D4);

      station.drops.push(subElement);
    }
  }
  return stations;
}

// The rest of your PHP functions are unchanged as they don't involve PHP-specific functionality.

// Example usage:
// var fileData = "Your data here"; // Replace with your data
// var result = parseFWD(fileData);
// console.log(result);
