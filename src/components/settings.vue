<template>
  <div class="settings-wrapper">
    <div class="label">Settings</div>
    <draggable tag="ul" v-model="drugubleCities" class="list-group" handle=".handle">
      <li
          class="list-group-item"
          v-for="(city, idx) in drugubleCities"
          :key="city.cityId"
      >
        <img src="../assets/hamburger.svg" class="handle">

        <p class="text"> {{ city.city }},<span> {{city.country_code}}</span></p>
        <img src="../assets/close.svg" class="close"  @click="removeCity(idx)">
      </li>
    </draggable>
    <div class="city-wrapper">
      <label for="city-wrapper__name">Add city</label>
      <div class="city-wrapper__item">
        <input class="input" type="text" id="city Name"
               v-model="cityName"
               @input="getSuggestionsHandler"
               autocomplete="off">
        <button @click="addCityHandler()">Add</button>
      </div>
      <div v-if="suggestions.length && showSuggestion && cityName.length>3" class="dropDown">
        <div class="suggestionWrapper"
             v-for="suggestion in suggestions"
             :key="suggestion.place_id"
             @click="setCity(suggestion)">
          <p class="field">{{suggestion.city}}</p>
          <p>{{suggestion.country}} </p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {mapActions, mapState,mapMutations} from "vuex"
import draggable from 'vuedraggable'
import {addConfigToLS} from "@/helpers/localStorageHandler";
export default {
  components: {
    draggable,
  },
  data(){
    return{
      cityName:'',
      showSuggestion:true,
      tempCityObj:null
    }
  },
  computed:{
    ...mapState({
      suggestions: state => state.suggestions,
      cities: state => state.cities,
    }),
    drugubleCities: {
      get() {
        return this.cities
      },
      set(value) {
        this.updateList( value)
        addConfigToLS(value)

      }
    }
  },
  methods: {
    ...mapActions({
          getSuggestions :'getCitiesSuggestions',
          getWeatherFromApi:'getWeatherFromApi',
          intervalGeoUpdate:'intervalGeoUpdate'
    }),
    ...mapMutations({
          addCity:'addCity',
          setCitySuggestions:'setCitySuggestions',
          removeCity:'removeCity',
          updateList:'updateList'
    }),
    getSuggestionsHandler(e){
      if (e.target.value.length > 3) this.getSuggestions(e.target.value)
    },
    setCity(sugg){
      let city = {
        city:sugg.city,
        country:sugg.country,
        country_code:sugg.country_code,
        geo: {
          lat:sugg.lat,
          lon:sugg.lon,
        }
      }
      this.tempCityObj = city
      this.cityName = sugg.city
      this.showSuggestion = false
    },
    addCityHandler(){
      this.addCity(this.tempCityObj)
      this.setCitySuggestions([])
      this.tempCityObj = null
      this.cityName = ''
      this.showSuggestion = true
      this.$emit('update')
    },
  }
}
</script>

<style lang="scss">
.settings-wrapper{
  position: absolute;
  width: 100%;
  top: 15px;
  z-index: 2;
  border-radius: 15px;
  padding: 15px;
  background-color: beige;
  .label{
    margin-bottom: 10px;
    font-weight: 600;
  }
}
.city-wrapper{
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  margin-bottom: 24px;
  position: relative;
  &__item{
    width: 100%;
    height: 25px;
    display: flex;
    align-items: center;
  }
  button{
    margin-left: 12px;
  }
}
.list-group{
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 20px;
  min-height: 20px;
  &-item:first-child {
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
  }
  &-item{
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid rgb(216, 218, 238);

    height: 2rem;
    img{

    }
    .text{
      display: flex;
      align-items: center;
      span{
        text-transform: uppercase;
      }
    }
  }
}
.handle {
  float: left;
  padding-top: 8px;
  padding-bottom: 8px;
  margin: 0 1rem;
  height: 100%;
  cursor: pointer;
}
.close{
  padding-top: 8px;
  padding-bottom: 8px;
  margin: 0 1rem;
  margin-left: auto;
  height: 100%;
  cursor: pointer;
}
</style>
