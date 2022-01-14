import { Component, Input } from '@angular/core';
import { Channel } from 'models';

/**
 * Side menu permettant de naviguer entre les différents channels
 */
@Component({
    selector: 'menu',
    templateUrl: 'menu.html'
})
export class MenuComponent {
    @Input() channels: Channel[] = [];
}