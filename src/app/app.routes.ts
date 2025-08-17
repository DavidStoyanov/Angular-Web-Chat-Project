import { Routes } from '@angular/router';
import { Home } from './features';
import { NotFound } from './shared/components';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { 
        path: 'devlog',
        loadComponent: () => import('./features/devlog/devlog').then((c) => c.Devlog),
    },
    { path: '**', component: NotFound },
];
