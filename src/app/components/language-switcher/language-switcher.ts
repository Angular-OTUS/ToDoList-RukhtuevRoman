import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes';
import { ELanguage, TranslationService } from '../../services';

@Component({
    selector: 'app-language-switcher',
    standalone: true,
    imports: [CommonModule, TranslatePipe],
    templateUrl: './language-switcher.html',
    styleUrl: './language-switcher.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcher {
    private translationService = inject(TranslationService);

    protected currentLang = this.translationService.getCurrentLang();
    protected availableLanguages = this.translationService.availableLanguages;

    protected switchLanguage(lang: ELanguage): void {
        this.translationService.setLanguage(lang);
    }
}
