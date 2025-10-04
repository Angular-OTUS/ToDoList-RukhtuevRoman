import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toasts } from './components';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [Toasts, RouterOutlet],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {}
