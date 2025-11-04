import { Observable } from 'rxjs';
import { EStatus } from '../enums';
import { ITaskViewModel } from './task-view-model.interface';
import { ITask } from './task.interface';

/**
 * Контракты Store для управления состоянием
 */
export interface ITaskStoreService {
    /**
     * Общий поток состояния хранилища для UI
     */
    viewModel$: Observable<ITaskViewModel>;

    /**
     * Загрузка списка задач по статусу
     * @param status - статус задачи
     */
    loadTasksByStatus(status: EStatus): void;

    /**
     * Добавление задачи
     * @param task - новая задача
     * @param nextSuccess - метод, вызываемый в случае успешного добавления
     * @param nextError - метод, вызываемый в случае ошибки при добавлении
     */
    addTask(task: Omit<ITask, 'id'>, nextSuccess?: () => void, nextError?: () => void): void;

    /**
     * Изменение задачи
     * @param updatedTask - изменяемая задача
     * @param nextSuccess - метод, вызываемый в случае успешного изменения
     * @param nextError - метод, вызываемый в случае ошибки при изменении
     */
    updateTask(updatedTask: ITask, nextSuccess?: () => void, nextError?: () => void): void;

    /**
     * Удаление задачи
     * @param task - удаляемая задача
     * @param nextSuccess - метод, вызываемый в случае успешного удаления
     * @param nextError - метод, вызываемый в случае ошибки при удалении
     */
    deleteTask(task: ITask, nextSuccess?: () => void, nextError?: () => void): void;

    /**
     * Выделение задачи по клику
     * @param id - идентификатор задачи
     */
    setSelectedItemId(id: string): void;

    /**
     * Выделение задачи по двойному клику
     * @param id - идентификатор задачи
     */
    setSelectedItemIdByDoubleClick(id: string): void;
}
