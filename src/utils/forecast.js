const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/95b1edcee093a73ce4a2630ba56446af/${latitude},${longitude}?units=ca&lang=en`

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service. Please check your network connection and try again.', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            const currently = body.currently
            const daily = body.daily
            callback(undefined, `Today it will be ${daily.data[0].summary.toLowerCase()} It is currently ${currently.temperature} degrees with a ${currently.precipProbability}% chance of rain.`)
        }
    })

}

module.exports = forecast