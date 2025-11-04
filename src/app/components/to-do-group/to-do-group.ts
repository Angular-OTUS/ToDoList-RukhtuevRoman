import { ChangeDetectionStrategy, Component, input } from '@angular/core';
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
    public title = input('');
    public tasks = input<ITask[]>([]);
    public selectedItemId = input(NOT_SELECTED_ITEM_ID);
    public selectedItemIdByDoubleClick = input(NOT_SELECTED_ITEM_ID);

    protected formLabels = FORM_LABELS;

    constructor(
        private taskStore: TaskStoreService,
        private toastService: ToastService,
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
