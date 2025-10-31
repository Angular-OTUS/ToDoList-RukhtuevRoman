import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [],
    templateUrl: './modal.html',
    styleUrl: './modal.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modal {
    @Input()
    public isVisible: boolean = false;

    @Input()
    public title: string = '';

    @Output()
    public confirmed = new EventEmitter<void>();

    @Output()
    public closed = new EventEmitter<void>();

    protected onClose(): void {
        this.closed.emit();
    }

    protected onClickModalContent(event: MouseEvent): void {
        event.stopPropagation();
    }
}
