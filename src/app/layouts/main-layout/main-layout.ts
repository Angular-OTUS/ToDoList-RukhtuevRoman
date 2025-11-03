import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { COMMON_LABELS } from '../../constants';
import { Navigation } from '../../components';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [MatSidenavModule, MatToolbar, Navigation],
    templateUrl: './main-layout.html',
    styleUrl: './main-layout.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {
    title = input('');

    protected commonLabels = COMMON_LABELS;
}
