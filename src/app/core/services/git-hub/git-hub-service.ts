import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GitCommit } from './git-commit.model';

@Injectable({
    providedIn: 'root'
})
export class GitHubService {
    private apiUrl = 'https://api.github.com/repos/DavidStoyanov/Angular-Web-Chat-Project/commits' + '?per_page=1&page=3'

    constructor(private httpClient: HttpClient) {}

    getCommits(): Observable<GitCommit[]> {
        return this.httpClient.get<GitCommit[]>(this.apiUrl);
    }
}
