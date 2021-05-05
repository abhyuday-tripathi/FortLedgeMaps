mapboxgl.accessToken =
  'pk.eyJ1IjoiYWJoeXVkYXktdHJpcGF0aGkiLCJhIjoiY2tvYWF1MndvMTIzeDJ2bXUyeDBkdnY3bCJ9.1-aDVdGQkcKLTNN13WznPw';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});

function successLocation(position) {
  setMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
  setMap([-2.244644, 53.483959]);
}

function setMap(center) {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: center,
    zoom: 16,
  });

  const layerList = document.getElementById('menu');
  const inputs = layerList.getElementsByTagName('input');

  function switchLayer(layer) {
    const layerId = layer.target.id;
    map.setStyle('mapbox://styles/mapbox/' + layerId);
  }

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
  }

  map.on('load', function () {
    map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [
            [-122.483696, 37.833818],
            [-122.483482, 37.833174],
            [-122.483396, 37.8327],
            [-122.483568, 37.832056],
            [-122.48404, 37.831141],
            [-122.48404, 37.830497],
            [-122.483482, 37.82992],
            [-122.483568, 37.829548],
            [-122.48507, 37.829446],
            [-122.4861, 37.828802],
            [-122.486958, 37.82931],
            [-122.487001, 37.830802],
            [-122.487516, 37.831683],
            [-122.488031, 37.832158],
            [-122.488889, 37.832971],
            [-122.489876, 37.832632],
            [-122.490434, 37.832937],
            [-122.49125, 37.832429],
            [-122.491636, 37.832564],
            [-122.492237, 37.833378],
            [-122.493782, 37.833683],
          ],
        },
      },
    });
    map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#888',
        'line-width': 8,
      },
    });
  });

  map.addControl(
    new MapboxDirections({
      accessToken: mapboxgl.accessToken,
    }),
    'bottom-left'
  );

  map.addControl(
    new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    }),
    'bottom-left'
  );

  map.addControl(new mapboxgl.NavigationControl());
}
