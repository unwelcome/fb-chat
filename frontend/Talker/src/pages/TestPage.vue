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
        this.StatusWindowAPI.createStatusWindow(this.StatusWindowAPI.getTypes.classic ,this.StatusWindowAPI.getCodes.error, 'Error!', time, closable);
        this.StatusWindowAPI.createStatusWindow(this.StatusWindowAPI.getTypes.classic ,this.StatusWindowAPI.getCodes.loading, 'Loading', time, closable);
        this.StatusWindowAPI.createStatusWindow(this.StatusWindowAPI.getTypes.classic ,this.StatusWindowAPI.getCodes.info, 'Info!', time, closable);
        this.StatusWindowAPI.createStatusWindow(this.StatusWindowAPI.getTypes.classic ,this.StatusWindowAPI.getCodes.success, 'Success', time, closable);

        this.StatusWindowAPI.createStatusWindow(this.StatusWindowAPI.getTypes.border ,this.StatusWindowAPI.getCodes.error, 'Error!', time, closable);
        this.StatusWindowAPI.createStatusWindow(this.StatusWindowAPI.getTypes.border ,this.StatusWindowAPI.getCodes.loading, 'Loading', time, closable);
        this.StatusWindowAPI.createStatusWindow(this.StatusWindowAPI.getTypes.border ,this.StatusWindowAPI.getCodes.info, 'Info!', time, closable);
        this.StatusWindowAPI.createStatusWindow(this.StatusWindowAPI.getTypes.border ,this.StatusWindowAPI.getCodes.success, 'Success', time, closable);

        this.StatusWindowAPI.createStatusWindow(this.StatusWindowAPI.getTypes.detail ,this.StatusWindowAPI.getCodes.error, 'This alert contains additional infromation, such as steps the user can follow to resolve the situation', time, closable);
        this.StatusWindowAPI.createStatusWindow(this.StatusWindowAPI.getTypes.detail ,this.StatusWindowAPI.getCodes.loading, 'This alert contains additional infromation, such as steps the user can follow to resolve the situation', time, closable);
        this.StatusWindowAPI.createStatusWindow(this.StatusWindowAPI.getTypes.detail ,this.StatusWindowAPI.getCodes.info, 'This alert contains additional infromation, such as steps the user can follow to resolve the situation', time, closable);
        this.StatusWindowAPI.createStatusWindow(this.StatusWindowAPI.getTypes.detail ,this.StatusWindowAPI.getCodes.success, 'This alert contains additional infromation, such as steps the user can follow to resolve the situation', time, closable);
    }
}
</script>