import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NOT_SELECTED_ITEM_ID, STATUS_LABELS } from '../../constants';
import { TaskStoreService } from '../../services';
import { ITask } from '../../interfaces';
import { EStatus } from '../../enums';
import { Loader } from '../loader';
import { ToDoGroup } from '../to-do-group';

@Component({
    selector: 'app-to-do-board',
    standalone: true,
    imports: [AsyncPipe, Loader, ToDoGroup],
    templateUrl: './to-do-board.html',
    styleUrl: './to-do-board.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoBoard implements OnInit {
    protected isLoading$: Observable<boolean>;
    protected tasksByStatus$: Observable<Record<EStatus, ITask[]>>;
    protected selectedItemIdByDoubleClick$: Observable<string>;
    protected readonly statusLabels = STATUS_LABELS;
    protected readonly status = EStatus;
    protected readonly notSelectedItemId: string = NOT_SELECTED_ITEM_ID;

    constructor(
        private router: Router,
        private taskStore: TaskStoreService,
    ) {
        this.tasksByStatus$ = this.taskStore.tasksByStatus$;
        this.isLoading$ = this.taskStore.isLoading$;
        this.selectedItemIdByDoubleClick$ = this.taskStore.selectedItemIdByDoubleClick$;
    }

    public ngOnInit(): void {
        this.initializeTasks();
    }

    private initializeTasks(): void {
        this.taskStore.loadTasksByStatus(EStatus.InProgress);
        this.taskStore.loadTasksByStatus(EStatus.Pending);
        this.taskStore.loadTasksByStatus(EStatus.Completed);
    }
}
