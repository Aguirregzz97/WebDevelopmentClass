const request = require('request')
let urlMapBox

const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
})

readline.question('Ingresa el nombre de la ciudad: ', function(city){
		urlMapBox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoiYWd1aXJyZWd6ejk3IiwiYSI6ImNqdDNpNW1iYzJpYmk0M29kODlvbDlyb2gifQ.ADx-gePuSyWoGxiFlNB47w&limit=1`
		getCoordinates(city)
		readline.close()
	}
)

getWeatherInfo = (long, lat) => {
	let urlDarkSky = `https://api.darksky.net/forecast/64eb360db2951ebe9307279c07b37280/${lat},${long}?units=si&lang=es`
	request.get({ url: urlDarkSky, json: true }, function(error, response, body) {
			if(error){
				console.log(error)
			}
			let temp = body.currently.temperature
			let precipitationProb = body.currently.precipProbability
			let day = body.currently.summary
			let dayResponse = `${day}. Actualmente esta a ${temp} °C. Hay ${precipitationProb}% de probabilidad de lluvia.`
			console.log(dayResponse)

	})
}

getCoordinates = (cityName) => {
	request.get({url:urlMapBox, json:true }, function(error,response,body) {
		
		if(error || cityName === ""){
			console.log(error)
		} else {
			console.log(body.features[0].place_name)
			let longitude = body.features[0].center[0]
			let latitude = body.features[0].center[1]
			getWeatherInfo(longitude,latitude)
		}
	})
}
