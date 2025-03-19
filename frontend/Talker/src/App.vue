<template>
  <p class="text-2xl absolute">Server send: '{{ message }}'</p>
  <RouterView />
</template>
<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'

export default{
  data() {
    return {
      message: '',
    }
  },
  mounted() {
    fetch('/api/data')
    .then((response) => response.json())
    .then((data) => {
      this.message = data.message;
    });
  },
};

</script>