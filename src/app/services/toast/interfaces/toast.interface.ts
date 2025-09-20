import { TToast } from '../types';

export interface IToast {
    id: string;
    message: string;
    type: TToast;
    duration?: number;
    createdAt: Date;
}
