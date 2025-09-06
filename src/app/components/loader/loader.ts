import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TLoaderColor } from './types';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-loader',
    standalone: true,
    imports: [MatProgressSpinnerModule],
    templateUrl: './loader.html',
    styleUrl: './loader.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Loader {
    @Input()
    public isLoading: boolean = false;
    @Input()
    public diameter: number = 50;
    @Input()
    public color: TLoaderColor = 'primary';
}
