import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { COMMON_LABELS, FORM_LABELS } from '../../constants';
import { ITask } from './interfaces';

@Component({
    selector: 'app-to-do-list',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './to-do-list.html',
    styleUrl: './to-do-list.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoList {
    protected tasks: ITask[] = [
        { id: 1, text: 'Изучить JavaScript' },
        { id: 2, text: 'Изучить React' },
        { id: 3, text: 'Изучить Angular' },
        { id: 3, text: 'Работать фронтенд-разработчиком' },
    ];
    protected newTaskText: string = '';
    protected commonLabels: typeof COMMON_LABELS = COMMON_LABELS;
    protected formLabels: typeof FORM_LABELS = FORM_LABELS;

    protected onAdd(): void {
        if (this.newTaskText.trim()) {
            const newTask: ITask = {
                id: Date.now(),
                text: this.newTaskText.trim(),
            };

            this.tasks.push(newTask);
            this.newTaskText = '';
        }
    }

    protected onDelete(taskId: number): void {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
    }
}
