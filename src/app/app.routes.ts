import { Routes } from '@angular/router';
import { Chats, Home } from './features';
import { NotFound } from './shared/components';
import { AuthGuard, GuestGuard } from './core/guards';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { 
        path: 'home',
        component: Home,
        data: { title: 'Home'}
    },
    { 
        path: 'devlog',
        loadComponent: () => import('./features/devlog/devlog').then((c) => c.Devlog),
        data: { title: 'Devlog'},
    },
    { 
        path: 'users/login',
        loadComponent: () => import('./features/auth/login/login').then((c) => c.Login),
        canActivate: [GuestGuard],
        data: { title: 'Login'},
    },
    { 
        path: 'users/register',
        loadComponent: () => import('./features/auth/register/register').then((c) => c.Register),
        canActivate: [GuestGuard],
        data: { title: 'Register'},
    },
    { 
        path: 'about',
        loadComponent: () => import('./features/common/about/about').then((c) => c.About),
        data: { title: 'About'},
    },
    { 
        path: 'users/profile',
        loadComponent: () => import('./features/users/profile/profile').then((c) => c.Profile),
        canActivate: [AuthGuard],
        data: { title: 'Profile'},
    },
    { 
        path: 'my-chats',
        loadComponent: () => import('./features/my-chats/my-chats').then((c) => c.MyChats),
        canActivate: [AuthGuard],
        data: { title: 'My Chats'},
    },
    { 
        path: '**',
        component: NotFound,
        data: { title: 'Not Found'},
    },
];
