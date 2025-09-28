import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '../interfaces';
import { EStatus } from '../enums';

@Pipe({
    name: 'filterTasks',
    standalone: true,
})
export class FilterTasksPipe implements PipeTransform {
    transform(tasks: ITask[] | null, status: EStatus): ITask[] {
        if (!tasks) return [];
        if (status === EStatus.All) return tasks;
        return tasks.filter((task) => task.status === status);
    }
}
