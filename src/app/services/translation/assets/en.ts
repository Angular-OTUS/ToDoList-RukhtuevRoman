import { ITranslation } from '../interfaces';

export const en: ITranslation = {
    app: {
        title: 'Task Manager',
    },
    language: {
        ru: 'RU',
        en: 'EN',
        select: 'Choose a language',
    },
    form: {
        deleteTooltip: 'Delete task',
        add: 'Add',
        addTooltip: 'Add task',
        save: 'Save',
        makeProgressing: 'Move to in progress',
        makeCompleted: 'Move to completed',
        addPlaceholder: 'Enter a new task',
        addDescriptionPlaceholder: 'Enter task description',
        listItemTooltip: 'Click, task description will appear on the right',
        addSuccess: 'Task added successfully!',
        addError: 'Error adding task!',
        deleteSuccess: 'Task deleted successfully!',
        deleteError: 'Error deleting task!',
        updateSuccess: 'Task updated successfully!',
        updateError: 'Error updating task!',
        changeStatusSuccess: 'Task status changed!',
        titleRequired: 'Task title is required',
        minLengthTitle: 'Minimum length: 3 characters',
        newTaskFormTitle: 'Create new task',
        noTasks: 'No tasks',
    },
    pages: {
        board: 'Board',
        backlog: 'Backlog',
    },
    status: {
        pending: 'Pending',
        inProgress: 'In Progress',
        completed: 'Completed',
    },
};
