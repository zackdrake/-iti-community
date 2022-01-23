import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/modules/authentication/services/authentication.service';
import { UserService } from '../../services/user.service';
import { User } from '../../user.model';
import { UserStore } from '../../user.store';
import { NotificationStore } from 'src/modules/notification/notification.store';
import { NotificationQueries } from 'src/modules/notification/services/notification.queries';
import { NotificationSocketService } from 'src/modules/notification/services/notification.socket.service';
import { NotificationService } from 'src/modules/notification/services/notification.service';
import {AnyNotification} from "../../../notification/notification.model";

import { NzNotificationService } from 'ng-zorro-antd/notification';

//import { AnyNotification } from 'src/modules/notification/notification.model';
//import { NotificationState } from 'src/modules/notification/notification.state';

@Component({
  selector: 'app-user-widget',
  templateUrl: './user-widget.component.html',
  styleUrls: ['./user-widget.component.less']
})
export class UserWidgetComponent implements OnInit {
  @Input()
  notification: Notification;

  @ViewChild("anchor")
  anchor: ElementRef<HTMLDivElement>;

  @Output()
  toggleNotifications: EventEmitter<void> = new EventEmitter();

  user$: Observable<User | undefined>;
  photoUrl$: Observable<string | undefined>;
  hasUnread$: Observable<boolean>;
  isHidden = true;
  notifications$: Observable<AnyNotification[]>;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private modalService: NzModalService,
    private notificationStore: NotificationStore,
    private userService: UserService,
    private store: UserStore,
    private notificationQueries: NotificationQueries,
    private socketService: NotificationSocketService,
    private notificationService: NotificationService
  ) {
    this.user$ = store.user$;
    this.photoUrl$ = store.get(s => s.user && s.user.photoUrl ? s.user.photoUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg");
    this.hasUnread$ = notificationStore.hasUnread$;
    this.notifications$ = this.notificationStore.get(s => s.notifications);
  }

  ngOnInit(): void {
    console.log(this.notifications$)
  }

  async fireToggleNotificaions() {
    const notificationsconst = await this.notificationQueries.getNotifications();

    console.log(notificationsconst)
    /* if (this.isHidden!){
      this.notificationService.markAsViewed()
    }
     */

      this.isHidden = !this.isHidden;

      this.toggleNotifications.emit();


        this.socketService.onNewNotification( notif => {
          this.notificationStore.appendNotification(notif);
        })
        await this.notificationService.fetch();

  }

  logout() {
    this.modalService.confirm({
      nzTitle: "Déconnexion",
      nzContent: "Êtes-vous sûr(e) de vouloir déconnecter votre session ?",
      nzOkText: "Déconnexion",
      nzOnOk: () => {
        this.authService.logout();
        this.router.navigate(["/splash/register"]);

      }
    });
  }
}

export class NzDemoNotificationBasicComponent {
  constructor(private notification: NzNotificationService) {}

  createBasicNotification(): void {
    this.notification
      .blank(
        'Notification Title',
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
      )
      .onClick.subscribe(() => {
      console.log('notification clicked!');
    });
  }
}
