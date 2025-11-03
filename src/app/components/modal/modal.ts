import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [],
    templateUrl: './modal.html',
    styleUrl: './modal.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modal {
    public isVisible = input(false);
    public title = input('');

    public closed = output<void>();

    protected onClose(): void {
        this.closed.emit();
    }

    protected onClickModalContent(event: MouseEvent): void {
        event.stopPropagation();
    }
}
