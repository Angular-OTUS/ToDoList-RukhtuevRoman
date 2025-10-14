import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { NOT_SELECTED_ITEM_ID } from '../../constants';
import { TaskStoreService } from '../../services';
import { ITask } from '../../interfaces';

@Component({
    selector: 'app-to-do-item-view',
    standalone: true,
    imports: [AsyncPipe],
    templateUrl: './to-do-item-view.html',
    styleUrl: './to-do-item-view.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoItemView implements OnInit, OnDestroy {
    protected readonly notSelectedItemId = NOT_SELECTED_ITEM_ID;
    protected selectedTask$: Observable<ITask | undefined>;
    private destroy$ = new Subject<void>();

    constructor(
        private route: ActivatedRoute,
        private taskStore: TaskStoreService,
    ) {
        this.selectedTask$ = this.taskStore.selectedTask$;
    }

    public ngOnInit(): void {
        this.route.paramMap
            .pipe(
                takeUntil(this.destroy$),
                tap((params) => {
                    const taskId = params.get('id') || this.notSelectedItemId;
                    this.taskStore.setSelectedItemId(taskId);
                }),
            )
            .subscribe();
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
