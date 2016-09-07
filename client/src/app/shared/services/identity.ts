import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { User } from '../../lib/models';

@Injectable()
export class Identity {
    private _user: User;
    private _dispatch: Subject<User> = new Subject<User>();
    public get user(): User {
        return this._user;
    }
    public set user(value) {
        this._user = value;
    }
    public get identity$(): Observable<User> {
        return this._dispatch.asObservable();
    };
    constructor() {
        this.user = new User();
    }
    public update(identityData?: User): void {
        let user = new User();
        if (!!identityData && !!identityData.accessToken) {
            user.accessToken = identityData.accessToken;
            user.username = identityData.username;
        }
        this.user = user;
        this._dispatch.next(this.user);
    }
}
