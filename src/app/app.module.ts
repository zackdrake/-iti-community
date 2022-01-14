import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { rootRouterConfig } from './app.routes';
import * as components from './components';
import * as services from 'services';
import { JwtModule } from '@auth0/angular-jwt';
import { host, port } from './services/ServerConfiguration';
import { readAccessToken } from './services/UserStorageService';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule, NZ_I18N, fr_FR } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';

registerLocaleData(fr);
library.add(fas, far);

@NgModule({
    declarations: [
        components.AddChannelComponent,
        components.AppComponent,
        components.LoginComponent,
        components.MenuComponent,
        components.NotificationBarComponent,
        components.PostCommentComponent,
        components.PostComponent,
        components.PictureFeedContentComponent,
        components.RegisterComponent,
        components.SocialAppComponent,
        components.SocialFeedComponent,
        components.UserInputsComponent,
        components.VideoFeedContentComponent,
        components.YoutubeFeedContentComponent,
        components.UserProfilePictureComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: readAccessToken,
                whitelistedDomains: [`${host}:${port}`],
                blacklistedRoutes: [`${host}:${port}/api/authentication/login/`]
            }
        }),
        RouterModule.forRoot(rootRouterConfig),
        FontAwesomeModule,
        BrowserAnimationsModule,
        NgZorroAntdModule
    ],
    providers: [
        services.AuthGuard,
        services.UserStorageService,
        services.SocketService, {
            provide: services.ServerConfiguration,
            useValue: new services.ServerConfiguration()
        },
        services.ChannelService,
        services.PostService,
        services.PostSocketService,
        services.MessageParser,
        services.AuthenticationService,
        {
            provide: services.LoggedUser,
            useFactory: (auth: services.AuthenticationService) => auth.user,
            deps: [services.AuthenticationService]
        },
        services.RegistrationService,
        { provide: NZ_I18N, useValue: fr_FR },
    ],
    bootstrap: [components.AppComponent]
})
export class AppModule {

}
