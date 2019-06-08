const request = require('request')



const geocode = (adddress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adddress) + '.json?access_token=pk.eyJ1Ijoic2hyZXlhc2hpbiIsImEiOiJjandnYWhvczAwM3RiNDRuNXV1ZmMwc3dtIn0.0tTyM-3uPk4CAZhwdEXWzw'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the weather service.')
        } else if (body.features.length === 0) {
            callback('Unable to find location. Please try another search..')
        } else {
            callback('', {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                place_name: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode