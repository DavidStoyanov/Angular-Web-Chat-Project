import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GitCommit } from './git-commit.model';

@Injectable({
    providedIn: 'root'
})
export class GitHubService {
    private apiUrl = 'https://api.github.com/repos/DavidStoyanov/Angular-Web-Chat-Project/commits' //+ '?per_page=1&page=3'

    /* private readonly repoOwner = 'DavidStoyanov';
    private readonly repoName = 'Angular-Web-Chat-Project';
    private readonly token = 'GITHUB_TOKEN'; // Optional for private repos or higher rate limits

    headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
    } */

    constructor(private httpClient: HttpClient) {}

    getCommits(): Observable<GitCommit[]> {
        return this.httpClient.get<GitCommit[]>(this.apiUrl);
    }
}
