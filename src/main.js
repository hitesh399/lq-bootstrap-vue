
import { lqOptions } from './defaultOptions'
import Form from './components/Form'
import Input from './components/Input'
import Radio from './components/Radio'
import RadioGroup from './components/RadioGroup'
import Textarea from './components/Textarea'
import Select from './components/Select'
import Checkbox from './components/Checkbox'
import CheckboxGroup from './components/CheckboxGroup'
import File from './components/File'
import FromGroup from './components/FromGroup'
import Table from './components/Table'
import Pagination from './components/Pagination'
import Phone from './components/Phone'
import PhoneOrText from './components/PhoneOrText'

export default {
    // The install method will be called with the Vue constructor as
    // the first argument, along with possible options
    install(Vue, options = {}) {
        lqOptions.merge(options)
        Vue.component('lq-b-form', Form)
        Vue.component('lq-b-form-input', Input)
        Vue.component('lq-b-form-radio', Radio)
        Vue.component('lq-b-form-textarea', Textarea)
        Vue.component('lq-b-form-radio-group', RadioGroup)
        Vue.component('lq-b-form-select', Select)
        Vue.component('lq-b-form-checkbox', Checkbox)
        Vue.component('lq-b-form-checkbox-group', CheckboxGroup)
        Vue.component('lq-b-form-file', File)
        Vue.component('lq-b-form-group', FromGroup)
        Vue.component('lq-b-table', Table)
        Vue.component('lq-b-pagination', Pagination)
        Vue.component('lq-b-form-phone', Phone)
        Vue.component('lq-b-form-phone-or-text', PhoneOrText)
    }
}