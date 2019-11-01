const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9498e49a698ccd6323ed08f20606d7df/' + latitude + ',' + longitude

    request({url, json: true}, (error, {body})=> {// response is destructured to get only the body property  // property shorthand for url
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }
        else if(body.error){
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a '+ body.currently.precipProbability + '% chance of rain.')
        }
    })

}

module.exports = forecast