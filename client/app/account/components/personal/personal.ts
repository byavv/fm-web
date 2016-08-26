import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {Router} from '@angular/router';
import {UsersBackEndApi} from "../../services/usersBackEndApi"
import {Api, Identity} from "../../../shared/services";

@Component({
    selector: 'settings',
    template: require('./personal.html'),
    directives: [REACTIVE_FORM_DIRECTIVES]
})

export class ProfileComponent implements OnInit {
    personalForm: FormGroup;
    model: any = {};
    error;
    info;
    constructor(private usersBackEnd: UsersBackEndApi, private identity: Identity) {
        this.personalForm = new FormGroup({
            name: new FormControl(),
            location: new FormControl()
        })
    }

    ngOnInit() {
        this.usersBackEnd.getProfileData().subscribe((result) => {
            this.model = result || {};
        }, (err) => {
            err = err.json();
            this.error = err.error.message;
        })
    }

    onSubmit() {
        this.usersBackEnd.setProfileData(this.personalForm.value)
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
