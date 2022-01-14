import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'user-profile-picture',
    styleUrls: ['./user-profile-picture.component.scss'],
    template: `
    <div class="picture-wrapper" [style]="style" ></div>
  `
})
export class UserProfilePictureComponent implements OnInit {
    @Input()
    src: string = "";

    constructor(
        private sanitizer: DomSanitizer
    ) { }
    
    get style() {
        if(this.src) {
            return this.sanitizer.bypassSecurityTrustStyle(`background-image: url(${this.src})`);
        }
        return "";
    }

    ngOnInit() {
    }

}
