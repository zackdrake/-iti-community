import { Injectable } from '@angular/core';
import { ServerConfiguration } from './ServerConfiguration';
import { UserStorageService } from './UserStorageService';
import { AuthenticatedUser, UserLogin, AuthenticationResult } from 'models';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthenticationService {
    user: AuthenticatedUser;
    get isAuthenticated() {
        return !!this.user;
    }

    constructor(
        private http: HttpClient,
        private config: ServerConfiguration,
        private userStore: UserStorageService,
        private router: Router
    ) {
        this.user = userStore.read();
    }

    async authenticate(user: UserLogin): Promise<AuthenticatedUser> {
        const result = await this.http
            .post<AuthenticationResult>(`${this.config.url}/api/authentication/login`, user)
            .toPromise();

        if (result.succeeded) {
            this.userStore.write(result.user);
            this.user = result.user;
            return result.user;
        } else {
            throw result;
        }
    }

    logout() {
        this.userStore.clean();
        this.router.navigate(['/login']);
    }
}
