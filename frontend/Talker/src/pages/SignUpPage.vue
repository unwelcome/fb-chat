<template>
  <div class=" w-svw h-svh flex flex-col justify-center items-center">
    <div class=" p-10 rounded-xl w-90 bg-color-1 flex flex-col justify-start items-stretch gap-3">
      <h2 class="text-center text-2xl">Welcome to Talker!</h2>
      <p class=" text-center">Create your account</p>
      <div class="flex flex-col gap-2 justify-start items-stretch">
        <loginInput :id="'1'" :type="'text'" :placeholder="'Login'" :label="'Your login'" @input-change="validLoginInput" :error-messsage="loginValid.error" />
        <loginInput :id="'2'" :type="'password'" :placeholder="'Password'" :label="'Your password'" @input-change="validPasswordInput" :error-messsage="passwordValid.error"/>
      </div>
      <input type="button" class="btn btn-main" value="SignUp" @click="initLogIn"/>
      <p class=" text-xs text-color-description text-center">
        Already have an account? 
        <span @click="$router.push({name: 'LoginPage'})" class="text-color-link cursor-pointer">LogIn!</span>
      </p>
    </div>
  </div>
</template>
<script lang="ts">

import { mapStores } from 'pinia';
import { API_SignUp } from '@/api/api';
import { ValidUserLogin, ValidUserPassword } from '@/helpers/validator';
import { StatusCodes, type IValidator, type ISignUp } from '@/helpers/constants';
import { useStatusWindowStore } from '@/stores/statusWindowStore';

import loginInput from '@/shared/loginInput.vue';

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
  computed: {
    ...mapStores(useStatusWindowStore),
  },
  methods: {
    validLoginInput(value: string){
      this.loginValid = ValidUserLogin(value);
    },
    validPasswordInput(value: string){
      this.passwordValid = ValidUserPassword(value);
    },
    initLogIn(){
      if(this.loginValid.value !== '' && this.passwordValid.value !== '') {
        const stID = this.statusWindowStore.showStatusWindow(StatusCodes.loading, 'Creating account...', -1);

        const uid = + Math.floor(Math.random() * 100000 + 1);

        const body: ISignUp = {
          login: this.loginValid.value,
          password: this.passwordValid.value,
          name: 'test',
          surname: 'test',
          tagname: 'test' + uid,
          email: 'test' + uid + '@mail.ru'
        };

        API_SignUp(body)
        .then((res: any) => {
          this.statusWindowStore.deteleStatusWindow(stID);
          this.statusWindowStore.showStatusWindow(StatusCodes.success, 'Account created successfully!');

          document.cookie = `access_token=${res.data.jwt}; expires=${Math.floor(Date.now() / 1000) + (60 * 2)};`;

          this.$router.push({name: 'SecretPage'});
        })
        .catch((err) => {
          this.statusWindowStore.deteleStatusWindow(stID);
          if(err.status === 405) this.statusWindowStore.showStatusWindow(StatusCodes.error, 'User already exist!');
          else this.statusWindowStore.showStatusWindow(StatusCodes.error, 'Server error, try later!');
        })
      }

      if(this.loginValid.value === ''){
        this.statusWindowStore.showStatusWindow(StatusCodes.error, 'Login is missed!', 2000);
      }
      if(this.passwordValid.value === ''){
        this.statusWindowStore.showStatusWindow(StatusCodes.error, 'Password is missed!', 2000);
      }
    }
  }
}
</script>