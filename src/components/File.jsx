import Input from './Input'
import helper from 'vuejs-object-helper'
// import { lqFileMixin } from 'lq-form'
export default Input.extend({
    name: 'lq-b-form-file',
    // mixins: [lqFileMixin],
    props: {
        multiple: {
            type: Boolean,
            default: () => { return false; }
        },
        value: [File, Array],
    },
    data() {
        return {
            tagName: 'b-form-file'
        }
    },
    computed: {
        validateArrayIndex: function () {
            return this.multiple
        },
        elError: function () {
            return this.errors && this.errors.length ? this.errors : null
        }
    },
    methods: {
        getProps() {
            return {
                ...this._defaultProps(),
                value: this.LQElement instanceof File || this.LQElement instanceof FileList ? this.LQElement : null,
                multiple: this.multiple,
                accept: helper.getProp(this.lqElRules, 'file.acceptedFiles', []).join(', ')
            }
        },
        /**
         * When value change internally.
         * @param {any} value 
         */
        onInput(value) {
            if (!(value === null && typeof this.LQElement === 'string')) {
                Input.options.methods.onInput.call(this, value)
            }
        }
    }

})

//multiple