import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TaskStoreService, ToastService } from '../../services';
import { COMMON_LABELS, FORM_LABELS, NOT_SELECTED_ITEM_ID } from '../../constants';
import { ITask } from '../../interfaces';
import { EStatus } from '../../enums';
import { FilterTasksPipe } from '../../pipes';
import { ToDoListItem } from '../to-do-list-item';
import { Loader } from '../loader';
import { ToDoCreateItem } from '../to-do-create-item';

@Component({
    selector: 'app-to-do-list',
    standalone: true,
    imports: [
        FormsModule,
        ToDoListItem,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        Loader,
        AsyncPipe,
        FilterTasksPipe,
        ToDoCreateItem,
    ],
    templateUrl: './to-do-list.html',
    styleUrl: './to-do-list.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoList implements OnInit {
    protected commonLabels: typeof COMMON_LABELS = COMMON_LABELS;
    protected formLabels: typeof FORM_LABELS = FORM_LABELS;

    protected tasks$: Observable<ITask[]>;
    protected isLoading$: Observable<boolean>;
    protected selectedItemId$: Observable<number>;
    protected selectedItemIdByDoubleClick$: Observable<number>;
    protected selectedTask$: Observable<ITask | undefined>;
    protected readonly notSelectedItemId = NOT_SELECTED_ITEM_ID;
    protected selectedByStatus: EStatus = EStatus.All;

    constructor(
        private taskStore: TaskStoreService,
        private toastService: ToastService,
    ) {
        this.tasks$ = this.taskStore.tasks$;
        this.isLoading$ = this.taskStore.isLoading$;
        this.selectedItemId$ = this.taskStore.selectedItemId$;
        this.selectedItemIdByDoubleClick$ = this.taskStore.selectedItemIdByDoubleClick$;
        this.selectedTask$ = this.taskStore.selectedTask$;
    }

    public ngOnInit(): void {
        this.initializeTasks();
    }

    private initializeTasks(): void {
        this.taskStore.loadTasks();
    }

    protected onDelete(taskId: number): void {
        this.taskStore.deleteTask(taskId);
        this.toastService.success(this.formLabels.deleteSuccess);
    }

    protected onSelectItem(id: number) {
        this.taskStore.setSelectedItemId(id);
    }

    protected onSelectItemByDoubleClick(id: number) {
        this.taskStore.setSelectedItemIdByDoubleClick(id);
    }

    protected readonly EStatus = EStatus;
}
