<template>
  <div class="w-svw h-svh flex flex-col justify-center items-center">
    <div class="bg-color-1 rounded-xl p-4">

      <div v-if="message === ''">
        <input type="button" class="btn btn-main" value="Load secret" @click="loadSecret"/>
      </div>

      <div v-else class="flex flex-col justify-start items-center gap-6">
        <p>The secret information that can create several global wars is...</p>
        <p class="text-red-400 bg-teal-50 p-2 rounded-lg font-bold">"{{ message }}"</p>
        <div class="flex flex-row gap-6 justify-center items-center">
          <input type="button" class="btn btn-main" value="Go back" @click="$router.push({name: 'WelcomePage'})"/>
          <p>or</p>
          <input type="button" class="btn btn-main" value="Reset cookie" @click="resetCookie"/>
        </div>
      </div>

    </div>
  </div>
</template>
<script lang="ts">
import { API_GetSecretData } from '@/api/api';
import { useStatusWindowAPI } from '@/widgets/StatusWindow/statusWindowAPI';

export default {
  data() {
    return {
      StatusWindowAPI: useStatusWindowAPI(),
      message: ''
    }
  },
  mounted() {
    this.StatusWindowAPI.createStatusWindow({type: this.StatusWindowAPI.getTypes.detail, status: this.StatusWindowAPI.getCodes.info, text: 'You have only 2 minutes to see this information!!!', time: 3000});
  },
  methods: {
    loadSecret(){
      const stID = this.StatusWindowAPI.createStatusWindow({status: this.StatusWindowAPI.getCodes.loading, text: 'Loading secret...', time: -1});

      API_GetSecretData()
      .then((res: any) => {
        this.message = res.data.secret;
        this.StatusWindowAPI.deleteStatusWindow(stID);
      })
      .catch(err => {
        this.StatusWindowAPI.deleteStatusWindow(stID);
        switch(err.status){
          case 400: this.StatusWindowAPI.createStatusWindow({status: this.StatusWindowAPI.getCodes.error, text: 'Invalid token!'}); break;
          case 401: this.StatusWindowAPI.createStatusWindow({status: this.StatusWindowAPI.getCodes.error, text: 'The token has expired!'}); break;
          case 403: this.StatusWindowAPI.createStatusWindow({status: this.StatusWindowAPI.getCodes.error, text: 'Invalid token!'}); break;
          default: this.StatusWindowAPI.createStatusWindow({status: this.StatusWindowAPI.getCodes.error, text: 'IDK What Went Wrong!'}); break;
        }

        this.$router.push({name: 'WelcomePage'});
      })
    },
    resetCookie(){
      document.cookie = `access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
      this.StatusWindowAPI.createStatusWindow({status: this.StatusWindowAPI.getCodes.success, text: 'Cookies reseted!'});
    },
  }
};
</script>