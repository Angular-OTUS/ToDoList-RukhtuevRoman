import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
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
    public class = input('button');
    public disabled = input(false);
    public tooltipText = input('');

    protected readonly click = output<MouseEvent>();

    protected onClick(event: MouseEvent) {
        this.click.emit(event);
    }
}
