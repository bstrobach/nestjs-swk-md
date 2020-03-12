import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  name = '';

  constructor(private router: Router, private socket: Socket) {}

  join() {
    this.socket.connect();
    this.socket.emit('set-name', this.name);
    this.router.navigateByUrl(`chat-room/${this.name}`);
  }
}
