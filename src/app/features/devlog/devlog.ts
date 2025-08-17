import { Subject, takeUntil } from 'rxjs';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';

import { GitHubService } from './../../core/services/git-hub/git-hub-service';
import { GitCommit } from './../../core/services/git-hub/git-commit.model';
import { FirstLinePipe } from '../../shared/pipes';


@Component({
  selector: 'app-devlog',
  imports: [MatExpansionModule, CommonModule, FirstLinePipe],
  templateUrl: './devlog.html',
  styleUrl: './devlog.scss'
})
export class Devlog implements OnInit, OnDestroy {
    private destroyed$ = new Subject<void>();

    readonly panelOpenState = signal(false);
    
    protected commits$: GitCommit[] = [];

    constructor(private gitHubService: GitHubService) {}

    ngOnInit(): void {
        this.gitHubService.getCommits().pipe(takeUntil(this.destroyed$)).subscribe(data => {
            this.commits$ = data;
        })
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

}
