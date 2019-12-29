import Input from './Input'
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
    methods: {
        getProps() {
            return {
                ...this._defaultProps(),
                value: this.LQElement instanceof File || this.LQElement instanceof FileList ? this.LQElement : null,
                multiple: this.multiple,
            }
        }
    }
})

//multiple