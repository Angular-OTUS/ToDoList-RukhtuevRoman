import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NOT_SELECTED_ITEM_ID, FORM_LABELS } from '../../constants';
import { TaskStoreService } from '../../services';
import { EStatus } from '../../enums';
import { ITask } from '../../interfaces';
import { Loader } from '../loader';
import { ToDoGroup } from '../to-do-group';
import { ToDoCreateItem } from '../to-do-create-item';
import { Modal } from '../modal';
import { Button } from '../button';

@Component({
    selector: 'app-to-do-backlog',
    standalone: true,
    imports: [AsyncPipe, Loader, ToDoGroup, ToDoCreateItem, Modal, Button],
    templateUrl: './to-do-backlog.html',
    styleUrl: './to-do-backlog.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoBacklog implements OnInit {
    protected isLoading$: Observable<boolean>;
    protected tasksByStatus$: Observable<Record<EStatus, ITask[]>>;
    protected selectedItemId$: Observable<string>;
    protected selectedTask$: Observable<ITask | undefined>;
    protected selectedItemIdByDoubleClick$: Observable<string>;
    protected readonly formLabels = FORM_LABELS;
    protected readonly status = EStatus;
    protected readonly notSelectedItemId = NOT_SELECTED_ITEM_ID;
    protected showNewTaskModal = false;

    constructor(
        private router: Router,
        private taskStore: TaskStoreService,
    ) {
        this.tasksByStatus$ = this.taskStore.tasksByStatus$;
        this.isLoading$ = this.taskStore.isLoading$;
        this.selectedItemId$ = this.taskStore.selectedItemId$;
        this.selectedTask$ = this.taskStore.selectedTask$;
        this.selectedItemIdByDoubleClick$ = this.taskStore.selectedItemIdByDoubleClick$;
    }

    public ngOnInit(): void {
        this.initializeTasks();
    }

    protected onShowNewTaskModal(): void {
        this.showNewTaskModal = true;
    }

    protected onCloseNewTaskModal(): void {
        this.showNewTaskModal = false;
    }

    private initializeTasks(): void {
        this.taskStore.loadTasksByStatus(EStatus.Pending);
    }
}
