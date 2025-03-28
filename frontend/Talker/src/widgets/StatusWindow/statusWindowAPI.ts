import { useStatusWindowStore } from "./store/statusWindowStore";

export const StatusWindowTime = 2000;
export enum StatusCodes {
    'error', 'info', 'loading', 'success'
  };
export interface IStatusWindow{
    id: number,
    status: StatusCodes,
    text: string,
    time: number,
  };

  
export function useStatusWindowAPI() {
    const statusWindowStore = useStatusWindowStore();

    const createStatusWindow = (status: StatusCodes, text: string, time:number = StatusWindowTime) => {
        return statusWindowStore.showStatusWindow(status, text, time);
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
        getAllStatusWindows: statusWindowStore.getAllStatusWindows,
    };
}



