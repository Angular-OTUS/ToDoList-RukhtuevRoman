import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FORM_LABELS } from '../../constants';
import { TaskStoreService, ToastService } from '../../services';
import { EStatus } from '../../enums';
import { Button } from '../button';
import { ITaskForm } from './interfaces';
import { TTaskFormControls } from './types';

@Component({
    selector: 'app-to-do-create-item',
    standalone: true,
    imports: [Button, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule],
    templateUrl: './to-do-create-item.html',
    styleUrl: './to-do-create-item.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoCreateItem {
    @Output()
    public formSent = new EventEmitter<void>();

    private fb = inject(FormBuilder);
    protected taskForm: FormGroup<TTaskFormControls>;
    protected readonly formLabels = FORM_LABELS;

    constructor(
        private taskStore: TaskStoreService,
        private toastService: ToastService,
    ) {
        this.taskForm = this.fb.group<TTaskFormControls>({
            text: new FormControl('', {
                validators: [Validators.required, Validators.minLength(3)],
                nonNullable: true,
            }),
            description: new FormControl('', { nonNullable: true }),
        });
    }

    protected onAdd(): void {
        if (this.taskForm.valid) {
            const formValue = this.taskForm.value as ITaskForm;

            const task = {
                text: formValue.text.trim(),
                description: formValue.description.trim(),
                status: EStatus.Pending,
            };

            this.taskStore.addTask(
                task,
                () => {
                    this.toastService.success(this.formLabels.addSuccess);
                },
                () => {
                    this.toastService.success(this.formLabels.addError);
                },
            );
            this.taskForm.reset();
            this.formSent.emit();
        }
    }
}
