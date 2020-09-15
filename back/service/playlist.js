const request = require('request');

module.exports = app => {

    const getPlaylist = async(req, res) => {
        const cidade = req.query.cidade
        const token = req.headers.authorization

        const graus = await getTemperatura(cidade)

        if (graus > 30) {
            var options = {
                url: 'https://api.spotify.com/v1/playlists/37i9dQZF1DX1oTjVZnUYT3?si=s2JJ--HkQtWbghLsSh25Nw',
                headers: { 'Authorization': token },
                json: true
            };
        } else if (graus >= 15 && graus <= 30) {
            var options = {
                url: 'https://api.spotify.com/v1/playlists/37i9dQZF1DWVLcZxJO5zyf?si=T9bS5vy5QhCgzb2mOPOH0g',
                headers: { 'Authorization': token },
                json: true
            };

        } else if (graus >= 10 && graus <= 14) {
            var options = {
                url: 'https://api.spotify.com/v1/playlists/01zzqHy5rv189lOqeLJgl9?si=kHr95CtDTZKD67dOaM4LJQ',
                headers: { 'Authorization': token },
                json: true
            };

        } else {
            var options = {
                url: 'https://api.spotify.com/v1/playlists/6AHUniSJNkkDES8E6jS9oo?si=dpmksMClSluajRtgUQUs2g',
                headers: { 'Authorization': token },
                json: true
            };

        }

        request(options, (err, response, body) => {
            res.send(body.tracks.items)
        })

    }

    const getTemperatura = cidade => new Promise(async(resolve, reject) => {
        var optionsTemp = {
            url: `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=fb59cb5040211b63f6b223aa6fb62883&units=metric`,
            json: true
        };

        request(optionsTemp, (err, response, body) => {
            const temperatura = body.main.temp
            console.log(temperatura)
            resolve(temperatura)
        })
    })

    return { getPlaylist }

}