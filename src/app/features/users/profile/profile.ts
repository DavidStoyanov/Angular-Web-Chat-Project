import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { UserService, AuthService } from '../../../core/services';
import { UserProfileDto } from './profile-model';

@Component({
    selector: 'app-profile',
    imports: [ReactiveFormsModule],
    templateUrl: './profile.html',
    styleUrl: './profile.scss'
})
export class Profile implements OnInit {
    private userId: number;
    protected profileForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private userService: UserService,
                private authService: AuthService) {

        this.userId = this.authService.currentUserId as number;
        this.profileForm = this.formBuilder.group({
            alias: [''],
            firstName: [''],
            lastName: ['']
        });
    }

    onSubmit(): void {
        const profileDto: UserProfileDto = { ...this.profileForm.value }
        this.userService.updateUserProfile(this.userId, profileDto).subscribe({
            /* next: response => console.log('Success:', response),
            error: err => console.error('Error:', err),
            complete: () => console.log('Completed') */
        });
    }
    
    ngOnInit(): void {
        this.userService.getUserProfile(this.userId).subscribe((data: UserProfileDto) => {
            this.profileForm.patchValue(data);
        })
    }
}
