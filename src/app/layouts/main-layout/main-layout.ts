import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { Navigation } from '../../components';
import { TranslatePipe } from '../../pipes';
import { LanguageSwitcher } from '../../components/language-switcher';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [MatSidenavModule, MatToolbar, Navigation, TranslatePipe, LanguageSwitcher],
    templateUrl: './main-layout.html',
    styleUrl: './main-layout.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {
    title = input('');
}
