import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { AuthenticationStore } from 'src/modules/authentication/authentication.store';
import { WebsocketConnection } from 'src/modules/common/WebsocketConnection';
import {AnyNotification} from "../../../modules/notification/notification.model";
import {NotificationService} from "../../../modules/notification/services/notification.service";
import { NotificationQueries } from 'src/modules/notification/services/notification.queries';
import { NotificationStore } from 'src/modules/notification/notification.store';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.less']
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  @Input()
  notification: Notification;

  @ViewChild("anchor")
  anchor: ElementRef<HTMLDivElement>;


  sub?: Subscription;


  showDrawer: boolean = false;
  notifications$: Observable<AnyNotification[]>;
  constructor(
    private socket: WebsocketConnection,
    private authStore: AuthenticationStore,
    private notificationService: NotificationService,
    private notificationQueries  : NotificationQueries,
    private notificationStore: NotificationStore
  )
  {
    this.notifications$ = this.notificationStore.get(s => s.notifications);
    this.notification = this.notificationQueries.getNotifications();

  }

  ngOnInit(): void {
    console.log(this.notifications$);

    this.sub = this.authStore.accessToken$.subscribe(accessToken => {
      if (accessToken) {
        this.socket.connect(accessToken);
      } else {
        this.socket.disconnect();
      }



    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  onToggleNotifications() {

    if(this.showDrawer == true){
      this.showDrawer = false;
    }else{
      this.showDrawer = true;
    }

  }
}
