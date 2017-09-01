const Promise = require('promise');
const googleMapsClient = require('@google/maps').createClient(
  {key: process.env.GOOGLE_MAPS_API_KEY}
);

module.exports = function () {

  GoogleMapsService = {

    getAddressFromLatLng: function (latlng) {

      promise = new Promise(function (resolve, reject) {
        googleMapsClient.reverseGeocode(
          {
            latlng: latlng
          },
            function (err, response) {
                if (err) {
                    reject(err);
                } else {
                    response.json.results.forEach(function (item) {
                        if (item.geometry.location_type == 'GEOMETRIC_CENTER') {
                            resolve(item.formatted_address);
                        }
                    });
                    if(promise.getValue == undefined ){
                    resolve(response.json.results[0].formatted_address);

                    }

                }
            }
        );

      });
      return promise;
    }

  };

  return GoogleMapsService;
};
