import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FORM_LABELS } from '../../constants';
import { ITask } from '../../interfaces';

@Component({
    selector: 'app-to-do-list-item',
    standalone: true,
    imports: [],
    templateUrl: './to-do-list-item.html',
    styleUrl: './to-do-list-item.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItem {
    @Input({ required: true })
    public task!: ITask;
    @Output()
    protected readonly delete = new EventEmitter<number>();

    protected readonly formLabels = FORM_LABELS;

    protected onDelete() {
        this.delete.emit(this.task.id);
    }
}
