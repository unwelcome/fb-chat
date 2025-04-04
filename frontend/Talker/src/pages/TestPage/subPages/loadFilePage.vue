<template>
    <div class="flex flex-col justify-start items-center gap-4">

        <div class="p-2 rounded bg-cyan-100">
            <img class="w-60 h-60" :src="avatarUrl" alt="Avatar" v-if="avatarUrl" />
            <p v-else>Loading avatar...</p>
        </div>

        <exampleButton />
    </div>
</template>
  
<script lang="ts">

import exampleButton from '@/widgets/UploadFiles/components/exampleButton.vue';

export default {
    components: {
        exampleButton,
    },
    data(){
        return{
            avatarUrl: '',
        }
    },
    mounted() {
        fetch('http://localhost:5173/api/avatar') // Replace with your server URL
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.blob(); // Get the response as a Blob
        })
        .then(blob => {
          this.avatarUrl = URL.createObjectURL(blob); // Create a URL for the Blob
        })
        .catch(error => {
          console.error('Error fetching avatar:', error);
        });
    }
};
</script>