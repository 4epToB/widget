<template>
  <div>
    <label for="cityName">Название компании или регистрационный номер</label>
    <input class="input" :class="{'filledInput':1}" type="text" id="cityName"
           :value="cityName"
           @change="getSuggestions"
           autocomplete="off">
    <div v-if="1" class="dropDown">
      <div class="suggestionWrapper"
           v-for="suggestion in suggestions"
           :key="suggestion.value">
        <p class="field">{{suggestion.value}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  props:{
  },
  data(){
    return{
      cityName:'',
      suggestions:[{
        value:1
      },
        {
          value:2
        }]
    }
  },
  methods: {
    getSuggestions(e){
      console.log(e)
    }
  }
}
</script>

<style>

</style>
