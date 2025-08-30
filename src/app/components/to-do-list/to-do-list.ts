import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { COMMON_LABELS, FORM_LABELS } from '../../constants';
import { ITask } from '../../interfaces';
import { ToDoListItem } from '../to-do-list-item';

@Component({
    selector: 'app-to-do-list',
    standalone: true,
    imports: [FormsModule, ToDoListItem, MatFormFieldModule, MatInputModule],
    templateUrl: './to-do-list.html',
    styleUrl: './to-do-list.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoList {
    protected tasks: ITask[] = [
        { id: 1, text: 'Изучить JavaScript' },
        { id: 2, text: 'Изучить React' },
        { id: 3, text: 'Изучить Angular' },
        { id: 4, text: 'Работать фронтенд-разработчиком' },
    ];
    protected newTaskText: string = '';
    protected commonLabels: typeof COMMON_LABELS = COMMON_LABELS;
    protected formLabels: typeof FORM_LABELS = FORM_LABELS;

    protected onAdd(): void {
        if (this.newTaskText.trim()) {
            const newTask: ITask = {
                id: this.nextId,
                text: this.newTaskText.trim(),
            };

            this.tasks.push(newTask);
            this.newTaskText = '';
        }
    }

    protected onDelete(taskId: number): void {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
    }

    private get nextId(): number {
        if (this.tasks.length === 0) {
            return 1;
        }
        const maxId = Math.max(...this.tasks.map((task) => task.id));

        return maxId + 1;
    }
}
