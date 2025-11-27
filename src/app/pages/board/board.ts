import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainLayout } from '../../layouts';
import { ToDoBoard } from '../../components';
import { TranslatePipe } from '../../pipes';

@Component({
    selector: 'app-board',
    standalone: true,
    imports: [MainLayout, ToDoBoard, TranslatePipe],
    templateUrl: './board.html',
    styleUrl: './board.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Board {}
