import Input from './Input'
export default Input.extend({
    name: 'lq-b-form-checkbox-group',
    data() {
        return {
            tagName: 'b-form-checkbox-group'
        }
    },
    methods: {
        getProps() {
            return {
                ...this._defaultProps(),
                checked: this.value,
                value: this.LQElement,
            }
        }
    }
})