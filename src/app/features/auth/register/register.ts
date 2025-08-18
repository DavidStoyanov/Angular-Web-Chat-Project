import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
    ReactiveFormsModule,
    AbstractControl,
    ValidationErrors
} from '@angular/forms';

import { AuthService } from '../../../core/services';
import { ErrUseCase } from '../../../models/enums/enums';
import { UserRegisterDto } from './user-register.model';


@Component({
    selector: 'app-register',
    imports: [CommonModule, RouterLink, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
    templateUrl: './register.html',
    styleUrl: './register.scss'
})
export class Register {
    private authService = inject(AuthService);
    private router = inject(Router);
    private FormBuilder = inject(FormBuilder);

    protected registerForm: FormGroup;

    public ErrUseCase = ErrUseCase;

    constructor() {
        this.registerForm = this.FormBuilder.group({
            username: ['', [Validators.required, Validators.minLength(5)] ],
            email: ['', [Validators.required, Validators.email] ],
            passData: this.FormBuilder.group({
                password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,}$/)] ],
                rePassword: ['', [Validators.required] ]
            }, { validators: this.rePasswordValidator })
        });
    }

    get username(): FormControl {
        return this.registerForm.get('username') as FormControl;
    }

    get email(): FormControl {
        return this.registerForm.get('email') as FormControl;
    }

    get passData(): FormGroup {
        return this.registerForm.get('passData') as FormGroup;
    }

    get password(): FormControl {
        return this.passData?.get('password') as FormControl;
    }

    get rePassword(): FormControl {
        return this.passData?.get('rePassword') as FormControl;
    }

    usernameHasError(errUseCase: ErrUseCase): boolean {
        if (errUseCase === ErrUseCase.ERROR_CLASS) {
            return this.username.invalid && this.username.dirty
        } else if (errUseCase === ErrUseCase.ERROR_MSG) {
            return this.username.invalid && this.username.dirty && this.username.touched
        }

        return false;
    }

    get emailHasError(): boolean {
        return ( this.email.invalid && (this.email.touched || this.email.dirty) ) || false;
    }

    get passwordsHasError(): boolean {
        return ( this.passData.invalid && (this.passData.touched || this.passData.dirty) ) || false;
    }

    get usernameErrorMessage(): string {
        if (this.username.hasError('required')) {
            return 'Username is required!';
        } else if (this.username.hasError('minlength')) {
            return 'Username must be at least 5 characters!';
        }

        return '';
    }

    get emailErrorMessage(): string {
        if (this.email.hasError('required')) {
            return 'Email is required!';
        } else if (this.email.hasError('email-validator')) {
            return 'Email is not valid!';
        }

        return '';
    }

    get passwordsErrorMessage(): string {
        if (this.passData.hasError('register-failed')) {
            return 'Register failed!';
        } else if (this.password.hasError('required') || this.rePassword.hasError('required')) {
            return 'Password is required!';
        } else if (this.password.hasError('pattern')) {
            return 'Password should be at least 6 characters and should' +
                'contain only letters (abc,..),(ABC,..) and digits(0,1,2,..)';
        } else if (this.passData.hasError('password-mismatch')) {
            return 'Repeat password mismatching'
        }

        return '';
    }


    onSubmit(): void {
        if (this.registerForm.invalid) return;

        const { username, email } = this.registerForm.value;
        const password = this.password.value;

        const userDto: UserRegisterDto = {
            username, email, password
        };

        const response = this.authService.register(userDto);

        if (!response) {
            this.onInvalidPassData();
            return;
        }

        this.router.navigate(['/home']);
    }

    isPassErrMsgLong(): boolean {
        if (!this.passwordsHasError) return false;
        if (this.passwordsErrorMessage.length > 50) return true;

        return false;
    }

    private rePasswordValidator(passData: AbstractControl): ValidationErrors | null {
        const password = passData?.get('password')?.value;
        const rePassword = passData?.get('rePassword')?.value;

        if (password && rePassword && password !== rePassword) {
            return { 'password-mismatch': true };
        }
        
        return null;
    }

    private onInvalidPassData() {
        Object.keys(this.passData?.controls).forEach(key => {
            this.passData.get(key)?.patchValue('');
        })
        this.passData?.setErrors({'register-failed': true});
    }
}
