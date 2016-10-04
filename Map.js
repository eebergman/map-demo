var globalMap;
var marker;

function initMap() {
    // Callback function to create a map object and specify the DOM element for display.
    globalMap = new google.maps.Map(document.getElementById('airport-map'), {
        center: {
            lat: 42.2814,
            lng: -83.7483
        },
        scrollwheel: true,
        zoom: 6
    });



}

$(function() {

    var MapFcns = {

        loadSiteList: function() {
            var airportList = $('#airport-list');
            airportList.html('');
            airportList.append('<option value=""></option>');
            for (var i in sites) {
                var newOption = $('<option value="' + sites[i].Code + '">' + sites[i].City + ": " + sites[i].FullSiteName + '</option>');
                airportList.append(newOption);
            }
        },

        siteListChange: function() {
            var ctl = $(this),
                airportCode = ctl.val();
            if (airportCode) {
                var currAirport = _.findWhere(sites, {
                    Code: airportCode
                });
                $('#setting-code').text(currAirport.Code);
                $('#setting-city').text(currAirport.City);
                $('#setting-name').text(currAirport.FullSiteName);
                $('#setting-lat').text(currAirport.Latitude);
                $('#setting-long').text(currAirport.Longitude);

                $airCode = currAirport.Code;
                $airCity = currAirport.City;
                $airState = currAirport.State;
                $airSiteName = currAirport.FullSiteName;
                $airLat = currAirport.Latitude;
                $airLong = currAirport.Longitude;

                var contentString = '<table>' +
            '<tr>' +
                '<th>Code</th>' +
                '<th>City</th>' +
                '<th>State</th>' +
                '<th>Full Name</th>' +
                '<th>Latitude</th>' +
                '<th>Longitude</th>' +
            '</tr>' +
            '<tr>' +
                '<td id="setting-code">' + $airCode + '</td>' +
                '<td id="setting-city">' + $airCity + '</td>' +
                '<td id="setting-state">' + $airState + '</td>' +
                '<td id="setting-name">' + $airSiteName + '</td>' +
                '<td id="setting-lat">' + $airLat + '</td>' +
                '<td id="setting-long">' + $airLong + '</td>' +
            '</tr>' +
            
        '</table>' +
        '<input onclick="deleteMarkers();" type=button value="Delete Marker">';

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                marker = new google.maps.Marker({
                    position: {
                        lat: currAirport.Latitude,
                        lng: currAirport.Longitude
                    },
                    map: globalMap,
                    title: currAirport.Code
                });
                globalMap.panTo(marker.position);
                marker.addListener('click', function() {
                    infowindow.open(globalMap, marker);
                });
            }
        }


    }


    MapFcns.loadSiteList();
    $('#airport-list').change(MapFcns.siteListChange);
    $('#exercise-toggle').click(function() {
        var toggleCtl = $(this),
            toggleVal = toggleCtl.text();
        if (toggleVal == '-') {
            toggleCtl.text('+');
            $('#exercise-instructions').hide();
        } else {
            toggleCtl.text('-');
            $('#exercise-instructions').show();
        }
    });

});



function deleteMarkers() {
    marker.setVisible(false);
};