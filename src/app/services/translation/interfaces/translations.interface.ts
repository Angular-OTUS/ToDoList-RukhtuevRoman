import { ELanguage } from '../enums';
import { ITranslation } from './translation.interface';

export interface ITranslations extends Record<ELanguage, ITranslation> {}
