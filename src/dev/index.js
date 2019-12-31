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
// import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';
 
// Vue.component('vue-phone-number-input', VuePhoneNumberInput);
// import 'vue-tel-input/dist/vue-tel-input.css';
// import VueTelInput from 'vue-tel-input'
// Vue.component('vue-tel-input', VueTelInput);
Vue.use(BootstrapVue)

Object.defineProperty(
    Vue.prototype,
    '$helper',
    {
        value: helper
    }
);
// Vue.use(VueCroppie)
Vue.use(lqForm, {
    store, 
    afterRequestResolved: function (response) {
        // console.log('Test Form Submit....', response)
        let code = helper.getProp(response, 'data._meta.code')
        if (code === 422) {
            let result =  helper.getProp(response, 'data.result')
            let errors  = {}
            result.forEach((error) => {
                errors[error.field] = [error.message]
            })
            this.compliesErrors(errors);
            this.addErrors(errors);
        }
    }
})

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
