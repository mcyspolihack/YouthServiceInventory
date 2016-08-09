mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleGFjYTc5IiwiYSI6ImNpbzYyZGVlNzAyNjd2d2x6dHY1MnR6MjgifQ.anutU5yQ38NCFEMAM4Ubdw';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/light-v8', //stylesheet location
    center: [-79.38, 43.6532], // starting position
    zoom: 14 // starting zoom
});

map.on('style.load', function() {

    map.addSource("locations", {
        "type" : "geojson",
        "data": "data/YSI.geojson"

    });


    map.addLayer({
        "id": "locations",
        "type": "symbol",
        "source": "locations",
        "layout": {
            "icon-image": "marker-15",
            'visibility': 'visible'
        }

    });

    map.addSource("Yo-locations", {
        "type" : "geojson",
        "data": "data/convertcsv.geojson"

    });

    map.addLayer({
        "id": "Yo-locations",
        "type": "symbol",
        "source": "Yo-locations",
        "layout": {
            "icon-image": "circle-11",
            'visibility': 'visible'


        }


    });

});


map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, {layers: ['Yo-locations']});
    var feature = features[0];

    var popup = new mapboxgl.Popup({anchor: 'top'})
        .setLngLat(feature.geometry.coordinates)
        .setHTML('<h3>' + "Funding Program: " + feature.properties.FundProgram + '</h3>' +
            '<li>' + '<b>Organization name </b>' + feature.properties.Org_Name + '</li>' +
            '<li>' + '<b>City Served </b>' + feature.properties.City + '</li>' +
            '<li>' + '<b>Funding Year </b>' + feature.properties.FY  + '</li>'
        )
        .addTo(map)

});
    map.on('mousemove', function (f) {

    var features2 = map.queryRenderedFeatures(f.point, {layers: ['locations']});
    var feature2 = features2[0];

    var popup2;
    popup2 = new mapboxgl.Popup({anchor: 'bottom'})
        .setLngLat(feature2.geometry.coordinates)
        .setHTML('<h3>' + "Organization Name:" + feature2.properties.Name_Program + '</h3>' +
            '<li>' + '<b>Main Stepping Up Outcome</b>' + feature2.properties.Outcomes1 + '</li>' +
            '<li>' + '<b>Secondary Stepping Up Outcome </b>' + feature2.properties.Outcomes2 + '</li>' +
            '<li>' + '<b>Tertiary Stepping Up Outcome</b>' + feature2.properties.Outcomes3 + '</li>'
        )
        .addTo(map);


    /*var meow = document.getElementById('sidebar').innerHTML.setHTML('<h3>' + "Organization Name:" + feature2.properties.Name_Program + '</h3>' +
        '<li>' + '<b>Main Stepping Up Outcome</b>' + feature2.properties.Outcomes1 + '</li>' +
        '<li>' + '<b>Secondary Stepping Up Outcome </b>' + feature2.properties.Outcomes2 + '</li>' +
        '<li>' + '<b>Tertiary Stepping Up Outcome</b>' + feature2.properties.Outcomes3 + '</li>'
    )*/

});


map.on('mousemove', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['locations','Yo-locations'] });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

});

var toggleableLayerIds = [ 'locations', 'Yo-locations' ];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('menu');
    layers.appendChild(link);
}



map.addControl(new mapboxgl.Geocoder());

