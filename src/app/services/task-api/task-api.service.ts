import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from '../../interfaces';
import { API_URL } from '../../constants';

@Injectable({
    providedIn: 'root',
})
export class TaskApiService {
    constructor(private http: HttpClient) {}

    getTasks(): Observable<ITask[]> {
        return this.http.get<ITask[]>(API_URL);
    }

    getTaskById(id: number): Observable<ITask> {
        return this.http.get<ITask>(`${API_URL}/${id}`);
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
