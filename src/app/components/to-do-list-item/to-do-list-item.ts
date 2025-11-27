import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskStoreService, ToastService, TranslationService } from '../../services';
import { NOT_SELECTED_ITEM_ID } from '../../constants';
import { TranslatePipe } from '../../pipes';
import { ITask } from '../../interfaces';
import { EStatus } from '../../enums';
import { Button } from '../button';

@Component({
    selector: 'app-to-do-list-item',
    standalone: true,
    imports: [Button, NgClass, FormsModule, TranslatePipe],
    templateUrl: './to-do-list-item.html',
    styleUrl: './to-do-list-item.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItem {
    public task = input.required<ITask>();
    public selectedItemId = input(NOT_SELECTED_ITEM_ID);
    public selectedItemIdByDoubleClick = input(NOT_SELECTED_ITEM_ID);
    private translationService = inject(TranslationService);

    protected readonly delete = output<string>();
    protected readonly status = EStatus;

    constructor(
        private taskStore: TaskStoreService,
        private toastService: ToastService,
    ) {}

    protected onDelete(event: MouseEvent): void {
        event.stopPropagation();
        this.delete.emit(this.task().id);
    }

    protected get isSelected(): boolean {
        return this.task().id === this.selectedItemId();
    }

    protected get isEditableTitle(): boolean {
        return this.task().id === this.selectedItemIdByDoubleClick();
    }

    protected getNextStepButtonTooltip(status: EStatus): string {
        switch (status) {
            case EStatus.Pending:
                return this.translationService.instant('form.makeProgressing');
            case EStatus.InProgress:
                return this.translationService.instant('form.makeCompleted');
            default:
                return '';
        }
    }

    protected onUpdateTask(event: Event): void {
        event.preventDefault();
        event.stopPropagation();

        this.taskStore.updateTask(
            this.task(),
            () => {
                this.taskStore.setSelectedItemIdByDoubleClick(NOT_SELECTED_ITEM_ID);
                this.toastService.success(this.translationService.instant('form.updateSuccess'));
            },
            () => {
                this.taskStore.setSelectedItemIdByDoubleClick(NOT_SELECTED_ITEM_ID);
                this.toastService.error(this.translationService.instant('form.updateError'));
            },
        );
    }

    protected onChangeStatus(event: Event): void {
        event.preventDefault();
        event.stopPropagation();

        this.taskStore.updateTask(
            { ...this.task(), status: this.getNextStatus(this.task().status) },
            () => {
                this.toastService.success(this.translationService.instant('form.updateSuccess'));
            },
            () => {
                this.toastService.error(this.translationService.instant('form.updateError'));
            },
        );
    }

    private getNextStatus(status: EStatus): EStatus {
        switch (status) {
            case EStatus.Pending:
                return EStatus.InProgress;
            case EStatus.InProgress:
                return EStatus.Completed;
            default:
                return EStatus.Pending;
        }
    }
}
