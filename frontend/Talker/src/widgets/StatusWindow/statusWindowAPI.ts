import { useStatusWindowStore } from "./store/statusWindowStore";

export const StatusWindowTime = 2000;
export const ShowAnimation = true;
export const ShowTimeBar = true;
export enum StatusCodes {
    'error', 'info', 'loading', 'success'
};
export enum StatusTypes {
    'classic', 'border', 'detail'
};
export interface IStatusWindow{
    id: number,
    type: StatusTypes,
    status: StatusCodes,
    text: string,
    time: number,
    closable: boolean
};

export function useStatusWindowAPI() {
    const statusWindowStore = useStatusWindowStore();

    const createStatusWindow = (type: StatusTypes, status: StatusCodes, text: string, time:number = StatusWindowTime, closable:boolean = false) => {
        return statusWindowStore.showStatusWindow(type, status, text, time, closable);
    };
    
    const updateStatusWindowText = (id: number, text: string) => {
        return statusWindowStore.updateStatusWindowText(id, text);
    };

    const deleteStatusWindow = (id: number): boolean => {
        return statusWindowStore.deleteStatusWindow(id);
    };
    
    const deleteAllStatusWindows = () => {
        return statusWindowStore.deleteAllStatusWindows();
    };
    
    return {
        createStatusWindow,
        updateStatusWindowText,
        deleteStatusWindow,
        deleteAllStatusWindows,
        getTypes: StatusTypes,
        getCodes: StatusCodes,
        getTime: StatusWindowTime,
        getAllStatusWindows: statusWindowStore.getAllStatusWindows,
    };
}



