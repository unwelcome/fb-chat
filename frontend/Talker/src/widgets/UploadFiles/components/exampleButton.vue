<template>
    <fileHandler 
        class="items-stretch gap-4 bg-gray-200 rounded-lg p-4 max-w-[500px]"
        :send-url="'http://localhost:5173/api/file-upload'" 
        :is-multiple="true" 
        :file-to-remove="fileToRemove"
        :show-progress-bar="true"
        @progress-func="progressHandler"
        @selected-files="updateSelectedFiles"
        @load-success="loadFilesSuccess"
        @load-error="loadFilesError"
    >
        <template #selectFilesButton>
            <div class="flex flex-row justify-center">
                <div class="btn btn-file flex flex-row justify-center items-center gap-4">
                    <svg class=" w-8 h-8" viewBox="0 -2 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
                        <g class=" fill-inherit" id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-569.000000, -674.000000)"> 
                            <path d="M579.732,681.7 L583,677.74 L583,691.998 C583,692.552 583.447,693 584,693 C584.553,693 585,692.552 585,691.998 L585,677.702 L588.299,681.7 C588.69,682.095 589.326,682.095 589.719,681.7 C590.11,681.307 590.11,680.668 589.719,680.274 L584.776,674.283 C584.566,674.073 584.289,673.983 584.016,673.998 C583.742,673.983 583.465,674.073 583.256,674.283 L578.313,680.274 C577.921,680.668 577.921,681.307 578.313,681.7 C578.705,682.095 579.341,682.095 579.732,681.7 L579.732,681.7 Z M598,690 C597.447,690 597,690.448 597,691 L597,698 L571,698 L571,691 C571,690.448 570.553,690 570,690 C569.447,690 569,690.448 569,691 L569,699 C569,699.553 569.447,700 570,700 L598,700 C598.553,700 599,699.553 599,699 L599,691 C599,690.448 598.553,690 598,690 L598,690 Z" id="upload" sketch:type="MSShapeGroup"> </path> 
                        </g> 
                    </svg>
                    <p class="text-inherit">Выбрать файл</p>
                </div>
            </div>
        </template>
        <template #filePreviev>
            <div class="flex flex-col gap-2 items-stretch max-h-72">
                <div v-for="(file, index) of selectedFiles" class="flex flex-row gap-2 items-center px-4 py-2 rounded bg-gray-300" :key="index">
                    <p class=" whitespace-nowrap overflow-hidden text-ellipsis grow">{{ file.name }}</p>
                    <p class=" whitespace-nowrap">{{ file.size }}</p>
                    <div class="w-5 h-5 cursor-pointer flex flex-col justify-center grow-0 shrink-0" @click="removeFile(file)">
                        <svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                    </div>
                </div>
            </div>
        </template>
        <template #sendFilesButton>
            <div class="flex flex-row justify-center">
                <input type="button" class="btn btn-file" value="Send file" />
            </div>
        </template>
        <template #progressBar>
            <div class="flex flex-col items-left p-[2px] rounded bg-gray-500">
                <div ref="progressBar" class="w-0 h-1 rounded bg-blue-300"></div>
            </div>
        </template>
    </fileHandler>
</template>
  
<script lang="ts">

import fileHandler from '@/widgets/UploadFiles/components/fileHandler.vue';

export default {
    components: {
        fileHandler,
    },
    data() {
        return {
            selectedFiles: [] as File[],
            fileToRemove: null as File | null,
        };
    },
    methods: {
        updateSelectedFiles(files: File[]){
            this.selectedFiles = files;
        },
        removeFile(file: File){
            this.fileToRemove = file;
        },
        loadFilesSuccess(res: {message: string}){
            console.log('files uploaded successfuly');
            console.log(res);
        },
        loadFilesError(err: {message: string}){
            console.log('files didn\'t upload');
            console.log(err);
        },
        progressHandler(progress: number){
            console.log(`${progress}%`);
            (this.$refs.progressBar as HTMLElement).style.width = `${progress}%`;
        }
    },
};
</script>