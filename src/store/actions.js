
//import errors from './store/errors.js'
import constants from '@/const'

const actions = {
    async getWeatherFromApi({ commit },geo){
        try {
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geo.lat}&lon=${geo.lon}&appid=${constants.weatherApiKey}`)
            if(response.ok){
                let json = await response.json();
                commit('setCityWeather',json)
            }else{
                throw new Error('что-то не так')
            }
        }catch (e){
            console.log(e)
        }
    },
    getLocation({dispatch}){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( geo => {
                dispatch('getWeatherFromApi',{
                    lat:geo.coords.latitude,
                    lon:geo.coords.longitude,
                })
            });
        } else {
            console.log("Geolocation is not supported by this browser.")
        }
    },
}

export default actions
