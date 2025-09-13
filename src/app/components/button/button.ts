import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Tooltip } from '../../directives';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [Tooltip],
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
    @Input()
    public tooltipText: string = '';

    @Output()
    protected readonly click = new EventEmitter<MouseEvent>();

    protected onClick(event: MouseEvent) {
        this.click.emit(event);
    }
}
