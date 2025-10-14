import { ITask } from './task.interface';

export interface ITaskState {
    tasks: ITask[];
    isLoading: boolean;
    selectedItemId: string;
    selectedItemIdByDoubleClick: string;
}
