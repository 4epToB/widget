
import constants from '@/const'
import getGeoPositionPromise from "@/helpers/getGeoPositionPromise";
const actions = {
    async getWeatherFromApi({ commit },{id,city}){

        try {
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.geo.lat}&lon=${city.geo.lon}&appid=${constants.weatherApiKey}&units=metric`)
            if(response.ok){
                let weather = await response.json();
                commit('setCityWeather',{id,weather})
            }else{
                throw new Error('что-то не так')
            }
        }catch (e){
            console.log(e)
        }
    },
    async getLocation({dispatch}){
        try {
            const geo = await getGeoPositionPromise();
            if(geo){
                await dispatch('getCityNameByCoordinate',{
                    lat:geo.coords.latitude,
                    lon:geo.coords.longitude,
                })
                return true
            }else{
                throw new Error('Отказ гео')
            }
        } catch (err) {
            console.error(err.message);
        }
    },

    async getCitiesSuggestions({ commit },name ){
        try {
            let response = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${name}&type=city&format=json&apiKey=${constants.geoApifyKey}`)
            if(response.ok){
                let json = await response.json();
                let suggestions = json.results.filter(city => city.result_type== 'city')
                commit('setCitySuggestions',suggestions)
            }else{
                throw new Error('что-то не так')
            }
        }catch (e){
            console.log(e)
        }
    },
    async getCityNameByCoordinate({ commit },geo ){
        try {
            let response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${constants.accueatherKey}&q=${geo.lat},${geo.lon}&language=en-us`)
            if(response.ok){
                let json = await response.json();
                let city = {
                    city:json.AdministrativeArea.EnglishName,
                    country:json.Country.EnglishName,
                    country_code:json.Country.ID,
                    geo: {
                        lat:json.GeoPosition.Latitude,
                        lon:json.GeoPosition.Longitude,
                    }

                }
                commit('addCity',city)
            }else{
                throw new Error('что-то не так')
            }
        }catch (e){
            console.log(e)
        }
    }
}

export default actions
