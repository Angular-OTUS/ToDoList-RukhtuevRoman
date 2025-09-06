import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [],
    templateUrl: './button.html',
    styleUrl: './button.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
    @Input()
    public title: string = '';
    @Input()
    public class: string = 'button';
    @Input()
    public disabled: boolean = false;

    @Output()
    protected readonly click = new EventEmitter<void>();

    protected onClick() {
        this.click.emit();
    }
}
