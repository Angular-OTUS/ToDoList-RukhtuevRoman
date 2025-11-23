import { Injectable, signal, computed } from '@angular/core';
import { ILanguage, ITranslations } from './interfaces';
import { ELanguage } from './enums';
import { en, ru } from './assets';

@Injectable({ providedIn: 'root' })
export class TranslationService {
    private currentLang = signal<ELanguage>(ELanguage.Ru);

    private translations = signal<ITranslations>({
        [ELanguage.En]: en,
        [ELanguage.Ru]: ru,
    });

    private currentTranslation = computed(() => {
        return this.translations()[this.currentLang()] || {};
    });

    public availableLanguages = computed(() => {
        const currentLang = this.currentLang();
        return [
            { code: ELanguage.En, name: this.translate('language.en') },
            { code: ELanguage.Ru, name: this.translate('language.ru') },
        ];
    });

    public setLanguage(lang: ELanguage): void {
        this.currentLang.set(lang);
        localStorage.setItem('user-language', lang);
    }

    public getCurrentLang() {
        return this.currentLang.asReadonly();
    }

    public initializeLanguage(): void {
        const savedLang = localStorage.getItem('user-language');
        const browserLang = navigator.language.split('-')[0];

        const languageValues = Object.values(ELanguage).filter((value) => typeof value === 'string') as string[];

        if (savedLang && languageValues.includes(savedLang)) {
            this.currentLang.set(savedLang as ELanguage);
        } else if (browserLang && languageValues.includes(browserLang)) {
            this.currentLang.set(browserLang as ELanguage);
        } else {
            this.currentLang.set(ELanguage.Ru);
        }
    }

    public translate(key: string): string {
        const keys = key.split('.');
        let value: any = this.currentTranslation();

        for (const k of keys) {
            value = value?.[k];
            if (value === undefined) {
                return key;
            }
        }

        return value;
    }

    public instant(key: string): string {
        return this.translate(key);
    }
}
