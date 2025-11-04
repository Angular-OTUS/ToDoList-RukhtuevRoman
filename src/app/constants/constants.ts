import { INavItem } from '../interfaces';
import { PAGES } from './pages';

export const NOT_SELECTED_ITEM_ID = '-1';

export const API_URL = 'http://localhost:3000/tasks';

export const NAV_ITEMS: INavItem[] = [
    { label: PAGES.board, route: '/board' },
    { label: PAGES.backlog, route: '/backlog' },
];
