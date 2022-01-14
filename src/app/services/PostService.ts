import { Injectable } from '@angular/core';
import { ServerConfiguration } from './ServerConfiguration';
import { LoggedUser } from './User';
import { Post, Like } from '../models';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostService {
    constructor(
        private http: HttpClient,
        private user: LoggedUser,
        private config: ServerConfiguration
    ) { }
    /**
     * Récupère tous les posts
     * @param channelId le channel concerné
     */
    getAll(channelId: string): Promise<Post[]> {
        return this.http
            .get<Post[]>(`${this.config.url}/api/channel/${channelId}/post`)
            .toPromise();
    }
    /**
     * Ajoute un nouveau post
     * @param channelId le channel sur lequel publier le post
     * @param message Le contenu du post
     */
    post(channelId: string, message: string): Promise<any> {
        if (!message) {
            throw new Error("The post message cannot be empty!");
        }

        return this.http
            .post<any>(`${this.config.url}/api/channel/${channelId}/post`, { message })
            .toPromise();
    }

    /**
     * Like un post
     * @param post Post à liker
     */
    like(post: Post): Promise<any> {
        return this.http
            .post(`${this.config.url}/api/post/${post.id}/like`, { id: post.id })
            .toPromise();
    }
    /**
     * Commente un post
     * @param post post à commenter
     * @param message contenu du commentaire
     */
    comment(post: Post, message: string): Promise<any> {
        return this.http
            .post(`${this.config.url}/api/post/${post.id}/comment`, { message })
            .toPromise();
    }
}
