
var heatmapJson;
var stateMap;
function getVis(jsonFile) {
	$.getJSON(jsonFile, function(data) {
	    heatmapJson = data;
			stateMap = new Map(heatmapJson.states);
			document.getElementById("title").innerText = "Heatmap of " + heatmapJson.name +
																										" from " + heatmapJson.year[0] +
																										" to " + heatmapJson.year[heatmapJson.year.length-1];

			if(heatmapJson.name == "Mental Health") {
				heatmapJson.mean = [3.770261];
				heatmapJson.units = "reported days of poor mental health monthly";
				heatmapJson.sdev = [0.5214085];
			}

			getLayout();
	});
}

$("#suicide").click(function() {
	document.getElementById("suicide").className = "btn btn-secondary disabled";
	document.getElementById("mental").className = "btn btn-secondary";
	document.getElementById("poverty").className = "btn btn-secondary";
	getVis("suicideObj.json");
});
$("#mental").click(function() {
	document.getElementById("suicide").className = "btn btn-secondary";
	document.getElementById("mental").className = "btn btn-secondary disabled";
	document.getElementById("poverty").className = "btn btn-secondary";
	getVis("mentalObj.json");
});
$("#poverty").click(function() {
	document.getElementById("suicide").className = "btn btn-secondary";
	document.getElementById("mental").className = "btn btn-secondary";
	document.getElementById("poverty").className = "btn btn-secondary disabled";
	getVis("povertyObj.json");
});

var interval;
var isPlaying = false;
$("#backward").click(function() {
	currentFrame = currentFrame-1;
	if(currentFrame < 0) {
		currentFrame = maxFrames-1;
	}
	setFrame();
});
$("#play").click(function() {
	if(currentFrame >= maxFrames) {
		currentFrame = -1;
  }
	var p = document.getElementById('playIcon');
	if(isPlaying) {
		clearInterval(interval);
		isPlaying = false;
		p.className = "fas fa-play";
	} else {
		isPlaying = true;
		p.className = "fas fa-pause";
		interval = setInterval(function() {
		currentFrame = (currentFrame+1);
		if(currentFrame >= maxFrames) {
			isPlaying = false;
			p.className = "fas fa-play";
			clearInterval(interval);
		} else {
			setFrame();
		}
		}, 1000);
	}
});
$("#forward").click(function() {
	currentFrame = (currentFrame+1)%maxFrames;
	setFrame();
});

//Width and height of map
var width = 960;
var height = 500;

var currentFrame = 0;
var maxFrames = 1;

// D3 Projection
var projection = d3.geo.albersUsa()
				   .translate([width/2, height/2])    // translate to center of screen
				   .scale([1000]);          // scale things down so see entire US

// Define path generator
var path = d3.geo.path()               // path generator that will convert GeoJSON to SVG paths
		  	 .projection(projection);  // tell path generator to use albersUsa projection

// Define linear scale for output
var color = d3.scale.linear().domain([-3,4]).range(["rgb(213,222,217)","FireBrick"]); //["rgb(213,222,217)","FireBrick"]

//Create SVG element and append map to the SVG
var svg = d3.select("svg")
			.append("svg")
			.attr("width", width)
			.attr("height", height);

function getLayout() {
	var description = document.getElementById('description');
	while(description.firstChild) {
		description.removeChild(description.firstChild);
	}
	description.innerHTML = "The <strong>mean</strong> of this data is <strong>" + heatmapJson.mean[0].toPrecision(3) + " " + heatmapJson.units + "</strong> " +
													"with a <strong>standard deviation</strong> of <strong>" + heatmapJson.sdev[0].toPrecision(3) + "</strong>";

	var legend = document.getElementById('legend');
	while (legend.firstChild) {
    legend.removeChild(legend.firstChild);
	}
	for(var i = 0; i < heatmapJson.legend.length-1; i++) {
		var divLeg = document.createElement("div");
		divLeg.setAttribute("style","display:inline-block");
		var square = document.createElement("div");
		square.setAttribute("style","width:20px;height:20px;background-color:" + heatmapJson.colors[i]);
		var legendText = document.createElement("p");
		legendText.innerText = heatmapJson.legend[i];
		divLeg.appendChild(square);
		divLeg.appendChild(legendText);
		legend.appendChild(divLeg);
	}

	var dropdown = document.getElementById('framesDropdown');
	while (dropdown.firstChild) {
    dropdown.removeChild(dropdown.firstChild);
	}
	for(var i = 0; i < heatmapJson.year.length; i++) {
		var newYear = document.createElement("a");
		newYear.setAttribute("class","dropdown-item");
		newYear.innerText = heatmapJson.year[i];

		newYear.onclick = function() {
			console.log(this.innerText)
			for(var i = 0; i < heatmapJson.year.length; i++) {
				if(this.innerText == heatmapJson.year[i]) {
					currentFrame = i;
					setFrame();
					break;
				}
			}
		};
		dropdown.appendChild(newYear);
	}
	currentFrame = 0;
	maxFrames = heatmapJson.year.length;
	setFrame();
}

function setFrame() {
	var paths = svg.selectAll("path")[0];
	for(var i = 0; i < paths.length; i++) {
		if(stateMap.get(paths[i].__data__.properties.name)) {
			paths[i].style.fill = pickColor(stateMap.get(paths[i].__data__.properties.name)[currentFrame]);
		}
	}
	var current = document.getElementById('currentFrameHeader');
	current.innerText = heatmapJson.year[currentFrame];
}

// Append Div for tooltip to SVG
var div = d3.select("svg")
		    .append("div")
    		.attr("class", "tooltip")
    		.style("opacity", 0);

function pickColor(zValue) {
	switch(Math.floor(zValue)) {
		case -3:
				return heatmapJson.colors[0];
			break;
		case -2:
				return heatmapJson.colors[1];
			break;
		case -1:
				return heatmapJson.colors[2];
			break;
		case 0:
				return heatmapJson.colors[3];
			break;
		case 1:
				return heatmapJson.colors[4];
			break;
		case 2:
				return heatmapJson.colors[5];
			break;
		case 3:
				return heatmapJson.colors[6];
			break;
	}
}

// // Load in my states data!
d3.csv("stateslived.csv", function(data) {

// Load GeoJSON data and merge with states data
d3.json("us-states.json", function(json) {

// Loop through each state data value in the .csv file
for (var i = 0; i < data.length; i++) {

	// Grab State Name
	var dataState = data[i].state;

	// Grab data value
	var dataValue = data[i].visited;

	// Find the corresponding state inside the GeoJSON
	for (var j = 0; j < json.features.length; j++)  {
		var jsonState = json.features[j].properties.name;

		if (dataState == jsonState) {

		// Copy the data value into the JSON
		json.features[j].properties.visited = dataValue;

		// Stop looking through the JSON
		break;
		}
	}
}

// Bind the data to the SVG and create one path per GeoJSON feature
// THIS DATA COLORS IN EACH STATE
svg.selectAll("path")
	.data(json.features)
	.enter()
	.append("path")
	.attr("d", path)
	.style("stroke", "#fff")
	.style("stroke-width", "1")
	.style("fill", function(d) {

	// Get data value
	var value = d.properties.visited;

	if (value) {
	//If value exists…
	return pickColor(value);
	} else {
	//If value is undefined…
	return "rgb(213,222,217)";
	}
});
	});
});

$("#suicide").click();
