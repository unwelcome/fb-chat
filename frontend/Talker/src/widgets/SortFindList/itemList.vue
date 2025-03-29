<template>
    <div>
        <p>{{ itemData.name }} #{{ itemData.id }}, online: {{ itemData.online }}, student: {{ itemData.student }}</p>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        itemData: {
            type: Object,
            required: true,
        }
    }
}
</script>