<template>
  <div>
    <img alt="Vue logo" src="../assets/logo.png">
    <settings/>
    <city-card
        v-for="city in cities"
        :key="city.id"
        :city="city"
    />
  </div>
</template>

<script>
import cityCard from './cityCard.vue'
import settings from './settings.vue'
export default {
  components: {
    cityCard,
    settings
  },
  props:{
    cities:{

    }
  },
  data(){
    return{}
  },
  methods: {}
}
</script>

<style >

</style>
