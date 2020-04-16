<template>
    <div>
        <lq-b-form
            :transform-keys="['username:email']"
            name="test_form"
            :rules="rules"
            ref="lqForm"
            action="https://gorest.co.in/public-api/users"
        >
            <template v-slot="{model, submit, dirty, canSubmit}">
                {{model}}
                <b-form-input id="username" value="sgdjaggjjahsd sahgdh" v-lq-model="{id: 'username'}" />
                <b-form-checkbox
                    id="status"
                    index="1"
                    value="accepted"
                    v-lq-model="{id: 'status'}" 
                    description="Jqhsgdjhgjg eqdfqwdhgweqhjfd"
                >I accept the terms and use</b-form-checkbox>
                <!-- <lq-b-form-phone no-flags show-code-on-list	 id="phone" defaultCountryCode="IN" />
                <lq-b-form-phone-or-text id="_phone_or_text" label="Email Or Mobile Number" defaultCountryCode="IN" /> -->
                <!-- <lq-b-form-input id="_text_field" /> -->
                <!-- <b-row class="my-1" v-for="type in types" :key="type">
                    <b-col sm="3">
                        <label :for="`test_form.type-${type}`">
                            Type
                            <code>{{ type }}</code>:
                        </label>
                    </b-col>
                    <b-col sm="9">
                        <lq-b-form-input :id="`_input_type_${type}`" :type="type"></lq-b-form-input>
                    </b-col>
                </b-row>
                <b-form-group label="Individual radios">
                    <lq-b-form-radio id="_radio" :index="1" value="A">Option A</lq-b-form-radio>
                    <lq-b-form-radio id="_radio" :index="2" value="B">Option B</lq-b-form-radio>
                </b-form-group>
                <lq-b-form-textarea
                    id="text"
                    placeholder="Enter something..."
                    rows="3"
                    max-rows="6"
                ></lq-b-form-textarea>
                <lq-b-form-radio-group
                    id="radio_group"
                    :options="radio_options"
                    name="plain-stacked"
                ></lq-b-form-radio-group>
                <lq-b-form-select id="selected" :value="{ C: '3PO' }" :options="select_options"></lq-b-form-select>-->
                <!-- <lq-b-form-input id="username"  >
                </lq-b-form-input>
                <lq-b-form-checkbox
                    id="status"
                    index="1"
                    value="accepted"
                    description="Jqhsgdjhgjg eqdfqwdhgweqhjfd"
                >I accept the terms and use</lq-b-form-checkbox>
                <lq-b-form-file id="profileImage" size="sm">
                    <template slot="file-name" slot-scope="{ names }">
                        <b-badge variant="dark">{{ names[0] }}</b-badge>
                        <b-badge
                            v-if="names.length > 1"
                            variant="dark"
                            class="ml-1"
                        >+ {{ names.length - 1 }} More files</b-badge>
                    </template>
                </lq-b-form-file> -->
                <!-- <lq-b-form-checkbox-group
                    label="Using options array:"
                    id="checkbox_group_1"
                    :options="radio_options"
                ></lq-b-form-checkbox-group>

                <b-form-group label="Using sub-components:">
                    <lq-b-form-checkbox-group id="checkbox_group_2">
                        <b-form-checkbox value="orange">Orange</b-form-checkbox>
                        <b-form-checkbox value="apple">Apple</b-form-checkbox>
                        <b-form-checkbox value="pineapple">Pineapple</b-form-checkbox>
                        <b-form-checkbox value="grape">Grape</b-form-checkbox>
                    </lq-b-form-checkbox-group>
                </b-form-group>
                <lq-b-form-file id="_file" :file-name-formatter="formatNames" /> -->
                <button type="submit">Submit</button>
                <button type="button" @click="init">Init Value</button>
                <button type="button" @click="reset">Reset</button>
            </template>
        </lq-b-form>
        <!-- <lq-b-table
            action="https://gorest.co.in/public-api/users"
            tableName="_test_table"
            data-key="data.result"
            total-key="data._meta.totalCount"
            striped
            hover
            small
            caption-top	
            fixed
            responsive
            sticky-header
            selectable
            select-mode="multi"
            no-local-sorting
            :fields="fields"
            page-size-key="data._meta.perPage"
            :transformKeys="['data._meta.perPage:page_size']"
            :static-data="{_format: 'json', 'access-token': 'Z-m4SzDK_vtWbJHkxjK2V3z0AwiSWRBe6-r-'}"
            :default-sort="{prop: 'id', order: 'descending'}"
        >
            <template v-slot:cell(selected)="{ rowSelected }">
                <template v-if="rowSelected">
                    Selected
                    <span aria-hidden="true">&check;</span>
                    <span class="sr-only">Selected</span>
                </template>
                <template v-else>
                    NOt Selected
                    <span aria-hidden="true">&nbsp;</span>
                    <span class="sr-only">Not selected</span>
                </template>
            </template>
        </lq-b-table>-->
    </div>
