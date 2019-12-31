import Input from './Input'
import VuePhoneNumberInput from 'vue-phone-number-input';
import { parsePhoneNumberFromString } from 'libphonenumber-js'

export default Input.extend({
    name: 'lq-b-form-phone',
    components: { VuePhoneNumberInput },
    data() {
        return {
            tagName: 'vue-phone-number-input',
            mobileData: {}
        }
    },
    created() {
        this.$lqForm.addProp(this.lqForm.name, this.id, 'formatter', this.formatter)
    },
    computed: {
        countryCode() {
            const obj = parsePhoneNumberFromString(this.LQElement ? this.LQElement : '');
            return obj ? obj.country : ''
        }
    },
    inject: ['lqBForm'],
    watch: {
        countryCode(newCode) {
            if (this.$refs.lqel) {
                this.$refs.lqel.results.countryCode = newCode
            }
        }
    },
    methods: {
        getProps() {

            const mn = parsePhoneNumberFromString(this.LQElement ? this.LQElement : '')
            return {
                ...this._defaultProps(),
                value: mn ? mn.nationalNumber : this.LQElement,
                error: !!this.elError
            }
        },
        /**
        * Method to add events.
        */
        customEvents() {
            return {
                update: this.onUpdate,
            }
        },
        async onUpdate(data) {
            this.lqBForm.busy = true;
            this.mobileData = data
            await this.$nextTick()
            setTimeout(() => {
                this.lqBForm.busy = false;
            }, 1);
        },
        formatter() {
            const { nationalNumber, countryCallingCode } = this.mobileData
            if (nationalNumber && countryCallingCode) {
                return `+${countryCallingCode}-${nationalNumber}`
            }
            return this.LQElement
        }
    },

})