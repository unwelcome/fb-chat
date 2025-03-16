<template>
  <div class=" w-svw h-svh flex flex-col justify-center items-center">
    <div class=" p-10 rounded-xl bg-color-1 flex flex-col justify-start items-stretch gap-3">
      <h2 class="text-center text-2xl">Welcome back!</h2>
      <p class=" text-center">Log in to your account</p>
      <div class="flex flex-col gap-2 justify-start items-stretch">
        <loginInput :id="'1'" :placeholder="'Login'" :label="'Your login'" :error-messsage="loginErrorMessage"/>
        <loginInput :id="'2'" :placeholder="'Password'" :label="'Your password'" :error-messsage="signupErrorMessage"/>
      </div>
      <input type="button" value="LogIn"/>
      <p>Don't have an account? <span>Create now!</span></p>
    </div>
  </div>
</template>
<script lang="ts">
import loginInput from '@/shared/loginInput.vue';
export default {
  components:{
    loginInput,
  },
  data(){
    return{
      loginErrorMessage: '' as string,
      signupErrorMessage: '' as string,
    }
  },
}
</script>