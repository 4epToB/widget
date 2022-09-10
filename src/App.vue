<template>
  <div id="app">
    вава23ывывывыв
    <img src="./assets/logo.png" alt="">
    <Widget
        :cities="getCities"
        v-if="getCities.length"
    />
  </div>
</template>

<script>
import Widget from './components/Widget.vue'
import { mapActions, mapGetters} from 'vuex'

export default {
  name: 'App',
  components: {
    Widget
  },
  data(){
    return {
      cities:[],
      citiesIndexMap:{},
    }
  },
  computed:{
    ...mapGetters(['getCities'])
  },
  methods:{
    ...mapActions(['getLocation'])
    /*async getWeatherFromApi(geo){
      let key = '620f2b2682ef28c3be366bf0594e05be'
      try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geo.lat}&lon=${geo.lon}&appid=${key}`)
        if(response.ok){
          let json = await response.json();
          this.commitWeather(json)
          console.log(json)
        }else{
          throw new Error('что-то не так')
        }
      }catch (e){
        console.log(e)
      }
    },*/
    /*getLocation(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( geo => {
          this.getWeatherFromApi({
            lat:geo.coords.latitude,
            lon:geo.coords.longitude,
          })
        });
      } else {
        console.log("Geolocation is not supported by this browser.")
      }
    },*/
    /*commitWeather(weatherObj){
      this.cities.push(weatherObj)
    }*/
  },
  mounted() {
    this.getLocation()
  }
}
</script>

<style>

</style>
