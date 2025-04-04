type UploadPromise<T> = Promise<T> & { abort: () => void };

export function Upload<T>(files: File[], url: string, options?: {onProgress: (progress: number) => void}):UploadPromise<T> {
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
}



export function formatBytes(bytes: number, decimals: number = 1): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}