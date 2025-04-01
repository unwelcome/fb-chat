<template>
  <div class="w-svw h-svh flex flex-col justify-center items-center">
    <div class="bg-color-1 rounded-xl p-4 flex flex-col gap-4">

      <p>{{ message }}</p>


      <p>{{ sessionData }}</p>
      <input type="button" value="Load Data" @click="loadData"/>

    </div>
  </div>
</template>
<script lang="ts">
import { API_SessionProfile, API_SessionData } from '@/api/api';
import { useStatusWindowAPI } from '@/widgets/StatusWindow/statusWindowAPI';

export default {
  data() {
    return {
      StatusWindowAPI: useStatusWindowAPI(),
      message: '',
      sessionData: ''
    }
  },
  mounted() {
    API_SessionProfile()
    .then((res: any) => {
      this.message = res.data.message;
    })
    .catch((err) => {
      this.StatusWindowAPI.createStatusWindow({status: this.StatusWindowAPI.getCodes.error, text: 'Profile get error'});
    })
    
  },
  methods: {
    loadData(){
      API_SessionData()
      .then((res: any) => {
        this.sessionData = res.data;
      })
      .catch(err => {
        this.StatusWindowAPI.createStatusWindow({status: this.StatusWindowAPI.getCodes.error, text: 'Load data error'});
      })
    }
  }
};
</script>