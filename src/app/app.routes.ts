import { Routes } from '@angular/router';
import { Backlog, Board } from './pages';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'board',
        pathMatch: 'full',
    },
    {
        path: 'board',
        component: Board,
    },
    {
        path: 'backlog',
        component: Backlog,
    },
    {
        path: '**',
        redirectTo: 'board',
    },
];
