$(document).ready(function () {

    $('#burger').click(function(){
        $('#nav').slideToggle();
        $( '#nav' ).css( {"display": "block"} );
        $( '#nav' ).css( {"float": "left"} );
    });
});

var geocoder;
var map;
var infowindow = new google.maps.InfoWindow();

function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 15,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('address')), {
      types: ['geocode']
    });
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    codeAddress()
  });
  codeAddress();
}

function codeAddress() {
  var address = document.getElementById('address').value;
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var htmlContent;
      console.log(results);
      map.setCenter(results[0].geometry.location);
      var address_components = results[0].address_components;
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
      if (results[0].partial_match) {
        //htmlContent = "not a valid result";
      } else {
        //htmlContent = "<div style='width:300px; height:300px;'><table border='1'><tr><th>long_name</th><th>types</th></tr>";

        /* Added formatted Address */
        htmlContent += "<tr><td colspan='2'><strong>" + results[0].formatted_address + "</strong></td></tr>";
        /* Added formatted Address */

        for (var i = 0; i < address_components.length; i++) {
          //htmlContent += "<tr><td>" + address_components[i].long_name + "</td><td>"
          for (var j = 0; j < address_components[i].types.length; j++) {
            //htmlContent += address_components[i].types[j] + " ";
          }
          //htmlContent += "</td></tr>";
        }

        //htmlContent += "</table>";
      }
      google.maps.event.addListener(marker, 'click', function(evt) {
        //infowindow.setContent(htmlContent);
        //infowindow.open(map, marker);
      });
      google.maps.event.trigger(marker, 'click');
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);