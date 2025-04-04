<template>
    <div class="flex flex-col">
        <!--Button select files-->
        <div @click="openSelectFilesWindow">
            <slot name="selectFilesButton"></slot>
        </div>
        <!--selected files list-->
        <slot v-if="selectedFiles.length !== 0" name="filePreviev"></slot>
        <!--Button send files-->
        <div v-if="selectedFiles.length !== 0" @click="sendFiles">
            <slot name="sendFilesButton"></slot>
        </div>
        <!--Progress bar-->
        <Transition>
            <div v-if="$slots.progressBar && showProgressBar && isLoading">
                <slot name="progressBar"></slot>
            </div>
        </Transition>
        <!--invisible input type=file-->
        <input type="file" class="invisible hidden w-0 h-0 absolute" :multiple="isMultiple" ref="selectFile" @change="handleFileChange" />
    </div>
</template>
<script lang="ts">

import { Upload } from '../uploadFilesAPI';

export default {
    emits: ['selectedFiles', 'isFilesSelectOpened', 'loadSuccess', 'loadError', 'loadFinally'],
    props: {
        triggerSelectFiles: {
            type: Boolean,
            required: false,
            default: false,
        },
        isMultiple: {
            type: Boolean,
            required: false,
            deafult: false,
        },
        fileToRemove:{
            type: [File, null],
            required: false,
            default: null
        },
        sendUrl: {
            type: String,
            required: true
        },
        onProgressFunc: {
            type: Function,
            requred: false,
            default: (progress: number) => {},
        },
        showProgressBar: {
            type: Boolean,
            required: false,
            default: false, 
        }
    },
    data(){
        return{
            selectedFiles: [] as File[],
            isLoading: false,
        }
    },
    methods: {
        handleFileChange(event: any) {
            const files: File[] = event.target.files;
            if (files) {
                this.selectedFiles = files;
                this.$emit('selectedFiles', this.selectedFiles);
            } 
            else this.selectedFiles = [] as File[];
        },
        sendFiles(){
            if(this.selectedFiles.length === 0) return;

            this.isLoading = true;

            const sender = Upload<{message: string}>(
                this.selectedFiles, 
                this.sendUrl, 
                {onProgress: (progress) => this.onProgressFunc(progress)}
            )
            
            sender.then((res) => {
                this.$emit('loadSuccess', res);
            })
            .catch(err => {
                this.$emit('loadError', err);
            })
            .finally(() => {
                this.isLoading = false;
                this.$emit('loadFinally');
            });

        },
        openSelectFilesWindow(){
            console.log('click');
            (this.$refs.selectFile as HTMLInputElement).click();
        }
    },
    watch: {
        triggerSelectFiles(newVal){
            if(newVal){
                this.openSelectFilesWindow();
                this.$emit('isFilesSelectOpened');
            }
        },
        fileToRemove(newVal){
            if(newVal !== null){
                const newFiles = [] as File[];
                for(let i = 0; i < this.selectedFiles.length; i++){
                    if(this.selectedFiles[i] === newVal) continue;
                    newFiles.push(this.selectedFiles[i]);
                }
                this.selectedFiles = newFiles;
                this.$emit('selectedFiles', this.selectedFiles);
            }
        }
    }
}
</script>
<style lang="css" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity .15s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>