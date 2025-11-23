import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationService } from '../services';

@Pipe({
    name: 'translate',
    standalone: true,
    pure: false,
})
export class TranslatePipe implements PipeTransform {
    private translationService = inject(TranslationService);

    private static cache = new Map<string, string>();
    private static currentLang: string = '';

    transform(key: string): string {
        const currentLang = this.translationService.getCurrentLang()();

        if (TranslatePipe.currentLang !== currentLang) {
            TranslatePipe.currentLang = currentLang;
            TranslatePipe.cache.clear();
        }

        const cacheKey = `${currentLang}:${key}`;

        if (!TranslatePipe.cache.has(cacheKey)) {
            const translation = this.translationService.instant(key);
            TranslatePipe.cache.set(cacheKey, translation);
        }

        return TranslatePipe.cache.get(cacheKey)!;
    }
}
