<template>
    <div>
        <div>
            <p>Search: </p>
            <component :is="searchComponent"></component>
        </div>
        <div>
            <p>List: </p>
            <component :is="itemComponent"></component>
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
        }
    }
}
</script>