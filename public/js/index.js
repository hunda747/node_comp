function initMap() {
 // The location of Uluru
 const uluru = { lat: 9.025194029676232,  lng: 38.82571967014374 };
 // The map, centered at Uluru
 const map = new google.maps.Map(document.getElementById("map"), {
   zoom: 4,
   center: uluru,
 });
 // The marker, positioned at Uluru
 const marker = new google.maps.Marker({
   position: uluru,
   map: map,
 });
}