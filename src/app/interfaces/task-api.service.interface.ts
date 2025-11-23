import { Observable } from 'rxjs';
import { EStatus } from '../enums';
import { ITask } from './task.interface';

/**
 * Контракты для запросов к API
 */
export interface ITaskApiService {
    /**
     * Список задач по статусу
     * @param status - статус задачи
     */
    getTasksByStatus(status: EStatus): Observable<ITask[]>;

    /**
     * Добавление задачи
     * @param task - новая задача
     */
    createTask(task: Omit<ITask, 'id'>): Observable<ITask>;

    /**
     * Изменение задачи
     * @param task - изменяемая задача
     */
    updateTask(task: ITask): Observable<ITask>;

    /**
     * Удаление задачи
     * @param id - Идентификатор удаляемой задачи
     */
    deleteTask(id: string): Observable<void>;
}
