
import DirectInput from '../lq-form-element-maker/DirectInput'

export default DirectInput.extend({
    name: 'lq-b-form-input',
    data() {
        return {
            tagName: 'b-form-input',
            internalValue: '',
            internalValueKey: false,
            isNeedToUpdateStore: true
        }
    },
    provide() {
        return {
            lqBInput: this
        };
    },
    render: function (createElement) {

        if (!this.hasAccess) return null
        let i = DirectInput.options.render.call(this, createElement);

        if (!this.insideFormGroup) {
            return i
        }

        const slotData = { error: this.elError, value: this.LQElement }

        const before = this.$scopedSlots.before ? this.$scopedSlots.before(slotData) : null
        const after = this.$scopedSlots.after ? this.$scopedSlots.after(slotData) : null


        let labelClasses = this.LQElement ? [...this.labelClass, ...this.labelFilledClass] : this.labelClass
        labelClasses = this.isFocused ? [...labelClasses, ...this.labelFocusedClass] : labelClasses
        // 
        return createElement(
            'lq-b-form-group',
            {

                attrs: {
                    label: this.label,
                    labelSize: this.labelSize,
                    disabled: this.isDisabled,
                    invalidFeedback: this.elError ? this.elError[0] : '',
                    labelFor: this.getDomId(),
                    state: this.elError ? false : true,
                    description: this.description,
                    labelClass: labelClasses,
                    labelAlignSm: this.labelAlignSm,
                    labelAlignMd: this.labelAlignMd,
                    labelAlignLg: this.labelAlignLg,
                    labelAlignXl: this.labelAlignXl,
                    labelColsSm: this.labelColsSm,
                    labelColsMd: this.labelColsMd,
                    labelColsLg: this.labelColsLg,
                    labelColsXl: this.labelColsXl,
                    labelSrOnly: this.labelSrOnly
                },
                scopedSlots: {
                    label: props => this.$scopedSlots.label ? this.$scopedSlots.label(props) : null,
                    description: props => this.$scopedSlots.description ? this.$scopedSlots.description(props) : null,
                    invalidFeedback: props => this.$scopedSlots.invalidFeedback ? this.$scopedSlots.invalidFeedback(props) : null,
                    validFeedback: props => this.$scopedSlots.validFeedback ? this.$scopedSlots.validFeedback(props) : null,
                },
            },
            [before, i, after]
        )
    },
    props: {
        label: String,
        labelSize: String,
        description: String,
        labelClass: {
            type: [String, Array, Object],
            default: () => ['input-label']
        },
        labelFocusedClass: {
            type: [String, Array, Object],
            default: () => ['input-label--focused']
        },
        labelFilledClass: {
            type: [String, Array, Object],
            default: () => ['input-label--filled']
        },
        labelAlign: String,
        labelAlignSm: String,
        labelAlignMd: String,
        labelAlignLg: String,
        labelAlignXl: String,
        labelColsXl: String,
        labelColsSm: String,
        labelColsMd: String,
        labelColsLq: String,
        labelSrOnly: Boolean,
        insideFormGroup: {
            default: () => true,
            type: Boolean
        },
        state: Boolean
    },

    methods: {
        getDomId() {
            return `${this.lqForm.name}.${this.id}`
        },
        _defaultProps() {
            return {
                ...this.$attrs,
                disabled: this.isDisabled,
                name: this.id,
                state: ((this.state || this.elError) && this.touch) ? (this.elError ? false : true) : null,
            }
        },
        getProps() {
            return {
                ...this._defaultProps(),
                value: this.$attrs.type === 'range' ? (this.LQElement ? this.LQElement : 0) : this.LQElement,
            }
        },
        /**
         * When value change internally.
         * @param {any} value 
         */
        onInput(value) {
            if (!this.touch) {
                this.touchStatus(true);
            }
            DirectInput.options.methods.onInput.call(this, value)
        }
    }
})