<template>
  <header v-if="false" class="w-full bg-color-1 fixed flex flex-row items-center px-10 py-1">
    <label class="text-lg flex flex-row items-center gap-2 cursor-pointer">
      <input type="button" class="btn btn-main btn-theme" @click="theme = !theme" :value="(theme ? 'Ligth' : 'Dark') + ' theme'"/>
    </label>
  </header>
  <StatusWindow />
  <RouterView />
</template>
<script lang="ts">
import StatusWindow from './widgets/StatusWindow/components/statusWindow.vue';

export default{
  components: {
    StatusWindow
  },
  data(){
    return {
      theme: false,
    }
  },
  mounted(){
    const LSTheme = localStorage.getItem('theme');
    const theme = LSTheme === null ? 'ligth' : LSTheme;

    switch(theme){
      case 'light': 
        this.theme = false;
        break;
      case 'dark':
        this.theme = true;
        break;
    }
  },
  watch: {
    theme(newVal: boolean){
      if(newVal){ // dark
        document.getElementsByTagName('html')[0].classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      }
      else{ // light
        document.getElementsByTagName('html')[0].classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      }
    }
  }
};

</script>