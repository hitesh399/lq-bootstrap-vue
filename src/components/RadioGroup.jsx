import Input from './Input'
export default Input.extend({
    name: 'lq-b-form-radio-group',
    data() {
        return {
            tagName: 'b-form-radio-group'
        }
    },
    methods: {
        getProps() {
            return {
                ...this._defaultProps(),
                checked: this.value,
                value: this.LQElement,
            }
        },
    }
})