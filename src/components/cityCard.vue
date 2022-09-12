<template>
  <div class="card-wrapper"  v-if="city.weather">
    <div class="citi-label">
      {{ city.city }}
      <span class="citi-label__code">,
        {{ city.country_code}}</span>
    </div>
    <div class="main">
      <img :src="`http://openweathermap.org/img/w/${city.weather.weather[0].icon}.png`">
      <div class="main__temp">{{ Math.round(city.weather.main.temp )}}&deg;С</div>
    </div>
    <div class="summary">
      Feels like {{ city.weather.main.feels_like }}.{{ city.weather.weather[0].description }}
    </div>
    <div class="details">
      <div class="wind details__item">
        <img src="../assets/windDir.png" :style="`transform: rotate(${city.weather.wind.deg}deg);`">
        <div>{{ city.weather.wind.speed }} m/s, {{ windDirection(city.weather.wind.deg) }}</div>
      </div>
      <div class="pressure details__item">
        <img src="../assets/pressure.png">
        <div>{{ city.weather.main.pressure }} hPa</div>
      </div>
      <div class="humidity details__item">Humidity: {{ city.weather.main.humidity }}%</div>
      <div class="visibility details__item">Visibility: {{kmConversion(city.weather.visibility)}}</div>
    </div>
  </div>
</template>
<script>
import toTextualDescription from "@/helpers/toTexWindDescription";
export default {
  props:{
    city:{
      type:Object,
    }
  },
  methods:{
    windDirection(deg){
      return toTextualDescription(deg)
    },
    kmConversion(meters){
      let km = (meters / 1000).toFixed(1) + " km"
      return km

    }
  }
}
</script>
<style lang="scss">
.card-wrapper{
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  background-color: aliceblue;
  padding: 15px;
  border-radius: 15px;
  margin: 15px 0;
  position: relative;
  z-index: 0;
  .citi-label{
    display: flex;
    align-items: center;
    font-weight: 600;
    &__code{
      text-transform: uppercase;
      font-weight: 400;
    }
  }
  .main{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    align-items: center;
    img{
      height: 100%;
    }

    &__temp{

      font-size: 50px;
    }
  }
  .details{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 25px);
    grid-column-gap: 5px;
    grid-row-gap: 5px;
    margin-top: 10px;
    .wind{

    }
    &__item{
      display: flex;
      align-items: center;
    }
  }
  img{
    height: 20px;
    margin-right: 5px;
  }
}
</style>
