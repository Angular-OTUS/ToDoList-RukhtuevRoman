import { Component } from '@angular/core';
import { ToDoList } from './components/to-do-list/to-do-list';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ToDoList],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {}
