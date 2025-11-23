import { INavItem } from '../interfaces';
import { EStatus } from '../enums';

export const NOT_SELECTED_ITEM_ID = '-1';

export const API_URL = 'http://localhost:3000/tasks';

export const NAV_ITEMS: INavItem[] = [
    { label: 'pages.board', route: '/board' },
    { label: 'pages.backlog', route: '/backlog' },
];

export const STATUS_LABELS = {
    [EStatus.Pending]: 'status.pending',
    [EStatus.InProgress]: 'status.inProgress',
    [EStatus.Completed]: 'status.completed',
};
