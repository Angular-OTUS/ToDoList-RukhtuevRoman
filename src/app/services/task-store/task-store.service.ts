import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, catchError, combineLatest, distinctUntilChanged, map, Observable, take, tap } from 'rxjs';
import { ITask, ITaskState } from '../../interfaces';
import { NOT_SELECTED_ITEM_ID } from '../../constants';
import { EStatus } from '../../enums';
import { TaskApiService } from '../task-api';
import { DEFAULT_TASK_STATE } from './constants';

@Injectable({ providedIn: 'root' })
export class TaskStoreService {
    private destroyRef = inject(DestroyRef);
    private taskApiService = inject(TaskApiService);

    private taskStateSubject = new BehaviorSubject<ITaskState>(DEFAULT_TASK_STATE);

    public tasks$: Observable<ITask[]> = this.taskStateSubject.pipe(
        map((state) => state.tasks),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
    );

    public isLoading$: Observable<boolean> = this.taskStateSubject.pipe(
        map((state) => state.isLoading),
        distinctUntilChanged(),
    );

    public selectedItemId$: Observable<number> = this.taskStateSubject.pipe(
        map((state) => state.selectedItemId),
        distinctUntilChanged(),
    );

    public selectedItemIdByDoubleClick$: Observable<number> = this.taskStateSubject.pipe(
        map((state) => state.selectedItemIdByDoubleClick),
        distinctUntilChanged(),
    );

    public selectedTask$: Observable<ITask | undefined> = combineLatest([this.tasks$, this.selectedItemId$]).pipe(
        map(([tasks, selectedId]) => tasks.find((task) => task.id === selectedId)),
        distinctUntilChanged(),
    );

    public loadTasks(): void {
        this.setLoading(true);

        this.taskApiService
            .getTasks()
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                tap((tasks) => {
                    this.setTasks(tasks);
                    this.setSelectedItemId(this.setInitialSelectedItem(tasks));
                    this.setLoading(false);
                }),
                catchError((error) => {
                    console.error('Error loading tasks:', error);
                    this.setLoading(false);
                    return [];
                }),
            )
            .subscribe();
    }

    public addTask(text: string, description: string, status: EStatus): void {
        this.setLoading(true);

        const newTaskData = {
            text: text.trim(),
            description: description.trim(),
            status,
        };

        this.taskApiService
            .createTask(newTaskData)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                tap((newTask) => {
                    this.updateState((state) => ({
                        tasks: [...state.tasks, newTask],
                    }));
                    this.setLoading(false);
                }),
                catchError((error) => {
                    console.error('Error adding task:', error);
                    this.setLoading(false);
                    return [];
                }),
            )
            .subscribe();
    }

    public updateTask(updatedTask: ITask): void {
        this.setLoading(true);

        this.taskApiService
            .updateTask(updatedTask)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                tap((updatedTask) => {
                    this.updateState((state) => ({
                        tasks: state.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
                    }));
                    this.setLoading(false);
                }),
                catchError((error) => {
                    console.error('Error updating task:', error);
                    this.setLoading(false);
                    return [];
                }),
            )
            .subscribe();
    }

    public deleteTask(taskId: number): void {
        this.setLoading(true);

        this.taskApiService
            .deleteTask(taskId)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                tap(() => {
                    this.updateState((state) => ({
                        tasks: state.tasks.filter((task) => task.id !== taskId),
                        selectedItemId: state.selectedItemId === taskId ? NOT_SELECTED_ITEM_ID : state.selectedItemId,
                    }));
                    this.setLoading(false);
                }),
                catchError((error) => {
                    console.error('Error deleting task:', error);
                    this.setLoading(false);
                    return [];
                }),
            )
            .subscribe();
    }

    public setTasks(tasks: ITask[]): void {
        this.updateState({ tasks });
    }

    public setLoading(isLoading: boolean): void {
        this.updateState({ isLoading });
    }

    public setSelectedItemId(id: number): void {
        this.updateState({ selectedItemId: id });
    }

    public setSelectedItemIdByDoubleClick(id: number): void {
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

    public getCurrentTasks(): ITask[] {
        return this.taskStateSubject.value.tasks;
    }

    private setInitialSelectedItem(tasks: ITask[]): number {
        return tasks.length > 0 ? Math.min(...tasks.map((task) => task.id)) : NOT_SELECTED_ITEM_ID;
    }
}
