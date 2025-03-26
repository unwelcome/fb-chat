<template>
  <StatusWindow />
  <RouterView />
</template>
<script lang="ts">
import { RouterView } from 'vue-router'
import { mapStores } from 'pinia';
import { useStatusWindowStore } from './stores/statusWindowStore';
import StatusWindow from './widgets/statusWindow.vue';

export default{
  components: {
    StatusWindow
  },
  computed: {
    ...mapStores(useStatusWindowStore),
  },
};

</script>