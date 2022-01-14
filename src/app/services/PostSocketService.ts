import { Injectable, NgZone } from '@angular/core';
import { Post, Like, Comment, Channel, User } from '../models'
import { SocketService } from './SocketService';

@Injectable()
export class PostSocketService {
    private socket: SocketService;

    constructor(socket: SocketService, zone: NgZone) {
        this.socket = socket;
    }

    /**
     * S'abonner au nouveau channel créer
     * @param callback 
     */
    onNewChannel(callback: (channel: Channel) => void) {
        this.socket.on("channel:add", callback);
    }
    /**
    * S'abonner aux nouvelles connexions
    * @param callback 
    */
    onUserConnect(callback: (user: User) => void) {
        this.socket.on("user:connect", callback);
    }
    /**
    * S'abonner aux nouveux posts
    * @param callback 
    */
    onPost(callback: (post: Post) => void) {
        this.socket.on("post:add", callback);
    }
    /**
    * S'abonner aux likes
    * @param callback 
    */
    onLike(callback: (like: Like) => void) {
        this.socket.on("post:like", callback);
    }
    /**
    * S'abonner commentaires postés
    * @param callback 
    */
    onComment(callback: (comment: Comment) => void) {
        this.socket.on("post:comment", callback);
    }
}
