import { Injectable } from "@angular/core";

export const host = 'localhost';
export const port = 3001;
export const uriScheme = 'http';

export function getUrl() {
    return `${this.uriScheme}://${this.host}:${port}`;
}

@Injectable()
export class ServerConfiguration {
    host = host;
    port = port;
    uriScheme = uriScheme;
    url: string;

    constructor(options: { host?: string, port?: number, uriScheme?: string } = {}) {
        this.host = options.host || this.host;
        this.port = options.port || this.port;
        this.uriScheme = options.uriScheme || this.uriScheme;

        this.url = `${this.uriScheme}://${this.host}`;
        if (this.port != 80) {
            this.url += `:${this.port}`;
        }
    };
}
