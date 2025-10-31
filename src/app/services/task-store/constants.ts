import { ITaskState } from '../../interfaces';
import { NOT_SELECTED_ITEM_ID } from '../../constants';
import { EStatus } from '../../enums';

export const DEFAULT_TASK_STATE: ITaskState = {
    tasksByStatus: {
        [EStatus.Pending]: [],
        [EStatus.InProgress]: [],
        [EStatus.Completed]: [],
    },
    isLoading: false,
    selectedItemId: NOT_SELECTED_ITEM_ID,
    selectedItemIdByDoubleClick: NOT_SELECTED_ITEM_ID,
};

export const DELAY_TIME = 300;
