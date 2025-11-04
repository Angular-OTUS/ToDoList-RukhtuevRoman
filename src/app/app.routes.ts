import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'board',
        pathMatch: 'full',
    },
    {
        path: 'board',
        loadComponent: () => import('./pages/board').then((m) => m.Board),
    },
    {
        path: 'backlog',
        loadComponent: () => import('./pages/backlog').then((m) => m.Backlog),
    },
    {
        path: '**',
        redirectTo: 'board',
    },
];
