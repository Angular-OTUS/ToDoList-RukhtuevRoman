import { ITaskForm } from '../interfaces';
import { FormControl } from '@angular/forms';

export type TTaskFormControls = {
    [K in keyof ITaskForm]: FormControl<ITaskForm[K]>;
};
