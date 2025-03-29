<template>
    <div>
        <div>
            <component :is="searchComponent" @filters-change="updateFilter" @search-change="updateSearch"></component>
        </div>
        <div>
            <component :is="itemComponent" v-for="item of sortedArray" :key="item.id" :item-data="item"></component>
        </div>
    </div>
</template>
<script lang="ts">

export default {
    props: {
        searchComponent: {
            type: Object,
            required: true
        },
        itemComponent: {
            type: Object,
            required: true,
        },
        dataArray: {
            type: Array<any>,
            required: true,
        },
        sortFunction:{
            type: Function,
            required: true,
        }
    },
    data(){
        return {
            searchTerm: '',
            filterObj: {} as any,
            sortedArray: this.dataArray,
        }
    },
    methods: {
        updateSearch(newSearch: string){
            this.searchTerm = newSearch;
            this.sortedArray = this.filterArray();
        },
        updateFilter(newFilter: any){
            this.filterObj = newFilter;
            this.sortedArray = this.filterArray();
        },
        filterArray() {
            return this.sortFunction(this.dataArray, this.searchTerm, this.filterObj);
        }
    },
}
</script>