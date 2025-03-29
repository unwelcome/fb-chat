<template>
    <div class="flex flex-row gap-x-4 items-center">
        <input type="text" class="px-2 py-1 border-2 border-solid border-gray-900 rounded-lg" placeholder="Find something" v-model="searchBarInput" @input="updateSearch"/>
        <div class="flex flex-row gap-x-2 items-center">
            <label class=" select-none">
                Online:
                <input type="checkbox" checked="true" v-model="isOnlineFilter" @change="updateFilter"/>
            </label>
            <label class=" select-none">
                Student:
                <input type="checkbox" checked="true" v-model="isStudendFilter" @change="updateFilter"/>
            </label>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    emits: ['filtersChange', 'searchChange'],
    data(){
        return{
            searchBarInput: '',
            isOnlineFilter: false,
            isStudendFilter: false,
        }
    },
    methods: {
        updateSearch(){
            this.$emit('searchChange', this.searchBarInput);
        },
        updateFilter(){
            this.$emit('filtersChange', {
                online: this.isOnlineFilter,
                student: this.isStudendFilter,
            })
        }
    },
    mounted(){
        this.updateFilter();
    }
}
</script>