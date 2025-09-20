import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable } from 'rxjs';
import { ITask, ITaskState } from '../../interfaces';
import { DEFAULT_TASK_STATE } from './constants';

@Injectable({ providedIn: 'root' })
export class TaskStoreService {
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

    public selectedTask$: Observable<ITask | undefined> = combineLatest([this.tasks$, this.selectedItemId$]).pipe(
        map(([tasks, selectedId]) => tasks.find((task) => task.id === selectedId)),
        distinctUntilChanged(),
    );

    public setTasks(tasks: ITask[]): void {
        this.updateState({ tasks });
    }

    public addTask(text: string, description: string): void {
        this.updateState((state) => {
            const currentTasks = state.tasks;

            const newTask: ITask = {
                id: this.nextId,
                text,
                description,
            };

            return { tasks: [...currentTasks, newTask] };
        });
    }

    public updateTask(updatedTask: ITask): void {
        this.updateState((state) => ({
            tasks: state.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
        }));
    }

    public deleteTask(taskId: number): void {
        this.updateState((state) => ({
            tasks: state.tasks.filter((task) => task.id !== taskId),
            selectedItemId: state.selectedItemId === taskId ? -1 : state.selectedItemId,
        }));
    }

    public setLoading(isLoading: boolean): void {
        this.updateState({ isLoading });
    }

    public setSelectedItemId(id: number): void {
        this.updateState({ selectedItemId: id });
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

    private get nextId(): number {
        const tasks = [...this.taskStateSubject.value.tasks];

        if (tasks.length === 0) {
            return 1;
        }

        const maxId = Math.max(...tasks.map((task) => task.id));

        return maxId + 1;
    }
}
