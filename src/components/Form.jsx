import Vue from 'vue'
import { lqFormMixin } from 'lq-form'

export default Vue.extend({
    name: 'lq-b-form',
    inheritAttrs: false,
    mixins: [lqFormMixin],
    props: {
        tag: {
            type: String,
            default: () => 'form'
        }
    },
    provide() {
        return { lqBForm: this }
    },
    data() {
        return { busy: false }
    },
    render(createElement) {
        return createElement('form', {
            on: {
                submit: e => { e.preventDefault(); !this.busy ? this.submit() : null },
                ...this.$listeners
            },
            staticClass: 'v-form lq-v-form',
            props: this.$attrs,
            attrs: Object.assign({
                novalidate: true
            }, this.$attrs),
        }, this.$scopedSlots.default ? this.$scopedSlots.default({
            model: this.formValues,
            errors: this.formErrors,
            push: this.push,
            canShow: this.canShow,
            unshift: this.unshift,
            submit: this.submit,
            remove: this.remove,
            dirty: this.dirty,
            canSubmit: this.canSubmit,
            removeError: this.removeError,
        }) : [null])
    }
})