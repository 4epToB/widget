<template>
  <div class="main">
    <settings
        @update="updateWeatherHandler()"
        v-if="showSettings"
    />
    <city-card
        v-for="city in cities"
        :key="city.id"
        :city="city"
    />
    <img :src="getImgUrl(showSettings? 'close' : 'gear')" class="settings-btn" @click="showSettings=!showSettings">
  </div>
</template>

<script>
import cityCard from './cityCard.vue'
import settings from './settings.vue'
import {mapActions, mapMutations, mapState} from "vuex";
import {config} from "@/helpers/localStorageHandler";
export default {
  components: {
    cityCard,
    settings
  },
  data(){
    return{
      intervalId:null,
      showSettings:false
    }
  },
  computed:{
    ...mapState({
      cities: state => state.cities,
    }),
    config(){
      return config()
    }
  },
  methods: {
    ...mapActions(['getWeatherFromApi','getLocation']),
    ...mapMutations(['updateList']),
    updateWeatherHandler(){

      if (this.intervalId)  clearInterval((this.intervalId))
      this.updateWeather()
      this.intervalId = setInterval(this.updateWeather,10000)
    },
    updateWeather(){

      this.cities.forEach((city,idx) => {
        let id = city.cityId
        this.getWeatherFromApi({id,city})
      })
    },
    getImgUrl(pic) {
      return require('../assets/'+pic + '.svg')
    }

  },
  async mounted() {
    if(this.config){
      this.updateList(this.config)
      this.updateWeatherHandler()
    }else{
      this.showSettings = true
    }
    let confirmGeo = await this.getLocation()
    if(confirmGeo) this.updateWeatherHandler()

  }
}
</script>

<style lang="scss">
.main{
  position: relative;
  min-width: 300px;
  .settings-btn{
    position: absolute;
    z-index: 3;
    top: 30px;
    right: 15px;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
}
</style>
