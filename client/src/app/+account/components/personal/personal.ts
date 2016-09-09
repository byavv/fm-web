import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileApi } from '../../../shared/services'
import { LoopBackAuth } from '../../../core'
@Component({
    selector: 'settings',
    template: require('./personal.html')
})

export class ProfileComponent implements OnInit {
    personalForm: FormGroup;
    model: any = {};
    error;
    info;
    constructor(private usersBackEnd: ProfileApi) {
        this.personalForm = new FormGroup({
            name: new FormControl(),
            location: new FormControl()
        })
    }

    ngOnInit() {
        this.usersBackEnd.getProfile().subscribe((result) => {
            this.model = result || {};
        }, (err) => {
            err = err.json();
            this.error = err.error.message;
        })
    }

    onSubmit() {
        this.usersBackEnd.updateProfile(this.personalForm.value)
            .subscribe((result) => {
                this.error = null;
                this.info = 'Profile data was updated successfully';
                setTimeout(() => {
                    this.info = null;
                }, 5000)
            }, err => {
                err = err.json()
                this.error = err.error.message;
            })
    }
}
