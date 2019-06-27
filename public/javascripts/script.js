console.log('script ok');

var mymap = L.map('worldmap', {
  center: [48.866667, 2.333333],
  zoom: 4
});



L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);



console.log(document.getElementsByClassName("meteodescription"));
// L.marker([48.858370, 2.294481]).addTo(mymap).bindPopup('La Tour Eiffel');

var customIcon = L.icon({
  iconUrl: '/images/leaf-green.png',
  shadowUrl: '/images/leaf-shadow.png',

  iconSize: [38, 95],
  shadowSize: [50, 64],

  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],

  popupAnchor: [-3, -76]
});

for (var i = 0; i < document.getElementsByClassName("meteodescription").length; i++) {
  L.marker([document.getElementsByClassName("meteodescription")[i].dataset.lat, document.getElementsByClassName("meteodescription")[i].dataset.lon], {
    icon: customIcon
  }).addTo(mymap).bindPopup(document.getElementsByClassName("nomVille")[i].textContent);
};

// L.marker([48.858370, 2.294481], {icon: customIcon}).addTo(mymap);
