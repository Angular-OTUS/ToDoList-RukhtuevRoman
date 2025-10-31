import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PAGES } from '../../constants';
import { MainLayout } from '../../layouts';
import { ToDoBacklog } from '../../components';

@Component({
    selector: 'app-backlog',
    standalone: true,
    imports: [MainLayout, ToDoBacklog],
    templateUrl: './backlog.html',
    styleUrl: './backlog.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Backlog {
    protected pages = PAGES;
}
