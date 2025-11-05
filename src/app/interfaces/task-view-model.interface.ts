import { ITask } from './task.interface';
import { EStatus } from '../enums';

export interface ITaskViewModel {
    tasksByStatus: Record<EStatus, ITask[]>;
    isLoading: boolean;
    selectedItemId: string;
    selectedItemIdByDoubleClick: string;
    selectedTask: ITask | undefined;
}
