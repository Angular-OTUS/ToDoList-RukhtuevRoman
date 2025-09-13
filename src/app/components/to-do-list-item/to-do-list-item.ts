import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { FORM_LABELS } from '../../constants';
import { ITask } from '../../interfaces';
import { Button } from '../button';
import { Tooltip } from '../../directives';

@Component({
    selector: 'app-to-do-list-item',
    standalone: true,
    imports: [Button, NgClass, Tooltip],
    templateUrl: './to-do-list-item.html',
    styleUrl: './to-do-list-item.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItem {
    @Input({ required: true })
    public task!: ITask;
    @Input()
    public selectedItemId?: number;
    @Output()
    protected readonly delete = new EventEmitter<number>();

    protected readonly formLabels = FORM_LABELS;

    protected onDelete(event: MouseEvent): void {
        event.stopPropagation();
        this.delete.emit(this.task.id);
    }

    protected get isSelected(): boolean {
        return this.task.id === this.selectedItemId;
    }
}
