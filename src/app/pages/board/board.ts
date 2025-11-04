import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainLayout } from '../../layouts';
import { PAGES } from '../../constants';
import { ToDoBoard } from '../../components';

@Component({
    selector: 'app-board',
    standalone: true,
    imports: [MainLayout, ToDoBoard],
    templateUrl: './board.html',
    styleUrl: './board.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Board {
    protected pages = PAGES;
}
