import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../../core/services';

@Component({
    selector: 'app-login',
    imports: [RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: './login.html',
    styleUrl: './login.scss'
})
export class Login {
    private authService = inject(AuthService);
    private router = inject(Router);
    private formBuilder = inject(FormBuilder)

    protected loginForm: FormGroup;

    constructor() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email] ],
            password: ['', [Validators.required, Validators.minLength(6)] ],
        });
    }

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    get isEmailValid(): boolean {
        return ( this.email?.invalid && ( this.email.touched && this.email.dirty ) ) || false;
    }

    get isPasswordValid(): boolean {
        return ( this.password?.invalid && ( this.password.touched && this.password.dirty ) ) || false;
    }

    get emailErrorMessage(): string {
        if (this.email?.hasError('required')) {
            return 'Email is required';
        } else if (this.email?.hasError('email')) {
            return 'Email address should be in valid format';
        }

        return '';
    }

    get passwordErrorMessage(): string {
        console.log(this.password?.errors)

        if(this.password?.hasError('required')) {
            return 'Password is required!';
        } else if (this.password?.errors?.['minlength']) {
            return 'Password must be at least 6 characters!';
        } else if (this.password?.hasError('login-failed')){
            return 'Invalid username or password!'
        }
        
        return '';
    }

    onSubmit(): void {
        if (this.loginForm.invalid) return;

        const { email, password } = this.loginForm.value;

        const response = this.authService.login(email, password);

        if (!response) {
            this.onInvalidPassword();
            return;
        }

        this.router.navigate(['/home']);
    }

    private onInvalidPassword() {
        this.password?.patchValue('');
        this.password?.setErrors({'login-failed': true});
    }
}
