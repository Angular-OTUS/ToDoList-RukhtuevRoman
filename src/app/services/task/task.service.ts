import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable, timer } from 'rxjs';
import { ITask, ITaskState } from '../../interfaces';
import { NOT_SELECTED_ITEM_ID } from '../../constants';
import { DEFAULT_TASK_STATE } from './constants';

@Injectable({ providedIn: 'root' })
export class TaskStoreService {
    private mockTasks: ITask[] = [
        {
            id: 1,
            text: 'Изучить JavaScript',
            description: 'Изучить основы языка программирования JavaScript: переменные, циклы, функции, ООП',
        },
        {
            id: 2,
            text: 'Изучить React',
            description: 'Изучить основы работы с библиотекой React: компоненты, хуки, роутер, работа с состоянием',
        },
        {
            id: 3,
            text: 'Изучить Angular',
            description: 'Изучить основы работы с фреймворком Angular: компоненты, директивы, сигналы, RxJS',
        },
    ];

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

    public initializeMockTasks(): void {
        this.setLoading(true);

        // Имитация загрузки данных
        timer(500).subscribe(() => {
            this.setTasks(this.mockTasks);
            this.setSelectedItemId(this.setInitialSelectedItem(this.mockTasks));
            this.setLoading(false);
        });
    }

    public setTasks(tasks: ITask[]): void {
        this.updateState({ tasks });
    }

    public addTask(text: string, description: string): void {
        this.updateState((state) => {
            const newTask: ITask = {
                id: this.nextId,
                text,
                description,
            };

            return { tasks: [...state.tasks, newTask] };
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
            selectedItemId: state.selectedItemId === taskId ? NOT_SELECTED_ITEM_ID : state.selectedItemId,
        }));
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

    private get nextId(): number {
        const tasks = [...this.taskStateSubject.value.tasks];

        if (tasks.length === 0) {
            return 1;
        }

        const maxId = Math.max(...tasks.map((task) => task.id));

        return maxId + 1;
    }
}
