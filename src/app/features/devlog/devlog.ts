import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Subject, takeUntil } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';

import { GitHubService } from './../../core/services/git-hub/git-hub-service';
import { GitCommit } from './../../core/services/git-hub/git-commit.model';
import { FirstLinePipe } from '../../shared/pipes';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CalendarFilter } from './devlog.model';



@Component({
    selector: 'app-devlog',
    providers: [provideNativeDateAdapter()],
    imports: [
        CommonModule,
        FormsModule,
        MatExpansionModule,
        FirstLinePipe,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatButtonModule
    ],
    templateUrl: './devlog.html',
    styleUrl: './devlog.scss',
    //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Devlog implements OnInit, OnDestroy {
    private destroyed$ = new Subject<void>();

    //readonly panelOpenState = signal(false);

    protected commits: GitCommit[] = [];
    protected filteredCommits: GitCommit[] = [];
    protected calendarFilter: CalendarFilter;

    constructor(private gitHubService: GitHubService,
                private router: Router,
                private route: ActivatedRoute) {
        this.calendarFilter = {
            startDate: '',
            endDate: '',
            isEnabled: false
        }

    }

    toggleFilter(): void {
        this.calendarFilter.isEnabled = 
            !this.calendarFilter.isEnabled;
    }

    applyDateFilter(): void {
        this.filteredCommits = this.commits.filter((x: GitCommit) => {
            if (!this.calendarFilter.isEnabled) return x;
            if (!this.calendarFilter.startDate && !this.calendarFilter.endDate) return x;

            const itemDate = new Date(x.commit.author.date);
            const startDate = new Date(this.calendarFilter.startDate);
            const endDate = new Date(this.calendarFilter.endDate);

            console.log([this.calendarFilter.startDate, this.calendarFilter.endDate])
            
            this.updateQueryParams();


            if (!this.calendarFilter.endDate) {
                return itemDate >= startDate
            } else {
                return itemDate >= startDate && itemDate <= endDate;
            }
        });
    };

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            const startDate = params['start'] ? new Date(params['start']) : null;
            const endDate = params['end'] ? new Date(params['end']) : null;

            this.gitHubService.getCommits()
            .pipe(takeUntil(this.destroyed$))
            .subscribe(data => {
                this.commits = data;
                this.applyDateFilter();
            });
        });
    
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    private updateQueryParams(): void {
        const start = new Date(this.calendarFilter.startDate).toISOString();
        const end = this.calendarFilter.endDate ?
                new Date(this.calendarFilter.endDate).toISOString() : null ;

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { start, end },
            queryParamsHandling: 'merge'
        });
    }
}
