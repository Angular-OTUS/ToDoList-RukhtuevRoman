import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { TaskStoreService, ToastService } from '../../services';
import { FORM_LABELS, NOT_SELECTED_ITEM_ID } from '../../constants';
import { ITask } from '../../interfaces';
import { Tooltip } from '../../directives';
import { EStatus } from '../../enums';
import { Button } from '../button';

@Component({
    selector: 'app-to-do-list-item',
    standalone: true,
    imports: [Button, NgClass, Tooltip, FormsModule, MatCheckbox],
    templateUrl: './to-do-list-item.html',
    styleUrl: './to-do-list-item.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItem {
    @Input({ required: true })
    public task!: ITask;
    @Input()
    public selectedItemId: string = NOT_SELECTED_ITEM_ID;
    @Input()
    public selectedItemIdByDoublClick: string = NOT_SELECTED_ITEM_ID;
    @Output()
    protected readonly delete = new EventEmitter<string>();

    protected readonly formLabels = FORM_LABELS;

    constructor(
        private taskStore: TaskStoreService,
        private toastService: ToastService,
    ) {}

    protected onDelete(event: MouseEvent): void {
        event.stopPropagation();
        this.delete.emit(this.task.id);
    }

    protected get isSelected(): boolean {
        return this.task.id === this.selectedItemId;
    }

    protected get isEditableTitle(): boolean {
        return this.task.id === this.selectedItemIdByDoublClick;
    }

    protected get isCompleted(): boolean {
        return this.task.status === EStatus.Completed;
    }

    protected onUpdateTask(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        this.taskStore.updateTask(this.task);
        this.taskStore.setSelectedItemIdByDoubleClick(NOT_SELECTED_ITEM_ID);
        this.toastService.success(this.formLabels.updateSuccess);
    }

    protected onChangeStatusTask(completed: boolean) {
        const status = completed ? EStatus.Completed : EStatus.InProgress;
        this.taskStore.updateTask({ ...this.task, status });
        this.toastService.success(this.formLabels.changeStatusSuccess);
    }
}
