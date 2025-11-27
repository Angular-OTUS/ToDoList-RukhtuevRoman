import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { MatListItem, MatNavList } from '@angular/material/list';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { TranslatePipe } from '../../pipes';
import { INavItem } from '../../interfaces';
import { NAV_ITEMS } from '../../constants';

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [MatNavList, MatListItem, RouterLink, TranslatePipe],
    templateUrl: './navigation.html',
    styleUrl: './navigation.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navigation {
    private destroyRef = inject(DestroyRef);
    protected navItems: INavItem[] = NAV_ITEMS;
    private currentRoute = '';

    constructor(private router: Router) {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe((event: NavigationEnd) => {
                this.currentRoute = event.urlAfterRedirects;
            });
    }

    isActive(route: string): boolean {
        return this.currentRoute === route || this.currentRoute.startsWith(`${route}/`);
    }
}
