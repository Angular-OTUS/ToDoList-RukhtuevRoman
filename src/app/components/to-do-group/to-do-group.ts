import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TaskStoreService, ToastService } from '../../services';
import { FORM_LABELS, NOT_SELECTED_ITEM_ID } from '../../constants';
import { ITask } from '../../interfaces';
import { ToDoListItem } from '../to-do-list-item';

@Component({
    selector: 'app-to-do-group',
    standalone: true,
    imports: [ToDoListItem],
    templateUrl: './to-do-group.html',
    styleUrl: './to-do-group.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoGroup {
    @Input()
    public title: string = '';

    @Input()
    public tasks: ITask[] = [];

    @Input()
    public selectedItemId: string = NOT_SELECTED_ITEM_ID;

    @Input()
    public selectedItemIdByDoubleClick: string = NOT_SELECTED_ITEM_ID;

    protected formLabels = FORM_LABELS;

    constructor(
        private taskStore: TaskStoreService,
        private toastService: ToastService,
        private router: Router,
    ) {}

    protected onDelete(task: ITask): void {
        this.taskStore.deleteTask(task, () => {
            this.toastService.success(this.formLabels.deleteSuccess);
        });
    }

    protected onSelectItemByClick(id: string): void {
        this.taskStore.setSelectedItemId(id);
    }

    protected onSelectItemByDoubleClick(id: string) {
        this.taskStore.setSelectedItemIdByDoubleClick(id);
    }
}
