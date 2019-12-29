import Input from './Input'
export default Input.extend({
    name: 'lq-b-form-radio',
    props: {
        checked: Boolean,
        index: {
            type: [Number, String],
            required: true
        }
    },
    data() {
        return {
            tagName: 'b-form-radio'
        }
    },
    methods: {
        getProps() {
            return {
                ...this._defaultProps(),
                checked: this.LQElement,
                value: this.value,
            }
        },
        __init() {
            if (this.checked) {
                this.setValue(this.value, true, true)
            }
        },
        /**
       * Method to add attributes which are mostly use in event component.
       */
        _defaultAttrs() {
            return {
                id: `${this.lqForm.name}.${this.id}.${this.index}`,
            }
        }
    }
})