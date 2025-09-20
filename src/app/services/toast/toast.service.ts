import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { IToast } from './interfaces';
import { TToastOptions } from './types';

@Injectable({ providedIn: 'root' })
export class ToastService {
    private toastsSubject: BehaviorSubject<IToast[]> = new BehaviorSubject<IToast[]>([]);
    public toasts$: Observable<IToast[]> = this.toastsSubject.asObservable();

    private defaultDuration = 3000;

    public success(message: string, options?: Omit<TToastOptions, 'type'>): void {
        this.show(message, { ...options, type: 'success' });
    }

    public error(message: string, options?: Omit<TToastOptions, 'type'>): void {
        this.show(message, { ...options, type: 'error' });
    }

    public warning(message: string, options?: Omit<TToastOptions, 'type'>): void {
        this.show(message, { ...options, type: 'warning' });
    }

    public info(message: string, options?: Omit<TToastOptions, 'type'>): void {
        this.show(message, { ...options, type: 'info' });
    }

    public show(message: string, options: TToastOptions = {}): void {
        const toast: IToast = {
            id: uuid(),
            message,
            type: options.type || 'info',
            duration: options.duration || this.defaultDuration,
            createdAt: new Date(),
        };

        const currentToasts = this.toastsSubject.value;
        this.toastsSubject.next([...currentToasts, toast]);

        // Автоматическое удаление через указанное время
        if (toast.duration && toast.duration > 0) {
            setTimeout(() => {
                this.remove(toast.id);
            }, toast.duration || this.defaultDuration);
        }
    }

    public remove(id: string): void {
        this.toastsSubject.next(this.toastsSubject.value.filter((toast) => toast.id !== id));
    }

    public clear(): void {
        this.toastsSubject.next([]);
    }
}
