import { Injectable } from '@angular/core';
import { ServerConfiguration } from './ServerConfiguration';
import { LoggedUser } from './User';
import { Channel } from 'models';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChannelService {

    constructor(
        private http: HttpClient,
        private config: ServerConfiguration
    ) { }

    /**
     * Récupère la liste des channels
     */
    getAll(): Promise<Channel[]> {
        return this.http
            .get<Channel[]>(`${this.config.url}/api/channel`)
            .toPromise();
    }
    /**
     * Ajoute un nouveau channel
     * @param name nom du channel
     */
    add(name: string) {
        return this.http
            .post(`${this.config.url}/api/channel`, { name })
            .toPromise();
    }
}
