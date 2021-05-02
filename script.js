function movetoaddress(){
  window.location.href = "addresspage.html";
}

function tryagain(){
  window.location.href = "addresspage.html";
}

function yes(){
  window.location.href = "searching.html";
}

function ready(){
  window.location.href = "localelection.html";
}

var placeSearch, autocomplete;
  var componentForm = {
    street_number: 'short_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };

  function initAutocomplete() {

    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('autocomplete')),
        {types: ['geocode']});
    autocomplete.addListener('place_changed', fillInAddress);
  }

  function fillInAddress() {
    var place = autocomplete.getPlace();

    for (var component in componentForm) {
      document.getElementById(component).value = '';
      document.getElementById(component).disabled = false;
    }
    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];
        document.getElementById(addressType).value = val;
      }
    }
  }


  function geolocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  }



//https://www.javascripttutorial.net/javascript-dom/javascript-checkbox/


function getballotmeasures() {
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://us-central1-aiot-fit-xlab.cloudfunctions.net/hackavote",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "cache-control": "no-cache",
    "Postman-Token": "2da01ecb-3c33-470f-8385-5ab337b6c768"
  },
  "processData": false,
  "data": "{\"action\" : \"getballotmeasures\"}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
//the response has the data from the database

document.getElementById("ballotMeasuresInfo").innerHTML = response;
}

function getcandidates() {

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://us-central1-aiot-fit-xlab.cloudfunctions.net/hackavote",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "cache-control": "no-cache",
    "Postman-Token": "9cd241ec-5f88-42e0-84ff-f290359c3b19"
  },
  "processData": false,
  "data": "{\"action\" : \"getcandidates\"}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

//the response has the candidate data from the database

document.getElementById("candidateInfo").innerHTML = response;

}