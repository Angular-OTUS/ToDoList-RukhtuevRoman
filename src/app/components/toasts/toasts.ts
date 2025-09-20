import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { IToast } from '../../services/toast/interfaces';
import { ToastService } from '../../services';

@Component({
    selector: 'app-toasts',
    standalone: true,
    imports: [AsyncPipe],
    templateUrl: './toasts.html',
    styleUrl: './toasts.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toasts {
    protected toasts$: Observable<IToast[]>;

    constructor(private toastService: ToastService) {
        this.toasts$ = this.toastService.toasts$;
    }

    public onRemoveToast(event: Event, id: string): void {
        this.toastService.remove(id);
        event.stopPropagation();
    }
}
