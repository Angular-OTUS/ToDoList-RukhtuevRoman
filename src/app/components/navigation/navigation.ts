import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { MatListItem, MatNavList } from '@angular/material/list';
import { filter } from 'rxjs/operators';
import { INavItem } from '../../interfaces';
import { NAV_ITEMS } from '../../constants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [MatNavList, MatListItem, RouterLink],
    templateUrl: './navigation.html',
    styleUrl: './navigation.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navigation {
    private destroyRef = inject(DestroyRef);
    protected navItems: INavItem[] = NAV_ITEMS;
    private currentRoute: string = '';

    constructor(private router: Router) {
        this.router.events
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                filter((event) => event instanceof NavigationEnd),
            )
            .subscribe((event: NavigationEnd) => {
                this.currentRoute = event.urlAfterRedirects;
            });
    }

    isActive(route: string): boolean {
        return this.currentRoute === route || this.currentRoute.startsWith(`${route}/`);
    }
}
