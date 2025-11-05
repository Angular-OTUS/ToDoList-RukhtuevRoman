import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NOT_SELECTED_ITEM_ID, FORM_LABELS } from '../../constants';
import { TaskStoreService } from '../../services';
import { EStatus } from '../../enums';
import { ITaskViewModel } from '../../interfaces';
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
    protected viewModel$: Observable<ITaskViewModel>;
    protected readonly formLabels = FORM_LABELS;
    protected readonly status = EStatus;
    protected readonly notSelectedItemId = NOT_SELECTED_ITEM_ID;
    protected showNewTaskModal = false;

    constructor(
        private router: Router,
        private taskStore: TaskStoreService,
    ) {
        this.viewModel$ = this.taskStore.viewModel$;
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
