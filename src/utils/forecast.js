const request = require('request')
const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/0d0c22860ad79517cd0360c4e8c203d8/' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude)
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the weather service')
        } else if (body.error) {
            callback('The given location is invalid.')
        } else {
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out.' + 'There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}
module.exports = forecast