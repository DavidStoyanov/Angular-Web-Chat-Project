import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink],
    templateUrl: './navbar.html',
    styleUrl: './navbar.scss'
})
export class Navbar {
    private authService = inject(AuthService);
    private router = inject(Router);

    protected readonly isLoggedIn = this.authService.isLoggedIn;
    protected readonly getUser = this.authService.currentUser;

    logout() {
        this.authService.logout().subscribe({
            next: () => {
                this.router.navigate(['/home']);
            },
            error: (err) => {
                console.log('Logout failed', err);
            }
        });
    }
}
