import { Component } from '@angular/core';
import { Toasts, ToDoList } from './components';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ToDoList, Toasts],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {}
