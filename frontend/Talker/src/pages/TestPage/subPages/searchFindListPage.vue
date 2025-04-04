<template>
    <div class="w-[700px] flex flex-col">

        <sortFindList 
            v-if="sortFindData.length" 
            :search-component="getSearchbar" 
            :item-component="getItemList" 
            :data-array="sortFindData" 
            :sort-function="sortFunction"
        />

    </div>
</template>
<script lang="ts">

import sortFindList from '@/widgets/SortFindList/sortFindList.vue';
import searchBar from '@/widgets/SortFindList/searchBar.vue';
import itemList from '@/widgets/SortFindList/itemList.vue';

interface ISearchFilterItem{
    id: number,
    name: string,
    online: boolean,
    student: boolean,
}
interface IFilters{
    online: boolean,
    student: boolean,
}

export default {
    components: {
        sortFindList,
        searchBar,
        itemList
    },
    data(){
        return{
            sortFindData: [] as any[],
        }
    },
    computed: {
        getSearchbar(){
            return searchBar;
        },
        getItemList(){
            return itemList;
        }
    },
    mounted() {
        for(let i = 0; i < 100; i++){
            this.sortFindData.push({
                id: i,
                name: `Item-${i}`,
                online: (Math.floor(Math.random() * 2 + 1) % 2) === 0 ? false : true,
                student: (Math.floor(Math.random() * 2 + 1) % 2) === 0 ? false : true
            });
        }
    },
    methods: {
        sortFunction (arr: ISearchFilterItem[], searchTerm: string, filterObj: IFilters) {
            return arr.filter(item => {
                const searchValid = (searchTerm === '') ? true : item.name.toLowerCase().includes(searchTerm.toLowerCase());

                const filterValid = item.online === filterObj.online && item.student === filterObj.student;

                return searchValid && filterValid;
            });
        }
    }
}
</script>