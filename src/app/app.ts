import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslationService } from './services';
import { Toasts } from './components';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [Toasts, RouterOutlet],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App implements OnInit {
    private translationService = inject(TranslationService);

    ngOnInit() {
        this.translationService.initializeLanguage();
    }
}
