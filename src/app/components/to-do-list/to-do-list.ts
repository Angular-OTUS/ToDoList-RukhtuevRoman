import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { Observable, timer } from 'rxjs';
import { TaskStoreService, ToastService } from '../../services';
import { COMMON_LABELS, FORM_LABELS } from '../../constants';
import { ITask } from '../../interfaces';
import { ToDoListItem } from '../to-do-list-item';
import { Loader } from '../loader';
import { Button } from '../button';
import { tasks } from './constants';

@Component({
    selector: 'app-to-do-list',
    standalone: true,
    imports: [FormsModule, ToDoListItem, MatFormFieldModule, MatInputModule, Loader, Button, AsyncPipe],
    templateUrl: './to-do-list.html',
    styleUrl: './to-do-list.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoList implements OnInit {
    protected newTaskText: string = '';
    protected newTaskDescription: string = '';
    protected commonLabels: typeof COMMON_LABELS = COMMON_LABELS;
    protected formLabels: typeof FORM_LABELS = FORM_LABELS;

    protected tasks$: Observable<ITask[]>;
    protected isLoading$: Observable<boolean>;
    protected selectedItemId$: Observable<number>;
    protected selectedTask$: Observable<ITask | undefined>;

    constructor(
        private taskStore: TaskStoreService,
        private toastService: ToastService,
        private destroyRef: DestroyRef,
    ) {
        this.tasks$ = this.taskStore.tasks$;
        this.isLoading$ = this.taskStore.isLoading$;
        this.selectedItemId$ = this.taskStore.selectedItemId$;
        this.selectedTask$ = this.taskStore.selectedTask$;
    }

    public ngOnInit(): void {
        this.initializeTasks();
    }

    private initializeTasks(): void {
        this.taskStore.setLoading(true);

        timer(500)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.taskStore.setTasks(tasks);
                this.taskStore.setSelectedItemId(this.setInitialSelectedItem(tasks));
                this.taskStore.setLoading(false);
            });
    }

    protected onAdd(event: Event): void {
        event.preventDefault();
        event.stopPropagation();

        if (this.newTaskText.trim()) {
            this.taskStore.addTask(this.newTaskText, this.newTaskDescription);
            this.newTaskText = '';
            this.newTaskDescription = '';
            this.toastService.success(this.formLabels.addSuccess);
        }
    }

    protected onDelete(taskId: number): void {
        this.taskStore.deleteTask(taskId);
        this.toastService.success(this.formLabels.deleteSuccess);
    }

    protected onSelectItem(id: number) {
        this.taskStore.setSelectedItemId(id);
    }

    private setInitialSelectedItem(tasks: ITask[]): number {
        return tasks.length > 0 ? Math.min(...tasks.map((task) => task.id)) : -1;
    }
}
