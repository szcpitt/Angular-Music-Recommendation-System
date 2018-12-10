import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService, AuthenticationService } from '@/_services';
import { parseCookieValue } from '@angular/common/src/cookie';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    artists = [{name: "Linkin Park", isChecked: false}, 
                {name: "Evanescence", isChecked: false},
                {name: "Red Hot Chili Peppers", isChecked: false},
                {name: "Missy Elliott", isChecked: false},
                {name: "Eminem", isChecked: false},
                {name: "Chingy", isChecked: false},
                {name: "Staind", isChecked: false},
                {name: "Green Day", isChecked: false},
                {name: "Metallica", isChecked: false},
                {name: "Matchbox Twenty", isChecked: false}];

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });

    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        var body: any = this.registerForm.value;
        var selected = this.artists.filter(
            artist => {
                return artist.isChecked;
            }
        );
        if(selected.length > 5 || !selected || selected.length === 0) {
            alert("Please choose 1 - 5 artists!");
            return;
        }
        body.artists = selected.map(
            artist => {
                return artist.name;
            }
        );
        //console.log('body', body);
        this.loading = true;
        this.userService.register(body)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
