<template>
  <div class="w-svw h-svh flex flex-col justify-center items-center">
    <div class="bg-color-1 rounded-xl p-4 flex flex-col gap-4">

      <p>{{ message }}</p>

      <div>
        <p>Message: {{ sessionData.message }}</p>
        <p>RandomValue: {{ sessionData.randomValue }}</p>
      </div>
      <input type="button" value="Load Data" class="btn btn-main" @click="loadData"/>
      <input type="button" value="Logout" class="btn btn-main" @click="logOut"/>
    </div>
  </div>
</template>
<script lang="ts">
import { API_SessionProfile, API_SessionData, API_SessionLogout } from '@/api/api';
import { useStatusWindowAPI } from '@/widgets/StatusWindow/statusWindowAPI';

export default {
  data() {
    return {
      StatusWindowAPI: useStatusWindowAPI(),
      message: '',
      sessionData: {message: '', randomValue: ''}
    }
  },
  mounted() {
    API_SessionProfile()
    .then((res: any) => {
      this.message = res.data.message;
    })
    .catch((err) => {
      this.StatusWindowAPI.createStatusWindow({status: this.StatusWindowAPI.getCodes.error, text: 'Profile get error'});
      this.$router.push({name: 'WelcomePage'});
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
    },
    logOut(){
      API_SessionLogout()
      .then(res => {
        this.StatusWindowAPI.createStatusWindow({status: this.StatusWindowAPI.getCodes.success, text: 'Logout successful!'});
      })
      .catch(err => {
        this.StatusWindowAPI.createStatusWindow({status: this.StatusWindowAPI.getCodes.error, text: 'Logout error!'});
      })
    }
  }
};
</script>