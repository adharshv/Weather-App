const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2Flc2FydiIsImEiOiJjazJiNHg5NDIwMHJzM2JudTNrYnQyN2hkIn0.cs6R-6yJq5Z09snLoX8H9w&limit=1'
    // encodeURIComponent to prevent specisl chars in address causing mapbox to crash

    request({ url, json: true}, (error, {body}) => {// response is destructured to get only the body property // property shorthand for url
        if(error){
            callback('Unable to connect to location services!', undefined) // data is undefined 
        }
        else if(body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode