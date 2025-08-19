import { Component, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from "./shared/components/header/header";
import { Footer } from './shared/components';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, Header, Footer],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
    private readonly SITE_NAME: string = 'JustChat';

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title
    ) {}

    ngOnInit() {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => this.activatedRoute),
            map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            }),
            mergeMap(route => route.data)
        ).subscribe(data => {
            const dataTitle: string = data['title'];
            const title = dataTitle ?
                `${dataTitle} | ${this.SITE_NAME}` :
                this.SITE_NAME ;
            this.titleService.setTitle(title);
        });
    }
}
