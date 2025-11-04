import { EStatus } from '../enums';

export const STATUS_LABELS = {
    [EStatus.Pending]: 'В ожидании',
    [EStatus.InProgress]: 'Действующие',
    [EStatus.Completed]: 'Завершенные',
};
