import { Component, Input, OnInit } from '@angular/core';
import { MessageImageElement } from '../../../post.model';

@Component({
  selector: 'app-post-attachement-audio',
  templateUrl: './post-attachement-audio.component.html',
  styleUrls: ['./post-attachement-audio.component.less']
})
export class PostAttachementAudioComponent implements OnInit {
  @Input()
  element: MessageImageElement;

  constructor() { }

  ngOnInit(): void {
  }

}
