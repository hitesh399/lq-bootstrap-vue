import Input from './Input'
export default Input.extend({
    name: 'lq-b-form-checkbox',
    props: {
        checked: [Boolean, String, Object, Array],
        index: {
            type: [Number, String],
            required: true
        }
    },
    data() {
        return {
            tagName: 'b-form-checkbox'
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
                if (typeof this.checked === 'boolean') {
                    this.setValue(this.value, true, false, false)
                } else if (this.checked) {
                    this.setValue(this.checked, true, false, false)
                }
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