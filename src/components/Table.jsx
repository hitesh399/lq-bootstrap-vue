import Vue from 'vue'
import { lqOptions } from '../defaultOptions'

export default Vue.extend({
    name: 'lq-el-table',
    provide() {
        return {
            lqelTable: this
        };
    },
    props: {
        tableName: {
            type: String,
            required: true
        },
        dataKey: {
            type: [String, Array],
            default: () => lqOptions.dataKey
        },
        action: {
            type: String,
            required: true
        },
        method: {
            type: String,
            default: () => 'GET'
        },
        defaultSort: Object,
        keepAlive: {
            type: Boolean,
            default: () => lqOptions.keepAlive
        },
        defaultPageSize: {
            type: Number,
            default: () => lqOptions.pageSize
        },
        staticData: Object,
        descStr: {
            type: String,
            default: () => lqOptions.descStr
        },
        ascStr: {
            type: String,
            default: () => lqOptions.ascStr
        },
        rowsPerPageItems: {
            type: Array,
            default: () => lqOptions.rowsPerPageItems
        },
        itemKey: {
            type: String,
            default: () => 'id'
        },
        keepSelected: {
            type: Boolean,
            default: () => lqOptions.keepSelected
        },
        autoFilter: {
            type: Boolean,
            default: () => lqOptions.autoFilter
        },
        loadingText: {
            type: String,
            default: () => lqOptions.loadingText
        },
        noDataText: {
            type: String,
            default: () => lqOptions.noDataText
        },
        noResultsText: {
            type: String,
            default: () => lqOptions.noResultsText
        },
        keepSelectedOnPageChange: {
            type: Boolean,
            default: () => lqOptions.keepSelectedOnPageChange
        },
        otherServerData: Array,
        paginationProps: Object,
        pageKey: {
            type: String,
            default: () => lqOptions.pageKey
        },
        tag: {
            type: String,
            default: () => 'b-table'
        }
    },
    data() {
        return {
            isLoaded: false,
            /**
             * Last seletced Item before Page Change.
             */
            lastSelected: []
        }
    },
    created() {
        if (!this.sortBy) {
            if (this.defaultSort) {
                const { prop, order } = this.defaultSort
                if (order) {
                    this.$lqForm.setElementVal(this.tableName, 'sort_by', {
                        [prop]: this.getOrderStr(order, this.ascStr, this.descStr)
                    })
                }
            }
        }
    },
    render: function () {
        return this.getLqList()
    },
    mounted: function () {
        this.isLoaded = true
    },
    computed: {
        sortBy: function () {
            return this.$helper.getProp(this.$store.state, ['form', this.tableName, 'values', 'sort_by'], null);
        },
        sortObjectForElement() {
            let sort = []
            if (this.sortBy) {
                const keys = Object.keys(this.sortBy)
                keys.forEach(prop => {
                    sort.push({
                        prop,
                        order: this.getOrderStr(this.sortBy[prop], 'ascending', 'descending')
                    })
                })
            }
            return sort.length ? sort[0] : undefined
        },
        currentPage: function () {
            return this.$helper.getProp(this.$store.state, `form.${this.tableName}.values.${this.pageKey}`, 1);
        },
        selectedKeys: function () {
            return this.$helper.getProp(this.$store.state, ['form', this.tableName, 'values', 'selected'], []);
        },
        items: function () {
            let dataKey = ['table', this.tableName, 'data', 'page_' + this.currentPage]
            return this.$helper.getProp(this.$store.state, dataKey, []);
        },
        total: function () {
            return this.$helper.getProp(this.$store.state, ['table', this.tableName, 'settings', 'total'], 0);
        },
        requesting: function () {
            return this.$helper.getProp(this.$store.state, ['table', this.tableName, 'requesting'], false);
        },
        pageSize: function () {
            return this.$helper.getProp(this.$store.state, ['form', this.tableName, 'values', 'page_size'], 15);
        }
    },
    methods: {
        getAscString(order, ascStr) {
            if (['asc', 'ascending'].includes(order.toString().toLocaleLowerCase())) {
                return ascStr ? ascStr : 'asc'
            }
            return null
        },
        getDescString(order, descStr) {
            if (['desc', 'descending'].includes(order.toString().toLocaleLowerCase())) {
                return descStr ? descStr : 'desc'
            }
            return null
        },
        getOrderStr(order, ascDefault, descDefault) {
            const ascStr = this.getAscString(order, ascDefault)
            const descStr = this.getDescString(order, descDefault)
            if (ascStr) {
                return ascStr
            } else if (descStr) {
                return descStr
            }
            return null

        },
        getDataTable(scope) {
            return this.$createElement(
                this.tag,
                {

                    on: {
                        ...this.$listeners,
                        'row-selected': (val) => {
                            let selected = val.map(v => v[this.itemKey])
                            if (this.keepSelectedOnPageChange) {
                                selected = selected.concat(this.lastSelected).filter((value, index, self) => self.indexOf(value) === index)
                            }

                            this.$lqForm.setElementVal(this.tableName, 'selected', selected)
                            this.$emit('row-selected', val)
                        },
                        'sort-changed': ({ sortBy, sortDesc }) => {
                            if (!sortBy) {
                                this.$lqForm.setElementVal(this.tableName, 'sort_by', null)
                            } else {
                                this.$lqForm.setElementVal(this.tableName, 'sort_by', {
                                    [sortBy]: this.getOrderStr(sortDesc ? 'desc' : 'asc', this.ascStr, this.descStr)
                                })
                            }
                            this.$lqTable.refresh(this.tableName, false);
                            this.$emit('sort-changed', { sortBy, sortDesc })
                        }
                    },
                    props: {
                        ...this.$attrs,
                        items: scope.items,
                        defaultSort: this.sortObjectForElement,
                        busy: this.requesting,
                        sortBy: this.sortBy ? Object.keys(this.sortBy)[0] : undefined,
                        sortDesc: this.sortBy ? !!this.getDescString(this.sortBy[Object.keys(this.sortBy)[0]], 'desc') : undefined,
                        primaryKey: this.itemKey,
                        emptyText: scope.requesting ? this.loadingText : this.noDataText,
                    },
                    scopedSlots: this.$scopedSlots,
                    ref: 'elTable',
                },
                this.renderSlots()
            )
        },
        getLqList() {
            // console.log('total', this.total)
            return this.$createElement('lq-list', {
                props: {
                    ...this.$attrs,
                    keepAlive: this.keepAlive,
                    type: 'table',
                    name: this.tableName,
                    requestMethod: this.method,
                    action: this.action,
                    primaryKey: this.itemKey,
                    dataKey: this.dataKey,
                    extraDataKeys: ['sort_by'],
                    autoFilter: this.autoFilter,
                    keepSelectedOnPageChange: this.keepSelectedOnPageChange,
                    defaultPageSize: this.defaultPageSize,
                    staticData: this.staticData,
                    otherServerData: this.otherServerData
                },
                on: {
                    'data-loaded': (response) => {
                        if (this.$refs.elTable && this.selectedKeys && this.selectedKeys.length && this.keepSelectedOnPageChange) {
                            const _data = this.$helper.getProp(response, this.dataKey)
                            this.$nextTick(() => {
                                this.makeSelection(_data, this.selectedKeys)
                            })
                        }
                        this.$emit('data-loaded', response)
                    }
                },
                scopedSlots: {
                    ...this.$scopedSlots,
                    default: props => [
                        this.getDataTable(props),
                        this.$createElement(
                            'lq-b-pagination',
                            {
                                attrs: this.paginationProps,
                                on: {
                                    input: (page) => {
                                        if (this.keepSelectedOnPageChange) {
                                            this.lastSelected = this.selectedKeys
                                            const _data = this.$helper.getProp(
                                                this.$store.state,
                                                ['table', this.tableName, 'data', `page_${page}`],
                                                null
                                            )
                                            this.$nextTick(() => {
                                                this.$lqForm.setElementVal(this.tableName, 'selected', this.lastSelected)
                                                if (_data) {
                                                    this.makeSelection(_data, this.lastSelected)
                                                }
                                            })
                                        }
                                    }
                                }
                            }
                        )
                    ],
                }
            })
        },
        makeSelection(_data, selectedKeys) {
            _data.forEach((item, index) => {
                if (selectedKeys.includes(item[this.itemKey])) {
                    this.$refs.elTable.selectRow(index)
                }
            })
        },
        renderSlots() {
            const slotNames = Object.keys(this.$slots);
            return slotNames.map(
                slotName => this.$createElement(
                    'template',
                    { slot: slotName },
                    this.$slots[slotName]
                )
            )
        }
    },
    beforeDestroy() {
        if (!this.keepSelected) {
            this.$lqForm.removeElement(this.tableName, 'selected')
        }
    }
})