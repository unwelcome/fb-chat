<template>
    <div class="w-svw h-svh flex flex-col justify-start items-center">
        <h3>Welcome to Test Page</h3>
        <!-- <div class="w-[700px] flex flex-col">
            <sortFindList :search-component="getSearchbar" :item-component="getTestButton"/>
        </div> -->
    </div>
</template>
<script lang="ts">

import { useStatusWindowAPI } from '@/widgets/StatusWindow/statusWindowAPI';

import sortFindList from '@/widgets/SortFindList/sortFindList.vue';
import testButton from '@/widgets/SortFindList/testButton.vue';
import searchBar from '@/widgets/SortFindList/searchBar.vue';

export default{
    components: {
        sortFindList,
        searchBar,
        testButton
    },
    data(){
        return{
            StatusWindowAPI: useStatusWindowAPI(),
        }
    },
    computed: {
        getSearchbar(){
            return searchBar;
        },
        getTestButton(){
            return testButton;
        }
    },
    mounted() {
        const time = -1;
        const closable = true;
        this.StatusWindowAPI.createStatusWindow({status: this.StatusWindowAPI.getCodes.error, text: 'Error!', time: time, closable: closable});
        this.StatusWindowAPI.createStatusWindow({status: this.StatusWindowAPI.getCodes.loading, text: 'Loading', time: time, closable: closable});
        this.StatusWindowAPI.createStatusWindow({status: this.StatusWindowAPI.getCodes.info, text: 'Info', time: time, closable: closable});
        this.StatusWindowAPI.createStatusWindow({status: this.StatusWindowAPI.getCodes.success, text: 'Success', time: time, closable: closable});
        
        this.StatusWindowAPI.createStatusWindow({type: this.StatusWindowAPI.getTypes.border, status: this.StatusWindowAPI.getCodes.error, text: 'Error!', time: time, closable: closable});
        this.StatusWindowAPI.createStatusWindow({type: this.StatusWindowAPI.getTypes.border, status: this.StatusWindowAPI.getCodes.loading, text: 'Loading', time: time, closable: closable});
        this.StatusWindowAPI.createStatusWindow({type: this.StatusWindowAPI.getTypes.border, status: this.StatusWindowAPI.getCodes.info, text: 'Info', time: time, closable: closable});
        this.StatusWindowAPI.createStatusWindow({type: this.StatusWindowAPI.getTypes.border, status: this.StatusWindowAPI.getCodes.success, text: 'Success', time: time, closable: closable});

        this.StatusWindowAPI.createStatusWindow({type: this.StatusWindowAPI.getTypes.detail, status: this.StatusWindowAPI.getCodes.error, text: 'This alert contains additional infromation, such as steps the user can follow to resolve the situation', time: time, closable: closable});
        this.StatusWindowAPI.createStatusWindow({type: this.StatusWindowAPI.getTypes.detail, status: this.StatusWindowAPI.getCodes.loading, text: 'This alert contains additional infromation, such as steps the user can follow to resolve the situation', time: time, closable: closable});
        this.StatusWindowAPI.createStatusWindow({type: this.StatusWindowAPI.getTypes.detail, status: this.StatusWindowAPI.getCodes.info, text: 'This alert contains additional infromation, such as steps the user can follow to resolve the situation', time: time, closable: closable});
        this.StatusWindowAPI.createStatusWindow({type: this.StatusWindowAPI.getTypes.detail, status: this.StatusWindowAPI.getCodes.success, text: 'This alert contains additional infromation, such as steps the user can follow to resolve the situation', time: time, closable: closable});
    }
}
</script>