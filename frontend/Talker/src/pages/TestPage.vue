<template>
    <div class="w-svw h-svh flex flex-col justify-start items-center">
        <h3>Welcome to Test Page</h3>
        <div class="w-[700px] flex flex-col">

            <sortFindList 
                v-if="sortFindData.length" 
                :search-component="getSearchbar" 
                :item-component="getItemList" 
                :data-array="sortFindData" 
                :sort-function="sortFunction"
            />

        </div>
    </div>
</template>
<script lang="ts">

import { useStatusWindowAPI } from '@/widgets/StatusWindow/statusWindowAPI';

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

export default{
    components: {
        sortFindList,
        searchBar,
        itemList
    },
    data(){
        return{
            StatusWindowAPI: useStatusWindowAPI(),

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

        // const time = -1;
        // const closable = true;
        // this.StatusWindowAPI.createStatusWindow({type: this.StatusWindowAPI.getTypes.classic, status: this.StatusWindowAPI.getCodes.error, text: 'Error!', time: time, closable: closable});
        // this.StatusWindowAPI.createStatusWindow({type: this.StatusWindowAPI.getTypes.classic, status: this.StatusWindowAPI.getCodes.loading, text: 'Loading', time: time, closable: closable});
        // this.StatusWindowAPI.createStatusWindow({type: this.StatusWindowAPI.getTypes.classic, status: this.StatusWindowAPI.getCodes.info, text: 'Info', time: time, closable: closable});
        // this.StatusWindowAPI.createStatusWindow({type: this.StatusWindowAPI.getTypes.classic, status: this.StatusWindowAPI.getCodes.success, text: 'Success', time: time, closable: closable});
        
        // this.StatusWindowAPI.createStatusWindow({type: this.StatusWindowAPI.getTypes.border, status: this.StatusWindowAPI.getCodes.error, text: 'Error!', time: time, closable: closable});
        // this.StatusWindowAPI.createStatusWindow({type: this.StatusWindowAPI.getTypes.border, status: this.StatusWindowAPI.getCodes.loading, text: 'Loading', time: time, closable: closable});
        // this.StatusWindowAPI.createStatusWindow({type: this.StatusWindowAPI.getTypes.border, status: this.StatusWindowAPI.getCodes.info, text: 'Info', time: time, closable: closable});
        // this.StatusWindowAPI.createStatusWindow({type: this.StatusWindowAPI.getTypes.border, status: this.StatusWindowAPI.getCodes.success, text: 'Success', time: time, closable: closable});

        // this.StatusWindowAPI.createStatusWindow({type: this.StatusWindowAPI.getTypes.detail, status: this.StatusWindowAPI.getCodes.error, text: 'This alert contains additional infromation, such as steps the user can follow to resolve the situation', time: time, closable: closable});
        // this.StatusWindowAPI.createStatusWindow({type: this.StatusWindowAPI.getTypes.detail, status: this.StatusWindowAPI.getCodes.loading, text: 'This alert contains additional infromation, such as steps the user can follow to resolve the situation', time: time, closable: closable});
        // this.StatusWindowAPI.createStatusWindow({type: this.StatusWindowAPI.getTypes.detail, status: this.StatusWindowAPI.getCodes.info, text: 'This alert contains additional infromation, such as steps the user can follow to resolve the situation', time: time, closable: closable});
        // this.StatusWindowAPI.createStatusWindow({type: this.StatusWindowAPI.getTypes.detail, status: this.StatusWindowAPI.getCodes.success, text: 'This alert contains additional infromation, such as steps the user can follow to resolve the situation', time: time, closable: closable});
    
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