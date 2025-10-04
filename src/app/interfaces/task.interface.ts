import { EStatus } from '../enums';

export interface ITask {
    id: string;
    text: string;
    description: string;
    status: EStatus;
}