</template>
<script>
export default {
    data() {
        const generateData = _ => {
            const data = [];
            const states = [
                'California',
                'Illinois',
                'Maryland',
                'Texas',
                'Florida',
                'Colorado',
                'Connecticut '
            ];
            const initials = ['CA', 'IL', 'MD', 'TX', 'FL', 'CO', 'CT'];
            states.forEach((city, index) => {
                data.push({
                    label: city,
                    key: `_${index}`,
                    initial: initials[index]
                });
            });
            return data;
        };

        return {
            radio: 1,
            data: generateData(),
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
            fields: [
                'selected',
                { key: 'last_name', sortable: true },
                { key: 'first_name', sortable: true },
                { key: 'dob', sortable: true },
                { key: 'id', sortable: true },
                { key: 'phone', sortable: true },
                { key: 'website', sortable: true },
                { key: 'address', sortable: true },
                { key: 'status', sortable: true },
                { key: 'gender', sortable: true }
            ],
            initializeValue: {
                status: 'accepted',
                username: 'Iam akjdsd',
                phone: '+91-8808824424',
                profileImage: 'https://i.picsum.photos/id/967/200/300.jpg'
            },
            yourValue: '+91-8808824424',
            rules: {
                status: {
                    presence: { allowEmpty: false }
                },
                checkbox_group_1: {
                    presence: { allowEmpty: false }
                },
                checkbox_group_2: {
                    presence: { allowEmpty: false }
                },
                username: {
                    presence: { allowEmpty: false }
                },
                phone: {
                    presence: { allowEmpty: false }
                },
                profileImage: {
                    file: {
                        required: true,
                        maxFileSize: 2.06,
                        acceptedFiles: ['.zip']
                    }
                }
                // date_of_birth: {presence: {allowEmpty: false}},
                // date_of_birth2: { presence: { allowEmpty: false } },
                // autocomplete: { presence: { allowEmpty: false } },
                // checkbox: { presence: { allowEmpty: false } },
                // my_radio: { presence: { allowEmpty: false } },
                // my_switch: { presence: { allowEmpty: false } },
                // textarea: { presence: { allowEmpty: false } },
                // rating: { presence: { allowEmpty: false } },
                // combobox: { presence: { allowEmpty: false } }
            },
            radio_options: [
                { text: 'First radio', value: 'first' },
                { text: 'Second radio', value: 'second' },
                { text: 'Third radio', value: 'third' }
            ],
            select_options: [
                { value: null, text: 'Please select an option' },
                { value: 'a', text: 'This is First option' },
                { value: 'b', text: 'Selected Option' },
                {
                    value: { C: '3PO' },
                    text: 'This is an option with object value'
                },
                { value: 'd', text: 'This one is disabled', disabled: true }
            ],
            types: [
                'text',
                'number',
                'email',
                'password',
                'search',
                'url',
                'tel',
                'date',
                'time',
                'range',
                'color'
            ]
        };
    },
    methods: {
        handleChangeNumber(value) {
            console.log('handleChangeNumber', value);
        },
        formatNames(files) {
            if (files.length === 1) {
                return files[0].name;
            } else {
                return `${files.length} files selected`;
            }
        },
        init() {
            this.$lqForm.initializeValues('test_form', this.initializeValue);
        },
        reset() {
            this.$lqForm.resetForm('test_form');
        }
    }
};
</script>