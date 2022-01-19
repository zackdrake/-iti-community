import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Post } from '../../post.model';
import { PostService } from '../../services/post.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit, AfterViewInit {
  @Input()
  post: Post;

  @ViewChild("anchor")
  anchor: ElementRef<HTMLDivElement>;

  constructor(
    private postService: PostService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    console.log(this.post);
    // Format post message text
    // Show image img if url redirect to an image
    // Show video if url redirect to a video
    // Show link if url redirect to an external website
    // Show youtube embed if url redirect to a youtube video
    // Replace \n by <br>

    if (this.post.message.text.content.includes('http://') || this.post.message.text.content.includes('https://')) {
      let startIndex = this.post.message.text.content.indexOf('http://');
      if (startIndex === -1) startIndex = this.post.message.text.content.indexOf('https://');
      let endIndex = this.post.message.text.content.indexOf(' ', startIndex);
      if (endIndex === -1) {
        endIndex = this.post.message.text.content.indexOf('\n', startIndex);
        if (endIndex === -1) endIndex = this.post.message.text.content.length;
      }

      let link = this.post.message.text.content.substring(startIndex, endIndex);
      if (link.includes('\n') || link.includes(' ')) {
        link = link.substring(0, link.indexOf('\n'));
      }
      console.log(link);

      if (link.startsWith('https://www.youtube.com/')) {
        // YOUTUBE
        console.log('Contain a youtube link');
        // Use embed version of youtube video
        const temp_idx = link.indexOf('watch?v=');
        let ytLink = link;
        if (temp_idx !== -1) {
          ytLink = link.replace('watch?v=', 'embed/');
        }
        // Add embed youtube player
        this.post.message.text.content = this.post.message.text.content.replace(link, `<iframe width="560" height="315" src="${ytLink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
      } else if (this.isVideo(link) !== '') { // Check if link is a video
        // VIDEO
        console.log('Contain a video link');
        // Add video player
        this.post.message.text.content = this.post.message.text.content.replace(link, `<video width="560" height="315" controls><source src="${link}" type="video/${this.isVideo(link)}"></video>`);
      } else if (this.isImage(link) !== '') {
        // IMAGE
        console.log('Contain an image link');
        // Add image
        this.post.message.text.content = this.post.message.text.content.replace(link, `<img style="max-width: 560px" src="${link}" alt="${link}">`);
      } else {
        // NORMAL LINK
        console.log('Contain a link');
        // Add html link tag
        this.post.message.text.content = this.post.message.text.content.replace(link, `<a href="${link}" target="_blank">${link}</a>`);
      }
    }

    this.post.message.text.content = this.post.message.text.content.replace(/\n/g, '<br>');
  }

  isVideo(url: string): string {
    if (url.endsWith('.mp4')) return 'mp4';
    else if (url.endsWith('.webm')) return 'webm';
    else if (url.endsWith('.ogg')) return 'ogg';
    else return '';
  }

  isImage(url: string): string {
    if (url.endsWith('.jpg') || url.endsWith('.jpeg')) return 'jpg';
    else if (url.endsWith('.png')) return 'png';
    else if (url.endsWith('.gif')) return 'gif';
    else return '';
  }

  ngAfterViewInit() {
    this.anchor.nativeElement.scrollIntoView();
  }

  async like() {
    // TODO like du post, can't remove a like (because backend don't have 'unlike' method)
    this.post.liked = true;
    this.postService.like(this.post);
  }
}
