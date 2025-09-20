import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timer } from 'rxjs';
import { COMMON_LABELS, FORM_LABELS } from '../../constants';
import { ITask } from '../../interfaces';
import { ToDoListItem } from '../to-do-list-item';
import { Loader } from '../loader';
import { Button } from '../button';

@Component({
    selector: 'app-to-do-list',
    standalone: true,
    imports: [FormsModule, ToDoListItem, MatFormFieldModule, MatInputModule, Loader, Button],
    templateUrl: './to-do-list.html',
    styleUrl: './to-do-list.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoList implements OnInit {
    protected tasks: ITask[] = [
        {
            id: 1,
            text: 'Изучить JavaScript',
            description: 'Изучить основы языка программирования JavaScript: переменные, циклы, функции, ООП',
        },
        {
            id: 2,
            text: 'Изучить React',
            description: 'Изучить основы работы с библиотекой React: компоненты, хуки, роутер, работа с состоянием',
        },
        {
            id: 3,
            text: 'Изучить Angular',
            description: 'Изучить основы работы с фреймворком Angular: компоненты, директивы, сигналы, RxJS',
        },
    ];
    protected isLoading: WritableSignal<boolean> = signal<boolean>(true);
    protected newTaskText: string = '';
    protected newTaskDescription: string = '';
    protected selectedItemId?: number;
    protected commonLabels: typeof COMMON_LABELS = COMMON_LABELS;
    protected formLabels: typeof FORM_LABELS = FORM_LABELS;

    constructor(private destroyRef: DestroyRef) {}

    public ngOnInit(): void {
        this.setInitialSelectedItem();

        timer(500)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
                this.isLoading.set(false);
            });
    }

    protected onAdd(): void {
        if (this.newTaskText.trim()) {
            const newTask: ITask = {
                id: this.nextId,
                text: this.newTaskText.trim(),
                description: this.newTaskDescription.trim(),
            };

            this.tasks.push(newTask);
            this.newTaskText = '';
        }
    }

    protected onDelete(taskId: number): void {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
    }

    protected onSelectItem(id: number) {
        this.selectedItemId = id;
    }

    protected get descriptionBySelectedItem(): string {
        const selectedItem = this.tasks.find((task) => task.id === this.selectedItemId);

        return selectedItem?.description || '';
    }

    private get nextId(): number {
        if (this.tasks.length === 0) {
            return 1;
        }
        const maxId = Math.max(...this.tasks.map((task) => task.id));

        return maxId + 1;
    }

    private setInitialSelectedItem(): void {
        this.selectedItemId = this.tasks.length > 0 ? Math.min(...this.tasks.map((task) => task.id)) : undefined;
    }
}
