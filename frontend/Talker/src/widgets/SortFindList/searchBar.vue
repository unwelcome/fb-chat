<template>
    <div>
        <input type="text" class="px-2 py-1 border-2 border-solid border-gray-900 rounded-xl" placeholder="Find something" v-model="searchBarInput"/>
    </div>
</template>
<script lang="ts">
export default {
    data(){
        return{
            searchBarInput: '',
        }
    }
}
</script>