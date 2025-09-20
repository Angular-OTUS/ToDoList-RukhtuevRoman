import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FORM_LABELS } from '../../constants';
import { ITask } from '../../interfaces';
import { Tooltip } from '../../directives';
import { TaskStoreService } from '../../services';
import { Button } from '../button';

@Component({
    selector: 'app-to-do-list-item',
    standalone: true,
    imports: [Button, NgClass, Tooltip, FormsModule],
    templateUrl: './to-do-list-item.html',
    styleUrl: './to-do-list-item.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItem {
    @Input({ required: true })
    public task!: ITask;
    @Input()
    public selectedItemId: number = -1;
    @Output()
    protected readonly delete = new EventEmitter<number>();

    protected readonly formLabels = FORM_LABELS;
    protected isEditableTitle: boolean = false;

    constructor(private taskStore: TaskStoreService) {}

    protected setEditableTitle() {
        this.isEditableTitle = true;
    }

    protected onDelete(event: MouseEvent): void {
        event.stopPropagation();
        this.delete.emit(this.task.id);
    }

    protected get isSelected(): boolean {
        return this.task.id === this.selectedItemId;
    }

    protected onUpdateTask(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        this.taskStore.updateTask(this.task);
        this.isEditableTitle = false;
    }
}
