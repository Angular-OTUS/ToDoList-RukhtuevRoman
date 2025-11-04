import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask, ITaskApiService } from '../../interfaces';
import { API_URL } from '../../constants';
import { EStatus } from '../../enums';

@Injectable({ providedIn: 'root' })
export class TaskApiService implements ITaskApiService {
    constructor(private http: HttpClient) {}

    getTasksByStatus(status: EStatus): Observable<ITask[]> {
        return this.http.get<ITask[]>(`${API_URL}?status=${status}`);
    }

    createTask(task: Omit<ITask, 'id'>): Observable<ITask> {
        return this.http.post<ITask>(API_URL, task);
    }

    updateTask(task: ITask): Observable<ITask> {
        return this.http.put<ITask>(`${API_URL}/${task.id}`, task);
    }

    deleteTask(id: string): Observable<void> {
        return this.http.delete<void>(`${API_URL}/${id}`);
    }
}
