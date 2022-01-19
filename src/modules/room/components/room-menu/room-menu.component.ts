import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FeedStore } from 'src/modules/feed/feed.store';
import { Room } from '../../room.model';
import { RoomStore } from '../../room.store';
import { RoomQueries } from '../../services/room.queries';
import { RoomService } from '../../services/room.service';
import { RoomSocketService } from '../../services/room.socket.service';
import { RoomCreateModalComponent } from '../room-create-modal/room-create-modal.component';
@Component({
  selector: 'app-room-menu',
  templateUrl: './room-menu.component.html',
  styleUrls: ['./room-menu.component.less']
})
export class RoomMenuComponent implements OnInit {
  roomId$: Observable<string | undefined>;

  rooms: Room[];

  @ViewChild("modal") child: RoomCreateModalComponent;

  constructor(private feedStore: FeedStore, private router: Router, private queries: RoomQueries, private roomSocketService: RoomSocketService) {
    this.roomId$ = feedStore.roomId$;
    this.rooms = [];
  }

  async ngOnInit() {
    this.rooms = await this.queries.getAll();
    if (this.feedStore.value.roomId === undefined && localStorage.getItem('last_room_id') === null) {
      this.goToRoom(this.rooms[0]);
    } else if (this.feedStore.value.roomId === undefined && localStorage.getItem('last_room_id') !== null) {
      this.router.navigate(['/app', localStorage.getItem('last_room_id')]);
    }

    // Store roomId in localStorage when changing room
    this.feedStore.roomId$.subscribe(roomId => {
      if (roomId !== undefined) {
        localStorage.setItem('last_room_id', roomId);
      }
    });

    // TODO WHEN CONNECTION TO BACKEND SERVER IS OK
    this.roomSocketService.onNewRoom(room => {
      console.log('new room', room);
      this.rooms = [...this.rooms, room];
    });
  }

  goToRoom(room: Room) {
    // TODO naviguer vers app/[id de la room]
    this.router.navigate(['/app', room.id]);
  }
}
