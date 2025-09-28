import { ITaskState } from '../../interfaces';
import { NOT_SELECTED_ITEM_ID } from '../../constants';

export const DEFAULT_TASK_STATE: ITaskState = {
    tasks: [],
    isLoading: false,
    selectedItemId: NOT_SELECTED_ITEM_ID,
    selectedItemIdByDoubleClick: NOT_SELECTED_ITEM_ID,
};
