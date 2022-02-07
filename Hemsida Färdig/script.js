//*********** Map Script *****************
//****************************************
// Define map bounds
var bounds = 
		[[56.447477, 12.562607],   // Southwest
		[57.112419, 14.159431]];	// Northeast

// Define map center
var center = [56.761444, 13.396618];

// Define marker locations
campingplats_hjörnereds = [56.510000, 13.205898],
campingplats_flammabadet = [56.5169, 13.3323],
campingplats_ängsbacken = [56.5006, 13.0689];

//Define Layer groups
var layer_fireplace = L.layerGroup();
var layer_campsites = L.layerGroup();

// Define custom Icons
var camp_1 = L.icon({
	iconUrl: "one.png",
	iconSize: [32, 32],
	
});

var camp_2 = L.icon({
	iconUrl: "two.png",
	iconSize: [32, 32],
	
});

var camp_3 = L.icon({
	iconUrl: "three_red.png",
	iconSize: [32, 32],
	
});

// Add icons to markers 
var icon_hjörnereds = L.marker(campingplats_hjörnereds, {icon: camp_2}).on("click", markerOnClick);
var icon_ängsbacken = L.marker(campingplats_ängsbacken, {icon: camp_1}).on("click", markerOnClick);
var icon_flammabadet = L.marker(campingplats_flammabadet, {icon: camp_3}).on("click",markerOnClick);


// Add markers to layergroup
icon_hjörnereds.addTo(layer_fireplace);
icon_ängsbacken.addTo(layer_campsites);
icon_flammabadet.addTo(layer_campsites);


// Create map to the map div
var map = L.map('map', {
	center: center,
	zoom: 10,
	maxZoom: 15,
	minZoom: 10,
	layers: [layer_campsites, layer_fireplace],
	maxBounds: bounds,
	maxBoundsViscosity: 1,
	edgeBufferTiles: 1,
});

// Add map style and mapbox API
L.tileLayer(
	'https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFyY3VzOTMxMyIsImEiOiJjamdycGptZmgwNXV1MndxZDRrOXQ1MnV2In0.dBOG_-5EGcMR8OfDSZs7bg', {
	attribution: +'Data © <a href="http://osm.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var overlays = {
	"Campsites": layer_campsites,
	"Fireplace": layer_fireplace,
};

// Create location control
lc = L.control.locate({
	position: "topleft",
	flyTo: true,
	drawCircle: true,
	circleStyle: {
    //color: '#136AEC',
    //fillColor: '#136AEC',
    fillOpacity: 0.15,
    weight: 2,
    opacity: 0.5,
    radius: 2,     
    },
}).addTo(map)

// Fly to campsites on icon click
function markerOnClick(e)
{
	map.flyTo(e.latlng, 15);	
	console.log(e.latlng);
	var x = document.getElementById("map-info-dropdown");
	var y = document.getElementById("map-info2");
	var z = document.getElementById("map-info3");

	if (e.latlng.equals([56.510000, 13.205898])){

		if (x.style.display === "none"){
			x.style.display = "inline";
			y.style.display = "inline";
			z.style.display = "inline";;
		}

	}
};

// Change cursor on campsite hover
map.on("mouseenter", "campsites", function () {
    map.getCanvas().style.cursor = "pointer";
});

//************* JQUERY *******************
//****************************************
$(document).ready(function(){
//*********** Search Bar *****************
//****************************************
	$("#search_field").on("keyup", function() {
   		var key = this.value;
    	$(".search_me").each(function() {
       		var $this = $(this);
       		$this.toggle($(this).text().toLowerCase().indexOf(key) >= 0);
    	});
   });

    $("#campsite-info").click(function(){
        $("#campsite-info-place").slideUpShow("slow");

    });

        $("#campsite-info").click(function(){
        $("#campsite-info-place").slideUpShow("slow");

    });
        $("#lp1_dropdown").click(function(){
	        $("#map-info-dropdown").slideToggle("slow");
	        $("#map-info2").slideToggle("slow");
	        $("#map-info3").slideToggle("slow");

    });


});






