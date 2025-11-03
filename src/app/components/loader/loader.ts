import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TLoaderColor } from './types';

@Component({
    selector: 'app-loader',
    standalone: true,
    imports: [MatProgressSpinnerModule],
    templateUrl: './loader.html',
    styleUrl: './loader.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Loader {
    public isLoading = input(false);
    public diameter = input(50);
    public color = input<TLoaderColor>('primary');
}
