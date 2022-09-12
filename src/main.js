import Vue from 'vue'
import App from './App.vue'
import Store from './store'

Vue.config.devtools = true
Vue.config.productionTip = false

//import vueCustomElement from 'vue-custom-element'
import "./assets/styles/main.scss"


/*
Vue.use(vueCustomElement)
App.store = Store
Vue.customElement('weather-widget', App)*/
new Vue({
    el: 'weather-widget',
    render: h => h(App),
    store: Store,
})
