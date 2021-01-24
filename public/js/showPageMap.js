mapboxgl.accessToken = mapboxToken;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

const popup = new mapboxgl.Popup({offset: 25})
    .setLngLat(coordinates)
    .setHTML(`<h3>${campground.title}</h3><p>${campground.location}</p>`)
    .setMaxWidth("300px");

const marker = new mapboxgl.Marker()
    .setLngLat(coordinates)
    .addTo(map)
    .setPopup(popup);