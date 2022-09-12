import generateId from "@/helpers/generateId";
import {addConfigToLS} from "@/helpers/localStorageHandler"
import Vue from 'vue'
const mutations = {
  setCityWeather(state,{id,weather}){
    let idx = state.cities.findIndex(item => item.cityId == id )
    Vue.set(state.cities[idx],'weather', weather)
  },
  setCitySuggestions(state,suggestions){
    state.suggestions = suggestions
  },
  addCity(state,city){
    let cityId = generateId(city.geo.lat,city.geo.lon)
    if(state.cities.findIndex(item => item.cityId == cityId ) == -1 ){
      let cityObj = {
        cityId,
        ...city
      }
      state.cities.push(cityObj)
      addConfigToLS(state.cities)
    }
  },
  removeCity(state,idx){
    state.cities.splice(idx, 1);
    addConfigToLS(state.cities)

  },
  updateList(state,list){
    state.cities = list
  }
}

export default mutations
