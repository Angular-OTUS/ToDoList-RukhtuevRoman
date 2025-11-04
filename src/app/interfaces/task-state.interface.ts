import { ITask } from './task.interface';
import { EStatus } from '../enums';

export interface ITaskState {
    tasksByStatus: {
        [EStatus.Pending]: ITask[];
        [EStatus.InProgress]: ITask[];
        [EStatus.Completed]: ITask[];
    };
    isLoading: boolean;
    selectedItemId: string;
    selectedItemIdByDoubleClick: string;
}
