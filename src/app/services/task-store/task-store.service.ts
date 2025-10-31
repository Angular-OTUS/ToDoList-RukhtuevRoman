import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, combineLatest, delay, distinctUntilChanged, map, Observable, tap } from 'rxjs';
import { isEqual } from 'lodash';
import { ITask, ITaskState } from '../../interfaces';
import { NOT_SELECTED_ITEM_ID } from '../../constants';
import { EStatus } from '../../enums';
import { TaskApiService } from '../task-api';
import { DEFAULT_TASK_STATE, DELAY_TIME } from './constants';

@Injectable({ providedIn: 'root' })
export class TaskStoreService {
    private destroyRef = inject(DestroyRef);
    private taskApiService = inject(TaskApiService);

    private taskStateSubject = new BehaviorSubject<ITaskState>(DEFAULT_TASK_STATE);

    public tasksByStatus$: Observable<Record<EStatus, ITask[]>> = this.taskStateSubject.pipe(
        map((state) => state.tasksByStatus),
        distinctUntilChanged(isEqual),
    );

    public isLoading$: Observable<boolean> = this.taskStateSubject.pipe(
        map((state) => state.isLoading),
        distinctUntilChanged(),
    );

    public selectedItemId$: Observable<string> = this.taskStateSubject.pipe(
        map((state) => state.selectedItemId),
        distinctUntilChanged(),
    );

    public selectedItemIdByDoubleClick$: Observable<string> = this.taskStateSubject.pipe(
        map((state) => state.selectedItemIdByDoubleClick),
        distinctUntilChanged(),
    );

    public selectedTask$: Observable<ITask | undefined> = combineLatest([
        this.tasksByStatus$,
        this.selectedItemId$,
    ]).pipe(
        map(([tasksByStatus, selectedId]) => tasksByStatus[EStatus.Pending].find((task) => task.id === selectedId)),
        distinctUntilChanged(),
    );

    public loadTasksByStatus(status: EStatus): void {
        this.setLoading(true);

        this.taskApiService
            .getTasksByStatus(status)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                delay(DELAY_TIME),
                tap({
                    next: (tasks: ITask[]): void => {
                        this.updateState({
                            tasksByStatus: this.setTasksByStatus(status, tasks),
                            isLoading: false,
                        });
                    },
                    error: (): void => {
                        this.updateState({
                            tasksByStatus: this.setTasksByStatus(status),
                            isLoading: false,
                        });
                    },
                }),
            )
            .subscribe();
    }

    public updateTask(updatedTask: ITask, nextSuccess?: () => void, nextError?: () => void): void {
        this.setLoading(true);

        this.taskApiService
            .updateTask(updatedTask)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                delay(DELAY_TIME),
                tap({
                    next: (updatedTask: ITask) => {
                        const state = this.taskStateSubject.value;
                        const tasksByStatus = { ...state.tasksByStatus };
                        const status = updatedTask.status;

                        const tasksByCurrentStatus = [...state.tasksByStatus[status]];
                        const taskIndex = tasksByCurrentStatus.findIndex((task) => task.id === updatedTask.id);
                        if (taskIndex === -1) {
                            tasksByCurrentStatus.push(updatedTask);
                        } else {
                            tasksByCurrentStatus[taskIndex] = updatedTask;
                        }

                        Object.entries(tasksByStatus).forEach(([key, tasks]) => {
                            if (key !== status) {
                                tasksByStatus[key as keyof typeof tasksByStatus] = tasks.filter(
                                    (task) => task.id !== updatedTask.id,
                                );
                            }
                        });
                        this.updateState({
                            // tasks: state.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
                            tasksByStatus: { ...tasksByStatus, [status]: tasksByCurrentStatus },
                            isLoading: false,
                        });
                        nextSuccess?.();
                    },
                    error: (error) => {
                        this.updateState({
                            isLoading: false,
                        });
                        nextError?.();
                    },
                }),
            )
            .subscribe();
    }

    public addTask(task: Omit<ITask, 'id'>, nextSuccess?: () => void, nextError?: () => void): void {
        this.setLoading(true);

        this.taskApiService
            .createTask(task)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                delay(DELAY_TIME),
                tap({
                    next: (task: ITask): void => {
                        const tasksByStatus = this.taskStateSubject.value.tasksByStatus;
                        this.updateState({
                            tasksByStatus: { ...tasksByStatus, [task.status]: [...tasksByStatus[task.status], task] },
                            isLoading: false,
                        });
                        nextSuccess?.();
                    },
                    error: (): void => {
                        this.updateState({
                            isLoading: false,
                        });
                        nextError?.();
                    },
                }),
            )
            .subscribe();
    }

    public deleteTask(task: ITask, nextSuccess?: () => void, nextError?: () => void): void {
        this.setLoading(true);

        this.taskApiService
            .deleteTask(task.id)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                delay(DELAY_TIME),
                tap({
                    next: (): void => {
                        const selectedItemId = this.taskStateSubject.value.selectedItemId;
                        const tasksByStatus = this.taskStateSubject.value.tasksByStatus;
                        this.updateState({
                            tasksByStatus: {
                                ...tasksByStatus,
                                [task.status]: tasksByStatus[task.status].filter(
                                    (filteredTask) => filteredTask.id !== task.id,
                                ),
                            },
                            selectedItemId: selectedItemId === task.id ? NOT_SELECTED_ITEM_ID : selectedItemId,
                            isLoading: false,
                        });
                        nextSuccess?.();
                    },
                    error: (): void => {
                        this.updateState({
                            isLoading: false,
                        });
                        nextError?.();
                    },
                }),
            )
            .subscribe();
    }

    private setTasksByStatus(status: EStatus, tasks?: ITask[]): ITaskState['tasksByStatus'] {
        const previousState = this.taskStateSubject.value;
        return { ...previousState.tasksByStatus, [status]: tasks || [] };
    }

    public setLoading(isLoading: boolean): void {
        this.updateState({ isLoading });
    }

    public setSelectedItemId(id: string): void {
        this.updateState({ selectedItemId: id });
    }

    public setSelectedItemIdByDoubleClick(id: string): void {
        this.updateState({ selectedItemIdByDoubleClick: id });
    }

    private updateState(updater: Partial<ITaskState> | ((state: ITaskState) => Partial<ITaskState>)): void {
        const currentState = this.taskStateSubject.value;
        const newState =
            typeof updater === 'function'
                ? { ...currentState, ...updater(currentState) }
                : { ...currentState, ...updater };

        this.taskStateSubject.next(newState);
    }
}
