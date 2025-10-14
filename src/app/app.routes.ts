import { Routes } from '@angular/router';
import { ToDoItemView, ToDoList } from './components';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
    },
    {
        path: 'tasks',
        component: ToDoList,
        children: [
            {
                path: ':id',
                component: ToDoItemView,
            },
        ],
    },
    {
        path: '**',
        redirectTo: 'tasks',
    },
];
