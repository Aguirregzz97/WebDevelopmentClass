const request = require('request')
let urlMapBox
const express = require('express')
var jsonObj = {
	location: 'x',
	weather: 'y'
}

var app = express();


app.listen(3000, function() {
	console.log('up and running')
})


app.get('/', (req, res) => {
	res.send({
		"prueba" : "prueba"
	})
})

app.get('/weather', async (req, res, next) => {
	if (req.query.search) {
	jsonObj.location = req.query.search
	urlMapBox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${req.query.search}.json?access_token=pk.eyJ1IjoiYWd1aXJyZWd6ejk3IiwiYSI6ImNqdDNpNW1iYzJpYmk0M29kODlvbDlyb2gifQ.ADx-gePuSyWoGxiFlNB47w&limit=1`
	  getCoordinates(urlMapBox, function (error, response) {
		if (error) {
		  res.send(error)
		  console.log(error)
		}
	  })
	}
	res.send(JSON.stringify(jsonObj)) 
  })

getWeatherInfo = (long, lat, callback) => {
	let urlDarkSky = `https://api.darksky.net/forecast/64eb360db2951ebe9307279c07b37280/${lat},${long}?units=si&lang=es`
	request.get({ url: urlDarkSky, json: true }, function(error, response, body) {
		if (error) {
			callback('Hubo error en el weatherInfo')
			return
		}

		if (body === undefined) {
			callback('No tienes internet prro')
			return
		}

		if (response.statusCode !== 200) {
			callback('Hubo algun error encontrando la temperatura de estas coordenadas')
			return
		}

		let temp = body.currently.temperature
		let precipitationProb = body.currently.precipProbability
		let day = body.currently.summary
		let dayResponse = `${day}. Actualmente esta a ${temp} °C. Hay ${precipitationProb}% de probabilidad de lluvia.`
		jsonObj.weather = dayResponse
		console.log(dayResponse)
	})
}

getCoordinates = (cityName, callback) => {
	request.get({url:urlMapBox, json:true }, function(error,response,body) {
		if (error) {
			callback('Hubo error en el mapbox')
			return
		}

		if (body === undefined) {
			callback('No tienes internet prro')
			return
		}

		if (response.statusCode !== 200) {
			callback('El nombre de la ciudad esta vacio')
			return
		}

		if (body.features.length === 0) {
			callback('El nombre de la ciudad no existe')
			return
		}

		let longitude = body.features[0].center[0]
		let latitude = body.features[0].center[1]
		getWeatherInfo(longitude,latitude,  (err) => {
			console.log(err)
		})
	})
}
