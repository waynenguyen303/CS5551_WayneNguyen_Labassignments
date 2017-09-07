/**
  * Created by Wayne Nguyen on 9/4/2017
 */

function store() {

    var inputEmail = document.getElementById("email1");
    var inputName = document.getElementById("fullname1");
    var inputPW = document.getElementById("password1");
    var inputUsername = document.getElementById("username1");

    localStorage.setItem("email",inputEmail.value);
    localStorage.setItem("fullname",inputName.value);
    localStorage.setItem("password",inputPW.value);
    localStorage.setItem("username",inputUsername.value);
    alert("Success!! You ar now registered. Please login.");
}

function entry() {

    var user = document.getElementById("username2");
    var pass = document.getElementById("password2");

    if(localStorage.getItem("username") === user.value  && localStorage.getItem("password") === pass.value)
    {
        window.location.href="home.html";
    }
    else{alert("Login not successful. Please try again.");}
}

/*========================================================================================================*/
//API from https://developers.google.com/maps/documentation/javascript/examples/layer-traffic
//https://developers.google.com/maps/documentation/javascript/examples/places-searchbox

// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initAutocomplete() {

    var pos;
    var trafficLayer;
    navigator.geolocation.getCurrentPosition(function (position) {

        pos = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude);

        var mapOptions = {
            zoom: 14,
            center: pos
        };

        map = new google.maps.Map(document.getElementById('map'),
            mapOptions);

        var marker = new google.maps.Marker({
            position: pos,
            map: map
        });

        trafficLayer= new google.maps.TrafficLayer();
        trafficLayer.setMap(map);
    });

    var map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 13,
        mapTypeId: 'roadmap'
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}


/*====================================================================================================*/
