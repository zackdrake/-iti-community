import { Injectable } from '@angular/core';
import { AuthenticatedUser } from 'models';

export const itemKey = "$user";
export function readUser(): AuthenticatedUser {
    let serializeduser = localStorage.getItem(itemKey);
    if (serializeduser) {
        return JSON.parse(serializeduser);
    }

    return null;
}

export function readAccessToken() {
    const user = readUser();
    return user ? user.accessToken : null;
}

@Injectable()
export class UserStorageService {

    constructor() { }

    read(): AuthenticatedUser {
        return readUser();
    }

    write(user: AuthenticatedUser) {
        localStorage.setItem(itemKey, JSON.stringify(user));
    }

    clean() {
        localStorage.removeItem(itemKey);
    }
}
