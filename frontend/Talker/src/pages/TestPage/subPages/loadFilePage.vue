<template>
    <div class="flex flex-col justify-start items-center">
        <!-- <div class="flex flex-col items-stretch gap-4 bg-gray-200 rounded-lg p-4 max-w-[500px]">
            <div class="btn btn-file flex flex-row justify-center items-center gap-4" @click="openFileSelect">
                <svg class=" w-8 h-8" viewBox="0 -2 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
                    <g class=" fill-inherit" id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-569.000000, -674.000000)"> 
                        <path d="M579.732,681.7 L583,677.74 L583,691.998 C583,692.552 583.447,693 584,693 C584.553,693 585,692.552 585,691.998 L585,677.702 L588.299,681.7 C588.69,682.095 589.326,682.095 589.719,681.7 C590.11,681.307 590.11,680.668 589.719,680.274 L584.776,674.283 C584.566,674.073 584.289,673.983 584.016,673.998 C583.742,673.983 583.465,674.073 583.256,674.283 L578.313,680.274 C577.921,680.668 577.921,681.307 578.313,681.7 C578.705,682.095 579.341,682.095 579.732,681.7 L579.732,681.7 Z M598,690 C597.447,690 597,690.448 597,691 L597,698 L571,698 L571,691 C571,690.448 570.553,690 570,690 C569.447,690 569,690.448 569,691 L569,699 C569,699.553 569.447,700 570,700 L598,700 C598.553,700 599,699.553 599,699 L599,691 C599,690.448 598.553,690 598,690 L598,690 Z" id="upload" sketch:type="MSShapeGroup"> </path> 
                    </g> 
                </svg>
                <p class="text-inherit">Выбрать файл</p>
            </div>
            <div v-if="selectedFiles.length !== 0" class="flex flex-col gap-2 items-stretch max-h-72">
                <div v-for="(file, index) of selectedFiles" class="flex flex-row gap-2 items-center px-4 py-2 rounded bg-gray-300" :key="index">
                    <p class=" whitespace-nowrap overflow-hidden text-ellipsis grow">{{ file.name }}</p>
                    <p class=" whitespace-nowrap">{{ formatBytes(file.size) }}</p>
                    <div class="w-5 h-5 cursor-pointer flex flex-col justify-center grow-0 shrink-0" @click="removeFile(file)">
                        <svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                    </div>
                </div>
            </div>
            <div v-if="selectedFiles.length !== 0" class="flex flex-row justify-center">
                <input type="button" class="btn btn-file" value="Send file" @click="sendFile" />
            </div>
            <input type="file" class="invisible hidden w-0 h-0 absolute" multiple ref="selectFile" @change="handleFileChange" />
        </div> -->

        <fileHandler :send-url="'http://localhost:5173/api/file-upload'" :is-multiple="true" @selected-files="(files: File[]) => selectedFiles = files">
            <template #selectFilesButton>
                <div class="btn btn-file flex flex-row justify-center items-center gap-4">
                    <svg class=" w-8 h-8" viewBox="0 -2 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
                        <g class=" fill-inherit" id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-569.000000, -674.000000)"> 
                            <path d="M579.732,681.7 L583,677.74 L583,691.998 C583,692.552 583.447,693 584,693 C584.553,693 585,692.552 585,691.998 L585,677.702 L588.299,681.7 C588.69,682.095 589.326,682.095 589.719,681.7 C590.11,681.307 590.11,680.668 589.719,680.274 L584.776,674.283 C584.566,674.073 584.289,673.983 584.016,673.998 C583.742,673.983 583.465,674.073 583.256,674.283 L578.313,680.274 C577.921,680.668 577.921,681.307 578.313,681.7 C578.705,682.095 579.341,682.095 579.732,681.7 L579.732,681.7 Z M598,690 C597.447,690 597,690.448 597,691 L597,698 L571,698 L571,691 C571,690.448 570.553,690 570,690 C569.447,690 569,690.448 569,691 L569,699 C569,699.553 569.447,700 570,700 L598,700 C598.553,700 599,699.553 599,699 L599,691 C599,690.448 598.553,690 598,690 L598,690 Z" id="upload" sketch:type="MSShapeGroup"> </path> 
                        </g> 
                    </svg>
                    <p class="text-inherit">Выбрать файл</p>
                </div>
            </template>
            <template #filePreviev>
                <div class="flex flex-col gap-2 items-stretch max-h-72">
                    <div v-for="(file, index) of selectedFiles" class="flex flex-row gap-2 items-center px-4 py-2 rounded bg-gray-300" :key="index">
                        <p class=" whitespace-nowrap overflow-hidden text-ellipsis grow">{{ file.name }}</p>
                        <p class=" whitespace-nowrap">{{ formatBytes(file.size) }}</p>
                        <div class="w-5 h-5 cursor-pointer flex flex-col justify-center grow-0 shrink-0">
                            <svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Menu / Close_MD"> <path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>
                        </div>
                    </div>
                </div>
            </template>
            <template #sendFilesButton>
                <input type="button" class="btn btn-file self-center" value="Send file" />
            </template>
        </fileHandler>
    </div>
