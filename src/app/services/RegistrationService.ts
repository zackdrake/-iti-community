import { Injectable } from '@angular/core';
import { ServerConfiguration } from './ServerConfiguration';
import { UserRegistration } from 'models';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RegistrationService {

    constructor(
        private http: HttpClient,
        private config: ServerConfiguration
    ) {
    }

    register(newUser: UserRegistration): Promise<any> {
        return this.http
            .post(`${this.config.url}/api/authentication/register`, newUser)
            .toPromise();
    }

    usernameExists(username: string): Promise<boolean> {
        return this.http
            .get<any>(`${this.config.url}/api/authentication/exists?username=${username}`)
            .toPromise()
            .then(r => r.exists);
    }
}