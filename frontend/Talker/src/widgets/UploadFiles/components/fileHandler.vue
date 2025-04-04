<template>
    <div class="flex flex-col items-stretch gap-4 bg-gray-200 rounded-lg p-4 max-w-[500px]">
        <!--Button select files-->
        <slot name="selectFilesButton" @click="openSelectFilesWindow"></slot>
        <!--selected files list-->
        <slot v-if="selectedFiles.length !== 0" name="filePreviev"></slot>
        <!--Button send files-->
        <slot v-if="selectedFiles.length !== 0" name="sendFilesButton" @send-files="sendFiles"></slot>
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
        fileIdToRemove:{
            type: [Number, null],
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
        }
    },
    data(){
        return{
            selectedFiles: [] as File[],
        }
    },
    methods: {
        handleFileChange(event: any) {
            const files = event.target.files;
            if (files) {
                this.selectedFiles = files;
                console.log('Выбраны файлы:', files);
            } 
            else this.selectedFiles = [];
        },
        sendFiles(){
            if(this.selectedFiles.length === 0) return;

            const sender = Upload<{message: string}>(
                this.selectedFiles, 
                this.sendUrl, 
                {onProgress: this.onProgressFunc()}
            )
            
            sender.then((res) => {
                this.$emit('loadSuccess', res);
            })
            .catch(err => {
                this.$emit('loadError', err);
            })
            .finally(() => {
                this.$emit('loadFinally');
            });

        },
        openSelectFilesWindow(){
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
        fileIdToRemove(newVal){
            if(newVal !== null){
                this.selectedFiles.splice(newVal, 1);
            }
        }
    }
}
</script>