</template>
  
<script lang="ts">

import fileHandler from '@/widgets/UploadFiles/components/fileHandler.vue';

type UploadPromise<T> = Promise<T> & { abort: () => void };

export default {
    components: {
        fileHandler,
    },
    data() {
        return {
            selectedFiles: [] as File[],
        };
    },
    methods: {
        openFileSelect() {
            (this.$refs.selectFile as HTMLInputElement).click();
        },
        handleFileChange(event: any) {
            const files = event.target.files;
            if (files) {
                this.selectedFiles = files;

                console.log('Выбраны файлы:', files);
            } else {
                this.selectedFiles = [];
            }
        },
        removeFile(fileRemove: File){
            this.selectedFiles = this.selectedFiles.filter(file => file !== fileRemove)
        },
        sendFile(){
            console.log('start sending');
            if(this.selectedFiles.length === 0) return;

            const sender = this.Upload<{message: string}>(
                this.selectedFiles, 
                'http://localhost:5173/api/file-upload', 
                {onProgress: (progress:number) => console.log(progress, '%')}
            )
            
            sender.then((res) => {
                console.log(res.message);
                console.log('uploaded successfuly!');
            })
            .catch(e => {
                console.log(e.message);
            })
            .finally(() => {
                console.log('end sending');
            });

            // setTimeout(() => {
            //     console.log('1 sec gone, start abort!');
            //     sender.abort();
            // }, 1000);

            console.log('end of send function');
        },
        Upload<T>(files: File[], url: string, options?: {onProgress: (progress: number) => void}):UploadPromise<T> {
            const xhr = new XMLHttpRequest();

            xhr.responseType = 'json';

            const onProgress = options?.onProgress;

            const promise = new Promise((resolve, reject) => {
                xhr.open('POST', url);

                xhr.upload.onprogress = (event) => {
                    onProgress?.(Math.round((event.loaded / event.total) * 100));
                };

                xhr.onload = () => {
                    if (xhr.status === 200) resolve(xhr.response);
                    else reject(xhr.response);
                };

                const fileData = new FormData();
                for(let i = 0; i < files.length; i++) fileData.append('files', files[i], encodeURIComponent(files[i].name));
                
                xhr.send(fileData);
            }) as UploadPromise<T>;

            // Присвоили свойство abort, которое прервет запрос
            promise.abort = () => xhr.abort();

            return promise;
        },
        formatBytes(bytes: number, decimals: number = 1): string {
            if (bytes === 0) return '0 Bytes';

            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

            const i = Math.floor(Math.log(bytes) / Math.log(k));

            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        }
    },
};
</script>