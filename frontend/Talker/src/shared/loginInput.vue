<template>

  <div class="flex flex-col justify-start items-start">
    <label class=" cursor-pointer" :for="'login-input-' + id">{{ label }}</label>
    <input 
      :type=type 
      class="input w-full" 
      :class="{'input-incorrect': errorMesssage !== ''}"
      :id="'login-input-' + id" 
      :placeholder="placeholder" 
      v-model="value" 
      @input="updateValue()"
      />
  </div>
  <div class="h-4">
    <p class=" text-xs text-color-error">{{ errorMesssage }}</p>
  </div>

</template>
<script lang="ts">
export default{
  emits: ['inputChange'],
  props:{
    id:{
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    errorMesssage: {
      type: String,
      required: true,
    }
  },
  data() {
    return{
      value: '' as String,
    }
  },
  methods: {
    updateValue(){
      this.$emit('inputChange', this.value);
    }
  }
}
</script>