import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainLayout } from '../../layouts';
import { ToDoBacklog } from '../../components';
import { TranslatePipe } from '../../pipes';

@Component({
    selector: 'app-backlog',
    standalone: true,
    imports: [MainLayout, ToDoBacklog, TranslatePipe],
    templateUrl: './backlog.html',
    styleUrl: './backlog.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Backlog {}
