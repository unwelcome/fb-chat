<template>
  <div class=" w-svw h-svh flex flex-col justify-center items-center">
    <div class=" p-10 rounded-xl w-90 bg-color-1 flex flex-col justify-start items-stretch gap-3">
      <h2 class="text-center text-2xl">Welcome back!</h2>
      <p class=" text-center">Log in to your account</p>
      <div class="flex flex-col gap-2 justify-start items-stretch">
        <loginInput :id="'1'" :type="'text'" :placeholder="'Login'" :label="'Your login'" @input-change="validLoginInput" :error-messsage="loginValid.error" />
        <loginInput :id="'2'" :type="'password'" :placeholder="'Password'" :label="'Your password'" @input-change="validPasswordInput" :error-messsage="passwordValid.error"/>
      </div>
      <input type="button" class="btn btn-main" value="LogIn"/>
      <p class=" text-xs text-color-description text-center">
        Don't have an account? 
        <span @click="$router.push({name: 'SignUpPage'})" class="text-color-link cursor-pointer">Create now!</span>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import loginInput from '@/shared/loginInput.vue';
import { ValidUserLogin, ValidUserPassword } from '@/helpers/validator';
import { type IValidator } from '@/helpers/constants';
export default {
  components:{
    loginInput,
  },
  data(){
    return{
      loginValid: {value: '', error: ''} as IValidator,
      passwordValid: {value: '', error: ''} as IValidator,
    }
  },
  methods: {
    validLoginInput(value: string){
      this.loginValid = ValidUserLogin(value);
    },
    validPasswordInput(value: string){
      this.passwordValid = ValidUserPassword(value);
    }
  }
}
</script>