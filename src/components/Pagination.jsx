import Vue from 'vue'

export default Vue.extend({
  name: 'lq-el-pagination',
  inject: ['lqForm'],
  render () {
    return this.$createElement(
        'b-pagination', 
        {
            
            on: {
                ...this.$listeners,
                'input': (page) => {
                    if(page !== this.lqForm.currentPage) {
                        this.lqForm.switchPage(page)
                        this.$emit('input', page)
                    }
                }
            },
            props: {
                ...this.$attrs,
                perPage: this.lqForm.pageSize,
                totalRows: this.lqForm.total,
                disabled: this.lqForm.requesting,
                value: this.lqForm.currentPage
            },
            scopedSlots: this.$scopedSlots,
            ref: 'pagination',
        },            
        this.renderSlots()
    )
  },
  methods: {
    renderSlots () {
        const slotNames = Object.keys(this.$slots);
        return slotNames.map(
            slotName => this.$createElement(
                'template', 
                { slot: slotName }, 
                this.$slots[slotName]
            )
        )
    }
  }
})