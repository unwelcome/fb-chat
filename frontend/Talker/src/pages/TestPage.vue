<template>
    <div class="w-svw h-svh flex flex-col justify-start items-center">
        <h3>Welcome to Test Page</h3>
        <div class="w-[700px] flex flex-col">
            <sortFindList :search-component="getSearchbar" :item-component="getTestButton"/>
        </div>
    </div>
</template>
<script lang="ts">

import sortFindList from '@/widgets/SortFindList/sortFindList.vue';
import testButton from '@/widgets/SortFindList/testButton.vue';
import searchBar from '@/widgets/SortFindList/searchBar.vue';

export default{
    components: {
        sortFindList,
        searchBar,
        testButton
    },
    computed: {
        getSearchbar(){
            return searchBar;
        },
        getTestButton(){
            return testButton;
        }
    }
}
</script>