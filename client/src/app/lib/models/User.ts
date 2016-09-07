/*export class User {
    token: string;
    name: string;
    constructor(name?: string, token?: string) {
        this.token = token;
        this.name = name;
    }
    isAuthenticated() {
        return !!this.token;
    }
}*/

/* tslint:disable */

export interface UserInterface {
    realm?: string;
    username?: string;
    password?: string;
    email?: string;
    emailVerified?: boolean;
    verificationToken?: string;
    id?: number;
    accessToken?: any;
    isAuthenticated?: () => boolean;
}

export class User implements UserInterface {
    realm?: string;
    username?: string;
    password?: string;
    email?: string;
    emailVerified?: boolean;
    verificationToken?: string;
    id?: number;
    accessToken?: any;
    constructor(data?: User) {
        Object.assign(this, data);
    }

    isAuthenticated(): boolean {
        return !!this.accessToken;
    }
}
