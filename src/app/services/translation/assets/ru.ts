import { ITranslation } from '../interfaces';

export const ru: ITranslation = {
    app: {
        title: 'Менеджер задач',
    },
    language: {
        ru: 'RU',
        en: 'EN',
        select: 'Выбрать язык',
    },
    form: {
        deleteTooltip: 'Удалить задачу',
        add: 'Добавить',
        addTooltip: 'Добавить задачу',
        save: 'Сохранить',
        makeProgressing: 'Перенести в действующие',
        makeCompleted: 'Перенести в завершенные',
        addPlaceholder: 'Введите новую задачу',
        addDescriptionPlaceholder: 'Введите описание задачи',
        listItemTooltip: 'Кликните, справа появится описание задачи',
        addSuccess: 'Задача добавлена успешно!',
        addError: 'Ошибка при добавлении задачи!',
        deleteSuccess: 'Задача удалена успешно!',
        deleteError: 'Ошибка при удалении задачи!',
        updateSuccess: 'Задача обновлена успешно!',
        updateError: 'Ошибка при обновлении задачи!',
        changeStatusSuccess: 'Статус задачи изменен!',
        titleRequired: 'Название задачи обязательно',
        minLengthTitle: 'Минимальная длина: 3 символа',
        newTaskFormTitle: 'Создание новой задачи',
        noTasks: 'Нет задач',
    },
    pages: {
        board: 'Доска',
        backlog: 'Бэклог',
    },
    status: {
        pending: 'В ожидании',
        inProgress: 'Действующие',
        completed: 'Завершенные',
    },
};
