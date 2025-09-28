import { EStatus } from '../enums';

export interface ITask {
    id: number;
    text: string;
    description: string;
    status: EStatus;
}
