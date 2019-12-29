import Vue from 'vue'
import App from './App'
import lqForm from 'lq-form'
import store from '../store'
import './axios'
import LqBForm from '../main'

import helper from 'vuejs-object-helper'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

Object.defineProperty(
    Vue.prototype,
    '$helper',
    {
        value: helper
    }
);
// Vue.use(VueCroppie)
Vue.use(lqForm, { store })

// Vue.use(ElementUI, {locale});

Vue.config.performance = false

Vue.use(LqBForm)
// Vue.use(VueRouter)

new Vue({
    store,
    render(h) {
        return h(App)
    },
    // router
}).$mount('#app')
